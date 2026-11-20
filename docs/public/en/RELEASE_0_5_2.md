# ConsoleCrypt 0.5.2

Translated reference · [Russian source](../RELEASE_0_5_2.md)

## Russian

The first edition of the 0.5 series: local terminals, extended catalog
models and save downloaded local AI when upgraded.

- ** Local terminals at macOS and Windows :** zsh, PowerShell, cmd and separate
  tab for each installed WSL distribution. You can keep them close.
  with SSH -sessions. Supported interactive input, resizing,
  Control keys and completion of the process when closing the tab or blocking.
- **Obvious target for AI: ** Local shell transmits its dialect without fictitious
  SSH - host. For local AI commands and snippets, an insert without Enter is available;
  The execution after the inspection remains manual. SFTP and mass launch for SSH.
- **Three local models: ** lightweight Qwen2.5-Coder 1.5B, medium Qwen3.5 4B and powerful
  Qwen3.5 9B. Settings show the load volume, RAM reference, sources and
  licenses. The star recommends the option for the total memory of the computer, without changing
  Your choice is automatic.
- **Save local AI when upgrading:** engine installation separate from
  GGUF files. The tested model is reused; the change of model does not remove
  The rest. Removing the selected model does not remove other models and engine.
- ** macOS :** Running a regular zsh requires logging out of the App Sandbox. Previous data
  containers used on site; the current package is signed ad-hoc and not
  notarized; in case of conflict of two storages or an error
  Access launch stops with an explanation. Vault and Keychain should not be removed.
- ** Windows :** Freezing when closing the local terminal before completion
  Starter exchanges ConPTY; PowerShell and cmd are verified on the present Windows runner.
- Fixed the procedure for restoring the terminal buffer after missing events
  And the contrast of the mobile RDP panel in a dark theme.

Details: [локальные терминалы](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/LOCAL_TERMINALS.md), [локальный ИИ](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/LOCAL_AI.md)
and [обновления](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/UPDATES.md). Local shells and built-in local AI are available
On macOS / Windows; Linux and mobile platforms retain existing capabilities.
The iOS package is designed for the Simulator, not for installation on a physical iPhone.

### Packages 0.5.2

All seven files are published in [релизе v0.5.2](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.2).
Sizes and SHA-256 are checked against published files;
Use [SHA256SUMS-0.5.2.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.2/SHA256SUMS-0.5.2.txt).

| Platform | Assembly | Format |
| --- | --- | --- |
| macOS ARM64 and Intel x86-64 | 0.5.2+21011 | Universal DMG |
| Windows x64 | 0.5.2+21012 | EXE and portable ZIP |
| Linux x64 | 0.5.2+21013 | DEB and RPM |
| Android ARM64 | 0.5.2+21014 | APK |
| iOS Simulator on Mac | 0.5.2+21015 | Universal ZIP |

Windows Packets do not have an Authenticode signature. APK retains the previous certificate
iOS preview was installed and launched in Simulator; [инструкция запуска](BUILD_IOS.md)
This is not an RDP check on a physical phone. On Windows confirmed the present
PowerShell/cmd and generation by all three local models on the CPU. Several.
Real WSL distributions and updates to 0.4.1 were not included.
A verified matrix. RU/EN images show a real interface with synthetic
data; they are not a record of these native checks.

Before updating, save a backup and recovery kit;
Do not delete application data, models or system keychain.
