# RDP at ConsoleCrypt 0.5.5

Translated reference · [Russian source](../RDP.md)

The ability to connect to RDP has been added.

## Connection.

Under **Hosts → New Host**, select **RDP** first. Give me a name.
computer address Windows, port (usually 3389), user name and optional
domain. Use a password account: the password can be stored in encrypted
Storage or enter when connected. Inheritance SSH - group parameters,
SSH - Keys and jump hosts do not apply to RDP.

Windows requires a standard RDP server enabled and permissioned access to
account. There is no need to install the IronRDP extension on the server.
The connection comes directly from your device; the sync server does not transmit
RDP traffic. Before entering credentials, confirm the address and the SHA-256 fingerprint.
Certificate by checking it with the administrator.

To connect, press the central button in the section **Remote Desktop**
or "+" next to the tabs and select the saved RDP host. General "+" button
The top panel shows both SSH and RDP hosts. If the host isn't there yet,
Select **New Host**; from the RDP section, the form opens immediately with the RDP type.

Open desktops are located in the tabs of the **Remote desktop** section.
You can hold up to four sessions, switch between them and close separately.
Saved RDP hosts sync between your devices with the new version
client. An RDP host can be shared with a trusted colleague's device: "Joint"
access" in the host menu transmits the card - name, address, port, user, domain and
Labels; notes and saved password - only by mark (password requires support)
Secrets on the server and, like any secret, verified recipients. Recipient
He keeps a copy and decides whether to take the password. Customers up to 0.9.14 such
They don't show the card.

Before using synchronized RDP hosts, update **all devices
This storage is up to 0.3 or later. Older clients don't show RDP hosts and don't
take their links into account when removing common groups and password credentials.
Such deletion from the old device may disrupt the stored RDP connection.
This compatibility limitation does not transmit passwords to the synchronization server.

## Full screen

The button ** Full screen ** opens the remote desktop to the full screen
The computer hides the side menu of the application. Top panel automatically
Hiding: hover over the blue indicator at the top edge or press
**Ctrl+Alt+Home* to show her off. The panel can be fixed with a pin button.

In the menu with the name of the connection, you can switch open RDP sessions.
There are also available permissions for buffer and folder, folding the window, exiting the window.
Full screen and closing of the current session. Exiting from the full screen brings back
the same size of the window, and the folding retains the connection. Keyboard **Escape **
It is transmitted remotely Windows.

## Control of RDP from phone - 0.5.5

On the phone, an active session automatically takes up the full screen. The only one.
permanent control - floating button: drag it to a convenient edge
or press to open the panel. It allows you to open the keyboard, select
session, change the size, orientation, permissions and text exchange. Position of button
It is remembered separately for portrait and landscape orientation.

**Tachpad is on by default.**Watch your finger as the cursor moves.
about his position. The finger can be raised and rearranged. On the tablet.
**Touching** – click under your finger; full screen is turned on
manually. Switching mode is available in the panel and is remembered for the host only
It's on this device. The connected mouse works directly.

| Touchpad gesture | Action. |
| --- | --- |
| Short touch. | Left clique |
| Two quick touches. | Double click. |
| Double touch with retention or retention of about 500 ms | Drag before releasing your finger |
| Touching with two fingers | Right click. |
| Parallel movement of two fingers | Scrolling. |
| A pinch | Scale 1-4x |
| Double touch with two fingers | Fill in a picture. |
| Touching with three fingers | Show/hide the keyboard |

Keyboard covers the picture, retaining the size of the surface; visible area
Follow the cursor. Above the keyboard is a scrolling bar of keys.
**Keys** opens an extended set including F1–F12 and combinations.
One press of Ctrl/Alt/Win/Shift acts on the next key, double locks
Modifier, another release. Complete the word composition in the system
keyboard before sending special keys.

Permission is requested under the screen and turn. If the server refuses to change
size, remains the original resolution with the possibility of scaling. V.
**Settings → RDP management on the phone** available speed, acceleration, size
cursor, clarity, scale Windows, orientation and self-disclosure of the button.

On Android the first **Back* discloses control repeated within two
It's the end of the session. On iOS select **Curse session** in the panel.
The connection is maintained. **Disable** requires confirmation. Regime change,
session, leaving in the background, opening the panel and blocking release the pressed keys.
Storage locking (including automatic) closes dialogues and hides
Desktop, but not session: After unlocking the tab continues to work.
Sessions close with a change of profile and exit.

[Снимки мобильного управления](https://consolecrypt.dev/guide?lang=ru#rdp-mobile)
They show real widgets with a synthetic desktop. System keyboard
In these pictures, the area is left under it. iOS
It's like an archive for Simulator on a Mac. Redirection of folders on the phone is not available.

### Phone controls - 0.5.5 (English)

Phone sessions open fullscreen with one draggable floating control button.
Touchpad is the phone default: move a finger to move the pointer relatively
and lift it to reposition without moving the pointer. Tablets keep direct
input by default and manual fullscreen. Mode options are stored per host on
this device; an attached mouse uses direct input.

Tap to left-click, double tap to double-click, and double-tap-and-hold or hold
for about 500 ms to drag. Two-finger tap right-clicks, parallel motion scrolls,
a pinch zooms 1–4×, two-finger double tap fits the desktop, and three-finger tap
Toggles the keyboard.

The keyboard overlays a stable desktop instead of shrinking it. A scrolling
key strip and expanded **Keys** sheet provide modifiers, arrows, F1–F12 and
shortcuts. Tap a modifier once for the next key, twice to lock it, then again
to release it. Finish any keyboard composition before sending special keys.

Display size follows the safe area and orientation when the server allows
resizing. If unsupported, the original resolution stays usable with local
zoom. Settings control pointer speed, acceleration, cursor size, clarity,
Windows scale, orientation and button hiding.

On Android, Back opens controls, then another Back within two seconds
Minimizes without disconnecting. On iOS, choose **Minimize session**.
Disconnect asks for confirmation. Locking closes sessions and overlays.
[Guide screenshots](https://consolecrypt.dev/guide?lang=en#rdp-mobile) use
synthetic desktop pixels and reserve a blank area for the native keyboard.
iOS remains a Simulator preview; mobile folder redirection is unavailable.

## Exchange buffer

Text exchange is off by default. Allow it for a specific session.
After that, **Ctrl+V** in the active desktop transmits text from the local
a buffer and inserts it into the remote Windows. On macOS use **.V**.
No need to press the **Send* button beforehand. If the exchange is off,
Ctrl+V works with the most remote buffer Windows and does not read the local buffer.

The **Send** button allows you to transfer text separately without insertion,
**Receive ** - request the current text from Windows. Self-transmission
There is no local buffer change. Unicode-text up to 64 KiB is supported;
Images and copying files via the buffer are not supported.

## File exchange

On macOS, Windows and Linux select the local folder with the system dialog for
a specific open session. In the remote Windows open **Conductor ** and
Enter in the address bar:

```text
\\tsclient\ConsoleCrypt
```

In Linux, the dialog needs `xdg-desktop-portal` and your file selection provider.
Desktop in the current D-Bus session. The setting is described in
[инструкции Linux](../BUILD_LINUX.md#системный-выбор-папки-для-rdp).

The folder can also appear in the “This Computer” section as a redirected folder.
disc ConsoleCrypt. The client provides ** only the selected folder**, including:
regular files and subfolders inside it, without access to other folders and disks
devices. By default, the remote Windows can read and copy these files.
To my place. To copy files from Windows to the selected folder separately allow
recording. Symbolic references, points of re-analysis and going beyond
Folders are not allowed. At Android and iOS, folder redirects are not yet available.

The size of the individual file is limited to **256 MiB**. One session is allowed
**512 MiB Recording Attempts**: Re-recording, overwriting and failed attempt
They're also spending that limit. If the limit is reached, end the session and connect.
Again; the permission of the folder will need to be issued for a new session. This limit is not
It shows the real free space on your device. For the transmission of large
Use a separate suitable means of file sharing.

Initial File Tags, Folder Change Notifications and File
The blockages are not being rescheduled. Changes to ACL and enhanced capabilities
The file system is not supported.

The permission can be turned off in the current session. When locking the storage or exiting
Connections are closed, temporary access is terminated. Policy Windows - Servers
It may prohibit clipboards or redirected disks.

[Иллюстрированное руководство RU](https://consolecrypt.dev/guide?lang=ru#rdp)
[English guide](https://consolecrypt.dev/guide?lang=en#rdp)
