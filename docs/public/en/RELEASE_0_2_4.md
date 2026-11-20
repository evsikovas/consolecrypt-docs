# ConsoleCrypt 0.2.4

Translated reference · [Russian source](../RELEASE_0_2_4.md)

**Native SSH has been corrected to enter Cyrillic; search has become wider, hosts and groups are combined in one section.**

- **Cyrillic:** reproduced and corrected the conversion of the first "p" to `:�` in the real SSH session with Bash/Readline. The terminal requests UTF-8 for characters and correct deletion of the whole character; English input continues to work. Language settings and server number/date format are saved. After the update, open a new session SSH.
- **Search:** takes up the entire free width of the top panel. The host name or IP, snippet and AI query are available in a single line; a round **+** opens a new connection, a green dot and **Sinh.** show successful synchronization.
- ** Hosts:** A separate "Group" item has been removed from the left menu. Creation, nested groups, and general settings are available inside **Hosts**; old group links work.
- **Guide:** 72 new Russian and English screenshots from the current interface with demonstration data.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru)

## Installation and updating

| Platform | Version. | Package |
|---|---|---|
| Windows 10/11 x64 | **0.2.4+1332** | EXE and portable ZIP |
| macOS Intel/Apple Silicon | **0.2.4+1333** | Universal DMG |
| Android ARM64 | **0.2.4+71** | APK |
| iOS Simulator Intel / Apple Silicon | **0.2.4+72** | ZIP parts `.001` / `.002` |

The files are in **Assets** below. `SHA256SUMS-0.2.4.txt` contains the sums of packets and the combined iOS ZIP. Source: `39d3a487c6aaa9098a26ff79672b4359acb6da36`. Windows and macOS are assembled in [CI №213](https://git.evsikov.net/publics/consolecrypt/-/pipelines/213); mobile builds use the same source codes with separate numbers.

** macOS :** If the application does not open after downloading the old update button, download DMG ** through the browser** once, close ConsoleCrypt, replace the application in **Applications** and run the installed copy. Rebooting in an old application can carry the same startup ban. After a clean installation, updates are saved through the system dialog ** "Save and Open"** with size check and SHA-256. Profiles, storage and Keychain need not be removed; protections macOS remain included.

For iOS Simulator, upload both parts to one folder:

```sh
cat ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip -d consolecrypt-ios
```

[Запуск iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). This package is not installed on a physical iPhone.

## Checks and boundaries

**577 Flutter tests passed**, analysis without comment. **54 tests SSH passed**, including two integrations with the present OpenSSH; one previous slow RSA4096 generation test missed. Clippy and the terminal-core/AppCore/bridge consumer check have passed. Real regressions check Cyrillic and ASCII, post-snippet input, insertion, execution and Backspace. Native checks of saving macOS -updates, assembly numbers and public export passed.

Locale correction refers to the native SSH used by default. If the administrator prohibits `AcceptEnv`, the server is not `C.UTF-8` or is specified `LC_ALL=C`, the server must be configured to UTF-8. The explicitly selected OpenSSH backend system is unchanged. Secrets and user sessions SSH were not used in checks. Physical verification on the user’s computer remains a separate step.

Preliminary assemblies: Windows without Authenticode, macOS with the previous local signature without Apple notarization, Android with a preview signature. The known addiction warning for RSA `RUSTSEC-2023-0071` remains open. Proprietary components: **AGPL-3.0-only**; third-party licenses, including the MIT terminal component, retained.

---
