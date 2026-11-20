# Assembly and synchronization server

Translated reference · [Russian source](../BUILDING.md)

In all cases, clone the entire repository: Rust-client uses common
Library of `crates/`. Flutter SDK 3.47.x, Dart 3.13.4; Rust is fixed to
`rust-toolchain.toml`. Save `Cargo.lock`, `pubspec.lock` and `Podfile.lock`.

## Releases from GitHub

`main` contains current sources. Public installers are issued only when sent
a stable tag `vX.Y.Z` that matches the version in `pubspec.yaml`. Tag should
to point to a commission from history `main`. Push in the branch does not start the assembly. Manual start of workflow on current `main`
Checks all platforms and saves CI packages without publication and announcements. The old GitLab pipeline is offline.

Workflow `Client tag release` checks the tag, runs Windows, macOS, Android.
Linux and iOS Simulator, then publishes seven packets in one GitHub Release with SHA-256.
Starting with 1.0.0 iOS, the Simulator is a mandatory part of the release.
Windows uses GitHub -hosted `windows-2025`, Linux - `ubuntu-24.04`
Insulated Docker builder. Android and iOS use `cc-macos-arm64`
with full Xcode. For macOS, the same Mac is used by default.
variable `MACOS_BUILD_RUNNER` allows you to specify JSON-array of other labels, for example
`["macos-26"]` for prepared GitHub runner. Command Line Tools aren't enough.
SDK Android is defined by `ANDROID_HOME`, JDK by `JAVA_HOME` by repository
variables. The signature keys are stored on the corresponding runners.

After publication, the subscription of update feeds from `main` is separately started.
Daily workflow `Signed update feeds` extends signed meta-information
If necessary, it does not collect installers. Published versions of packages
Not replaced: Changes are issued with a new tag.

## macOS

Requires full Xcode with command tools, Flutter, Rust/rustup
CocoaPods and Python 3. Apple Silicon and Intel are merging into a one-stop package.
From the root repository:

```sh
client/scripts/build-macos.sh --no-cli
```

Result: `dist/macos/ConsoleCrypt.dmg`, application, ZIP and version file.
The image includes the Applications link and the installation background. Python Dependence on Packaging
They are placed in the local environment within `dist/`.
If you have a certificate, you can specify `CC_CODESIGN_IDENTITY` or `--sign-identity`.
A stable signature is required so that updates do not change the trust of the keychain.
Apple notarization is also required for public distribution with Gatekeeper.

## Android · ARM64

Pre-assembly for Android 11+ (API 30), ARM64:

- JDK 17;
- Android SDK platform 36, build-tools 36.0.0;
- NDK 28.2.13676358, CMake 3.22.1;
- Flutter and Rust; Python 3 for checking native libraries.

```sh
export ANDROID_HOME="$HOME/Library/Android/sdk"
client/scripts/build-android.sh
```

If you have a different SDK location, set your own `ANDROID_HOME`. Flutter recovers
Gradle wrapper in the preparation of the project Android. The script checks the APK signature,
ZIP alignment and alignment of native libraries for 16 KiB memory pages.
Result: `dist/android/ConsoleCrypt-android-arm64.apk`, SHA-256 and the exact version.

When building locally to upgrade an already installed APK, check the number.
assemblies: A published CI packet may have a number higher than the original `pubspec.yaml`.
Before starting, set `CC_BUILD_NUMBER` with an integer larger than the number set
package and original assembly number. Script will record it in metadata; same
A signature is also required. No `CC_BUILD_NUMBER` increases only the initial
So this APK can be older than the one installed.

The current configuration uses local **debug keystore** even in the release APK.
It's a test package. The private key is not included in Git. APKs collected at different locations
computers with different keys do not update each other on top of the installed version.
Before switching to another signature, save an encrypted backup copy.
For production distribution, you need a separate secure signature key and configuration
release signing; do not publish such a key in the repository.

On Android, the background constraints of the OS can interrupt the SSH session. SFTP uses
System selection of documents; integration with desktop editors is available on the computer.

## Windows

[Пошаговая инструкция и создание EXE-установщика](BUILD_WINDOWS.md).

## Linux · x86-64

[Установка DEB/RPM, системная ключница и сборка](BUILD_LINUX.md).

```sh
client/scripts/build-linux.sh
```

The result: two packets in `dist/linux/`, SHA-256 and the exact version.
Basic packet environment - Ubuntu 22.04 x86-64; installation checked in
Debian 12 and Fedora 43. You need a D-Bus graphics session to start and
Created unlocked main keyboard Secret Service. Update Linux
manually via `apt` / `dnf`; signed update tape and automatic
The installation Linux is not supported. The physical GPU and Wayland are untested.

## iOS Preliminary port

[Simulator, нативные проверки и подпись для iPhone](BUILD_IOS.md).
Simulator ZIP is designed for Xcode Simulator; installation on the phone requires
a separate signature in Xcode.

## Tests.

```sh
(cd crates && cargo test --locked)
(cd client/rust && cargo test --locked)
(cd client/flutter && flutter pub get && flutter analyze && flutter test)
python3 -m unittest discover -s client/scripts -p 'test_*.py'
```

Do not run Flutter tests at the same time as the native build: they update the common ones.
generated files. Bridge is already generated and included in the source code.
Normal build does not require the installation of flutter_rust_bridge_codegen.

## Dependency testing

`client/scripts/dependency-audit.py check` launches 'cargo deny check adviseries'
bans sources licenses ` для ` client/rust ` и ` crates`, checks the rule of own
crates and scans `pubspec.lock` (and npm lockfile if it appears) via
`osv-scanner`. Locally, you need the same versions as in CI:

```sh
cargo install --locked cargo-deny@0.20.2
go install github.com/google/osv-scanner/v2/cmd/osv-scanner@v2.6.0
python3 client/scripts/dependency-audit.py check
```

One check: `cargo deny --manifest-path client/rust/Cargo.toml --locked check
Advisories bans sources of licenses.

In CI, the step is performed only on GitHub-hosted `ubuntu-24.04`: in `validate` tag
release (failure to stop the assembly of packages) and in the weekly
`dependency-audit.yml`, which also checks pull request with modified
addictions. The weekly run opens or updates the issue "Vulnerable"
dependency" and closes it after a clean run. Tools are downloading from
GitHub Releases with SHA-256 check fixed in the script.

Politics `deny.toml`:

- Vulnerabilities and yanked versions are prohibited; unmaintained – direct
  dependencies of our crates;
- TLS rustls only: `native-tls` and `openssl` prohibited, `openssl-sys` allowed
  only as a backend of SQLCipher `libsqlite3-sys`
- git source allowed only `github.com/evsikovas/consolecrypt-server`
  `cc-protocol` on audit;
- own crates - `cc-*`, `publish = false`, `AGPL-3.0-only`: new module
  It does not require editing of license exceptions, and the script rejects any other licenses.
  unpublished crate.

The exception is made only consciously: in `ignore` file `deny.toml` (or
`[[IgnoredVulns]]` in `osv-scanner.toml` with the council identifier, reason,
the owner and the date of the review; the period is not more than three months. It has now been adopted:

- `RUSTSEC-2023-0071` (rsa, Marvin): No fixed upstream version.
  Local `ssh-key` uses RSA blinding with system randomness
  signatures in SSH/agent. Residual limitation and verification limits are described in
  `SECURITY.md`; new SSH keys are recommended to be created Ed25519.
  Revision 2027-01-21.
- `RUSTSEC-2024-0429` (glib 0.17.10 in GTK3 plugin): local
  upstream-backport. Its source code, build connection and lockfile are protected
  `client/security-backports.json`; optimized Linux-test is mandatory.
  The exception in `client/native-deny.toml` does not allow the original registry version.
- `RUSTSEC-2026-0459` `libsqlite3-sys` 0.38.2): SQLite fix
  e5bf1198 is ported to both built-in engines, SQLite and SQLCipher. heshi
  C-codes, headers and build scripts are also covered; the test compiles real-world codes.
  WAL reads and checks for negative control. Conditional exclusion
  OSV until 2026-12-09 is valid only for this local backport.
  Allows a registry package. Update to 0.39.1 without separate fix
  SQLCipher is not enough. Details: `SECURITY.md`.

Cargo is further verified via OSV/GHSA for both root graphs and
Native Flutter plugins. Tool error or incomplete answer stops
check. Local source hashes only account for the LF/CRLF difference in checkout.
For explicitly marked public local patches, OSV/GHSA also checks the original
Upstream version. GLib exclusion is tied to verified backport and does not allow
Registration packet of the same version in a different box. Private local packages are not sent.

PEM certificates and database keys `db-core` read through `rustls-pki-types`
`PemObject`; `rustls-pemfile` is no longer in use.

## Your server.

The local profile works without a server. For synchronization, use
[отдельный репозиторий сервера и протокола](https://github.com/evsikovas/consolecrypt-server).
Instruction Docker /SMTP and start commands are located in its README and HOSTING.md.
Server code is not included in the current main client repository.
