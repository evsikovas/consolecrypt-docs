# Local AI / Local AI - 1.0.0

Translated reference · [Russian source](../LOCAL_AI.md)

## Russian

At Windows, macOS and Linux x64, open Settings → Built-in Local AI.
A selection of three Q4_K_M models is available:

| Option | Model | Download GGUF | General RAM reference point |
| --- | --- | --- | --- |
| Easy. | Qwen2.5-Coder 1.5B Instruct | 1,117,320,768 bytes, about 1.1 GB | 4 gigs. |
| Medium. | Qwen3.5 4B | 2,740,937,888 bytes, about 2.7GB | 8 gigs |
| Heavy. | Qwen3.5 9B | 5,680,522,464 bytes, about 5.7GB | 16 gigs. |

The star recommends the largest variant corresponding to the total memory.
computer (4/8/16 GB). If the memory is unknown or less than 4 GB, there is no star.
The recommendation does not change the selected model or the default box. It's a guide, not a guide.
Speed Guarantee: Leave memory to the system and other programs. On Apple Silicon.
is used by Metal, on Intel Mac, Windows x64 and Linux x64 - CPU. Android and iOS
do not show the built-in installation partition; configure other providers
It's still there.

### Installation and switching

1. Select a model and click “Install Local AI”. Large GGUF files are not
   Install the application. macOS contains a small signed engine.
   llama.cpp, Windows and Linux download it separately.
2. Wait for the download and size check and SHA-256. Progress can be seen in the settings;
   The download can be cancelled and continued later. Installation doesn't start by itself.
   When you start an application or change a recommendation.
3. The “Use by default after installation” checkbox is initially enabled and
   It is stored only on this device. Cloud providers and their
   The synchronized selection remains. Removing the flag brings back the usual choice.
4. Open the chat room or the AI palette. The model starts at the first request; available
   Start and stop buttons. After 15 minutes without request, the process is unloaded.
   And active generation keeps it going.
5. When choosing another model, the current process stops; already downloaded
   The models are preserved. Install a new one if you don't already have one. "Delete" deletes.
   only the selected model and its incomplete downloads, saving other models,
   engine and preferences.

After installing the local model, when the default is enabled, select another one.
The not-yet-downloaded model leads to an offer to install it: it does not forward the request to the cloud provider.
It's invisible to the user. Choosing a model and installing it are different actions.

### Update from 0.4.1

The file name, ID and SHA-256 Qwen2.5-Coder 1.5B are saved. The models lie in
a permanent directory of user data outside the replaceable application package.
Verified compatible GGUF is reused when upgraded or repaired
The engine, without re-downloading. Selected model and default setting
The new recommended model does not replace them.

At macOS 0.5 runs without an App Sandbox for a conventional local shell, but
Uses the previous filled container catalogues in place. Don't remove the container.
model, vault or system keychain. With two different catalogs filled out
or an access error, the launch stops with an explanation; the data is not combined
They are not replaced by an empty profile. More info: [локальные терминалы](LOCAL_TERMINALS.md).

### Context and access

Requests go to `127.0.0.1` with a random token of the current launch, without a system
HTTP - proxy. The Context and Filtering of Secrets Go Through the Existing Core
ConsoleCrypt. The path to the model and the process token are not synchronized via vault.
Storage locking, profile change and exit stop the model. The Internet is needed
when installed, and the answers are calculated on the computer.

Check the proposed commands. In [локальном терминале](LOCAL_TERMINALS.md)
Insert is available without Enter, then manually run after verification; for SSH
Separate confirmation of implementation is maintained. The chat is stored in the session memory.

[Руководство со снимками RU](https://consolecrypt.dev/guide?lang=ru#local-ai)
[English guide](https://consolecrypt.dev/guide?lang=en#local-ai).
Photos are real widgets with demo states; they don't show
Real loading or measuring the speed of the model.

### Sources and licenses

- [llama.cpp b11739](https://github.com/ggml-org/llama.cpp/releases/tag/b11739), MIT.
- [Qwen2.5-Coder-1.5B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF):
  Official GGUF Qwen, Apache-2.0, revision `f86cb2c1fa58255f8052cc32aeede1b7482d4361`.
- [Qwen3.5-4B-GGUF](https://huggingface.co/unsloth/Qwen3.5-4B-GGUF):
  Qwen model, GGUF quantization and distribution of Unsloth, Apache-2.0,
  Audit `e87f176479d0855a907a41277aca2f8ee7a09523`.
- [Qwen3.5-9B-GGUF](https://huggingface.co/unsloth/Qwen3.5-9B-GGUF):
  Qwen model, GGUF quantization and distribution of Unsloth, Apache-2.0,
  Audit `3885219b6810b007914f3a7950a8d1b469d598a5`.

Exact URL , dimensions and SHA-256 are in
`client/flutter/lib/ai/local/local_ai_catalog.dart`. Text is available in the settings
"Sources and licenses of models", including licenses without Internet connection.
For Qwen3.5, the engine is configured without a separate reasoning response. CUDA package not yet
implemented.

### Own model (GGUF)

"Add your model (GGUF) ..." selects the file on the computer. ConsoleCrypt checks
GGUF header (versions 2 and 3), copies the file to its model folder, counting SHA-256 by
The way, and chooses the model; the original does not change, it can be removed. Repeated
Adding the same file uses a copy already made. The model is called by name.
file and marked "Own"; RAM reference point - an estimate by file size (not less than 4 GB).
Check the origin and license of your model yourself. Before each first launch
In a session, a copy is checked against SHA-256. "Delete" deletes the copy and removes the model from the computer.
The list selected becomes Qwen2.5-Coder 1.5B. Your application model will never be
Download: If the copy is missing, delete the model and add the file again. Suitable.
models that read the built-in llama.cpp b11739, with a chat template inside the GGUF.
