# 大会ConsoleCrypt改为Windows

参考文档译文 · [俄文原文](../BUILD_WINDOWS.md)

你需要一台电脑,用**Windows 10/11 x64**. Windows小蝶申请正在进行中
Windows; macOS 无法创建此本地包 。

## 设一乘.

1. [Git for Windows](https://git-scm.com/downloads/win)
2. [Flutter SDK](https://docs.flutter.dev/install)**3.47.x**与达特**3.13.4或较新的兼容版本**.
   例如,在`C:\dev\flutter`和`C:\dev\flutter\bin`加进PATH.
   确切的最小版本在`client/flutter/pubspec.yaml`中指定;锁文件不删除.
3. [Visual Studio](https://visualstudio.microsoft.com/downloads/),工作量
   ** 带有 C++ / 开发经典 C++ 应用程序的Desktop 开发 :
   MSVC x64/x86, Windows SDK, CMake 工具和**C++ ATL 用于最新的 v143 构建工具
   (x86& x64)** `Microsoft.VisualStudio.Component.VC.ATL` ATL 需要一个插件
   通知Windows `atlbase.h`; `flutter doctor`不检查此部分。
   单凭VS代码是不够的。
4. [Rust через rustup](https://rustup.rs/)是标准MSVC工具链.
   `rust-toolchain.toml`版本将在货物首次推出时启动.
5. [Strawberry Perl](https://strawberryperl.com/) x64和[Python 3](https://www.python.org/downloads/windows/)
   添加到 PATH 中. Perl是内置的OpenSSL/SQLCipher所需的.
6. [Inno Setup 6](https://jrsoftware.org/isdl.php),用于创建安装器.

打开新的PowerShell. 看看这个。

```powershell
git --version
python --version
perl --version
cargo --version
flutter --version
flutter config --enable-windows-desktop
flutter doctor -v
```

The Windows toolchain/Visual Studio section in `flutter doctor` should be patched.
您不需要安装 Android SDK,Xcode 或服务器 PostgreSQL 来构建客户端 Windows 。

## 下载和收集

使用没有西里尔字母的短路径,如`C:\dev\consolecrypt` :

```powershell
New-Item -ItemType Directory -Force C:\dev | Out-Null
Set-Location C:\dev
git clone https://github.com/evsikovas/consolecrypt-client.git consolecrypt
Set-Location consolecrypt
.\client\scripts\build-windows.ps1 -Installer -NoCli
```

如果 PowerShell 屏蔽本地脚本,只针对当前窗口 :

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\client\scripts\build-windows.ps1 -Installer -NoCli
```

集合负载的依赖性,在第一次运行时可以花费大量时间.
建筑数量会自动增加. 工具错误的脚本检查
复制整个Flutter文件夹和分布式DLL Visual C++,然后运行Inno设置.
PE 版本的数值字段限于四个 16 位组件: 后者
该组件包含构建数的下16位. 全文`версия+сборка`
保存在应用程序和安装器文本字段、文件名称和机制中
更新。 完整版本用于比较. CI 检查
边界65535/65536的安装器,并用目前的编号进行长期本土组装.
Rust和内置的OpenSSL在寄存器的根部组装`target\windows-rust`:
这缩短了Perl的路径Windows. 保存克隆本身的短路 。
在通过 Cargokit 呼叫 Cargo 时, 遥测服务变量被删除 。
MSBuild`VSTEL_MSBuildProjectFullPath`:她强迫`cc-rs`重新组装
OpenSSL/AWS-LC在构建和本土测试的交替中. 编译器和目标
架构根据既定的MSVC和Cargo参数选择.
[Почему нужны все DLL и папка data](https://docs.flutter.dev/platform-integration/windows/building#building-your-own-zip-file-for-windows)

结果`dist\windows\`:

- `ConsoleCrypt-<версия>+<сборка>-windows-x64-setup.exe` - 安装器.
- `ConsoleCrypt-windows.zip`是一个可移植的应用程序文件夹.
- `ConsoleCrypt\ConsoleCrypt.exe` -不安装即开始,整个文件夹应保持贴近.
- `*.sha256` - 校验和; `ConsoleCrypt.version` - 准确版本.

安装器不需要管理员, 添加“ 启动” 菜单项, 提议
桌面上的快捷键并支持删除 。 删除时用户存储
保留申请。 当地议会没有出版商签名.

应用程序仅为当前用户安装 :
`%LOCALAPPDATA%\Programs\ConsoleCrypt` 存储和设置单独存储
c`%LOCALAPPDATA%\consolecrypt\ConsoleCrypt\data`,密钥 - inWindows 证书
当前用户的管理者 。 不需要从管理员处发射.
更新和删除应用程序不影响存储目录.

没有Inno设置,删除`-Installer`,并获得一个文件夹和一个ZIP. 删除`-NoCli`.
额外收取`consolecrypt-cli.exe`.`-Mock`
用于演示界面,不应用于工作发布。

## 发布前检查

在单独的测试配置上,检查启动,存储创建, SSH .
SFTP,锁后重启,安装/更新/重新移动.
在没有Visual Studio的机器上检查ZIP:应用程序必须找到DLL.
界面的自动测试 :

```powershell
Set-Location client\flutter
flutter analyze
flutter test
```

组装完成后开始 不要同时运行两个小蝶集会.
草案副本[Загрузка установщика в существующий релиз](RELEASING.md)

## GitHub动作跑者

任务`windows` 工作流程`Client packages` 使用带有标签的自备导师
`Windows`, `X64`, `consolecrypt`, `client` 见[настройку раннеров](GITHUB_ACTIONS.md). 脚本
`client/scripts/ci-windows.ps1`在标准目录中发现了工具.
如果 PATH 服务与用户的 PATH 不同. 在没有小蝶的情况下
官方标签3.47.5经承诺核查后下载;如果没有Perl,
草莓 Perl 5.40.5.1 具有SHA-256正式发布验证的便携式
缓存位于外部的退出,默认情况下`C:\GitLab-Runner\tools` .
它可以通过`CC_CI_TOOLS_DIR`; `CC_CI_FLUTTER_ROOT`表示
预安装的Fluster SDK的根.

如果找不到 ISCC.exe, CI 也会安装正式的 Inno Setup 6.7.3.
输入您的缓存目录, 检查 SHA-256 。
提前安装Visual Studio C++, Rust和Python.
脚本不改变全局的 PATH 和服务账户 。
原创建筑编号`github-build-number.py`根据发射编号,
公式在[GITHUB_ACTIONS.md](GITHUB_ACTIONS.md)中给出.
已完成的软件包、校验和版本已保存在Action 文物中。
路径`C:\GitLab-Runner\tools`与之前的SDK缓存相容.
对于GitHub跑者,可以被`CC_CI_TOOLS_DIR`压倒.
