# ConsoleCrypt用于Linux:安装和装配

参考文档译文 · [俄文原文](../BUILD_LINUX.md)

Linux - 版本用于**x86-64**和图形桌面.
该包件`.deb`用于Debian/Ubuntu,`.rpm`用于Fedora.
软件包包含客户端,Rust桥,Flustter引擎,图标和应用程序菜单项.
基本建筑为**Ubuntu 22.04**. 单独安装和发射检查
** Debian 12** 和** Fedora 43** 配有X11 和软件渲染
关于历史版本0.2.5,现将当前CI的结果介绍如下.
目前发布 -- --**0.5.6**:DEB和RPM在[вложениях GitHub-релиза](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.6)中。

## 系统办事员

客户端需要当前会话的 D- Bus 和 提供者**Secret Service** 和已经创建的 。
和未解锁的主键盘。 GNOME Keyring:通常相同.
解锁图形会话的入口。 在另一个环境中,设置一个兼容的
提供特勤服务并通过桌面解锁键盘.
客户端不创建或解锁键盘,也不在打开时保存密钥.
在她不在的时候看见的 从用户开始ConsoleCrypt.
** 不含`sudo`,且在一个图形会话内,而非另设SSH控制台.

## RDP 的系统文件夹选择

从 0.3 版本开始,选择本地文件夹使用 D- Bus 中的 QQDG 桌面门户**
您的图形会话。 DEB/RPM包需要服务`xdg-desktop-portal`.
对话本身由一个单独的提供者提供** FileChooser**
桌面 : `xdg-desktop-portal-gnome` GNOME, (中文(简体) ).
`xdg-desktop-portal-kde` 用于 KDE Plasma 或 `xdg-desktop-portal-gtk` 用于环境
GTK(英语:GTK). 提供者通常是桌面的一部分. 如果他没有,
通过`apt`或`dnf`安装适当的软件包,并重新进入图形
届会。 ConsoleCrypt没有指定一个提供者而不是桌面设置.

在wlroot环境中,1`xdg-desktop-portal-wlr`不足以从中选择.
文件夹:您需要添加一个带有 FileChooser 的提供者,如 GTK 。
这是被选中者[RFD XDG backend](https://docs.rs/rfd/0.15.4/rfd/#xdg-desktop-portal-backend)的要求。
不要运行一个包含`sudo`的应用程序,或者从另一个用户中运行一个单独的D-Bus.

以下0.2.5版本的安装和发射检查不能证实新版本的工作
复兴党对话。 Linux中文件夹选择和文件共享 0.5.6 需要单独核查
在带有工作门户的图形会话中准备客户端.

## 安装`.deb`

下载软件包到[странице загрузки](https://consolecrypt.dev/download?lang=ru).
在下载目录中打开终端并替换收到的文件的确切名称 :

```sh
sudo apt install ./ConsoleCrypt-0.5.6+23013-linux-x64.deb
consolecrypt
```

`apt` 建立系统依赖性;您也可以用图形打开数据包
程序管理员。 如果你没有特勤局的提供商
`gnome-keyring` 并重新进入图形会话.

## 安装`.rpm`

```sh
sudo dnf install ./ConsoleCrypt-0.5.6+23013-linux-x64.rpm
consolecrypt
```

费多拉还需要特勤局的提供商,例如`gnome-keyring`.
不要使用`rpm --nodeps`:必须进行图书馆检查`dnf`.

## 更新和删除

使用0.9.14版,从应用程序中更新了DEB或RPM的拷贝:**Settings__.
更新 → 下载和安装** 检查单独签名的磁带上的软件包
Linux和SHA-256,询问管理员密码`pkexec`,然后通过
`apt-get`, `dnf`, `zypper`或 `rpm`;新版本以按钮打开
"重置"[UPDATES.md](UPDATES.md) 0.9.14,并抄本无.
`pkexec`手动更新:下载新软件包并重复命令
`apt install`或 `dnf install` (中文(简体) ). 安装的版本包含组装号,
因此,包管理器区分了一次发行的重新组装.

```sh
# Debian/Ubuntu
sudo apt remove consolecrypt
# Fedora
sudo dnf remove consolecrypt
```

安装和删除软件包不会改变主目录或键盘中的配置 。
在计算机之间传输数据之前,请保存加密备份
还有救生包 不手工删除系统键盘中的密钥 。

## 来源材料的组件

将整个仓库和`crates/`一起克隆。 需要小蝶**3.47.5**,
Rust of `rust-toolchain.toml` , Python 3.10+, Clang, CMake, Ninja, pkg-config,
GTK 3头,C/C++编译器,Perl和工具`dpkg-deb`/`rpmbuild`.
乌本图22.04:

```sh
sudo apt update
sudo apt install clang cmake ninja-build pkg-config libgtk-3-dev libwayland-dev libstdc++-12-dev \
  build-essential perl libssl-dev python3 dpkg-dev rpm
client/scripts/build-linux.sh
```

脚本保留一个新的构建数字, 编译一个真实的后端
`CC_MOCK=false`和在`dist/linux/`中与SHA-256一起创建了两个包,
本土文件的准确版本和描述. 不同时运行多个 。
Flutter-组装在一个目录中. 保存`Cargo.lock`和`pubspec.lock`.

对于一个可复制的环境来说,
[`client/ci/linux/Dockerfile`](https://github.com/evsikovas/consolecrypt-client/blob/main/client/ci/linux/Dockerfile):乌班图22.04,
核实了官方Flutter和固定的Rust的修改. 职务`linux`
c[GitHub Actions](GITHUB_ACTIONS.md)在单独的Linuxx64上使用Docker
跑道`cc-linux-k3s`,只搭载已准备好的公共来源;
主目录, D- Bus, 键盘, SSH 键和 Kubernetes 配置
他们没有转移到容器里。

图片还包含Wayland致瘾信头`ashpd`和服务
`xdg-desktop-portal` / `xdg-desktop-portal-gtk` 自己隔离
图形筛选会话 。 这些软件包的存在本身并不能证实
打开对话框:您需要运行的门户、 FileChooser 提供者和
单独检查文件夹选择。 未指定测试图像的 GTK 提供者
这是自定义的桌面.
在包装之前,工作通过测试 真正的Rust桥 和创建情景
存储,重启和通过接口解锁. 是为众生所造.
将Xvfb、 D- Bus 和加密的测试键盘分开,然后删除
检查。 期刊只收录了固定阶段和结果.
没有密码或恢复的词。

## 检查和限制

目前[Linux job выпуска 0.5.6+23013](https://github.com/evsikovas/consolecrypt-client/actions/runs/39377995191/job/118480579580)
2026年10月20日顺利完成 (UTC). 在一个孤立的环境中,他们通过了
目前Rust桥`rust_core_test.dart`的两座集成桥,2/2,情景
通过 UI 创建存储和重新启动/解锁
`app_persistence_test.dart`,1/1)和特勤局往返.
创建了DEB和RPM;用GitHub检查的已出版包的尺寸和SHA-256
资产元数据和[SHA256SUMS-0.5.6.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/SHA256SUMS-0.5.6.txt)

| 档案。 | 大小, 字节 | SHA-256 (英语). |
| --- | ---: | --- |
| [DEB](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.deb) (中文(简体) ). | 26 693 850 | `c484f2b38832351f729ce8d15493004e4e6cd6613f330f09cab6ac21e0adf51a` (中文(简体) ). |
| [RPM](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23013-linux-x64.rpm) (中文(简体) ). | 36 027 657 | `8066884c2940ea7efc1a6074365dc9a2355211b44e9a4922348c164cf63e5eb0` (中文(简体) ). |

土著融合是在单独的测试集会中进行的。 DEB/RPM准备就绪
未通过已安装接口的视觉接受。 这跑步。
不重复在 Debian/ Fedora 中安装软件包或检查此选项
RDP会话,文件夹选择和通过门户网站的文件传输.

历史运行0.2.5:吉特拉布[build-linux 1358](https://git.evsikov.net/publics/consolecrypt/-/jobs/1358)
我经历了两个Rust Bridge集成 和一个完整的UI方案: 建造一个存储设施。
保存主机,重启,并与真正的测试特勤局解锁.
该运行的DEB/RPM在Debian 12和Fedora 43中分别安装:
依附,更新`0.2.5-79 → 0.2.5-1358`,去除/重新安装,
原生图书馆和欢迎屏. 使用的安全检查
仅在单独的家用/连接器中进行合成标记;该标记不确认
当前用户存储的迁移 。


```sh
python3 -m unittest discover -s client/scripts -p test_linux_packaging.py -v
(cd client/rust && cargo test --locked -p cc-platform-core --features os-keychain)
(cd client/flutter && flutter analyze && flutter test)
```

对真实键盘的测试只在单独的可支配环境中运行:
`client/rust/platform-core/tests/run_linux_secret_service.py` 创建自己的
D-Bus会话和测试键盘. 不要在用户的登录密钥板上运行它们 。

主机SSH后端内置客户端. 可选后端** System OpenSSH**
附加要求`ssh`; 其代理模式使用 OpenBSD 兼容性`nc`
带有密钥`-X`/`-x`. Fedora Ncat和其他参数不同的变种`nc`
不适合这个政权. 对于正常的连接,请选择主后端.

LinuxARM64, Flatpak/Appimage, RHEL的 RPM, 物理GPU和Wayland 暂用
未经核实,未纳入经确认的释放矩阵.

完整的AGPL-3.0-只限许可证包含在包件中. 第三方部件许可证
存储在Flustter通知和所附许可证文件中。
