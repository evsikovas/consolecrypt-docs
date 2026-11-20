# Security key (YubiKey, FIDO2)

Translated reference · [Russian source](../SECURITY_KEY.md)

## Russian

The storage can be opened with a physical USB security key – YubiKey or
another FIDO2 key with the extension `hmac-secret` and its PIN code. Function
optional and included separately for each storage unit
The device. Password phrase and Recovery Key continue to work: if the key
lost or its PIN blocked, open the storage with a password phrase.

**Where it works (preliminary version):** Windows 10/11 (via system version)
WebAuthn, PIN asks for a window Windows and macOS
PIN. Linux and mobile platforms are not yet supported.

### How to turn it on

1. Unlock the vault with a password phrase.
2. **Settings → Storage → Physical Security Key** – Enable.
3. Insert the key, enter its FIDO2 PIN code and tap the key twice: first
   The touch registers the key, the second receives the secret for the envelope.

The key must have a FIDO2 PIN. If it is not, Windows will offer to create a PIN at
First registration; on macOS, ask it to Yubico Authenticator. After eight.
FIDO is blocked on the key - you can only remove the lock
Reset FIDO, while erasing all registrations on the key.

### How to unlock

On the lock screen, press **Unlock with the security key**, enter the PIN.
(at Windows) in the system window and tap the key.

### How it works.

* When switched on, the key creates an account for `consolecrypt.dev`.
  It lives only as an identifier in ConsoleCrypt. Accidentally
  The salt key responds with 32 bytes of HMAC, the same value as the WebAuthn PRF.
  This answer seals the storage key into a local envelope.
* The envelope and salt are only in the profile key file on this device: they are not
  They are synchronized, do not get into backups and to the server.
* Neither the salt nor the identifier without the key itself and its PIN will open the storage.
  Another key, even the same manufacturer, will answer differently.
* Turning off removes the envelope; the account on the key remains (it can be deleted).
  c “Settings → Accounts → Security Key” on Windows or in Yubico
  Authenticator.
