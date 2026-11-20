# Updates ConsoleCrypt

Translated reference · [Russian source](../UPDATES.md)

From version 0.1.12 on Windows, macOS and Android (on Linux - from 0.9.14, see below) in the settings there is a section **Updates**:

- **Check updates at startup** - saved on this device
  switch. When it is turned off, there are no requests at launch.
- ** Check for updates** - works independently of the switch.
- **Download and install ** - appears for the new version. Shows the move.
  Download and run the installer after checking the file.

Start-up testing does not establish anything by itself and does not interrupt SSH sessions.
There's confirmation before installation. Profiles, storage and settings are saved.

**Switch from the old update address:** as of October 19, 2026
`updates.consolecrypt.evsikov.net` unavailable. assemblies using this address,
You will not be able to get a new release through built-in verification. Download the installer
with [страницы загрузок](https://consolecrypt.dev/download?lang=ru), close
ConsoleCrypt and update the existing installation. On macOS replace the application
Applications. Do not delete the application with its data, storage or system
Bundle of keys: Manual update saves them. New assemblies are being used
`updates.consolecrypt.dev`. First, save the backup and recovery kit.

At Windows, the installer for the current user is started; the application
Closes the connection and database before exiting. Android is required
Allow you to install updates from ConsoleCrypt and confirm the system window.
On macOS after download, select a new folder or DMG name in the system dialog.
**Save and open. The saved file is checked by SHA-256 and opens:
Complete the application, drag a new copy to Applications, and confirm the replacement.
Cancellation of the dialogue does not start the installation; a repeated attempt uses the verified
download. Existing files are not overwritten.

**Switch from ConsoleCrypt 0.2.1 and earlier versions to macOS :** if it appears after the update
"Can't open the program", download the current DMG with
[сайта через браузер](https://consolecrypt.dev/download?lang=ru)
and replace the application once in Applications. The old bootloader tagged DMG as
created without the consent of the user; this label was transferred to the application.
This is also possible for a copy of the new version downloaded by the old downloader.
Re-downloading the button in the old application repeats the problem even with
new installer: fixing the bootloader starts working only after
The first run of the corrected copy. In versions starting from 0.2.2 is used
System permission to save the installer. Protection
macOS and the sandbox remain on, storage and key bundle need not be removed.

The list of releases is signed Ed25519; the client contains only the public check key.
Files are checked on SHA-256 after download and again before launch.
Incorrect signature, corrupted file, expired list and attempted rollback
They're blocking the installation. Storage, passwords and account tokens are not sent
Update server. It does not have access to the synchronization server or its database.

The publication and signature key are managed outside the public repository. Update
becomes available after publication of the supported platform package,
Checksums and signed metadata.
The update mirror checks releases every 15 minutes. Before the two of them
signed lists of the new release it retains the previous verified version.

## Linux and iOS

0.9.14 copy installed from DEB or RPM (package `consolecrypt`
`/opt/consolecrypt`), updated in the same way as other computers: check
At launch, “Check Updates” and “Download and Install.” Linux has his own tape.
`https://updates.consolecrypt.dev/linux-stable.json` , signed by a separate
key Ed25519; key Windows, macOS and Android does not sign it, and vice versa.
The packet is verified by signature and SHA-256, then the system asks for a password.
the administrator `pkexec`, polkit, and the package manager places it: `apt-get` (or
`dpkg` for DEB, `dnf`, `zypper` or `rpm` for RPM. Profiles, repositories and system
The keyboard is saved; the new version opens with the “Reset” button. If
close the password window, the installation is canceled, and the verified package remains for
Try again. Without `pkexec` or with a package manager error, install the package
manually with [страницы загрузок](https://consolecrypt.dev/download?lang=ru) as
described in [инструкции Linux](BUILD_LINUX.md).

Version 0.9.14 on Linux manually install once: earlier versions of the tape
Linux don't read. A copy not launched from the package (assembly from the source),
The copied folder still shows only the download page.

At iOS, the desktop bootloader is disabled. The new Simulator ZIP is installed
[инструкции](BUILD_IOS.md); a real iPhone requires a separate signature.
