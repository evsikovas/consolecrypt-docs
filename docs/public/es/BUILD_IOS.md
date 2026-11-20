# Asamblea ConsoleCrypt para iOS

Referencia traducida · [Original en ruso](../BUILD_IOS.md)

iOS es actualmente un pre-trabajo. Flutter utiliza un núcleo común de Rust.
Nativo SSH , SQLCipher y Keychain seguro. Versión mínima del proyecto -
iOS 15. El mecanismo de escritorio para descargar e instalar actualizaciones en iOS está deshabilitado.

## Necesidades

- macOS con una instalación completa de código X seleccionada a través de `xcode-select` y iOS SDK;
- instalado en Xcode Simulator runtime;
- Flutter, CocoaPods, Rust/rustup y Python 3
- herramientas de montaje desde [общего руководства](BUILDING.md) .

No haga pruebas de Flutter u otra construcción nativa al mismo tiempo en el mismo
checkout. Utilizan archivos generados compartidos. Teclas privadas de firma,
no se añaden a Git perfiles de disposición y ajustes personales de equipo.

## Simulador sin cuenta de Apple

Del repositorio raíz:

```sh
client/scripts/build-ios.sh --simulator
```

El script instala objetivos de Rust para ARM64 e Intel Simulator, reservas
Un nuevo número de compilación compila el núcleo real y comprueba las versiones en `Info.plist` .
Los resultados son en `dist/ios/` : ZIP con `Runner.app` , SHA-256 y versión de archivo.
Un intento fallido también consume el número; no reducir el medidor manualmente.

Ejecute el Simulador deseado en Xcode. Para la aplicación recogida por este script:

```sh
xcrun simctl install booted client/flutter/build/ios/iphonesimulator/Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

Para múltiples simuladores, en lugar de `booted` especificar el UDID del dispositivo deseado.
Para ZIP, primer cheque para SHA-256, luego desempaque `Runner.app` e instalar
por su mismo equipo. Este ZIP no es un IPA para instalar en un iPhone.

### Archivo terminado de la versión 1.0.0

[Скачать Simulator ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v1.0.0/ConsoleCrypt-1.0.0%2B61015-ios-simulator-universal.zip) de [релиза 1.0.0](https://github.com/evsikovas/consolecrypt-client/releases/tag/v1.0.0) .
Versión **1.0.0+61015**, tamaño **246,829,118 bytes**.

Compruebe el archivo SHA-256 antes de desempaquetar:

```sh
shasum -a 256 "ConsoleCrypt-1.0.0+61015-ios-simulator-universal.zip"
```

Se espera SHA-256: `c3663727b184e9d560ef75cb58e61c8cf9f53dde95da81a19f7f16e474a80c0d` Después del partido:

```sh
unzip "ConsoleCrypt-1.0.0+61015-ios-simulator-universal.zip"
xcrun simctl install booted Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

Ejecute el Simulador en Xcode con antelación; reemplacelo con múltiples dispositivos
`booted` al UDID deseado. El archivo no está instalado en un iPhone físico.

### Archivos históricos de la liberación 0.5.6

In [релизе v0.5.6](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.6)
Descargar [полный Simulator ZIP](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/ConsoleCrypt-0.5.6%2B23015-ios-simulator-universal.zip)
[SHA256SUMS-0.5.6.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.6/SHA256SUMS-0.5.6.txt) .
Guarda ambos archivos en una carpeta. ZIP publicado en su totalidad; combinando partes
Ya no es necesario. Assembly - **0.5.6+23015**, size - **154 939 478 bytes**.

En Terminal, vaya a esta carpeta y verifique el archivo:

```sh
awk '$2 == "ConsoleCrypt-0.5.6+23015-ios-simulator-universal.zip" { print; n++ } \
     END { if (n != 1) exit 1 }' SHA256SUMS-0.5.6.txt > ios.SHA256SUMS \
    && shasum -a 256 -c ios.SHA256SUMS
```

Continuar sólo después del resultado `OK` Se espera SHA-256:
`6394d2c15d6fd28ab58e1b28638dd75bb751dc3e487212ee90e44b001f5b1264`.

```sh
unzip ConsoleCrypt-0.5.6+23015-ios-simulator-universal.zip
xcrun simctl install booted Runner.app
xcrun simctl launch booted io.consolecrypt.consolecrypt
```

Antes de instalar, ejecute el Simulador deseado en Xcode. Si hay algunos
Simulador, sustitúyase `booted` por el UDID del dispositivo seleccionado. Este ZIP está diseñado para
para Simulator y no es un IPA para la instalación en un iPhone físico.

Para la prueba de humo nativa, seleccione UDID de `flutter devices` :

```sh
cd client/flutter
flutter test integration_test/ios_core_test.dart -d <SIMULATOR_UDID> \
  --dart-define=CC_MOCK=false
```

Antes de que se construya tal prueba nativa, también reserve un número de la raíz:
`python3 client/scripts/bump-version.py`. La inspección utiliza un separado
Almacenamiento privado de pruebas y no requiere credenciales de un servidor público.

## GitHub Acciones y iOS Simulador

In workflow `Client tag release` , workflow `ios` comienza después de la comprobación de la fuente
sobre el asignado `cc-macos-arm64` , independientemente del trabajo macOS . Configuración
`MACOS_BUILD_RUNNER` sólo cambia el trabajo macOS . Job iOS lanzamientos
`ci-ios.sh --build-only` , instala y abre la vista previa en un Simulador separado.
Actions artifact contains **complete Simulator ZIP**, its SHA-256 and the version file.
La vida del estante es de 30 días. Después de la validación exitosa de todas las plataformas de trabajo `publish`
Los recibos de la versión se verifican y se publican automáticamente siete paquetes.
Checksums in GitHub Release. Empujar hilos por sí mismos liberación no funciona.
[Раннеры и номера сборок](GITHUB_ACTIONS.md).

Cuestión verificada **0.5.6+23015** recolectada el 20 de octubre de 2026 (UTC):
[iOS job](https://github.com/evsikovas/consolecrypt-client/actions/runs/39377995191/job/118489659918)
completado con éxito; log confirma la instalación y el lanzamiento
`io.consolecrypt.consolecrypt` con un PID.

En GitHub Acciones, `Client tag release` corre `ios` después de la puerta de origen anfitriona,
independientemente del trabajo macOS, en el corredor Mac dedicado. Sube.
el Simulador completo ZIP, checksum y la versión de recibo. Después de todo, plataformas
pasar, el editor revisa los recibos y publica la versión automáticamente.
El artefacto y lanzado ZIP son para Simulator, no instalado iPhone IPAs.

## SSH / SFTP regresión y anterior GitLab CI

### artefacto histórico de GitLab: sólo recibos

En el anterior GitLab CI, a partir de 0.3, el ZIP de Simulador completo fue salvado en el Mac.
corredor **out checkout **:
`$HOME/.cache/consolecrypt/ios-preview/<полный source SHA>/<job ID>/`.
El directorio tiene derechos `0700` y ZIP `0600` . La siguiente limpieza de la fuente no elimina
Este archivo. Guardar cheques de identificación de mano / ID de trabajo nativa, CRC y SHA-256
No es un cheque separado de la aplicación en el iPhone.

El artefacto histórico **GitLab CI** contiene sólo tres pequeños archivos:
`ConsoleCrypt-ios-preview.json` , `SHA256SUMS-ios-preview.txt` y
`README-ios-preview.txt`. No tiene una aplicación. Obtenga un ZIP completo del propietario
Mac Runner y comprobar SHA-256 desde el recibo antes de desempacar. Si el trabajo ha terminado
error después de guardar, el recibo no significa una verificación de lanzamiento exitosa.

GitLab envió todos los caminos del artefacto en un archivo. Separación de ZIP en partes
dentro del mismo artefacto no redujo el tamaño total de la solicitud y no solucionó el error.
`413 Request Entity Too Large` , por lo que el CI guardó sólo recibos.
El artefacto y la liberación actuales GitHub contienen ZIP completo. Local.
`build-ios.sh --simulator` también proporciona un archivo completo en `dist/ios/` .

El histórico GitLab iOS vista previa **El artefacto contiene metadatos/checksums sólo**, no la aplicación.
El ZIP completo se mantiene en privado en el corredor macOS, fuera de su checkout,
`$HOME/.cache/consolecrypt/ios-preview/<source SHA>/<job ID>/` . Obtenga.
del propietario del corredor y verificar el SHA-256 registrado antes de extraerlo.
Los archivos de división dentro de un artefacto CI no evita su carga agregada
límite. Las descargas de la versión pública son una publicación revisada por separado; estas
Avances son para Simulator y no son instalados iPhone IPAs.

Para una prueba completa de Simulador, usted necesita ejecutar Docker . De la raíz:

```sh
client/scripts/ci-ios.sh --test-only
```

El script crea un simulador de iPhone temporal separado del tiempo de ejecución instalado
Y se reserva el número de una prueba nativa. Este lanzamiento incluye una prueba.
almacenamiento y real SSH / SFTP a través del contenedor OpenSSH. Contraseña y claves de host
Están creados en el lanzamiento. La contraseña se transmite sólo a través del punto final temporal
localhost, no está escrito en fuente, argumento de comando, o `DART_DEFINES` .
El contenedor y el Simulador creado se eliminan incluso en caso de error. Está abierto.
El usuario Simulator y la aplicación instalada en él no son reemplazados.

La prueba comprueba UTF-8/Cyrillic al entrar y pegar, resaltar/copiar,
Cambiar dos pestañas, devolver Flutter de fondo, pérdida y recuperación
SSH y transferir un archivo con un nombre cirílico por SFTP . Test injects events
Flutter TextInput and lifecycle; this is not a validation of a real on-screen keyboard
o suspender la aplicación por el sistema operativo en el iPhone.

Para una construcción de Simulator verificada separada:

```sh
client/scripts/ci-ios.sh --build-only
```

Este lanzamiento compila el producto, lo instala y lo ejecuta en su propio
Simulador del tiempo. El archivo, SHA-256, y la versión permanecen en `dist/ios` .

El archivo `client/ci/ios.yml` se guarda para cheques GitLab manuales anteriores.
Sus reglas de rama y pequeños recibos de vista previa no son un proceso continuo.
La liberación. Las cuestiones se recogen por etiquetado en GitHub Acciones como se describe anteriormente.
Local `--test-only` y `--build-only` siguen siendo modos separados.
Apple Signing Secrets no es necesario para Simulator.

## Un iPhone de verdad.

```sh
client/scripts/build-ios.sh --device
```

El resultado es un paquete de desarrollo ARM64 no firmado. Revisa la compilación.
No se instala en el teléfono como una aplicación regular. Para instalación
Abra `client/flutter/ios/Runner.xcworkspace` en Xcode, seleccione su teléfono.
Configurar sesión &quot; Capacidades con tu cuenta de Apple / equipo personal &quot;
Encienda el modo desarrollador en su teléfono y ejecute Runner desde Xcode. Si es necesario,
Elija un identificador de paquete único para su equipo.

Reglas de Disponibilidad de Firma y Distribución están definidas por Apple:
[настройка iOS в Flutter](https://docs.flutter.dev/platform-integration/ios/setup) ,
[Apple Developer account](https://developer.apple.com/help/account/basics/about-your-developer-account).
TestFlight/App Store requiere un programa de Apple; Simulador
no confirma la disposición a publicar en la tienda.

## Lo que ya se ha verificado y lo que queda

La carrera nativa completa `0.1.20+47` en el Simulador pasó ambos
Comprobaciones de integración. El verdadero Rust-kernel, creación de local
Perfil, SQLCipher, almacenamiento de hosts, guardando Keychain después de reiniciar el núcleo,
desbloquear la frase de la contraseña y bloquear el almacenamiento. SSH - La inspección incluye
Entrada cirílica y retorno a través de Flutter TextInput, resaltado/copying/
insertar, dos pestañas, retorno del ciclo de vida Flutter, archivo UTF-8 por SFTP , pérdida
conexión, amortiguación de amortiguación y reapertura SFTP .
Cierre de la pestaña activa después de la reconexión es necesariamente completado para
5 segundos; la limpieza final fue sin tiempo. Es una prueba separada.
Construir: Producto ZIP es creado por la siguiente carrera `--build-only` .

El archivo actual es **0.5.6+23015**. El CI comprobó el ID del paquete y la versión.
Instalé la aplicación en un simulador temporal separado y empecé el proceso.
Tengo un PID. ZIP completo publicado en un archivo; su tamaño y SHA-256
Comprobado con GitHub digest de activos y un archivo de suma común.
Es un cheque de la construcción, instalación y inicio del proceso, no una repetición del proceso completo.
SSH / SFTP - ejecutar arriba. Aceptación visual, trabajo RDP y dispositivo real
Este lanzamiento no fue probado.

En la aceptación anterior, la fundación de Rust también fue comprobada por compilación para el físico
ARM64 iPhone. Ejecución completa arriba realizada en Simulador y no confirma
Instalación o operación en un teléfono real.

En el dispositivo físico, todavía tiene que comprobar Face ID / Touch ID, bloquear
dispositivos, teclado terminal en pantalla, SSH / SFTP sobre Wi-Fi y red móvil,
Regreso de fondo, importación/exportación de documentos y disponibilidad de la interfaz.
Cuando la aplicación deja el fondo, la instantánea del interruptor de aplicación está cerrada.
El puerto no promete una prohibición universal en las capturas de usuario en iOS .

Lista de verificación práctica para el teléfono después de firmar en Xcode:

1. Crear un perfil local de prueba separado, configurar un perfil biométrico
   Desbloquear, comprobar la cancelación de Face ID y volver a la frase de contraseña.
2. Conéctese a su anfitrión de prueba SSH . Entra Cyrillic, borra.
   Use Return and Ctrl+C. Revise ese toque de la terminal
   lo suficiente para entrar después de cambiar la ficha y volver a la aplicación.
3. Copia la selección y pega el comando. Para inserción con traducción de línea
   Confirme la advertencia; la cancelación debe dejar el equipo sin cumplir.
4. Gire el teléfono con el teclado abierto y cambie el tamaño de la fuente.
   Compruebe la visibilidad de la línea activa, la barra de teclado de servicio y las áreas seguras.
5. Transmitir un archivo con un nombre cirílico a través de SFTP y descargarlo de nuevo.
   Y comparar el contenido. Reconectar a Wi-Fi y red móvil.
6. Cierra el teléfono, abre el interruptor de la aplicación y vuelve.
   La imagen de la aplicación no debe revelar el terminal/toraje. Por separado.
   Revise el temporizador de bloqueo establecido y vuelva a abrir.
7. Apaga la red, devuélvala y restituyala SSH / SFTP . Mira eso.
   La llave de acogida almacenada no requiere re-aceptación, sino un cambio de la clave
   bloqueando la conexión.
8. Compruebe la importación/exportación de copias de seguridad cifradas, VoiceOver,
   Aumento del texto del sistema y el modo de reducción del movimiento.

El resultado de Simulator no reemplaza esta lista de verificación. No publiques los verdaderos.
Contraseñas, privadas SSH - claves o contenidos de la terminal de trabajo en el informe.
