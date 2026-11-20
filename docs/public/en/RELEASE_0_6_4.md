# ConsoleCrypt 0.6.4

Translated reference · [Russian source](../RELEASE_0_6_4.md)

## Russian

The release is available for macOS, Windows, Linux and Android. Assembly and inspection iOS postponed.

** Kubernetes on the computer redesigned.** On the left, the navigator with clusters and
curtailable groups of resources (loads, network, configuration, storage,
access, cluster, GitOps, user resources by API groups and favorites.
The first screen of the cluster is a live view: nodes, running pods, namespaces,
Problems, CPU loading and memory with graphs and state pods. If in the cluster
no metrics-server, the basic version can be installed from the review (for local)
Clusters have a mode `--kubelet-insecure-tls`. The object card opens.
on top of the table, the AI cluster assistant - in the right panel, the bottom panel of logs and
The terminal does not compress the table.

- Cluster menu by right click: rename, properties, mark as
  test or product, label color, share through the synchronization server and
  export of kubeconfig.
- The recording window in the product cluster is confirmed by the storage password.
- The edit YAML itself checks the changes on the server. Pods created
  controllers are now edited; if refused, it is shown which controller
  owns the field or which fields the server has rejected.
- The table and review show the present status of pods (Running, Completed,
  CrashLoopBackOff; objects without status (Service, ConfigMap) do not have a column.
- GitOps: Review no longer falls, Resource Flow is built from left to right
  with Flux cycles.
- Port spills are a separate tool of the right panel; the history of events.
  cards with drop-down text.
- AI Kubernetes works with built-in local model and reduces context
  for small models.

**Terminal and connections.**

- The terminal font is selected from the installed monowire fonts.
- Menu tabs: rename, duplicate, close others and right.
- The background tab with the new output is highlighted, in the side menu -
  separate counter of these tabs.
- Tab signature: name from the list, address or computer name, or nothing.
- Import hosts from `~/.ssh/config` (Include, Host, ProxyJump and keys)
  from IdentityFile.
- Hot keys are reassigned in settings, with a warning about
  Conflicts and resetting to standard.

**Interface.** AI responses display Markdown. At the bottom of the menu, you can see what
The AI answers: built-in model, local server or API. Secure dialogues
colored in theme colors; settings, synchronization and backup pages
It stretches all the way across.

Details: [руководство Kubernetes](KUBERNETES.md).
