# ConsoleCrypt 0.3.0 · SSH and remote desktops

Translated reference · [Russian source](../RELEASE_0_3_0.md)

**Added the ability to connect to RDP.**

Windows - Computers can now be kept next to SSH servers in one list
hosts. Select the type of connection when creating the host - the form will show the appropriate
fields. Saved connections are synchronized through your encrypted storage.

- **Work tables in tabs.** Up to four parallel RDP sessions, panel
  Terminal style tab and independent closure of connections.
- **True full screen.** Desktop takes up the entire computer screen.
  The sliding panel on top allows you to switch the connection, to turn the window.
  Return to normal size and close the session.
- ** Text exchange.** Ctrl+V (омV to macOS) transmits local text and immediately
  Insert it into an active RDP session. Permission is included separately for each
  Send and receive buttons are also available.
- ** File sharing.** Select a folder on macOS, Windows or Linux. She'll show up.
  as a redirected disk in Windows. By default, it is only available for reading.
  The recording is included separately.
- **Server verification.** Certificate confirmation prior to authentication; saved
  The password remains in the native kernel and is not transmitted to the interface.
- **Insert in SSH - terminal at Windows .** In addition to Ctrl+V, a combination is available
  Shift+Insert with the same multi-line text check before insertion.
- **Updated guide.** Step-by-step RDP connection, tabs and permissions
  described in Russian and English. The section SFTP is called “Default Editor”.

Addition to Windows - the server does not need to be installed: a standard one is used
Microsoft RDP. RDP traffic goes directly without a synchronization server.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru)
[Руководство RDP](https://consolecrypt.evsikov.net/guide?lang=ru#rdp)
[Исходный код](https://git.evsikov.net/publics/consolecrypt)

## Availability

The exchange via the buffer supports text up to 64 KiB. Transfer of files via buffer
not enabled; use the selected folder for the files. Redirecting folders
While available on computers, with a limit of 256 MiB per file. Server policy
Windows may prohibit these possibilities. Transferring RDP hosts to colleagues for now
iOS remains a pre-assembly for the Simulator.

## A well-known limitation

When you change the connected folder in an active RDP session, you can turn off the session.
If this happens, connect again and select the desired folder. Correction
It is being prepared for the next version.
