# ConsoleCrypt 0.4.1

Translated reference · [Russian source](../RELEASE_0_4_1.md)

## Russian

- Android: Touchpad mode for RDP. The finger moves the cursor relative to its current
  position; touch presses the left button, two fingers scroll, touch two
  presses the right button with his fingers. Retention is available for drag and separate
  On-screen keyboard. The compact panel saves the working area of the phone.
- Windows / macOS: Install local AI from settings. Qwen2.5-Coder 1.5B Q4_K_M
  downloaded with SHA-256 verification; llama.cpp is included in the macOS packet and separately
  It is set to Windows. Default model
  Selected only on this device, starts on request and unloads
  After 15 minutes of inactivity. The Apple Silicon uses Metal, and the Windows uses CPU.
  Local queries go through existing context filters and command confirmation.
- Fixed automatic lock in case of inactivity and cancellation of AI generation.
- Customer releases are collected only by tags from `main`. Linux uses homemade
  k3s ARC runner Android is a Mac runner with the previous signature key.
- On a clean macOS runner, Flutter preloads the platform's SDK to
  CocoaPods installations. The size of each installer is checked before publication.

Local AI is available at macOS ARM64/x64 and Windows x64. Loading the model - approximately
1.1GB plus engine; an internet connection is needed for installation, not for answers.
The model is small and can be wrong: commands are executed only after confirmation.
iOS The package remains a pre-assembly for the Simulator.

**Update of the old installation:** former address `updates.consolecrypt.evsikov.net`
It's not available now. If the built-in verification uses it, download the installer.
with [страницы загрузок](https://consolecrypt.dev/download?lang=ru), close
ConsoleCrypt and update the existing installation; replace the application with macOS
Applications. Save the backup and recovery kit. Warehouse,
Application data and the system keychain need not be removed. New builds
Receive updates from `updates.consolecrypt.dev`.
