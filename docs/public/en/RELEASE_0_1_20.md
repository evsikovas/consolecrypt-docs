# ConsoleCrypt 0.1.20 · Issue check

Translated reference · [Russian source](../RELEASE_0_1_20.md)

Date: October 1, 2026. Code tag `v0.1.20`
commit `9cc4baaca4a6b451c23d835823a35300a0c77e54`. All packages are in use
the present Rust core; `CC_MOCK=false`.

| Platform | Package | Native version |
|---|---|---|
| Windows 10/11 x64 | EXE and portable ZIP | 0.1.20+1231 |
| macOS Apple Silicon and Intel | Universal DMG | 0.1.20+1232 |
| Android 11+ ARM64 | APK | 0.1.20+49 |
| iOS Simulator on Mac | ZIP, two parts for GitLab | 0.1.20+48 |

## What has changed?

Sharing selected hosts, snippets, collections and separately
Confirmed secrets. Personal VRK is not transmitted. Devices are verifying the full
code; each object uses its own DEK and participant envelopes.
Reader/Editor, feedback with rotation, queue of encrypted changes are available,
Checking signed history and recovery after interrupted operations.
Additional proprietary devices are allowed through owner-online
permits with role ceiling, term and quota; manual mode used
by default. [Процесс и границы защиты](SHARING.md)

Fixed final state delivery SSH and idle closure
FRB stream: The native producer closes, then the old subscription.
Late events of an old connection do not complete a new one.

Added iOS runner, static Rust core, Keychain/LocalAuthentication,
Mobile guards and independent regression/preview assignments.

## Checks.

- Client Rust: **634 PASS**, 7 excluded external fixtures tests
  The entire workspace clippy goes through. Common crates: **61 PASS**.
- Flutter: **461 PASS**, analysis without comment. GitLab Pipe160 is also available.
  completed all 461 tests on Windows and macOS before assembly; jobs1231/1232
  Completed successfully. This is not a physical keyboard check for all Windows10 PCs.
- Real app-core sharing integration: **12 PASS, 0 ignored**, PostgreSQL
  SQLCipher, FileMailer, Registration/Verification and device approval.
  Checked four types of objects, roles, review, new DEK, manual / automatic
  Admission, lost answers, replay, restart and rollback/freeze.
- Server: **166 real-PG checks**, including dump/restore, CAS, RBAC
  and signatures. Server 0.1.10 is released separately, four common features
  Access is enabled by the operator; the client checks the capabilities of the selected server.
- Windows ZIP: CRC, resource version0.1.20+1231
  `cc_bridge.dll`, matching SHA-256 with job1231 artifacts.
- macOS DMG: Integrity, `codesign --verify --deep --strict`, version 1232,
  ARM64/x86_64 for the application and all frameworks, including Rust bridge.
  There's an Applications link inside.
- Android APK: signature, `zipalign -P 16`, ELF mapping/RELRO of all three native
  libraries. The certificate is the same as 0.1.13; version 0.1.20/code49.
- iOS native regression47: **2 PASS**. Keychain/SQLCipher, TextInput
  Cyrillic/Return, highlight/copy/paste, two tabs, lifecycle,
  Unicode SFTP, disconnect/reconnect, buffer retention and active closure
  Tabs ≤ 5 seconds; cleanup without timeouts. Separate product48 installed
  and running in Simulator, version/ZIP/SHA-256/ARM64+Intel verified.
- Net public export: **982 files**, no private history
  Secrets, live deployment overrides, agent markdown and builds.
  Mandatory assembly paths and local documentation links are present.

## Publication

The GitLab release contains seven file links: DMG, EXE, Windows ZIP.
two parts iOS Simulator and APK, as well as the general SHA256SUMS. They're accessible without entrance.
[Сайт](https://consolecrypt.evsikov.net) shows new packages in Russian
and English; personal account and API are serviced separately from the landing page.

The signed update channel outputs 0.1.20 for Windows 1231, macOS 1232
and Android 49. Signature Ed25519 verified by client key; dimensions and SHA-256
This is consistent with published installers. Collaborative server capabilities
Works are included by the operator regardless of the publication of the client.

## Acceptance boundaries

iOS ZIP runs on Simulator on a Mac. It's not an IPA for a phone.
Face ID, physical keyboard, Wi-Fi/cellular network and background
iPhones require a connected device and a Personal Team/Apple Account signature.
The test injects Flutter TextInput/lifecycle, not real-life events of the phone's OS.
[Установка частей архива и дальнейшая проверка](BUILD_IOS.md).

New EXE/APKs are not installed on top of user applications in this
Go ahead. Acceptance on problematic Windows10 PC and physical Android remains
A separate check. Preliminary packets: Windows without Authenticode, macOS
without Apple notarization, Android with the previous development signature.

Review protects new data, but does not delete read copies or change
SSH credentials on the target server. Preserve before the update
encrypted backup and recovery kit.

[Релиз и SHA-256](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.20)
· [Обновления](UPDATES.md) · [Свой сервер](HOSTING.md).

English: this release adds selective end-to-end encrypted sharing, verified
Reader/Editor devices and explicit owner-online device enrollment. The client.
passed 634 Rust, 461 Flutter and 12 real-backend sharing checks. All three.
desktop/mobile installers were built and checked; the iOS48 preview passed
installation/startup in Simulator after native47 regression. Physical iPhone
acceptance and signing remain separate; the ZIP does not install on a phone.
