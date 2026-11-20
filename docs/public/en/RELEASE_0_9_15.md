# ConsoleCrypt 0.9.15

Translated reference · [Russian source](../RELEASE_0_9_15.md)

## Russian

Issue for macOS, Windows, Linux and Android. The synchronization server does not change: it is suitable
any supported server (0.2.1 and later).

**Fixed: Blockage no longer closes sessions.**

- Once the storage is automatically locked (or manually locked), all are open.
  sessions continue to work: SSH -terminals and local terminals, RDP-sessions,
  SSH Tunnels and sessions Kubernetes with sub terminals and port drops. Soon after.
  The unblocking was closed.
- While the storage is locked, new connections are not opened, and RDP tabs are on the back.
  pause; after unlocking, everything continues from the same place.
- If the connection settings to the cluster Kubernetes have changed during the lock, it will be
  The session closes and opens again, as before when changing the settings.
- Sessions are still closed when the profile changes and exits. SFTP, Docker and connections to
  Databases are closed when blocked, as before.

**New: Physical Security Key (YubiKey, FIDO2) - Preview version.**

- The storage can be opened with a USB security key – YubiKey or another FIDO2 key with a security key.
  extension `hmac-secret` and its PIN code. Included in **Settings → Storage →
  Physical security key**, a button appears on the lock screen
  "Unlock with the security key."
- Operates on Windows 10/11 (PIN and touch asks window Windows, administrator rights
  not needed) and macOS (PIN asks the app, then shows "Touch the key").
  Linux and mobile platforms are not yet supported.
- The function is optional and works for this storage on this device: the key
  seals the storage key into a local envelope, which is not synchronized,
  It goes to the backups and the server. Password phrase and Recovery Key continue
  work. Details: [Ключ безопасности](SECURITY_KEY.md).

**Security.** `libz-sys` 1.1.31 (RUSTSEC-2026-0418: the build script could write
assemblage environment variables in the catalog `target/`. Assemblies ConsoleCrypt were not affected.
They used `cc` 1.5.1, and the leak occurs with `cc` 1.6.0.
