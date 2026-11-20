# ConsoleCrypt 0.9.14

Translated reference · [Russian source](../RELEASE_0_9_14.md)

## Russian

Versions 0.9.3-0.9.13 have not been published: their builds have not been tested in CI. That's it.
They came in, comes out at 0.9.14 along with the build fixes.

The release is available for macOS, Windows, Linux and Android. iOS is being tested on Simulator, but its release has been delayed for now.
Instruction corrections work with all command synchronization servers (0.2.1 and later).
server 0.2.4 further prohibits participants from changing other people's command keys, allows only the owner to assign administrators, and sends invitations only to confirmed addresses.

**New.**

- **Recovery kit ** can be printed or saved in PDF.
- ** Terminal tabs** can be arranged in a column at the left edge; rolled side
  The panel is memorable.
- **Divide the terminal in the panel:** "Divide right" / "Divide down"
  (Cmd/Ctrl+Shift+\/Shift+−) open another session next to the same goal, up to four
  The panels in the tab; Cmd/Ctrl+] switches the panels, the separators are drag and drop.
- **The order of the terminal tabs** is changed by drag and drop (in the band and in the column), and in the column
  And also with the keys Alt + ↑ / Alt + ↓.
- **Import the key SSH from the file:** Select file button in the key import window.
- ** Password to the key SSH ** when connected is asked by a separate window with the name of the key,
  Not as a server password.
- **Import from CSV to SQLite and Cassandra/ScyllaDB.** The import wizard is now working with
  these bases. SQLite through `sqlite3` on the host and Cassandra write without a common transaction
  (CQL doesn’t have them), so the “one transaction per entire file” option is not for them.
  It's showing. Cassandra does not overwrite existing lines.
  `INSERT … IF NOT EXISTS` "Create a table from CSV..." is also available for SQLite.
- **SQLite and Cassandra/ScyllaDB.** Tables are created and changed.
  without manual SQL and CQL. Changes to SQLite that are not able to `ALTER TABLE`
  a table with a single transaction with the preservation of rows and indexes; a table with triggers or
  The designer does not recreate the computed columns. Cassandra is given a key.
  Partitions, cluster columns with order, secondary indices, TTL and `gc_grace_seconds`
- **History of conversations with AI.** Conversation history button in chat shows conversations
  this session and stored in storage (setting "Storage conversations with AI in the
  repository”); they may be continued or deleted. Continued conversation relays
  models previous moves, with hidden, as before, data: before the model began it with
  It's empty context.

- **Server Sources in About.** For a synchronized profile, the window shows
  a link to the source code of your synchronization server (AGPL requirement; the server informs it)
  c `/v1/meta` .

- **SQLite: Starter snippets and import from the line.** Set of 15 SQLite snippets (scheme, schema, etc.)
  indexes, foreign keys, integrity check, file size, request plan, ANALYZE,
  VACUUM. Connections are imported from lines `sqlite:///путь.db` and `cassandra://` /
  `scylla://`.

- Corrections.

- ** SFTP : Restore edits on other hosts.** Connection open to
  restore unsaved edits on a host that is not in the browser, now
  It is the same as the last one, and it is not the same as the last one.
  exit from the application.
- ** File editing by SFTP : backups on Windows and Linux .** Directory of working copies tagged
  `CACHEDIR.TAG` and `.nobackup`, so borg, restic, tar, Duplicity, Back in Time, and
  Other backup programs that take these labels into account miss it.
  (on macOS), it is still excluded from the Time Machine.
- ** Launch screen.** At launch, the current sign ConsoleCrypt is shown on a dark background: at iOS
  instead of the previous orange logo, the Android to 12 instead of the white screen.
- ** Launch error in Russian.** Screen that appears if the application fails
  Start up, translated into Russian and English.
- **SQLite: VACUUM.** Confirmed `VACUUM` in the Databases section is no longer
  He refused: earlier he was blocked by a ban on connecting other bases to the session.
- **Synchronization of Remote Storage.** If the Storage is deleted on the server, synchronization
  stops for an understandable reason ("storage not found on the server") rather than repeating
  There's no end to it.

- **Synchronization of Cassandra/ScyllaDB and SQLite connections via host.**
  through the storage" transfers such a password connection to the storage, if all devices
  Accounts run on 0.9.2 or later (with server 0.2.4, the app sees their versions and
  I will list the ones that need to be updated. The SQLite file on this computer remains only here.
- **Reminders with a closed application.** Notes and tasks come to the system
  notification "Reminder from ConsoleCrypt" - without the text of the note, the center of notifications is not
  encrypted. Android time may be moved by a few minutes, by Linux reminders
  It still works only with an open application.
- ** SFTP: drag and drop to Finder and Explorer.** On macOS and Windows files from the host list
  drag and drop directly to Finder or Explorer: the file is downloaded to a temporary folder,
  is transmitted to the system and deleted, the move is visible in "Transmissions". Folders are still a team
  "Download." Drag inside the application and from Finder / Explorer works as before
  (on Linux - also, but without dragging out).
- **Local AI: its GGUF model.** Add your model (GGUF) ...
  file in the folder of models with SHA-256 reconciliation and makes it the current model; "Delete" removes
  copy. Check the origin and license of your model yourself.
- **Updates to Linux .** A copy from DEB or RPM checks for updates at launch and
  installs them from the application: separate signed tape Linux, check SHA-256,
  Administrator password through `pkexec` and installation via apt, dnf or zypper, then
  "Reset." Version 0.9.14 on Linux install manually.
- **Teams.** Only the owner of the team can take the host out of the team. Copying and transfer
  hosts no longer produce copies of the key: the same key is used in the target storage
  Repeat, and the team credentials are marked in the list with a command tag. In the sidebar.
  Docker is shown with the same badge on the phone.
- **Command line.**Console client `consolecrypt-cli` is included in the installers for
  "Settings → Command Prompt → Set CLI commands" makes it
  Available at the terminal; commands and flags at [CLI.md](CLI.md).
- **QR from the Recovery Kit without typing.** When accessing the QR code of the kit is restored
  You can scan the camera of the phone or read from a picture or screenshot (any
  platform). Recognition is open source on the device, the footage does not go anywhere.
- ** Shared access to RDP hosts.** The RDP host can be shared with a trusted colleague:
  address, port, user, domain and tags; notes and saved password - only by
  mark. The server and protocol do not change; clients up to 0.9.14 do not show such a card.
- **Import CSV to ClickHouse, MongoDB and Redis.** ClickHouse in packages `INSERT` (and)
  “Create a table from CSV...” with MergeTree; MongoDB – in the collection, with new fields on
  headers, skip and update on `_id`; Redis - in the database or folder of keys, rows
  `SET` or hashes `HSET`.
- ** Table builder.** Comments with an apostrophe; in PostgreSQL - removal of identity,
  Change ALWAYS ы BY DEFAULT and UNLOGGED; in ClickHouse – renaming the table, removing
  Default values and column comment.
- **Cassandra/ScyllaDB: all nodes in the cluster.** Directly connected requests
  distributed to all nodes of the data center, and if the node fails, they switch to others;
  Previously, the session worked through a single node. With ScyllaDB - on the connection for each shard
  through the shard-aware port. Through SSH, tunnels and chutes are still through one node.
- **Cassandra/ScyllaDB: query tracing** instead of EXPLAIN, which is not available in CQL:
  The request is executed once with a trace, the window shows the steps and delays of each
  It's a tree node, like a SQL plan. Only for non-production connections, with confirmation.
- **Cassandra/ScyllaDB: cell editing.** Cells editing in the results table again
  It is available (the interface did not allow it before). The lines of one party change one.
  conditional `BATCH` - all or none; if the edits affect several parties, the window
  Checks warn that together they do not change. Key columns are not editable.
- ** Kubernetes: AI suggestions on a booted computer.** Manifesto from AI response opens
  in the creation window and when the computer is busy: the second to parse is counted after startup
  It is a separate processor, not with it.
- ** Kubernetes: "Resource Flow."** Heading no longer repeats, search, filters and
  The list does not run into each other, and the choice of namespace and labels looks like
  The other filters.

**Synchronization.** With server 0.2.4 (Protocol 1.13) Deletion of storage requested
not yet trusted device, delayed for 7 days; trusted device shows
alert in "Synchronization" and can save the storage.

**Security.** Corrections following a code security review.

- **Teams: Confirmation of participant.** Team keys receive exactly the participant keys.
  The code is calculated on the administrator screen. If the server will notify you after the reconciliation
  Other keys or roles, the add-on will fail, and the code must be checked again. Earlier.
  The compromised server could have swapped the keys between the reconciliation and confirmation and received
  Access to the team vault.
- **Teams: Introduction.** The code that the invitee dictates to the administrator is now
  The command is tied to the key of the administrator. The team will only open if
  He added the participant; a fake command assembled by the server, the application
  It won't.
- **Commands: the command key is fixed.** The application remembers the command key with which the command key is attached.
  It worked. The server can no longer replace it: another key of the same era or a new one.
  The key, which is not linked to the previous chain, leads to a pause of the command, not to a record.
  new data under a false key.
- **Teams: Administrator confirms key.** Server 0.2.4 (Protocol 1.12)
  the owner or administrator signs the fingerprint of the command key when it is created,
  Change the key and before adding a member. A new member opens up a team, only
  If the key matches the signed fingerprint, the server cannot even replace the key.
  at the very first opening. For teams created earlier, the print publishes the first
  Administrator who opened the command at 0.9.14.
- **Sharing: your devices.** The device that the server passes off as yours is larger.
  does not become a recipient of a secret, connection Kubernetes or database:
  Devices can only be shared through a confirmed connection. Search
  The address of your account is rejected.
- ** SFTP to Windows .** When downloading the folder names of the form `C:файл`, `файл:поток`, `CON`.
  `NUL` or with a point/space at the end no longer accepted: previously, the server could write
  file outside the selected folder or remove the tag "downloaded from" from the neighboring file
  Internet.
- **AI: Risk assessment of teams.** Teams that run programs or write them
  files no longer marked as “read-only”: `env -S '…'`, `fd -x/-X`
  `rg --pre`, scripts `sed` with commands `e` / `w` and flags `s///e` / `s///w`, `awk` with
  `| getline` or program file, `git -c …`. Again, you need to remember that you
  You understand the risk, before you do it.
- **New Device: Confirmation without verification.** If the server has ever reported
  to this device that supports pair code verification, switch it to the old one
  He can no longer do it without verification: such confirmation is rejected. Approving
  The device must be version 0.9.2 or later.
- **Synchronization: corrupted data.** If the server sends an object that is not
  passes authentication, the application shows a warning and leaves
  The last good local copy, rather than replacing it with unreadable data.
- ** SSH -agent to Windows .** Channel embedded SSH -agent is now available only to your
  account and system: previously, administrators could connect to it by default,
  And for reading, any user.
- **Dependencies.** `crypto-bigint` 0.7.10 (RUSTSEC-2026-0387, uneven over time)
  Execution of operations that must be permanent, `tokio` 1.54.1
  (RUSTSEC-2026-0386) and scheduled updates `hyper`, `uuid`, `tokio-rustls`, `xml` and
  other libraries. PEM certificates and database keys are read through `rustls-pki-types`
  The unsupported `rustls-pemfile`.
