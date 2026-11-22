# 大会ConsoleCrypt改为iOS

参考文档译文 · [俄文原文](../BUILD_IOS.md)

iOS目前为夏令营前作. 蝶形花采用常见的锈芯.
原生SSH,SQLCipher并安全键链. 项目的最低版本 --
iOS 15. 用于下载和安装iOS上更新的桌面机制被禁用.

## 所需经费

- macOS,通过`xcode-select`和iOSSDK选择了完整的Xcode安装;
- 在Xcode 模拟器运行时间中安装;
- 小蝶、可可花、碎屑/破碎和Python 3
- 装配工具来自[общего руководства](BUILDING.md).

不要在同一时间同时进行蝶式测试或其他本地建筑
退房 退房 退房 他们使用共享生成的文件. 私人签名钥匙,
Git不添加提供配置文件和个人团队设置 。

## 没有苹果账户的模拟器

从根寄存器 :

```sh
client/scripts/build-ios.sh --simulator
```

脚本为ARM64和Intel模拟器安装 Rust目标, 保留
一个新的构建数字会编译真实的内核,并检查版本在`Info.plist`.
结果有`dist/ios/`:ZIP与`Runner.app`,SHA-256以及文件版本.
失败的尝试也会消耗数字;不要手动减少计数器 。

在Xcode 中运行想要的模拟器 。 对于本脚本收集的应用程序 :

```sh
xcrun simctl install booted client/flutter/build/ios/iphonesimulator/Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

对于多个模拟器,而不是`booted`指定理想设备的UDID.
ZIP,先检查SHA-256,然后打包`Runner.app`并安装
由他同一支队伍。 这个ZIP不是安装在iPhone上的IPA.

### 从发布 1. 0. 0 完成归档

[Скачать Simulator ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.0.0/ConsoleCrypt-1.0.0%2B61015-ios-simulator-universal.zip),第[релиза 1.0.0](https://github.com/evsikovas/consolecrypt-client/releases/tag/v1.0.0)页.
版本**1.0.0+61015**,大小**246,829,118字节**.

在解包前检查 SHA-256文件 :

```sh
shasum -a 256 "ConsoleCrypt-1.0.0+61015-ios-simulator-universal.zip"
```

预期SHA-256: `c3663727b184e9d560ef75cb58e61c8cf9f53dde95da81a19f7f16e474a80c0d`赛后:

```sh
unzip "ConsoleCrypt-1.0.0+61015-ios-simulator-universal.zip"
xcrun simctl install booted Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

提前在Xcode 中运行模拟器; 替换为多个设备
`booted`到期望的UDID. 存档未安装在物理 iPhone 上 。

### 历史档案,从发布0.5.6

在[релизе v0.5.6](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.6)
下载[полный Simulator ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23015-ios-simulator-universal.zip)
和 [SHA256SUMS-0.5.6.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/SHA256SUMS-0.5.6.txt)
将这两个文件保存在一个文件夹中 。 ZIP全文出版;合并部分
已无所须. 组装 -**0.5.6+23015**,大小 -**154 939 478字节**.

在终端,请到此文件夹检查归档 :

```sh
awk '$2 == "ConsoleCrypt-0.5.6+23015-ios-simulator-universal.zip" { print; n++ } \
     END { if (n != 1) exit 1 }' SHA256SUMS-0.5.6.txt > ios.SHA256SUMS \
    && shasum -a 256 -c ios.SHA256SUMS
```

只有在结果`OK`出来之后才能继续(预期SHA-256):
`6394d2c15d6fd28ab58e1b28638dd75bb751dc3e487212ee90e44b001f5b1264`

```sh
unzip ConsoleCrypt-0.5.6+23015-ios-simulator-universal.zip
xcrun simctl install booted Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

在安装前,先运行Xcode中想要的模拟器. 如果有几个
模拟器,用所选设备的UDID替换`booted`. 这个 ZIP 设计用于
用于模拟器,而不是用于在物理 iPhone 上安装的 IPA。

对于本土的烟雾测试,从`flutter devices`中选择UDID:

```sh
cd client/flutter
flutter test integration_test/ios_core_test.dart -d <SIMULATOR_UDID> \
  --dart-define=CC_MOCK=false
```

在这样的本土测试构建之前, 还要从根部保留一个数字 :
`python3 client/scripts/bump-version.py` 检查使用单独的
私人测试存储,不需要来自公共服务器的证书.

## GitHub行动和iOS模拟器

在工作流程`Client tag release`中,工作流程`ios`在源头检查后开始
`cc-macos-arm64`)),无论工作macOS. 设置
`MACOS_BUILD_RUNNER`只改变工作macOS. 任务iOS发射
`ci-ios.sh --build-only` ,在单独的模拟器中安装并打开预览.
动作文物包含**完整模拟器ZIP**,它的SHA-256和版本文件.
保存期为30天. 在成功验证所有工作平台后`publish`
版本收据经过核实,七个包会自动发布.
校验和于GitHub发布. 推线本身释放不运行。
[Раннеры и номера сборок](GITHUB_ACTIONS.md)

2026年10月20日(UTC)收集的经核实的一期**0.5.6+23015**:
[iOS job](https://github.com/evsikovas/consolecrypt-client/actions/runs/39377995191/job/118489659918)
成功完成; 日志确认安装和发射
`io.consolecrypt.consolecrypt` 带PID.

在GitHub行动`Client tag release`中,在主机源门之后运行`ios`,
独立于macOS工作,在献身的Mac跑车上. 其上传.
完整的模拟器 ZIP, 校验和版本接收。 毕竟是平台
通过,出版单位对收据进行核对,自动公布发行情况.
文物和发行的ZIP是用于模拟器,而非可安装的iPhone IPA.

## SSH/SFTP回归和前GitLab CI

### 历史古迹 GitLab 文物:仅收件

在之前的GitLab CI中,从0.3开始,完整的模拟器ZIP被保存在Mac上.
运行** 退出** :
`$HOME/.cache/consolecrypt/ios-preview/<полный source SHA>/<job ID>/`
该目录有权利`0700`和ZIP`0600`. 源头的下一次清理不会移除
此档案. 保存本地捆绑的身份证/工作身份证、CRC和SHA-256
这不是在iPhone上对应用程序进行单独检查。

历史的**GitLab CI文物**只包含三个小档案:
`ConsoleCrypt-ios-preview.json`, `SHA256SUMS-ios-preview.txt` 和
`README-ios-preview.txt` 它没有应用程序。 从店主那里拿一个完整的ZIP
麦克跑车在拆包前先从收据中检查SHA-256. 如果工作结束了
保存后的错误,收件并不意味着发射验证成功.

GitLab将所有文物路径都送入一个档案库. 将 ZIP 分离成部件
同一文物内部没有缩小请求的总大小,也没有解决错误。
`413 Request Entity Too Large`,因此CI只保存收据.
目前GitHub的文物和发行品中包含完整的ZIP. 当地人。
`build-ios.sh --simulator`还提供了完整的存档于`dist/ios/`.

历史的GitLabiOS预览**artifact只包含元数据/校验和**,而不是应用程序.
完全ZIP在macOS跑道上被私人保留, 在其退票之外,
在`$HOME/.cache/consolecrypt/ios-preview/<source SHA>/<job ID>/`项下。 获取它。
从跑步车主那里,并核实记录的SHA-256,然后将其提取出来。
在一个 CI 文物内分割文件不会避免其汇总上传
限制。 公开发布下载是单独的审查出版物;
预览是用于模拟器的,不能安装iPhone IPA.

完全模拟测试需要运行Docker. 从根曰:

```sh
client/scripts/ci-ios.sh --test-only
```

脚本从已安装的运行时间创建一个单独的临时 iPhone 模拟器
它保留了一个本土测试建筑的数量。 这次发射包括一次测试.
储存和真实性SSH/SFTP通过OpenSSH容器. 密码和主机密钥
它们是在发射时创建的. 密码只通过临时端点传送到
localhost,不用源代码, 命令参数, 或 `DART_DEFINES` 来写 。
即使发生错误,容器和创建的模拟器也会被移除。 门开着呢
用户模拟器和安装在其中的应用程序不被替换.

测试检查UTF-8/Cyrilic在进入和粘贴、突出显示/复制时,
切换两个标签,从背景、 损失和回收返回小蝶
SSH 并转让一个带有西里尔字母名称的文件 by SFTP. 测试注入事件
Flustter 文本输入和生命周期;这不是真实屏幕键盘的验证
或暂停操作系统在iPhone上的应用程序。

对于一个经过单独验证的模拟器构建 :

```sh
client/scripts/ci-ios.sh --build-only
```

这次发射会将产品编译,安装和运行在自己的身上.
时间模拟器. 档案,SHA-256和版本仍保留在`dist/ios`.

文件 `client/ci/ios.yml` 保存为之前的手动 GitLab 检查 。
它的分支规则和小型预览收据不是一个持续的过程.
释放。 如上文所述,在GitHub行动中,通过标记来收集问题。
当地`--test-only`和`--build-only`仍然是独立的模式.
模拟器不需要苹果签名密钥.

## 一个真正的iPhone.

```sh
client/scripts/build-ios.sh --device
```

结果是一个没有签名的ARM64开发捆绑. 他检查汇编。
它不是作为普通应用程序安装在电话上。 安装
在Xcode中打开`client/flutter/ios/Runner.xcworkspace`,选择您的手机.
以您的 Apple 账户/ 个人团队 设置签名功能( C)
在您的手机上打开开发者模式,从Xcode 运行Runner 。 必要时,
为您的团队选择一个独特的捆绑标识符 。

签名和发行提供规则由苹果公司定义:
([настройка iOS в Flutter](https://docs.flutter.dev/platform-integration/ios/setup)号),,
[Apple Developer account](https://developer.apple.com/help/account/basics/about-your-developer-account)
TestFlight/App Store 需要一个苹果程序; 模拟器
不确认是否愿意在商店中发表。

## 已经核实的是什么和剩下的什么

之前完成的全土跑`0.1.20+47`在模拟器上通过两个
整合检查。 真正的 Rust-内核, 创建本地
配置文件, SQLCipher,主机存储, 重新启动内核后保存密钥链 ,
解锁密码短语并锁定存储. SSH - 检查包括:
通过Flutter文字输入、突出显示/复制/返回西里尔语
插入,两个标签, 返回 Flutter 生命周期, UTF-8文件 by SFTP, 丢失
连接,缓冲保存重联和重开SFTP .
重新连接后关闭活动标签必须完成
5秒后,最后的清理没有暂停。 分别考证.
Build:产品ZIP由下一跑`--build-only`创建.

现档案为**0.5.6+23015**. CI检查了捆绑的ID和版本.
我将应用程序安装在一个单独的临时模拟器中,并开始这个过程.
我有一个PID。 完整 ZIP 在一个文件中发布; 大小和 SHA-256
与GitHub资产摘要和一个常见的校验和文件核对过.
这是对过程的建设,安装和开始的检查,而不是对完整过程的重复.
SSH / SFTP - 以上运行. 视觉接受、 RDP 工作及真实设备
这次发射没有经过测试.

此前的验收还检查了 Rust 核心能否为 ARM64 iPhone 编译。上述完整测试在模拟器中进行；
真机安装和运行需单独验证。

在物理设备上,你仍然需要检查 Face ID/触摸 ID,锁定
设备,屏幕终端键盘,SSH/SFTP,通过Wi-Fi和移动网络,
从背景、文件的进出口和接口的可得性返回。
当应用程序离开背景时,应用程序开关的快照即关闭.
该端口并未承诺普遍禁止用户截图iOS.

在Xcode 中签名后用于电话的实用核对表 :

1. 创建单独的测试本地剖面, 设置生物鉴别
   解封,请检查是否取消 Face ID, 并返回密码短语 。
2. 连接到您的测试主机SSH . 输入西里尔语,删除。
   使用返回和 Ctrl+C. 检查一下航站楼的一触
   足以在更改标签并返回应用程序后输入。
3. 复制选择并粘贴命令 。 与行翻译插入
   确认警告;取消应使小组无法完成任务。
4. 用键盘打开手机并更改字体大小.
   请检查access-date=中的日期值 (帮助) 主动线路,服务键盘栏和安全区域可见度.
5. 通过SFTP传送一个带有西里尔字母名称的文件,并下载回.
   并比较内容. 重新连接到Wi-Fi和移动网络.
6. 锁上电话,打开应用开关,回来
   应用程序图像不应显示终端/存储 。 分别.
   请检查date=中的日期值 (帮助) 套装锁定时器重新解锁.
7. 关网,还原,恢复SSH/SFTP. 请检查。
   存储的主机密钥不需要重新接受,而是要更改密钥
   屏蔽连接 。
8. 检查加密备份的导入/导出, VoiceOver,
   增加系统文本和减少移动的方式。

模拟结果不会取代此核对表。 别刊真品.
密码,私密SSH——报告内工作终端的密钥或内容.
