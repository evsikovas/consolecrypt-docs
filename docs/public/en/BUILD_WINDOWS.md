# Assembly ConsoleCrypt for Windows

Translated reference · [Russian source](../BUILD_WINDOWS.md)

You need a computer with ** Windows 10/11 x64**. Flutter application for Windows is going
Windows; macOS cannot create this native packet.

## Set up once.

1. [Git for Windows](https://git-scm.com/downloads/win).
2. [Flutter SDK](https://docs.flutter.dev/install) **3.47.x** with Dart **3.13.4 or a newer compatible version**.
   Unpack, for example, in `C:\dev\flutter` and add `C:\dev\flutter\bin` to PATH.
   The exact minimum version is specified in `client/flutter/pubspec.yaml`; lock files are not deleted.
3. [Visual Studio](https://visualstudio.microsoft.com/downloads/) with workload
   **Desktop development with C++ / Develop classic C++ applications:
   MSVC x64/x86, Windows SDK, CMake tools and **C++ ATL for latest v143 build tools
   (x86 & x64)** `Microsoft.VisualStudio.Component.VC.ATL`. ATL needs a plugin
   notifications Windows `atlbase.h`; `flutter doctor` does not check this component.
   VS Code alone is not enough.
4. [Rust через rustup](https://rustup.rs/) is the standard MSVC toolchain.
   The `rust-toolchain.toml` version will boot when Cargo is first launched.
5. [Strawberry Perl](https://strawberryperl.com/) x64 and [Python 3](https://www.python.org/downloads/windows/)
   Added to PATH. Perl is required for built-in OpenSSL/SQLCipher.
6. [Inno Setup 6](https://jrsoftware.org/isdl.php) to create an installer.

Open the new PowerShell. Check it out.

```powershell
git --version
python --version
perl --version
cargo --version
flutter --version
flutter config --enable-windows-desktop
flutter doctor -v
```

The Windows toolchain/Visual Studio section in `flutter doctor` should be patched.
You do not need to install Android SDK, Xcode or server PostgreSQL to build a client Windows.

## Download and collect

Use a short path without Cyrillic, such as `C:\dev\consolecrypt`:

```powershell
New-Item -ItemType Directory -Force C:\dev | Out-Null
Set-Location C:\dev
git clone https://github.com/evsikovas/consolecrypt-client.git consolecrypt
Set-Location consolecrypt
.\client\scripts\build-windows.ps1 -Installer -NoCli
```

If PowerShell blocks local scripts, only for the current window:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\client\scripts\build-windows.ps1 -Installer -NoCli
```

Assembling loads dependencies and can take a significant amount of time at first run.
The build number will automatically increase. Script checks for tool errors
Copies the entire Flutter folder and the distributed DLL Visual C++, then runs the Inno Setup.
The PE version's numerical field is limited to four 16-bit components: the latter
The component contains the lower 16 bits of the build number. Full version `версия+сборка`
saved in the application and installer text fields, file names and mechanism
updates. The full version is used for comparison. CI checks in
installer on the border 65535/65536 and with the current number to a long native assembly.
Rust and the built-in OpenSSL are assembled in `target\windows-rust` at the root of the repository:
This shortens the paths for Perl by Windows. Save the short path of the clone itself.
When calling Cargo via Cargokit, the telemetry service variable is removed.
MSBuild `VSTEL_MSBuildProjectFullPath`: she forced `cc-rs` to reassemble
OpenSSL/AWS-LC in the alternation of build and native tests. Compiler and target
The architecture is selected according to the established MSVC and Cargo parameters.
[Почему нужны все DLL и папка data](https://docs.flutter.dev/platform-integration/windows/building#building-your-own-zip-file-for-windows).

Result in `dist\windows\`:

- `ConsoleCrypt-<версия>+<сборка>-windows-x64-setup.exe` - installer.
- `ConsoleCrypt-windows.zip` is a portable application folder.
- `ConsoleCrypt\ConsoleCrypt.exe` - Start without installation, the entire folder should remain close by.
- `*.sha256` - checksums; `ConsoleCrypt.version` - exact version.

The installer does not require an administrator, adds the Start menu item, offers
Shortcut on the desktop and supports deletion. User storage when deleting
Applications are retained. There is no publisher signature in the local assembly.

The application is installed only for the current user:
`%LOCALAPPDATA%\Programs\ConsoleCrypt`. Storage and settings are stored separately
c `%LOCALAPPDATA%\consolecrypt\ConsoleCrypt\data`, keys - in Windows Credential
Manager of the current user. No launch from the administrator is required.
Updating and deleting the application does not affect the storage directory.

Without Inno Setup, remove `-Installer` and get a folder and a ZIP. Remove `-NoCli`.
to collect additionally `consolecrypt-cli.exe`. `-Mock`
to demonstrate the interface and should not be used for a working release.

## Check before publication

On a separate test profile, check startup, storage creation, SSH.
SFTP, restart after lockdown, installation/update/remove.
Check ZIP on a machine without Visual Studio: the application must find DLL.
Autotests of the interface:

```powershell
Set-Location client\flutter
flutter analyze
flutter test
```

Start them after the assembly is complete. Do not run two Flutter assemblies at the same time.
in one copy of the draft. [Загрузка установщика в существующий релиз](RELEASING.md)

## GitHub Actions runner

Job `windows` workflow `Client packages` uses self-hosted runner with tags
`Windows`, `X64`, `consolecrypt`, `client`. See [настройку раннеров](GITHUB_ACTIONS.md). Script
`client/scripts/ci-windows.ps1` finds tools in standard catalogs.
If the PATH service is different from the PATH of the user. In the absence of Flutter
Official tag 3.47.5 is downloaded with commit verification; in the absence of Perl,
Strawberry Perl 5.40.5.1 Portable with SHA-256 official release validation
The cache is located outside checkout, by default `C:\GitLab-Runner\tools`.
It can be transferred through `CC_CI_TOOLS_DIR`; `CC_CI_FLUTTER_ROOT` indicates
The root of the pre-installed Flutter SDK.

If ISCC.exe is not found, the CI also installs the official Inno Setup 6.7.3.
to your own cache directory, checking for SHA-256.
Install Visual Studio C++, Rust and Python in advance.
The script does not change the global PATH and service account.
Native build number assigns `github-build-number.py` by launch number,
The formula is given in [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md).
Finished packages, checksums and version are in Actions artifact.
The path `C:\GitLab-Runner\tools` is left compatible with the previous SDK cache.
For GitHub runner, it can be overridden by `CC_CI_TOOLS_DIR`.
