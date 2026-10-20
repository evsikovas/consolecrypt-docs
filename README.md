<p align="center"><img src="docs/brand/consolecrypt.svg" width="80" alt="ConsoleCrypt"></p>

# ConsoleCrypt — документация

Руководство по SSH, RDP, SFTP, зашифрованному хранилищу, синхронизации,
сниппетам, ИИ и совместной работе. Руководство и опубликованные пакеты ниже
относятся к клиенту 0.5.6.

**[Руководство на русском](guide/ru.md)** · **[User guide in English](guide/en.md)**

В руководстве 34 главы и 114 скриншотов для двух языков: первый запуск,
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
- [Локальные терминалы: zsh, PowerShell, cmd и WSL](docs/public/LOCAL_TERMINALS.md).
- [Локальный ИИ на Windows и macOS](docs/public/LOCAL_AI.md): три модели и сохранение установленных файлов при обновлении.
- [Мобильный RDP и настольные улучшения](docs/public/RELEASE_0_5_5.md).
- [Исправление комплекта восстановления на телефоне](docs/public/RELEASE_0_5_6.md).
- [Linux](docs/public/BUILD_LINUX.md).
- [macOS и Android](docs/public/BUILDING.md), [Windows](docs/public/BUILD_WINDOWS.md), [iOS Simulator](docs/public/BUILD_IOS.md).
- [Обновления](docs/public/UPDATES.md), [версия 0.5.6](docs/public/RELEASE_0_5_6.md).
- [GitHub Actions и раннеры](docs/public/GITHUB_ACTIONS.md).
- [Подписание и продление ленты обновлений](docs/public/UPDATE_FEED_PUBLISHER.md).
- [Рабочий сайт](https://consolecrypt.dev/guide?lang=ru).

## Готовые сборки 0.5.6

Семь файлов выпущены из одного тега [v0.5.6](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.6).
Перед установкой сверьте файл с [SHA-256 релиза](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/SHA256SUMS-0.5.6.txt).

| Платформа | Сборка | Файл | Размер, байт |
| --- | --- | --- | ---: |
| macOS, Apple Silicon и Intel | 0.5.6+23011 | [DMG](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23011-macos-universal.dmg) | 142 541 064 |
| Windows x64 | 0.5.6+23012 | [EXE](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23012-windows-x64-setup.exe) | 25 625 251 |
| Windows x64 | 0.5.6+23012 | [Portable ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23012-windows-x64.zip) | 35 739 789 |
| Linux x64 | 0.5.6+23013 | [DEB](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.deb) | 26 693 850 |
| Linux x64 | 0.5.6+23013 | [RPM](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.rpm) | 36 027 657 |
| Android ARM64 | 0.5.6+23014 | [APK](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23014-android-arm64.apk) | 70 407 505 |
| iOS Simulator на Mac | 0.5.6+23015 | [ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23015-ios-simulator-universal.zip) | 154 939 478 |

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
