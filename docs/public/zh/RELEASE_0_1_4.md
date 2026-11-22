# ConsoleCrypt0.1.4 - 检查macOS和Android

参考文档译文 · [俄文原文](../RELEASE_0_1_4.md)

日期:2026-09-28. (中文(中国大陆) ). Windows 先前公布的0.1.4+13;
其EXE,ZIP和标签`v0.1.4`没有改变.

## 来源和集会

客户基础是`e20d11c9d2ad17d22f3304bd3b5932cd951e565a` `v0.1.4`.
它与现场结合,承诺`86b8025`;客户端在组装过程中进行修改。
仅在 pubspec.yaml/app_info.dart 中同步编号. 先说.
`bash client/scripts/build-macos.sh --no-cli` →**0.1.4+14**,然后
`bash client/scripts/build-android.sh`—**0.1.4+15** 计数器没有重置.

- 蝶形 3.47.5 / 达特 3.13.4, Rust 1.98.1,Xcode 27.
- Android SDK 36,NDK 28.2.13676358,爪哇21.
- macOS 通用:arm64 + x86_64,即现在的cc_bridge.framework.
- Android: min API 30 (Android 11), ARM64, real libcc_bridge.so, CC_MOCK=虚构.

## 结束了。

- `flutter analyze`:无评论; `flutter test`:**391通过****macOS.
- Python包装试验:**18个试验,OK(1个跳过)**
- DMG: 内置0.1.4/14; 通用可执行框架和 Rust框架
  `codesign --verify --deep --strict`,`hdiutil verify`;只读挂载,
  应用程序和应用程序的连锁链接可供使用。
- APK: 嵌入式0.1.4/15,ARM64/API30; `apksigner verify`
  `zipalign -P 16`和16 KiB ELF布局供所有三个本土图书馆使用.
  SHA-256证书与之前的APK0.1.2+7.
- 由SHA-256本地DMG/APK核实的公开下载;现有
  文件的校验和Windows从原始发布中保存下来.

## 核查的界限

macOS 临时签名,没有 Apple 公证; 新的键链请求是可能的
更新。 Android用相同的测试键签名; Windows没有认证码.
Mac/ 手机上的新本地应用程序不运行; SSH , AI, 同步
这两个新软件包没有经过手动检查. 检查(Windows次)
单独发布,不在此发布以重新执行一个 Mac 。

## SHA-256 (英语).

```
f309b5e447cf54c5948b486678cb64d0959d9d36acbb2a50961f254abbc9de95  ConsoleCrypt-0.1.4+13-windows-x64-setup.exe
96f461f32576e3e9da183c25cfdccdb756c75168783887dff88daae3b87ef515  ConsoleCrypt-0.1.4+13-windows-x64-portable.zip
4c81f987c009a8c6986f4529fded817e06074e9ff79ca98b76539dd36ee2f108  ConsoleCrypt-0.1.4+14-macos-universal.dmg
effc8f17896fb85ad8cfdd6066d8afeb28b97313f3e533c69a3c26e9c1a08516  ConsoleCrypt-0.1.4+15-android-arm64.apk
```

更新至0.1.5(Helm修订版6);API/准备和下载版本
在实时服务器上验证,俄语和英语签名 -在浏览器中。
检查后,删除了临时 Flustter 构建文件的 6.2 GB; 包被保存 。
