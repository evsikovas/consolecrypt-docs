# Directorio de Ajustes de Servidor ConsoleCrypt

Referencia traducida · [Original en ruso](../CONFIGURATION.md)

Lo mismo en el sitio: [справочник параметров](https://consolecrypt.dev/guide#server-reference) .
Lo mismo en el sitio web: [configuration reference](https://consolecrypt.dev/guide#server-reference) .

Lista completa de parámetros del servidor de sincronización **0.2.4** (protocolo **1.13**):
Lo que cada clave hace, qué valores se necesita, el valor predeterminado,
El camino a Helm y si el significado es un secreto. El directorio está compilado por código de descarga
`server/src/config.rs` , `server/src/config/*.rs`
`server/src/telemetry.rs` ) y plantillas de gráficos Helm. Verificación
`server/scripts/test_configuration_docs.py` gotas si el servidor recibe la llave,
que no está aquí, o una clave que el servidor no conoce se describe.

Cómo establecer parámetros en Docker Compose , `docker run` , Helm, JSON -file y
sistemad, con ejemplos listos - en [HOSTING.md](../HOSTING.md#как-задать-любой-параметр) .
IdP paso a paso y conexión Active Directory en [ENTERPRISE.md](ENTERPRISE.md) .

Versión en inglés: [below](#english) .

## Cómo el servidor lee la configuración

**Fuentes y Prioridad.** El servidor lee variables ambientales `CC_*` y
opcionalmente, un archivo privado JSON:

1. el entorno variable del proceso (incluido ** claramente vacío **);
2. el valor del archivo JSON indicado por la bandera `--config <путь>` y sin la bandera
   variable `CC_CONFIG_FILE` ;
3. el valor predeterminado incorporado.

El valor vacío es igual a "no dado": si hay `CC_X=` en el medio ambiente (vacío), el servidor
utiliza el valor predeterminado ** y no mira el archivo JSON para esa clave.
Sólo las teclas conocidas de este directorio se leen desde el entorno; la variable con
Un tipo en el nombre es ignorado silenciosamente. En JSON , el archivo es desconocido o
La llave repetida para el lanzamiento.

** Formato de valores**

| Tipo | Cómo escribir |
|---|---|
| lógica | `true` / `false` , `1` / `0` , `yes` / `no` , `on` / `off` (líneas letras) |
| entero | registro decimal sin unidades y separadores: `1073741824` , no `1GiB` |
| duración | entero en unidades del nombre clave: `_SECS` - segundos, `_MINUTES` - minutos, `_HOURS` - horas, `_DAYS` - día |
| dirección | `хост:порт` , tales como `0.0.0.0:8080` o `[::]:8080` |
| lista | a través de una coma y/o espacio `CC_AUTH_ALLOWED_DOMAINS` , `CC_OIDC_MFA_ACR_VALUES` ; `CC_OIDC_SCOPES` a través de un espacio |
| fileway | camino absoluto dentro de un contenedor o en un host de servicio |

En el archivo JSON, todos los valores son cadenas, incluyendo números y valores lógicos:
`{"CC_MAX_VAULT_OBJECTS": "200000", "CC_HSTS": "true"}`.

**Acceso al lanzamiento.** Un valor incorrecto detiene al servidor con el mensaje.
`invalid configuration: <КЛЮЧ>: …` ; el valor no entra en el mensaje.
Los rangos (como se muestra en las tablas) y los enlaces entre las teclas se verifican:

- cualquier bandera compartida requiere `CC_OBJECT_SHARING_ENABLED=true` y
  `CC_REQUIRE_REQUEST_PROOF=true`;
- `CC_REFRESH_TOKEN_TTL_SECS` no menos que `CC_ACCESS_TOKEN_TTL_SECS` ;
- `CC_AUTH_MODE=enterprise` requiere `CC_AUTH_PROVIDER` y llaves seleccionadas
  Proveedor, OIDC - también `CC_PUBLIC_URL` con `https://` .

El modo Enterprise también comprueba al inicio de la red: descubrimiento y JWKS
IdP o conexión, TLS y se unen al directorio (ver [ENTERPRISE.md](ENTERPRISE.md) ).
Al comenzar, el servidor escribe una cadena `starting` al registro con la configuración actual.
Las contraseñas y bases de datos URL están ocultas en ella. Es conveniente comprobar que la llave ha llegado.
proceso.

**Cuando se aplican los cambios.** Sólo cuando se reinicia el proceso: archivo y
Las circunstancias no se leen en la mosca. Excepción - redefinición de límites
una cuenta separada `admin limits set` , que son válidos sin reiniciar a más tardar
que en 30 segundos.

**Secrets.** Valores secretos - `CC_DATABASE_URL` (si contiene una contraseña)
`CC_DATABASE_PASSWORD` , `CC_SMTP_PASSWORD` y archivos de inicio de sesión empresarial. El servidor no.
Los escribe en una revista. No mecanismo general `*_FILE` : variables
`CC_DATABASE_PASSWORD_FILE` o `CC_SMTP_PASSWORD_FILE` el servidor no lo sabe. Del archivo.
Sólo se leen cinco llaves, que son los caminos mismos:
`CC_OIDC_CLIENT_SECRET_FILE`, `CC_OIDC_TOKEN_KEY_FILE` ,
`CC_LDAP_BIND_PASSWORD_FILE`, `CC_OIDC_CA_FILE` , `CC_LDAP_CA_FILE` . Base de contraseñas y
Transmit SMTP a través del medio ambiente Kubernetes `secretKeyRef`
`server.env` ) o a través de un archivo privado JSON con derechos `0600` .

** Que comandos leen la configuración.** `serve` (default), `migrate` y
`admin …` descargar y validar toda la configuración, por lo que el equipo `admin` necesita hacerlo.
las mismas teclas que el servidor (el contenedor ya las tiene). `healthcheck`
sólo `CC_LISTEN_ADDR` y cheques `http://127.0.0.1:<порт>/readyz` .

## Red, dirección pública, TLS y proxy

El servidor en sí no completa el TLS y no tiene las teclas de certificado: HTTPS proporciona
invierte el proxy o el ingreso antes de él. Proxy debe transferir WebSocket
`/v1/events/ws` , recibir cuerpos de consulta hasta 16 MiB y no cambiar el camino, la consulta y
Cuerpo: Estos están incluidos en la firma del dispositivo.

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_LISTEN_ADDR` | - (en el gráfico siempre `0.0.0.0:8080` ) | `0.0.0.0:8080` | `хост:порт` | no | Dirección y puerto HTTP /WebSocket API. En un host sin un contenedor y un proxy en la misma máquina, especifique `127.0.0.1:8080` para que la API no sea directamente accesible. Puerto toma y `healthcheck` . |
| `CC_PUBLIC_URL` | `config.publicUrl` | no procesados | URL `https://…` | no | Dirección de base pública de la instancia `https://sync.example.org` , sin `/v1` De ella, se construyen botones en letras `/account#action=verify` , `reset` , `deny-device` y dirección de retorno OIDC `CC_PUBLIC_URL/v1/auth/oidc/callback`. Sin ella, los correos electrónicos contienen sólo código y no mencionan una página web. Debe ser una dirección absoluta `http(s)://` sin `?` y `#` (otra vez el servidor no comenzará). Para OIDC, es obligatorio y debe comenzar con `https://` `http://` – sólo `127.0.0.1` / `localhost` para el desarrollo. La página `/account` en esta dirección es servida por su sitio o el servidor mismo `CC_WEB_ACCOUNT=true` ; si no lo es, los enlaces de los correos electrónicos devolverán 404 – los códigos en los correos electrónicos todavía funcionan en la aplicación. |
| `CC_WEB_ACCOUNT` | `config.webAccount` | `false` | lógica | no | Página de cuenta incorporada en el servidor mismo: `GET /account` (+ `app.js` , `app.css` . Confirmación de correo electrónico, nueva contraseña de código del correo electrónico, "Esto no soy yo" para correos electrónicos sobre nuevos dispositivos - sólo a través de endpoints públicos con código, sin login, cookies y acceso a almacenamiento; estricto CSP del mismo origen. Para ser hospedado sin un sitio: Habilitar y especificar `CC_PUBLIC_URL` igual a la dirección del servidor, el proxy inverso debe transmitir `/account` y `/account/*` . Apagado, el servidor sigue siendo sólo la API. |
| `CC_TRUST_PROXY_HEADERS` | `config.trustProxyHeaders` `auto` = `ingress.enabled` , `"true"` , `"false"` | `false` | lógica | no | Tome la dirección del cliente desde el último punto** `X-Forwarded-For` (el que agregó su proxy). Únicamente con un proxy de confianza que sobrescribe o complementa el encabezado, y con acceso directo cerrado al puerto de API - de lo contrario el cliente forjará la dirección. Sin ella, todos los límites IP sólo ven la dirección proxy. |
| `CC_HSTS` | `config.hsts` | `true` | lógica | no | Add `Strict-Transport-Security: max-age=63072000; includeSubDomains` . Apaga sólo si el propio proxy pone el HSTS o los subdominios deben permanecer disponibles en HTTP . |
| `CC_SOURCE_CODE_URL` | `config.sourceCodeUrl` | la dirección del ensamblaje fuente (la imagen lo fija en sí misma) | URL | no | Una referencia al código fuente que `/v1/meta` da como `source_code_url` (AGPL-3.0 §13). No pidas una imagen oficial. Si ejecuta un servidor *modificado*, especifique dónde obtener su código fuente. |

## Base de datos y piscina de conexión

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_DATABASE_URL` | `database.url` , `database.existingSecret` + `database.existingSecretKey` o incrustado `postgresql.*` | # Requiere # | `postgres://…` URL | Sí, si con una contraseña. | URL PostgreSQL 16: `postgres://пользователь@хост:5432/база?sslmode=verify-full` Para la base externa, use `sslmode=verify-full` y con su propia CA `sslrootcert=<путь в контейнере>` . Una contraseña en URL necesita un código por ciento; es más fácil transferirlo por separado a `CC_DATABASE_PASSWORD` . **Secret** si contiene una contraseña. En Helm `database.url` se almacena en el gráfico Secreto, y en `existingSecret` se almacena en su gráfico Secreto. |
| `CC_DATABASE_PASSWORD` | sólo con una base integrada `postgresql.auth.password` / `existingSecret` ; para exterior - `extraEnv` con `secretKeyRef` | no procesados | línea | Sí. | Contraseña que se inserta arriba URL ; no se requiere selección. **Secret.** Si no se establece aquí o en URL , el controlador utiliza una variable estándar `PGPASSWORD` . |
| `DATABASE_URL` | — | no procesados | `postgres://…` URL | Sí, si con una contraseña. | Antiguo nombre `CC_DATABASE_URL`, **sólo el medio ambiente. Utilizado si `CC_DATABASE_URL` no se especifica en el entorno de proceso; entonces es más importante `CC_DATABASE_URL` del archivo JSON. |
| `CC_DATABASE_MAX_CONNECTIONS` | `database.maxConnections` | `20` | ≥ 1 | no | Tamaño de la piscina por proceso (pod), no menos de 1. Cada proceso tiene otro compuesto para `LISTEN/NOTIFY` . Asegúrese de que `реплики × (значение + 1)` es menos que `max_connections` PostgreSQL . Esperar una conexión libre es de 5 segundos. |
| `CC_DATABASE_CONNECT_TIMEOUT_SECS` | `database.connectTimeoutSecs` | `60` | segundos enteros | no | ¿Cuántos segundos repite una startup tratando de conectarse a una base inaccesible (aumento de pausa de 0.25 a 5 segundos) antes de terminar con un error? Válido para `serve`, `migrate` y `admin` . |
| `CC_RUN_MIGRATIONS` | `migrations.runAtStartup` | `true` | lógica | no | Aplicar las migraciones incorporadas al inicio (bajo el candado de asesoramiento - seguro para múltiples réplicas). `false` - sólo si las migraciones se realizan por separado `consolecrypt-server migrate` , Helm `migrations.job.enabled` ) o para un revolvimiento preverificado. El retroceso de la imagen de la migración no cancela. |
| `CC_EVENT_BUS` | `config.eventBus` | `postgres` | `postgres` , `local` | no | Cómo los eventos en tiempo real llegan a los clientes de WebSocket: `postgres` `LISTEN/NOTIFY` , trabaja con cualquier número de réplicas) o `local` (en un solo proceso, sólo una réplica; gráfico prohíbe `local` en `replicaCount > 1` y autoescala). |

## Mail (SMTP)

El correo es necesario para la confirmación de la dirección y códigos de reajuste de contraseñas, cartas de protección
Dispositivos, advertencias sobre accesos fallidos e invitaciones a equipos.

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_MAIL_TRANSPORT` | `mail.transport` | `disabled` | `disabled` `none` ), `smtp` , `file` | no | `disabled` (o `none` ) – no se envían cartas, el administrador utiliza `admin verify-email` y `admin reset-token`; `smtp` – el envío a través de SMTP; `file` – sólo para el desarrollo, cada carta está escrita por un archivo en `CC_MAIL_DIR` . |
| `CC_MAIL_DIR` | `mail.file.dir` (emptyDir in pod) | `./.dev-mail` | Catálogo | no | Catálogo para `file` ; ruta relativa al directorio de trabajo de proceso. Los archivos se crean con derechos `0600` . |
| `CC_MAIL_FROM` | `mail.from` | `ConsoleCrypt <no-reply@localhost>` | dirección `Имя <a@example.org>` | no | El remitente. La dirección debe ser autorizada por su servidor SMTP y los registros DNS del remitente. |
| `CC_MAIL_LANGUAGE` | `mail.language` | `ru` | `ru` , `en` | no | El idioma de los correos electrónicos y la página de cuenta incorporada. Los correos electrónicos van al HTML con una alternativa de texto (UTF-8); el código siempre se muestra para insertar en la aplicación, su validez se toma de los ajustes TTL. |
| `CC_SMTP_HOST` | `mail.smtp.host` | — | nombre de host | no | El nombre del servidor SMTP es necesario en `smtp` . |
| `CC_SMTP_PORT` | `mail.smtp.port` | `587` | 1–65535 | no | Port SMTP (1-65535). |
| `CC_SMTP_TLS` | `mail.smtp.tls` | `starttls` | `starttls` , `tls` , `none` | no | `starttls` (normalmente 587), `tls` – TLS implícita (normalmente 465), `none` – sin cifrado, sólo para el interceptor local de relé o prueba de correo electrónico. |
| `CC_SMTP_USERNAME` | `mail.smtp.username` | no procesados | línea | no | Acceso SMTP. Vacío – sin autenticación (relévalo con acceso IP). |
| `CC_SMTP_PASSWORD` | `mail.smtp.password` (Carta secreta) o `mail.smtp.existingSecret` + `existingSecretPasswordKey` | no procesados | línea | Sí. | contraseña SMTP. **Secret**: Use `existingSecret` en Helm. |

## Registro, confirmación de la dirección, fichas y contraseñas de cuenta

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_REGISTRATION_OPEN` | `config.registrationOpen` | `true` | lógica | no | Permitir el registro de nuevas cuentas. `false` - el registro responde a 403, `/v1/meta` informes `registration_open: false` ; las cuentas existentes están en funcionamiento. Enterprise-mode no funciona: las cuentas crean el primer login a través de IdP / directorio `CC_AUTH_AUTO_CREATE` . |
| `CC_REQUIRE_EMAIL_VERIFICATION` | `config.requireEmailVerification` | `false` | lógica | no | Consultar una dirección confirmada: sin ella, inicio de sesión, almacenamiento, comando y creación de objetos comunes `email_not_verified` . Necesito correo o `admin verify-email` . Ejemplo Docker Compose lo incluye. |
| `CC_EMAIL_VERIFY_TTL_SECS` | `config.tokens.emailVerifyTtlSecs` | `172800` (48 horas) | segundos enteros | no | Validez del código de confirmación de la dirección. |
| `CC_PASSWORD_RESET_TTL_SECS` | `config.tokens.passwordResetTtlSecs` | `3600` (1 h) | segundos enteros | no | La validez del código de reajuste de contraseña de la cuenta (de la letra o `admin reset-token` ). |
| `CC_ACCESS_TOKEN_TTL_SECS` | `config.tokens.accessTtlSecs` | `900` (15 min) | segundos, 60-86400 | no | Lifespan of access token, 60–86400. En resumen, una revisión es más rápida, pero más a menudo una actualización. |
| `CC_REFRESH_TOKEN_TTL_SECS` | `config.tokens.refreshTtlSecs` | `2592000` (30 días) | segundos, ≥ `CC_ACCESS_TOKEN_TTL_SECS` | no | Refresh token (sesión del dispositivo sin actualización); no menos que el acceso a la ficha. Después de eso, el dispositivo vuelve a entrar. |
| `CC_ARGON2_MEMORY_KIB` | `config.argon2.memoryKib` | `19456` (19 MiB) | KiB, entero. | no | Memoria Argon2id para el hash ** contraseña de cuenta ** (el servidor no recibe claves de almacenamiento). Se aplican nuevos parámetros a nuevos hashes; los existentes se revisan con sus propios parámetros antes de cambiar la contraseña. |
| `CC_ARGON2_ITERATIONS` | `config.argon2.iterations` | `2` | ≥ 1 | no | Número de pases Argon2id. |
| `CC_ARGON2_PARALLELISM` | `config.argon2.parallelism` | `1` | ≥ 1 | no | Paralelismo Argon2id. |
| `CC_ARGON2_MAX_CONCURRENT` | `config.argon2.maxConcurrent` `4` ) | Número de CPU, no más de 4 | ≥ 1 | no | ¿Cuántos hashes son contados al mismo tiempo (protección de la CPU y memoria de la sobrecarga de entrada), al menos 1. Peak Memory `CC_ARGON2_MEMORY_KIB × CC_ARGON2_MAX_CONCURRENT` – Mantenlo bien por debajo del límite de memoria del contenedor. |

## Dispositivos y protección contra la entrada desde el nuevo dispositivo

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_REQUIRE_REQUEST_PROOF` | `config.requireRequestProof` | `true` | lógica | no | Requiere la firma de cada solicitud con la clave del dispositivo (protocolo 1.5): la señal robada es inútil sin la clave. `false` - una excepción temporal para los clientes antiguos: las firmas incorrectas todavía son rechazadas, falta sólo cuenta `cc_request_proofs_total{result="missing"}` . El acceso compartido requiere `true` . |
| `CC_DEVICE_REQUEST_TTL_SECS` | `config.tokens.deviceRequestTtlSecs` | `86400` (24 horas) | segundos enteros | no | ¿Cuánto tiempo espera una solicitud de confianza para que un dispositivo nuevo sea aprobado en un dispositivo de confianza en vivo? |
| `CC_DEVICE_PROTECTION_ENABLED` | `config.deviceProtection.enabled` | `false` | lógica | no | Protección contra la entrada desde un nuevo dispositivo: cuarentena, restricción de la liberación de material desbloqueado a dispositivos no confirmados, letras "nuevo dispositivo", evento `device_registered` , recuerdo de dispositivos no utilizados al restablecer una contraseña. Las referencias a “No soy yo” están en `CC_PUBLIC_URL/account` . Detalles - [HOSTING.md](../HOSTING.md#защита-от-входа-с-нового-устройства) . |
| `CC_NEW_DEVICE_MAIL_ENABLED` | `config.deviceProtection.newDeviceMail` | `true` | lógica | no | Cartas sobre un nuevo dispositivo (actúa con protección y correo configurado). |
| `CC_DEVICE_QUARANTINE_DAYS` | `config.deviceProtection.quarantineDays` | `14` | día, 0-365 | no | Cuarentena un nuevo dispositivo en un día, 0-365: en este momento no puede recordar dispositivos de confianza, y cambiar la contraseña y "salir en todas partes" de él no termina las sesiones de dispositivos de confianza. `0` – sin cuarentena. |
| `CC_ENVELOPE_LIMIT_ACCOUNT_PER_HOUR` | `config.deviceProtection.envelopesPerAccountPerHour` | `5` | entero ≥ 0, `0` - sin límite | no | ¿Cuántas veces por hora los dispositivos de cuenta no confirmados reciben material de desbloqueo de almacenamiento `0` sin limitación? Los contadores son comunes a todas las réplicas. |
| `CC_ENVELOPE_LIMIT_ACCOUNT_PER_DAY` | `config.deviceProtection.envelopesPerAccountPerDay` | `20` | entero ≥ 0, `0` - sin límite | no | Lo mismo en un día. |
| `CC_ENVELOPE_LIMIT_DEVICE_PER_HOUR` | `config.deviceProtection.envelopesPerDevicePerHour` | `3` | entero ≥ 0, `0` - sin límite | no | Lo mismo para un dispositivo no confirmado en una hora. |
| `CC_NEW_DEVICE_MAIL_PER_HOUR` | `config.deviceProtection.newDeviceMailsPerHour` | `10` | ≥ 0 | no | Escribimos sobre nuevos dispositivos por cuenta por hora; las entradas restantes de la hora se reducen a una letra. |

## Sincronización, WebSocket y Quotas

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_SYNC_PAGE_BYTES` | `config.sync.pageBytes` | `8388608` (8 MiB) | bytes, ≥ 65536 | no | bytes de presupuesto de una página `changes` / `snapshot` y listas de acceso público, no menos de 65536. |
| `CC_QUOTAS_V2_ENABLED` | `config.quotas.v2Enabled` | `true` | lógica | no | Server Quotas 0.2.2: contabilidad para lápidas y objetos, límites de dispositivo, eliminación de un objeto desconocido sin lápida. `false` devuelve el comportamiento 0.2.1 (contadores continúan siendo mantenidos). |
| `CC_MAX_VAULT_BYTES` | `config.quotas.maxVaultBytes` | `1073741824` (1 GiB) | bytes, ≥ 1048576 | no | Texto cifrado más lápidas por unidad de almacenamiento, al menos 1 MiB. Más - `413` , `details.reason = "vault_quota"` . |
| `CC_TOMBSTONE_COST_BYTES` | `config.quotas.tombstoneCostBytes` | `256` | bytes, 0–1048576 | no | Cuánta cantidad de bytes de cuota cuesta cada lápida (objeto renovado), 0–1048576. |
| `CC_MAX_VAULT_OBJECTS` | `config.quotas.maxVaultObjects` | `100000` | ≥ 1 | no | Objetos vivos y lápidas en un solo almacenamiento, al menos 1. Más - `413` , `object_limit` . |
| `CC_MAX_VAULTS_PER_ACCOUNT` | `config.quotas.maxVaultsPerAccount` | `50` | ≥ 1 | no | Almacenamiento que la cuenta posee es por lo menos 1. Más - `403` , `vault_limit` . |
| `CC_MAX_DEVICES_PER_ACCOUNT` | `config.quotas.maxDevicesPerAccount` | `20` | 1–64 | no | Dispositivos de cuenta no revocados, 1–64 (64 es el límite de receptores de un objeto común). Entrada de otro - `403` , `device_limit` . |
| `CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY` | `config.quotas.newDevicesPerAccountPerDay` | `10` | entero ≥ 0, `0` - sin límite | no | Dispositivos de nueva cuenta por 24 horas `0` - sin limitación. Más - `403` , `device_daily_limit` con `details.until` . |
| `CC_WS_PING_INTERVAL_SECS` | `config.websocket.pingIntervalSecs` | `30` | segundos, ≥ 1 | no | El intervalo de ping en WebSocket es al menos 1. Reduzca si el proxy cierra conexiones silenciosas más rápido. |
| `CC_WS_SESSION_RECHECK_SECS` | `config.websocket.sessionRecheckSecs` | `30` | segundos, 1-30 | no | Cuán a menudo un WebSocket abierto comprueba que una sesión no se cancela, 1–30: la revisión llega a las tomas a más tardar 30 segundos. |
| `CC_WS_MAX_CONNECTIONS_PER_USER` | `config.websocket.maxConnectionsPerUser` | `32` | ≥ 1 | no | Simultaneous WebSocket-account connections per replica, not less than 1; in excess - `429` . |

Las cuotas de cuenta individual cambian sin reiniciar: `Límites de memoria fijados --email
max_vault_bytes=... max_vault_objects=... max_devices_per_account=
new_devices_per_account_per_day=... `. ` CC_MAX_VAULTS_PER_ACCOUNT
Está sobredefinindo.

## Acceso compartido y equipos

Todas las banderas compartidas se apagan por defecto y requieren
`CC_OBJECT_SHARING_ENABLED=true` y `CC_REQUIRE_REQUEST_PROOF=true` (otra vez el servidor no
Empezará. Apagando la bandera esconde objetos de este tipo sin eliminarlos.
cifertexto. El cliente reconoce las posibilidades mediante una solicitud autorizada
`/v1/shares/capabilities`. Detalles - [SHARING.md](SHARING.md) .

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_OBJECT_SHARING_ENABLED` | `config.objectSharingEnabled` | `false` | lógica | no | El principal mecanismo para compartir los anfitriones. |
| `CC_SHARED_GROUPS_ENABLED` | `config.sharedGroupsEnabled` | `false` | lógica | no | Grupos generales (colecciones). |
| `CC_SHARED_SECRETS_ENABLED` | `config.sharedSecretsEnabled` | `false` | lógica | no | Secretos compartidos separados. |
| `CC_SHARED_KUBE_CONTEXTS_ENABLED` | `config.sharedKubeContextsEnabled` | `false` | lógica | no | conexiones generales Kubernetes `supports_kube_contexts` . |
| `CC_SHARED_DB_CONNECTIONS_ENABLED` | `config.sharedDbConnectionsEnabled` | `false` | lógica | no | conexiones comunes a bases de datos `supports_db_connections` . |
| `CC_SHARED_NOTES_ENABLED` | `config.sharedNotesEnabled` | `false` | lógica | no | Notas generales a objetos comunes `supports_notes_v1` : hasta 500 notas por objeto, hasta 288 KiB ciphertext por nota. |
| `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED` | `config.sharingOwnerOnlineEnrollmentEnabled` | `false` | lógica | no | Añadiendo los propios dispositivos del nuevo receptor con la participación del propietario. |
| `CC_TEAMS_ENABLED` | `extraEnv` | `true` | lógica | no | Comandos (almacones comunes, `/v1/teams/*`, `capabilities.teams` en `/v1/meta` ). No depende de banderas compartidas. En `false` , las rutas de comando responden 404, los datos se almacenan. |
| `CC_MAX_TEAMS_PER_ACCOUNT` | `extraEnv` | `50` | ≥ 1 | no | Los equipos en los que se puede componer la cuenta son por lo menos 1. |
| `CC_MAX_TEAM_MEMBERS` | `extraEnv` | `200` | ≥ 2 | no | Miembros del mismo equipo, no menos de 2. |

## Límites a las solicitudes

Los límites protegen un servidor de una sola cuenta, dispositivo o dirección. Mayoría
los límites se almacenan en PostgreSQL (cucha token a tiempo base) y el mismo
Funciona en todas las réplicas; los tres límites de la primera etapa viven en la memoria de cada una.
líneas. En caso de fracaso - `429 rate_limited` con `Retry-After` y `details.limit` .

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_RATE_LIMIT_ENABLED` | `config.rateLimit.enabled` | `true` | lógica | no | `false` se apaga **all* límite de solicitud (los plazos restantes). Sólo por depurar. |
| `CC_RATE_LIMIT_MODE` | `config.rateLimit.mode` | `observe` | `observe` , `enforce` | no | `observe` – superando los límites PostgreSQL y el límite de lectura sólo se consideran `cc_rate_limit_observed_total{limiter}` , evento de auditoría `limit_exceeded` no más de una vez por hora por cuenta y límite); `enforce` – rechazado. Los límites de entrada y recuperación (notados a continuación) y las primeras etapas `CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE` y `CC_RATE_LIMIT_PROOF_PER_DEVICE_PER_MINUTE` funcionan en ambos modos. Observe la métrica durante una semana, levante los umbrales si es necesario, entonces `enforce` . |
| `CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE` | `config.rateLimit.authPerIpPerMinute` | `30` | entero en un minuto | no | El primer paso en la memoria de réplica: acceso público, solicitudes de inicio de sesión y recuperación de una IP IPv6 a /64) por minuto. Hasta que se haya dado `CC_LIMIT_AUTH_IP_RATE` , el mismo valor se da por el límite total `auth_ip` . |
| `CC_RATE_LIMIT_PROOF_PER_DEVICE_PER_MINUTE` | `config.rateLimit.proofPerDevicePerMinute` | `20` | entero en un minuto | no | Replica: Intentos para confirmar la llave (aprueba/aprobar) al dispositivo por minuto. |
| `CC_RATE_LIMIT_READ_PER_DEVICE_PER_MINUTE` | `config.rateLimit.readPerDevicePerMinute` | `1200` | entero, por minuto; `0` - apagado. | no | Memoria de réplica: lecturas autorizadas (GET) por dispositivo por minuto; `0` - sin límite. Presentado `CC_RATE_LIMIT_MODE` . |
| `CC_RATE_LIMIT_LOGIN_PER_EMAIL_PER_MINUTE` | `config.rateLimit.loginPerEmailPerMinute` | no especificada `10` | entero en un minuto | no | Nombre anterior (hasta 0.2.2): límite de frecuencia `login_email` por minuto (y su capacidad). Si se da `CC_LIMIT_LOGIN_EMAIL_RATE` se ignora. |
| `CC_RATE_LIMIT_RECOVERY_PER_EMAIL_PER_HOUR` | `config.rateLimit.recoveryPerEmailPerHour` | no especificada `5` | entero en una hora | no | Nombre anterior: frecuencia `recovery_email` por hora. Si se da `CC_LIMIT_RECOVERY_EMAIL_RATE` se ignora. |

### Límites PostgreSQL : `CC_LIMIT_<ИМЯ>_*`

Cada límite tiene cuatro llaves `<ИМЯ>` – el nombre del límite en letras mayúsculas:

- `CC_LIMIT_<ИМЯ>_RATE` - frecuencia del cubo principal: `N` en el período natural
  límite (se especifica en el cuadro) o `N/s`, `N/sec`, `N/min` `N/m`, `N/hour` `N/h`,
  `N/day` `N/d` ; fraccional `N` es permisible; `0` - sin el cubo principal. Si se pregunta
  Sólo la frecuencia, la capacitancia se vuelve igual a un período de esta frecuencia.
- `CC_LIMIT_<ИМЯ>_BURST` - capacidad de cubo (cuántas solicitudes en fila), el conjunto no
  menos de 1. Por defecto, un período de frecuencia, a menos que la tabla muestre un pico.
- `CC_LIMIT_<ИМЯ>_PER_HOUR` y `CC_LIMIT_<ИМЯ>_PER_DAY` – techos adicionales
  Por una hora y por un día entero; `0` - sin techo.

Un límite sin frecuencia y techos no limita nada. Helm tiene las cuatro llaves.
se define por bloque `config.rateLimit.limits` , por ejemplo
`{push_account: {rate: "600/min", burst: 600, perHour: 0, perDay: 0}}` (campos)
`rate`, `burst` , `perHour` , `perDay` . Para una cuenta separada,
`admin limits set --email … push_account_rate=600/min` (suffixes `_rate` )
`_burst` , `_per_hour` , `_per_day` ; los límites de entrada no están anulados.

| Nombre. | ¿Qué es limitado? | Por defecto. | Llaves. |
|---|---|---|---|
| `push_device` | Envío de cambios desde un dispositivo | 120/min, pico 60 | `CC_LIMIT_PUSH_DEVICE_RATE` , `CC_LIMIT_PUSH_DEVICE_BURST` , `CC_LIMIT_PUSH_DEVICE_PER_HOUR` , `CC_LIMIT_PUSH_DEVICE_PER_DAY` |
| `push_account` | Envío de cambios a todos los dispositivos de cuenta | 300/min | `CC_LIMIT_PUSH_ACCOUNT_RATE` , `CC_LIMIT_PUSH_ACCOUNT_BURST` , `CC_LIMIT_PUSH_ACCOUNT_PER_HOUR` , `CC_LIMIT_PUSH_ACCOUNT_PER_DAY` |
| `mutations_account` | el número de cambios en las presentaciones de la cuenta | 50.000 por hora | `CC_LIMIT_MUTATIONS_ACCOUNT_RATE` , `CC_LIMIT_MUTATIONS_ACCOUNT_BURST` , `CC_LIMIT_MUTATIONS_ACCOUNT_PER_HOUR` , `CC_LIMIT_MUTATIONS_ACCOUNT_PER_DAY` |
| `unknown_delete_account` | Eliminar objetos que no estaban en el servidor | 1000/día | `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_RATE` , `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_BURST` , `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_PER_HOUR` , `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_PER_DAY` |
| `share_write_account` | creación de objetos comunes | 60/hora, pico 20 | `CC_LIMIT_SHARE_WRITE_ACCOUNT_RATE` , `CC_LIMIT_SHARE_WRITE_ACCOUNT_BURST` , `CC_LIMIT_SHARE_WRITE_ACCOUNT_PER_HOUR` , `CC_LIMIT_SHARE_WRITE_ACCOUNT_PER_DAY` |
| `share_revision_account` | auditoría de las instalaciones comunes, cambio de acceso, notas generales | 600 horas | `CC_LIMIT_SHARE_REVISION_ACCOUNT_RATE` , `CC_LIMIT_SHARE_REVISION_ACCOUNT_BURST` , `CC_LIMIT_SHARE_REVISION_ACCOUNT_PER_HOUR` , `CC_LIMIT_SHARE_REVISION_ACCOUNT_PER_DAY` |
| `recipient_lookup_account` | correo-orden | 30/min y 300/día | `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_RATE` , `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_BURST` , `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_HOUR` , `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_DAY` |
| `enrollment_account` | Añadiendo los propios dispositivos del receptor | 30 horas | `CC_LIMIT_ENROLLMENT_ACCOUNT_RATE` , `CC_LIMIT_ENROLLMENT_ACCOUNT_BURST` , `CC_LIMIT_ENROLLMENT_ACCOUNT_PER_HOUR` , `CC_LIMIT_ENROLLMENT_ACCOUNT_PER_DAY` |
| `trust_request_device` | Solicitudes de confianza de un dispositivo único | 10 horas | `CC_LIMIT_TRUST_REQUEST_DEVICE_RATE` , `CC_LIMIT_TRUST_REQUEST_DEVICE_BURST` , `CC_LIMIT_TRUST_REQUEST_DEVICE_PER_HOUR` , `CC_LIMIT_TRUST_REQUEST_DEVICE_PER_DAY` |
| `trust_request_account` | Solicitudes de confianza para todos los dispositivos de cuenta | 30/día | `CC_LIMIT_TRUST_REQUEST_ACCOUNT_RATE` , `CC_LIMIT_TRUST_REQUEST_ACCOUNT_BURST` , `CC_LIMIT_TRUST_REQUEST_ACCOUNT_PER_HOUR` , `CC_LIMIT_TRUST_REQUEST_ACCOUNT_PER_DAY` |
| `verification_account` | Reconciliación clave: anuncio del dispositivo de aprobación, impresión de clave de almacenamiento firmada | 20 horas | `CC_LIMIT_VERIFICATION_ACCOUNT_RATE` , `CC_LIMIT_VERIFICATION_ACCOUNT_BURST` , `CC_LIMIT_VERIFICATION_ACCOUNT_PER_HOUR` , `CC_LIMIT_VERIFICATION_ACCOUNT_PER_DAY` |
| `account_security` | cambio de contraseña, reedición de kit de recuperación, cambio de sobre | 10 horas | `CC_LIMIT_ACCOUNT_SECURITY_RATE` , `CC_LIMIT_ACCOUNT_SECURITY_BURST` , `CC_LIMIT_ACCOUNT_SECURITY_PER_HOUR` , `CC_LIMIT_ACCOUNT_SECURITY_PER_DAY` |
| `ws_connect_account` | Nuevas conexiones de cuenta WebSocket | 60/min | `CC_LIMIT_WS_CONNECT_ACCOUNT_RATE` , `CC_LIMIT_WS_CONNECT_ACCOUNT_BURST` , `CC_LIMIT_WS_CONNECT_ACCOUNT_PER_HOUR` , `CC_LIMIT_WS_CONNECT_ACCOUNT_PER_DAY` |
| `auth_ip` (siempre válido) | solicitudes públicas de entrada, registro y restauración de la misma dirección, comunes a réplicas | 30/min | `CC_LIMIT_AUTH_IP_RATE` , `CC_LIMIT_AUTH_IP_BURST` , `CC_LIMIT_AUTH_IP_PER_HOUR` , `CC_LIMIT_AUTH_IP_PER_DAY` |
| `login_email` (siempre válido) | **sin éxito** logins a una dirección de correo electrónico de la misma red (/24 IPv4 , /64 IPv6 ) | 10/min y 50/hora | `CC_LIMIT_LOGIN_EMAIL_RATE` , `CC_LIMIT_LOGIN_EMAIL_BURST` , `CC_LIMIT_LOGIN_EMAIL_PER_HOUR` , `CC_LIMIT_LOGIN_EMAIL_PER_DAY` |
| `login_email_total` (siempre válido) | No entrar en una dirección de todas las redes | 200 horas | `CC_LIMIT_LOGIN_EMAIL_TOTAL_RATE` , `CC_LIMIT_LOGIN_EMAIL_TOTAL_BURST` , `CC_LIMIT_LOGIN_EMAIL_TOTAL_PER_HOUR` , `CC_LIMIT_LOGIN_EMAIL_TOTAL_PER_DAY` |
| `recovery_email` (siempre válido) | Solicitudes de reajuste de contraseña a una dirección de una red | 5 horas | `CC_LIMIT_RECOVERY_EMAIL_RATE` , `CC_LIMIT_RECOVERY_EMAIL_BURST` , `CC_LIMIT_RECOVERY_EMAIL_PER_HOUR` , `CC_LIMIT_RECOVERY_EMAIL_PER_DAY` |
| `recovery_email_total` (siempre válido) | Reiniciar correos electrónicos a direcciones de todas las redes (responso siempre `202` ) | 20/día | `CC_LIMIT_RECOVERY_EMAIL_TOTAL_RATE` , `CC_LIMIT_RECOVERY_EMAIL_TOTAL_BURST` , `CC_LIMIT_RECOVERY_EMAIL_TOTAL_PER_HOUR` , `CC_LIMIT_RECOVERY_EMAIL_TOTAL_PER_DAY` |

Los intentos alienígenas no bloquean al propietario: los límites de entrada exitosos no gastan, y
El acceso desde un dispositivo de cuenta conocido se limita a la dirección solamente. Actuación
Valores: `consolecrypt-server admin limits show` (c `--email` - para la cuenta).

## Entrada de la empresa: `CC_AUTH_*` , `CC_OIDC_*` , `CC_LDAP_*`

En el modo `standard`, las teclas de los proveedores no se leen o verifican.
Un viaje de ida es un cambio de uno `CC_AUTH_MODE` . Orden de ajuste,
recetas para IdP y directorio, comandos y análisis de errores - en [ENTERPRISE.md](ENTERPRISE.md) .
En el bloque Helm `auth:` ; los secretos son tomados del Secreto existente que traza.
montajes sólo lectura en `/run/secrets/consolecrypt-auth` y camino `*_FILE`
Está preparando la carta.

### Claves comunes

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_AUTH_MODE` | `auth.mode` | `standard` | `standard` , `enterprise` | no | `standard` - email y contraseña de cuenta; `enterprise` - login sólo a través de IdP (OIDC) o directorio (LDAP), registro y contraseñas de cuenta se apagan. |
| `CC_AUTH_PROVIDER` | `auth.provider` | — | `oidc` , `ldap` | no | `oidc` o `ldap`; obligatorio en una empresa. |
| `CC_AUTH_DISPLAY_NAME` | `auth.displayName` | no procesados | hasta 64 caracteres impresos | no | Firma del botón de inicio de sesión en la aplicación ("Entrar a través ..."), hasta 64 caracteres impresos. |
| `CC_AUTH_ALLOWED_DOMAINS` | `auth.allowedDomains` (lista) | hueco | lista de dominio | no | Dominios de correo permitidos `acme.com, acme.ru` ; `@` se descartan por primera vez, el registro no es importante, subdominios no están incluidos). Necesario para la unión automática de las cuentas existentes con una contraseña; obligatorio para preset `google` |
| `CC_AUTH_AUTO_CREATE` | `auth.autoCreate` | `true` | lógica | no | Crear una cuenta por primera vez se registra una nueva cuenta. `false` – sólo incluye cuentas existentes o asociadas, el resto `403` `not_provisioned` . |
| `CC_AUTH_RECHECK_MINUTES` | `auth.recheckMinutes` | `15` | minutos, 1-1440 | no | Cuán a menudo (1-1.440 minutos) para volver a comprobar el usuario en el directorio IdP / El empleado discapacitado pierde sincronización a más tardar después de este tiempo + 1 minuto. |
| `CC_AUTH_RECHECK_GRACE_HOURS` | `auth.recheckGraceHours` | `24` | reloj, 0-720 | no | Cuantas horas (0-720) de las sesiones viven mientras que el IdP/directorio no está disponible; entonces la actualización responde `503 idp_unavailable` . |

### OIDC

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_OIDC_PRESET` | `auth.oidc.preset` | `generic` | `generic` , `entra` , `adfs` , `keycloak` , `google` , `okta` | no | `generic` , `entra` , `adfs` , `keycloak` , `google` , `okta` : default and start check values (Entra – issuer with tenant id, without `/common` , `/organizations` , `/consumers` ; AD FS – ends with `/adfs` ; Keycloak – contains `/realms/` ; Google – fixed issuer, mandatory domain list, verification `hd` ). |
| `CC_OIDC_ISSUER` | `auth.oidc.issuer` | Obligatorio (y `google` - `https://accounts.google.com` ) | URL `https://…` | no | Expediente exacto: Simbólicamente igual a `issuer` en descubrimiento y `iss` en ficha de identificación, incluyendo la final `/` . Sólo `https://` (o `http://` sobre el retroceso para el desarrollo), ninguna consulta y fragmento. |
| `CC_OIDC_CLIENT_ID` | `auth.oidc.clientId` | obligatorio | línea | no | Identificador del cliente (aplicación) del servidor en IdP. |
| `CC_OIDC_CLIENT_SECRET_FILE` | `auth.oidc.existingSecret` + `clientSecretKey` `client-secret` | obligatorio | fileway | archivo, sí | La ruta hacia el archivo secreto del cliente (UTF-8, la traducción final se descarta, hasta 64 KiB). **Secret**: el archivo debe ser leído por el usuario del proceso (en UID 65532). |
| `CC_OIDC_TOKEN_KEY_FILE` | `auth.oidc.existingSecret` + `tokenKeyKey` `token-key` | obligatorio | fileway | archivo, sí | El camino a un archivo con una clave de 32 bytes, que encripta el IdP token (ChaChaCha20-Poly1305) en la base de datos: 64 caracteres hex `openssl rand -hex 32` , base64 32 bytes o 32 bytes aleatorios. **Secret.** Cuando cambie la clave, el token de refrescos almacenado se vuelve inalcanzable - los usuarios se iniciarán una vez más. |
| `CC_OIDC_SCOPES` | `auth.oidc.scopes` | `openid email profile offline_access` ; `adfs` : `openid email profile allatclaims` ; `google` : `openid email profile` | lista a través del espacio, c `openid` | no | Alcances a través del espacio; `openid` es obligatorio. `offline_access` es necesario para refrescar la señal y volver a comprobar; Google lo rechaza (preset sí añade `access_type=offline` y `prompt=consent` ). |
| `CC_OIDC_EMAIL_CLAIM` | `auth.oidc.emailClaim` | `email` ; `entra` : `preferred_username` ; `adfs` : `upn` | reclamación | no | Claim ID token, utilizado como una dirección de correo electrónico de cuenta (valor debe contener `@` ). |
| `CC_OIDC_REQUIRED_CLAIM` | `auth.oidc.requiredClaim` | no procesados | `claim=значение` | no | `имя=значение` : sólo permitir a aquellos cuya reclamación es igual o (para una matriz, por ejemplo `groups` , `roles` contiene ella. De lo contrario `403 group_required` . |
| `CC_OIDC_REQUIRE_MFA` | `auth.oidc.requireMfa` | `false` | lógica | no | Solicitar entrada multifactorial: `mfa` o `http://schemas.microsoft.com/claims/multipleauthn` en `amr` o `acr` de `CC_OIDC_MFA_ACR_VALUES` . De lo contrario `403 mfa_required` . Para `google` sin `acr` - los valores no se aceptan. |
| `CC_OIDC_MFA_ACR_VALUES` | `auth.oidc.mfaAcrValues` | vacío | lista | no | Valores `acr` que se consideran multifactoriales (por coma o espacio). |
| `CC_OIDC_TOKEN_AUTH_METHOD` | `auth.oidc.tokenAuthMethod` | `client_secret_basic` | `client_secret_basic` `basic` ), `client_secret_post` `post` | no | autenticación del servidor de punta final token: `client_secret_basic` `basic` o `client_secret_post` `post` . |
| `CC_OIDC_CA_FILE` | `auth.oidc.caKey` (key in the same Secret) | root | sendero | no | Certificado PEM de raíz adicional CA para IdP para CA interno (por ejemplo. AD FS). |

### LDAP / Active Directory

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_LDAP_URL` | `auth.ldap.url` | obligatorio | `ldaps://…` , `ldap://…` | no | `ldaps://dc1.acme.local:636` o `ldap://dc1.acme.local:389` junto con `CC_LDAP_STARTTLS=true` . Simple `ldap://` sin el servidor STARTTLS rechaza: la contraseña de dominio no debe ir en texto plano. El nombre de host debe coincidir con el certificado del controlador. |
| `CC_LDAP_STARTTLS` | `auth.ldap.starttls` | `false` | lógica | no | STARTTLS for `ldap://` ; c `ldaps://` no es aceptable. |
| `CC_LDAP_CA_FILE` | `auth.ldap.caKey` (key in the same Secret) | root | sendero | no | PEM con el certificado raíz del dominio CA (uno o más certificados). |
| `CC_LDAP_BIND_DN` | `auth.ldap.bindDn` | obligatorio | DNN | no | Registros de servicios DN para la búsqueda y revisión, por ejemplo `CN=svc-consolecrypt,OU=Service,DC=acme,DC=local` Basta de derechos para leer el catálogo. |
| `CC_LDAP_BIND_PASSWORD_FILE` | `auth.ldap.existingSecret` + `bindPasswordKey` `bind-password` | obligatorio | fileway | archivo, sí | El camino al archivo con la contraseña del registro de servicio. **Secret.** |
| `CC_LDAP_BASE_DN` | `auth.ldap.baseDn` | obligatorio | DNN | no | Dónde buscar usuarios `DC=acme,DC=local` También sirve como un identificador de la fuente de unión: cuando cambia la unión, usted necesita recrear. |
| `CC_LDAP_USER_FILTER` | `auth.ldap.userFilter` | `((objectClass=user)(\)|(mail= {login} )(userPrincipalName= {login} )(sAMAccountName= {login} ) | Filtro LDAP con `{login}` | no | El filtro de búsqueda con `{login}` debe comenzar con `(` . La entrada de usuario está protegida por RFC 4515, el prefijo `ДОМЕН\` es descartado. Si se encuentran varios registros, la entrada es rechazada. |
| `CC_LDAP_EMAIL_ATTR` | `auth.ldap.emailAttr` | `mail` | Nombre | no | Atribuir con una dirección postal. |
| `CC_LDAP_ID_ATTR` | `auth.ldap.idAttr` | `objectGUID` | Nombre | no | identificador de usuario estable; para `objectGUID` almacenado como una cadena GUID. Cambiar tu correo o nombre no rompe tu apego. |
| `CC_LDAP_REQUIRED_GROUP` | `auth.ldap.requiredGroup` | no procesados | DNN | no | El DN del grupo, el miembro del cual (incluyendo grupos anidados, regla AD `LDAP_MATCHING_RULE_IN_CHAIN` ) debe ser el usuario; chequeado al inicio de sesión y volver a comprobar. Al principio, el servidor comprueba que el grupo existe. |
| `CC_LDAP_TIMEOUT_SECS` | `auth.ldap.timeoutSecs` | `10` | segundos 1-60. | no | Tiempo de conexión y operaciones, 1-60 segundos. |
| `CC_LDAP_MAX_FAILURES` | `auth.ldap.maxFailures` | `3` | 1–100 | no | Accesos no exitosos al usuario de inicio de sesión y al usuario del directorio fuera de la ventana, 1–100; luego el servidor responde `429` ** sin referirse a AD**. Mantenga **bajo** el umbral de bloqueo de la cuenta de dominio. |
| `CC_LDAP_FAILURE_WINDOW_MINUTES` | `auth.ldap.failureWindowMinutes` | `15` | minutos, 1-1440 | no | Ventana de contador de entrada fallada, 1-1,440 minutos; no más corto que la ventana de reajuste del contador de bloqueo en la política de dominio. |
| `CC_LDAP_MAX_FAILURES_PER_IP` | `auth.ldap.maxFailuresPerIp` | `30` | entero ≥ 0, `0` - sin límite | no | Entradas infructuosas de una IP por ventana; `0` - sin limitación. |

## Observación: métricas, revistas, localización

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_METRICS_LISTEN` | `metrics.enabled` `true` → `0.0.0.0:9090` , `false` → `off` | `0.0.0.0:9090` | `хост:порт` , `off` , `disabled` | no | El oyente separado Prometheus `GET /metrics` . `off` o `disabled` - apagar. Métricas sin autenticación: No publique el puerto hacia fuera y no lo incluya en Ingress. Ejemplo Docker Compose los apaga. |
| `CC_LOG_FORMAT` | `config.log.format` | `json` | `json` , `pretty` `text` | no | Formato de la revista en stderr: `json` o `pretty` `text` . Los comandos `admin` siempre están escritos en `pretty` . |
| `CC_LOG` | `config.log.filter` | `info,sqlx=warn` | EnvFilter | no | **Sólo el medio ambiente** (en JSON el archivo no es aceptado). Filtro de la revista en sintaxis `tracing` EnvFilter: `info` , `debug,sqlx=warn` . Se lee sin ella `RUST_LOG` . |
| `RUST_LOG` | `extraEnv` | — | EnvFilter | no | **El entorno solo.**El filtro de registro de la página si `CC_LOG` no se especifica. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `extraEnv` | no procesados | URL | no | **El medio ambiente sólo.** Incluye exportaciones de rastreo OpenTelemetry (OTLP HTTP /protobuf), por ejemplo `http://otel-collector:4318` . Se utilizan variables estándar `OTEL_*`. Los galones contienen sólo campos no clasificados (request_id, ruta, estado, usuario UUID y dispositivo). |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | `extraEnv` | no procesados | URL | no | **El medio ambiente sólo.** La misma dirección separada para el rastreo solamente. |

## Mantenimiento y almacenamiento de datos

Servicio de pasaje elimina los registros de servicio obsoletos. Está hecho en uno.
Nota en un momento (cerradura de vista). Períodos de almacenamiento - en días, `0` - para almacenar
Siempre, no más de 36.500. El servidor no hace copias de seguridad: use
`pg_dump` a [HOSTING.md](HOSTING.md) .

| Variable | Helm. | Por defecto. | Significado | Secreto. | ¿Qué está haciendo? |
|---|---|---|---|---|---|
| `CC_MAINTENANCE_INTERVAL_SECS` | `config.maintenance.intervalSecs` | `3600` | segundos `0` apagado. | no | Período de paso del servicio; `0` - apagar. |
| `CC_RETENTION_SESSION_DAYS` | `config.maintenance.retention.sessionDays` | `7` | día, 0–36500 `0` – siempre | no | ¿Cuánto para mantener las sesiones recordadas y caducadas? |
| `CC_RETENTION_SYNC_MUTATION_DAYS` | `config.maintenance.retention.syncMutationDays` | `30` | día, 0–36500 `0` – siempre | no | Registros de idempotencia de cambios aceptados de sincronización. |
| `CC_RETENTION_AUDIT_DAYS` | `config.maintenance.retention.auditDays` | `365` | día, 0–36500 `0` – siempre | no | Audit journal `audit_events` . |
| `CC_RETENTION_DELETED_VAULT_DAYS` | `config.maintenance.retention.deletedVaultDays` | `30` | día, 0–36500 `0` – siempre | no | Después de cuántos días se elimina el cifertexto del almacenamiento remoto. |
| `CC_RETENTION_DEVICE_REQUEST_DAYS` | `config.maintenance.retention.deviceRequestDays` | `90` | día, 0–36500 `0` – siempre | no | Resolver y expirar las solicitudes de confianza del dispositivo. |

## Variables de servicio

| Variable | Donde | ¿Qué está haciendo? |
|---|---|---|
| `CC_CONFIG_FILE` | alrededores | La ruta a un archivo de configuración privado JSON, si no se transmite `--config` . Archivo: ordinario, hasta 64 KiB, uno JSON objeto con claves conocidas y valores de cadena, sobre Unix - derechos `0600` o `0400` . No se registra en el directorio actual, no se ejecuta, `$` y los comandos no se sustituyen. |

Las variables de ejemplo Docker Compose son leídas por Compose, no por el servidor:

| Variable | ¿Qué está haciendo? |
|---|---|
| `CC_SERVER_VERSION` | Versión de imagen `ghcr.io/evsikovas/consolecrypt-server:<версия>` . |
| `CC_SERVER_IMAGE` | Referencia completa a la imagen en lugar de la versión, por ejemplo con `@sha256:` digest. |
| `CC_DOMAIN` | El dominio para el cual Caddy está certificado. |
| `CC_HTTP_PORT` | Puerto de API a `127.0.0.1` host (default `8080` ). |
| `CC_POSTGRES_ADMIN_PASSWORD` | contraseña de administrador PostgreSQL en el contenedor de bases de datos (creado `init-config.py` ). |
| `CC_POSTGRES_PASSWORD` , `CC_METRICS_PORT` | Sólo para el desarrollo `server/docker-compose.yml` : contraseña de base de datos incorporada y métricas de puerto en el host. |

## Equipos de gestión

Los comandos se ejecutan por el mismo archivo binario con la misma configuración.
`--config` – bandera global: `docker compose ... exec – T server
/usr/local/bin/consolecrypt-servidor admin ... ` или ` kubectl exec deployment
/usr/local/bin/consolecrypt-servidor admin. No te dan acceso al contenido.
bóvedas.

| Equipo de equipo. | ¿Qué está haciendo? |
|---|---|
| `serve` | Iniciar el servidor (por defecto). |
| `migrate` | Aplicar las migraciones y salir. |
| `healthcheck` | Compruebe el oyente local `/readyz` ; el código 0 está listo. |
| `admin list-users` | Cuentas: estado, método de inicio de sesión `password` , `oidc` , `ldap` , confirmación de la dirección, número de dispositivos y instalaciones de almacenamiento. |
| `admin verify-email --email …` | Marca la dirección confirmada (servidor sin correo). |
| `admin reset-token --email …` | Imprima un código de reinicio de contraseña única (term - `CC_PASSWORD_RESET_TTL_SECS` ). |
| `admin set-password --email … --password-stdin` | Establecer una contraseña desde la primera línea de stdin; todas las sesiones terminan. |
| `admin disable-user --email …` / `admin enable-user --email …` | Desactivar la cuenta con la retirada de las sesiones / habilitar de nuevo. |
| `admin session revoke --email …` | Completar todas las sesiones de la cuenta. |
| `admin rotate-epoch --all` / `--vault <id>` | Después de restaurar la base de la copia: cambiar la era de almacenamiento para que los clientes noten la devolución. |
| `admin limits show [--email …]` | Límites y cuotas existentes (servidor o cuenta) |
| `admin limits set --email … ключ=значение…` | Superar los límites de cuenta y las cuotas; válidos a más tardar 30 segundos. |
| `admin limits reset --email … [ключ…]` | Quitar las sobredefiniciones (todas sin llaves). |
| `admin auth status` | Modo de inicio de sesión, proveedor, último cheque IdP/catalog, cuentas vinculadas. |
| `admin auth test [--login … [--password-stdin]]` | Repetir los cheques de lanzamiento; c `--login` – encontrar el usuario LDAP (con `--password-stdin` – el verdadero bind) o volver a comprobar la cuenta OIDC en el IdP. |
| `admin identity link --email … --subject … [--issuer …]` | Adjuntar la cuenta a OIDC `sub` o `objectGUID` ; se elimina la contraseña de la cuenta, se terminan las sesiones. |
| `admin identity unlink --email … [--subject …]` | Eliminar los archivos adjuntos de cuenta (o uno). |

---

El ajuste opcional `CC_MONITORING_PRESERVATION_MINIMUM` permite ofrecer una versión mínima del cliente para los ajustes de bóvedas personales. Está desactivado de forma predeterminada. Usa una versión estable publicada y mantén activadas las firmas de las solicitudes.
