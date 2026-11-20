# ConsoleCrypt 0.2.1

Referencia traducida · [Original en ruso](../RELEASE_0_2_1.md)

El gran flujo de salida terminal se procesa ahora en porciones para que la interfaz regrese a la entrada y renderizar más a menudo. Errores de procesamiento corregidos de colores ANSI dañados; capas estáticas de la interfaz de vidrio son menos redireccionados.

[Скачать клиент](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) · [Своя установка сервера](https://git.evsikov.net/publics/consolecrypt/-/blob/v0.2.1/docs/public/HOSTING.md)

## ¿Qué ha cambiado?

- **Terminal:** Decodificación gradual de UTF-8, porciones de procesamiento de salida limitadas, manejo seguro de secuencias de control largas y colores incorrectos. Se guardan soporte Unicode y aspectos destacados.
- ** Interfaz:** Reutilización de filtros de fondo y aislamiento de superficies estáticas a partir del enrojecimiento de contenidos. Fondo más uniforme debido a la textura del ruido.
- **Secrets and AI:** Las respuestas y secretos tardíos no se mueven a otro perfil; el bloqueo aclara el estado de las conversaciones. Copiar el secreto a Android y iOS requiere un canal nativo protegido con TTL. Si no está disponible, la copia es rechazada.
- ** SSH y SFTP :** Stop SSH -agent revoca el acceso a llaves, incluyendo la confirmación de firma pendiente. Closure SFTP del gestor cancela la selección de espera del editor y despeja copias de trabajo. Se ha fortalecido la verificación de los argumentos de los anfitriones de salto.
- **AI Network Responses:** Los tamaños de la respuesta y los eventos de streaming son limitados, la cancelación no espera la liberación de una cola de interfaz llena.
- ** Servidor público:** Acceso compartido, grupos, secretos y adiciones confirmadas del dispositivo están disponibles. La transferencia tiene lugar por acción explícita del propietario; los datos de almacenamiento siguen cifrados en el servidor.

## Asambleas

| Plataforma | Asamblea General | Archivo. |
|---|---|---|
| Windows x64 | 0.2.1+1280 | EXE instalador o ZIP portátil |
| macOS Silicon Intel/Apple | 0.2.1+1281 | Universal DMG |
| Android ARM64 | 0.2.1+61 | APK |
| iOS Simulador Intel / Apple Silicon | 0.2.1+62 | ZIP, dos partes `.001` / `.002` |

Todos los archivos están disponibles a continuación en **Assets**. `SHA256SUMS-0.2.1.txt` contiene las sumas de comprobación de cada archivo y recolectadas iOS ZIP. Windows y macOS se recogen en [CI №197](https://git.evsikov.net/publics/consolecrypt/-/pipelines/197) de un compromiso `e37af672`; Android y iOS de la misma fuente con números de montaje separados.

Para iOS Simulator, descargue ambas partes a la misma carpeta en su Mac:

```sh
cat ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.1+62-ios-simulator-universal.zip -d consolecrypt-ios
```

Orden de lanzamiento - en [инструкции iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md) . Esta construcción para el Simulador no se instala en el iPhone IPA.

## Comprobaciones y limitaciones

Flutter: **559 pruebas**, análisis sin comentarios. óxido de cliente: **653 pruebas**, **7 pases claramente marcados**, Clippy sin advertencia. Se verifican versiones, arquitecturas, integridad de archivos, licencias completas y cheques de paquetes nativos; iOS se ejecuta en un simulador separado.

La reducción de la latencia es confirmada por mediciones sintéticas en el Mac. Comportamiento en máquinas físicas Windows donde se han reportado bandas de palanca y gradiente requiere volver a comprobar por los usuarios. Estas son construcciones tempranas: Windows sin Authenticode, macOS con la firma local anterior sin notarización por Apple, Android con una firma de vista previa guardada.

Cuando se prueban las dependencias, se mantiene una advertencia conocida `RUSTSEC-2023-0071` para la RSA. La versión corregida aún no está disponible; no se ha detectado la ruta de desciframiento de PKCS#1 con un oráculo accesible externamente en el código verificado. Esto no es una promesa de no tener todas las vulnerabilidades.

Licencia de componentes patentados: **AGPL-3.0-only** Los componentes de terceros conservan sus licencias; las notificaciones de MIT para el componente terminal se incluyen en paquetes.

---
