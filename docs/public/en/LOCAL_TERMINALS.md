# Local terminals (local terminals) 0.5

Translated reference · [Russian source](../LOCAL_TERMINALS.md)

## Russian

In the 0.5 series, the local shell opens next to the SSH sessions in the section
"Terminal." It’s a process on your computer with your user’s rights.
The synchronization server and SSH connection are not required.

1. Open the "Terminal" and click the new tab button either `Cmd+T` on macOS /
   `Ctrl+T` at Windows. The general "+" button of the application still selects
   Saved SSH /RDP connections.
2. In the Local Shells group, select **zsh** on macOS or
   ** Windows PowerShell**, ** Command Prompt** or installed **PowerShell 7**
   on Windows. Below are the saved SSH hosts.
3. On Windows, each installed distribution **WSL** is shown separately.
   You can open Ubuntu, Debian and several tabs of the same shell at the same time.
   ConsoleCrypt does not install WSL and distributions automatically.
4. Check the name of the tab: the local shell is signed “This computer”.
   WSL retains the distribution name. Enter, resize, control keys
   Interactive programs run through PTY (ConPTY at Windows).
5. Closing the tab completes the process. "Reset the shell" opens.
   It is not a continuation of the old program. Lockdown of the vault
   (including automatic) does not close terminals: after unlocking
   local and SSH tabs continue to work, as well as preserved SSH tunnels.
   RDP sessions and sessions Kubernetes Change of profile and exit are closed.

Closing completes its own shell and its current foreground group.
Detached background processes (e.g., run through `nohup` separately)
Not wanted; the entire WSL distribution doesn't stop.

For a local tab, there is no action SFTP: SFTP runs through SSH-host.
Local shells do not create fictitious host records and are not synchronized as
SSH - connections. In 0.5 they are available on macOS and Windows; Linux, Android and iOS
They continue to use existing remote connections.

[Paste multiple lines in PowerShell](../../../guide/en.md#local-terminals-powershell-paste)

### AI and snippets

The palette and chat receive the type of shell selected: zsh, PowerShell, cmd or
POSIX shell for WSL. The local terminal does not receive the imaginary address SSH of the host.
The output text is transmitted to the AI only when the context is explicitly selected; check it.
before sending it to the selected provider.

For the local tab available ** "Insert" without Enter**. Automatic button
AI commands and snippets are disabled; mass launch is intended for SSH.
Check the inserted text and if you want to execute it, click Enter yourself.
Normal terminal input is not limited by this rule.

### Update macOS

[Install both apps from the DMG](../../../guide/en.md#first-start-macos-install)

For a normal local zsh session outside the container, packet 0.5 works without App Sandbox.
The current build is signed ad-hoc and not notarized. Hardened Runtime
It is included only when built with Developer ID; this is not a property of the current ad-hoc package. When updating, the application looks for the previous
Profile and local AI data in container 0.4.1 and uses them on site.
Do not remove the container, vault, model files, or system keychain.
If both directories contain data or the previous directory is not available, the application
shows an error before creating a profile: it does not combine different storages and does not
It replaces the old profile with an empty one. Save a backup copy before updating.

### Executive direction and verification

[Глава со снимками RU](https://consolecrypt.dev/guide?lang=ru#local-terminals)
[English guide](https://consolecrypt.dev/guide?lang=en#local-terminals).
Snapshots 0.5 are real Flutter widgets with synthetic shells and text.
The WSL screen displays the Windows interface variant in the widget test, rather than running it.
Windows or WSL. Checks of the installed package are noted separately in
[заметках выпуска](RELEASE_0_5_2.md).
