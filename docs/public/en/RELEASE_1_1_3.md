# ConsoleCrypt 1.1.3

Translated reference · [Russian source](../RELEASE_1_1_3.md)

## Russian

Security and full-screen fixes macOS.

- **SQLite/SQLCipher:** eliminated cause of RUSTSEC-2026-0459
  (CVE-2026-119375). In case of discrepancy in the size of the database and WAL pages
  The unread remainder of the page is now reset. Official corrigendum
  SQLite ported to both built-in engines; regular dependency update
  This would not solve the problem with SQLCipher.
- ** macOS :** The native panel no longer occupies an extra band above the application
  When you move to the full screen. When she leaves, her former state returns.
  The processing is applied to a regular full-screen window and saves
  Restore the window after full-screen RDP.
- ** Minimalist terminal at macOS :** button SFTP and other actions
  placed in a common upper band with a native indentation for system buttons.
  Rolling and stretching the left panel of tabs no longer shifts the action
  under the window buttons. When changing the position of the tabs, the session and palette are saved.
- ** Checks:** WAL read regression checks page sizes and boundaries
  buffer; the initial function serves as a negative control. Audit checks
  Hashes of the corrected C-code, headers, Rust wrappers and build script.
  Encryption, key change, database reopening and search are checked.

Local database and synchronization formats do not change. Updating the server
No synchronization is required for this release.

Packages: Windows, macOS, Linux DEB/RPM, Android, individual APK/AABs for RuStore
and iOS Simulator for Mac. Simulator is not installed on the iPhone.
