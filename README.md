<p align="center"><img src="docs/brand/consolecrypt.svg" width="80" alt="ConsoleCrypt"></p>

# ConsoleCrypt — документация

Руководство по SSH, RDP, SFTP, Kubernetes, базам данных, Docker, зашифрованному
хранилищу, синхронизации, сниппетам, ИИ и совместной работе. Руководство
описывает клиент 0.9.2; таблица готовых сборок ниже относится к последнему
опубликованному выпуску.

**[Руководство на русском](guide/ru.md)** · **[User guide in English](guide/en.md)**

В руководстве 63 главы и 364 скриншота для двух языков: первый запуск,
профили, установка Linux, хосты и группы, терминал, удалённый рабочий стол,
файлы, Kubernetes, базы данных, Docker, заметки, команды, совместный доступ,
буфер обмена, общие папки, резервные копии, настройки, а также запуск,
настройка (полный справочник параметров, рецепты корпоративного входа через IdP и LDAP, параметры для каждого способа установки), резервное копирование и обновление своего сервера.
Изображения получены из демонстрационного интерфейса с синтетическими данными.

## Быстрые ссылки

- [Готовые выпуски клиента](https://github.com/evsikovas/consolecrypt-client/releases).
- [Клиент: исходники и сборка](https://github.com/evsikovas/consolecrypt-client).
- [Сервер и протокол](https://github.com/evsikovas/consolecrypt-server).
- [Свой сервер в Docker и Kubernetes](docs/public/HOSTING.md).
- Свой сервер: [справочник параметров](guide/ru.md#server-reference), [корпоративный вход — рецепты](guide/ru.md#server-idp), [параметры по способам установки](guide/ru.md#server-settings).
- [Совместный доступ](docs/public/SHARING.md).
- [Аккаунт и синхронизация](docs/public/SYNC_ACCOUNT.md): подключение к серверу, одобрение нового устройства, корпоративный вход.
- [Буфер обмена](docs/public/CLIPBOARD.md): защищённое копирование секретов и автоочистка.
- Свой сервер: [параметры](docs/public/CONFIGURATION.md), [корпоративный вход](docs/public/ENTERPRISE.md).
- [RDP](docs/public/RDP.md), включая мобильный тачпад.
- [Локальные терминалы: zsh, PowerShell, cmd и WSL](docs/public/LOCAL_TERMINALS.md).
- [Локальный ИИ на Windows и macOS](docs/public/LOCAL_AI.md): три модели и сохранение установленных файлов при обновлении.
- [Kubernetes](docs/public/KUBERNETES.md): подключения, ресурсы, логи, Helm и GitOps.
- [Базы данных](docs/public/DATABASES.md): подключения и маршруты, запросы, защита прода и ИИ-помощник.
- [Docker](docs/public/DOCKER.md): контейнеры, логи, тома, пробросы и compose-проекты.
- [Мобильный RDP и настольные улучшения](docs/public/RELEASE_0_5_5.md).
- [Исправление комплекта восстановления на телефоне](docs/public/RELEASE_0_5_6.md).
- [Linux](docs/public/BUILD_LINUX.md).
- [macOS и Android](docs/public/BUILDING.md), [Windows](docs/public/BUILD_WINDOWS.md), [iOS Simulator](docs/public/BUILD_IOS.md).
- [Обновления](docs/public/UPDATES.md), [версия 0.9.2](docs/public/RELEASE_0_9_2.md), [версия 0.9.1](docs/public/RELEASE_0_9_1.md), [версия 0.8.6](docs/public/RELEASE_0_8_6.md), [версия 0.8.5](docs/public/RELEASE_0_8_5.md), [версия 0.6.4](docs/public/RELEASE_0_6_4.md).
- [GitHub Actions и раннеры](docs/public/GITHUB_ACTIONS.md).
- [Подписание и продление ленты обновлений](docs/public/UPDATE_FEED_PUBLISHER.md).
- [Рабочий сайт](https://consolecrypt.dev/guide?lang=ru).

## Готовые сборки 0.9.2

Шесть файлов выпущены из одного тега [v0.9.2](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.9.2).
Перед установкой сверьте файл с [SHA-256 релиза](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.9.2/SHA256SUMS-0.9.2.txt).

| Платформа | Сборка | Файл | Размер, байт |
| --- | --- | --- | ---: |
| macOS, Apple Silicon и Intel | 0.9.2+45011 | [DMG](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.9.2/ConsoleCrypt-0.9.2%2B45011-macos-universal.dmg) | 192 583 745 |
| Windows x64 | 0.9.2+45012 | [EXE](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.9.2/ConsoleCrypt-0.9.2%2B45012-windows-x64-setup.exe) | 40 605 802 |
| Windows x64 | 0.9.2+45012 | [Portable ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.9.2/ConsoleCrypt-0.9.2%2B45012-windows-x64.zip) | 59 088 708 |
| Linux x64 | 0.9.2+45013 | [DEB](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.9.2/ConsoleCrypt-0.9.2%2B45013-linux-x64.deb) | 43 831 460 |
| Linux x64 | 0.9.2+45013 | [RPM](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.9.2/ConsoleCrypt-0.9.2%2B45013-linux-x64.rpm) | 60 204 998 |
| Android ARM64 | 0.9.2+45014 | [APK](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.9.2/ConsoleCrypt-0.9.2%2B45014-android-arm64.apk) | 123 786 744 |
| iOS Simulator на Mac (прежняя сборка) | 0.5.6+23015 | [ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23015-ios-simulator-universal.zip) | 154 939 478 |

Выпуск 0.9.2 для iOS отложен; доступна прежняя предварительная сборка 0.5.6.
Архив iOS предназначен для Simulator, а не для установки на физический iPhone; [порядок запуска](docs/public/BUILD_IOS.md).

## Структура

- `guide/ru.md`, `guide/en.md` — руководство, которое читается прямо на GitHub.
- `assets/guide-content.js` — структурированный текст обеих локалей.
- `assets/guide/` — скриншоты и manifest с их происхождением/контрольными суммами.
- `docs/public/` — инструкции, технические требования и заметки выпусков:
  копия `docs/public` клиента и сервера, которую обновляет
  `python3 scripts/sync-public-docs.py --client ../consolecrypt-client --server ../consolecrypt-server`
  (`--check` только сообщает о расхождениях). Черновики заметок ещё не
  выпущенной версии не копируются.
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
