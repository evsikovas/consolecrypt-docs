# ConsoleCrypt 0.1.20 · Comprobación de números

Referencia traducida · [Original en ruso](../RELEASE_0_1_20.md)

Fecha: 1 de octubre de 2026. Etiquetas del código `v0.1.20`
commit `9cc4baaca4a6b451c23d835823a35300a0c77e54` . Todos los paquetes están en uso
el núcleo actual de Rust; `CC_MOCK=false` .

| Plataforma | Paquete | Versión nativa |
|---|---|---|
| Windows 10/11 x64 | EXE y ZIP portátil | 0.1.20+1231 |
| macOS Apple Silicon e Intel | Universal DMG | 0.1.20+1232 |
| Android 11+ ARM64 | APK | 0.1.20+49 |
| iOS Simulador en Mac | ZIP, dos partes para GitLab | 0.1.20+48 |

## ¿Qué ha cambiado?

Compartir hosts seleccionados, snippets, colecciones y por separado
Secretos confirmados. VRK personal no se transmite. Los dispositivos están verificando la totalidad
código; cada objeto utiliza sus propios sobres DEK y participante.
Reader/Editor, retroalimentación con rotación, cola de cambios cifrados están disponibles,
Comprobando historia y recuperación firmadas después de operaciones interrumpidas.
Dispositivos propietarios adicionales se permiten a través del propietario-online
permisos con límite de función, plazo y cuota; modo manual utilizado
por defecto. [Процесс и границы защиты](SHARING.md)

Entrega definitiva fija SSH y cierre de ocio
FRB stream: El productor nativo cierra, luego la vieja suscripción.
Los últimos acontecimientos de una antigua conexión no completan una nueva.

Añadido iOS corredor, núcleo de Rust estático, Keychain/LocalAuthentication,
Guardias móviles y misiones independientes de regresión/previsión.

## Comprobaciones.

- óxido de cliente: **634 PASS**, 7 pruebas de fijación externa excluidas
  Todo el clippy del espacio de trabajo pasa. Cajas comunes: **61 PASS**.
- Flutter: **461 PASS**, análisis sin comentario. GitLab Pipe160 también está disponible.
  completaron los 461 ensayos en Windows y macOS antes del montaje; trabajos1231/1232
  Completado con éxito. Esto no es un cheque de teclado físico para todos los PCs Windows10.
- Integración compartida de app-core real: **12 PASS, 0 ignorado**, PostgreSQL
  SQLCipher, FileMailer, Registro/Verificación y aprobación de dispositivos.
  Comprobado cuatro tipos de objetos, roles, revisión, nuevo DEK, manual / automático
  Admisión, respuestas perdidas, repetición, reiniciar y soltar/congelar.
- Servidor: **166 cheques reales de PG**, incluyendo dump/restore, CAS, RBAC
  y firmas. Servidor 0.1.10 se libera por separado, cuatro características comunes
  El acceso está habilitado por el operador; el cliente comprueba las capacidades del servidor seleccionado.
- Windows ZIP: CRC, versión de recursos0.1.20+1231
  `cc_bridge.dll` , que coincide con SHA-256 con el trabajo1231 artefactos.
- macOS DMG: Integridad `codesign --verify --deep --strict` , versión 1232,
  ARM64/x86_64 para la aplicación y todos los marcos, incluido el puente Rust.
  Hay un enlace de Aplicaciones dentro.
- Android APK: signature, `zipalign -P 16` , ELF mapping/RELRO of the three native
  bibliotecas. El certificado es el mismo que 0,113; versión 0.1.20/code49.
- iOS regresión nativa47: **2 PASS**. Keychain/SQLCipher, TextInput
  Cirílico/Retorno, resaltar/copia/paste, dos pestañas, ciclo de vida,
  Unicode SFTP , desconexión/reconexión, retención de amortiguadores y cierre activo
  Tabs ≤ 5 segundos; limpieza sin timeouts. Producto separado48 instalado
  y funcionando en Simulator, versión/ZIP/SHA-256/ARM64+Intel verificado.
- Exportación pública neta: **982 archivos**, ninguna historia privada
  Secretos, el despliegue en vivo anula, el agente Markdown y construye.
  Están presentes vías de montaje obligatorias y enlaces de documentación local.

## Publicación

La versión de GitLab contiene siete enlaces de archivos: DMG, EXE, Windows ZIP.
dos partes iOS Simulador y APK, así como el SHA256SUMS general. Son accesibles sin entrada.
[Сайт](https://consolecrypt.evsikov.net) muestra nuevos paquetes en ruso
e inglés; cuenta personal y API son atendidos separadamente de la página de aterrizaje.

El canal de actualización firmado produce 0.1.20 para Windows 1231, macOS 1232
y Android 49. Firma Ed25519 verificada por clave cliente; dimensiones y SHA-256
Esto es consistente con instaladores publicados. Capacidades de servidor colaborativos
Las obras son incluidas por el operador independientemente de la publicación del cliente.

## Límites de aceptación

iOS ZIP se ejecuta en Simulator en un Mac. No es una SIP para un teléfono.
Face ID, teclado físico, red Wi-Fi/celular y fondo
Los iPhones requieren un dispositivo conectado y una firma de Cuenta Personal Team/Apple.
La prueba inyecta Flutter TextInput/lifecycle, no eventos de la vida real del sistema operativo del teléfono.
[Установка частей архива и дальнейшая проверка](BUILD_IOS.md).

Nuevos EXE/APKs no se instalan en la parte superior de las aplicaciones de usuario en este
Adelante. Aceptación en Windows10 problemático PC y físico Android permanece
Un cheque separado. Paquetes preliminares: Windows sin autenticidad, macOS
sin la notarización de Apple, Android con la firma de desarrollo anterior.

La revisión protege nuevos datos, pero no elimina copias de lectura o cambio
SSH credenciales en el servidor de destino. Preserve antes de la actualización
kit de copia de seguridad y recuperación cifrado.

[Релиз и SHA-256](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.20)
· [Обновления](UPDATES.md) · [Свой сервер](HOSTING.md)

Español: esta versión añade selectivo participación encriptada de extremo a extremo, verificada
Dispositivos de lectura/editor y registro explícito del dispositivo de propiedad en línea. El cliente.
pasado 634 Rust, 461 Flutter y 12 cheques de compartir de back-backend real. Los tres.
Los instaladores de escritorio/móvil fueron construidos y comprobados; la vista previa de iOS48 aprobada
instalación/startup en Simulator después de la regresión nativa47. iPhone físico
la aceptación y la firma permanecen separados; el ZIP no se instala en un teléfono.
