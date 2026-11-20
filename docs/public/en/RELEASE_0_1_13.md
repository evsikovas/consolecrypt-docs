# ConsoleCrypt 0.1.13 · Issue check

Translated reference · [Russian source](../RELEASE_0_1_13.md)

Date: September 30, 2026. Sources - tag `v0.1.13`, commit `4dd26f2`.
The actual Rust bridge is used; `CC_MOCK=false`.

| Platform | Packages. | Native version |
|---|---|---|
| Windows 10/11 x64 | EXE and portable ZIP | 0.1.13+1221 |
| macOS Apple Silicon and Intel | Universal DMG | 0.1.13+1222 |
| Android 11+ ARM64 | APK | 0.1.13+27 |

Fixed regression when Windows handled Enter, but not conventional characters.
Now the hardware keyboard event transfers the current layout Unicode; Flutter
Marks the event processed so that the OS text input does not duplicate the character.
IME-composition continues to use native TextInput. Regression test
reproduced the failure before the correction and passes after it: `ф`, `Я`, `ё`, space,
The usual Latin, key retention and Enter. Previous Focus Checks, Hidden
tabs, IME and Ctrl+C are saved. This is a test of Flutter's events, not proof.
The physical keyboard works on all Windows computers.

Added section "Updates": autocheck at launch, its disconnection, manual
Checking and downloading/starting the installer. Metadata signed Ed25519, HTTPS
Loads are limited to trusted addresses, and SHA-256 is checked prior to installation.
Checked incorrect signatures, key substitution, expiration date, kickback prohibition,
cropped/too large files, incorrect digest, redirected to someone else's
domain, save switch, repeat after error, Android permissions
round trip and cancellation of installation by the user.

GitLab pipeline155 / jobs1221,1222 successfully assembled Windows and macOS.
Static analysis and all 406 Flutter tests were performed on both runners.
ZIP passed the CRC; Windows version resource contains 0.1.13+1221.
DMG passed integrity check, `codesign --verify --deep --strict`
bundle version1222 and x86_64/arm64 architectures; there is Applications link inside.
APK contains versionName0.1.13/versionCode27, has passed signature verification.
`zipalign -P 16` and the ELF alignment of all three native libraries.
The APK certificate is the same as the previous version, so the installation on top is compatible.

Closed Update Publisher Deployed Regardless of API and Site
public Git. He reads releases every five minutes, checks the packages of everyone.
The platform and signs the feed. A Dart customer has verified the real Node signature.
The signature key is only available to the publisher; the web Pod does not receive it. Data data
Storages and accounts are not involved in checking updates.

Restrictions: Installation still requires acceptance checks on problematic Windows10
Computer and physical Android. Windows launches Inno installer and closes
client; Android requires system validation; macOS opens DMG
Replace the application by the user. Installators in this run did not start.
to replace existing applications. Packages remain preliminary:
Windows without Authenticode, macOS without Apple notarization, APK
Development certificate.

[Релиз и контрольные суммы](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.13)
· [Инструкция по обновлениям](UPDATES.md) .
