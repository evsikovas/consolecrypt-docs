# ConsoleCrypt0.5.2 (中文(简体) ).

参考文档译文 · [俄文原文](../RELEASE_0_5_2.md)

## 俄罗斯语

0.5系列的第一版:本地终端,扩展目录
模型,并在升级时保存下载的本地AI.

- ** macOS和Windows的本地终端:** zsh、PowerShell、cmd和单独
  选项卡,用于每个已安装的 WSL 分布。 你可以让他们接近。
  与SSH - 会期。 支持交互输入、调整大小、
  控制密钥, 关闭标签或屏蔽时完成进程 。
- ** AI的明显目标:** 本地贝壳在没有虚构的情况下传递其方言
  SSH - 主持人. 对于本地AI命令和片段,可使用不包含 Enter 的插入;
  检查后的处决仍为人工执行. SFTP和大规模发射为SSH.
- **三种本地型号:**轻量级 Quen2.5-Coder 1.5B,中度 Quen3.5 4B和强力
  (原始内容存档于2017-09-29). Quen3.5 9B. 设置显示负载量、 RAM 引用、 来源和
  执照。 恒星推荐计算机总内存的选项,而不改变
  你的选择是自动的。
- ** 升级时省去本地AI:** 引擎安装与
  GGUF文档. 测试过的模型被重新使用;模型的改变不删除
  余诸人. 删除选中的模型不会删除其他模型和引擎 。
- **macOS:**运行一个普通的zsh需要从App Sandbox进行伐木. 以往数据
  现场使用的容器;当前包件是临时签名而不是
  公证;在两个存储处发生冲突或出错的情况下
  访问发射停止 附有解释。 断层和键链不应被删除。
- ** Windows:** 完工前关闭当地航站楼时冻结
  启动交换器 ConPTY; PowerShell 和 cmd 均在目前Windows的运行器上进行校验.
- 确定在缺失事件后恢复终端缓冲的程序
  和移动的RDP面板在一个黑暗主题中的对比.

详细情况:[локальные терминалы](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/LOCAL_TERMINALS.md),[локальный ИИ](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/LOCAL_AI.md)
和 [обновления](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/UPDATES.md) (中文(简体) ). 本地贝壳和内置的本地AI可供使用
OnmacOS/Windows; Linux移动平台保留现有能力.
iOS套件是为模拟器设计的,而不是安装在物理的iPhone上.

### 货包0.5.2

所有7个文件都在[релизе v0.5.2](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.2)中公布.
大小和SHA-256对照已公布的文件进行核对;
使用[SHA256SUMS-0.5.2.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.2/SHA256SUMS-0.5.2.txt).

| 平台 | 大会 | 格式 |
| --- | --- | --- |
| macOSARM64和英特尔x86-64 | 0.5.2+21011 | 通用DMG( 通用DMG) |
| Windows x64 (中文(简体) ). | 0.5.2+21012 | EXE和便携式ZIP |
| Linux x64 (中文(简体) ). | 0.5.2+21013 | DEB 和 RPM 数据 |
| Android ARM64号卫星 | 0.5.2+21014 | APK 地图 |
| iOSMac上的模拟器 | 0.5.2+21015 | 通用 ZIP 软件 |

Windows 包没有认证码签名 。 APK 保留上一个证书
iOS 预览在模拟器中安装和启动; [инструкция запуска](BUILD_IOS.md)
这不是物理电话上的RDP检查. (Windows年)确认了目前的情况
PowerShell/cmd和生成由CPU上所有三种本地型号. 几个
不包括实际的WSL分发和0.4.1的更新。
经核实的矩阵。 RU/EN 图像显示与合成的真接口
数据;它们不是这些本地支票的记录。

在更新之前,应保存备份和回收工具箱;
不删除应用程序数据、模型或系统密钥链。
