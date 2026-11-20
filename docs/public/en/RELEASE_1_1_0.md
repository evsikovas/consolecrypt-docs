# ConsoleCrypt 1.1.0

Translated reference · [Russian source](../RELEASE_1_1_0.md)

## Russian

Minimalist desktop terminal, more user-friendly password manager and
separate Android-assemblies for RuStore.

- **Minimalism** on Windows, macOS and Linux: button above the terminal and
  Ctrl+Shift+M/ M hides the app bars, leaving the terminal and tabs.
  The tabs can be placed on the top or left. Open sessions, withdrawal, division
  The terminal and the Ctrl+K/ K palette are saved. On the phones, this mode does not turn on.
- ** SFTP from the terminal**: the button on the top left and the action "Open SFTP" in the PCM
  by SSH - tab open files of the corresponding server, saving the terminal
  sessions. It also works in a minimalist mode.
- **Passwords KDBX **: the list shows only unlocked databases. Little one.
  the lock button opens the remaining stored databases; their parameters WebDAV and
  The control menus remain available until unlocked.
- Filters "All records" and "No folder" are separated from the real groups, the basket - from
  active folders. Hierarchy and data KDBX are preserved. Field cards are steel
  It is more compact, including long values and increased text scale.
- In the open line WebDAV-bases, the quick access settings menu is available via
  System authentication and a physical key where these methods are supported.
  The first unlock requires a password; the FIDO2 platform restrictions are maintained.
- **SQL**: Thin vertical and horizontal scroll bars increase
  when pointing and dragging. Retained editing and fixed columns.
- **Settings** are folded by clicking on the block header; entered values
  They're still there. Section SFTP has been renamed "Default Editor for SFTP".
- ** RuStore **: separate production-signed APK and AAB for Android 11+ ARM64.
  There is no REQUEST_INSTALL_PACKAGES or built-in APK installation.
  Updates are made through RuStore. Normal APK remains a separate channel.
  Compatibility with previously installed versions.

For RuStore, permanent application and download keys are used. New
production key differs from the previous Android preview/debug key:
In the transition between such installations, save a backup copy of local data.
Publication of files on GitHub does not mean moderation RuStore.

Available Windows x64, universal macOS DMG, Linux DEB/RPM, Android APK,
RuStore APK/AAB and iOS Simulator on Mac. The Simulator archive is not installed on the iPhone.
Synchronization server and encrypted data format unchanged; update
No server is required for this release. Integration with Apple "Passwords" is not added.
