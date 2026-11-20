# ConsoleCrypt 0.2.3

Translated reference · [Russian source](../RELEASE_0_2_3.md)

A more spacious search, a compact panel and sequential sending of input to the SSH terminal. Updated installers for all supported platforms and manual pictures in Russian and English.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) · [Свой сервер: Docker / Kubernetes](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/HOSTING.md)

## What has changed?

- **Terminal input:** characters and Enter are sent in turn, even if the previous entry SSH has not yet been completed. Closing the tab or reconnecting cancels the remaining queue. The checks cover Cyrillic, English text, composite Unicode characters and byte-shaped responses SSH. The exact corrupted character from the user's message has not yet been reproduced; verification for it Windows after the update remains to be confirmed.
- **New connection: ** Round button **+**, hover prompt and previous connection action.
- **Search:** More space for a host name, IP address, snippet, or AI question.
- **Synchronization:** Successful status is displayed with a green dot and **Sinh.** The full hint is saved; errors, lack of network and disconnected synchronization show their state.
- **Guide:** 72 fresh UI shots in Russian and English, including mobile screen. This is demonstration data; real user repositories were not used.

## If macOS does not open the application after an old auto-update

Download the new DMG **through the browser** with [страницы загрузки](https://consolecrypt.evsikov.net/download?lang=ru), complete ConsoleCrypt and replace the application in **Applications**. Run the installed copy from there. Encrypted storage, profiles and keys need not be removed.

If 0.2.2 or 0.2.3 was downloaded with the old update button, rebooting the same button can again carry the start ban macOS. The new version does not fix the way an already running old client is loaded to the first clean installation. After that, updates are saved through the system dialog ** "Save and open"**, with a size check and SHA-256. Moving the application from DMG to Applications remains the final install step. Sandbox and protection macOS are maintained.

## Assemblies

| Platform | Version. | Package |
|---|---|---|
| Windows 10/11 x64 | **0.2.3+1309** | EXE/portable ZIP |
| macOS Intel/Apple Silicon | **0.2.3+1310** | Universal DMG |
| Android ARM64 | **0.2.3+67** | APK |
| iOS Simulator Intel / Apple Silicon | **0.2.3+68** | ZIP parts `.001` / `.002` |

The files are in **Assets** below. `SHA256SUMS-0.2.3.txt` contains the sums of all packets and the combined iOS ZIP. Source: `8d2213f5bc24bd94a4eac6ee85f132ac3bd5600a`. Windows and macOS are assembled in [CI №206](https://git.evsikov.net/publics/consolecrypt/-/pipelines/206); mobile packets use the same source with separate build numbers.

For iOS Simulator, upload both parts to one folder:

```sh
cat ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip -d consolecrypt-ios
```

[Запуск iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). This package is not installed on a physical iPhone.

## Issuance checks

**576 Flutter tests passed**, analysis without comment. Separate regressions check the input queue and its cancellation, panel localization, search sizes, successful synchronization state and preservation of warnings. Native checks on the export of updates, assembly numbers and the composition of public sources have passed.

Versions, architectures, libraries, licenses, CRC and SHA-256 packages have been tested. DMG passed the integrity check; macOS - application - strict verification of the signature and permissions of the sandbox. APK retains the previous preview signature and supports 16 KB of memory pages. iOS Simulator is verified by running on a separate temporary device, which is then deleted. Physical Windows / Android /iPhone and input on the user's computer were not checked.

Preliminary assemblies: Windows without Authenticode, macOS with the previous local signature without Apple notarization, Android with a preview signature. The client’s Rust code has not changed; previous Rust results are not issued as a repeat run. The known addiction warning for RSA `RUSTSEC-2023-0071` remains open.

Proprietary components: **AGPL-3.0-only** Licenses of third-party components, including the MIT terminal component, are stored in packages.

---
