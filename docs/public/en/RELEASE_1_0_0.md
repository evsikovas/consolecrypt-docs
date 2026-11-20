# ConsoleCrypt 1.0.0

Translated reference · [Russian source](../RELEASE_1_0_0.md)

## Russian

The password manager KDBX is built into the workspace ConsoleCrypt: local databases.
WebDAV, generator and search through the command palette. Issue for Windows, macOS,
Linux DEB/RPM, Android and iOS Simulator on Mac. Simulator is not an iPhone installer.

- **Passwords:** Create and open KDBX 3/4 with master password and key file,
  folders, cards, additional fields, editing, transfer and basket.
  Changes are saved automatically; PCM on the computer and the record menu
  The phone allows you to open, move or delete a confirmation record.
- ** WebDAV :** complete HTTPS - path to KDBX, secure connections in encrypted
  synchronization ConsoleCrypt. The connection password is kept a separate secret.
  File version control protects against overwriting other people's changes; opening can be canceled.
- **Generator: ** 8-128 characters, selection of sets, exclusion of similar characters,
  Entropy assessment, insertion into the editor and a general protected clipboard.
- **Palette:** `Ctrl+K` / `⌘K` → `пароли:` → search for a card → choice of field
  copying. Search is local; secrets are not transmitted by AI and are not inserted into the terminal automatically.
- ** Quick Opening KDBX :** Separate local envelope under system biometrics
  or PIN devices; on Windows / macOS also FIDO2 with PRF. Android uses
  System Keystore and confirmation request. The master password remains available.
- **Phone:** Adaptive layout, touch menus, sustainable storage
  Imported KDBX and exported through the system dialogue. Local file on
  phone - a copy in the application; WebDAV is edited directly on the server.
- **Tunnels:** Check "Save the tunnel" when passing Docker / Kubernetes
  restart and stop from the "Tunnels" section. These parameters are local to
  Existing SSH tunnels continue to synchronize.
- **Local AI for Linux :** Installation of verified CPU-runtime and the same GGUF models
  Model selection, RAM recommendations, cancel/resume boot and run without the cloud.
  DEB/RPM packages include OpenMP/OpenSSL dependencies; weights are loaded separately at the user's choice.
- **Workspace:** Viewing the password in the connection editor,
  separate login / password / domain RDP, commands in shared access, copying
  Host address/user, improved input fields and terminal tabs.
  On Windows available `Ctrl+V`, `Ctrl+Shift+V` and `Shift+Insert`.

The server and website versions are independent of the client. For KDBX / WebDAV not added
New HTTP endpoints or server migrations: it stores former encrypted objects.
Upgrade all devices to 1.0.0 before setting up WebDAV: an old client can
Do not save new fields when changing the general settings.

[Менеджер паролей](KEEPASS.md) · [Поддержка платформ](PLATFORM_SUPPORT.md) ·
[Совместимость сервера](COMPATIBILITY_1_0.md)
[Руководство со скриншотами](https://consolecrypt.dev/guide)
