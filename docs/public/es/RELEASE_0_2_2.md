# ConsoleCrypt 0.2.2

Referencia traducida · [Original en ruso](../RELEASE_0_2_2.md)

Fixed Save Updates macOS : Una nueva copia de la aplicación ya no debe recibir una prohibición de lanzamiento debido a la descarga en la caja de arena. La sección de compartir se ha vuelto más clara: las pestañas de datos se separan de agregar dispositivos, y acciones adicionales no toman toda la pantalla.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) · [Свой сервер](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/HOSTING.md)

## ¿Qué ha cambiado?

- **Actualizaciones macOS :** Después de comprobar la cinta firmada y el archivo descargado, la aplicación ofrece un diálogo de sistema ** "Guardar y Abrir"**. El archivo seleccionado es reescrito con un cheque de tamaño y SHA-256, luego abierto por DMG. Sandbox and protection macOS remain included.
- **Cancelación y Retry:** La cancelación del ahorro no se considera una instalación exitosa. La descarga que ya ha sido verificada sigue disponible para reingresar. Un archivo existente no es sobrescrito – elegir un nuevo nombre o una carpeta diferente.
- ** Compartir:** pestañas individuales **Disponible para mí** y **Compartí**, explicación de la pestaña actual, bloqueo de dispositivo independiente y estados vacíos comprensibles. Las principales acciones son **Agregar este dispositivo** y **Confirm Device**; la adición continua y los cheques de historia están disponibles en **Otras Acciones**. Se admiten pantallas estrechas y texto ampliado.
- **Documentación:** Instrucciones actualizadas para instalar, colaborar y añadir dispositivos; la guía en el sitio se complementa con nuevas instantáneas de interfaz en ruso e inglés.

## Actualizar una vez a través del navegador a macOS

Si tiene ** ConsoleCrypt 0.2.1 o más**, descargue el nuevo DMG a través de su navegador desde [страницы загрузки](https://consolecrypt.evsikov.net/download?lang=ru) , cierre la aplicación y reemplacela en **Aplicaciones**. Abra la copia instalada de Aplicaciones. Si ya hay una copia con un error de lanzamiento, reemplacela con una copia de la nueva descarga del navegador. Se guardan perfiles y repositorios cifrados; no se requiere llave ni almacenamiento para ser eliminados.

La vieja aplicación utiliza el viejo método de descarga y no puede fijarlo hasta que se actualiza. Empezando con **0.2.2**, las siguientes actualizaciones pasan por el diálogo de ahorro del sistema. En macOS , la instalación todavía se completa mediante la migración de la aplicación de DMG a Aplicaciones.

## Asambleas

| Plataforma | Asamblea General | Paquete |
|---|---|---|
| Windows x64 | **0.2.2+1292** | EXE/portable ZIP |
| macOS Silicon Intel/Apple | **0.2.2+1293** | Universal DMG |
| Android ARM64 | **0.2.2+64** | APK |
| iOS Simulador Intel / Apple Silicon | **0.2.2+65** | ZIP en dos partes `.001` / `.002` |

Los archivos están en **Assets** a continuación. `SHA256SUMS-0.2.2.txt` contiene compruebas de paquetes y recogidos iOS ZIP. Windows y macOS se recogen en [CI №201](https://git.evsikov.net/publics/consolecrypt/-/pipelines/201) de `8c29dcef92a5fa248849609c34104c49849990de`; Android y iOS de la misma fuente con números de montaje separados.

Para iOS Simulator, descargue ambas partes a una carpeta:

```sh
cat ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.2+65-ios-simulator-universal.zip -d consolecrypt-ios
```

[Порядок запуска iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). Es una construcción para Simulator; no está instalado en el iPhone.

## Comprobaciones.

**566 Pruebas de fluidos, análisis sin comentario. El código de exportación Swift nativo de actualizaciones, tamaño y suma de comprobación, la negativa a sobreescribir archivos y hacer clic en enlaces simbólicos, cancelación y reingreso se revisan. Una aplicación de sandbox firmada separada reprodujo la antigua prohibición de lanzamiento y verificó la entrada a través de un diálogo de sistema con la nueva política. La protección macOS no fue apagada.

Se verificaron versiones, arquitecturas, integridad de archivos, licencias y cheques de todos los paquetes. macOS aprobado `codesign --verify --deep --strict` y validó nuevas resoluciones de sandbox; iOS verificadas por ejecutar en un Simulador separado. Comportamiento físico Windows / Android /iPhone no fue probado en esta versión.

Estos son pre-assemblies: Windows sin Authenticode, macOS con la firma local anterior sin notarización de Apple, Android con una firma de vista previa guardada. El cliente de Rust no ha cambiado en esta versión; los resultados de la versión anterior no se emiten como una repetición. La advertencia de adicción conocida para RSA `RUSTSEC-2023-0071` sigue abierta.

Componentes apropiados: **AGPL-3.0-only** Las licencias de componentes de terceros, incluido el componente terminal del MIT, se almacenan en paquetes.

---
