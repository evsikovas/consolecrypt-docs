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

The public site and guide are at https://consolecrypt.dev. The public account
server is https://sync.consolecrypt.dev; existing account identifiers and keys
are retained. The old `consolecrypt.evsikov.net` and
`updates.consolecrypt.evsikov.net` endpoints are currently unavailable. Set an
existing server profile to `https://sync.consolecrypt.dev`. If the old built-in
updater cannot connect, download the current installer from the site and update
the existing installation manually. Preserve the vault, application data,
downloaded models and system Keychain/keyring; do not delete or recreate them
as part of the domain change.

The documentation workflow validates both generated guides and the 102
screenshots against their manifest, including PNG dimensions and SHA-256 hashes.
It has read-only repository permissions and does not deploy the
website. Publish the matching site and client release separately, after their
GitHub Actions build artifacts have been verified.

Публичный сервер аккаунтов — `https://sync.consolecrypt.dev`; идентификаторы
и ключи прежних аккаунтов сохранены. Старые домены сервера и обновлений сейчас
недоступны. Измените адрес в существующем профиле сервера; если прежний updater
не подключается, скачайте установщик с `consolecrypt.dev` и обновите приложение
вручную. Сохраните хранилище, данные приложения, скачанные модели и системную
связку ключей; смена домена не требует их удаления или создания заново.

Скриншоты и исторические заметки выпусков сохраняют исходные номера версий:
новое руководство не выдаёт старые проверки за проверки новой сборки.
