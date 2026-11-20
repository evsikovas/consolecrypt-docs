# ConsoleCrypt 0.9.2

Translated reference · [Russian source](../RELEASE_0_9_2.md)

## Russian

The release is available for macOS, Windows, Linux and Android. Assembly and inspection iOS postponed.
The new key sharing and verification functions work with the synchronization server 0.2.2.

** New databases.**

- **SQLite** - files on this computer, as well as on the SSH host, in the Docker container or
  Submit Kubernetes through the program `sqlite3` (without copying the file). Default only
  reading. Tree: tables with columns "name (TIP)", keys, foreign keys, links and
  Triggers; representations, indexes, sequences, table triggers, and data types.
  DDL, request plan, export, correction of cells.
- **Apache Cassandra and ScyllaDB (CQL)** - keyspace, tables and user structure
  types, DDL, page-by-page results, cell editing by full primary key, export,
  Read-only mode for sale; all routes SSH, tunnel, Kubernetes, Docker.
  Through the tunnel, requests go through one node of the cluster.
- SQLite and Cassandra connections in this release are stored only on this device:
  They are not synchronized or shared.

**Database management.**

- ** Table builder** for PostgreSQL, MySQL/MariaDB and ClickHouse, creating collections
  MongoDB: columns, keys, foreign keys, indexes, checks and engine parameters. Changes in changes
  are accumulated in a draft and visible in a tree; "Save Changes" shows the final SQL and
  It performs it after confirmation (in PostgreSQL - in one transaction).
- **Result Panel:** Update with Auto Update, Save (with Show SQL) and
  “Cancel”, addition, duplication and deletion of lines, line transition, export and
  Import, portion size and "Download all lines", status bar. Line changes
  Accumulate to “Save” and are executed by a single transaction on a key. Types of Table,
  "Text" and "Write"; type and key icons in headings.
- **Import CSV** to tables PostgreSQL, MySQL and MariaDB: preview, encoding,
  autodetermination of the separator, comparison of columns with type checking, insertion,
  omission or key update, error report, progress and cancellation.
- The **Snippets button** (омJ/Ctrl+J) inserts a snippet under the editor's text.
- ClickHouse: The read-only check takes into account the function name register, just like ClickHouse itself.

**Safety.**

- **Storage key is controlled by the device.** The device remembers the key print.
  storage and does not receive another key from the server: if the discrepancy is shown
  Warning, synchronization stops.
- **New device approval:** Both devices show a common pair code and a signature
  Approval covers the storage key. With the old server, the key is tagged.
  “Not confirmed” before entering the storage password.
- **Co-workers' public access checks:** Colleagues' keys are secured and code-checked
  security or QR code; when you change the keys, new access is blocked. Secrets,
  Contexts Kubernetes and database connections by default are issued only to verified users.
  recipients. The code for adding your devices is entered from the screen of another device.
- **Confirmation with Touch ID, Windows Hello or fingerprint** instead of storage password
  If the device is enabled unlocking through the OS. Password change, kit
  Restoration, backups, device approval and account security
  They still need a password. Configure “Confirm actions with biometrics”.
- **Buffer:**Copied secrets do not make it into buffer history Windows and
  cloud buffer, universal clipboard macOS and buffer managers Linux
  Android are deleted on time even from the folded application. Allocation in the terminal and
  The logs don't make it into the history of the buffer either.

**Synchronization** (server 0.2.2).

- The client complies with the limits of the server: when limiting requests, the status shows
  “The server temporarily restricted synchronization, continue in ChCh:MM” instead of the error.
- If the storage object limit is exceeded, the unaccepted changes remain on the device.
  The Synchronization page offers “Repeat” after cleaning.
- Clear messages about device limits and too many new devices
  One day.

**Notes.**

- Save button (пS/Ctrl+S) and save status.
- Host Notes - from the host card (without connection) and the choice of the host in the panel.
- A note whose object is removed or inaccessible remains marked “Not tied”.
  It can be re-tied. Notes to team objects are personal.
- Repeated errors are shown with a single notification.
