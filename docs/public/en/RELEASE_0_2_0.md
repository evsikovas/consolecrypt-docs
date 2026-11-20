# ConsoleCrypt 0.2.0 · Terminal, search and collaboration

Translated reference · [Russian source](../RELEASE_0_2_0.md)

Date: October 1, 2026. Source code: tag `v0.2.0`
commit `dff126c8298b6b9e51f6169df8d407de07c39738`.

## What has changed?

- **Terminal:** The mouse wheel and trackpad work with highlighted text.
  If you drag the pointer above or below the terminal,
  The buffer is scrolled and the allocation continues.
- **Input:** After working with snippets, AI and right panel is enough
  One click on the terminal. Fixed focus races at closing
  pop-up panel and leave the input field of the fixed panel.
- **Fast connection:** `Ctrl+K` / `Cmd+K` looking for saved hosts
  by name, IP address and user name. The results show the address.
  user and port, including group settings. `Enter`
  the selected host through the usual key and credentials check.
  Search for hosts and snippets is done locally; query for AI requires
  A clear choice of AI action.
- **Workspace:** Initial window Windows / macOS enlarged
  up to 1440×900 with limited screen area available.
  When the tab strip is overflowed, a common counter `(N)` is visible.
  On a narrow window, the tools move to the next line.
- **Sharing: **Public servers support sharing.
  Groups, secrets, and the confirmed addition of your own devices.
  In the client, the update button re-checks the availability of functions.
  Even if the previous check returned "unavailable."
  Connection and authorization errors are displayed separately.
  The publication of selected data requires the action of the owner.
- **License:** A short name is displayed in the About window.
  `AGPL-3.0`. Formal identifier `AGPL-3.0-only` and full text
  Licenses retained. Third-party components retain their licenses.

## Packages.

| Platform | Version. | Format |
|---|---|---|
| Windows 10/11 x64 | 0.2.0+1257 | EXE and portable ZIP |
| macOS 12+ Apple Silicon / Intel | 0.2.0+1258 | Universal DMG |
| Android 11+ ARM64 | 0.2.0+58 | APK |
| iOS Simulator on Mac | 0.2.0+59 | Universal ZIP in two parts |

[Скачать и проверить SHA-256](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.2.0).
For iOS Simulator, download both parts and combine them.
[инструкции](BUILD_IOS.md). This package is designed for the Simulator;
Installation on a real iPhone requires a separate signature.

## Checks.

- Flutter: **499 PASS tests, analysis without comment. Regression
  tests check selection and scrolling, return of focus, Cyrillic and IME,
  both right panel modes, host search and sharing recheck.
- [Pipeline 190](https://git.evsikov.net/publics/consolecrypt/-/pipelines/190):
  Windows job 1257 and macOS job 1258 successfully performed the analysis.
  A complete set of Flutter tests and assembly before packaging.
- Local version, export and packaging scenarios: **20 PASS, 1 SKIP**
  A missed macOS check requires PowerShell.
- Versions of EXE and installer Windows, runtime DLL set are tested.
  Integrity of ZIP; DMG, universal architectures and deep/strict codesign;
  previous APK certificate and ELF/ZIP alignment for 16 KiB
  ARM64/Intel Slices and Precisely Build ZIP in Two Parts iOS Simulator
- The full text of the AGPL is included and verified in all four packages.
- All seven public files are anonymously downloaded; sizes and SHA-256
  They are similar to locally verified packages.
- The update server publishes 0.2.0 for Windows 1257, macOS 1258
  and Android 58. Signature Ed25519 verified by previous public key
  References, sizes and SHA-256 match the checked packages.
- The manual is updated in Russian and English: **29 sections,
  72 images**, including host search, highlight scrolling,
  tab counter and both panel modes. The pictures are made from real ones.
  0.2.0 client widgets with demonstration data.

Interactive reception on physical Windows / Android / iPhone devices
It wasn't carried out in this run. Repeat the function check
Public server, set 0.2.0 and click the update in the section
"Shared access."
