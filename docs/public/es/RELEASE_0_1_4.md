# ConsoleCrypt 0.1.4 - inspección macOS y Android

Referencia traducida · [Original en ruso](../RELEASE_0_1_4.md)

Fecha: 2026-09-28. Windows 0.1.4+13 publicados anteriormente;
Su EXE, ZIP y etiqueta `v0.1.4` no han cambiado.

## Fuente y asambleas

La base del cliente es `e20d11c9d2ad17d22f3304bd3b5932cd951e565a` `v0.1.4` .
Está integrado con el sitio en commit `86b8025` ; el cliente se modifica durante el montaje.
Sólo números sincronizados en pubspec.yaml/app_info.dart. Primero hecho.
`bash client/scripts/build-macos.sh --no-cli` → **0.1.4+14**, entonces
`bash client/scripts/build-android.sh` → **0.1.4+15**. El medidor no se reajustó.

- Flutter 3.47.5 / Dart 3.13.4, Rust 1.98.1, Xcode 27.
- Android SDK 36, NDK 28.2.13676358, Java 21.
- macOS universal: arm64 + x86_64, el presente cc_bridge.framework.
- Android : min API 30 Android 11), ARM64, real libcc_bridge.so, CC_MOCK = false.

## Terminado.

- `flutter analyze` : no comment; `flutter test` : **391 aprobado** en macOS .
- Python Packaging Tests: **18 tests, OK (1 saltado)**
- DMG: integrado 0.1.4/14; marco ejecutable universal y de lucha contra la sequía
  `codesign --verify --deep --strict` , `hdiutil verify` ; sólo lectura montaje ,
  Las aplicaciones y el enlace de aplicaciones están disponibles.
- APK: embebido 0.1.4/15, ARM64/API30; `apksigner verify`
  `zipalign -P 16` y 16 KiB ELF diseño para las tres bibliotecas nativas.
  El certificado SHA-256 es el mismo que el APK anterior 0.1.2+7.
- Descargas públicas verificadas con SHA-256 local DMG/APK; existentes
  Checksums Windows de los archivos se guardan de la versión original.

## Límites de verificación

macOS ad-hoc firmado, sin la notarización de Apple; una nueva solicitud de Keychain es posible
actualizaciones. Android se firma con la misma clave de prueba; Windows sin Authenticode.
Nuevas aplicaciones nativas en Mac / teléfono que no se ejecutan; SSH , AI, sincronización
Estos dos nuevos paquetes no fueron revisados manualmente. Windows describió
por separado y no se emiten aquí para ser ejecutados en un Mac.

## SHA-256

```
f309b5e447cf54c5948b486678cb64d0959d9d36acbb2a50961f254abbc9de95  ConsoleCrypt-0.1.4+13-windows-x64-setup.exe
96f461f32576e3e9da183c25cfdccdb756c75168783887dff88daae3b87ef515  ConsoleCrypt-0.1.4+13-windows-x64-portable.zip
4c81f987c009a8c6986f4529fded817e06074e9ff79ca98b76539dd36ee2f108  ConsoleCrypt-0.1.4+14-macos-universal.dmg
effc8f17896fb85ad8cfdd6066d8afeb28b97313f3e533c69a3c26e9c1a08516  ConsoleCrypt-0.1.4+15-android-arm64.apk
```

Actualizado a 0.1.5 (Revisión de Helm 6); API/readiness y versiones de descarga
verificado en un servidor en vivo, firmas rusas e inglesas - en el navegador.
Después de los cheques, se eliminaron 6.2 GB de archivos de construcción de Flutter temporales; los paquetes se guardan.
