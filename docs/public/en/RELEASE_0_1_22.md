# ConsoleCrypt 0.1.22 · GNU AGPL-3.0-only

Translated reference · [Russian source](../RELEASE_0_1_22.md)

Date: October 1, 2026. Verified source code: tag `v0.1.22`
commit `38cbfe1a166227488f251479b911809206ef3402`.

Client, server, shared libraries and documentation ConsoleCrypt are now used
**GNU AGPL-3.0-only**. README, information "About the program", Cargo metadata,
Native bridge specifications and license text in distributions are agreed upon.
The full text of the AGPL is included in macOS, Windows, Android and iOS Simulator.
Third-party components retain their licenses. Previously published issues
The licenses granted for them are not changed. [Подробности](LICENSING.md)

| Platform | Package | Verified version |
|---|---|---|
| Windows 10/11 x64 | EXE and portable ZIP | 0.1.22+1244 |
| macOS Apple Silicon and Intel | Universal DMG | 0.1.22+1245 |
| Android 11+ ARM64 | APK | 0.1.22+55 |
| iOS Simulator on Mac | Universal ZIP in two parts | 0.1.22+56 |

## Checks.

- Flutter: error-free analysis and **462 PASS test. Windows / macOS
  [pipeline185](https://git.evsikov.net/publics/consolecrypt/-/pipelines/185)
  It was successfully completed before packaging.
- General Rust crates: **61 PASS test**. Cargo-deny licenses are available for
  client and general workspace; AGPL exceptions are limited to our crates.
- Version, export and packaging scenarios: **20 PASS, 1 SKIP**. The only one
  Missed local checkup requires PowerShell; real Windows job
  1244 successfully assembled the installer and portable archive.
- Windows: application and installer version 0.1.22.1244, DLL kit,
  The integrity of the ZIP and the full text of the AGPL are verified.
- macOS: version 0.1.22+1245, DMG integrity, universal architectures,
  Deep/strict codesign, Applications link and full AGPL text are verified.
- Android: version 0.1.22+55, former APK certificate, zipalign16KB,
  Native ELF alignment and AGPL assets are verified.
- iOS Simulator: version 0.1.22+56, ARM64/Intel slices Runner /App
  AGPL asset, CRC and SHA-256 combined parts of ZIP tested.
- All seven published files are anonymously downloaded; sizes and SHA-256
  They are similar to locally verified packages. Limited CI188/job1248
  Registered asset links without new permanent credentials.

## Download

[Релиз и контрольные суммы](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.22).
For iOS Simulator download both parts and combine by [инструкции](BUILD_IOS.md).
It's a ZIP for Simulator, not an IPA for a phone.

The site is updated regardless of the API: site version 0.1.18, code 84563e1,
Ready-made installers are available on [странице загрузки](https://consolecrypt.evsikov.net/download).
81 public route/resource, including 54 images; 26Node tests
One optional verification of a real account is missed.
The update server publishes 0.1.22 for Windows1244, macOS1245 and Android55.
Signature Ed25519 verified by the client's previous public trust anchor; dimensions,
SHA-256 and the references correspond to the verified installers.

Behavior SSH, synchronization, and sharing did not change in this release.
Installation and interactive reception on physical Windows / Android /iPhone
The devices were not carried out in this run. Native checks of the past
The releases are described in [0.1.21](RELEASE_0_1_21.md).

English: ConsoleCrypt's current first-party client, server, shared libraries
and documentation use GNU AGPL-3.0-only. Third-party licenses and historical
License grants remain unchanged. All462 Flutter tests and 61 shared Rust
tests passed. The installer versions and full AGPL license text were
verified and all seven public release files were downloaded and checked
against SHA-256. Physical-device installation and interactive acceptance
were not performed in this release verification.
