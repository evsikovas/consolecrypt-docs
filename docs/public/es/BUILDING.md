# Servidor de montaje y sincronización

Referencia traducida · [Original en ruso](../BUILDING.md)

En todos los casos, clone todo el repositorio: Rust-client utiliza común
Biblioteca de `crates/` . Flutter SDK 3.47.x, Dart 3.13.4; Rust se fija a
`rust-toolchain.toml`. Save `Cargo.lock` , `pubspec.lock` y `Podfile.lock` .

## Comunicados de GitHub

`main` contiene fuentes actuales. Los instaladores públicos sólo se emiten cuando se envían
una etiqueta estable `vX.Y.Z` que coincide con la versión en `pubspec.yaml` . Tag should
a señalar a una comisión de la historia `main` . Empujar en la rama no comienza la asamblea. Inicio manual del flujo de trabajo sobre corriente `main`
Revisa todas las plataformas y guarda paquetes de CI sin publicación y anuncios. El viejo gasoducto GitLab está fuera de línea.

Workflow `Client tag release` comprueba la etiqueta, corre Windows , macOS , Android .
Linux y iOS Simulador, luego publica siete paquetes en uno GitHub Lanzamiento con SHA-256.
Comenzando con 1.0.0 iOS , el Simulador es una parte obligatoria de la liberación.
Windows usos GitHub - hospedado `windows-2025` , Linux - `ubuntu-24.04`
Aislante Docker constructor. Android y iOS uso `cc-macos-arm64`
con Xcode completo. Para macOS , el mismo Mac se utiliza por defecto.
variable `MACOS_BUILD_RUNNER` le permite especificar JSON -array de otras etiquetas, por ejemplo
`["macos-26"]` para preparado GitHub corredor. Las herramientas de la línea de comandos no son suficientes.
SDK Android se define por `ANDROID_HOME` , JDK por `JAVA_HOME` por repositorio
variables. Las claves de firma se almacenan en los corredores correspondientes.

Después de la publicación, se inicia por separado la suscripción de feeds de actualización `main`.
El flujo de trabajo diario `Signed update feeds` extiende la metainformación firmada
Si es necesario, no recoge instaladores. Versiones publicadas de paquetes
No reemplazado: Los cambios se publican con una nueva etiqueta.

## macOS

Requiere Xcode completo con herramientas de comando, Flutter, Rust/rustup
CocoaPods y Python 3. Apple Silicon e Intel se fusionan en un paquete único.
Del repositorio raíz:

```sh
client/scripts/build-macos.sh --no-cli
```

Resultado: `dist/macos/ConsoleCrypt.dmg` , aplicación, archivo ZIP y versión.
La imagen incluye el enlace Aplicaciones y el fondo de instalación. Dependencia de Python en embalaje
Se colocan en el entorno local dentro de `dist/` .
Si tiene un certificado, puede especificar `CC_CODESIGN_IDENTITY` o `--sign-identity` .
Se requiere una firma estable para que las actualizaciones no cambien la confianza de la llave.
La notarización de Apple también es necesaria para la distribución pública con Gatekeeper.

## Android · ARM64

Pre-assembly for Android 11+ (API 30), ARM64:

- JDK 17;
- Android Plataforma SDK 36, herramientas de construcción 36.0.0;
- NDK 28.2.13676358, CMake 3.22.1;
- Flutter y Rust; Python 3 para comprobar las bibliotecas nativas.

```sh
export ANDROID_HOME="$HOME/Library/Android/sdk"
client/scripts/build-android.sh
```

Si usted tiene una ubicación SDK diferente, establecer su propio `ANDROID_HOME` . Flutter recupera
Envoltorio de vela en la preparación del proyecto Android . El guión revisa la firma APK,
Alineación ZIP y alineación de bibliotecas nativas para 16 páginas de memoria KiB.
Resultado: `dist/android/ConsoleCrypt-android-arm64.apk` , SHA-256 y la versión exacta.

Al construir localmente para actualizar un APK ya instalado, compruebe el número.
asambleas: Un paquete de CI publicado puede tener un número mayor que el original `pubspec.yaml` .
Antes de comenzar, establecer `CC_BUILD_NUMBER` con un entero más grande que el número fijado
paquete y número de montaje original. Script lo grabará en metadatos; el mismo
También se requiere una firma. No `CC_BUILD_NUMBER` sólo aumenta la inicial
Así que este APK puede ser más viejo que el instalado.

La configuración actual utiliza local **debug keystore** incluso en la versión APK.
Es un paquete de pruebas. La llave privada no está incluida en Git. APKs collected at different locations
ordenadores con diferentes teclas no se actualizan en la parte superior de la versión instalada.
Antes de cambiar a otra firma, guarde una copia de seguridad cifrada.
Para la distribución de la producción, necesita una clave de firma segura y configuración separadas
Firma de la publicación; no publicar tal clave en el repositorio.

Sobre Android, las limitaciones de antecedentes del sistema operativo pueden interrumpir el período de sesiones SSH. SFTP usos
Selección de sistemas de documentos; la integración con editores de escritorio está disponible en el ordenador.

## Windows

[Пошаговая инструкция и создание EXE-установщика](BUILD_WINDOWS.md).

## Linux · x86-64

[Установка DEB/RPM, системная ключница и сборка](BUILD_LINUX.md).

```sh
client/scripts/build-linux.sh
```

El resultado: dos paquetes en `dist/linux/` , SHA-256 y la versión exacta.
Entorno básico de paquetes - Ubuntu 22.04 x86-64; instalación comprobada
Debian 12 y Fedora 43. Necesitas una sesión de gráficos D-Bus para empezar y
Creado desbloqueado teclado principal Servicio Secreto. Actualización Linux
manualmente vía `apt` / `dnf` ; cinta de actualización firmada y automática
La instalación Linux no está soportada. La GPU física y Wayland no son probados.

## iOS Puerto preliminar

[Simulator, нативные проверки и подпись для iPhone](BUILD_IOS.md).
Simulator ZIP está diseñado para Xcode Simulator; la instalación en el teléfono requiere
una firma separada en Xcode.

## Pruebas.

```sh
(cd crates && cargo test --locked)
(cd client/rust && cargo test --locked)
(cd client/flutter && flutter pub get && flutter analyze && flutter test)
python3 -m unittest discover -s client/scripts -p 'test_*.py'
```

No ejecute pruebas Flutter al mismo tiempo que la construcción nativa: actualizan las pruebas comunes.
archivos generados. El puente ya se genera e incluye en el código fuente.
La construcción normal no requiere la instalación de flutter_rust_bridge_codegen.

## Pruebas de dependencia

`client/scripts/dependency-audit.py check` lanza 'cargo deny check adviseries'
bans sources licenses ` для ` client/rust ` и ` crates`, checks the rule of own
grúas y escaneos `pubspec.lock` (y npm lockfile si aparece) a través de
`osv-scanner`. Localmente, usted necesita las mismas versiones que en el CI:

```sh
cargo install --locked cargo-deny@0.20.2
go install github.com/google/osv-scanner/v2/cmd/osv-scanner@v2.6.0
python3 client/scripts/dependency-audit.py check
```

Un cheque: `cargo deny --manifest-path cliente/rust/Cargo.toml --locked check
Los asesores prohíben las fuentes de licencias.

En el CI, el paso se realiza sólo en GitHub -hosted `ubuntu-24.04` : en `validate` tag
liberación (failure to stop the assembly of package) and in the weekly
`dependency-audit.yml` , que también comprueba la solicitud de tira con modificado
adicciones. El funcionamiento semanal abre o actualiza el tema "Vulnerable"
dependencia" y lo cierra después de una carrera limpia. Herramientas se descargan desde
GitHub Lanzamientos con el cheque SHA-256 fijado en el script.

Política `deny.toml` :

- Quedan prohibidas las vulnerabilidades y las versiones yanked; no se conservan – directa
  dependencia de nuestras cajas;
- TLS rustls only: `native-tls` and `openssl` prohibited, `openssl-sys` allowed
  sólo como backend de SQLCipher `libsqlite3-sys`
- git source allowed only `github.com/evsikovas/consolecrypt-server`
  `cc-protocol` sobre auditoría;
- propias cajas - `cc-*` , `publish = false` , `AGPL-3.0-only` : nuevo módulo
  No requiere la edición de excepciones de licencia, y el script rechaza cualquier otra licencia.
  Una caja inédita.

La excepción se hace solamente conscientemente: en `ignore` archivo `deny.toml` (o
`[[IgnoredVulns]]` en `osv-scanner.toml` con el identificador del consejo, razón,
el propietario y la fecha de la revisión; el período no es más de tres meses. Se ha adoptado ahora:

- `RUSTSEC-2023-0071` (rsa, Marvin): No hay versión actualizada fija.
  Local `ssh-key` utiliza la ceguera RSA con aleatoria del sistema
  firmas en SSH /agent. Los límites de limitación y verificación residuales se describen en
  `SECURITY.md` ; se recomienda crear nuevas SSH teclas Ed25519 .
  Revisión 2027-01-21.
- `RUSTSEC-2024-0429` (glib 0.17.10 en el plugin GTK3): local
  en el puerto de arriba. Su código fuente, conexión de construcción y archivo de bloqueo están protegidos
  `client/security-backports.json` ; optimizado Linux - la prueba es obligatoria.
  La excepción en `client/native-deny.toml` no permite la versión original del registro.
- `RUSTSEC-2026-0459` `libsqlite3-sys` 0.38.2): Corrección SQLite
  e5bf1198 es portado a ambos motores incorporados, SQLite y SQLCipher. heshi
  C-códigos, encabezados y scripts de construcción también están cubiertos; la prueba compila códigos del mundo real.
  WAL lee y comprueba el control negativo. Exclusión condicional
  OSV hasta 2026-12-09 es válido sólo para este backport local.
  Permite un paquete de registro. Actualización a 0.39.1 sin solución separada
  SQLCipher no es suficiente. Detalles: `SECURITY.md` .

Cargo se verifica más a través de OSV/GHSA para ambos gráficos raíz y
plugins Native Flutter. Error de la herramienta o respuesta incompleta para
Mira. Los hashes de origen local sólo representan la diferencia LF/CRLF en el checkout.
Para parches locales públicos explícitamente marcados, OSV/GHSA también comprueba el original
Versión de arriba. La exclusión GLib está ligada al backport verificado y no permite
Paquete de registro de la misma versión en una caja diferente. Los paquetes privados locales no se envían.

Certificados de PEM y claves de bases de datos `db-core` leídos a través de `rustls-pki-types`
`PemObject` ; `rustls-pemfile` ya no está en uso.

## Tu servidor.

El perfil local funciona sin un servidor. Para sincronización, utilice
[отдельный репозиторий сервера и протокола](https://github.com/evsikovas/consolecrypt-server).
Instrucciones Docker /SMTP y comandos de inicio se encuentran en su README y HOSTING.md.
El código del servidor no está incluido en el repositorio principal del cliente actual.
