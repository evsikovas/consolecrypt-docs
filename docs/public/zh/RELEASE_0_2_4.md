# ConsoleCrypt 6.2.4 国家

参考文档译文 · [俄文原文](../RELEASE_0_2_4.md)

** NativeSSH已更正为输入西里尔语;搜索范围已扩大,主机和组合并为一节。**

- ** Cyrilic:**复制并更正了与Bash/Readline在真实SSH中将首个"p"转换为`:�`的会话. 终端请求对字符进行UTF-8,并正确删除整个字符;英语输入继续工作. 语言设置和服务器编号/日期格式被保存. 更新后,开设新会话SSH.
- ** 搜索:** 占用顶板的整个自由宽度。 主机名称或IP,片段和AI查询以单行形式提供;回合QQ打开新连接,绿点和**Sinh.**显示成功同步.
- **主机:**从左菜单中删除了单独的"Group"项目. 创建,巢组,和一般设置在**Hosts**;旧组链接工作.
- ** 指南:** 72个新的俄语和英语截图,来自当前演示数据的界面。

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) - [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru)

## 安装和更新

| 平台 | 版本(简体中文). | 软件包 |
|---|---|---|
| Windows 10/11 x64 (中文(简体) ). | **0.2.4+1332** | EXE和便携式ZIP |
| macOS 英特尔/阿普尔硅 | **0.2.4+1333** | 通用DMG( 通用DMG) |
| Android ARM64号卫星 | **0.2.4+71** | APK 地图 |
| iOS 模拟器 Intel / Apple 硅 | **0.2.4+72** | ZIP部件`.001`/`.002` |

这些文件载于下文**Asset**。 `SHA256SUMS-0.2.4.txt`载有包数和合并数iOSZIP。 资料来源:`39d3a487c6aaa9098a26ff79672b4359acb6da36` Windows和macOS在[CI №213](https://git.evsikov.net/publics/consolecrypt/-/pipelines/213)中组装;移动建筑使用相同的源代码,单独编号.

**macOS:**如果应用程序在下载旧更新按钮后没有打开,则通过浏览器**一次下载DMG**,关闭ConsoleCrypt,替换**应用程序**中的应用程序并运行已安装的副本. 在旧的应用程序中重启可以携带相同的启动禁令. 经过清理安装后,更新通过系统对话框保存**"保存和开放"**,并附有大小检查和SHA-256. 简介、存储和键链无需删除;保护macOS仍然包括在内。

对于iOS模拟器,上传两部分到一个文件夹:

```sh
cat ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip -d consolecrypt-ios
```

[Запуск iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md) (中文(简体) ). 此软件包没有安装在物理 iPhone 上 。

## 检查和边界

**577 Flutter测试通过**,无评论的分析.**54测试SSH通过**,包括与现在的OpenSSH的两个集成;之前的一个慢RSA4096一代测试失败. Clippy和终端-核心/AppCore/桥梁消费者支票已经通过. 真实回归检查西里尔字母和ASCII,片段后输入,插入,执行和后空格. 原产地储蓄支票macOS - 更新日期,组装号和公众出口通过.

地方校正是指默认使用的地方SSH. 如果管理员禁止`AcceptEnv`,服务器不是`C.UTF-8`或指定`LC_ALL=C`,服务器必须配置到UTF-8. 明确选择的 OpenSSH 后端系统不变. 检查中没有使用秘密和用户会话SSH。 用户计算机上的实物核查仍然是单独的一步。

初步组装: Windows没有Authoriode, macOS有之前的本地签名,没有苹果公证, Android有预览签名. 已知的RSA`RUSTSEC-2023-0071`的毒瘾警告仍然开放. 专有部件:**AGPL-3.0-只**;第三方许可证,包括麻省理工学院终端部件,保留。

---
