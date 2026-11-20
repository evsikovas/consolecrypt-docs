# ConsoleCrypt 0,3

Referencia traducida · [Original en ruso](../RELEASE_0_2_3.md)

Una búsqueda más amplia, un panel compacto y el envío secuencial de entrada a la terminal SSH. Instaladores actualizados para todas las plataformas soportadas e imágenes manuales en ruso e inglés.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru) · [Свой сервер: Docker / Kubernetes](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/HOSTING.md)

## ¿Qué ha cambiado?

- ** Entrada final:** caracteres y Enter se envían a su vez, incluso si la entrada anterior SSH aún no se ha completado. Cerrar la ficha o reconectar cancela la cola restante. Los cheques cubren el texto círilico, inglés, caracteres Unicode compuestos y respuestas en forma de byte SSH . El carácter corrupto exacto del mensaje del usuario aún no ha sido reproducido; verificación para él Windows después de que la actualización queda por confirmar.
- **Nueva conexión: ** Botón redondo **+**, impulso de buceador y acción de conexión previa.
- **Búsqueda:** Más espacio para un nombre de host, dirección IP, snippet o pregunta AI.
- **Sincronización:** El estado exitoso se muestra con un punto verde y **Sinh.** El indicio completo se guarda; errores, falta de red y sincronización desconectada muestran su estado.
- **Guide:** 72 fotos de interfaz de usuario frescas en ruso e inglés, incluida la pantalla móvil. Esto es datos de demostración; no se utilizaron repositorios de usuario reales.

## Si macOS no abre la aplicación después de un antiguo auto-actualización

Descargar el nuevo DMG **a través del navegador** con [страницы загрузки](https://consolecrypt.evsikov.net/download?lang=ru) , completo ConsoleCrypt y reemplazar la aplicación en **Aplicaciones**. Ejecute la copia instalada desde allí. No es necesario eliminar el almacenamiento cifrado, los perfiles y las claves.

Si 0.2.2 o 0.2.3 fue descargado con el botón de actualización antiguo, reiniciar el mismo botón puede volver a cargar la prohibición de inicio macOS . La nueva versión no fija la forma en que un cliente viejo ya está cargado a la primera instalación limpia. Después de eso, las actualizaciones se guardan a través del diálogo del sistema ** "Guardar y abrir"**, con un cheque de tamaño y SHA-256. Moving the application from DMG to Applications remains the final install step. Se mantiene la caja de arena y la protección macOS.

## Asambleas

| Plataforma | Versión. | Paquete |
|---|---|---|
| Windows 10/11 x64 | **0.2.3+1309** | EXE/portable ZIP |
| macOS Silicon Intel/Apple | **0.2.3+1310** | Universal DMG |
| Android ARM64 | **0.2.3+67** | APK |
| iOS Simulador Intel / Apple Silicon | **0.2.3+68** | Piezas ZIP `.001` / `.002` |

Los archivos están en **Assets** a continuación. `SHA256SUMS-0.2.3.txt` contiene las sumas de todos los paquetes y el ZIP combinado iOS. Fuente: `8d2213f5bc24bd94a4eac6ee85f132ac3bd5600a` . Windows y macOS se montan en [CI №206](https://git.evsikov.net/publics/consolecrypt/-/pipelines/206) ; los paquetes móviles utilizan la misma fuente con números de construcción separados.

Para iOS Simulador, subir ambas partes a una carpeta:

```sh
cat ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.3+68-ios-simulator-universal.zip -d consolecrypt-ios
```

[Запуск iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). Este paquete no está instalado en un iPhone físico.

## Issuance checks

**576 Pruebas de Flutter pasadas**, análisis sin comentario. Las regresiones separadas verifican la cola de entrada y su cancelación, localización de paneles, tamaños de búsqueda, estado de sincronización exitoso y preservación de advertencias. Han pasado cheques nativos sobre la exportación de actualizaciones, números de montaje y la composición de fuentes públicas.

Se han probado versiones, arquitecturas, bibliotecas, licencias, paquetes CRC y SHA-256. DMG aprobó el control de integridad; macOS - aplicación - verificación estricta de la firma y permisos de la caja de arena. APK conserva la firma previa anterior y admite 16 KB de páginas de memoria. iOS Simulador se verifica ejecutando en un dispositivo temporal separado, que se elimina. Físico Windows / Android /iPhone y la entrada en el equipo del usuario no fueron revisados.

Reuniones preliminares: Windows sin Authenticode, macOS con la firma local anterior sin la notarización de Apple, Android con una firma de vista previa. El código Rust del cliente no ha cambiado; los resultados anteriores de Rust no se emiten como una repetición de ejecución. La advertencia de adicción conocida para RSA `RUSTSEC-2023-0071` sigue abierta.

Componentes apropiados: **AGPL-3.0-only** Las licencias de componentes de terceros, incluido el componente terminal del MIT, se almacenan en paquetes.

---
