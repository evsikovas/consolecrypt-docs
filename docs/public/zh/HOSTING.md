# 安装自己的服务器ConsoleCrypt

参考文档译文 · [俄文原文](../HOSTING.md)

>网站内容相同:[Docker Compose](https://consolecrypt.dev/guide#server-docker),[Kubernetes](https://consolecrypt.dev/guide#server-setup).
>[установка и параметры по способам](https://consolecrypt.dev/guide#server-settings) (英语).
> 网站内容相同:[installation and parameters by method](https://consolecrypt.dev/guide#server-settings).

服务器存储账户、设备信息和加密数据
保险库。 解密发生在客户端; SSH - 连接由客户端设置
直接和你们的主人在一起

选择一种方法:[Docker Compose на одном сервере](#docker-compose)
或 [Kubernetes/k3s через Helm](#kubernetes-helm) 两者都只运行API.
cPostgreSQL和SMTP. 域`sync.example.org`,数据库地址和邮政设置
需要用自己的例子来取代例子。 所有命令都从源根执行.
除非另有说明。

实例被指定给**当前服务器发布** - 与当前版本相同 。
`server/Cargo.toml` 支部 `main`. 在Docker中是一个变量.
`CC_SERVER_VERSION`,在Helm - `appVersion`图表中;当新版本发布时,它们
他们随它而改变(见CI). 图像
`ghcr.io/evsikovas/consolecrypt-server:<версия>` collected for `linux/amd64` and
`linux/arm64` ; 已公布的标签不是覆盖的. 尽可能
从文件`server-image.json`复制的安装固定摘要
GitHub 发布所希望的版本.

当前服务器能做什么以及如何打开 :

| 机会 | 设置 | 以默认. |
|---|---|---|
| 存储同步、 设备信任、 请求签名 | `CC_REQUIRE_REQUEST_PROOF` (中文(简体) ). | 包含 |
| [Защита от входа с нового устройства](#защита-от-входа-с-нового-устройства) (中文(简体) ). | `CC_DEVICE_PROTECTION_ENABLED` (中文(简体) ). | 关机 |
| [Совместный доступ](SHARING.md)主机,团体,秘密,Kubernetes,数据库 | `CC_OBJECT_SHARING_ENABLED`和类型旗帜 | 关机 |
| [Общие заметки](#общие-заметки)改为共同对象 | `CC_SHARED_NOTES_ENABLED` (中文(简体) ). | 关机 |
| [Команды](#команды)(共同储存) | `CC_TEAMS_ENABLED` (中文(简体) ). | 包含 |
| [Enterprise-вход](ENTERPRISE.md)通过IDP(OIDC)或活动目录(LDAP) | `CC_AUTH_MODE=enterprise` (中文(简体) ). | `standard` (中文(简体) ). |
| [Квоты и лимиты запросов](#квоты-и-лимиты-запросов) (中文(简体) ). | `CC_QUOTAS_V2_ENABLED`, `CC_RATE_LIMIT_MODE` (中文(简体) ). | 包括配额、模式限制`observe` |

所有具有有效值、默认值和路径的服务器参数
赫尔姆被列入[CONFIGURATION.md](CONFIGURATION.md). 怎么问他们
c Docker Compose, `docker run`, Helm, JSON -文件或系统, 现成
例如,见[Как задать любой параметр](#как-задать-любой-параметр)节。
英语: [configuration methods and worked examples](#english).

## Docker Compose (中文(简体) ).

在没有Kubernetes的单一服务器上安装

### 需要什么? 来点什么?

Linux - 使用Docker发动机的服务器,Docker Compose**2.24.4或以后**(或5.x),
Python**3.9 或 later** 和 PostgreSQL 16. 自由盘. HTTPS你需要的就是这个
包含 DNS A/AAAA 的域名到此服务器,并可以外部访问 TCP 端口 80 和 443 。
UDP 443被Caddy用于(HTTP/3);当它被屏蔽时,它仍然停留在HTTPSTCP之上.
这些端口不必同时有另一个代理.

该变体为1个节点设计:PostgreSQL不复制,API和可选
凯迪 常数数据为(Docker卷). 设后援.
在此节点之外, 重启后自动启动Docker 。

文件:[compose.yaml](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/compose.yaml)
([Caddyfile](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/Caddyfile)号),,
[справочник переменных](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/docker/.env.example) (中文(简体) ).
旧的`server/docker-compose.yml`仍然是发展的一个单独选择。
重新组装源代码,并将字母写入文件.

### 举个例子,创建私人配置.

对于Docker,采取**当前`main`**. 发电机写给私人
`server.env`版本的示例服务器,例如:

```text
CC_SERVER_VERSION=0.2.8
```

编曲取景`ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION`.
代替标签,您可以指定准确的图像:`CC_SERVER_IMAGE=ghcr.io/evsikovas/consolecrypt-server@sha256:…`
(从`server-image.json`到GitHub发布). 服务器本身向`/v1/meta`报告.
`CC_SOURCE_CODE_URL` 仅要求用于:
改进组装(见[LICENSING.md](LICENSING.md)).

在单独的巴什终端:

```sh
set -euo pipefail
git clone --branch main --single-branch https://github.com/evsikovas/consolecrypt-server.git
cd consolecrypt-server
export CC_COMPOSE_FILE="$PWD/server/deploy/docker/compose.yaml"
export CC_INSTALL_DIR="$HOME/.config/consolecrypt-docker"
export CC_API_ORIGIN="https://sync.example.org"
umask 077
docker context show
docker compose version

python3 server/deploy/docker/init-config.py \
  --directory "$CC_INSTALL_DIR" --domain sync.example.org
```

请检查是否选中了服务器Docker 。 生成器创建带有权限的目录
0700和`server.env`,权利0600** 出源**,生成不同的随机
管理员密码PostgreSQL和应用程序用户,以及SMTP密码
问不展出. 在目前`server.env`之下,他将拒绝继续:
重新生成密码不会改变已经创建的数据库的密码.

指定 SMTP主机、发件人、端口、 TLS 模式和登录。 587型机车通常需要.
`starttls`,用于465— `tls`;发送者必须经过您的 SMTP 授权.
对于没有邮件的私人安装,请添加发电机`--mail-disabled`:
确定电子邮件, 管理员必须用邮件自动重置
岂能通乎. 电子邮件的确认和申请的签署仍然是强制性的。

不在 Git 中添加`server.env` ,不执行`source server.env` ,不输出
`docker compose config`无`--quiet`:最终配置包含密码.
别开`set -x`. 编曲取自`--env-file` 的值,但名称相同 。
当前 shell 变量具有优先性:使用干净的终端.
详情见[документации Docker об интерполяции](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/).
访问 Docker 守护进程允许您读取容器变量; 限制它
行政人员。 服务器没有共同的机制`*_FILE`(文件被读取).
仅限企业进入机密:数据库密码转给个人
`CC_DATABASE_PASSWORD`,无间URL. 无穷无尽不需要壳包。

### 发射PostgreSQL、API和HTTPS

保存此终端中的函数, 并将其用于以下命令 :

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" --profile https "$@"
}

cc_compose config --quiet
cc_compose pull
cc_compose run --rm --no-deps caddy caddy validate --config /etc/caddy/Caddyfile
cc_compose up -d --wait --wait-timeout 180
cc_compose ps
```

PostgreSQL和API将变为`healthy`;Caddy`running`.
服务器在二进制文件中使用内置验证`/readyz` : 安装
`curl`或贝壳不需要. 在第一个开始PostgreSQL 创建
一个拥有其基础但并非超级用户的角色`consolecrypt`.
API然后应用迁移. 与`service_healthy`的依赖关系如下:
[документации Compose](https://docs.docker.com/compose/how-tos/startup-order/) (中文(简体) ).

Caddy 自动接收并更新信任的证书 。 为此,DNS,
路线和进入的港口必须工作;状态`running`尚未证明
证明是发给的 细节 - [Automatic HTTPS](https://caddyserver.com/docs/automatic-https).
证书保存于`caddy_data`和`caddy_config`的凯迪设置中.

API发布于**127.0.0.1:8080**主机. PostgreSQL 5432未发表
标尺已绝. Caddy只向服务器传输`/v1`,`/v1/*`,`/healthz`.
`/readyz`和`/account`,`/account/*`;站点根将返回404. 站点或分析
他们没有安装。 默认`CC_WEB_ACCOUNT=false`和`CC_PUBLIC_URL`为空 :
`/account`对404个字母(HTML和文本、语言-`CC_MAIL_LANGUAGE`),`ru`或
`en`)建议在申请中插入代码,而不提及网页.

以便电子邮件能导致服务器账户内置的页面(电子邮件确认,
新密码, “这不是我 ” ,关于新设备的邮件, 添加到文件中
设置`CC_WEB_ACCOUNT=true`和`CC_PUBLIC_URL=https://<CC_DOMAIN>` - 需要
已存在页面的服务器图像 。 页面是静态的,它的工作。
仅从信件中公开端点,不进入,不访问
该代码以片段URL传送,不输入日志.
客户端输入`CC_API_ORIGIN`而不是`CC_PUBLIC_URL`.

如果您已经在主机上拥有HTTPS反向代理,请移除`--profile https`.
从函数并配置代理到`http://127.0.0.1:8080` 。 他需要重新录制
未受信任`X-Forwarded-For`,传送WebSocket`/v1/events/ws`,接收
最多16个MIB,不更改路径、查询或签名请求的正文。
实例[Caddy reverse_proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)
它这样做时没有`handle_path`和重写. 此示例涉及一个信任的代理 。
不向外部打开 API 端口 。 在一场8080年的当地冲突中,变化`CC_HTTP_PORT`.
在您的代理服务器的私有文件中 和相应的上游文件 。

### 检查并连接客户端

```sh
curl --fail --silent --show-error "$CC_API_ORIGIN/healthz"
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
```

预期`ok`,`ready`,`server_version`,等于`CC_SERVER_VERSION`,以及
`protocol_version`,此发布(如`1.11`服务器0.2.2).
检查HTTPS,不检查`curl -k`,包括从另一台机器。 在客户端中,创建.
配置文件,其中`https://sync.example.org`**没有`/v1`**。 报到 报到
如下文第6节所述,通过API发送电子邮件和确认代码。
当SMTP被禁用时,操作员在检查地址所有者后,执行:

```sh
cc_compose exec -T server /usr/local/bin/consolecrypt-server \
  admin verify-email --email user@example.org
```

检查测试主机在两个可信任的设备之间的同步.
为结束登记,将`CC_REGISTRATION_OPEN=false`改为`server.env`
并进行`cc_compose up -d --wait --wait-timeout 180 server`.

共享旗帜默认关闭 。 如果署长另行决定
启用共享访问并检查客户兼容性,它会更改
`CC_OBJECT_SHARING_ENABLED`, `CC_SHARED_GROUPS_ENABLED`, `CC_SHARED_SECRETS_ENABLED` (中文(简体) ).
`CC_SHARED_KUBE_CONTEXTS_ENABLED`, `CC_SHARED_DB_CONNECTIONS_ENABLED`, (中文(简体) ).
`CC_SHARED_NOTES_ENABLED`和`CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED`在`true`的同一私人档案中.
之后它只重现了由同一团队提供的服务`server`. 请求的签署
仍然是强制性的。 主旗是其他扩展的强制性的.
机会通过授权请求`/v1/shares/capabilities`加以检查。
不通过`/v1/meta`;限制在[SHARING.md](SHARING.md).

### 数据保存和备份

The name of the Compose project is `consolecrypt-selfhost` ; its PostgreSQL volume is
`consolecrypt-selfhost_pgdata` (中文(简体) ). 保存工程名称和私有文件 :
另一个`--project-name`将创建另一个数据库。 `cc_compose down`将存储卷。
但停止服务; `cc_compose up -d --wait --wait-timeout 180`开始
**不使用`down -v`或`docker volume prune`
用于更新或正常重新启动。 基地第一次创建后, 变化
`server.env`中的密码不会改变PostgreSQL的角色.

图像PostgreSQL是在主机上不安装`pg_dump`而创建的:

```sh
umask 077
CC_BACKUP_DIR="$CC_INSTALL_DIR/backups"
mkdir -p "$CC_BACKUP_DIR"
chmod 700 "$CC_BACKUP_DIR"
CC_BACKUP_FILE="$CC_BACKUP_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
cc_compose exec -T postgres pg_dump -U postgres -d consolecrypt \
  --format=custom --no-owner --no-acl > "$CC_BACKUP_FILE"
chmod 600 "$CC_BACKUP_FILE"
cc_compose exec -T postgres pg_restore --list \
  < "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

密码不输入 argv: 命令通过本地 Unix 套接字执行
装在集装箱中PostgreSQL 将副本转移至此库外的加密存储器
结结. 单独保存`server.env`,"编译"版本和"凯迪"卷.
备份中包含敏感的账户元数据,尽管
存储的内容是加密的. 档案清单不能取代审判恢复。

为进行校验,请创建一个** 单独的空数据库**,不连接到工作客户端.
如果名称已经取下,下列命令将停止; 重复测试
选择不同名称并在两支球队中使用 :

```sh
cc_compose exec -T postgres createdb -U postgres -O consolecrypt consolecrypt_restore_check &&
  cc_compose exec -T postgres pg_restore -U postgres --role=consolecrypt \
    -d consolecrypt_restore_check --exit-on-error --no-owner --no-acl < "$CC_BACKUP_FILE"
```

比较表格、迁移、记录数量和`sharing_instance.instance_id`
然后检查在孤立的环境中用复制件运行同一图像.
为全面灾后恢复,关闭、解除客户接入
空 PostgreSQL有保存的设置, 将整个数据库恢复到
启动API并检查出来. 在恢复个人储存和**do**之后
以恢复的基数返回客户端访问 :

```sh
cc_compose run --rm --no-deps server admin rotate-epoch --all
```

这不能取代恢复对共同要素的信任:分享
检查站。 从数据库的完整副本中保存服务器的 UUID 实例 。
详情见下文第7节。

### 更新和核实示例

首先,做和检查备份。 保存上一个 Compose文件 。
`server.env`和上一个数值`CC_SERVER_VERSION`. 念诵.
[примечания к выпуску](https://github.com/evsikovas/consolecrypt-server/releases) (中文(简体) ).
新的迁移, 旗帜和默认值 。 更新样本来源
`git pull`在克隆目录中,然后在私密目录中更改`server.env`
`CC_SERVER_VERSION`到新版本(或`CC_SERVER_IMAGE`到其文摘).
行`CC_SOURCE_CODE_URL`,如果被前几个版本的生成器记录,删除:
图像本身传达其来源. 然后说:

```sh
cc_compose config --quiet
cc_compose pull server
cc_compose up -d --wait --wait-timeout 180 server
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta"
```

将您的设置( 企业入帐、 限额、一般笔记等) 保留在
`compose.yaml`来自来源,私下`compose.override.yaml`靠近
`server.env` (中文(简体) ). 明文`-f` 禁用自动搜索覆盖文件 。
用第二个`-f`连接到函数`cc_compose`:

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
    --profile https "$@"
}
```

覆盖文件中的路径是绝对的: 编译路径
从第一个文件的目录中计数,即源代码。

不更改密码、工程名称或现有音量。 检查SMTP和
同步两个设备. 移入图像中; 图像回移
**不滚动电路。 对于一个预测试的兼容回滚,你可以
`CC_RUN_MIGRATIONS=false`,但这并不能证明兼容性
带有新电路的二进制文件 。 不要用简单的标记更改来改变主机PostgreSQL.
图像PostgreSQL和凯迪由主修`16-alpine`,`2-alpine`固定.
并计划有备份和核查的单独更新。

开发者或操作者可以在单独的示例上重复烟雾测试.
一辆配有Docker的汽车. 它只创造了一个独特的时间编译项目.
使用随机回转端口,只删除其容器和体积.

```sh
export CC_SERVER_VERSION=0.2.8   # версия примера (server/deploy/docker/.env.example)
docker pull "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION"
docker pull postgres:16-alpine
docker pull caddy:2-alpine
python3 server/deploy/docker/verify.py
```

要验证另一个图像(例如, 本地采集) 传输
`--image <образ> --server-version <версия>` (中文(简体) ).

测试检查API,HTTPS使用临时本地CA(不使检查失效).
证书),PostgreSQL角色,备份/恢复以及`down/up`之后的安全.
它不验证您的 DNS 、您的 ACME 公证书的签发或您的交付
SMTP-mail –这些检查必须针对您的安装进行。

## Kubernetes:赫尔姆语.

## 1. 准备环境和版本

要求Kubernetes1.25或以后,`kubectl`,Helm 3或4,Python 3,
域名,包含在入侵控制器上的DNS记录和有效证书HTTPS。
为Traefik设计并已经配置的证书管理器示例
`ClusterIssuer/letsencrypt` (中文(简体) ). 图表没有安装这些组件 。

从`main`获得一张图表. 它的`appVersion`是当前服务器的发布, aka 标签
默认图像;图表本身的版本独立于服务器版本.
收集的图像为`linux/amd64`和`linux/arm64`,基数为PostgreSQL16.

```sh
git clone --branch main --single-branch https://github.com/evsikovas/consolecrypt-server.git
cd consolecrypt-server
helm show chart server/helm/consolecrypt-server
export CC_SERVER_VERSION=0.2.8   # = appVersion из вывода выше
```

为可复制安装,安全性`image.digest`为`server-image.json`
GitHub本版本的发布(见下文的值);摘要优先于标记.
参数目录:[values.yaml](https://github.com/evsikovas/consolecrypt-server/blob/main/server/helm/consolecrypt-server/values.yaml).

图像可以通过Docker命令进行预检:

```sh
docker pull "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION"
docker run --rm --network none "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION" --version
```

该寄存器还有`server/docker-compose.yml`:这是本地寄存器的选项.
开发,重新组装源材料,PostgreSQL,并给文件写信。
它的默认设置不是现成安装HTTPS和SMTP.
为安装现成图像,请使用Docker-以上部分或全部分。
穿过赫尔姆的路已经下来了.

## 2. 选择集群和私有目录

单独开设巴什终端. 指定您的 kube配置和上下文 :

```sh
set -euo pipefail
export CC_KUBECONFIG="$HOME/.kube/selfhost.yaml"
kubectl --kubeconfig "$CC_KUBECONFIG" config get-contexts
export CC_KUBE_CONTEXT="my-cluster"
export CC_INSTALL_DIR="$HOME/.config/consolecrypt-server"
export CC_API_ORIGIN="https://sync.example.org"
umask 077
mkdir -p "$CC_INSTALL_DIR"
chmod 700 "$CC_INSTALL_DIR"

cc_kubectl() {
  kubectl --kubeconfig "$CC_KUBECONFIG" --context "$CC_KUBE_CONTEXT" \
    --namespace consolecrypt "$@"
}
cc_helm() {
  helm --kubeconfig "$CC_KUBECONFIG" --kube-context "$CC_KUBE_CONTEXT" \
    --namespace consolecrypt "$@"
}

cc_kubectl get nodes
cc_kubectl create namespace consolecrypt --dry-run=client -o yaml | cc_kubectl apply -f -
```

检查是否显示想要的集群的节点 。 密码和 kubeconfig 不应该
进入Git,团队参数,CI日志,或Helm值. Kubernetes 秘诀
它们还要求限制集群备份的进入和保护。

## 3. PostgreSQL和秘诀

主要选项是单独PostgreSQL16,由您,提供者或客户管理.
运营商PostgreSQL . 创建一个数据库`consolecrypt`和一个个人用户。
他拥有这个数据库,可以创建表格并进行迁移.
应用程序不需要超级用户. 允许从服务器舱连接 。

对于外部数据库,使用带有证书验证的TLS. URL如下:

```text
postgresql://consolecrypt:URL_ENCODED_PASSWORD@db.example.org:5432/consolecrypt?sslmode=verify-full
```

URL中的特殊密码字符需要%-encode. 如果基数使用
自己的 CA, 证书挂载在服务器吊舱中并指定
`sslrootcert`带有容器内路径;不关闭证书检查.

准备SMTP密码和完整的数据库URL. 以下代码要求值
不在屏幕上显示,不翻译行则保存它们。 他不会的
覆盖已有文件 :

```sh
python3 - <<'PY'
import getpass
import os
from pathlib import Path

directory = Path(os.environ['CC_INSTALL_DIR'])
for name, prompt in [('database-url', 'Полный URL PostgreSQL: '),
                     ('smtp-password', 'Пароль SMTP: ')]:
    value = getpass.getpass(prompt)
    if not value or '\n' in value or '\r' in value:
        raise SystemExit('Требуется одно непустое значение')
    with (directory / name).open('x', encoding='utf-8') as handle:
        handle.write(value)
    (directory / name).chmod(0o600)
PY

cc_kubectl create secret generic consolecrypt-database \
  --from-file=database-url="$CC_INSTALL_DIR/database-url"
cc_kubectl create secret generic consolecrypt-smtp \
  --from-file=smtp-password="$CC_INSTALL_DIR/smtp-password"
```

这些是最初的创建命令. 如果秘密已经存在,请使用它们.
他们的名字和键值, 并通过您的密件管理器更新 。
在未商定更改的情况下,不要为已有数据库创建新的密码。
密码本身PostgreSQL 。

### 内建PostgreSQL 用于一个小服务器

而非外部基,图表可以创建一个PostgreSQL具有恒量的吊舱.
这是一个没有复制和自动备份的安装. 我们需要一个工人。
存储级:失去单盘意味着失去一个没有外部副本的基数.

对于**新**安装,只准备文件`smtp-password`,并做:

```sh
kubectl --kubeconfig "$CC_KUBECONFIG" config use-context "$CC_KUBE_CONTEXT"
python3 server/deploy/bootstrap-secrets.py \
  --kubeconfig "$CC_KUBECONFIG" \
  --smtp-password-file "$CC_INSTALL_DIR/smtp-password"
```

此帮助使用当前 kubeconfig 的上下文 。 他创造了它。
`consolecrypt-database`带有密钥`password`,保存现有的DB Secret,
它创建或更新`consolecrypt-smtp`. 外部基地完成URL
他没有成功。 不要将两者混为一谈:秘密有不同的密钥。

在数值中,将区块`database`和`postgresql`改为:

```yaml
database:
  existingSecret: ""
postgresql:
  enabled: true
  auth:
    database: consolecrypt
    username: consolecrypt
    existingSecret: consolecrypt-database
    existingSecretPasswordKey: password
  persistence:
    enabled: true
    size: 8Gi
    storageClass: "" # StorageClass по умолчанию в вашем кластере
```

## 4. 设立赫尔姆、SMTP和HTTPS

通过替换域将以下示例保存为`$CC_INSTALL_DIR/values.yaml`.
SMTP-login,以及必要时的入侵类和发行者:

```yaml
fullnameOverride: consolecrypt
replicaCount: 1
image:
  repository: ghcr.io/evsikovas/consolecrypt-server
  # Пусто: тег = appVersion chart (текущий выпуск). Для воспроизводимости:
  # digest: sha256:<digest из server-image.json этого выпуска>
  digest: ""
  pullPolicy: IfNotPresent

database:
  existingSecret: consolecrypt-database
  existingSecretKey: database-url
postgresql:
  enabled: false

config:
  publicUrl: ""
  registrationOpen: true
  requireEmailVerification: true
  requireRequestProof: true
  eventBus: postgres
  trustProxyHeaders: "true"
  objectSharingEnabled: false
  sharedGroupsEnabled: false
  sharedSecretsEnabled: false
  sharedKubeContextsEnabled: false
  sharedDbConnectionsEnabled: false
  sharedNotesEnabled: false
  sharingOwnerOnlineEnrollmentEnabled: false
  deviceProtection:
    enabled: false
  rateLimit:
    mode: observe          # через неделю наблюдения — enforce
  quotas:
    maxDevicesPerAccount: 20
    maxVaultObjects: 100000

mail:
  transport: smtp
  from: "ConsoleCrypt <no-reply@example.org>"
  smtp:
    host: smtp.example.org
    port: 587
    tls: starttls
    username: mailer@example.org
    existingSecret: consolecrypt-smtp
    existingSecretPasswordKey: smtp-password

migrations:
  runAtStartup: true
  job:
    enabled: false

ingress:
  enabled: true
  className: traefik
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls: "true"
  hosts:
    - host: sync.example.org
      paths:
        - {path: /v1, pathType: Prefix}
        - {path: /healthz, pathType: Exact}
        - {path: /readyz, pathType: Exact}
  tls:
    - secretName: consolecrypt-tls
      hosts: [sync.example.org]
```

`publicUrl`这里是故意空的: 邮政确认使用代码,
进一步行动说明如下。 这个领域没有给你一个试镜地址。
或需要输入客户端的地址。

SMTP必须允许发送者选择的地址. 对于第465端口,请问
`tls: tls`;用于587–`tls: starttls`. 检查发件人的 DNS 设置
并访问 SMTP 服务器。 保持模式`file`用于本地测试.

入侵必须传送 WebSocket`/v1/events/ws` 并允许查询机构
保存请求的路径、查询和正文不变:
它们包括在装置的签字中。 `trustProxyHeaders: "true"`
在API是一个可信赖的代理,正确形成`X-Forwarded-For`.
API端口的直接通道关闭. 9090 度量衡只能在里面使用.
这个端口不包含在入侵中.

如果TLS Secret以不同的方式发布,则删除证书管理抽象.
并指定已有的机密。 如果登记处已关闭,请创建命名空间。
`imagePullSecret`,包含只读权利,并在值中加入`imagePullSecrets`.
用于恒舱发射的短寿命CI任务符不合适.

## 5. 安装服务器

首先,检查数值和由此产生的资源:

```sh
chmod 600 "$CC_INSTALL_DIR/values.yaml"
helm lint server/helm/consolecrypt-server -f "$CC_INSTALL_DIR/values.yaml"
helm template consolecrypt server/helm/consolecrypt-server \
  --namespace consolecrypt -f "$CC_INSTALL_DIR/values.yaml" \
  > "$CC_INSTALL_DIR/rendered.yaml"
```

请检查date、域名、 secrets names,如果选中的话,请检查是否有永久音量 。
内置基地。 在这些版本中,密码取自现有的密文.
并且不记录在赫尔姆值或生成的宣言中。

```sh
cc_helm upgrade --install consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
cc_kubectl rollout status deployment/consolecrypt --timeout=180s
cc_kubectl get pods,service,ingress
```

服务器将连接到数据库, 应用内置迁移并开始接收
HTTP - 内陆港请求8080. TLS结束于入侵。
在不同参数中包括了发生错误时自动回滚:
[Helm 3](https://github.com/helm/helm-www/blob/main/versioned_docs/version-3/helm/helm_upgrade.md) (中文(简体) ).
`--atomic`, [Helm 4](https://helm.sh/docs/helm/helm_upgrade/) (中文(简体) ).
`--rollback-on-failure` (中文(简体) ). 更新时使用它 。
只有在检查上一个版本与新基准方案的兼容性之后;
移徙并不能消除这种倒退。

## 6. 检查可用性并连接客户

```sh
curl --fail --silent --show-error "$CC_API_ORIGIN/healthz"
curl --fail --silent --show-error "$CC_API_ORIGIN/readyz"
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
```

预期(HTTP 200),答复`ok`,`ready`和JSON与`server_version`等于
`appVersion`图(或固定文摘版本),`protocol_version`
释放和`source_code_url`源组装。 检查准备情况
连接到数据库; 成功的答复尚未确认邮件的发送或
同步化. 不要使用`curl -k`:客户需要信任的证书.

在ConsoleCrypt中创建了带有服务器的剖面图`https://sync.example.org`.
** 编号`/v1`和登记。 如果需要电子邮件确认,
等待电子邮件确认其代码,然后重复登录或设置.
简介. 该账户在选中的服务器上有效 。

当前桌面客户端可能请求密码重置电子邮件,但有些
尚未提供其中邮政编码的输入形式。 在他们出现之前。
电子邮件确认和重置完成是通过API完成的. 下一页
脚本请求代码和新密码而不显示,也不存储.
只有脚本代码本身被写入文件 :

```sh
cat > "$CC_INSTALL_DIR/account-code.py" <<'PY'
import getpass
import json
import os
import urllib.error
import urllib.parse
import urllib.request

origin = os.environ['CC_API_ORIGIN'].rstrip('/')
url = urllib.parse.urlsplit(origin)
if url.scheme != 'https' or not url.netloc or url.path or url.query or url.fragment or url.username:
    raise SystemExit('CC_API_ORIGIN должен быть базовым HTTPS-адресом вашего сервера')
action = input('Действие: verify (email) или reset (пароль): ').strip()
if action not in ('verify', 'reset'):
    raise SystemExit('Неизвестное действие')
body = {'token': getpass.getpass('Код из соответствующего письма: ')}
path = '/v1/auth/email/verify'
if action == 'reset':
    password = getpass.getpass('Новый пароль учётной записи (не менее 12 символов): ')
    if len(password) < 12 or password != getpass.getpass('Повторите новый пароль: '):
        raise SystemExit('Пароль слишком короткий или значения не совпадают')
    body['new_password'] = password
    path = '/v1/auth/password/reset'
request = urllib.request.Request(origin + path, data=json.dumps(body).encode(),
    headers={'Content-Type': 'application/json', 'x-cc-protocol-version': '1.5'}, method='POST')
try:
    with urllib.request.urlopen(request, timeout=30) as response:
        print('Готово' if response.status == 204 else 'HTTP ' + str(response.status))
except urllib.error.HTTPError as error:
    raise SystemExit('Операция отклонена: HTTP ' + str(error.code)) from None
PY
chmod 600 "$CC_INSTALL_DIR/account-code.py"
python3 "$CC_INSTALL_DIR/account-code.py"
```

确认代码和密码重置代码是不同的一次性代码. 倾销
账户密码终止其会话,而不解密存储.
对于没有SMTP的私人安装,可以选择`mail.transport: disabled`.
管理员确认命令地址`admin verify-email` 仅于
对地址拥有者的独立核查:

```sh
cc_kubectl exec deployment/consolecrypt -- \
  /usr/local/bin/consolecrypt-server admin verify-email --email user@example.org
```

登录后,请检查完整循环 : 创建没有真实的测试主机 。
连接第二个设备, 检查这两个设备上的信任代码
予以批准,并确保修改同步进行.
检查是否也收到 SMTP 信件 。 创建必要的账户后
您可以通过`config.registrationOpen: false`关闭注册并重复注册。
`cc_helm upgrade` 带有完整私有值文件.

实例中的所有共享选项都关闭 。
包含这些内容是管理员在检查兼容性后单独作出的决定
客户。 对于它们的设备的正常同步,它们并不必要.

### 可选: 启用共享访问

如果您决定允许在您的服务器上共享,首先
检查兼容的客户,电子邮件确认, 以及设备信任 。
在您私有值文件的现有块`config` 中, 更改 :

```yaml
config:
  requireRequestProof: true
  objectSharingEnabled: true
  sharedGroupsEnabled: true
  sharedSecretsEnabled: true
  sharedKubeContextsEnabled: true
  sharedDbConnectionsEnabled: true
  sharedNotesEnabled: true
  sharingOwnerOnlineEnrollmentEnabled: true
```

`objectSharingEnabled`包括主要机制;其他旗帜分开
允许共享团体、个人秘密、连接Kubernetes和数据库,
普通笔记和添加新收件者自己的设备
拥有者。 扩展需要主
函数和强制性请求签名。 仅包括必要的机会;
不用此片断替换整个值文件 。

[SHARING.md](SHARING.md)中说明了对权利的限制、守则的核实和撤销。
使用完整更新的文件 :

```sh
cc_helm upgrade consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
```

检查双方试验元素的准备状态和交换情况.
已核实的账户。 获得授权的客户可得到的机会
`/v1/shares/capabilities`; 1`/v1/meta`不足以进行这样的检查。

## 7. 备份和恢复

所有恒定服务器数据都在PostgreSQL... 经常做.
[pg_dump](https://www.postgresql.org/docs/16/app-pgdump.html)和保留
在基地节点外加密副本. 分别救护.
私人环境与秘密。 该副本包含敏感的元数据.
账户,尽管对存储内容进行了加密。

对于外部数据库,使用工具PostgreSQL 16,连接文件
`$CC_INSTALL_DIR/pg_service.conf` 带一节`[consolecrypt]` 和密码文件
`$CC_INSTALL_DIR/pgpass`,拥有0600权利. 在服务文件中,请指定`host`,`port`.
`dbname`,`user`,`sslmode=verify-full`,必要时`sslrootcert`.
密码保存在pgpass中,而不是在团队的论据中.
文件中所述格式[service-файла](https://www.postgresql.org/docs/16/libpq-pgservice.html)
和 [файла паролей](https://www.postgresql.org/docs/16/libpq-pgpass.html) (中文(简体) ).

```sh
export PGSERVICEFILE="$CC_INSTALL_DIR/pg_service.conf"
export PGPASSFILE="$CC_INSTALL_DIR/pgpass"
chmod 600 "$PGSERVICEFILE" "$PGPASSFILE"
CC_BACKUP_FILE="$CC_INSTALL_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_dump --dbname='service=consolecrypt' --format=custom --no-owner --no-acl \
  --file="$CC_BACKUP_FILE"
pg_restore --list "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

对于内置数据库,而不是工作计算机上的`pg_dump`,做:

```sh
CC_BACKUP_FILE="$CC_INSTALL_DIR/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"
cc_kubectl exec statefulset/consolecrypt-postgresql -- \
  pg_dump -U consolecrypt -d consolecrypt --format=custom --no-owner --no-acl \
  > "$CC_BACKUP_FILE"
pg_restore --list "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"
```

检查归档列表不能替代恢复 。 定期创建
** 分离空的核查数据库**,有单独的用户和服务记录
`consolecrypt-restore-check`,然后执行:

```sh
pg_restore --dbname='service=consolecrypt-restore-check' \
  --exit-on-error --no-owner --no-acl "$CC_BACKUP_FILE"
```

比较表格、迁移、记录数量和运行同一服务器版本
在一个孤立的环境中。 不将校验副本连接到工作客户端 。
为了从事故中恢复过来首先接近客户 恢复
完整数据库和保存设置,将服务器连接到恢复的数据库。
在返回客户访问之前,请 :

```sh
cc_kubectl exec deployment/consolecrypt -- \
  /usr/local/bin/consolecrypt-server admin rotate-epoch --all
```

它正在改变个人存储的时代,以确保顾客找到拉回. 事故发生前
采用共享访问,同时考虑到其单个控制点:
`rotate-epoch`不重置共同要素的信任,也不取代其程序.
康复。 康复。 数据库的完整副本必须存储服务器实例的 UUID 。

## 8. 更新

1. 保存上一个图表、值和版本(或摘要);制作副本
   PostgreSQL),并检查恢复的可能性.
2. 研究发行笔记,新版本迁移,和回滚兼容.
   更新源图`git pull`:它的`appVersion`—新版本
   服务器。 如果您已经固定`image.digest`,请用新的摘要代替 。
   `sourceCodeUrl`留空(修改后的组装除外).
3. 执行`helm lint`和`helm template`,并附有完整的私人值文件.
   不更改 DB 秘密、 基准名称、 释放名称或已有的 PVC 。
4. 运行相同的命令`cc_helm upgrade --install`,然后检查.
   `/readyz`,`/v1/meta`,SMTP和两个设备的同步.

迁移被构建为二进制文件,并在初始时执行. 已执行的 SQL文件
他们不编辑。 Helm回滚会改变应用资源,但**没有回滚基础**.
旧的 SQLx二进制文件如果有新文件可用,则可能拒绝运行
移徙。 对于一个预先验证的兼容图像,回滚设定
`migrations.runAtStartup: false`和`migrations.job.enabled: false` ; 本身
无效迁移不能证明与方案兼容 。

不要运行`helm uninstall` ,不要删除 PVC 或 机密 。
并且不通过简单地替换标记来将PostgreSQL16改为另一个主. 移动主
PostgreSQL需要单独的数据传输计划.

所有发射参数:[CONFIGURATION.md](CONFIGURATION.md)(环境文件实例-
[server/.env.example](https://github.com/evsikovas/consolecrypt-server/blob/main/server/.env.example) (中文(简体) ).

### 一般连接Kubernetes

`CC_SHARED_KUBE_CONTEXTS_ENABLED=true` 允许交换加密
打开`CC_OBJECT_SHARING_ENABLED`客户端时的连接Kubernetes
签到`/v1/shares/capabilities`的请求中的支票`supports_kube_contexts`
并在阅读清单时明确要求`include_kube_contexts=true`。 老客户。
它们继续接收前几类物体. 服务器验证签名、 权利
设备和版本; 集群地址、 证书和证书的地址
在加密内容中。 服务器不读kubeconfig,也不连接到API.
Kubernetes (中文(简体) ). 阻断旗帜隐藏常见对象,保存其密码文字.

### 共享数据库连接

从服务器0.1.15(Protocol 1.6)开始,一个单独的旗帜
`CC_SHARED_DB_CONNECTIONS_ENABLED=true` 允许交换加密
连接到数据库。 Helm在`config.sharedDbConnectionsEnabled`中被使用.
基本`CC_OBJECT_SHARING_ENABLED`和严格核查请求签名
这是强制性的。 宣布可能性为`supports_db_connections`;
клиент с явным `include_db_connections=true` получает новый тип `db_connection`
公开榜. 年长的顾客不会得到他们不知道的类型.

服务器存储不透明的密码文本和检查签名,参与者的构成.
审计。 它没有连接到 PostgreSQL, MySQL, ClickHouse, Redis 或 MongoDB.
用户,并且不遵从对用户的要求。 关上旗子就隐藏了常识
在不删除其加密内容的情况下连接 。 服务器存储格式
它没有改变;这种扩大不需要基地移徙。

### 一般说明

从服务器0.2.0(protocol 1.9)开始,旗帜`CC_SHARED_NOTES_ENABLED=true`
(helm - `config.sharedNotesEnabled`)允许
共同对象的参与者(主机、数据库、上下文Kubernetes)
给他的笔记。 要求`CC_OBJECT_SHARING_ENABLED`和严格核查签字
(a)在`/v1/shares/capabilities`中宣布为`supports_notes_v1`......。

服务器只存储加密 。 每个进入时代的关键音符都创造了
车主的装置,将其包裹在参与者的装置和标志上;
每张纸条由作者的装置签名。 服务器检查会员,
著作权,时代和签名. 所有参与者都能写作,只有他们自己才能治理.
注释,删除 - 作者或所有者. 限制:每个对象500个音符,最高288个基B
密码 需要迁移`0010_share_notes`;关闭旗帜
它隐藏笔记而不删除.

### 防止从新设备进入

从服务器0.1.16(protocol 1.7)开始,旗帜`CC_DEVICE_PROTECTION_ENABLED=true`
(在赫尔姆—`config.deviceProtection.enabled`)保护账户不受那些已经学习过的人的伤害.
只有账户密码或访问邮件 :

- 每个新设备的主人都会收到一封有“不是我”链接的信。
  `CC_PUBLIC_URL/account#action=deny-device&token=…`;该页面服务于您
  使用`CC_WEB_ACCOUNT=true`的站点或服务器本身,以及可信任的设备
  活动`device_registered`. 连线是一次性的, 生活7天, 并且只回顾
  这个装置,直到它打开了存储器;
- 首日新设备( `CC_DEVICE_QUARANTINE_DAYS`天)( 默认 14 天)
  无法召回可信任的设备`403 device_in_quarantine`,
  “ 退出所有会话” 并更改密码不会结束信任的会话
  设备。 从禁闭外的可信设备中批准移除禁闭
  前; 以存储密码解锁存储不是 。 一个装置
  (a) 注册账户,不划入隔离区;
- 披露(密码/回收信封)
  未经确认的装置限于每小时5个,每个账户每天20个,每小时3个
  在设备`CC_ENVELOPE_LIMIT_ACCOUNT_PER_HOUR`,
  `CC_ENVELOPE_LIMIT_ACCOUNT_PER_DAY`, `CC_ENVELOPE_LIMIT_DEVICE_PER_HOUR`, 0–
  (无限制)。 柜台储存在PostgreSQL中,对所有人一视同仁。
  备注。 在1小时内向同一设备重新发出相同的存储器
  不计其数. 超过-`429 envelope_rate_limited`和每日一信;
- 重置您的账户密码, 提醒从未打开过的设备
  存储,以及所有其他待处理的邮件重置和确认代码。

`CC_NEW_DEVICE_MAIL_ENABLED`(默认`true`) 单独禁用关于
新设备`CC_NEW_DEVICE_MAIL_PER_HOUR`(10)限制其每小时数量:
这个时间的剩余入口缩短为1个字母. 申报的机会
`/v1/meta`作为`capabilities.device_protection`;协议客户1.6及以上
他们继续工作,并表现出新的错误,作为常见的错误。

更新服务器( 迁移( `0008` 添加) )
`devices.first_trusted_at`,并填充现有信封.
处理`#action=deny-device`的账户页面,然后安装
旗帜和重新设计服务`server`. 没有SMTP, “这不是我” 链接就不会发送 。
其余的防御工作正常进行.

### 企业模式: 输入 IDP 或活动目录

从服务器0.2.0(protocol 1.9)开始`CC_AUTH_MODE=enterprise`(在Helm -)
块`auth:` 仅通过公司来源将服务器转入输入
账号:IDC的IDP(Entra ID,AD FS,Keycloak,Google工作空间,Okta等)
任意 OIDC)或活动目录/LDAP. 登记、登录和密码重置
账户关闭,现有账户在第一个登录时链接。
IDP/AD中已停用的员工失去同步功能
`CC_AUTH_RECHECK_MINUTES` (中文(简体) ). 存储加密不会改变: IDP 或 AD, 或
服务器没有收到任何可以打开数据的信息 。 默认模式
`standard`,服务器的行为也和以前一样.

设置、Entra ID的食谱、AD FS 2016+、Keycloak、Google工作空间、Okta和
LDAPS 的 AD, 紧急访问命令和 AD 账户保护, 防止屏蔽 - in
[ENTERPRISE.md](ENTERPRISE.md) (中文(简体) ).

### 队伍.

从服务器0.2.1(protocol 1.10)开始,账户可以维护**共享存储.
命令**`CC_TEAMS_ENABLED`,默认为;在`/v1/meta`中声明
作为`capabilities.teams`. 参与者通过信封接收存储密钥.
密封在团队成员的密钥上; 服务器不解密任何内容 。
团队组成 - 与散列链一起签名的日志:服务器检查命令,
签名和作者的权利,顾客自己检查整个日记.

- 角色:拥有者,管理员,编辑者,观察者. 观察者不能
  发送更改`403`,`details.reason = "team_role"`
- 通过邮件邀请:答案总是`202`(服务器不披露是否有回复).
  账户),每组不超过每小时20个,期限为7天. 来宾检查密码
  与请者参会者. 没有SMTP,被邀请者会在申请中看到邀请.
- 删除参与者会取消其访问权限,并要求更改存储密钥.
- 限额:`CC_MAX_TEAMS_PER_ACCOUNT`(每个账户50项命令)
  (`CC_MAX_TEAM_MEMBERS`人)(200人参加)。 在赫尔姆语中,这些密钥通过
  `extraEnv` (中文(简体) ).
- 它在两种输入模式中都有效. 需要移徙(`0012_teams`人);老客户
  `/v1/vaults`只提供个人金库.

要关闭命令,请询问`CC_TEAMS_ENABLED=false`(在Docker –在
`server.env`,在赫尔姆—`extraEnv`:路线`/v1/teams/*`将响应`404`.
团队数据将予保存。

### 请求的配额和限制

从服务器0.2.2(protocol 1.11)开始,一个账户或设备不能
Exhaust服务器资源:基线,位置,CPU,邮件或其他限制.

QQ配额** `CC_QUOTAS_V2_ENABLED`, 默认值 `true` ; `false` 返回
行为0.2.1:

| 密钥 | 以默认. | 超过时的反应 |
|---|---|---|
| `CC_MAX_VAULT_BYTES` (中文(简体) ). | 1个吉布 | `413`, `details.reason = "vault_quota"`: 密码文字加墓志铭. |
| `CC_TOMBSTONE_COST_BYTES` (中文(简体) ). | 256 | 这么多字节配额 值得每个墓碑(远方对象) |
| `CC_MAX_VAULT_OBJECTS` (中文(简体) ). | 100 000 | `413`, `details.reason = "object_limit"`:活体文物和墓志铭. |
| `CC_MAX_DEVICES_PER_ACCOUNT` (中文(简体) ). | 20(不超过64个) | 从新设备输入 - `403`, `details.reason = "device_limit"` |
| `CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY` (中文(简体) ). | 10(0 - 不受限制) | `403`, `details.reason = "device_daily_limit"`, `details.until` (中文(简体) ). |

清除活物总是被接受,甚至超过配额。 物体移走,
从未在服务器上出现过的一个已经不再创建墓碑. 限量
无撤销装置被认为是装置:在另一个装置上召回未使用的装置.
便入并进. 已知设备照常列入。
迁移`0013_quotas_limits` 计算文物和墓碑数量一次
每个储存设施(在更大的基地上,启动可能需要时间)。

** 请求限制** 存放在PostgreSQL(桶、基期)和相同之处。
他们的工作是任何数量的复制品。 超过 - `429 rate_limited`
标题`Retry-After`和`details.limit`;客户端稍后重复请求.
阅读(pull, lists)只受到每个复制品的内存的慷慨限制.
(`CC_RATE_LIMIT_READ_PER_DEVICE_PER_MINUTE`, 1200) (中文(简体) ).

`CC_RATE_LIMIT_MODE` (中文(简体) ).

- `observe` (违约至0.2.2) - 请求不被驳回,仅超过
  在衡量尺度`cc_rate_limit_observed_total{limiter}`和审计日记账中考虑。
  `limit_exceeded`,每个账户和限额不超过每小时一次;
- `enforce` - 过度偏离`429`.

包含顺序: 更新服务器, 一周观察 。
`cc_rate_limit_observed_total` 必要时提高阈值.
问`enforce`. 进入和回收的限制在两种模式中都有。
`CC_RATE_LIMIT_ENABLED=false` 关闭所有查询限制,但不是配额。

每个限制都配有密钥`CC_LIMIT_<ИМЯ>_RATE``N`
时限或`N/min`,`N/hour`,`N/day`,`0`-无限制),
`_BURST`(容量,默认期间),`_PER_HOUR`和`_PER_DAY`
(额外上限). 例如,`CC_LIMIT_PUSH_ACCOUNT_RATE=600/min`. 在赫尔姆
`config.rateLimit.limits: {push_account: {rate: "600/min", burst: 600}}` (中文(简体) ).

| 名称. | 何谓有限? | 以默认. |
|---|---|---|
| `push_device` (中文(简体) ). | 向设备发送更改 | 120分/分钟,高峰60分 |
| `push_account` (中文(简体) ). | 向您的账户提交更改 | 300分/分钟 |
| `mutations_account` (中文(简体) ). | 发送的更改次数,输入账户 | 每小时50 000美元 |
| `unknown_delete_account` (中文(简体) ). | 删除未在服务器上的对象 | 1 000/天(单位:千美元) |
| `share_write_account` (中文(简体) ). | 创建共同对象 | 60小时,20度 |
| `share_revision_account` (中文(简体) ). | 对共同设施的审计、出入权的改变、一般说明 | 600小时 |
| `recipient_lookup_account` (中文(简体) ). | 邮件查找 | 30分钟和300天 |
| `enrollment_account` (中文(简体) ). | 添加收件人自己的设备 | 30小时/小时 |
| `trust_request_device`/`trust_request_account` (中文(简体) ). | 可信赖性 | 每个设备10小时,每个账户30天 |
| `verification_account` (中文(简体) ). | 密钥调节: 批准设备的宣布, 签名的存储密钥打印 | 20小时/小时 |
| `account_security` (中文(简体) ). | 更改密码、重新印发回收包、更换信封 | 10小时/小时 |
| `ws_connect_account` (中文(简体) ). | 新建 WebSocket 连接 | 60/min(60岁) |
| `auth_ip` (中文(简体) ). | 单一地址的公开入境、登记和恢复请求 | 30分钟/分钟 |
| `login_email` (中文(简体) ). | **未成功** 同一网络的邮政投入(24IPv4,64IPv6) | 10/min和50/小时 |
| `login_email_total` (中文(简体) ). | 未能从所有网络发送邮件 | 200小时 |
| `recovery_email` (中文(简体) ). | 密码重置一个网络的电子邮件请求 | 5小时/小时 |
| `recovery_email_total` (中文(简体) ). | 所有网络的邮寄信件(始终答复`202`) | 20日(每日) (单位:千美元) |

前键`CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE`
`CC_RATE_LIMIT_LOGIN_PER_EMAIL_PER_MINUTE`和 (中文(简体) ).
`CC_RATE_LIMIT_RECOVERY_PER_EMAIL_PER_HOUR`继续问`auth_ip`.
`login_email`和 `recovery_email` (中文(简体) ).

异形尝试不会屏蔽所有者:成功输入不会花掉邮件的限制.
从** 已知设备** 账户登录( 设备的有效签名)
它不仅限于邮件的限度——只限地址的限度. 触发时
`login_email_total` 店主一天收到一封信 "许多失败的尝试"
进入。 密码重置信件, 由所有者在过去90天中登录的网络
也超过了`recovery_email_total`. 账户没有永久封存。

从0.2.8起,取消HTTP请求在取消前不会释放Argon2位.
运行中的计算不会真的结束 。 它保留了这一限制。
连接中断时平行加载 。 对发现/发现/JWKS的答复
OIDC在读溪流时限定为512 KiB,包括没有Content-Length的响应.
如果超过,则拒绝进入。 设置 IDP 时考虑这个限制 。

重新定义一个单独的账户(不重新开始操作, 最迟于
超过30秒 :

```sh
# Docker
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show --email user@example.org
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits set \
  --email user@example.org push_account_rate=600/min max_vault_objects=200000
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits reset --email user@example.org
# Kubernetes
cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin limits show
```

过分定义的关键是带有后缀`_rate`,`_burst`的界限名称.
`_per_hour`,`_per_day`和配额`max_vault_bytes`,`max_vault_objects`,
`max_devices_per_account`, `new_devices_per_account_per_day` (中文(简体) ). 入场限制
您不能覆盖账户 。

度量衡:`cc_rate_limited_total{limiter}`,`cc_rate_limit_observed_total{limiter}`
`cc_rate_bucket_seconds`(检查时间),`cc_quota_rejected_total{reason}`
`cc_sync_unknown_deletes_total`, `cc_tombstones_total`, (中文(简体) ).
`cc_auth_known_device_bypass_total`, `cc_recovery_mail_suppressed_total` (中文(简体) ).

## 如何设置任何参数

参数名称随处可见-变量`CC_*`.
[CONFIGURATION.md](CONFIGURATION.md) (中文(简体) ). 所有安装方法的规则:

- 过程环境变量比JSON文件的值更重要.
  可变表示“未设定”(默认值有效);
- 名称中有一个字型的变量被默默忽略,一个不正确的**值**
  以留言`invalid configuration: <КЛЮЧ>: …`阻止发射;
- 更改仅在进程重新启动后适用(但
  `admin limits set`,见[квоты и лимиты](#квоты-и-лимиты-запросов).
- 企业登录机密 -只有文件`*_FILE`, 数据库密码和 SMTP -通过
  环境或私人JSON文件。

您可以以三种方式检查结果:行`starting`在服务器日志中
包含当前配置( 密码被隐藏); `/v1/meta` 显示
登记、邮件确认、登录模式、命令和设备保护;
`admin limits show`和`admin auth status`显示了限制、配额和进入。

### Docker Compose (中文(简体) ).

编译只将服务块`environment:`的变量传输到服务器.
`server` (中文(简体) ). 文件`server.env`在`compose.yaml``--env-file`中被替换,但本身在
容器不掉落:线条`CC_LIMIT_PUSH_ACCOUNT_RATE=600/min`
`server.env`如果`compose.yaml`不使用它,则不会改变任何东西.

**1. 在`server.env`中变化的密钥。**在`compose.yaml`中,这些密钥被写为:
`${КЛЮЧ:-значение}`: `CC_DATABASE_PASSWORD`, `CC_RUN_MIGRATIONS` (中文(简体) ).
`CC_REGISTRATION_OPEN`, `CC_MAIL_TRANSPORT`, `CC_MAIL_FROM`, `CC_SMTP_HOST` (中文(简体) ).
`CC_SMTP_PORT`, `CC_SMTP_TLS`, `CC_SMTP_USERNAME`, `CC_SMTP_PASSWORD` (中文(简体) ).
`CC_OBJECT_SHARING_ENABLED`, `CC_SHARED_GROUPS_ENABLED`, `CC_SHARED_SECRETS_ENABLED` (中文(简体) ).
`CC_SHARED_KUBE_CONTEXTS_ENABLED`, `CC_SHARED_DB_CONNECTIONS_ENABLED`, (中文(简体) ).
`CC_SHARED_NOTES_ENABLED`, `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED`, (中文(简体) ).
`CC_DEVICE_PROTECTION_ENABLED`, `CC_NEW_DEVICE_MAIL_ENABLED`, (中文(简体) ).
`CC_DEVICE_QUARANTINE_DAYS`, `CC_TEAMS_ENABLED`, `CC_RATE_LIMIT_MODE` (中文(简体) ).
`CC_QUOTAS_V2_ENABLED`, `CC_MAX_DEVICES_PER_ACCOUNT`, `CC_MAX_VAULT_OBJECTS` (中文(简体) ).
除这些`server.env`外,还包含"编译本"本身的变量:`CC_SERVER_VERSION`.
`CC_SERVER_IMAGE`, `CC_DOMAIN`, `CC_HTTP_PORT`, `CC_POSTGRES_ADMIN_PASSWORD` (中文(简体) ).
有符号的值`$`,`#`,空格或引号单写
引证中.

**2. 所有其他密钥都在`compose.override.yaml` 中。**此和未在其中的密钥
`compose.yaml`(限制`CC_LIMIT_*`,`CC_MAX_VAULT_BYTES`,`CC_MAX_TEAM_MEMBERS`)
`CC_AUTH_*`,`CC_OIDC_*`,`CC_LDAP_*`,保存期.),以及那些键
`compose.yaml`严格定义: `CC_DATABASE_URL`, `CC_DATABASE_CONNECT_TIMEOUT_SECS`.
`CC_LISTEN_ADDR`, `CC_METRICS_LISTEN`, `CC_PUBLIC_URL` (中文(简体) ).
`CC_REQUIRE_EMAIL_VERIFICATION`, `CC_REQUIRE_REQUEST_PROOF`, (中文(简体) ).
`CC_TRUST_PROXY_HEADERS`, `CC_EVENT_BUS`, `CC_HSTS`, `CC_LOG_FORMAT` (中文(简体) ). 含义
`environment:` 覆盖文件替换相同的值`compose.yaml`.
文件在`server.env` 旁边的私有目录中; 写下值 。
在引号中:

```yaml
# $CC_INSTALL_DIR/compose.override.yaml
services:
  server:
    environment:
      CC_MAX_VAULT_BYTES: "2147483648"
      CC_LIMIT_PUSH_ACCOUNT_RATE: "600/min"
      CC_LOG: "info,sqlx=warn"
```

连接到第二位`-f`(没有它,来自另一个目录的 Compose文件不读)
并使用此函数用于** all* 命令 - 更新, `admin`, 备份
副本 :

```sh
cc_compose() {
  docker compose --env-file "$CC_INSTALL_DIR/server.env" \
    -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
    --profile https "$@"
}
```

将覆盖文件中的路径写入绝对值 。 您可以添加一个服务和
`env_file: [/абсолютный/путь/extra.env]`,但数值来自`environment:`
`compose.yaml`比`env_file`更重要,所以上面列表中的密钥仍然给出.
c`environment:`. (中文(简体) ).

**3. 密钥文件(只有企业登录密钥`*_FILE` 和 CA 证书)
在`/run/secrets/<имя>`中将无 Swarm Mounts `secrets:` 编为普通文件
拥有者和主办者的权利。 图像中的服务器工作为UID 65532.
读他们:

```sh
sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
```

```yaml
services:
  server:
    environment:
      CC_OIDC_CLIENT_SECRET_FILE: /run/secrets/oidc-client-secret
    secrets: [oidc-client-secret]
secrets:
  oidc-client-secret:
    file: /home/admin/.config/consolecrypt-docker/secrets/oidc-client-secret
```

而不是`secrets:`,安装也适合只读:
`volumes: ["/home/admin/.config/consolecrypt-docker/secrets:/run/secrets/consolecrypt:ro"]` (中文(简体) ).
基础密码和SMTP仍然在`server.env`中:服务器不从文件中读取.

**4. 应用和核实。**

```sh
cc_compose config --quiet
cc_compose up -d --wait --wait-timeout 180 server
cc_compose logs --no-log-prefix server | grep '"starting"' | tail -n 1
curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show
```

`up -d` 只有当容器的配置发生变化时, 才重新创建容器; 数据
各卷保存完好. 别用`down -v`.

### 插头不做曲子就跑

相同的密钥由旗帜`-e КЛЮЧ=значение`或文件`--env-file`传送. 注意:
`docker run --env-file` 字面意思是,** 引文没有删除**,所以
`server.env`,来自`init-config.py`(以引号表示的数值)不适合 -
写入没有引号的值。 密码更方便保存在私人文件JSON中. .
只读挂载 :

```sh
sudo install -d -m 0750 /etc/consolecrypt
sudo install -m 0400 -o 65532 -g 65532 server.json /etc/consolecrypt/server.json
docker run -d --name consolecrypt-server --restart unless-stopped \
  --read-only --cap-drop ALL --security-opt no-new-privileges:true \
  -p 127.0.0.1:8080:8080 \
  -v /etc/consolecrypt/server.json:/etc/consolecrypt/server.json:ro \
  -v /etc/consolecrypt/secrets:/run/secrets/consolecrypt:ro \
  -e CC_TRUST_PROXY_HEADERS=true \
  "ghcr.io/evsikovas/consolecrypt-server:$CC_SERVER_VERSION" \
  --config /etc/consolecrypt/server.json serve
```

`CC_SERVER_VERSION`是一个服务器发布版本(例如Docker Compose).
图像已经设置`CC_LISTEN_ADDR=0.0.0.0:8080`,`CC_METRICS_LISTEN=0.0.0.0:9090`.
`CC_LOG_FORMAT=json`和`CC_SOURCE_CODE_URL`;集装箱环境变量
它比文件JSON更重要,所以用旗帜`-e`更改这四个键,而不是在文件中.
参数变化 - `docker rm -f consolecrypt-server`和相同 `docker run`
(数据在PostgreSQL中),容器不储存它们。 )管理员团队:
*docker execctorcrypt服务器/usr/local/bin/consolecrypt-server--config 互联网档案馆的存檔,存档日期2007-09-21.
/etc/consolecrypt/server.json admin...' (中文(简体) ).

### Kubernetes:赫尔姆语.

图表将值块变为变量`CC_*`:未分类的块变为ConfigMap.
URL基地和SMTP密码 –在秘密或链接`secretKeyRef`到您的秘密.
每个`CC_*`值路径的对应数字在栏"Helm"中给出.
[CONFIGURATION.md](CONFIGURATION.md) (中文(简体) ). 数值中的空行被跳过 -那么
服务器的默认值是有效的 。

| 什麽? | 在价值方面 |
|---|---|
| 旗帜、标志、配额、限制、WebSocket、服务、杂志 | `config.*``config.rateLimit.limits` - `CC_LIMIT_*` (中文(简体) ). |
| 企业进入 | `auth.*`, 秘密 - `auth.oidc.existingSecret`/ `auth.ldap.existingSecret` (英语). |
| 邮资 | `mail.*`,密码 - `mail.smtp.existingSecret` |
| 数据库 | `database.*`或`postgresql.*`,移民`migrations.*` |
| 度数 | `metrics.enabled` `CC_METRICS_LISTEN` (中文(简体) ). |
| 图表`CC_TEAMS_ENABLED`,`CC_MAX_TEAMS_PER_ACCOUNT`,`CC_MAX_TEAM_MEMBERS`,`RUST_LOG`,`OTEL_*`,外部`CC_DATABASE_PASSWORD`中的无路径键 | `extraEnv` (中文(简体) ). |

```yaml
extraEnv:
  - name: CC_MAX_TEAM_MEMBERS
    value: "50"
  - name: CC_DATABASE_PASSWORD          # пароль внешней базы отдельно от URL
    valueFrom:
      secretKeyRef: {name: consolecrypt-database, key: password}
```

来自`extraEnv`(`env`节)容器的变量比配置图更重要
`envFrom`和`extraEnvFrom`在ConfigMap图等之后连接.
其阻滞. 只用于没有自己路径的密钥 。
否则,值值和当前值将有所不同。

应用程序 - `helm upgrade`有** 完整** 私有值文件: rops
他们重新开始是因为配置地图校验和的改变。 之后
修改您已存在的密件的内容, 手动重新启动 :

```sh
cc_helm upgrade consolecrypt server/helm/consolecrypt-server \
  -f "$CC_INSTALL_DIR/values.yaml" --history-max 10 --wait --timeout 10m
cc_kubectl rollout restart deployment/consolecrypt   # только после смены Secret
cc_kubectl get configmap consolecrypt -o yaml        # несекретные CC_* как их видит pod
cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin limits show
```

### JSON -文件,二进制文件和系统d

没有容器,设置更方便在私人文件JSON中存储. .
`--config /etc/consolecrypt/server.json`或变数`CC_CONFIG_FILE`. 档案...
1JSON - 对象,仅以行表示值,权利`0600`或`0400`,所有者 -
服务用户。 未知或重复的密钥,不正确JSON或
一个无法访问的文件停止开始而不输出内容 。 `CC_LOG`
`RUST_LOG`和`OTEL_*`不会被收录到文档中——在服务环境中询问.
示例:[server.example.json](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/server.example.json).
单位文件 - [consolecrypt-server.service](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/consolecrypt-server.service)
细节 - [native/README.md](https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/README.md).

```json
{
  "CC_DATABASE_URL": "postgres://consolecrypt@127.0.0.1:5432/consolecrypt?sslmode=disable",
  "CC_DATABASE_PASSWORD": "<пароль базы>",
  "CC_LISTEN_ADDR": "127.0.0.1:8080",
  "CC_METRICS_LISTEN": "127.0.0.1:9090",
  "CC_TRUST_PROXY_HEADERS": "true",
  "CC_REQUIRE_EMAIL_VERIFICATION": "true",
  "CC_MAIL_TRANSPORT": "smtp",
  "CC_MAIL_FROM": "ConsoleCrypt <no-reply@example.org>",
  "CC_SMTP_HOST": "smtp.example.org",
  "CC_SMTP_USERNAME": "mailer@example.org",
  "CC_SMTP_PASSWORD": "<пароль SMTP>",
  "CC_RATE_LIMIT_MODE": "enforce"
}
```

服务的环境变量被添加到一个滴入文件
`sudo systemctl edit consolecrypt-server`: (中文(简体) ).

```ini
[Service]
Environment=CC_LOG=info,sqlx=warn
```

在编辑文件或环境后:`sudo systemctl restart consolecrypt-server`
然后`sudo-u控制台控制台控制台控制台服务器--config
/etc/溶解/服务器.json健康检查'和
`journalctl -u consolecrypt-server | grep starting | tail -n 1` (中文(简体) ). 密码可用
不存储于JSON文件 :如果在`CC_DATABASE_PASSWORD` 或 URL 中都没有密码 。
驱动程序从服务环境取标准变量`PGPASSWORD`.

### 示例:一般注释和命令

共享注释需要共享主旗; 命令由
这是一种默认,并不取决于它。

Docker Compose -在`server.env`,然后在`cc_compose up -d --wait --wait-timeout 180 server`:

```dotenv
CC_OBJECT_SHARING_ENABLED=true
CC_SHARED_NOTES_ENABLED=true
CC_TEAMS_ENABLED=true
```

团队限制为`compose.override.yaml`:

```yaml
services:
  server:
    environment:
      CC_MAX_TEAMS_PER_ACCOUNT: "20"
      CC_MAX_TEAM_MEMBERS: "50"
```

赫尔姆:

```yaml
config:
  requireRequestProof: true
  objectSharingEnabled: true
  sharedNotesEnabled: true
extraEnv:
  - name: CC_TEAMS_ENABLED
    value: "true"
  - name: CC_MAX_TEAM_MEMBERS
    value: "50"
```

JSON:‘'CC_OBJECT_SHARING_ENABLED':‘真',‘CC_SHARED_NOTES_ENABLED':‘真',‘真',‘真'.
"CC_MAX_TEAM_MEMBERS":"五十". 核查:`/v1/meta`_`capabilities.teams: true`;
客户在`/v1/shares/capabilities``supports_notes_v1`中看到对笔记的支持.

### 示例: Entra ID 企业登录

Entra ID 中的申请注册情况如下:
[ENTERPRISE.md](../ENTERPRISE.md#microsoft-entra-id) (中文(简体) ). 重定向 URI -
`https://sync.example.org/v1/auth/oidc/callback` (中文(简体) ).

Docker Compose (中文(简体) ). 秘诀 :

```sh
mkdir -p "$CC_INSTALL_DIR/secrets"
( umask 077
  openssl rand -hex 32 > "$CC_INSTALL_DIR/secrets/oidc-token-key"
  read -rs CC_SECRET && printf '%s' "$CC_SECRET" > "$CC_INSTALL_DIR/secrets/oidc-client-secret"
  unset CC_SECRET )
sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
```

`$CC_INSTALL_DIR/compose.override.yaml`(替换`/home/admin/.config/consolecrypt-docker`)
他的(`$CC_INSTALL_DIR`号):

```yaml
services:
  server:
    environment:
      CC_PUBLIC_URL: https://sync.example.org
      CC_AUTH_MODE: enterprise
      CC_AUTH_PROVIDER: oidc
      CC_AUTH_DISPLAY_NAME: Example SSO
      CC_AUTH_ALLOWED_DOMAINS: example.org
      CC_OIDC_PRESET: entra
      CC_OIDC_ISSUER: https://login.microsoftonline.com/<tenant-id>/v2.0
      CC_OIDC_CLIENT_ID: <application-client-id>
      CC_OIDC_REQUIRED_CLAIM: roles=ConsoleCrypt.User
      CC_OIDC_CLIENT_SECRET_FILE: /run/secrets/oidc-client-secret
      CC_OIDC_TOKEN_KEY_FILE: /run/secrets/oidc-token-key
    secrets: [oidc-client-secret, oidc-token-key]
secrets:
  oidc-client-secret:
    file: /home/admin/.config/consolecrypt-docker/secrets/oidc-client-secret
  oidc-token-key:
    file: /home/admin/.config/consolecrypt-docker/secrets/oidc-token-key
```

```sh
cc_compose config --quiet
cc_compose up -d --wait --wait-timeout 180 server
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin auth test
```

示例中的凯迪只给出 API: 信件中的链接
`https://sync.example.org/account` 返回404,来自电子邮件的代码在应用程序中工作 。

赫尔姆。 秘密和价值观:

```sh
cc_kubectl create secret generic consolecrypt-oidc \
  --from-file=client-secret="$CC_INSTALL_DIR/secrets/oidc-client-secret" \
  --from-file=token-key="$CC_INSTALL_DIR/secrets/oidc-token-key"
```

```yaml
config:
  publicUrl: https://sync.example.org
auth:
  mode: enterprise
  provider: oidc
  displayName: Example SSO
  allowedDomains: [example.org]
  oidc:
    preset: entra
    issuer: https://login.microsoftonline.com/<tenant-id>/v2.0
    clientId: <application-client-id>
    requiredClaim: roles=ConsoleCrypt.User
    existingSecret: consolecrypt-oidc
```

JSON 或系统化的键与覆盖文件中的键相同,`*_FILE` 表示
属于服务用户的有权利文件`0400`,例如
`/etc/consolecrypt/secrets/oidc-client-secret` (中文(简体) ).

### 示例: 活动目录登录( LDAP)

编制会计和证书 -- -- [ENTERPRISE.md](../ENTERPRISE.md#active-directory-и-ldap).
Docker Compose, `compose.override.yaml` (档案`ldap-bind-password`和`ad-ca.pem`), in.
`$CC_INSTALL_DIR/secrets`,所有者65532,权利`0400`:

```yaml
services:
  server:
    environment:
      CC_AUTH_MODE: enterprise
      CC_AUTH_PROVIDER: ldap
      CC_AUTH_DISPLAY_NAME: ACME
      CC_AUTH_ALLOWED_DOMAINS: acme.com
      CC_LDAP_URL: ldaps://dc1.acme.local:636
      CC_LDAP_CA_FILE: /run/secrets/ad-ca.pem
      CC_LDAP_BIND_DN: CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
      CC_LDAP_BIND_PASSWORD_FILE: /run/secrets/ldap-bind-password
      CC_LDAP_BASE_DN: DC=acme,DC=local
      CC_LDAP_REQUIRED_GROUP: CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
      CC_LDAP_MAX_FAILURES: "3"
      CC_LDAP_FAILURE_WINDOW_MINUTES: "30"
    secrets: [ldap-bind-password, ad-ca.pem]
secrets:
  ldap-bind-password:
    file: /home/admin/.config/consolecrypt-docker/secrets/ldap-bind-password
  ad-ca.pem:
    file: /home/admin/.config/consolecrypt-docker/secrets/ad-ca.pem
```

容器必须允许域控制器的DNS名称;如果Docker使用
在服务`dns:`或`extra_hosts:`中添加另一个DNS. 验证用户不使用
密码 : `cc_ 构成exec - T 服务器 /usr/local/bin/consolecrypt-server 管理员 auth
测试--loginalice@acme.com'.

赫尔姆:

```sh
cc_kubectl create secret generic consolecrypt-ldap \
  --from-file=bind-password="$CC_INSTALL_DIR/secrets/ldap-bind-password" \
  --from-file=ca.pem="$CC_INSTALL_DIR/secrets/ad-ca.pem"
```

```yaml
auth:
  mode: enterprise
  provider: ldap
  displayName: ACME
  allowedDomains: [acme.com]
  ldap:
    url: ldaps://dc1.acme.local:636
    bindDn: CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
    baseDn: DC=acme,DC=local
    requiredGroup: CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
    maxFailures: 3
    failureWindowMinutes: 30
    existingSecret: consolecrypt-ldap
    caKey: ca.pem
```

### 实例:对观察者请求执行的限制

1. 升级到0.2.2一周后,请参见衡量标准。
   `cc_rate_limit_observed_total{limiter}`(端口度量衡;例如Docker)
   关闭— 打开`CC_METRICS_LISTEN` 覆盖文件并公布端口
   仅在`127.0.0.1`或审计事项`limit_exceeded`上进行.
2. 如果普通用户反对限制,例如提高限制.
   `CC_LIMIT_PUSH_ACCOUNT_RATE=600/min`,或重新限定一个账户。
   团队`admin limits set`
3. 切换模式 。

Docker Compose:在(`server.env`年)—(`CC_RATE_LIMIT_MODE=enforce`年),提高了限额—在.
`compose.override.yaml` (中文(简体) ).

```yaml
services:
  server:
    environment:
      CC_METRICS_LISTEN: 0.0.0.0:9090
      CC_LIMIT_PUSH_ACCOUNT_RATE: "600/min"
      CC_LIMIT_PUSH_ACCOUNT_BURST: "600"
      CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_DAY: "100"
    ports:
      - "127.0.0.1:9090:9090"
```

赫尔姆:

```yaml
config:
  rateLimit:
    mode: enforce
    limits:
      push_account: {rate: "600/min", burst: 600}
      recipient_lookup_account: {perDay: 100}
```

重启后,输出`admin limits show`以一行开始.
`request limits: enforce`和显示有效值(重新定义)
账号为`*`;拒收账号为`cc_rate_limited_total{limiter}`.

### 实例:提高配额

整个服务器。 Docker Compose: `CC_MAX_VAULT_OBJECTS` 和
`CC_MAX_DEVICES_PER_ACCOUNT` -在`server.env`中,其余的 -在覆盖文件中:

```dotenv
CC_MAX_VAULT_OBJECTS=200000
CC_MAX_DEVICES_PER_ACCOUNT=40
```

```yaml
services:
  server:
    environment:
      CC_MAX_VAULT_BYTES: "4294967296"
      CC_MAX_VAULTS_PER_ACCOUNT: "100"
      CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY: "20"
```

赫尔姆:

```yaml
config:
  quotas:
    maxVaultBytes: 4294967296
    maxVaultsPerAccount: 100
    maxVaultObjects: 200000
    maxDevicesPerAccount: 40
    newDevicesPerAccountPerDay: 20
```

一个账户 -不重新启动, 最迟不超过30秒 :

```sh
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits set \
  --email user@example.org max_vault_bytes=4294967296 max_vault_objects=200000
cc_compose exec -T server /usr/local/bin/consolecrypt-server admin limits show --email user@example.org
```

`CC_MAX_DEVICES_PER_ACCOUNT` 不得超过64, `CC_MAX_VAULT_BYTES` 减去
(原始内容存档于2017-03-09). 1 MiB. 规划磁盘空间PostgreSQL,配有存储配额和号码.
账户。

### 示例:没有 SMTP 的字母 - 在哪里获得代码

没有SMTP,电子邮件就哪儿也去不了。 电子邮件确认代码, 密码更改
“不是我,”操作员从两个方面得到一个。

** `CC_MAIL_TRANSPORT=file` – 仅本地或测试服务器.**
每封电子邮件都用一个文件记录在 `CC_MAIL_DIR` (默认 `./.dev-mail` )
与进程工作目录有关的工作指南;
`server/docker-compose.yml`–`server/.dev-mail`主持人:

```dotenv
CC_MAIL_TRANSPORT=file
CC_MAIL_DIR=/path/to/mail
```

例如,文件名称是`<время UTC>-<тип>-<id>.eml`
`20261026T205345-password_reset-….eml` (中文(简体) ). 编号为`verify_email`的字母类型
确认地址,`password_reset` - 更改密码,`new_device` - 登录
新设备("不是我"). 其他类型`password_changed`,
`device_revoked` –没有代码的通知.

字母的文本编码为基数64,因此`cat`不会显示. 最后一个
密码更改字母的读法如下(替换电子邮件以确认电子邮件).
`password_reset`至`verify_email`: (中文(简体) ).

```sh
python3 - "$(ls -t "$CC_MAIL_DIR"/*-password_reset-*.eml | head -1)" <<'PY'
import sys
from email import message_from_binary_file, policy
with open(sys.argv[1], 'rb') as f:
    msg = message_from_binary_file(f, policy=policy.default)
print(msg['subject'])
print(msg.get_body(('plain',)).get_content())
PY
```

在macOS上,文件可以在Mail: `open файл.eml`中打开.

代码插入账户页面:内置`/account`服务器
`CC_WEB_ACCOUNT=true`,“确认电子邮件”或“忘了密码吗?”
您的网站有代码或页面。 电子邮件确认代码接受和
页:1 链接按钮仅在给定时出现在电子邮件中
`CC_PUBLIC_URL`,否则该字母仅是代码. 文件包含活动文件
一次性代码和权利设定`0600`:不使用`file`
到公共服务器,并在不再需要目录时删除目录。

** `CC_MAIL_TRANSPORT=disabled`(默认)** 根本没有字母。 接线员
首先检查地址属于用户,然后确认
它或给密码更改代码 :

```sh
consolecrypt-server admin verify-email --email user@example.org
consolecrypt-server admin reset-token --email user@example.org
```

`reset-token`打印可支配代码;有效`CC_PASSWORD_RESET_TTL_SECS`
(默认1小时),并输入字母代码所在的同一地点. B类Docker Compose和
Kubernetes在容器内执行指示:
`cc_compose exec -T server /usr/local/bin/consolecrypt-server admin …` 或 (中文(简体) ).
`cc_kubectl exec deployment/consolecrypt -- /usr/local/bin/consolecrypt-server admin …` (中文(简体) ).

## 验证服务器的依赖性

给开发者和收集图像的人。 `server/scripts/dependency_audit.py check`
launches `cargo deny check advisories bans sources licenses` for `server` and
`crates`和检查未公布的箱子是否为专有`cc-*`.
`consolecrypt-server`) 下 `AGPL-3.0-only` :

```sh
cargo install --locked cargo-deny@0.20.2
python3 server/scripts/dependency_audit.py check
```

CI在GitHub - 托管`ubuntu-24.04`上执行相同:在`validate`标签发布中
(故障停止图像组装)和每周`dependency-audit.yml`
并使用修改的依赖性检查拉动请求,打开
或更新"易腐成瘾"的刊号,并在清场后关闭.
`cargo-deny`从GitHub版本下载,并用SHA-256验证脚本.

政治`server/deny.toml`,`crates/deny.toml` :弱势和被束缚的版本.
禁止; 直接依赖者未保存; TLS只生锈`native-tls`
`openssl`,`openssl-sys`禁止;无关系关系`cc-protocol`
`crates/`遵循更严格的客户许可证清单。
在相应的`deny.toml`中,只应在`ignore`中加上例外,
委员会的识别资料、理由、所有者和修订日期(不迟于三年)
每月).

---
