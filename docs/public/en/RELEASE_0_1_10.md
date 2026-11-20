# ConsoleCrypt 0.1.10 · Issue check

Translated reference · [Russian source](../RELEASE_0_1_10.md)

Date: September 30, 2026. Source is an immutable tag `v0.1.10`.
The client uses a real Rust bridge; `CC_MOCK` is not enabled.

| Platform | Package | Assembly number |
|---|---|---|
| Windows 10/11 x64 | EXE and portable ZIP | 1208 |
| macOS Intel/Apple Silicon | Universal DMG | 1209 |
| Android 11+ ARM64 | APK | 22 |

Reconnecting native TextInput when the terminal is activated
Focus only the visible tab and transfer the focus to the Flutter child window at Windows.
Text input remains via IME; UTF-8 Cyrillic is transmitted without conversion
In the keyboard layout. The hidden tab and confirmation window do not intercept the input.

Windows and macOS built project GitLab runners (pipeline150, jobs1208/1209).
`flutter analyze`, all 393 Flutter tests and 6 Versioning tests passed
on both hosts. Regression checks one click after losing focus.
`Привет, ёж!`, IME composition, tab switching, Enter and Ctrl+C.
Windows service finds installed tools; missing Flutter, Perl
Inno Setup is taken from official releases with commit/SHA-256 verification.

Checksums of downloaded DMG/EXE/ZIP matched CI artifacts. ZIP's gone.
CRC verification and contains EXE, Rust Bridge, Flutter, ICU and DLL Visual C++.
DMG passed `hdiutil verify`; inside version 0.1.10, build1209, architecture
x86_64 and arm64, reference Applications and validation `codesign --verify`.
The application on this Mac did not start during the check.

The APK is made from the same public tree with the new build22. Verified package
`io.consolecrypt.consolecrypt`, versionName0.1.10, versionCode22, signature,
`zipalign -P 16` and 16KiB ELF layout of all three native libraries.
The signature certificate is the same as the previous APK, so the update is compatible.

Native keyboard check on two specific Windows10 problem computers
It remains a user acceptance test: this machine has no worker.
table. After the update, check to switch from another application to the terminal.
entering Russian and English layout, text selection, switching SSH - tabs
Return to focus after the dialogue closes. It is not possible to consider imitation of IME in
Autotest complete physical keyboard check of each computer.

Packages are intended for pre-testing. Windows unsigned
Publisher, macOS without notarization by Apple, APK uses a development certificate.
The current APK didn't run on a physical phone in this run.

The server 0.1.9 / protocol 1.5 and the site have separate versions. Changing the client
No need to reassemble the server. The site is placed in a separate `consolecrypt-site`.

[Релиз и SHA-256](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.10).
