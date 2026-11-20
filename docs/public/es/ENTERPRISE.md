# Modo de empresa: Inicie sesión a través de IdP (OIDC) o Active Directory (LDAP)

Referencia traducida · [Original en ruso](../ENTERPRISE.md)

Lo mismo en el sitio: [корпоративный вход — рецепты](https://consolecrypt.dev/guide#server-idp) .
Lo mismo en el sitio web: [corporate sign-in recipes](https://consolecrypt.dev/guide#server-idp) .

Empezando con servidor **0.2.0** (protocolo **1.9**) el servidor de sincronización tiene dos modos.
login a la cuenta:

- **standard** (como antes) – registro y login por correo electrónico y contraseña
  cuenta, confirmación de correo, restablecimiento de contraseña;
- **enterprise** - login sólo a través de la fuente de la cuenta corporativa:
  OpenID Connect IdP (Identificador de entrada, AD FS, Keycloak, Google Workspace, Okta)
  OIDC) o Active Directory/LDAP (Acceso de dominio y contraseña).

Cambios ** Sólo la forma en que ingresas a tu cuenta** en el servidor de sincronización. Almacenes,
encriptación, dispositivos, protección de inicio de sesión de un nuevo dispositivo, compartir y
Los equipos están trabajando como antes. Sincronización del directorio, grupos, roles, SCIM y
Sin administración. El modo es parte de un servidor abierto, sin una construcción o licencia separadas.
Los usuarios necesitan un cliente 0.9.0 o superior.

Contenido: [как это работает](#как-это-работает) ·
[что нужно серверу](#что-нужно-серверу-от-idp)
[конфигурация](#конфигурация)
[рецепты IdP](#рецепты-oidc)
[Active Directory](#active-directory-и-ldap)
[первый вход и привязка](#первый-вход-и-привязка-аккаунтов)
[команды](#проверка-при-старте-и-команды-администратора)
[развёртывание](#развёртывание)
[ошибки](#диагностика-ошибок)
[возврат в standard](#возврат-в-режим-standard)
[English](#english).

Un directorio completo de todas las teclas con rutas y cheques Helm
[CONFIGURATION.md](../CONFIGURATION.md#enterprise-вход-cc_auth_-cc_oidc_-cc_ldap_).

## Lo que no cambia: cifrado

La contraseña de la cuenta (y ahora IdP o AD) sólo prueba identidad
servidor. Los datos abren la contraseña de almacenamiento (Argon2id en el cliente), Clave de recuperación
o aprobación de un dispositivo de confianza:

- Ni IdP, AD, ni servidor reciben nada que pueda ser descifrado.
- Después de iniciar sesión a través de IdP/AD, el dispositivo es un nuevo dispositivo normal: se aplican las reglas
  Protección contra la entrada desde un nuevo dispositivo (cuarantina, restricción de la emisión de contraseñas)
  sobre, carta si se incluye `CC_DEVICE_PROTECTION_ENABLED` y correo configurado;
- almacenamiento a bordo (contraseña de almacenamiento + Kit de recuperación) y conexión del segundo
  Los dispositivos no cambian.

## Cómo funciona.

**OIDC.** Server es un cliente confidencial de IdP, la aplicación es un cliente público
servidor, PKCE (S256) en ambos sitios:

1. La aplicación abre el navegador del sistema
   `GET /v1/auth/oidc/start?redirect_uri&code_challenge&state&device_id&login_hint`.
2. El servidor recuerda la entrada durante 10 minutos y redirige a IdP con su propio `state` .
   `nonce` y PKCE.
3. IdP devuelve el navegador a `https://<сервер>/v1/auth/oidc/callback` . servidor
   cambio de código, cheques ID token (firma RS256/PS256/ES256 a través de JWKS, exacto).
   `iss` , `aud` , `azp` , `exp` , `iat` , `nonce` , horas de tolerancia 60 segundos), dominio,
   El grupo y el MFA encuentran o crean una cuenta.
4. El navegador vuelve a la aplicación con una sola vez `login_code` (60 segundos).
   atado al PKCE de la aplicación y el dispositivo, la aplicación recibe las fichas habituales.

Direcciones de devolución admisibles a la aplicación: `http://127.0.0.1:{порт}/auth/callback`
`http://[::1]:{порт}/auth/callback` (desktop) y `consolecrypt://auth/callback`
Android, iOS . El resto de nosotros estamos rechazando. El IdP registra **sólo** dirección.
servidor `/v1/auth/oidc/callback` , las direcciones de aplicación en IdP no son necesarias.

**LDAP/AD.** La aplicación envía un login (email, UPN o `DOMAIN\user` ) y una contraseña
domain at `POST /v1/auth/ldap/login` on TLS. El servidor está buscando un usuario de servicio
Luego el bind realiza su DN con la contraseña introducida. La contraseña no se guarda
No está en una revista. Las respuestas “sin usuario” y “contraseña incorrecta” son las mismas.

**Acumulación de cuentas** Cuenta asociada con un identificador externo - OIDC `(iss, sub)`
o `objectGUID` en AD. El correo electrónico es sólo un atributo: cambiar una dirección en AD no rompe su cuenta.
Una cuenta de terceros con el mismo correo electrónico no se captura `identity_conflict` .

**Remarque (trabajadores desconectados) ** No más de una vez seguida
`CC_AUTH_RECHECK_MINUTES` el servidor pide un IdP (actualización de actualización IdP) o
AD (búsqueda por `objectGUID` ), si el usuario puede funcionar. Es una prueba.
actualizar la aplicación token y el pasaje de fondo una vez al minuto para cuentas con
sesiones activas. Si el usuario está deshabilitado, eliminado, dejado el grupo o perdido
Reclamación obligatoria, todos sus períodos de sesiones se retiran, la solicitud recibe
`account_disabled` y bloquea el perfil sincronizado. Empleado desconectado
Acceso a la sincronización de las pérdidas a más tardar `CC_AUTH_RECHECK_MINUTES` + 1
Espera un minuto. Si el IdP o AD no está disponible, las sesiones continuarán hasta
`CC_AUTH_RECHECK_GRACE_HOURS` after the last successful inspection; further update
El token responde `503 idp_unavailable` (sin recordar) hasta que la fuente regrese.

## Lo que el servidor necesita de IdP

Para cualquier proveedor de OIDC, prepárese:

| ¿Qué? | Significa. | Clave clave |
|---|---|---|
| Dirección pública del servidor | `https://sync.acme.com` (el que entró en el cliente, sin `/v1` ) | `CC_PUBLIC_URL` |
| Redirect URI en IdP | `https://sync.acme.com/v1/auth/oidc/callback` – por símbolo `CC_PUBLIC_URL` + `/v1/auth/oidc/callback` , el tipo de cliente “Web” / confidencial | — |
| Issuer | exactamente como en `https://<issuer>/.well-known/openid-configuration` (campo `issuer` , con o sin un acabado `/` - como en IdP) | `CC_OIDC_ISSUER` |
| ID de cliente | identificador de la aplicación registrada | `CC_OIDC_CLIENT_ID` |
| Cliente secreto | archivo secreto; autenticación `client_secret_basic` o `client_secret_post` | `CC_OIDC_CLIENT_SECRET_FILE` , `CC_OIDC_TOKEN_AUTH_METHOD` |
| Token de actualización de cifrado clave | 32 fichero de bytes al azar `openssl rand -hex 32` | `CC_OIDC_TOKEN_KEY_FILE` |
| Tipos de concesión | Código de Autorización con PKCE S256 y Refresh Token | — |
| Scopes | `openid email profile offline_access` (los presets tienen sus propios significados) | `CC_OIDC_SCOPES` |
| Claims at **ID token** | `sub` ; dirección de correo `email` , `preferred_username` o `upn` ; para restricción de acceso `groups` o `roles` ; para MFA - `amr` / `acr` | `CC_OIDC_EMAIL_CLAIM` , `CC_OIDC_REQUIRED_CLAIM` , `CC_OIDC_REQUIRE_MFA` |

Requisitos IdP que el servidor comprueba al inicio: descubrimiento por HTTPS
`issuer` , `authorization_endpoint` , `token_endpoint` y `jwks_uri`
HTTPS , al menos una llave RS256/PS256/ES256 en el JWKS y, si el IdP lista
Métodos PKCE, soporte para S256. El servidor lee reclamaciones sólo de ID token (userinfo no lee reclamaciones).
se solicita), por lo que los grupos, roles y correo deben ser incluidos en la ficha ID.

**Refresh token IdP* se utiliza para volver a comprobar empleados discapacitados. Si IdP es su
El usuario simplemente se conecta a través de IdP de nuevo
`CC_AUTH_RECHECK_GRACE_HOURS` ; `admin auth test --login <email>` en este caso
Informes `no IdP refresh token stored (request offline access)` .

## Configuración

Como otros ajustes: variables `CC_*` , archivo privado JSON `--config` , o
Helm (block `auth:` ). Secretos - ** Archivos solamente** Kubernetes Secret, Docker
secreto, archivo con derechos 0600; no están incluidos en el registro. Cómo poner las llaves en
Docker Compose , Helm y sistematizado en [HOSTING.md](../HOSTING.md#как-задать-любой-параметр) .

### Claves comunes

| Clave clave | Por defecto. | Nombramiento |
|---|---|---|
| `CC_AUTH_MODE` | `standard` | `standard` o `enterprise` |
| `CC_AUTH_PROVIDER` | — | `oidc` o `ldap` (en empresas solamente) |
| `CC_AUTH_DISPLAY_NAME` | — | Firma del botón "Entrar a través ..." en la aplicación, hasta 64 caracteres |
| `CC_AUTH_ALLOWED_DOMAINS` | - (nada) | Dominios de correo electrónico aceptables por coma; requeridos para vincular automáticamente las cuentas existentes |
| `CC_AUTH_AUTO_CREATE` | `true` | Crear una cuenta en el primer login |
| `CC_AUTH_RECHECK_MINUTES` | `15` | ¿Con qué frecuencia volver a comprobar el usuario (1–1440) |
| `CC_AUTH_RECHECK_GRACE_HOURS` | `24` | ¿Cuántas sesiones viven con un IdP/AD no disponible (0–720) |
| `CC_PUBLIC_URL` | — | for OIDC mandatory `https://…` : IdP dirección de retorno |

### OIDC

| Clave clave | Nombramiento |
|---|---|
| `CC_OIDC_PRESET` | `generic` , `entra` , `adfs` , `keycloak` , `google` , `okta` |
| `CC_OIDC_ISSUER` | emisor exacto (no extra `/` al final si IdP no lo escribe) |
| `CC_OIDC_CLIENT_ID` | identificador de la aplicación en IdP |
| `CC_OIDC_CLIENT_SECRET_FILE` | cliente-secret |
| `CC_OIDC_TOKEN_KEY_FILE` | Archivo con llave de encriptación de 32 bytes IdP token `openssl rand -hex 32` |
| `CC_OIDC_SCOPES` | por defecto `openid email profile offline_access` (adfs: `openid email profile allatclaims` , google: `openid email profile` |
| `CC_OIDC_EMAIL_CLAIM` | por defecto `email` (entra: `preferred_username` , adfs: `upn` |
| `CC_OIDC_REQUIRED_CLAIM` | `claim=значение` : sólo utilizar este grupo/role, por ejemplo `groups=<object-id>` ; un elemento de coincidencia es suficiente para un array |
| `CC_OIDC_REQUIRE_MFA` | `true` : demanda `mfa` (o `http://schemas.microsoft.com/claims/multipleauthn` ) en `amr` o uno de `CC_OIDC_MFA_ACR_VALUES` en `acr` |
| `CC_OIDC_MFA_ACR_VALUES` | valores `acr` que se consideran multifactoriales |
| `CC_OIDC_TOKEN_AUTH_METHOD` | `client_secret_basic` (predeterminado) o `client_secret_post` |
| `CC_OIDC_CA_FILE` | Certificado adicional de botín IdP (CCA Interna) |

Preset sustituye los valores predeterminados y comprueba los errores típicos al principio:
La entrada está prohibida `/common`, `/organizations` y `/consumers` (necesidades inquilino id).
Para el emisor AD FS debe terminar con `/adfs` , para Keycloak - contener
`/realms/` , requerido para Google `CC_AUTH_ALLOWED_DOMAINS` , y `hd` de ID token
Debe incluirse en esta lista (otros, cualquier cuenta de Google se incluiría).

El IdP de token refresh se almacena en la base de datos sólo con una clave cifrada (ChaCha20-Poly1305)
`CC_OIDC_TOKEN_KEY_FILE` .

### LDAP / Active Directory

| Clave clave | Por defecto. | Nombramiento |
|---|---|---|
| `CC_LDAP_URL` | — | `ldaps://dc1.acme.local:636` ; `ldap://` – sólo con `CC_LDAP_STARTTLS=true` |
| `CC_LDAP_STARTTLS` | `false` | STARTTLS for `ldap://` ) |
| `CC_LDAP_CA_FILE` | root | Certificado de dominio de raíz (PEM) |
| `CC_LDAP_BIND_DN` | — | contabilidad de servicios, por ejemplo `CN=svc-consolecrypt,OU=Service,DC=acme,DC=local` |
| `CC_LDAP_BIND_PASSWORD_FILE` | — | log-file |
| `CC_LDAP_BASE_DN` | — | Dónde buscar usuarios, por ejemplo `DC=acme,DC=local` |
| `CC_LDAP_USER_FILTER` | `((objectClass=user)(\)|(mail= {login} )(userPrincipalName= {login} )(sAMAccountName= {login} ) | búsqueda; entrada blindada por RFC 4515 |
| `CC_LDAP_EMAIL_ATTR` | `mail` | correo electrónico |
| `CC_LDAP_ID_ATTR` | `objectGUID` | estable-identidad |
| `CC_LDAP_REQUIRED_GROUP` | — | Grupos DN; grupos anidados son contados `LDAP_MATCHING_RULE_IN_CHAIN` |
| `CC_LDAP_TIMEOUT_SECS` | `10` | tiempo de conexión y operaciones (1–60) |
| `CC_LDAP_MAX_FAILURES` | `3` | Intentos de iniciar sesión y al usuario AD fuera de la ventana (1–100, ver a continuación) |
| `CC_LDAP_FAILURE_WINDOW_MINUTES` | `15` | ventana del mostrador de entradas infructuosas (1-1440) |
| `CC_LDAP_MAX_FAILURES_PER_IP` | `30` | Entradas infructuosas de una IP por ventana (0 - sin limitación) |

## Recetas de OIDC

En todas las recetas, el servidor está disponible en `https://sync.acme.com` , redirigir URI en IdP -
`https://sync.acme.com/v1/auth/oidc/callback` (sustituir su propio `CC_PUBLIC_URL` ).
Primero, prepare los archivos secretos:

```sh
install -d -m 700 /etc/consolecrypt/secrets
( umask 077
  openssl rand -hex 32 > /etc/consolecrypt/secrets/oidc-token-key
  # client secret из IdP, без перевода строки и без отображения на экране:
  read -rs CC_SECRET && printf '%s' "$CC_SECRET" > /etc/consolecrypt/secrets/oidc-client-secret
  unset CC_SECRET )
```

El propietario de los archivos debe ser el usuario del proceso del servidor (en el contenedor -
UID 65532, ver [развёртывание](#развёртывание) . La llave `oidc-token-key` no cambia
innecesariamente: cuando cambias la llave, los IdPs token de refresco guardados se convierten en
No legible, y los usuarios se registran una vez más. Secreto del cliente para muchos IdPs
Expiración: Haga un recordatorio, actualice el archivo cuando reemplace y
Reinicie el servidor.

Un conjunto común de llaves para todas las recetas:

```dotenv
CC_AUTH_MODE=enterprise
CC_AUTH_PROVIDER=oidc
CC_AUTH_DISPLAY_NAME=Acme SSO
CC_AUTH_ALLOWED_DOMAINS=acme.com
CC_PUBLIC_URL=https://sync.acme.com
CC_OIDC_CLIENT_SECRET_FILE=/etc/consolecrypt/secrets/oidc-client-secret
CC_OIDC_TOKEN_KEY_FILE=/etc/consolecrypt/secrets/oidc-token-key
```

### Microsoft Entra ID

1. Microsoft Entra Admin Center → ** Inscripciones de aplicaciones → Nuevo registro**
   имя « ConsoleCrypt Sync», **Cuenta en este directorio organizacional solamente**
   Redirect URI (platform **Web**)
   `https://sync.acme.com/v1/auth/oidc/callback`. No escoja plataformas de SPA o
   Móvil y Escritorio: El servidor es un cliente confidencial.
2. En **Overview**, copy **Application (client) ID**
   `CC_OIDC_CLIENT_ID` y **Directorio (teniente) ID** → emisor
   `https://login.microsoftonline.com/<tenant-id>/v2.0`.
3. **Certificados &lt; secretos → Secretos del cliente → Nuevo secreto del cliente**
   (no ID secreto) guardar para archivar `oidc-client-secret` . Recuerda la fecha de caducidad.
4. **Permisos de API**: Microsoft Graph, delegado `openid` , `email` , `profile`
   `offline_access`. Prensa **Consentimiento de administrador de gran tamaño** para evitar que los empleados vean
   solicitar el consentimiento.
5. **Configuración token → Agregar reclamo opcional → ID → `email` ** Por defecto.
   El preset utiliza `preferred_username` (generalmente UPN) como un correo electrónico. Si la UPN no lo es
   igual que la dirección de correo, pregunte `CC_OIDC_EMAIL_CLAIM=email`
   El usuario debe llenarse en el atributo de correo.
6. El acceso sólo a la gente adecuada es una opción:
   - ** Funciones de aplicación** (recomendadas): ** Funciones de aplicación → Crear papel de aplicación**, Permitido miembro
     types — Users/Groups, Value `ConsoleCrypt.User`; затем **Enterprise
     applications → ConsoleCrypt Sync → Users and groups → Add user/group** и
     назначьте роль группе. На сервере `CC_OIDC_REQUIRED_CLAIM=roles=ConsoleCrypt.User`;
   - **Reclamación de grupos**: **Configuración de fichas → Agregar grupos reclaman → Grupos de seguridad**,
     в ID token — **Group ID**; на сервере
     `CC_OIDC_REQUIRED_CLAIM=groups=<object-id группы>`. Если пользователь состоит
     более чем в 200 группах, Entra не кладёт `groups` в токен (overage), сервер
     пишет об этом предупреждение в журнал — используйте app roles или «Groups
     assigned to the application».
   Activar **Aplicaciones de precios → Propiedades → Asignación
   requerido = Sí**: entonces la entrada no emitirá la ficha a los usuarios no asignados.
7. MFA: Requiere esta política **Acceso Condicional** para esta aplicación.
   `CC_OIDC_REQUIRE_MFA=true` nuevas comprobaciones `amr` / `acr` en la ficha de identificación;
   Encienda sólo si la entrada de prueba pasa - a menos que el IdP informe
   Método de entrada, todas las entradas recibirán `mfa_required` .

```dotenv
CC_OIDC_PRESET=entra
CC_OIDC_ISSUER=https://login.microsoftonline.com/<tenant-id>/v2.0
CC_OIDC_CLIENT_ID=<application-client-id>
CC_OIDC_REQUIRED_CLAIM=roles=ConsoleCrypt.User
```

El emisor `/common`, `/organizations` y `/consumers` rechaza el preset: se necesita el inquilino id.
Un usuario discapacitado en Entra no puede actualizar el token de actualización, y el servidor
retira su sesión en la revisión más cercana.

### AD FS 2016+

1. AD FS Management → ** Grupos de Aplicación → Añadir Grupo de Aplicación
   Aplicación del servidor** (o "El navegador web accede a una aplicación web")
   cliente confidencial). Copia identificador del cliente `CC_OIDC_CLIENT_ID` .
   Redirect URI - `https://sync.acme.com/v1/auth/oidc/callback` .
2. **Configurar las credenciales de aplicación → Generar un secreto compartido**
   `oidc-client-secret`.
3. Añadir al grupo **Web API** con identificador = servidor id cliente, política
   acceso (por ejemplo, "Permite grupo específico"), permisos `openid` , `profile` ,
   `email`, `allatclaims` .
4. Issuance Transform Rules for the Web API: Send LDAP Attributes as Claims
   `E-Mail-Addresses → email` , `User-Principal-Name → upn` ; para el acceso a grupos -
   "Enviar a los miembros del grupo como una reclamación" (por ejemplo `group` = `ConsoleCrypt`
   El alcance `allatclaims` es necesario para que estas reclamaciones aparezcan en la ficha de identificación.
5. Si el certificado AD FS es emitido por un CA interno, ponga el certificado raíz (PEM) en.
   c `CC_OIDC_CA_FILE`
6. Número - `https://adfs.acme.com/adfs` : comprobar el campo `issuer` en
   `https://adfs.acme.com/adfs/.well-known/openid-configuration`.

```dotenv
CC_OIDC_PRESET=adfs
CC_OIDC_ISSUER=https://adfs.acme.com/adfs
CC_OIDC_CLIENT_ID=<client-id>
CC_OIDC_EMAIL_CLAIM=upn
CC_OIDC_REQUIRED_CLAIM=group=ConsoleCrypt
CC_OIDC_CA_FILE=/etc/consolecrypt/secrets/adfs-ca.pem
# CC_OIDC_TOKEN_AUTH_METHOD=client_secret_post   # если AD FS отклоняет Basic
```

AD FS reporta el MFA en `amr` como `http://schemas.microsoft.com/claims/multipleauthn` ;
`CC_OIDC_REQUIRE_MFA=true` entiende eso.

### Keycloak

1. Seleccione el reino (por ejemplo `acme` → **Clients → Crear cliente**: OpenID
   Conectar, ID de cliente `consolecrypt-server` , **Client autentication: On**,
   Flujo estándar: En, Ayudas de acceso directo: Off.
2. **Redirección de valor URIs: `https://sync.acme.com/v1/auth/oidc/callback`
   **Advanced → Proof Key for Code Exchange Code Challenge Method: S256**
3. **Credentials** → Secreto del cliente – en el archivo.
4. Correo electrónico: alcances del cliente `email` y `profile` deben ser por defecto para el cliente.
   Keycloak transmite `email_verified` : si la dirección no está confirmada, la dirección existente
   Su cuenta de contraseña no se vinculará automáticamente `email_not_verified` .
5. Grupo: **Client scopes → consolacrypt-servidor-dedicado → Añadir mapper →
   configuración → Composición del grupo**, Nombre de la reclamación de Token `groups` , ** Grupo completo
   path: Off** (otros el valor será `/consolecrypt-users` ), Add to ID token: On.
   Luego `CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users` . En lugar de un grupo,
   Utilice el rol del cliente y el mapper "Papel del cliente del usuario".
6. Usuarios deshabilitados en **Usuarios → Habilitado: Off** - su refrescante token
   Deja de funcionar, y el servidor cancela la sesión en la revisión más cercana.

```dotenv
CC_OIDC_PRESET=keycloak
CC_OIDC_ISSUER=https://sso.acme.com/realms/acme
CC_OIDC_CLIENT_ID=consolecrypt-server
CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users
```

### Google Workspace

1. Google Cloud Console → **API &amp; Services → OAuth
   pantalla de consentimiento**: Tipo de usuario**Internal** (sólo sus usuarios)
   Organizations), scopes `openid`, `email`, `profile` .
2. **Credentials → Crear credenciales → OAuth cliente ID → Aplicación web**,
   Autorizada redireccion URI `https://sync.acme.com/v1/auth/oidc/callback` .
   ID de cliente → `CC_OIDC_CLIENT_ID` y Secreto de cliente en el archivo.
3. El emisor no necesita ser especificado `https://accounts.google.com` . Preset lo pide.
   `access_type=offline` , `prompt=consent` ; `offline_access`
   `CC_OIDC_SCOPES` Google rechaza, y el servidor no funcionará con él.
4. `CC_AUTH_ALLOWED_DOMAINS` es obligatorio: el servidor sólo acepta cuentas de espacio de trabajo.
   Cuya `hd` ficha de identificación está en la lista. Una cuenta personal de Google con una “corporación”
   La dirección `hd` no entra ni entrará.
5. Google no transfiere grupos y MFA a token ID: limitar el número de usuarios
   Las aplicaciones con consola Admin, verificación de 2 pasos permiten la política
   Workspace. `CC_OIDC_REQUIRE_MFA=true` para el servidor de Google no aceptará.

```dotenv
CC_OIDC_PRESET=google
CC_AUTH_ALLOWED_DOMAINS=acme.com
CC_OIDC_CLIENT_ID=<client-id>.apps.googleusercontent.com
```

### Okta

1. Consola de Admin → ** Aplicaciones → Crear Integración de App → OIDC - OpenID
   Conectar → Aplicación Web**. Tipo de concesión: Código de Autorización y **Refresh Token**.
   Sign-in redirect URI `https://sync.acme.com/v1/auth/oidc/callback`
2. **Cliente autenticación: Secreto del cliente**, **Requiere PKCE como adicional
   Incluir la verificación**. ID de cliente y secreto - en `CC_OIDC_CLIENT_ID` y archivo.
3. **Asignaciones**: Asignar la solicitud al grupo. Para grupos de reclamos en token ID:
   **Regístrate → OpenID Connect ID Token → Grupos reclaman** – nombre `groups`
   Matches regex `ConsoleCrypt.*` (reclamación del servidor de autorización interna)
   `groups` se añade a **Security → API → Autorization Servers → Claims**.
4. Número (org domain `https://acme.okta.com` ) o servidor de autorización
   `https://acme.okta.com/oauth2/default` ); debe ser exactamente lo mismo que `issuer` .
   en el descubrimiento. Para `offline_access` en su propio margen de servidor de autorización
   Debe estar permitida por una política de acceso.

```dotenv
CC_OIDC_PRESET=okta
CC_OIDC_ISSUER=https://acme.okta.com
CC_OIDC_CLIENT_ID=<client-id>
CC_OIDC_REQUIRED_CLAIM=groups=ConsoleCrypt-Users
```

### Cualquier otro proveedor de OIDC

Uso `CC_OIDC_PRESET=generic` (valor predeterminado). Míralo.

1. Cliente – confidencial, Código de Autorización + PKCE S256, Refresh Token
   redirect URI `https://sync.acme.com/v1/auth/oidc/callback` .
2. La ficha de identificación está firmada RS256, PS256 o ES256 y contiene `sub`
   `email` u otra reclamación - `CC_OIDC_EMAIL_CLAIM` y, de ser necesario, reclamación
   grupos para `CC_OIDC_REQUIRED_CLAIM` .
3. Discovery `<issuer>/.well-known/openid-configuration` está disponible en el servidor.
   HTTPS ( CA interna - `CC_OIDC_CA_FILE` ), su `issuer` es simbólicamente igual a
   `CC_OIDC_ISSUER`.
4. Si el IdP no acepta el secreto en el encabezado Básico, pregunte
   `CC_OIDC_TOKEN_AUTH_METHOD=client_secret_post`.
5. Para el MFA, averigüe qué `amr` o `acr` IdP escribe en token de identificación; no estándar
   Listar los valores `acr` en `CC_OIDC_MFA_ACR_VALUES` .

```dotenv
CC_OIDC_PRESET=generic
CC_OIDC_ISSUER=https://idp.acme.com
CC_OIDC_CLIENT_ID=consolecrypt-server
CC_OIDC_SCOPES=openid email profile offline_access
CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users
```

## Active Directory y LDAP

1. ** Contabilidad de servicios** con derechos mínimos: usuario de dominio regular
   Puede leer el directorio, no se requieren derechos administrativos. Contraseña sin término
   Acciones (o con el procedimiento de intercambio: Actualizar el archivo y reiniciar el servidor):

   ```powershell
   New-ADUser -Name svc-consolecrypt -Path "OU=Service,DC=acme,DC=local" `
     -AccountPassword (Read-Host -AsSecureString) -Enabled $true -PasswordNeverExpires $true
   ```

   Contraseña de archivo `ldap-bind-password` y DN de archivo `CC_LDAP_BIND_DN` .
2. **LDAPS**: Los controladores de dominio deben tener un certificado (AD CS "Domain")
   Controlador o Kerberos Autenticación. Certificado de exportación CA Root
   en PEM - `CC_LDAP_CA_FILE` . El nombre en `CC_LDAP_URL` debe ser igual que el nombre en
   Certificado de Controlador (nombre DNS, no IP). Puedes comprobar la cadena desde el host
   servidor: `openssl s_client -connect dc1.acme.local:636 -CAfile ad-ca.pem </dev/null`
   (expected `Verify return code: 0 (ok)` ). Si sólo el puerto 389 está disponible,
   Uso `ldap://dc1.acme.local:389` y `CC_LDAP_STARTTLS=true` ; simple
   `ldap://` sin TLS, el servidor no aceptará.
3. **Etiqueta de búsqueda**: el usuario predeterminado está en `mail` .
   `userPrincipalName` o `sAMAccountName` , por lo que puede ingresar correo electrónico, UPN o
   `ACME\alice`. Si la búsqueda encuentra múltiples entradas, la entrada es rechazada. Tuyo.
   El filtro debe contener `{login}` .
4. ** Grupo de acceso, por ejemplo `CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local`;
   Los grupos adjuntos se contabilizan mediante la Regla AD `LDAP_MATCHING_RULE_IN_CHAIN`.
   La membresía se comprueba en la entrada y en cada recheck.
5. **Identificador estable** - `objectGUID` : cambio de correo electrónico, UPN, o
   El renombramiento de la cuenta no rompe la unión. Por `admin identity link` , llévalo.
   Entonces: `(Get-ADUser alice).ObjectGUID` . Cuentas desconectadas `userAccountControl`
   con la bandera `ACCOUNTDISABLE` no entran y pierden sesiones cuando se revisan.
6. **Comprobación de búsqueda** antes de activar el modo (palabra solicitada, no
   transmitido por argumento:

   ```sh
   ldapsearch -H ldaps://dc1.acme.local:636 -D 'CN=svc-consolecrypt,OU=Service,DC=acme,DC=local' -W \
     -b 'DC=acme,DC=local' '(sAMAccountName=alice)' mail objectGUID userAccountControl
   ```

7. **Política de bloqueo de dominios**: conjunto `CC_LDAP_MAX_FAILURES` debajo del umbral
   bloqueo (ver abajo).

```dotenv
CC_AUTH_MODE=enterprise
CC_AUTH_PROVIDER=ldap
CC_AUTH_DISPLAY_NAME=ACME
CC_AUTH_ALLOWED_DOMAINS=acme.com
CC_LDAP_URL=ldaps://dc1.acme.local:636
CC_LDAP_CA_FILE=/etc/consolecrypt/secrets/ad-ca.pem
CC_LDAP_BIND_DN=CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
CC_LDAP_BIND_PASSWORD_FILE=/etc/consolecrypt/secrets/ldap-bind-password
CC_LDAP_BASE_DN=DC=acme,DC=local
CC_LDAP_REQUIRED_GROUP=CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
CC_LDAP_MAX_FAILURES=3
CC_LDAP_FAILURE_WINDOW_MINUTES=30
```

Simple `ldap://` sin el servidor STARTTLS rechaza al principio: contraseña de dominio no debe
En línea en texto simple. contraseña vacía es rechazada antes de acceder a AD (otros
Sería un vínculo anónimo.

El servidor está diseñado para Active Directory. Con otro directorio de LDAP, pregúntale a tu propio.
`CC_LDAP_USER_FILTER` , `CC_LDAP_EMAIL_ATTR` y estable `CC_LDAP_ID_ATTR`
(por ejemplo `entryUUID`); la inspección `CC_LDAP_REQUIRED_GROUP` utiliza la norma AD
`LDAP_MATCHING_RULE_IN_CHAIN` que otro directorio puede no apoyar
Compruebe la entrada con el comando `admin auth test --login` .

**Protección de las cuentas AD de bloquear a través del servidor.** Los bonos no exitosos se contabilizan en
Política de bloqueo de dominios, así que un atacante podría bloquear a los empleados
`/v1/auth/ldap/login` . El servidor cuenta los intentos en PostgreSQL (común para todos)
Notas) – en el inicio de sesión y en el usuario encontrado AD (deletreos diferentes)
Un nombre de usuario – correo electrónico, UPN, `DOMAIN\user` – se cuenta juntos:
`CC_LDAP_MAX_FAILURES` intentos de `CC_LDAP_FAILURE_WINDOW_MINUTES`
Los intentos son rechazados ** sin recurso a AD** `429 rate_limited` con `Retry-After`
hasta que pase la ventana. Unknown login se comporta de la misma manera, existencia
El usuario no es divulgado. Una entrada exitosa baja el medidor. Por separado.
Se consideran entradas fallidas de una sola IP `CC_LDAP_MAX_FAILURES_PER_IP`.

**Importante:** `CC_LDAP_MAX_FAILURES` debe ser **menos que el umbral de cierre contable
Registros de datos en la política de dominio ( umbral de cierre de cuentas) y
`CC_LDAP_FAILURE_WINDOW_MINUTES` - no menos que la ventana de reajuste del contador de bloqueo
(Reset account lockout counter after). De lo contrario, el registro en el servidor todavía se puede hacer.
bloquea el registro. Ejemplo: umbral de dominio 5 intentos en 30 minutos
`CC_LDAP_MAX_FAILURES=3`, `CC_LDAP_FAILURE_WINDOW_MINUTES=30` .

## Primera sesión y enlace de la cuenta

En cada login, el servidor busca la cuenta de la siguiente manera:

1. * Cuenta conocida `(iss, sub)` para OIDC `objectGUID` para LDAP
   Inicie sesión en una cuenta vinculada. Si la dirección IdP/AD ha cambiado y no está ocupada
   Con otra cuenta, se actualiza la dirección de la cuenta.
2. **Una cuenta nueva y una cuenta con la misma dirección ya existe**
   establecido en modo estándar). Se vincula automáticamente sólo si:
   Dominio de dirección está en `CC_AUTH_ALLOWED_DOMAINS` ; la cuenta aún no tiene un dominio externo
   IdP no not reported `email_verified=false` ; account not disabled Password.
   se elimina la cuenta, se abren las sesiones con una contraseña, se terminan los dispositivos y
   Las bóvedas se conservan. De lo contrario, la entrada recibe `409 identity_conflict` con una causa en
   `linked_to_other_identity` , `link_requires_allowed_domain` o
   `email_not_verified` - corbata a mano:

   ```sh
   consolecrypt-server admin identity link --email alice@acme.com --subject <sub или objectGUID>
   ```

   `--subject` - valor de reclamación `sub` de la ficha ID del usuario (en Keycloak - ID)
   usuario en la consola, en Okta - usuario id `00u…` ; ID de entrada `sub` no
   Es igual que el ID de objetos `oid` o `objectGUID` para AD. Sin `--issuer` utilizado
   configurado `CC_OIDC_ISSUER` o base DN.
3. **Se crea una nueva cuenta sin cuenta**: se crea una cuenta con una cuenta confirmada
   dirección si `CC_AUTH_AUTO_CREATE=true` . A `false` la entrada recibe `403` s
   Razón `not_provisioned` : sólo se incluyen las cuentas creadas por adelantado.
   (en modo estándar) o obligado por comando `admin identity link` .

Con una cuenta sin una dirección de correo `email_missing` o con un dominio fuera
`CC_AUTH_ALLOWED_DOMAINS` la entrada es rechazada con `403 domain_not_allowed` .

## Transition from standard to enterprise

1. Actualizar el servidor a 0.2.0 o más tarde y respaldar la base de datos (migración)
   `0011_enterprise_auth` sólo añade tablas y hace
   `users.password_hash` opcional).
2. Registrar la aplicación en IdP o crear una cuenta de servicio en AD (recetas)
   Ponga secretos en los archivos/Secret.
3. Compruebe la lista de cuentas: `admin list-users` . Decide qué dominios
   List in `CC_AUTH_ALLOWED_DOMAINS` to allow existing accounts
   Se adhirieron.
4. Enciende `CC_AUTH_MODE=enterprise` y reinicie el servidor. Comprobación.
   `admin auth status` , `admin auth test` y `"auth": {"mode": "enterprise", …}` en
   `/v1/meta`. Actualizar aplicaciones a la versión con soporte para inicio de sesión empresarial
   (cliente 0.9.0).
5. Inicia sesión con tu cuenta y comprueba `admin list-users`
   (columna `sign_in` ).

Después de la inclusión:

- registro, inicio de contraseñas, cambio de contraseña y contraseña, confirmación de correo
  Responder `403 enterprise_auth_required` ; las aplicaciones más antiguas muestran un error
  inicio de sesión con el texto “Actualizar la aplicación”;
- Las sesiones abiertas por contraseña antes de cambiar no se actualizan
  `enterprise_auth_required` : El usuario inicia sesión una vez a través de IdP/AD.
- Las cuentas existentes están vinculadas por reglas
  [выше](#первый-вход-и-привязка-аккаунтов);
- Se guardan dispositivos y almacenamientos de cuentas; Dispositivos que ya han sido
  registrado, entra con la firma de la llave del dispositivo, como antes.

## Comprueba el inicio y los comandos del administrador

Al iniciarse, el servidor revisa la configuración y baja con un error comprensible: para OIDC,
Archivos secretos, descubrimiento, partido `issuer` , JWKS con RS256/PS256/ES256 teclas;
para LDAP – archivos, conexión, TLS, contabilidad de servicios bind, presencia de base DN y grupo.

```sh
consolecrypt-server admin auth status                       # режим, провайдер, последняя проверка, привязанные аккаунты
consolecrypt-server admin auth test                         # повторить проверки при старте
consolecrypt-server admin auth test --login alice@acme.com  # LDAP: найти пользователя, группа, отключён ли
consolecrypt-server admin auth test --login alice@acme.com --password-stdin   # LDAP: пробный bind
consolecrypt-server admin auth test --login alice@acme.com  # OIDC: перепроверить аккаунт в IdP сейчас
consolecrypt-server admin identity link --email alice@acme.com --subject <sub или objectGUID>
consolecrypt-server admin identity unlink --email alice@acme.com
consolecrypt-server admin session revoke --email alice@acme.com
consolecrypt-server admin list-users                        # колонка sign_in: password, oidc, ldap
```

OIDC `admin auth test --login` hace un verdadero cheque: si el IdP falla,
Se están retirando las sesiones de la cuenta. LDAP `--password-stdin` realiza el bind real y
Se incluye en la política de bloqueo de dominios. En los equipos Docker Compose y Kubernetes
Lanzado dentro del contenedor: `cc_compose exec -T server
/usr/local/bin/consolecrypt-servidor admin auth status ` или ` kubectl-n consolacrypt
exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-servidor admin auth status'.

## Journal

En el registro del servidor (y en `audit_events` ) son entradas escritas `login` , `metadata.method` =
`oidc` / `ldap` ), creación de cuenta, anclaje `identity_linked` / `identity_unlinked` ,
Fallos con causa `login_failed` , `metadata.reason` : `domain_not_allowed` ,
`email_missing`, `group_required` , `mfa_required` , `account_disabled` .
`not_provisioned` , `linked_to_other_identity` , `link_requires_allowed_domain`
`email_not_verified` y para la identificación incorrecta token – `iss` , `aud` , `azp` , `exp` .
`iat` , `nbf` , `nonce` , `sub` , `unknown_kid` , `bad_signature` , `unsupported_alg` .
`malformed` ), revisiones de la sesión por re-checking `enterprise_access_revoked` , y
administrador. Las contraseñas, el secreto del cliente, las fichas y los códigos de inicio de sesión no entran en el registro.
Metrices: `cc_enterprise_logins_total{method,result}`
`cc_enterprise_rechecks_total{result}`, `cc_ldap_lockout_guard_total{scope}` ,
`cc_oidc_jwks_refetch_total`.

## Despliegue

Ejemplos completos para cada método de instalación - en
[HOSTING.md](../HOSTING.md#пример-корпоративный-вход-через-entra-id).

### Helm.

```yaml
config:
  publicUrl: https://sync.acme.com
auth:
  mode: enterprise
  provider: oidc            # или ldap
  displayName: Acme SSO
  allowedDomains: [acme.com]
  oidc:
    preset: entra
    issuer: https://login.microsoftonline.com/<tenant-id>/v2.0
    clientId: <client-id>
    requiredClaim: roles=ConsoleCrypt.User
    existingSecret: consolecrypt-oidc   # ключи client-secret, token-key
  ldap:
    url: ldaps://dc1.acme.local:636
    bindDn: CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
    baseDn: DC=acme,DC=local
    requiredGroup: CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
    existingSecret: consolecrypt-ldap   # ключ bind-password; caKey: ca.pem
    caKey: ca.pem
```

```sh
kubectl -n consolecrypt create secret generic consolecrypt-oidc \
  --from-file=client-secret=./oidc-client-secret --from-file=token-key=./oidc-token-key
kubectl -n consolecrypt create secret generic consolecrypt-ldap \
  --from-file=bind-password=./ldap-bind-password --from-file=ca.pem=./ad-ca.pem
```

Secreto montado para la lectura sólo en `/run/secrets/consolecrypt-auth`
`defaultMode: 0440` , grupo pod - 65532); el gráfico en sí mismo sustituye los caminos `*_FILE`
comprueba campos obligatorios y rechaza `ldap://` sin `starttls: true` y OIDC sin
`config.publicUrl` con `https://` Las llaves restantes `scopes` , `emailClaim`
`requireMfa`, `mfaAcrValues` , `tokenAuthMethod` , `caKey` , `userFilter` .
`emailAttr`, `idAttr` , `timeoutSecs` , `maxFailures` , `failureWindowMinutes` .
`maxFailuresPerIp` ) se describen en `values.yaml` y [CONFIGURATION.md](CONFIGURATION.md) .

### Docker Compose

El principal `compose.yaml` de la fuente no cambia. Ajustes y secretos
El modo empresarial se mantiene en el directorio **privado ** de la instalación junto a
`server.env` `$CC_INSTALL_DIR` of [HOSTING.md](../HOSTING.md#docker-compose) rather than in
clon del repositorio.

1. Guardar secretos OIDC (o LDAP y CA directorio de acceso contraseña) en
   `$CC_INSTALL_DIR/secrets/`. Componga sin Swarm los monta como archivos regulares
   El propietario y los derechos de acogida, y el servidor funciona como UID 65532 – hacer archivos
   legible sólo para él:

   ```sh
   mkdir -p "$CC_INSTALL_DIR/secrets"
   ( umask 077
     openssl rand -hex 32 > "$CC_INSTALL_DIR/secrets/oidc-token-key"
     # client secret из IdP, без перевода строки:
     read -rs CC_SECRET && printf '%s' "$CC_SECRET" > "$CC_INSTALL_DIR/secrets/oidc-client-secret" )
   sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
   sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
   ```

2. Crear `$CC_INSTALL_DIR/compose.override.yaml` . Apunten el camino.
   **Absoluto**: Composicion relativo cuenta del primer catálogo
   El archivo, es decir, de la fuente. Sustitución `/home/admin/.config/consolecrypt-docker`
   por su cuenta `$CC_INSTALL_DIR` :

   ```yaml
   services:
     server:
       environment:
         CC_PUBLIC_URL: https://sync.acme.com
         CC_AUTH_MODE: enterprise
         CC_AUTH_PROVIDER: oidc
         CC_AUTH_ALLOWED_DOMAINS: acme.com
         CC_OIDC_PRESET: keycloak
         CC_OIDC_ISSUER: https://sso.acme.com/realms/acme
         CC_OIDC_CLIENT_ID: consolecrypt-server
         CC_OIDC_CLIENT_SECRET_FILE: /run/secrets/oidc-client-secret
         CC_OIDC_TOKEN_KEY_FILE: /run/secrets/oidc-token-key
       secrets: [oidc-client-secret, oidc-token-key]
   secrets:
     oidc-client-secret:
       file: /home/admin/.config/consolecrypt-docker/secrets/oidc-client-secret
     oidc-token-key:
       file: /home/admin/.config/consolecrypt-docker/secrets/oidc-token-key
   ```

3. Conecte el archivo override. Automáticamente, Compose recoge.
   `compose.override.yaml` sólo desde el directorio del proyecto y sólo sin `-f`
   `cc_compose` de HOSTING.md transmite `-f` , por lo que añadir un segundo `-f` :

   ```sh
   cc_compose() {
     docker compose --env-file "$CC_INSTALL_DIR/server.env" \
       -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
       --profile https "$@"
   }
   cc_compose config --quiet
   cc_compose up -d --wait --wait-timeout 180 server
   curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
   ```

   En `/v1/meta` debe aparecer `"auth": {"mode": "enterprise", …}` . Comprobación.
   configura con el comando `cc_compose exec -T server /usr/local/bin/consolecrypt-servidor
   Prueba de administración auth. Para LDAP en lugar de `CC_OIDC_*` preguntar `CC_LDAP_*` y secretos
   `ldap-bind-password` `CC_LDAP_BIND_PASSWORD_FILE` y si es necesario
   `ldap-ca.pem` `CC_LDAP_CA_FILE`

Utilice la misma función para todos los comandos adicionales (Update, `admin` ).
backups: sin el segundo `-f` Compose recreará el servidor en el estándar
Modo.

### binario

Las mismas claves en privado JSON `--config /etc/consolecrypt/server.json` , derechos
0600) o en un entorno de servicio; las trayectorias `*_FILE` indican archivos con 0600 derechos,
Servicios de propiedad del usuario.

## Diagnostico de errores

| Ya lo ves. | Razón. | Qué hacer. |
|---|---|---|
| El servidor no comienza: `OIDC sign-in requires CC_PUBLIC_URL (https://…)` | No `CC_PUBLIC_URL` o no lo es `https://` | Proveer la dirección pública del servidor; en Helm - `config.publicUrl` |
| `CC_OIDC_ISSUER: Entra ID multi-tenant endpoints … are not allowed` | emisor con `/common` , `/organizations` o `/consumers` | `https://login.microsoftonline.com/<tenant-id>/v2.0` |
| `CC_OIDC_ISSUER: for adfs expected …/adfs` , `for keycloak expected …/realms/<realm>` | emisor no se ajusta al preset | Copia `issuer` del descubrimiento IdP |
| `OIDC discovery: issuer mismatch` | `CC_OIDC_ISSUER` difiere de `issuer` en el descubrimiento (a menudo final `/` ) | copiar el valor simbólicamente |
| `OIDC discovery at …` : error de consulta o certificado | El servidor no recibe un IdP en HTTPS o no confía en su CA. | check DNS, acceso de salida y proxy; CA interna – `CC_OIDC_CA_FILE` |
| `… none of RS256, PS256, ES256` o `does not support PKCE S256` | Marcas de identificación con o sin PKCE S256 | Habilitar RS256/ES256 y PKCE S256 para el cliente |
| `CC_OIDC_CLIENT_SECRET_FILE (…): cannot open the file` / `file is empty` | Carril incorrecta, UID 65532 no tiene derechos, archivo vacío | `chown 65532:65532` , `chmod 0400` , contenido |
| `CC_OIDC_TOKEN_KEY_FILE (…): expected 32 random bytes …` | no 64 hex, no base64 32 bytes | `openssl rand -hex 32 > oidc-token-key` |
| `CC_OIDC_PRESET=google requires CC_AUTH_ALLOWED_DOMAINS` | Google no tiene una lista de dominios. | Solicitar dominios del espacio de trabajo |
| IdP revela el error de redirección URI | IdP tiene una dirección de retorno diferente. | `CC_PUBLIC_URL` + `/v1/auth/oidc/callback` , tipo de cliente Web |
| `403 domain_not_allowed` `email_missing` ) | dominio exterior `CC_AUTH_ALLOWED_DOMAINS` o no hay dirección en la ficha ID | `CC_OIDC_EMAIL_CLAIM` (Entra: `email` vs `preferred_username` ), atributo de correo, lista de dominios |
| `403 group_required` | no reclamación de `CC_OIDC_REQUIRED_CLAIM` o usuario fuera del grupo `CC_LDAP_REQUIRED_GROUP` | Agregar reclamo a **ID token**, nombre de cheque (Keycloak: Full group path Off), Entrada: overage ⇩ 200 grupos → funciones de app |
| `403 mfa_required` | The IdP did not report the MFA at `amr` / `acr` | desactivar el MFA en la política del IdP; si no es estándar `acr` – `CC_OIDC_MFA_ACR_VALUES`; de lo contrario, desactivar `CC_OIDC_REQUIRE_MFA` |
| `409 identity_conflict` | la dirección pertenece a una cuenta vinculada a otra cuenta, o el dominio no está listado, o `email_verified=false` | `admin identity link` / `unlink` ; añadir dominio a `CC_AUTH_ALLOWED_DOMAINS` |
| `403` con causa `not_provisioned` | `CC_AUTH_AUTO_CREATE=false` , sin cuenta | Crear/enlazar una cuenta o habilitar la creación automática |
| `503 idp_unavailable` | IdP / directorio no está disponible más `CC_AUTH_RECHECK_GRACE_HOURS` | restaurar el acceso; `admin auth status` mostrará el último cheque |
| Empleados desconectados, pero aún sincronizados | Aún no revisado o no refrescante IdP token | esperar hasta `CC_AUTH_RECHECK_MINUTES` + 1 min; `admin session revoke` ; `admin auth test --login` |
| `CC_LDAP_URL: plain ldap:// is refused` | `ldap://` sin STARTTLS | `ldaps://…:636` o `CC_LDAP_STARTTLS=true` |
| `LDAP …: cannot connect (network or TLS certificate problem)` | red, puerto, nombre no es el mismo que el certificado, el CA equivocado | DNS nombre del certificado `CC_LDAP_CA_FILE` , `openssl s_client` |
| `LDAP TLS: no system root certificates found` | imagen carece de raíz | `CC_LDAP_CA_FILE` |
| `service account bind rejected (check CC_LDAP_BIND_DN and password)` | DN incorrecto o contraseña de inicio de servicio, registro discapacitados | comprobar el DN, el archivo de contraseña sin caracteres innecesarios, el estado de la contabilidad |
| `LDAP base DN … not found` / `CC_LDAP_REQUIRED_GROUP … not found` | typo | copiar el DN del directorio |
| `401 invalid_credentials` con la contraseña correcta | cuenta discapacitada, bloqueada, contraseña caducada o búsqueda encontrada varios registros | Revise la cuenta en AD; especifique `CC_LDAP_USER_FILTER` |
| `429 rate_limited` en la entrada LDAP | сработала защита от блокировки `CC_LDAP_MAX_FAILURES` или `CC_LDAP_MAX_FAILURES_PER_IP` ) | Espera la ventana `CC_LDAP_FAILURE_WINDOW_MINUTES` ; comprobar quién recoge la contraseña |

## Volver al modo estándar

**No hay entrada de contraseña de emergencia en modo de empresa.** Si IdP o AD no está disponible
o configurado incorrectamente, primero `admin auth status` y `admin auth test` . Y...
Pase temporalmente a la gente con la contraseña:

1. Pregunta `CC_AUTH_MODE=standard` (en Helm – `auth.mode: standard` ) y reiniciar
   servidor. Las claves `CC_OIDC_*` y `CC_LDAP_*` no se pueden eliminar.
   El interruptor reverso es el cambio de una tecla.
2. Las cuentas vinculadas no tienen una contraseña: configurarla con un comando
   `admin set-password --email … --password-stdin` (o emite el código)
   `admin reset-token --email …`. Su contraseña de cuenta todavía no se abre.
   Bóveda.
3. Se mantienen las referencias al IdP/AD. Cuando el Enterprise esté habilitado, ingrese de nuevo
   Sólo a través de IdP/AD, y la contraseña se elimina la próxima vez que el usuario inicie sesión.
   Para eliminar la unión para siempre - `admin identity unlink --email …`

## Errores para aplicaciones (Protocolo 1.9)

| Código. | HTTP | Cuándo |
|---|---|---|
| `enterprise_auth_required` | 403 | login/registración/password reset en el servidor de la empresa; sesión sin vinculante |
| `identity_conflict` | 409 | e-mail pertenece a una cuenta de otra fuente o el enlace requiere un administrador |
| `domain_not_allowed` | 403 | dominio de correo electrónico no está en `CC_AUTH_ALLOWED_DOMAINS` o no cuenta de correo electrónico |
| `group_required` | 403 | No obligatorio grupo/role/claim |
| `mfa_required` | 403 | IdP no le dijo al MFA |
| `idp_unavailable` | 503 | IdP o AD no está disponible (repetir más tarde) |
| `account_disabled` | 403 | Registro de personas discapacitadas; retiro de todas las sesiones |
| `invalid_credentials` | 401 | incorrect login / contraseña AD, invalid ID token, repetition or substitution `login_code` |
| `rate_limited` | 429 | límite de intento (incluido la protección de la cuenta AD de bloquear) |

Detalles del protocolo - en [PROTOCOL_CHANGELOG.md](https://github.com/evsikovas/consolecrypt-server/blob/main/PROTOCOL_CHANGELOG.md) .
tipos en `cc_protocol::enterprise_auth` .

---
