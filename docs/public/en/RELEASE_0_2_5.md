<p align="center"> <img src="https://git.evsikov.net/publics/consolecrypt/-/raw/v0.2.5/docs/brand/consolecrypt.svg" width="480" alt="ConsoleCrypt"> </p>

# ConsoleCrypt 0.2.5 · Now and on Linux

Translated reference · [Russian source](../RELEASE_0_2_5.md)

Workspace ConsoleCrypt is available at Linux: Terminal SSH, SFTP.
Hosts and groups, snippets, AI assistant and encrypted collaboration.
The new **DEB and RPM* packages are installed through a regular program manager.

## What's new?

- Native client ** Linux x86-64** with a real Rust core, icon and application menu item.
- The storage keys are protected by the system **Secret Service**. The client uses the existing unlocked keyboard and does not keep the keys open if it is not available.
- Installation via `apt` or `dnf` automatically receives the required graphics libraries.
- Settings Linux specify the address of new packets; the update is performed by the packet manager, without the signed tape and automatic installation.
- In SFTP you can select the file editor installed in Linux.
- The GitLab build verifies the true Rust bridge and storage creation through the interface, host saving, restarting and unlocking before packing.

## Download

| Platform | Assembly | Files. |
|---|---|---|
| Linux x86-64 · Debian/Ubuntu | 0.2.5+1358 | [DEB](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1358-linux-x64.deb) |
| Linux x86-64 · Fedora | 0.2.5+1358 | [RPM](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1358-linux-x64.rpm) |
| Windows 10/11 · x64 | 0.2.5+1353 | [Установщик EXE](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1353-windows-x64-setup.exe) · [Portable ZIP](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1353-windows-x64-portable.zip) |
| macOS 12+ · Apple Silicon and Intel | 0.2.5+1354 | [Универсальный DMG](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1354-macos-universal.dmg) |
| Android 11+ · ARM64 | 0.2.5+75 | [APK](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B75-android-arm64.apk) |
| iOS Simulator · Mac, ARM64/x86-64 | 0.2.5+76 | [ZIP, часть 1](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B76-ios-simulator-universal.zip.001) · [Часть 2](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B76-ios-simulator-universal.zip.002) |

[SHA-256 всех файлов](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/SHA256SUMS-0.2.5.txt)
[Сайт и загрузка](https://consolecrypt.evsikov.net/download?lang=ru)
[Руководство](https://consolecrypt.evsikov.net/guide?lang=ru)
[Установка Linux и сборка из исходников](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.5/docs/public/BUILD_LINUX.md)

## Install Linux

Need a graphical desktop, current session D-Bus and unlocked main
Secret Service keyboard, such as GNOME Keyring. Start a client from your own.
without the user `sudo`.

```sh
# Debian / Ubuntu
sudo apt install ./ConsoleCrypt-0.2.5+1358-linux-x64.deb

# Fedora
sudo dnf install ./ConsoleCrypt-0.2.5+1358-linux-x64.rpm

consolecrypt
```

To update, download the new package and repeat the installation command. Installator
and deleting the application does not clean the home directory and keyboard. Restart and
unlocking this test storage is checked separately through the interface.

## Issuance checks

Sources of release: `96fc23fb5426dbee5efb75855d837cfc29f6ad66`.

| Platform | Origin and confirmed verification |
|---|---|
| Linux +1358 | [build-linux 1358](https://git.evsikov.net/publics/consolecrypt/-/jobs/1358), release source; Ubuntu 22.04, real Rust bridge 2/2 and UI 1/1 with Secret Service, restart and unlock |
| Windows +1353 | [build-windows 1353](https://git.evsikov.net/publics/consolecrypt/-/jobs/1353), `41323da718694fb56a6868abba65c6fc1a3e91fb`; integrity of ZIP, SHA-256, x64 DLL/CRT and EXE versions; installer not running |
| macOS +1354 | [build-macos 1354](https://git.evsikov.net/publics/consolecrypt/-/jobs/1354), `41323da718694fb56a6868abba65c6fc1a3e91fb`; DMG, SHA-256, strict signature, universal ARM64/x86-64 and sandbox entitlement; application not running |
| Android +75 | Local native build; ARM64 APK, former signature, ZIP/ELF alignment 16 KiB and SHA-256 verified; physical phone not checked |
| iOS Simulator +76 | Local native build; ARM64/x86-64 ZIP, signature, SHA-256 and recovery from parts tested; separate temporary Simulator showed welcome screen, physical iPhone not checked |

[Pipeline 224](https://git.evsikov.net/publics/consolecrypt/-/pipelines/224)
**FAILED* was generally terminated due to the previous Linux assignment 1352.
Windows 1353 and macOS 1354 passed separately; corrected Linux - assembly 1358
It was 1352 instead. Between their pictures and the final source only changed.
Linux CI/packaging, tests and assembly metadata. Application code Windows / macOS
It's still the same. Android / iOS collected locally: from an immutable check record
confirmed the match of the supplied code with the public final image.
The comparison excludes the metadata of individual assemblies and the integration test.
not included in the application; it is not a statement about the build from an exact tag.
Files Windows / macOS / Android / iOS saved
changes Linux CI did not require their reassembly.

Ready-made DEB/RPM **+1358** separately installed and run in isolated
Debian 12 and Fedora 43 with X11 and software rendering. Automatically tested
installation of graphical dependencies through `apt` / `dnf`, update
`0.2.5-79 → 0.2.5-1358`, deletion/reinstallation, four native libraries,
Licenses and welcome screen. Update/delete safety checked
only on synthetic markers of its own HOME/key; this is not a test
migration of the current user storage. CI checks separately
Preserving and restoring this test encrypted storage.

In all packages, the full text of the AGPL and the stored MIT license xterm are checked.
Physical GPUs, Wayland, Linux ARM64, RHEL, and Flatpak/AppImage are not included.
A confirmed matrix. Linux is updated manually by packets;
There is no auto-update Linux. This is a pre-issue: macOS without notarization
Apple, Windows without Authenticode, APK with previous test signature.
The known addiction warning for RSA `RUSTSEC-2023-0071` remains open.

** macOS :** if the copy downloaded by the old update button does not open,
Download DMG through your browser once, complete ConsoleCrypt, replace the copy
Into Applications and run it. Reloading the old button can be
Maintain the launch ban. The following updates use system dialog
"Save and open." Profiles, storage and Keychain need not be deleted;
Protection macOS remains on. [Подробнее](UPDATES.md)

The storage remains encrypted on the device. You can work locally.
Connect your sync server or select a public server
`https://consolecrypt.evsikov.net`. SSH goes directly to your hosts.

---

**English:** ConsoleCrypt now supports Linux x86-64 with DEB and RPM packages,
native Rust SSH / SFTP, encrypted workspaces and team sharing. Install with
`sudo apt install ./ConsoleCrypt-0.2.5+1358-linux-x64.deb` or
`sudo dnf install ./ConsoleCrypt-0.2.5+1358-linux-x64.rpm`, then run `consolecrypt`
as your regular desktop user. An existing unlocked persistent secret service
keyring is required. Linux updates use the package manager. Download links
for every platform and SHA-256 checksums are listed above. Linux has no signed
in-app updater feed or automatic package installation. Debian 12 and Fedora 43
installation package, upgrade and software-X11 welcome-screen launch passed;
marker preservation is limited to synthetic HOME/keyring fixtures, not a real
user-vault migration. Physical GPU/Wayland and physical Windows /mobile-device
acceptance are not claimed. Pipeline 224 failed on the superseded Linux job
Windows 1353 and macOS 1354 passed separately, followed by successful Linux 1358.
Their shipping runtime matches the final source despite later CI/test changes.
Android / iOS were built locally; an immutable comparison confirmed shipping code
equivalence with the public final source, excluding per-build metadata and a
Non-shipping integration test. They are not claimed to have been built from the exact tag.
If an old macOS downloader produced an app that cannot launch, download the DMG
once through your browser and replace the app in Applications; keep the vault
and Keychain. Subsequent updates use the system Save and open dialog.

*Alexander Evsikov * [i@evsikov.net](mailto:i@evsikov.net) *
[GNU AGPL-3.0-only](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.5/LICENSE).
Third-party components retain their own licenses.
