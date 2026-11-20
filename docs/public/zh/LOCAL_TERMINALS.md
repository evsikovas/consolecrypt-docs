# 当地终端(当地终端) 0.5

参考文档译文 · [俄文原文](../LOCAL_TERMINALS.md)

## 俄罗斯语

在0.5系列中,局部壳在SSH部分会话旁开启.
“ 终止 ” 。这是您计算机上的一个进程, 包含您的用户权利 。
不需要同步服务器和SSH连接.

1. 打开“ Terminal ” , 点击 `Cmd+T` 或 macOS 上的新标签按钮 。
   `Ctrl+T` at Windows (中文(简体) ). 应用程序的普通“ +” 按钮仍然选择
   保存SSH/RDP连接.
2. 在本地贝壳组中,选择macOS上的**zsh**或
   ** Windows PowerShell**,** Command Point** 或安装**PowerShell 7**
   于Windows上进行. 以下为已保存的SSH主机.
3. 在Windows上,每个安装的分布**WSL**分别显示.
   可以同时打开Ubuntu,Debian和数个同一 shell 的标签.
   ConsoleCrypt不自动安装WSL和发行版.
4. 请检查date=中的日期值 (帮助) 标签名称: 本地 shell 被签名为 “此计算机 ” 。
   WSL保留了发行名称. 输入、 调整大小、 控制密钥
   互动程序通过PTY(ConPTY at Windows)运行.
5. 关闭标签完成进程 。 “ 重置 shell ” 打开 。
   这不是旧计划的延续。 关上保险库
   (包括自动)不关闭终端:解锁后
   当地和SSH塔卡继续工作,以及保存的SSH隧道.
   RDP会话和会话Kubernetes 变换配置和退出关闭.

关闭完成自己的外壳及其当前前景组.
分离背景进程(例如,分别通过`nohup`)
不想要;整个WSL发行并不停止.

对于本地标签,没有动作SFTP: SFTP运行通过SSH -host.
本地 shells不创建假主机记录, 也不同步为
SSH - 连接. 在0.5中,可在macOS和Windows,Linux,Android和iOS上查阅。
它们继续使用现有的远程连接.

### AI和片断

调色板和聊天接收选中的 shell 类型: zsh、 PowerShell、 cmd 或
WSL 的 POSIX 外壳 。 本地终端不接收主机的假想地址SSH.
输出文本只有在明确选择上下文时才会转发给AI;检查它.
在发送到选定的提供者之前。

对于可用的本地标签** “ 插入”不输入** 。 自动按钮
AI命令和片段被禁用; 大规模发射计划为SSH.
检查插入的文本,如果您想要执行,请单击 Enter yourself 。
正常终端输入不受此规则的限制.

### 最新情况macOS

对于容器外的普通本地zsh会话,包0.5工作时没有App Sandbox.
目前的建筑是临时签名的,没有公证. 硬化运行时间
它仅在使用开发者ID构建时才被包含;这不是当前临时hoc软件包的属性. 更新时,应用程序会查找上一个
容器0.4.1中的简介和本地AI数据,并在现场使用.
不删除容器、 保险库、 模型文件或系统密钥链 。
如果两个目录都包含数据或上一个目录不可用,则应用程序
在创建配置文件前显示一个错误:它不合并不同的存储而不合并
用空的来取代旧的简介 。 在更新前保存备份副本 。

### 行政指导和核查

[Глава со снимками RU](https://consolecrypt.dev/guide?lang=ru#local-terminals) (中文(简体) ).
[English guide](https://consolecrypt.dev/guide?lang=en#local-terminals) (中文(简体) ).
快照 0.5是真正的 Flutter 部件,有合成的贝壳和文本 。
WSL屏幕在部件测试中显示Windows接口变体,而不是运行.
Windows或WSL. 已安装软件包的检查在
[заметках выпуска](RELEASE_0_5_2.md) (中文(简体) ).
