# GitHub Actions: native client builds

Translated reference · [Russian source](../GITHUB_ACTIONS.md)

The `Client tag release` workflow publishes only an exact stable `vX.Y.Z`
tag whose version matches `pubspec.yaml` and whose commit belongs to `main`
A manual dispatch on the current `main` runs the same audit, tests and five
native packaging jobs as an unpublished candidate. Dispatches on other branches
are rejected before persistent runners receive code. Candidates do not publish
releases, sign update feeds or send announcements. Branch pushes do not build.
No pull request code executes on persistent native runners.

| Runner | Jobs | Required tools |
|---|---|---|
| Dedicated `self-hosted, macOS, ARM64, consolecrypt, client` | Android, iOS Simulator; macOS unless overridden | Flutter 3.47.5, Rust 1.98, Python; Android SDK 36, build-tools 36.0.0, NDK 28.2.13676358, CMake 3.22.1; full Xcode and CocoaPods |
| GitHub -hosted `windows-2025` | Windows x64 | MSVC C++/ATL and Windows SDK; `ci-windows.ps1` provisions Flutter, Perl and Inno Setup |
| GitHub -hosted `ubuntu-24.04` | Linux DEB/RPM | Isolated Ubuntu 22.04 Docker builder, native Secret Service/FFI tests Kubernetes acceptance and Linux CPU local-AI inference smoke |

Repository variable `MACOS_BUILD_RUNNER` overrides only the macOS job using a
JSON label array, for example `["macos-26"]` Android and iOS use the dedicated
Mac; Android retains its existing signing key. `ci-macos-tools.sh` provisions
The pinned flutter SDK when absent. One dedicated Mac serializes its jobs.
The iOS job compiles, installs and launches the application in a disposable
Simulator. It does not require Apple provisioning credentials or produce an IPA.

Native jobs have `contents: read`. All five platform jobs are required before
a hosted publisher validates receipts and publishes seven packages: macOS DMG,
Windows EXE and portable ZIP, Linux DEB and RPM, Android APK and universal iOS
Simulator ZIP, with SHA-256 checksums. It first creates a draft, uploads the
Closed asset set and only then publishes. Only the publisher receives
`contents: write` and `actions: write`. It requests `update-feeds.yml` on trusted
`main` after publication. Website and server deployment have independent tag
workflows. Simulator archives are for Xcode on Mac, not physical iPhones.

Dependency checks run only on GitHub-hosted `ubuntu-24.04`. release
`validate` job runs `client/scripts/dependency-audit.py` (pinned `cargo-deny`
and `osv-scanner` , SHA-256 verified) before any native job starts.
`dependency-audit.yml` repeat it weekly, on manual dispatch and on pull requests
that touch manifests or lockfiles, including Dependabot's. Its audit job has
`contents: read`; a separate job with `issues: write` (never on pull requests)
opens, updates or closes the "vulnerable dependency" issue. Policy and exceptions:
[BUILDING.md](../BUILDING.md#проверка-зависимостей).

On Windows, enable Developer Mode so Flutter can create plugin symlinks, and
Choose a short work directory when registering the runner:

```powershell
.\config.cmd --url https://github.com/evsikovas/consolecrypt-client --work C:\cc-ghw --labels consolecrypt,client
```

Enter the repository registration token at the interactive prompt. The verified
Windows runner uses `C:\cc-ghw`. A longer nested workspace reached 260 characters
Inside vendored OpenSSL and made its native Perl configuration fail even though
the file existed. The short directory resolved the failure; enabling symlinks or
Windows long-path support alone does not fix this Perl limit. When relocating an
existing runner, wait until it is idle and preserve its configuration and old
checkout/cache until the new location is verified.

## Build numbering

`client/scripts/github-build-number.py` sets:

```text
10000 + GITHUB_RUN_NUMBER * 1000 + GITHUB_RUN_ATTEMPT * 10 + platform
platform: macOS=1, Windows=2, Linux=3, Android=4, iOS=5
```

The formula yields `11011` – `11015` for the first run/attempt. Each native job
Also checks that its reserved number exceeds the current source build floor.
Retries receive new numbers. Attempts above 99 and Android versionCode overflow
Closed fail. Do not reset/create this workflow and reuse its run-number sequence
without raising the baseline above all published builds. Don't publish an older person
run after a newer run has already shipped.

Windows native `FILEVERSION` and Inno Setup version components are limited to
`65535`. Packaging currently puts the full build number in the fourth component.
Before exceeding that limit, change and test the Windows metadata representation
while preserving the complete application/update version and monotonic Android
`versionCode`. With the current formula, run 56 exceeds the Windows limit even
on its first attempt; many retries can reach it sooner. The limit applies to both manual candidates and tag releases. Do not reset the GitHub run sequence to work around it.

## Signing and credentials

- Repository variables `ANDROID_HOME` and `JAVA_HOME` point to the existing
  SDK and JDK on the Mac runner when they are outside standard locations.
- No GitHub repository secret is required for compilation. The short-lived
  workflow token fetches source and uploads CI artifacts.
- The Mac Runner Must Maintain The Existing Android Preview
  `$ANDROID_USER_HOME/debug.keystore` (default `$HOME/.android/debug.keystore`).
  `build-android.sh` refuses to silently replace it. A replacement key prevents
  Upgrades over an installed APK.
- Optional repository variable `CC_CODESIGN_IDENTITY` selects an existing
  macOS keychain signing identity by name or SHA-1. Without it, builds retain
  The previous ad-hoc behavior. Developer ID distribution needs notarization.
- The required iOS work produces a Simulator ZIP and requests no provisioning
  iPhone distribution is outside the 1.0.0 release scope.
- The update signing keys `UPDATE_SIGNING_KEY` and `LINUX_UPDATE_SIGNING_KEY`
  for the separate Linux feed remain confined to the separate update-feed)
  workflow. Native build jobs do not receive production credentials or update
  signing keys. See [RELEASING.md](RELEASING.md) and
  [UPDATE_FEED_PUBLISHER.md](UPDATE_FEED_PUBLISHER.md).
- The hosted `announce` job runs after publication. Each channel starts out
  When the owner has configured it: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`
  (project channel), the variable `TELEGRAM_PERSONAL_CHAT_ID` (a second channel);
  `announce-telegram.py` keeps its journal per channel, and `EVSIKOVNET_TOKEN`
  `announce-evsikovnet.py` creates or updates the release on evsikov.net with the
  Russian notes and consolecrypt.dev download links. The scripts refuse to post
  outside this release job; locally use `--dry-run`

Before posting, `announce` waits up to 30 minutes for the public download page
to show this version and link every verified package, including Simulator.
Website deployment uses its separate tag workflow. A timeout withholds every
announcement channel; it does not remove the published client packages.
The manual `Encrypted client compatibility` workflow also runs crypto/sync
tests on an isolated Ubuntu runner without packaging or publication.

Artifacts are retained for 30 days and include only explicit package, checksum
and version paths. The Linux test report uses a redacted, closed JSON schema.
test keyrings, raw runtime output and private fixtures are not uploaded.

## Generated-output cleanup

Full generated-output cleanup runs **only after a stable GitHub Release has
have been published. Persistent Windows and Mac build jobs use `clean: false`
checkout and retain ignored Cargo/Flutter outputs, local packages and the owned
AI smoke cache after compilation, test or upload failures. Diagnostic jobs also
keep them. The workflow records the repository, source commit, run and platform
in a workspace ownership marker before building.

After publication, a separate Mac cleanup job verifies that marker and
the checkout's current `HEAD` The persistent Windows runner keeps its
generated build cache after publication so that the next release builds
incrementally; use the guarded maintenance workflow below to clean it. They perform no checkout and refuse a foreign or
newer workspace. The release, diagnostic and maintenance workflows share one
concurrency group, so another build cannot begin while post-publication cleanup
is running. Publication is recorded only after GitHub has accepted the public
release; a later update-feed dispatch failure does not prevent cleanup of that
already published release. Completed artifact uploads and GitHub logs remain.

This policy applies to tags containing these workflow changes. The immutable
`v0.5.2` workflow still contains the earlier per-job `always()` cleanup. Hosted
Mac virtual machines and Linux ARC `emptyDir` workspaces are ephemeral; retaining
files in a job do not preserve them after that machine or pod is destroyed.
An abruptly terminated persistent runner can also miss its final cleanup job.
use the guarded maintenance workflow below after publication.

Cleanup is restricted to the exact `GITHUB_WORKSPACE` of this repository and
Checks Git root/origin and tracked files before deleting anything. It's closed
list covers Cargo `target` directories, Flutter `build` / `.dart_tool`, Android
checkout `.gradle` / `.cxx`, and `dist`. A symlink/junction in a target's ancestors
links inside generated trees are removed without following them.
Source, `.local` receipts, application models/vault, signing keys, SDKs, Cargo
registry, pub cache and shared tool installations are outside this list.
If a finishing build removes or creates a file during traversal, cleanup retries
only `ENOENT` / `ENOTEMPTY` up to five times (3.85 seconds of total backoff).
Persistent failures remain failures; diagnostics include the error type and errno,
without exception text, absolute paths or environment values.

Windows GitHub jobs reuse `.ci-cache/local-ai-smoke` inside the guarded checkout.
Its ownership marker binds it to this repository and workspace, independently of
the attempt number, so a retry can reuse verified downloads. Post-publication
cleanup removes this owned cache together with generated build outputs. The old
`C:\GitLab-Runner\tools\consolecrypt-local-ai-smoke` cache is preserved unless
an operator explicitly opts into maintenance for that known CI path.

Linux records of its job ownership under `RUNNER_TEMP` before starting Docker and
labels the container with repository/run/attempt/job. Both the normal exit trap
a separate `always()` step call `cleanup-linux-job.py` to stop compute even
When a build fails or is cancelled. The helper checks the ownership receipt,
labels, image and exact `/work` source mount, then removes only the inspected
Immutable container ID. Missing/mismatched ownership or linked paths fail closed.
The helper retains the owned source scratch and a safe receipt; ARC eventually
removes its shared `emptyDir` with the pod. The builder image and shared Docker
Layers are retained. There is no global Docker prune or volume deletion.

`Runner generated-output maintenance` is a separate, **main-only** manual
workflow. It does not build packages, deploy, receive signing secrets or change
tag releases. It uses the same concurrency group as release builds, so it waits
Until the release has been finished. It requires a published stable tag, verifies
that its GitHub Release is public, and refuses cleanup if the workspace's current
`HEAD` differs from that tag. An older published release therefore cannot be used
to erase a newer failed attempt. Its tools checkout is nested separately with
`clean: false`. Inline guards run **before** checkout: they reject symlink/junction
A foreign workspace and an existing tools directory unless it is
empty or already the expected clean Git checkout (including untracked/ignored)
files). Checkout must not erase
Unknown files before the guarded cleanup runs.

```sh
gh workflow run runner-cleanup.yml --ref main -f platform=macos -f published_tag=v0.5.2
gh workflow run runner-cleanup.yml --ref main -f platform=windows -f published_tag=v0.5.2

# Explicit one-time cleanup of known old Windows CI GGUF/download/runtime files.
gh workflow run runner-cleanup.yml --ref main \
  -f platform=windows -f published_tag=v0.5.2 -f legacy_windows_ai_cache=true
```

The legacy-cache option defaults to false, accepts no arbitrary path, rejects
links/reparse points and unexpected runtime contents, and preserves selection,
logs, receipts and unknown files. It does not inspect Windows application data.
Deletion boundaries are tested with tiny owned temporary repositories by
`python3 -m unittest discover -s client/scripts -p 'test_ci_cleanup.py' -v`.
The Windows junction test runs on Windows and is explicitly skipped elsewhere.
`test_cleanup_policy.py` also verifies that a failed release creation/publication
does not emit the publication signal that allows full cleanup.
`test_linux_cleanup.py` covers Docker ownership boundaries; `tests/test_linux_ci.py`
also kill a synthetic producer shell with `SIGKILL` and invoke final cleanup as
a new process, without relying on its exit trap. These use a fake Docker, not
live user containers.

## Russian

`main` stores the verified source base. To release, raise the version, add
release notes, send a commit to `main`, then tag `vX.Y.Z` to that commit.
Only the tag triggers the builds. After successful assembly of all workflow platforms
Publishes the full GitHub Release and launches an update of the signed tape.
Packets Android are signed with the previous runner key. iOS in CI is not going to
(Assembly delayed; locally only Simulator preview)

After publication, the task `announce` announces the release in channels that
set up by the owner: Telegram-channel of the project `TELEGRAM_BOT_TOKEN`
`TELEGRAM_CHAT_ID`), second channel (variable `TELEGRAM_PERSONAL_CHAT_ID`; journal
`announce-telegram.py` via channels) and evsikov.net `EVSIKOVNET_TOKEN`:
`announce-evsikovnet.py` creates or updates a release with Russian notes and
link to consolecrypt.dev. Outside of this task, scripts are not published; locally,
`--dry-run`.


### Diagnostic tag Windows

For isolated verification of ConPTY before a new stable release is created
unchangeable tag `check-windows-0.5.2-1` (following attempts is a new number).
`windows-native-check.yml` on hosted runner checks tag format and affiliation
commit `main`, then launches `ci-windows.ps1 -NativeOnly` at Windows.
This mode compiles and performs only native tests; it does not back up
installer number, does not collect the application, does not download models and does not publish
release. Intermediate results are maintained both after success and after error.
Complete cleaning is carried out only after the publication of a stable release.
Diagnostic and release jobs use a common queue to clean up
The published issue did not intersect with the new diagnostic assembly.
Regular release on `vX.Y.Z` repeats the full set of checks and packaging of all platforms.

### Pre-assembly Windows

`windows-preview.yml` is manually launched (Actions → Windows preview build)
Run workflow, a branch to choose from on the cloud `windows-2025`. He calls.
`ci-windows.ps1 -PackageOnly`: installs tools and assembles installers and
Portable ZIP without a test run of the release. The result is an artifact
`windows-preview` for 14 days; release, update tapes and build number not
affected. It's a manual check assembly, not a release.
