# ConsoleCrypt 0.8.6

Translated reference · [Russian source](../RELEASE_0_8_6.md)

## Russian

The release is available for macOS, Windows, Linux and Android. Assembly and inspection iOS postponed.

** Shared access to database connections.** Saved connection now
You can share with a trusted device of a colleague, as well as hosts and
contexts Kubernetes. You need a synchronization server 0.1.15 or later
the function is included; on `sync.consolecrypt.dev` it is turned on. The old one.
The server does not show the "Share" item.

- “Share” in the connection menu in the “Databases” section. Before shipping.
  You can see what fields a colleague will receive: engine, address, port, base, user,
  TLS, limits and the "prod" mark.
- Group, request history, AI settings, and session permissions are not shared.
  The password and key of the client are left only on the explicit mark and only if the server
  Keeps secrets in common.
- The route through the SSH host, jump profile, proxy or tunnel is not transmitted:
  The recipient chooses his. Space is retained at the pass Kubernetes.
  Names and loads Docker – the name of the container. Such a connection is not possible.
  Keep it as straight.
- Shared connections are visible in the section "Databases" with the label "General" (their own -
  "You shared." From there, you can accept the connection, save a personal copy,
  manage participants and revoke access.
- A copy of the product connection remains a product connection and opens only for reading.
- Connections can be added to general collections.

Revocation of access does not cancel the already copied password - change it on the server
databases.

**Important after the update.**

- Device unlock (Touch ID, Windows Hello, print) is turned off.
  until you open the vault once with a password. The application is then re-encrypted.
  local database and offer to turn it on again - now the key gives
  The system is only after biometrics.
- On Windows, an update from a previous version via a banner may not work.
  Install this version manually from the site. Further updates through the banner
  The application is closed, the installer updates and launches it again.

** Databases.**

- "Unlock the product" in the upper panel: entry to the product base on 5, 15 or 30
  minutes after the storage password and entering the connection name. Every change.
  is still confirmed, at the expiration of time, the record is closed again,
  Such requests are marked in history.
- Double-click on the cell – edit right in the table (Enter, Esc, Tab) if
  Entry allowed. The type of value is taken from the column, you do not need to choose it.
- е / Ctrl+Enter without highlighting performs the operator on the cursor line, in that
  It's a multiline number.
- DDL tables - with backlit, line numbers, "Copy" buttons and
  "Open in the editor."
- Click highlights the cell; lines are highlighted by clicking by number, with Shift or у.
  Copying, exporting, and AI work with the dedicated.
- PostgreSQL no longer switches without warning to a connection without TLS:
  without encryption - only through the tunnel or on this computer; password
  It is connected to the TLS connection. In the workspace, the encryption status is visible.

**Safety.**

- Protection against login from a new device (synchronization server 0.1.16): a letter
  Each new device with a link to “It’s not me,” a notification on your device
  Devices marked "not confirmed". The new device cannot be used for 14 days.
  withdraw trusted, the release of data for unlocking is limited.
- Docker: Passwords are hidden not only in variables, but also in addresses, commands, etc.
  Tags, JSON and browse compose; full text - after the storage password.
  Save the compose file is protected from file swapping.
- TLS libraries have been updated and dependencies are checked automatically.

** Kubernetes and Windows

- The Flux buttons are clearly called “Sync Now.”
  “Stop/Renew Synchronization” and explain what they are doing.
- The paths Windows are shown as ordinary, without the prefix `\\?\`.
