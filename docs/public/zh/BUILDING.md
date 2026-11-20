# 装配和同步服务器

参考文档译文 · [俄文原文](../BUILDING.md)

在所有情况下,克隆整个寄存器: Rust-client 使用通用
图书馆编号`crates/`. Fluster SDK 3.47.x, 达特 3. 134; Rust 固定为
`rust-toolchain.toml` (中文(简体) ). 保存`Cargo.lock`,`pubspec.lock`和`Podfile.lock`.

## 从GitHub释放

`main`包含现有来源. 公共安装器只在发送时才发布
与`pubspec.yaml`中的版本相匹配的稳定标记`vX.Y.Z`. 标记应该
指向历史的委托`main`... 推进树枝不会启动组装. 手工启动当前工作流程`main`
检查所有平台,并保存 CI 包而不发布和公告. 老吉特拉布输油管下线.

工作流程`Client tag release`检查标记,运行Windows,macOS,Android.
Linux和iOS模拟器,然后用SHA-256发布一个GitHub的七包.
从1.0.0iOS开始,模拟器是发行的强制部分.
Windows用途GitHub - 托管`windows-2025`,Linux - `ubuntu-24.04`
隔热器Docker 建置器. Android和iOS使用`cc-macos-arm64`
带有完整的Xcode. 对于macOS,默认使用相同的Mac.
变量`MACOS_BUILD_RUNNER` 允许您指定JSON -其他标签的阵列,例如
`["macos-26"]`准备GitHub跑者. 命令行工具还不够
SDKAndroid由`ANDROID_HOME`定义,JDK由`JAVA_HOME`定义,由寄存器定义.
变量。 签名密钥存储在相应的跑者上.

出版后,从`main`开始单独订阅更新的素材.
每日工作流程`Signed update feeds` 扩展已签名元信息
必要时,它不收集安装器. 已出版的软件包版本
未替换: 更改以新标签发布 。

## macOS (中文(简体) ).

需要带有命令工具的完整Xcode, Flutter, Rust/rustup
可可猪笼草与Python 3. Apple Silicon和Intel正在合并成一个一站式软件包.
从根寄存器 :

```sh
client/scripts/build-macos.sh --no-cli
```

结果:`dist/macos/ConsoleCrypt.dmg`,应用程序,ZIP和版本文件.
图像包括应用程序链接和安装背景. Python对包装的依赖性
它们被置于`dist/`以内的当地环境中。
如果您有证书,可以指定`CC_CODESIGN_IDENTITY`或`--sign-identity`.
需要一个稳定的签名,以便更新不会改变对键链的信任。
与守门员一起公开发行也需要苹果公证.

## Android• ARM64

预装Android11+(API 30),ARM64:

- 17约旦第纳尔;
- Android SDK平台36,建设工具 36.0.0;
- NDK 28.2.13676358, CMake 3.221; 2.
- Flutter and Rust; Python 3 用于检查本地图书馆.

```sh
export ANDROID_HOME="$HOME/Library/Android/sdk"
client/scripts/build-android.sh
```

如果SDK位置不同,请自行设置`ANDROID_HOME`. 小蝶会恢复
项目准备中的Gradle包装Android . 剧本检查APK签名,
ZIP 本地库的对齐与对齐,用于16 KiB内存页面.
结果:`dist/android/ConsoleCrypt-android-arm64.apk`,SHA-256和准确的版本.

在本地建设升级已经安装的APK时,请检查号码.
组件:已公布的CI包可能比原`pubspec.yaml`要高。
开始前, 设定`CC_BUILD_NUMBER` , 整数大于数组
软件包和原始组装编号。 脚本将记录在元数据中; 相同
还需要签字。 编号`CC_BUILD_NUMBER`仅增加
所以这个APK可以比安装的要老.

当前配置甚至在发布APK中也使用本地**debug keytore**.
试包. 私钥不包含在 Git 中 。 在不同地点收集的APK
具有不同密钥的计算机不会在安装的版本上互相更新.
在切换到另一个签名之前,请保存一个加密的备份副本 。
生产配送需要单独的安全签名密钥和配置
发布签名;不在寄存器中发布此密钥 。

在Android上,OS的背景限制可以打断SSH会话. SFTP 用途
系统选择文档;与桌面编辑器的集成可以在计算机上使用.

## Windows (中文(简体) ).

[Пошаговая инструкция и создание EXE-установщика](BUILD_WINDOWS.md) (中文(简体) ).

## Linux• x86-64 (英语).

[Установка DEB/RPM, системная ключница и сборка](BUILD_LINUX.md) (中文(简体) ).

```sh
client/scripts/build-linux.sh
```

结果:两包`dist/linux/`,SHA-256和准确版本.
基本包环境 - Ubuntu 22.04 x86-64; 安装检查
德比安12号和费多拉43号. 您需要一个 D- Bus 图形会话来启动并
创建了解锁的主键盘特勤局. 最新情况Linux
手动通过`apt`/`dnf`;签名的更新磁带和自动
安装Linux不支持. 物理GPU和Wayland没有经过测试.

## iOS 初步港口

[Simulator, нативные проверки и подпись для iPhone](BUILD_IOS.md) (中文(简体) ).
模拟器 ZIP为Xcode 模拟器设计; 需要在电话上安装
在Xcode 中单独签名。

## 考证.

```sh
(cd crates && cargo test --locked)
(cd client/rust && cargo test --locked)
(cd client/flutter && flutter pub get && flutter analyze && flutter test)
python3 -m unittest discover -s client/scripts -p 'test_*.py'
```

不要同时运行Flutter测试与原生建筑:它们更新了常见的.
已生成文件 。 桥已经生成并包含在源代码中.
正常的构造不需要安装flutter_rust_bridge_codegen.

## 依赖性测试

`client/scripts/dependency-audit.py check` 发射"货物拒绝检查顾问"
禁止来源许可证` для `客户/用户` и `箱 ' ,检查自己的规则
箱子和扫描`pubspec.lock`(如果出现npm锁文件)通过
`osv-scanner` (中文(简体) ). 在本地,您需要与 CI 相同的版本 :

```sh
cargo install --locked cargo-deny@0.20.2
go install github.com/google/osv-scanner/v2/cmd/osv-scanner@v2.6.0
python3 client/scripts/dependency-audit.py check
```

一次检查:`货物拒绝--manifest-path客户/rust/Cargo.toml--locked检查
顾问禁止许可证的来源。

在CI中,该步骤只在GitHub - 主持`ubuntu-24.04`:在`validate`标签上进行。
发布(未能停止包件组装)和周刊
`dependency-audit.yml`,它也通过修改来检查牵引请求
上瘾。 每周运行打开或更新"易变"的一期
依赖性",并在一次干净的运行后关闭. 工具正在下载从
GitHub 发行时使用SHA-256检查固定在剧本中.

政治(`deny.toml`年):

- 禁止变质和杂乱无章的版本;未保存的直译
  我们箱子的依赖性;
- 仅禁止`native-tls`和`openssl`偷盗、`openssl-sys`
  仅作为 SQLCipher `libsqlite3-sys` 的后端
- 仅允许 git 源`github.com/evsikovas/consolecrypt-server`
  `cc-protocol`关于审计;
- 自己的箱子 - `cc-*`, `publish = false`, `AGPL-3.0-only` :新模块
  它不需要编辑许可证的例外情况,而且剧本拒绝任何其他许可证。
  未公布的箱子。

例外只自觉地:在`ignore`文件`deny.toml`中(或)
`[[IgnoredVulns]]`),`osv-scanner.toml`中带有理事会的识别号,理由,
(b) 期限不超过三个月。 现已通过:

- `RUSTSEC-2023-0071` (rsa, Marvin):没有固定的上游版本.
  本地`ssh-key` 使用系统随机的 RSA 盲目
  在SSH中签名/代理。 剩余限制和核查限额载于
  `SECURITY.md` ;建议创建新的SSH密钥Ed25519.
  2027-01-21修订版.
- `RUSTSEC-2024-0429` (glib 0.17.10 in GTK3 插件): 本地
  上游后港. 它的源代码, 构建连接和锁文件都受到保护
  `client/security-backports.json`; 优化Linux - 测试是强制性的.
  `client/native-deny.toml`中的例外不允许原始登记处版本.
- `RUSTSEC-2026-0459``libsqlite3-sys`0.38.2): SQLite固定
  e5bf1198被移植到内置引擎SQLite和SQLCipher. Heshi.
  C码,信头和构建脚本也被覆盖;测试会编译现实世界的代码.
  WAL读取并检查阴性控制. 有条件排除
  OSV直到2026-12-09只对这个本地的后港有效.
  允许一个注册包。 更新为0.39.1,没有单独的固定
  SQLCipher是不够的。 详细情况:`SECURITY.md`.

货物通过OSV/GHSA对根图和
原生的蝶形插件 。 工具错误或不完整的回答停止
检查。 本地源散列只计算出LF/CRLF在离职时的差额.
对于明确标记的本地公共补丁,OSV/GHSA也检查原始内容
上游版本. GLib 排除被绑定在已核实的后端端口,不允许
同一版本的注册包在一个不同的框中 。 未发送本地私人软件包 。

PEM 证书和数据库密钥`db-core`通过`rustls-pki-types`读取
`PemObject`; `rustls-pemfile`不再使用.

## 你的服务器。

本地配置文件在没有服务器的情况下工作. 用于同步, 使用
[отдельный репозиторий сервера и протокола](https://github.com/evsikovas/consolecrypt-server) (中文(简体) ).
指令Docker/SMTP和启动命令位于其README和HOSting.md中.
服务器代码不包含在目前的主要客户端寄存器中.
