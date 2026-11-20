# ConsoleCrypt 0.5.5

Translated reference · [Russian source](../RELEASE_0_5_5.md)

## Russian

On the phone, RDP automatically opens to the full screen. Permanent panels
They're replaced by a single floating button, and you can move it to the edge, and you can move it through it.
open the keyboard, change the control mode, select a session and turn off
Desktop without switching off.

- **The default touchpad on the phone.** The finger moves the cursor relative to it.
  provisions. Touch with two fingers -- right click, parallel motion.
  scrolling, pinching - scale 1-4×, double touch with two fingers - enter
  A picture, touching with three fingers - keyboard.
- **The keyboard is on top of the desktop.** The picture is not compressed. Keystrip.
  above the keyboard and a separate sheet offer Ctrl, Alt, Win, Shift, arrows,
  F1-F12 and combinations. One press of the modifier acts on the next key,
  Double fixes it, the next releases it.
- **Size for screen size.** Permission is requested based on orientation and
  Safe area; scale Windows can be selected in settings. If
  RDP server does not support resizing, session continues to work
  with previous permission.
- **Local control settings.** Speed, acceleration, cursor size
  Clarity, orientation and auto-disclosure of the button. Control mode for the host
  It is only remembered on this device.
- **Import SSH -hosts.** Import button in the form of a new SSH -host on the
  The computer offers addresses from standard OpenSSH files `known_hosts`.
  Records can be selected before saving. User names and passwords
  It is necessary to specify separately; the trusted keys are not changed. hashed
  Names, templates, revoked keys and certificate authority records are skipped.
- **Command palette.** New local terminal opens zsh at macOS
  Windows offers PowerShell, cmd and installed WSL distributions.
- Fixed overlapping of the system buttons of the window and side panel on macOS.
  As well as placement of host filters when rotating the phone.
- The Qwen3.5 9B is called the "Heavy". Model identifiers and
  The location of the downloaded files does not change.

The tablet retains the usual layout and manual transition to the full screen.
On Android, the first "Back" reveals control repeated within two
It shuts down the session. It requires confirmation. Lockdown
The repository closes sessions and their dialogues.

[Управление RDP](RDP.md) · [Локальные терминалы](LOCAL_TERMINALS.md) ·
[Локальный ИИ](LOCAL_AI.md)

Archive iOS is intended for Simulator on Mac; it is not an installer for Mac.
physical iPhone. Redirection of folders in mobile RDP is not yet available.
