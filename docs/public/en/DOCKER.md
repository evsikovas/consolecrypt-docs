# Docker

Translated reference · [Russian source](../DOCKER.md)

## Russian

Section Docker shows containers, volumes, and compose engine designs on this
on a computer or on a saved SSH host. It's got logs, a terminal inside.
container, inspect information, port forwarding, connection to the database from
Container and edit compose files. The client accesses the Docker API himself:
for the local engine - through its socket, for the SSH host - through SSH - connection
this host. This section is available on macOS, Windows, Linux and Android. For iOS, release CI packages the app as a ZIP and checks that it launches in Xcode Simulator on a Mac.
Testing this feature on a physical iPhone requires a separate run.

### Hosts and rights

Open Docker in the side menu. In the list - "This computer" and saved
SSH - Hosts; search narrows the list. Click "Connect": in the cap will appear
engine version, OS and architecture, number of launched containers. The button with
The arrow turns off and returns to the host selection.

If SSH a user does not have rights to a socket Docker, it is immediately visible:
Explains the cause and shows the command `sudo usermod -aG docker <пользователь>`
with a copy button. Run it on the host yourself - its application is not
Start and connect again: the new group is active in new SSH sessions.
If SSH the server prohibits socket transfer Docker and there is no docker CLI on the host,
include `AllowStreamLocalForwarding yes` in `sshd_config` or install
docker CLI. If Docker is not running, the application will notify you.

Actions are performed with user rights Docker on the host; the application does not
Increases rights and does not use `sudo`. Change of profile and lock of storage
The session is closed Docker.

[Choose a local Docker engine or WSL](../../../guide/en.md#docker-containers-local-engine)

### Containers.

Containers are grouped by compose-projects: first projects with running
Containers, at the end, separate containers. The group's headline shows,
How many containers are running, and the group is folding. The filter is searched by name and
The All/Run/Stopped switch narrows the list.

In the container line: status, health check, image, short ID, status
and ports. Buttons start, stop and restart the container, open
Log and terminal. In the menu "..." - suspend and resume, forcibly
complete, delete, drop the port, connect to the database, information and
Copying the ID. Compulsory termination and removal require confirmation;
Volumes and networks are kept by default. Select individual eligible resources in the removal dialog to delete them.

[Port lists and container removal](../../../guide/en.md#docker-containers-remove)

### Information, logs and terminal

Click on the container - the information will open to the right of the list (on the phone -
separate screen).

- **Overview**: image, command, creation and launch time, restarts, project and
  compose service, ports, networks with IP addresses, mounting (type, source, etc.)
  The path in the container, mode, tags and environment variables.
- ** Logs: stream of new lines, stderr highlighted in color. Pause saves new ones
  lines before continuation, timestamps are included separately, search
  It shows the number of matches. The lines shown can be copied or
  Clear the screen; only the last lines are stored.
- ** JSON **: Check response with hidden secrets and copy button.

The terminal opens the shell inside the container in the terminal tab.
Automatic selection tries `bash`, `ash` and `sh`; shell can be specified
Clearly.

[Deploy a Docker container to Kubernetes](../../../guide/en.md#docker-details-deploy-kubernetes)

### Secrets.

Without a storage password, section Docker does not show or copy values.
They look like secrets. Instead, `••••••` (the length of the value is not disclosed):

- Values of variables and labels whose name is similar to a secret: `PASSWORD`
  `TOKEN`, `SECRET`, `KEY`, `DSN`, `CERT`, `SESSION`, `COOKIE`, `SALT`.
  `SIGNATURE` and so on `*_FILE` and `*_PATH` are paths visible.
- password in the address of the type `схема://пользователь:пароль@хост` - user, host
  and the path remains;
- command line flag values: `--password`, `--token`, `--secret`
  `--requirepass`, `--api-key`, `--key`, and MySQL and MariaDB `-p<пароль>`.
  y `redis-cli` - `-a`;
- PEM private keys as a whole and tokens of known formats GitHub, GitLab,
  Slack, `sk-…`, access keys AWS, JWT.

References to variables `${POSTGRES_PASSWORD}` are not concealed: it is not itself
secret.

Where it operates: information about the container (command, arguments, labels, variables),
tab JSON and view compose files. In the environment variables "Show
Secrets" opens values; on the tab JSON "Show in full" opens
whole inspection. Both buttons request the storage password; the full JSON is copied
as a secret and is automatically removed from the clipboard. Disclosed data
Forgotten when closing the card, updating, locking the storage and changing
profile.

Logs are shown as is: these are application data. If in the copied lines
(button or highlight) is a secret, the text is copied as a secret and
It is automatically removed from the clipboard.

The container terminal provides full access, including environment variables.
`env` . When you first open the terminal in the profile, this is reminiscent of a hint.

Storage password protects against accidental display of secrets on the screen and from
peeking. From a person behind an unlocked computer, it does not protect:
To do this, turn on autolock storage in the settings.

### Toms and files.

The view of "Tom" groupes volumes by compose projects and shows containers.
which use them; unused volumes are marked separately. Tom's path or
mounting opens in SFTP of this SSH host (mounting file - c)
allocation in the folder. For the local Docker path opens in the file
the manager; the packet folder macOS (e.g. `.app`) only stands out in the Finder and
It never starts. Docker Desktop stores volumes inside its virtual machine.
Their folders from the computer do not open - the application explains this.

### Port transfer

“Fly the port” connects the local port to the container port; by default
The ports of the container are proposed, and the local port `0` chooses the free port. For
SSH - Host dash goes through SSH - connection, local address -
`127.0.0.1`. Launched passes Docker and Kubernetes are collected in the common right
Panel "Port transfer": status, address with copying, number of connections,
Traffic and shutdown. The panel opens itself after starting the throw.

### Connection to the database

A container with a standard database port PostgreSQL, MySQL, MariaDB,
ClickHouse, Redis, MongoDB) has a button "Connect to the database" - in the line, in
menu and information. If the connection with such a route is already saved, it
It will immediately open in the "Databases" section. Otherwise, the form of a new one will open.
connection with the engine, address and route, as well as the base and user,
If they are surrounded by a container, you will need to enter a password.

- The published port is stored as an address on the Docker host:
  directly to the computer, to the SSH host, through the host.
- The unpublished port of the remote container is available via IP container
  SSH - host.
- Unpublished local container port receives container route
  Docker ”: the spillage is restored with each connection, the container is sought
  by name.

Connection from a remote host is offered as “Prod” by default; form
It allows you to change that.

### Compose projects

Click “...” in the header of the compose group or right-click on it.
mice:

- **Run All** only launches stopped project containers.
- **Stop everything** and **Reset everything** show how many containers there are
  It will affect the action, and await confirmation.
- **Show YAML ** opens project files with tabs with line numbers and
  backlight; at the top is the project folder and the environment files. Secrets in
  `environment`, `labels`, `command`, `entrypoint`, `healthcheck.test`.
  Passwords in addresses and keys are hidden, line numbers are saved.
  Fully" after the password, the storage displays the source text. The file that
  The user cannot read, marked with an explanation. Copying's on.
  through the auto-cleaning clipboard.
- **Change YAML ** requires a storage password: compose files may contain
  passwords and determine what is running on the host. In the editing mode, you see the original
  text. The permission to edit is valid for a limited time.

"Save and apply" first checks the configuration on the host by the command
`docker compose config` (or `docker-compose config` if stand alone)
utilities; nothing is saved in case of error. Then next to
Each modified file remains a backup copy.
`<файл>.bak-ГГГГММДД-ЧЧММСС`, the file is written and the project is updated
command `docker compose up -d`; its output and completion code are visible in the window.
"Save without use" leaves the running containers on the previous
configuration. If the file has changed on the host after opening, save
Cancel: Copy your edits and open the file again. No rights to record.
The file doesn't change. If the host does not have a compose utility, no changes are made.
They are preserved because they cannot be checked.

Save doesn't trust file names. Temporary file (with a random name) and
backup is created exclusively, without clicking on symbolic links,
And it's written through one open file, and the rights are put through that file.
Before checking, after it and around the renaming, the application verifys that it is
file still written by him (on this computer - by inode, by SSH - by
SHA-256 of the contents). If the file is replaced, the save is interrupted, and
The replaced original is restored from the backup. If the catalogue
The project is available for recording to other users, before saving it will appear
Warning, and preservation will continue only after confirmation.

Viewing and editing YAML work for projects whose containers store tags.
compose with file paths. Older versions of compose and other tools
No markings.
