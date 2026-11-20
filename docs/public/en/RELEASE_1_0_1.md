# ConsoleCrypt 1.0.1

Translated reference · [Russian source](../RELEASE_1_0_1.md)

## Russian

In this release, we strengthen the protection of the application and make notes to passwords more convenient.

- **Passwords:** Notes in the open card are shown in plain text.
  Passwords remain hidden, database KDBX retains encryption.
- ** SFTP :** The download is first written to a separate file, then atomically
  It's being moved to its place. Path checks protect against exiting the selected folder
  via simlinks and directory swapping; interrupted download does not spoil the old file.
- ** SSH :** Updated russh and Pageant integration; RSA signatures additionally
  They use blinding with system randomness. For new keys, we recommend
  Ed25519; the upstream RSA restriction remains described in SECURITY.md.
- ** Linux and dependencies:** The unsafe GLib iterator patch has been moved,
  Native dependencies have been updated and several unsupported components replaced.
- **Verification:** Expanded Cargo graph verification, including Flutter plugins,
  Added regressions for file racing, RSA, GLib and D-Bus compatibility.

Server 0.2.5 separately fixes Argon2 limit retention when you cancel a request
It limits the OIDC’s streaming response. Server tests with PostgreSQL are checked
Isolation of storage and rejection of other people's recovery data.

Work on safety continues: fixes and automatic checks
Reduce risks, but do not replace the protection of unlocked devices.

Packages: Windows, macOS, Linux DEB/RPM, Android and iOS Simulator for Mac.
Simulator is not installed on the iPhone.
