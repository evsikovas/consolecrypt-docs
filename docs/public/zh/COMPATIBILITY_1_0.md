# 服务器兼容性与ConsoleCrypt 1.0.0

参考文档译文 · [俄文原文](../COMPATIBILITY_1_0.md)

## 什么变了?

客户端 1.0.0 增加了管理器KDBX和参数同步WebDAV.
服务器不接收主密码,记录KDBX或生物鉴别关键材料.
该KDBX本身是本地定位的,或者在选定的WebDAV上;它不装入
ConsoleCrypt 同步作为一个单独的文件.

在加密客户端对象`VaultSettings`中添加`password_vaults` :
id, name, HTTPS URL), 登录和引用单独的加密证书.
服务器将对象存储为已有对象`EncryptedBody`,而不解析新字段.
本地文件路径、快速打开的信封和 Docker / Kubernetes 配置文件
装置上还留有漏水.

## 是否需要改进服务器?

这些变化不需要新的终点,表格,迁移,权限.
加密密钥或更改电线协议. 服务器版本仍然独立.
从客户端版本;当前验证基础是服务器0.2.4 / 协议 1.13.
对加密对象的大小和访问权限的现有限制仍然存在.

客户检查对新设置进行序列化和加密交换
客户之间。 服务器同步检查、冲突、权利、联合
单独运行GitHub的工作流程中的存取和备份/备份
[Client compatibility](https://github.com/evsikovas/consolecrypt-server/actions/workflows/client-compatibility.yml) (中文(简体) ).
临时PostgreSQL. 工作流不发布图像或改变生产.

在保存WebDAV连接之前,将所有设备升级到客户端 1.0.0 。
年长的顾客不了解新领域,在翻写时`VaultSettings`他们可以
重置连接列表 。 服务器无法补充已解密的设置
或恢复他们的田地:这将违反模式E2EE.
