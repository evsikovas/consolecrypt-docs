# ConsoleCrypt 6.2.3 国家

参考文档译文 · [俄文原文](../RELEASE_0_2_3.md)

一个更宽敞的搜索,一个紧凑的面板和顺序发送输入到SSH终端. 更新所有支持的平台的安装器以及俄语和英语的人工图片.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) ——[Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) ——[Свой сервер: Docker / Kubernetes](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/HOSTING.md)

## 什么变了?

- ** 最终输入:** 字符和 Enter 依次发送,即使上一个条目SSH尚未完成. 关闭标签或重新连接可取消剩余队列 。 检查范围包括西里尔语,英文文本,复合Unicode字符和字节形状的响应SSH. 用户消息中准确的腐败字符尚未复制;更新后对其进行的验证Windows仍有待确认.
- **新建连接。** 圆形 **+** 按钮在鼠标悬停时显示提示，点击后可新建连接。
- **Search:** 更多空间用于主机名称,IP地址,片段,或AI问题.
- **Synchronization:** 成功状态以绿点显示,** Sinh.** 全部提示保存;错误,缺乏网络和断开的同步显示它们的状态.
- ** 指南:** 72个新鲜的UI镜头,用俄语和英语写成,包括移动屏幕。 这是演示数据;没有使用真正的用户寄存器 。

## 如果macOS在旧自动更新后没有打开应用程序

用[страницы загрузки](https://consolecrypt.evsikov.net/download?lang=ru)下载新的DMG**通过浏览器**,完成ConsoleCrypt,并替换**应用程序**中的应用程序. 从那里运行安装的复制件 。 加密的存储、配置和密钥无需删除 。

如果使用旧的更新按钮下载了0.2.2或0.2.3,重启同一个按钮可以再次携带启动禁令macOS. . 新版本没有固定一个已经运行的旧客户端被装入第一次清洁安装的方式. 之后,更新通过系统对话框保存**"保存和打开"**,并有大小检查和SHA-256. 将应用程序从 DMG 移动到应用程序仍然是最后安装步骤 。 沙盒和保护macOS得到维护.

## 大会

| 平台 | 版本(简体中文). | 软件包 |
|---|---|---|
| Windows 10/11 x64 | **0.2.3+1309** | EXE/便携式ZIP |
| macOS 英特尔/阿普尔硅 | **0.2.3+1310** | 通用DMG( 通用DMG) |
| Android ARM64号卫星 | **0.2.3+67** | APK 地图 |
| iOS 模拟器 Intel / Apple 硅 | **0.2.3+68** | ZIP部件`.001`/`.002` |

这些文件载于下文**Asset**。 `SHA256SUMS-0.2.3.txt`载有所有包的总和和iOSZIP。 资料来源:`8d2213f5bc24bd94a4eac6ee85f132ac3bd5600a` Windows和macOS在[CI №206](https://git.evsikov.net/publics/consolecrypt/-/pipelines/206)中组装;移动包使用相同的源,并有单独的构造号.

对于iOS模拟器,上传两部分到一个文件夹:

```sh
cat ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip -d consolecrypt-ios
```

[Запуск iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md) 此软件包没有安装在物理 iPhone 上 。

## 签发检查

**576 蝶式试验通过**,分析无评论。 单独的回归检查输入队列及其取消,面板本地化,搜索大小,成功的同步状态和保存警告. 对最新消息、组装号和公共来源构成的原始检查已经通过。

测试了版本、架构、图书馆、许可证、CRC和SHA-256软件包。 DMG通过了完整性检查; macOS - 应用 - 严格核查沙盒的签名和权限. APK保留了之前的预览签名,并支持16 KB的内存页面. iOS模拟器通过在单独的临时设备上运行来验证,然后被删除. 物理Windows/Android/iPhone和输入用户计算机没有被检查.

初步组装: Windows没有Authoriode, macOS有之前的本地签名,没有苹果公证, Android有预览签名. 客户端的 Rust 代码没有改变; 以前的 Rust 结果不是作为重复运行发布的 。 已知的RSA`RUSTSEC-2023-0071`的毒瘾警告仍然开放.

专有组件:**AGPL-3.0-仅** 包括MIT终端组件在内的第三方组件的许可证被存储在包中.

---
