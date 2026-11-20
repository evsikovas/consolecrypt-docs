# ConsoleCrypt 1.1.0

Referencia traducida · [Original en ruso](../RELEASE_1_1_0.md)

## Ruso

Terminal de escritorio Minimalist, gestor de contraseña más fácil de usar y
separado Android - conjuntos para RuStore .

- **Minimalismo** en Windows , macOS y Linux : botón sobre el terminal y
  Ctrl+Shift+M/ M esconde los bares de aplicaciones, dejando el terminal y las pestañas.
  Las pestañas se pueden colocar en la parte superior o izquierda. Sesiones abiertas, retiro, división
  La terminal y la paleta Ctrl+K/ K se guardan. En los teléfonos, este modo no se enciende.
- ** SFTP del terminal**: el botón de la parte superior izquierda y la acción "Abrir SFTP " en el PCM
  por SSH - ficha archivos abiertos del servidor correspondiente, guardando el terminal
  sesiones. También funciona en un modo minimalista.
- **Passwords KDBX **: la lista muestra sólo bases de datos desbloqueadas. Una pequeña.
  el botón de bloqueo abre las bases de datos almacenadas restantes; sus parámetros WebDAV y
  Los menús de control permanecen disponibles hasta que se desbloquean.
- Filtros "Todos los registros" y "No carpeta" están separados de los grupos reales, la cesta - de
  carpetas activas. Se conservan la Jerarquía y los datos KDBX. Las tarjetas de campo son de acero
  Es más compacto, incluyendo los valores largos y la escala de texto aumentada.
- En la línea abierta WebDAV -bases, el menú de configuración de acceso rápido está disponible a través de
  autenticación del sistema y una clave física donde estos métodos son compatibles.
  El primer desbloqueo requiere una contraseña; se mantienen las restricciones de la plataforma FIDO2.
- **SQL**: Las barras de desplazamiento verticales y horizontales aumentan
  cuando apuntan y arrastran. Edición retenida y columnas fijas.
- **Los asientos** están doblados haciendo clic en el encabezado del bloque; los valores introducidos
  Todavía están ahí. Sección SFTP ha sido renombrado "Default Editor for SFTP ".
- ** RuStore **: APK y AAB firmadas por la producción separada Android 11+ ARM64.
  No hay REQUEST_INSTALL_PACKAGES o instalación APK incorporada.
  Las actualizaciones se realizan a través de RuStore . El APK normal sigue siendo un canal separado.
  Compatibilidad con versiones previamente instaladas.

Para RuStore , se utilizan las teclas de aplicación permanente y descarga. Nuevo
la clave de producción difiere de la anterior Android llave de vista previa/debug:
En la transición entre tales instalaciones, guarde una copia de seguridad de los datos locales.
Publicación de archivos en GitHub no significa moderación RuStore .

Disponible Windows x64, universal macOS DMG, Linux DEB/RPM, Android APK,
RuStore APK/AAB y iOS Simulador en Mac. El archivo Simulator no está instalado en el iPhone.
Servidor de sincronización y formato de datos cifrado sin cambios; actualización
No se requiere ningún servidor para esta versión. No se agrega la integración con Apple "Passwords".
