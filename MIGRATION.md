# Source migration / Перенос исходников

This repository was extracted from the published ConsoleCrypt GitLab main history on 2026-10-04.
The historical GitLab repository remains available for old release references.
The current client, server/protocol and documentation are maintained in separate
GitHub repositories; the website source remains private.

Перенесены необходимые исходники и публичная документация. Внутренние ТЗ, планы,
локальные настройки, секреты и рабочие данные не включены. История отфильтрована:
идентификаторы коммитов отличаются от монорепозитория, авторство сохранено.
Теги прежних выпусков сохраняют свою исходную структуру зависимостей для сборки;
актуальная структура разделённых проектов описана в README.

Client release 0.3.1 binaries are byte-for-byte copies of the published GitLab release,
built from original source commit `02ba6a8a28c04741b80ce0086f8411a6cfa08ff4`.
The initial source migration did not change installed clients.
Historical license notices remain applicable to their original versions.

## Domain and build transition

The public site and guide move to https://consolecrypt.dev. New profiles can use
https://sync.consolecrypt.dev; existing public accounts are retained. Keep the
server URL in existing profiles until an explicit supported migration is
provided. The old endpoint remains available for compatibility.

The documentation workflow validates both generated guides and the 82 reviewed
screenshots. It has read-only repository permissions and does not deploy the
website. Publish the matching site and client release separately, after their
GitHub Actions build artifacts have been verified.

Скриншоты и исторические заметки выпусков сохраняют исходные номера версий:
новое руководство не выдаёт старые проверки за проверки новой сборки.
