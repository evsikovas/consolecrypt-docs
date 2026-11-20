# ConsoleCrypt 0.1.21 · Installers and guides

Translated reference · [Russian source](../RELEASE_0_1_21.md)

Date: October 1, 2026. Verified code: tag `v0.1.21`.
commit `f9d9094e44d5118d4d8938b68eac55bb5ea7228b`.
All packets use a true Rust core `CC_MOCK=false`.

| Platform | Package | Version inside the package |
|---|---|---|
| Windows 10/11 x64 | EXE carried by ZIP | 0.1.21+1237 |
| macOS Apple Silicon and Intel | Universal DMG | 0.1.21+1238 |
| Android 11+ ARM64 | APK | 0.1.21+51 |
| iOS Simulator on Mac | ZIP in two parts | 0.1.21+52 |

The release updates the installers after the shared access check is completed and
iOS. Application behavior corresponds to verified 0.1.20; new numbers
assemblies are present in About and native metadata. The site received
[руководство на русском и английском со снимками интерфейса](https://consolecrypt.evsikov.net/guide).
It explains the first start-up, storage, connection of devices, SSH / SFTP.
Snippets, AI, groups, tunnels, sharing, backups and updates.
The manual contains 26 chapters and 54 snapshots; the site has passed 19 automatic
One optional live API check was missed. Deployment
site separate from API completed; 83 public routes/assets verified
language switching, search, display on the phone and immutability of the API.
Images show real widgets with demo data and hidden ones
Secrets; these are not snapshots of user storage.

## Checks.

- GitLab pipeline164: Windows job1237 and macOS job1238 successfully completed
  **461 Flutter test** and **6 version checks** each, then packed.
- macOS: DMG integrity and deep/strict codesign pass; Runner, Flutter,
  App and Rust frameworks contain ARM64 and Intel slices; link Applications
  It's present. Windows: CRC portable ZIP, present Rust DLL and
  The native version of EXE has been verified.
- Android: versionName0.1.21/code51, the signature is the same as the previous APK,
  zipalign16KB and ELF mapping/RELRO are all three native libraries.
- iOS52: CRC, version, SHA-256 and ARM64/Intel Simulator slices checked
  The package is installed and run in a separate Simulator. After the inspection, temporary
  Simulator removed, user saved.
- Main Rust and server code remain unchanged: 0.1.20 checks remain
  634 Rust, 61 shared, 12 real-backend sharing, 166 real-PG server
  and two iOS native regression checks. [Подробная приёмка](RELEASE_0_1_20.md)
- Local packaging Android now atomically replaces latest APK; two
  The regression test checks for the hardlinked old release and
  Save the previous latest when copying fails.

## Installation and limits of verification

[Релиз, установщики и SHA256SUMS](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.21).
Update server already publishes signed feed0.1.21: Windows1237, macOS1238
and Android51. The signature Ed25519 is verified by the client’s public trust anchor.
The dimensions and SHA-256 match the anonymously downloaded release files.
For iOS, download both parts of ZIP and combine them by [инструкции](BUILD_IOS.md).
It’s a build for the Simulator, not an installation IPA for the phone. Face ID,
On-screen keyboard, network, and background on a real iPhone require
Connected device and signature via Apple Account/Personal Team.

Windows EXE and Android APK were not mounted overhead in this run.
user applications. Checking on problematic Windows10 computers and
The physical Android remains a separate admission. Preliminary packages:
Windows without Authenticode, macOS without Apple notarization, Android with previous
with a development signature. Before updating, save an encrypted backup
copy and recovery kit.

Collaboration capabilities are included by the server operator separately from
client's publication. Personal VRK is not shared; shared by selected
objects and verified devices. Review does not delete previously read copies
and does not change SSH credentials on the target host. [Руководство](SHARING.md)

English: verified Windows, macOS and Android installers plus an iOS Simulator
preview. The bilingual illustrated guide covers the complete workflow.
Windows / macOS CI each passed all461 Flutter tests before packaging, iOS52
was installed and started in Simulator; physical iPhone signing and acceptance
remain separate. Sharing availability is controlled by the selected server.
