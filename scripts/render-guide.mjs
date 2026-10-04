// Render the public bilingual guide as GitHub-readable Markdown.
// Usage: node render-guide.mjs <vetted-site-checkout> <docs-checkout> [--check]
// Reads only the vetted guide source and its manifest-listed PNGs. No network,
// shell commands, CI configuration or repository operations are performed.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const paths = args.filter(arg => arg !== '--check');
assert.equal(paths.length, 2,
  'Usage: node render-guide.mjs <vetted-site-checkout> <docs-checkout> [--check]');
const [siteRoot, docsRoot] = paths.map(value => path.resolve(value));
assert(siteRoot === docsRoot || !docsRoot.startsWith(`${siteRoot}${path.sep}`),
  'Use the same docs root or a separate destination');

async function regularFile(relative) {
  const filename = path.join(siteRoot, relative);
  assert((await lstat(filename)).isFile(), `Not a regular source file: ${relative}`);
  return readFile(filename);
}

const contentBytes = await regularFile('assets/guide-content.js');
const source = contentBytes.toString('utf8');
assert(!/^\s*import\s/m.test(source), 'Guide data must be self-contained');
const { guideGroups, guideSections } = await import(
  `data:text/javascript;base64,${contentBytes.toString('base64')}`
);
assert(Array.isArray(guideGroups) && Array.isArray(guideSections));
const manifestBytes = await regularFile('assets/guide/manifest.json');
const manifest = JSON.parse(manifestBytes.toString('utf8'));
assert.equal(manifest.source, 'real-flutter-widgets-with-synthetic-demo-services');
assert.equal(manifest.userData, false);
assert.equal(manifest.revealedSecrets, false);
assert(Array.isArray(manifest.images));

function paired(value, label) {
  assert(value && typeof value === 'object', `Missing translated value: ${label}`);
  for (const locale of ['ru', 'en']) {
    assert(typeof value[locale] === 'string' && value[locale].trim(),
      `Missing ${locale}: ${label}`);
  }
}

const groupIds = new Set();
for (const group of guideGroups) {
  assert.match(group.id, /^[a-z][a-z0-9-]+$/);
  assert(!groupIds.has(group.id), `Duplicate group: ${group.id}`);
  groupIds.add(group.id);
  paired(group.title, `group ${group.id}`);
}
const sectionIds = new Set();
const requiredImages = new Map();
const allowedFields = new Set([
  'id', 'group', 'title', 'intro', 'steps', 'note', 'image', 'keywords',
  'blocks', 'table', 'images', 'links',
]);
for (const section of guideSections) {
  assert.match(section.id, /^[a-z][a-z0-9-]+$/);
  assert(!sectionIds.has(section.id), `Duplicate section: ${section.id}`);
  sectionIds.add(section.id);
  assert(groupIds.has(section.group), `Unknown group: ${section.group}`);
  for (const key of Object.keys(section)) {
    assert(allowedFields.has(key), `Unsupported guide field: ${section.id}.${key}`);
  }
  paired(section.title, `${section.id}.title`);
  paired(section.intro, `${section.id}.intro`);
  for (const [index, step] of (section.steps ?? []).entries()) {
    paired(step, `${section.id}.steps[${index}]`);
  }
  if (section.note) paired(section.note, `${section.id}.note`);
  if (section.table) {
    const { headings, rows } = section.table;
    assert(Array.isArray(headings) && headings.length > 0);
    headings.forEach(value => paired(value, `${section.id}.table.heading`));
    for (const row of rows) {
      assert.equal(row.length, headings.length, `Invalid table width: ${section.id}`);
      row.forEach(value => paired(value, `${section.id}.table.cell`));
    }
  }
  for (const block of section.blocks ?? []) {
    paired(block.title, `${section.id}.block.title`);
    paired(block.caption, `${section.id}.block.caption`);
    assert.equal(typeof block.code, 'string');
  }
  for (const link of section.links ?? []) {
    paired(link.text, `${section.id}.link.text`);
    assert.equal(new URL(link.href).protocol, 'https:', 'Only HTTPS guide links are expected');
  }
  for (const image of [section.image, ...(section.images ?? [])].filter(Boolean)) {
    assert.match(image.name, /^[a-z][a-z0-9-]+$/);
    paired(image.caption, `${section.id}.image.caption`);
    for (const locale of ['ru', 'en']) {
      const name = `${image.name}-${locale}`;
      const previous = requiredImages.get(name);
      if (previous) {
        assert.equal(previous.width, image.width);
        assert.equal(previous.height, image.height);
      }
      requiredImages.set(name, image);
    }
  }
}
assert.equal(new Set(manifest.images.map(image => image.name)).size, manifest.images.length,
  'Duplicate screenshot manifest entry');
assert.deepEqual(manifest.images.map(image => image.name).sort(), [...requiredImages.keys()].sort(),
  'Screenshot manifest does not match the guide');

const outputs = new Map([
  ['assets/guide-content.js', contentBytes],
  ['assets/guide/manifest.json', manifestBytes],
]);
for (const record of manifest.images) {
  assert.match(record.name, /^[a-z][a-z0-9-]+$/);
  assert.equal(record.reviewed, true, `Unreviewed screenshot: ${record.name}`);
  const relative = `assets/guide/${record.name}.png`;
  const bytes = await regularFile(relative);
  assert(bytes.length >= 24, `Truncated PNG: ${record.name}`);
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), record.sha256,
    `Screenshot checksum mismatch: ${record.name}`);
  const expected = requiredImages.get(record.name);
  assert.equal(bytes.readUInt32BE(16), record.width);
  assert.equal(bytes.readUInt32BE(20), record.height);
  assert.equal(record.width, expected.width);
  assert.equal(record.height, expected.height);
  outputs.set(relative, bytes);
}

// Website strings are plain text, not Markdown. Escape punctuation so the
// generated document displays the same text, including </>, backslashes,
// underscores and table pipes.
function prose(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/([`*_\[\]|])/g, '\\$1');
}
const text = (value, locale) => prose(value[locale]);
const tableText = (value, locale) => text(value, locale).replace(/\r?\n/g, '<br>');
function linkTarget(href) {
  const prefix = 'https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/';
  return href.startsWith(prefix) ? `../docs/public/${href.slice(prefix.length)}` : href;
}
function fence(code) {
  const runs = code.match(/`+/g) ?? [];
  const ticks = '`'.repeat(Math.max(3, ...runs.map(run => run.length + 1)));
  return `${ticks}text\n${code}${code.endsWith('\n') ? '' : '\n'}${ticks}`;
}

for (const locale of ['ru', 'en']) {
  const title = locale === 'ru' ? 'Руководство ConsoleCrypt' : 'ConsoleCrypt guide';
  const other = locale === 'ru' ? '[English](en.md)' : '[Русский](ru.md)';
  const out = [
    `# ${title}`, '',
    `${other} · [README](../README.md) · [${locale === 'ru' ? 'Сайт' : 'Website'}](https://consolecrypt.evsikov.net/guide?lang=${locale})`, '',
    locale === 'ru'
      ? 'Пошаговое руководство с реальным интерфейсом приложения и демонстрационными данными. Снимки не содержат пользовательских секретов. Версии исходных снимков указаны в [манифесте](../assets/guide/manifest.json).'
      : 'Step-by-step instructions with the real application interface and demonstration data. Screenshots contain no user secrets. Their source versions are recorded in the [manifest](../assets/guide/manifest.json).', '',
    `## ${locale === 'ru' ? 'Оглавление' : 'Contents'}`, '',
  ];
  for (const group of guideGroups) {
    out.push(`**${text(group.title, locale)}**`, '');
    for (const section of guideSections.filter(section => section.group === group.id)) {
      out.push(`- [${text(section.title, locale)}](#${section.id})`);
    }
    out.push('');
  }
  for (const [index, section] of guideSections.entries()) {
    out.push(`<a name="${section.id}"></a>`, '',
      `## ${index + 1}. ${text(section.title, locale)}`, '',
      text(section.intro, locale), '');
    if (section.table) {
      const { headings, rows } = section.table;
      out.push(`| ${headings.map(value => tableText(value, locale)).join(' | ')} |`,
        `| ${headings.map(() => '---').join(' | ')} |`);
      for (const row of rows) out.push(`| ${row.map(value => tableText(value, locale)).join(' | ')} |`);
      out.push('');
    }
    for (const [number, step] of (section.steps ?? []).entries()) {
      out.push(`${number + 1}. ${text(step, locale).replace(/\r?\n/g, '\n   ')}`, '');
    }
    for (const block of section.blocks ?? []) {
      out.push(`### ${text(block.title, locale)}`, '', text(block.caption, locale), '', fence(block.code), '');
    }
    for (const link of section.links ?? []) {
      out.push(`[${text(link.text, locale)}](${linkTarget(link.href)})`, '');
    }
    if (section.note) {
      out.push(`> **${locale === 'ru' ? 'Обратите внимание' : 'Keep in mind'}**`, '>',
        `> ${text(section.note, locale).replace(/\r?\n/g, '\n> ')}`, '');
    }
    for (const image of [section.image, ...(section.images ?? [])].filter(Boolean)) {
      const src = `../assets/guide/${image.name}-${locale}.png`;
      out.push(`![${text(image.caption, locale)}](${src})`, '', text(image.caption, locale), '');
    }
  }
  const markdown = out.join('\n');
  assert.equal([...markdown.matchAll(/^<a name="/gm)].length, guideSections.length);
  assert.equal([...markdown.matchAll(/^!\[/gm)].length,
    guideSections.reduce((count, section) => count + [section.image, ...(section.images ?? [])].filter(Boolean).length, 0));
  outputs.set(`guide/${locale}.md`, Buffer.from(markdown));
}

for (const [relative, expected] of outputs) {
  const destination = path.join(docsRoot, relative);
  if (checkOnly) {
    assert((await readFile(destination)).equals(expected), `Generated file differs: ${relative}`);
  } else {
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, expected);
  }
}
console.log(JSON.stringify({
  mode: checkOnly ? 'check' : 'write',
  files: outputs.size,
  sectionsPerLanguage: guideSections.length,
  stepsPerLanguage: guideSections.reduce((count, section) => count + (section.steps?.length ?? 0), 0),
  codeBlocksPerLanguage: guideSections.reduce((count, section) => count + (section.blocks?.length ?? 0), 0),
  tablesPerLanguage: guideSections.filter(section => section.table).length,
  notesPerLanguage: guideSections.filter(section => section.note).length,
  screenshots: requiredImages.size,
}, null, 2));
