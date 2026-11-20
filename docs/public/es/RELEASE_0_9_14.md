# ConsoleCrypt 0.9.14

Referencia traducida · [Original en ruso](../RELEASE_0_9_14.md)

## Ruso

Las versiones 0.9.3-0.9.13 no han sido publicadas: sus construcciones no han sido probadas en el CI. Eso es.
Entraron, salen a 0.9.14 junto con los arreglos de construcción.

La liberación está disponible para macOS , Windows , Linux y Android . iOS se está poniendo a prueba en Simulator, pero su liberación se ha retrasado por ahora.
Las correcciones de instrucciones funcionan con todos los servidores de sincronización de comandos (0.2.1 y posterior).
servidor 0.2.4 prohíbe además a los participantes cambiar las teclas de comando de otras personas, sólo permite al propietario asignar administradores, y envía invitaciones sólo a direcciones confirmadas.

#Novedad #

- ** Kit de recuperación ** se puede imprimir o guardar en PDF.
- ** Las pestañas de la terminal** se pueden organizar en una columna en el borde izquierdo; lado rodado
  El panel es memorable.
- **Divide el terminal en el panel:** "Divide bien" / "Divide hacia abajo"
  (Cmd/Ctrl+Shift+\/Shift+−) abre otra sesión junto al mismo objetivo, hasta cuatro
  Los paneles en la pestaña; Cmd/Ctrl+] cambia los paneles, los separadores son arrastrar y soltar.
- **El orden de las pestañas terminales** se cambia por arrastrar y soltar (en la banda y en la columna), y en la columna
  Y también con las llaves Alt + ↑ / Alt + ↓.
- **Importar la clave SSH desde el archivo:** Seleccione el botón de archivo en la ventana de importación clave.
- ** Contraseña a la llave SSH ** cuando se conecta es preguntada por una ventana separada con el nombre de la llave,
  No como contraseña de servidor.
- **Import from CSV to SQLite and Cassandra/ScyllaDB.** El asistente de importación está trabajando con
  estas bases. SQLite a través `sqlite3` en el host y Cassandra escribe sin una transacción común
  (CQL no los tiene), por lo que la opción "una transacción por archivo entero" no es para ellos.
  Está mostrando. Cassandra no sobrescribe las líneas existentes.
  `INSERT … IF NOT EXISTS` "Crear una tabla de CSV..." también está disponible para SQLite.
- **SQLite y Cassandra/ScyllaDB.** Se crean y cambian las tablas.
  sin SQL manual y CQL. Cambios a SQLite que no son capaces de `ALTER TABLE`
  una tabla con una única transacción con la preservación de filas e índices; una tabla con disparadores o
  El diseñador no recrea las columnas computadas. Cassandra tiene una llave.
  Particiones, columnas de racimo con orden, índices secundarios, TTL y `gc_grace_seconds`
- **Historia de conversaciones con AI.** El botón de historia de la conversación en chat muestra conversaciones
  esta sesión y almacenada en almacenamiento (ajustando "Conversaciones de almacenamiento con AI en la
  repositorio”); pueden continuar o eliminarse. Relés de conversación continuos
  modelos movimientos anteriores, con datos ocultos, como antes: antes del modelo comenzó con
  Es contexto vacío.

- ** Fuentes del servidor en About.** Para un perfil sincronizado, la ventana muestra
  a link to the source code of your synchronization server (AGPL requirement; the server informs it)
  c `/v1/meta`

- **SQLite: Snippets de arranque e importación desde la línea.** Conjunto de 15 snippets SQLite (scheme, schema, etc.)
  índices, claves extranjeras, control de integridad, tamaño de archivo, plan de solicitud, ANALYZE,
  VACUUM. Las conexiones se importan de líneas `sqlite:///путь.db` y `cassandra://` /
  `scylla://`.

- Corrección.

- ** SFTP : Restaurar ediciones en otros anfitriones.** Conexión abierta a
  restaurar ediciones no salvadas en un host que no está en el navegador, ahora
  Es lo mismo que el último, y no es lo mismo que el último.
  salida de la aplicación.
- ** Edición de archivos por SFTP : copias de seguridad en Windows y Linux .** Directorio de copias de trabajo etiquetadas
  `CACHEDIR.TAG` y `.nobackup` , por lo que borg, restic, tar, Duplicity, Back in Time, y
  Otros programas de respaldo que tienen estas etiquetas en cuenta lo echan de menos.
  (on macOS ), todavía está excluido de la máquina del tiempo.
- ** Pantalla de lanzamiento.** En el lanzamiento, el signo actual ConsoleCrypt se muestra en un fondo oscuro: en iOS
  en lugar del anterior logotipo de naranja, el Android a 12 en lugar de la pantalla blanca.
- ** Inicie error en ruso.** Pantalla que aparece si la aplicación falla
  Comienza, traducido al ruso e inglés.
- **SQLite: VACUUM.** Confirmado `VACUUM` en la sección Bases de Datos ya no es
  Se negó: antes fue bloqueado por una prohibición de conectar otras bases al período de sesiones.
- **Sincronización del almacenamiento remoto.** Si el almacenamiento se elimina en el servidor, sincronización
  se detiene por una razón comprensible ("storage not found on the server") en lugar de repetir
  No tiene fin.

- **Synchronization of Cassandra/ScyllaDB and SQLite connections via host.**
  a través del almacenamiento" transfiere tal conexión de contraseña al almacenamiento, si todos los dispositivos
  Las cuentas se ejecutan en 0.9.2 o posterior (con el servidor 0.2.4, la aplicación ve sus versiones y
  Voy a enumerar los que necesitan ser actualizados. El archivo SQLite en este ordenador permanece aquí.
- **Recordantes con una aplicación cerrada.** Notas y tareas vienen al sistema
  notificación "Recordar de ConsoleCrypt " - sin el texto de la nota, el centro de notificaciones no es
  encriptado. Android tiempo se puede mover en unos minutos, por Linux recordatorios
  Todavía funciona sólo con una aplicación abierta.
- ** SFTP : arrastrar y soltar a Finder y Explorer.** En macOS y Windows archivos de la lista de host
  arrastrar y soltar directamente a Finder o Explorador: el archivo se descarga a una carpeta temporal,
  se transmite al sistema y se elimina, el movimiento es visible en "Transmisiones". Las carpetas siguen siendo un equipo
  "Descargar." Arrastre dentro de la aplicación y desde Finder / Explorer funciona como antes
  (on Linux - también, pero sin arrastrar fuera).
- **Local AI: su modelo GGUF.** Añadir su modelo (GGUF) ...
  archivo en la carpeta de modelos con la reconciliación SHA-256 y lo convierte en el modelo actual; "Delete" elimina
  Copia. Compruebe el origen y la licencia de su modelo usted mismo.
- **Actualizaciones a Linux .** Una copia de DEB o RPM comprueba las actualizaciones en el lanzamiento y
  los instala de la aplicación: cinta firmada separada Linux , comprobar SHA-256,
  contraseña de administrador a través `pkexec` e instalación apt, dnf o zypper, entonces
  "Reset." Versión 0.9.14 en Linux instalar manualmente.
- **Teams.** Sólo el dueño del equipo puede sacar al anfitrión del equipo. Copia y transferencia
  hosts ya no producen copias de la llave: la misma clave se utiliza en el almacenamiento objetivo
  Repita, y las credenciales del equipo están marcadas en la lista con una etiqueta de comando. En la barra lateral.
  Docker se muestra con la misma placa en el teléfono.
- **Línea de mantenimiento.**El cliente de consola `consolecrypt-cli` está incluido en los instaladores para
  "Configuración → Comando Prompt → Establecer comandos CLI" lo hace
  Disponible en el terminal; comandos y banderas en [CLI.md](CLI.md) .
- **QR del kit de recuperación sin escribir.** Al acceder al código QR del kit es restaurado
  Usted puede escanear la cámara del teléfono o leer desde una imagen o captura de pantalla (cualquier
  plataforma). El reconocimiento es fuente abierta en el dispositivo, el vídeo no va a ninguna parte.
- ** Acceso compartido a los anfitriones RDP.** El host RDP puede compartirse con un colega de confianza:
  dirección, puerto, usuario, dominio y etiquetas; notas y contraseña guardada - sólo por
  Mark. El servidor y el protocolo no cambian; los clientes hasta 0.9.14 no muestran tal tarjeta.
- **Importar CSV para ClickHouse, MongoDB y Redis.** ClickHouse en paquetes `INSERT` (y)
  “Crear una tabla de CSV...” con MergeTree; MongoDB – en la colección, con nuevos campos en
  cabeceras, saltar y actualizar en `_id` ; Redis - en la base de datos o carpeta de llaves, filas
  `SET` o hashes `HSET` .
- ** constructor de tablas.** Comentarios con un apostrofe; in PostgreSQL - removal of identity,
  Cambiar ALWAYS ы BY DEFAULT and UNLOGGED; in ClickHouse – renombrar la tabla, eliminando
  Valores predeterminados y comentario de columna.
- **Cassandra/ScyllaDB: todos los nodos del grupo.** Solicitudes directas
  distribuidos a todos los nodos del centro de datos, y si el nodo falla, cambian a otros;
  Anteriormente, la sesión trabajó a través de un solo nodo. Con ScyllaDB - en la conexión para cada shard
  a través del puerto de shard-aware. A través de SSH, túneles y chutes todavía están a través de un nodo.
- **Cassandra/ScyllaDB: localización de consultas** en lugar de EXPLAIN, que no está disponible en CQL:
  La solicitud se ejecuta una vez con un trazo, la ventana muestra los pasos y demoras de cada
  Es un nodo de árbol, como un plan SQL. Sólo para conexiones de no producción, con confirmación.
- **Cassandra/ScyllaDB: edición de celdas.** Nueva edición de células en la tabla de resultados
  Está disponible (la interfaz no lo permitió antes). Las líneas de una fiesta cambian una.
  condicional `BATCH` - todo o ninguno; si las ediciones afectan a varias partes, la ventana
  Los cheques advierten que juntos no cambian. Las columnas clave no son editables.
- ** Kubernetes : Las sugerencias de AI en un ordenador arrancado.** Manifiesto de la respuesta de AI abre
  en la ventana de creación y cuando el ordenador está ocupado: el segundo a parse se cuenta después de la puesta en marcha
  Es un procesador separado, no con él.
- ** Kubernetes : "Resource Flow."** Encabezamiento ya no repite, busca, filtros y
  La lista no se encuentra entre sí, y la elección del espacio de nombres y etiquetas parece
  Los otros filtros.

**Sincronización.** Con el servidor 0.2.4 (Protocolo 1.13) Eliminación del almacenamiento solicitada
dispositivo de confianza, retrasado durante 7 días; muestra de dispositivo de confianza
alerta en "Sincronización" y puede guardar el almacenamiento.

**Seguridad.** Corrección después de una revisión de la seguridad del código.

- **Teams: Confirmación del participante.** Las teclas del equipo reciben exactamente las claves del participante.
  El código se calcula en la pantalla del administrador. Si el servidor le notificará después de la reconciliación
  Otras claves o roles, el add-on fallará, y el código debe ser revisado de nuevo. Antes.
  El servidor comprometido podría haber intercambiado las llaves entre la reconciliación y la confirmación y recibido
  Acceso a la bóveda de equipo.
- **Teams: Introducción.** El código que el invitado dicta al administrador es ahora
  El comando está atado a la llave del administrador. El equipo sólo abrirá si
  Agregó al participante; un comando falso montado por el servidor, la aplicación
  No lo hará.
- **Comandantes: se fija la tecla de comando.** La aplicación recuerda la tecla de comando con la que se adjunta la tecla de comando.
  Funcionó. El servidor ya no puede reemplazarlo: otra clave de la misma era o una nueva.
  La clave, que no está vinculada a la cadena anterior, conduce a una pausa del comando, no a un registro.
  nuevos datos bajo una falsa llave.
- **Teams: Administrator confirms key.** Server 0.2.4 (Protocol 1.12)
  el propietario o administrador firma la huella dactilar de la tecla de comando cuando se crea,
  Cambia la llave y antes de añadir un miembro. Un nuevo miembro abre un equipo, sólo
  Si la llave coincide con la huella firmada, el servidor ni siquiera puede reemplazar la llave.
  en la primera apertura. Para los equipos creados anteriormente, la impresión publica la primera
  Administrador que abrió el comando en 0.9.14.
- **Compartir: sus dispositivos.** El dispositivo que el servidor pasa a medida que el suyo es más grande.
  no se convierte en receptor de un secreto, conexión Kubernetes o base de datos:
  Los dispositivos sólo pueden compartirse mediante una conexión confirmada. Búsqueda
  La dirección de su cuenta es rechazada.
- ** SFTP a Windows .** Al descargar los nombres de carpetas del formulario `C:файл` , `файл:поток` , `CON` .
  `NUL` o con un punto/espacio al final ya no se acepta: anteriormente, el servidor podría escribir
  archivo fuera de la carpeta seleccionada o eliminar la etiqueta "descargada" del archivo vecino
  Internet.
- **AI: Evaluación de riesgos de los equipos.** Equipos que ejecutan programas o los escriben
  ficheros ya no marcados como “sólo leído”: `env -S '…'` , `fd -x/-X`
  `rg --pre` , scripts `sed` con comandos `e` / `w` y banderas `s///e` / `s///w` , `awk` con
  `| getline` o archivo del programa, `git -c …` . De nuevo, tienes que recordar que
  Usted entiende el riesgo, antes de hacerlo.
- **Nuevo dispositivo: Confirmación sin verificación.** Si el servidor ha informado
  a este dispositivo que soporta la verificación del código par, cambiarlo al viejo
  Ya no puede hacerlo sin verificación: tal confirmación es rechazada. Aprobación
  El dispositivo debe ser la versión 0.9.2 o posterior.
- **Sincronización: datos dañados.** Si el servidor envía un objeto que no es
  pasa la autenticación, la aplicación muestra una advertencia y deja
  La última buena copia local, en lugar de sustituirla por datos no legibles.
- ** SSH -agent to Windows .** Canal embebido SSH -agent ahora está disponible sólo para su
  cuenta y sistema: anteriormente, los administradores podrían conectarse a él por defecto,
  Y para leer, cualquier usuario.
- **Dependencias.** `crypto-bigint` 0.7.10 (RUSTSEC-2026-0387, desigual con el tiempo)
  Ejecución de operaciones que deben ser permanentes `tokio` 1.54.1
  (RUSTSEC-2026-0386) y actualizaciones programadas `hyper`, `uuid` , `tokio-rustls` , `xml` y
  otras bibliotecas. Los certificados de PEM y las claves de bases de datos se leen a través `rustls-pki-types`
  Los no apoyados `rustls-pemfile` .
