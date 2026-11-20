# ConsoleCrypt 0.2.1

Translated reference · [Russian source](../RELEASE_0_2_1.md)

The large terminal output stream is now processed in portions so that the interface returns to input and rendering more often. Corrected processing errors of damaged ANSI colors; static layers of the glass interface are less redrawn.

[Скачать клиент](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) · [Своя установка сервера](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.1/docs/public/HOSTING.md)

## What has changed?

- **Terminal:** Gradual decoding of UTF-8, limited output processing portions, safe handling of long control sequences and incorrect colors. Unicode support and highlights are saved.
- ** Interface:** Reuse of background filters and insulation of static surfaces from redrawing of contents. More uniform background due to the texture of the noise.
- **Secrets and AI:** Late answers and secrets don’t move to another profile; blocking clears the state of the conversations. Copying the secret to Android and iOS requires a protected native channel with TTL. If it is not available, the copy is rejected.
- ** SSH and SFTP:** Stop SSH -agent revokes access to keys, including pending signature confirmation. Closure SFTP of the manager cancels the waiting selection of the editor and clears working copies. Verification of the arguments of jump hosts has been strengthened.
- **AI Network Responses:** Response sizes and streaming events are limited, cancellation does not wait for the release of a filled interface queue.
- **Public Server:** Shared access, groups, secrets and confirmed device additions are available. The transfer takes place by explicit action of the owner; the storage data remains encrypted on the server.

## Assemblies

| Platform | Assembly | File. |
|---|---|---|
| Windows x64 | 0.2.1+1280 | EXE installer or portable ZIP |
| macOS Intel/Apple Silicon | 0.2.1+1281 | Universal DMG |
| Android ARM64 | 0.2.1+61 | APK |
| iOS Simulator Intel / Apple Silicon | 0.2.1+62 | ZIP, two parts `.001` / `.002` |

All files are available below in **Assets**. `SHA256SUMS-0.2.1.txt` contains checksums of each file and collected iOS ZIP. Windows and macOS are collected in [CI №197](https://git.evsikov.net/publics/consolecrypt/-/pipelines/197) from a commit `e37af672`; Android and iOS from the same source with separate assembly numbers.

For iOS Simulator, download both parts to the same folder on your Mac:

```sh
cat ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip -d consolecrypt-ios
```

Launch order - in [инструкции iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). This build for the Simulator is not installed on the iPhone IPA.

## Checks and limitations

Flutter: **559 tests**, analysis without comment. Client Rust: **653 tests**, **7 clearly marked passes**, Clippy without warning. Versions, architectures, archive integrity, full licenses and checksums of native packages are verified; iOS is run in a separate Simulator.

The reduction in latency is confirmed by synthetic measurements on the Mac. Behavior on physical Windows machines where hovering and gradient bands have been reported requires re-checking by users. These are early builds: Windows without Authenticode, macOS with the previous local signature without notarization by Apple, Android with a saved preview signature.

When testing for dependencies, a known warning `RUSTSEC-2023-0071` remains for RSA. The corrected version is not yet available; the decryption path of PKCS#1 with an externally accessible oracle in the verified code has not been detected. This is not a promise of not having all the vulnerabilities.

License of proprietary components: **AGPL-3.0-only** Third-party components retain their licenses; MIT notifications for the terminal component are included in packets.

---
