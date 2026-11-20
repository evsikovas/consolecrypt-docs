# 发布版本/ 发布

参考文档译文 · [俄文原文](../RELEASING.md)

存放处的大会([GitHub Actions](https://github.com/evsikovas/consolecrypt-client/blob/main/.github/workflows/client.yml)次)
`evsikovas/consolecrypt-client` [Раннеры и нумерация](GITHUB_ACTIONS.md) (中文(简体) ).
源和锁文件存储在Git;安装器存储在释放附件中.
不要添加`dist/`,令牌,Android密钥或私人签名密钥.

1. 通过`python3 client/scripts/bump-version.py --part patch`提升版本
   (用于功能释放,使用`--part minor`. 创造.
   `docs/public/RELEASE_X_Y_Z.md`,并描述变化和局限性.
2. 检查变化并发送承诺到`main`. 树枝不收集包。
   在标记前,进行不包含在CI`#[ignore]`中的现场测试:

   ```sh
   python3 client/scripts/live-stand.py list
   python3 client/scripts/live-stand.py sharing
   python3 client/scripts/live-stand.py fingerprint --host <windows-host>
   python3 client/scripts/live-stand.py rdp --host <windows-host> --user <user> --certificate-sha256 <hex>
   ```

   `sharing`可支配PostgreSQL 16 inDocker和邻近
   `consolecrypt-server`关于回转所有公共旗帜和FileMailer,
   开始共享和入学测试并删除所有内容。 `rdp`
   为Windows主机配置(权利600),由所有者授权进行测试;
   密码取自`CC_RDP_LIVE_PASSWORD`或`~/.config/consolecrypt-test/rdp.env`
   而且没有印刷,是SHA-256. Kubernetes和Linux (中文(简体) ).
   特勤部门核实LinuxCI任务;系统查询测试
   (Secure Enclave,WindowsHello)是手动运行的.
3. 在此承诺上创建附加说明的标签并发送 :

   ```sh
   git tag -a vX.Y.Z -m 'ConsoleCrypt X.Y.Z'
   git push origin vX.Y.Z
   ```

4. ** 动作 → 客户端标签发布** 将检查版本匹配和来源
   a来自`main`和依赖性核查`cargo deny`,`osv-scanner`的承付款;见
   [BUILDING.md](../BUILDING.md#проверка-зависимостей)),然后收集macOS.
   Windows,Linux和AndroidiOS不会去 - 集会被推迟). 标记前, 关闭打开的 。
   “脆弱依赖性”:更新软件包或发布例外,但日期除外
   订正本。 地方志: `python3 client/scripts/dependency-audit.py check` (中文(简体) ).
   建筑编号分别发布给每个平台;所有平台都保留一个`X.Y.Z`.
5. 所有平台成功后,出版商将检查`ConsoleCrypt.version`.
   6个安装文件(DMG、EXE、ZIP、DEB、RPM、APK)和
   `SHA256SUMS-X.Y.Z.txt`将上传至起草和出版GitHub发行.
   现存的发行版本没有被覆盖. 如果创建后下载终止
   草稿,在重新启动前手动检查; 已发布文件
   并且标记不变,更正后印发新的版本。
6. Workflow将单独运行一个在可信`main`上签名的磁带. 检查。
   该工作流程的结果和未经授权的安装器的可用性。
   网站和服务器在单独的储存库中发放自己的标记;
   仅凭客户出版物并不能改变生产结构。
7. 在您找到文件之前 和新发布网站的链接 检查其资产
   更新链接( 邻接点检出`consolecrypt-docs` 和 `consolecrypt-site` ):

   ```sh
   python3 client/scripts/verify-client-release.py --tag vX.Y.Z --download > verified-downloads.json
   python3 client/scripts/update-release-docs.py verified-downloads.json --docs ../consolecrypt-docs --site ../consolecrypt-site
   ```

   第一个脚本检查公布的发布: 每种类型的一个文件,
   每个平台、尺寸、路径和文摘的编号(GitHub vs.
   `SHA256SUMS`,可允许磁带;有`--download`下载安装器和
   验证SHA -256 第二次重写 README文件标题、链接和
   (b) 装配台,以及场地上 -- -- `download.html`、`index.html`和`assets/en.js`;
   如果前一版本在编辑后被留下,则不记录任何内容.
   `--check`只告诉你,它会改变。 然后`npm test`在网站上;版本
   在`package.json`和`releases/0.1.N.md`中的站点进行人工编辑.

## 从旧更新服务器切换

仅限0.3.2信托客户`git.evsikov.net`和
`updates.consolecrypt.evsikov.net`,包括每个方向调整. 旧`stable.json`
必须指向旧信任域下的真实文件, 包括前者
签名。 重定向到GitHub,或新域不会更新旧客户端.
安装后使用0.3.2`https://updates.consolecrypt.dev/stable.json`
和相同的公用钥匙。

不要更改配置文件中保存的同步URL :它们包含在本地同步中 。
共享访问信任绑定 。 维护一个旧的 API 域名作为别名
相同的服务器实例和相同的数据库; 常规重定向或第二独立
空服务器不能取代此兼容性 。
