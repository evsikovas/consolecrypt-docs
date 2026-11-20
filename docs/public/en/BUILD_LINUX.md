# ConsoleCrypt for Linux: installation and assembly

Translated reference · [Russian source](../BUILD_LINUX.md)

Linux - version is intended for **x86-64** and graphical desktop.
The package `.deb` is used in Debian/Ubuntu and `.rpm` in Fedora.
Packages contain the client, Rust bridge, Flutter engine, icon and application menu item.
The basic build is **Ubuntu 22.04**. Separate installation and launch inspection
**Debian 12** and **Fedora 43** with X11 and software rendering
For historical version 0.2.5, the results of the current CI are given below.
Current release - **0.5.6**: DEB and RPM are in [вложениях GitHub-релиза](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.6).

## System clerk

The client needs the D-Bus of the current session and the provider **Secret Service** with the already created one.
and the unlocked main keyboard. GNOME Keyring: It's usually the same.
Unlocks the entrance to the graphic session. In another environment, set up a compatible
Provider Secret Service and unlock the keyboard by means of the desktop.
The client does not create or unlock the keyboard and does not save the keys in the open.
Seen in her absence. Start ConsoleCrypt from your user.
**without `sudo` and within a graphics session, rather than with a separate SSH console.

## System-based folder selection for RDP

Starting with version 0.3, selecting a local folder uses **XDG Desktop Portal** in D-Bus
your graphics session. DEB/RPM packets require service `xdg-desktop-portal`.
The dialogue itself is provided by a separate provider **FileChooser**
desktop: `xdg-desktop-portal-gnome` for GNOME,
`xdg-desktop-portal-kde` for KDE Plasma or `xdg-desktop-portal-gtk` for environments
GTK. The provider is usually part of the desktop. If he's not,
install the appropriate package via `apt` or `dnf` and re-enter the graphics
session. ConsoleCrypt does not assign a provider instead of desktop settings.

In wlroots environments, one `xdg-desktop-portal-wlr` is not enough to choose from.
Folders: You need an additional provider with FileChooser, such as GTK.
This is the requirement of the chosen [RFD XDG backend](https://docs.rs/rfd/0.15.4/rfd/#xdg-desktop-portal-backend).
Do not run an application with `sudo` or a separate D-Bus from another user.

Installation and launch checks of version 0.2.5 below do not confirm the work of the new version
RDP dialogue. Folder selection and file sharing in Linux 0.5.6 require separate verification
Ready-made client in a graphic session with a working portal.

## Installation `.deb`

Download the package to [странице загрузки](https://consolecrypt.dev/download?lang=ru).
Open the terminal in the download directory and substitute the exact name of the received file:

```sh
sudo apt install ./ConsoleCrypt-0.5.6+23013-linux-x64.deb
consolecrypt
```

`apt` establishes system dependencies; you can also open the packet with a graphical
program manager. If you do not have a Secret Service provider,
`gnome-keyring` and re-enter the graphics session.

## Installation `.rpm`

```sh
sudo dnf install ./ConsoleCrypt-0.5.6+23013-linux-x64.rpm
consolecrypt
```

Fedora also needs a Secret Service provider, such as `gnome-keyring`.
Do not use `rpm --nodeps`: library checks must be performed `dnf`.

## Update and deletion

With version 0.9.14, a copy from DEB or RPM is updated from the app: **Settings →
Updates → Download and install ** checks the package on a separate signed tape
Linux and SHA-256, asks for the administrator password `pkexec` and puts it through
`apt-get`, `dnf`, `zypper` or `rpm`; new version opens with a button
"Reset" [UPDATES.md](UPDATES.md). 0.9.14, and a copy without
`pkexec` manually update: download a new package and repeat the command
`apt install` or `dnf install`. The installed version contains the assembly number,
Therefore, the package manager distinguishes reassemblies of one release.

```sh
# Debian/Ubuntu
sudo apt remove consolecrypt
# Fedora
sudo dnf remove consolecrypt
```

Installing and deleting a package does not change the profiles in the home directory or keyboard.
Before transferring data between computers, save an encrypted backup
and a recovery kit. Do not remove the keys in the system keyboard manually.

## Assembly from source materials

Clone the entire repository along with `crates/`. Need Flutter **3.47.5**,
Rust of `rust-toolchain.toml`, Python 3.10+, Clang, CMake, Ninja, pkg-config,
GTK 3 headers, C/C++ compiler, Perl and tools `dpkg-deb` / `rpmbuild`.
For Ubuntu 22.04:

```sh
sudo apt update
sudo apt install clang cmake ninja-build pkg-config libgtk-3-dev libwayland-dev libstdc++-12-dev \
  build-essential perl libssl-dev python3 dpkg-dev rpm
client/scripts/build-linux.sh
```

Script reserves a new build number, compiles a real backend
`CC_MOCK=false` and creates both packets in `dist/linux/` together with SHA-256,
The exact version and description of the native files. Do not run several at the same time.
Flutter-assembly in one directory. Save `Cargo.lock` and `pubspec.lock`.

For a reproducible environment, there is
[`client/ci/linux/Dockerfile`](https://github.com/evsikovas/consolecrypt-client/blob/main/client/ci/linux/Dockerfile): Ubuntu 22.04,
Verified revision of the official Flutter and fixed Rust. Job `linux`
c [GitHub Actions](GITHUB_ACTIONS.md) uses Docker on a separate Linux x64
runner `cc-linux-k3s` and mounts only prepared public sources;
home directory, D-Bus, keyboards, SSH keys and Kubernetes configuration
They're not transferred to the container.

Image also contains Wayland Headers for Addiction `ashpd` and Service
`xdg-desktop-portal` / `xdg-desktop-portal-gtk` for own isolated
A graphical screening session. The presence of these packages in itself does not confirm the
Opening the dialog: you need a running portal, FileChooser provider and
separate check of folder selection. GTK-provider of test image is not assigned
It's a custom desktop.
Before packaging, the job passes tests of the real Rust bridge and the creation scenario
Storage, restart and unlock through the interface. They're made for them.
separate Xvfb, D-Bus and encrypted test keyboard that are deleted after
checks. Only fixed stages and results are included in the journal.
without passwords or words of recovery.

## Checks and limitations

Current [Linux job выпуска 0.5.6+23013](https://github.com/evsikovas/consolecrypt-client/actions/runs/39377995191/job/118480579580)
Successfully completed on 20 October 2026 (UTC). In an isolated environment, they passed
two integrations of the present Rust bridge `rust_core_test.dart`, 2/2, scenario
Creating storage and restarting/unlocking via UI
`app_persistence_test.dart`, 1/1) and Secret Service roundtrip.
Created DEB and RPM; dimensions and SHA-256 of published packets checked with GitHub
asset metadata and [SHA256SUMS-0.5.6.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/SHA256SUMS-0.5.6.txt).

| File. | Size, byte | SHA-256 |
| --- | ---: | --- |
| [DEB](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.deb) | 26 693 850 | `c484f2b38832351f729ce8d15493004e4e6cd6613f330f09cab6ac21e0adf51a` |
| [RPM](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.rpm) | 36 027 657 | `8066884c2940ea7efc1a6074365dc9a2355211b44e9a4922348c164cf63e5eb0` |

Native integrations were performed in a separate test assembly. Ready DEB/RPM
did not pass visual acceptance of the installed interface. This run.
does not repeat the installation of packages in Debian/Fedora or check this
RDP session, folder selection and file transfer through the portal.

Historic run 0.2.5: GitLab [build-linux 1358](https://git.evsikov.net/publics/consolecrypt/-/jobs/1358)
I went through two Rust Bridge integrations and one full UI scenario: building a storage facility.
Save the host, restart, and unlock with the true Test Secret Service.
The DEB/RPM of that run is separately installed in Debian 12 and Fedora 43: verified
dependency, update `0.2.5-79 → 0.2.5-1358`, removal/re-installation,
Native libraries and the welcome screen. The safety check used
only synthetic markers in a separate HOME/connector; it does not confirm
migration of the current user storage.


```sh
python3 -m unittest discover -s client/scripts -p test_linux_packaging.py -v
(cd client/rust && cargo test --locked -p cc-platform-core --features os-keychain)
(cd client/flutter && flutter analyze && flutter test)
```

Tests of the real keyboard are run only in a separate disposable environment:
`client/rust/platform-core/tests/run_linux_secret_service.py` Creates His Own
D-Bus sessions and test keyboards. Do not run them on the user's login keypad.

The main SSH backend is built into the client. Optional backend **System OpenSSH**
additionally requires `ssh`; its proxy mode uses OpenBSD-compatible `nc`
with keys `-X` / `-x`. Fedora Ncat and other variants `nc` with different parameters
It's not suitable for this regime. For normal connections, choose the main backend.

Linux ARM64, Flatpak/AppImage, RPM for RHEL, physical GPU and Wayland for now
Not verified and not included in the confirmed matrix of this release.

The full AGPL-3.0-only license is included in the package. Licenses of third-party components
stored in Flutter notices and attached license files.
