# GitHub 行动:建立本地客户端

参考文档译文 · [俄文原文](../GITHUB_ACTIONS.md)

`Client tag release`工作流程只公布一个精确的稳定性`vX.Y.Z`.
标记其版本匹配`pubspec.yaml`及其承诺属于`main`
目前`main`的人工发送进行同样的审计、测试和5次
本地包装工作,作为未公布的候选工作。 其他分支机构的调度
在持续跑者收到代码之前被拒绝。 候选人不公布
发布、签署更新信息或发送通知。 分支推力不建设.
对持久本地跑者不执行拉动请求代码 。

| Runner (中文(简体) ). | 工作 | 所需工具 |
|---|---|---|
| 专门人员(`self-hosted, macOS, ARM64, consolecrypt, client`人) | Android, iOS 模拟器; macOS除非被推翻 | Fluster 3.47.5, Rust 1.98, Python; Android SDK 36, 建筑工具 36.0.0, NDK 28.2.13676358, CMake 3.22.1; 完整的Xcode和CocoaPods |
| GitHub - 主办`windows-2025` | Windows x64 (中文(简体) ). | MSVC C++/ATL 和 Windows SDK; `ci-windows.ps1` 规定 Flutter, Perl 和 Inno 设置 |
| GitHub - 主办`ubuntu-24.04` | Linux DEB/RPM | 孤立的Ubuntu 22.04Docker 建造者,本地特勤局/FFI测试Kubernetes接受和LinuxCPU本地-AI推断烟雾 |

仓库变量`MACOS_BUILD_RUNNER` 仅覆盖使用 a 的macOS 任务
JSON标签阵列,例如`["macos-26"]`Android和iOS使用专用
Mac; Android保留其现有的签名密钥. `ci-macos-tools.sh`条款.
被钉住的SDK缺席时会发抖. 一个专注的Mac将它的工作序列化.
iOS 工作可一次性编辑、安装和启动应用程序
模拟器. 它不需要苹果公司提供资质证书或生产IPA.

土著工作有`contents: read`. 所有5个平台工作都需要在之前完成
一家主机出版商验证收据并出版七套: macOSDMG,
WindowsEXE和便携式ZIP,LinuxDEB和RPM,AndroidAPK和通用iOS
模拟器ZIP,带有SHA-256的校验和. 它首先创建草稿,然后上传
已关闭的资产集,然后才公布。 只有出版商收到
`contents: write`和 `actions: write` (中文(简体) ). 它要求`update-feeds.yml`
`main`出版后. 网站和服务器部署有独立的标签
工作流程。 模拟器档案是为Mac上的Xcode,而不是物理的iPhone.

依赖性检查只在GitHub - 主持`ubuntu-24.04` 发布
`validate` 工作班次`client/scripts/dependency-audit.py`(固定班次`cargo-deny`)
以及`osv-scanner`,SHA-256经核实),在任何本地工作开始之前。
`dependency-audit.yml` 每周一次,在人工调度和拉动请求中重复一次
触摸表或锁文件, 包括Depabot的。 其审计工作
`contents: read`; 与`issues: write`单独工作(从未接到拉动请求).
打开、更新或关闭“脆弱依赖”问题。 政策和例外:
[BUILDING.md](../BUILDING.md#проверка-зависимостей) (中文(简体) ).

在Windows上,启用开发者模式,使Flutter能够创建插件连锁,以及
注册运行者时选择一个简短的工作目录 :

```powershell
.\config.cmd --url https://github.com/evsikovas/consolecrypt-client --work C:\cc-ghw --labels consolecrypt,client
```

在交互式提示时输入寄存器注册符 。 经核实的
Windows 长跑的用途`C:\cc-ghw` . 更长的嵌入式工作空间达到260个字符
内部销售OpenSSL并导致其本地的Perl配置失败,尽管
文件已经存在 。 简短的目录解决了故障; 启用符号链接或
Windows 单靠长路径支持并不能固定这个Perl极限. 移动时
已存在的运行器, 等待其闲置并保存其配置和旧
在新位置核实之前, 退出/ 缓存 。

## 构建编号

(`client/scripts/github-build-number.py`套):

```text
10000 + GITHUB_RUN_NUMBER * 1000 + GITHUB_RUN_ATTEMPT * 10 + platform
platform: macOS=1, Windows=2, Linux=3, Android=4, iOS=5
```

公式产量`11011` – `11015` 初赛/试赛. 每个本地工作
并检查它的预留号码是否超过当前源建楼层.
复数收新数. 99和Android版本以上的尝试
关闭失败 。 不重设/ 创建此工作流程并重用其运行数序列
而不将基线提高到所有已公布建筑之上。 不要发表一个老人
运行后, 更新的运行已运出 。

Windows 原生`FILEVERSION`和Inno Setup版本组件仅限于
`65535`. 包装目前将完整的建筑编号置于第四部分.
在超过这一限制之前,改变和测试Windows元数据的表示
保留完整的应用程序/更新版本和单调版本Android
`versionCode` (中文(简体) ). 使用当前公式,运行56次超过Windows的上限,甚至
许多复试者可以更早到达它。 限制既适用于手工考生,也适用于标签发布. 不要重设GitHub 运行序列来绕它工作 。

## 签署和全权证书

- 仓库变量`ANDROID_HOME`和`JAVA_HOME`指现有的
  SDK和JDK在Mac跑车在标准位置之外时.
- 需要GitHub存储器秘密进行汇编。 短暂的人生
  工作流程令牌获取源码并上传CI文物.
- MacRunner必须维护现有Android 预览
  `$ANDROID_USER_HOME/debug.keystore`(违约`$HOME/.android/debug.keystore`.
  `build-android.sh`拒绝默默替换. 替换密钥防止
  在一个安装的APK上升级.
- 可选寄存器变量`CC_CODESIGN_IDENTITY` 选择一个已存在的
  macOS 键链以姓名或SHA-1签名身份. 没有它, 建筑保留
  之前的专制行为. 开发者ID发行需要公证.
- 所需工作iOS生成一个模拟器ZIP,要求不提供
  iPhone发行范围在1.0.0发行范围之外.
- 更新签名密钥`UPDATE_SIGNING_KEY`和`LINUX_UPDATE_SIGNING_KEY`
  对于单独的Linux饲料仍限于单独的更新饲料).
  工作流程。 土著建筑工种得不到生产证书或更新
  签名密钥。 见[RELEASING.md](RELEASING.md)和
  [UPDATE_FEED_PUBLISHER.md](UPDATE_FEED_PUBLISHER.md) (中文(简体) ).
- 主办单位(`announce`个)在出版后运作。 每个频道开始
  当所有者已经配置它:`TELEGRAM_BOT_TOKEN`+`TELEGRAM_CHAT_ID`
  (项目频道),变量`TELEGRAM_PERSONAL_CHAT_ID`(第二个频道);
  `announce-telegram.py` 保持每个频道的日记,`EVSIKOVNET_TOKEN`
  `announce-evsikovnet.py`在 evsikov.net 上创建或更新该发布
  俄羅斯音符與控制台crypt.dev下载链接. 脚本拒绝发布
  在发放工作之外;当地使用`--dry-run`

在发布前, `announce` 等待最多30分钟的公众下载页面
以显示此版本,并链接每个已核实的软件包,包括模拟器。
网站部署使用其单独的标签工作流程. 暂停每个时间
通知频道;它不删除已发布的客户端软件包。
手册`Encrypted client compatibility`工作流程还运行加密/同步
在没有包装或出版物的孤立的Ubuntu跑道上进行试验。

人工制品保留30天,只包括明确包件、校验和
和版本路径。 Linux试验报告采用经编辑,关闭JSON的schema.
测试密钥环、原始运行时输出和私人固定装置不上传。

## 生成输出清理

完全生成输出清理运行** 仅在稳定状态GitHub后
已经出版。 长期性Windows和Mac建工`clean: false`
检查并保留被忽略的货运/货运产出、本地软件包和自有软件
AI在编译,测试或上传失败后抽取缓存. 诊断性工作
留着吧 工作流程记录寄存器、源承诺、运行和平台
在工作空间所有权标记中,在建房前。

出版后,一个单独的Mac清理工作验证该标记和
the checkout's current `HEAD` The persistent Windows runner keeps its
发布后生成构建缓存, 以便构建下一期
递增; 使用下面的守护维护工作流程进行清理. 他们不检查 拒绝外国人或
新的工作空间。 发布、诊断和维护工作流程共用一个
货币组,所以在出版后清理时无法开始另一块
正在运行。 只有在GitHub接受公众之后,才对出版物进行记录。
释放; 后期更新消息发送失败并不妨碍清理
已经发布。 已完成的文物上传和GitHub日志仍然保留。

这项政策适用于包含这些工作流程变化的标记. 不可改变
`v0.5.2`工作流程中仍包含较早的每工作`always()`清理. 托管
Mac虚拟机和LinuxARC`emptyDir`工作空间为电平;保留
任务中的文件在机器或吊舱被销毁后不会保存它们。
突然终止的持久跑者也可能错过其最后的清理工作。
使用发布后下方的守护维护工作流程.

清理仅限于该仓库的确切值`GITHUB_WORKSPACE`和
在删除任何内容之前检查 Git root/ 来源和跟踪文件 。 关门了
列表涵盖货物`target`目录,Flutter`build`/`.dart_tool`,Android
离职`.gradle`/`.cxx`和`dist`. 目标祖先的连结/连接
生成树内的链接会被删除,而不跟随它们。
资料来源,`.local`收据、应用模型/故障、签名密钥、SDKs、货物
登记册、酒吧缓存和共享工具装置不在清单之列。
如果一个完成构建在 transversal, 清理重试时删除或创建文件
仅`ENOENT`/`ENOTEMPTY`,最高可达5次(总后退3.85秒).
持续的失败仍然是失败;诊断包括错误类型和错误,
无例外的文字、绝对路径或环境值。

Windows GitHub 工作重复使用`.ci-cache/local-ai-smoke`在被守卫的检查中.
它的所有权标记将它绑定在这个寄存器和工作空间上,独立于
尝试号,所以重试可以重新使用已核实的下载. 出版后
清除此自有缓存以及生成的构建输出 。 旧的
`C:\GitLab-Runner\tools\consolecrypt-local-ai-smoke`缓存被保存,除非
操作员明确选择对已知的CI路径进行维护。

Linux records of its job ownership under `RUNNER_TEMP` before starting Docker and
用寄存器/运行/试运行/工作标记容器。 两个正常的退出陷阱
单独`always()` 步骤呼叫`cleanup-linux-job.py` 停止计算
当建设失败或取消时 。 帮手检查所有者收据,
标签、图像和精确度`/work` 来源挂载,然后只删除检查过的
不可移动的容器ID。 缺少/匹配所有权或链接路径失败关闭 。
帮助者保留了自有源抓取和安全收据; ARC 最终
移除其共享`emptyDir`与吊舱. 建设者图像与共享Docker
层被保留。 没有全局Docker的prune或量的删除.

`Runner generated-output maintenance`是一本单独的,**主要**手册.
工作流程。 它不构建软件包、部署、接收签名秘密或更改
标签发布。 它使用相同的货币组 释放构建,所以它等待
直到发行完成. 需要公布一个稳定的标签, 验证
其GitHub释放是公开的,如果工作空间的当前状态,则拒绝清理。
`HEAD`与该标记不同. 因此,无法使用旧的出版版
清除新尝试失败 。 其工具的检查结果与
`clean: false` (中文(简体) ). 内置警卫**在** 离职前运行:他们拒绝连锁/连接
外国工作空间和现有工具目录,除非是
空或已经清除了预期的 Git 退出( 包括未跟踪/ 被忽略)
文档). 退职不能擦除
守护清理运行前未知文件 。

```sh
gh workflow run runner-cleanup.yml --ref main -f platform=macos -f published_tag=v0.5.2
gh workflow run runner-cleanup.yml --ref main -f platform=windows -f published_tag=v0.5.2

# Explicit one-time cleanup of known old Windows CI GGUF/download/runtime files.
gh workflow run runner-cleanup.yml --ref main \
  -f platform=windows -f published_tag=v0.5.2 -f legacy_windows_ai_cache=true
```

遗留缓存选项默认为虚假, 不接受任意路径, 拒绝
链接/保存点和意外运行时间内容,并保存选择,
日志、收据和未知文件。 它不检查Windows应用数据。
删除边界通过微小的自有临时寄存器进行测试
`python3 -m unittest discover -s client/scripts -p 'test_ci_cleanup.py' -v` (中文(简体) ).
Windows路口试验继续进行(Windows路),在其他地方被明确跳过。
`test_cleanup_policy.py` 也验证失败的发行创建/发布
不发出允许完全清理的出版信号。
`test_linux_cleanup.py`涵盖Docker所有权边界; `tests/test_linux_ci.py`
还用`SIGKILL`杀死一个合成生产者壳,并援引最后清理作为
一个新的进程,而不依赖它的退出陷阱。 他们用假的Docker,不是
实时用户容器。

## 俄罗斯语

`main`存储已核实的源底. 要发布, 提升版本, 添加
释放笔记,发送承诺`main`,然后标注`vX.Y.Z`以实施这一承诺。
只有标记触发了建筑。 在成功组装所有工作流程平台后
发布全文GitHub 发布并发布签名带子的更新.
包Android与前一个跑车键签定。 iOS在CI中不会
(大会延迟;仅本地模拟预览)

任务`announce`公布后,
由所有者设立:项目的Telegram频道`TELEGRAM_BOT_TOKEN`
`TELEGRAM_CHAT_ID`),第二频道(可变`TELEGRAM_PERSONAL_CHAT_ID`;日记.
`announce-telegram.py`通过频道)和evsikov.net`EVSIKOVNET_TOKEN`:
`announce-evsikovnet.py` 创建或更新带有俄文注释的发布
链接到 Copercrypt.dev 。 除此任务外, 脚本不出版; 本地 ,
`--dry-run` (中文(简体) ).


### 诊断标记Windows

在创建新的稳定释放之前对 ConPTY 进行孤立的校验
不可更改标记`check-windows-0.5.2-1`(之后的尝试是新数字).
`windows-native-check.yml`关于主机跑车检查标记格式和隶属关系
实施`main`,然后在Windows发射`ci-windows.ps1 -NativeOnly`.
此模式只编译并进行本地测试;它不备份
安装者号码,不收集应用程序,不下载模型,不发布
释放。 中度结果在成功后和错误后均保持不变。
只有在稳定发布后才能进行彻底清洗。
诊断和释放任务使用共同的队列来清理
出版的这期节目与新的诊断组装没有交叉.
`vX.Y.Z`上的定期发布重复了所有平台的全套检查和包装.

### 预装Windows.

`windows-preview.yml` 手动启动( 动作 ~ Windows 预览构建)
运行工作流程,从云`windows-2025`上选择的分支. 他打电话来
`ci-windows.ps1 -PackageOnly`:安装工具和组装安装器以及
手提式ZIP没有试运行发行. 结果是一件文物
`windows-preview` 14天; 发布、更新磁带和建筑编号不
受到影响。 这是人工检查组装,不是放行.
