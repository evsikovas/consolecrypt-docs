<p align="center"><img src="https://git.evsikov.net/publics/consolecrypt/-/raw/v0.2.5/docs/brand/consolecrypt.svg" width="480" alt="ConsoleCrypt"></p> (中文(简体) ).

# ConsoleCrypt0.2.5 现时及上下Linux

参考文档译文 · [俄文原文](../RELEASE_0_2_5.md)

工作空间ConsoleCrypt为Linux:终点站SSH,SFTP.
主机和组,片段,AI助手和加密协作.
新的**DEB和RPM*软件包通过常规程序管理器安装.

## 有什么新情况吗?

- 本地客户端** Linux x86-64** 带有真实的Rust核心,图标和应用程序菜单项.
- 存储密钥由系统**Secret Service**保护. 客户端使用已有的解锁键盘,如果不可用则不打开密钥.
- 通过`apt`或`dnf`安装自动接收所需的图形库.
- 设置Linux指定新包的地址;更新由包管理器进行,没有签名的磁带和自动安装.
- 在SFTP中,您可以选择Linux中安装的文件编辑器.
- GitLab 构建通过接口验证真实的Rust桥和存储创建,主机保存,在包装前重启和解锁.

## 下载

| 平台 | 大会 | 档案. |
|---|---|---|
| Linux x86-64• Debian/Ubuntu | 0.2.5+1358 | [DEB](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1358-linux-x64.deb) (中文(简体) ). |
| Linux x86-64 → 费多拉 | 0.2.5+1358 | [RPM](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1358-linux-x64.rpm) (中文(简体) ). |
| Windows 10/11 x64 (中文(简体) ). | 0.2.5+1353 | [Установщик EXE](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1353-windows-x64-setup.exe) - [Portable ZIP](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1353-windows-x64-portable.zip) |
| macOS 12+ → 苹果硅和英特尔 | 0.2.5+1354 | [Универсальный DMG](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B1354-macos-universal.dmg) (中文(简体) ). |
| Android 11+ ARM64 | 0.2.5+75 | [APK](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B75-android-arm64.apk) (中文(简体) ). |
| iOS 模拟器 → Mac, ARM64/x86-64 | 0.2.5+76 | [ZIP, часть 1](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B76-ios-simulator-universal.zip.001) - [Часть 2](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/ConsoleCrypt-0.2.5%2B76-ios-simulator-universal.zip.002) |

[SHA-256 всех файлов](https://git.evsikov.net/api/v4/projects/14/packages/generic/consolecrypt/0.2.5/SHA256SUMS-0.2.5.txt) (中文(简体) ).
[Сайт и загрузка](https://consolecrypt.evsikov.net/download?lang=ru) (中文(简体) ).
[Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) (中文(简体) ).
[Установка Linux и сборка из исходников](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.5/docs/public/BUILD_LINUX.md) (中文(简体) ).

## 安装Linux

需要一个图形桌面,当前会话 D- Bus 并解锁主机
特勤局键盘,如GNOME Keyring. 从自己的客户端开始。
而不包含用户`sudo`.

```sh
# Debian / Ubuntu
sudo apt install ./ConsoleCrypt-0.2.5+1358-linux-x64.deb

# Fedora
sudo dnf install ./ConsoleCrypt-0.2.5+1358-linux-x64.rpm

consolecrypt
```

要更新,下载新软件包并重复安装命令. 安装器
并删除应用程序不会清理主目录和键盘。 重新启动和
解锁此测试存储会通过接口单独检查.

## 签发检查

释放来源:`96fc23fb5426dbee5efb75855d837cfc29f6ad66`.

| 平台 | 来源和经确认的核查 |
|---|---|
| Linux+1358 (中文(简体) ). | [build-linux 1358](https://git.evsikov.net/publics/consolecrypt/-/jobs/1358),发布源;Ubuntu 22.04,真正的Rust桥 2/2和UI 1/1与特勤,重启和解锁 |
| Windows+1353 (中文(简体) ). | [build-windows 1353](https://git.evsikov.net/publics/consolecrypt/-/jobs/1353), `41323da718694fb56a6868abba65c6fc1a3e91fb` ; ZIP, SHA-256, x64 DLL/CRT 和 EXE 版本的完整性; 安装器未运行 |
| macOS+1354 (中文(简体) ). | [build-macos 1354](https://git.evsikov.net/publics/consolecrypt/-/jobs/1354), `41323da718694fb56a6868abba65c6fc1a3e91fb`; DMG, SHA-256, 严格签名, 普遍ARM64/x86-64 和沙盒资格; 应用程序不运行 |
| Android+75 (中文(简体) ). | 本地建筑;ARM64 APK,前签名,ZIP/ELF对齐 16 KiB和SHA-256经核实;实体电话未检查 |
| iOS模拟器+76 | 本地建筑; ARM64/x86-64 ZIP, 签名, SHA-256 和从已测试的部件回收; 单独的临时模拟器显示欢迎屏幕, 物理 iPhone未检查 |

[Pipeline 224](https://git.evsikov.net/publics/consolecrypt/-/pipelines/224) (中文(简体) ).
** FAILED* 通常由于以前的Linux转让而终止。
Windows 1353和macOS1354分别通过;更正Linux - 组装1358
当时是1352年 在他们的照片和最后的源头之间只变了.
Linux CI/包装、测试和组装元数据。 应用代码Windows/macOS
亦复如是. Android/iOS 当地收集:来自不可改变的检查记录
证实所提供代码与公共最终图像的匹配。
比较不包括单个组件的元数据和集成测试。
未包含在应用程序中;它不是用精确标记来描述构建的语句 。
文件 Windows/macOS/Android/iOS保存
更改Linux CI不需要重新组装.

单独安装和运行的DEB/RPMX1358**
Debian 12和 Fedora 43配有X11和软件渲染. 自动测试
通过`apt`/`dnf`安装图形依赖性,更新
`0.2.5-79 → 0.2.5-1358`,删除/重新安装,四个本土图书馆,
许可证和欢迎屏。 更新/删除安全检查
仅用其家用/钥匙的合成标记;这不是一个测试
当前用户存储的迁移 。 CI 单独检查
保存并恢复此测试加密存储 。

在所有包中,检查AGPL和存储的麻省理工学院许可证xterm的全文.
物理GPU,Wayland,LinuxARM64,RHEL,和Flatpak/Appimage不包括在内.
一个确认的矩阵。 Linux 手工更新数据包;
没有自动更新日期Linux. 这是前期问题:macOS没有公证
Apple, Windows没有认证码, APK 具有之前的测试签名.
已知的RSA`RUSTSEC-2023-0071`的毒瘾警告仍然开放.

** macOS:**如果旧更新按钮下载的拷贝不打开,
通过浏览器下载 DMG 一次, 完成ConsoleCrypt , 替换副本
进入应用并运行. 重新装入旧按钮可能
维持发射禁令. 以下更新使用系统对话框
“保存和打开” 配置文件、 存储和键链不需要删除 ;
保护macOS仍在[Подробнее](UPDATES.md)

存储器仍然加密在设备上. 你可以在当地工作。
连接您的同步服务器或选择公共服务器
`https://consolecrypt.evsikov.net` (中文(简体) ). SSH直接到你们的东道主.

---

**英语:**ConsoleCrypt现在支持Linuxx86-64的DEB和RPM包,
原生的RustSSH/SFTP,加密的工作空间和团队共享. 安装方式
`sudo apt install ./ConsoleCrypt-0.2.5+1358-linux-x64.deb` 或 (中文(简体) ).
`sudo dnf install ./ConsoleCrypt-0.2.5+1358-linux-x64.rpm`,然后运行`consolecrypt`.
作为您的普通桌面用户。 现有未解锁的持久特勤局
需要按键环 。 Linux更新使用软件包管理器. 下载链接
上面列出了每个平台和SHA-256核对和。 Linux 尚未签署
in-app更新器种子或自动包安装。 德比安12号和费多拉43号
安装软件包、升级和软件X11欢迎屏发射通过;
标记保存限于合成家用/钥匙装置,而非真实的。
用户错误迁移 。 物理GPU/Wayland和物理Windows/移动装置
不接受申请。 224管道在被取代Linux的工作上失败
Windows1353和macOS1354分别通过,之后成功Linux1358.
他们的运输运行时间与最终来源相符,尽管后来的CI/测试有变化.
Android/iOS是在当地建造的;一个不可改变的比较确认的航运代码
与公共最终来源等同,不包括每个构建的元数据和a
非发货一体化试验. 他们没有声称是用确切的标签建造的。
如果一个旧的macOS下载器制作了无法启动的应用程序,则下载 DMG
一次通过您的浏览器替换应用程序; 保存金库
和键链。 随后的更新使用系统保存和打开对话框.

*亚历山大·埃夫西科夫* [i@evsikov.net](mailto:i@evsikov.net)
[GNU AGPL-3.0-only](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.5/LICENSE) (中文(简体) ).
第三方部件保留自己的许可证。
