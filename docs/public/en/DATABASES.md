# Databases / Databases

Translated reference · [Russian source](../DATABASES.md)

## Russian

The Databases section works with PostgreSQL, MySQL and MariaDB, ClickHouse, Redis.
MongoDB, Apache Cassandra, and ScyllaDB, as well as SQLite files. It's the structure of the base.
query editor with tabs and history, results table, EXPLAIN, cell editing,
Table builder, copying and exporting, and AI assistant. Drivers are built into
application, therefore `psql`, `mysql`, `clickhouse-client`, `redis-cli`, `mongosh` and `cqlsh`
do not need to be installed. This section is available on macOS, Windows, Linux and Android. For iOS, release CI packages the app as a ZIP and checks that it launches in Xcode Simulator on a Mac.
Testing this feature on a physical iPhone requires a separate run.

### Connections

1. Open Databases in the side menu and click New DB Connection.
2. Specify name, engine, address, port, base (for Redis - base number),
   user and password. Password can be stored in storage or entered when
   each opening: the password entered in this way is used once and not
   It's still there.
3. "TLS Protection": "Check the Certificate and Server Name" (by default)
   “Require encryption,” “Prefer encryption,” or “Disable TLS.” For
   Local address and port transfer mode itself switches to
   "Prefer to encryption." Through any route, TLS checks the original name.
   The base server.
   - “Prefer encryption” – TLS if the server supports it; no TLS
     только через туннель (SSH-хост, jump-профиль, SSH-туннель, проброс
     Kubernetes или Docker) или на этом компьютере (адрес loopback после
     разрешения имени). Напрямую или через прокси к другому хосту режим
     работает как «Требовать»: если сервер не поддерживает TLS, подключение
     завершается ошибкой «Сервер не поддерживает TLS», и пароль не уходит.
     Старые подключения с этим режимом к удалённой базе без TLS получат эту
     ошибку — выберите «Отключить TLS» явно, если это допустимо.
   - “Require Encryption” – Encryption without checking the certificate. V.
     PostgreSQL пароль тогда используется только через SCRAM-SHA-256-PLUS
     (channel binding): подменивший сертификат перехватчик не получит пароль.
     Если сервер не умеет SCRAM-PLUS (старые версии, `md5`/`password` в
     `pg_hba.conf`), появится ошибка и переключатель «Разрешить вход без
     привязки к TLS (менее безопасно)», по умолчанию выключен. MySQL/MariaDB
     такой привязки не имеют: от активного перехватчика пароль защищает только
     проверка сертификата.
   - Without TLS over the network PostgreSQL does not respond to a password request in plain text
     (`AuthenticationCleartextPassword`); через туннель и на этом компьютере
     он разрешён. MySQL/MariaDB никогда не включают `mysql_clear_password`.
     ClickHouse, Redis и MongoDB не переходят на открытый текст ни в каком
     режиме, кроме «Отключить TLS».
   Actual protection is visible in the work area cap and on the card
   Connections: "TLS (verified)", "TLS (without certificate verification)", "Without TLS -"
   Tunnel protected or TLS-free.
4. Select a route (see below) and, if necessary, mark "Food - always"
   only reading”.
5. “Connect” shows the server version before saving.

In the "Group" block, the group, labels and color are set. The color is visible on the tile.
connection and in the header of the work area. The list of connections is shown
tiles or a compact list - a switch to the right of the search, as in
"Hosts" section; the selection is remembered on this device. Find out.
connection by name, address, base, engine and tags, labels above the list
They work like filters.

The connection can be imported from the line `postgres://`, `mysql://`.
`clickhouse://`, `redis://`, `mongodb://`, `mongodb+srv://`.
`cassandra://` or `scylla://` – keyspace in transit `?datacenter=`
local data center, and `sqlite:///абсолютный/путь.db`, `?mode=ro` – only
Reading) or from a file `.pgpass`. Before saving, a list of found connections is shown:
Everyone can turn on “Prod”, choose a route and decide whether to save a password.
Lines with substitutions `*` and local sockets are skipped.

Connections and passwords are stored in encrypted storage and synchronized.
through the server ConsoleCrypt in encrypted form. Requests go from device to device.
base on the selected route; the synchronization server does not see them.

### Cassandra and ScyllaDB

The Cassandra/ScyllaDB engine speaks CQL (native protocol, port 9042)
It works with Apache Cassandra 3.11+, 4.x, 5.x and ScyllaDB.

- **Only on this device.** In version 0.9.2 of the Cassandra connection /
  ScyllaDBs are only stored on the device where they were created: they are not
  They are synchronized, they cannot be shared, they do not fall into the backup.
  Databases, and the history of requests to them remains local. Reason - versions
  ConsoleCrypt up to 0.9.1 inclusive cannot read such connections.
  The connection and its password are stored in the local profile database, encrypted
  vault keys. On the card you can see the label “Only on this device”.
  From version 0.9.14, the menu item “Sync through storage” transfers
  connection and its password in the storage: then it is synchronized and
  It gets backed up like the others. Transfer is possible when everything is
  Active Account Devices are 0.9.2 or later (their versions)
  reports server 0.2.4, protocol 1.13; otherwise, the application will list
  Devices that need to be updated. Back to "only on the device"
  The connection doesn't come back. Share it with other people still
  It is not possible, the request history remains local.
- **Fields.** The host is the first contact node; you can add the parameters.
  other contact nodes (by comma, the same port), local data center,
  Consistency levels of reading (default `LOCAL_ONE`) and writing
  `LOCAL_QUORUM` and the CQL page size (500 lines).
  Default (exact name). Query timeout – “Time out of request” from limits.
- **Cluster nodes.** Full work with the cluster - only with direct
  Connecting from the same network as the nodes. Then the app takes the node addresses.
  from `system.peers` and connects to each data center node of the first
  Responding Contact Node (with the same TLS): Requests are distributed to nodes
  taking into account tokens, and when the node fails, they switch to others. Other knots
  No data centers are being used. With ScyllaDB, the driver connects to the nodes itself.
  One connection per shard, through the shard-aware port (19042), should be
  be available; otherwise a conventional port is used. To verify the TLS certificate
  The host must be given a name from the Host field (or TLS name) or an IP address.
  knot. If nodes are not available at addresses that report themselves (e.g.,
  Only one port is thrown, and work remains through one node.
- **Through tunnels - one node.** Through SSH, jump profile, proxy, SSH - tunnel,
  Kubernetes) or Docker session runs through a single node - the first
  The answer (without distribution to nodes and shard-aware);
  Inaccessibility is used by the following contact node.
  If a local data center is specified, the contact node must be in it, otherwise -
  Error "node in another data center" (levels `LOCAL_*` are counted as
  Coordinator's data centre).
- **TLS.** Encryption is performed by the application itself (rustls) with the same modes:
  “Verify” – chain and server name (you can specify your CA and client)
  Certificate), “Require” – encryption only, “Prefer” – without TLS
  only through the tunnel or on this computer, over the network - the error "The server does not
  “supports TLS”. Password login to CQL transmits the password as is, so
  without TLS, the password is not sent over the network (an error about the password in plain text).
- **Read only.** CQL doesn't have a read-only session, so sales protection is
  analysis of each request in the application: SELECT, `DESCRIBE`, `LIST …` and `USE` –
  INSERT/UPDATE/DELETE and `BEGIN … APPLY BATCH` – change
  CREATE/ALTER - schema change; TRUNCATE, DROP, `ALTER TABLE … DROP`
  `ALTER KEYSPACE` and functions/triggers—hazardous (confirmed); GRANT
  REVOKE and role management – dangerous and forbidden even in the window
  records. Unknown commands are not executed. Comments don't make it to
  servers: text collected from verified tokens is executed. For sale.
  Use the role only with the right SELECT.
- **Scanning Warnings.** Before SELECT with `ALLOW FILTERING` and before
  SELECT without WHERE and LIMIT is confirmed. Server warnings
  (e.g., tombstones) are seen in "Messages."
- **Results.** Data read by CQL pages: next page
  It is only requested when “download more”. Collections (list/set/map),
  tuples, vectors and UDT are shown as JSON, blob as binary data.
  (hex in view), varint/decimal without loss of accuracy, uuid/timeuuid, inet,
  Duration - text. Stopping the request interrupts the reading.
- **Structure and DDL.** Keyspace (with replication) → tables materialized
  representations, user types, functions and aggregates → columns with
  PARTITION KEY/CLUSTERING ASC|DESC/STATIC and secondary indices.
  DDL - server `DESCRIBE` (Cassandra 4+, new ScyllaDB), otherwise it is going
  from `system_schema` "Object information": replication, compaction, compression,
  `gc_grace_seconds`, TTL by default, estimate of the number of parties and the average
  size `system.size_estimates`. Autocompletion - keyspace, tables,
  CQL columns and keywords.
- **Cell editing** is available for the SELECT result of one table in which
  There is the entire primary key (participation key and cluster columns). Each
  the string is updated via `UPDATE … IF EXISTS` (easy transaction), so
  The deleted line will not be re-created. The lines of one party change
  `BEGIN BATCH … APPLY BATCH`: if at least one of them is already
  No, none of them change. Different parties change in turn and not together.
  This is indicated by the inspection window. Key columns and counters are not
  No strings are added or deleted (in CQL, a record is
  upsert. Keyspace ScyllaDB with tablets supports easy transactions
  Not in all versions.
- **Export** in CSV/ JSON and "INSERT" - as `INSERT INTO … JSON '…';`
  It retains all types of CQL.

### Routes

- **Straight to the address and port of the base.
- ** SSH -host** or ** profile SSH -transitions** - through saved hosts
  ConsoleCrypt, including their jump chains.
- ** SSH - Tunnel** - through a preserved local spread tunnel. Address and
  port is taken from the target of the tunnel; if the tunnel is not started, it starts at
  connection - always on 127.0.0.1, even if the tunnel indicates a network
  address so that the database is not accessible to other computers. If the form is specified
  localhost with a saved tunnel port, form will suggest using this
  tunnel.
- ** Kubernetes ** - port forwarding to Pod, Service, Deployment or StatefulSet
  the context of the choice. For Service and Deployment, a ready-made Pod is selected.
  So the connection is going through a reset of the pods.
- **Container Docker ** - port transfer into a container on or on this computer
  saved SSH - host. The container is searched by name, so recreated
  The container will do, too.

Passages Kubernetes and Docker are restored with each connection.
The ones that are running are being reused. Badge next to the connection name
It shows the route.

You can also connect from other sections: the “Connect to the database” button is available
Pod Kubernetes and containers Docker with standard database ports. If
The connection with such a route is already saved, it opens immediately; otherwise
The form opens with the engine, port and route filled.

### SQLite

SQLite is a file, not a server. In the connection form, select the SQLite engine.
Then "Where is the file":

- **This computer macOS, Windows, Linux is the path to the file or button
  "Select a file..." A new empty file is created only by the “Create New” button.
  database..."; connecting to a non-existent file does not create it, but reports,
  I don't know if the file was found. Before opening, the header is checked: another file
  (or an encrypted database) will not be opened. The WAL mode is maintained.
- ** SSH -host**, ** Docker -container** or **Pod Kubernetes** - requests
  executes the program `sqlite3` (version 3.16 or later) on the host
  container or pod; the file is not copied anywhere. The request is transmitted through
  standard input, not in the command line. If `sqlite3` is not, the appendix
  That's what he says. Production context Kubernetes requires permission to
  Execution of commands in its settings.

“Read only” is enabled by default: the file opens for read only, and
No request can change it. Without it, the flag is normal.
rules: on non-sales connection, changes are checked, on the food
I need a time window. Even the permitted reading is performed with
`PRAGMA query_only`; `ATTACH` / `DETACH`, `VACUUM INTO`, `load_extension`
`readfile` / `writefile` and modifying PRAGMA (encryption keys, `query_only`
`writable_schema` Prohibited; remote program runs with `-readonly`
and `-safe`.

Structure: File → “Tables”, “Representations”, “Indices”, “Sequences”
(AUTOINCREMENT counters), Table Triggers and Data Types; Table →
“Columns” (“name (TYP)”), “Keys”, “External keys”, “Indices”, “Links”
(external keys of other tables on this one) and "Triggers". Available DDL, information about
object (file size, row score from `sqlite_stat1`, STRICT, WITHOUT)
ROWID), plan `EXPLAIN QUERY PLAN` wood, tips, export (including:
INSERT with SQLite literals) and cell editing by primary key or `rowid`.

SQLite connections are stored **only on this device** (only on this device icon)
this device”): they do not synchronize, do not enter the storage and
backups and not transferred to others - versions of the application up to 0.9.1 can not
Read them. The history of their requests also remains local. File connection
via host SSH, Docker, Kubernetes from 0.9.14 can be transferred to storage
the item "Synchronize through storage" (conditions - like Cassandra);
The file on this computer stays only here: on the other device its path
It doesn't mean anything.

### The Produs regime

Prod-connection opens only for reading and protection in two layers:

- **On the server.** PostgreSQL and MySQL/MariaDB execute each request in the
  Read-only transactions. ClickHouse получает `readonly=2` в каждом
  request. Redis does not have a server switch. For MongoDB, roles are being tested
  user.
- **Appendix.** Each request is processed before it is sent. Changing commands and
  Attempts to remove protection `SET transaction_read_only`, `COPY … TO PROGRAM`
  `INTO OUTFILE`, `FLUSHALL`, `$out`, `$merge` and the like are not departed.

When you still need to change the product, the button ** "Unlock the product"** in the header
The work area opens the time window of the record. We need to enter the vault password.
(it is checked in the application kernel) and select the deadline: 5, 15 or 30 minutes. While the window is open, a red mark burns in the hat "Record in the box".
Sold to ChChCh:MM with countdown and button "Block". Every day.
the changing request is still displayed for verification, and
Enter the storage password; the result cells can be edited. Window.
belongs only to this session and closes itself at the expiration of the term,
the “Block” button, when disconnecting, locking the storage or changing
profile. Server protection is removed only for permitted changes: Read more
They are still in read-only transactions. Read-only role
the server will not miss in the open window - after unlocking the application
Checks the rights and warns if the role is unable to write. Changes,
made in the window, marked in the history of requests. Phones have a recording window.
unavailable.

The “Check Rights” button in the workspace header tells you if it is confirmed.
Security on the server and whether the role has recording rights. For sale, it is better to use the role only for
reading: in PostgreSQL – `SELECT` or `pg_read_all_data`, in MySQL – `SELECT`, in
ClickHouse – profile `readonly=1`, Redis – ACL `+@read -@write`, MongoDB –
role `read`.

Non-Product connection also opens in “Read Only” mode. Lock button
In the header allows recording until the connection is closed. Modifying the request before
It is displayed in the entire window and can only be performed.
After entering the vault password. This also applies to dangerous requests `DROP`.
`TRUNCATE`, `UPDATE` or `DELETE` without `WHERE`, `FLUSHALL`, deletion
collections), and cell editing: the new values themselves are visible in the revision check.
The Redis command `KEYS` is never executed; instead, the same command is offered.
`SCAN`, which can be added to the editor.

### Public access

If the synchronization server supports sharing database connections
(server 0.1.15 and newer with enabled function), the connection menu appears
Share it. Before sending, it is shown which fields will go to a colleague:
engine, address, port, base, user, TLS, limits and Prod mode. Group,
Request history, AI settings, and session permissions are not shared. Password and key
the client is transmitted only when explicitly marked and only if the server supports
shared secrets.

The route through the SSH host, transition profile, proxy or tunnel is not transmitted:
The recipient chooses his. Space is retained for pass Kubernetes
Names and loads, and the context is chosen by the recipient; for Docker
The name of the container and the engine is chosen by the recipient. Connection to this route
You can't keep it straight.

Received connections are shown in the section labeled **General **, their
Published - tagged **You've shared**. **Read more** Opens acceptance,
preservation of a personal copy, participants, revocation of access and termination of the general
access. A copy of the product connection remains a read-only product connection.
Revocation of access does not cancel the already copied password - change it on the server
databases.

### Working area

Click on the connection: the structure will open on the left, the tabs on the right
requests, editor and results. The boundaries of the panels are dragged, the buttons in
The caps hide the structure and reveal the story and the AI assistant.

The structure loads as it opens and spreads objects into folders.
Disclosed table is framed, primary and foreign keys are marked
Badges. Search filters already loaded objects, adjacent button
It rolls up the whole tree.

- ** PostgreSQL **: diagrams → tables, representations, materialized
  representations, sequences, functions and procedures → columns (type,
  NULL, default value, keys), indexes, restrictions, triggers.
- **MySQL/MariaDB**: databases → tables, views, procedures and functions
  columns, indices, triggers.
- **ClickHouse**: databases → tables (engine), views, dictionaries → columns
  (sort key), skip indexes and projections.
- **Redis**: `db0` ... `db15` → key folders by separator `:` → keys with type and
  TTL. Keys are read in portions through `SCAN`.
- **MongoDB**: databases → collections → indices.

Double-click on a table, view, collection or Redis key and item
The first 100 lines immediately show the data at the bottom. There's one for that.
browsing tab ("items - data"): the next object opens in it,
The new tabs don't grow. If you change the text of this tab, it becomes
It's normal and it's not overwritten anymore.

In the object menu: "First 100 lines", "Show DDL" (for Redis - description)
keys, for MongoDB - collection parameters and indexes, "Insert name" and
"Subject information." DDL is shown by a block of code with line numbers and
lighting, each operator `CREATE TABLE`, each `CREATE INDEX` separated
Hell. The window adjusts to the width of the screen and the height is no more than the code.
Long lines by default are transferred with indentation, the number is on the first
the line; the button "Move lines" turns off the transfer, and then the code
It is then retracted to the side (the setting is remembered). “Copy” and “Open” buttons
in the editor. For MongoDB collections, there is a “Document Sampling Scheme”: Types
fields and the proportion of documents in which the field is found.

"Object Information" shows facts from the system catalog, only by reading
and with parameters instead of substituting names: for tables and representations
PostgreSQL - diagram, owner, view, estimate of the number of lines, dimensions (total,
data, indices, TOAST, number of columns, indices, constraints and triggers,
tabular space, comment, section key and latest
VACUUM/ANALYZE; for MySQL/MariaDB - engine, string format, string estimation,
data and index sizes, AUTO_INCREMENT, comparison, time of creation and
changes; for ClickHouse – engine, lines, size, parts, keys
partitioning, sorting and sampling, TTL; for the Redis key - type, TTL,
encoding, length and memory, for the Redis database is the number of keys. Grades marked
The ≈ is shown in KiB/MiB, and the Copy button copies the entire window. For
The MongoDB description is shown as JSON. The item is hidden at the objects for which
There's no information.

Generated text - DDL from "Open in the Editor", query from history,
Assistant draft proposed `SCAN` – added to the current tab
Below what is already written, through an empty line; the cursor stands at the beginning of the insert,
Nothing is being done. If the viewing tab is open, the text goes to
the last tab of the editor; a new tab is created only if there are no others.

### Editor and implementation

The editor numbers the lines, highlights the syntax, complements the keywords,
tables and columns at the cursor (including by pseudonym: `o.` after
`FROM orders o`), formats a query, comments on lines, and searches with replacement.
MongoDB receives commands in familiar shell syntax, for example.
`db.orders.find({ status: "paid" })`.

| Action. | macOS | Windows / Linux |
| --- | --- | --- |
| Perform allocation or operator under cursor | `⌘↵` | `Ctrl+Enter` |
| Execute the whole script | `⌥X` or `⇧⌘↵` | `Alt+X` or `Ctrl+Shift+Enter` |
| Supplement at cursor | `⌃Space` | `Ctrl+Space` |
| Format | `⇧⌘F` | `Ctrl+Shift+F` |
| Comment on the lines | `⌘/` | `Ctrl+/` |
| Search and replacement | `⌘F` | `Ctrl+F` |
| Cancel the request | `⌘.` | `Ctrl+.` |
| EXPLLAIN | `⌘E` | `Ctrl+E` |
| History. | `⌘H` | `Ctrl+H` |
| AI assistant | `⌘I` | `Ctrl+I` |

Without allocation, the operator is executed on the cursor line, as in classical
SQL Clients: Operators are separated `;` (beyond lines and comments) and empty
lines; from any line of the multi-line operator it is executed in its entirety;
if there are two operators on the line, the one under the cursor is selected; on the empty line
The nearest operator above (if not, below). In Redis and MongoDB
Same rule.

The entire script is executed by one operator and stops at the first one.
Mistake. Variables `{{name}}` are filled in in a separate window and transmitted.
The driver as parameters, not inserted into the text.

EXPLAIN shows the plan with a tree: each step has lines, cost and stripe.
a fraction of the step itself; the button "JSON" opens the original plan.
ANALYZE adds real time, but fulfills the request, so available
only for non-product connections and requires confirmation.

CQL doesn’t have EXPLAIN, so Cassandra/ScyllaDB has a button instead.
“Request Tracking”: the request is executed once with tracing
`system_traces` and the window shows the tree-coordinator and the total time under
Each node and its steps; the step lane is the time from the previous step of the node.
The longest marked. Only the first page of the result is read. Like.
ANALYZE, tracing performs the query, so it is only available for
non-production connections and require confirmation.

### Results, copying and export

The result is a compact table with row numbers: sorting and filter by
column, fixing and hiding columns, viewing the full value. Grid.
first loads a part of the lines (by default 1000, the limit is set to
“Limitations” of connection, the rest is loaded with the button “Download more”.
On the phone, the result is shown with recording cards. Values of columns with
names such as `password`, `token`, `secret` are hidden, and when copying the buffer
The exchange is cleared automatically.

Clicking on the cell highlights it with a frame `⌘C` / `Ctrl+C` copies the value),
clicking on the line number selects the line, Shift + click expands the selection,
ч/Ctrl+ Click adds or removes the string, Esc removes the selection. In the line
state seen "Selected lines: N"; copy, export, and AI assistant
Work with selected lines, if any.

You can copy a cell, string, highlight or the entire downloaded result in
CSV, TSV, JSON, NDJSON, Markdown or as SQL `INSERT`.
Re-executes the query and records all lines without the grid limit, with
progress and repeal. Reading Requests Only Exported: Modifying
The request for export is not repeated.

In CSV and TSV checkbox "Screen formulas (for Excel)" (on by default)
adds an apostrophe before the text, which begins with `=`, `+`, `-`, `@`.
tabulation or return of the carriage, so that the tabular editor does not perform it as
formula; the numbers from the number columns do not change. Lines in SQL `INSERT`
экранируются удвоением кавычки ( `''` ); для MySQL, MariaDB и ClickHouse
the inverse slash is doubled, for PostgreSQL the text with it is written as
`E'…'`, so that the file is read the same under any screening settings.

### Results panel

To the left of the result - a switch of the form: "Table" (grid), "Text"
(The text table is lined with a mono-width font, it can be distinguished and
copy; shows up to 2,000 lines, NULL as `[NULL]`, hidden values
Dots) and “Record” (one line in the form “field → value”). Selected view
It's memorized for tabs. In the headings of the columns - an icon of the type (number, text, etc.)
date and time, yes/no, JSON, binary data) and key at key columns; NULL
This is shown as subdued `[NULL]`.

The result is a toolbar:

- **Refresh** (F5, ⌘R / Ctrl+R) runs the tab's last read query again after a
  fresh review; its menu turns on auto-refresh (off, 5 s, 10 s, 30 s, 1 min,
  5 min). Auto-refresh only repeats read queries (production included) and
  skips a beat while changes are pending, a query runs or the window is hidden.
- **Save** (⌘S / Ctrl+S) applies the pending changes; its menu has **Show
  SQL**. **Discard changes** (⌥⌘Z / Ctrl+Alt+Z) drops them.
- Rows: **Edit the current row** (⇧↵, opens the Record view), **Add a row**
  (⌥⌘N / Ctrl+Alt+N), **Duplicate the row** (⌘D / Ctrl+D) and **Delete the
  row** (⌘⌫ / Ctrl+Delete; every selected row when there is a selection).
- Navigation: first (⌘↑ / Ctrl+Home), previous (⌥↑ / Alt+↑), next (⌥↓ /
  Alt+↓) and last (⌘↓ / Ctrl+End) row; ↑/↓ also move the current row in the grid.
- **Export data…** (⇧⌘E / Ctrl+Shift+E) and **Import data…** (CSV into the
  result's table, see below).
- The gear and the "String at a time" field specify the size of the next portion (1-1000,
  remember to connect; “Download the next portion” and “Download”
  All lines" (within the memory limit of the result).

Status line: how many lines are received, run time, date and time
end, "there are more" if the strings are left on the server, the number of selected
lines and unsaved changes.

### Change of lines

On a computer in a session with a permissioned record (non-product connection or sale with
open recording window) a row of the result of a simple `SELECT` from a single table
It can be changed, added and removed. The line is determined by the primary key, and
If not, the first unique key from the NOT NULL column (line address)
`ctid` is unstable and unused. Without that key, for ClickHouse,
Redis and MongoDB, as well as on the phone, the change buttons are inactive, and the hint
Explains why.

- Double-click cell (or Enter/F2) – edit in place: Enter leaves
  value in the list of changes, Esc cancels, Tab moves to the next
  The cell. Type is taken from the column and checked at input, NULL - separate
  switch. Altered cells are illuminated in yellow.
- The new line is illuminated in green, the line number is +. Columns that
  will fill the server (default value, identity, auto-increment), shown
  As `[ПО УМОЛЧАНИЮ]`, the rest are empty `[NULL]`. Mandatory columns
  (NOT NULL with no default value) must be filled in: otherwise Save
  Illuminate them and send nothing. Computed columns are not recorded.
- “Duplicate” copies a string with no key, computable, or hidden values.
- Removable line crossed out and illuminated in red until saved; repeated
  "Delete" removes the mark, the new line is deleted immediately.

Before "Save" nothing is done. The core builds from change
parameterized `DELETE`, `UPDATE` and `INSERT` (in this order) on the key,
a verification shows the same operators with literal values and requires
Storage password; sales protection is not enough. After confirmation, operators
are executed in one transaction, and each has to change exactly one line.
Otherwise, everything rolls back. The result is then updated. "Show SQL."
opens operators in code form: they can be copied or added to the current
Editor's tab. When re-launching, updating, changing the set
results, closing the tab or exiting the connection are unsaved
Changes, the app asks: save, cancel or stay.

### Imports from CSV

For PostgreSQL, MySQL, MariaDB, SQLite, ClickHouse and Cassandra/ScyllaDB on your computer
CSV data can be uploaded to a table, MongoDB to a collection, and Redis to a table.
to the database or key folder: “Data Import...” on the result panel (in the table)
the result, if it is a request to one table with a key) or "Import from CSV ..." in
menu tables, collections, Redis databases or key folders in a tree. Permitted recording is required (on the sale - an open recording window). Master:

1. ** File** - CSV, TSV or text up to 200 MB; the file is stream-readable and nowhere.
   Except for this base, it's not transmitted.
2. ** Reading options** with live viewing of the first 100 lines: encoding (UTF-8)
   by default, BOM is recognized; Windows -1251, Latin-1), separator
   (determined automatically: `,` `;` TAB `|`), quote symbol, line
   header, skipping lines at the beginning, what counts as NULL (empty field, `NULL`)
   `\N`), the decimal divider and the order of the day, month and year in dates.
3. **Columns** – each column of the file falls into the table column (by name)
   omitted or omitted; the first 1000 lines are checked
   compliance with types, problem values are shown by examples, and
   mandatory columns without values - a warning.
4. **Import options** - add; add, omitting existing ones
   keys; add or update keys PostgreSQL and SQLite
   `ON CONFLICT`, MySQL `ON DUPLICATE KEY UPDATE`; packet size; if the line is wrong,
   stop importing or skip it and record the report
   `<файл>.errors.csv`; one transaction per file or per packet;
   “Delete all rows of the table first” (default switched off; this
   `DELETE FROM` in the same transaction and is visible on verification.
5. **Test and run** - like any change: single-line operators
   settings, storage password, sales protection. And then you load it.
   parameterized multi-line `INSERT` with progress (lines per second),
   The remaining time) and cancellation – the open transaction rolls back. In the end,
   Outcome: Imported, omitted, error-prone, and reference to the report.

Values similar to formulas are imported as is (shielding formulas -
export objective). While importing, other requests for this connection are waiting.

Features of the engines:

- **SQLite.** The file on this computer is written in the same way as PostgreSQL: one
  Transaction or packet, if errors are missed - save points. Through
  `sqlite3` on the host SSH, Docker, Kubernetes each operator is fixed
  There is no “one transaction for the entire file” option, but it is stopped.
  import leaves already written lines. "Add or update" requires
  declared primary key or unique limitation (at the table)
  Only with `rowid` it is not.
- **Cassandra and ScyllaDB.** There are no CQL transactions: each line is a separate line.
  `INSERT`, imports are not rolled back. Regular `INSERT` in CQL overwrites
  a string with the same key, so "add" and "add, skip"
  Existing" write `INSERT … IF NOT EXISTS` (easy transaction: existing
  Keys are considered missing, and "add or update" is easy.
  `INSERT` "Delete all lines first" is `TRUNCATE`. Type `counter`
  It is not imported (counters are changed only through `UPDATE`).
- **ClickHouse.** There are no transactions, the MergeTree sorting key is not unique.
  Therefore, it is only possible to "add": each packet is one `INSERT`.
  Written in whole or not recorded. Columns `MATERIALIZED`, `ALIAS`
  and `EPHEMERAL` are not filled, `DEFAULT` can be skipped.
  All the lines are `TRUNCATE TABLE`.
- **MongoDB.** Columns are matched to collection fields (sampled)
  documents with their predominant BSON type; a column without a pair can create
  A new field with its own name - the type is taken according to each value (integer, number, etc.).
  `true` / `false`, date or date and time, otherwise text). No field names.
  They begin with `$` and do not contain a point. Documents are written in packages
  `insert` with `ordered: false`, so each is recorded or rejected
  separate; empty fields are not recorded. "Missing existing" and
  "Add or update" works on `_id` (its column must be
  matched; 24 hexadecimal characters in the objectId field become
  ObjectId); Update `update` with `$set` and `upsert: true`. Date and time
  Time zone-free is considered UTC. "Delete all documents first."
  `delete` with an empty filter.
- **Redis.** One column - `key` (if the import goes to the key folder, its
  The prefix is added at the beginning. Another column compared with `value`.
  gives a string `SET` , several columns with field names - hash `HSET` .
  Empty fields are skipped. "Add" and "missing existing" do not
  overwrite the key: the string is written `SET … NX`, for the hash first
  Verified `EXISTS` (verification and recording of non-atomic)
  Update" rewrites the string and adds hash fields. Every key,
  a separate command, no transactions; base clearing `FLUSHDB` is not.

В меню схемы ( PostgreSQL ) или базы (MySQL, SQLite, ClickHouse) есть «Создать
table from CSV ...": a simple `CREATE TABLE` is built on the first lines of the file
(integer, decimal, dates, date and time, yes/no, otherwise text; in ClickHouse -
`Nullable` columns and `ENGINE = MergeTree ORDER BY tuple()` which can be
Copy or open in the editor and perform through normal verification. For
Cassandra does not have this item: the CQL table needs the primary key, and from the file it is
Do not output; MongoDB and Redis do not create tables.

### Table designer

You can create or change a table without manual SQL. "Create a table..."
Schema menu PostgreSQL, databases (MySQL/MariaDB, ClickHouse, SQLite), keyspace (Cassandra/ScyllaDB) and folders
"Tables", as well as a button in the header of the workspace; for MongoDB item
It's called "Create a Collection..." and it's available from the connection database.
“Change the structure...” in the table menu loads its current structure. For Redis.
There's no designer.

The constructor opens with a tab next to the editor’s tabs: name, diagram or
database, comment and sections "Columns", "Keys", "External keys",
“Indices”, “Verifications”, “Parameters” and “DDL”. The column table gives you a name.
type (list of search engine types or type), length and scale, NOT NULL,
Default value (with ready-made options like `now()`)
`CURRENT_TIMESTAMP`, `gen_random_uuid()`), autoincrement (identity or
`serial` in PostgreSQL, `AUTO_INCREMENT` in MySQL, primary key, uniqueness
and comment; columns are dragged, duplicated and removed. Normal.
The text in the default value field becomes a string `active`
`'active'`), expressions and numbers remain as they are. External keys are selected
table and columns from the base structure and actions ON DELETE/ON UPDATE;
Indices PostgreSQL have methods btree/hash/gin/gist/brin/spgist. For
ClickHouse is used instead of NOT NULL `Nullable(T)`.
`LowCardinality(T)`, engine (family MergeTree, Memory, Log), mandatory
Sorting key ORDER BY, PRIMARY KEY and PARTITION BY; foreign keys,
There is no uniqueness or verification. For MongoDB fields with BSON type and
be required to be converted into a validator `$jsonSchema`, available capped,
time series, verification level and action, collation and indices.

**SQLite.** Types with SQLite rules (INTEGER, TEXT, REAL, NUMERIC, etc.)
BLOB, DATE and others, your type can also be entered, `AUTOINCREMENT`
the single column of the INTEGER primary key, uniqueness, verification,
foreign keys and indices; in the "Settings" - `STRICT` (stringent types: INT only,
INTEGER, REAL, TEXT, BLOB, and ANY, or `WITHOUT ROWID` (primary key required).
There is no comment on SQLite. Rename of table and columns, appendix
columns at the end (without a key, with a constant default value) and indices
They are changed in place through `ALTER TABLE`. Everything else - removal of the column, change
type, NULL or default values, keys, checks, foreign keys and
parameter - recreates the table, as advised by the SQLite documentation:
table under a temporary name, row transfer, deletion of the old, renaming
And redesigning indexes. The script is executed by a single transaction (and for the file on the
This computer, and through `sqlite3` on the host, checks the foreign keys for it.
Time is switched off so that the deletion of the old table does not affect the rows of other
tables. If there is something in the table that the designer does not tolerate (triggers),
Computable columns, COLLATE, expression indices, partial or in order,
Changes that require re-creation are not carried out - they must be made in
Editor; renaming and new columns still work.

**Cassandra and ScyllaDB.** The primary key is required: the first N of its columns are
party key ("Key columns in the key of the party", by default 1), the rest -
cluster columns with the order of clustering (for example, `at DESC`). Available.
CQL types, including collections `list<text>`, `set<int>`, `map<text, int>`
`frozen<…>`), counters (then all columns outside the key are counters), secondary
indices on one column, table comment, TTL by default and
`gc_grace_seconds`. Default values, uniqueness, checks and external
There are no keys in CQL. Once the key is created, clustering order and column types
do not change, the table cannot be renamed, and you can only rename
Key columns; columns are added and removed, indexes and parameters
They change. CQL operators run one at a time, without a transaction.

While the table is designed, nothing is executed on the server: changes
They're piling up in a draft. Tab, new and modified lines are marked, new
The table and its columns are immediately visible in the tree in green, modified in orange.
(with a point-of-tag); clicking on them returns to the designer. There's a cancellation.
The last step and cancel all changes. Testing is on the fly: empty and
Repetitive names, unknown columns in keys, types without the desired length,
ORDER BY for MergeTree, AUTO_INCREMENT without a key, etc.; identifiers
They are always taken in quotation marks, so reserved words and any symbols.
They're safe. The "DDL" section shows the final script; it can be copied or
Add to the current tab of the editor.

“Save Changes” (аS/Ctrl+S) opens the “Save Table” window.
changes" with a full script (backlit, line numbers, line transfer),
The buttons "Open in the editor", "Copy", "Cancel" and "Execute". This and
There is confirmation: the window warns about data deletion or restructuring
tables, asks for the password phrase of the store, and the execution is the usual
query verification and production protection (to connect the product, you need to open a window)
recordings). In PostgreSQL, a script is executed with a single transaction: if an error does not occur,
Nothing changes; so does SQLite. In MySQL/MariaDB, ClickHouse, MongoDB, and Cassandra DDL, the non-transactional DDL is a non-transactional one.
The window warns about this, and in case of an error, it shows which operators are already operating.
applied. After success, the tree is updated and the designer continues to work.
with a table on the server. When closing tabs with unsaved changes
The designer asks “Save/Do Not Save/Cancel.”

When changing the existing table, the designer compares the draft with
structure on the server and builds ALTER: add, delete and rename
columns, type change, NULL and default values, keys, indexes and
In PostgreSQL - removal of identity and change of ALWAYS  с BY DEFAULT,
UNLOGGED (when created and through `SET LOGGED/UNLOGGED`); in ClickHouse -
renaming the table `RENAME TABLE`, removing the default value and
column comment. Comments may contain an apostrophe (in MySQL/MariaDB)
without the inverse slash. Constraints: Parameters set when creating
(engine, ClickHouse sorting key, partitioning), do not change here;
The transition between serial and identity in PostgreSQL is done in the editor. TTL and
The SETTINGS ClickHouse application does not run in the constructor or in the
Editor: They are not disassembled by the SQL analyzer through which everyone passes.
query, use `clickhouse-client` in the terminal.

### History.

Query history is conducted for each connection: text, time,
Duration, number of lines and error. Parameter values and results data
They don't get into it. Filters: All requests, successful, error-free, selected. Po Po
the default history is stored only on this device in encrypted form;
It can be enabled in encrypted synchronization or disable. A request from history
can be saved as a snippet: variables `{{name}}` will become variables
snippet.

### Snippets for databases

In the section "Snippets" → "Basic sets" there are ready-made sets of diagnostic
Queries: “SQL · PostgreSQL” (20), “SQL · MySQL/MariaDB” (20),
"SQL · ClickHouse" (20), "Redis" (15), "MongoDB" (15), "SQLite" (15) and "Cassandra / ScyllaDB"
(17: diagram of `system_schema`, cluster nodes, size estimates, batch, TTL,
tokens, roles and rights, time series table creation and `INSERT … JSON` They're added to
storage only at the press of a button, after which they can be edited and removed as
regular snippets. In sets: active and long requests, block tree,
Table and database sizes, use of indexes, dead rows and autovacuum,
Replication and slots, changed settings, heavy requests
`pg_stat_statements`, digests `performance_schema`, `system.query_log`,
ClickHouse chunks, mergers and mutations, memory and slow Redis commands,
`currentOp`, statistics and profiler of MongoDB. Almost all requests are just
read; `EXPLAIN ANALYZE` (fulfills the request), cancel the request, and `KILL`
marked as altering, session closure PostgreSQL as disruptive, and
A confirmation is required before launch. In the description of each snippet is indicated
client (psql, mysql, clickhouse-client, redis-cli, mongosh) and requirements
version or extension.

The type and dialect of the snippet are the same as those used by history: PostgreSQL
`postgresql`, MySQL/MariaDB and ClickHouse – `sql` with dialect `mysql` /
`clickhouse`, Redis `redis_cli`, MongoDB `shell` with `mongosh`. Therefore,
snippets are also suitable for the SSH terminal: run in the psql session, mysql,
clickhouse-client, redis-cli or mongosh and select a snippet – after filling in
It will go into the active tab as a text (not a risk confirmation).
via `sh -c` ); a multi-line request is sent with a single insert in mode
bracketed paste, if the customer has enabled it. New SSH session for such a snippet
The app won't open. Server administration commands (for example)
`CLIENT LIST`, `SLOWLOG`, `db.currentOp()`, `rs.status()` workspace
"Databases" do not allow, so they are labeled "terminal only."

### AI assistant

The assistant works with providers from Settings → AI: built-in model.
Local server or external API. He can do it.

- make a request for a description;
- Explain or correct the request;
- Optimize the EXPLAIN request;
- Translate the request into another dialect;
- make a snippet with variables from the request;
- offer standard queries to the table;
- Explain the selected lines of the result.

Before each request to the model opens the window “Check the context of AI”;
By default, all points are turned off:

- **Metadata schemas** - names of tables and columns with types, without data.
- **Selected lines** are only those that you marked as a result.
- **Selection of rows** and **Verification query** - model can look up to 20
  rows of a table or perform one read request (up to 50 lines, 10 seconds).
  Recording this way is impossible even for sale.

Without consent, the model does not receive any schema or data. Passwords, lines.
The server addresses and connections are never sent. Columns with secrets
They're hiding. For external providers with a privacy profile "Strict" names
Tables and columns are replaced by pseudonyms, and in response are restored.
Consent can be revoked by a button in the assistant panel.

The answer is a draft with an explanation and a list of the given context.
Draft" adds it to the current tab of the editor; the assistant itself is nothing.
The request is executed by you, with the usual checks. For
DDL draft connections are only shown.
