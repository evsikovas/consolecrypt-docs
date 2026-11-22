# 命令提示: 控制台crypt- cli

参考文档译文 · [俄文原文](../CLI.md)

`consolecrypt-cli`是一个控制台客户端ConsoleCrypt. 他是安装器的一部分
macOS,Windows和Linux (从0.9.14版本开始),并使用与
应用程序:存储,密钥和证书不复制.

## 安装

** 安排 – 指挥提示 – “安装CLI命令”** :

- **macOS** - 链接`/usr/local/bin/consolecrypt-cli`与内部文件
  `ConsoleCrypt.app` 如果文件夹属于系统,macOS将询问密码.
  管理员。
- **Windows** - 程序文件夹`bin`添加到用户的PATH中.
- ** Linux** (DEB, RPM) - 参考`~/.local/bin/consolecrypt-cli`
  `/opt/consolecrypt/consolecrypt-cli` 如果`~/.local/bin`不在路径中, 一节
  这将告诉你; 将文件夹添加到您的 shell 设置中 。

打开新的终端窗口。 “删除 CLI 命令”只删除链接或
在 PATH 创建的条目ConsoleCrypt 中; 其它同名文件不被触动 。
电话上没有命令线.

## 队伍.

```text
consolecrypt-cli --help                       # все команды
consolecrypt-cli profiles                     # профили; use / rm
consolecrypt-cli unlock-check                 # проверить разблокировку хранилища
consolecrypt-cli host list | show | add | rm  # хосты
consolecrypt-cli cred list | add-password | gen-key | import-key | rm
consolecrypt-cli ssh HOST                     # интерактивная сессия
consolecrypt-cli ssh HOST -- uptime           # выполнить команду
consolecrypt-cli tunnel list | add | start    # пробросы портов
consolecrypt-cli sftp ls | get | put          # файлы
consolecrypt-cli sync now | status            # синхронизация
consolecrypt-cli device list | code | ...     # устройства и их одобрение
consolecrypt-cli backup ...                   # зашифрованные копии .ccbackup
consolecrypt-cli recovery-kit                 # комплект восстановления
consolecrypt-cli passphrase change | reset    # парольная фраза хранилища
consolecrypt-cli ai search | ask | ...        # ИИ: поиск, вопросы, команды
```

通用旗帜:`--profile`(默认最后配置),`--json`(输出)
用于脚本),`--offline`(不同步),`-v`(详细日志;秘密)
他们不进去。 密码短语和其他秘密来自查询窗口
`CC_PASSPHRASE`,`CC_PASSWORD`,或从环境变量中获取自动化数据。
`CC_SECRET`, `CC_KEY_PASSPHRASE`, `CC_SSH_PASSWORD`, `CC_RECOVERY_KEY`
普通`http://`只允许用于此计算机的地址; `--insecure-http`
仅供信任的本地网络使用.

`consolecrypt-cli --version` 显示它与之对应的应用程序版本
它来了。 在macOS上,CLI在应用程序的同一位置(包括:
`~/Library/Containers` 内的先前组件文件夹;另一个文件夹指定
`--data-dir`或 `CONSOLECRYPT_DATA_DIR`

应用程序和CLI可以和相同的配置同时工作. 同步
这减少了他们的改变,但同样的记录最好不要同时统治两个地方.
