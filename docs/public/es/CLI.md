# Comando Prompt: consolacrypt-cli

Referencia traducida · [Original en ruso](../CLI.md)

`consolecrypt-cli` es un cliente de consola ConsoleCrypt . Es parte de los instaladores para
macOS , Windows y Linux (a partir de la versión 0.9.14) y trabaja con los mismos perfiles que
Aplicación: Almacenamiento, llaves y credenciales no se copian.

## Instalación

**Configuración → Comando Prompt → “Install CLI comandos”**:

- ** macOS ** - enlace `/usr/local/bin/consolecrypt-cli` al archivo interior
  `ConsoleCrypt.app`. Si la carpeta pertenece al sistema, macOS pedirá la contraseña.
  administrador.
- ** Windows ** - carpeta `bin` del programa se añade a la PATH del usuario.
- ** Linux ** (DEB, RPM) - reference `~/.local/bin/consolecrypt-cli` to
  `/opt/consolecrypt/consolecrypt-cli`. Si `~/.local/bin` no está en PATH, sección
  Esto te lo dirá; añade la carpeta a la configuración de tu shell.

Abra una nueva ventana terminal. "Delete comandos CLI" elimina sólo el enlace o
entrada en PATH creado ConsoleCrypt ; otro archivo con el mismo nombre no se toca.
No hay línea de comandos en los teléfonos.

## Equipos.

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

Banderas comunes: `--profile` (default last profile), `--json` (output)
para scripts), `--offline` (sin sincronización), `-v` ( log detallado; secretos)
No se meten en ello. La frase de la contraseña y otros secretos son tomados de la ventana de la consulta
o de variables ambientales para la automatización: `CC_PASSPHRASE` , `CC_PASSWORD` ,
`CC_SECRET`, `CC_KEY_PASSPHRASE` , `CC_SSH_PASSWORD` , `CC_RECOVERY_KEY` .
Regular `http://` sólo se permite para las direcciones de este equipo; `--insecure-http`
Sólo para una red local de confianza.

`consolecrypt-cli --version` muestra la versión de la aplicación con la que se
Ya viene. En macOS , el CLI encuentra perfiles en el mismo lugar donde la aplicación (incluyendo en
la carpeta de anteriores asambleas dentro `~/Library/Containers` ; la otra carpeta especifica
`--data-dir` o `CONSOLECRYPT_DATA_DIR` .

La aplicación y el CLI pueden trabajar simultáneamente con el mismo perfil. Sincronización
Reduce sus cambios, pero el mismo registro es mejor no gobernar en dos lugares a la vez.
