# ConsoleCrypt 0.8.6

Referencia traducida · [Original en ruso](../RELEASE_0_8_6.md)

## Ruso

La versión está disponible para macOS , Windows , Linux y Android . La Asamblea e inspección iOS se aplazaron.

** Acceso compartido a las conexiones de bases de datos.** Conexión guardada ahora
Usted puede compartir con un dispositivo de confianza de un colega, así como anfitriones y
contexts Kubernetes . Necesita un servidor de sincronización 0.1.15 o posterior
la función está incluida; en `sync.consolecrypt.dev` se activa. El viejo.
El servidor no muestra el elemento "Compartir".

- “Compartir” en el menú de conexión en la sección “Databases”. Antes del envío.
  Usted puede ver los campos que un colega recibirá: motor, dirección, puerto, base, usuario,
  TLS, limites y la marca "prod".
- Group, request history, AI settings, and session permissions are not shared.
  La contraseña y la clave del cliente sólo quedan en la marca explícita y sólo si el servidor
  Mantiene secretos en común.
- La ruta a través del host SSH, perfil de salto, proxy o túnel no se transmite:
  El destinatario elige el suyo. El espacio se mantiene en el paso Kubernetes .
  Nombres y cargas Docker – el nombre del contenedor. Tal conexión no es posible.
  Mantenlo como recto.
- Las conexiones compartidas son visibles en la sección "Databases" con la etiqueta "General" (su propio -
  "Compartiste." Desde allí, puedes aceptar la conexión, guardar una copia personal,
  gestionar a los participantes y revocar el acceso.
- Una copia de la conexión del producto sigue siendo una conexión del producto y sólo se abre para la lectura.
- Las conexiones se pueden añadir a las colecciones generales.

La revocación del acceso no cancela la contraseña ya copiada - cambiarla en el servidor
bases de datos.

**Importante después de la actualización.**

- Desbloqueo de dispositivos (Touch ID, Windows Hola, print) se apaga.
  hasta que abra la bóveda una vez con una contraseña. La aplicación se vuelve a encriptar.
  base de datos local y oferta para encenderlo de nuevo - ahora la clave da
  El sistema es sólo después de la biometría.
- En Windows , una actualización de una versión anterior a través de un banner puede no funcionar.
  Instala esta versión manualmente desde el sitio. Más actualizaciones a través de la bandera
  La aplicación está cerrada, el instalador actualiza y la lanza de nuevo.

* Bases de datos*

- "Desbloquear el producto" en el panel superior: entrada a la base de productos en 5, 15 o 30
  minutos después de la contraseña de almacenamiento e introducir el nombre de conexión. Cada cambio.
  todavía está confirmado, al expirar el tiempo, el registro se cierra de nuevo,
  Estas solicitudes están marcadas en la historia.
- Haga doble clic en la celda – editar en la mesa (Enter, Esc, Tab) si
  Entrada permitida. El tipo de valor se extrae de la columna, no es necesario elegirla.
- е / Ctrl+Enter sin resaltar realiza el operador en la línea del cursor, en que
  Es un número multilínea.
- Tablas DDL - con números retroiluminados, líneas, botones "Copiar" y
  "Abre en el editor."
- Haga clic en resaltar la celda; las líneas se resaltan haciendo clic por número, con Shift o у.
  Copiar, exportar y trabajar en IA con el dedicado.
- PostgreSQL ya no cambia sin avisar a una conexión sin TLS:
  sin encriptación - sólo a través del túnel o en este ordenador; contraseña
  Está conectado a la conexión TLS. En el espacio de trabajo, el estado de cifrado es visible.

*Safety*

- Protección contra el inicio de sesión de un nuevo dispositivo (synchronization server 0.1.16): una carta
  Cada nuevo dispositivo con un enlace a “No soy yo”, una notificación en el dispositivo
  Dispositivos marcados "no confirmados". El nuevo dispositivo no se puede utilizar durante 14 días.
  retirar confianza, la liberación de datos para el desbloqueo es limitada.
- Docker : Las contraseñas se ocultan no sólo en variables, sino también en direcciones, comandos, etc.
  Etiquetas, JSON y navegar por composse; texto completo - después de la contraseña de almacenamiento.
  Guardar el archivo compose está protegido contra el intercambio de archivos.
- Las bibliotecas TLS han sido actualizadas y las dependencias se revisan automáticamente.

** Kubernetes y Windows

- Los botones Flux se llaman claramente “Sync Now”.
  “Stop/Renew Synchronization” y explicar lo que están haciendo.
- Los caminos Windows se muestran como ordinarios, sin el prefijo `\\?\` .
