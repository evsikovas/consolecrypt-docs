# 企业模式:通过IDP(OIDC)或活动目录(LDAP)签名

参考文档译文 · [俄文原文](../ENTERPRISE.md)

网站内容相同: [корпоративный вход — рецепты](https://consolecrypt.dev/guide#server-idp).
> 网站内容相同:[corporate sign-in recipes](https://consolecrypt.dev/guide#server-idp).

从服务器**0.2.0**(protocol**1.9**)开始,同步服务器有两个模式.
登录账户 :

- ** 标准**(与以前一样) -通过电子邮件和密码登记和登录
  账户、邮件确认、密码重置;
- ** 企业** -- -- 仅通过公司账户来源登录:
  OpenID 连接 IdP (Entra ID, AD FS, Keycloak, Google 工作空间, Okta)
  OIDC)或活动目录/LDAP(域登录和密码).

更改** 仅在同步服务器上登录账户的方式** 。 仓库,
加密、设备、新设备的登录保护、共享和
各队如前而后效. 同步目录、组、角色、 SCIM 和
没有管理员。 Mode是开放服务器的一部分,没有单独的构建或许可证.
用户需要客户端0.9.0或更高.

内容:[как это работает](#как-это-работает)
[что нужно серверу](#что-нужно-серверу-от-idp) (中文(简体) ).
[конфигурация](#конфигурация) (中文(简体) ).
[рецепты IdP](#рецепты-oidc) (中文(简体) ).
[Active Directory](#active-directory-и-ldap) (中文(简体) ).
[первый вход и привязка](#первый-вход-и-привязка-аккаунтов) (中文(简体) ).
[команды](#проверка-при-старте-и-команды-администратора) (中文(简体) ).
[развёртывание](#развёртывание) (中文(简体) ).
[ошибки](#диагностика-ошибок) (中文(简体) ).
[возврат в standard](#возврат-в-режим-standard) (中文(简体) ).
[English](#english) (中文(简体) ).

包含 Helm 路径和检查的所有密钥的完整目录
[CONFIGURATION.md](../CONFIGURATION.md#enterprise-вход-cc_auth_-cc_oidc_-cc_ldap_) (中文(简体) ).

## 什么不变:加密

账户密码(而现在为 IDP 或 AD )只证明身份
服务器。 数据打开存储密码( 客户端上的Argon2id), 恢复密钥
或批准可信任的设备:

- 无论是IDP,AD,还是服务器都得不到任何可以解密的东西.
- 在通过 IDP/AD 登录后, 设备是普通的新设备: 规则适用
  防止从新设备登录(检疫、限制密码发放)
  信封、信件(如果包括`CC_DEVICE_PROTECTION_ENABLED`)和配置的邮件;
- 机载存储(存储密码+回收套件)和连接第二个
  装置不变.

## 如何是通义.

**OIDC.** 服务器是一个机密的IDP客户端,应用程序是一个公共客户端
两个站点的服务器PKCE(S256):

1. 应用程序打开系统浏览器
   `GET /v1/auth/oidc/start?redirect_uri&code_challenge&state&device_id&login_hint` (中文(简体) ).
2. 服务器记得输入时间为10分钟,并用自己的`state`重定向到IDP. .
   `nonce`和PKCE. (中文(简体) ).
3. IdP 返回浏览器到 `https://<сервер>/v1/auth/oidc/callback`. server
   交换码,检查身份证(通过JWKS准确签署RS256/PS256/ES/256/ES/256).
   `iss`,`aud`,`azp`,`exp`,`iat`,`nonce`,容忍小时60秒),域名,
   集团和外交部找到或创建账户。
4. 浏览器以一次性`login_code`返回应用程序(60秒).
   与应用程序和设备的PKCE绑定,应用程序收到通常的符号.

允许返回应用程序地址:`http://127.0.0.1:{порт}/auth/callback`
`http://[::1]:{порт}/auth/callback`(桌面)和`consolecrypt://auth/callback`
Android, iOS (中文(简体) ). 我们其余的人正在拒绝。 因特网登记员登记册**仅**** 地址。
服务器 `/v1/auth/oidc/callback`, 不需要 IDP 中的应用程序地址 。

** LDAP/AD.** 应用程序发送一个登录(电子邮件、UPN或`DOMAIN\user`)和一个密码。
域名 at `POST /v1/auth/ldap/login` on TLS. 服务器正在寻找服务用户
然后绑定用输入的密码来完成它的DN. 未保存密码
不是在杂志上 答案“无用户”和“密码不正确”相同。

** 账户具有约束力。** 与外部标识符有关的账户 -- -- 税务信息中心`(iss, sub)`
或`objectGUID`在AD. 电子邮件只是属性: 更改 AD 中的地址不会打破您的账户 。
同一邮件的第三方账户没有被捕获`identity_conflict`.

** 重新检查(已断开联系的雇员)** 连续检查次数不超过一次
`CC_AUTH_RECHECK_MINUTES` 服务器要求一个 IDP( 更新刷新符号 IDP) 或
AD(搜索由`objectGUID`),用户能否工作. 试曰.
每分钟更新一个符号应用程序和背景段落,用于账户
正在开会。 如果用户被禁用,删除, 离开组或丢失
强制索赔,其所有开庭均被撤回,申请收到
`account_disabled`并屏蔽同步剖面. 断线员工
不晚于`CC_AUTH_RECHECK_MINUTES`+1失去同步访问
等一会 如果无法提供 IDP 或 AD ,会话将持续到
`CC_AUTH_RECHECK_GRACE_HOURS` 上次成功检查后;进一步更新
令牌回应`503 idp_unavailable`(没有召回),直到来源返回.

## 服务器需要的 IDP

对于任何OIDC供应商,编写:

| 什麽? | 意为. | 密钥 |
|---|---|---|
| 服务器的公开地址 | `https://sync.acme.com`(在客户端输入的,没有`/v1`). | `CC_PUBLIC_URL` (中文(简体) ). |
| 在 IDP 中重定向 URI | `https://sync.acme.com/v1/auth/oidc/callback`—按文号`CC_PUBLIC_URL`+`/v1/auth/oidc/callback`,客户端类型"Web"/ 机密 | — |
| 发行人 | 完全如`https://<issuer>/.well-known/openid-configuration`(外地`issuer`),有或没有完成`/`——如IdP) | `CC_OIDC_ISSUER` (中文(简体) ). |
| 客户身份 | 已注册应用程序的标识符 | `CC_OIDC_CLIENT_ID` (中文(简体) ). |
| 秘密客户端 | 机密文件; 认证 `client_secret_basic` 或 `client_secret_post` | `CC_OIDC_CLIENT_SECRET_FILE`, `CC_OIDC_TOKEN_AUTH_METHOD` (中文(简体) ). |
| 密钥加密刷新令牌 | 32 随机字节文件 `openssl rand -hex 32` | `CC_OIDC_TOKEN_KEY_FILE` (中文(简体) ). |
| 补助金类型 | 使用 PKCE S256 的授权代码和刷新托肯 | — |
| 范围 | `openid email profile offline_access` (预科有其自己的含义). | `CC_OIDC_SCOPES` (中文(简体) ). |
| 以**ID 代号提出的索赔** | `sub`;邮件地址`email`,`preferred_username`或`upn`,用于限制进入`groups`或`roles`,用于外交部`amr`/`acr` | `CC_OIDC_EMAIL_CLAIM`, `CC_OIDC_REQUIRED_CLAIM`, `CC_OIDC_REQUIRE_MFA` (中文(简体) ). |

IdP要求服务器在启动时检查: 由HTTPS发现
巧合`issuer`,`authorization_endpoint`,`token_endpoint`和`jwks_uri`
HTTPS,JWKS中至少一个RS256/PS256/ES/256/ES/256键,如果IdP列表
PKCE方法,支持S256. 服务器只读取ID 符号上的债权( 用户信息不会读取债权) 。
因此,必须把团体、角色和邮件包括在身份证上。

** 重新检查残疾雇员时使用IDP*。 如果IdP是他的的话
用户只需再次通过 IDP 登录
`CC_AUTH_RECHECK_GRACE_HOURS`; `admin auth test --login <email>` 本案中.
报告`no IdP refresh token stored (request offline access)`.

## 配置

和其他设置一样:变量`CC_*`,私有JSON文件`--config`,或
赫尔姆(区块`auth:`). 秘密 -** 仅文件** Kubernetes 秘密, Docker
secret,带有0600权利的文件;它们不包含在日志中. 如何把钥匙放进去
Docker Compose,赫尔姆和系统化于[HOSTING.md](../HOSTING.md#как-задать-любой-параметр).

### 常见密钥

| 密钥 | 以默认. | 任命 |
|---|---|---|
| `CC_AUTH_MODE` (中文(简体) ). | `standard` (中文(简体) ). | `standard` 或 `enterprise` (中文(简体) ). |
| `CC_AUTH_PROVIDER` (中文(简体) ). | — | `oidc`或`ldap` (仅以企业计) |
| `CC_AUTH_DISPLAY_NAME` (中文(简体) ). | — | 应用程序中“ Loginthrough...” 按钮的签名, 最多64个字符 |
| `CC_AUTH_ALLOWED_DOMAINS` (中文(简体) ). | - (任何东西) | 通过逗号可接受电子邮件域; 自动链接现有账户的要求 |
| `CC_AUTH_AUTO_CREATE` (中文(简体) ). | `true` (中文(简体) ). | 第一个登录时创建账户 |
| `CC_AUTH_RECHECK_MINUTES` (中文(简体) ). | `15` | 重新检查用户的次数(1-1440次) |
| `CC_AUTH_RECHECK_GRACE_HOURS` (中文(简体) ). | `24` | 有多少会话与无法使用的 IDP/AD( 0 - 720) |
| `CC_PUBLIC_URL` (中文(简体) ). | — | OIDC强制地址`https://…`: IdP返回地址 |

### 奥伊德科组织(OIDC)

| 密钥 | 任命 |
|---|---|
| `CC_OIDC_PRESET` (中文(简体) ). | `generic`, `entra`, `adfs`, `keycloak`, `google`, `okta` (中文(简体) ). |
| `CC_OIDC_ISSUER` (中文(简体) ). | 准确的发行者(如果 IDP不写则结尾没有额外`/` ) |
| `CC_OIDC_CLIENT_ID` (中文(简体) ). | IDP 中的应用程序标识符 |
| `CC_OIDC_CLIENT_SECRET_FILE` (中文(简体) ). | 客户机密 |
| `CC_OIDC_TOKEN_KEY_FILE` (中文(简体) ). | 带有32字节加密密钥刷新令牌 IDP `openssl rand -hex 32` 的文件 |
| `CC_OIDC_SCOPES` (中文(简体) ). | 默认 `openid email profile offline_access`(adfs:`openid email profile allatclaims`,google:`openid email profile`) |
| `CC_OIDC_EMAIL_CLAIM` (中文(简体) ). | 默认`email`( 二次: `preferred_username`, adfs:`upn` |
| `CC_OIDC_REQUIRED_CLAIM` (中文(简体) ). | `claim=значение` :只使用此组/ 作用,例如 `groups=<object-id>` ;一个匹配元素足够一个数组 。 |
| `CC_OIDC_REQUIRE_MFA` (中文(简体) ). | `true`:需求`mfa`(或`http://schemas.microsoft.com/claims/multipleauthn`)在`amr`或`CC_OIDC_MFA_ACR_VALUES`之一在`acr`. |
| `CC_OIDC_MFA_ACR_VALUES` (中文(简体) ). | 数值`acr`,被视为多要素值 |
| `CC_OIDC_TOKEN_AUTH_METHOD` (中文(简体) ). | `client_secret_basic`(违约)或`client_secret_post` |
| `CC_OIDC_CA_FILE` (中文(简体) ). | 额外的 IDP 根证书( 内部 CA) |

预设替换默认值并检查起始时的典型错误 :
禁止进入`/common`、`/organizations`和`/consumers`(需要租户身份证)。
对于AD FS发行商,应以`/adfs`结束,对于Keycloak - 包含
`/realms/`,Google`CC_AUTH_ALLOWED_DOMAINS`和`hd`需要的ID代号
应将其列入这一清单(否则,任何谷歌账户都将包括在内)。

刷新符号 IDP 仅用加密密钥存储于数据库( Cha20- Poly1305)
从`CC_OIDC_TOKEN_KEY_FILE`.

### LDAP / 活动目录

| 密钥 | 以默认. | 任命 |
|---|---|---|
| `CC_LDAP_URL` (中文(简体) ). | — | `ldaps://dc1.acme.local:636`; `ldap://` - 仅与`CC_LDAP_STARTTLS=true` |
| `CC_LDAP_STARTTLS` (中文(简体) ). | `false` (中文(简体) ). | `ldap://`的STARTLS |
| `CC_LDAP_CA_FILE` (中文(简体) ). | 根号 | 根域证书( PEM) |
| `CC_LDAP_BIND_DN` (中文(简体) ). | — | 例如服务会计`CN=svc-consolecrypt,OU=Service,DC=acme,DC=local` |
| `CC_LDAP_BIND_PASSWORD_FILE` (中文(简体) ). | — | 日志文件 |
| `CC_LDAP_BASE_DN` (中文(简体) ). | — | 例如,何处搜索用户`DC=acme,DC=local` |
| `CC_LDAP_USER_FILTER` (中文(简体) ). | `(和(对象分类=用户)\)|(邮件={login}(用户主名={login}(sAMAccountName={login})) | 搜索; RFC 4515 的输入屏蔽 |
| `CC_LDAP_EMAIL_ATTR` (中文(简体) ). | `mail` (中文(简体) ). | 电子邮件 |
| `CC_LDAP_ID_ATTR` (中文(简体) ). | `objectGUID` (中文(简体) ). | 稳定身份 |
| `CC_LDAP_REQUIRED_GROUP` (中文(简体) ). | — | DN组;巢组数`LDAP_MATCHING_RULE_IN_CHAIN` |
| `CC_LDAP_TIMEOUT_SECS` (中文(简体) ). | `10` | 连接和运行的超时(1-60) |
| `CC_LDAP_MAX_FAILURES` (中文(简体) ). | `3` | 尝试登录和在窗口外使用自动启动( 1 - 100, 见下文) |
| `CC_LDAP_FAILURE_WINDOW_MINUTES` (中文(简体) ). | `15` | 未成功入口柜台的窗口(1-1440) |
| `CC_LDAP_MAX_FAILURES_PER_IP` (中文(简体) ). | `30` | 每个窗口一个IP的不成功输入( 0 - 不受限制) |

## OIDC 食谱

在所有食谱中,服务器在`https://sync.acme.com`上可用,在 IDP - 中重定向 URI
`https://sync.acme.com/v1/auth/oidc/callback` (替换自己的`CC_PUBLIC_URL`).
首先,准备秘密文件:

```sh
install -d -m 700 /etc/consolecrypt/secrets
( umask 077
  openssl rand -hex 32 > /etc/consolecrypt/secrets/oidc-token-key
  # client secret из IdP, без перевода строки и без отображения на экране:
  read -rs CC_SECRET && printf '%s' "$CC_SECRET" > /etc/consolecrypt/secrets/oidc-client-secret
  unset CC_SECRET )
```

文件的所有者必须是服务器进程的用户(在容器中 -)
UID 65532,参见[развёртывание](#развёртывание). 钥匙`oidc-token-key`不变
不必要的:当您更改密钥时, 保存的刷新符号 IDPs 变为
无法读取, 用户再次登录 。 许多 IDP 的客户端秘密
过期 : 发出提醒,在替换和替换时更新文件 。
重新启动服务器 。

所有食谱的一套通用密钥 :

```dotenv
CC_AUTH_MODE=enterprise
CC_AUTH_PROVIDER=oidc
CC_AUTH_DISPLAY_NAME=Acme SSO
CC_AUTH_ALLOWED_DOMAINS=acme.com
CC_PUBLIC_URL=https://sync.acme.com
CC_OIDC_CLIENT_SECRET_FILE=/etc/consolecrypt/secrets/oidc-client-secret
CC_OIDC_TOKEN_KEY_FILE=/etc/consolecrypt/secrets/oidc-token-key
```

### 微软 Entra ID

1. Microsoft Entra 行政中心 →**App 注册 →新注册**
   QQ“ ConsoleCrypt Sync” ,**本组织目录中的账户**
   (单一租户),Rediction URI(平台**Web**)
   `https://sync.acme.com/v1/auth/oidc/callback` (中文(简体) ). 不选择 SPA 平台或
   移动和桌面:服务器是一个保密客户端.
2. ** 概览**,副本** 申请(客户)ID**
   `CC_OIDC_CLIENT_ID`和** 董事(租户) ID** —— 发行人
   `https://login.microsoftonline.com/<tenant-id>/v2.0` (中文(简体) ).
3. ** 证书和机密_客户机密_新客户机密**
   (不是秘密ID) 保存到文件 `oidc-client-secret` . 记得寿终之日.
4. ** API权限**:微软图表,授权`openid`,`email`,`profile`
   `offline_access` (中文(简体) ). 按** 行政部门同意** 防止雇员看到
   请求同意。
5. ** 默认情况下,插入可选索赔要求* `email`**。
   预设使用`preferred_username`(通常为UPN)作为电子邮件. 如果UPN没有
   与邮件地址相同,请问`CC_OIDC_EMAIL_CLAIM=email`
   用户必须填写在邮件属性中.
6. 只有一个选择:
   - ** App 角色**(建议):** App 角色** 创建 App 角色**,允许成员
     types — Users/Groups, Value `ConsoleCrypt.User`; затем **Enterprise
     applications → ConsoleCrypt Sync → Users and groups → Add user/group** и
     назначьте роль группе. На сервере `CC_OIDC_REQUIRED_CLAIM=roles=ConsoleCrypt.User`;
   - ** 集团索赔**:** Token配置 → 添加集团索赔 → 安全集团**,
     в ID token — **Group ID**; на сервере
     `CC_OIDC_REQUIRED_CLAIM=groups=<object-id группы>`. Если пользователь состоит
     более чем в 200 группах, Entra не кладёт `groups` в токен (overage), сервер
     пишет об этом предупреждение в журнал — используйте app roles или «Groups
     assigned to the application».
   启用** 企业应用程序 → 属性 → 指派
   要求=是**:然后,Entra不会向未指定的用户发出指示牌。
7. 外交部:要求这一政策**为本应用程序提供有条件的准入**。
   `CC_OIDC_REQUIRE_MFA=true` 身份证代号的进一步检查`amr`/`acr`;
   只有在测试输入通过时才能打开 -除非 IDP 通知
   输入法,所有输入都会收到`mfa_required`.

```dotenv
CC_OIDC_PRESET=entra
CC_OIDC_ISSUER=https://login.microsoftonline.com/<tenant-id>/v2.0
CC_OIDC_CLIENT_ID=<application-client-id>
CC_OIDC_REQUIRED_CLAIM=roles=ConsoleCrypt.User
```

发行商`/common`,`/organizations`和`/consumers`预设拒绝:需要租户代号.
Entra 中已禁用的用户无法更新刷新令牌, 服务器
在最近的复选时退出会话。

### AD FS 2016年+ 数据

1. ADFS 管理 →** 应用程序组 → 添加应用程序组
   服务器应用程序**(或"访问网络应用程序的网页浏览器")
   保密客户)。 复制客户端标识符`CC_OIDC_CLIENT_ID` .
   重新定向URI - `https://sync.acme.com/v1/auth/oidc/callback`.
2. ** 配置应用程序 证书 – 生成一个共享的秘密**
   `oidc-client-secret` (中文(简体) ).
3. 添加到组**Web API** 并带有标识符 = 客户端 id 服务器, 策略
   access(例如“permit 特定组”)、权限`openid`、`profile`,
   `email`, `allatclaims` (中文(简体) ).
4. 为网络API发布变换规则:将 LDAP 属性作为索赔发送
   `E-Mail-Addresses → email`, `User-Principal-Name → upn`;对于集体访问 -
   "将集团成员作为债权"(如`group`=`ConsoleCrypt`)
   要求范围`allatclaims`将这些索赔写在身份证上。
5. 如果 AD FS 证书是由内部 CA 签发的,请将根证书(PEM)放入.
   c`CC_OIDC_CA_FILE`. (中文(简体) ).
6. 发行人 - `https://adfs.acme.com/adfs`:检查字段 `issuer` in
   `https://adfs.acme.com/adfs/.well-known/openid-configuration` (中文(简体) ).

```dotenv
CC_OIDC_PRESET=adfs
CC_OIDC_ISSUER=https://adfs.acme.com/adfs
CC_OIDC_CLIENT_ID=<client-id>
CC_OIDC_EMAIL_CLAIM=upn
CC_OIDC_REQUIRED_CLAIM=group=ConsoleCrypt
CC_OIDC_CA_FILE=/etc/consolecrypt/secrets/adfs-ca.pem
# CC_OIDC_TOKEN_AUTH_METHOD=client_secret_post   # если AD FS отклоняет Basic
```

ADFS在`amr`中将外交部报告为`http://schemas.microsoft.com/claims/multipleauthn`.;
`CC_OIDC_REQUIRE_MFA=true`理解这一点.

### 键盘

1. 选择域(如 `acme` ) →** 客户端 → 创建客户端**: OpenID
   连接,客户端ID`consolecrypt-server`,** 客户端认证:On**,
   标准流量:On,直接接入赠款:Off.
2. ** Valid 重定向铀RIs:`https://sync.acme.com/v1/auth/oidc/callback`
   ** 高级编码交换码质疑方法的证明钥匙:S/256**
3. ** 证书** – 客户秘密 –在文档中.
4. 电子邮件:客户端范围`email`和`profile`必须是客户端的默认.
   Keycloak 传输`email_verified` :如果地址未确认, 则现有地址 。
   您的密码账户不会自动链接`email_not_verified` 。
5. 组:** 亮度瞄准镜 → 控制台-服务器专用瞄准镜 → 添加映射器 → 由
   成员**、Token索赔名称`groups`、**全组
   路径: Off**(否则值将是`/consolecrypt-users`),添加到ID符号:On.
   后来`CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users`. 而不是一个团体,
   使用客户端角色和映射器"用户客户端角色".
6. 用户在** 用户 → 启用: 关闭** - 其刷新令牌中禁用
   它停止工作,服务器在最近的重新检查时取消会话.

```dotenv
CC_OIDC_PRESET=keycloak
CC_OIDC_ISSUER=https://sso.acme.com/realms/acme
CC_OIDC_CLIENT_ID=consolecrypt-server
CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users
```

### 谷歌工作空间

1. Google 云控台 →** APIs& Services → OAuth
   同意屏幕**:用户类型**Internal**(仅限您的用户)
   组织),范围`openid`,`email`,`profile`.
2. ** 证书 / 创建证书 / OAuth 客户端 ID / 网络应用程序**,
   授权重定向铀RI`https://sync.acme.com/v1/auth/oidc/callback` .
   客户ID → `CC_OIDC_CLIENT_ID` 和客户机密在文件中.
3. 发行商无需指定`https://accounts.google.com`. 预设求之.
   离线访问`access_type=offline`,`prompt=consent` ; `offline_access`
   `CC_OIDC_SCOPES` Google拒绝,服务器不会与之运行.
4. `CC_AUTH_ALLOWED_DOMAINS`是强制性的:服务器只接受工作空间账户.
   `hd`身份证号码在名单上。 拥有“公司”的个人Google账户
   地址`hd` 是不和不会输入的 。
5. Google不将组和 MFA 传输到 ID 令牌: 限制用户数量
   与管理员控制台连接的应用程序, 2- Step 校验启用策略
   工作空间. `CC_OIDC_REQUIRE_MFA=true`Google服务器将不接受.

```dotenv
CC_OIDC_PRESET=google
CC_AUTH_ALLOWED_DOMAINS=acme.com
CC_OIDC_CLIENT_ID=<client-id>.apps.googleusercontent.com
```

### 大冈

1. 管理控制台 →** 应用程序 → 创建 App 集成 → OIDC - OpenID
   连接 – Web 应用程序**. 赠款类型:授权代码和**新鲜托肯**。
   登录重定向URI`https://sync.acme.com/v1/auth/oidc/callback`
2. ** 客户身份认证:客户秘密**,** 要求PKCE作为额外
   包括核查**。 客户身份和秘密 -在`CC_OIDC_CLIENT_ID`和档案。
3. ** 指派**:将申请分配给小组。 以身份证表示的索赔组:
   ** OpenID Connect ID Token上的签名 – Groups claim** - 名称`groups`
   matches regex `ConsoleCrypt.*`(内部授权服务器索赔)
   `groups` 添加到**Security → API → 授权服务器 → 索赔**.
4. 发行者(org域名`https://acme.okta.com`)或授权服务器
   `https://acme.okta.com/oauth2/default`);它必须与`issuer`完全相同.
   在发现。 对于`offline_access`您自己的授权服务器范围
   应当通过准入政策予以允许。

```dotenv
CC_OIDC_PRESET=okta
CC_OIDC_ISSUER=https://acme.okta.com
CC_OIDC_CLIENT_ID=<client-id>
CC_OIDC_REQUIRED_CLAIM=groups=ConsoleCrypt-Users
```

### 任何其他 OIDC 供应商

使用 `CC_OIDC_PRESET=generic` (默认值). 看看这个。

1. 客户端— 保密, 授权代码 + PKCE S256, 刷新托肯
   重定向URI`https://sync.acme.com/v1/auth/oidc/callback` .
2. 身份证代号为RS256、PS256或ES256,包含`sub`
   `email`或其他索赔 - `CC_OIDC_EMAIL_CLAIM`,必要时,索赔
   用于`CC_OIDC_REQUIRED_CLAIM`的组合。
3. 发现`<issuer>/.well-known/openid-configuration`可以在服务器上找到.
   HTTPS(内部CA - `CC_OIDC_CA_FILE`),他的`issuer`在象征上等于
   `CC_OIDC_ISSUER` (中文(简体) ).
4. 如果IdP不接受 Basic 标题中的秘密,请问
   `CC_OIDC_TOKEN_AUTH_METHOD=client_secret_post` (中文(简体) ).
5. 对外交部来说,请查一下哪些`amr`或`acr`IdP用ID代号写;非标准
   在`CC_OIDC_MFA_ACR_VALUES`中列出数值`acr`。

```dotenv
CC_OIDC_PRESET=generic
CC_OIDC_ISSUER=https://idp.acme.com
CC_OIDC_CLIENT_ID=consolecrypt-server
CC_OIDC_SCOPES=openid email profile offline_access
CC_OIDC_REQUIRED_CLAIM=groups=consolecrypt-users
```

## 活动目录和 LDAP

1. ** 服务会计**有最低权利:普通域用户
   可以阅读目录,不需要行政权. 无名密码
   动作( 或您的交换程序: 更新文件并重新启动服务器) :

   ```powershell
   New-ADUser -Name svc-consolecrypt -Path "OU=Service,DC=acme,DC=local" `
     -AccountPassword (Read-Host -AsSecureString) -Enabled $true -PasswordNeverExpires $true
   ```

   文件密码`ldap-bind-password`和DN文件密码`CC_LDAP_BIND_DN`.
2. **LDAPS**:域控制器必须持有证书(AD CS"域")
   控制器或Kerberos认证。 导出 CA 根证书
   在PEM中 - `CC_LDAP_CA_FILE` (英语). The name in `CC_LDAP_URL` must be the same as the name in
   控制器证书( DNS 名称, 而非 IP) 。 您可以从主机检查链条
   服务器:`openssl s_client -connect dc1.acme.local:636 -CAfile ad-ca.pem </dev/null`
   (预期`Verify return code: 0 (ok)`. 如果只有389号港口可用的话
   使用`ldap://dc1.acme.local:389`和`CC_LDAP_STARTTLS=true`;简单
   `ldap://`没有TLS,服务器将不接受.
3. **Search filter**:默认用户位于`mail`.
   `userPrincipalName`或`sAMAccountName`,所以您可以输入电子邮件,UPN或
   `ACME\alice` (中文(简体) ). 如果搜索找到多个条目,则该条目被拒绝. 属于你的。
   过滤器必须包含`{login}`.
4. ** 准入团体,例如`CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local`;
   附录组通过AD规则`LDAP_MATCHING_RULE_IN_CHAIN`进行核算。
   会员资格在入口处和每次重新检查时检查。
5. ** 稳定标识** - `objectGUID`:更改电子邮件、UPN,或
   账户的重命名不会打破约束. `admin identity link`,带他去。
   所以: `(Get-ADUser alice).ObjectGUID` (中文(简体) ). 已断开账户`userAccountControl`
   与旗帜`ACCOUNTDISABLE`在重新检查时不输入或丢失会话 。
6. ** 启动模式前搜索**(请求密码,不是)
   以论据转达:

   ```sh
   ldapsearch -H ldaps://dc1.acme.local:636 -D 'CN=svc-consolecrypt,OU=Service,DC=acme,DC=local' -W \
     -b 'DC=acme,DC=local' '(sAMAccountName=alice)' mail objectGUID userAccountControl
   ```

7. ** 域屏蔽政策**:低于门槛值的设置`CC_LDAP_MAX_FAILURES`
   屏蔽(见下文)。

```dotenv
CC_AUTH_MODE=enterprise
CC_AUTH_PROVIDER=ldap
CC_AUTH_DISPLAY_NAME=ACME
CC_AUTH_ALLOWED_DOMAINS=acme.com
CC_LDAP_URL=ldaps://dc1.acme.local:636
CC_LDAP_CA_FILE=/etc/consolecrypt/secrets/ad-ca.pem
CC_LDAP_BIND_DN=CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
CC_LDAP_BIND_PASSWORD_FILE=/etc/consolecrypt/secrets/ldap-bind-password
CC_LDAP_BASE_DN=DC=acme,DC=local
CC_LDAP_REQUIRED_GROUP=CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
CC_LDAP_MAX_FAILURES=3
CC_LDAP_FAILURE_WINDOW_MINUTES=30
```

简单`ldap://` 启动时不拒绝 SSTATLS 服务器: 域密码不应
以简洁的文字上网。 访问 AD 之前拒绝空密码(否则)
这将是一个匿名约束。

服务器是为Active Directory设计的. 使用另一个 LDAP目录,请询问自己的目录 。
`CC_LDAP_USER_FILTER`,`CC_LDAP_EMAIL_ATTR`和稳定`CC_LDAP_ID_ATTR`
(例如`entryUUID`);检查`CC_LDAP_REQUIRED_GROUP`采用反倾销规则
`LDAP_MATCHING_RULE_IN_CHAIN`,另一个目录可能不支持
请检查access-date=中的日期值 (帮助) 与指挥部`admin auth test --login`.

** 保护反倾销账户不通过服务器封锁。**未成功绑定记在
域屏蔽政策,所以攻击者可以屏蔽员工
通过`/v1/auth/ldap/login` 服务器计数尝试于PostgreSQL (所有人共有)
备注)—在输入的登录和找到的用户AD(不同的拼写)上
一个用户名— 电子邮件, UPN, `DOMAIN\user`— 一起计算:
`CC_LDAP_MAX_FAILURES`企图`CC_LDAP_FAILURE_WINDOW_MINUTES`
拒绝尝试** 而不诉诸反倾销**`429 rate_limited`和`Retry-After`
直到窗户经过。 未知的登录行为方式相同, 存在
用户不披露。 一个成功的入口会降低电表。 分别.
考虑单个IP`CC_LDAP_MAX_FAILURES_PER_IP`输入失败.

>** 重要性:** `CC_LDAP_MAX_FAILURES`应小于会计锁门槛值
> 域政策中的记录(账户锁定阈值),以及
> `CC_LDAP_FAILURE_WINDOW_MINUTES` -不小于锁柜台的窗口重置
>(之后重置账户锁定计数器). 否则,仍然可以登录到服务器中.
> 屏蔽记录. 示例:域阈值 30分钟内5次尝试
>`CC_LDAP_MAX_FAILURES=3`,`CC_LDAP_FAILURE_WINDOW_MINUTES=30` (中文(简体) ).

## 第一次登录和账户链接

每次登录时,服务器对账户的搜索如下:

1. * OIDC的已知账户`(iss, sub)`,LDAP的已知账户`objectGUID`
   登录到链接账户 。 如果 IDP/AD 地址已更改且没有被占用
   有了另一个账户,账户地址就会更新。
2. **新账户和同一地址的账户已经存在**
   在标准模式下建立). 只有在以下情况下才自动链接:
   地址域在`CC_AUTH_ALLOWED_DOMAINS`中;账户尚未有外部
   IdP未报告`email_verified=false`;账户未禁用密码.
   账户被删除, 密码打开的会话被终止, 设备以及
   库房保存完好. 否则,输入收到`409 identity_conflict`,原因如下:
   日记:`linked_to_other_identity`,`link_requires_allowed_domain`或
   `email_not_verified` - 手持领带:

   ```sh
   consolecrypt-server admin identity link --email alice@acme.com --subject <sub или objectGUID>
   ```

   `--subject` - `sub`从用户的ID代号(在Keycloak - ID中)索赔价值
   控制台中的用户, Okta - 用户代号`00u…` ; Entra ID `sub`不
   它与AD的Object ID`oid`或`objectGUID`相同. 未使用`--issuer`
   配置`CC_OIDC_ISSUER` 或基础 DN 。
3. ** 创建一个没有账户的新账户** -- -- 创建一个有已确认账户的账户
   地址,如果`CC_AUTH_AUTO_CREATE=true` 。 在`false`收到输入`403`s
   理由`not_provisioned`:只包括预先设立的账户。
   (以标准模式)或受命令约束`admin identity link`.

没有邮件地址的账户`email_missing`或外部的域名
`CC_AUTH_ALLOWED_DOMAINS` 入口以`403 domain_not_allowed`拒绝.

## 从标准到企业的过渡

1. 将服务器升级到0.2.0或稍后,并备份数据库(迁移)
   `0011_enterprise_auth` 仅增加表格
   `users.password_hash`可选).
2. 在 IDP 中注册应用程序或在 AD (recipes) 中创建服务账户
   在文件/秘密中隐藏秘密。
3. 请检查access-date=中的日期值 (帮助) `admin list-users`. 决定哪个域
   在`CC_AUTH_ALLOWED_DOMAINS`中列出,以允许现有账户
   他们被附身了.
4. 打开`CC_AUTH_MODE=enterprise` 并重新启动服务器 。 检查。
   `admin auth status`,`admin auth test`和`"auth": {"mode": "enterprise", …}`,载于
   `/v1/meta` (中文(简体) ). 支持企业登录的版本更新应用程序
   (客户:0.9.0)
5. 测试登录您的账户并检查`admin list-users`
   (栏`sign_in`.

列入之后:

- 注册、账户密码登录、密码重置和密码更改、邮件确认
  响应`403 enterprise_auth_required` ; 旧的应用程序显示错误
  登录“更新应用程序”文本;
- 切换前密码打开的会话不更新
  `enterprise_auth_required`:用户日志一次通过IDP/AD输入.
- 现有账户按细则链接
  [выше](#первый-вход-и-привязка-аккаунтов) (中文(简体) ).
- 设备及账户存储被保存; 已经保存的设备
  ,如同以前一样,以设备密钥的签名输入。

## 启动时检查和管理员命令

启动时,服务器检查配置, 并用可以理解的错误下降:对于 OIDC,
秘密文件,发现,匹配`issuer`,JWKS与RS256/PS256/ES256/256/ES256/密钥; 3.
用于 LDAP –文件,连接, TLS, 绑定服务会计, 存在基础 DN 和组 。

```sh
consolecrypt-server admin auth status                       # режим, провайдер, последняя проверка, привязанные аккаунты
consolecrypt-server admin auth test                         # повторить проверки при старте
consolecrypt-server admin auth test --login alice@acme.com  # LDAP: найти пользователя, группа, отключён ли
consolecrypt-server admin auth test --login alice@acme.com --password-stdin   # LDAP: пробный bind
consolecrypt-server admin auth test --login alice@acme.com  # OIDC: перепроверить аккаунт в IdP сейчас
consolecrypt-server admin identity link --email alice@acme.com --subject <sub или objectGUID>
consolecrypt-server admin identity unlink --email alice@acme.com
consolecrypt-server admin session revoke --email alice@acme.com
consolecrypt-server admin list-users                        # колонка sign_in: password, oidc, ldap
```

OIDC`admin auth test --login`进行真实的重新检查:如果IDP失败,
账户会话正在撤销。 LDAP`--password-stdin`执行实际装订和
它包含在域屏蔽政策中. 在Docker Compose和Kubernetes小组中
在容器内发射:`cc_组成exec-T服务器'
/usr/local/bin/consocrypt-server 管理员认证状态` или ` kubectl-n 控制台加密
执行部署/溶解-/usr/local/bin/溶解-服务器管理员认证状态'。

## 日刊

在服务器日志中(和`audit_events`)是书面输入`login`,`metadata.method`=
`oidc`/`ldap`),账号创建,主播`identity_linked`/`identity_unlinked`,
有原因的失败`login_failed`,`metadata.reason`: `domain_not_allowed`,
`email_missing`, `group_required`, `mfa_required`, `account_disabled` (中文(简体) ).
`not_provisioned`, `linked_to_other_identity`, `link_requires_allowed_domain` (中文(简体) ).
`email_not_verified`和为不正确的ID令牌 – `iss`, `aud`, `azp`, `exp`.
`iat`,`nbf`,`nonce`,`sub`,`unknown_kid`,`bad_signature`,`unsupported_alg`.
`malformed`,通过重新检查对会议进行审查`enterprise_access_revoked`,以及
管理员。 密码,客户端秘密,令牌和登录代码不落入日志.
度量衡:`cc_enterprise_logins_total{method,result}`
`cc_enterprise_rechecks_total{result}`, `cc_ldap_lockout_guard_total{scope}`, (中文(简体) ).
`cc_oidc_jwks_refetch_total` (中文(简体) ).

## 部署

每种安装方法的完整示例 - in
[HOSTING.md](../HOSTING.md#пример-корпоративный-вход-через-entra-id) (中文(简体) ).

### 赫尔姆。

```yaml
config:
  publicUrl: https://sync.acme.com
auth:
  mode: enterprise
  provider: oidc            # или ldap
  displayName: Acme SSO
  allowedDomains: [acme.com]
  oidc:
    preset: entra
    issuer: https://login.microsoftonline.com/<tenant-id>/v2.0
    clientId: <client-id>
    requiredClaim: roles=ConsoleCrypt.User
    existingSecret: consolecrypt-oidc   # ключи client-secret, token-key
  ldap:
    url: ldaps://dc1.acme.local:636
    bindDn: CN=svc-consolecrypt,OU=Service,DC=acme,DC=local
    baseDn: DC=acme,DC=local
    requiredGroup: CN=ConsoleCrypt,OU=Groups,DC=acme,DC=local
    existingSecret: consolecrypt-ldap   # ключ bind-password; caKey: ca.pem
    caKey: ca.pem
```

```sh
kubectl -n consolecrypt create secret generic consolecrypt-oidc \
  --from-file=client-secret=./oidc-client-secret --from-file=token-key=./oidc-token-key
kubectl -n consolecrypt create secret generic consolecrypt-ldap \
  --from-file=bind-password=./ldap-bind-password --from-file=ca.pem=./ad-ca.pem
```

仅在`/run/secrets/consolecrypt-auth`中安装的密件
`defaultMode: 0440`,群舱 - 65532);图本身替代路径`*_FILE`.
检查强制字段和拒绝字段`ldap://`,没有`starttls: true`和OIDC,没有
`config.publicUrl` 与 `https://` (中文(简体) ). 其余密钥`scopes`,`emailClaim`
`requireMfa`, `mfaAcrValues`, `tokenAuthMethod`, `caKey`, `userFilter` (中文(简体) ).
`emailAttr`, `idAttr`, `timeoutSecs`, `maxFailures`, `failureWindowMinutes` (中文(简体) ).
`maxFailuresPerIp`)在`values.yaml`和[CONFIGURATION.md](CONFIGURATION.md)中描述.

### Docker Compose (中文(简体) ).

主`compose.yaml`从源不改. 设置和秘密
企业模式保留在旁边安装的** 私有目录中
`server.env``$CC_INSTALL_DIR`和[HOSTING.md](../HOSTING.md#docker-compose),而不是
复制存储器 。

1. 保存 OIDC 机密( 或 LDAP 和 CA目录服务登录密码)
   `$CC_INSTALL_DIR/secrets/` (中文(简体) ). 在没有Swarm的情况下将其装为普通文件
   拥有者和主机权限, 服务器工作为 UID 65532 –make文件
   仅供他阅读:

   ```sh
   mkdir -p "$CC_INSTALL_DIR/secrets"
   ( umask 077
     openssl rand -hex 32 > "$CC_INSTALL_DIR/secrets/oidc-token-key"
     # client secret из IdP, без перевода строки:
     read -rs CC_SECRET && printf '%s' "$CC_SECRET" > "$CC_INSTALL_DIR/secrets/oidc-client-secret" )
   sudo chown 65532:65532 "$CC_INSTALL_DIR"/secrets/*
   sudo chmod 0400 "$CC_INSTALL_DIR"/secrets/*
   ```

2. 创建`$CC_INSTALL_DIR/compose.override.yaml`. 指着路.
   ** 绝对**:第一目录中的相对编译计数
   档案,也就是来源。 替换`/home/admin/.config/consolecrypt-docker`
   自己`$CC_INSTALL_DIR`:

   ```yaml
   services:
     server:
       environment:
         CC_PUBLIC_URL: https://sync.acme.com
         CC_AUTH_MODE: enterprise
         CC_AUTH_PROVIDER: oidc
         CC_AUTH_ALLOWED_DOMAINS: acme.com
         CC_OIDC_PRESET: keycloak
         CC_OIDC_ISSUER: https://sso.acme.com/realms/acme
         CC_OIDC_CLIENT_ID: consolecrypt-server
         CC_OIDC_CLIENT_SECRET_FILE: /run/secrets/oidc-client-secret
         CC_OIDC_TOKEN_KEY_FILE: /run/secrets/oidc-token-key
       secrets: [oidc-client-secret, oidc-token-key]
   secrets:
     oidc-client-secret:
       file: /home/admin/.config/consolecrypt-docker/secrets/oidc-client-secret
     oidc-token-key:
       file: /home/admin/.config/consolecrypt-docker/secrets/oidc-token-key
   ```

3. 连接覆盖文件 。 自动, 编曲拾取.
   `compose.override.yaml` 仅来自项目目录,且无`-f`
   `cc_compose`来自HOSTING.md的传输`-f`,所以加上第二个`-f`:

   ```sh
   cc_compose() {
     docker compose --env-file "$CC_INSTALL_DIR/server.env" \
       -f "$CC_COMPOSE_FILE" -f "$CC_INSTALL_DIR/compose.override.yaml" \
       --profile https "$@"
   }
   cc_compose config --quiet
   cc_compose up -d --wait --wait-timeout 180 server
   curl --fail --silent --show-error "$CC_API_ORIGIN/v1/meta" | python3 -m json.tool
   ```

   在`/v1/meta`中应出现`"auth": {"mode": "enterprise", …}`. 检查。
   以命令“ cc_ compine exec- T 服务器/ usr/ local/ bin/ consolecrypt- 服务器配置
   管理认证测试 。 对于 LDAP 而不是 `CC_OIDC_*` 问 `CC_LDAP_*` 和秘密
   `ldap-bind-password``CC_LDAP_BIND_PASSWORD_FILE`,如有必要
   `ldap-ca.pem` `CC_LDAP_CA_FILE` (中文(简体) ).

对其它所有命令使用相同的函数(Update, `admin`).
备份:没有第二个`-f` 编译将重新创建标准中的服务器
模式。

### 二进制

私钥相同JSON`--config /etc/consolecrypt/server.json`,权利
0600)或服务环境中;路径`*_FILE`表示拥有0600权限的文件,
用户自有服务.

## 错误诊断

| 汝等可见. | 理由。 原因。 。 | 怎么办呢? |
|---|---|---|
| 服务器不启动 : `OIDC sign-in requires CC_PUBLIC_URL (https://…)` | 没有`CC_PUBLIC_URL`或不是`https://` | 提供服务器的公开地址;在Helm - `config.publicUrl` |
| `CC_OIDC_ISSUER: Entra ID multi-tenant endpoints … are not allowed` (中文(简体) ). | 与`/common`,`/organizations`或`/consumers`一起发行者 | `https://login.microsoftonline.com/<tenant-id>/v2.0` (中文(简体) ). |
| `CC_OIDC_ISSUER: for adfs expected …/adfs`, `for keycloak expected …/realms/<realm>` (中文(简体) ). | 发行者不符合预设 | 复制`issuer`从发现 IDP |
| `OIDC discovery: issuer mismatch` (中文(简体) ). | `CC_OIDC_ISSUER`与`issuer`在发现中(往往结束`/`)不同. | 象征性地复制该值 |
| `OIDC discovery at …`:查询或证书错误 | 服务器在HTTPS上没有收到一个IDP,或者不信任它的CA. | 检查 DNS, 出入口和代理; 内部 CA – `CC_OIDC_CA_FILE` |
| `… none of RS256, PS256, ES256` 或 `does not support PKCE S256` (中文(简体) ). | IdP 标志,有或无 PKCE 的标志 S256 | 为客户启用RS256/ES256和PKCE S256 |
| `CC_OIDC_CLIENT_SECRET_FILE (…): cannot open the file`/`file is empty` (中文(简体) ). | 不正确的路径, UID 65532没有权限, 空文件 | 检查挂载, `chown 65532:65532`, `chmod 0400`, 内容 |
| `CC_OIDC_TOKEN_KEY_FILE (…): expected 32 random bytes …` (中文(简体) ). | 不是64十六进制,不是基数64 32字节 | `openssl rand -hex 32 > oidc-token-key` (中文(简体) ). |
| `CC_OIDC_PRESET=google requires CC_AUTH_ALLOWED_DOMAINS` (中文(简体) ). | Google没有域名列表. | 询问工作空间域 |
| IDP 显示重定向 URI 错误 | IdP有一个不同的返回地址. | `CC_PUBLIC_URL`+`/v1/auth/oidc/callback`,网络客户端类型. |
| `403 domain_not_allowed` `email_missing` (中文(简体) ). | 外部域名`CC_AUTH_ALLOWED_DOMAINS` 或 ID 符号中没有地址 | 检查`CC_OIDC_EMAIL_CLAIM`(Entra:(`email` vs `preferred_username`)),邮件属性,域列表 |
| `403 group_required` (中文(简体) ). | 没有来自`CC_OIDC_REQUIRED_CLAIM`或集团外用户`CC_LDAP_REQUIRED_GROUP`的索赔 | 将索赔添加到**ID 令牌**, 检查名称( Keycloak: Full group path Off), Entra: 超龄> 200 组 – app 角色 |
| `403 mfa_required` (中文(简体) ). | IdP没有在`amr`/`acr`报告外交部。 | 在综合规划政策中开启外交部;如果非标准`acr`-`CC_OIDC_MFA_ACR_VALUES`;否则关闭`CC_OIDC_REQUIRE_MFA` |
| `409 identity_conflict` (中文(简体) ). | 地址属于与另一个账户相连的账户,或域名未列出,或`email_verified=false` | `admin identity link`/`unlink`;在`CC_AUTH_ALLOWED_DOMAINS`中加入域名. |
| `403`有原因`not_provisioned` | `CC_AUTH_AUTO_CREATE=false`,无账户. | 创建/链接账户或启用自动创建 |
| `503 idp_unavailable` (中文(简体) ). | IdP /目录不再可用`CC_AUTH_RECHECK_GRACE_HOURS` | 恢复访问; `admin auth status` 将显示最新的检查 |
| 员工已断开,但仍同步 | 尚未检查或刷新代号 IDP | 等待`CC_AUTH_RECHECK_MINUTES`+1分钟; `admin session revoke` ; `admin auth test --login` |
| `CC_LDAP_URL: plain ldap:// is refused` (中文(简体) ). | `ldap://`无STARTLS | `ldaps://…:636` 或 `CC_LDAP_STARTTLS=true` (中文(简体) ). |
| `LDAP …: cannot connect (network or TLS certificate problem)` (中文(简体) ). | 网络、 端口、 名称与证书不同, 错误的 CA | 来自证书的 DNS 名称, `CC_LDAP_CA_FILE`, `openssl s_client` |
| `LDAP TLS: no system root certificates found` (中文(简体) ). | 图像缺少根 | 询问`CC_LDAP_CA_FILE` |
| `service account bind rejected (check CC_LDAP_BIND_DN and password)` (中文(简体) ). | 不正确的 DN 或服务登录密码, 注册已禁用 | 检查 DN 、 密码文件而不包含不必要的字符、 会计状况 |
| `LDAP base DN … not found`/`CC_LDAP_REQUIRED_GROUP … not found` (中文(简体) ). | 类型 | 从目录复制 DN |
| `401 invalid_credentials` 密码正确 | 账户已禁用、 被屏蔽、 密码过期或搜索找到多个记录 | 检查 AD; 指定`CC_LDAP_USER_FILTER` 账户 |
| `429 rate_limited`在 LDAP 输入中 | сработала защита от блокировки ( `CC_LDAP_MAX_FAILURES` или `CC_LDAP_MAX_FAILURES_PER_IP` ) | 等待窗口`CC_LDAP_FAILURE_WINDOW_MINUTES`; 检查谁接取密码 |

## 返回到标准模式

** 企业模式中没有紧急密码输入。**如果无法使用IDP或AD,则无法使用。
或配置不正确,首先是`admin auth status`和`admin auth test`. 还有
暂时传人密码:

1. 询问`CC_AUTH_MODE=standard`(Helm – `auth.mode: standard`)并重新启动
   服务器。 密钥`CC_OIDC_*`和`CC_LDAP_*`不能删除.
   反切换是一个键的改变.
2. 链接账户没有密码:用命令设置它
   `admin set-password --email … --password-stdin`(或发布代码)
   `admin reset-token --email …` (中文(简体) ). 您的账户密码仍未打开 。
   保险库。
3. IDP/AD的参考文献得以保留. 当企业号重新启用时,请再次输入
   仅通过 IDP/AD,用户下次登录时密码会被删除.
   永远去除束缚 - `admin identity unlink --email …`

## 应用错误(第1.9号议定书)

| 代码。 | HTTP (中文(简体) ). | 何时 |
|---|---|---|
| `enterprise_auth_required` (中文(简体) ). | 403 | 在企业服务器上重新设置登录/注册/密码字;会话没有绑定 |
| `identity_conflict` (中文(简体) ). | 409 | 电子邮件属于另一个来源的账户或链接需要管理员 |
| `domain_not_allowed` (中文(简体) ). | 403 | 电子邮件域名不在`CC_AUTH_ALLOWED_DOMAINS`或没有电子邮件账户 |
| `group_required` (中文(简体) ). | 403 | 无强制性团体/角色/索偿 |
| `mfa_required` (中文(简体) ). | 403 | IdP没有告诉外交部 |
| `idp_unavailable` (中文(简体) ). | 503 | 无法使用 IDP 或 AD( 以后重复) |
| `account_disabled` (中文(简体) ). | 403 | 记录已禁用;所有会话已撤回 |
| `invalid_credentials` (中文(简体) ). | 401 | 错误的登录/ 密码 AD, 无效的ID符号, 重复或替换`login_code` |
| `rate_limited` (中文(简体) ). | 429 | 尝试限制(包括AD账户防屏蔽) |

协议的细节 - 载于[PROTOCOL_CHANGELOG.md](https://github.com/evsikovas/consolecrypt-server/blob/main/PROTOCOL_CHANGELOG.md).
类型`cc_protocol::enterprise_auth`

---
