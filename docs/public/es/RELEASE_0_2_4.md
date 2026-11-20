# ConsoleCrypt 0,24

Referencia traducida · [Original en ruso](../RELEASE_0_2_4.md)

**Native SSH ha sido corregido para entrar en Cyrillic; la búsqueda se ha vuelto más amplia, los anfitriones y los grupos se combinan en una sección.**

- **Cyrillic:** reprodujo y corrigió la conversión de la primera "p" a `:�` en la sesión real SSH con Bash/Readline. La terminal solicita UTF-8 para caracteres y la correcta eliminación de todo el personaje; la entrada en inglés continúa funcionando. Los ajustes de idioma y el número de servidor/formato de fecha se guardan. Después de la actualización, abra una nueva sesión SSH .
- **Búsqueda:** toma toda la anchura libre del panel superior. El nombre de host o IP, snippet y AI están disponibles en una sola línea; una ronda **+** abre una nueva conexión, un punto verde y **Sinh.** muestran la sincronización exitosa.
- ** Hosts:** Un elemento separado "Group" ha sido eliminado del menú izquierdo. Creación, grupos anidados y ajustes generales están disponibles dentro **Hosts**; los enlaces de grupo antiguo trabajan.
- **Guide:** 72 nuevas capturas de pantalla de ruso e inglés desde la interfaz actual con datos de demostración.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru) · [Руководство](https://consolecrypt.evsikov.net/guide?lang=ru)

## Instalación y actualización

| Plataforma | Versión. | Paquete |
|---|---|---|
| Windows 10/11 x64 | **0.2.4+1332** | EXE y ZIP portátil |
| macOS Silicon Intel/Apple | **0.2.4+1333** | Universal DMG |
| Android ARM64 | **0.2.4+71** | APK |
| iOS Simulador Intel / Apple Silicon | **0.2.4+72** | Piezas ZIP `.001` / `.002` |

Los archivos están en **Assets** a continuación. `SHA256SUMS-0.2.4.txt` contiene las sumas de paquetes y el ZIP combinado iOS. Fuente: `39d3a487c6aaa9098a26ff79672b4359acb6da36` . Windows y macOS se montan en [CI №213](https://git.evsikov.net/publics/consolecrypt/-/pipelines/213) ; las construcciones móviles utilizan los mismos códigos fuente con números separados.

** macOS :** Si la aplicación no se abre después de descargar el botón de actualización antiguo, descargar DMG ** a través del navegador** una vez, cerrar ConsoleCrypt , reemplazar la aplicación en **Aplicaciones** y ejecutar la copia instalada. Reiniciar en una antigua aplicación puede llevar la misma prohibición de arranque. Después de una instalación limpia, las actualizaciones se guardan a través del diálogo del sistema ** "Save and Open"** con verificación de tamaño y SHA-256. No es necesario eliminar los perfiles, el almacenamiento y la llave en mano; siguen incluidas las protecciones macOS.

Para iOS Simulador, subir ambas partes a una carpeta:

```sh
cat ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip.001 \
    ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip.002 \
    > ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip
shasum -a 256 ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip
unzip ConsoleCrypt-0.2.4+72-ios-simulator-universal.zip -d consolecrypt-ios
```

[Запуск iOS Simulator](https://git.evsikov.net/publics/consolecrypt/-/blob/main/docs/public/BUILD_IOS.md). Este paquete no está instalado en un iPhone físico.

## Comprobaciones y límites

**577 Pruebas de Flutter pasadas**, análisis sin comentario. **54 pruebas SSH aprobadas**, incluyendo dos integraciones con el actual OpenSSH; una prueba de generación RSA4096 lenta anterior falló. Clippy y el control de consumidor terminal-core/AppCore/bridge han pasado. Reales regresiones comprobar Cyrillic y ASCII, entrada post-snippet, inserción, ejecución y Backspace. Controles nativos de ahorro macOS -actualizaciones, números de montaje y exportación pública aprobada.

Corrección local se refiere al nativo SSH utilizado por defecto. Si el administrador prohíbe `AcceptEnv` , el servidor no es `C.UTF-8` o se especifica `LC_ALL=C` , el servidor debe ser configurado a UTF-8. El sistema de backend OpenSSH seleccionado explícitamente no está cambiado. Secrets and user sessions SSH were not used in checks. La verificación física en la computadora del usuario sigue siendo un paso separado.

Reuniones preliminares: Windows sin Authenticode, macOS con la firma local anterior sin la notarización de Apple, Android con una firma de vista previa. La advertencia de adicción conocida para RSA `RUSTSEC-2023-0071` sigue abierta. Componentes propietarios: **AGPL-3.0-only**; licencias de terceros, incluido el componente terminal del MIT, retenidas.

---
