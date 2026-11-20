# Asamblea ConsoleCrypt para Windows

Referencia traducida · [Original en ruso](../BUILD_WINDOWS.md)

Necesitas un ordenador con ** Windows 10/11 x64**. La aplicación Flutter para Windows va en marcha
Windows ; macOS no puede crear este paquete nativo.

## Arregla una vez.

1. [Git for Windows](https://git-scm.com/downloads/win).
2. [Flutter SDK](https://docs.flutter.dev/install) **3.47.x** con Dart **3.13.4 o una versión más nueva compatible**.
   Unpack, por ejemplo, en `C:\dev\flutter` y añadir `C:\dev\flutter\bin` a PATH.
   La versión mínima exacta se especifica en `client/flutter/pubspec.yaml` ; los archivos de bloqueo no se eliminan.
3. [Visual Studio](https://visualstudio.microsoft.com/downloads/) con volumen de trabajo
   **Desarrollo con C++ / Desarrollar aplicaciones clásicas C++:
   MSVC x64/x86, Windows SDK, herramientas CMake y **C++ ATL para herramientas de construcción más recientes v143
   (x86 y x64)** `Microsoft.VisualStudio.Component.VC.ATL` . ATL necesita un plugin
   notificaciones Windows `atlbase.h` ; `flutter doctor` no verifica este componente.
   El código VS no es suficiente.
4. [Rust через rustup](https://rustup.rs/) es la cadena estándar de herramientas MSVC.
   La versión `rust-toolchain.toml` arrancará cuando Cargo se inicie por primera vez.
5. [Strawberry Perl](https://strawberryperl.com/) x64 y [Python 3](https://www.python.org/downloads/windows/)
   Se agregó a PATH. El perl es necesario para OpenSSL/SQLCipher incorporado.
6. [Inno Setup 6](https://jrsoftware.org/isdl.php) para crear un instalador.

Abre el nuevo PowerShell. Míralo.

```powershell
git --version
python --version
perl --version
cargo --version
flutter --version
flutter config --enable-windows-desktop
flutter doctor -v
```

La sección Windows toolchain/Visual Studio en `flutter doctor` debe ser parcheada.
Usted no necesita instalar Android SDK, Xcode o servidor PostgreSQL para construir un cliente Windows .

## Descargar y recoger

Use un corto camino sin cirílico, como `C:\dev\consolecrypt` :

```powershell
New-Item -ItemType Directory -Force C:\dev | Out-Null
Set-Location C:\dev
git clone https://github.com/evsikovas/consolecrypt-client.git consolecrypt
Set-Location consolecrypt
.\client\scripts\build-windows.ps1 -Installer -NoCli
```

Si PowerShell bloquea los scripts locales, sólo para la ventana actual:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\client\scripts\build-windows.ps1 -Installer -NoCli
```

El montaje de las dependencias de carga y puede tomar una cantidad significativa de tiempo a primera vista.
El número de construcción aumentará automáticamente. Comprobaciones de script para errores de herramientas
Copia toda la carpeta Flutter y la DLL Visual C+++ distribuida, a continuación, ejecuta la Configuración Inno.
El campo numérico de la versión PE se limita a cuatro componentes de 16 bits: este último
El componente contiene los 16 bits inferiores del número de construcción. Versión completa `версия+сборка`
guardado en la aplicación e instalador campos de texto, nombres de archivos y mecanismo
actualizaciones. La versión completa se utiliza para la comparación. Investigaciones de la CI
instalador en la frontera 65535/65536 y con el número actual a una larga asamblea nativa.
Rust y el OpenSSL incorporado se montan en `target\windows-rust` en la raíz del repositorio:
Esto acorta los caminos para Perl por Windows . Guarda el corto camino del clon en sí mismo.
Al llamar a Cargo via Cargokit, se elimina la variable de servicio de telemetría.
MSBuild `VSTEL_MSBuildProjectFullPath` : ella forzó `cc-rs` a reagruparse
OpenSSL/AWS-LC en la alternancia de pruebas de construcción y nativas. Compilador y objetivo
La arquitectura se selecciona según los parámetros establecidos de MSVC y Cargo.
[Почему нужны все DLL и папка data](https://docs.flutter.dev/platform-integration/windows/building#building-your-own-zip-file-for-windows).

Resultado en `dist\windows\` :

- `ConsoleCrypt-<версия>+<сборка>-windows-x64-setup.exe` - instalador.
- `ConsoleCrypt-windows.zip` es una carpeta de aplicación portátil.
- `ConsoleCrypt\ConsoleCrypt.exe` - Comience sin instalación, toda la carpeta debe permanecer cerca.
- `*.sha256` - checksums; `ConsoleCrypt.version` - versión exacta.

El instalador no requiere un administrador, añade el elemento de menú Inicio, ofrece
Atajo en el escritorio y soporta la eliminación. Almacenamiento de usuario cuando se elimina
Las solicitudes se mantienen. No hay firma de editor en la asamblea local.

La aplicación se instala sólo para el usuario actual:
`%LOCALAPPDATA%\Programs\ConsoleCrypt`. Almacenamiento y ajustes se almacenan por separado
c `%LOCALAPPDATA%\consolecrypt\ConsoleCrypt\data` , llaves - en Windows Credencial
Gerente del usuario actual. No se requiere ningún lanzamiento del administrador.
Actualizar y eliminar la aplicación no afecta al directorio de almacenamiento.

Sin Inno Setup, eliminar `-Installer` y obtener una carpeta y un ZIP. Quitar `-NoCli` .
`consolecrypt-cli.exe` . `-Mock`
para demostrar la interfaz y no debe ser utilizado para un lanzamiento de trabajo.

## Check before publication

En un perfil de prueba separado, check startup, creación de almacenamiento, SSH .
SFTP , reiniciar después del cierre, instalación/actualización/remove.
Compruebe ZIP en una máquina sin Visual Studio: la aplicación debe encontrar DLL.
Autotests of the interface:

```powershell
Set-Location client\flutter
flutter analyze
flutter test
```

Comience después de que la asamblea esté completa. No ejecute dos asambleas Flutter al mismo tiempo.
en una copia del proyecto. [Загрузка установщика в существующий релиз](RELEASING.md)

## GitHub Corredor de acciones

Job `windows` flujo de trabajo `Client packages` utiliza corredor auto hospedado con etiquetas
`Windows`, `X64` , `consolecrypt` , `client` . Véase [настройку раннеров](GITHUB_ACTIONS.md) . Script
`client/scripts/ci-windows.ps1` encuentra herramientas en catálogos estándar.
Si el servicio PATH es diferente del PATH del usuario. En ausencia de Flutter
La etiqueta oficial 3.47.5 se descarga con verificación de compromiso; en ausencia de Perl,
Fresa Perl 5.40.5.1 Portable con SHA-256 validación oficial de liberación
El caché se encuentra fuera de la salida, por defecto `C:\GitLab-Runner\tools` .
Puede transferirse a través de `CC_CI_TOOLS_DIR` ; `CC_CI_FLUTTER_ROOT` indica
La raíz del SDK de Flutter preinstalado.

Si ISCC.exe no se encuentra, el CI también instala el Inno Setup 6.7.3 oficial.
a su propio directorio de caché, comprobando para SHA-256.
Instala Visual Studio C++, Rust y Python con antelación.
El script no cambia la cuenta global de PATH y servicio.
Número de construcción nativa asigna `github-build-number.py` por número de lanzamiento,
La fórmula se da en [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md) .
Los paquetes terminados, chequesums y la versión están en el artefacto de Acciones.
El camino `C:\GitLab-Runner\tools` es compatible con el caché SDK anterior.
Para el GitHub corredor, puede ser superado por `CC_CI_TOOLS_DIR` .
