# ConsoleCrypt 0.9.1

Translated reference · [Russian source](../RELEASE_0_9_1.md)

## Russian

The release is available for macOS, Windows, Linux and Android. Assembly and inspection iOS postponed.

**Commands** (Sync server 0.2.1). Team - shared storage
several accounts on the same server: its hosts, groups, credentials and
Snippets are seen by all participants, and the role decides who can change them. Names,
command settings and resources are encrypted with end-to-end encryption - the server sees
Only the composition of the participants.

- “Settings → Commands”: Create a team with a name, color and description; it
  It appears on all of your devices.
- Invitation by mail with a role and comment (comment is not encrypted).
  The invitee accepts it and dictates to the administrator a code of 6 groups of digits;
  The participant is added only after the administrator confirms
  "Codes don't match" doesn't add up.
- Roles: owner, administrator, editor, observer. Observer only
  browses and connects - changes reject both the application and the server.
- In the "Hosts" on the left are sections "Personal" and one per team with its color. Okay,
  What is created in the team group belongs to the team; the host can be copied.
  or move to a team from its menu - the necessary credentials are copied
  along with him. Team resources are marked by its color in lists and tabs
  The observer has the label “Reading only”.
- Team Policies: Mark New Contexts Kubernetes and Databases
  Do not send team resources to AI assistants, clean up faster
  copied passwords, require confirmation of each command on the hosts
  teams. Your team color can only be selected for your devices.
- Deleting or leaving a member changes the command key: everything is re-encrypted, and
  The former participant will not read the new data. The "History" tab shows
  A signed line-up log.
- Each change in composition is signed by the administrator, and each application
  He checks the entire journal himself. If the server shows a participant that no one else has.
  If the team has signed, or will return the old team, the team pauses.
  Reading with a warning, and the key is not given to anyone.
- The command is opened without a network - from the cache in the encrypted profile database;
  Changes will disappear when the network is available.

Needs a synchronization server 0.2.1 or newer; with an old server partition
"Teams" is not showing. Works in both normal and corporate modes
entrance. Personal Storage, Sharing, Shared Notes and Backups
They're working like before.

** Enterprise login to the synchronization server.** Synchronization server 0.2.0 and
It can only be accessed through the organization’s authorization server.
The application itself recognizes the server mode after entering the address and shows the desired
uniform.

- **Enter via SSO (OIDC).** The Login via {Name} button opens
  login page of the organization in the system browser; e-mail can be specified
  beforehand. While entering, you can see the waiting status and the "Cancel" button. Nana
  The browser returns to the application through a local address
  `127.0.0.1`, at Android through Custom Tabs, at iOS through the system window
  entrance. PKCE and verification `state` are used; the entry code is disposable.
- **Active Directory login.** Login fields (email or DOMAIN\user) and
  “Password” with the caption “Your organization account”. Password is sent.
  Once on TLS, it is not saved and is erased from the field after each attempt.
- In corporate mode, there is no registration, account password and “Forgot the password”.
  The new user, after logging in, goes through the usual creation of storage.

**Visible where the corporate server is used.** On the login screen:
Entry through the corporate authorization server {name}. Organization password
It does not open the storage - you need a storage password for this.
“Synchronizations” and “Devices” – the line “Authorization: Corporate Server”
{name} (OIDC | Active Directory)"; on a normal server, "Email and password
account.

**The app remembers when you logged in.** For each server on the device
The login method and login (not password) are saved. At the next connection, the method
Selected in advance, the login is set up, you can see the prompt "Last time you were logged in"
via ... as ..." with the "Forget" button, and recent servers are shown tagged
“Email,” “SSO: ...,” or “AD.” If the server has changed the login mode, the application
warns of this. In the settings, you can see how and when this device entered.

**Access is disabled by the administrator.** When the organization disables the accounting
recording, the server revokes the sessions, and the application blocks the profile and shows
"Access is disabled by administrator." Data on the device remains
encrypted; the profile can be removed from the device or logged in again if
Access is back. Errors of corporate login (domain not allowed, no group)
You need a second factor, the account is already connected, the login service is not available.
Too many attempts) appear to be clear text.

**What doesn't change.** Encryption, storage, devices and sharing
They work as before: the corporate login replaces only the account password.
After logging in, the device is a normal new device, the storage opens the password.
Storage, recovery key or approval. With old servers and
The servers in the standard mode everything works as before.

On iOS a system browser login handler is added; it is also used.
for the OIDC entry into Kubernetes.

**Notes, Tasks and Reminders.** In the right panel next to Snippets and
“AI” appeared instrument “Notes” (also in the palette of commands and in the cap on the
telephone.

- Notes with Markdown, tags and fixing. The "Task" switch adds
  deadline; overdue tasks are allocated, and the number of overdue tasks and
  Reminders can be seen on the “Notes” icon.
- Reminders: "In an hour", "Today at 18:00", "Tomorrow at 09:00", "In a week"
  Or your time. While the application is open, a notification with
  The "Open" button; in the note menu - "Remind in an hour." Systemic
  There are no notifications at the closed application yet.
- Notes on objects. The "object" tab shows notes to what is open
  now: SSH - host of active tab terminal, RDP-host, host SFTP.
  Open connection to a database, resource, or context Kubernetes
  selected Docker container. The “Everything” tab shows all the notes and why.
  They're tied, "Tasks" are just tasks.
- Text from the "Notes" field of the host card can be transferred to a regular note
  Button "Take to notes."
- Notes are encrypted on the device and synchronized with end-to-end encryption, as
  The rest of the storage data. Deleting the host or the base of the note does not delete -
  They are marked "Object not found".

**General Notes** (Sync server 0.2.0 enabled)
`CC_SHARED_NOTES_ENABLED` .

- A shared host, database connection, or context Kubernetes
  In the "Object" tab, the "General Notes" block appears. They're all seen by the participants.
  any participant can write, change - only the author, delete -
  author or owner. Note to Docker-container common SSH-host or to
  The general context resource is only visible to that container or resource.
- The key of general notes issues and signs the device of the owner, each note
  signs the author's device - the server cannot change the key or read
  text. Until the owner has never opened the notebar for the object, the participants
  They see a waiting message. After the exclusion of the participant, the owner's device
  The next time the panel opens, it re-encrypts the notes with a new key.
- The connection of the object with the shared access is remembered when publishing and when saving
  A personal copy. For objects published before this issue (other than copied ones)
  hosts, publish or copy the object again so that it appears
  general notes.

**Password confirmation of storage.**Dangerous actions are no longer required
Confirm by entering a connection name, context, or resource – everywhere
I'm asking for the vault password. The wrong password does nothing, the field
Cleaned after each attempt, Enter confirms.

- Databases: modifying and dangerous queries, cell edits and Unblock
  Prod” (now only password and term).
- Kubernetes: application YAML, creation and deletion of resources, restart,
  scaling, cordon/drain, debug container, GitOps actions, Helm rollback,
  Mass operations, clearing the history of events and removing AI dialogues.

** Databases.**

- Double-click on a table or “First 100 lines” immediately show the data
  at the bottom - in one viewing tab, which is reused, rather than fruitful
  new. The manually modified viewing tab becomes normal.
- Generated SQL (DDL "Open in the Editor", history, draft AI,
  the proposed `SCAN` is added to the current tab below the written, rather than
  c new; nothing is being done.
- Object Information works for PostgreSQL, MySQL/MariaDB, ClickHouse, and
  Redis: owner, estimation of number of rows, sizes of data and indexes, number
  columns and indices, sectioning and sorting keys, the latest VACUUM and
  ANALYZE, for Redis keys - type, TTL, length and memory. Information window
  grouped into sections, sizes in KIB/MiB, grades marked "≈", there are
  Copy button. The menu item is hidden where there is no information.
- Errors in the workspace are shown with a glass notification, not a white one
  In the context menu, only one item is highlighted.
- Checking the corrections of the cells shows the values themselves - lines in quotation marks, `NULL`
  For empty, long values are shortened instead of `{{p0}}`. Implemented.
  It's still a parameter query.
- The query in the checkout window is shown by a block of code like DDL: monowire
  font, backlight, line numbers, can be highlighted and copied.
- The DDL window adjusts to the width of the screen and leaves no empty space under the screen.
  Short code. Long lines are moved with indentation; if switched off
  "Transfer the lines," the code scrolls sideways. Choices are memorable.
- Basic snippet sets: SQL · PostgreSQL (20), SQL · MySQL / MariaDB (20),
  SQL · ClickHouse (20), Redis (15) and MongoDB (15) – active and long queries
  Blocks, sizes, indexes, replication, heavy queries. Added to
  "Snippets → Starter kits." They can be run in psql, mysql.
  clickhouse-client, redis-cli and mongosh inside SSH sessions: multiline
  query leaves with one insert; changing commands require confirmation.
- Exports to CSV/TSV screen formulas for tabular editors (check box)
  "Screen formulas (for Excel)", enabled by default; SQL export
  correctly shields quotation marks and inverse slash for each base.
- A saved tunnel with a network address to connect to the base is launched
  127.0.0.1 only.

** Shared access** (Sync server 0.1.17).

- Only the owner can remove the common element; the remote element can be restored to the
  Within 30 days: "I shared → Recently deleted."
- The recipient can exit the public access – in the card of the item or in the
  Incoming invitations; saved personal copies remain. The owner sees who
  Out.
- A damaged public record no longer breaks the entire list: it's in hiding.
  The app tells you how many records you couldn’t read.
- The mail address when searching for the recipient is no longer transmitted to the address of the request.

**Safety.**

- SFTP: Open no longer runs downloaded files capable of executing
  code (scripts, shortcuts, .exe, .command, .desktop, etc.) – they open as
  The text in the editor after the warning. Uploaded files are marked as
  obtained from the Internet Windows and quarantine macOS.
- New password phrase of the repository - not shorter than 12 characters; existing
  The vaults are opening as before. The key is encrypted by Argon2id not weaker than 64 MiB;
  The old parameters are updated the next time you unlock the phrase.
- Backups are recorded through a securely created temporary file.
  Reading the server’s copies and responses is limited.
- Autocleaning of the clipboard is set from 30 seconds to 1 day and works
  and after restarting, without touching someone else's content.

** Windows **

- In the choice of the terminal font - only installed monowidth fonts,
  including those installed for the user (e.g. JetBrainsMono Nerd Font);
  The names "...Nerd Font Mono" and "...NFM" are interchangeable, and if the font is not
  set, the settings will tell. Linux also shows set fonts.
- The window is hidden from screenshots, recording and screen demos while open.
  password, key, or recovery words. "Settings → Security: "Never"
  "When secrets are seen" or "Always."
