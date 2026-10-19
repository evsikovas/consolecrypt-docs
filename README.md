<p align="center"><img src="docs/brand/consolecrypt.svg" width="80" alt="ConsoleCrypt"></p>

# ConsoleCrypt — документация

Руководство по SSH, RDP, SFTP, зашифрованному хранилищу, синхронизации,
сниппетам, ИИ и совместной работе. Документация обновлена для клиента 0.4.1.

**[Руководство на русском](guide/ru.md)** · **[User guide in English](guide/en.md)**

В руководстве 33 главы и 94 скриншота для двух языков: первый запуск,
профили, установка Linux, хосты и группы, терминал, удалённый рабочий стол,
файлы, буфер обмена, общие папки, резервные копии и запуск своего сервера.
Изображения получены из демонстрационного интерфейса с синтетическими данными.

## Быстрые ссылки

- [Готовые выпуски клиента](https://github.com/evsikovas/consolecrypt-client/releases).
- [Клиент: исходники и сборка](https://github.com/evsikovas/consolecrypt-client).
- [Сервер и протокол](https://github.com/evsikovas/consolecrypt-server).
- [Docker и Kubernetes](docs/public/HOSTING.md).
- [Совместный доступ](docs/public/SHARING.md).
- [RDP](docs/public/RDP.md), включая мобильный тачпад.
- [Локальный ИИ на Windows и macOS](docs/public/LOCAL_AI.md).
- [Linux](docs/public/BUILD_LINUX.md).
- [macOS и Android](docs/public/BUILDING.md), [Windows](docs/public/BUILD_WINDOWS.md), [iOS Simulator](docs/public/BUILD_IOS.md).
- [Обновления](docs/public/UPDATES.md), [версия 0.4.1](docs/public/RELEASE_0_4_1.md).
- [GitHub Actions и раннеры](docs/public/GITHUB_ACTIONS.md).
- [Подписание и продление ленты обновлений](docs/public/UPDATE_FEED_PUBLISHER.md).
- [Рабочий сайт](https://consolecrypt.dev/guide?lang=ru).

## Готовые сборки 0.4.1

Все пакеты выпущены из одного тега [v0.4.1](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.4.1).
Перед установкой можно сверить файл с [SHA-256 релиза](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/SHA256SUMS-0.4.1.txt).

| Платформа | Сборка | Файл |
| --- | --- | --- |
| macOS, Apple Silicon и Intel | 0.4.1+18011 | [DMG](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/ConsoleCrypt-0.4.1%2B18011-macos-universal.dmg) |
| Windows x64 | 0.4.1+18012 | [EXE](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/ConsoleCrypt-0.4.1%2B18012-windows-x64-setup.exe), [ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/ConsoleCrypt-0.4.1%2B18012-windows-x64.zip) |
| Linux x64 | 0.4.1+18013 | [DEB](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/ConsoleCrypt-0.4.1%2B18013-linux-x64.deb), [RPM](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/ConsoleCrypt-0.4.1%2B18013-linux-x64.rpm) |
| Android ARM64 | 0.4.1+18014 | [APK](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/ConsoleCrypt-0.4.1%2B18014-android-arm64.apk) |
| iOS Simulator на Mac | 0.4.1+18015 | [ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.4.1/ConsoleCrypt-0.4.1%2B18015-ios-simulator-universal.zip) |

Android и iOS используют мобильный RDP-тачпад. Архив iOS предназначен для
Simulator, а не для установки на физический iPhone; [порядок запуска](docs/public/BUILD_IOS.md).

## Структура

- `guide/ru.md`, `guide/en.md` — руководство, которое читается прямо на GitHub.
- `assets/guide-content.js` — структурированный текст обеих локалей.
- `assets/guide/` — скриншоты и manifest с их происхождением/контрольными суммами.
- `docs/public/` — инструкции, технические требования и заметки выпусков.
- `docs/brand/` — знак проекта.

Команды в инструкциях сборки выполняются в соответствующем репозитории клиента
или сервера, а не в этом репозитории документации. Исторические заметки выпусков
сохраняют ссылки и номера проверенных сборок; это не ссылки текущей загрузки.

## Ограничения текущей версии

На iOS распространяется предварительная сборка для Simulator, не установщик
для физического iPhone. Возможности, доступные на компьютере, могут отличаться
от мобильных. В RDP смена общей папки/прав иногда обрывает сеанс — сохраните
работу и при необходимости подключитесь снова. Подробнее в руководстве.

## Обновление документации

Исправляйте обе локали и сохраняйте реальные названия элементов интерфейса.
Для скриншотов используйте только демонстрационные данные, без личных
подключений, паролей, токенов и ключей. Внутренние ТЗ и планы здесь не хранятся.
Workflow `Documentation` проверяет руководство в GitHub Actions. Публикация сайта
выполняется отдельно из приватного репозитория сайта; push в docs не меняет
production. См. [MIGRATION.md](MIGRATION.md).

## Лицензия

Текущая собственная документация — [AGPL-3.0-only](LICENSE), Alexander Evsikov.
Сторонние материалы и исторические выпуски сохраняют свои условия.

## Генерация Markdown

Нужен Node.js 22+. Из корня этой репы, без установки npm-зависимостей:

```sh
node scripts/render-guide.mjs . .
node scripts/render-guide.mjs . . --check
```

Генератор проверяет обе локали, структуру глав, наличие изображений,
размеры PNG и SHA-256 по манифесту. Режим `--check` не изменяет файлы.
