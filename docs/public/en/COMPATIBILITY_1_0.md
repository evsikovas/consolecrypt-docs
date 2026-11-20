# Server Compatibility with ConsoleCrypt 1.0.0

Translated reference · [Russian source](../COMPATIBILITY_1_0.md)

## What has changed?

Client 1.0.0 adds manager KDBX and synchronization of parameters WebDAV.
The server does not receive a master password, records KDBX or biometric key material.
The KDBX itself is locally located or on a selected WebDAV; it does not load into
ConsoleCrypt Sync as a separate file.

In the encrypted client object `VaultSettings` added `password_vaults`:
id, name, HTTPS URL, login and reference to a separate encrypted credential.
The server stores the object as an existing object `EncryptedBody` without parsing the new fields.
Local file paths, quick-open envelopes and Docker / Kubernetes profiles
The leaks remain on the device.

## Is there a need to improve the server?

No new endpoints, tables, migrations, permissions are needed for these changes.
Encryption keys or changes to the wire protocol. The server version remains independent.
from the client version; the current verification base is server 0.2.4 / protocol 1.13.
Existing restrictions on the size of encrypted objects and access rights remain.

Customer checks perform serialization of new settings and encrypted exchange
between clients. Server synchronization checks, conflicts, rights, joint
Access and backup/restore run in a separate GitHub workflow
[Client compatibility](https://github.com/evsikovas/consolecrypt-server/actions/workflows/client-compatibility.yml)
Temporary PostgreSQL. Workflow does not publish images or change production.

Upgrade all devices to client 1.0.0 before saving WebDAV connections.
Older customers do not know the new field, and when overwriting `VaultSettings` they can
Reset the connection list. The server cannot supplement the decrypted settings
or to restore their fields: this would violate the model E2EE.
