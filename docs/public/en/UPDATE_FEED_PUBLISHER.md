# Signed update-feed renewal

Translated reference · [Russian source](../UPDATE_FEED_PUBLISHER.md)

`.github/workflows/update-feeds.yml` runs on GitHub -hosted Ubuntu independently
of native builds. It checks daily and supports a manual run from `main`. Aah.
published stable-release event only dispatches a separate run on `main`; the
release-tag job never receives the signing secret. There are no PR triggers or
Self-hosted signing jobs.

The repository secret **UPDATE_SIGNING_KEY** must contain the existing Ed25519
PKCS #8 PEM private key. The publisher checks it against the public key already
embedded in installed clients:

```text
aK3R5vXwJ9eeqQ1iYah9fzBAIHOeKNejoRdI8weXUYo=
```

This is a trust-anchor check, not a request to create a new key. An operator
must bootstrap the first release with an already signed `stable.json` and
`legacy-stable.json`. The publisher refuses to infer trust from unsigned release
metadata alone. Keep the offline signing-key backup outside Git and the VPS.
The workflow has no server SSH key or Timeweb token. The signing key is loaded
from the environment into memory, never written to a file, artifact, log or
installer. Tests generate ephemeral keys at runtime and do not read the secret.

## Publication checks

The publisher:

1. The latest non-draft, non-prerelease `vX.Y.Z` release in
   `evsikovas/consolecrypt-client`, and refuses a latest tag below another stable
   release. At most 99 historical releases and 32 assets per release are accepted;
   larger histories require an operator to review and extend the bound.
2. Reads `SHA256SUMS-X.Y.Z.txt`, requires exactly one Windows x64 EXE, macOS
   Universal DMG and Android ARM64 APK, and checks their names, build numbers,
   Sizes and available GitHub SHA-256 digests
3. Verifies an existing signed feed with the embedded public anchor. It rejects.
   version/build downgrades and changes to the identities of an already signed
   release version. A new release needs a new version and greater build numbers.
4. Leave a complete current pair unchanged while both have at least 14 days
   remaining. Otherwise it streams and hashes all three installers, enforcing
   a 500 MiB bound per file. It follows only the exact repository's GitHub asset
   paths and its `release-assets.githubusercontent.com` CDN namespace; the API
   Token never accompanies a public download.
5. Rechecks release metadata for races, then signs a 90-day pair and uploads it
   as public release assets using the short-lived `GITHUB_TOKEN`
   `contents: write`.

`stable.json` uses `https://updates.consolecrypt.dev/releases/VERSION/NAME`.
`legacy-stable.json` uses `https://updates.consolecrypt.evsikov.net/releases/VERSION/NAME`.
The same version, build numbers, byte sizes, SHA-256 values and signing identity
are used in both. The legacy endpoint serves the last document as its
`/stable.json`. Keeping old URLs alive is necessary for installed clients that
Do not trust GitHub or the new domain.

## Serving the Public Files

The VPS needs only the **public** signed release assets and installers. It is.
separate mirror must verify signatures, identities and hashes, retain the last
good files on verification or download failure and atomically replace each feed
only after both feeds and all referenced installers have passed verification. Don't.
Put the signing private key on that server. The publisher does not deploy the
website or modify account data.

GitHub does not provide an atomic replacement of two release assets. All checks.
finish before replacement starts; on an upload failure the publisher attempts
to restore the preceding feed from memory. A later run can repair a pair
one surviving valid feed. The serving mirror must not delete its working files.
Because an asset is temporarily missing or a run fails. An expired signed
baseline is accepted for renewal, but installed clients still reject an expired
feed until renewal reaches the mirror.

This design requires editable release assets. If GitHub immutable releases are
enabled, the publisher fails closed; move the two feed assets to a separately
reviewed mutable distribution channel before enabling that setting.

Run deterministic publisher tests without any production credentials:

```sh
node --test client/scripts/test_publish_update_feeds.mjs
```

## Restoration a disabled schedule

GitHub automatically disables scheduled workflows in a **public repository after
60 days without repository activity. Check the workflow when returning to an
a configured daily schedule is not a promise of indefinite
execution. [GitHub: disabling and enabling workflows](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/disable-and-enable-workflows)

Re-enable this existing workflow and request a check from the trusted default
branch:

```sh
gh workflow enable update-feeds.yml --repo evsikovas/consolecrypt-client
gh workflow run update-feeds.yml --repo evsikovas/consolecrypt-client --ref main
gh run list --repo evsikovas/consolecrypt-client --workflow update-feeds.yml --limit 3
```

Confirm the run succeed and inspect the public feed expiry after the VPS mirror
run. A still-valid pair with at least 14 days remaining intentionally left
changed. An expired, correctly signed baseline can be renewed, but clients
Cannot accept it until the renewed feed reaches the serving mirror. No keepalive.
commits or separate scheduling service are required by this workflow.

## In Russian.

Workflow **Signed update feeds** checks the release every day. Signature executed
Only the code from `main` to GitHub -hosted runner. The original private key is stored
GitHub secret `UPDATE_SIGNING_KEY`, used only in memory and does not fall
VPS. Existing customers continue to check the previous public key.

With a remaining period of less than 14 days, workflow re-checks the installers and releases them.
A new signed pair with a term of 90 days. The publication of the release also triggers verification.
The first trusted pair is published by the operator; without it, automatic signature is prohibited.
The verified public mirror on the server saves the previous working files when the failure occurs.
The old update domain continues to serve the installed versions of the client.

In a public repository GitHub, it turns off the schedule after 60 days without activity.
After such a break, turn on the existing workflow command `gh workflow enable`.
and run a manual check from `main` as shown above. Check the result and
Public feed expiration date after mirror update; expired document
The client accepts only after its re-signing and delivery.

## Linux feed (FEAT-06)

DEB and RPM packages have their own signed document, `linux-stable.json`.
listing `linux-x64-deb` and `linux-x64-rpm` with
`https://updates.consolecrypt.dev/releases/VERSION/NAME` URLs. It is signed by a
separate Ed25519 key in the repository secret **LINUX_UPDATE_SIGNING_KEY**; Linux
clients embed only its public anchor:

```text
Fn0pzhn51t/i8e8VYt7/wJkkXa7n2PkYtILgnxsuVlc=
```

The same run signs it after the main pair, with the same checks: the release
checksums, streamed package hashes, a 90-day lifetime, renewal with less than 14
days left, and no version or build downgrade against an earlier signed Linux
feed. The first Linux feed is signed from the release itself
earlier Linux baseline to bootstrap from). Without the secret the Linux feed is
skipped and the main pair is published as before. The two keys are not
interchangeable: each is checked against its own anchor before any request.

## In Russian: ribbon Linux

A separate signed `linux-stable.json` is published for DEB and RPM. His.
sign your own key Ed25519 from a secret `LINUX_UPDATE_SIGNING_KEY`;
Customers Linux only know its public key (above). The checks are the same as for
The main pair; the first tape Linux is signed on the release itself. A secret yet.
No, the tape Linux is skipped, and the main pair is published as before.
