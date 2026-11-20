# ConsoleCrypt 0.9.15

Referencia traducida · [Original en ruso](../RELEASE_0_9_15.md)

## Ruso

Cuestión para macOS, Windows, Linux y Android El servidor de sincronización no cambia: es adecuado
cualquier servidor compatible (0.2.1 y posterior).

**Fixed: El bloqueo ya no cierra las sesiones.**

- Una vez que el almacenamiento se bloquea automáticamente (o se bloquea manualmente), todos están abiertos.
  las sesiones continúan funcionando: SSH -terminals and local terminals, RDP-sessions,
  SSH túneles y sesiones Kubernetes con sub terminales y gotas portuarias. Poco después.
  El desbloqueo estaba cerrado.
- Mientras el almacenamiento está bloqueado, no se abren nuevas conexiones, y las pestañas RDP están en la parte posterior.
  pausa; después del desbloqueo, todo continúa desde el mismo lugar.
- Si los ajustes de conexión al clúster Kubernetes han cambiado durante la cerradura, será
  La sesión se cierra y se abre de nuevo, como antes al cambiar la configuración.
- Las sesiones siguen cerradas cuando el perfil cambia y sale. SFTP , Docker y conexiones a
  Las bases de datos están cerradas cuando están bloqueadas, como antes.

**Nuevo: Clave de Seguridad Física (YubiKey, FIDO2) - Versión de vista previa.**

- El almacenamiento se puede abrir con una llave de seguridad USB – YubiKey u otra llave FIDO2 con una llave de seguridad.
  extension `hmac-secret` y su código PIN. Incluido en **Configuración → Almacenamiento →
  Clave de seguridad física**, aparece un botón en la pantalla de bloqueo
  "Desbloquea con la llave de seguridad".
- Opera en Windows 10/11 (PIN y touch pide ventana Windows , derechos de administrador
  no es necesario) y macOS (PIN pide la aplicación, luego muestra "Touch the key").
  Linux y las plataformas móviles todavía no están soportadas.
- La función es opcional y funciona para este almacenamiento en este dispositivo: la clave
  sella la clave de almacenamiento en un sobre local, que no se sincroniza,
  Va a las copias de seguridad y al servidor. La frase de contraseña y la clave de recuperación continúan
  trabajo. Detalles: [Ключ безопасности](SECURITY_KEY.md) .

**Seguridad.** `libz-sys` 1.1.31 (RUSTSEC-2026-0418: el script de construcción podría escribir
variables de entorno de montaje en el catálogo `target/` . Las asambleas ConsoleCrypt no se vieron afectadas.
Utilizaron `cc` 1.5.1, y la fuga se produce con `cc` 1.6.0.
