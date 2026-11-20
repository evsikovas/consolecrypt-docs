# Instalación de un servidor propio ConsoleCrypt

Referencia traducida · [Original en ruso](../HOSTING.md)

Lo mismo en el sitio: [Docker Compose](https://consolecrypt.dev/guide#server-docker) , [Kubernetes](https://consolecrypt.dev/guide#server-setup) .
[установка и параметры по способам](https://consolecrypt.dev/guide#server-settings) .
Lo mismo en el sitio web: [installation and parameters by method](https://consolecrypt.dev/guide#server-settings) .

El servidor almacena cuentas, información de dispositivos y datos cifrados
bóvedas. Decryption tiene lugar en el cliente; SSH -conexiones son establecidas por el cliente
Directamente con sus anfitriones.

Elija un método: [Docker Compose на одном сервере](#docker-compose)
[Kubernetes/k3s через Helm](#kubernetes-helm) . Ambos ejecutan sólo APIs.
c PostgreSQL y SMTP. Dominio `sync.example.org` , dirección de la base de datos y configuración postal
Los ejemplos deben ser reemplazados por los suyos. Todos los comandos se ejecutan desde la raíz de origen.
a menos que se indique otra cosa.

Los ejemplos se asignan a la versión **current server release ** - la misma versión que en
`server/Cargo.toml` ramas `main` . En Docker es una variable.
`CC_SERVER_VERSION` , en el gráfico Helm - `appVersion`; cuando una nueva versión es lanzada, ellos
Ellos cambian con él (verificado en CI). Imagen
`ghcr.io/evsikovas/consolecrypt-server:<версия>` recogidos para `linux/amd64` y
`linux/arm64` ; la etiqueta publicada no es sobrescrito. Al más completo
Reproduced install fix digest from file `server-image.json`
GitHub La publicación de la versión deseada.

Lo que el servidor actual puede hacer y cómo se activa:

| Oportunidad | Configuración | Por defecto. |
|---|---|---|
| Sincronización de almacenamiento, confianza de dispositivo, firmas de solicitud | `CC_REQUIRE_REQUEST_PROOF` | incluido |
| [Защита от входа с нового устройства](#защита-от-входа-с-нового-устройства) | `CC_DEVICE_PROTECTION_ENABLED` | apagado |
| [Совместный доступ](SHARING.md) Hosts, Grupos, Secretos, Kubernetes , Databases | `CC_OBJECT_SHARING_ENABLED` y banderas de tipo | apagado |
| [Общие заметки](#общие-заметки) a objetos comunes | `CC_SHARED_NOTES_ENABLED` | apagado |
| [Команды](#команды) (cuarto común) | `CC_TEAMS_ENABLED` | incluido |
| [Enterprise-вход](ENTERPRISE.md) via IdP (OIDC) o Active Directory (LDAP) | `CC_AUTH_MODE=enterprise` | `standard` |
| [Квоты и лимиты запросов](#квоты-и-лимиты-запросов) | `CC_QUOTAS_V2_ENABLED` , `CC_RATE_LIMIT_MODE` | cuotas incluidas, límites en el modo `observe` |

Todos los parámetros del servidor con valores válidos, valores predeterminados y caminos
Helm está listado en [CONFIGURATION.md](CONFIGURATION.md) . Cómo preguntar a cualquiera de ellos
c Docker Compose , `docker run` , Helm, JSON -file o sistema, con listo
Por ejemplo, véase la sección [Как задать любой параметр](#как-задать-любой-параметр) .
Inglés: [configuration methods and worked examples](#english) .

## Docker Compose

Instalación en un solo servidor sin Kubernetes

### ¿Qué necesitas?

Linux - servidor con Docker motor, Docker Compose **2.24.4 o posterior** (o 5.x),
Python **3.9 o posterior** y un disco libre para PostgreSQL 16. Para HTTPS usted necesita
dominio con DNS A/AAAA a este servidor y puertos TCP accesibles externamente 80 y 443.
UDP 443 es utilizado por Caddy para HTTP /3; cuando está bloqueado, permanece HTTPS sobre TCP.
Estos puertos no tienen que tener otro proxy al mismo tiempo.

La variante está diseñada para un nodo: PostgreSQL sin replicación, API y opcional
Caddy. Los datos constantes están en Docker volúmenes. Configurar copias de seguridad.
fuera de este nodo y auto-start Docker después de reiniciar.

Archivos: [compose.yaml](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/compose.yaml)
[Caddyfile](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/Caddyfile) ,
[справочник переменных](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/.env.example).
Old `server/docker-compose.yml` remains a separate option for development.
Reagrupar el código fuente y escribir las letras en archivos.

### Tome un ejemplo y cree una configuración privada.

Para Docker , tomar ** corriente `main` **. El generador escribe a un privado
`server.env` versión del servidor de ejemplo, por ejemplo:

```text
CC_SERVER_VERSION=0.2.8
```

La composición toma la imagen `ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION` .
En lugar de la etiqueta, puede especificar la imagen exacta: `CC_SERVER_IMAGE=ghcr.io/evsikovas/consolecrypt-server@sha256:…`
(digest from `server-image.json` to GitHub Release). El servidor mismo informa a `/v1/meta` .
a referencia a la fuente de su asamblea; `CC_SOURCE_CODE_URL` sólo se requiere para
asamblea modificada (ver [LICENSING.md](LICENSING.md) ).

En una terminal de Bash separada:

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

Compruebe que el servidor es seleccionado Docker . Generator crea directorio con derechos
0700 y `server.env` con derechos 0600 ** fuera de la fuente**, genera diferentes aleatorios
contraseñas de administrador PostgreSQL y usuario de aplicaciones, y contraseña SMTP
Pregunta sin pantalla. Bajo el presente `server.env` se negará a continuar:
La regeneración de la contraseña no cambia la contraseña de la base de datos ya creada.

Especifique el host SMTP, remitente, puerto, modo TLS y login. El 587 suele ser necesario.
`starttls` , por 465 – `tls` ; el remitente debe ser autorizado por su SMTP.
Para una instalación privada sin correo, agregue el generador `--mail-disabled` :
confirmar el correo electrónico entonces el administrador debe restablecer automáticamente por correo
No funcionará. La confirmación del correo electrónico y la firma de solicitudes siguen siendo obligatorias.

No añadir `server.env` a Git, no ejecutar `source server.env` y no salida
`docker compose config` sin `--quiet` : La configuración final contiene contraseñas.
No enciendas `set -x` . Compose toma los valores de `--env-file` , pero el mismo nombre
Las variables actuales de shell tienen prioridad: utilizar un terminal limpio.
Detalles en [документации Docker об интерполяции](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/) .
El acceso a Docker daemon permite leer variables de contenedores; limitarlo
administradores. El servidor no tiene un mecanismo común `*_FILE` (los archivos se leen).
Secretos de entrada de la empresa solamente: la contraseña de la base de datos se transfiere a individuos
`CC_DATABASE_PASSWORD` , sin espacio en URL . No es necesario para descomponerse.

### Lanzamiento PostgreSQL , API y HTTPS

Guardar la función en esta terminal y utilizarla para los siguientes comandos:

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

PostgreSQL y la API se convertirá `healthy` ; Caddy `running` .
El servidor utiliza la verificación integrada `/readyz` en el archivo binario: instalar
`curl` o la cáscara no es necesaria. En el primer inicio PostgreSQL crea
Un papel `consolecrypt` que posee su base pero no es un superusuario.
La API aplica entonces las migraciones. Las dependencias con `service_healthy` se describen en
[документации Compose](https://docs.docker.com/compose/how-tos/startup-order/).

Caddy recibe y renueva un certificado de confianza automáticamente. Por eso, DNS,
los puertos de enrutamiento y entrantes deben funcionar; el estado `running` todavía no prueba
Que se expidió el certificado. Detalles - [Automatic HTTPS](https://caddyserver.com/docs/automatic-https) .
Los certificados se guardan en `caddy_data` y la configuración de Caddy en `caddy_config` .

La API se publica en **127.0.0.1:80** host. PostgreSQL 5432 no publicado
Las métricas están apagadas. Caddy sólo transmite al servidor `/v1`, `/v1/*`, `/healthz` .
`/readyz` y `/account` , `/account/*` ; la raíz del sitio devolverá 404. Sitio o análisis
No están instalados. Por defecto `CC_WEB_ACCOUNT=false` y `CC_PUBLIC_URL` están vacíos:
`/account` responde a 404 letras (HTML y texto, idioma - `CC_MAIL_LANGUAGE` , `ru` o
`en` ) sugiere insertar el código en la aplicación y no mencionar la página web.

Para que los correos electrónicos lleven a la página incorporada de la cuenta del servidor (confirmación de correo electrónico,
nueva contraseña de código, "Esto no soy yo" para correos electrónicos sobre nuevos dispositivos, añadir al archivo
`CC_WEB_ACCOUNT=true` y `CC_PUBLIC_URL=https://<CC_DOMAIN>` – necesarios
Una imagen del servidor donde la página ya existe. La página es estática, funciona.
sólo con los puntos finales públicos en el código de la carta, sin entrada y sin acceso
El código se transmite en fragmento URL y no entra en los registros.
El cliente es ingresado `CC_API_ORIGIN` en lugar de `CC_PUBLIC_URL` .

Si ya tiene HTTPS proxy inverso en ese host, retire `--profile https` .
Desde la función y configura proxy hasta `http://127.0.0.1:8080` . Necesita volver a grabar.
no confiado `X-Forwarded-For` , transferencia WebSocket `/v1/events/ws` , recibir
hasta 16 MiB y no cambien el camino, la consulta o el cuerpo de solicitudes firmadas.
Ejemplo [Caddy reverse_proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)
Lo hace sin `handle_path` y reescribir. El ejemplo implica un proxy de confianza.
No abra el puerto de API al exterior. En un conflicto local de 8080, cambio `CC_HTTP_PORT` .
En un archivo privado y la corriente de arriba correspondiente de su proxy.

### Comprobar y conectar el cliente

```sh
curl --fail --silent --show-error "$CC_API_ORIGIN/healthz"
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
```

`ok` , `ready` , `server_version` , igual a `CC_SERVER_VERSION` , y
`protocol_version` de esta versión (por ejemplo, `1.11` en el servidor 0.2.2).
Comprobar HTTPS sin `curl -k` , incluyendo de otra máquina. En el cliente, cree.
perfil con `https://sync.example.org` ** sin `/v1` **. Comprueba, revisa.
Entrega el correo electrónico y confirma el código a través de la API como se describe en la sección 6 a continuación.
Cuando el SMTP está deshabilitado, el operador, después de comprobar el propietario de la dirección, realiza:

```sh
cc_compose exec -T server /usr/local/bin/consolecrypt-server \
  admin verify-email --email user@example.org
```

Compruebe la sincronización del host de prueba entre dos dispositivos de confianza.
Para cerrar el registro, cambie `CC_REGISTRATION_OPEN=false` a `server.env`
y actuar `cc_compose up -d --wait --wait-timeout 180 server` .

Compartir banderas se apagan por defecto. Si el Administrador decide por separado
Permitir acceso compartido y comprobar la compatibilidad del cliente, cambia
`CC_OBJECT_SHARING_ENABLED` , `CC_SHARED_GROUPS_ENABLED` , `CC_SHARED_SECRETS_ENABLED`
`CC_SHARED_KUBE_CONTEXTS_ENABLED`, `CC_SHARED_DB_CONNECTIONS_ENABLED` ,
`CC_SHARED_NOTES_ENABLED` y `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED` en el mismo archivo privado en `true` .
Luego recrea sólo el servicio `server` por el mismo equipo. Firmas de solicitudes
Sigue siendo obligatorio. La bandera principal es obligatoria para otras extensiones.
Las oportunidades se verifican mediante una solicitud autorizada `/v1/shares/capabilities` .
no a través `/v1/meta` ; las limitaciones se establecen en [SHARING.md](SHARING.md) .

### Retención de datos y copias de seguridad

El nombre del proyecto Compose es `consolecrypt-selfhost` ; su volumen PostgreSQL
`consolecrypt-selfhost_pgdata`. Guardar el nombre del proyecto y el archivo privado:
otro `--project-name` creará otra base de datos. `cc_compose down` almacenará volúmenes.
pero detiene el servicio; `cc_compose up -d --wait --wait-timeout 180` comienza
**No utilizar `down -v` o `docker volume prune`
para una actualización o un reinicio normal. Después de la primera creación de la base, el cambio
Las contraseñas en `server.env` no cambian el papel de PostgreSQL .

La imagen PostgreSQL se crea sin instalación `pg_dump` en el host:

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

Contraseña no entra argv: el comando se ejecuta a través de la toma de Unix local
en un contenedor PostgreSQL . Transfiera la copia a un almacenamiento cifrado fuera de esto
nudo. Guardar separadamente `server.env` , la versión Compose y los volúmenes Caddy.
La copia de seguridad contiene metadatos de cuenta sensibles, aunque
El contenido del almacenamiento está encriptado. La lista de archivos no es un sustituto para la recuperación de pruebas.

Para la verificación, cree una base de datos ** separada vacía, no conectada a los clientes de trabajo.
Los siguientes comandos se detendrán si el nombre ya se toma; para una prueba de repetición
Elige un nombre diferente y utilízalo en ambos equipos:

```sh
cc_compose exec -T postgres createdb -U postgres -O consolecrypt consolecrypt_restore_check &&
  cc_compose exec -T postgres pg_restore -U postgres --role=consolecrypt \
    -d consolecrypt_restore_check --exit-on-error --no-owner --no-acl < "$CC_BACKUP_FILE"
```

Comparar tablas, migraciones, número de registros y `sharing_instance.instance_id` .
A continuación, compruebe para ejecutar la misma imagen con una copia en un ambiente aislado.
Para la recuperación completa de desastres, el acceso al cliente está cerrado, levantado
Vacío PostgreSQL con ajustes guardados, restaurar toda la base de datos a
Iniciar la API y comprobarlo. Después de la restauración del almacenamiento personal y **do**
Acceso cliente de retorno con una base restaurada:

```sh
cc_compose run --rm --no-deps server admin rotate-epoch --all
```

Esto no es un sustituto para restaurar la confianza a los elementos comunes: compartir
puntos de control. Guardar el UUID de la instancia del servidor desde una copia completa de la base de datos.
Los detalles figuran en la sección 7 infra.

### Actualización y verificación del ejemplo

Primero, haga y revise la copia de seguridad. Guarde los archivos anteriores Compose.
`server.env` y el valor anterior `CC_SERVER_VERSION` . Léelo.
[примечания к выпуску](https://github.com/evsikovas/consolecrypt-server/releases) :
Nuevas migraciones, banderas y valores por defecto. Actualizar la fuente de la muestra
`git pull` en el directorio de clones, luego cambiar en el privado `server.env`
`CC_SERVER_VERSION` a la nueva versión (o `CC_SERVER_IMAGE` a su digestión).
Línea `CC_SOURCE_CODE_URL` , si fue grabado por el generador de versiones anteriores, eliminar:
La imagen misma comunica su fuente. Entonces:

```sh
cc_compose config --quiet
cc_compose pull server
cc_compose up -d --wait --wait-timeout 180 server
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta"
```

Mantenga su configuración (entrada de entrada, límites, notas generales, etc.) no en
`compose.yaml` de la fuente, y en el privado `compose.override.yaml` cerca de la
`server.env`. Explicit `-f` deshabilita la búsqueda automática de un archivo override.
Conéctelo a la función `cc_compose` con el segundo `-f` :

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
    --profile https "$@"
}
```

Las trayectorias dentro del archivo override son absolutas: Configurar las rutas
cuenta desde el directorio del primer archivo, es decir, desde la fuente.

No cambie contraseñas, nombre de proyecto o volumen existente. Compruebe el SMTP y
sincronización de dos dispositivos. Las migraciones se construyen en la imagen; un cambio de imagen
** No roda el circuito. Para una devolución compatible pre-probada, usted puede
`CC_RUN_MIGRATIONS=false` , pero esto no prueba la compatibilidad de la
Un archivo binario con un nuevo circuito. No cambies mayor PostgreSQL con un simple cambio de etiquetas.
Imágenes PostgreSQL y Caddy se fijan por principales `16-alpine` , `2-alpine` .
También planifique actualizaciones separadamente con respaldo y verificación.

El desarrollador o operador puede repetir la prueba de humo en un ejemplo separado.
Un coche con Docker . Sólo crea un proyecto de composición temporal único.
Utiliza puertos de retroceso aleatorios y sólo elimina sus contenedores y volúmenes.

```sh
export CC_SERVER_VERSION=0.2.8   # версия примера (server/deploy/docker/.env.example)
docker pull "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION"
docker pull postgres:16-alpine
docker pull caddy:2-alpine
python3 server/deploy/docker/verify.py
```

Para verificar otra imagen (por ejemplo, recogida localmente) transmite
`--image <образ> --server-version <версия>`.

La prueba comprueba la API HTTPS con un CA local temporal (sin desactivar el cheque).
certificado), PostgreSQL función, copia de seguridad y restauración después `down/up` .
No verifica su DNS, la emisión de su certificado público ACME, o la entrega de su
SMTP-mail – estos cheques deben realizarse para su propia instalación.

## Kubernetes : Helm

## 1. Preparar el entorno y la versión

Requisitos Kubernetes 1,25 o posterior, `kubectl` , Helm 3 o 4, Python 3,
dominio con un registro DNS en el controlador de entrada y un certificado válido HTTPS.
Ejemplo diseñado para Traefik y ya configurado cert-manager con
`ClusterIssuer/letsencrypt`. Chart no instala estos componentes.

Obtener un gráfico de `main` . Su `appVersion` es la versión actual del servidor, aka tag
La imagen predeterminada; la versión del gráfico en sí es independiente de la versión servidor.
Se recogen imágenes para `linux/amd64` y `linux/arm64` , base - PostgreSQL 16.

```sh
git clone --branch main --single-branch https://github.com/evsikovas/consolecrypt-server.git
cd consolecrypt-server
helm show chart server/helm/consolecrypt-server
export CC_SERVER_VERSION=0.2.8   # = appVersion из вывода выше
```

Para una instalación reproducible, segura `image.digest` de `server-image.json`
GitHub Lanzamiento de esta versión (ver valores abajo); la digestión tiene precedencia sobre la etiqueta.
Directorio de parámetros: [values.yaml](https://github.com/evsikovas/consolecrypt-server/blob/main/server/helm/consolecrypt-server/values.yaml) .

La imagen puede ser pre-controlada por Docker comandos:

```sh
docker pull "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION"
docker run --rm --network none "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION" --version
```

El repositorio también tiene `server/docker-compose.yml` : esta es una opción para un repositorio local.
desarrollo con reasignación de materiales fuente PostgreSQL y escritura de cartas a archivos.
Su configuración predeterminada no es una instalación lista con HTTPS y SMTP.
Para la instalación con una imagen lista, utilice la Docker -sección superior o la completa.
El camino a través de Helm está abajo.

## 2. Seleccione un cluster y un directorio privado

Abre una terminal de Bash separada. Especifique su kubeconfig y contexto:

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

Compruebe que los nodos del cúmulo deseado se muestran. Las contraseñas y el kubeconfig no deben
Entra en Git, argumentos de equipo, registros de CI o valores de Helm. Kubernetes Secretos
También requieren la restricción del acceso y la protección de las copias de seguridad de los grupos.

## 3. PostgreSQL y secretos

La opción principal es una opción separada PostgreSQL 16 gestionada por usted, el proveedor o el cliente.
operador PostgreSQL . Crear una base de datos `consolecrypt` y un usuario individual.
Es dueño de esta base de datos y puede crear tablas y realizar migraciones.
La aplicación no necesita un superusuario. Permitir la conexión de las cápsulas del servidor.

Para una base de datos externa, utilice TLS con verificación de certificados. URL es el siguiente:

```text
postgresql://consolecrypt:URL_ENCODED_PASSWORD@db.example.org:5432/consolecrypt?sslmode=verify-full
```

Los caracteres especiales de contraseña en URL necesitan un código porcentual. Si la base utiliza
propia CA, montar su certificado en la cápsula del servidor y especificar
`sslrootcert` con el camino dentro del contenedor; no apague el cheque de certificado.

Preparar la contraseña SMTP y la base de datos completa URL . El siguiente código pide valores
sin pantalla en la pantalla y los guarda sin traducir una línea. No lo hará.
Sobreescribir los archivos existentes:

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

Estos son los comandos de creación originales. Si los Secretos ya existen, utilízalos.
sus nombres y claves en valores, y actualizar a través de su Secrets Manager.
No cree una nueva contraseña para una base de datos existente sin un cambio acordado.
la contraseña en sí misma PostgreSQL .

### Incorporado PostgreSQL para un pequeño servidor

En lugar de una base externa, un gráfico puede crear una cápsula PostgreSQL con un volumen constante.
Esta es una instalación sin replicación y copias de seguridad automáticas. Necesitamos un trabajador.
StorageClass: Perder un solo disco significa perder una base sin una copia externa.

Para **nueva instalación **, sólo preparar el archivo `smtp-password` y hacer:

```sh
kubectl --kubeconfig "$CC_KUBECONFIG" config use-context "$CC_KUBE_CONTEXT"
python3 server/deploy/bootstrap-secrets.py \
  --kubeconfig "$CC_KUBECONFIG" \
  --smtp-password-file "$CC_INSTALL_DIR/smtp-password"
```

Este ayudante utiliza el contexto actual de dicho kubeconfig. Lo crea.
`consolecrypt-database` con una llave `password`, salvando el Secreto DB existente,
Crea o actualiza `consolecrypt-smtp` . Completa URL de la base externa
No lo está haciendo. No mezcles los dos: Los secretos tienen diferentes claves.

En valores, sustitúyanse bloques `database` y `postgresql` por:

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

## 4. Configuración de Helm, SMTP y HTTPS

Guardar el siguiente ejemplo como `$CC_INSTALL_DIR/values.yaml` reemplazando los dominios.
SMTP-login y, si es necesario, ingrese clase y emisor:

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

`publicUrl` está intencionadamente vacío aquí: una confirmación postal utiliza un código,
A continuación se describen otras medidas. Este campo no le da una dirección de audición.
o la dirección que necesita para entrar en el cliente.

El SMTP debe permitir la dirección elegida del remitente. Para el puerto 465, pregunte
`tls: tls` ; por 587 – `tls: starttls` . Compruebe la configuración del DNS del remitente
y el acceso de la cápsula al servidor SMTP. Mantenga el modo `file` para las pruebas locales.

Ingress debe transmitir WebSocket `/v1/events/ws` y permitir el cuerpo de consulta
por lo menos 16 MiB y guardar el camino, la consulta y el cuerpo de las solicitudes sin cambios:
Están incluidas en la firma del dispositivo. `trustProxyHeaders: "true"`
Antes de que la API sea un proxy de confianza, formando correctamente `X-Forwarded-For` .
El acceso directo al puerto de API está cerrado. Las métricas 9090 solo están disponibles dentro.
Este puerto no está incluido en Ingress.

Si TLS Secret se publica de una manera diferente, retire el resumen del cuello-certificador.
y especificar el Secreto existente. Si el registro está cerrado, cree un espacio de nombres.
`imagePullSecret` con derechos sólo lectura y añadir `imagePullSecrets` a los valores.
Un token de tareas de CI de corta duración para el lanzamiento constante de cápsulas no es adecuado.

## 5. Instalar el servidor

En primer lugar, compruebe los valores y los recursos resultantes:

```sh
chmod 600 "$CC_INSTALL_DIR/values.yaml"
helm lint server/helm/consolecrypt-server -f "$CC_INSTALL_DIR/values.yaml"
helm template consolecrypt server/helm/consolecrypt-server \
  --namespace consolecrypt -f "$CC_INSTALL_DIR/values.yaml" \
  > "$CC_INSTALL_DIR/rendered.yaml"
```

Verifique el digest, dominio, nombres de Secrets y presencia de un volumen permanente si se selecciona.
Base incorporada. En estas versiones, se toman contraseñas de Secrets existentes.
y no se registran en los valores de Helm o un manifiesto generado.

```sh
cc_helm upgrade --install consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
cc_kubectl rollout status deployment/consolecrypt --timeout=180s
cc_kubectl get pods,service,ingress
```

El servidor se conectará a la base de datos, aplicará las migraciones incorporadas y comenzará a recibir
HTTP - Solicitudes en el puerto interior 8080. El TLS termina en Ingress.
Regreso automático en caso de error se incluye en diferentes parámetros:
[Helm 3](https://github.com/helm/helm-www/blob/main/versioned_docs/version-3/helm/helm_upgrade.md)
`--atomic` , [Helm 4](https://helm.sh/docs/helm/helm_upgrade/)
`--rollback-on-failure`. Úsalo cuando se actualice.
sólo después de comprobar la compatibilidad de la versión anterior con el nuevo esquema base;
La migración no cancela tal retroceso.

## 6. Compruebe la disponibilidad y conectar el cliente

```sh
curl --fail --silent --show-error "$CC_API_ORIGIN/healthz"
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
```

Se espera HTTP 200, respuestas `ok`, `ready` y JSON con `server_version` iguales
`appVersion` gráfico (o versiones de la digestión fija), `protocol_version` de este
liberación y `source_code_url` de la asamblea fuente. Verificación de la lentitud
conexión a la base de datos; una respuesta exitosa aún no confirma la entrega del correo o
sincronización. No use `curl -k` : El cliente necesita un certificado de confianza.

En ConsoleCrypt crear un perfil con un servidor `https://sync.example.org` .
**No `/v1` y registro. Si se requiere una confirmación de correo electrónico,
Espere por el correo electrónico y confirme su código, luego repita el login o configuración.
perfil. La cuenta es válida en el servidor seleccionado.

El cliente de escritorio actual puede solicitar un email de reajuste de contraseña, pero algunos
Aún no se han proporcionado formularios de entrada del código postal. Antes de que aparezcan.
La confirmación del correo electrónico y la terminación del reinicio se realizan a través de API. Siguiente post
El script solicita un código y una nueva contraseña sin mostrar y no los almacena.
Sólo el código de script en sí está escrito en el archivo:

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

Código de confirmación y código de reajuste de contraseña son diferentes códigos de una sola vez. Bombeo
La contraseña de la cuenta termina sus sesiones y no descifra el almacenamiento.
Para una instalación privada sin SMTP, puede seleccionar `mail.transport: disabled` .
Administrador confirma la dirección por el comando `admin verify-email` sólo después
verificación independiente del propietario de la dirección:

```sh
cc_kubectl exec deployment/consolecrypt -- \
  /usr/local/bin/consolecrypt-server admin verify-email --email user@example.org
```

Después de iniciar sesión, compruebe el bucle completo: cree un host de prueba sin los reales.
conectar el segundo dispositivo, comprobar el código de confianza en ambos
Aprobarlo y cerciorarse de que los cambios se sincronizan.
Compruebe para recibir una carta SMTP también. Después de crear las cuentas necesarias
Puede cerrar el registro a través de `config.registrationOpen: false` y repetirlo.
`cc_helm upgrade` con un archivo de valor privado completo.

Todas las opciones compartidas en el ejemplo se apagan.
Su inclusión es una decisión separada del administrador después de comprobar la compatibilidad
clientes. Para la sincronización normal de sus dispositivos, no son necesarios.

### Opcional: Permitir el acceso compartido

Si decide permitir compartir en su servidor, primero
Comprobar clientes compatibles, confirmación de correo electrónico y confianza en el dispositivo.
En el bloque existente `config` de su archivo de valores privados, cambie:

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

`objectSharingEnabled` incluye el mecanismo principal; las otras banderas por separado
Permitir a grupos compartidos, secretos individuales, conexiones Kubernetes y bases de datos,
notas generales y la adición de nuevos dispositivos del receptor
propietario. Las extensiones requieren el principal
funciones y firmas obligatorias de solicitudes. Incluir únicamente las oportunidades necesarias;
No reemplace el archivo de valor completo con este snippet.

Las restricciones de derechos, la verificación de códigos y la revocación se describen en [SHARING.md](SHARING.md) .
Utilice el archivo completo actualizado:

```sh
cc_helm upgrade consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
```

Compruebe la disponibilidad y el intercambio del elemento de prueba entre los dos.
Cuentas verificadas. Oportunidades disponibles para un cliente autorizado
a través `/v1/shares/capabilities` ; uno `/v1/meta` no es suficiente para tal cheque.

## 7. Respaldos y restauración

Todos los datos del servidor persistentes están en PostgreSQL . Hazlo regularmente.
[pg_dump](https://www.postgresql.org/docs/16/app-pgdump.html) y mantener
copias encriptadas fuera del nodo base. Salvar separadamente.
Ajustes y secretos privados. La copia contiene metadatos sensibles.
cuentas, a pesar de la encriptación de los contenidos del almacenamiento.

Para bases de datos externas, utilice herramientas PostgreSQL 16, archivo de conexión
`$CC_INSTALL_DIR/pg_service.conf` con sección `[consolecrypt]` y archivo de contraseña
`$CC_INSTALL_DIR/pgpass` con 0600 derechos. En el archivo de servicio, especificar `host` , `port` .
`dbname` , `user` , `sslmode=verify-full` y si es necesario `sslrootcert` .
La contraseña se almacena en pgpass, no en los argumentos del equipo.
Formatos descritos en la documentación [service-файла](https://www.postgresql.org/docs/16/libpq-pgservice.html)
[файла паролей](https://www.postgresql.org/docs/16/libpq-pgpass.html) .

```sh
export PGSERVICEFILE="$CC_INSTALL_DIR/pg_service.conf"
export PGPASSFILE="$CC_INSTALL_DIR/pgpass"
chmod 600 "$PGSERVICEFILE" "$PGPASSFILE"
CC_BACKUP_FILE="$CC_INSTALL_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_dump --dbname='service=consolecrypt' --format=custom --no-owner --no-acl \
  --file="$CC_BACKUP_FILE"
pg_restore --list "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

Para la base de datos integrada, en lugar de `pg_dump` en un equipo de trabajo, haga:

```sh
CC_BACKUP_FILE="$CC_INSTALL_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
cc_kubectl exec statefulset/consolecrypt-postgresql -- \
  pg_dump -U consolecrypt -d consolecrypt --format=custom --no-owner --no-acl \
  > "$CC_BACKUP_FILE"
pg_restore --list "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

Revisar la lista de archivos no es un sustituto de la recuperación. Cree regularmente
**Separar la base de datos de verificación vacía** con registro de usuario y servicio separados
`consolecrypt-restore-check` , a continuación, realizar:

```sh
pg_restore --dbname='service=consolecrypt-restore-check' \
  --exit-on-error --no-owner --no-acl "$CC_BACKUP_FILE"
```

Comparar tablas, migraciones, número de registros y ejecutar la misma versión del servidor
en un ambiente aislado. No conecte la copia de verificación a los clientes que trabajan.
Para recuperarse de un accidente, primer acceso al cliente cercano, restaurar
base de datos completa y ajustes guardados, conectar el servidor a la base de datos restaurada.
Antes de devolver el acceso al cliente, haga:

```sh
cc_kubectl exec deployment/consolecrypt -- \
  /usr/local/bin/consolecrypt-server admin rotate-epoch --all
```

Está cambiando las eras de almacenamiento personal para asegurar que los clientes encuentren un retroceso. Antes del accidente
Se utilizó el acceso compartido, teniendo en cuenta sus puntos de control individuales:
`rotate-epoch` no restablece la confianza de elementos comunes y no reemplaza su procedimiento.
recuperación. Una copia completa de la base de datos debe almacenar el UUID de la instancia del servidor.

## 8. Actualización

1. Guardar gráfico, valores y versión anteriores (o digerir); hacer una copia
   PostgreSQL y comprobar la posibilidad de recuperación.
2. Notas de publicación de estudio, nuevas migraciones de versiones, y compatibilidad con rolloback.
   Actualizar el diagrama fuente `git pull` : su `appVersion` – nueva versión
   servidor. Si usted ha fijado `image.digest` , reemplazarlo con un nuevo digestión.
   `sourceCodeUrl` dejar vacío (excepto montaje modificado).
3. Ejecute `helm lint` y `helm template` con un archivo de valores privados completo.
   No cambie DB Secret, nombre de base, nombre de liberación o PVC existente.
4. Ejecutar el mismo comando `cc_helm upgrade --install` y luego comprobar.
   `/readyz` , `/v1/meta` , SMTP y sincronización de dos dispositivos.

Las migraciones se construyen en un archivo binario y se ejecutan al principio. Archivos SQL ejecutados
No editan. Helm Rollback cambia los recursos de aplicaciones, pero **no retrocede la base**.
El archivo binario SQLx más antiguo puede negarse a ejecutar si los nuevos están disponibles
migración. Para una imagen compatible pre-verificada, el rollback se establece
`migrations.runAtStartup: false` y `migrations.job.enabled: false`; por sí mismo
La desactivación de las migraciones no demuestra compatibilidad con el esquema.

No ejecutar `helm uninstall` , no eliminar PVC o Secretos para la actualización.
y no cambiar PostgreSQL 16 a otro mayor simplemente reemplazando la etiqueta. Shift major
PostgreSQL requiere un plan separado de transferencia de datos.

Todos los parámetros de lanzamiento: [CONFIGURATION.md](CONFIGURATION.md) (ejemplo de archivo ambiental -
[server/.env.example](https://github.com/evsikovas/consolecrypt-server/blob/main/server/.env.example).

### Conexiones generales Kubernetes

`CC_SHARED_KUBE_CONTEXTS_ENABLED=true` Permite el intercambio de cifrados
conexiones Kubernetes cuando se encendió `CC_OBJECT_SHARING_ENABLED` Cliente
comprobaciones `supports_kube_contexts` en una solicitud firmada a `/v1/shares/capabilities`
y peticiones explícitas `include_kube_contexts=true` al leer la lista. Viejos clientes.
Siguen recibiendo los tipos anteriores de objetos. Servidor verifica firmas, derechos
dispositivos y versiones; dirección en racimo, certificados y credenciales se encuentran
en contenido cifrado. El servidor no lee kubeconfig y no se conecta a la API.
Kubernetes. Disabling the flag hides the common object, preservation its ciphertext.

### Conexiones de bases de datos compartidas

Empezando con el servidor 0.1.15 (Protocol 1.6), una bandera separada
`CC_SHARED_DB_CONNECTIONS_ENABLED=true` Permite el intercambio de cifrados
conexión a bases de datos. Helm se utiliza en `config.sharedDbConnectionsEnabled` .
Básico `CC_OBJECT_SHARING_ENABLED` y verificación rigurosa de las firmas de solicitudes
Es obligatorio. Posibilidad se declara como `supports_db_connections` ; sólo
клиент с явным `include_db_connections=true` получает новый тип `db_connection`
Está en la lista pública. Los clientes mayores no tienen el tipo que no saben.

El servidor almacena cifertexto opaco y comprueba firmas, la composición de los participantes.
y auditoría. No se conecta a PostgreSQL , MySQL, ClickHouse, Redis o MongoDB.
el usuario y no cumple con las peticiones a ellos. Apagando la bandera esconde lo común
Conectarse sin eliminar su contenido cifrado. Formato de almacenamiento de servidores
No cambia; la migración básica no es necesaria para esta expansión.

### Notas generales

Empezando con el servidor 0.2.0 (protocol 1.9), bandera `CC_SHARED_NOTES_ENABLED=true`
(en Helm - `config.sharedNotesEnabled` ) permite
participantes de un objeto común (host, base de datos, contexto Kubernetes )
Anota a él. Requisitos `CC_OBJECT_SHARING_ENABLED` y verificación estricta de las firmas
a) Se declara como `supports_notes_v1` en `/v1/shares/capabilities` .

El servidor solo almacena encriptación. Las notas clave de cada época del acceso crean
el dispositivo del propietario, lo envuelve en los dispositivos de los participantes y los signos;
Cada nota está firmada por el dispositivo del autor. El servidor revisa la membresía,
Autoría, era y firmas. Todos los participantes pueden escribir, sólo sus propios pueden gobernar.
Notas, borrar - el autor o el propietario. Límites: 500 notas por objeto, hasta 288 KiB
Cyphertext para la nota. Migración requerida `0010_share_notes` ; bandera apagada
Oculta notas sin borrarlas.

### Protección contra la entrada desde un nuevo dispositivo

Inicio con servidor 0.1.16 (protocolo 1.7), bandera `CC_DEVICE_PROTECTION_ENABLED=true`
(en Helm – `config.deviceProtection.enabled` ) protege la cuenta de aquellos que han aprendido
Sólo la contraseña de la cuenta o el acceso al correo:

- Para cada nuevo dispositivo, el propietario recibe una carta con el enlace “No soy yo”
  `CC_PUBLIC_URL/account#action=deny-device&token=…` ; la página sirve a su
  el sitio o el servidor en sí mismo con `CC_WEB_ACCOUNT=true` , y dispositivos de confianza
  evento `device_registered` . El enlace es una sola vez, vive 7 días y recuerda sólo
  Este dispositivo, y sólo hasta que haya abierto el almacenamiento;
- Nuevo dispositivo primero `CC_DEVICE_QUARANTINE_DAYS` días (predeterminado 14)
  no puede recordar dispositivos de confianza `403 device_in_quarantine` ,
  "Exit from all sessions" y cambiar la contraseña de ella no terminan las sesiones de la confianza
  Dispositivos. La aprobación del dispositivo de confianza fuera de la cuarentena elimina la cuarentena
  antes; desbloquear el almacenamiento con una contraseña de almacenamiento no es. Un dispositivo que
  cuenta registrada, no cae en cuarentena;
- Divulgación (palabra/recuperación sobre)
  Los dispositivos no confirmados se limitan a 5 por hora y 20 por día por cuenta y 3 por hora
  en el dispositivo `CC_ENVELOPE_LIMIT_ACCOUNT_PER_HOUR` ,
  `CC_ENVELOPE_LIMIT_ACCOUNT_PER_DAY` , `CC_ENVELOPE_LIMIT_DEVICE_PER_HOUR` , 0-
  sin limitación). Los contadores se almacenan en PostgreSQL y trabajan por igual en todos
  Observaciones. Re-etiquetar el mismo almacenamiento al mismo dispositivo dentro de una hora
  No cuenta. Si se excede - `429 envelope_rate_limited` y una carta por día;
- Reiniciar la contraseña de su cuenta recuerda los dispositivos que nunca se han abierto
  almacenamiento, y todos los demás códigos pendientes de restablecimiento de correo y confirmación.

`CC_NEW_DEVICE_MAIL_ENABLED` (por defecto `true` ) correos electrónicos deshabilitados por separado sobre
Nuevos dispositivos `CC_NEW_DEVICE_MAIL_PER_HOUR` (10) limitan su número por hora:
Las entradas restantes de esta hora se reducen a una letra. Oportunidad de ser declarada
`/v1/meta` como `capabilities.device_protection`; clientes de protocolo 1.6 y mayores
Siguen trabajando y mostrando nuevos errores como comunes.

Actualizar el servidor `0008` añade)
`devices.first_trusted_at` y llenarlo con el sobre existente.
la página de cuenta que maneja `#action=deny-device` , luego instalar
Bandera y rediseñe el servicio `server` . Sin SMTP, los enlaces “Esto no es yo” no son enviados.
El resto de la defensa está funcionando.

### Modo de la empresa: Ingrese IdP o Active Directory

Empezando con el servidor 0.2.0 (protocol 1.9) `CC_AUTH_MODE=enterprise` (en Helm -)
bloque `auth:` transfiere el servidor a la entrada sólo a través de la fuente corporativa
Cuentas: IdP by OIDC (Entra ID, AD FS, Keycloak, Google Workspace, Okta, etc.)
cualquier OIDC) o Active Directory/LDAP. Registro, inicio de sesión y restablecimiento de contraseñas
Las cuentas se apagan, las cuentas existentes están vinculadas en el primer login.
Discapacitados en empleados de IdP/AD pierden acceso a la sincronización
`CC_AUTH_RECHECK_MINUTES`. El cifrado de almacenamiento no cambia: ni IdP, ni AD, ni
El servidor no recibe nada que pueda abrir los datos. Modo predeterminado
`standard` y el servidor se comporta como antes.

Configuración, Recetas para ID de entrada, AD FS 2016+, Keycloak, Google Workspace, Okta y
AD para LDAPS, comandos de acceso de emergencia y protección de la cuenta AD de bloqueo - en
[ENTERPRISE.md](ENTERPRISE.md).

### Equipos.

Empezando con el servidor 0.2.1 (protocolo 1.10), las cuentas pueden mantener ** almacenamiento compartido.
comandos** `CC_TEAMS_ENABLED` , default on; declared in `/v1/meta`
como `capabilities.teams` . El participante recibe la clave de almacenamiento a través de un sobre.
sellado en la clave del miembro del equipo; el servidor no descifra nada.
Composición del equipo - registro firmado con cadena de hashes: orden de cheques del servidor,
Firmas y derechos de autor, los clientes revisan toda la revista.

- Funciones: propietario, administrador, editor, observador. El observador no puede
  Enviar cambios `403` , `details.reason = "team_role"`
- Invitaciones por correo: la respuesta es siempre `202` (el servidor no revela si hay una respuesta).
  cuenta), no más de 20 por hora por equipo, período de 7 días. Invitado revisa el código
  El participante con el invitado. Sin SMTP, el invitado ve la invitación en la aplicación.
- Eliminar al participante revoca su acceso y requiere cambiar la clave de almacenamiento.
- Límites: `CC_MAX_TEAMS_PER_ACCOUNT` (50 comandos por cuenta)
  `CC_MAX_TEAM_MEMBERS` (200 participantes). En Helm, estas llaves se dan a través
  `extraEnv`.
- Funciona en ambos modos de entrada. Migración requerida `0012_teams` ; clientes antiguos
  `/v1/vaults` da sólo bóvedas personales.

Para desactivar los comandos, pregunte `CC_TEAMS_ENABLED=false` (en Docker – en
`server.env` , en Helm – `extraEnv` ): las rutas `/v1/teams/*` responderán `404` .
Se conservarán los datos del equipo.

### Cuotas y límites de solicitudes

Empezando con el servidor 0.2.2 (protocolo 1.11), una cuenta o dispositivo no puede
Recursos del servidor de escape: líneas de base, lugar, CPU, correo u otros límites.

**Quotas** `CC_QUOTAS_V2_ENABLED` , default `true` ; `false` returns
comportamiento 0,2.1:

| Clave clave | Por defecto. | Respuesta cuando se exceda |
|---|---|---|
| `CC_MAX_VAULT_BYTES` | 1 Gib | `413` , `details.reason = "vault_quota"` : ciphertext plus tombstones |
| `CC_TOMBSTONE_COST_BYTES` | 256 | tantos bytes de cuota valen cada lápida (objeto remolcado) |
| `CC_MAX_VAULT_OBJECTS` | 100 000 | `413` , `details.reason = "object_limit"` : objetos vivos y lápidas |
| `CC_MAX_DEVICES_PER_ACCOUNT` | 20 (no más de 64) | entrada de un nuevo dispositivo - `403` , `details.reason = "device_limit"` |
| `CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY` | 10 (0 - sin limitación) | `403` , `details.reason = "device_daily_limit"` , `details.until` |

La eliminación de un objeto vivo es siempre aceptada, incluso más allá de la cuota. Eliminación del objeto,
El que nunca ha estado en el servidor ya no crea una lápida. Para el límite
Los dispositivos no revocados se consideran dispositivos: recuerde dispositivos no utilizados en otro dispositivo.
Entraré y entraré. Los dispositivos ya conocidos están incluidos como de costumbre.
La migración `0013_quotas_limits` cuenta el número de objetos y lápidas una vez
Cada instalación de almacenamiento (en bases más grandes, puede tomar tiempo para empezar).

** Los límites de la solicitud** se almacenan en PostgreSQL (cucha de token, tiempo de base) y el mismo
Trabajan en cualquier número de réplicas. En exceso - `429 rate_limited` con
header `Retry-After` y `details.limit` ; el cliente repite la solicitud más adelante.
Las lecturas (pull, listas) son limitadas sólo por un límite generoso en la memoria de cada réplica.
`CC_RATE_LIMIT_READ_PER_DEVICE_PER_MINUTE` , 1200).

`CC_RATE_LIMIT_MODE` :

- `observe` (por defecto a 0.2.2) – las solicitudes no son rechazadas, por encima de sólo
  son considerados en la métrica `cc_rate_limit_observed_total{limiter}` y en la revista de auditoría
  `limit_exceeded` , no más de una vez por hora por cuenta y límite;
- `enforce` - los excesos se desvían de `429` .

Orden de inclusión: actualizar el servidor, una semana para observar
`cc_rate_limit_observed_total` , si es necesario, elevar los umbrales.
Pregunta `enforce` . Los límites de entrada y recuperación están en ambos modos.
`CC_RATE_LIMIT_ENABLED=false` apaga todos los límites de consulta pero no cuotas.

Cada límite se configura con teclas `CC_LIMIT_<ИМЯ>_RATE` `N`
período límite o `N/min` , `N/hour` , `N/day` ; `0` - sin limitación),
`_BURST` (capacidad, período predeterminado), `_PER_HOUR` y `_PER_DAY`
(techos extra). Por ejemplo, `CC_LIMIT_PUSH_ACCOUNT_RATE=600/min` . En Helm,
`config.rateLimit.limits: {push_account: {rate: "600/min", burst: 600}}`.

| Nombre. | ¿Qué es limitado? | Por defecto. |
|---|---|---|
| `push_device` | enviar cambios al dispositivo | 120/min, pico 60 |
| `push_account` | Presentando cambios a su cuenta | 300/min |
| `mutations_account` | el número de cambios en los envíos, a la cuenta | 50.000 por hora |
| `unknown_delete_account` | Eliminar objetos que no estaban en el servidor | 1000/día |
| `share_write_account` | creación de objetos comunes | 60/hora, pico 20 |
| `share_revision_account` | auditoría de las instalaciones comunes, cambio de acceso, notas generales | 600 horas |
| `recipient_lookup_account` | correo-find | 30/min y 300/día |
| `enrollment_account` | Añadiendo los propios dispositivos del receptor | 30 horas |
| `trust_request_device` / `trust_request_account` | Fideicomiso | 10/hora por dispositivo, 30/día por cuenta |
| `verification_account` | Reconciliación clave: anuncio del dispositivo de aprobación, impresión de clave de almacenamiento firmada | 20 horas |
| `account_security` | cambio de contraseña, reedición de kit de recuperación, cambio de sobre | 10 horas |
| `ws_connect_account` | Nuevas conexiones WebSocket | 60/min |
| `auth_ip` | Solicitudes de entrada, registro y restauración públicas de una sola dirección | 30/min |
| `login_email` | ** Infructuoso** entradas postales de la misma red (/24 IPv4 , /64 IPv6 ) | 10/min y 50/hora |
| `login_email_total` | No enviar correos electrónicos de todas las redes | 200 horas |
| `recovery_email` | restablecimiento de contraseña solicitudes de correo electrónico de una red | 5 horas |
| `recovery_email_total` | envío de cartas de todas las redes (respuesta siempre `202` ) | 20/día |

Antiguas llaves `CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE`
`CC_RATE_LIMIT_LOGIN_PER_EMAIL_PER_MINUTE` y
`CC_RATE_LIMIT_RECOVERY_PER_EMAIL_PER_HOUR` seguir preguntando `auth_ip` .
`login_email` y `recovery_email`

Los intentos alienígenas no bloquean al propietario: la entrada exitosa no pasa los límites del correo.
a login desde una cuenta **conocida** del dispositivo** (la firma válida del dispositivo)
No se limita a los límites del correo en absoluto – sólo el límite de la dirección. Cuando se activa
`login_email_total` el propietario recibe una carta al día "Muchos intentos fallidos"
entrada. Una carta de reajuste de contraseña de una red donde el propietario ha iniciado sesión en los últimos 90 días
También es superior a `recovery_email_total` . No hay bloqueo permanente de la cuenta.

A partir de 0,2.5, cancelación HTTP una solicitud no libera la ranura Argon2 hasta que se ha cancelado.
El cálculo de funcionamiento no terminará realmente. Retiene la limitación.
Carga paralela en interruptores de conexión. Respuestas al descubrimiento/token/JWKS
OIDC se limita a 512 KiB mientras lee el flujo, incluyendo respuestas sin Contenido-Length.
Si se excede, la entrada es rechazada. Considere este límite al establecer un IdP.

Redefiniciones para una cuenta separada (actuando sin reiniciar, a más tardar
que en 30 segundos:

```sh
# Docker
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show --email user@example.org
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits set \
  --email user@example.org push_account_rate=600/min max_vault_objects=200000
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits reset --email user@example.org
# Kubernetes
cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin limits show
```

Las claves de las sobredefiniciones son nombres de límites con sufijos `_rate`, `_burst` .
`_per_hour` , `_per_day` y cuotas `max_vault_bytes` , `max_vault_objects` ,
`max_devices_per_account`, `new_devices_per_account_per_day` . Límites de entrada
No puedes anular la cuenta.

métricas: `cc_rate_limited_total{limiter}` , `cc_rate_limit_observed_total{limiter}`
`cc_rate_bucket_seconds` (hora de comprobación), `cc_quota_rejected_total{reason}`
`cc_sync_unknown_deletes_total`, `cc_tombstones_total` ,
`cc_auth_known_device_bypass_total`, `cc_recovery_mail_suppressed_total` .

## Cómo establecer cualquier parámetro

Los nombres de parámetros son los mismos en todas partes - variables `CC_*`
[CONFIGURATION.md](CONFIGURATION.md). Reglas para todos los métodos de instalación:

- La variable de entorno de proceso es más importante que el valor del archivo JSON.
  Variable significa “no establecer” (el valor predeterminado es válido);
- Una variable con un tipo en el nombre es ignorada silenciosamente, y un valor ** incorrecto**
  detiene el lanzamiento con un mensaje `invalid configuration: <КЛЮЧ>: …` ;
- Los cambios se aplican sólo después de que se reinicia el proceso (excepto
  `admin limits set` , ver [квоты и лимиты](#квоты-и-лимиты-запросов) ;
- Secretos de inicio de sesión empresarial - sólo archivos `*_FILE` , contraseñas de bases de datos y SMTP - a través de
  ambiente o archivo privado JSON.

Puede comprobar el resultado de tres maneras: fila `starting` en el registro del servidor
contiene la configuración actual (las contraseñas están ocultas); `/v1/meta` muestra
Registro, confirmación de correo, modo de inicio de sesión, comandos y protección de dispositivos;
`admin limits show` y `admin auth status` muestran límites, cuotas y entrada.

### Docker Compose

Compuesto sólo transmite variables desde el bloque de servicio `environment:` al servidor.
`server`. El archivo `server.env` se sustituye en `compose.yaml` `--env-file` , pero sí mismo en
contenedor no cae: línea `CC_LIMIT_PUSH_ACCOUNT_RATE=600/min` en
`server.env` no cambiará nada si `compose.yaml` no lo usa.

**1. Llaves que cambian en `server.env`.** En `compose.yaml` se escriben como
`${КЛЮЧ:-значение}` : `CC_DATABASE_PASSWORD` , `CC_RUN_MIGRATIONS` .
`CC_REGISTRATION_OPEN`, `CC_MAIL_TRANSPORT` , `CC_MAIL_FROM` , `CC_SMTP_HOST` .
`CC_SMTP_PORT`, `CC_SMTP_TLS` , `CC_SMTP_USERNAME` , `CC_SMTP_PASSWORD` .
`CC_OBJECT_SHARING_ENABLED` , `CC_SHARED_GROUPS_ENABLED` , `CC_SHARED_SECRETS_ENABLED`
`CC_SHARED_KUBE_CONTEXTS_ENABLED`, `CC_SHARED_DB_CONNECTIONS_ENABLED` ,
`CC_SHARED_NOTES_ENABLED`, `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED` ,
`CC_DEVICE_PROTECTION_ENABLED`, `CC_NEW_DEVICE_MAIL_ENABLED` ,
`CC_DEVICE_QUARANTINE_DAYS` , `CC_TEAMS_ENABLED` , `CC_RATE_LIMIT_MODE`
`CC_QUOTAS_V2_ENABLED`, `CC_MAX_DEVICES_PER_ACCOUNT` , `CC_MAX_VAULT_OBJECTS` .
Además de estos `server.env` contiene las variables del Compose en sí: `CC_SERVER_VERSION` .
`CC_SERVER_IMAGE`, `CC_DOMAIN` , `CC_HTTP_PORT` , `CC_POSTGRES_ADMIN_PASSWORD` .
Valores con signos `$` , `#` , espacios o comillas escriben en un solo
En citas.

**2. Todas las otras llaves están en `compose.override.yaml` .** Esto y las llaves que no están en
`compose.yaml` (limites `CC_LIMIT_*` , `CC_MAX_VAULT_BYTES` , `CC_MAX_TEAM_MEMBERS`
`CC_AUTH_*` , `CC_OIDC_*` , `CC_LDAP_*` , la vida de estante ...), y las llaves que
`compose.yaml` define rígidamente: `CC_DATABASE_URL`, `CC_DATABASE_CONNECT_TIMEOUT_SECS` .
`CC_LISTEN_ADDR` , `CC_METRICS_LISTEN` , `CC_PUBLIC_URL`
`CC_REQUIRE_EMAIL_VERIFICATION`, `CC_REQUIRE_REQUEST_PROOF` ,
`CC_TRUST_PROXY_HEADERS`, `CC_EVENT_BUS` , `CC_HSTS` , `CC_LOG_FORMAT` . Significado
`environment:` del archivo override reemplaza los mismos valores `compose.yaml` .
El archivo está en un directorio privado junto a `server.env` ; escriba los valores.
en comillas:

```yaml
# $CC_INSTALL_DIR/compose.override.yaml
services:
  server:
    environment:
      CC_MAX_VAULT_BYTES: "2147483648"
      CC_LIMIT_PUSH_ACCOUNT_RATE: "600/min"
      CC_LOG: "info,sqlx=warn"
```

Conéctelo segundo `-f` (sin él, el archivo Compose de otro directorio no lee)
y utilizar esta función para comandos **all* - Actualizaciones, `admin` , backups
copias:

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
    --profile https "$@"
}
```

Escribir las rutas dentro del archivo override como absoluta. Usted puede agregar un servicio y
`env_file: [/абсолютный/путь/extra.env]` pero los valores de `environment:`
`compose.yaml` es más importante que `env_file` , por lo que las claves de las listas anteriores todavía se dan.
c `environment:`

**3. Archivos secretos (sólo claves de inicio de sesión de empresa `*_FILE` y certificados CA)
Componga sin monturas Swarm `secrets:` como archivos regulares en `/run/secrets/<имя>`
propietario y derechos del anfitrión. El servidor de la imagen funciona como UID 65532.
Los lee:

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

En lugar de `secrets:` , el montaje también es adecuado para la lectura solamente:
`volumes: ["/home/admin/.config/consolecrypt-docker/secrets:/run/secrets/consolecrypt:ro"]`.
Las contraseñas base y SMTP permanecen en `server.env`: el servidor no las lee desde los archivos.

**4. Aplicar y verificar.**

```sh
cc_compose config --quiet
cc_compose up -d --wait --wait-timeout 180 server
cc_compose logs --no-log-prefix server | grep '"starting"' | tail -n 1
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show
```

`up -d` recrea un contenedor sólo si su configuración ha cambiado; datos
Los volúmenes se conservan. No use `down -v` .

### docker Run sin compostura

Las mismas teclas se transmiten por bandera `-e КЛЮЧ=значение` o archivo `--env-file` . Toma nota:
`docker run --env-file` toma el significado literalmente, ** las citas no se eliminan **, por lo que
`server.env` de `init-config.py` (valores en comillas) no es adecuado para él -
Escriba valores sin comillas. Las contraseñas son más convenientes para guardar en un archivo privado JSON .
Solo montado en lectura:

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

`CC_SERVER_VERSION` es una versión de liberación del servidor (como por ejemplo Docker Compose ).
La imagen ya se establece `CC_LISTEN_ADDR=0.0.0.0:8080` , `CC_METRICS_LISTEN=0.0.0.0:9090` .
`CC_LOG_FORMAT=json` y `CC_SOURCE_CODE_URL`; variables de entorno de contenedores
Es más importante que el archivo JSON, así que cambia estas cuatro teclas con la bandera `-e` en lugar de en el archivo.
Cambio de parámetros - `docker rm -f consolecrypt-server` y el mismo `docker run`
(datos en PostgreSQL ), el contenedor no los almacena.) Equipos de administrador:
*docker exec consolacrypt server /usr/local/bin/consolecrypt-servidor --config
/etc/consolecrypt/server.json admin ...'

### Kubernetes : Helm

La gráfica convierte los bloques de valor en variables `CC_*` : los no clasificados en ConfigMap.
URL base y contraseña SMTP – en Secreto o enlaces `secretKeyRef` a su Secreto.
La correspondencia de cada ruta de valor `CC_*` se da en la columna "Helm".
[CONFIGURATION.md](CONFIGURATION.md). Las líneas vacías en valores se saltan - entonces
El valor predeterminado del servidor es válido.

| ¿Qué? | Donde en valores |
|---|---|
| banderas, fichas, cuotas, límites, WebSocket, servicio, revistas | `config.*` `config.rateLimit.limits` – `CC_LIMIT_*` |
| empresa-entrada | `auth.*` , secretos - `auth.oidc.existingSecret` / `auth.ldap.existingSecret` |
| Postage | `mail.*` , contraseña - `mail.smtp.existingSecret` |
| base de datos | `database.*` o `postgresql.*` , migraciones `migrations.*` |
| métrica | `metrics.enabled` `CC_METRICS_LISTEN` ) |
| teclas sin trayectoria en el gráfico `CC_TEAMS_ENABLED` , `CC_MAX_TEAMS_PER_ACCOUNT` , `CC_MAX_TEAM_MEMBERS` , `RUST_LOG` , `OTEL_*` , externa `CC_DATABASE_PASSWORD` | `extraEnv` |

```yaml
extraEnv:
  - name: CC_MAX_TEAM_MEMBERS
    value: "50"
  - name: CC_DATABASE_PASSWORD          # пароль внешней базы отдельно от URL
    valueFrom:
      secretKeyRef: {name: consolecrypt-database, key: password}
```

Variables de `extraEnv` (sección `env` del contenedor) son más importantes que el gráfico ConfigMap
`envFrom` y `extraEnvFrom` se conecta después del gráfico ConfigMap y así sucesivamente.
Está bloqueando. Úsalo sólo para llaves sin tu propio camino.
De lo contrario, el valor de los valores y el valor actual se divergen.

Aplicación - `helm upgrade` con **full** archivo de valores privados: pods
Se reinician porque el chequesum de ConfigMap cambia. Después
Cambiar el contenido de su Secreto existente reiniciarlos manualmente:

```sh
cc_helm upgrade consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
cc_kubectl rollout restart deployment/consolecrypt   # только после смены Secret
cc_kubectl get configmap consolecrypt -o yaml        # несекретные CC_* как их видит pod
cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin limits show
```

### JSON -file, archivo binario y sistemad

Sin contenedores, los ajustes son más convenientes para almacenar en un archivo privado JSON .
`--config /etc/consolecrypt/server.json` o variable `CC_CONFIG_FILE` . Archivo...
one JSON -object, values only in rows, rights `0600` or `0400` , owner -
usuario de servicio. Clave no conocida o repetida, incorrecta JSON o
Un archivo inaccesible se detiene sin producir el contenido. `CC_LOG`
`RUST_LOG` y `OTEL_*` no serán aceptados en el archivo - pídeles en el entorno de servicio.
Ejemplo: [server.example.json](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/server.example.json) .
unidad de archivo - [consolecrypt-server.service](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/consolecrypt-server.service)
Detalles - [native/README.md](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/README.md) .

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

La variable de entorno para el servicio se añade con un archivo drop-in
`sudo systemctl edit consolecrypt-server`

```ini
[Service]
Environment=CC_LOG=info,sqlx=warn
```

Después de editar un archivo o entorno: `sudo systemctl restart consolecrypt-server`
entonces `sudo-u consolacrypt servidor de consolacrypt --config
/etc/consolecrypt/server.json healthcheck' y
`journalctl -u consolecrypt-server | grep starting | tail -n 1`. contraseña de base está disponible
no se almacena en JSON archivo: si no hay contraseña en ninguno de los dos `CC_DATABASE_PASSWORD` o URL
El controlador toma la variable estándar `PGPASSWORD` desde el entorno de servicio.

### Ejemplo: notas y comandos generales

Las notas compartidas requieren una bandera primaria compartida; los comandos están incluidos por
Es un defecto y no depende de él.

Docker Compose - in `server.env` , then `cc_compose up -d --wait --wait-timeout 180 server` :

```dotenv
CC_OBJECT_SHARING_ENABLED=true
CC_SHARED_NOTES_ENABLED=true
CC_TEAMS_ENABLED=true
```

Límites de equipo en `compose.override.yaml` :

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

JSON : `" CC_OBJECT_SHARING_ENABLED ": "verdad", " CC_SHARED_NOTES_ENABLED ": "verdad", "
"CC_MAX_TEAM_MEMBERS ": "50". Verificación: `/v1/meta` → `capabilities.teams: true` ;
El cliente ve soporte para notas en `/v1/shares/capabilities` `supports_notes_v1` .

### Ejemplo: Entra ID Enterprise Login

El registro de la solicitud en el ID de entrada se describe en
[ENTERPRISE.md](../ENTERPRISE.md#microsoft-entra-id). Redirect URI -
`https://sync.example.org/v1/auth/oidc/callback`.

Docker Compose. Secretos:

```sh
mkdir -p "$CC_INSTALL_DIR/secrets"
( umask 077
  openssl rand -hex 32 > "$CC_INSTALL_DIR/secrets/oidc-token-key"
  read -rs CC_SECRET && printf '%s' "$CC_SECRET" > "$CC_INSTALL_DIR/secrets/oidc-client-secret"
  unset CC_SECRET )
sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
```

`$CC_INSTALL_DIR/compose.override.yaml` (sustitución `/home/admin/.config/consolecrypt-docker`
su `$CC_INSTALL_DIR` :

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

Caddy del ejemplo sólo da la API: enlaces en las letras a
`https://sync.example.org/account` devolver el 404, los códigos de los correos electrónicos funcionan en la aplicación.

Helm. Secreto y valores:

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

JSON o sistemad son las mismas teclas que en el archivo de anulación, y `*_FILE` indican
Archivos con derechos `0400` pertenecientes al usuario del servicio, por ejemplo
`/etc/consolecrypt/secrets/oidc-client-secret`.

### Ejemplo: Active Directory Login (LDAP)

Preparación de contabilidad y certificado - [ENTERPRISE.md](../ENTERPRISE.md#active-directory-и-ldap) .
Docker Compose , `compose.override.yaml` (files `ldap-bind-password` y `ad-ca.pem` en
`$CC_INSTALL_DIR/secrets` , propietario 65532, derechos `0400` :

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

El contenedor debe permitir el nombre DNS del controlador de dominio; si Docker utiliza el
Añadir otro DNS al servicio `dns:` o `extra_hosts:` . Verificación del usuario sin
Contraseña: `cc_compose exec -T server /usr/local/bin/consolecrypt-server admin auth
prueba --login alice@acme.com'.

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

### Ejemplo: límite de las solicitudes de observación para hacer cumplir

1. Una semana después de actualizar a 0.2.2, vea la métrica
   `cc_rate_limit_observed_total{limiter}` (Metrices de puertos; por ejemplo Docker
   apagado – encender `CC_METRICS_LISTEN` en un archivo de anulación y publicar el puerto
   Sólo en `127.0.0.1` o eventos de auditoría `limit_exceeded` .
2. Si los usuarios ordinarios están en contra del límite, céntrelo, por ejemplo.
   `CC_LIMIT_PUSH_ACCOUNT_RATE=600/min` , o redefinido para una sola cuenta
   equipo `admin limits set` .
3. Modo de conmutación.

Docker Compose : en `server.env` – `CC_RATE_LIMIT_MODE=enforce` , límites elevados – en
`compose.override.yaml` :

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

Después de reiniciar, la salida `admin limits show` comienza con una línea.
`request limits: enforce` y muestra valores válidos (redefiniciones)
Cuentas marcadas `*`; rechazos contados `cc_rate_limited_total{limiter}` .

### Ejemplo: aumento de las cuotas

Para todo el servidor. Docker Compose : `CC_MAX_VAULT_OBJECTS` y
`CC_MAX_DEVICES_PER_ACCOUNT` - en `server.env` , el resto - en el archivo de anulación:

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

Para una cuenta - sin reiniciar, a más tardar 30 segundos:

```sh
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits set \
  --email user@example.org max_vault_bytes=4294967296 max_vault_objects=200000
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show --email user@example.org
```

`CC_MAX_DEVICES_PER_ACCOUNT` no puede exceder de 64, `CC_MAX_VAULT_BYTES` menos
1 MiB. Planifique el espacio de disco PostgreSQL con la cuota de almacenamiento y el número.
cuentas.

### Ejemplo: letras sin SMTP - dónde conseguir el código

Sin SMTP, los correos electrónicos no van a ninguna parte. Códigos de confirmación de correo electrónico, cambio de contraseña
“No soy yo”, el operador recibe de una de dos maneras.

** `CC_MAIL_TRANSPORT=file` – servidor local o de prueba solamente.**
Cada correo electrónico se registra por un archivo en `CC_MAIL_DIR` (default `./.dev-mail` )
en relación al directorio de trabajo del proceso; en el desarrollo
`server/docker-compose.yml` – `server/.dev-mail` en el host:

```dotenv
CC_MAIL_TRANSPORT=file
CC_MAIL_DIR=/path/to/mail
```

El nombre del archivo es `<время UTC>-<тип>-<id>.eml` , por ejemplo
`20261026T205345-password_reset-….eml`. Tipo de letra con código: `verify_email`
Confirmación de la dirección `password_reset` – cambio de contraseña, `new_device` – login con
El nuevo dispositivo ("No soy yo"). Otros tipos `password_changed` ,
`device_revoked` – notificaciones sin código.

El texto de la carta está codificado en base64, por lo que `cat` no lo mostrará. El último.
La carta de cambio de contraseña se puede leer como sigue (sustituir el correo electrónico para confirmar el correo electrónico).
`password_reset` a `verify_email` :

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

En macOS el archivo se puede abrir en Mail: `open файл.eml` .

El código se inserta en la página de la cuenta: servidor incorporado `/account`
`CC_WEB_ACCOUNT=true` , “Confirme correo electrónico” o “¿Olvidó su contraseña?”
Hay un código o página de su sitio web. El código de confirmación de correo electrónico acepta y
anexo. Los botones de enlace aparecen en los correos electrónicos solamente si se dan
`CC_PUBLIC_URL` , de lo contrario la letra es sólo código. Los archivos contienen archivos activos
códigos desechables y creados con derechos `0600` : no utilizar `file`
al servidor público y eliminar el directorio cuando ya no es necesario.

** `CC_MAIL_TRANSPORT=disabled` (por defecto).** No hay cartas en absoluto. Operador.
primero comprueba que la dirección pertenece al usuario, luego confirma
o da el código de cambio de contraseña:

```sh
consolecrypt-server admin verify-email --email user@example.org
consolecrypt-server admin reset-token --email user@example.org
```

`reset-token` imprime código desechable; es válido `CC_PASSWORD_RESET_TTL_SECS`
(por defecto 1 hora) y entró en el mismo lugar donde el código de la carta. B Docker Compose y
Kubernetes instrucciones se ejecutan dentro del contenedor:
`cc_compose exec -T server /usr/local/bin/consolecrypt-server admin …` o
`cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin …`.

## Verificación de las dependencias del servidor

Para los desarrolladores y aquellos que recogen la imagen ellos mismos. `server/scripts/dependency_audit.py check`
lanzamientos `cargo deny check advisories bans sources licenses` para `server` y
`crates` y comprueba que las cajas no publicadas son patentadas `cc-*` .
`consolecrypt-server` ) bajo `AGPL-3.0-only` :

```sh
cargo install --locked cargo-deny@0.20.2
python3 server/scripts/dependency_audit.py check
```

CI realiza lo mismo en GitHub -hosted `ubuntu-24.04` : en `validate`
(Failure para el montaje de imágenes) y en semana `dependency-audit.yml`
que también chequea la solicitud de tira con dependencias modificadas, abre
o actualiza el tema "Adicciones Vulnerables" y lo cierra después de una carrera limpia.
`cargo-deny` se descarga desde GitHub Lanzamientos con verificación SHA-256 del script.

Política `server/deny.toml` , `crates/deny.toml` : versiones vulnerables y desenmascaradas
Prohibido; no mantenido para las dependencias directas; TLS sólo rustls `native-tls`
`openssl` , `openssl-sys` prohibido); ninguna dependencia git `cc-protocol` vinculada
`crates/` sigue una lista más estricta de licencias de clientes.
Una excepción se añadirá a `ignore` del correspondiente `deny.toml` solamente con
el identificador de la Junta, la razón, el propietario y la fecha de revisión (no más tarde de tres años)
meses).

---
