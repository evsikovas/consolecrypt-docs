# ConsoleCrypt 1.0.4

Translated reference · [Russian source](../RELEASE_1_0_4.md)

## Russian

The password manager can now rename and delete groups KDBX.

- On the computer, open the menu **п** at the folder or click on it with the right mouse button.
- On the phone, select a folder through the group button, then open **е** next to it.
- **Rename ** changes the name of the selected folder, saving its records and nested groups.
- **Delete** requires confirmation and transfers the folder with all the contents to the Recycle Bin KDBX.
  The root group and folders in the basket are protected from these actions.
- If the system basket is located inside a regular folder, deleting its parent is prohibited.
  The renaming remains available. This prevents the loss of nested content.
- Both operations are automatically saved to a local file or via WebDAV.
  If the file has changed from the outside, the previous protection against overwriting is maintained.

The correction is included in Windows, macOS, Linux DEB/RPM, Android and iOS Simulator.
iOS The Simulator is designed to run on a Mac, not a physical iPhone.
The synchronization protocol and the server schema do not change; you do not need to update the sync server for this fix.

In CI eliminated the race readiness test Linux-cluster. This check goes through.
before launching native builds of all platforms; the error now indicates a specific
stage without publication of secrets and raw data of the cluster.
