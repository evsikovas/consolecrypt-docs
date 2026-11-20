# ConsoleCrypt 0.8.5

Translated reference · [Russian source](../RELEASE_0_8_5.md)

## Russian

The release is available for macOS, Windows, Linux and Android. Assembly and inspection iOS postponed.

**Databases – new section.** PostgreSQL, MySQL and MariaDB, ClickHouse, Redis
and MongoDB. Connections are stored in encrypted storage, requests go
directly from the device.

- Connections: Form with Communication Checker, Connection Line Import and `.pgpass`
  The color of the label, groups and tags, the view of the tiles or list.
- Itinerary to the base: directly, through SSH host, jump profile or proxy, through
  saved SSH - tunnel, feed throw Kubernetes or container Docker
  The tunnel and the drip rise themselves when connected.
- Connections marked “Prod” are read-only; role rights are available
  check it out. In the rest, the record is included explicitly.
- Workspace in the spirit of classic SQL clients. On the left is a folder structure.
  (tables, views, functions; columns, indices, constraints, triggers)
  The open table is marked with a frame. On the right, the request tabs, the editor with
  line numbers, backlighting, auto-addition at the cursor, formatting and
  Replacement search.
- Execution of a dedicated or current operator ( Вы/Ctrl+Enter) and all
  Script ( X/Alt+X). Variables in requests, verification and confirmation
  Changing requests.
- The results are a compact table with row numbers, sorting, filter,
  fixing and hiding columns; on the phone - recording cards.
- EXPLAIN and EXPLAIN ANALYZE in the form of a plan tree with time, lines and
  cost.
- Correct cells in the results of one table with SQL viewing before use.
- Export and copy results, history of requests with favorites, snippets.
- AI query assistant: compile, explain, correct, and speed up a query.
  The diagram and lines will only enter the model with your consent.
- Redis: Key tree via SCAN and hint instead of KEYS. MongoDB: Teams in
  It's a familiar shell syntax.
- Kubernetes: “Connect to the database” button at the bottoms with standard base ports
  data.

** Docker - new partition.** Engine on this computer or saved
SSH - host; if the user does not have rights to the socket Docker, this is immediately visible.

- Containers are grouped by compose-projects, launched from above, filter by
  status and search.
- Logs, terminal inside the container, information: ports, networks, mounting,
  tags and JSON.
- Passwords in environment variables are hidden; you can show and copy them after
  Entering the vault password.
- The designs and containers that use them. Ways of volumes and
  mounts are opened in SFTP, and for local Docker - in the file
  Manager.
- Passing the port through the tunnel SSH. Passages Docker and Kubernetes collected in one
  right panel.
- Connect to a database from a container with a single button.
- Menu compose project: start, stop or restart everything
  See YAML. Adjustment - after the password of the store: changes are checked,
  A backup copy is stored nearby, then the project is restarted.

** Interface.

- Drop-down lists in glass style with a compact font. Menu, tips and
  dialogs are colored in the background color from the settings.
- The AI indicator is green, only as long as the built-in model is actually running.
- SFTP shows "no access" for unlicensed folders instead of a blank list.
- An update is offered even if only the build number is newer.
- The installer for macOS has become smaller.

Details: [руководство по базам данных](DATABASES.md) and
[руководство по Docker](DOCKER.md).
