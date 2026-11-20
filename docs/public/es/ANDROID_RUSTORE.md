# Android : publicación ConsoleCrypt en RuStore

Referencia traducida · [Original en ruso](../ANDROID_RUSTORE.md)

La aplicación guarda el identificador `io.consolecrypt.consolecrypt` y el conjunto principal
funciones Android . Integración con pagos, Push SDK y otros SDKs RuStore
no se requiere publicación: la aplicación es gratuita, la actualización es realizada por la propia tienda.

## Dos variantes Android

| Opción | Equipo Flutter. | Actualizaciones |
|---|---|---|
| `direct` | `flutter build apk --release --flavor direct --target-platform android-arm64` | Cinta suscrita ConsoleCrypt e instalador del sistema APK |
| `rustore` | `flutter build appbundle --release --flavor rustore --target-platform android-arm64` | Sólo RuStore |

En `rustore` no hay resolución `REQUEST_INSTALL_PACKAGES` y FileProvider
Actualización integrada. Android - el canal de instalación está bloqueado aún más;
Control de cinta, descarga APK e instalación de inicio están deshabilitados en Dart.
En la configuración sigue siendo el botón para abrir la tarjeta de aplicación en RuStore .
Las otras plataformas y el canal `direct` siguen siendo las mismas.

En la construcción corregida de la tienda también se eliminaron los permisos de CameraX añadidos
`RECORD_AUDIO`, `READ_EXTERNAL_STORAGE` y `WRITE_EXTERNAL_STORAGE` . Necesitamos una cámara.
Para el escaneo local del código de recuperación de QR, el sonido se apaga. Archivos KDBX .
Copias de seguridad y documentos de usuario se seleccionan a través del diálogo del sistema
Android con acceso a la URI seleccionada. Comprobando el APK listo y AAB prohíbe todo
Cuatro permisos adicionales, incluyendo la instalación de paquetes incorporados.

Los comandos Android requieren ahora explícita `--flavor direct` o `--flavor rustore` .
El script `client/scripts/build-android.sh` selecciona `direct` automáticamente.

## Firma de la primera publicación

Se utilizan dos llaves permanentes para AAB:

1. ** Clave de aplicación** firma APKs que la tienda instalará a los usuarios.
   Su exportación encriptada PEPK se carga en RuStore una vez.
2. **La clave de descarga** está firmada por AAB. En RuStore se carga al público
   Certificado PEM. La clave de descarga privada permanece con el desarrollador.

En la sección "Application Signature → Download", seleccione `pepk_out.zip` y
`upload_certificate.pem`. Luego, en la sección "Versiones", descargue el AAB firmado.
Las contraseñas, originales JKS/PKCS12 y los archivos `*-signing.properties` no se descargan en la consola.

Las claves y contraseñas privadas deben almacenarse en una copia de seguridad protegida separada.
Copias. No se pueden agregar a Git, artefactos públicos, capturas de pantalla o registros CI.
Si pierdes la tecla de aplicación, no puedes crear una nueva y continuar con la habitual.
Actualización de una aplicación ya instalada.

Los APK anteriores Android fueron firmados con la tecla de depuración del corredor. Nuevo
La clave de producción es diferente: una actualización directa sobre un APK no es compatible.
Antes de mudarse a la tienda, guardar una copia de seguridad del almacenamiento local,
Compruebe la contraseña de recuperación y guardar archivos locales KDBX. No borres.
una sola copia de los datos para instalar una nueva firma.

## Configuración de montaje local y firma

Gradle lee el camino desde `CC_ANDROID_SIGNING_PROPERTIES` . Formato de archivo:

```properties
storeFile=/absolute/private/path/consolecrypt-upload.jks
storePassword=PRIVATE_VALUE
keyAlias=consolecrypt-upload
keyPassword=PRIVATE_VALUE
```

Para la versión de liberación `rustore` , el archivo es obligatorio: sustitución automática
Está prohibida la clave de depuración. Para AAB, se especifica la clave de descarga, para verificación
APK es la clave de aplicación.

El script `client/scripts/build-android-rustore.sh` utiliza dos variables.
caminos a tales archivos: `CC_ANDROID_APP_SIGNING_PROPERTIES` y
`CC_ANDROID_UPLOAD_SIGNING_PROPERTIES`. Crea AAB y APK con un número.
versión en la nueva carpeta `dist/android/rustore-<version>/` , sin publicación.
Requiere el entorno habitual Android /Rust proyecto, `ANDROID_HOME` , `JAVA_HOME`
y único `CC_BUILD_NUMBER` , superando las descargas anteriores Android.

## GitHub Acciones

Workflow ** Android RuStore paquetes** es llamado por la construcción de la liberación general y ahorra
APK/AAB-testted artifact `android-rustore` . Comenzando con 1.1.0, sin ella, es común.
La publicación no se publica. Los paquetes usuales Android APK y ambos RuStore reciben uno.
Android - asambleas, pero utilizar diferentes canales de actualización y firma.

Para un cheque separado, el flujo de trabajo se puede iniciar manualmente desde la rama `main`, especificando
`build_number`. El código nativo se recopila a partir del código fuente. Lugar de publicación de empleo general
APK/AAB в релиз GitHub успе успеха всех платформ; сам RuStore flujo de trabajo нех
Envía archivos a la tienda. Versión de descarga y enviar a moderación se realizan
c RuStore Consola con una clave de firma ya registrada.

Secretos de repositorio obligatorios:

- `ANDROID_APP_KEYSTORE_BASE64` : Base64 del contenido clave de la aplicación.
- `ANDROID_APP_KEYSTORE_PASSWORD` : La contraseña de este repositorio.
- `ANDROID_UPLOAD_KEYSTORE_BASE64` : Base64 del contenido de la clave de descarga.
- `ANDROID_UPLOAD_KEYSTORE_PASSWORD` : La contraseña de este repositorio.

Opcional `ANDROID_APP_KEY_ALIAS` y `ANDROID_UPLOAD_KEY_ALIAS` por defecto
igual `consolecrypt-app` y `consolecrypt-upload` . Si las contraseñas clave son diferentes
de las contraseñas de almacenamiento, especificar `ANDROID_APP_KEY_PASSWORD` y
`ANDROID_UPLOAD_KEY_PASSWORD`. Use las mismas etiquetas y variables del corredor
`ANDROID_HOME` / `JAVA_HOME` , que está en el existente Android - assembly.

Las claves se despliegan en un corredor de carpetas temporales privado; después de la asignación de carpetas
Se va. Sólo la carpeta APK/AAB actual y las compruebas caen en el artefacto.

## Controles de carga previa

`client/scripts/verify-rustore.py` revisa los archivos finales, no sólo los originales.
Manifiestos: Lack of Prohibited Permission and Debug Flag, Production Signature
APK, certificado de descarga AAB, ID de paquete y versiónCode, estructura de Bundle,
Full ARM64 payload, licenses and ELF compatibility with 16 KB pages.
El paquete oficial de Google con un SHA-256 fijo se utiliza para el cheque.

Las funciones de sistema y hardware conservan las limitaciones habituales Android :
Biometría dependiente de dispositivos; nuevo FIDO2 y minimalismo de escritorio en Android
No está añadido. Preparación de la firma y verificación de la asamblea no significa aprobación
Moderación o verificación en cada dispositivo físico.

Texto para la re-moderación:

Permiso eliminado REQUEST_INSTALL_PACKAGEs. En variante RuStore discapacitados
√ Descargue APK y comience el instalador del sistema desde la aplicación. Actualizaciones
Se realiza a través de RuStore . La asamblea está firmada con la llave de producción, el modo de depuración está deshabilitado.

Instrucciones oficiales: [загрузка AAB](https://www.rustore.ru/help/developers/publishing-and-verifying-apps/app-publication/new-version-app/upload-aab)
[подписи APK/AAB](https://www.rustore.ru/help/developers/publishing-and-verifying-apps/app-publication/apk-signature).
