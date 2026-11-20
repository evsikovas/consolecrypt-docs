# Server Settings Directory ConsoleCrypt

Translated reference · [Russian source](../CONFIGURATION.md)

> Same thing on the site: [справочник параметров](https://consolecrypt.dev/guide#server-reference).
> Same on the website: [configuration reference](https://consolecrypt.dev/guide#server-reference) .

Full list of synchronization server parameters **0.2.4** (protocol **1.13**):
What each key does, what values it takes, the default value,
The path to Helm and whether the meaning is a secret. The directory is compiled by download code
configuration `server/src/config.rs`, `server/src/config/*.rs`
`server/src/telemetry.rs`) and Helm chart templates. Verification
`server/scripts/test_configuration_docs.py` drops if the server receives the key,
which is not here, or a key that the server does not know is described.

How to set parameters in Docker Compose, `docker run`, Helm, JSON-file and
systemd, with ready-made examples - in [HOSTING.md](../HOSTING.md#как-задать-любой-параметр).
Step-by-step IdP and Active Directory connection in [ENTERPRISE.md](ENTERPRISE.md).

English version: [below](#english).

## How the server reads the settings

**Sources and Priority.** The server reads environment variables `CC_*` and
optionally, a private JSON file:

1. the variable environment of the process (including **clearly empty **);
2. the value of the JSON file indicated by the flag `--config <путь>` and without the flag
   variable `CC_CONFIG_FILE`;
3. the built-in default value.

Empty value equals "not given": if there is `CC_X=` in the environment (empty), the server
uses the default value ** and does not look at the JSON file for that key.
Only the known keys of this directory are read from the environment; the variable with
A typo in the name is silently ignored. In JSON, the file is unknown or
The repeated key stops the launch.

** Format of values.**

| Type | How to write down |
|---|---|
| logical | `true` / `false` , `1` / `0` , `yes` / `no` , `on` / `off` (line letters) |
| whole | decimal record without units and separators: `1073741824`, not `1GiB` |
| duration | integer in units from the key name: `_SECS` - seconds, `_MINUTES` - minutes, `_HOURS` - hours, `_DAYS` - day |
| address | `хост:порт`, such as `0.0.0.0:8080` or `[::]:8080` |
| list | through a comma and/or space `CC_AUTH_ALLOWED_DOMAINS`, `CC_OIDC_MFA_ACR_VALUES`; `CC_OIDC_SCOPES` through a space |
| fileway | absolute path inside a container or on a service host |

In the JSON file, all values are strings, including numbers and logical values:
`{"CC_MAX_VAULT_OBJECTS": "200000", "CC_HSTS": "true"}`.

**Access at launch.** An incorrect value stops the server with the message.
`invalid configuration: <КЛЮЧ>: …` ; the value does not enter the message.
The ranges (as shown in the tables) and the links between the keys are checked:

- any shared flag requires `CC_OBJECT_SHARING_ENABLED=true` and
  `CC_REQUIRE_REQUEST_PROOF=true`;
- `CC_REFRESH_TOKEN_TTL_SECS` not less than `CC_ACCESS_TOKEN_TTL_SECS`;
- `CC_AUTH_MODE=enterprise` requires `CC_AUTH_PROVIDER` and selected keys
  Provider, OIDC - also `CC_PUBLIC_URL` with `https://` .

Enterprise mode additionally checks at the start of the network: discovery and JWKS
IdP or connection, TLS and bind to the directory (see [ENTERPRISE.md](ENTERPRISE.md)).
When starting, the server writes a string `starting` to the log with the current configuration.
Passwords and databases URL are hidden in it. It is convenient to check that the key has reached.
process.

**When changes are applied.** Only when the process is restarted: file and
Circumstances are not read on the fly. Exception - redefinition of limits
a separate account `admin limits set`, they are valid without restarting no later than
than in 30 seconds.

**Secrets.** Secret values - `CC_DATABASE_URL` (if it contains a password)
`CC_DATABASE_PASSWORD`, `CC_SMTP_PASSWORD` and enterprise login files. Server's not.
Writes them in a magazine. No general mechanism `*_FILE`: variables
`CC_DATABASE_PASSWORD_FILE` or `CC_SMTP_PASSWORD_FILE` the server does not know. From the file.
Only five keys are read, which are the paths themselves:
`CC_OIDC_CLIENT_SECRET_FILE`, `CC_OIDC_TOKEN_KEY_FILE`,
`CC_LDAP_BIND_PASSWORD_FILE`, `CC_OIDC_CA_FILE`, `CC_LDAP_CA_FILE`. Base passwords and
Transmit SMTP through the environment Kubernetes `secretKeyRef`
`server.env`) or through a private JSON file with rights `0600`.

** Which commands read the configuration.** `serve` (default), `migrate` and
`admin …` download and validate the entire configuration, so the team `admin` needs to do so.
the same keys as the server (the container already has them). `healthcheck`
only `CC_LISTEN_ADDR` and checks `http://127.0.0.1:<порт>/readyz`.

## Network, public address, TLS and proxy

The server itself does not complete the TLS and does not have the certificate keys: HTTPS provides
reverse proxy or ingress before it. Proxy should transfer WebSocket
`/v1/events/ws` , receive query bodies up to 16 MiB and do not change path, query and
Body: These are included in the signature of the device.

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_LISTEN_ADDR` | - (in chart always `0.0.0.0:8080` ) | `0.0.0.0:8080` | `хост:порт` | no | Address and port HTTP /WebSocket API. On a host without a container and a proxy on the same machine, specify `127.0.0.1:8080` so that the API is not directly accessible. Port takes and `healthcheck`. |
| `CC_PUBLIC_URL` | `config.publicUrl` | non-predicted | URL `https://…` | no | Public base address of the instance `https://sync.example.org`, without `/v1` From it, buttons in letters `/account#action=verify`, `reset`, `deny-device` and OIDC return address `CC_PUBLIC_URL/v1/auth/oidc/callback` are built. Without it, emails contain only code and do not mention a web page. Must be an absolute `http(s)://` address without `?` and `#` (otherwise the server will not start). For OIDC, it is mandatory and should start with `https://` `http://` – only `127.0.0.1` / `localhost` for development. The page `/account` at this address is served by your site or the server itself `CC_WEB_ACCOUNT=true`; if it is not, the links from the emails will return 404 – the codes in the emails still work in the application. |
| `CC_WEB_ACCOUNT` | `config.webAccount` | `false` | logical | no | Built-in account page on the server itself: `GET /account` (+ `app.js`, `app.css`). Email confirmation, new code password from the email, "This is not me" for emails about new devices - only through public endpoints with code, no login, cookies and storage access; strict same-origin CSP. For self-hosted without a site: Enable and specify `CC_PUBLIC_URL` equal to the server address, reverse proxy must transmit `/account` and `/account/*`. Turned off, the server remains only the API. |
| `CC_TRUST_PROXY_HEADERS` | `config.trustProxyHeaders` `auto` = `ingress.enabled`, `"true"`, `"false"` | `false` | logical | no | Take the client address from the last** item `X-Forwarded-For` (the one that added your proxy). Enable only with one trusted proxy that overwrites or supplements the header, and with closed direct access to the API port - otherwise the client will forge the address. Without it, all IP limits see only the proxy address. |
| `CC_HSTS` | `config.hsts` | `true` | logical | no | Add `Strict-Transport-Security: max-age=63072000; includeSubDomains`. Turn off only if the proxy itself puts the HSTS or the subdomains must remain available on HTTP. |
| `CC_SOURCE_CODE_URL` | `config.sourceCodeUrl` | the address of the source assembly (the image sets it itself) | URL | no | A reference to the source code that `/v1/meta` gives as `source_code_url` (AGPL-3.0 §13). Do not ask for an official image. If you run a *modified* server, specify where to get your source code. |

## Database and connection pool

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_DATABASE_URL` | `database.url`, `database.existingSecret` + `database.existingSecretKey` or embedded `postgresql.*` | **required** | `postgres://…` URL | Yes, if with a password. | URL PostgreSQL 16: `postgres://пользователь@хост:5432/база?sslmode=verify-full`. For the external base, use `sslmode=verify-full` and with your own CA `sslrootcert=<путь в контейнере>`. A password in URL needs percent-encode; it is easier to transfer it separately to `CC_DATABASE_PASSWORD`. **Secret** if it contains a password. In Helm `database.url` it is stored in the Secret chart, and in `existingSecret`) it is stored in your Secret chart. |
| `CC_DATABASE_PASSWORD` | only with a built-in base `postgresql.auth.password` / `existingSecret`; for external - `extraEnv` with `secretKeyRef` | non-predicted | line | yes | Password that is inserted overhead URL; screening is not required. **Secret.** If not set either here or in URL, the driver uses a standard variable `PGPASSWORD`. |
| `DATABASE_URL` | — | non-predicted | `postgres://…` URL | Yes, if with a password. | Former name `CC_DATABASE_URL`, **only the environment. Used if `CC_DATABASE_URL` is not specified in the process environment; then it is more important `CC_DATABASE_URL` of the JSON file. |
| `CC_DATABASE_MAX_CONNECTIONS` | `database.maxConnections` | `20` | whole ≥ 1 | no | Pool size per process (pod), not less than 1. Each process holds another compound for `LISTEN/NOTIFY`. Make sure that `реплики × (значение + 1)` is less than `max_connections` PostgreSQL. Waiting for a free connection is 5 seconds. |
| `CC_DATABASE_CONNECT_TIMEOUT_SECS` | `database.connectTimeoutSecs` | `60` | seconds, whole | no | How many seconds does a startup repeat trying to connect to an inaccessible base (pause increases from 0.25 to 5 seconds) before ending with an error? Valid for `serve`, `migrate` and `admin`. |
| `CC_RUN_MIGRATIONS` | `migrations.runAtStartup` | `true` | logical | no | Apply built-in migrations at start-up (under the advisory lock - safe for multiple replicas). `false` - only if the migrations are performed separately ( `consolecrypt-server migrate`, Helm `migrations.job.enabled` ) or for a pre-verified rollback. The rollback of the image of migration does not cancel. |
| `CC_EVENT_BUS` | `config.eventBus` | `postgres` | `postgres`, `local` | no | How real-time events get to WebSocket clients: `postgres` `LISTEN/NOTIFY`, works with any number of replicas) or `local` (within a single process, only one replica; chart prohibits `local` at `replicaCount > 1` and autoscale). |

## Mail (SMTP)

Mail is needed for address confirmation and password reset codes, letters of protection
Devices, warnings about failed logins and invitations to teams.

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_MAIL_TRANSPORT` | `mail.transport` | `disabled` | `disabled` `none`), `smtp`, `file` | no | `disabled` (or `none`) – no letters are sent, the administrator uses `admin verify-email` and `admin reset-token`; `smtp` – sending via SMTP; `file` – only for development, each letter is written by a file in `CC_MAIL_DIR`. |
| `CC_MAIL_DIR` | `mail.file.dir` (emptyDir in pod) | `./.dev-mail` | catalogue | no | Catalogue for `file`; path relative to process work directory. Files are created with rights `0600`. |
| `CC_MAIL_FROM` | `mail.from` | `ConsoleCrypt <no-reply@localhost>` | address `Имя <a@example.org>` | no | The sender. The address must be authorized by your SMTP server and the sender’s DNS records. |
| `CC_MAIL_LANGUAGE` | `mail.language` | `ru` | `ru`, `en` | no | The language of the emails and the built-in account page. Emails go to HTML with a text alternative (UTF-8); the code is always shown for insertion into the application, its validity is taken from the TTL settings. |
| `CC_SMTP_HOST` | `mail.smtp.host` | — | hostname | no | The name of the SMTP server is required at `smtp`. |
| `CC_SMTP_PORT` | `mail.smtp.port` | `587` | 1–65535 | no | Port SMTP (1-65535). |
| `CC_SMTP_TLS` | `mail.smtp.tls` | `starttls` | `starttls`, `tls`, `none` | no | `starttls` (usually 587), `tls` – implicit TLS (usually 465), `none` – without encryption, only for local relay or test e-mail interceptor. |
| `CC_SMTP_USERNAME` | `mail.smtp.username` | non-predicted | line | no | SMTP login. Empty – without authentication (relay with IP access). |
| `CC_SMTP_PASSWORD` | `mail.smtp.password` (Secret chart) or `mail.smtp.existingSecret` + `existingSecretPasswordKey` | non-predicted | line | yes | SMTP password. **Secret**: Use `existingSecret` in Helm. |

## Registration, address confirmation, tokens and account passwords

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_REGISTRATION_OPEN` | `config.registrationOpen` | `true` | logical | no | Allow registration of new accounts. `false` - registration responds 403, `/v1/meta` reports `registration_open: false`; existing accounts are operational. Enterprise-mode does not work: accounts create the first login through IdP / directory `CC_AUTH_AUTO_CREATE`. |
| `CC_REQUIRE_EMAIL_VERIFICATION` | `config.requireEmailVerification` | `false` | logical | no | Require a confirmed address: without it, login, storage, command and common object creation meet `email_not_verified`. I need mail or `admin verify-email`. Example Docker Compose includes it. |
| `CC_EMAIL_VERIFY_TTL_SECS` | `config.tokens.emailVerifyTtlSecs` | `172800` (48 hours) | seconds, whole | no | Validity of the address confirmation code. |
| `CC_PASSWORD_RESET_TTL_SECS` | `config.tokens.passwordResetTtlSecs` | `3600` (1 h) | seconds, whole | no | The validity of the account password reset code (from the letter or `admin reset-token`). |
| `CC_ACCESS_TOKEN_TTL_SECS` | `config.tokens.accessTtlSecs` | `900` (15 min) | seconds, 60-86400 | no | Lifespan of access token, 60–86400. In short, a review is faster, but more often an update. |
| `CC_REFRESH_TOKEN_TTL_SECS` | `config.tokens.refreshTtlSecs` | `2592000` (30 days) | seconds, ≥ `CC_ACCESS_TOKEN_TTL_SECS` | no | Refresh token (device session without update); not less than access token. After that, the device re-enters. |
| `CC_ARGON2_MEMORY_KIB` | `config.argon2.memoryKib` | `19456` (19 MiB) | KiB, whole. | no | Argon2id memory for the hash ** account password ** (the server does not receive storage keys). New parameters are applied to new hashes; existing ones are checked with their own parameters before changing the password. |
| `CC_ARGON2_ITERATIONS` | `config.argon2.iterations` | `2` | whole ≥ 1 | no | Number of Argon2id passes. |
| `CC_ARGON2_PARALLELISM` | `config.argon2.parallelism` | `1` | whole ≥ 1 | no | Argon2id parallelism. |
| `CC_ARGON2_MAX_CONCURRENT` | `config.argon2.maxConcurrent` ( `4`) | number of CPUs, not more than 4 | whole ≥ 1 | no | How many hashes are counted at the same time (protection of the CPU and memory from input overload), at least 1. Peak Memory `CC_ARGON2_MEMORY_KIB × CC_ARGON2_MAX_CONCURRENT` – Keep it well below the container’s memory limit. |

## Devices and protection against entry from the new device

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_REQUIRE_REQUEST_PROOF` | `config.requireRequestProof` | `true` | logical | no | Require the signature of each request with the device key (protocol 1.5): the stolen token is useless without the key. `false` - a temporary exception for old customers: incorrect signatures are still rejected, missing only count `cc_request_proofs_total{result="missing"}`. Shared access requires `true`. |
| `CC_DEVICE_REQUEST_TTL_SECS` | `config.tokens.deviceRequestTtlSecs` | `86400` (24 hours) | seconds, whole | no | How long does a trust request for a new device wait to be approved on a trusted device live? |
| `CC_DEVICE_PROTECTION_ENABLED` | `config.deviceProtection.enabled` | `false` | logical | no | Protection against login from a new device: quarantine, restriction of release of unlock material to unconfirmed devices, letters "new device", event `device_registered`, recall of unused devices when resetting a password. The references to “It’s not me” are in `CC_PUBLIC_URL/account`. Details - [HOSTING.md](../HOSTING.md#защита-от-входа-с-нового-устройства). |
| `CC_NEW_DEVICE_MAIL_ENABLED` | `config.deviceProtection.newDeviceMail` | `true` | logical | no | Letters about a new device (acts with on protection and configured mail). |
| `CC_DEVICE_QUARANTINE_DAYS` | `config.deviceProtection.quarantineDays` | `14` | day, 0-365 | no | Quarantine a new device in a day, 0-365: at this time it cannot recall trusted devices, and changing the password and “exit everywhere” from it does not end the sessions of trusted devices. `0` – without quarantine. |
| `CC_ENVELOPE_LIMIT_ACCOUNT_PER_HOUR` | `config.deviceProtection.envelopesPerAccountPerHour` | `5` | integer ≥ 0, `0` - without limit | no | How many times per hour can unconfirmed account devices receive storage unlock material `0` without limitation? Counters are common to all replicas. |
| `CC_ENVELOPE_LIMIT_ACCOUNT_PER_DAY` | `config.deviceProtection.envelopesPerAccountPerDay` | `20` | integer ≥ 0, `0` - without limit | no | Same thing in a day. |
| `CC_ENVELOPE_LIMIT_DEVICE_PER_HOUR` | `config.deviceProtection.envelopesPerDevicePerHour` | `3` | integer ≥ 0, `0` - without limit | no | Same for one unconfirmed device in an hour. |
| `CC_NEW_DEVICE_MAIL_PER_HOUR` | `config.deviceProtection.newDeviceMailsPerHour` | `10` | whole ≥ 0 | no | We write about new devices per account per hour; the remaining inputs of the hour are reduced to one letter. |

## Synchronization, WebSocket and Quotas

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_SYNC_PAGE_BYTES` | `config.sync.pageBytes` | `8388608` (8 MiB) | bytes, ≥ 65536 | no | Budget bytes of one page `changes` / `snapshot` and lists of public access, not less than 65536. |
| `CC_QUOTAS_V2_ENABLED` | `config.quotas.v2Enabled` | `true` | logical | no | Server Quotas 0.2.2: accounting for tombstones and objects, device limits, removal of an unknown object without a tombstone. `false` returns behavior 0.2.1 (counters continue to be maintained). |
| `CC_MAX_VAULT_BYTES` | `config.quotas.maxVaultBytes` | `1073741824` (1 GiB) | bytes, ≥ 1048576 | no | Encrypted text plus tombstones per storage unit, at least 1 MiB. Over - `413`, `details.reason = "vault_quota"`. |
| `CC_TOMBSTONE_COST_BYTES` | `config.quotas.tombstoneCostBytes` | `256` | bytes, 0–1048576 | no | How many bytes of quota costs each tombstone (remote object), 0–1048576. |
| `CC_MAX_VAULT_OBJECTS` | `config.quotas.maxVaultObjects` | `100000` | whole ≥ 1 | no | Living objects and tombstones in one storage, at least 1. Over - `413`, `object_limit`. |
| `CC_MAX_VAULTS_PER_ACCOUNT` | `config.quotas.maxVaultsPerAccount` | `50` | whole ≥ 1 | no | Storage that the account owns is at least 1. Over - `403`, `vault_limit`. |
| `CC_MAX_DEVICES_PER_ACCOUNT` | `config.quotas.maxDevicesPerAccount` | `20` | 1–64 | no | Unrevoked Account Devices, 1–64 (64 is the limit of recipients of a common object). Entrance from another - `403`, `device_limit`. |
| `CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY` | `config.quotas.newDevicesPerAccountPerDay` | `10` | integer ≥ 0, `0` - without limit | no | New Account Devices for any 24 hours, `0` - without limitation. Over - `403`, `device_daily_limit` with `details.until`. |
| `CC_WS_PING_INTERVAL_SECS` | `config.websocket.pingIntervalSecs` | `30` | seconds, ≥ 1 | no | The ping interval in WebSocket is at least 1. Reduce if the proxy closes quiet connections faster. |
| `CC_WS_SESSION_RECHECK_SECS` | `config.websocket.sessionRecheckSecs` | `30` | seconds, 1-30 | no | How often an open WebSocket checks that a session is not canceled, 1–30: the review reaches the sockets no later than 30 seconds. |
| `CC_WS_MAX_CONNECTIONS_PER_USER` | `config.websocket.maxConnectionsPerUser` | `32` | whole ≥ 1 | no | Simultaneous WebSocket-account connections per replica, not less than 1; in excess - `429`. |

Individual account quotas change without restarting: `admin limits set --email
max_vault_bytes=... max_vault_objects=... max_devices_per_account=
new_devices_per_account_per_day=... `. ` CC_MAX_VAULTS_PER_ACCOUNT
It's overdefining.

## Shared access and teams

All sharing flags are turned off by default and require
`CC_OBJECT_SHARING_ENABLED=true` and `CC_REQUIRE_REQUEST_PROOF=true` (otherwise the server does not
It'll start. Turning off the flag hides objects of this type without removing them.
ciphertext. The client recognizes the possibilities by an authorized request
`/v1/shares/capabilities`. Details - [SHARING.md](SHARING.md).

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_OBJECT_SHARING_ENABLED` | `config.objectSharingEnabled` | `false` | logical | no | The main mechanism for sharing hosts. |
| `CC_SHARED_GROUPS_ENABLED` | `config.sharedGroupsEnabled` | `false` | logical | no | General groups (collections). |
| `CC_SHARED_SECRETS_ENABLED` | `config.sharedSecretsEnabled` | `false` | logical | no | Separate shared secrets. |
| `CC_SHARED_KUBE_CONTEXTS_ENABLED` | `config.sharedKubeContextsEnabled` | `false` | logical | no | General connections Kubernetes `supports_kube_contexts`. |
| `CC_SHARED_DB_CONNECTIONS_ENABLED` | `config.sharedDbConnectionsEnabled` | `false` | logical | no | Common connections to databases `supports_db_connections`. |
| `CC_SHARED_NOTES_ENABLED` | `config.sharedNotesEnabled` | `false` | logical | no | General notes to common objects `supports_notes_v1`: up to 500 notes per object, up to 288 KiB ciphertext per note. |
| `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED` | `config.sharingOwnerOnlineEnrollmentEnabled` | `false` | logical | no | Adding new recipient’s own devices with the participation of the owner. |
| `CC_TEAMS_ENABLED` | `extraEnv` | `true` | logical | no | Commands (common storages, `/v1/teams/*`, `capabilities.teams` in `/v1/meta`). It does not depend on shared flags. At `false`, the command routes respond 404, the data is stored. |
| `CC_MAX_TEAMS_PER_ACCOUNT` | `extraEnv` | `50` | whole ≥ 1 | no | The teams in which the account can be composed are at least 1. |
| `CC_MAX_TEAM_MEMBERS` | `extraEnv` | `200` | whole ≥ 2 | no | Members of the same team, not less than 2. |

## Limits to requests

Limits protect a server from a single account, device, or address. Majority
limits are stored in PostgreSQL (token bucket by base time) and the same
It works on all replicas; the three limits of the first stage live in the memory of each.
lines. In case of failure - `429 rate_limited` with `Retry-After` and `details.limit`.

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_RATE_LIMIT_ENABLED` | `config.rateLimit.enabled` | `true` | logical | no | `false` turns off **all* request limits (quotas remain). Just for debugging. |
| `CC_RATE_LIMIT_MODE` | `config.rateLimit.mode` | `observe` | `observe`, `enforce` | no | `observe` – exceeding the limits PostgreSQL and the reading limit are only considered `cc_rate_limit_observed_total{limiter}`, audit event `limit_exceeded` no more than once per hour per account and limit); `enforce` – rejected. The entry and recovery limits (noted below) and the first stages `CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE` and `CC_RATE_LIMIT_PROOF_PER_DEVICE_PER_MINUTE` operate in both modes. Observe the metric for a week, raise the thresholds if necessary, then `enforce`. |
| `CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE` | `config.rateLimit.authPerIpPerMinute` | `30` | whole in a minute | no | The first step in replica memory: public login, login and recovery requests from one IP IPv6 to /64) per minute. Until given `CC_LIMIT_AUTH_IP_RATE`, the same value is given by the total limit `auth_ip`. |
| `CC_RATE_LIMIT_PROOF_PER_DEVICE_PER_MINUTE` | `config.rateLimit.proofPerDevicePerMinute` | `20` | whole in a minute | no | Replica: Attempts to confirm the key (attest/approve) to the device per minute. |
| `CC_RATE_LIMIT_READ_PER_DEVICE_PER_MINUTE` | `config.rateLimit.readPerDevicePerMinute` | `1200` | whole, per minute; `0` - off. | no | Replica memory: Authorized readings (GET) per device per minute; `0` - no limit. Submitted `CC_RATE_LIMIT_MODE`. |
| `CC_RATE_LIMIT_LOGIN_PER_EMAIL_PER_MINUTE` | `config.rateLimit.loginPerEmailPerMinute` | unspecified `10` | whole in a minute | no | Former name (up to 0.2.2): frequency limit `login_email` per minute (and its capacity). If given `CC_LIMIT_LOGIN_EMAIL_RATE` it is ignored. |
| `CC_RATE_LIMIT_RECOVERY_PER_EMAIL_PER_HOUR` | `config.rateLimit.recoveryPerEmailPerHour` | unspecified `5` | whole in an hour | no | Former name: frequency `recovery_email` per hour. If given `CC_LIMIT_RECOVERY_EMAIL_RATE` it is ignored. |

### Limits PostgreSQL: `CC_LIMIT_<ИМЯ>_*`

Each limit has four keys `<ИМЯ>` – the name of the limit in capital letters:

- `CC_LIMIT_<ИМЯ>_RATE` - frequency of the main bucket: `N` in the natural period
  limit (specified in the table) or `N/s`, `N/sec`, `N/min` `N/m`, `N/hour` `N/h`,
  `N/day` `N/d`; fractional `N` is permissible; `0` - without the main bucket. If asked
  Only the frequency, the capacitance becomes equal to one period of this frequency.
- `CC_LIMIT_<ИМЯ>_BURST` - bucket capacity (how many requests in a row), the whole is not
  less than 1. By default, one frequency period, unless the table shows a spike.
- `CC_LIMIT_<ИМЯ>_PER_HOUR` and `CC_LIMIT_<ИМЯ>_PER_DAY` – additional ceilings
  For an hour and for a day, whole; `0` - no ceiling.

A limit without frequency and ceilings does not limit anything. Helm has all four keys.
is defined by block `config.rateLimit.limits`, for example
`{push_account: {rate: "600/min", burst: 600, perHour: 0, perDay: 0}}` (fields)
`rate`, `burst`, `perHour`, `perDay`. For a separate account,
`admin limits set --email … push_account_rate=600/min` (suffixes `_rate`)
`_burst`, `_per_hour`, `_per_day`; entry limits are not overridden.

| Name. | What's limited | By default. | Keys. |
|---|---|---|---|
| `push_device` | Sending changes from one device | 120/min, spike 60 | `CC_LIMIT_PUSH_DEVICE_RATE`, `CC_LIMIT_PUSH_DEVICE_BURST`, `CC_LIMIT_PUSH_DEVICE_PER_HOUR`, `CC_LIMIT_PUSH_DEVICE_PER_DAY` |
| `push_account` | Sending changes to all account devices | 300/min | `CC_LIMIT_PUSH_ACCOUNT_RATE`, `CC_LIMIT_PUSH_ACCOUNT_BURST`, `CC_LIMIT_PUSH_ACCOUNT_PER_HOUR`, `CC_LIMIT_PUSH_ACCOUNT_PER_DAY` |
| `mutations_account` | the number of changes within the account submissions | 50,000 per hour | `CC_LIMIT_MUTATIONS_ACCOUNT_RATE`, `CC_LIMIT_MUTATIONS_ACCOUNT_BURST`, `CC_LIMIT_MUTATIONS_ACCOUNT_PER_HOUR`, `CC_LIMIT_MUTATIONS_ACCOUNT_PER_DAY` |
| `unknown_delete_account` | Deleting objects that were not on the server | 1000/day | `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_RATE`, `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_BURST`, `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_PER_HOUR`, `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_PER_DAY` |
| `share_write_account` | creation of common objects | 60/hour, spike 20 | `CC_LIMIT_SHARE_WRITE_ACCOUNT_RATE`, `CC_LIMIT_SHARE_WRITE_ACCOUNT_BURST`, `CC_LIMIT_SHARE_WRITE_ACCOUNT_PER_HOUR`, `CC_LIMIT_SHARE_WRITE_ACCOUNT_PER_DAY` |
| `share_revision_account` | audit of common facilities, change of access, general notes | 600/hour | `CC_LIMIT_SHARE_REVISION_ACCOUNT_RATE`, `CC_LIMIT_SHARE_REVISION_ACCOUNT_BURST`, `CC_LIMIT_SHARE_REVISION_ACCOUNT_PER_HOUR`, `CC_LIMIT_SHARE_REVISION_ACCOUNT_PER_DAY` |
| `recipient_lookup_account` | mail-order | 30/min and 300/day | `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_RATE`, `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_BURST`, `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_HOUR`, `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_DAY` |
| `enrollment_account` | Adding the recipient’s own devices | 30/hour | `CC_LIMIT_ENROLLMENT_ACCOUNT_RATE`, `CC_LIMIT_ENROLLMENT_ACCOUNT_BURST`, `CC_LIMIT_ENROLLMENT_ACCOUNT_PER_HOUR`, `CC_LIMIT_ENROLLMENT_ACCOUNT_PER_DAY` |
| `trust_request_device` | Trust Requests from a Single Device | 10/hour | `CC_LIMIT_TRUST_REQUEST_DEVICE_RATE`, `CC_LIMIT_TRUST_REQUEST_DEVICE_BURST`, `CC_LIMIT_TRUST_REQUEST_DEVICE_PER_HOUR`, `CC_LIMIT_TRUST_REQUEST_DEVICE_PER_DAY` |
| `trust_request_account` | Trust requests for all account devices | 30/day | `CC_LIMIT_TRUST_REQUEST_ACCOUNT_RATE`, `CC_LIMIT_TRUST_REQUEST_ACCOUNT_BURST`, `CC_LIMIT_TRUST_REQUEST_ACCOUNT_PER_HOUR`, `CC_LIMIT_TRUST_REQUEST_ACCOUNT_PER_DAY` |
| `verification_account` | Key reconciliation: announcement of the approving device, signed storage key prints | 20/hour | `CC_LIMIT_VERIFICATION_ACCOUNT_RATE`, `CC_LIMIT_VERIFICATION_ACCOUNT_BURST`, `CC_LIMIT_VERIFICATION_ACCOUNT_PER_HOUR`, `CC_LIMIT_VERIFICATION_ACCOUNT_PER_DAY` |
| `account_security` | change of password, reissue of recovery kit, change of envelope | 10/hour | `CC_LIMIT_ACCOUNT_SECURITY_RATE`, `CC_LIMIT_ACCOUNT_SECURITY_BURST`, `CC_LIMIT_ACCOUNT_SECURITY_PER_HOUR`, `CC_LIMIT_ACCOUNT_SECURITY_PER_DAY` |
| `ws_connect_account` | New WebSocket Account Connections | 60/min | `CC_LIMIT_WS_CONNECT_ACCOUNT_RATE`, `CC_LIMIT_WS_CONNECT_ACCOUNT_BURST`, `CC_LIMIT_WS_CONNECT_ACCOUNT_PER_HOUR`, `CC_LIMIT_WS_CONNECT_ACCOUNT_PER_DAY` |
| `auth_ip` (always valid) | public requests for entry, registration and restoration from the same address, common to replicas | 30/min | `CC_LIMIT_AUTH_IP_RATE`, `CC_LIMIT_AUTH_IP_BURST`, `CC_LIMIT_AUTH_IP_PER_HOUR`, `CC_LIMIT_AUTH_IP_PER_DAY` |
| `login_email` (always valid) | **unsuccessful** logins to one email address from the same network (/24 IPv4, /64 IPv6) | 10/min and 50/hour | `CC_LIMIT_LOGIN_EMAIL_RATE`, `CC_LIMIT_LOGIN_EMAIL_BURST`, `CC_LIMIT_LOGIN_EMAIL_PER_HOUR`, `CC_LIMIT_LOGIN_EMAIL_PER_DAY` |
| `login_email_total` (always valid) | Failure to enter an address from all networks | 200/hour | `CC_LIMIT_LOGIN_EMAIL_TOTAL_RATE`, `CC_LIMIT_LOGIN_EMAIL_TOTAL_BURST`, `CC_LIMIT_LOGIN_EMAIL_TOTAL_PER_HOUR`, `CC_LIMIT_LOGIN_EMAIL_TOTAL_PER_DAY` |
| `recovery_email` (always valid) | Password reset requests to an address from one network | 5/hour | `CC_LIMIT_RECOVERY_EMAIL_RATE`, `CC_LIMIT_RECOVERY_EMAIL_BURST`, `CC_LIMIT_RECOVERY_EMAIL_PER_HOUR`, `CC_LIMIT_RECOVERY_EMAIL_PER_DAY` |
| `recovery_email_total` (always valid) | Reset emails to addresses from all networks (response always `202`) | 20/day | `CC_LIMIT_RECOVERY_EMAIL_TOTAL_RATE`, `CC_LIMIT_RECOVERY_EMAIL_TOTAL_BURST`, `CC_LIMIT_RECOVERY_EMAIL_TOTAL_PER_HOUR`, `CC_LIMIT_RECOVERY_EMAIL_TOTAL_PER_DAY` |

Alien attempts do not block the owner: successful entry limits mail does not spend, and
Login from a known account device is limited to the address only. Acting
Values: `consolecrypt-server admin limits show` (c `--email` - for the account).

## Enterprise-entry: `CC_AUTH_*`, `CC_OIDC_*`, `CC_LDAP_*`

In the mode `standard`, the keys of the providers are not read or checked.
A round trip is a change of one `CC_AUTH_MODE`. Adjustment order,
recipes for IdP and directory, commands and error analysis - in [ENTERPRISE.md](ENTERPRISE.md).
In Helm block `auth:`; secrets are taken from the existing Secret that charts.
mounts read-only in `/run/secrets/consolecrypt-auth` and path `*_FILE`
He's setting up the chart.

### Common keys

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_AUTH_MODE` | `auth.mode` | `standard` | `standard`, `enterprise` | no | `standard` - email and account password; `enterprise` - login only through IdP (OIDC) or directory (LDAP), registration and account passwords are turned off. |
| `CC_AUTH_PROVIDER` | `auth.provider` | — | `oidc`, `ldap` | no | `oidc` or `ldap`; mandatory in an enterprise. |
| `CC_AUTH_DISPLAY_NAME` | `auth.displayName` | non-predicted | up to 64 printed characters | no | Signature of the login button in the application ("Login through ..."), up to 64 printed characters. |
| `CC_AUTH_ALLOWED_DOMAINS` | `auth.allowedDomains` (list) | hollow | domain list | no | Allowable mail domains `acme.com, acme.ru`; `@` are first discarded, register is not important, subdomains are not included). Necessary for automatic binding of existing accounts with a password; mandatory for preset `google` |
| `CC_AUTH_AUTO_CREATE` | `auth.autoCreate` | `true` | logical | no | Create an account at the first time a new account is logged in. `false` – includes only existing or associated accounts, the rest `403` `not_provisioned`. |
| `CC_AUTH_RECHECK_MINUTES` | `auth.recheckMinutes` | `15` | minutes, 1-1440 | no | How often (1-1,440 minutes) to recheck the user in the IdP / directory The disabled employee loses synchronization no later than after this time + 1 minute. |
| `CC_AUTH_RECHECK_GRACE_HOURS` | `auth.recheckGraceHours` | `24` | clock, 0-720 | no | How many hours (0-720) of sessions live while the IdP/directory is unavailable; then the update responds `503 idp_unavailable`. |

### OIDC

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_OIDC_PRESET` | `auth.oidc.preset` | `generic` | `generic`, `entra`, `adfs`, `keycloak`, `google`, `okta` | no | `generic`, `entra`, `adfs`, `keycloak`, `google`, `okta`: default and start check values (Entra – issuer with tenant id, without `/common`, `/organizations`, `/consumers`; AD FS – ends with `/adfs`; Keycloak – contains `/realms/`; Google – fixed issuer, mandatory domain list, verification `hd`). |
| `CC_OIDC_ISSUER` | `auth.oidc.issuer` | Mandatory (y `google` - `https://accounts.google.com`) | URL `https://…` | no | Accurate issuer: Symbolically equal to `issuer` in discovery and `iss` in ID token, including the final `/`. Only `https://` (or `http://` on the loopback for development), no query and fragment. |
| `CC_OIDC_CLIENT_ID` | `auth.oidc.clientId` | mandatory | line | no | Identifier of the client (application) of the server in IdP. |
| `CC_OIDC_CLIENT_SECRET_FILE` | `auth.oidc.existingSecret` + `clientSecretKey` `client-secret` | mandatory | fileway | file, yes | The path to the client secret file (UTF-8, the final line translation is discarded, up to 64 KiB). **Secret**: the file must be read by the process user (in UID 65532). |
| `CC_OIDC_TOKEN_KEY_FILE` | `auth.oidc.existingSecret` + `tokenKeyKey` `token-key` | mandatory | fileway | file, yes | The path to a file with a 32-byte key, which encrypts refresh token IdP (ChaCha20-Poly1305) in the database: 64 hex characters `openssl rand -hex 32`, base64 32 bytes or 32 random bytes. **Secret.** When you change the key, the stored refresh token becomes unreadable - users will log in once again. |
| `CC_OIDC_SCOPES` | `auth.oidc.scopes` | `openid email profile offline_access`; `adfs`: `openid email profile allatclaims`; `google`: `openid email profile` | list through space, c `openid` | no | Scopes through space; `openid` is mandatory. `offline_access` is needed for refresh token and recheck; Google rejects it (preset itself adds `access_type=offline` and `prompt=consent`). |
| `CC_OIDC_EMAIL_CLAIM` | `auth.oidc.emailClaim` | `email`; `entra`: `preferred_username`; `adfs`: `upn` | claim | no | Claim ID token, used as an account email address (value must contain `@`). |
| `CC_OIDC_REQUIRED_CLAIM` | `auth.oidc.requiredClaim` | non-predicted | `claim=значение` | no | `имя=значение`: only allow those whose claim is equal to or (for an array, e.g. `groups`, `roles` contains it. Otherwise `403 group_required`. |
| `CC_OIDC_REQUIRE_MFA` | `auth.oidc.requireMfa` | `false` | logical | no | Require multifactor input: `mfa` or `http://schemas.microsoft.com/claims/multipleauthn` in `amr` or `acr` out of `CC_OIDC_MFA_ACR_VALUES`. Otherwise `403 mfa_required`. For `google` without `acr` -values are not accepted. |
| `CC_OIDC_MFA_ACR_VALUES` | `auth.oidc.mfaAcrValues` | empty | list | no | Values `acr` that are considered multifactorial (by comma or space). |
| `CC_OIDC_TOKEN_AUTH_METHOD` | `auth.oidc.tokenAuthMethod` | `client_secret_basic` | `client_secret_basic` `basic`), `client_secret_post` `post` | no | Token endpoint server authentication: `client_secret_basic` `basic` or `client_secret_post` `post`. |
| `CC_OIDC_CA_FILE` | `auth.oidc.caKey` (key in the same Secret) | root | path | no | PEM certificate of additional root CA for IdP for internal CA (e.g. AD FS). |

### LDAP / Active Directory

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_LDAP_URL` | `auth.ldap.url` | mandatory | `ldaps://…`, `ldap://…` | no | `ldaps://dc1.acme.local:636` or `ldap://dc1.acme.local:389` together with `CC_LDAP_STARTTLS=true`. Simple `ldap://` without STARTTLS server rejects: the domain password should not go in plain text. The host name must match the controller’s certificate. |
| `CC_LDAP_STARTTLS` | `auth.ldap.starttls` | `false` | logical | no | STARTTLS for `ldap://`; c `ldaps://` is not acceptable. |
| `CC_LDAP_CA_FILE` | `auth.ldap.caKey` (key in the same Secret) | root | path | no | PEM with the root certificate of the CA domain (one or more certificates). |
| `CC_LDAP_BIND_DN` | `auth.ldap.bindDn` | mandatory | DNN | no | DN service records for search and rechecking, e.g. `CN=svc-consolecrypt,OU=Service,DC=acme,DC=local` Enough rights to read the catalogue. |
| `CC_LDAP_BIND_PASSWORD_FILE` | `auth.ldap.existingSecret` + `bindPasswordKey` `bind-password` | mandatory | fileway | file, yes | The path to the file with the service log password. **Secret.** |
| `CC_LDAP_BASE_DN` | `auth.ldap.baseDn` | mandatory | DNN | no | Where to look for users `DC=acme,DC=local` It also serves as an identifier of the source for bindings: when it changes the binding, you need to recreate. |
| `CC_LDAP_USER_FILTER` | `auth.ldap.userFilter` | `(&(objectClass=user)(\)|(mail= {login} )(userPrincipalName= {login} )(sAMAccountName= {login} ) | LDAP filter with `{login}` | no | The search filter with `{login}` should start with `(`. User input is shielded by RFC 4515, the prefix `ДОМЕН\` is discarded. If several records are found, the entrance is rejected. |
| `CC_LDAP_EMAIL_ATTR` | `auth.ldap.emailAttr` | `mail` | name | no | Attribute with a postal address. |
| `CC_LDAP_ID_ATTR` | `auth.ldap.idAttr` | `objectGUID` | name | no | Stable user identifier; for `objectGUID` stored as a GUID string. Changing your mail or name doesn't break your attachment. |
| `CC_LDAP_REQUIRED_GROUP` | `auth.ldap.requiredGroup` | non-predicted | DNN | no | The DN of the group, the member of which (including nested groups, rule AD `LDAP_MATCHING_RULE_IN_CHAIN`) must be the user; checked at login and recheck. At the start, the server checks that the group exists. |
| `CC_LDAP_TIMEOUT_SECS` | `auth.ldap.timeoutSecs` | `10` | seconds, 1-60. | no | Timeout of connection and operations, 1-60 seconds. |
| `CC_LDAP_MAX_FAILURES` | `auth.ldap.maxFailures` | `3` | 1–100 | no | Unsuccessful logins to the login and to the directory user outside the window, 1–100; then the server responds `429` ** without referring to AD**. Keep **below** the domain account lock threshold. |
| `CC_LDAP_FAILURE_WINDOW_MINUTES` | `auth.ldap.failureWindowMinutes` | `15` | minutes, 1-1440 | no | Failed entry counter window, 1-1,440 minutes; no shorter than the lock counter reset window in the domain policy. |
| `CC_LDAP_MAX_FAILURES_PER_IP` | `auth.ldap.maxFailuresPerIp` | `30` | integer ≥ 0, `0` - without limit | no | Unsuccessful inputs from one IP per window; `0` - without limitation. |

## Observation: metrics, journal, tracing

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_METRICS_LISTEN` | `metrics.enabled` `true` → `0.0.0.0:9090`, `false` → `off` | `0.0.0.0:9090` | `хост:порт`, `off`, `disabled` | no | Separate listener Prometheus `GET /metrics`. `off` or `disabled` - turn off. Metrics without authentication: Do not publish the port outwards and do not include it in Ingress. Example Docker Compose turns them off. |
| `CC_LOG_FORMAT` | `config.log.format` | `json` | `json`, `pretty` `text` | no | Journal format in stderr: `json` or `pretty` `text`. Commands `admin` are always written in `pretty`. |
| `CC_LOG` | `config.log.filter` | `info,sqlx=warn` | EnvFilter | no | **Only the environment** (in JSON the file is not accepted). Journal filter in syntax `tracing` EnvFilter: `info`, `debug,sqlx=warn`. It is read without it `RUST_LOG`. |
| `RUST_LOG` | `extraEnv` | — | EnvFilter | no | **Environment only.**Spare log filter if `CC_LOG` is not specified. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `extraEnv` | non-predicted | URL | no | **Environment only.** Includes OpenTelemetry tracing exports (OTLP HTTP /protobuf), e.g. `http://otel-collector:4318`. Standard variables `OTEL_*` are used. Spans contain only unclassified fields (request_id, route, status, user UUID and device). |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | `extraEnv` | non-predicted | URL | no | **Environment only.** Same, separate address for tracing only. |

## Data maintenance and storage

Passage service removes outdated service records. It's done on one.
Remark at a time (advisory lock). Storage periods - in days, `0` - to store
Always, no more than 36,500. The server does not make backup copies: use
`pg_dump` to [HOSTING.md](HOSTING.md).

| Variable | Helm. | By default. | Meanings | Secret. | What's he doing? |
|---|---|---|---|---|---|
| `CC_MAINTENANCE_INTERVAL_SECS` | `config.maintenance.intervalSecs` | `3600` | seconds, `0` off. | no | Period of service passage; `0` - turn off. |
| `CC_RETENTION_SESSION_DAYS` | `config.maintenance.retention.sessionDays` | `7` | day, 0–36500 `0` – always | no | How much to keep recalled and expired sessions? |
| `CC_RETENTION_SYNC_MUTATION_DAYS` | `config.maintenance.retention.syncMutationDays` | `30` | day, 0–36500 `0` – always | no | Records of idempotence of accepted synchronization changes. |
| `CC_RETENTION_AUDIT_DAYS` | `config.maintenance.retention.auditDays` | `365` | day, 0–36500 `0` – always | no | Audit journal `audit_events`. |
| `CC_RETENTION_DELETED_VAULT_DAYS` | `config.maintenance.retention.deletedVaultDays` | `30` | day, 0–36500 `0` – always | no | After how many days the ciphertext of the remote storage is deleted. |
| `CC_RETENTION_DEVICE_REQUEST_DAYS` | `config.maintenance.retention.deviceRequestDays` | `90` | day, 0–36500 `0` – always | no | Solved and expired device trust requests. |

## Service variables

| Variable | Where | What's he doing? |
|---|---|---|
| `CC_CONFIG_FILE` | surroundings | The path to a private JSON settings file, if not transmitted `--config`. File: ordinary, up to 64 KiB, one JSON object with known keys and string values, on Unix - rights `0600` or `0400`. Not searched in the current directory, not executed, `$` and commands are not substituted. |

Example variables Docker Compose are read by Compose, not by the server:

| Variable | What's he doing? |
|---|---|
| `CC_SERVER_VERSION` | Image version `ghcr.io/evsikovas/consolecrypt-server:<версия>`. |
| `CC_SERVER_IMAGE` | Full reference to image instead of version, e.g. with `@sha256:` digest. |
| `CC_DOMAIN` | The domain for which Caddy is certified. |
| `CC_HTTP_PORT` | API port to `127.0.0.1` host (default `8080`). |
| `CC_POSTGRES_ADMIN_PASSWORD` | Administrator password PostgreSQL in the database container (created `init-config.py`). |
| `CC_POSTGRES_PASSWORD`, `CC_METRICS_PORT` | Only for development `server/docker-compose.yml`: built-in database password and port metrics on the host. |

## Administrator teams

Commands are run by the same binary file with the same configuration.
`--config` – global flag: `docker compose ... exec – T server
/usr/local/bin/consolecrypt-server admin ... ` или ` kubectl exec deployment
/usr/local/bin/consolecrypt-server admin. They don't give you access to the content.
vaults.

| Team team. | What's he doing? |
|---|---|
| `serve` | Start the server (by default). |
| `migrate` | Apply migrations and get out. |
| `healthcheck` | Check the local listener `/readyz`; code 0 is ready. |
| `admin list-users` | Accounts: status, login method `password`, `oidc`, `ldap`, address confirmation, number of devices and storage facilities. |
| `admin verify-email --email …` | Mark the address confirmed (server without mail). |
| `admin reset-token --email …` | Print a one-time password reset code (term - `CC_PASSWORD_RESET_TTL_SECS`). |
| `admin set-password --email … --password-stdin` | Set a password from the first line of stdin; all sessions end. |
| `admin disable-user --email …` / `admin enable-user --email …` | Disable the account with the withdrawal of sessions / enable again. |
| `admin session revoke --email …` | Complete all sessions of the account. |
| `admin rotate-epoch --all` / `--vault <id>` | After restoring the base from the copy: change the era of storage so that customers notice the rollback. |
| `admin limits show [--email …]` | Existing limits and quotas (server or account) |
| `admin limits set --email … ключ=значение…` | Override account limits and quotas; valid no later than 30 seconds. |
| `admin limits reset --email … [ключ…]` | Remove overdefinitions (all without keys). |
| `admin auth status` | Login mode, provider, last IdP/catalog check, linked accounts. |
| `admin auth test [--login … [--password-stdin]]` | Repeat launch checks; c `--login` – find the LDAP user (with `--password-stdin` – the real bind) or recheck the OIDC account in the IdP. |
| `admin identity link --email … --subject … [--issuer …]` | Attach the account to OIDC `sub` or `objectGUID`; the account password is deleted, sessions are terminated. |
| `admin identity unlink --email … [--subject …]` | Remove account attachments (or one). |

---

The optional `CC_MONITORING_PRESERVATION_MINIMUM` setting lets operators offer an opt-in minimum client version for personal vault settings. It is off by default. Set it only to a published stable version, with request proofs enabled.
