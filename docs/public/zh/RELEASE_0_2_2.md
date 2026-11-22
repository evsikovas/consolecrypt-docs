# ConsoleCrypt0.2.2

参考文档译文 · [俄文原文](../RELEASE_0_2_2.md)

固定保存更新macOS:由于在沙盒中下载,应用程序的新副本应不再收到发射禁令. 共享部分变得更加清晰:数据标签从添加设备中分离出来,额外的动作不会占用整个屏幕.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) ——[Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) ——[Свой сервер](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/HOSTING.md)

## 什么变了?

- ** Updates macOS:**在检查了签名的磁带和下载的文件后,应用程序提供了一个系统对话框**"拯救和开放"**. 所选文件以大小检查和SHA-256重写,然后由DMG打开. 沙盒和保护macOS仍然包括在内。
- ** 注销和重试:** 取消节省不被视为成功的安装。 已经核实的下载仍然可供重试 。 现有文件不覆盖 – 选择新名称或不同的文件夹 。
- ** 共享:** 个人标签** 对我可使用** 和**我共享** ,对当前标签的解释,独立设备块和可以理解的空状态. 主要行动有:** 添加此设备** 和**确认设备**;**其他行动** 继续添加和历史记录检查。 支持窄屏幕和扩展文本。
- **文件:** 安装、协作和添加设备的最新指示;网站上的指南由俄文和英文的新界面快照补充。

## 一次通过浏览器更新到macOS

如果您有**ConsoleCrypt0.2.1或以上**,请通过您的浏览器下载新的DMG[страницы загрузки](https://consolecrypt.evsikov.net/download?lang=ru),关闭应用程序,并替换为**应用程序**. 从应用程序打开已安装的副本 。 如果已经存在带有发射错误的复制件,用新浏览器下载的复制件代替. 配置文件和加密寄存器被保存;不需要删除密钥或存储.

旧的应用程序使用旧的下载方法,在更新自己之前无法修复. 从**0.2.2**开始,以下更新会通过系统保存对话框进行. 在macOS时,通过将应用程序从DMG迁移到应用程序,安装工作仍然完成.

## 大会

| 平台 | 大会 | 软件包 |
|---|---|---|
| Windows x64 | **0.2.2+1292** | EXE/便携式ZIP |
| macOS 英特尔/阿普尔硅 | **0.2.2+1293** | 通用DMG( 通用DMG) |
| Android ARM64号卫星 | **0.2.2+64** | APK 地图 |
| iOS 模拟器 Intel / Apple 硅 | **0.2.2+65** | ZIP分为两部分`.001`/`.002` |

这些文件在下面的**Asset**.`SHA256SUMS-0.2.2.txt`中包含包和收集的检查和iOSZIP. Windows和macOS是在[CI №201](https://git.evsikov.net/publics/consolecrypt/-/pipelines/201)从`8c29dcef92a5fa248849609c34104c49849990de`,Android和iOS从同一来源收集的,有单独的组装编号.

对于iOS模拟器,将两部分下载到一个文件夹:

```sh
cat ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip -d consolecrypt-ios
```

[Порядок запуска iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md) 用于模拟器的构件;没有安装在iPhone上.

## 检查。

**566 蝶式试验,无评论的分析。 本地 Swift导出更新、 大小和校验和的代码, 拒绝覆盖文件并点击符号链接、 取消和重试 。 一个单独的签名的沙盒应用复制了旧的发射禁令,并通过与新政策的系统对话框验证了该条目. 保护macOS没有关闭。

对所有软件包的版本、架构、档案完整性、许可证和校验和进行了核查。 macOS通过了`codesign --verify --deep --strict`,并验证了新的沙盒分辨率;iOS用一个单独的模拟器进行核查。 物理上的行为Windows/Android/iPhone没有在本版中测试.

这些是预装: Windows没有Authorityode, macOS与之前的本地签名没有Apple的公证, Android与保存的预览签名. Rust客户端在本版中没有改变;之前发行的结果不作为重复运行发布. 已知的RSA`RUSTSEC-2023-0071`的毒瘾警告仍然开放.

专有组件:**AGPL-3.0-仅** 包括MIT终端组件在内的第三方组件的许可证被存储在包中.

---
