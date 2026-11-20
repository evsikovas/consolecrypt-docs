# Android: publication ConsoleCrypt in RuStore

Translated reference · [Russian source](../ANDROID_RUSTORE.md)

The application saves the identifier `io.consolecrypt.consolecrypt` and the main set
functions Android. Integration with payments, Push SDK and other SDKs RuStore
publication is not required: the application is free, the update is performed by the store itself.

## Two variants Android

| Option | Team Flutter. | Updates |
|---|---|---|
| `direct` | `flutter build apk --release --flavor direct --target-platform android-arm64` | Subscribed tape ConsoleCrypt and APK system installer |
| `rustore` | `flutter build appbundle --release --flavor rustore --target-platform android-arm64` | Only RuStore |

In `rustore` there is no resolution `REQUEST_INSTALL_PACKAGES` and FileProvider
Built-in update. Android - the installation channel is further blocked;
Tape check, APK download, and installer start are disabled in Dart.
In the settings remains the button to open the application card in RuStore.
The other platforms and the channel `direct` remain the same.

In the corrected build of the store also removed added CameraX permissions
`RECORD_AUDIO`, `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`. We need a camera.
For local scanning of the QR recovery code, the sound is turned off. Files KDBX.
Backups and user documents are selected through system dialog
Android with access to the selected URI. Checking the ready-made APK and AAB prohibits all
Four extra permissions, including built-in packet installation.

Commands Android now require explicit `--flavor direct` or `--flavor rustore`.
The script `client/scripts/build-android.sh` selects `direct` automatically.

## Signature of the first publication

Two permanent keys are used for AAB:

1. **Application key** signs APKs that the store will install to users.
   Its encrypted PEPK export is loaded at RuStore once.
2. **The download key** is signed by AAB. In RuStore it is uploaded to the public
   PEM certificate. The private download key remains with the developer.

In the "Application Signature → Download" section, select `pepk_out.zip` and
`upload_certificate.pem`. Then, in the "Versions" section, download the signed AAB.
Passwords, original JKS/PKCS12 and files `*-signing.properties` are not downloaded to the console.

Private keys and passwords must be stored in a separate protected backup.
Copies. They cannot be added to Git, public artifacts, screenshots or CI logs.
If you lose the application key, you can not just create a new one and continue the usual one.
Updating an already installed application.

The previous Android preview APKs were signed with the runner debugging key. New
The production key is different: a direct update over such an APK is not supported.
Before moving to the store, save a backup copy of the local storage,
Check the recovery password and save local KDBX files. Don't delete.
a single copy of the data to install a new signature.

## Local Assembly and Signature Configuration

Gradle reads the path from `CC_ANDROID_SIGNING_PROPERTIES`. File format:

```properties
storeFile=/absolute/private/path/consolecrypt-upload.jks
storePassword=PRIVATE_VALUE
keyAlias=consolecrypt-upload
keyPassword=PRIVATE_VALUE
```

For the release version `rustore`, the file is mandatory: automatic substitution
The debugging key is prohibited. For AAB, the download key is specified, for verification
APK is the application key.

The script `client/scripts/build-android-rustore.sh` uses two variables.
paths to such files: `CC_ANDROID_APP_SIGNING_PROPERTIES` and
`CC_ANDROID_UPLOAD_SIGNING_PROPERTIES`. He creates AAB and APK with one number.
version in the new folder `dist/android/rustore-<version>/`, without publication.
Requires the usual Android /Rust project environment, `ANDROID_HOME`, `JAVA_HOME`
and unique `CC_BUILD_NUMBER`, exceeding the previous Android downloads.

## GitHub Actions

Workflow ** Android RuStore packages** is called by the general release build and saves
APK/AAB-tested artifact `android-rustore`. Starting with 1.1.0, without it, it is common.
The release is not published. The usual Android APK and both RuStore packets receive one.
Android - assemblies, but use different update and signature channels.

For a separate check, workflow can be started manually from the branch `main`, specifying
`build_number`. Native code is collected from source code. General job postings place
APK/AAB в релиз GitHub после успеха всех платформ; сам RuStore workflow не
Sends files to the store. Download version and send to moderation are performed
c RuStore Console with an already registered signature key.

Required Repository Secrets:

- `ANDROID_APP_KEYSTORE_BASE64`: Base64 of the application key content.
- `ANDROID_APP_KEYSTORE_PASSWORD`: The password of this repository.
- `ANDROID_UPLOAD_KEYSTORE_BASE64`: Base64 of the contents of the download key.
- `ANDROID_UPLOAD_KEYSTORE_PASSWORD`: The password of this repository.

Optional `ANDROID_APP_KEY_ALIAS` and `ANDROID_UPLOAD_KEY_ALIAS` by default
equal `consolecrypt-app` and `consolecrypt-upload`. If key passwords are different
from the storage passwords, specify `ANDROID_APP_KEY_PASSWORD` and
`ANDROID_UPLOAD_KEY_PASSWORD`. Use the same runner labels and variables
`ANDROID_HOME` / `JAVA_HOME`, which is in the existing Android -assembly.

Keys are deployed to a private temporary folder runner; after the folder assignment
It's going away. Only the current APK/AAB folder and checksums fall into the artifact.

## Pre-loading checks

`client/scripts/verify-rustore.py` checks the final files, not just the original ones.
Manifestoes: Lack of Prohibited Permission and Debug Flag, Production Signature
APK, AAB download certificate, package ID and versionCode, Bundle structure,
Full ARM64 payload, licenses and ELF compatibility with 16 KB pages.
The official Google bundletool with a fixed SHA-256 is used for the check.

System and hardware functions retain the usual limitations Android:
Device-dependent biometrics; new FIDO2 and desktop minimalism in Android
It's not added. Preparation of the signature and verification of the assembly do not mean approval
Moderation or verification on each physical device.

Text for re-moderation:

Removed permission REQUEST_INSTALL_PACKAGES. In variant RuStore disabled
> Download APK and start the system installer from the application. Updates
> are performed through RuStore. The assembly is signed with the production key, debug mode is disabled.

Official instructions: [загрузка AAB](https://www.rustore.ru/help/developers/publishing-and-verifying-apps/app-publication/new-version-app/upload-aab)
[подписи APK/AAB](https://www.rustore.ru/help/developers/publishing-and-verifying-apps/app-publication/apk-signature).
