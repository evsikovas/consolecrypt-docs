# Apoyo a las plataformas ConsoleCrypt 1.0.0

Referencia traducida · [Original en ruso](../PLATFORM_SUPPORT.md)

Los datos básicos y las funciones operativas utilizan un núcleo común de Flutter/Rust.
Las capacidades del sistema dependen del sistema operativo, y una construcción exitosa no sustituye la verificación.
Un escáner de huellas dactilares real o una llave USB. A continuación se muestra el conjunto real de liberación.

| Oportunidad | Windows | macOS | Linux | Android | iOS Simulador |
| --- | --- | --- | --- | --- | --- |
| SSH , SFTP , RDP, database connections | Sí. | Sí. | Sí. | Sí. | Puerto provisional |
| Kubernetes y Docker vía SSH | Sí. | Sí. | Sí. | Sí. | Puerto provisional |
| Terminales locales y Docker en esta computadora | Sí. | Sí. | Sí. | No. | No. |
| KDBX 3/4, archivo clave/contraseña, carpetas, registros, generador | Sí. | Sí. | Sí. | Sí. | Sí. |
| WebDAV y ahorro automático KDBX | Sí. | Sí. | Sí. | Sí. | Sí. |
| Encontrar contraseñas en la paleta y limpiar el búfer | Sí. | Sí. | Sí. | Sí, botón de pantalla / teclado | Sí. |
| Registros de menús y transferencia entre carpetas | PCM, arrastrar y soltar | PCM, arrastrar y soltar | PCM, arrastrar y soltar | Botón de menú / prensa de larga duración | Botón de menú / prensa de larga duración |
| Local KDBX | Edición de archivos | Edición de archivos | Edición de archivos | Importaciones a la aplicación + exportaciones | Importaciones a la aplicación + exportaciones |
| Biometrics/PIN for KDBX | Windows | Protección del sistema de enclave seguro | Aún no se ha aplicado | Android Keystore + petición del sistema | Depende de las capacidades de Simulator; contraseña siempre está disponible |
| FIDO2/PRF for KDBX and storage | Sí. | Sí. | Aún no. | Aún no. | No. |
| IA a través de API/Ollama personalizada | Sí. | Sí. | Sí. | Sí. | Sí. |
| Instalación de AI local incorporada | Sí. | Sí. | Sí, CPU x64. | Aún no. | No. |
| Salve los pases Docker / Kubernetes | Sí. | Sí. | Sí. | Sí. | Sí. |
| Sincronización cifrada, comandos, notas, acceso compartido | Sí. | Sí. | Sí. | Sí. | Puerto provisional |

## Liberar archivos

- Windows x64: EXE instalador y ZIP portátil.
- macOS Apple Silicon/Intel: Universal DMG.
- Linux x64: DEB y RPM; entorno de escritorio con Servicio Secreto.
- Android ARM64: firmado por APK, Android 11+.
- iOS : Aplicaciones ZIP universales para Simulador en Mac, iOS 15+.
  No es una aplicación IPA, TestFlight o un iPhone físico.

Para cada paquete, se publican la versión/número de construcción y SHA-256. iOS Simulador
incluido en el CI obligatorio de la edición 1.0.0: la ausencia de su archivo bloquea la publicación.

## Almacenamiento y sincronización de contraseñas

El archivo local seleccionado se edita en ordenadores. Sistemas telefónicos.
El picker puede devolver una copia temporal, por lo que ConsoleCrypt la importa.
cifrado KDBX en su almacenamiento privado permanente. Cambios de ahorro automático
Esta copia; "Guardar copia local" la carga a través del diálogo del sistema.
El documento original del teléfono no está escrito espontáneamente.

WebDAV funciona lo mismo en todas las plataformas: HTTPS URL con una final `.kdbx` .
Protección contra versiones de conflictos, ahorro automático, cancelación de aperturas y timeouts.
Los parámetros WebDAV se sincronizan internamente E2EE , la contraseña es un secreto separado.
Rutas locales, sobres biométricos y almacenados Docker / Kubernetes -pasajes
No están sincronizados.
