# Kubernetes

Translated reference · [Russian source](../KUBERNETES.md)

## Russian

Section Kubernetes combines cluster connections, resources, logs, and terminals.
Pod, tunnels, Helm, GitOps and AI assistant. Major operations operate through
API Kubernetes: install `kubectl`, `flux` or `helm` for viewing,
Logs, shell and port-forward are not required.

### Computer interface

Navigator on the left: list of clusters and folding resource groups
(loads, network, configuration, storage, access, cluster, GitOps,
User resources by API-groups and favorites. The arrow button
folds the navigator, and the main menu of the application when working with the cluster
It folds automatically.

The cluster opens on the view: nodes, running pods, namespaces,
Problems, CPU loading and memory with graphs and state pods. Metrics are taken
from metrics-server. If not, the review will suggest installing the basic version in
`kube-system`; for local clusters with self-signed kubelet certificates
turn on `--kubelet-insecure-tls`. For a production cluster, open first
recording window.

The object card opens on top of the table. Logs and terminal - at the bottom
panels, AI assistant and active port throws are in the right panel.
Right-click on the cluster opens the menu: rename, properties, mark how
Test or sales, color tags, share and export kubeconfig.

### Connection.

1. Open Kubernetes and import kubeconfig from the file or paste YAML.
   On the computer, you can also select several files and scan the folder.
2. Mark the right contexts. Check the address of the API, user, namespace and
   A way of authorization. The original kubeconfig does not change.
3. For a working production cluster, turn on "Prod." If necessary,
   Configure the route through a saved SSH host or proxy.
4. Connect to the context. User rights in Kubernetes continue
   Act: The interface does not grant additional rights.

Tokens and private keys are stored in encrypted storage. Connections
synchronized between devices via a server ConsoleCrypt in encrypted
See. Requests to Kubernetes are sent from device to cluster along the selected route.
The synchronization server does not send this traffic.

All platforms have a token, client certificate, and OIDC supported.
External exec login plugins are only available on the computer. Before importation
Shows command, arguments, and found binary file; startup requires
A separate confirmation of its SHA-256. After file replacement confirmation
requested again. On Windows use `.exe`: shells `.cmd` do not
They're starting. Commands requiring interactive stdin are not executed covertly.
On the phone, select the token, client certificate or OIDC.

In shared access, you can transfer the context to the verified device of a colleague.
By default, credentials are not included: the recipient uses their own.
The transfer of keys or tokens requires a separate explicit choice. Export
kubeconfig also runs separately and creates a file that can contain a file.
Keep it as a cluster access file.

### Resources and protection of production

Select the namespace and the type of resource. The list is updated through watch; search,
Filters and column settings help narrow the choices. Available on the card
State, YAML, events and related objects. For supported workloads
You can open the rollout history and compare revisions.

The change YAML goes through the Difference Preview and dry-run:
“Apply” first checks for changes on the server. Application, disposal,
Scaling and restart require user action. Ownership conflict
not re-recorded without separate confirmation; if refused,
which field manager (e.g. controller) owns the field or which fields
The server rejected it. In a running Pod, you can only change the image.
`activeDeadlineSeconds`, add tolerations, as well as labels and annotations -
The rest changes through the owner (Deployment, StatefulSet, etc.).
Secret hides default values; viewing values is done separately.
Document with markers `[redacted]` can not be used: hidden values are not used.
They're replaced by the text of masks.

“Prod” forcibly restricts changes in the core, including requests from external
CLI via local proxy. You can clearly open a time window on your computer.
records for 10 minutes - it is confirmed by the storage password; on the phone window
unavailable. Each change (application YAML, deletion, restart,
scaling, GitOps actions, Helm rollbacks, mass operations, too
It is supported by a storage password, not by entering a resource name or context.
Mass changes are prohibited in production, even when the window is open. Exec and Port-Forward have separate permissions
production context.

[Deploy a Docker container to Kubernetes](../../../guide/en.md#docker-details-deploy-kubernetes)

### Logs, shells and tunnels

In the Pod card, select the container and open the logs. Available flow, filter,
The time limit and the previous launch of the container. Workload allows you to collect
Logs of linked Pods. Saving on the computer and system exchange on the phone
They're done on request.

Shell opens in the terminal tab. Automatic selection checks
`/bin/bash`, `/bin/ash`, then `/bin/sh`; you can choose the command explicitly.
Copying, searching, and managing terminals use a common interface
ConsoleCrypt.

By default, the port-forward creates a local address `127.0.0.1` and shows the state in the
tunnels. On a computer outside of production, you can separately allow another
IP-interface after warning; on the phone and in production this is not available.
The tunnel stop closes the local socket. On Android active
Tunnels are supported by a foreground service with a notification and a stop button.
Assembly and inspection Kubernetes at iOS postponed. The current release includes
macOS, Windows, Linux and Android. Lockdown of storage (including:
automatic) does not close the session of the cluster: pod terminals and spills
Continue to work, and after unlocking the partition again opens the same
cluster. If the connection settings have changed during the lock, the session
It closes and reopens. The audit journal is written only when
unblocked storage, the history of events during the lock is not
It's still there. Sessions close with a change of profile and exit.

Launched passes Kubernetes and Docker are collected in a common right panel
“Port rollover”: status, local address with copying, traffic and
stop. The panel opens itself after starting the throw.

[Restore a saved port forward](../../../guide/en.md#tunnels-restore)

### Connection to the database

Pod with a standard database port PostgreSQL, MySQL, MariaDB
ClickHouse, Redis, MongoDB) has a button “Connect to the database”. If in the section
“Databases” has already saved the connection with the same route, it immediately
It opens. Alternatively, a form with a route through Kubernetes opens: for Pod
from StatefulSet - to the Pod itself (it has a permanent name), otherwise to the only
Service selecting Pod, or to its Deployment, so that the connection survives
restart the pods. The database name and user are substituted from variables.
The surroundings of the container, if they are specified explicitly; the values from Secret are not readable.
The port transfer is restored at each connection to the base, and
Port-forward permissions of this context apply.

### Helm and GitOps

Helm shows release history, values, manifesto, and differences between revisions.
All string values are hidden; fields with credentials names are hidden
regardless of the type. The calculated values may be
Incomplete if the saved Helm release does not contain dependency defaults.
Comparison with a cluster reads living objects and maps the fields of the saved
manifesto; it is not the result of server defaulting or the conclusion of the controller
Oh, drift. RBAC limitations, incomplete results, and hidden fields are explicitly indicated.
Rollback is available on your computer through a separately authorized installed
`helm`.

GitOps shows Flux sources, Kustomizations, HelmReleases, notifications
Image automation and Argo CD Applications, where appropriate CRDs are available.
Review, dependencies, and resource flow help move from source to workload.
“Flux Related,” “Synchronize with Now”
source, “Flux suspend/resume” and
Argo sync/refresh go through confirmation and production limitations; hints
And the confirmation window explains what Flux will do. Suspension may be accompanied by
The reason and local reminder; the reminder itself does not renew anything.

Optional Flux notifications are enabled for context and run internally.
open annex. The history of events is also included separately, stored
locally in an encrypted database for up to seven days and is not synchronized. Deficiency
The rights or limitation of the scope of data are clearly displayed.

### Context Terminal and AI

On the computer, the context terminal runs the selected local shell.
Its temporary `KUBECONFIG` indicates a local revocable access proxy:
The actual cluster keys are not written into this file. The tab stays tied.
In its context, the chosen namespace is set by default. Installation
Additional CLIs require confirmation of command and installation method.
For a package manager, the source and version determine its settings.

WSL requires `/bin/bash` and is available when a selected distribution can access a protected one.
loopback proxy Windows If the WSL network does not allow this, the launch is canceled.
with explanation; the application does not open a proxy on external interfaces.

AI uses the provider selected in the settings. Before accessing the data
Cluster requires consent; selected providers are sent
and cleared data. AI tools read resources, events, and log tails.
The command, or YAML, remains the sentence: the execution is normal.
Confirmation, risk assessment and production limitations. The chat is contextual. Unlike the local history of events, history
The AI can synchronize with E2EE when the chat synchronization setting is enabled.
