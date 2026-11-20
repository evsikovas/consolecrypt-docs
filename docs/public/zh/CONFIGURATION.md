# 服务器设置目录ConsoleCrypt

参考文档译文 · [俄文原文](../CONFIGURATION.md)

网站内容相同: [справочник параметров](https://consolecrypt.dev/guide#server-reference).
> 网站内容相同:[configuration reference](https://consolecrypt.dev/guide#server-reference).

同步服务器参数完整列表**0.2.4**(protocol**1.13**):
每个键做什么,它需要什么值,默认值,
通往赫尔姆的路径和意义是否是一个秘密. 该目录由下载代码编译
配置`server/src/config.rs`,`server/src/config/*.rs`
`server/src/telemetry.rs`)和赫尔姆图模板. 核查
`server/scripts/test_configuration_docs.py`如果服务器收到密钥则会下降,
或服务器不知道的密钥被描述 。

如何设置参数在Docker Compose,`docker run`,Helm,JSON -file和
在[HOSTING.md](../HOSTING.md#как-задать-любой-параметр)中,有现成的例子。
步进IdP与Active Directory连接于[ENTERPRISE.md](ENTERPRISE.md).

英文版:[below](#english).

## 服务器如何读取设置

** 来源和优先级。** 服务器读取环境变量`CC_*`和
可选的私密文件JSON :

1. 过程的可变环境(包括**明显空**);
2. 旗帜`--config <путь>`和没有旗帜的JSON文件的值
   变量`CC_CONFIG_FILE`;
3. 内置默认值。

空值等于"未给定":如果环境(空)中有`CC_X=`,则服务器
使用默认值**,而不查看JSON文件。
只有此目录的已知密钥从环境读取; 变量带有
名字中的字典被默默忽略. 在JSON中,文档未知或
重复键停止发射.

** 数值格式。**

| 类型 | 如何写下来 |
|---|---|
| 逻辑 | `true`/`false`,`1`/`0`,`yes`/`no`,`on`/`off`(行字母) |
| 整体 | 无单位和分隔器的小数记录:`1073741824`,而非`1GiB` |
| 持续时间 | 从按键名称`_SECS` - 秒, `_MINUTES` - 分钟, `_HOURS` - 小时, `_DAYS` - 日 |
| 地址 | `хост:порт`,例如`0.0.0.0:8080`或`[::]:8080` |
| 列表 | 通过逗号和/或空间`CC_AUTH_ALLOWED_DOMAINS`,`CC_OIDC_MFA_ACR_VALUES` ; `CC_OIDC_SCOPES`通过空间 |
| 文件路径 | 容器内或服务主机上的绝对路径 |

在JSON文件中,所有值都是字符串,包括数字和逻辑值:
`{"CC_MAX_VAULT_OBJECTS": "200000", "CC_HSTS": "true"}` (中文(简体) ).

** 启动时访问。** 错误的值会用信件阻止服务器。
`invalid configuration: <КЛЮЧ>: …` ; 数值不输入消息 。
检查范围(如表格所示)和密钥之间的联系:

- 任何共同旗帜要求`CC_OBJECT_SHARING_ENABLED=true`和
  `CC_REQUIRE_REQUEST_PROOF=true` (中文(简体) ).
- `CC_REFRESH_TOKEN_TTL_SECS`不低于`CC_ACCESS_TOKEN_TTL_SECS`......;
- `CC_AUTH_MODE=enterprise`需要`CC_AUTH_PROVIDER`和选定的密钥
  提供商,OIDC - 也`CC_PUBLIC_URL`与`https://`.

网络启动时的企业模式额外检查:发现和JWKS
IDP或连接,TLS并绑定在目录上(见[ENTERPRISE.md](ENTERPRISE.md)).
启动时,服务器会用当前配置给日志写一个字符串`starting`.
密码和数据库URL藏于其中. 检查钥匙是否已经到达是方便的。
进程。

**当修改被应用时。** 只有在进程重新启动时:文件和
苍蝇上没有读到情况 例外 - 重新界定限制
a 单独账户`admin limits set`,这些账户在不晚于
超过30秒。

**Secrets.** 秘密值 - `CC_DATABASE_URL`(如果包含密码)
`CC_DATABASE_PASSWORD`, `CC_SMTP_PASSWORD`和企业登录文件. 服务器不是。
写在杂志上。 无一般机制`*_FILE`:变量
`CC_DATABASE_PASSWORD_FILE`或`CC_SMTP_PASSWORD_FILE`服务器不知道. 从档案.
只有5个键被读取,这些键本身就是路径:
`CC_OIDC_CLIENT_SECRET_FILE`, `CC_OIDC_TOKEN_KEY_FILE`, (中文(简体) ).
`CC_LDAP_BIND_PASSWORD_FILE`, `CC_OIDC_CA_FILE`, `CC_LDAP_CA_FILE` (中文(简体) ). 密码和
通过环境传送SMTPKubernetes`secretKeyRef`
`server.env`)或通过一个拥有权利的私人JSON文件`0600`.

** 命令读取配置。** `serve` (默认), `migrate` 和
`admin …`下载和验证整个配置,因此团队`admin`需要这样做.
与服务器相同的密钥( 容器已经拥有这些密钥) 。 `healthcheck`
仅限`CC_LISTEN_ADDR`和支票`http://127.0.0.1:<порт>/readyz`.

## 网络、公共地址、 TLS 和代理

服务器本身没有完成 TLS 并且没有证书密钥 : HTTPS 提供
反向代理或入侵它之前。 代理服务器应传送 WebSocket
`/v1/events/ws`,接收16米B以下的查询机构,不更改路径,查询和
体:这些都包含在设备的签名中.

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_LISTEN_ADDR` (中文(简体) ). | - (图表总是`0.0.0.0:8080`) | `0.0.0.0:8080` | `хост:порт` (中文(简体) ). | 无 | 地址和端口HTTP/WebSocket API. 在没有容器和同一机上的代理主机上,指定`127.0.0.1:8080`,这样API就无法直接访问. 港口取和`healthcheck`. |
| `CC_PUBLIC_URL` (中文(简体) ). | `config.publicUrl` (中文(简体) ). | 未预测 | URL`https://…` (中文(简体) ). | 无 | 案例的公共基址`https://sync.example.org`,没有`/v1`,从中建有字母`/account#action=verify`,`reset`,`deny-device`和OIDC回地址`CC_PUBLIC_URL/v1/auth/oidc/callback`的按钮. 没有它,电子邮件只包含代码,而不提及网页. 必须是没有`?`和`#`的绝对地址`http(s)://`(否则服务器不会启动). 对国际开发组织来说,它是强制性的,应该从`https://``http://`开始——只有`127.0.0.1`/`localhost`用于发展。 此地址的页面`/account` 由您的网站或服务器本身`CC_WEB_ACCOUNT=true` 提供;如果不是, 电子邮件的链接将返回 404— 电子邮件中的代码仍在应用程序中工作 。 |
| `CC_WEB_ACCOUNT` (中文(简体) ). | `config.webAccount` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 服务器本身的内建账户页:`GET /account` (+`app.js`, `app.css`). 电子邮件确认,邮件的新密码,"这不是我",针对有关新设备的电子邮件——只通过有代码的公开端点,没有登录,cookie和存储访问;严格的同源CSP. 对于没有站点的自我托管:启用和指定`CC_PUBLIC_URL`等于服务器地址,逆向代理必须传输`/account`和`/account/*`. 关闭后,服务器仅保留API. |
| `CC_TRUST_PROXY_HEADERS` (中文(简体) ). | `config.trustProxyHeaders` `auto` = `ingress.enabled`, `"true"`, `"false"` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 从最后**项`X-Forwarded-For`中取客户端地址(添加了您的代理的地址). 只启用一个可以覆盖或补充信头的可信任代理, 并且关闭了对 API 端口的直接访问 -否则客户端会伪造地址 。 没有它,所有IP限制只看到代理地址. |
| `CC_HSTS` (中文(简体) ). | `config.hsts` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 添加`Strict-Transport-Security: max-age=63072000; includeSubDomains` . 只有在代理本身将HSTS或子域必须保留在HTTP上时才关闭. |
| `CC_SOURCE_CODE_URL` (中文(简体) ). | `config.sourceCodeUrl` (中文(简体) ). | 源组装的地址(图像设置本身) | URL (中文(简体) ). | 无 | 引用`/v1/meta`给出的源代码为`source_code_url`(AGPL-3.0§13). 不要求官方图像 。 如果您运行了* 已修改的* 服务器,请指定从何处获取您的源代码 。 |

## 数据库和连接池

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_DATABASE_URL` (中文(简体) ). | `database.url`,`database.existingSecret`+`database.existingSecretKey`或嵌入式`postgresql.*` | ** 所需** | `postgres://…`URL (中文(简体) ). | 是的,如果有密码的话。 | URLPostgreSQL 16: `postgres://пользователь@хост:5432/база?sslmode=verify-full`. 对于外部基础,使用`sslmode=verify-full`,并使用你自己的CA`sslrootcert=<путь в контейнере>`. URL中的密码需要%-encode;如果包含密码,则更容易单独传输到`CC_DATABASE_PASSWORD`.**Secret**. 在赫尔姆`database.url`中,它存储在密图中,在`existingSecret`中,它存储在您的密图中. |
| `CC_DATABASE_PASSWORD` (中文(简体) ). | 仅使用内置基座`postgresql.auth.password`/`existingSecret`;用于外部-`extraEnv`与`secretKeyRef` | 未预测 | 线条 | 对 | 插入高架密码URL ; 不需要筛选 。**如果此处或URL 都没有设置, 驱动程序会使用标准变量`PGPASSWORD` 。 |
| `DATABASE_URL` (中文(简体) ). | — | 未预测 | `postgres://…`URL (中文(简体) ). | 是的,如果有密码的话。 | 原名`CC_DATABASE_URL`,**仅指环境. 如果`CC_DATABASE_URL`在过程环境中没有指定,则使用;那么JSON文件中的`CC_DATABASE_URL`更为重要. |
| `CC_DATABASE_MAX_CONNECTIONS` (中文(简体) ). | `database.maxConnections` (中文(简体) ). | `20` | 全文 1 | 无 | 每个过程的集合大小(pod),不小于1. 每个过程都持有另一个化合物,用于`LISTEN/NOTIFY`. 确保`реплики × (значение + 1)`小于`max_connections`PostgreSQL. 等待自由连接为5秒. |
| `CC_DATABASE_CONNECT_TIMEOUT_SECS` (中文(简体) ). | `database.connectTimeoutSecs` (中文(简体) ). | `60` | 秒, 整数 | 无 | 在以错误结尾之前,试图连接到无法访问的碱基的启动重复了多少秒(暂停从0.25秒增加到5秒)? 有效期为`serve`,`migrate`和`admin`. |
| `CC_RUN_MIGRATIONS` (中文(简体) ). | `migrations.runAtStartup` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 启动时应用内置迁移(在咨询锁下——多件复制品的安全性) `false` - 只有当迁移是单独进行的`consolecrypt-server migrate`,Helm`migrations.job.enabled`或为了预先核实的回滚. 移民形象的回滚并不取消. |
| `CC_EVENT_BUS` (中文(简体) ). | `config.eventBus` (中文(简体) ). | `postgres` (中文(简体) ). | `postgres`, `local` (中文(简体) ). | 无 | 实时事件如何到达WebSocket客户端:`postgres``LISTEN/NOTIFY`,与任何数量的复制品合作`local`(在一个单一过程中,只有一个复制品;图表禁止`local`at`replicaCount > 1`和自动缩放). |

## 邮件( SMTP)

需要邮寄地址确认和密码重置代码、保护信
设备,对登录失败的警告和对团队的邀请.

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_MAIL_TRANSPORT` (中文(简体) ). | `mail.transport` (中文(简体) ). | `disabled` (中文(简体) ). | `disabled``none`, `smtp`, `file` (中文(简体) ). | 无 | `disabled`(或称`none`) –没有发送信件,管理员使用`admin verify-email`和`admin reset-token`; `smtp`–通过SMTP发送; `file`–只用于开发,每个信件都用文件写在`CC_MAIL_DIR`中. |
| `CC_MAIL_DIR` (中文(简体) ). | `mail.file.dir`(舱内空穴居) | `./.dev-mail` (中文(简体) ). | 目录 | 无 | `file`的目录; 相对于进程工作目录的路径. 文件以权利`0600`创建. |
| `CC_MAIL_FROM` (中文(简体) ). | `mail.from` (中文(简体) ). | `ConsoleCrypt <no-reply@localhost>` (中文(简体) ). | 地址`Имя <a@example.org>` (中文(简体) ). | 无 | 发者. 地址必须经过您的 SMTP 服务器和发送者的 DNS 记录授权 。 |
| `CC_MAIL_LANGUAGE` (中文(简体) ). | `mail.language` (中文(简体) ). | `ru` (中文(简体) ). | `ru`, `en` (中文(简体) ). | 无 | 电子邮件和内置账户页面的语言。 电子邮件带有文本替代文本(UTF-8);代码总是显示用于插入应用程序,其有效性取自TTL设置. |
| `CC_SMTP_HOST` (中文(简体) ). | `mail.smtp.host` (中文(简体) ). | — | 主机名 | 无 | SMTP服务器的名称需要在`smtp`. |
| `CC_SMTP_PORT` (中文(简体) ). | `mail.smtp.port` (中文(简体) ). | `587` | 1–65535 | 无 | SMTP港(1-65535). |
| `CC_SMTP_TLS` (中文(简体) ). | `mail.smtp.tls` (中文(简体) ). | `starttls` (中文(简体) ). | `starttls`, `tls`, `none` (中文(简体) ). | 无 | `starttls`(通常为587,`tls` – 隐含的TLS(通常为465),`none`) –没有加密,仅用于本地继电器或测试电子邮件截取器. |
| `CC_SMTP_USERNAME` (中文(简体) ). | `mail.smtp.username` (中文(简体) ). | 未预测 | 线条 | 无 | SMTP登录. 空—没有认证( 与 IP 访问连接) 。 |
| `CC_SMTP_PASSWORD` (中文(简体) ). | `mail.smtp.password`(密图)或`mail.smtp.existingSecret`+`existingSecretPasswordKey` | 未预测 | 线条 | 对 | SMTP密码.**Secret**:在Helm中使用`existingSecret`. |

## 登记、地址确认、信使和账户密码

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_REGISTRATION_OPEN` (中文(简体) ). | `config.registrationOpen` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 允许登记新账户。 `false` - 登记回复403,`/v1/meta`报告`registration_open: false`;现有账户已开始运作。 企业-模式不起作用:账户通过IDP /目录`CC_AUTH_AUTO_CREATE`创建第一个登录. |
| `CC_REQUIRE_EMAIL_VERIFICATION` (中文(简体) ). | `config.requireEmailVerification` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 需要确认地址:没有它,登录,存储,命令和常见对象创建相会`email_not_verified`. 我需要邮件或`admin verify-email`. 例子Docker Compose包括. |
| `CC_EMAIL_VERIFY_TTL_SECS` (中文(简体) ). | `config.tokens.emailVerifyTtlSecs` (中文(简体) ). | `172800` (48小时) | 秒, 整数 | 无 | 地址确认码的有效性. |
| `CC_PASSWORD_RESET_TTL_SECS` (中文(简体) ). | `config.tokens.passwordResetTtlSecs` (中文(简体) ). | `3600`(1小时) | 秒, 整数 | 无 | 账户密码重置代码的有效性(从字母或`admin reset-token`). |
| `CC_ACCESS_TOKEN_TTL_SECS` (中文(简体) ). | `config.tokens.accessTtlSecs` (中文(简体) ). | `900` (15分钟) | 秒, 60-86400 键 | 无 | 60-86400 访问证的生命号。 简而言之,审查的速度更快,但更经常是更新。 |
| `CC_REFRESH_TOKEN_TTL_SECS` (中文(简体) ). | `config.tokens.refreshTtlSecs` (中文(简体) ). | (`2592000`天)(30天) | 秒, \\`CC_ACCESS_TOKEN_TTL_SECS` | 无 | 刷新令牌(无更新的device会话);不小于访问令牌. 之后,装置又重新进入. |
| `CC_ARGON2_MEMORY_KIB` (中文(简体) ). | `config.argon2.memoryKib` (中文(简体) ). | `19456` (19 MiB) (英语). | KiB,整个。 | 无 | 散列**账户密码**的Argon2id内存(服务器不接收存储密钥). 新的参数应用于新的散列;在修改密码之前,用自己的参数检查现有的参数。 |
| `CC_ARGON2_ITERATIONS` (中文(简体) ). | `config.argon2.iterations` (中文(简体) ). | `2` | 全文 1 | 无 | Argon2id通行证的数量。 |
| `CC_ARGON2_PARALLELISM` (中文(简体) ). | `config.argon2.parallelism` (中文(简体) ). | `1` | 全文 1 | 无 | 阿尔贡2id平行主义. |
| `CC_ARGON2_MAX_CONCURRENT` (中文(简体) ). | `config.argon2.maxConcurrent` `4` (中文(简体) ). | CPU数,不超过4个 | 全文 1 | 无 | 同时计算出多少散列(保护CPU和内存避免输入超载),至少1. 峰值记忆`CC_ARGON2_MEMORY_KIB × CC_ARGON2_MAX_CONCURRENT` – 使其远远低于容器的内存极限. |

## 装置和防范从新装置进入

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_REQUIRE_REQUEST_PROOF` (中文(简体) ). | `config.requireRequestProof` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 要求每个请求与设备密钥的签名(protocol 1.5):没有密钥的被盗令牌是无用的. `false` -对老客户的临时例外:不正确的签名仍然被拒绝,只缺少计数`cc_request_proofs_total{result="missing"}`. 共享访问需要`true`. |
| `CC_DEVICE_REQUEST_TTL_SECS` (中文(简体) ). | `config.tokens.deviceRequestTtlSecs` (中文(简体) ). | `86400` (24小时) | 秒, 整数 | 无 | 对新设备的信托请求等待在被信任的设备上被批准需要多久? |
| `CC_DEVICE_PROTECTION_ENABLED` (中文(简体) ). | `config.deviceProtection.enabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 防止从新设备登录:隔离,限制向未确认设备释放解锁材料,字母"新设备",事件`device_registered`,重置密码时召回未使用的设备. 在`CC_PUBLIC_URL/account`中提到了“不是我”。 细节 - [HOSTING.md](../HOSTING.md#защита-от-входа-с-нового-устройства). |
| `CC_NEW_DEVICE_MAIL_ENABLED` (中文(简体) ). | `config.deviceProtection.newDeviceMail` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 关于新设备的信件( 保护邮件和配置邮件上的行为) 。 |
| `CC_DEVICE_QUARANTINE_DAYS` (中文(简体) ). | `config.deviceProtection.quarantineDays` (中文(简体) ). | `14` | 每日,0-365小时 | 无 | 在一天0-365对新设备进行隔离:此时它无法召回信任的设备,并且从中更改密码和“随处可见”并不结束信任设备的会话。 `0`——没有隔离。 |
| `CC_ENVELOPE_LIMIT_ACCOUNT_PER_HOUR` (中文(简体) ). | `config.deviceProtection.envelopesPerAccountPerHour` (中文(简体) ). | `5` | 整数 ^ 0, `0` - 不加限制 | 无 | 未经证实的账号设备每小时能收到多少次存储解锁材料`0`而不受限制?. 柜台是所有复制品通用的. |
| `CC_ENVELOPE_LIMIT_ACCOUNT_PER_DAY` (中文(简体) ). | `config.deviceProtection.envelopesPerAccountPerDay` (中文(简体) ). | `20` | 整数 ^ 0, `0` - 不加限制 | 无 | 一天之内也一样 |
| `CC_ENVELOPE_LIMIT_DEVICE_PER_HOUR` (中文(简体) ). | `config.deviceProtection.envelopesPerDevicePerHour` (中文(简体) ). | `3` | 整数 ^ 0, `0` - 不加限制 | 无 | 一小时后一个未经证实的装置也是一样 |
| `CC_NEW_DEVICE_MAIL_PER_HOUR` (中文(简体) ). | `config.deviceProtection.newDeviceMailsPerHour` (中文(简体) ). | `10` | 全文 ○ | 无 | 我们每个账户每小时写新设备;小时的剩余投入减少到一个字母。 |

## 同步、 WebSocket 和配额

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_SYNC_PAGE_BYTES` (中文(简体) ). | `config.sync.pageBytes` (中文(简体) ). | `8388608`(8个米B) | 字节, {} 65536 | 无 | 预算字节为一页`changes`/`snapshot`和公共访问列表,不低于65536. |
| `CC_QUOTAS_V2_ENABLED` (中文(简体) ). | `config.quotas.v2Enabled` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 服务器配额0.2.2:核算墓碑和物品,设备限制,去除一个没有墓碑的未知物品. `false` 返回行为0.2.1(计数继续维持). |
| `CC_MAX_VAULT_BYTES` (中文(简体) ). | `config.quotas.maxVaultBytes` (中文(简体) ). | `1073741824`(1个GiB) | 字节,\ 1048576 | 无 | 加密文本加墓碑每个存储单元,至少1米B. 超过 - `413`, `details.reason = "vault_quota"`. |
| `CC_TOMBSTONE_COST_BYTES` (中文(简体) ). | `config.quotas.tombstoneCostBytes` (中文(简体) ). | `256` | 字节, 0–1048576 | 无 | 0–1048576.每块墓碑(远物)花费了多少字节配额. |
| `CC_MAX_VAULT_OBJECTS` (中文(简体) ). | `config.quotas.maxVaultObjects` (中文(简体) ). | `100000` | 全文 1 | 无 | 活物和墓碑在一处贮存,至少存1. 超过 - `413`, `object_limit`. |
| `CC_MAX_VAULTS_PER_ACCOUNT` (中文(简体) ). | `config.quotas.maxVaultsPerAccount` (中文(简体) ). | `50` | 全文 1 | 无 | 该账户拥有的存储至少为 1 。 超过 - `403`, `vault_limit`. |
| `CC_MAX_DEVICES_PER_ACCOUNT` (中文(简体) ). | `config.quotas.maxDevicesPerAccount` (中文(简体) ). | `20` | 1–64 | 无 | 不可撤销的账户设备, 1–64 (64是普通对象的收件人限制). 从另一个入口`403`,`device_limit`. |
| `CC_NEW_DEVICES_PER_ACCOUNT_PER_DAY` (中文(简体) ). | `config.quotas.newDevicesPerAccountPerDay` (中文(简体) ). | `10` | 整数 ^ 0, `0` - 不加限制 | 无 | 任何24小时的新账户设备,`0` -无限制. 超过 - `403`, `device_daily_limit` 与 `details.until`. |
| `CC_WS_PING_INTERVAL_SECS` (中文(简体) ). | `config.websocket.pingIntervalSecs` (中文(简体) ). | `30` | 秒数,% 1 | 无 | WebSocket中的ping间隔至少为1. 如果代理机更快关闭静态连接, 则会减少 。 |
| `CC_WS_SESSION_RECHECK_SECS` (中文(简体) ). | `config.websocket.sessionRecheckSecs` (中文(简体) ). | `30` | 秒, 1 - 30 个 | 无 | 开放的 WebSocket 检查一个会话没有被取消的频率, 1–30 : 复核在30秒内到达套接字 。 |
| `CC_WS_MAX_CONNECTIONS_PER_USER` (中文(简体) ). | `config.websocket.maxConnectionsPerUser` (中文(简体) ). | `32` | 全文 1 | 无 | 每件复制件同时使用WebSocket账户连接,不低于1;超过-`429`. |

个人账户配额变动而不重新启动:`设定的管理机构限额--email'
最大值_字节_字节=... 最大值_字节_对象=... 最大值_ devices_per_count=
新建_devices_per_count_per_day=`. ` CC_MAX_VAULTS_PER_ACCOUNT (中文(简体) ).
谓过定故.

## 共享准入和共享团队

默认情况下所有共享旗都关闭, 并需要
`CC_OBJECT_SHARING_ENABLED=true`和`CC_REQUIRE_REQUEST_PROOF=true`(否则服务器不会
它会开始。 关闭旗下会隐藏这种类型的对象而不移除它们.
密码文字. 委托人通过授权请求确认可能性
`/v1/shares/capabilities` (中文(简体) ). 细节 - [SHARING.md](SHARING.md).

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_OBJECT_SHARING_ENABLED` (中文(简体) ). | `config.objectSharingEnabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 共享主机的主要机制. |
| `CC_SHARED_GROUPS_ENABLED` (中文(简体) ). | `config.sharedGroupsEnabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 一般团体(收集)。 |
| `CC_SHARED_SECRETS_ENABLED` (中文(简体) ). | `config.sharedSecretsEnabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 分开共享的秘密。 |
| `CC_SHARED_KUBE_CONTEXTS_ENABLED` (中文(简体) ). | `config.sharedKubeContextsEnabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 一般连接Kubernetes `supports_kube_contexts`. |
| `CC_SHARED_DB_CONNECTIONS_ENABLED` (中文(简体) ). | `config.sharedDbConnectionsEnabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 与数据库的共同连接`supports_db_connections` . |
| `CC_SHARED_NOTES_ENABLED` (中文(简体) ). | `config.sharedNotesEnabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 普通物体的一般记号`supports_notes_v1`:每个物体最多500个记号,每个记号最多288个KiB密码. |
| `CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED` (中文(简体) ). | `config.sharingOwnerOnlineEnrollmentEnabled` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 在拥有者的参与下添加新的收件人自己的设备。 |
| `CC_TEAMS_ENABLED` (中文(简体) ). | `extraEnv` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 命令(常用存储器,`/v1/teams/*`,`capabilities.teams` in `/v1/meta`). 它不依赖于共享的旗帜。 在`false`,指令路线响应404,数据被存储. |
| `CC_MAX_TEAMS_PER_ACCOUNT` (中文(简体) ). | `extraEnv` (中文(简体) ). | `50` | 全文 1 | 无 | 帐户可以组成的小组至少是1个。 |
| `CC_MAX_TEAM_MEMBERS` (中文(简体) ). | `extraEnv` (中文(简体) ). | `200` | 第2条 全文 | 无 | 同队成员,不少于2人. |

## 对请求的限制

限制保护服务器不受单个账户,设备,或地址的影响. 多数
限值存储于PostgreSQL(按基时间排列的桶)和相同
其作用于所有复制品;第一阶段的三限在每期的记忆中直播.
线条。 如果失败——`429 rate_limited`与`Retry-After`和`details.limit`......

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_RATE_LIMIT_ENABLED` (中文(简体) ). | `config.rateLimit.enabled` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | `false` 关闭**所有* 请求限制(保留配额)。 只为调试. |
| `CC_RATE_LIMIT_MODE` (中文(简体) ). | `config.rateLimit.mode` (中文(简体) ). | `observe` (中文(简体) ). | `observe`, `enforce` (中文(简体) ). | 无 | `observe` – 超过限额PostgreSQL,阅读限制只考虑`cc_rate_limit_observed_total{limiter}`,审计事件`limit_exceeded`每账户和限额不超过一小时; `enforce` – 被拒绝. 进入和回收限制(见下文)和第一阶段`CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE`和`CC_RATE_LIMIT_PROOF_PER_DEVICE_PER_MINUTE`在两种模式下运作。 观察一周,必要时提高阈值,然后`enforce`. |
| `CC_RATE_LIMIT_AUTH_PER_IP_PER_MINUTE` (中文(简体) ). | `config.rateLimit.authPerIpPerMinute` (中文(简体) ). | `30` | 一分钟后全程 | 无 | 复制内存的第一步:公开登录,登录和恢复请求从每分钟1个IPIPv6到64个. 直至给出`CC_LIMIT_AUTH_IP_RATE`,总限`auth_ip`给出的数值相同. |
| `CC_RATE_LIMIT_PROOF_PER_DEVICE_PER_MINUTE` (中文(简体) ). | `config.rateLimit.proofPerDevicePerMinute` (中文(简体) ). | `20` | 一分钟后全程 | 无 | 复制:试图确认设备每分钟的密钥(测试/批准). |
| `CC_RATE_LIMIT_READ_PER_DEVICE_PER_MINUTE` (中文(简体) ). | `config.rateLimit.readPerDevicePerMinute` (中文(简体) ). | `1200` | 整体,每分钟; `0` - 关闭. | 无 | 复制内存:每个设备每分钟授权读数(GET); `0` -无限制. 提交`CC_RATE_LIMIT_MODE`. |
| `CC_RATE_LIMIT_LOGIN_PER_EMAIL_PER_MINUTE` (中文(简体) ). | `config.rateLimit.loginPerEmailPerMinute` (中文(简体) ). | 未说明`10` | 一分钟后全程 | 无 | 原名(最高0.2.2):频率限制`login_email`每分钟(及其容量). 如果给出`CC_LIMIT_LOGIN_EMAIL_RATE`,则被忽略. |
| `CC_RATE_LIMIT_RECOVERY_PER_EMAIL_PER_HOUR` (中文(简体) ). | `config.rateLimit.recoveryPerEmailPerHour` (中文(简体) ). | 未说明`5` | 一小时后全程 | 无 | 原名:频率`recovery_email`/小时. 如果给出`CC_LIMIT_RECOVERY_EMAIL_RATE`,则被忽略. |

### 限制PostgreSQL: `CC_LIMIT_<ИМЯ>_*`

每个限制有四个密钥`<ИМЯ>` –大写字母中的限制名称:

- `CC_LIMIT_<ИМЯ>_RATE` -主桶的频率: `N`在自然时期
  限制(在表格中注明)或`N/s`,`N/sec`,`N/min`,`N/m`,`N/hour``N/h`,
  `N/day``N/d`;分母`N`是允许的; `0` -没有主桶. 如果被问及
  只有频率,电容就等于这个频率的一个时期.
- `CC_LIMIT_<ИМЯ>_BURST` - 桶容量(连续提出多少要求),整体不是
  少于1岁。 默认情况下,一个频率周期,除非表格显示一个突起.
- `CC_LIMIT_<ИМЯ>_PER_HOUR`和`CC_LIMIT_<ИМЯ>_PER_DAY`-增加的最高限额
  1小时1天,全数; `0`--无上限.

无频率和上限的限制并不限制任何东西。 赫尔姆有四把钥匙
以区块`config.rateLimit.limits`定义,例如:
`{push_account: {rate: "600/min", burst: 600, perHour: 0, perDay: 0}}`(外地)
`rate`, `burst`, `perHour`, `perDay` (中文(简体) ). 对于一个单独的账户,
`admin limits set --email … push_account_rate=600/min`(后缀`_rate`).
`_burst`, `_per_hour`, `_per_day`; 入场限制没有被推翻.

| 名称. | 何谓有限? | 以默认. | 钥匙 |
|---|---|---|---|
| `push_device` (中文(简体) ). | 从一个设备发送更改 | 120分/分钟,高峰60分 | `CC_LIMIT_PUSH_DEVICE_RATE`, `CC_LIMIT_PUSH_DEVICE_BURST`, `CC_LIMIT_PUSH_DEVICE_PER_HOUR`, `CC_LIMIT_PUSH_DEVICE_PER_DAY` (中文(简体) ). |
| `push_account` (中文(简体) ). | 正在向所有账户设备发送更改 | 300分/分钟 | `CC_LIMIT_PUSH_ACCOUNT_RATE`, `CC_LIMIT_PUSH_ACCOUNT_BURST`, `CC_LIMIT_PUSH_ACCOUNT_PER_HOUR`, `CC_LIMIT_PUSH_ACCOUNT_PER_DAY` (中文(简体) ). |
| `mutations_account` (中文(简体) ). | 提交账户的变动次数 | 每小时50 000美元 | `CC_LIMIT_MUTATIONS_ACCOUNT_RATE`, `CC_LIMIT_MUTATIONS_ACCOUNT_BURST`, `CC_LIMIT_MUTATIONS_ACCOUNT_PER_HOUR`, `CC_LIMIT_MUTATIONS_ACCOUNT_PER_DAY` (中文(简体) ). |
| `unknown_delete_account` (中文(简体) ). | 删除未在服务器上的对象 | 1 000/天(单位:千美元) | `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_RATE`, `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_BURST`, `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_PER_HOUR`, `CC_LIMIT_UNKNOWN_DELETE_ACCOUNT_PER_DAY` (中文(简体) ). |
| `share_write_account` (中文(简体) ). | 创建共同对象 | 60小时,20度 | `CC_LIMIT_SHARE_WRITE_ACCOUNT_RATE`, `CC_LIMIT_SHARE_WRITE_ACCOUNT_BURST`, `CC_LIMIT_SHARE_WRITE_ACCOUNT_PER_HOUR`, `CC_LIMIT_SHARE_WRITE_ACCOUNT_PER_DAY` (中文(简体) ). |
| `share_revision_account` (中文(简体) ). | 对共同设施的审计、出入权的改变、一般说明 | 600小时 | `CC_LIMIT_SHARE_REVISION_ACCOUNT_RATE`, `CC_LIMIT_SHARE_REVISION_ACCOUNT_BURST`, `CC_LIMIT_SHARE_REVISION_ACCOUNT_PER_HOUR`, `CC_LIMIT_SHARE_REVISION_ACCOUNT_PER_DAY` (中文(简体) ). |
| `recipient_lookup_account` (中文(简体) ). | 邮购 | 30分钟和300天 | `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_RATE`, `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_BURST`, `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_HOUR`, `CC_LIMIT_RECIPIENT_LOOKUP_ACCOUNT_PER_DAY` (中文(简体) ). |
| `enrollment_account` (中文(简体) ). | 添加收件人自己的设备 | 30小时/小时 | `CC_LIMIT_ENROLLMENT_ACCOUNT_RATE`, `CC_LIMIT_ENROLLMENT_ACCOUNT_BURST`, `CC_LIMIT_ENROLLMENT_ACCOUNT_PER_HOUR`, `CC_LIMIT_ENROLLMENT_ACCOUNT_PER_DAY` (中文(简体) ). |
| `trust_request_device` (中文(简体) ). | 单一设备的信托请求 | 10小时/小时 | `CC_LIMIT_TRUST_REQUEST_DEVICE_RATE`, `CC_LIMIT_TRUST_REQUEST_DEVICE_BURST`, `CC_LIMIT_TRUST_REQUEST_DEVICE_PER_HOUR`, `CC_LIMIT_TRUST_REQUEST_DEVICE_PER_DAY` (中文(简体) ). |
| `trust_request_account` (中文(简体) ). | 所有账户设备的信托请求 | 30天/日 (单位:千美元) | `CC_LIMIT_TRUST_REQUEST_ACCOUNT_RATE`, `CC_LIMIT_TRUST_REQUEST_ACCOUNT_BURST`, `CC_LIMIT_TRUST_REQUEST_ACCOUNT_PER_HOUR`, `CC_LIMIT_TRUST_REQUEST_ACCOUNT_PER_DAY` (中文(简体) ). |
| `verification_account` (中文(简体) ). | 密钥调节: 批准设备的宣布, 签名的存储密钥打印 | 20小时/小时 | `CC_LIMIT_VERIFICATION_ACCOUNT_RATE`, `CC_LIMIT_VERIFICATION_ACCOUNT_BURST`, `CC_LIMIT_VERIFICATION_ACCOUNT_PER_HOUR`, `CC_LIMIT_VERIFICATION_ACCOUNT_PER_DAY` (中文(简体) ). |
| `account_security` (中文(简体) ). | 更改密码、重新印发回收包、更换信封 | 10小时/小时 | `CC_LIMIT_ACCOUNT_SECURITY_RATE`, `CC_LIMIT_ACCOUNT_SECURITY_BURST`, `CC_LIMIT_ACCOUNT_SECURITY_PER_HOUR`, `CC_LIMIT_ACCOUNT_SECURITY_PER_DAY` (中文(简体) ). |
| `ws_connect_account` (中文(简体) ). | 新建 WebSocket 账户连接 | 60/min(60岁) | `CC_LIMIT_WS_CONNECT_ACCOUNT_RATE`, `CC_LIMIT_WS_CONNECT_ACCOUNT_BURST`, `CC_LIMIT_WS_CONNECT_ACCOUNT_PER_HOUR`, `CC_LIMIT_WS_CONNECT_ACCOUNT_PER_DAY` (中文(简体) ). |
| `auth_ip`(始终有效) | 从同一地址(复制品共有地址)公开申请入境、登记和恢复 | 30分钟/分钟 | `CC_LIMIT_AUTH_IP_RATE`, `CC_LIMIT_AUTH_IP_BURST`, `CC_LIMIT_AUTH_IP_PER_HOUR`, `CC_LIMIT_AUTH_IP_PER_DAY` (中文(简体) ). |
| `login_email`(始终有效) | **未成功** 登录同一网络的一个电子邮件地址(24IPv4,64IPv6) | 10/min和50/小时 | `CC_LIMIT_LOGIN_EMAIL_RATE`, `CC_LIMIT_LOGIN_EMAIL_BURST`, `CC_LIMIT_LOGIN_EMAIL_PER_HOUR`, `CC_LIMIT_LOGIN_EMAIL_PER_DAY` (中文(简体) ). |
| `login_email_total`(始终有效) | 未从所有网络输入地址 | 200小时 | `CC_LIMIT_LOGIN_EMAIL_TOTAL_RATE`, `CC_LIMIT_LOGIN_EMAIL_TOTAL_BURST`, `CC_LIMIT_LOGIN_EMAIL_TOTAL_PER_HOUR`, `CC_LIMIT_LOGIN_EMAIL_TOTAL_PER_DAY` (中文(简体) ). |
| `recovery_email`(始终有效) | 密码重置请求到一个网络的地址 | 5小时/小时 | `CC_LIMIT_RECOVERY_EMAIL_RATE`, `CC_LIMIT_RECOVERY_EMAIL_BURST`, `CC_LIMIT_RECOVERY_EMAIL_PER_HOUR`, `CC_LIMIT_RECOVERY_EMAIL_PER_DAY` (中文(简体) ). |
| `recovery_email_total`(始终有效) | 将电子邮件重置为来自所有网络的地址( 总是回复`202` ) | 20日(每日) (单位:千美元) | `CC_LIMIT_RECOVERY_EMAIL_TOTAL_RATE`, `CC_LIMIT_RECOVERY_EMAIL_TOTAL_BURST`, `CC_LIMIT_RECOVERY_EMAIL_TOTAL_PER_HOUR`, `CC_LIMIT_RECOVERY_EMAIL_TOTAL_PER_DAY` (中文(简体) ). |

异形尝试不会阻止所有者:成功的进入限制邮件不会花费,以及
从已知的账户设备登录仅限于地址。 演员
数值:`consolecrypt-server admin limits show`(c)`--email` - 用于账户。

## 企业入口:`CC_AUTH_*`,`CC_OIDC_*`,`CC_LDAP_*`

在模式`standard`中,不读取或检查提供者的密钥.
往返是1`CC_AUTH_MODE`的改变. 调整顺序,
IDP和目录的食谱,命令和错误分析 - in[ENTERPRISE.md](ENTERPRISE.md).
在Helm块`auth:`中,秘密取自现存的图中的秘密.
在`/run/secrets/consolecrypt-auth`和`*_FILE`中只读挂载
他在设置图表。

### 常见密钥

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_AUTH_MODE` (中文(简体) ). | `auth.mode` (中文(简体) ). | `standard` (中文(简体) ). | `standard`, `enterprise` (中文(简体) ). | 无 | `standard` - 电子邮件和账户密码; `enterprise` - 仅通过IDP(OIDC)或目录(LDAP)登录,注册和账户密码关闭. |
| `CC_AUTH_PROVIDER` (中文(简体) ). | `auth.provider` (中文(简体) ). | — | `oidc`, `ldap` (中文(简体) ). | 无 | `oidc`或`ldap` ;在企业中是强制性的. |
| `CC_AUTH_DISPLAY_NAME` (中文(简体) ). | `auth.displayName` (中文(简体) ). | 未预测 | 最多64个打印字符 | 无 | 应用程序中登录按钮的签名("Loginthrough..."),最多64个打印字符. |
| `CC_AUTH_ALLOWED_DOMAINS` (中文(简体) ). | `auth.allowedDomains`(名单) | 空头 | 域列表 | 无 | 可允许的邮件域`acme.com, acme.ru`; `@`首先被丢弃,注册不重要,子域不包含). 需要用密码自动捆绑现有账户;必须预先设定`google` |
| `CC_AUTH_AUTO_CREATE` (中文(简体) ). | `auth.autoCreate` (中文(简体) ). | `true` (中文(简体) ). | 逻辑 | 无 | 在第一次登录新账户时创建一个账户。 `false` – 仅包括现有或关联账户,其余账户`403` `not_provisioned` 。 |
| `CC_AUTH_RECHECK_MINUTES` (中文(简体) ). | `auth.recheckMinutes` (中文(简体) ). | `15` | 1-1440分钟 | 无 | 在 IdP /目录中重新检查用户的频率(1至1,440分钟) 伤残员工最迟在本次+1分钟后失去同步性. |
| `CC_AUTH_RECHECK_GRACE_HOURS` (中文(简体) ). | `auth.recheckGraceHours` (中文(简体) ). | `24` | 时钟, 0-720 | 无 | 在不提供IP/Directory的情况下,有多少小时(0-720)的会话进行直播;然后更新回复`503 idp_unavailable`. |

### 奥伊德科组织(OIDC)

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_OIDC_PRESET` (中文(简体) ). | `auth.oidc.preset` (中文(简体) ). | `generic` (中文(简体) ). | `generic`, `entra`, `adfs`, `keycloak`, `google`, `okta` (中文(简体) ). | 无 | `generic` , `entra` , `adfs` , `keycloak` , `google` , `okta` : default and start check values (Entra – issuer with tenant id, without `/common` , `/organizations` , `/consumers` ; AD FS – ends with `/adfs` ; Keycloak – contains `/realms/` ; Google – fixed issuer, mandatory domain list, verification `hd` ). |
| `CC_OIDC_ISSUER` (中文(简体) ). | `auth.oidc.issuer` (中文(简体) ). | 强制性(y`google` -`https://accounts.google.com`) | URL`https://…` (中文(简体) ). | 无 | 准确发行者:在发现时符号等值为`issuer`,在ID符中`iss`,包括最终`/`. 只有`https://`(或`http://`关于环回发展),没有查询和片段. |
| `CC_OIDC_CLIENT_ID` (中文(简体) ). | `auth.oidc.clientId` (中文(简体) ). | 强制性 | 线条 | 无 | IDP中服务器客户端(应用程序)的标识符. |
| `CC_OIDC_CLIENT_SECRET_FILE` (中文(简体) ). | `auth.oidc.existingSecret`+ `clientSecretKey` `client-secret` (中文(简体) ). | 强制性 | 文件路径 | 文档,是 | 客户端秘密文件的路径( UTF-8, 最终行翻译被丢弃, 最多可达64 KiB).** Secret**:文件必须由进程用户阅读(在UID 65532中). |
| `CC_OIDC_TOKEN_KEY_FILE` (中文(简体) ). | `auth.oidc.existingSecret`+ `tokenKeyKey` `token-key` (中文(简体) ). | 强制性 | 文件路径 | 文档,是 | 带有32字节密钥的文件路径,它加密了数据库中的符号 IdP( Cha20- Poly1305) : 64 十六进制字符 `openssl rand -hex 32`, 基数64 32 字节或 32 随机字节.**当您更改密钥时, 存储的刷新符号变得不可读 - 用户将再次登录 。 |
| `CC_OIDC_SCOPES` (中文(简体) ). | `auth.oidc.scopes` (中文(简体) ). | `openid email profile offline_access`; `adfs` : `openid email profile allatclaims` ; `google` : `openid email profile`  . | 通过空间列表, c`openid` | 无 | 空间范围`openid`是强制性的。 `offline_access`是刷新符号和重新检查所需的;Google拒绝(预设本身添加`access_type=offline`和`prompt=consent`). |
| `CC_OIDC_EMAIL_CLAIM` (中文(简体) ). | `auth.oidc.emailClaim` (中文(简体) ). | `email`; `entra` : `preferred_username` ; `adfs` : `upn`  . | 索 赔 | 无 | 用作账户电子邮件地址(价值必须包含`@`)的债权ID令牌。 |
| `CC_OIDC_REQUIRED_CLAIM` (中文(简体) ). | `auth.oidc.requiredClaim` (中文(简体) ). | 未预测 | `claim=значение` (中文(简体) ). | 无 | `имя=значение`:只允许其主张等同于或(对于一个阵列,例如`groups`),`roles`包含. 否则`403 group_required`. |
| `CC_OIDC_REQUIRE_MFA` (中文(简体) ). | `auth.oidc.requireMfa` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 需要多要素输入: `mfa`或 `http://schemas.microsoft.com/claims/multipleauthn`在`amr`或`acr`在`CC_OIDC_MFA_ACR_VALUES`中. 否则`403 mfa_required`. 对于没有`acr`的`google` - 价值不接受. |
| `CC_OIDC_MFA_ACR_VALUES` (中文(简体) ). | `auth.oidc.mfaAcrValues` (中文(简体) ). | 空 | 列表 | 无 | 被认为多要素(通过逗号或空格)的值`acr`. |
| `CC_OIDC_TOKEN_AUTH_METHOD` (中文(简体) ). | `auth.oidc.tokenAuthMethod` (中文(简体) ). | `client_secret_basic` (中文(简体) ). | `client_secret_basic``basic`), `client_secret_post``post` (中文(简体) ). | 无 | Token端点服务器认证:`client_secret_basic` `basic`或`client_secret_post` `post`. |
| `CC_OIDC_CA_FILE` (中文(简体) ). | `auth.oidc.caKey`(密钥在同) | 根号 | 路径 | 无 | PEM 证书,用于内部 CA(例如. (原始内容存档于2019-09-31). AD FS. |

### LDAP / 活动目录

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_LDAP_URL` (中文(简体) ). | `auth.ldap.url` (中文(简体) ). | 强制性 | `ldaps://…`, `ldap://…` (中文(简体) ). | 无 | `ldaps://dc1.acme.local:636`或`ldap://dc1.acme.local:389`连同`CC_LDAP_STARTTLS=true`. 简单`ldap://`没有STARTLS服务器拒绝:域密码不应用纯文本进行. 主机名必须匹配控制器的证书 。 |
| `CC_LDAP_STARTTLS` (中文(简体) ). | `auth.ldap.starttls` (中文(简体) ). | `false` (中文(简体) ). | 逻辑 | 无 | 用于`ldap://`;c`ldaps://`的STARTLS是不可接受的。 |
| `CC_LDAP_CA_FILE` (中文(简体) ). | `auth.ldap.caKey`(密钥在同) | 根号 | 路径 | 无 | PEM带有CA域的根证书(一个或多个证书). |
| `CC_LDAP_BIND_DN` (中文(简体) ). | `auth.ldap.bindDn` (中文(简体) ). | 强制性 | 邓恩 | 无 | DN服务记录用于搜索和重新检查,例如`CN=svc-consolecrypt,OU=Service,DC=acme,DC=local`足够的权利阅读目录. |
| `CC_LDAP_BIND_PASSWORD_FILE` (中文(简体) ). | `auth.ldap.existingSecret`+ `bindPasswordKey` `bind-password` (中文(简体) ). | 强制性 | 文件路径 | 文档,是 | 带有服务日志密码的文件路径 。**Secret.** |
| `CC_LDAP_BASE_DN` (中文(简体) ). | `auth.ldap.baseDn` (中文(简体) ). | 强制性 | 邓恩 | 无 | 在哪里寻找用户`DC=acme,DC=local`,它也作为绑定物来源的标识符:当它改变绑定物时,需要重新创建. |
| `CC_LDAP_USER_FILTER` (中文(简体) ). | `auth.ldap.userFilter` (中文(简体) ). | `(和(对象分类=用户)\)|(邮件={login}(用户主名={login}(sAMAccountName={login})) | LDAP 过滤器为 `{login}` | 无 | 使用`{login}`的搜索过滤器应从`(`开始. 用户输入由RFC 4515屏蔽,前缀`ДОМЕН\`被丢弃. 如果找到一些记录,入口就会被拒绝。 |
| `CC_LDAP_EMAIL_ATTR` (中文(简体) ). | `auth.ldap.emailAttr` (中文(简体) ). | `mail` (中文(简体) ). | 名称 | 无 | 带有邮政地址的属性。 |
| `CC_LDAP_ID_ATTR` (中文(简体) ). | `auth.ldap.idAttr` (中文(简体) ). | `objectGUID` (中文(简体) ). | 名称 | 无 | 稳定用户标识符;用于`objectGUID`存储为GUID字符串. 更改您的邮件或名称不会破坏您的附件 。 |
| `CC_LDAP_REQUIRED_GROUP` (中文(简体) ). | `auth.ldap.requiredGroup` (中文(简体) ). | 未预测 | 邓恩 | 无 | 组的DN,成员(包括巢组,规则AD`LDAP_MATCHING_RULE_IN_CHAIN`)必须是用户;登录时检查,再检查. 启动时,服务器检查该组是否存在. |
| `CC_LDAP_TIMEOUT_SECS` (中文(简体) ). | `auth.ldap.timeoutSecs` (中文(简体) ). | `10` | 秒,1 -60。 秒,1 -60。 | 无 | 连接和操作的超时,1-60秒. |
| `CC_LDAP_MAX_FAILURES` (中文(简体) ). | `auth.ldap.maxFailures` (中文(简体) ). | `3` | 1–100 | 无 | 无法成功登录到登录和窗口外的目录用户,1–100;然后服务器回复`429`**而不提及AD**. 保持** 低于** 域名账户锁定阈值 。 |
| `CC_LDAP_FAILURE_WINDOW_MINUTES` (中文(简体) ). | `auth.ldap.failureWindowMinutes` (中文(简体) ). | `15` | 1-1440分钟 | 无 | 进项计数窗口失败, 1–1, 440分钟;不短于域政策中的锁计数重置窗口 。 |
| `CC_LDAP_MAX_FAILURES_PER_IP` (中文(简体) ). | `auth.ldap.maxFailuresPerIp` (中文(简体) ). | `30` | 整数 ^ 0, `0` - 不加限制 | 无 | 从每个窗口一个IP的不成功输入; `0` - 不受限制. |

## 意见:衡量标准、日记、追踪

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_METRICS_LISTEN` (中文(简体) ). | `metrics.enabled``true` → `0.0.0.0:9090`, `false` → `off` | `0.0.0.0:9090` | `хост:порт`, `off`, `disabled` (中文(简体) ). | 无 | 单独的听者普罗米修斯`GET /metrics`.`off`或`disabled` - 关闭. 没有认证的计量:不向外发布端口,也不将其包括在入侵中. 例Docker Compose将其关闭. |
| `CC_LOG_FORMAT` (中文(简体) ). | `config.log.format` (中文(简体) ). | `json` (中文(简体) ). | `json`, `pretty` `text` (中文(简体) ). | 无 | 日记格式为stderr:`json`或`pretty``text`. 命令`admin`总是写在`pretty`. |
| `CC_LOG` (中文(简体) ). | `config.log.filter` (中文(简体) ). | `info,sqlx=warn` (中文(简体) ). | 信封过滤器 | 无 | **只有环境** (在JSON中,该文件不被接受). 语法中的日记过滤器`tracing` EnvFilter: `info`, `debug,sqlx=warn`. 阅读时没有它`RUST_LOG`. |
| `RUST_LOG` (中文(简体) ). | `extraEnv` (中文(简体) ). | — | 信封过滤器 | 无 | **如果未指定`CC_LOG`,则仅限环境。** 平面日志过滤器。 |
| `OTEL_EXPORTER_OTLP_ENDPOINT` (中文(简体) ). | `extraEnv` (中文(简体) ). | 未预测 | URL (中文(简体) ). | 无 | ** 仅指环境。** 包括OpenTeleometry追踪出口(OTLPHTTP/protobuf),例如`http://otel-collector:4318`. 标准变量`OTEL_*`被使用. Spans只包含未分类的字段(request_id,路由,状态,用户UUID和设备). |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` (中文(简体) ). | `extraEnv` (中文(简体) ). | 未预测 | URL (中文(简体) ). | 无 | ** 仅限环境。** 同一、单独地址仅限追踪。 |

## 数据维护和储存

通道服务删除过时的服务记录. 一时成行.
一次备注(咨询锁). 储存期 - 天数,`0` - 储存
永远,不超过36,500美元。 服务器不提供备份副本:使用
`pg_dump`至 [HOSTING.md](HOSTING.md)

| 变量 | 赫尔姆。 | 以默认. | 含义 | 秘诀. | 他在干吗? |
|---|---|---|---|---|---|
| `CC_MAINTENANCE_INTERVAL_SECS` (中文(简体) ). | `config.maintenance.intervalSecs` (中文(简体) ). | `3600` | 秒,`0`关闭。 | 无 | `0` - 关闭。 |
| `CC_RETENTION_SESSION_DAYS` (中文(简体) ). | `config.maintenance.retention.sessionDays` (中文(简体) ). | `7` | 0–36500`0`— 永远 | 无 | 需要多少时间来回顾和过期的届会? |
| `CC_RETENTION_SYNC_MUTATION_DAYS` (中文(简体) ). | `config.maintenance.retention.syncMutationDays` (中文(简体) ). | `30` | 0–36500`0`— 永远 | 无 | 被接受同步变化的同位素记录. |
| `CC_RETENTION_AUDIT_DAYS` (中文(简体) ). | `config.maintenance.retention.auditDays` (中文(简体) ). | `365` | 0–36500`0`— 永远 | 无 | 审计日记`audit_events`. |
| `CC_RETENTION_DELETED_VAULT_DAYS` (中文(简体) ). | `config.maintenance.retention.deletedVaultDays` (中文(简体) ). | `30` | 0–36500`0`— 永远 | 无 | 在远程存储的密码文本被删除了多少天之后 。 |
| `CC_RETENTION_DEVICE_REQUEST_DAYS` (中文(简体) ). | `config.maintenance.retention.deviceRequestDays` (中文(简体) ). | `90` | 0–36500`0`— 永远 | 无 | 已解决和过期的设备信任请求 。 |

## 服务变量

| 变量 | 何处 | 他在干吗? |
|---|---|---|
| `CC_CONFIG_FILE` (中文(简体) ). | 周围环境 | 通往私密JSON设置文件的路径,如果不转发`--config` . 文件:普通,最高64 KiB,一个JSON有已知密钥和字符串值的对象,在Unix - 权利`0600`或`0400`上. 未在当前目录中搜索,未执行, `$` 和命令不被替换 。 |

示例变量Docker Compose由Compose读取,而不是由服务器读取:

| 变量 | 他在干吗? |
|---|---|
| `CC_SERVER_VERSION` (中文(简体) ). | 图片版 `ghcr.io/evsikovas/consolecrypt-server:<версия>`. |
| `CC_SERVER_IMAGE` (中文(简体) ). | 完全引用图像而不是版本,例如与`@sha256:`文摘. |
| `CC_DOMAIN` (中文(简体) ). | 凯迪被认证的域 。 |
| `CC_HTTP_PORT` (中文(简体) ). | API端口为`127.0.0.1`主机(默认`8080`). |
| `CC_POSTGRES_ADMIN_PASSWORD` (中文(简体) ). | 数据库容器中的管理员密码PostgreSQL(创建于`init-config.py`). |
| `CC_POSTGRES_PASSWORD`, `CC_METRICS_PORT` (中文(简体) ). | 只用于开发`server/docker-compose.yml`:主机上的内置数据库密码和端口度量衡. |

## 署长小组

命令由同一配置的二进制文件运行.
`--config`—全球旗帜: 'docker compose... exec – T 服务器
/usr/local/bin/consolecrypt-server admin...` или ` 执行部署
/usr/local/bin/consolecrypt-server 管理员. 他们不让你访问内容。
保险库。

| 团队团队. | 他在干吗? |
|---|---|
| `serve` (中文(简体) ). | 启动服务器( 默认) 。 |
| `migrate` (中文(简体) ). | 应用迁移而出. |
| `healthcheck` (中文(简体) ). | 请检查access-date=中的日期值 (帮助) 本地收听者`/readyz`; 代码0已准备好. |
| `admin list-users` (中文(简体) ). | 账号:状态,登录方法`password`,`oidc`,`ldap`,地址确认,装置数量和存储设施. |
| `admin verify-email --email …` (中文(简体) ). | 标记确认的地址(没有邮件的服务器) 。 |
| `admin reset-token --email …` (中文(简体) ). | 打印一次性密码重置代码(term -`CC_PASSWORD_RESET_TTL_SECS`). |
| `admin set-password --email … --password-stdin` (中文(简体) ). | 从stdin第一行设置一个密码;所有会话结束 。 |
| `admin disable-user --email …`/`admin enable-user --email …` (中文(简体) ). | 退出会话时禁用账户 / 启用再次 。 |
| `admin session revoke --email …` (中文(简体) ). | 完成账户的所有会议。 |
| `admin rotate-epoch --all`/`--vault <id>` (中文(简体) ). | 从副本中恢复基数后:改变存储时代,让顾客注意到回滚. |
| `admin limits show [--email …]` (中文(简体) ). | 现有限制和配额(服务器或账户) |
| `admin limits set --email … ключ=значение…` (中文(简体) ). | 超过账户限额和配额;有效期不晚于30秒. |
| `admin limits reset --email … [ключ…]` (中文(简体) ). | 删除过度定义( 全部没有密钥) 。 |
| `admin auth status` (中文(简体) ). | 登录模式, 提供者, 上次 IDP/ catalog 检查, 链接账户 。 |
| `admin auth test [--login … [--password-stdin]]` (中文(简体) ). | 重复发射检查; c `--login` – 找到LDAP用户(与 `--password-stdin` – 真正的绑定) 或在IDP中重新检查OIDC账户. |
| `admin identity link --email … --subject … [--issuer …]` (中文(简体) ). | 将账户附加到OIDC`sub`或`objectGUID`中;账户密码删除,会话终止. |
| `admin identity unlink --email … [--subject …]` (中文(简体) ). | 删除账户附件( 或一个) 。 |

---

可选设置 `CC_MONITORING_PRESERVATION_MINIMUM` 允许管理员为个人保险库设置同步提供最低客户端版本要求。默认关闭。请填写已发布的稳定版本，并启用请求签名。
