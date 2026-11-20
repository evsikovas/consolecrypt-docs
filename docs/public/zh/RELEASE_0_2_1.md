# ConsoleCrypt0.2.1 (中文(简体) ).

参考文档译文 · [俄文原文](../RELEASE_0_2_1.md)

大型终端输出流现在按部分处理,使接口返回输入和渲染的频率更高。 纠正了损坏的ANSI颜色的处理错误;玻璃界面的静态层的重画较少.

[Скачать клиент](https://consolecrypt.evsikov.net/download?lang=ru) ——[Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) ——[Своя установка сервера](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.1/docs/public/HOSTING.md)

## 什么变了?

- ** 终止:** UTF-8的渐变解码,输出处理部分有限,安全处理长控制序列和不正确的颜色. Unicode 支持和亮点被保存 。
- ** 接口:** 重新使用背景滤波器,通过重新绘制内容对静态表面进行绝缘. 由于噪声的纹理,背景较为统一.
- ** 秘密和AI:** 迟到的答案和秘密不会转移到另一个剖面图;封锁对话状态。 将这个秘密复制到Android和iOS需要有一个带有TTL的受保护的本土信道. 如果无法提供,则拒绝提供副本。
- **SSH和SFTP:**停止SSH - 代理人取消对密钥的访问,包括等待签字确认。 关闭SFTP管理者取消编辑的等待选择,并清除工作副本. 对跳转到主机的论据的核实工作得到了加强.
- **AI 网络响应:** 响应大小和流动事件有限,取消不会等待一个已填充的界面队列的发布.
- ** Public Server:** 共享访问,群集,秘密和确认的设备添加可提供. 转移通过所有者的明确行动进行;存储数据在服务器上仍然加密.

## 大会

| 平台 | 大会 | 档案。 |
|---|---|---|
| Windows x64 (中文(简体) ). | 0.2.1+1280 | EXE 安装器或便携式 ZIP |
| macOS 英特尔/阿普尔硅 | 0.2.1+1281 | 通用DMG( 通用DMG) |
| Android ARM64号卫星 | 0.2.1+61 | APK 地图 |
| iOS 模拟器 Intel / Apple 硅 | 0.2.1+62 | ZIP,两部分`.001`/`.002` |

所有文件均可在以下** Assets**. `SHA256SUMS-0.2.1.txt`中查阅,其中包含每个文件的校验和并收集iOS ZIP. Windows和macOS是在[CI №197](https://git.evsikov.net/publics/consolecrypt/-/pipelines/197)从同一来源收集的`e37af672`;Android和iOS),并有单独的组装编号。

对于iOS模拟器,将两部分下载到您的Mac上的同一个文件夹:

```sh
cat ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip -d consolecrypt-ios
```

发射命令 - in [инструкции iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). 这个用于模拟器的构建没有安装在iPhone IPA上.

## 检查和限制

小蝶:**559测试**,分析无评论. 客户端 Rust:**653测试**,**7 明确标记的通行证**,Clippy无预警. 本地软件包的版本、架构、档案完整性、全部许可证和校验和都得到核实; iOS 在一个单独的模拟器中运行。

在Mac上的合成测量结果证实了潜伏性下降. 据报在物理Windows机器上徘徊和梯度带的行为需要用户重新检查。 这些是早期的建筑:Windows没有认证码,macOS有苹果公司之前的本地签名没有公证,Android有保存的预览签名.

在测试依赖性时,RSA仍有已知的警告`RUSTSEC-2023-0071`. 校正版本尚未可用;未检测到经校验代码中带有外部可访问甲骨文的PKCS#1的解密路径. 这不是一个没有所有脆弱性的保证。

专有部件许可证:**AGPL-3.0-仅**第三方部件保留其许可证;包中包含关于终端部件的麻省理工学院通知。

---
