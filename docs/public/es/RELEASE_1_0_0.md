# ConsoleCrypt 1,0

Referencia traducida · [Original en ruso](../RELEASE_1_0_0.md)

## Ruso

El gestor de contraseñas KDBX está integrado en el espacio de trabajo ConsoleCrypt : bases de datos locales.
WebDAV , generador y búsqueda a través de la paleta de comandos. Cuestión para Windows , macOS ,
Linux DEB/RPM, Android y iOS Simulador en Mac. Simulator no es un instalador de iPhone.

- **Passwords:** Crear y abrir KDBX 3/4 con contraseña principal y archivo clave,
  carpetas, tarjetas, campos adicionales, edición, transferencia y cesta.
  Los cambios se guardan automáticamente; PCM en el ordenador y el menú de registro
  El teléfono le permite abrir, mover o eliminar un registro de confirmación.
- ** WebDAV :** completo HTTPS - camino a KDBX , conexiones seguras en cifradas
  sincronización ConsoleCrypt . La contraseña de conexión se mantiene un secreto separado.
  El control de la versión de archivo protege contra la sobreescritura de los cambios de otras personas; la apertura puede ser cancelada.
- **Generador: ** 8-128 caracteres, selección de conjuntos, exclusión de caracteres similares,
  Evaluación de la entropía, inserción en el editor y un portapapeles protegido en general.
- **Palette:** `Ctrl+K` / `⌘K` → `пароли:` → búsqueda de una tarjeta → elección del campo
  copiando. La búsqueda es local; los secretos no son transmitidos por AI y no se insertan en el terminal automáticamente.
- ** Apertura rápida KDBX :** Separar sobre local bajo biometría del sistema
  o dispositivos PIN; en Windows / macOS también FIDO2 con PRF. Android usos
  Sistema Keystore y solicitud de confirmación. La contraseña principal sigue disponible.
- **Phone:** Diseño adaptativo, menús táctiles, almacenamiento sostenible
  Importado KDBX y exportado a través del diálogo del sistema. Local file on
  teléfono - una copia en la aplicación; WebDAV se edita directamente en el servidor.
- ** túneles:** Compruebe "Guardar el túnel" al pasar Docker / Kubernetes
  reiniciar y detenerse de la sección "Tunels". Estos parámetros son locales
  Los túneles existentes SSH siguen sincronizando.
- ** AI local para Linux :** Instalación de tiempo de funcionamiento CPU verificado y los mismos modelos GGUF
  Selección de modelos, recomendaciones de RAM, cancelar / recuperar arranque y ejecutar sin la nube.
  Los paquetes DEB/RPM incluyen dependencias OpenMP/OpenSSL; los pesos se cargan por separado a la elección del usuario.
- **Workspace:** Ver la contraseña en el editor de conexión,
  inicio de sesión / contraseña / dominio RDP, comandos en acceso compartido, copiar
  Dirección de host/usuario, mejores campos de entrada y pestañas terminales.
  Sobre Windows disponible `Ctrl+V` , `Ctrl+Shift+V` y `Shift+Insert` .

Las versiones del servidor y del sitio web son independientes del cliente. Para KDBX / WebDAV no se agregó
Nuevos HTTP puntos finales o migración de servidores: almacena objetos encriptados anteriores.
Actualizar todos los dispositivos a 1.0.0 antes de configurar WebDAV : un cliente viejo puede
No guarde nuevos campos al cambiar la configuración general.

[Менеджер паролей](KEEPASS.md) · [Поддержка платформ](PLATFORM_SUPPORT.md) ·
[Совместимость сервера](COMPATIBILITY_1_0.md)
[Руководство со скриншотами](https://consolecrypt.dev/guide)
