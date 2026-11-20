# Command Prompt: consolecrypt-cli

Translated reference · [Russian source](../CLI.md)

`consolecrypt-cli` is a console client ConsoleCrypt. He's part of the installers for
macOS, Windows and Linux (from version 0.9.14) and works with the same profiles as
Application: Storage, keys and credentials are not copied.

## Installation

**Settings → Command Prompt → “Install CLI commands”**:

- ** macOS ** - link `/usr/local/bin/consolecrypt-cli` to the file inside
  `ConsoleCrypt.app`. If the folder belongs to the system, macOS will ask for the password.
  administrator.
- ** Windows ** - folder `bin` of the program is added to the user's PATH.
- ** Linux ** (DEB, RPM) - reference `~/.local/bin/consolecrypt-cli` to
  `/opt/consolecrypt/consolecrypt-cli`. If `~/.local/bin` is not in PATH, section
  This will tell you; add the folder to your shell settings.

Open a new terminal window. "Delete CLI commands" removes only the link or
entry in PATH created ConsoleCrypt; another file with the same name is not touched.
There's no command line on phones.

## Teams.

```text
consolecrypt-cli --help                       # все команды
consolecrypt-cli profiles                     # профили; use / rm
consolecrypt-cli unlock-check                 # проверить разблокировку хранилища
consolecrypt-cli host list | show | add | rm  # хосты
consolecrypt-cli cred list | add-password | gen-key | import-key | rm
consolecrypt-cli ssh HOST                     # интерактивная сессия
consolecrypt-cli ssh HOST -- uptime           # выполнить команду
consolecrypt-cli tunnel list | add | start    # пробросы портов
consolecrypt-cli sftp ls | get | put          # файлы
consolecrypt-cli sync now | status            # синхронизация
consolecrypt-cli device list | code | ...     # устройства и их одобрение
consolecrypt-cli backup ...                   # зашифрованные копии .ccbackup
consolecrypt-cli recovery-kit                 # комплект восстановления
consolecrypt-cli passphrase change | reset    # парольная фраза хранилища
consolecrypt-cli ai search | ask | ...        # ИИ: поиск, вопросы, команды
```

Common flags: `--profile` (default last profile), `--json` (output)
for scripts), `--offline` (without synchronization), `-v` (detailed log; secrets)
They don't get into it. Password phrase and other secrets are taken from the query window
or from environment variables for automation: `CC_PASSPHRASE`, `CC_PASSWORD`,
`CC_SECRET`, `CC_KEY_PASSPHRASE`, `CC_SSH_PASSWORD`, `CC_RECOVERY_KEY`.
Regular `http://` is allowed only for addresses of this computer; `--insecure-http`
Only for a trusted local network.

`consolecrypt-cli --version` shows the version of the application with which it
It's coming. On macOS, the CLI finds profiles in the same place where the application (including in
the folder of previous assemblies inside `~/Library/Containers`; the other folder specifies
`--data-dir` or `CONSOLECRYPT_DATA_DIR`.

The application and the CLI can work simultaneously with the same profile. Synchronization
It reduces their changes, but the same record is better not to rule in two places at once.
