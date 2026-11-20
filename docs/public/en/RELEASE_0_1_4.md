# ConsoleCrypt 0.1.4 - inspection macOS and Android

Translated reference · [Russian source](../RELEASE_0_1_4.md)

Date: 2026-09-28. Windows 0.1.4+13 previously published;
Its EXE, ZIP and tag `v0.1.4` have not changed.

## Source and assemblies

The client base is `e20d11c9d2ad17d22f3304bd3b5932cd951e565a` `v0.1.4`.
It is integrated with the site in commit `86b8025`; the client is modified during assembly.
Only synchronized numbers in pubspec.yaml/app_info.dart. First done.
`bash client/scripts/build-macos.sh --no-cli` → **0.1.4+14**, then
`bash client/scripts/build-android.sh` → **0.1.4+15**. The meter didn't reset.

- Flutter 3.47.5 / Dart 3.13.4, Rust 1.98.1, Xcode 27.
- Android SDK 36, NDK 28.2.13676358, Java 21.
- macOS universal: arm64 + x86_64, the present cc_bridge.framework.
- Android: min API 30 Android 11), ARM64, real libcc_bridge.so, CC_MOCK = false.

## Finished.

- `flutter analyze`: no comment; `flutter test`: **391 passed** on macOS.
- Python Packaging Tests: **18 tests, OK (1 skipped)**
- DMG: built-in 0.1.4/14; universal executable and Rust framework
  `codesign --verify --deep --strict`, `hdiutil verify`; read-only mount,
  Applications and Applications symlink are available.
- APK: embedded 0.1.4/15, ARM64/API30; `apksigner verify`
  `zipalign -P 16` and 16 KiB ELF layout for all three native libraries.
  The SHA-256 certificate is the same as the previous APK 0.1.2+7.
- Public downloads verified with SHA-256 local DMG/APK; existing
  Checksums Windows of the files are saved from the original release.

## Boundaries of verification

macOS ad-hoc signed, without Apple notarization; a new Keychain request is possible
updates. Android is signed with the same test key; Windows without Authenticode.
New native apps on Mac/phone not running; SSH, AI, synchronization
These two new packages were not manually checked. Inspections Windows described
separately and are not issued here for re-executed on a Mac.

## SHA-256

```
f309b5e447cf54c5948b486678cb64d0959d9d36acbb2a50961f254abbc9de95  ConsoleCrypt-0.1.4+13-windows-x64-setup.exe
96f461f32576e3e9da183c25cfdccdb756c75168783887dff88daae3b87ef515  ConsoleCrypt-0.1.4+13-windows-x64-portable.zip
4c81f987c009a8c6986f4529fded817e06074e9ff79ca98b76539dd36ee2f108  ConsoleCrypt-0.1.4+14-macos-universal.dmg
effc8f17896fb85ad8cfdd6066d8afeb28b97313f3e533c69a3c26e9c1a08516  ConsoleCrypt-0.1.4+15-android-arm64.apk
```

Updated to 0.1.5 (Helm revision 6); API/readiness and download versions
verified on a live server, Russian and English signatures - in the browser.
After the checks, 6.2 GB of temporary Flutter build files were deleted; packets are saved.
