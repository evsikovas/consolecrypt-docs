# Assembly ConsoleCrypt for iOS

Translated reference · [Russian source](../BUILD_IOS.md)

iOS is currently a pre-harbour. Flutter uses a common Rust core.
Native SSH, SQLCipher and secure Keychain. Minimum version of the project -
iOS 15. The desktop mechanism for downloading and installing updates on iOS is disabled.

## Requirements

- macOS with a complete Xcode installation selected through `xcode-select` and iOS SDK;
- installed in Xcode Simulator runtime;
- Flutter, CocoaPods, Rust/rustup and Python 3
- assembly tools from [общего руководства](BUILDING.md).

Do not run Flutter tests or another native build at the same time in the same
checkout. They use shared generated files. Private signing keys,
provisioning profiles and personal team settings are not added to Git.

## Simulator without Apple Account

From the root repository:

```sh
client/scripts/build-ios.sh --simulator
```

The script installs Rust targets for ARM64 and Intel Simulator, reserves
A new build number compiles the real kernel and checks the versions in `Info.plist`.
The results are in `dist/ios/`: ZIP with `Runner.app`, SHA-256 and file version.
A failed attempt also consumes the number; do not reduce the meter manually.

Run the desired Simulator in Xcode. For the application collected by this script:

```sh
xcrun simctl install booted client/flutter/build/ios/iphonesimulator/Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

For multiple Simulators, instead of `booted` specify the UDID of the desired device.
For ZIP, first check for SHA-256, then unpack `Runner.app` and install
by his same team. This ZIP is not an IPA to install on an iPhone.

### Finished archive from release 1.0.0

[Скачать Simulator ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.0.0/ConsoleCrypt-1.0.0%2B61015-ios-simulator-universal.zip) of [релиза 1.0.0](https://github.com/evsikovas/consolecrypt-client/releases/tag/v1.0.0).
Version **1.0.0+61015**, size **246,829,118 bytes**.

Check the SHA-256 file before unpacking:

```sh
shasum -a 256 "ConsoleCrypt-1.0.0+61015-ios-simulator-universal.zip"
```

Expected SHA-256: `c3663727b184e9d560ef75cb58e61c8cf9f53dde95da81a19f7f16e474a80c0d` After the match:

```sh
unzip "ConsoleCrypt-1.0.0+61015-ios-simulator-universal.zip"
xcrun simctl install booted Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

Run the Simulator in Xcode in advance; replace it with multiple devices
`booted` to the desired UDID. The archive is not installed on a physical iPhone.

### Historical Archives from release 0.5.6

In [релизе v0.5.6](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.6)
Download [полный Simulator ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23015-ios-simulator-universal.zip)
and [SHA256SUMS-0.5.6.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/SHA256SUMS-0.5.6.txt).
Save both files in one folder. ZIP published in its entirety; combining parts
It's no longer necessary. Assembly - **0.5.6+23015**, size - **154 939 478 bytes**.

At Terminal, go to this folder and check the archive:

```sh
awk '$2 == "ConsoleCrypt-0.5.6+23015-ios-simulator-universal.zip" { print; n++ } \
     END { if (n != 1) exit 1 }' SHA256SUMS-0.5.6.txt > ios.SHA256SUMS \
    && shasum -a 256 -c ios.SHA256SUMS
```

Continue only after the result `OK` Expected SHA-256:
`6394d2c15d6fd28ab58e1b28638dd75bb751dc3e487212ee90e44b001f5b1264`.

```sh
unzip ConsoleCrypt-0.5.6+23015-ios-simulator-universal.zip
xcrun simctl install booted Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

Before installing, run the desired Simulator in Xcode. If there are a few
Simulator, replace `booted` with the UDID of the selected device. This ZIP is designed for
for Simulator and is not an IPA for installation on a physical iPhone.

For the native smoke test, select UDID from `flutter devices`:

```sh
cd client/flutter
flutter test integration_test/ios_core_test.dart -d <SIMULATOR_UDID> \
  --dart-define=CC_MOCK=false
```

Before such a native test build, also reserve a number from the root:
`python3 client/scripts/bump-version.py`. The inspection uses a separate
Private test storage and does not require credentials from a public server.

## GitHub Actions and iOS Simulator

In workflow `Client tag release`, workflow `ios` starts after source check
on the allocated `cc-macos-arm64`, regardless of the job macOS. Setting up
`MACOS_BUILD_RUNNER` changes only the job macOS. Job iOS launches
`ci-ios.sh --build-only`, installs and opens the preview in a separate Simulator.
Actions artifact contains **complete Simulator ZIP**, its SHA-256 and the version file.
The shelf life is 30 days. After successful validation of all job platforms `publish`
Version receipts are verified and seven packages are automatically published.
Checksums in GitHub Release. Push threads by themselves release does not run.
[Раннеры и номера сборок](GITHUB_ACTIONS.md).

Verified issue **0.5.6+23015** collected October 20, 2026 (UTC):
[iOS job](https://github.com/evsikovas/consolecrypt-client/actions/runs/39377995191/job/118489659918)
completed successfully; log confirms installation and launch
`io.consolecrypt.consolecrypt` with a PID.

In GitHub Actions, `Client tag release` runs `ios` after the hosted source gate,
independently of the macOS job, on the dedicated Mac runner. It uploads.
the complete Simulator ZIP, checksum and version receipt. After all, platforms
pass, the publisher checks the receipts and publishes the release automatically.
The artifact and released ZIP are for Simulator, not installable iPhone IPAs.

## SSH / SFTP regression and former GitLab CI

### Historic GitLab artifact: receipts only

In the previous GitLab CI, starting from 0.3, the full Simulator ZIP was saved on the Mac.
runner **out checkout **:
`$HOME/.cache/consolecrypt/ios-preview/<полный source SHA>/<job ID>/`.
The directory has rights `0700` and ZIP `0600`. The next cleaning of the source does not remove
This archive. Save checks native bundle ID/job ID, CRC and SHA-256
It is not a separate check of the application on the iPhone.

The historical **GitLab CI artifact** contains only three small files:
`ConsoleCrypt-ios-preview.json`, `SHA256SUMS-ios-preview.txt` and
`README-ios-preview.txt`. It doesn't have an app. Get a full ZIP from the owner
Mac runner and check SHA-256 from the receipt before unpacking. If the job is over
error after saving, the receipt does not mean a successful launch verification.

GitLab sent all artifact paths in one archive. Separation of ZIP into parts
inside the same artifact did not reduce the total size of the request and did not solve the error.
`413 Request Entity Too Large`, so that CI kept only receipts.
Current GitHub artifact and release contain full ZIP. Local.
`build-ios.sh --simulator` also provides a complete archive in `dist/ios/`.

The historical GitLab iOS preview **artifact contains metadata/checksums only**, not the app.
The full ZIP is retained privately on the macOS runner, outside its checkout,
under `$HOME/.cache/consolecrypt/ios-preview/<source SHA>/<job ID>/` . Obtain it.
from the runner owner and verify the recorded SHA-256 before extracting it.
Split files within one CI artifact does not avoid its aggregate upload
limit. Public release downloads are a separate reviewed publication; these
Previews are for Simulator and are not installable iPhone IPAs.

For a full Simulator test, you need to run Docker. From the root:

```sh
client/scripts/ci-ios.sh --test-only
```

The script creates a separate temporary iPhone Simulator from the installed runtime
And it reserves the number of one native test build. This launch includes a test.
storage and real SSH / SFTP through the OpenSSH container. Password and host keys
They're created at launch. Password is transmitted only through the temporary endpoint to
localhost, is not written in source, command argument, or `DART_DEFINES`.
The container and the created Simulator are removed even in case of an error. It's open.
The user Simulator and the application installed in it are not replaced.

The test checks UTF-8/Cyrillic when entering and pasting, highlighting/copying,
Switching two tabs, returning Flutter from background, loss and recovery
SSH and transfer a file with a Cyrillic name by SFTP. Test injects events
Flutter TextInput and lifecycle; this is not a validation of a real on-screen keyboard
or suspend the application by the operating system on the iPhone.

For a separate verified Simulator build:

```sh
client/scripts/ci-ios.sh --build-only
```

This launch compiles the product, installs and runs it in its own
Time Simulator. The archive, SHA-256, and version remain in `dist/ios`.

File `client/ci/ios.yml` is saved for previous manual GitLab checks.
Its branch rules and small preview receipts are not an ongoing process.
release. Issues are collected by tagging in GitHub Actions as described above.
Local `--test-only` and `--build-only` remain separate modes.
Apple Signing Secrets is not required for Simulator.

## A real iPhone.

```sh
client/scripts/build-ios.sh --device
```

The result is an unsigned ARM64 development bundle. He checks the compilation.
It is not installed on the phone as a regular app. For installation
Open `client/flutter/ios/Runner.xcworkspace` in Xcode, select your phone.
Set up Signing & Capabilities with your Apple Account/Personal Team
Turn on Developer Mode on your phone and run Runner from Xcode. If necessary,
Choose a unique bundle identifier for your team.

Signature and Distribution Availability Rules are defined by Apple:
[настройка iOS в Flutter](https://docs.flutter.dev/platform-integration/ios/setup),
[Apple Developer account](https://developer.apple.com/help/account/basics/about-your-developer-account).
TestFlight/App Store requires an Apple program; Simulator
does not confirm the readiness to publish in the store.

## What has already been verified and what remains

The previously completed full native run `0.1.20+47` on the Simulator passed both
Integration checks. The real Rust-kernel, creation of local
Profile, SQLCipher, host storage, saving Keychain after restarting the kernel,
unlocking the password phrase and locking the storage. SSH - Inspection includes
Cyrillic input and return via Flutter TextInput, highlighting/copying/
insert, two tabs, return of Flutter lifecycle, UTF-8 file by SFTP, loss
connection, buffer saving reconnection and reopening SFTP.
Closing the active tab after reconnecting is necessarily completed for
five seconds; the final clean-up went without timeouts. It's a separate test.
Build: Product ZIP is created by the next run `--build-only`.

The current archive is **0.5.6+23015**. CI checked the bundle ID and version.
I installed the application in a separate temporary Simulator and started the process.
I got a PID. Full ZIP published in one file; its size and SHA-256
Checked with GitHub asset digest and a common checksum file.
It is a check of the build, installation and start of the process, not a repeat of the complete process.
SSH / SFTP - run above. Visual Acceptance, RDP Work, and Real Device
This launch wasn't tested.

In the previous acceptance, the foundation of Rust was also checked by compilation for physical
ARM64 iPhone. Complete run above performed in Simulator and does not confirm
Installation or operation on a real phone.

On the physical device, you still need to check Face ID / Touch ID, lock
devices, on-screen terminal keyboard, SSH / SFTP over Wi-Fi and mobile network,
Return from background, import/export of documents and availability of the interface.
When the application leaves the background, the snapshot of the application switch is closed.
The port does not promise a universal ban on user screenshots on iOS.

Practical checklist for the phone after signing in Xcode:

1. Create a separate test local profile, set up a biometric
   Unblock, check for Face ID cancellation and return to password phrase.
2. Connect to your test host SSH. Enter Cyrillic, delete.
   Use Return and Ctrl+C. Check that one touch of the terminal
   enough to enter after changing the tab and returning to the application.
3. Copy the selection and paste the command. For insertion with line translation
   Confirm the warning; the cancellation should leave the team unfulfilled.
4. Turn the phone with the keyboard open and change the font size.
   Check the visibility of the active line, the service keyboard bar and the safe areas.
5. Transmit a file with a Cyrillic name through SFTP and download it back.
   And compare the contents. Reconnect to Wi-Fi and mobile network.
6. Lock the phone, open the app switch and come back.
   The application image should not reveal the terminal/storage. Separately.
   Check the set lock timer and re-unblock.
7. Turn off the network, return it and restore it SSH / SFTP. Check that.
   The stored host key does not require re-acceptance, but a change of the key
   blocking the connection.
8. Check the import/export of encrypted backup, VoiceOver,
   Increased system text and mode of movement reduction.

The Simulator result does not replace this checklist. Don't publish the real ones.
Passwords, private SSH - keys or contents of the work terminal in the report.
