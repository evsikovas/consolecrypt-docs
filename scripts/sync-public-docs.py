#!/usr/bin/env python3
"""Mirror the public documents of the client and the server into docs/public.

    python3 scripts/sync-public-docs.py --client ../consolecrypt-client --server ../consolecrypt-server
    python3 scripts/sync-public-docs.py ... --check   # exit 1 when out of date

Sources: `docs/public/*.md` of the server, then of the client (the client wins
on a shared name: its copy is the user-facing one). Links are rewritten so
they work here:

* a link to a document that is mirrored (`https://github.com/evsikovas/
  consolecrypt-{client,server}/blob/main/docs/public/X.md`) becomes `X.md`;
* a repository-relative link (`../../path`) becomes the GitHub URL of the
  repository the document came from, unless this repository has the same
  file at its root (LICENSE).

Release notes of a version newer than the client's latest `v*` tag are drafts
and are not copied (docs are published together with a release). Files here
that no source has are reported, never deleted.
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

GITHUB = "https://github.com/evsikovas"
RELEASE = re.compile(r"RELEASE_(\d+)_(\d+)_(\d+)\.md$")
LINK = re.compile(r"\]\(([^)\s]+)\)")


def latest_tag(repo: Path) -> tuple[int, int, int] | None:
    out = subprocess.run(
        ["git", "-C", str(repo), "tag", "--list", "v*"],
        check=True, capture_output=True, text=True,
    ).stdout.split()
    versions = []
    for tag in out:
        m = re.fullmatch(r"v(\d+)\.(\d+)\.(\d+)", tag)
        if m:
            versions.append(tuple(int(x) for x in m.groups()))
    return max(versions) if versions else None


def rewrite(text: str, repo: str, mirrored: set[str], root: Path) -> str:
    def link(m: re.Match[str]) -> str:
        target = m.group(1)
        for name in ("consolecrypt-client", "consolecrypt-server"):
            prefix = f"{GITHUB}/{name}/blob/main/docs/public/"
            if target.startswith(prefix):
                rest = target[len(prefix):]
                if rest.split("#", 1)[0] in mirrored:
                    return f"]({rest})"
        if target.startswith("../../"):
            rest = target[len("../../"):]
            # The same file at the root of this repository (LICENSE) stays local.
            if (root / rest.split("#", 1)[0]).is_file():
                return m.group(0)
            return f"]({GITHUB}/{repo}/blob/main/{rest})"
        return m.group(0)

    return LINK.sub(link, text)


def plan(client: Path, server: Path, root: Path) -> tuple[dict[str, str], list[str]]:
    latest = latest_tag(client)
    sources: dict[str, tuple[Path, str]] = {}
    skipped = []
    for repo_dir, repo in ((server, "consolecrypt-server"), (client, "consolecrypt-client")):
        for path in sorted((repo_dir / "docs/public").glob("*.md")):
            m = RELEASE.fullmatch(path.name)
            if repo == "consolecrypt-client" and m and latest and tuple(map(int, m.groups())) > latest:
                skipped.append(path.name)
                continue
            sources[path.name] = (path, repo)
    mirrored = set(sources)
    files = {
        name: rewrite(path.read_text(encoding="utf-8"), repo, mirrored, root)
        for name, (path, repo) in sources.items()
    }
    return files, skipped


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--client", type=Path, required=True)
    parser.add_argument("--server", type=Path, required=True)
    parser.add_argument("--out", type=Path, default=Path(__file__).resolve().parent.parent / "docs/public")
    parser.add_argument("--check", action="store_true", help="report differences, write nothing")
    args = parser.parse_args()

    files, skipped = plan(args.client, args.server, args.out.resolve().parent.parent)
    changed = []
    for name, text in sorted(files.items()):
        target = args.out / name
        if not target.exists() or target.read_text(encoding="utf-8") != text:
            changed.append(name)
            if not args.check:
                target.write_text(text, encoding="utf-8")
    extra = sorted(p.name for p in args.out.glob("*.md") if p.name not in files)
    for name in skipped:
        print(f"skipped (unreleased draft): {name}")
    for name in extra:
        print(f"only here (left alone): {name}")
    for name in changed:
        print(f"{'out of date' if args.check else 'updated'}: {name}")
    if args.check and changed:
        return 1
    print(f"{len(files)} documents, {len(changed)} {'out of date' if args.check else 'updated'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
