# ConsoleCrypt 0.6.3

Translated reference · [Russian source](../RELEASE_0_6_3.md)

## Russian

The release is available for macOS, Windows, Linux and Android. Assembly and inspection iOS postponed.

Kubernetes becomes a separate work section: import and encrypted
synchronization of kubeconfig, living resources, YAML with verification of changes, logs,
Shell in Pod, Port-Forward, Helm, GitOps and AI according to the cluster.
Connections can be transferred to trusted devices of colleagues, separately choosing,
Whether to include credentials.

Production contexts are protected by kernel constraints. Terminals `kubectl` and
Flux on the computer uses a local proxy with revocable access. Nana
Native shell, logs and tunnels are available; Android shows active shells
Tunnels in the notification with the stop button.

At the same time, the update download button in the notification is corrected:
Opens an existing boot process without an empty panel. Corrected
Closing a terminal session when there is no listener.
Remove in Flux takes into account the change in the version of the resource by the controller.
Check that the object and its source remain the same.

Mobile RDP touchpad readable by Recovery Kit, import `known_hosts`, local
Terminals and downloaded local AI models are saved.

Details and limitations: [руководство Kubernetes](KUBERNETES.md)
