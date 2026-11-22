# Password Manager KDBX

ConsoleCrypt 1.2.1 · [Connect Vault or OpenBao](../../../guide/en.md#release-1-2-1-vault) · [Import and export KDBX entries](../../../guide/en.md#release-1-2-1-kdbx)

Translated reference · [Russian source](../KEEPASS.md)

Open the **Passwords** section in the sidebar. Prior to the base's opening, available
**Create KDBX **, **Open KDBX ** and **Connect WebDAV **, below are saved bases.
The login section no longer has a separate entry to KDBX.

After opening on the top left are the folders of the selected base and the list of bases.
It's anchored from below. The **+** button next to the Password Base allows you to open another one.
Create a new base or connect it WebDAV. In the middle is a list of records.
on the right - a compact card of the selected record with copying of individual fields and a button
**Change. In a narrow window, the card opens instead of the list; the arrow returns.
to the records. The width of folders and cards can be changed by the mouse, pulling vertical
separators. The width is limited so that adjacent panels remain accessible.
Passwords and values of additional fields are not shown in the list.

Starting with 1.0.1, the notes in the open card are always visible in plain text.
including multi-line notes. Password and additional secret fields remain
hidden. This only changes the display: the file KDBX is still encrypted.

The record can be dragged to the folder of the same database. When the folder is hovered, it is illuminated.
Transfer to another base in this way is not performed. Groups are available.
New records, additional protected fields, and moving records to the bin.
The search works by names, logins and URL without looking at the meaning of secrets.

Each confirmed change is automatically recorded in an encrypted
KDBX: write creation/correction, new group, transfer and deletion. Push separately
"Save the base" is not required. Status indicates preservation and completion.
If an error occurs, changes remain in the open database; available **Repeat save**
and **Save local copy** in the database action menu.

The transition to the terminal leaves the bases open to a palette of commands.
Menu **ную → Block the base ** closes the selected base; if automatic
The preservation failed, first there is a confirmation of the loss of changes.
Blocking ConsoleCrypt and changing profiles close all databases, terminate WebDAV
They clean the molds.

## WebDAV and synchronization

On the start screen, press **Connect WebDAV ** (for additional base -
**+** at the bottom left) and specify the name, the full HTTPS address of the file.
`.kdbx`, login and password WebDAV or a separate application token. For editing
With the saved connection, press the gear to the right of the base. Empty password field
When editing saves the old password. Removing the connection does not remove
file with WebDAV. Used HTTP Basic overhead HTTPS; for two-factor services
Authorization usually requires a separate application token/password.

Connection options are included in the encrypted storage settings ConsoleCrypt.
The password WebDAV is stored in separate encrypted credentials. Connected.
to this storage of devices with an updated client they appear through the usual
synchronization.
The server ConsoleCrypt does not receive any open settings or passwords. File itself KDBX
stored on the selected WebDAV, its records are not imported in ConsoleCrypt.
Local paths are remembered only on this computer and separately for the profile.

The address should end with the file name **.kdbx**. For example,
`https://webdav.example/folder/Passwords.kdbx`. One server or folder address
Deviated immediately in the form and when you open the old connection, to the network
request and request a master password. At the time of opening, the button **Cancel** is available.
The connection timeout is 10 seconds, each HTTP request is 20 seconds.

Opening is performed by the GET of an encrypted file. If GET doesn't return the ETag,
client requests property WebDAV `getetag` via PROPFIND with Depth: 0,
If necessary, try HEAD and repeat GET with If-Match. So obtained
The version refers to the bytes that are being opened, not to a newer file.
ETag as a simple identifier without quotation marks is normalized for HTTP.

Save uses a PUT with the If-Match of the original strong ETag. If the answer is
does not contain a new ETag, the client re-receives and checks the saved file.
The next auto-save continues to work. At 412 local changes
remain in the open database: you can save a copy and open the current file.

If there is no reliable ETag at all or it is weak, the client uses an exceptional ETag.
lock WebDAV of LOCK. Under locking, it re-downloads the file and compares it.
SHA256 encrypted bytes with the version opened by the user. Only when
Coincidentally, a PUT is executed with a lock token in If; then UNLOCK is sent.
The conflict cancels the recording and also removes the blocking. If there's no reliable
ETag, no allowable lock, the client does not overwrite the file without protection;
It is possible to save a local copy.

Redirects are not performed: specify the final HTTPS address to the data
The login did not go to another server. A TLS check is mandatory. The limit KDBX -
128 MiB; metadata parsing is limited to 256 KiB. Computation of File Fingerprint
It is performed in a separate isolate so as not to block the interface.

## Windows Hello and the physical key

The first opening requires a master password KDBX and, if used, a key password.
file. After successful opening, open the ** ** menu in the database bar and
Select ** Windows Hello/print** or **Physical FIDO2 key**.

Quick Opening is enabled separately for each database on each computer.
Windows Hello shows a system-based fingerprint, face or PIN check of the device.
The physical key requires FIDO2 with PRF/hmac-secret: you need to configure it.
registration and confirmation, when opened - PIN and touch. At Windows PIN
requesting the system. An ordinary key without PRF is not suitable.

The application stores only the encrypted composite key KDBX locally. His.
A separate cryptographic envelope requires material that releases a system envelope.
Device protector or registered FIDO2 key. On Android used
Keystore with CryptoObject system request: the result is verified cryptographically.
Not just because of a successful dialogue. The envelope is tied to the profile, the storage,
Base address and confirmation method. It is not synchronized and does not turn on.
to a backup copy ConsoleCrypt. Master Password and Key File Remain Reserved
way of entering. After changing the master password in another application, open the database
password and re-enable the quick opening.

## Generator and menu of databases

The button **Password Generator** is available on the start screen and in the open section
base. In the recording editor, the button next to the password suggests generating a new one.
Password and put it in the field. This does not save the record until the editor confirms it.
The generator is also available when creating a master password for a new database.

Length – from 8 to 128 characters; A–Z, a–z, numerals and special characters are included separately.
Symbols, similar symbols can be excluded. Each selected group is required
It's present. A cryptographic OS generator is used. Copying works.
through a common protected buffer with a timer from settings ConsoleCrypt.

PCM at the bottom of the list opens a compact menu: open / select, block,
save a local copy, set up a quick opening, repeat the unsuccessful
save, change WebDAV - connection or remove the base from the list.
**Delete from the list** requires confirmation and leaves the file KDBX on disk or
WebDAV. Actions refer to the base on which the menu is called, including inactive ones.

PCM opens the menu ** Open the record card ** Move to another
group of...** and **Delete**. To transfer, select the folder in the following menu; current
The folder is marked and is not available for re-selection. The transfer is maintained immediately.
Deletion requires confirmation and moves the record to the database basket.

## Rename and deletion of groups

In version 1.0.4, the regular folder has a **.** menu, which is also available on PCM.
Select **Rename **, enter a new name and save it. Records and attachments
Folders store their identifiers; paths in cards are updated automatically.
On the phone, first select the folder through the group button, then click **е** next to it.

**Delete** requires confirmation and transfers the selected folder with all attached folders
folders and entries to the basket KDBX. This is not an irrevocable removal of content.
Root group ("No folder"), basket and folders already moved into it by these
Actions cannot be changed. If the system basket is nested in a regular folder,
Deletion of this folder is not available, and renaming is allowed. After removing the selected folder, the interface returns.
to her parent or to all groups. Both operations are automatically saved.
including databases through WebDAV; protection against external file changes remains active.

## Recycle bin: cleaning and final disposal (1.0.6)

The system basket KDBX is indicated by the basket icon. Select it or the folder inside.
Click on "Clear the basket" above the list. The team is also available through
**е** / PCM of the cart itself; on the phone - via **е** next to the group selection.
Confirmation removes from the current database ** all groups, nested groups and records**
baskets. The empty system folder remains, the existing data is stored outside it.

For a separate group or entry inside the cart, select **Delete Forever**.
The action requires confirmation; deleting the group includes all of its contents.
Renaming remote groups is not available. The usual folder with the name Trash is not
It is considered a basket: the system identifier KDBX is used.
Cleaning and final removal are automatically saved, including through
WebDAV. Previously created encrypted backups `.bak` are not deleted.

## Ctrl+K from the terminal

1. Press **Ctrl+K**, enter **passwords:** (or **passwords:**).
2. Open the stored locked database or select **Open KDBX **.
3. After the colon, enter the service name, login or the name of the API field.
4. Select **record** with arrows and press **Enter**. The buffer doesn't change at this point.
5. In the submenu, select what to copy: password, login, URL, notes or API field.
   Only the next **Enter** or click on the field copies the value.
6. **Esc** returns from the fields to the records found, another **Esc** returns to the regular ones.
   Teams. If you go back at the time of receiving the field, the copy is canceled.

The values of secrets are not shown in the results, not indexed or indexed.
It's being transmitted by AI. Basket records are excluded from the palette. Copying uses a common
Protected buffer ConsoleCrypt and cleaning time from application settings; commands
At the same time, they are not executed in the terminal.

## Preservation and compatibility

Changes are automatically recorded after each transaction is confirmed.
Local Preservation Creates Nearby
an encrypted copy `<имя>.kdbx.<время>.bak` and replaces the source through an encrypted
temporary file. If the source has changed since the opening, overwriting is prohibited.
Backups are deleted by the user. **Save a local copy** requires
The new name does not replace an existing file.

Supported AES-256 / ChaCha20, AES-KDF / Argon2d / Argon2id; password, binary
32-byte, 64-character hex, XML v1/v2 and arbitrary key file, including
Mode only the key file. Attachments and history are saved when editing
records; separate attachment interface, TOTP, change of master password
And the KeePass challenge-response hardware keys are not implemented.
Renaming and deleting groups is available from version 1.0.4. FIDO2 is used locally to open quickly, unchanged
format KDBX.

Limits: base 128 MiB, key file 1 MiB; Argon2 up to 256 MiB, 50 iterations
16 streams; AES-KDF to 100 million rounds. The employee's operation is cancelled through
two minutes. New base: KDBX 4, Argon2id 64 MiB, 3 iterations, 1 stream.

Used kdbx.dart 2.5.0, GPL-3.0. Sources, licenses and changes are
c `client/flutter/vendor/kdbx` . Compatibility of test bases additionally
It is verified by an independent PyKeePass reader.

## Android and iOS at 1.0.0

Local KDBX from the system dialog is imported into the permanent private directory.
Applications: A temporary copy of the picker may disappear after the dialog is closed.
Autosave changes this encrypted copy. Use it for unloading.
**Save a local copy** and complete the export dialogue. Original
The document is not overwritten automatically. When the opening is cancelled, only
A new incomplete copy, not the original file.

WebDAV opens directly and works with the same deleted file on all operating systems.
On a narrow screen, the base and folder are selected by a compact menu, list and card.
They show up in turn. For actions with the record available "..." and long press.

Quick system unlock implemented for Windows Hello, Apple Secure
Enclave and Android Keystore. FIDO2/PRF stays on Windows/macOS; Linux-port
The biometrics have not yet been implemented. Public iOS Package – Simulator only on Mac
It does not confirm the physical scanner on the iPhone. More details:
[поддержка платформ](PLATFORM_SUPPORT.md).

## English: rename and delete groups (1.0.4)

On desktop, right-click a normal folder or open its ** menu** menu. **Rename** keeps
entry and subgroup IDs and refreshes their paths. On a phone, select the folder
with the groups button, then open the adjacent ** ** menu.**Delete** requires
confirmation and moves the complete subtree to the KDBX recycle bin, preserving
its entries and secrets. Root and recycled groups cannot be renamed or recycled again.
A normal folder containing the system recycle bin can be renamed but cannot
deleted be, avoiding a move into its own descendant. Both operations autosave to local files or WebDAV and retain external-change
protection. After deletion, navigation returns to the parent or all groups.

## English: recycle bin (1.0.6)

The actual KDBX recycle bin has a trash icon. Select it or a recycled folder and
use **Empty recycle bin**, or open the bin's **.**/right-click menu. On phones,
the selected group menu is next to the groups button. Confirmation permanently
removes all recycled groups, subgroups and entries while maintaining active data;
The empty system bin stays. A recycled group or entry also has **Delete
permanently**, with confirmation. Both operations autosave locally or through
WebDAV. Existing encrypted `.bak` files are kept.
