# Public access ConsoleCrypt

Translated reference · [Russian source](../SHARING.md)

Sharing refers to selected hosts, snippets, collections, and individual
secrets. Your personal storage and key are not shared with colleagues. Participants
One synchronization server should be used; it should support and
Allow appropriate functions. A local profile does not send data.

## Check server support

Selected hosts are available on the public server `https://sync.consolecrypt.dev`.
Snippets, Shared Collections, Individual Secrets and Confirmed Addition of Own
devices. In its server, the administrator includes these features separately:
[настройки Docker Compose и Helm](HOSTING.md). Enabling the function does not publish
Personal data: sending the selected item requires explicit action by the owner.

In client **0.2.0 and later ** click **Sharing → Update Shared Data**,
to re-check the capabilities of the server after they are turned on or the network
mistakes. The button is available for the unlocked synchronization profile. Annex
shows separately connection, authorization and secure OS storage errors;
It does not mean that the function is disabled. In the old version, the button may be
Inactive after a previously unsuccessful check-up – update the client first.

## Navigation in the client

In **0.2.2 and later** tab **Available to me** shows the received items, and
**I have shared the elements that you control. Device block
Separately located: **Add this device** launches a request from a new device
The device **Confirm the device ** is used on the already verified device.
** Device requests** open waiting actions; continue adding and
Checking the signed history is in **Other activities**.
**The fingerprint of my device keys** is available in the section title. Transition between tabs
or the import of the package does not in itself give access.

## Start working together

1. A colleague enters the same server.
2. From your host or snippet menu, select **Share**. Look at that.
   Which fields will be sent, find a colleague by mail and note
   **Give access to this device**. The keys of the device are fixed on your
   The device with the status "Selected (not checked)".
3. Click **Check ** next to the device (client 0.9.2 and later):
   ** Security code** - 12 groups of digits calculated from keys
   both devices. A colleague opens the same check for your device and
   dictates your code by phone or in person, you enter it (insert disabled).
   You can personally scan the **QR code** from a colleague's screen. Postal address and list
   Devices from the server alone do not confirm the authenticity of the keys.
4. Select rights: **Reader** by default; **Editor** can change the general
   element. Click **Share ** and send the line.
5. Colleagues open **Shared access **Available to me **, checks if desired
   The owner takes the element in the same way. Getting a snippet never
   launches the team.

### Checking the keys of colleagues (client 0.9.2)

- Colleague device statuses: **Selected (unverified)**, **Verified <дата> ** and
  The keys have changed. If the server communicates to a known device other
  keys, new access to this device is not possible before re-checking;
  Existing elements for new keys are not re-encrypted.
- Setting up storage **Shared access: only verified** (Settings →
  Storage: By default, secrets, kube accesses and database connections are issued
  Only verified devices, hosts, groups and snippets - and selected ones.
  The policy applies to new issues and new devices when access changes;
  Existing recipients still have access.
- After the update, all participants in the existing elements are marked as “Selected”
  (untested)." Once a list of recipients of secrets, kube accesses is shown.
  And the DB's worth checking out.
- Items from an unverified owner are labeled "Owner Not Verified": their hosts
  They do not automatically connect, snippets show the source.
- Fixtures are stored in an encrypted profile database on each device
  (Synchronization between devices in the following versions)

The host is sent without a password, private key, personal links to credentials
and local teams. When creating a personal copy, the recipient selects his account.
data or enters a password when connecting. Modified address or SSH - port of general
The host needs to be checked separately before a new connection, including jump hosts.

## Collections and secrets

The general collection contains references to clearly selected common elements. She's not.
distributes rights to subsidiaries: each host, snippet, or secret has its own
composition of participants. The unavailable child element is shown closed.
Adding a personal host to a personal group does not automatically publish it.

The secret is transmitted by a separate action in the credentials with a warning and
confirmation. The value is hidden to **Show** and cleared from the screen by timer,
locking and closing. Copying reverts access to the server.
Password phrase SSH - key is transmitted separately; it is not attached to the key
automatically. Secrets don't make it into AI or into a general metadata view.

## Connections Kubernetes and databases

Contexts Kubernetes and database connections are transmitted only when
server support; the old server hides these activities. Accounts for
the default is not transmitted, but the route through the personal SSH host, the transition profile,
A proxy, tunnel, or context is chosen by the recipient when the copy is saved.
Details can be found in sections Kubernetes and Databases.

## RDP hosts (client 0.9.14)

RDP host can be shared in the same way as SSH host: **Share...** in the menu
hosta. The card includes address, port, user, domain and tags; notes and
saved password - only at a separate mark (password - only verified)
devices. Server and protocol do not change, clients up to 0.9.14
They don't show. Details: [RDP.md](RDP.md).

## Their devices.

From 0.9.14, the device that the server pretends to be yours does not become the recipient.
Secrets, Connections Kubernetes or Databases: Their Devices Get Shared
Access only through a confirmed connection (“Add This Device”).
A search for your own account address is rejected.

## General notes

If the server supports shared notes `supports_notes_v1`, in the right panel
Notes in Object mode for a shared host, database, or context Kubernetes
The "General Notes" block appears. All participants of the object can see it; they can write it.
any participant, change the note - only its author, delete - the author or
owner. Note to Docker-container common SSH-host or to the resource shared
The context is only visible to that container or resource. Tasks and reminders
They're personal.

Notes are encrypted on the device. Notes are provided by the owner's device and
The server cannot change the key or read the text. Bye.
The owner has never opened the notebar for the object, the participants see
Message of waiting. After exclusion of the participant, the owner's device
the next panel opening re-encrypts the notes with a new key; excluded
The participant no longer receives new notes.

## Multiple devices of a colleague

The personal workspace is synchronized by the usual confirmation of devices. Access.
The common elements are checked separately. Owner of the original common element
Opens **New proprietary devices ** and selects an already tested device
colleagues, maximum rights, term and number of new devices. Manual mode selected
by default. Automatic mode must be enabled explicitly; the owner must
Stay online with an unlocked app.

1. Transfer the public permission package to a colleague's new device.
2. There, select **Add this device**, open the package and create a request.
3. Send a request to a colleague’s already tested device, select
   **Confirm the device** and enter the code (6 groups of 5 digits) from the new screen
   Devices - the code itself is not shown or substituted at this step.
4. Return the confirmed packet to the new device and select
   **Other actions → Continue adding the device**. Enter the code from the screen.
   confirmation device.
5. Owner starts checking, new device responds from ** Device Requests**
   The owner then accepts the request. In automatic mode, the owner's application
   This is done for an already confirmed request. Code checks remain
   mandatory in both regimes.

Packages contain public keys and signed confirmations, without passwords.
The private keys and the contents of the item. Package import doesn't give you access.
A new device cannot enhance its role or invite another user.
Once the owner restarts, a new key ownership check may be required.
Disabling the permission is maintained locally even when the server is not available.

## Removal, exit and recovery

Only the owner can delete the common element: starting from the server **0.1.17**
The server rejects deletion from the editor `owner_only`, including from the old ones.
Customers, therefore, the owner’s data is not lost. Recipients lose access immediately.
The server stores the last encrypted content of the deleted item.
**30 days**: in client **0.8.7** and later open **I shared → Recently
Remove ** and press **Restore **. The item is re-published with the same
devices other than those out of access; recipients accept it again by comparing
owner's code. After 30 days, only the signed deletion mark remains.
Deleted elements within this period are counted in the limit of common elements.

The recipient can at any time select **Exit from public access** in the card.
element or in an incoming invitation. All of his devices immediately lose access.
In the server, the item disappears from the list, and the saved personal copies remain.
The Owner sees that the Participant has withdrawn; the next change of rights, the Participant
removed from the signed list. It can only be re-additioned with new ones.
by invitation. These actions are available if the server reports support.
The old server's buttons are hidden.

## Revocation, conflict and recovery

In **I shared → Access control** the owner's original device can
Change the rights and remove the device. Changing participants creates a new key
Encryption and a new version of the element. Data already read and personal copies
You can't call it off. If the transmitted password or SSH key is no longer valid,
Change it to the target server as well.

A network error leaves the signed change in a separate queue. Take a look.
queue and send it back. A conflict of rights or versions blocks the old version.
change; the app doesn't take it silently into a new era. Deletion of the record from
The queue does not cancel the change already accepted by the server.

Secure OS Storage Checkpoints Detect Recovery of Old
local base. Use an explicit reconciliation with the owner and
Checking the signed history. Do not delete Keychain or system keys to
bypass the lockdown. The server is able to delay new states; the client
detects a rebound below the already observed state, but does not promise instantaneous
Global freshness with an unavailable or unscrupulous server.

If the server returned a corrupted record or the record failed to verify the signatures
and encryption, it is hidden, and the rest of the list is working; on the list
“N records were not readable.”
