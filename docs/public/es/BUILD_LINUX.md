# ConsoleCrypt para Linux : instalación y montaje

Referencia traducida · [Original en ruso](../BUILD_LINUX.md)

Linux - versión está destinada para **x86-64** y escritorio gráfico.
El paquete `.deb` se utiliza en Debian/Ubuntu y `.rpm` en Fedora.
Los paquetes contienen el cliente, puente de óxido, motor Flutter, icono y menú de aplicación.
La construcción básica es **Ubuntu 22.04**. Inspección separada de instalación y lanzamiento
**Debian 12** y **Fedora 43** con X11 y renderización de software
Para la versión histórica 0.2.5, los resultados del CI actual se dan a continuación.
Liberación actual - **0.5.6**: DEB y RPM están en [вложениях GitHub-релиза](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.6) .

## Cierre de sistema

El cliente necesita el D-Bus de la sesión actual y el proveedor **Servicio Secreto** con el ya creado.
y el teclado principal desbloqueado. GNOME Keyring: Normalmente es el mismo.
Desbloquea la entrada a la sesión gráfica. En otro entorno, configura una compatibilidad
Proveedor Servicio Secreto y desbloquear el teclado por medio del escritorio.
El cliente no crea o desbloquea el teclado y no guarda las teclas en el abierto.
Vi en su ausencia. Comience ConsoleCrypt desde su usuario.
**sin `sudo` y dentro de una sesión de gráficos, en lugar de con una consola separada SSH.

## Selección de carpetas basada en el sistema para RDP

Empezando con la versión 0.3, seleccionando una carpeta local utiliza **XDG Desktop Portal** en D-Bus
tu sesión de gráficos. Los paquetes DEB/RPM requieren servicio `xdg-desktop-portal` .
El diálogo en sí mismo es proporcionado por un proveedor separado **FileChooser**
escritorio: `xdg-desktop-portal-gnome` para GNOME,
`xdg-desktop-portal-kde` for KDE Plasma or `xdg-desktop-portal-gtk` for environments
GTK. El proveedor es generalmente parte del escritorio. Si no lo es,
instalar el paquete apropiado a través de `apt` o `dnf` y volver a introducir los gráficos
sesión. ConsoleCrypt no asigna un proveedor en lugar de configuración de escritorio.

En entornos wlroots, uno `xdg-desktop-portal-wlr` no es suficiente para elegir.
Carpetas: Necesita un proveedor adicional con FileChooser, como GTK.
Este es el requisito de los elegidos [RFD XDG backend](https://docs.rs/rfd/0.15.4/rfd/#xdg-desktop-portal-backend) .
No ejecute una aplicación con `sudo` o un D-Bus separado de otro usuario.

Los cheques de instalación y lanzamiento de la versión 0.2.5 abajo no confirman el trabajo de la nueva versión
Diálogo RDP. Selección de carpetas y distribución de archivos en Linux 0.5.6 requieren verificación separada
Cliente listo en sesión gráfica con un portal de trabajo.

## Instalación `.deb`

Descargar el paquete a [странице загрузки](https://consolecrypt.dev/download?lang=ru) .
Abra el terminal en el directorio de descargas y sustituya el nombre exacto del archivo recibido:

```sh
sudo apt install ./ConsoleCrypt-0.5.6+23013-linux-x64.deb
consolecrypt
```

`apt` establece dependencias del sistema; también puede abrir el paquete con un gráfico
director del programa. Si no tiene un proveedor del Servicio Secreto,
`gnome-keyring` y volver a entrar en la sesión gráfica.

## Instalación `.rpm`

```sh
sudo dnf install ./ConsoleCrypt-0.5.6+23013-linux-x64.rpm
consolecrypt
```

Fedora también necesita un proveedor de servicios secretos, como `gnome-keyring` .
No use `rpm --nodeps` : se deben realizar cheques de biblioteca `dnf` .

## Actualización y eliminación

Con la versión 0.9.14, se actualiza una copia de DEB o RPM de la aplicación: **Ajustes →
Actualizaciones → Descargar e instalar ** comprueba el paquete en una cinta firmada separada
Linux y SHA-256, pide la contraseña del administrador `pkexec` y la pone a través de
`apt-get` , `dnf` , `zypper` o `rpm` ; nueva versión se abre con un botón
"Reset" [UPDATES.md](UPDATES.md) . 0.9.14, y una copia sin
`pkexec` actualización manual: descargar un nuevo paquete y repetir el comando
`apt install` o `dnf install` . La versión instalada contiene el número de montaje,
Por lo tanto, el gestor de paquetes distingue conjuntos de una liberación.

```sh
# Debian/Ubuntu
sudo apt remove consolecrypt
# Fedora
sudo dnf remove consolecrypt
```

La instalación y eliminación de un paquete no cambia los perfiles en el directorio o teclado del hogar.
Antes de transferir datos entre ordenadores, guardar una copia de seguridad encriptada
y un kit de recuperación. No retire las teclas en el teclado del sistema manualmente.

## Montaje del material de origen

Cierre todo el repositorio junto con `crates/` . Necesito Flutter **3.47.5**,
Rust of `rust-toolchain.toml` , Python 3.10+, Clang, CMake, Ninja, pkg-config,
GTK 3 headers, C/C++ compilador, Perl and tools `dpkg-deb` / `rpmbuild` .
Para Ubuntu 22.04:

```sh
sudo apt update
sudo apt install clang cmake ninja-build pkg-config libgtk-3-dev libwayland-dev libstdc++-12-dev \
  build-essential perl libssl-dev python3 dpkg-dev rpm
client/scripts/build-linux.sh
```

Script se reserva un nuevo número de construcción, compila un backend real
`CC_MOCK=false` y crea ambos paquetes en `dist/linux/` junto con SHA-256,
La versión exacta y la descripción de los archivos nativos. No ejecute varios al mismo tiempo.
Flutter-assembly en un directorio. Guardar `Cargo.lock` y `pubspec.lock` .

Para un ambiente reproducible, hay
[`client/ci/linux/Dockerfile`](https://github.com/evsikovas/consolecrypt-client/blob/main/client/ci/linux/Dockerfile) : Ubuntu 22.04,
Revisión verificada del Flutter oficial y el Rust fijo. Job `linux`
c [GitHub Actions](GITHUB_ACTIONS.md) usos Docker por separado Linux x64
corredor `cc-linux-k3s` y monturas sólo preparan fuentes públicas;
directorio de inicio, D-Bus, teclados, SSH llaves y Kubernetes configuración
No son transferidos al contenedor.

Imagen también contiene los encabezados de Wayland para la adicción `ashpd` y el servicio
`xdg-desktop-portal` / `xdg-desktop-portal-gtk` por cuenta propia
Una sesión de proyección gráfica. La presencia de estos paquetes en sí mismo no confirma la
Abrir el diálogo: necesita un portal de funcionamiento, proveedor de FileChooser y
comprobación separada de la selección de carpetas. GTK-providente de la imagen de prueba no se asigna
Es un escritorio personalizado.
Antes de empaquetar, el trabajo pasa las pruebas del verdadero puente Rust y el escenario de creación
Almacenamiento, reiniciar y desbloquear a través de la interfaz. Están hechos para ellos.
Xvfb separado, D-Bus y teclado de prueba cifrado que se eliminan después de
cheques. Sólo se incluyen etapas fijas y resultados en la revista.
sin contraseñas o palabras de recuperación.

## Comprobaciones y limitaciones

Corriente [Linux job выпуска 0.5.6+23013](https://github.com/evsikovas/consolecrypt-client/actions/runs/39377995191/job/118480579580)
Terminado exitosamente el 20 de octubre de 2026 (UTC). En un entorno aislado, pasaron
dos integraciones del actual puente Rust `rust_core_test.dart` , 2/2, escenario
Crear almacenamiento y reiniciar/desbloquear a través de la UI
`app_persistence_test.dart` , 1/1) y ida y vuelta al Servicio Secreto.
Creado DEB y RPM; dimensiones y SHA-256 de paquetes publicados verificados con GitHub
metadatos de activos y [SHA256SUMS-0.5.6.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/SHA256SUMS-0.5.6.txt)

| Archivo. | Tamaño, byte | SHA-256 |
| --- | ---: | --- |
| [DEB](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.deb) | 26 693 850 | `c484f2b38832351f729ce8d15493004e4e6cd6613f330f09cab6ac21e0adf51a` |
| [RPM](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.rpm) | 36 027 657 | `8066884c2940ea7efc1a6074365dc9a2355211b44e9a4922348c164cf63e5eb0` |

Las integraciones nativas se realizaron en una asamblea de pruebas separada. DEB/RPM
no pasó la aceptación visual de la interfaz instalada. Esta carrera.
no repite la instalación de paquetes en Debian/Fedora o comprueba esto
Sesión RDP, selección de carpetas y transferencia de archivos a través del portal.

Corrida histórica 0.2.5: GitLab [build-linux 1358](https://git.evsikov.net/publics/consolecrypt/-/jobs/1358)
Pasé por dos integraciones de Rust Bridge y un escenario completo de la UI: la construcción de un almacén.
Guardar el host, reiniciar y desbloquear con el verdadero Servicio Secreto de Pruebas.
El DEB/RPM de esa ejecución se instala por separado en Debian 12 y Fedora 43: verificada
dependencia, actualización `0.2.5-79 → 0.2.5-1358` , eliminación/reinstalación,
Bibliotecas nativas y la pantalla de bienvenida. El cheque de seguridad utilizado
sólo marcadores sintéticos en un hogar/conector separado; no confirma
migración del almacenamiento actual del usuario.


```sh
python3 -m unittest discover -s client/scripts -p test_linux_packaging.py -v
(cd client/rust && cargo test --locked -p cc-platform-core --features os-keychain)
(cd client/flutter && flutter analyze && flutter test)
```

Las pruebas del teclado real se ejecutan sólo en un entorno desechable separado:
`client/rust/platform-core/tests/run_linux_secret_service.py` Crea Su Propio
Sesiones D-Bus y teclados de prueba. No los ejecute en el teclado de acceso del usuario.

El backend principal SSH está integrado en el cliente. Backend opcional **System OpenSSH**
adicionalmente requiere `ssh` ; su modo proxy utiliza OpenBSD-compatible `nc`
con llaves `-X` / `-x` . Fedora Ncat y otras variantes `nc` con diferentes parámetros
No es adecuado para este régimen. Para conexiones normales, elija el backend principal.

Linux ARM64, Flatpak/AppImage, RPM para RHEL, GPU física y Wayland por ahora
No se verifica y no se incluye en la matriz confirmada de esta liberación.

La licencia completa AGPL-3.0 solo se incluye en el paquete. Licencias de componentes de terceros
almacenados en avisos de Flutter y archivos de licencia adjuntos.
