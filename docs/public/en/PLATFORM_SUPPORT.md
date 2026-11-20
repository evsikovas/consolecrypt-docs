# Support for platforms ConsoleCrypt 1.0.0

Translated reference · [Russian source](../PLATFORM_SUPPORT.md)

The core data and operating functions use a common Flutter/Rust core.
System capabilities depend on the OS, and a successful build does not replace verification.
A real fingerprint scanner or USB key. Below is the actual set of release.

| Opportunity | Windows | macOS | Linux | Android | iOS Simulator |
| --- | --- | --- | --- | --- | --- |
| SSH, SFTP, RDP, database connections | Yes. | Yes. | Yes. | Yes. | Provisional port |
| Kubernetes and Docker via SSH | Yes. | Yes. | Yes. | Yes. | Provisional port |
| Local terminals and Docker on this computer | Yes. | Yes. | Yes. | No. | No. |
| KDBX 3/4, password/key file, folders, records, generator | Yes. | Yes. | Yes. | Yes. | Yes. |
| WebDAV and auto-save KDBX | Yes. | Yes. | Yes. | Yes. | Yes. |
| Finding passwords in the palette and clearing the buffer | Yes. | Yes. | Yes. | Yes, screen button/keyboard | Yes. |
| Menu records and transfer between folders | PCM, drag and drop | PCM, drag and drop | PCM, drag and drop | Menu button/long press | Menu button/long press |
| Local KDBX | File editing | File editing | File editing | Imports to the application + exports | Imports to the application + exports |
| Biometrics/PIN for KDBX | Windows Hello | Secure Enclave System Protection | Not yet implemented | Android Keystore + system request | Depends on the capabilities of Simulator; password is always available |
| FIDO2/PRF for KDBX and storage | Yes. | Yes. | Not yet. | Not yet. | No. |
| AI through customized API/Ollama | Yes. | Yes. | Yes. | Yes. | Yes. |
| Installation of built-in local AI | Yes. | Yes. | Yes, CPU x64. | Not yet. | No. |
| Save passes Docker / Kubernetes | Yes. | Yes. | Yes. | Yes. | Yes. |
| Encrypted synchronization, commands, notes, shared access | Yes. | Yes. | Yes. | Yes. | Provisional port |

## Release files

- Windows x64: EXE installer and portable ZIP.
- macOS Apple Silicon/Intel: Universal DMG.
- Linux x64: DEB and RPM; desktop environment with Secret Service.
- Android ARM64: signed by APK, Android 11+.
- iOS: Universal ZIP applications for Simulator on Mac, iOS 15+.
  It’s not an IPA, TestFlight, or a physical iPhone app.

For each package, the build version/number and SHA-256 are published. iOS Simulator
included in the mandatory CI of issue 1.0.0: the absence of its archive blocks the publication.

## Storage and synchronization of passwords

The selected local file is edited on computers. Phone systems.
The picker can return a temporary copy, so ConsoleCrypt imports it.
encrypted KDBX in its permanent private storage. Auto-saving changes
This copy; "Save local copy" uploads it through the system dialog.
The original document of the phone is not spontaneously overwritten.

WebDAV works the same on all platforms: HTTPS URL with a final `.kdbx`.
Protection against conflict versions, automatic saving, cancellation of opening and timeouts.
Parameters WebDAV are synchronized internally E2EE, the password is a separate secret.
Local paths, biometric envelopes and stored Docker / Kubernetes -passages
They're not synchronized.
