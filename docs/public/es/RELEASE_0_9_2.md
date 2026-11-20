# ConsoleCrypt 0.9.2

Referencia traducida · [Original en ruso](../RELEASE_0_9_2.md)

## Ruso

La versión está disponible para macOS , Windows , Linux y Android . La Asamblea e inspección iOS se aplazaron.
Las nuevas funciones clave de intercambio y verificación funcionan con el servidor de sincronización 0.2.2.

* Nuevas bases de datos*

- **SQLite** - archivos en este ordenador, así como en el host SSH, en el contenedor Docker o
  Presentar Kubernetes a través del programa `sqlite3` (sin copiar el archivo). Default only
  leyendo. Árbol: tablas con columnas "nombre (TIP)", claves, claves extranjeras, enlaces y
  Triggers; representaciones, índices, secuencias, disparadores de mesa y tipos de datos.
  DDL, plan de solicitud, exportación, corrección de células.
- **Apache Cassandra y ScyllaDB (CQL)** - espacio clave, tablas y estructura de usuario
  tipos, DDL, resultados de página por página, edición de celdas por llave primaria completa, exportación,
  Modo sólo lectura para la venta; todas las rutas SSH , túnel, Kubernetes , Docker .
  A través del túnel, las solicitudes pasan por un nodo del grupo.
- Las conexiones SQLite y Cassandra en esta versión sólo se almacenan en este dispositivo:
  No están sincronizados o compartidos.

** Gestión de la base de datos.**

- ** Constructor de mesa** para PostgreSQL , MySQL/MariaDB y ClickHouse, creando colecciones
  MongoDB: columnas, llaves, llaves extranjeras, índices, cheques y parámetros del motor. Cambios en los cambios
  se acumulan en un borrador y visible en un árbol; "Guardar cambios" muestra el SQL final y
  Lo realiza después de la confirmación (en PostgreSQL - en una transacción).
- ** Panel de resultados:** Actualización con Actualización automática, Guardar (con Mostrar SQL) y
  “Cancel”, adición, duplicación y supresión de líneas, transición lineal, exportación y
  Importación, tamaño de porción y "Descargar todas las líneas", barra de estado. Cambios en la línea
  Acumularse a “Guardar” y son ejecutados por una única transacción en una clave. Tipos de tabla,
  "Texto" y "Write"; iconos de tipo y clave en las partidas.
- **Import CSV** a tablas PostgreSQL, MySQL y MariaDB: vista previa, codificación,
  autodeterminación del separador, comparación de columnas con comprobación de tipo, inserción,
  omisión o actualización clave, informe de error, progreso y cancelación.
- El botón **Snippets** (омJ/Ctrl+J) inserta un fragmento bajo el texto del editor.
- ClickHouse: La comprobación de sólo lectura tiene en cuenta el registro de nombre de la función, igual que ClickHouse.

*Safety*

- **La llave de almacenamiento está controlada por el dispositivo.** El dispositivo recuerda la impresión clave.
  almacenamiento y no recibe otra clave del servidor: si la discrepancia se muestra
  La advertencia, la sincronización se detiene.
- **Nueva aprobación del dispositivo:** Ambos dispositivos muestran un código común de pares y una firma
  La aprobación cubre la llave de almacenamiento. Con el viejo servidor, la llave está etiquetada.
  “No confirmado” antes de introducir la contraseña de almacenamiento.
- ** Comprobaciones de acceso público de los compañeros de trabajo:** Las llaves de los colegas están aseguradas y verificadas por código
  seguridad o código QR; cuando cambia las teclas, el nuevo acceso está bloqueado. Secretos,
  Los contextos Kubernetes y las conexiones de bases de datos por defecto se emiten únicamente a los usuarios verificados.
  receptores. El código para agregar sus dispositivos se introduce en la pantalla de otro dispositivo.
- **Confirmación con Touch ID, Windows Hola o huella** en lugar de contraseña de almacenamiento
  Si el dispositivo está habilitado para desbloquear a través del sistema operativo. Cambio de contraseña, kit
  Restauración, respaldos, aprobación de dispositivos y seguridad de la cuenta
  Todavía necesitan una contraseña. Configure “Confirma acciones con biometría”.
- **Buffer:**Los secretos escogidos no lo convierten en historia de amortiguación Windows y
  amortiguador de nube, portapapeles universales macOS y gestores de amortiguadores Linux
  Android se eliminan a tiempo incluso desde la aplicación plegada. Asignación en la terminal y
  Los registros tampoco lo hacen en la historia del búfer.

**Sincronización** (servidor 0.2.2).

- El cliente cumple con los límites del servidor: al limitar las solicitudes, el estado muestra
  “El servidor restringió temporalmente la sincronización, continuar en ChCh:MM” en lugar del error.
- Si se supera el límite de objetos de almacenamiento, los cambios no aceptados permanecen en el dispositivo.
  La página Synchronization ofrece “Repeat” después de la limpieza.
- Mensajes claros sobre los límites de dispositivo y demasiados dispositivos nuevos
  Un día.

**Notas.**

- Guardar el botón (пS/Ctrl+S) y guardar el estado.
- Notas de host - de la tarjeta de host (sin conexión) y la elección del host en el panel.
- Una nota cuyo objeto es eliminado o inaccesible permanece marcado “No atado”.
  Puede ser re-tirado. Las notas a los objetos de equipo son personales.
- Los errores repetidos se muestran con una sola notificación.
