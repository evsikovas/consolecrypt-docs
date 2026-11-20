<p align="center"> <img src="https://git.evsikov.net/publics/consolecrypt/-/raw/v0.2.5/docs/brand/consolecrypt.svg" width="480" alt="ConsoleCrypt"> </p>

# ConsoleCrypt 0.2.5 · Ahora y en Linux

Referencia traducida · [Original en ruso](../RELEASE_0_2_5.md)

Workspace ConsoleCrypt está disponible en Linux : Terminal SSH , SFTP .
Hosts y grupos, francotiradores, asistente de inteligencia artificial y colaboración encriptada.
Los nuevos paquetes **DEB y RPM* se instalan a través de un administrador regular del programa.

## ¿Qué hay de nuevo?

- Cliente nativo ** Linux x86-64** con un verdadero núcleo de Rust, icono y menú de aplicación.
- Las claves de almacenamiento están protegidas por el sistema **Servicio Secreto**. El cliente utiliza el teclado desbloqueado existente y no mantiene las teclas abiertas si no está disponible.
- La instalación vía `apt` o `dnf` recibe automáticamente las bibliotecas gráficas requeridas.
- Ajustes Linux especificar la dirección de nuevos paquetes; la actualización es realizada por el gestor de paquetes, sin la cinta firmada y la instalación automática.
- En SFTP puede seleccionar el editor de archivos instalado en Linux .
- El GitLab construye verifica el verdadero puente de Rust y la creación de almacenamiento a través de la interfaz, el ahorro de host, el reinicio y el desbloqueo antes de empaquetar.

## Descargar

| Plataforma | Asamblea General | Archivos. |
|---|---|---|
| Linux x86-64 · Debian/Ubuntu | 0.2.5+1358 | [DEB](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1358-linux-x64.deb) |
| Linux x86-64 · Fedora | 0.2.5+1358 | [RPM](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1358-linux-x64.rpm) |
| Windows 10/11 x64 | 0.2.5+1353 | [Установщик EXE](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1353-windows-x64-setup.exe) · [Portable ZIP](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1353-windows-x64-portable.zip) |
| macOS 12+ · Apple Silicon e Intel | 0.2.5+1354 | [Универсальный DMG](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1354-macos-universal.dmg) |
| Android 11+ · ARM64 | 0.2.5+75 | [APK](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B75-android-arm64.apk) |
| iOS Simulador · Mac, ARM64/x86-64 | 0.2.5+76 | [ZIP, часть 1](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B76-ios-simulator-universal.zip.001) · [Часть 2](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B76-ios-simulator-universal.zip.002) |

[SHA-256 всех файлов](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/SHA256SUMS-0.2.5.txt)
[Сайт и загрузка](https://consolecrypt.evsikov.net/download?lang=ru)
[Руководство](https://consolecrypt.evsikov.net/guide?lang=ru)
[Установка Linux и сборка из исходников](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.5/docs/public/BUILD_LINUX.md)

## Instala Linux

Necesita un escritorio gráfico, sesión actual D-Bus y desbloqueado principal
Teclado del Servicio Secreto, como GNOME Keyring. Comience un cliente por su cuenta.
sin el usuario `sudo` .

```sh
# Debian / Ubuntu
sudo apt install ./ConsoleCrypt-0.2.5+1358-linux-x64.deb

# Fedora
sudo dnf install ./ConsoleCrypt-0.2.5+1358-linux-x64.rpm

consolecrypt
```

Para actualizar, descargar el nuevo paquete y repetir el comando de instalación. Installator
y borrar la aplicación no limpia el directorio y el teclado del hogar. Reiniciar y
desbloquear este almacenamiento de prueba se revisa por separado a través de la interfaz.

## Issuance checks

Fuentes de liberación: `96fc23fb5426dbee5efb75855d837cfc29f6ad66` .

| Plataforma | Origen y verificación confirmada |
|---|---|
| Linux +1358 | [build-linux 1358](https://git.evsikov.net/publics/consolecrypt/-/jobs/1358) , fuente de liberación; Ubuntu 22.04, verdadero puente de Rust 2/2 y UI 1/1 con Servicio Secreto, reiniciar y desbloquear |
| Windows +1353 | [build-windows 1353](https://git.evsikov.net/publics/consolecrypt/-/jobs/1353) , `41323da718694fb56a6868abba65c6fc1a3e91fb` ; integridad de las versiones de ZIP, SHA-256, x64 DLL/CRT y EXE; instalador |
| macOS +1354 | [build-macos 1354](https://git.evsikov.net/publics/consolecrypt/-/jobs/1354) , `41323da718694fb56a6868abba65c6fc1a3e91fb` ; DMG, SHA-256, firma estricta, ARM64/x86-64 universal y derecho de caja de arena; aplicación que no se ejecuta |
| Android +75 | Construcción nativa local; ARM64 APK, antigua firma, alineación ZIP/ELF 16 KiB y SHA-256 verificados; teléfono físico no revisado |
| iOS simulador +76 | Construcción nativa local; ARM64/x86-64 ZIP, firma, SHA-256 y recuperación de partes probadas; Simulador temporal separado mostró pantalla de bienvenida, iPhone físico no comprobado |

[Pipeline 224](https://git.evsikov.net/publics/consolecrypt/-/pipelines/224)
**FILED* was generally terminated due to the previous Linux assignment 1352.
Windows 1353 y macOS 1354 pasaron por separado; corregido Linux - asamblea 1358
Era 1352 en su lugar. Entre sus fotos y la fuente final sólo cambió.
Linux Metadatos CI/envasado, pruebas y montaje. Código de aplicación Windows / macOS
Todavía es lo mismo. Android / iOS recogidos localmente: de un registro de verificación inmutable
confirmó la coincidencia del código suministrado con la imagen final pública.
La comparación excluye los metadatos de las asambleas individuales y la prueba de integración.
no incluido en la aplicación; no es una declaración sobre la construcción de una etiqueta exacta.
Archivos Windows / macOS / Android / iOS salvados
cambios Linux El CI no requirió su reanimación.

DEB/RPM listo **+1358** instalados por separado y ejecutados en aislamiento
Debian 12 y Fedora 43 con X11 y renderización de software. Probada automáticamente
instalación de dependencias gráficas a través de `apt` / `dnf` , actualización
`0.2.5-79 → 0.2.5-1358` , eliminación/reinstalación, cuatro bibliotecas nativas,
Licencias y pantalla de bienvenida. Actualización/deléitese de seguridad comprobado
sólo en marcadores sintéticos de su propio hogar / llave; esto no es una prueba
migración del almacenamiento actual del usuario. Comprobaciones por separado
Conservación y restauración de este almacenamiento cifrado de prueba.

En todos los paquetes se revisa el texto completo de la AGPL y la licencia de MIT almacenada xterm.
Las GPU físicas, Wayland Linux ARM64, RHEL y Flatpak/AppImage no están incluidas.
Una matriz confirmada. Linux se actualiza manualmente por paquetes;
No hay actualización automática Linux . Este es un pre-issue: macOS sin notarización
Apple, Windows sin Authenticode, APK con firma de prueba previa.
La advertencia de adicción conocida para RSA `RUSTSEC-2023-0071` sigue abierta.

** macOS :** si la copia descargada por el botón de actualización anterior no se abre,
Descargar DMG a través de su navegador una vez, completo ConsoleCrypt , reemplazar la copia
Into Aplicaciones y ejecutelo. Recargar el botón antiguo puede ser
Mantener la prohibición de lanzamiento. diálogo del sistema de uso de las siguientes actualizaciones
"Guardar y abrir." No se deben eliminar los perfiles, almacenamiento y llavero;
Queda en vigor la protección macOS. [Подробнее](UPDATES.md)

El almacenamiento permanece encriptado en el dispositivo. Puedes trabajar localmente.
Conecta tu servidor de sincronización o selecciona un servidor público
`https://consolecrypt.evsikov.net`. SSH va directamente a sus anfitriones.

---

**Inglés:** ConsoleCrypt ahora soporta Linux x86-64 con paquetes DEB y RPM,
nativo Rust SSH / SFTP , espacios de trabajo cifrados y compartir equipo. Instalar con
`sudo apt install ./ConsoleCrypt-0.2.5+1358-linux-x64.deb` o
`sudo dnf install ./ConsoleCrypt-0.2.5+1358-linux-x64.rpm` , luego ejecutar `consolecrypt`
como su usuario de escritorio regular. Un servicio secreto persistente y permanente
Se requiere llavero. Linux actualizaciones utilizan el gestor de paquetes. Descargar enlaces
para cada plataforma y las compruebas SHA-256 se enumeran anteriormente. Linux no tiene firma
in-app updater feed o instalación automática de paquetes. Debian 12 y Fedora 43
paquete de instalación, actualización y software-X11 lanzamiento de pantalla de bienvenida aprobado;
la preservación del marcador se limita a los accesorios sintéticos HOME/keyring, no un real
migración del usuario-vault. GPU física/Wayland y física Windows /móvil-dispositivo
la aceptación no se reclama. Pipeline 224 falló en el trabajo superpuesto Linux
Windows 1353 y macOS 1354 pasaron por separado, seguido de un éxito Linux 1358.
Su tiempo de navegación coincide con la fuente final a pesar de los cambios posteriores de CI/test.
Android / iOS fueron construidos localmente; una comparación inmutable confirmó código de envío
equivalencia con la fuente final pública, excluyendo metadatos per-build y un
Prueba de integración de no conducir. No se afirma que hayan sido construidos de la etiqueta exacta.
Si un descargador viejo macOS produjo una aplicación que no puede lanzar, descargar el DMG
una vez a través de su navegador y reemplazar la aplicación en Aplicaciones; mantener la bóveda
y Keychain. Las actualizaciones posteriores utilizan el sistema Guardar y abrir diálogo.

*Alexander Evsikov * [i@evsikov.net](mailto:i@evsikov.net) *
[GNU AGPL-3.0-only](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.5/LICENSE).
Los componentes de terceros conservan sus propias licencias.
