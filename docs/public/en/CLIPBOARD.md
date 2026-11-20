# Buffer Exchange / Clipboard

Translated reference · [Russian source](../CLIPBOARD.md)

## Russian

ConsoleCrypt copies data in three ways.

- **Secrets** - passwords, keys, disclosed values Kubernetes Secret, variables
  environment Docker, sensitive database cells, set words
  Recovery text from the RDP session buffer. They do not fall into the history of the buffer and
  Other devices are labeled as secret by buffer managers and removed from
  Buffers after a set time.
- **Personal text** - allocation in the terminal and logs, the results of requests. Not.
  enters the history of the buffer and other devices, but is not deleted:
  The work in the terminal should not interfere. If the secretion looks like a secret
  `password=…`, token, private key), it is copied as a secret.
- **Ordinary text** - paths, identifiers, public keys, commands.

The deletion period is set in “Settings → Security → Clear the clipboard”:
30 seconds to 1 day, default 30 seconds. Team politics can only be
shorten the sentence. Term is experiencing an app restart. Buffer clears, only
If it's still our secret, what you copied later in another app,
It doesn't wash. If a secure buffer on the device is not available, the application
It says, “It was not possible to copy it safely,” and it doesn’t copy anything.

| Platform | What's guaranteed |
|---|---|
| Windows 10/11 | The secret does not enter the buffer log (Win+V) and the cloud buffer; buffer monitors complying with the agreement Windows skip it. Removed on time and when closing the application window. |
| macOS 12+ | The secret does not go to the iPhone/iPad through a universal clipboard, marked as hidden and temporary for buffer managers. Removed on time and when leaving the application. |
| Linux (GTK, X11 and Wayland) | The secret is only in the clipboard, not in the allocation for inserting the middle button. Buffer managers are labeled “secret” (KDE Klipper takes it into account). When leaving the application, the secret disappears, it is not transmitted to the buffer manager. |
| iOS | Only on this device (without Handoff), the system removes the secret on time even when the application is unloaded. |
| Android 11+ | The secret is marked as sensitive: it is not visible in the system copy notification and keyboard prompts. Removed by the alarm clock system, even if the application is folded or unloaded; in power saving mode - with a delay of up to ~ 10 minutes. |

** Android in the background.** Android prevents the folded application from reading the buffer
So we can't verify that it's still our secret. Setting up
Clear the buffer in the background, even if you can not verify that there is our secret.
(Included by default) clears the buffer without checking - it can disappear
text that you copied in another application during the waiting period. If
Turn it off, the secret stays in the buffer until you return to ConsoleCrypt.
Then our secret is deleted, but someone else's text is not. After restarting the phone
Cleaning is completed the next time the application is opened.

Restrictions: An app that had already read the buffer before deleting could
keep the secret; buffer managers who do not support the notes may
write it down.
