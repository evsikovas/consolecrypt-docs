# Account and synchronization

Translated reference · [Russian source](../SYNC_ACCOUNT.md)

## Russian

The sync profile links this device to the server account.
synchronization ConsoleCrypt. The server stores only encrypted data: open
the storage can be stored with a password, a recovery key or approval with the already
a trusted device. A password or login to an account only proves to the server who
You.

### Connection to the server

1. **Add profile → Connect to the server** (or **Settings →)
   Synchronization > Enable synchronization** for local profile.
2. Enter the server address and click **Confirm **. Appendix reads `/v1/meta`
   It shows the login form that the server is waiting for.
3. The new account goes through the usual creation of a repository: a storage password and
   Recovery Kit. The second device is connected by a storage password, a key.
   Restoration or approval.

The app remembers on this device how you logged in to each server:
login method and login (never password or tokens). On the next connection.
This method is selected in advance, the login is substituted, and the recent address is visible
servers with a method tag - "Email", "SSO: ...", "AD". The hint can be removed
The **Forget* button.

### New device approval and storage key (0.9.2)

Each device remembers the fingerprint of the key of its storage and checks with it any
received key - when unlocked with a password, recovery key, fingerprint
or Windows Hello, when approved and synchronized. If the server
handed over another key, the app shows the "Other Storage Key" screen:
data on the device does not change, synchronization is stopped, accept "new"
No key. Do not enter secrets on this device, copy the diagnosis and
Notify the server administrator.

With server 0.2.2 and newer, approval is as follows: on a trusted device.
Open the query in **Devices** - the new device immediately shows the name
Approving and the pair's **code. The code is computed from the keys of both devices and must
match on both screens; mark the match on both. Signature of approval
It covers the storage key, and the new device checks it with the key that you use.
confirmed. With the old server, the approval works as before, and the key
The store is marked “not confirmed” – once enter the password of the store
(**Devices** or **Settings → Storage → Password Confirm**). If
The other device in the account said a different key, and **Devices** will appear.
A warning with a suggestion to withdraw it.

### Deletion request (0.9.14, protocol 1.13)

Server 0.2.4 allows an owner's not yet trusted device to
The vault is unlocked, request removal of the vault. It's not a storage facility.
Removed immediately: 7 days it waits in the state of "deletion planned" and
It's still in sync. The Trusted Device shows in
"Synchronization" Warning "Storage will be removed ..." with a button
"Save storage" - it cancels the deletion. If you didn't make the request,
Cancel deletion and change your account password. Removal from a trusted device
It still happens right away.

### Remote storage and data verification (0.9.14)

If the storage is removed on the server, the synchronization stops with the understandable
The reason ("storage not found on the server") and does not repeat attempts indefinitely.
An object from a server that has not passed authentication does not replace the latter.
Good local copy: The app displays a warning. Even if the server
once told the device to check the pair's code, approval without that verification
It's no longer accepted.

### Corporate Entry (Enterprise)

Synchronization server 0.2.0 and later (Protocol 1.8) can work in
Enterprise mode: login to the account is performed only through the corporate
The organization's authorization server. Registration, account password and password reset
There's no mail in this mode.

- **IdP over OIDC** (e.g. Entra ID, AD FS, Keycloak, Google Workspace):
  The button ** Log in {name}** opens the login page of the organization.
  system browser. The e-mail field is optional - it is only substituted
  on the entrance page. While logging in, the app is waiting for the browser; **Cancel**
  interrupts the entrance. On the computer, the browser returns to the application through
  address `http://127.0.0.1:…/auth/callback`, at Android and iOS
  `consolecrypt://auth/callback`. The application uses PKCE and checks
  `state`; a one-time entry code lives 60 seconds.
- **Active Directory / LDAP:** fields ** Login (email or DOMAIN\user)** and
  **Password** under the caption "Your organization account". Password.
  Transmitted to the server over TLS once, not saved and erased from the field
  after every attempt.

Wherever an account or connection to a server is shown, the app says that
The corporate authorization server is used:

- On the login screen - "Entering through the corporate authorization server {name}".
  The password of the organization does not open the repository - you need a password for this
  repositories”;
- in **Settings → Account and synchronization** – line **Authorization:
  Enterprise server - {name} (OIDC | Active Directory)**
  as well as when the device came in. On the standard server there.
  written “Email and account password”;
- In **Synchronization** and **Devices**.

If the server changed mode (for example, switched from the login to the password)
Enterprise, the login screen warns about this: the previous password of the account
It's no longer used.

Enterprise login does not provide access to data. After the device enters,
conventional new device: there is protection against entry from the new device,
Letter of new device and approval. No IdP, no Active Directory, no server
They don't get anything to open the vault.

**Access is disabled by the administrator.** If the organization disables the accounting
a record (in IdP, AD, or server administrator command), the server revokes all
sessions. The application blocks the profile and shows “Access is disabled”
“administrator”. Local data remains encrypted. We can try it.
* Log in again** (if access is returned), switch to another profile or
**Delete the profile from this device** - there is nothing on the server.
It's changing.

Other Enterprise Login Messages: Email Domain Not Allowed, No Needed
The second factor is required, the account of the organization is already associated with
another account, the organization's login service is unavailable, too many attempts
(The appendix shows when you can repeat it.)

Older servers and servers work as usual.
Setting up enterprise mode on the server is described in the server documentation.
