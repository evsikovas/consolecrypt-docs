# Release version / Releasing

Translated reference · [Russian source](../RELEASING.md)

Assemblies performed [GitHub Actions](https://github.com/evsikovas/consolecrypt-client/blob/main/.github/workflows/client.yml) in the repository
`evsikovas/consolecrypt-client` [Раннеры и нумерация](GITHUB_ACTIONS.md).
Sources and lock files are stored in Git; installers are stored in release attachments.
Do not add `dist/`, tokens, Android keystore or private signature keys.

1. Raise the version through `python3 client/scripts/bump-version.py --part patch`
   (For functional release, use `--part minor`). Create.
   `docs/public/RELEASE_X_Y_Z.md` with a description of changes and limitations.
2. Check the changes and send the commit to `main`. Push branches don't collect packets.
   Before tagging, run live tests that are not in CI `#[ignore]`:

   ```sh
   python3 client/scripts/live-stand.py list
   python3 client/scripts/live-stand.py sharing
   python3 client/scripts/live-stand.py fingerprint --host <windows-host>
   python3 client/scripts/live-stand.py rdp --host <windows-host> --user <user> --certificate-sha256 <hex>
   ```

   `sharing` raises disposable PostgreSQL 16 in Docker and adjacent
   `consolecrypt-server` on loopback with all public flags and FileMailer,
   Starts sharing and enrollment tests and deletes everything. `rdp`
   Configure (rights 600) for the Windows host on which the owner has authorized the tests;
   The password is taken from `CC_RDP_LIVE_PASSWORD` or `~/.config/consolecrypt-test/rdp.env`
   And it's not printed, it's SHA-256. Kubernetes and Linux
   Secret Service verifies Linux CI task; system query tests
   (Secure Enclave, Windows Hello) is manually run.
3. Create an annotated tag on this commit and send it:

   ```sh
   git tag -a vX.Y.Z -m 'ConsoleCrypt X.Y.Z'
   git push origin vX.Y.Z
   ```

4. **Actions → Client tag release** checks the version, the source commit on `main` and the
   dependency audit (`cargo deny`, `osv-scanner`). See [BUILDING.md](../BUILDING.md#проверка-зависимостей).
   It builds for macOS, Windows, Linux, Android and iOS Simulator. A separate job packages the RuStore builds.
   Before tagging, resolve the open dependency audit issue or record an exception with a review date.
   Run the same checks locally with `python3 client/scripts/dependency-audit.py check`.
   Build numbers are issued separately to each platform; all retain one `X.Y.Z`.
5. After all jobs pass, the publisher verifies `ConsoleCrypt.version` and uploads nine files
   to a draft. These include the macOS DMG, Windows installer and portable ZIP, Linux DEB and RPM, direct Android APK,
   universal ZIP for iOS Simulator on Mac, and RuStore APK and AAB. It uploads
   `SHA256SUMS-X.Y.Z.txt` before publishing the GitHub Release.
   The existing release is not overwritten. If the download is terminated after the creation
   draft, check it manually before restarting; published files
   and the tags remain unchanged, the corrections are issued with a new version.
6. Workflow will separately run a signed tape on a trusted one `main`. Check.
   the results of this workflow and the availability of installers without authorization.
   The site and server are issued with their own tags in separate repositories;
   Customer publication alone does not change production compose.
7. Before you docs and the site link to a new release, check its assets and
   Update the links (neighboring checkout `consolecrypt-docs` and `consolecrypt-site`):

   ```sh
   python3 client/scripts/verify-client-release.py --tag vX.Y.Z --download > verified-downloads.json
   python3 client/scripts/update-release-docs.py verified-downloads.json --docs ../consolecrypt-docs --site ../consolecrypt-site
   ```

   The first script checks the published release: one file of each type,
   one build number per platform, dimensions, paths and digest GitHub vs.
   `SHA256SUMS`, allowable tapes; with `--download` download installers and
   Verifies SHA-256. The second rewrites in README docs title, links and
   assemblies table, and on the site - `download.html`, `index.html` and `assets/en.js`;
   If the previous version is left behind after editing, it does not record anything.
   `--check` only tells you that it will change. Then `npm test` on the site; version
   Sites in `package.json` and `releases/0.1.N.md` are manually edited.

## Switching from the old update server

Customers up to 0.3.2 trust only `git.evsikov.net` and
`updates.consolecrypt.evsikov.net`, including each redirect. Old `stable.json`
Must point to the real files under the old trusted domain, with the former
Signature. Redirect to GitHub or a new domain will not update an old client.
After installation 0.3.2 is used `https://updates.consolecrypt.dev/stable.json`
And the same public key.

Do not change the syncs saved URL in the profiles: they are included in the local sync.
Share access trust binding. Maintain an old API domain as alias
Same server instance and same database; conventional redirect or second independent
An empty server is no substitute for this compatibility.
