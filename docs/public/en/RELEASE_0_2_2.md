# ConsoleCrypt 0.2.2

Translated reference · [Russian source](../RELEASE_0_2_2.md)

Fixed Save Updates macOS: A new copy of the application should no longer receive a launch ban due to downloading in the sandbox. The sharing section has become clearer: data tabs are separated from adding devices, and additional actions do not take up the entire screen.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) · [Свой сервер](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/HOSTING.md)

## What has changed?

- **Updates macOS :** After checking the signed tape and the downloaded file, the application offers a system dialog ** "Save and Open"**. The selected file is rewritten with a size check and SHA-256, then opened by DMG. Sandbox and protection macOS remain included.
- **Cancellation and Retry:** Cancellation of saving is not considered a successful installation. The download that has already been verified remains available for retry. An existing file is not overwritten – choose a new name or a different folder.
- **Sharing:** Individual tabs **Available to me** and **I shared**, explanation of the current tab, stand-alone device block and understandable empty states. The main actions are **Add This Device** and **Confirm Device**; continued addition and history checks are available in **Other Actions**. Narrow screens and enlarged text are supported.
- **Documentation:** Updated instructions for installing, collaborating and adding devices; the guide on the site is supplemented with new interface snapshots in Russian and English.

## Update once through the browser to macOS

If you have ** ConsoleCrypt 0.2.1 or older**, download the new DMG through your browser from [страницы загрузки](https://consolecrypt.evsikov.net/download?lang=ru), close the application and replace it in **Applications**. Open the installed copy from Applications. If there is already a copy with a launch error, replace it with a copy from the new browser download. Profiles and encrypted repositories are saved; no key or storage is required to be removed.

The old application uses the old download method and cannot fix it until it updates itself. Starting with **0.2.2**, the following updates go through the system save dialog. At macOS, the installation is still completed by migrating the application from DMG to Applications.

## Assemblies

| Platform | Assembly | Package |
|---|---|---|
| Windows x64 | **0.2.2+1292** | EXE/portable ZIP |
| macOS Intel/Apple Silicon | **0.2.2+1293** | Universal DMG |
| Android ARM64 | **0.2.2+64** | APK |
| iOS Simulator Intel / Apple Silicon | **0.2.2+65** | ZIP in two parts `.001` / `.002` |

The files are in **Assets** below. `SHA256SUMS-0.2.2.txt` contains checksums of packets and collected iOS ZIP. Windows and macOS are collected in [CI №201](https://git.evsikov.net/publics/consolecrypt/-/pipelines/201) from `8c29dcef92a5fa248849609c34104c49849990de`; Android and iOS from the same source with separate assembly numbers.

For iOS Simulator, download both parts to one folder:

```sh
cat ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip -d consolecrypt-ios
```

[Порядок запуска iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). It's a build for Simulator; it's not installed on the iPhone.

## Checks.

**566 Flutter tests, analysis without comment. The native Swift export code of updates, size and checksum, refusal to overwrite files and click on symbolic links, cancellation and retry are checked. A separate signed sandbox app reproduced the old launch ban and verified the entry through a system dialog with the new policy. Protection macOS was not switched off.

Versions, architectures, archive integrity, licenses, and checksums of all packages were verified. macOS passed `codesign --verify --deep --strict` and validated new sandbox resolutions; iOS verified by running in a separate Simulator. Behavior on physical Windows / Android /iPhone was not tested in this release.

These are pre-assemblies: Windows without Authenticode, macOS with the previous local signature without notarization of Apple, Android with a saved preview signature. The Rust client has not changed in this release; the results of the previous release are not issued as a repeat run. The known addiction warning for RSA `RUSTSEC-2023-0071` remains open.

Proprietary components: **AGPL-3.0-only** Licenses of third-party components, including the MIT terminal component, are stored in packages.

---
