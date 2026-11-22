# Android:出版ConsoleCrypt于RuStore.

参考文档译文 · [俄文原文](../ANDROID_RUSTORE.md)

应用程序保存标识符`io.consolecrypt.consolecrypt` 和主集
函数 Android 。 与付款相结合,Push SDK和其他SDKsRuStore
不需要发布:应用程序是免费的,更新由商店自己完成.

## 两个变体Android.

| 选项 | 小蝶队. | 最新情况 |
|---|---|---|
| `direct` | `flutter build apk --release --flavor direct --target-platform android-arm64` | 订阅磁带ConsoleCrypt和APK系统安装器 |
| `rustore` | `flutter build appbundle --release --flavor rustore --target-platform android-arm64` | 仅RuStore |

在`rustore`中,没有决议`REQUEST_INSTALL_PACKAGES`和FileProvider
内建更新. Android - 安装通道被进一步封锁;
磁带检查,APK下载,安装器启动在达特被禁用.
在设置中,仍然是打开RuStore申请卡的按钮.
其他平台和频道`direct`不变.

在商店的校正建筑中,还移除了添加的相机X权限
`RECORD_AUDIO`,`READ_EXTERNAL_STORAGE`和`WRITE_EXTERNAL_STORAGE`. 我们需要相机。
对于QR回收代码的局部扫描,声音会关闭. 档案 KDBX.
通过系统对话框选择备份和用户文档
Android,可以访问选定的URI. 检查现成的APK和AAB禁止所有
4个额外权限,包括内置包安装.

命令Android现在要求明确`--flavor direct`或`--flavor rustore`.
脚本`client/scripts/build-android.sh`自动选择`direct`.

## 第一份出版物的签署

AAB使用两个永久键:

1. ** 应用密钥** 标记商店将安装给用户的APKs.
   它加密的PEPK导出器装入一次RuStore.
2. ** 下载密钥** 由AAB签名。 在(RuStore年),它被上传到公众
   PEM证书. 私人下载密钥仍由开发商负责.

在“应用程序签名 – 下载” 部分中,选择`pepk_out.zip`和
`upload_certificate.pem` 随后,在"Versions"栏目中,下载了署名的AAB.
密码,原始的JKS/PKCS12和文件`*-signing.properties`不下载到控制台.

私人密钥和密码必须存储在单独的受保护备份中.
副本. 它们不能添加到Git,公共文物,截图或CI日志中.
如果丢失了应用程序密钥,则不能仅仅创建新的并延续通常的.
更新已安装的应用程序 。

之前的Android预览APK是与跑者调试密钥签署的. 新设
生产密钥不同:不支持直接更新这样的APK.
在移动到商店之前,保存本地存储的备份副本,
检查回收密码并保存本地文件KDBX. 不删.
单个数据副本以安装新签名。

## 地方议会和签名配置

Gradle从`CC_ANDROID_SIGNING_PROPERTIES`读到路径. 文件格式 :

```properties
storeFile=/absolute/private/path/consolecrypt-upload.jks
storePassword=PRIVATE_VALUE
keyAlias=consolecrypt-upload
keyPassword=PRIVATE_VALUE
```

对于发行版本`rustore`,文件是强制性的:自动替换.
调试密钥被禁止 。 对于 AAB , 指定下载密钥, 用于校验
APK是应用程序密钥 。

脚本`client/scripts/build-android-rustore.sh`使用两个变量.
此类文件的路径:`CC_ANDROID_APP_SIGNING_PROPERTIES`和
`CC_ANDROID_UPLOAD_SIGNING_PROPERTIES` 他用一个号码创建了AAB和APK.
新文件夹`dist/android/rustore-<version>/`中的版本,不出版。
需要通常的Android/Rust项目环境,`ANDROID_HOME`,`JAVA_HOME`
和独有的`CC_BUILD_NUMBER`,超过之前的Android下载.

## GitHub行动

工作流** AndroidRuStore 套件** 被一般的释放构建和保存调用
APK/AAB试验文物`android-rustore`. 从1.1.0开始,没有它,这是常见的.
发行时间不公布. 通常AndroidAPK和RuStore两个包都收到一个.
Android - 集会,但使用不同的更新和签名通道.

对于单独的检查,工作流程可以从分支`main`手动启动,指定
`build_number` 原生代码是从源代码中收集的. 所有平台构建成功后，发布任务会将 APK 和 AAB 附加到 GitHub Release。
要上架 RuStore，请在 RuStore 控制台使用已注册的签名密钥上传版本并提交审核。

必需的仓库密钥 :

- `ANDROID_APP_KEYSTORE_BASE64`:应用程序关键内容的Base64.
- `ANDROID_APP_KEYSTORE_PASSWORD`:此寄存器的密码.
- `ANDROID_UPLOAD_KEYSTORE_BASE64`:下载密钥内容的Base64.
- `ANDROID_UPLOAD_KEYSTORE_PASSWORD`:此寄存器的密码.

默认可选`ANDROID_APP_KEY_ALIAS`和`ANDROID_UPLOAD_KEY_ALIAS`
等值 `consolecrypt-app` 和 `consolecrypt-upload` 。 如果密钥密码不同
从存储密码中指定`ANDROID_APP_KEY_PASSWORD`和
`ANDROID_UPLOAD_KEY_PASSWORD` 使用相同的运行标签和变量
`ANDROID_HOME`/`JAVA_HOME`,现存Android-组装.

密钥被部署到一个私人临时文件夹中;在文件夹任务完成后
渐渐消散. 只有目前的APK/AAB文件夹和校验和都落入了文物中.

## 预装检查

`client/scripts/verify-rustore.py`检查最终档案,而不只是原始档案.
宣言:没有被禁止的许可和调试旗,生产签名
APK, AAB 下载证书, 包ID和版本Code, Bundle 结构,
ARM64有效载荷、许可证和ELF与16 KB页的兼容性。
带有固定SHA-256的官方Google捆绑工具用于检查.

系统和硬件功能保留了通常的限制Android:
设备依赖生物鉴别技术;新的FIDO2和桌面最小化Android
亦不增减. 集会的签字和核查的准备并不意味着批准
在每个物理装置上进行调节或核查。

修改文本 :

已取消权限 要求_INSTALL_ PACKAGES 。 变种RuStore 残疾
>下载APK,并从应用程序中启动系统安装器. 最新情况
> 是通过RuStore进行的。 组装用生产键签名,调试模式禁用.

正式指示:[загрузка AAB](https://www.rustore.ru/help/developers/publishing-and-verifying-apps/app-publication/new-version-app/upload-aab)
[подписи APK/AAB](https://www.rustore.ru/help/developers/publishing-and-verifying-apps/app-publication/apk-signature)
