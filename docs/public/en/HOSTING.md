# Installation of own server ConsoleCrypt

Translated reference · [Russian source](../HOSTING.md)

> The same on the site: [Docker Compose](https://consolecrypt.dev/guide#server-docker), [Kubernetes](https://consolecrypt.dev/guide#server-setup).
> [установка и параметры по способам](https://consolecrypt.dev/guide#server-settings).
> Same on the website: [installation and parameters by method](https://consolecrypt.dev/guide#server-settings) .

The server stores accounts, device information and encrypted data
vaults. Decryption takes place in the client; SSH -connections are set by the client
Directly with your hosts.

Choose one method: [Docker Compose на одном сервере](#docker-compose)
or [Kubernetes/k3s через Helm](#kubernetes-helm). Both run only APIs.
c PostgreSQL and SMTP. Domain `sync.example.org`, database address and postal settings
Examples need to be replaced with their own. All commands are executed from the source root.
unless otherwise stated.

Examples are assigned to the **current server release ** - the same version as in
`server/Cargo.toml` branches `main`. In Docker is one variable.
`CC_SERVER_VERSION`, in Helm - `appVersion` chart; when a new version is released, they
They change with it (checked in CI). Image
`ghcr.io/evsikovas/consolecrypt-server:<версия>` collected for `linux/amd64` and
`linux/arm64`; the published tag is not overwritten. To the fullest
Reproduced installation fix digest from file `server-image.json`
GitHub Release of the desired version.

What the current server can do and how it is turned on:

| Opportunity | Setting up | By default. |
|---|---|---|
| Storage synchronization, device trust, request signatures | `CC_REQUIRE_REQUEST_PROOF` | included |
| [Защита от входа с нового устройства](#защита-от-входа-с-нового-устройства) | `CC_DEVICE_PROTECTION_ENABLED` | switched off |
| [Совместный доступ](SHARING.md) Hosts, Groups, Secrets, Kubernetes, Databases | `CC_OBJECT_SHARING_ENABLED` and type flags | switched off |
| [Общие заметки](#общие-заметки) to common objects | `CC_SHARED_NOTES_ENABLED` | switched off |
| [Команды](#команды) (common storage) | `CC_TEAMS_ENABLED` | included |
| [Enterprise-вход](ENTERPRISE.md) via IdP (OIDC) or Active Directory (LDAP) | `CC_AUTH_MODE=enterprise` | `standard` |
| [Квоты и лимиты запросов](#квоты-и-лимиты-запросов) | `CC_QUOTAS_V2_ENABLED`, `CC_RATE_LIMIT_MODE` | quotas included, limits in mode `observe` |

All server parameters with valid values, default values and paths
Helm is listed in [CONFIGURATION.md](CONFIGURATION.md). How to ask any of them
c Docker Compose, `docker run`, Helm, JSON-file or systemd, with ready-made
For example, see section [Как задать любой параметр](#как-задать-любой-параметр).
English: [configuration methods and worked examples](#english) .

## Docker Compose

Installation on a single server without Kubernetes

### What do you need?

Linux - server with Docker Engine, Docker Compose **2.24.4 or later** (or 5.x),
Python **3.9 or later** and a free disk for PostgreSQL 16. For HTTPS you need
domain with DNS A/AAAA to this server and externally accessible TCP ports 80 and 443.
UDP 443 is used by Caddy for HTTP/3; when it is blocked, it remains HTTPS over TCP.
These ports do not have to have another proxy at the same time.

The variant is designed for one node: PostgreSQL without replication, API and optional
Caddy. The constant data is in Docker volumes. Set up backups.
outside this node and auto-start Docker after restarting.

Files: [compose.yaml](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/compose.yaml)
[Caddyfile](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/Caddyfile),
[справочник переменных](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/.env.example).
Old `server/docker-compose.yml` remains a separate option for development.
Reassembling the source code and writing the letters into files.

### Take an example and create a private configuration.

For Docker, take **current `main` **. The generator writes to a private
`server.env` version of the example server, for example:

```text
CC_SERVER_VERSION=0.2.8
```

Compose takes the image `ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION`.
Instead of the tag, you can specify the exact image: `CC_SERVER_IMAGE=ghcr.io/evsikovas/consolecrypt-server@sha256:…`
(digest from `server-image.json` to GitHub Release). The server itself reports to `/v1/meta`.
a reference to the source of its assembly; `CC_SOURCE_CODE_URL` is required only for
modified assembly (see [LICENSING.md](LICENSING.md)).

In a separate Bash terminal:

```sh
set -euo pipefail
git clone --branch main --single-branch https://github.com/evsikovas/consolecrypt-server.git
cd consolecrypt-server
export CC_COMPOSE_FILE="$PWD/server/deploy/docker/compose.yaml"
export CC_INSTALL_DIR="$HOME/.config/consolecrypt-docker"
export CC_API_ORIGIN="https://sync.example.org"
umask 077
docker context show
docker compose version

python3 server/deploy/docker/init-config.py \
  --directory "$CC_INSTALL_DIR" --domain sync.example.org
```

Check that the server is selected Docker. Generator creates directory with rights
0700 and `server.env` with rights 0600 **out of the source**, generates different random
Administrator passwords PostgreSQL and application user, and SMTP password
Asks without display. Under the present `server.env` he will refuse to continue:
Re-generation of the password does not change the password of the already created database.

Specify SMTP host, sender, port, TLS mode and login. The 587 is usually needed.
`starttls`, for 465 – `tls`; the sender must be authorized by your SMTP.
For a private installation without mail, add the generator `--mail-disabled`:
confirm the email then the administrator must automatically reset by mail
It won't work. Confirmation of email and signature of requests remain mandatory.

Do not add `server.env` to Git, do not execute `source server.env` and do not output
`docker compose config` without `--quiet`: The final configuration contains passwords.
Don't turn on `set -x`. Compose takes the values from `--env-file`, but the same name
Current shell variables have priority: use a clean terminal.
Details in [документации Docker об интерполяции](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/).
Access to Docker daemon allows you to read container variables; limit it
administrators. The server does not have a common mechanism `*_FILE` (the files are read).
Enterprise-entry secrets only: the password of the database is transferred to individual
`CC_DATABASE_PASSWORD`, without room in URL. Shell-wrapper is not required for distroless.

### Launch PostgreSQL, API and HTTPS

Save the function in this terminal and use it for the following commands:

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" --profile https "$@"
}

cc_compose config --quiet
cc_compose pull
cc_compose run --rm --no-deps caddy caddy validate --config /etc/caddy/Caddyfile
cc_compose up -d --wait --wait-timeout 180
cc_compose ps
```

PostgreSQL and the API shall become `healthy`; Caddy `running`.
The server uses built-in verification `/readyz` in the binary file: install
`curl` or shell is not required. At the first start PostgreSQL creates
A role `consolecrypt` that owns its base but is not a superuser.
The API then applies migrations. Dependencies with `service_healthy` are described in
[документации Compose](https://docs.docker.com/compose/how-tos/startup-order/).

Caddy receives and renews a trusted certificate automatically. For that, DNS,
routing and incoming ports must work; status `running` does not yet prove
That the certificate was issued. Details - [Automatic HTTPS](https://caddyserver.com/docs/automatic-https).
Certificates are saved in `caddy_data` and Caddy settings in `caddy_config`.

The API is published on **127.0.0.1:8080** host. PostgreSQL 5432 not published
The metrics are off. Caddy only transmits to the server `/v1`, `/v1/*`, `/healthz`.
`/readyz` and `/account`, `/account/*`; the site root will return 404. Site or analytics
They're not installed. By default `CC_WEB_ACCOUNT=false` and `CC_PUBLIC_URL` are empty:
`/account` responds to 404 letters (HTML and text, language - `CC_MAIL_LANGUAGE`, `ru` or
`en` ) suggest inserting the code into the application and not mentioning the web page.

So that the emails lead to the built-in page of the server account (email confirmation,
new code password, "This is not me" for emails about new devices, add to the file
settings `CC_WEB_ACCOUNT=true` and `CC_PUBLIC_URL=https://<CC_DOMAIN>` – required
An image of the server where the page already exists. The page is static, it works.
only with public endpoints on the code from the letter, without entry and without access
The code is transmitted in fragment URL and does not enter the logs.
The client is entered `CC_API_ORIGIN` rather than `CC_PUBLIC_URL`.

If you already have HTTPS reverse proxy on that host, remove `--profile https`.
From the function and configure proxy to `http://127.0.0.1:8080`. He needs to re-record.
untrusted `X-Forwarded-For`, transfer WebSocket `/v1/events/ws`, receive
up to 16 MiB and do not change path, query or body of signed requests.
Example [Caddy reverse_proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)
It does so without `handle_path` and rewrite. The example involves one trusted proxy.
Do not open the API port to the outside. In a local 8080 conflict, change `CC_HTTP_PORT`.
In a private file and corresponding upstream of your proxy.

### Check and connect the client

```sh
curl --fail --silent --show-error "$CC_API_ORIGIN/healthz"
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
```

Expected `ok`, `ready`, `server_version`, equal to `CC_SERVER_VERSION`, and
`protocol_version` of this release (e.g., `1.11` at server 0.2.2).
Check HTTPS without `curl -k`, including from another machine. In the client, create.
profile with `https://sync.example.org` ** without `/v1` **. Check in, check in.
Deliver the email and confirm the code through the API as described in Section 6 below.
When the SMTP is disabled, the operator, after checking the address owner, performs:

```sh
cc_compose exec -T server /usr/local/bin/consolecrypt-server \
  admin verify-email --email user@example.org
```

Check the synchronization of the test host between two trusted devices.
To close the registration, change `CC_REGISTRATION_OPEN=false` to `server.env`
and perform `cc_compose up -d --wait --wait-timeout 180 server`.

Sharing flags are turned off by default. If the Administrator decides separately
Enable shared access and check customer compatibility, it changes
`CC_OBJECT_SHARING_ENABLED`, `CC_SHARED_GROUPS_ENABLED`, `CC_SHARED_SECRETS_ENABLED`
`CC_SHARED_KUBE_CONTEXTS_ENABLED`, `CC_SHARED_DB_CONNECTIONS_ENABLED`,
`CC_SHARED_NOTES_ENABLED` and `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED` in the same private file on `true`.
It then recreates only the service `server` by the same team. Signatures of requests
remain mandatory. The main flag is mandatory for other extensions.
Opportunities are checked by an authorized request `/v1/shares/capabilities`.
not through `/v1/meta`; the limitations are set out in [SHARING.md](SHARING.md).

### Data retention and backups

The name of the Compose project is `consolecrypt-selfhost`; its PostgreSQL volume is
`consolecrypt-selfhost_pgdata`. Save the project name and private file:
another `--project-name` will create another database. `cc_compose down` will store volumes.
but stops the service; `cc_compose up -d --wait --wait-timeout 180` starts
**Do not use `down -v` or `docker volume prune`
for an update or a normal restart. After the first creation of the base, the change
The passwords in `server.env` do not change the role of PostgreSQL.

The image PostgreSQL is created without installation `pg_dump` on the host:

```sh
umask 077
CC_BACKUP_DIR="$CC_INSTALL_DIR/backups"
mkdir -p "$CC_BACKUP_DIR"
chmod 700 "$CC_BACKUP_DIR"
CC_BACKUP_FILE="$CC_BACKUP_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
cc_compose exec -T postgres pg_dump -U postgres -d consolecrypt \
  --format=custom --no-owner --no-acl > "$CC_BACKUP_FILE"
chmod 600 "$CC_BACKUP_FILE"
cc_compose exec -T postgres pg_restore --list \
  < "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

Password does not enter argv: command is executed via local Unix socket
in a container PostgreSQL. Transfer the copy to an encrypted storage outside of this
knot. Separately save `server.env`, the Compose version and Caddy volumes.
The backup contains sensitive account metadata, although
The contents of the storage are encrypted. The archive list is not a substitute for trial recovery.

For verification, create a ** separate empty database **, not connected to working clients.
The following commands will stop if the name is already taken; for a repeat test
Choose a different name and use it on both teams:

```sh
cc_compose exec -T postgres createdb -U postgres -O consolecrypt consolecrypt_restore_check &&
  cc_compose exec -T postgres pg_restore -U postgres --role=consolecrypt \
    -d consolecrypt_restore_check --exit-on-error --no-owner --no-acl < "$CC_BACKUP_FILE"
```

Compare tables, migrations, number of records and `sharing_instance.instance_id`.
Then check to run the same image with a copy in an isolated environment.
For full disaster recovery, client access is closed, lifted
Empty PostgreSQL with saved settings, restore the entire database to
Start the API and check it out. After the restoration of personal storage and **do**
Return client access with a restored base:

```sh
cc_compose run --rm --no-deps server admin rotate-epoch --all
```

This is not a substitute for restoring trust to common elements: sharing
checkpoints. Save the UUID of the server instance from a full copy of the database.
Details are given in section 7 below.

### Updating and verifying the example

First, make and check the backup. Save the previous Compose files.
`server.env` and the previous value `CC_SERVER_VERSION`. Read it.
[примечания к выпуску](https://github.com/evsikovas/consolecrypt-server/releases):
New migrations, flags and default values. Update the sample source
`git pull` in the clone directory, then change in the private `server.env`
`CC_SERVER_VERSION` to the new version (or `CC_SERVER_IMAGE` to its digest).
Line `CC_SOURCE_CODE_URL`, if it was recorded by the generator of previous versions, delete:
The image itself communicates its source. Then:

```sh
cc_compose config --quiet
cc_compose pull server
cc_compose up -d --wait --wait-timeout 180 server
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta"
```

Keep your settings (enterprise-entry, limits, general notes, etc.) not in
`compose.yaml` from the source, and in the private `compose.override.yaml` near the
`server.env`. Explicit `-f` disables automatic search for an override file.
Connect it to function `cc_compose` with the second `-f`:

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
    --profile https "$@"
}
```

The paths inside the override file are absolute: Compose paths
counts from the directory of the first file, that is, from the source.

Do not change passwords, project name or existing volume. Check the SMTP and
synchronization of two devices. Migrations are built into the image; a change of image back
** Doesn't roll the circuit. For a pre-tested compatible rollback, you can
`CC_RUN_MIGRATIONS=false`, but this does not prove the compatibility of the
A binary file with a new circuit. Don't change major PostgreSQL with a simple tag change.
Images PostgreSQL and Caddy are fixed by major `16-alpine`, `2-alpine`.
Also plan updates separately with backup and verification.

The developer or operator can repeat the smoke test on a separate example.
A car with Docker. It only creates a unique temporal Compose project.
Uses random loopback ports and only removes its containers and volumes.

```sh
export CC_SERVER_VERSION=0.2.8   # версия примера (server/deploy/docker/.env.example)
docker pull "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION"
docker pull postgres:16-alpine
docker pull caddy:2-alpine
python3 server/deploy/docker/verify.py
```

To verify another image (e.g., collected locally) transmit
`--image <образ> --server-version <версия>`.

The test checks the API, HTTPS with a temporary local CA (without disabling the check).
certificate), PostgreSQL role, backup/restore and safety after `down/up`.
It does not verify your DNS, the issuance of your ACME public certificate, or the delivery of your
SMTP-mail – these checks must be performed for your own installation.

## Kubernetes: Helm

## 1. Prepare the environment and version

Requires Kubernetes 1.25 or later, `kubectl`, Helm 3 or 4, Python 3,
domain with a DNS record on the ingress controller and a valid HTTPS certificate.
Example designed for Traefik and already configured cert-manager with
`ClusterIssuer/letsencrypt`. Chart does not install these components.

Get a chart from `main`. Its `appVersion` is the current server release, aka tag
The default image; the version of the chart itself is independent of the server version.
Images are collected for `linux/amd64` and `linux/arm64`, base - PostgreSQL 16.

```sh
git clone --branch main --single-branch https://github.com/evsikovas/consolecrypt-server.git
cd consolecrypt-server
helm show chart server/helm/consolecrypt-server
export CC_SERVER_VERSION=0.2.8   # = appVersion из вывода выше
```

For a reproducible installation, secure `image.digest` of `server-image.json`
GitHub Release of this version (see values below); digest takes precedence over tag.
Parameter directory: [values.yaml](https://github.com/evsikovas/consolecrypt-server/blob/main/server/helm/consolecrypt-server/values.yaml).

The image can be pre-checked by Docker commands:

```sh
docker pull "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION"
docker run --rm --network none "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION" --version
```

The repository also has `server/docker-compose.yml`: this is an option for a local repository.
development with reassembly of source materials, PostgreSQL and writing letters to files.
Its default settings are not a ready-made installation with HTTPS and SMTP.
For installation with a ready-made image, use the Docker-section above or the full one.
The way through Helm is down.

## 2. Select a cluster and a private directory

Open a separate Bash terminal. Specify your kubeconfig and context:

```sh
set -euo pipefail
export CC_KUBECONFIG="$HOME/.kube/selfhost.yaml"
kubectl --kubeconfig "$CC_KUBECONFIG" config get-contexts
export CC_KUBE_CONTEXT="my-cluster"
export CC_INSTALL_DIR="$HOME/.config/consolecrypt-server"
export CC_API_ORIGIN="https://sync.example.org"
umask 077
mkdir -p "$CC_INSTALL_DIR"
chmod 700 "$CC_INSTALL_DIR"

cc_kubectl() {
  kubectl --kubeconfig "$CC_KUBECONFIG" --context "$CC_KUBE_CONTEXT" \
    --namespace consolecrypt "$@"
}
cc_helm() {
  helm --kubeconfig "$CC_KUBECONFIG" --kube-context "$CC_KUBE_CONTEXT" \
    --namespace consolecrypt "$@"
}

cc_kubectl get nodes
cc_kubectl create namespace consolecrypt --dry-run=client -o yaml | cc_kubectl apply -f -
```

Check that the nodes of the desired cluster are shown. Passwords and kubeconfig should not
Get into Git, team arguments, CI logs, or Helm values. Kubernetes Secrets
They also require restriction of access and protection of cluster backups.

## 3. PostgreSQL and Secrets

The main option is a separate PostgreSQL 16 managed by you, the provider or the customer.
operator PostgreSQL. Create a database `consolecrypt` and an individual user.
He owns this database and can create tables and perform migrations.
The app doesn't need a superuser. Allow connection from server pods.

For an external database, use TLS with certificate verification. URL is as follows:

```text
postgresql://consolecrypt:URL_ENCODED_PASSWORD@db.example.org:5432/consolecrypt?sslmode=verify-full
```

Special password characters in URL need percent-encode. If the base uses
own CA, mount its certificate in the server pod and specify
`sslrootcert` with the path inside the container; do not turn off the certificate check.

Prepare the SMTP password and the full database URL. The following code asks for values
without display on the screen and saves them without translating a line. He won't.
Overwrite existing files:

```sh
python3 - <<'PY'
import getpass
import os
from pathlib import Path

directory = Path(os.environ['CC_INSTALL_DIR'])
for name, prompt in [('database-url', 'Полный URL PostgreSQL: '),
                     ('smtp-password', 'Пароль SMTP: ')]:
    value = getpass.getpass(prompt)
    if not value or '\n' in value or '\r' in value:
        raise SystemExit('Требуется одно непустое значение')
    with (directory / name).open('x', encoding='utf-8') as handle:
        handle.write(value)
    (directory / name).chmod(0o600)
PY

cc_kubectl create secret generic consolecrypt-database \
  --from-file=database-url="$CC_INSTALL_DIR/database-url"
cc_kubectl create secret generic consolecrypt-smtp \
  --from-file=smtp-password="$CC_INSTALL_DIR/smtp-password"
```

These are the original creation commands. If Secrets already exist, use them.
their names and keys in values, and update through your Secrets Manager.
Do not create a new password for an existing database without an agreed change.
the password in itself PostgreSQL.

### Built-in PostgreSQL for a small server

Instead of an external base, a chart can create one PostgreSQL pod with a constant volume.
This is an installation without replication and automatic backups. We need a worker.
StorageClass: Losing a single disc means losing a base without an external copy.

For **new ** installation, only prepare the file `smtp-password` and do:

```sh
kubectl --kubeconfig "$CC_KUBECONFIG" config use-context "$CC_KUBE_CONTEXT"
python3 server/deploy/bootstrap-secrets.py \
  --kubeconfig "$CC_KUBECONFIG" \
  --smtp-password-file "$CC_INSTALL_DIR/smtp-password"
```

This helper uses the current context of said kubeconfig. He creates it.
`consolecrypt-database` with a key `password`, saving the existing DB Secret,
It creates or updates `consolecrypt-smtp`. Complete URL of the external base
He's not making it. Don’t mix the two: Secrets have different keys.

In values, replace blocks `database` and `postgresql` with:

```yaml
database:
  existingSecret: ""
postgresql:
  enabled: true
  auth:
    database: consolecrypt
    username: consolecrypt
    existingSecret: consolecrypt-database
    existingSecretPasswordKey: password
  persistence:
    enabled: true
    size: 8Gi
    storageClass: "" # StorageClass по умолчанию в вашем кластере
```

## 4. Set up Helm, SMTP and HTTPS

Save the following example as `$CC_INSTALL_DIR/values.yaml` by replacing the domains.
SMTP-login and, if necessary, ingress class and issuer:

```yaml
fullnameOverride: consolecrypt
replicaCount: 1
image:
  repository: ghcr.io/evsikovas/consolecrypt-server
  # Пусто: тег = appVersion chart (текущий выпуск). Для воспроизводимости:
  # digest: sha256:<digest из server-image.json этого выпуска>
  digest: ""
  pullPolicy: IfNotPresent

database:
  existingSecret: consolecrypt-database
  existingSecretKey: database-url
postgresql:
  enabled: false

config:
  publicUrl: ""
  registrationOpen: true
  requireEmailVerification: true
  requireRequestProof: true
  eventBus: postgres
  trustProxyHeaders: "true"
  objectSharingEnabled: false
  sharedGroupsEnabled: false
  sharedSecretsEnabled: false
  sharedKubeContextsEnabled: false
  sharedDbConnectionsEnabled: false
  sharedNotesEnabled: false
  sharingOwnerOnlineEnrollmentEnabled: false
  deviceProtection:
    enabled: false
  rateLimit:
    mode: observe          # через неделю наблюдения — enforce
  quotas:
    maxDevicesPerAccount: 20
    maxVaultObjects: 100000

mail:
  transport: smtp
  from: "ConsoleCrypt <no-reply@example.org>"
  smtp:
    host: smtp.example.org
    port: 587
    tls: starttls
    username: mailer@example.org
    existingSecret: consolecrypt-smtp
    existingSecretPasswordKey: smtp-password

migrations:
  runAtStartup: true
  job:
    enabled: false

ingress:
  enabled: true
  className: traefik
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls: "true"
  hosts:
    - host: sync.example.org
      paths:
        - {path: /v1, pathType: Prefix}
        - {path: /healthz, pathType: Exact}
        - {path: /readyz, pathType: Exact}
  tls:
    - secretName: consolecrypt-tls
      hosts: [sync.example.org]
```

`publicUrl` is intentionally empty here: a postal confirmation uses a code,
Further actions are described below. This field doesn't give you an audition address.
or the address you need to enter in the client.

The SMTP must allow the sender's chosen address. For port 465, ask
`tls: tls`; for 587 – `tls: starttls`. Check the sender's DNS settings
and pod access to the SMTP server. Keep the mode `file` for local tests.

Ingress must transmit WebSocket `/v1/events/ws` and allow the query body
at least 16 MiB and save the path, query and body of the requests unchanged:
They are included in the signature of the device. `trustProxyHeaders: "true"`
Before the API is one trusted proxy, correctly forming `X-Forwarded-For`.
Direct access to the API port is closed. The 9090 metrics are only available inside.
This port is not included in Ingress.

If TLS Secret is issued in a different way, remove the cert-manager abstract.
and specify the existing Secret. If the registry is closed, create a namespace.
`imagePullSecret` with read-only rights and add `imagePullSecrets` to values.
A short-lived CI task token for constant pod launch is not suitable.

## 5. Install the server

First, check the values and the resulting resources:

```sh
chmod 600 "$CC_INSTALL_DIR/values.yaml"
helm lint server/helm/consolecrypt-server -f "$CC_INSTALL_DIR/values.yaml"
helm template consolecrypt server/helm/consolecrypt-server \
  --namespace consolecrypt -f "$CC_INSTALL_DIR/values.yaml" \
  > "$CC_INSTALL_DIR/rendered.yaml"
```

Check digest, domain, Secrets names, and presence of a permanent volume if selected.
built-in base. In these versions, passwords are taken from existing Secrets.
and are not recorded in Helm values or a generated manifesto.

```sh
cc_helm upgrade --install consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
cc_kubectl rollout status deployment/consolecrypt --timeout=180s
cc_kubectl get pods,service,ingress
```

The server will connect to the database, apply built-in migrations and begin to receive
HTTP - Requests at inland port 8080. TLS ends at Ingress.
Automatic rollback in case of error is included in different parameters:
[Helm 3](https://github.com/helm/helm-www/blob/main/versioned_docs/version-3/helm/helm_upgrade.md)
`--atomic`, [Helm 4](https://helm.sh/docs/helm/helm_upgrade/)
`--rollback-on-failure`. Use it when updating.
only after checking the compatibility of the previous version with the new base scheme;
Migration does not cancel such a rollback.

## 6. Check availability and connect the customer

```sh
curl --fail --silent --show-error "$CC_API_ORIGIN/healthz"
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
```

Expected HTTP 200, responses `ok`, `ready` and JSON with `server_version` equal to
`appVersion` chart (or fixed digest versions), `protocol_version` of this
release and `source_code_url` of the source assembly. Readiness checks out
connection to the database; a successful response does not yet confirm delivery of the mail or
synchronization. Do not use `curl -k`: The customer needs a trusted certificate.

In ConsoleCrypt create a profile with a server `https://sync.example.org`.
**No `/v1` and register. If an email confirmation is required,
Wait for the email and confirm its code, then repeat the login or setup.
profile. The account is valid on the selected server.

The current desktop client may request a password reset email, but some
Forms of entry of the postal code in it have not yet been provided. Before they appear.
Email confirmation and reset completion are done via API. Next Next post
The script requests a code and a new password without displaying and does not store them.
Only the script code itself is written into the file:

```sh
cat > "$CC_INSTALL_DIR/account-code.py" <<'PY'
import getpass
import json
import os
import urllib.error
import urllib.parse
import urllib.request

origin = os.environ['CC_API_ORIGIN'].rstrip('/')
url = urllib.parse.urlsplit(origin)
if url.scheme != 'https' or not url.netloc or url.path or url.query or url.fragment or url.username:
    raise SystemExit('CC_API_ORIGIN должен быть базовым HTTPS-адресом вашего сервера')
action = input('Действие: verify (email) или reset (пароль): ').strip()
if action not in ('verify', 'reset'):
    raise SystemExit('Неизвестное действие')
body = {'token': getpass.getpass('Код из соответствующего письма: ')}
path = '/v1/auth/email/verify'
if action == 'reset':
    password = getpass.getpass('Новый пароль учётной записи (не менее 12 символов): ')
    if len(password) < 12 or password != getpass.getpass('Повторите новый пароль: '):
        raise SystemExit('Пароль слишком короткий или значения не совпадают')
    body['new_password'] = password
    path = '/v1/auth/password/reset'
request = urllib.request.Request(origin + path, data=json.dumps(body).encode(),
    headers={'Content-Type': 'application/json', 'x-cc-protocol-version': '1.5'}, method='POST')
try:
    with urllib.request.urlopen(request, timeout=30) as response:
        print('Готово' if response.status == 204 else 'HTTP ' + str(response.status))
except urllib.error.HTTPError as error:
    raise SystemExit('Операция отклонена: HTTP ' + str(error.code)) from None
PY
chmod 600 "$CC_INSTALL_DIR/account-code.py"
python3 "$CC_INSTALL_DIR/account-code.py"
```

Confirmation code and password reset code are different one-time codes. Dumping
The account password terminates its sessions and does not decrypt the storage.
For a private installation without SMTP, you can select `mail.transport: disabled`.
Administrator confirms the address by the command `admin verify-email` only after
independent verification of the address owner:

```sh
cc_kubectl exec deployment/consolecrypt -- \
  /usr/local/bin/consolecrypt-server admin verify-email --email user@example.org
```

After logging in, check the full loop: create a test host without real ones.
connect the second device, check the trust code on both
Approve it and make sure the changes are synchronized.
Check to receive an SMTP letter as well. After creating the necessary accounts
You can close the registration through `config.registrationOpen: false` and repeat it.
`cc_helm upgrade` with a full private value file.

All sharing options in the example are turned off.
Their inclusion is a separate decision of the administrator after checking the compatible
clients. For normal synchronization of their devices, they are not necessary.

### Optional: Enable Shared Access

If you decide to allow sharing on your server, first
Check compatible customers, email confirmation, and device trust.
In the existing block `config` of your private values file, change:

```yaml
config:
  requireRequestProof: true
  objectSharingEnabled: true
  sharedGroupsEnabled: true
  sharedSecretsEnabled: true
  sharedKubeContextsEnabled: true
  sharedDbConnectionsEnabled: true
  sharedNotesEnabled: true
  sharingOwnerOnlineEnrollmentEnabled: true
```

`objectSharingEnabled` includes the main mechanism; the other flags separately
Allow shared groups, individual secrets, connections Kubernetes and databases,
general notes and the addition of new recipient's own devices
owner. Extensions require the main
functions and mandatory signatures of requests. Include only the necessary opportunities;
Do not replace the entire value file with this snippet.

Restrictions of rights, code verification and revocation are described in [SHARING.md](SHARING.md).
Use the full updated file:

```sh
cc_helm upgrade consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
```

Check the readiness and exchange of the test element between the two.
Verified accounts. Opportunities available to an authorized customer
through `/v1/shares/capabilities`; one `/v1/meta` is not enough for such a check.

## 7. Backups and restoration

All persistent server data is in PostgreSQL. Do it regularly.
[pg_dump](https://www.postgresql.org/docs/16/app-pgdump.html) and keep
encrypted copies outside the base node. Separately save.
Private settings and secrets. The copy contains sensitive metadata.
accounts, despite the encryption of the contents of the storage.

For external database, use tools PostgreSQL 16, connection file
`$CC_INSTALL_DIR/pg_service.conf` with section `[consolecrypt]` and password file
`$CC_INSTALL_DIR/pgpass` with 0600 rights. In the service file, specify `host`, `port`.
`dbname`, `user`, `sslmode=verify-full` and if necessary `sslrootcert`.
The password is stored in pgpass, not in the team’s arguments.
Formats described in documentation [service-файла](https://www.postgresql.org/docs/16/libpq-pgservice.html)
and [файла паролей](https://www.postgresql.org/docs/16/libpq-pgpass.html).

```sh
export PGSERVICEFILE="$CC_INSTALL_DIR/pg_service.conf"
export PGPASSFILE="$CC_INSTALL_DIR/pgpass"
chmod 600 "$PGSERVICEFILE" "$PGPASSFILE"
CC_BACKUP_FILE="$CC_INSTALL_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_dump --dbname='service=consolecrypt' --format=custom --no-owner --no-acl \
  --file="$CC_BACKUP_FILE"
pg_restore --list "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

For the built-in database, instead of `pg_dump` on a working computer, do:

```sh
CC_BACKUP_FILE="$CC_INSTALL_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
cc_kubectl exec statefulset/consolecrypt-postgresql -- \
  pg_dump -U consolecrypt -d consolecrypt --format=custom --no-owner --no-acl \
  > "$CC_BACKUP_FILE"
pg_restore --list "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

Checking the archive list is not a substitute for recovery. Regularly create
**Separate empty verification database** with separate user and service record
`consolecrypt-restore-check`, then perform:

```sh
pg_restore --dbname='service=consolecrypt-restore-check' \
  --exit-on-error --no-owner --no-acl "$CC_BACKUP_FILE"
```

Compare tables, migrations, number of records, and running the same server version
in an isolated environment. Do not connect the verification copy to working clients.
To recover from an accident, first close customer access, restore
full database and saved settings, connect the server to the restored database.
Before returning customer access, do:

```sh
cc_kubectl exec deployment/consolecrypt -- \
  /usr/local/bin/consolecrypt-server admin rotate-epoch --all
```

It's changing the eras of personal storage to ensure customers find a pullback. Before the accident
Shared access was used, take into account its individual control points:
`rotate-epoch` does not reset the trust of common elements and does not replace their procedure.
recovery. A full copy of the database must store the UUID of the server instance.

## 8. Update

1. Save previous chart, values and version (or digest); make a copy
   PostgreSQL and check the possibility of recovery.
2. Study release notes, new version migrations, and rollback compatibility.
   Update the source chart `git pull`: its `appVersion` – new version
   server. If you have fixed `image.digest`, replace it with a new digest.
   `sourceCodeUrl` leave empty (except modified assembly).
3. Execute `helm lint` and `helm template` with a full private values file.
   Do not change DB Secret, base name, release name or existing PVCs.
4. Run the same command `cc_helm upgrade --install` and then check.
   `/readyz`, `/v1/meta`, SMTP and synchronization of two devices.

Migrations are built into a binary file and are executed at the start. Executed SQL files
They don't edit. Helm rollback changes app resources, but **doesn't roll back the base**.
Older SQLx binary file may refuse to run if newer ones are available
migration. For a pre-verified compatible image, the rollback is set
`migrations.runAtStartup: false` and `migrations.job.enabled: false`; by itself
Disabling migrations does not prove compatibility with the scheme.

Do not run `helm uninstall`, do not delete PVC or Secrets for the update.
and do not change PostgreSQL 16 to another major by simply replacing the tag. Shift major
PostgreSQL requires a separate data transfer plan.

All launch parameters: [CONFIGURATION.md](CONFIGURATION.md) (example of environment file -
[server/.env.example](https://github.com/evsikovas/consolecrypt-server/blob/main/server/.env.example) .

### General connections Kubernetes

`CC_SHARED_KUBE_CONTEXTS_ENABLED=true` Allows the Exchange of Encrypted
connections Kubernetes when switched on `CC_OBJECT_SHARING_ENABLED` Client
checks `supports_kube_contexts` in a signed request to `/v1/shares/capabilities`
and explicitly requests `include_kube_contexts=true` when reading the list. Old clients.
They continue to receive the previous types of objects. Server verifies signatures, rights
devices and versions; cluster address, certificates and credentials are located
in encrypted content. The server does not read kubeconfig and does not connect to the API.
Kubernetes. Disabling the flag hides the common object, preserving its ciphertext.

### Shared database connections

Starting with server 0.1.15 (Protocol 1.6), a separate flag
`CC_SHARED_DB_CONNECTIONS_ENABLED=true` Allows the Exchange of Encrypted
connection to databases. Helm is used in `config.sharedDbConnectionsEnabled`.
Basic `CC_OBJECT_SHARING_ENABLED` and rigorous verification of request signatures
It's mandatory. Possibility is declared as `supports_db_connections`; only
клиент с явным `include_db_connections=true` получает новый тип `db_connection`
It's on the public list. Older customers don't get the type they don't know.

The server stores opaque ciphertext and checks signatures, the composition of participants.
and auditing. It does not connect to PostgreSQL, MySQL, ClickHouse, Redis or MongoDB.
the user and does not comply with requests to them. Turning off the flag hides the common
Connect without removing their encrypted content. Server Storage Format
It does not change; base migration is not necessary for this expansion.

### General notes

Starting with server 0.2.0 (protocol 1.9), flag `CC_SHARED_NOTES_ENABLED=true`
(in Helm - `config.sharedNotesEnabled` ) allows
participants of a common object (host, database, context Kubernetes)
Notes to him. Requires `CC_OBJECT_SHARING_ENABLED` and strict verification of signatures
(a) is declared as `supports_notes_v1` in `/v1/shares/capabilities`.

The server only stores encryption. The key notes of each era of access creates
the device of the owner, wraps it on the devices of the participants and signs;
Each note is signed by the author’s device. The server checks the membership,
Authorship, era and signatures. All participants can write, only their own can govern.
Notes, delete - the author or owner. Limits: 500 notes per object, up to 288 KiB
Cyphertext for note. Migration required `0010_share_notes`; flag switched off
It hides notes without deleting them.

### Protection against entry from a new device

Starting with server 0.1.16 (protocol 1.7), flag `CC_DEVICE_PROTECTION_ENABLED=true`
(in Helm – `config.deviceProtection.enabled`) protects the account from those who have learned
Only the account password or access to the mail:

- For each new device, the owner receives a letter with the link “It’s not me”
  `CC_PUBLIC_URL/account#action=deny-device&token=…`; the page serves your
  the site or the server itself with `CC_WEB_ACCOUNT=true`, and trusted devices
  event `device_registered`. The link is one-time, lives 7 days and recalls only
  This device, and only until it has opened the storage;
- New device first `CC_DEVICE_QUARANTINE_DAYS` days (default 14)
  cannot recall trusted devices `403 device_in_quarantine`,
  "Exit from all sessions" and change the password from it do not end the sessions of the trusted
  devices. Approval from Trusted Device Outside Quarantine Removes Quarantine
  before; unlocking storage with a storage password is not. A device that
  registered account, does not fall into quarantine;
- Disclosure (password/recovery envelope)
  Unconfirmed devices are limited to 5 per hour and 20 per day per account and 3 per hour
  on the device `CC_ENVELOPE_LIMIT_ACCOUNT_PER_HOUR`,
  `CC_ENVELOPE_LIMIT_ACCOUNT_PER_DAY`, `CC_ENVELOPE_LIMIT_DEVICE_PER_HOUR`, 0-
  without limitation). Counters are stored in PostgreSQL and work equally on all
  Remarks. Re-issuing the same storage to the same device within an hour
  It doesn't count. If exceeded - `429 envelope_rate_limited` and one letter per day;
- Resetting your account password recalls devices that have never been opened
  storage, and all other pending mail reset and confirmation codes.

`CC_NEW_DEVICE_MAIL_ENABLED` (by default `true`) separately disables emails about
New devices `CC_NEW_DEVICE_MAIL_PER_HOUR` (10) limit their number per hour:
The remaining entrances of this hour are reduced to one letter. Opportunity to be declared in
`/v1/meta` as `capabilities.device_protection`; protocol clients 1.6 and older
They continue to work and show new mistakes as common ones.

Update the server (migration `0008` adds)
`devices.first_trusted_at` and fill it with the existing envelope.
the account page that handles `#action=deny-device`, then install
Flag and redesign the service `server`. Without SMTP, “This Is Not Me” links are not sent.
The rest of the defense is working.

### Enterprise Mode: Enter IdP or Active Directory

Starting with server 0.2.0 (protocol 1.9) `CC_AUTH_MODE=enterprise` (in Helm -)
block `auth:` transfers the server to the input only through the corporate source
Accounts: IdP by OIDC (Entra ID, AD FS, Keycloak, Google Workspace, Okta, etc.)
any OIDC) or Active Directory/LDAP. Registration, login and password reset
Accounts are turned off, existing accounts are linked at the first login.
Disabled in IdP/AD employees lose access to synchronization
`CC_AUTH_RECHECK_MINUTES`. Storage encryption does not change: neither IdP, nor AD, nor
The server does not receive anything that can open the data. Default mode
`standard` and the server behaves as before.

Setup, Recipes for Entra ID, AD FS 2016+, Keycloak, Google Workspace, Okta and
AD for LDAPS, emergency access commands and AD account protection from blocking - in
[ENTERPRISE.md](ENTERPRISE.md).

### Teams.

Starting with server 0.2.1 (protocol 1.10), accounts can maintain ** shared storage.
commands** `CC_TEAMS_ENABLED`, default on; declared in `/v1/meta`
as `capabilities.teams`. The participant receives the storage key through an envelope.
sealed onto the key of the team member; the server does not decrypt anything.
Team composition - signed log with chain of hashes: server checks order,
Signatures and author's rights, customers check the entire journal themselves.

- Roles: owner, administrator, editor, observer. The observer can't
  Send changes `403`, `details.reason = "team_role"`
- Invitations by mail: the answer is always `202` (the server does not disclose whether there is a response).
  account), no more than 20 per hour per team, period of 7 days. Guest checks the code
  The participant with the inviter. Without SMTP, the invitee sees the invitation in the application.
- Deleting the participant revokes its access and requires changing the storage key.
- Limits: `CC_MAX_TEAMS_PER_ACCOUNT` (50 commands per account)
  `CC_MAX_TEAM_MEMBERS` (200 participants). In Helm, these keys are given through
  `extraEnv`.
- It works in both entry modes. Migration required `0012_teams`; old customers
  `/v1/vaults` gives only personal vaults.

To turn off commands, ask `CC_TEAMS_ENABLED=false` (in Docker – in
`server.env`, in Helm – `extraEnv`): routes `/v1/teams/*` will respond `404`.
Team data will be preserved.

### Quotas and limits of requests

Starting with server 0.2.2 (protocol 1.11), one account or device cannot
Exhaust server resources: base lines, place, CPU, mail or other limits.

**Quotas** `CC_QUOTAS_V2_ENABLED`, default `true`; `false` returns
behaviour 0.2.1.:

| Key key | By default. | Response when exceeded |
|---|---|---|
| `CC_MAX_VAULT_BYTES` | 1 Gib | `413`, `details.reason = "vault_quota"` : ciphertext plus tombstones |
| `CC_TOMBSTONE_COST_BYTES` | 256 | so many bytes of quota is worth each tombstone (remote object) |
| `CC_MAX_VAULT_OBJECTS` | 100 000 | `413`, `details.reason = "object_limit"`: living objects and tombstones |
| `CC_MAX_DEVICES_PER_ACCOUNT` | 20 (no more than 64) | input from a new device - `403`, `details.reason = "device_limit"` |
| `CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY` | 10 (0 - without limitation) | `403`, `details.reason = "device_daily_limit"`, `details.until` |

Removal of a living object is always accepted, even beyond the quota. Removal of the object,
The one that's never been on the server doesn't create a tombstone anymore. For the limit
Unrevoked devices are considered to be devices: recall unused devices on another device.
I'll get in and get in. Already known devices are included as usual.
Migration `0013_quotas_limits` counts the number of objects and tombstones once
Each storage facility (on larger bases, it may take time to get started).

** Request limits** are stored in PostgreSQL (token bucket, base time) and the same
They work on any number of replicas. In excess - `429 rate_limited` with
header `Retry-After` and `details.limit`; the client repeats the request later.
Readings (pull, lists) are limited only by a generous limit in the memory of each replica.
( `CC_RATE_LIMIT_READ_PER_DEVICE_PER_MINUTE`, 1200).

`CC_RATE_LIMIT_MODE`:

- `observe` (default to 0.2.2) – requests are not rejected, exceeding only
  are considered in the metric `cc_rate_limit_observed_total{limiter}` and in the audit journal
  `limit_exceeded`, no more than once per hour per account and limit;
- `enforce` - excesses are deviated from `429`.

Order of inclusion: update the server, a week to observe
`cc_rate_limit_observed_total`, if necessary, raise the thresholds.
Ask `enforce`. Entry and recovery limits are in both modes.
`CC_RATE_LIMIT_ENABLED=false` turns off all query limits but not quotas.

Each limit is configured with keys `CC_LIMIT_<ИМЯ>_RATE` `N`
limit period or `N/min`, `N/hour`, `N/day`; `0` - without limitation),
`_BURST` (capacity, default period), `_PER_HOUR` and `_PER_DAY`
(extra ceilings). For example, `CC_LIMIT_PUSH_ACCOUNT_RATE=600/min`. At Helm,
`config.rateLimit.limits: {push_account: {rate: "600/min", burst: 600}}`.

| Name. | What's limited | By default. |
|---|---|---|
| `push_device` | sending changes to the device | 120/min, spike 60 |
| `push_account` | Submitting changes to your account | 300/min |
| `mutations_account` | the number of changes in sendings, to the account | 50,000 per hour |
| `unknown_delete_account` | Deleting objects that were not on the server | 1000/day |
| `share_write_account` | creation of common objects | 60/hour, spike 20 |
| `share_revision_account` | audit of common facilities, change of access, general notes | 600/hour |
| `recipient_lookup_account` | mail-find | 30/min and 300/day |
| `enrollment_account` | Adding the recipient’s own devices | 30/hour |
| `trust_request_device` / `trust_request_account` | trustworthiness | 10/hour per device, 30/day per account |
| `verification_account` | Key reconciliation: announcement of the approving device, signed storage key prints | 20/hour |
| `account_security` | change of password, reissue of recovery kit, change of envelope | 10/hour |
| `ws_connect_account` | New WebSocket Connections | 60/min |
| `auth_ip` | Public Entry, Registration and Restoration Requests from a Single Address | 30/min |
| `login_email` | **unsuccessful** postal inputs from the same network (/24 IPv4, /64 IPv6) | 10/min and 50/hour |
| `login_email_total` | Failure to send emails from all networks | 200/hour |
| `recovery_email` | Password reset requests to email from one network | 5/hour |
| `recovery_email_total` | mailing letters from all networks (response always `202`) | 20/day |

Former keys `CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE`
`CC_RATE_LIMIT_LOGIN_PER_EMAIL_PER_MINUTE` and
`CC_RATE_LIMIT_RECOVERY_PER_EMAIL_PER_HOUR` continue to ask `auth_ip`.
`login_email` and `recovery_email`.

Alien attempts do not block the owner: successful entry does not spend the limits of mail.
a login from a **known device** account (the valid signature of the device)
It is not limited to the limits of the mail at all – only the limit of the address. When triggered
`login_email_total` the owner receives one letter a day "Many failed attempts"
entrance. A password reset letter from a network where the owner has logged in in the past 90 days
It is also in excess of `recovery_email_total`. There is no permanent blocking of the account.

Starting from 0.2.8, cancelling HTTP a request does not release the Argon2 slot until it has been cancelled.
The running computation will not really end. It retains the limitation.
parallel load at connection breaks. Replies to discovery/token/JWKS
OIDC is limited to 512 KiB while reading the stream, including responses without Content-Length.
If it is exceeded, the entrance is rejected. Consider this limit when setting up an IdP.

Redefinitions for a separate account (acting without restarting, no later than
than in 30 seconds:

```sh
# Docker
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show --email user@example.org
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits set \
  --email user@example.org push_account_rate=600/min max_vault_objects=200000
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits reset --email user@example.org
# Kubernetes
cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin limits show
```

Keys of overdefinitions are names of limits with suffixes `_rate`, `_burst`.
`_per_hour`, `_per_day` and quotas `max_vault_bytes`, `max_vault_objects`,
`max_devices_per_account`, `new_devices_per_account_per_day`. Entry limits
You cannot override the account.

Metrics: `cc_rate_limited_total{limiter}`, `cc_rate_limit_observed_total{limiter}`
`cc_rate_bucket_seconds` (checking time), `cc_quota_rejected_total{reason}`
`cc_sync_unknown_deletes_total`, `cc_tombstones_total`,
`cc_auth_known_device_bypass_total`, `cc_recovery_mail_suppressed_total`.

## How to set any parameter

Parameter names are the same everywhere - variables `CC_*`
[CONFIGURATION.md](CONFIGURATION.md). Rules for all installation methods:

- The process environment variable is more important than the value of the JSON file.
  Variable means “not set” (the default value is valid);
- A variable with a typo in the name is silently ignored, and an incorrect **value**
  stops the launch with a message `invalid configuration: <КЛЮЧ>: …`;
- Changes apply only after the process is restarted (except
  `admin limits set`, see [квоты и лимиты](#квоты-и-лимиты-запросов);
- Enterprise login secrets - only files `*_FILE`, database passwords and SMTP - through
  environment or private JSON file.

You can check the result in three ways: row `starting` in the server log
contains the current configuration (passwords are hidden); `/v1/meta` shows
Registration, mail confirmation, login mode, commands and device protection;
`admin limits show` and `admin auth status` show limits, quotas and entry.

### Docker Compose

Compose only transmits variables from the service block `environment:` to the server.
`server`. File `server.env` is substituted in `compose.yaml` `--env-file`, but itself in
container does not fall: line `CC_LIMIT_PUSH_ACCOUNT_RATE=600/min` in
`server.env` will not change anything if `compose.yaml` does not use it.

**1. Keys that change in `server.env` .** In `compose.yaml` they are written as
`${КЛЮЧ:-значение}`: `CC_DATABASE_PASSWORD`, `CC_RUN_MIGRATIONS`.
`CC_REGISTRATION_OPEN`, `CC_MAIL_TRANSPORT`, `CC_MAIL_FROM`, `CC_SMTP_HOST`.
`CC_SMTP_PORT`, `CC_SMTP_TLS`, `CC_SMTP_USERNAME`, `CC_SMTP_PASSWORD`.
`CC_OBJECT_SHARING_ENABLED`, `CC_SHARED_GROUPS_ENABLED`, `CC_SHARED_SECRETS_ENABLED`
`CC_SHARED_KUBE_CONTEXTS_ENABLED`, `CC_SHARED_DB_CONNECTIONS_ENABLED`,
`CC_SHARED_NOTES_ENABLED`, `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED`,
`CC_DEVICE_PROTECTION_ENABLED`, `CC_NEW_DEVICE_MAIL_ENABLED`,
`CC_DEVICE_QUARANTINE_DAYS`, `CC_TEAMS_ENABLED`, `CC_RATE_LIMIT_MODE`
`CC_QUOTAS_V2_ENABLED`, `CC_MAX_DEVICES_PER_ACCOUNT`, `CC_MAX_VAULT_OBJECTS`.
In addition to these `server.env` contains the variables of the Compose itself: `CC_SERVER_VERSION`.
`CC_SERVER_IMAGE`, `CC_DOMAIN`, `CC_HTTP_PORT`, `CC_POSTGRES_ADMIN_PASSWORD`.
Values with signs `$`, `#`, spaces or quotation marks write in single
In quotes.

**2. All other keys are in `compose.override.yaml` .** This and the keys that are not in
`compose.yaml` (limits `CC_LIMIT_*`, `CC_MAX_VAULT_BYTES`, `CC_MAX_TEAM_MEMBERS`
`CC_AUTH_*`, `CC_OIDC_*`, `CC_LDAP_*`, shelf life ...), and keys that
`compose.yaml` defines rigidly: `CC_DATABASE_URL`, `CC_DATABASE_CONNECT_TIMEOUT_SECS`.
`CC_LISTEN_ADDR`, `CC_METRICS_LISTEN`, `CC_PUBLIC_URL`
`CC_REQUIRE_EMAIL_VERIFICATION`, `CC_REQUIRE_REQUEST_PROOF`,
`CC_TRUST_PROXY_HEADERS`, `CC_EVENT_BUS`, `CC_HSTS`, `CC_LOG_FORMAT`. Meanings
`environment:` of the override file replace the same values `compose.yaml`.
The file is in a private directory next to `server.env`; write down the values.
in quotation marks:

```yaml
# $CC_INSTALL_DIR/compose.override.yaml
services:
  server:
    environment:
      CC_MAX_VAULT_BYTES: "2147483648"
      CC_LIMIT_PUSH_ACCOUNT_RATE: "600/min"
      CC_LOG: "info,sqlx=warn"
```

Connect it second `-f` (without it, the Compose file from another directory does not read)
and use this function for **all* commands - Updates, `admin`, backups
copies:

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
    --profile https "$@"
}
```

Write the paths inside the override file as absolute. You can add a service and
`env_file: [/абсолютный/путь/extra.env]` but values from `environment:`
`compose.yaml` is more important than `env_file`, so the keys from the lists above are still given.
c `environment:` .

**3. Secrets files (only enterprise login keys `*_FILE` and CA certificates)
Compose without Swarm mounts `secrets:` as regular files in `/run/secrets/<имя>`
owner and rights of the host. The server in the image works as UID 65532.
Reads them:

```sh
sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
```

```yaml
services:
  server:
    environment:
      CC_OIDC_CLIENT_SECRET_FILE: /run/secrets/oidc-client-secret
    secrets: [oidc-client-secret]
secrets:
  oidc-client-secret:
    file: /home/admin/.config/consolecrypt-docker/secrets/oidc-client-secret
```

Instead of `secrets:`, mounting is also suitable for reading only:
`volumes: ["/home/admin/.config/consolecrypt-docker/secrets:/run/secrets/consolecrypt:ro"]`.
Base passwords and SMTP remain in `server.env`: the server does not read them from the files.

**4. Apply and verify.**

```sh
cc_compose config --quiet
cc_compose up -d --wait --wait-timeout 180 server
cc_compose logs --no-log-prefix server | grep '"starting"' | tail -n 1
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show
```

`up -d` recreates a container only if its configuration has changed; data
The volumes are preserved. Do not use `down -v`.

### docker run without compose

The same keys are transmitted by flag `-e КЛЮЧ=значение` or file `--env-file`. Take note:
`docker run --env-file` takes the meaning literally, ** quotes are not removed **, so
`server.env` from `init-config.py` (values in quotation marks) is not suitable for it -
Write values without quotation marks. Passwords are more convenient to keep in a private file JSON.
Read-only mounted:

```sh
sudo install -d -m 0750 /etc/consolecrypt
sudo install -m 0400 -o 65532 -g 65532 server.json /etc/consolecrypt/server.json
docker run -d --name consolecrypt-server --restart unless-stopped \
  --read-only --cap-drop ALL --security-opt no-new-privileges:true \
  -p 127.0.0.1:8080:8080 \
  -v /etc/consolecrypt/server.json:/etc/consolecrypt/server.json:ro \
  -v /etc/consolecrypt/secrets:/run/secrets/consolecrypt:ro \
  -e CC_TRUST_PROXY_HEADERS=true \
  "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION" \
  --config /etc/consolecrypt/server.json serve
```

`CC_SERVER_VERSION` is a server release version (as in example Docker Compose).
The image already sets `CC_LISTEN_ADDR=0.0.0.0:8080`, `CC_METRICS_LISTEN=0.0.0.0:9090`.
`CC_LOG_FORMAT=json` and `CC_SOURCE_CODE_URL`; container environment variables
It is more important than the file JSON, so change these four keys with the flag `-e` rather than in the file.
Change of parameters - `docker rm -f consolecrypt-server` and the same `docker run`
(data in PostgreSQL), the container does not store them.) Administrator teams:
*docker exec consolecrypt server /usr/local/bin/consolecrypt-server --config
/etc/consolecrypt/server.json admin ...'

### Kubernetes: Helm

Chart turns value blocks into variables `CC_*`: unclassified ones into ConfigMap.
URL base and SMTP password – in Secret or links `secretKeyRef` to your Secret.
The correspondence of each `CC_*` value path is given in the column "Helm".
[CONFIGURATION.md](CONFIGURATION.md). Empty lines in values are skipped - then
The default value of the server is valid.

| What? | Where in values |
|---|---|
| flags, tokens, quotas, limits, WebSocket, service, magazine | `config.*` `config.rateLimit.limits` – `CC_LIMIT_*` |
| enterprise-entry | `auth.*`, secrets - `auth.oidc.existingSecret` / `auth.ldap.existingSecret` |
| postage | `mail.*`, password - `mail.smtp.existingSecret` |
| database | `database.*` or `postgresql.*`, migrations `migrations.*` |
| metric | `metrics.enabled` ( `CC_METRICS_LISTEN`) |
| keys without path in chart `CC_TEAMS_ENABLED`, `CC_MAX_TEAMS_PER_ACCOUNT`, `CC_MAX_TEAM_MEMBERS`, `RUST_LOG`, `OTEL_*`, external `CC_DATABASE_PASSWORD` | `extraEnv` |

```yaml
extraEnv:
  - name: CC_MAX_TEAM_MEMBERS
    value: "50"
  - name: CC_DATABASE_PASSWORD          # пароль внешней базы отдельно от URL
    valueFrom:
      secretKeyRef: {name: consolecrypt-database, key: password}
```

Variables from `extraEnv` (section `env` of the container) are more important than the ConfigMap chart
`envFrom` and `extraEnvFrom` is connected after the ConfigMap chart and so on.
It's blocking it. Use it only for keys without your own path.
Otherwise the value in values and the current value will diverge.

Application - `helm upgrade` with **full** private values file: pods
They restart themselves because the ConfigMap checksum changes. After
Change the contents of your existing Secret restart them manually:

```sh
cc_helm upgrade consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
cc_kubectl rollout restart deployment/consolecrypt   # только после смены Secret
cc_kubectl get configmap consolecrypt -o yaml        # несекретные CC_* как их видит pod
cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin limits show
```

### JSON -file, binary file and systemd

Without containers, settings are more convenient to store in a private file JSON.
`--config /etc/consolecrypt/server.json` or variable `CC_CONFIG_FILE`. File--
one JSON -object, values only in rows, rights `0600` or `0400`, owner -
service user. Unknown or repeated key, incorrect JSON or
An inaccessible file stops starting without outputting the content. `CC_LOG`
`RUST_LOG` and `OTEL_*` will not be accepted into the file - ask them in the service environment.
Example: [server.example.json](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/server.example.json).
unit file - [consolecrypt-server.service](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/consolecrypt-server.service)
Details - [native/README.md](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/README.md).

```json
{
  "CC_DATABASE_URL": "postgres://consolecrypt@127.0.0.1:5432/consolecrypt?sslmode=disable",
  "CC_DATABASE_PASSWORD": "<пароль базы>",
  "CC_LISTEN_ADDR": "127.0.0.1:8080",
  "CC_METRICS_LISTEN": "127.0.0.1:9090",
  "CC_TRUST_PROXY_HEADERS": "true",
  "CC_REQUIRE_EMAIL_VERIFICATION": "true",
  "CC_MAIL_TRANSPORT": "smtp",
  "CC_MAIL_FROM": "ConsoleCrypt <no-reply@example.org>",
  "CC_SMTP_HOST": "smtp.example.org",
  "CC_SMTP_USERNAME": "mailer@example.org",
  "CC_SMTP_PASSWORD": "<пароль SMTP>",
  "CC_RATE_LIMIT_MODE": "enforce"
}
```

The environment variable for the service is added with a drop-in file
( `sudo systemctl edit consolecrypt-server`):

```ini
[Service]
Environment=CC_LOG=info,sqlx=warn
```

After editing a file or environment: `sudo systemctl restart consolecrypt-server`
then `sudo-u consolecrypt consolecrypt server --config
/etc/consolecrypt/server.json healthcheck' and
`journalctl -u consolecrypt-server | grep starting | tail -n 1`. Base password is available
do not store in JSON file: if there is no password in either `CC_DATABASE_PASSWORD` or URL
The driver takes the standard variable `PGPASSWORD` from the service environment.

### Example: general notes and commands

Shared notes require a shared primary flag; commands are included by
It is a default and does not depend on it.

Docker Compose - in `server.env`, then `cc_compose up -d --wait --wait-timeout 180 server`:

```dotenv
CC_OBJECT_SHARING_ENABLED=true
CC_SHARED_NOTES_ENABLED=true
CC_TEAMS_ENABLED=true
```

Team limits at `compose.override.yaml`:

```yaml
services:
  server:
    environment:
      CC_MAX_TEAMS_PER_ACCOUNT: "20"
      CC_MAX_TEAM_MEMBERS: "50"
```

Helm:

```yaml
config:
  requireRequestProof: true
  objectSharingEnabled: true
  sharedNotesEnabled: true
extraEnv:
  - name: CC_TEAMS_ENABLED
    value: "true"
  - name: CC_MAX_TEAM_MEMBERS
    value: "50"
```

JSON: `" CC_OBJECT_SHARING_ENABLED": "true", " CC_SHARED_NOTES_ENABLED": "true",
" CC_MAX_TEAM_MEMBERS": "50". Verification: `/v1/meta` → `capabilities.teams: true`;
The client sees support for notes in `/v1/shares/capabilities` `supports_notes_v1`.

### Example: Entra ID Enterprise Login

Application registration in Entra ID is described in
[ENTERPRISE.md](../ENTERPRISE.md#microsoft-entra-id). Redirect URI -
`https://sync.example.org/v1/auth/oidc/callback`.

Docker Compose. Secrets:

```sh
mkdir -p "$CC_INSTALL_DIR/secrets"
( umask 077
  openssl rand -hex 32 > "$CC_INSTALL_DIR/secrets/oidc-token-key"
  read -rs CC_SECRET && printf '%s' "$CC_SECRET" > "$CC_INSTALL_DIR/secrets/oidc-client-secret"
  unset CC_SECRET )
sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
```

`$CC_INSTALL_DIR/compose.override.yaml` (replace `/home/admin/.config/consolecrypt-docker`
his `$CC_INSTALL_DIR`:

```yaml
services:
  server:
    environment:
      CC_PUBLIC_URL: https://sync.example.org
      CC_AUTH_MODE: enterprise
      CC_AUTH_PROVIDER: oidc
      CC_AUTH_DISPLAY_NAME: Example SSO
      CC_AUTH_ALLOWED_DOMAINS: example.org
      CC_OIDC_PRESET: entra
      CC_OIDC_ISSUER: https://login.microsoftonline.com/<tenant-id>/v2.0
      CC_OIDC_CLIENT_ID: <application-client-id>
      CC_OIDC_REQUIRED_CLAIM: roles=ConsoleCrypt.User
      CC_OIDC_CLIENT_SECRET_FILE: /run/secrets/oidc-client-secret
      CC_OIDC_TOKEN_KEY_FILE: /run/secrets/oidc-token-key
    secrets: [oidc-client-secret, oidc-token-key]
secrets:
  oidc-client-secret:
    file: /home/admin/.config/consolecrypt-docker/secrets/oidc-client-secret
  oidc-token-key:
    file: /home/admin/.config/consolecrypt-docker/secrets/oidc-token-key
```

```sh
cc_compose config --quiet
cc_compose up -d --wait --wait-timeout 180 server
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin auth test
```

Caddy from the example gives only the API: links in the letters to
`https://sync.example.org/account` return the 404, the codes from the emails work in the application.

Helm. Secret and values:

```sh
cc_kubectl create secret generic consolecrypt-oidc \
  --from-file=client-secret="$CC_INSTALL_DIR/secrets/oidc-client-secret" \
  --from-file=token-key="$CC_INSTALL_DIR/secrets/oidc-token-key"
```

```yaml
config:
  publicUrl: https://sync.example.org
auth:
  mode: enterprise
  provider: oidc
  displayName: Example SSO
  allowedDomains: [example.org]
  oidc:
    preset: entra
    issuer: https://login.microsoftonline.com/<tenant-id>/v2.0
    clientId: <application-client-id>
    requiredClaim: roles=ConsoleCrypt.User
    existingSecret: consolecrypt-oidc
```

JSON or systemd are the same keys as in the override file, and `*_FILE` indicate
Files with rights `0400` belonging to the user of the service, for example
`/etc/consolecrypt/secrets/oidc-client-secret`.

### Example: Active Directory Login (LDAP)

Preparation of accounting and certificate - [ENTERPRISE.md](../ENTERPRISE.md#active-directory-и-ldap).
Docker Compose, `compose.override.yaml` (files `ldap-bind-password` and `ad-ca.pem` in
`$CC_INSTALL_DIR/secrets`, owner 65532, rights `0400`:

```yaml
services:
  server:
    environment:
      CC_AUTH_MODE: enterprise
      CC_AUTH_PROVIDER: ldap
      CC_AUTH_DISPLAY_NAME: ACME
      CC_AUTH_ALLOWED_DOMAINS: acme.com
      CC_LDAP_URL: ldaps://dc1.acme.local:636
      CC_LDAP_CA_FILE: /run/secrets/ad-ca.pem
      CC_LDAP_BIND_DN: CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
      CC_LDAP_BIND_PASSWORD_FILE: /run/secrets/ldap-bind-password
      CC_LDAP_BASE_DN: DC=acme,DC=local
      CC_LDAP_REQUIRED_GROUP: CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
      CC_LDAP_MAX_FAILURES: "3"
      CC_LDAP_FAILURE_WINDOW_MINUTES: "30"
    secrets: [ldap-bind-password, ad-ca.pem]
secrets:
  ldap-bind-password:
    file: /home/admin/.config/consolecrypt-docker/secrets/ldap-bind-password
  ad-ca.pem:
    file: /home/admin/.config/consolecrypt-docker/secrets/ad-ca.pem
```

The container must allow the DNS name of the domain controller; if Docker uses the
Add another DNS to the service `dns:` or `extra_hosts:`. Verification of the user without
Password: `cc_compose exec -T server /usr/local/bin/consolecrypt-server admin auth
test --login alice@acme.com'.

Helm:

```sh
cc_kubectl create secret generic consolecrypt-ldap \
  --from-file=bind-password="$CC_INSTALL_DIR/secrets/ldap-bind-password" \
  --from-file=ca.pem="$CC_INSTALL_DIR/secrets/ad-ca.pem"
```

```yaml
auth:
  mode: enterprise
  provider: ldap
  displayName: ACME
  allowedDomains: [acme.com]
  ldap:
    url: ldaps://dc1.acme.local:636
    bindDn: CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
    baseDn: DC=acme,DC=local
    requiredGroup: CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
    maxFailures: 3
    failureWindowMinutes: 30
    existingSecret: consolecrypt-ldap
    caKey: ca.pem
```

### Example: limit of requests from observe to enforce

1. A week after upgrading to 0.2.2, see the metric
   `cc_rate_limit_observed_total{limiter}` (port metrics; in example Docker it
   switched off – turn on `CC_METRICS_LISTEN` in an override file and publish the port
   Only on `127.0.0.1` or audit events `limit_exceeded`.
2. If ordinary users are against the limit, raise it, for example.
   `CC_LIMIT_PUSH_ACCOUNT_RATE=600/min`, or redefinite for a single account
   team `admin limits set`.
3. Switch mode.

Docker Compose : in `server.env` – `CC_RATE_LIMIT_MODE=enforce`, raised limits – in
`compose.override.yaml`:

```yaml
services:
  server:
    environment:
      CC_METRICS_LISTEN: 0.0.0.0:9090
      CC_LIMIT_PUSH_ACCOUNT_RATE: "600/min"
      CC_LIMIT_PUSH_ACCOUNT_BURST: "600"
      CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_DAY: "100"
    ports:
      - "127.0.0.1:9090:9090"
```

Helm:

```yaml
config:
  rateLimit:
    mode: enforce
    limits:
      push_account: {rate: "600/min", burst: 600}
      recipient_lookup_account: {perDay: 100}
```

After restarting, output `admin limits show` begins with a line.
`request limits: enforce` and shows valid values (redefinitions)
Accounts marked `*`; rejections counted `cc_rate_limited_total{limiter}`.

### Example: raising quotas

For the entire server. Docker Compose: `CC_MAX_VAULT_OBJECTS` and
`CC_MAX_DEVICES_PER_ACCOUNT` - in `server.env`, the rest - in the override file:

```dotenv
CC_MAX_VAULT_OBJECTS=200000
CC_MAX_DEVICES_PER_ACCOUNT=40
```

```yaml
services:
  server:
    environment:
      CC_MAX_VAULT_BYTES: "4294967296"
      CC_MAX_VAULTS_PER_ACCOUNT: "100"
      CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY: "20"
```

Helm:

```yaml
config:
  quotas:
    maxVaultBytes: 4294967296
    maxVaultsPerAccount: 100
    maxVaultObjects: 200000
    maxDevicesPerAccount: 40
    newDevicesPerAccountPerDay: 20
```

For one account - without restarting, no later than 30 seconds:

```sh
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits set \
  --email user@example.org max_vault_bytes=4294967296 max_vault_objects=200000
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show --email user@example.org
```

`CC_MAX_DEVICES_PER_ACCOUNT` may not exceed 64, `CC_MAX_VAULT_BYTES` less
1 MiB. Plan the disk space PostgreSQL with the storage quota and the number.
accounts.

### Example: letters without SMTP - where to get the code

Without SMTP, emails don’t go anywhere. Email confirmation codes, password change
“It’s not me,” the operator receives in one of two ways.

** `CC_MAIL_TRANSPORT=file` – local or test server only.**
Each email is recorded by a file in `CC_MAIL_DIR` (default `./.dev-mail`)
in relation to the working directory of the process; in the development
`server/docker-compose.yml` – `server/.dev-mail` on the host:

```dotenv
CC_MAIL_TRANSPORT=file
CC_MAIL_DIR=/path/to/mail
```

The file name is `<время UTC>-<тип>-<id>.eml`, for example
`20261026T205345-password_reset-….eml`. Type of letter with code: `verify_email`
Confirmation of address, `password_reset` – change of password, `new_device` – login with
The new device ("It's not me"). Other types `password_changed`,
`device_revoked` – notifications without a code.

The text of the letter is encoded in base64, so `cat` will not show it. Last one.
The password change letter can be read as follows (replace the email to confirm the email).
`password_reset` to `verify_email`:

```sh
python3 - "$(ls -t "$CC_MAIL_DIR"/*-password_reset-*.eml | head -1)" <<'PY'
import sys
from email import message_from_binary_file, policy
with open(sys.argv[1], 'rb') as f:
    msg = message_from_binary_file(f, policy=policy.default)
print(msg['subject'])
print(msg.get_body(('plain',)).get_content())
PY
```

On macOS the file can be opened in Mail: `open файл.eml`.

The code is inserted into the account page: built-in `/account` server
`CC_WEB_ACCOUNT=true`, “Confirm email” or “Forgot your password?”
There is a code or page of your website. The email confirmation code accepts and
annex. Link buttons appear in emails only if given
`CC_PUBLIC_URL`, otherwise the letter is code only. Files contain active files
disposable codes and created with rights `0600`: do not use `file`
to the public server and delete the directory when it is no longer needed.

** `CC_MAIL_TRANSPORT=disabled` (by default).** There are no letters at all. Operator.
first checks that the address belongs to the user, then confirms
it or gives the password change code:

```sh
consolecrypt-server admin verify-email --email user@example.org
consolecrypt-server admin reset-token --email user@example.org
```

`reset-token` prints disposable code; it is valid `CC_PASSWORD_RESET_TTL_SECS`
(default 1 hour) and entered in the same place where the code from the letter. B Docker Compose and
Kubernetes instructions are executed inside the container:
`cc_compose exec -T server /usr/local/bin/consolecrypt-server admin …` or
`cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin …`.

## Verification of server dependencies

For developers and those who collect the image themselves. `server/scripts/dependency_audit.py check`
launches `cargo deny check advisories bans sources licenses` for `server` and
`crates` and checks that unpublished crates are proprietary `cc-*`.
`consolecrypt-server` ) under `AGPL-3.0-only`:

```sh
cargo install --locked cargo-deny@0.20.2
python3 server/scripts/dependency_audit.py check
```

CI performs the same on GitHub-hosted `ubuntu-24.04`: in `validate` tag release
(Failure stops image assembly) and in weekly `dependency-audit.yml`
which also checks pull request with modified dependencies, opens
or updates the issue "Vulnerable Addictions" and closes it after a clean run.
`cargo-deny` is downloaded from GitHub Releases with SHA-256 verification from the script.

Politics `server/deny.toml`, `crates/deny.toml`: vulnerable and yanked versions
Prohibited; unmaintained for direct dependencies; TLS only rustls `native-tls`
`openssl`, `openssl-sys` prohibited); no git dependencies `cc-protocol` linked
`crates/` follows a stricter list of customer licenses.
An exception shall be added to `ignore` of the corresponding `deny.toml` only with
the identifier of the Board, the reason, owner and date of revision (no later than three years)
months).

---
