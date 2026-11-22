# Bases de datos / Bases de datos

Referencia traducida · [Original en ruso](../DATABASES.md)

## Ruso

La sección Bases de Datos funciona con PostgreSQL , MySQL y MariaDB, ClickHouse, Redis.
MongoDB, Apache Cassandra y ScyllaDB, así como archivos SQLite. Es la estructura de la base.
editor de consultas con fichas e historia, tabla de resultados, EXPLAIN, edición de celdas,
Table builder, copying and exporting, and AI Assistant. Los conductores se construyen
`psql` , `mysql` , `clickhouse-client` , `redis-cli` , `mongosh` y `cqlsh`
no necesitan instalarse por separado. La sección está disponible en macOS, Windows, Linux y Android. Para iOS, CI empaqueta la aplicación en un ZIP y comprueba que arranca en Xcode Simulator en un Mac.
Probar esta función en un iPhone físico requiere una ejecución aparte.

### Conexión

1. Abrir bases de datos en el menú lateral y haga clic en Nueva conexión DB.
2. Especificar nombre, motor, dirección, puerto, base (para Redis - número base),
   usuario y contraseña. La contraseña se puede almacenar en el almacenamiento o entrar cuando
   cada apertura: la contraseña ingresada de esta manera se utiliza una vez y no
   Todavía está ahí.
3. "Protección TLS": "Comprobar el Nombre del Certificado y del Servidor" (por defecto)
   "Requiere cifrado", "Prefer encryption", o "Deshabilitar TLS".
   Dirección local y modo de transferencia portuaria en sí cambia a
   "Prefieren el cifrado." A través de cualquier ruta, TLS comprueba el nombre original.
   El servidor base.
   - “Prefer encryption” – TLS si el servidor lo soporta; no TLS
     только через туннель (SSH-хост, jump-профиль, SSH-туннель, проброс
     Kubernetes или Docker) или на этом компьютере (адрес loopback после
     разрешения имени). Напрямую или через прокси к другому хосту режим
     работает как «Требовать»: если сервер не поддерживает TLS, подключение
     завершается ошибкой «Сервер не поддерживает TLS», и пароль не уходит.
     Старые подключения с этим режимом к удалённой базе без TLS получат эту
     ошибку — выберите «Отключить TLS» явно, если это допустимо.
   - “Require Encryption” – Encryption sin comprobar el certificado. V.
     PostgreSQL пароль тогда используется только через SCRAM-SHA-256-PLUS
     (channel binding): подменивший сертификат перехватчик не получит пароль.
     Если сервер не умеет SCRAM-PLUS (старые версии, `md5`/`password` в
     `pg_hba.conf`), появится ошибка и переключатель «Разрешить вход без
     привязки к TLS (менее безопасно)», по умолчанию выключен. MySQL/MariaDB
     такой привязки не имеют: от активного перехватчика пароль защищает только
     проверка сертификата.
   - Sin TLS sobre la red PostgreSQL no responde a una solicitud de contraseña en texto plano
     (`AuthenticationCleartextPassword`); через туннель и на этом компьютере
     он разрешён. MySQL/MariaDB никогда не включают `mysql_clear_password`.
     ClickHouse, Redis и MongoDB не переходят на открытый текст ни в каком
     режиме, кроме «Отключить TLS».
   La protección real es visible en la tapa del área de trabajo y en la tarjeta
   Conexiones: "TLS (verified)", "TLS (sin verificación de certificados)", "Sin TLS -"
   Tunel protegido o libre de TLS.
4. Seleccione una ruta (ver abajo) y, si es necesario, marque "Food - siempre"
   sólo lectura”.
5. “Connect” muestra la versión del servidor antes de guardar.

En el bloque "Group", el grupo, las etiquetas y el color se establecen. El color es visible en la baldosa.
conexión y en el encabezado de la zona de trabajo. La lista de conexiones se muestra
azulejos o una lista compacta - un cambio a la derecha de la búsqueda, como en
Sección "Hosts"; la selección se recuerda en este dispositivo. Averigüen.
conexión por nombre, dirección, base, motor y etiquetas, etiquetas por encima de la lista
Funcionan como filtros.

La conexión puede ser importada de la línea `postgres://` , `mysql://` .
`clickhouse://`, `redis://` , `mongodb://` , `mongodb+srv://` .
`cassandra://` o `scylla://` – espacio clave en tránsito `?datacenter=`
local data center, y `sqlite:///абсолютный/путь.db` , `?mode=ro` – sólo
Lectura) o de un archivo `.pgpass` . Antes de guardar, se muestra una lista de conexiones encontradas:
Todo el mundo puede encender “Prod”, elegir una ruta y decidir si guardar una contraseña.
Se saltan líneas con sustituciones `*` y tomas locales.

Las conexiones y contraseñas se almacenan en almacenamiento cifrado y se sincronizan.
a través del servidor ConsoleCrypt en forma encriptada. Las solicitudes van de dispositivo a dispositivo.
base en la ruta seleccionada; el servidor de sincronización no los ve.

### Cassandra y ScyllaDB

El motor Cassandra/ScyllaDB habla CQL (protocolo nativo, puerto 9042)
Funciona con Apache Cassandra 3.11+, 4.x, 5.x y ScyllaDB.

- **Sólo en este dispositivo.** En la versión 0.9.2 de la conexión Cassandra /
  Los ScyllaDB sólo se almacenan en el dispositivo donde fueron creados: no son
  Están sincronizados, no pueden ser compartidos, no caen en la copia de seguridad.
  Las bases de datos y la historia de las solicitudes a ellos siguen siendo locales. Razones - versiones
  ConsoleCrypt hasta 0.9.1 inclusive no pueden leer tales conexiones.
  La conexión y su contraseña se almacenan en la base de datos de perfil local, encriptada
  Bóvedas. En la tarjeta se puede ver la etiqueta “Sólo en este dispositivo”.
  Desde la versión 0.9.14, el menú de transferencias “Sincronizar a través del almacenamiento”
  conexión y su contraseña en el almacenamiento: entonces se sincroniza y
  Se recupera como los otros. Transferencia es posible cuando todo es posible
  Los dispositivos de cuenta activa son 0.9.2 o posterior (sus versiones)
  reporta servidor 0.2.4, protocolo 1.13; de lo contrario, la aplicación listará
  Dispositivos que necesitan ser actualizados. Volver a "sólo en el dispositivo"
  La conexión no vuelve. Compártelo con otras personas todavía
  No es posible, la historia de la solicitud sigue siendo local.
- **Fields.** El host es el primer nodo de contacto; puede añadir los parámetros.
  otros nodos de contacto (por coma, el mismo puerto), centro de datos local,
  Niveles de consistencia de lectura (por defecto `LOCAL_ONE` ) y escritura
  `LOCAL_QUORUM` y el tamaño de la página CQL (500 líneas).
  Predeterminado (nombre de salida). Horario de consulta – “Tiempo fuera de petición” desde límites.
- **Nodos de racimo.** Trabajo completo con el clúster - sólo con directo
  Conectando desde la misma red que los nodos. Luego la aplicación toma las direcciones del nodo.
  desde `system.peers` y se conecta a cada nodo del centro de datos del primero
  Respondiendo Nodo de Contacto (con el mismo TLS): Las solicitudes se distribuyen a nodos
  teniendo en cuenta las fichas, y cuando el nodo falla, se cambian a otros. Otros nudos
  No se están utilizando centros de datos. Con ScyllaDB, el conductor se conecta a los propios nodos.
  Una conexión por shard, a través del puerto de shard-aware (19042), debe ser
  estar disponible; de lo contrario se utiliza un puerto convencional. Para verificar el certificado TLS
  El host debe recibir un nombre del campo Host (o nombre TLS) o una dirección IP.
  nudo. Si los nodos no están disponibles en las direcciones que se informan (por ejemplo,
  Sólo un puerto es lanzado, y el trabajo permanece a través de un nodo.
- **A través de túneles - un nodo.** A través de SSH, perfil de salto, proxy, SSH - túnel,
  Kubernetes ) o Docker sesión se ejecuta a través de un único nodo - el primero
  La respuesta (sin distribución a los nodos y con cuidado duro);
  La inaccesibilidad es utilizada por el siguiente nodo de contacto.
  Si se especifica un centro de datos local, el nodo de contacto debe estar en él, de lo contrario -
  Error "nodo en otro centro de datos" (niveles `LOCAL_*` se cuentan como
  Centro de datos del Coordinador).
- **TLS.** El cifrado se realiza por la aplicación misma (rustls) con los mismos modos:
  “Verificar” – nombre de cadena y servidor (puede especificar su CA y cliente)
  Certificado), “Requiere” – sólo encriptación, “Prefer” – sin TLS
  sólo a través del túnel o en este ordenador, sobre la red - el error "El servidor no
  “apoya a TLS”. Contraseña login a CQL transmite la contraseña como es, por lo que
  sin TLS, la contraseña no se envía a través de la red (un error sobre la contraseña en texto plano).
- **Read only.** CQL no tiene una sesión de sólo lectura, por lo que la protección de las ventas es
  análisis de cada solicitud en la aplicación: SELECT, `DESCRIBE`, `LIST …` y `USE` –
  INSERT/UPDATE/DELETE and `BEGIN … APPLY BATCH` – change
  CREATE/ALTER - cambio de esquema; TRUNCATE, DROP, `ALTER TABLE … DROP`
  `ALTER KEYSPACE` y funciones/triggers —hazardous (confirmed); GRANT
  REVOKE y gestión de roles – peligroso y prohibido incluso en la ventana
  registros. Los comandos desconocidos no se ejecutan. Los comentarios no llegan a
  servidores: texto recogido de fichas verificadas se ejecuta. En venta.
  Utilice el papel sólo con el SELECT correcto.
- **Scanning Advertencias.** Antes de SELECT con `ALLOW FILTERING` y antes
  SELECT sin WHERE y LIMIT está confirmado. Avisos del servidor
  (por ejemplo, lápidas) se ven en "Messages".
- **Resultados.** Datos leídos por páginas CQL: siguiente página
  Sólo se solicita cuando “descarga más”. Colecciones (lista/set/map),
  tuples, vectores y UDT se muestran como JSON , bloque como datos binarios.
  (hex en vista), varint/decimal sin pérdida de precisión, uuid/timeuid, inet,
  Duración - texto. Parar la solicitud interrumpe la lectura.
- ** Estructura y DDL.** Keyspace (con replicación) → tablas materializadas
  representaciones, tipos de usuario, funciones y agregados → columnas con
  PARTITION KEY/CLUSTERING ASC sometidaDESC/STATIC and secondary indices.
  DDL - servidor `DESCRIBE` (Cassandra 4+, nuevo ScyllaDB), de lo contrario se va
  de `system_schema` "Información objetiva": replicación, compactación, compresión,
  `gc_grace_seconds` , TTL por defecto, estimación del número de partes y el promedio
  tamaño `system.size_estimates` . Autocompletion - keyspace, tables,
  Columnas CQL y palabras clave.
- **Cell editing** está disponible para el resultado de SELECT de una tabla en la que
  Hay toda la clave principal (la clave de la participación y las columnas de racimo). Cada uno
  la cadena se actualiza a través de `UPDATE … IF EXISTS` (transmisión fácil), por lo que
  La línea eliminada no será re-creada. Las líneas de un cambio de partido
  `BEGIN BATCH … APPLY BATCH` : si al menos uno de ellos ya está
  No, ninguno de ellos cambia. Diferentes partidos cambian a su vez y no juntos.
  Esto se indica en la ventana de inspección. Las columnas clave y los contadores no son
  No se agregan ni eliminan cadenas (en CQL, un registro es
  Subtítulo. Keyspace ScyllaDB con tabletas soporta transacciones fáciles
  No en todas las versiones.
- **Informe** en CSV/ JSON y "INSERT" - como `INSERT INTO … JSON '…';`
  Retiene todo tipo de CQL.

### Rutas

- **Lugar hacia la dirección y el puerto de la base.
- ** SSH -host** o ** perfil SSH -transiciones** - a través de anfitriones salvados
  ConsoleCrypt , incluyendo sus cadenas de salto.
- ** SSH - Tunel** - a través de un túnel de propagación local preservado. Address and
  el puerto es tomado del objetivo del túnel; si el túnel no se inicia, comienza en
  conexión - siempre en 127.0.0.1, incluso si el túnel indica una red
  dirección para que la base de datos no sea accesible a otros ordenadores. Si el formulario es especificado
  localhost con un puerto de túnel ahorrado, la forma sugerirá utilizar este
  túnel.
- ** Kubernetes ** - port forwarding to Pod, Service, Deployment or StatefulSet
  el contexto de la elección. Para el Servicio y Despliegue, se selecciona un Pod listo.
  Así que la conexión está pasando por un reseteo de las cápsulas.
- **Contenedor Docker ** - transferencia de puerto en un contenedor en o en este equipo
  salvado SSH - host. El contenedor es buscado por nombre, así que recreado
  El contenedor también lo hará.

Los pasos Kubernetes y Docker se restauran con cada conexión.
Los que están corriendo están siendo reutilizados. Insignia junto al nombre de conexión
Muestra la ruta.

También puede conectarse desde otras secciones: está disponible el botón “Conectar a la base de datos”
Pod Kubernetes y contenedores Docker con puertos estándar de bases de datos. Si.
La conexión con tal ruta ya se guarda, se abre inmediatamente; de lo contrario
El formulario se abre con el motor, el puerto y la ruta llenados.

### SQLite

SQLite es un archivo, no un servidor. En el formulario de conexión, seleccione el motor SQLite.
Entonces "Dónde está el archivo":

- **Esta computadora macOS , Windows , Linux es la ruta al archivo o botón
  "Seleccione un archivo..." Un nuevo archivo vacío se crea sólo por el botón "Crear nuevo".
  base de datos..."; conectarse a un archivo inexistente no lo crea, pero informa,
  No sé si el archivo fue encontrado. Antes de abrirse, el encabezado se comprueba: otro archivo
  (o una base de datos cifrada) no se abrirá. Se mantiene el modo WAL.
- ** SSH -host**, ** Docker -container** o **Pod Kubernetes ** - peticiones
  ejecuta el programa `sqlite3` (versión 3.16 o posterior) en el host
  contenedor o vaina; el archivo no se copia en ningún lugar. La solicitud se transmite a través de
  entrada estándar, no en la línea de comandos. Si no lo es `sqlite3`, el apéndice
  Eso es lo que dice. El contexto de producción Kubernetes requiere permiso para
  Ejecución de comandos en su configuración.

“Read only” está habilitado por defecto: el archivo se abre para leer solamente, y
Ninguna petición puede cambiarla. Sin ella, la bandera es normal.
reglas: sobre la conexión no-venta, los cambios se verifican, en la comida
Necesito una ventana de tiempo. Incluso la lectura permitida se realiza con
`PRAGMA query_only` ; `ATTACH` / `DETACH` , `VACUUM INTO` , `load_extension`
`readfile` / `writefile` y la modificación de PRAGMA (cifras de cifrado, `query_only`
`writable_schema` Prohibido; el programa remoto funciona con `-readonly`
`-safe` .

Estructura: Archivo → “Tablas”, “Representaciones”, “Indices”, “Secuencias”
(Contadores de la AUTORACIÓN), Triggers de Tablas y Tipos de Datos; Tabla →
“Columnos” (“nombre (TYP)”), “Keys”, “Claves externas”, “Indices”, “Enlaces”
(laves externas de otras tablas en esta) y "Triggers". DDL disponible, información sobre
objeto (tamaño del archivo, puntuación de la fila de `sqlite_stat1` , STRICT , SOUT)
ROWID), plan `EXPLAIN QUERY PLAN` madera, consejos, exportación (incluyendo:
INSERT con literales SQLite) y edición de celdas por clave primaria o `rowid` .

Las conexiones SQLite se almacenan **sólo en este dispositivo** (sólo en este icono del dispositivo)
este dispositivo”): no sincronizan, no entran en el almacenamiento y
backups y no transferidos a otros - versiones de la aplicación hasta 0.9.1 no puede
Léelos. La historia de sus solicitudes también sigue siendo local. Conexión de archivo
via host SSH , Docker , Kubernetes de 0.9.14 se puede transferir al almacenamiento
el artículo "Sincronizar a través del almacenamiento" (condiciones - como Cassandra);
El archivo en este ordenador se queda sólo aquí: en el otro dispositivo su ruta
No significa nada.

### El régimen de Produs

La conexión de prod solo se abre para la lectura y protección en dos capas:

- **En el servidor.** PostgreSQL y MySQL/MariaDB ejecutan cada solicitud en el servidor.
  Operaciones de sólo lectura. ClickHouse получает `readonly=2` в каждом
  petición. Redis no tiene un interruptor de servidor. Para MongoDB, los roles están siendo probados
  usuario.
- **Apéndice.** Cada solicitud se procesa antes de ser enviada. Cambio de órdenes y
  Intentos de eliminar la protección `SET transaction_read_only` , `COPY … TO PROGRAM`
  `INTO OUTFILE` , `FLUSHALL` , `$out` , `$merge` y los similares no se han partido.

Cuando todavía necesita cambiar el producto, el botón ** "Desbloquear el producto"** en el encabezado
El área de trabajo abre la ventana del tiempo del registro. Tenemos que introducir la contraseña de la cámara.
(se revisa en el kernel de aplicación) y selecciona el plazo: 5, 15 o 30 minutos. Mientras la ventana está abierta, una marca roja quema en el sombrero "Record in the box".
Vendido a ChChCh:MM con cuenta atrás y botón "Block". Todos los días.
la solicitud de cambio se muestra todavía para verificación, y
Introduzca la contraseña de almacenamiento; las células de resultado pueden ser editadas. Ventana.
sólo pertenece a este período de sesiones y se cierra al expirar el mandato,
el botón "Block", al desconectar, bloquear el almacenamiento o cambiar
perfil. La protección del servidor se elimina sólo para los cambios permitidos: Leer más
Todavía están en operaciones de sólo lectura. Función de sólo lectura
el servidor no se perderá en la ventana abierta - después de desbloquear la aplicación
Revisa los derechos y advierte si el papel no es capaz de escribir. Cambios,
hecha en la ventana, marcada en la historia de las solicitudes. Los teléfonos tienen una ventana de grabación.
no disponible.

El botón "Comprobar derechos" en el encabezado del espacio de trabajo le dice si se confirma.
Seguridad en el servidor y si el papel tiene derechos de grabación. Para la venta, es mejor utilizar el papel sólo para
lectura: en PostgreSQL – `SELECT` o `pg_read_all_data` , en MySQL – `SELECT` ,
ClickHouse – perfil `readonly=1` , Redis – ACL `+@read -@write` , MongoDB –
`read` .

La conexión no producto también se abre en modo “Read Only”. Cierre el botón
En el encabezado permite grabar hasta que la conexión esté cerrada. Modificar la solicitud antes
Se muestra en toda la ventana y sólo se puede realizar.
Después de introducir la contraseña de la cámara. Esto también se aplica a solicitudes peligrosas `DROP` .
`TRUNCATE` , `UPDATE` o `DELETE` sin `WHERE` , `FLUSHALL` , eliminación
colecciones), y edición de celdas: los nuevos valores son visibles en el cheque de revisión.
El comando Redis `KEYS` nunca se ejecuta; en cambio, se ofrece el mismo comando.
`SCAN` , que se puede añadir al editor.

### Acceso público

Si el servidor de sincronización soporta compartir conexiones de bases de datos
(servidor 0.1.15 y nuevo con función habilitada), aparece el menú de conexión
Comparta. Antes de enviar, se muestra qué campos irán a un colega:
motor, dirección, puerto, base, usuario, TLS, límites y modo Prod. Grupo,
Solicitar historia, configuración de IA y permisos de sesión no son compartidos. Contraseña y clave
el cliente se transmite sólo cuando está explícitamente marcado y sólo si el servidor admite
secretos compartidos.

La ruta a través del host SSH, perfil de transición, proxy o túnel no se transmite:
El destinatario elige el suyo. El espacio se mantiene para el paso Kubernetes
Nombres y cargas, y el contexto es elegido por el destinatario; para Docker
El nombre del contenedor y el motor es elegido por el receptor. Conexión a esta ruta
No puedes mantenerlo claro.

Las conexiones recibidas se muestran en la sección etiquetada **General **, sus
Publicado - etiquetado **Ha compartido**. **Leer más** Abre la aceptación,
conservación de una copia personal, participantes, revocación del acceso y terminación del general
acceso. Una copia de la conexión del producto sigue siendo una conexión de producto sólo lectura.
La revocación del acceso no cancela la contraseña ya copiada - cambiarla en el servidor
bases de datos.

### Área de trabajo

Haga clic en la conexión: la estructura se abrirá a la izquierda, las pestañas a la derecha
peticiones, editor y resultados. Los límites de los paneles se arrastran, los botones en
Las tapas ocultan la estructura y revelan la historia y el asistente de inteligencia artificial.

La estructura se carga a medida que abre y difunde objetos en carpetas.
Mesa cerrada está enmarcada, las claves primarias y extranjeras están marcadas
Insignias. Filtros de búsqueda ya cargados objetos, botón adyacente
Enrolla todo el árbol.

- ** PostgreSQL **: diagramas → tablas, representaciones, materializados
  representaciones, secuencias, funciones y procedimientos → columnas
  NULL, valor predeterminado, claves), índices, restricciones, disparadores.
- **MySQL/MariaDB**: bases de datos → tablas, vistas, procedimientos y funciones
  columnas, índices, disparadores.
- **ClickHouse**: bases de datos → tablas (ingeniero), vistas, diccionarios → columnas
  (clase de surtido), saltar índices y proyecciones.
- **Redis**: `db0` ... `db15` → carpetas clave por separador `:` → teclas con tipo y
  TTL. Las claves se leen en porciones a través de `SCAN` .
- **MongoDB**: bases de datos → colecciones → índices.

Haga doble clic en una tabla, vista, colección o clave Redis y elemento
Las primeras 100 líneas muestran inmediatamente los datos en la parte inferior. Hay uno para eso.
pestaña de navegación ("artículos - datos"): el siguiente objeto se abre en él,
Las nuevas pestañas no crecen. Si cambias el texto de esta pestaña, se convierte en
Es normal y ya no está sobrescrito.

En el menú objeto: "Primeras 100 líneas", "Mostrar DDL" (para Redis - descripción)
claves, para MongoDB - parámetros de colección e índices, "Nombre de entrada" y
"Información subjetiva." DDL se muestra por un bloque de código con números de línea y
iluminación, cada operador `CREATE TABLE` , cada `CREATE INDEX` separado
Diablos. La ventana se ajusta a la anchura de la pantalla y la altura no es más que el código.
Las líneas largas por defecto se transfieren con la indentación, el número está en la primera
la línea; el botón "líneas de movimiento" apaga la transferencia, y luego el código
Luego se retrae al lado (se recuerda el ajuste). Botones “Copiar” y “Abrir”
en el editor. Para las colecciones MongoDB, hay un “Esquema de muestreo de documentos”: Tipos
campos y la proporción de documentos en los que se encuentra el campo.

"Información objetiva" muestra hechos del catálogo del sistema, sólo leyendo
y con parámetros en lugar de nombres de sustitución: para tablas y representaciones
PostgreSQL - diagrama, propietario, vista, estimación del número de líneas, dimensiones (total,
datos, índices, TOAST, número de columnas, índices, limitaciones y disparadores,
espacio tabular, comentario, clave de sección y último
VACUUM/ANALYZE; for MySQL/MariaDB - motor, formato de cadena, estimación de cadenas,
datos y tamaños de índice, AUTO_INCREMENT, comparación, tiempo de creación y
cambios; para ClickHouse – motor, líneas, tamaño, partes, llaves
partición, clasificación y muestreo, TTL; para la tecla Redis - tipo, TTL,
codificación, longitud y memoria, para la base de datos Redis es el número de claves. Grados marcados
El ♥ se muestra en KiB/MiB, y el botón Copiar copia toda la ventana. Para
La descripción MongoDB se muestra como JSON . El objeto está oculto en los objetos para los cuales
No hay información.

Texto Generado - DDL de "Abrir en el Editor", consulta de la historia,
Proyecto de subproceso propuesto `SCAN` – añadido a la pestaña actual
Debajo de lo que ya está escrito, a través de una línea vacía; el cursor se para al principio de la inserción,
No se está haciendo nada. Si la pestaña de visualización está abierta, el texto va a
la última pestaña del editor; una nueva pestaña se crea sólo si no hay otros.

### Redacción y aplicación

El editor numera las líneas, destaca la sintaxis, complementa las palabras clave,
tablas y columnas en el cursor (incluyendo por pseudonym: `o.` después
`FROM orders o` ), formatos una consulta, comentarios en líneas, y búsquedas con reemplazo.
MongoDB recibe comandos en la sintaxis familiar de la cáscara, por ejemplo.
`db.orders.find({ status: "paid" })`.

| Acción. | macOS | Windows / Linux |
| --- | --- | --- |
| Realizar la asignación o el operador bajo cursor | `⌘↵` | `Ctrl+Enter` |
| Ejecute todo el guión | `⌥X` o `⇧⌘↵` | `Alt+X` o `Ctrl+Shift+Enter` |
| Suplemento del cursor | `⌃Space` | `Ctrl+Space` |
| Formato | `⇧⌘F` | `Ctrl+Shift+F` |
| Comentario sobre las líneas | `⌘/` | `Ctrl+/` |
| Búsqueda y sustitución | `⌘F` | `Ctrl+F` |
| Cancela la solicitud | `⌘.` | `Ctrl+.` |
| EXPLLAIN | `⌘E` | `Ctrl+E` |
| Historia. | `⌘H` | `Ctrl+H` |
| Auxiliar de inteligencia | `⌘I` | `Ctrl+I` |

Sin asignación, el operador se ejecuta en la línea de cursor, como en la clásica
SQL Clients: Los operadores están separados `;` (más allá líneas y comentarios) y vacíos
líneas; desde cualquier línea del operador multilínea se ejecuta en su totalidad;
si hay dos operadores en la línea, el que está debajo del cursor es seleccionado; en la línea vacía
El operador más cercano (si no, más abajo). En Redis y MongoDB
La misma regla.

Todo el script es ejecutado por un operador y se detiene en el primero.
Error. Las variables `{{name}}` se llenan en una ventana separada y se transmiten.
El controlador como parámetros, no insertado en el texto.

EXPLAIN muestra el plan con un árbol: cada paso tiene líneas, costes y rayas.
una fracción del paso en sí; el botón " JSON " abre el plan original.
ANALYZE añade tiempo real, pero cumple con la solicitud, así que disponible
sólo para conexiones no productoras y requiere confirmación.

CQL no tiene EXPLAIN, así que Cassandra/ScyllaDB tiene un botón en su lugar.
“Request Tracking”: la solicitud se ejecuta una vez con el rastreo
`system_traces` y la ventana muestra al coordinador del árbol y el tiempo total bajo
Cada nodo y sus pasos; el carril es el tiempo del paso anterior del nodo.
El más largo marcado. Sólo se lee la primera página del resultado. Como.
ANALYZE, tracing realiza la consulta, por lo que sólo está disponible para
conexiones de no producción y requieren confirmación.

### Resultados, copia y exportación

El resultado es una tabla compacta con números de fila: clasificación y filtro por
columna, fijación y escondiendo columnas, viendo el valor total. Grid.
primero carga una parte de las líneas (por defecto 1000, el límite se establece en
“Limitaciones” de conexión, el resto está cargado con el botón “Descargar más”.
Por teléfono, el resultado se muestra con tarjetas de grabación. Valores de las columnas con
nombres como `password` , `token` , `secret` están ocultos, y al copiar el búfer
El intercambio se limpia automáticamente.

Al hacer clic en la celda lo destaca con un marco `⌘C` / `Ctrl+C` copia el valor),
haciendo clic en el número de línea selecciona la línea, Shift + click amplía la selección,
ч/Ctrl+ Haga clic en añadir o eliminar la cadena, Esc elimina la selección. En la línea
estado visto "Líneas seleccionadas: N"; copia, exportación y asistente de IA
Trabajar con líneas seleccionadas, si las hay.

Usted puede copiar una célula, cadena, resaltar o el resultado descargado completo en
CSV, TSV, JSON, NDJSON, Markdown o SQL `INSERT` .
Re-execorta la consulta y registra todas las líneas sin el límite de la red, con
progreso y derogación. Solicitudes de lectura Sólo exportadas: Modificación
La solicitud de exportación no se repite.

En la casilla de verificación CSV y TSV "Fórmulas verdes (para Excel)" (por defecto)
añade un apostrofe antes del texto, que comienza con `=`, `+`, `-`, `@` .
tabulación o retorno del carruaje, para que el editor tabular no lo realice como
fórmula; los números de las columnas número no cambian. Líneas en SQL `INSERT`
экранируются удвоением кавычки `''` ); для MySQL, MariaDB и ClickHouse
la barra inversa se dobla, para PostgreSQL el texto con él está escrito como
`E'…'` , por lo que el archivo se lee el mismo bajo cualquier configuración de detección.

### Panel de resultados

A la izquierda del resultado - un interruptor de la forma: "Tabla" (grid), "Texto"
(La tabla de texto está alineada con una fuente mono-width, se puede distinguir y
copia; muestra hasta 2.000 líneas, NULL como `[NULL]`, valores ocultos
Puntos) y “Record” (una línea en la forma “campo → valor”). Vista seleccionada
Se memoriza para las pestañas. En los encabezados de las columnas - un icono del tipo (número, texto, etc.)
fecha y hora, sí/no, JSON, datos binarios) y clave en las columnas clave; NULL
Esto se muestra como sometido `[NULL]` .

El resultado es una barra de herramientas:

- **Actualizar** (F5, ⌘R / Ctrl+R) vuelve a ejecutar la última consulta de lectura de la pestaña tras revisarla.
  En su menú puedes desactivar la actualización automática o fijar un intervalo de 5, 10 o 30 segundos,
  o de 1 o 5 minutos. Solo se repiten consultas de lectura, incluidas las de producción.
  Si hay cambios pendientes, una consulta en curso o la ventana está oculta, se omite esa actualización.
- **Guardar** (⌘S / Ctrl+S) aplica los cambios pendientes. Su menú permite ver el SQL.
  **Descartar cambios** (⌥⌘Z / Ctrl+Alt+Z) deshace las ediciones pendientes.
- Para editar la fila actual en la vista de registro, pulsa ⇧↵. Puedes añadir una fila (⌥⌘N / Ctrl+Alt+N),
  duplicarla (⌘D / Ctrl+D) o eliminarla (⌘⌫ / Ctrl+Delete). Si seleccionas varias filas, se eliminan las seleccionadas.
- Salta a la primera fila (⌘↑ / Ctrl+Home), a la anterior (⌥↑ / Alt+↑), a la siguiente (⌥↓ / Alt+↓)
  o a la última (⌘↓ / Ctrl+End). Las flechas ↑ y ↓ también cambian la fila actual en la cuadrícula.
- **Exportar datos…** (⇧⌘E / Ctrl+Shift+E) exporta el resultado. **Importar datos…** carga un CSV en la tabla del resultado.
- El engranaje y el campo "String at a time" especifican el tamaño de la siguiente porción (1-1000,
  Recuerde conectarse; “Descargar la siguiente porción” y “Descargar”
  Todas las líneas" (dentro del límite de memoria del resultado).

Línea de estado: cuántas líneas se reciben, se ejecutan tiempo, fecha y hora
final, "hay más" si las cadenas se quedan en el servidor, el número de seleccionados
líneas y cambios sin salvar.

### Cambio de líneas

En una computadora en una sesión con un registro autorizado (conexión no producto o venta con
abrir ventana de grabación) una fila del resultado de una simple `SELECT` de una sola tabla
Puede ser cambiado, añadido y eliminado. La línea está determinada por la clave principal, y
Si no, la primera clave única de la columna NO NULL (dirección de línea)
`ctid` es inestable y no se utiliza. Sin esa llave, para ClickHouse,
Redis y MongoDB, así como por teléfono, los botones de cambio son inactivos, y la pista
Explica por qué.

- Celda de doble clic (o Enter/F2) – editar en el lugar: Introduzca las hojas
  valor en la lista de cambios, Esc cancela, Tab se mueve a la siguiente
  La celda. Tipo se toma de la columna y se comprueba en la entrada, NULL - separado
  Interruptor. Las células alteradas se iluminan en amarillo.
- La nueva línea está iluminada en verde, el número de línea es +. Columnas que
  llenará el servidor (valor predeterminado, identidad, auto-incremento), mostrado
  Como `[ПО УМОЛЧАНИЮ]` , el resto está vacío `[NULL]` . Columnas obligatorias
  (NO NULL sin valor predeterminado) debe llenarse en: de lo contrario Ahorre
  Iluminarlos y no enviar nada. No se registran columnas computadas.
- “Duplicar” copia una cadena sin valores clave, computables o o ocultos.
- Línea extraíble cruzada e iluminada en rojo hasta que se salva; repetida
  "Eliminado" elimina la marca, la nueva línea se elimina inmediatamente.

Antes de "salvar" nada se hace. El núcleo se basa en el cambio
`DELETE` , `UPDATE` y `INSERT` (en este orden) sobre la clave,
una verificación muestra a los mismos operadores con valores literales y requiere
Contraseña de almacenamiento; protección de ventas no es suficiente. Después de la confirmación, los operadores
se ejecutan en una transacción, y cada uno tiene que cambiar exactamente una línea.
De lo contrario, todo retrocede. El resultado se actualiza. "Mostrar SQL".
abre a los operadores en forma de código: pueden ser copiados o agregados a la corriente
La ficha del editor. Al relanzar, actualizar, cambiar el conjunto
los resultados, cerrar la pestaña o salir de la conexión no son salvos
Cambios, la aplicación pide: guardar, cancelar o quedarse.

### Importaciones de CSV

Para PostgreSQL , MySQL, MariaDB, SQLite, ClickHouse y Cassandra/ScyllaDB en su computadora
Los datos CSV se pueden cargar en una tabla, MongoDB a una colección, y Redis a una tabla.
a la base de datos o carpeta clave: “Data Import...” en el panel de resultados (en la tabla)
el resultado, si es una solicitud a una tabla con una clave) o "Import from CSV ..." en
tablas de menús, colecciones, bases de datos Redis o carpetas clave en un árbol. Se requiere grabación permitida (en la venta - una ventana de grabación abierta). Maestro:

1. ** Archivo** - CSV, TSV o texto de hasta 200 MB; el archivo es legible por flujo y en ninguna parte.
   Excepto por esta base, no se transmite.
2. ** Opciones de lectura** con visualización en vivo de las primeras 100 líneas: codificación (UTF-8)
   por defecto, BOM es reconocido; Windows -1251, Latin-1), separador
   (determinado automáticamente: `,` `;` TAB `|` ), símbolo de cotización, línea
   cabecera, esquiando líneas al principio, lo que cuenta como NULL (campo vacío, `NULL` )
   `\N` ), el divisor decimal y el orden del día, mes y año en fechas.
3. **Columnos** – cada columna del archivo cae en la columna de la tabla (por nombre)
   omitido o o omitido; las primeras 1000 líneas son revisadas
   el cumplimiento de los tipos, los valores de problemas se muestran por ejemplos, y
   columnas obligatorias sin valores - una advertencia.
4. ** Opciones de importación** - añadir; añadir, omitir las existentes
   claves; añadir o actualizar claves PostgreSQL y SQLite
   `ON CONFLICT` , MySQL `ON DUPLICATE KEY UPDATE` ; tamaño del paquete; si la línea está equivocada,
   dejar de importar o saltar y registrar el informe
   `<файл>.errors.csv` ; una transacción por archivo o por paquete;
   “Eliminar todas las filas de la mesa primero” (por defecto apagado; esto
   `DELETE FROM` en la misma transacción y es visible en la verificación.
5. **Test y run** - como cualquier cambio: operadores de línea única
   configuración, contraseña de almacenamiento, protección de ventas. Y luego lo cargas.
   multilínea parametrizada `INSERT` con progreso (líneas por segundo),
   El tiempo restante) y la cancelación – la transacción abierta vuelve a rodar. Al final,
   Resultado: Importado, omitido, propensa a errores y referencia al informe.

Valores similares a las fórmulas se importan como es (fórmulas de cierre -
Objetivo de exportación). Mientras se importa, están esperando otras solicitudes de esta conexión.

Características de los motores:

- **SQLite.** El archivo en este ordenador está escrito de la misma manera que PostgreSQL : uno
  Transacción o paquete, si se pierden errores - ahorrar puntos. Mediante
  `sqlite3` en el host SSH , Docker , Kubernetes cada operador se fija
  No hay una opción "una transacción para todo el archivo", pero se detiene.
  importar hojas ya escritas. "Agregar o actualizar" requiere
  declarada principal clave o limitación única (en el cuadro)
  Sólo con `rowid` no lo es.
- **Cassandra y ScyllaDB.** No hay transacciones CQL: cada línea es una línea separada.
  `INSERT` , las importaciones no se reenrollan. Regular `INSERT` en sobreescrituras CQL
  una cuerda con la misma llave, así que "add" y "add, skip"
  Existing" escribe `INSERT … IF NOT EXISTS` (pacificación fácil: existente
  Las claves se consideran desaparecidas, y "add o update" es fácil.
  `INSERT` "Eliminar todas las líneas primero" es `TRUNCATE` . Tipo `counter`
  No se importa (los contadores se cambian solamente a través de `UPDATE` ).
- **ClickHouse.** No hay transacciones, la clave de clasificación de MergeTree no es única.
  Por lo tanto, sólo es posible "add": cada paquete es uno `INSERT` .
  Escrito en total o no grabado. Columnas `MATERIALIZED` , `ALIAS`
  y `EPHEMERAL` no están llenos, `DEFAULT` puede ser saltado.
  Todas las líneas son `TRUNCATE TABLE` .
- **MongoDB.** Las columnas se combinan con campos de recogida (muestra)
  documentos con su tipo BSON predominante; una columna sin par puede crear
  Un nuevo campo con su propio nombre - el tipo se toma de acuerdo a cada valor ( entero, número, etc.).
  `true` / `false` , fecha o fecha y hora, de otro modo texto ). Sin nombres de campo.
  Empiezan con `$` y no contienen un punto. Los documentos se escriben en paquetes
  `insert` con `ordered: false` , por lo que cada uno es registrado o rechazado
  separado; los campos vacíos no se registran. "Mising existing" y
  "Añadir o actualización" funciona en `_id` (su columna debe ser
  emparejado; 24 caracteres hexadecimales en el campo objectId se convierten
  ObjectId); Update `update` with `$set` and `upsert: true` . Fecha y hora
  El tiempo libre de zona es considerado UTC. "Eliminar todos los documentos primero".
  `delete` con un filtro vacío.
- **Redis.** Una columna - `key` (si la importación va a la carpeta clave, su
  El prefijo se añade al principio. Otra columna comparada con `value` .
  da una cadena `SET` , varias columnas con nombres de campo - hash `HSET` .
  Los campos vacíos son saltados. "Agregar" y "desechar los existentes" no
  sobreescribir la clave: la cuerda está escrita `SET … NX` , para el hash primero
  Verificado `EXISTS` (verificación y grabación de no atómico)
  Actualizar" reescribe la cadena y añade campos de hash. Cada llave,
  un comando separado, sin transacciones; el despejado base `FLUSHDB` no es.

В меню схемы PostgreSQL ) или базы (MySQL, SQLite, ClickHouse) есть «Создать
tabla de CSV ...": un simple `CREATE TABLE` se construye en las primeras líneas del archivo
( entero, decimal, fechas, fecha y hora, sí/no, texto de otro modo; en ClickHouse -
`Nullable` columnas y `ENGINE = MergeTree ORDER BY tuple()` que pueden ser
Copiar o abrir en el editor y realizar a través de la verificación normal. Para
Cassandra no tiene este artículo: la tabla CQL necesita la clave principal, y desde el archivo es
No salida; MongoDB y Redis no crean tablas.

### Table designer

Puede crear o cambiar una tabla sin SQL manual. "Crear una tabla..."
Menú Schema PostgreSQL , bases de datos (MySQL/MariaDB, ClickHouse, SQLite), espacio clave (Cassandra/ScyllaDB) y carpetas
"Tablas", así como un botón en el encabezado del espacio de trabajo; para MongoDB artículo
Se llama "Crear una colección..." y está disponible en la base de datos de conexión.
“Cambia la estructura...” en el menú de mesa carga su estructura actual. Para Redis.
No hay diseñador.

El constructor abre con una pestaña junto a las pestañas del editor: nombre, diagrama o
base de datos, comentarios y secciones "Columnos", "Keys", "Claves externas",
“Indices”, “Verificaciones”, “Parameters” y “DDL”. La tabla de columnas te da un nombre.
tipo (lista de tipos de motores de búsqueda o tipo), longitud y escala, NO NULL,
Valor predeterminado (con opciones listas como `now()` )
`CURRENT_TIMESTAMP` , `gen_random_uuid()` ), autoincremento (identidad o
`serial` en PostgreSQL , `AUTO_INCREMENT` en MySQL, clave primaria, singularidad
y comentario; las columnas son arrastradas, duplicadas y eliminadas. Normal.
El texto en el campo de valor predeterminado se convierte en una cadena `active`
`'active'` ), expresiones y números permanecen como son. Las teclas externas se seleccionan
tabla y columnas de la estructura base y acciones ON DELETE/ON UPDATE;
Los índices PostgreSQL tienen métodos btree/hash/gin/gist/brin/spgist. Para
ClickHouse se utiliza en lugar de NO NULL `Nullable(T)` .
`LowCardinality(T)` , motor (family MergeTree, Memory, Log), obligatorio
Ordenación de la llave ORDER BY, PRIMARY KEY y PARTITION BY; llaves extranjeras,
No hay singularidad ni verificación. Para campos MongoDB con tipo BSON y
ser necesario para ser convertido en un validador `$jsonSchema` , capped disponible,
series temporales, nivel de verificación y acción, colación e índices.

**SQLite.** Tipos con reglas SQLite (INTEGER, TEXT, REAL, NUMERIC, etc.)
BLOB, DATE y otros, su tipo también se puede introducir, `AUTOINCREMENT`
la columna única de la llave primaria INTEGER, singularidad, verificación,
claves e índices extranjeros; en las "Configuraciones" - `STRICT` (tipos de referencia: INT solamente,
INTEGER, REAL, TEXTO, BLOB y CUALQUIER, o `WITHOUT ROWID` (necesario primario requerido).
No hay ningún comentario en SQLite. Nombre de tabla y columnas, apéndice
columnas al final (sin una llave, con un valor por defecto constante) e índices
Se cambian en su lugar a través de `ALTER TABLE` . Todo lo demás - eliminación de la columna, cambio
tipo, NULL o valores predeterminados, claves, cheques, claves extranjeras y
parámetro - recrea la tabla, según lo aconseja la documentación SQLite:
tabla bajo un nombre temporal, traslado de filas, eliminación de lo viejo, renombramiento
Y rediseñando índices. El script es ejecutado por una sola transacción (y para el archivo en el
Esta computadora, y a través de `sqlite3` en el host, comprueba las llaves extranjeras para él.
El tiempo se apaga para que la eliminación de la vieja tabla no afecte las filas de otros
mesas. Si hay algo en la tabla que el diseñador no tolera (triggers),
Columnas computables, COLLATE, índices de expresión, parcial o en orden,
No se llevan a cabo cambios que requieran la re-creación - deben hacerse
Editor; renombramiento y nuevas columnas todavía funcionan.

**Cassandra y ScyllaDB.** La clave principal es necesaria: la primera N de sus columnas son
clave de partido ("Clas columnas clave en la clave de la fiesta", por defecto 1), el resto -
columnas de racimo con el orden de agrupación (por ejemplo, `at DESC` ). Disponible.
Tipos de CQL, incluyendo colecciones `list<text>` , `set<int>` , `map<text, int>`
`frozen<…>` ), contadores (entonces todas las columnas fuera de la llave son contadores), secundaria
índices en una columna, comentario de la tabla, TTL por defecto y
`gc_grace_seconds`. Valores predeterminados, singularidad, cheques y externos
No hay llaves en CQL. Una vez que se crea la clave, orden de agrupación y tipos de columna
no cambiar, la mesa no puede ser renombrada, y sólo se puede renombrar
Columnas clave; columnas son agregadas y eliminadas, índices y parámetros
Ellos cambian. Los operadores de CQL ejecutan uno a la vez, sin una transacción.

Mientras la tabla está diseñada, nada se ejecuta en el servidor: cambios
Están colgando en un borrador. Tab, líneas nuevas y modificadas están marcadas, nuevas
La tabla y sus columnas son inmediatamente visibles en el árbol en verde, modificadas en naranja.
(con un punto de etiqueta); haciendo clic en ellos regresa al diseñador. Hay una cancelación.
El último paso y cancelar todos los cambios. La prueba está en la mosca: vacía y
Nombres repetitivos, columnas desconocidas en claves, tipos sin la longitud deseada,
ORDER BY for MergeTree, AUTO_INCREMENT without a key, etc.; identifiers
Siempre se toman en comillas, así que las palabras reservadas y cualquier símbolo.
Están a salvo. La sección "DDL" muestra el guión final; puede copiarse o
Añadir a la ficha actual del editor.

“Save Changes” (аS/Ctrl+S) abre la ventana “Save Table”.
cambios" con un script completo (backlit, números de línea, transferencia de línea),
Los botones "Open in the editor", "Copy", "Cancel" y "Execute". Esto y
Hay confirmación: la ventana advierte sobre la eliminación de datos o la reestructuración
tablas, pide la frase de la contraseña de la tienda, y la ejecución es lo habitual
verificación de consultas y protección de producción (para conectar el producto, necesita abrir una ventana)
grabaciones). En PostgreSQL , un script se ejecuta con una sola transacción: si no se produce un error,
Nada cambia; también SQLite. En MySQL/MariaDB, ClickHouse, MongoDB y Cassandra DDL, el DDL no trasaccional es un DDL no transaccional.
La ventana advierte sobre esto, y en caso de error, muestra qué operadores ya están operando.
aplicada. Después del éxito, el árbol se actualiza y el diseñador sigue trabajando.
con una tabla en el servidor. Al cerrar las pestañas con cambios no guardados
El diseñador pregunta “Guardar/No Guardar/Cancelar”.

Al cambiar la tabla existente, el diseñador compara el proyecto con
estructura en el servidor y construye ALTER: añadir, eliminar y renombrar
columnas, cambio de tipo, NULL y valores predeterminados, claves, índices y
In PostgreSQL - removal of identity and change of ALWAYS с BY DEFAULT,
UNLOGGED (cuando se creó y a través de `SET LOGGED/UNLOGGED` ); en ClickHouse -
renombrar la tabla `RENAME TABLE` , eliminando el valor predeterminado y
comentario de la columna. Los comentarios pueden contener un apostrofe (en MySQL/MariaDB)
sin la barra inversa. Constraints: Parameters set when creating
(ingeniero, tecla de clasificación ClickHouse, partición), no cambien aquí;
La transición entre serie e identidad en PostgreSQL se realiza en el editor. TTL y
La aplicación ClickHouse SETTINGS no funciona en el constructor o en el
Editor: No son desmontados por el analizador SQL a través del cual todo el mundo pasa.
consulta, uso `clickhouse-client` en el terminal.

### Historia.

Historial de consultas se realiza para cada conexión: texto, tiempo,
Duración, número de líneas y error. Valores de parámetros y datos de resultados
No se meten en ello. Filtros: Todas las solicitudes, exitosas, sin errores, seleccionadas. Po Po Po
la historia predeterminada se almacena sólo en este dispositivo en forma encriptada;
Puede ser habilitado en sincronización encriptada o deshabilitado. Una petición de la historia
se puede guardar como un fragmento: variables `{{name}}` se convertirán en variables
Snippet.

### Snippets para bases de datos

En la sección "Snippets" → "Juntos Básicos" hay conjuntos de diagnóstico listos
Consultas: “SQL · PostgreSQL ” (20), “SQL · MySQL/MariaDB” (20),
"SQL · ClickHouse" (20), "Redis" (15), "MongoDB" (15), "SQLite" (15) y "Cassandra / ScyllaDB"
(17: diagrama de `system_schema` , nodos de racimo, estimaciones de tamaño, lote, TTL,
fichas, roles y derechos, creación de mesa de series temporales y `INSERT … JSON` Se añaden a
almacenamiento sólo en la prensa de un botón, después de lo cual pueden ser editados y eliminados
Snippets regular. En conjuntos: solicitudes activas y largas, árbol de bloques,
Tablas y tamaños de bases de datos, uso de índices, filas muertas y autovacuo,
Replicación y ranuras, ajustes cambiados, solicitudes pesadas
`pg_stat_statements`, digests `performance_schema` , `system.query_log` ,
ClickHouse chunks, fusiones y mutaciones, memoria y comandos Redis lentos,
`currentOp` , estadísticas y perfilador de MongoDB. Casi todas las solicitudes son sólo
read; `EXPLAIN ANALYZE` (llena la solicitud), cancela la solicitud y `KILL`
marcado como alteración, cierre de sesión PostgreSQL como disruptivo, y
Se requiere una confirmación antes del lanzamiento. En la descripción de cada snippet se indica
cliente (psql, mysql, clickhouse-client, redis-cli, mongosh) y requisitos
versión o extensión.

El tipo y el dialecto del snippet son los mismos que los utilizados por la historia: PostgreSQL
`postgresql` , MySQL/MariaDB y ClickHouse – `sql` con dialecto `mysql` /
`clickhouse` , Redis `redis_cli` , MongoDB `shell` con `mongosh` . Por lo tanto,
snippets también son adecuados para el terminal SSH: correr en la sesión psql, mysql,
clickhouse-client, redis-cli o mongosh y seleccionar un snippet – después de llenar en
Entrará en la pestaña activa como un texto (no una confirmación de riesgo).
via `sh -c` ); una solicitud multilínea se envía con un solo inserto en modo
pasta entre corchetes, si el cliente lo ha habilitado. Nuevo SSH período de sesiones para tal snippet
La aplicación no abrirá. Los comandos de administración del servidor (por ejemplo)
`CLIENT LIST` , `SLOWLOG` , `db.currentOp()` , `rs.status()`
"Databases" no permiten, por lo que son etiquetados "terminal solamente".

### Auxiliar de inteligencia

El asistente trabaja con proveedores de Ajustes → AI: modelo incorporado.
Servidor local o API externa. Él puede hacerlo.

- hacer una solicitud de descripción;
- Explicar o corregir la solicitud;
- Optimize the EXPLAIN request;
- Traducir la solicitud a otro dialecto;
- hacer un snippet con variables de la solicitud;
- ofrecer consultas estándar a la mesa;
- Explicar las líneas seleccionadas del resultado.

Antes de cada solicitud al modelo abre la ventana “Comprobar el contexto de AI”;
Por defecto, todos los puntos se apagan:

- **Esquemas de metadatos** - nombres de tablas y columnas con tipos, sin datos.
- **Las líneas seleccionadas** son sólo las que marcó como resultado.
- **Selección de filas** y ** Consulta de verificación** - modelo puede buscar hasta 20
  filas de una tabla o realizar una solicitud de lectura (hasta 50 líneas, 10 segundos).
  Grabar de esta manera es imposible incluso para la venta.

Sin consentimiento, el modelo no recibe ningún esquema o datos. Contraseñas, líneas.
Las direcciones y conexiones del servidor nunca se envían. Columnas con secretos
Se esconden. Para proveedores externos con un perfil de privacidad "Strict" nombres
Las tablas y columnas son reemplazadas por seudónimos, y en respuesta se restauran.
El consentimiento puede ser revocado por un botón en el panel auxiliar.

La respuesta es un borrador con una explicación y una lista del contexto dado.
Borrador" lo añade a la ficha actual del editor; el asistente en sí no es nada.
La solicitud es ejecutada por usted, con los cheques habituales. Para
Los borradores de conexiones DDL sólo se muestran.
