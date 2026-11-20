# ConsoleCrypt0.1.10 检查问题

参考文档译文 · [俄文原文](../RELEASE_0_1_10.md)

日期:2026年9月30日 (中文(简体) ). 来源为不可变的标记`v0.1.10`.
客户端使用真实的Rust桥; `CC_MOCK`没有启用.

| 平台 | 软件包 | 议会编号 |
|---|---|---|
| Windows 10/11 x64 (中文(简体) ). | EXE和便携式ZIP | 1208 |
| macOS 英特尔/阿普尔硅 | 通用DMG( 通用DMG) | 1209 |
| Android 11+ ARM64 | APK 地图 | 22 |

当终端启动时重新连接本地文本输入
只聚焦可见的标签,并将焦点转移到Flutter儿童窗口Windows.
文本输入通过 IME 保留; UTF-8西里尔字母不转换而传输
在键盘布局中. 隐藏的标签和确认窗口不拦截输入 。

Windows和macOS建造了GitLab项目跑车(管道150, jobs1208/1209)。
`flutter analyze`,全部393个蝶式测试和6个版本测试通过.
在两个主机。 返回检查在失去焦点后点击一次 。
`Привет, ёж!`,IME组成,标签切换,Enter和Ctrl+C.
Windows 服务找到已安装的工具; 缺少 Flutter, Perl
" Inno Setup " 是从正式发布后,经承诺/SHA-256核实后产生的。

下载的DMG/EXE/ZIP的校验和与CI文物相符。 ZIP不见了.
CRC验证并包含EXE,Rust Bridge,Flustter,ICU和DLL视觉C++.
DMG通过`hdiutil verify`; 内部版本0.1. 10, 构建1209, 架构
x86_64和arm64,参考应用与验证`codesign --verify`.
此 Mac 上的应用程序在检查时没有启动 。

APK由与新建筑22号同为公共树制成. 已验证的软件包
`io.consolecrypt.consolecrypt`,版本Name0.1.10,版本Code22,签名,,
`zipalign -P 16`和16KiBELF所有三个本土图书馆的布局.
签名证书与之前的APK相同,因此更新是兼容的.

本地键盘检查两台特定的 Windows10 问题计算机
它仍然是用户接受测试:这台机器没有工人.
表单。 更新后,请检查从另一个应用程序切换到终端.
输入俄语和英语版式、文本选择、切换SSH - 标签
对话结束后返回焦点。 无法考虑在
自动测试每个计算机的物理键盘检查完成.

包件用于预试. Windows未签名
出版商,macOS未经苹果公司公证,APK使用开发证书.
目前的APK在此次运行中并没有在物理电话上运行.

服务器0.1.9 / 1.5协议和网站有单独的版本. 更改客户端
不需要重新组装服务器 。 网站另设`consolecrypt-site`.

[Релиз и SHA-256](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.10) (中文(简体) ).
