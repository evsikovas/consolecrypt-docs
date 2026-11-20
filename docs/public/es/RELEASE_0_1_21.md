# ConsoleCrypt 0,1.21 · Instaladores y guías

Referencia traducida · [Original en ruso](../RELEASE_0_1_21.md)

Fecha: 1 de octubre de 2026. Código verificado: etiqueta `v0.1.21` .
commit `f9d9094e44d5118d4d8938b68eac55bb5ea7228b` .
Todos los paquetes usan un verdadero núcleo de Rust `CC_MOCK=false` .

| Plataforma | Paquete | Versión dentro del paquete |
|---|---|---|
| Windows 10/11 x64 | EXE carried by ZIP | 0.1.21+1237 |
| macOS Apple Silicon e Intel | Universal DMG | 0.1.21+1238 |
| Android 11+ ARM64 | APK | 0.1.21+51 |
| iOS Simulador en Mac | ZIP en dos partes | 0.1.21+52 |

El lanzamiento actualiza los instaladores después de que el cheque de acceso compartido se complete y
iOS. El comportamiento de la aplicación corresponde a 0.1.20 verificados; nuevos números
las asambleas están presentes en About y metadatos nativos. El sitio recibido
[руководство на русском и английском со снимками интерфейса](https://consolecrypt.evsikov.net/guide).
Explica la primera puesta en marcha, almacenamiento, conexión de dispositivos SSH / SFTP .
Snippets, AI, grupos, túneles, compartir, respaldos y actualizaciones.
El manual contiene 26 capítulos y 54 instantáneas; el sitio ha pasado 19 automáticos
Se perdió un cheque opcional de API en vivo. Despliegue
sitio separado de API completado; 83 rutas / activos públicos verificados
conmutación de lenguaje, búsqueda, visualización en el teléfono e inmutabilidad de la API.
Imágenes muestran widgets reales con datos demo y ocultos
Secretos; estos no son instantáneas de almacenamiento de usuarios.

## Comprobaciones.

- GitLab pipeline164: Windows trabajo1237 y macOS trabajo1238 con éxito
  **461 Prueba de Flutter** y **6 cheques de versión** cada uno, luego empaquetados.
- macOS : Transmisión de la integridad del DMG y del codiseño profundo/stricto; Runner , Flutter,
  Los marcos de aplicación y óxido contienen rebanadas de ARM64 e Intel; aplicaciones de enlace
  Está presente. Windows : CRC portátil ZIP, presente Rust DLL y
  La versión nativa de EXE ha sido verificada.
- Android : versiónName0.1.21/code51, la firma es la misma que la APK anterior,
  zipalign16KB y ELF mapping/RELRO son las tres bibliotecas nativas.
- iOS52: CRC, versión, SHA-256 y ARM64/Intel Simulator rebanadas comprobadas
  El paquete se instala y se ejecuta en un Simulador separado. Después de la inspección, temporal
  Simulador eliminado, el usuario guardado.
- El código principal de Rust y servidor sigue sin cambiar: 0.1.20 cheques permanecen
  634 Rust, 61 compartidos, 12 en el servidor real-backend, 166 real-PG
  y dos iOS cheques de regresión nativa. [Подробная приёмка](RELEASE_0_1_20.md)
- Embalaje local Android ahora sustituye atópicamente a la última APK; dos
  La prueba de regresión revisa para la liberación vieja y dilatada
  Guardar lo último anterior cuando la copia falla.

## Instalación y límites de verificación

[Релиз, установщики и SHA256SUMS](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.21).
Actualizar servidor ya publica feed0.1.21: Windows1237, macOS1238
y Android51. La firma Ed25519 es verificada por el anclaje de confianza público del cliente.
Las dimensiones y SHA-256 coinciden con los archivos de liberación descargados anónimamente.
Para iOS , descargar ambas partes de ZIP y combinarlas por [инструкции](BUILD_IOS.md) .
Es una construcción para el Simulador, no una instalación IPA para el teléfono. ID facial,
Teclado en pantalla, red y fondo en un iPhone real requieren
Dispositivo conectado y firma a través de la cuenta de Apple / equipo personal.

Windows EXE y Android APK no fueron montados sobre la cabeza en esta carrera.
aplicaciones de usuario. Comprobación de ordenadores Windows10 problemáticos y
El físico Android sigue siendo una admisión separada. Paquetes preliminares:
Windows sin autenticidad, macOS sin la notarización de Apple, Android con anterioridad
con una firma de desarrollo. Antes de actualizar, guardar una copia de seguridad encriptada
copia y kit de recuperación.

Las capacidades de colaboración son incluidas por el operador del servidor separadamente de
La publicación del cliente. VRK personal no es compartido; compartido por seleccionado
objetos y dispositivos verificados. El examen no borra copias de lectura anteriores
y no cambia SSH credenciales en el host destinatario. [Руководство](SHARING.md)

Inglés: verificado Windows , macOS y Android instaladores más un iOS Simulador
Previsualización. La guía bilingüe ilustrada cubre el flujo de trabajo completo.
Windows / macOS CI cada uno pasó todas las pruebas de Flutter 461 antes del embalaje, iOS52
fue instalado y comenzó en Simulator; firma y aceptación física del iPhone
permanecer separado. Compartir la disponibilidad es controlada por el servidor seleccionado.
