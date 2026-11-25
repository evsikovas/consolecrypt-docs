# ConsoleCrypt — документация

Руководство описывает клиент 1.2.5. [Скачать ConsoleCrypt](https://consolecrypt.dev/download?lang=ru) · [Проверки релиза](https://github.com/evsikovas/consolecrypt-client/actions/runs/45512273279)

| Язык | Руководство со скриншотами | Техническая документация и выпуски |
| --- | --- | --- |
| Русский | [Руководство](guide/ru.md) | [Справочник](docs/public/README.md) |
| English | [User guide](guide/en.md) | [Reference](docs/public/en/README.md) |
| Español | [Guía de uso](guide/es.md) | [Referencia](docs/public/es/README.md) |
| 简体中文 | [使用指南](guide/zh.md) | [技术参考](docs/public/zh/README.md) |

## С чего начать

- [Посмотреть трафик между двумя хостами с помощью TCPdump](guide/ru.md#tcpdump)
- [Собрать образ по SSH и развернуть его в Kubernetes](guide/ru.md#docker-details-deploy-kubernetes)

- [Установить приложение и создать профиль](guide/ru.md#first-start)
- [Добавить SSH- или RDP-хост](guide/ru.md#hosts)
- [Посмотреть нагрузку Linux-сервера](guide/ru.md#terminal-ssh-monitoring)
- [Открыть секрет в Vault или OpenBao](guide/ru.md#password-manager-vault-openbao)

## Клиент и сервер

- [Готовые выпуски клиента](https://github.com/evsikovas/consolecrypt-client/releases).
- [Клиент: исходники и сборка](https://github.com/evsikovas/consolecrypt-client).
- [Сервер и протокол](https://github.com/evsikovas/consolecrypt-server) · [Изменения сервера 0.2.10](docs/public/RELEASE_SERVER_0_2_10.md).
- [Свой сервер в Docker и Kubernetes](docs/public/HOSTING.md).
- Свой сервер: [справочник параметров](guide/ru.md#server-reference), [корпоративный вход — рецепты](guide/ru.md#server-idp), [параметры по способам установки](guide/ru.md#server-settings).
- [Совместный доступ](docs/public/SHARING.md).
- [Аккаунт и синхронизация](docs/public/SYNC_ACCOUNT.md): подключение к серверу, одобрение нового устройства, корпоративный вход.
- [Android: публикация в RuStore](docs/public/ANDROID_RUSTORE.md): подпись APK/AAB, CI и обновления через магазин.
- [Пароли в KDBX, Vault и OpenBao](docs/public/KEEPASS.md) · [Импорт и экспорт записей](guide/ru.md#password-manager-kdbx-transfer) · [Подключение к Vault и OpenBao](guide/ru.md#password-manager-vault-openbao).
- [Поддержка платформ 1.0](docs/public/PLATFORM_SUPPORT.md), [совместимость сервера](docs/public/COMPATIBILITY_1_0.md).
- [Буфер обмена](docs/public/CLIPBOARD.md): защищённое копирование секретов и автоочистка.
- [Ключ безопасности (YubiKey, FIDO2)](docs/public/SECURITY_KEY.md): разблокировка хранилища физическим ключом на Windows и macOS.
- Свой сервер: [параметры](docs/public/CONFIGURATION.md), [корпоративный вход](docs/public/ENTERPRISE.md).
- [RDP](docs/public/RDP.md), включая мобильный тачпад.
- [Локальные терминалы: zsh, PowerShell, cmd и WSL](docs/public/LOCAL_TERMINALS.md).
- [Локальный ИИ на Windows, macOS и Linux x64](docs/public/LOCAL_AI.md): три модели и сохранение установленных файлов при обновлении.
- [Kubernetes](docs/public/KUBERNETES.md): подключения, ресурсы, логи, Helm и GitOps.
- [Базы данных](docs/public/DATABASES.md): подключения и маршруты, запросы, защита прода и ИИ-помощник.
- [Docker](docs/public/DOCKER.md): контейнеры, логи, тома, пробросы и compose-проекты.

## Сборка и выпуски

- [Мобильный RDP и настольные улучшения](docs/public/RELEASE_0_5_5.md).
- [Исправление комплекта восстановления на телефоне](docs/public/RELEASE_0_5_6.md).
- [Linux](docs/public/BUILD_LINUX.md).
- [macOS и Android](docs/public/BUILDING.md), [Windows](docs/public/BUILD_WINDOWS.md), [iOS Simulator](docs/public/BUILD_IOS.md).
- [Обновления](docs/public/UPDATES.md), [версия 1.2.5](docs/public/RELEASE_1_2_5.md), [версия 1.2.3](docs/public/RELEASE_1_2_3.md), [версия 1.2.1](docs/public/RELEASE_1_2_1.md), [версия 1.2.0](docs/public/RELEASE_1_2_0.md), [версия 1.1.3](docs/public/RELEASE_1_1_3.md), [версия 1.1.0](docs/public/RELEASE_1_1_0.md), [версия 1.0.6](docs/public/RELEASE_1_0_6.md), [версия 1.0.4](docs/public/RELEASE_1_0_4.md), [версия 1.0.1](docs/public/RELEASE_1_0_1.md), [версия 1.0.0](docs/public/RELEASE_1_0_0.md), [версия 0.9.15](docs/public/RELEASE_0_9_15.md), [версия 0.9.14](docs/public/RELEASE_0_9_14.md), [версия 0.9.2](docs/public/RELEASE_0_9_2.md), [версия 0.9.1](docs/public/RELEASE_0_9_1.md), [версия 0.8.6](docs/public/RELEASE_0_8_6.md), [версия 0.8.5](docs/public/RELEASE_0_8_5.md), [версия 0.6.4](docs/public/RELEASE_0_6_4.md).
- [GitHub Actions и раннеры](docs/public/GITHUB_ACTIONS.md).
- [Подписание и продление ленты обновлений](docs/public/UPDATE_FEED_PUBLISHER.md).
- [Рабочий сайт](https://consolecrypt.dev/guide?lang=ru).

## Готовые сборки 1.2.5

Семь файлов прямой загрузки собраны из одного тега [v1.2.5](https://github.com/evsikovas/consolecrypt-client/releases/tag/v1.2.5).
Перед установкой сверьте файл с [SHA-256 релиза](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/SHA256SUMS-1.2.5.txt).

| Платформа | Сборка | Файл | Размер, байт |
| --- | --- | --- | ---: |
| macOS, Apple Silicon и Intel | 1.2.5+93011 | [DMG](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/ConsoleCrypt-1.2.5%2B93011-macos-universal.dmg) | 255 898 863 |
| Windows x64 | 1.2.5+93012 | [EXE](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/ConsoleCrypt-1.2.5%2B93012-windows-x64-setup.exe) | 61 437 456 |
| Windows x64 | 1.2.5+93012 | [Portable ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/ConsoleCrypt-1.2.5%2B93012-windows-x64.zip) | 91 677 320 |
| Linux x64 | 1.2.5+93013 | [DEB](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/ConsoleCrypt-1.2.5%2B93013-linux-x64.deb) | 69 384 864 |
| Linux x64 | 1.2.5+93013 | [RPM](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/ConsoleCrypt-1.2.5%2B93013-linux-x64.rpm) | 95 201 242 |
| Android ARM64 | 1.2.5+93014 | [APK](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/ConsoleCrypt-1.2.5%2B93014-android-arm64.apk) | 154 305 320 |
| iOS Simulator на Mac (не iPhone) | 1.2.5+93015 | [Simulator ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.2.5/ConsoleCrypt-1.2.5%2B93015-ios-simulator-universal.zip) | 277 922 330 |

Приложение для Android в магазине · [ConsoleCrypt в RuStore](https://www.rustore.ru/catalog/app/io.consolecrypt.consolecrypt).

Архив iOS предназначен для Simulator, а не для установки на физический iPhone; [порядок запуска](docs/public/BUILD_IOS.md).

## Структура

- `guide/ru.md`, `guide/en.md`, `guide/es.md`, `guide/zh.md` — руководство, которое читается прямо на GitHub.
- `assets/guide-content.js` — структурированный текст четырёх локалей.
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

Обновляйте все четыре локали и сохраняйте реальные названия элементов интерфейса.
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

Генератор проверяет четыре локали, структуру глав, наличие изображений,
размеры PNG и SHA-256 по манифесту. Режим `--check` не изменяет файлы.
