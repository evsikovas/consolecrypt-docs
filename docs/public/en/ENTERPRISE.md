# Enterprise mode: Sign in via IdP (OIDC) or Active Directory (LDAP)

Translated reference · [Russian source](../ENTERPRISE.md)

> Same thing on the site: [корпоративный вход — рецепты](https://consolecrypt.dev/guide#server-idp).
> Same on the website: [corporate sign-in recipes](https://consolecrypt.dev/guide#server-idp) .

Starting with server **0.2.0** (protocol **1.9**) the synchronization server has two modes.
login to the account:

- **standard** (as before) – registration and login by email and password
  account, mail confirmation, password reset;
- **enterprise** - login only through the corporate account source:
  OpenID Connect IdP (Entra ID, AD FS, Keycloak, Google Workspace, Okta)
  OIDC) or Active Directory/LDAP (Domain Login and Password).

Changes ** Only the way you log in to your account** on the synchronization server. Warehouses,
encryption, devices, login protection from a new device, sharing and
The teams are working as before. Synchronization of directory, groups, roles, SCIM and
No admin. Mode is part of an open server, without a separate build or license.
Users need a client 0.9.0 or higher.

Content: [как это работает](#как-это-работает) ·
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

A complete directory of all keys with Helm paths and checks
[CONFIGURATION.md](../CONFIGURATION.md#enterprise-вход-cc_auth_-cc_oidc_-cc_ldap_).

## What doesn't change: encryption

Account password (and now IdP or AD instead) only proves identity
server. Data opens the storage password (Argon2id on the client), Recovery Key
or approval of a trusted device:

- Neither IdP, AD, nor server receive anything that can be decrypted.
- After logging in via IdP/AD, the device is a normal new device: the rules apply
  Protection against login from a new device (quarantine, restriction of password issuance)
  envelope, letter if included `CC_DEVICE_PROTECTION_ENABLED` and configured mail;
- onboarding storage (storage password + Recovery Kit) and connecting the second
  The devices don't change.

## How it works.

**OIDC.** Server is a confidential IdP client, application is a public client
server, PKCE (S256) on both sites:

1. The application opens the system browser to
   `GET /v1/auth/oidc/start?redirect_uri&code_challenge&state&device_id&login_hint`.
2. The server remembers the input for 10 minutes and redirects to IdP with its own `state`.
   `nonce` and PKCE.
3. IdP returns the browser to `https://<сервер>/v1/auth/oidc/callback`. server
   exchanges code, checks ID token (signature RS256/PS256/ES256 via JWKS, exact).
   `iss` , `aud` , `azp` , `exp` , `iat` , `nonce` , tolerance hours 60 seconds), domain,
   The group and the MFA find or create an account.
4. The browser returns to the application with a one-time `login_code` (60 seconds).
   tied to the PKCE of the application and the device, the application receives the usual tokens.

Allowable return addresses to the application: `http://127.0.0.1:{порт}/auth/callback`
`http://[::1]:{порт}/auth/callback` (desktop) and `consolecrypt://auth/callback`
Android, iOS. The rest of us are rejecting. The IdP registers **only** address.
server `/v1/auth/oidc/callback`, application addresses in IdP are not required.

**LDAP/AD.** The application sends a login (email, UPN or `DOMAIN\user`) and a password
domain at `POST /v1/auth/ldap/login` on TLS. The server is looking for a service user
Then the bind performs its DN with the entered password. Password is not saved
It's not in a magazine. The answers “no user” and “incorrect password” are the same.

**Account binding.** Account associated with an external identifier - OIDC `(iss, sub)`
or `objectGUID` in AD. Email is only an attribute: changing an address in AD does not break your account.
A third party account with the same email is not captured `identity_conflict`.

**Recheck (disconnected employees) ** No more than once in a row
`CC_AUTH_RECHECK_MINUTES` the server asks for an IdP (update refresh token IdP) or
AD (search by `objectGUID`), whether the user can work. It's a test.
update the token application and background passage once a minute for accounts with
active sessions. If the user is disabled, deleted, left the group or lost
mandatory claim, all its sessions are withdrawn, the application receives
`account_disabled` and blocks the synchronized profile. Disconnected employee
Loses synchronization access no later than `CC_AUTH_RECHECK_MINUTES` + 1
Wait a minute. If the IdP or AD is not available, the sessions will continue until
`CC_AUTH_RECHECK_GRACE_HOURS` after the last successful inspection; further update
The token responds `503 idp_unavailable` (without recall) until the source returns.

## What the server needs from IdP

For any OIDC provider, prepare:

| What? | Meaning. | Key key |
|---|---|---|
| Public address of the server | `https://sync.acme.com` (the one entered in the client, without `/v1`) | `CC_PUBLIC_URL` |
| Redirect URI in IdP | `https://sync.acme.com/v1/auth/oidc/callback` – by symbol `CC_PUBLIC_URL` + `/v1/auth/oidc/callback`, client type “Web” / confidential | — |
| Issuer | exactly as in `https://<issuer>/.well-known/openid-configuration` (field `issuer`, with or without a finishing `/` - as in IdP) | `CC_OIDC_ISSUER` |
| Client ID | identifier of registered application | `CC_OIDC_CLIENT_ID` |
| Secret client | secret file; authentication `client_secret_basic` or `client_secret_post` | `CC_OIDC_CLIENT_SECRET_FILE`, `CC_OIDC_TOKEN_AUTH_METHOD` |
| Key encryption refresh token | 32 random bytes file `openssl rand -hex 32` | `CC_OIDC_TOKEN_KEY_FILE` |
| Grant types | Authorization Code with PKCE S256 and Refresh Token | — |
| Scopes | `openid email profile offline_access` (presets have their own meanings) | `CC_OIDC_SCOPES` |
| Claims at **ID token** | `sub`; mail address `email`, `preferred_username` or `upn`; for access restriction `groups` or `roles`; for MFA - (`amr` / `acr` | `CC_OIDC_EMAIL_CLAIM`, `CC_OIDC_REQUIRED_CLAIM`, `CC_OIDC_REQUIRE_MFA` |

IdP requirements that the server checks at startup: discovery by HTTPS
coincidence `issuer`, `authorization_endpoint`, `token_endpoint` and `jwks_uri`
HTTPS, at least one RS256/PS256/ES256 key in the JWKS and, if the IdP lists
PKCE methods, support for S256. The server reads claims only from ID token (userinfo does not read claims).
is requested), so the groups, roles and mail must be included in the ID token.

**Refresh token IdP* is used to recheck disabled employees. If IdP is his
The user simply logs in via IdP again
`CC_AUTH_RECHECK_GRACE_HOURS`; `admin auth test --login <email>` in this case
Reports `no IdP refresh token stored (request offline access)`.

## Configuration

Like other settings: variables `CC_*`, private JSON file `--config`, or
Helm (block `auth:`). Secrets - ** Files only** Kubernetes Secret, Docker
secret, file with rights 0600; they are not included in the log. How to put the keys in
Docker Compose, Helm and systemd in [HOSTING.md](../HOSTING.md#как-задать-любой-параметр).

### Common keys

| Key key | By default. | Appointment |
|---|---|---|
| `CC_AUTH_MODE` | `standard` | `standard` or `enterprise` |
| `CC_AUTH_PROVIDER` | — | `oidc` or `ldap` (in enterprise only) |
| `CC_AUTH_DISPLAY_NAME` | — | Signature of the button "Login through ..." in the application, up to 64 characters |
| `CC_AUTH_ALLOWED_DOMAINS` | - (anything) | Acceptable email domains by comma; required to automatically link existing accounts |
| `CC_AUTH_AUTO_CREATE` | `true` | Create an account at the first login |
| `CC_AUTH_RECHECK_MINUTES` | `15` | How often to recheck the user (1–1440) |
| `CC_AUTH_RECHECK_GRACE_HOURS` | `24` | How many sessions live with an unavailable IdP/AD (0–720) |
| `CC_PUBLIC_URL` | — | for OIDC mandatory `https://…`: IdP return address |

### OIDC

| Key key | Appointment |
|---|---|
| `CC_OIDC_PRESET` | `generic`, `entra`, `adfs`, `keycloak`, `google`, `okta` |
| `CC_OIDC_ISSUER` | exact issuer (no extra `/` at the end if IdP does not write it) |
| `CC_OIDC_CLIENT_ID` | identifier of the application in IdP |
| `CC_OIDC_CLIENT_SECRET_FILE` | client-secret |
| `CC_OIDC_TOKEN_KEY_FILE` | File with 32-byte encryption key refresh token IdP `openssl rand -hex 32` |
| `CC_OIDC_SCOPES` | by default `openid email profile offline_access` (adfs: `openid email profile allatclaims`, google: `openid email profile` |
| `CC_OIDC_EMAIL_CLAIM` | by default `email` (entra: `preferred_username`, adfs: `upn` |
| `CC_OIDC_REQUIRED_CLAIM` | `claim=значение`: only use this group/role, e.g. `groups=<object-id>`; one matching element is sufficient for an array |
| `CC_OIDC_REQUIRE_MFA` | `true`: demand `mfa` (or `http://schemas.microsoft.com/claims/multipleauthn`) in `amr` or one of `CC_OIDC_MFA_ACR_VALUES` in `acr` |
| `CC_OIDC_MFA_ACR_VALUES` | values `acr` that are considered multifactorial |
| `CC_OIDC_TOKEN_AUTH_METHOD` | `client_secret_basic` (default) or `client_secret_post` |
| `CC_OIDC_CA_FILE` | Additional IdP Root Certificate (Internal CA) |

Preset substitutes the default values and checks for typical errors at the start:
Entra is prohibited `/common`, `/organizations` and `/consumers` (needs tenant id).
For AD FS issuer should end with `/adfs`, for Keycloak - contain
`/realms/`, required for Google `CC_AUTH_ALLOWED_DOMAINS`, and `hd` from ID token
It should be included in this list (otherwise, any Google account would be included).

Refresh token IdP is stored in the database only with an encrypted key (ChaCha20-Poly1305)
from `CC_OIDC_TOKEN_KEY_FILE`.

### LDAP / Active Directory

| Key key | By default. | Appointment |
|---|---|---|
| `CC_LDAP_URL` | — | `ldaps://dc1.acme.local:636`; `ldap://` – only with `CC_LDAP_STARTTLS=true` |
| `CC_LDAP_STARTTLS` | `false` | STARTTLS for `ldap://`) |
| `CC_LDAP_CA_FILE` | root | Root Domain Certificate (PEM) |
| `CC_LDAP_BIND_DN` | — | service accounting, for example `CN=svc-consolecrypt,OU=Service,DC=acme,DC=local` |
| `CC_LDAP_BIND_PASSWORD_FILE` | — | log-file |
| `CC_LDAP_BASE_DN` | — | Where to search for users, for example `DC=acme,DC=local` |
| `CC_LDAP_USER_FILTER` | `(&(objectClass=user)(\)|(mail= {login} )(userPrincipalName= {login} )(sAMAccountName= {login} ) | search; input shielded by RFC 4515 |
| `CC_LDAP_EMAIL_ATTR` | `mail` | email |
| `CC_LDAP_ID_ATTR` | `objectGUID` | stable-identity |
| `CC_LDAP_REQUIRED_GROUP` | — | DN groups; nested groups are counted `LDAP_MATCHING_RULE_IN_CHAIN` |
| `CC_LDAP_TIMEOUT_SECS` | `10` | timeout of connection and operations (1–60) |
| `CC_LDAP_MAX_FAILURES` | `3` | Attempts to login and to AD user outside the window (1–100, see below) |
| `CC_LDAP_FAILURE_WINDOW_MINUTES` | `15` | window of the counter of unsuccessful entrances (1-1440) |
| `CC_LDAP_MAX_FAILURES_PER_IP` | `30` | Unsuccessful inputs from one IP per window (0 - without limitation) |

## OIDC recipes

In all recipes, the server is available on `https://sync.acme.com`, redirect URI in IdP -
`https://sync.acme.com/v1/auth/oidc/callback` (substitute your own `CC_PUBLIC_URL`).
First, prepare the secret files:

```sh
install -d -m 700 /etc/consolecrypt/secrets
( umask 077
  openssl rand -hex 32 > /etc/consolecrypt/secrets/oidc-token-key
  # client secret из IdP, без перевода строки и без отображения на экране:
  read -rs CC_SECRET && printf '%s' "$CC_SECRET" > /etc/consolecrypt/secrets/oidc-client-secret
  unset CC_SECRET )
```

The owner of the files must be the user of the server process (in the container -
UID 65532, see [развёртывание](#развёртывание). Key `oidc-token-key` don't change
unnecessarily: when you change the key, the saved refresh token IdPs become
Unreadable, and users log in once again. Client secret for many IdPs
Expiration: Make a reminder, update the file when you replace and
Restart the server.

A common set of keys for all recipes:

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

1. Microsoft Entra Admin Center → **App registrations → New registration**
   имя « ConsoleCrypt Sync», **Accounts in this organizational directory only**
   (single tenant), Redirect URI (platform **Web**)
   `https://sync.acme.com/v1/auth/oidc/callback`. Do not choose SPA platforms or
   Mobile and Desktop: The server is a confidential client.
2. On **Overview**, copy **Application (client) ID**
   `CC_OIDC_CLIENT_ID` and **Directory (tenant) ID** → issuer
   `https://login.microsoftonline.com/<tenant-id>/v2.0`.
3. **Certificates & secrets → Client secrets → New client secret**
   (not Secret ID) save to file `oidc-client-secret`. Remember the expiration date.
4. **API permissions**: Microsoft Graph, delegated `openid`, `email`, `profile`
   `offline_access`. Press **Grant admin consent** to prevent employees from seeing
   requesting consent.
5. **Token configuration → Add optional claim → ID → `email` ** By default.
   The preset uses `preferred_username` (usually UPN) as an email. If the UPN isn't
   the same as the mailing address, ask `CC_OIDC_EMAIL_CLAIM=email`
   The user must be filled in the mail attribute.
6. Access only to the right people is one option:
   - **App roles** (recommended): **App roles → Create app role**, Allowed member
     types — Users/Groups, Value `ConsoleCrypt.User`; затем **Enterprise
     applications → ConsoleCrypt Sync → Users and groups → Add user/group** и
     назначьте роль группе. На сервере `CC_OIDC_REQUIRED_CLAIM=roles=ConsoleCrypt.User`;
   - **groups claim**: **Token configuration → Add groups claim → Security groups**,
     в ID token — **Group ID**; на сервере
     `CC_OIDC_REQUIRED_CLAIM=groups=<object-id группы>`. Если пользователь состоит
     более чем в 200 группах, Entra не кладёт `groups` в токен (overage), сервер
     пишет об этом предупреждение в журнал — используйте app roles или «Groups
     assigned to the application».
   Enable **Enterprise applications → Properties → Assignment
   required = Yes**: then Entra will not issue the token to unassigned users.
7. MFA: Require this policy **Conditional Access** for this application.
   `CC_OIDC_REQUIRE_MFA=true` further checks `amr` / `acr` in the ID token;
   Turn it on only if the test input passes - unless the IdP informs
   Entry method, all inputs will receive `mfa_required`.

```dotenv
CC_OIDC_PRESET=entra
CC_OIDC_ISSUER=https://login.microsoftonline.com/<tenant-id>/v2.0
CC_OIDC_CLIENT_ID=<application-client-id>
CC_OIDC_REQUIRED_CLAIM=roles=ConsoleCrypt.User
```

Issuer `/common`, `/organizations` and `/consumers` preset rejects: tenant id is needed.
A user disabled in Entra cannot update the refresh token, and the server
withdraws its session at the nearest recheck.

### AD FS 2016+

1. AD FS Management → ** Application Groups → Add Application Group
   Server application** (or "Web browser accessing a web application")
   confidential client). Copy Client Identifier `CC_OIDC_CLIENT_ID`.
   Redirect URI - `https://sync.acme.com/v1/auth/oidc/callback`.
2. **Configure Application Credentials → Generate a shared secret**
   `oidc-client-secret`.
3. Add to the group **Web API** with identifier = client id server, policy
   access (e.g., "Permit specific group"), permissions `openid`, `profile`,
   `email`, `allatclaims`.
4. Issuance Transform Rules for the Web API: Send LDAP Attributes as Claims
   `E-Mail-Addresses → email`, `User-Principal-Name → upn`; for group access -
   "Send Group Membership as a Claim" (e.g. `group` = `ConsoleCrypt`
   Scope `allatclaims` is required to make these claims appear in the ID token.
5. If the AD FS certificate is issued by an internal CA, put the root certificate (PEM) in.
   c `CC_OIDC_CA_FILE` .
6. Issuer - `https://adfs.acme.com/adfs`: check the field `issuer` in
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

AD FS reports the MFA in `amr` as `http://schemas.microsoft.com/claims/multipleauthn`;
`CC_OIDC_REQUIRE_MFA=true` understands that.

### Keycloak

1. Select realm (e.g. `acme` → **Clients → Create client**: OpenID
   Connect, Client ID `consolecrypt-server`, **Client authentication: On**,
   Standard flow: On, Direct access grants: Off.
2. **Valid redirect URIs: `https://sync.acme.com/v1/auth/oidc/callback`
   **Advanced → Proof Key for Code Exchange Code Challenge Method: S256**
3. **Credentials** → Client secret – in the file.
4. Email: client scopes `email` and `profile` must be Default for the client.
   Keycloak transmits `email_verified` : if the address is not confirmed, the existing address
   Your password account will not be automatically linked `email_not_verified`.
5. Group: **Client scopes → consolecrypt-server-dedicated → Add mapper → By
   configuration → Group Membership**, Token Claim Name `groups`, ** Full group
   path: Off** (otherwise the value will be `/consolecrypt-users`), Add to ID token: On.
   Then `CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users`. Instead of a group,
   Use the client role and mapper "User Client Role".
6. Users disable in **Users → Enabled: Off** - their refresh token
   It stops working, and the server cancels the session at the nearest recheck.

```dotenv
CC_OIDC_PRESET=keycloak
CC_OIDC_ISSUER=https://sso.acme.com/realms/acme
CC_OIDC_CLIENT_ID=consolecrypt-server
CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users
```

### Google Workspace

1. Google Cloud Console → **APIs & Services → OAuth
   consent screen**: User type**Internal** (only your users)
   Organizations), scopes `openid`, `email`, `profile`.
2. **Credentials → Create credentials → OAuth client ID → Web application**,
   Authorized redirect URI `https://sync.acme.com/v1/auth/oidc/callback`.
   Client ID → `CC_OIDC_CLIENT_ID` and Client Secret in the file.
3. Issuer does not need to be specified `https://accounts.google.com`. Preset asks for it.
   offline access `access_type=offline`, `prompt=consent`; `offline_access`
   `CC_OIDC_SCOPES` Google rejects, and the server will not run with it.
4. `CC_AUTH_ALLOWED_DOMAINS` is mandatory: the server only accepts Workspace accounts.
   Whose `hd` ID token is on the list. A personal Google account with a “corporate”
   The address `hd` does not and will not enter.
5. Google does not transfer groups and MFA to ID token: limit the number of users
   Apps with Admin console, 2-Step Verification enable policy
   Workspace. `CC_OIDC_REQUIRE_MFA=true` for Google server will not accept.

```dotenv
CC_OIDC_PRESET=google
CC_AUTH_ALLOWED_DOMAINS=acme.com
CC_OIDC_CLIENT_ID=<client-id>.apps.googleusercontent.com
```

### Okta

1. Admin Console → **Applications → Create App Integration → OIDC - OpenID
   Connect → Web Application**. Grant type: Authorization Code and **Refresh Token**.
   Sign-in redirect URI `https://sync.acme.com/v1/auth/oidc/callback`
2. **Client authentication: Client secret**, **Require PKCE as additional
   Include verification**. Client ID and secret - in `CC_OIDC_CLIENT_ID` and file.
3. **Assignments**: Assign the application to the group. For claim groups in ID token:
   **Sign On → OpenID Connect ID Token → Groups claim** – name `groups`
   Matches regex `ConsoleCrypt.*` (in-house authorization server claim)
   `groups` is added to **Security → API → Authorization Servers → Claims**.
4. Issuer (org domain `https://acme.okta.com`) or authorization server
   `https://acme.okta.com/oauth2/default`); it must be exactly the same as `issuer`.
   in discovery. For `offline_access` on your own authorization server scope
   It should be allowed by an access policy.

```dotenv
CC_OIDC_PRESET=okta
CC_OIDC_ISSUER=https://acme.okta.com
CC_OIDC_CLIENT_ID=<client-id>
CC_OIDC_REQUIRED_CLAIM=groups=ConsoleCrypt-Users
```

### Any other OIDC provider

Use `CC_OIDC_PRESET=generic` (default value). Check it out.

1. Client – confidential, Authorization Code + PKCE S256, Refresh Token
   redirect URI `https://sync.acme.com/v1/auth/oidc/callback`.
2. The ID token is signed RS256, PS256 or ES256 and contains `sub`
   `email` or other claim - `CC_OIDC_EMAIL_CLAIM` and, if necessary, claim
   groups for `CC_OIDC_REQUIRED_CLAIM`.
3. Discovery `<issuer>/.well-known/openid-configuration` is available on the server.
   HTTPS (internal CA - `CC_OIDC_CA_FILE`), his `issuer` is symbolically equal to
   `CC_OIDC_ISSUER`.
4. If the IdP does not accept the secret in the Basic header, ask
   `CC_OIDC_TOKEN_AUTH_METHOD=client_secret_post`.
5. For MFA, find out which `amr` or `acr` IdP writes in ID token; non-standard
   List the values `acr` in `CC_OIDC_MFA_ACR_VALUES`.

```dotenv
CC_OIDC_PRESET=generic
CC_OIDC_ISSUER=https://idp.acme.com
CC_OIDC_CLIENT_ID=consolecrypt-server
CC_OIDC_SCOPES=openid email profile offline_access
CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users
```

## Active Directory and LDAP

1. **Service Accounting** with Minimum Rights: Regular Domain User
   You can read the directory, no administrative rights are required. Password without term
   Actions (or with your swap procedure: Update the file and restart the server):

   ```powershell
   New-ADUser -Name svc-consolecrypt -Path "OU=Service,DC=acme,DC=local" `
     -AccountPassword (Read-Host -AsSecureString) -Enabled $true -PasswordNeverExpires $true
   ```

   Password to file `ldap-bind-password` and DN to file `CC_LDAP_BIND_DN`.
2. **LDAPS**: Domain controllers must have a certificate (AD CS "Domain")
   Controller or Kerberos Authentication. Export CA Root Certificate
   in PEM - `CC_LDAP_CA_FILE` . The name in `CC_LDAP_URL` must be the same as the name in
   Controller Certificate (DNS name, not IP). You can check the chain from the host
   server: `openssl s_client -connect dc1.acme.local:636 -CAfile ad-ca.pem </dev/null`
   (expected `Verify return code: 0 (ok)`). If only port 389 is available,
   Use `ldap://dc1.acme.local:389` and `CC_LDAP_STARTTLS=true`; simple
   `ldap://` without TLS, the server will not accept.
3. **Search filter**: the default user is at `mail`.
   `userPrincipalName` or `sAMAccountName` , so you can enter email, UPN or
   `ACME\alice`. If the search finds multiple entries, the entry is rejected. Yours.
   The filter must contain `{login}`.
4. **Access group, e.g. `CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local`;
   Enclosed groups are accounted for through Rule AD `LDAP_MATCHING_RULE_IN_CHAIN`.
   Membership is checked at the entrance and at each recheck.
5. **Stable identifier** - `objectGUID`: change email, UPN, or
   The renaming of the account does not break the binding. For `admin identity link`, take him.
   So: `(Get-ADUser alice).ObjectGUID`. Disconnected accounts `userAccountControl`
   with the flag `ACCOUNTDISABLE` do not enter and lose sessions when rechecked.
6. **Search check** before activating mode (password requested, not
   transmitted by argument:

   ```sh
   ldapsearch -H ldaps://dc1.acme.local:636 -D 'CN=svc-consolecrypt,OU=Service,DC=acme,DC=local' -W \
     -b 'DC=acme,DC=local' '(sAMAccountName=alice)' mail objectGUID userAccountControl
   ```

7. **Domain blocking policy**: set `CC_LDAP_MAX_FAILURES` below the threshold
   blocking (see below).

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

Simple `ldap://` without STARTTLS server rejects at start: domain password should not
Go online in plain text. Empty password is rejected before accessing AD (otherwise
It would be an anonymous bind.

The server is designed for Active Directory. With another LDAP directory, ask your own.
`CC_LDAP_USER_FILTER`, `CC_LDAP_EMAIL_ATTR` and stable `CC_LDAP_ID_ATTR`
(e.g. `entryUUID`); inspection `CC_LDAP_REQUIRED_GROUP` uses the AD rule
`LDAP_MATCHING_RULE_IN_CHAIN` which another directory may not support
Check the entrance with the command `admin auth test --login`.

**Protection of AD accounts from blocking through the server.** Unsuccessful binds are accounted for in
Domain blocking policy, so an attacker could block employees
through `/v1/auth/ldap/login`. The server counts attempts in PostgreSQL (common to all)
Remarks) – on the entered login and on the found user AD (different spellings)
One username – email, UPN, `DOMAIN\user` – is counted together:
`CC_LDAP_MAX_FAILURES` attempts for `CC_LDAP_FAILURE_WINDOW_MINUTES`
Attempts are rejected ** without recourse to AD** `429 rate_limited` with `Retry-After`
until the window passes. Unknown login behaves the same way, existence
The user is not disclosed. A successful entrance drops the meter. Separately.
Failed inputs from a single IP `CC_LDAP_MAX_FAILURES_PER_IP` are considered.

> **Important:** `CC_LDAP_MAX_FAILURES` should be **less than the accounting lock threshold
> records in the domain policy (Account lockout threshold), and
> `CC_LDAP_FAILURE_WINDOW_MINUTES` - not less than the window reset of the lock counter
> (Reset account lockout counter after). Otherwise, logging into the server can still be done.
> block the record. Example: Domain threshold 5 attempts in 30 minutes
> `CC_LDAP_MAX_FAILURES=3`, `CC_LDAP_FAILURE_WINDOW_MINUTES=30`.

## First Login and Account Linking

At each login, the server searches for the account as follows:

1. * Known account`(iss, sub)` for OIDC, `objectGUID` for LDAP
   Log in to a linked account. If the IdP/AD address has changed and is not occupied
   With another account, the account address is updated.
2. **A new account and an account with the same address already exists**
   established in standard mode). It is automatically linked only if:
   Address domain is in `CC_AUTH_ALLOWED_DOMAINS`; the account does not yet have an external
   IdP not reported `email_verified=false`; account not disabled Password.
   account is deleted, sessions opened with a password are terminated, devices and
   The vaults are preserved. Otherwise, the input receives `409 identity_conflict` with a cause in
   journal: `linked_to_other_identity`, `link_requires_allowed_domain` or
   `email_not_verified` - tie by hand:

   ```sh
   consolecrypt-server admin identity link --email alice@acme.com --subject <sub или objectGUID>
   ```

   `--subject` - claim value `sub` from the user's ID token (in Keycloak - ID)
   user in the console, in Okta - user id `00u…`; Entra ID `sub` does not
   It is the same as Object ID `oid` or `objectGUID` for AD. Without `--issuer` used
   configured `CC_OIDC_ISSUER` or base DN.
3. **A new account without an account** – an account with a confirmed account is created
   address if `CC_AUTH_AUTO_CREATE=true`. At `false` the input receives `403` s
   Reason `not_provisioned`: only accounts created in advance are included.
   (in standard mode) or bound by command `admin identity link`.

With an account without a mailing address `email_missing` or with a domain outside
`CC_AUTH_ALLOWED_DOMAINS` the entrance is rejected with `403 domain_not_allowed`.

## Transition from standard to enterprise

1. Upgrade the server to 0.2.0 or later and back up the database (migration)
   `0011_enterprise_auth` only adds tables and makes
   `users.password_hash` optional).
2. Register the application in IdP or create a service account in AD (recipes)
   Put secrets in files/Secret.
3. Check the list of accounts: `admin list-users`. Decide which domains
   List in `CC_AUTH_ALLOWED_DOMAINS` to allow existing accounts
   They got attached.
4. Turn on `CC_AUTH_MODE=enterprise` and restart the server. Check.
   `admin auth status`, `admin auth test` and `"auth": {"mode": "enterprise", …}` in
   `/v1/meta`. Update applications to the version with support for enterprise login
   (client 0.9.0).
5. Test login with your account and check `admin list-users`
   (column `sign_in`).

After inclusion:

- registration, account password login, password reset and password change, mail confirmation
  Respond `403 enterprise_auth_required`; older apps show an error
  login with the text “Update the application”;
- Sessions opened by password prior to switching are not updated
  `enterprise_auth_required`: The user logs in once via IdP/AD.
- Existing accounts are linked by rules
  [выше](#первый-вход-и-привязка-аккаунтов);
- Devices and Account Storages are saved; Devices that have already been
  registered, enters with the signature of the device key, as before.

## Check at start and administrator commands

At start-up, the server checks the configuration and drops down with an understandable error: for OIDC,
Secret files, discovery, match `issuer`, JWKS with RS256/PS256/ES256 keys;
for LDAP – files, connection, TLS, bind service accounting, presence of base DN and group.

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

OIDC `admin auth test --login` does a true recheck: if the IdP fails,
Account sessions are being withdrawn. LDAP `--password-stdin` performs the actual bind and
It is included in the domain blocking policy. In Docker Compose and Kubernetes teams
Launched inside the container: `cc_compose exec -T server
/usr/local/bin/consolecrypt-server admin auth status ` или ` kubectl-n consolecrypt
exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin auth status'.

## Journal

In the server log (and in `audit_events` ) are written inputs `login` , `metadata.method` =
`oidc` / `ldap`), account creation, anchoring `identity_linked` / `identity_unlinked`,
Failures with cause `login_failed`, `metadata.reason`: `domain_not_allowed`,
`email_missing`, `group_required`, `mfa_required`, `account_disabled`.
`not_provisioned`, `linked_to_other_identity`, `link_requires_allowed_domain`
`email_not_verified` and for incorrect ID token – `iss`, `aud`, `azp`, `exp`.
`iat`, `nbf`, `nonce`, `sub`, `unknown_kid`, `bad_signature`, `unsupported_alg`.
`malformed`), session reviews by re-checking `enterprise_access_revoked`, and
administrator. Passwords, client secret, tokens and login codes do not fall into the log.
Metrics: `cc_enterprise_logins_total{method,result}`
`cc_enterprise_rechecks_total{result}`, `cc_ldap_lockout_guard_total{scope}`,
`cc_oidc_jwks_refetch_total`.

## Deployment

Full examples for each installation method - in
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

Secret mounted for reading only in `/run/secrets/consolecrypt-auth`
`defaultMode: 0440`, group pod - 65532); chart itself substitutes paths `*_FILE`
checks mandatory fields and rejects `ldap://` without `starttls: true` and OIDC without
`config.publicUrl` with `https://`. The remaining keys `scopes`, `emailClaim`
`requireMfa`, `mfaAcrValues`, `tokenAuthMethod`, `caKey`, `userFilter`.
`emailAttr`, `idAttr`, `timeoutSecs`, `maxFailures`, `failureWindowMinutes`.
`maxFailuresPerIp`) are described in `values.yaml` and [CONFIGURATION.md](CONFIGURATION.md).

### Docker Compose

The main `compose.yaml` from the source does not change. Settings and secrets
Enterprise mode keep in the **private ** directory of the installation next to
`server.env` `$CC_INSTALL_DIR` of [HOSTING.md](../HOSTING.md#docker-compose) rather than in
clone of the repository.

1. Save OIDC secrets (or LDAP and CA directory service login password) in
   `$CC_INSTALL_DIR/secrets/`. Compose without Swarm mounts them as regular files
   The owner and host rights, and the server works as UID 65532 – make files
   readable only for him:

   ```sh
   mkdir -p "$CC_INSTALL_DIR/secrets"
   ( umask 077
     openssl rand -hex 32 > "$CC_INSTALL_DIR/secrets/oidc-token-key"
     # client secret из IdP, без перевода строки:
     read -rs CC_SECRET && printf '%s' "$CC_SECRET" > "$CC_INSTALL_DIR/secrets/oidc-client-secret" )
   sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
   sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
   ```

2. Create `$CC_INSTALL_DIR/compose.override.yaml`. Point the way.
   **Absolute**: Relative Compose counts from the first catalog
   The file, that is, from the source. Replace `/home/admin/.config/consolecrypt-docker`
   on his own `$CC_INSTALL_DIR`:

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

3. Connect the override file. Automatically, Compose picks up.
   `compose.override.yaml` only from the project directory and only without `-f`
   `cc_compose` from HOSTING.md transmits `-f`, so add a second `-f`:

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

   In `/v1/meta` should appear `"auth": {"mode": "enterprise", …}`. Check.
   configure with the command `cc_compose exec -T server /usr/local/bin/consolecrypt-server
   admin auth test. For LDAP instead of `CC_OIDC_*` ask `CC_LDAP_*` and secrets
   `ldap-bind-password` `CC_LDAP_BIND_PASSWORD_FILE` and if necessary
   `ldap-ca.pem` `CC_LDAP_CA_FILE`.

Use the same function for all further commands (Update, `admin`).
backups: without the second `-f` Compose will recreate the server in the standard
mode.

### Binary

The same keys in private JSON `--config /etc/consolecrypt/server.json`, rights
0600) or in a service environment; paths `*_FILE` indicate files with 0600 rights,
User-owned services.

## Diagnosis of errors

| You can see. | Reason. | What to do. |
|---|---|---|
| The server does not start: `OIDC sign-in requires CC_PUBLIC_URL (https://…)` | No `CC_PUBLIC_URL` or he is not `https://` | Provide the public address of the server; in Helm - `config.publicUrl` |
| `CC_OIDC_ISSUER: Entra ID multi-tenant endpoints … are not allowed` | issuer with `/common`, `/organizations` or `/consumers` | `https://login.microsoftonline.com/<tenant-id>/v2.0` |
| `CC_OIDC_ISSUER: for adfs expected …/adfs`, `for keycloak expected …/realms/<realm>` | issuer does not conform to the preset | Copy `issuer` from the discovery IdP |
| `OIDC discovery: issuer mismatch` | `CC_OIDC_ISSUER` differs from `issuer` in discovery (often ending `/`) | copy the value symbolically |
| `OIDC discovery at …`: query or certificate error | The server does not receive an IdP on HTTPS or does not trust its CA. | check DNS, outbound access and proxy; internal CA – `CC_OIDC_CA_FILE` |
| `… none of RS256, PS256, ES256` or `does not support PKCE S256` | IdP signs tokens with or without PKCE S256 | Enable RS256/ES256 and PKCE S256 for the customer |
| `CC_OIDC_CLIENT_SECRET_FILE (…): cannot open the file` / `file is empty` | Incorrect path, UID 65532 has no rights, empty file | check mounting, `chown 65532:65532`, `chmod 0400`, contents |
| `CC_OIDC_TOKEN_KEY_FILE (…): expected 32 random bytes …` | not 64 hex, not base64 32 bytes | `openssl rand -hex 32 > oidc-token-key` |
| `CC_OIDC_PRESET=google requires CC_AUTH_ALLOWED_DOMAINS` | Google does not have a domain list. | Ask for Workspace Domains |
| IdP reveals redirect URI error | IdP has a different return address. | `CC_PUBLIC_URL` + `/v1/auth/oidc/callback`, type of Web client |
| `403 domain_not_allowed` ( `email_missing`) | domain outside `CC_AUTH_ALLOWED_DOMAINS` or there is no address in ID token | check `CC_OIDC_EMAIL_CLAIM` (Entra: `email` vs `preferred_username`), mail attribute, list of domains |
| `403 group_required` | no claim from `CC_OIDC_REQUIRED_CLAIM` or user outside the group `CC_LDAP_REQUIRED_GROUP` | Add claim to **ID token**, check name (Keycloak: Full group path Off), Entra: overage > 200 groups → app roles |
| `403 mfa_required` | The IdP did not report the MFA at `amr` / `acr` | turn on MFA in IdP policy; if non-standard `acr` – `CC_OIDC_MFA_ACR_VALUES`; otherwise turn off `CC_OIDC_REQUIRE_MFA` |
| `409 identity_conflict` | the address belongs to an account linked to another account, or the domain is not listed, or `email_verified=false` | `admin identity link` / `unlink`; add domain to `CC_AUTH_ALLOWED_DOMAINS` |
| `403` with cause `not_provisioned` | `CC_AUTH_AUTO_CREATE=false`, no account | Create/link an account or enable auto-creation |
| `503 idp_unavailable` | IdP / directory is not available longer `CC_AUTH_RECHECK_GRACE_HOURS` | restore access; `admin auth status` will show the latest check |
| Employee disconnected, but still synchronized | Not yet checked or not refresh token IdP | wait until `CC_AUTH_RECHECK_MINUTES` + 1 min; `admin session revoke`; `admin auth test --login` |
| `CC_LDAP_URL: plain ldap:// is refused` | `ldap://` without STARTTLS | `ldaps://…:636` or `CC_LDAP_STARTTLS=true` |
| `LDAP …: cannot connect (network or TLS certificate problem)` | network, port, name is not the same as the certificate, the wrong CA | DNS name from certificate, `CC_LDAP_CA_FILE`, `openssl s_client` |
| `LDAP TLS: no system root certificates found` | imagery lacks root | ask `CC_LDAP_CA_FILE` |
| `service account bind rejected (check CC_LDAP_BIND_DN and password)` | incorrect DN or service login password, registration disabled | check the DN, the password file without unnecessary characters, the status of the accounting |
| `LDAP base DN … not found` / `CC_LDAP_REQUIRED_GROUP … not found` | typo | copy the DN from the directory |
| `401 invalid_credentials` with the correct password | account disabled, blocked, password expired or search found several records | Check the account in AD; specify `CC_LDAP_USER_FILTER` |
| `429 rate_limited` at LDAP input | сработала защита от блокировки ( `CC_LDAP_MAX_FAILURES` или `CC_LDAP_MAX_FAILURES_PER_IP` ) | Wait for the window `CC_LDAP_FAILURE_WINDOW_MINUTES`; check who picks up the password |

## Return to standard mode

**There is no emergency password entry in enterprise mode.** If IdP or AD is not available
or configured incorrectly, first `admin auth status` and `admin auth test`. And
Temporarily pass people on the password:

1. Ask `CC_AUTH_MODE=standard` (in Helm – `auth.mode: standard`) and restart
   server. Keys `CC_OIDC_*` and `CC_LDAP_*` can not be deleted.
   The reverse switch is the change of one key.
2. Linked accounts do not have a password: set it with a command
   `admin set-password --email … --password-stdin` (or issue the code)
   `admin reset-token --email …` . Your account password still does not open.
   vault.
3. References to IdP/AD are maintained. When Enterprise is Re-enabled, Enter again
   Only through IdP/AD, and the password is deleted the next time the user logs in.
   To remove the binding forever - `admin identity unlink --email …`

## Errors for applications (Protocol 1.9)

| Code. | HTTP | When |
|---|---|---|
| `enterprise_auth_required` | 403 | login/registration/password reset on the enterprise server; session without binding |
| `identity_conflict` | 409 | e-mail belongs to an account of another source or the link requires an administrator |
| `domain_not_allowed` | 403 | e-mail domain is not in `CC_AUTH_ALLOWED_DOMAINS` or no e-mail account |
| `group_required` | 403 | No mandatory group/role/claim |
| `mfa_required` | 403 | IdP didn't tell MFA |
| `idp_unavailable` | 503 | IdP or AD is not available (repeat later) |
| `account_disabled` | 403 | Recording disabled; all sessions withdrawn |
| `invalid_credentials` | 401 | incorrect login / password AD, invalid ID token, repetition or substitution `login_code` |
| `rate_limited` | 429 | attempt limit (including AD account protection from blocking) |

Details of the protocol - in [PROTOCOL_CHANGELOG.md](https://github.com/evsikovas/consolecrypt-server/blob/main/PROTOCOL_CHANGELOG.md).
types in `cc_protocol::enterprise_auth`.

---
