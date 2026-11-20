# ConsoleCrypt0.1.21 安装器和指南

参考文档译文 · [俄文原文](../RELEASE_0_1_21.md)

日期:2026年10月1日. 校验代码:tag `v0.1.21`.
实施`f9d9094e44d5118d4d8938b68eac55bb5ea7228b`.
所有包都使用真正的Rust核`CC_MOCK=false` .

| 平台 | 软件包 | 软件包内的版本 |
|---|---|---|
| Windows 10/11 x64 (中文(简体) ). | ZIP携带的EXE | 0.1.21+1237 |
| macOS 苹果硅和英特尔 | 通用DMG( 通用DMG) | 0.1.21+1238 |
| Android 11+ ARM64 | APK 地图 | 0.1.21+51 |
| iOSMac上的模拟器 | ZIP 分为两部分 | 0.1.21+52 |

发布在共享访问检查完成后更新安装器,
iOS (中文(简体) ). 应用程序行为对应已验证的0.1.20;新数字
About和原生元数据中都有组件。 网站收到
[руководство на русском и английском со снимками интерфейса](https://consolecrypt.evsikov.net/guide) (中文(简体) ).
它解释了第一个启动,存储,设备连接,SSH/SFTP.
片段,AI,组,隧道,共享,备份和更新.
手册中包含26章和54个快照;该网站已经通过19个自动
缺少一个可选的 API 现场检查 。 部署
完成与API分开的场地;核实83条公共路线/资产
语言切换,搜索,在电话中显示和API的不可变.
图像显示带有演示数据和隐藏数据的真实部件
机密;这些不是用户存储的快照 。

## 检查。

- GitLab管道164:Windows工作1237和macOS工作1238成功完成
  **461 蝶式试验**和**6 版本检查**,每件,然后打包。
- macOS: DMG完整性和深/窄代号通行证; Runner , Flutter,
  App 和 Rust 框架包含 ARM64 和 Intel 切片; 链接应用程序
  现如来. Windows: CRC便携式ZIP, 现为Rust DLL和
  EXE的原生版本已经核实.
- Android:版本Name0.121/code51,签名与之前的APK,相同.
  Rapalign16KB和ELF映射/RELRO都是三个本土图书馆.
- iOS52: CRC, 版本, SHA-256和ARM64/Intel模拟器切片检查
  软件包安装和运行在一个单独的模拟器中. 检查后,临时
  模拟器已删除, 用户已保存 。
- 主 Rust 和服务器代码保持不变:0.1.20 检查仍然不变
  634 Rust,61 共享,12 real-backend 共享,166 real-PG 服务器
  和两项iOS本土回归检查。 [Подробная приёмка](RELEASE_0_1_20.md)
- 本地包装Android现在在解剖上取代最新的APK;两个
  硬链接旧放行的回归测试检查和
  复制失败时保存上一个更新 。

## 核查的安装和限度

[Релиз, установщики и SHA256SUMS](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.21) (中文(简体) ).
更新服务器已发布已签名的feed0.1.21: Windows1237, macOS1238
还有Android51号 签名Ed25519由客户的公信主播验证.
维度和SHA-256匹配匿名下载的发布文件.
用于iOS,下载ZIP的两部分,并由[инструкции](BUILD_IOS.md)合并.
这是模拟器的构件, 脸部识别,
屏幕上的键盘、网络和真实的iPhone上的背景需要
通过Apple Account/Personal Team连接设备并签名.

WindowsEXE和AndroidAPK在此次运行中没有挂起间接费用.
用户应用程序。 检查有问题的 Windows10 计算机和
物理上Android仍为单独招生. 初步软件包:
Windows没有认证码, macOS没有苹果公证码, Android与前作
带有开发签名。 更新前,请保存加密备份
复制和回收包。

协作能力由服务器操作员单独包含
客户端的出版。 个人 VRK不共享; 由选中的共享
物体和经核实的设备。 审查不删除先前的文本
并且不会改变SSH目标主机的证书。 [Руководство](SHARING.md)

英语:经核实Windows,macOS和Android安装器加一个iOS模拟器
预览。 双语插图指南涵盖整个工作流程。
Windows/macOSCI在包装前分别通过了全部461 Fluster测试,iOS52
在模拟器中安装并启动; 物理 iPhone 签名和接受
继续分开。 共享可用性由选定的服务器控制.
