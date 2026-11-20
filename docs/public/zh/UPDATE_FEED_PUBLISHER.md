# 已签名的更新信息更新

参考文档译文 · [俄文原文](../UPDATE_FEED_PUBLISHER.md)

`.github/workflows/update-feeds.yml`运行于GitHub - 独立托管的Ubuntu
当地建筑。 它每天检查,并支持从`main`开始的手册。 啊哈。 爱。 。
已公布的稳定释放事件只发送一个单独的运行在`main`;
释放 -tag 工作从来没有收到签名的秘密。 没有公关触发器或
自办签约工作.

存储器秘密**UPDATE_SIGNING_KEY**必须包含已有的Ed25519
PKCS#8 PEM私人密钥. 出版商已经用公用钥匙检查过了
嵌入已安装客户端 :

```text
aK3R5vXwJ9eeqQ1iYah9fzBAIHOeKNejoRdI8weXUYo=
```

这是一个信任锁定检查,而不是要创建新密钥。 运算符
必须用已经签名的`stable.json`拖住第一次释放;
`legacy-stable.json` (中文(简体) ). 出版商拒绝从未署名的发行中推断信任
仅元数据。 保持Git和VPS外的离线签名钥匙备份.
工作流程没有服务器SSH密钥或Timeweb令牌. 签名密钥已装入
从环境到内存,从不写到文件、文物、日志或
安装器。 测试在运行时生成麻黄键,而不读取密语.

## 出版物检查

出版商:

1. 最新无稿,无预释`vX.Y.Z`发布于
   `evsikovas/consolecrypt-client`,拒绝在另一个马厩下方贴上最新标签
   释放。 最多接受99份历史版和每份版32份资产;
   更大的历史要求操作员审查和扩大约束。
2. 读数`SHA256SUMS-X.Y.Z.txt`,要求准确为Windowsx64 EXE,macOS
   通用DMG和AndroidARM64 APK,并检查他们的名字,编号,
   大小和可用GitHubSHA-256摘要
3. 用嵌入式公共主播验证已签名的种子 。 它拒绝。
   版本/构建降级和更改已经签名的身份
   发布版本。 新发行版需要新版本和更大的构建数字.
4. 保留完整的对流, 两者至少14天
   剩余。 否则,它会流淌 和散开所有三个安装器,强制
   a每个文件500米B绑定。 它只跟随确切的仓库GitHub资产
   路径及其 `release-assets.githubusercontent.com` CDN 命名空间; API
   Token从未伴随公开下载.
5. 重新检查为种族发布元数据,然后签一个90天的对并上传
   使用短寿命`GITHUB_TOKEN`作为公共释放资产;
   `contents: write` (中文(简体) ).

`stable.json`使用 `https://updates.consolecrypt.dev/releases/VERSION/NAME` .
`legacy-stable.json`使用 `https://updates.consolecrypt.evsikov.net/releases/VERSION/NAME` .
相同的版本, 构建数字, 字节大小, SHA-256 值和签名身份
两者都使用。 遗留的终点是最后一份文件。
`/stable.json` (中文(简体) ). 保持旧的 URL对已安装的客户端来说是必要的 。
不要信任GitHub或新域.

## 服务公共文件

VPS只需要**公用**签名的放行资产和安装器. 没错
单独的镜像必须验证签名、身份和散列,保留最后一个
关于校验或下载失败的好文件, 并在解剖上替换每个种子
只有在种子和所有引用安装器都通过校验之后。 别
把签名的私钥放在服务器上. 出版商不部署
网站或修改账户数据。

GitHub没有为两种释放资产提供原子替换. 所有检查。
在替换开始前完成;在上传失败时, 出版商尝试
从内存中恢复上一个种子。 以后的运行可以修复一对
一个活下来的有效饲料。 服务镜像不能删除其工作文件 。
因为一个资产暂时丢失,或者运行失败. 已过期的签名
接受更新基线,但安装的客户端仍然拒绝过期
种子直到更新到达镜像。

这种设计需要可编辑的放行资产. 如果GitHub不可改变的排放是:
启用时, 出版商无法关闭; 将两个种子资产单独移动到一个
在启用这种设置之前,先审查可变分配渠道。

在没有任何生产证书的情况下进行确定性出版商测试:

```sh
node --test client/scripts/test_publish_update_feeds.mjs
```

## 恢复已停用的时间表

GitHub 自动禁用** 公共仓库中的预定工作流程
60天没有仓库活动。 返回时检查工作流程
设定的每日日程并非无限期的承诺
执行。 [GitHub: disabling and enabling workflows](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/disable-and-enable-workflows)

重新启用此已有的工作流程并请求信任的默认值检查
分支 :

```sh
gh workflow enable update-feeds.yml --repo evsikovas/consolecrypt-client
gh workflow run update-feeds.yml --repo evsikovas/consolecrypt-client --ref main
gh run list --repo evsikovas/consolecrypt-client --workflow update-feeds.yml --limit 3
```

确认运行成功并检查 VPS 镜像后的公共种子过期
运行。 仍然有效的一对,至少还有14天时间
已更改。 过期、 正确签名的基线可以续延,但客户端
在更新的种子到达服务镜像之前无法接受它 。 无持戒.
本工作流程需要承诺或单独的调度服务。

## 俄语。

工作流程** 已签名的更新信息**每天检查发行量。 签名已执行
只有从`main`到GitHub的代码 - 托管跑者. 原始的私密密钥已存储
GitHub秘密`UPDATE_SIGNING_KEY`,仅用于记忆,不坠落.
(原始内容存档于2018-03-21). VPS. 现有客户继续检查之前的公用钥匙.

剩余时间不足14天,工作流程对安装者进行重新检查并放行.
新签配对 任期90天. 发行的发布也触发了核查.
第一种可信任的对子由操作员发布;没有它,就禁止自动签名.
服务器上经过验证的公镜会在失败发生时保存之前的工作文件.
旧更新域继续服务于客户端的已安装版本.

在公共存放处GitHub,60天后即停止活动。
在这样休息之后,打开现有的工作流程命令`gh workflow enable`.
如上所示,从`main`进行人工检查。 检查结果和
镜像更新后的公共种子过期日期; 过期文档
客户端在重新签名和交付后才会接受.

## Linux饲料(FEAT-06)

DEB和RPM包有他们自己签署的文件,`linux-stable.json`.
清单`linux-x64-deb`和`linux-x64-rpm`
`https://updates.consolecrypt.dev/releases/VERSION/NAME` URLs (中文(简体) ). 签字人:
单独Ed25519 密钥存储器中**LINUQUPDATE_SIGNING_KEY**; Linux
客户只嵌入其公共主播 :

```text
Fn0pzhn51t/i8e8VYt7/wJkkXa7n2PkYtILgnxsuVlc=
```

同样的运行在主对之后签名, 并有相同的检查: 释放
校验和,流式包散列,90天寿命,更新时间少于14天
日数,没有版本 或建立 降级 与早先签署 Linux
供养. 第一条Linux饲料是从发布本身签名的
更早Linux 基准到靴子从。 没有秘密,Linux 饲料是
跳过后,主对像以前一样发布 。 两把钥匙不是
可互换:在任何请求之前,每个都与自己的锚进行核对。

## 俄文:丝带Linux

单独为DEB和RPM发布签名`linux-stable.json`. 他的他的吗 His.
sign your own key Ed25519 from a secret `LINUX_UPDATE_SIGNING_KEY` ;
客户Linux只知道其公用钥匙(上). 支票和支票一样
主配对;第一张磁带Linux在发行版本身上签名. 一个秘密,现在。
不,磁带Linux被跳过,主对像以前一样发布.
