# Docker

ConsoleCrypt 1.2.1 · [Localizar el motor Docker y eliminar un contenedor](../../../guide/es.md#release-1-2-1-docker) · [Desplegar un contenedor en Kubernetes](../../../guide/es.md#release-1-2-1-deploy)

Referencia traducida · [Original en ruso](../DOCKER.md)

## Ruso

Sección Docker muestra contenedores, volúmenes y diseños de motores de composición en este
en un ordenador o en un host guardado SSH. Tiene troncos, un terminal dentro.
contenedor, información de inspección, reenvío de puertos, conexión a la base de datos desde
Container y editar archivos de compostura. El cliente accede a la propia API Docker:
para el motor local - a través de su toma de corriente, para el SSH host - a través de SSH - conexión
de este host. La sección está disponible en macOS, Windows, Linux y Android. Para iOS, CI empaqueta la aplicación en un ZIP y comprueba que arranca en Xcode Simulator en un Mac.
Probar esta función en un iPhone físico requiere una ejecución aparte.

### Hosts and rights

Abierto Docker en el menú lateral. En la lista - "Este ordenador" y guardado
SSH - Hosts; búsqueda estrecha la lista. Haga clic en "Connect": en la tapa aparecerá
versión del motor, OS y arquitectura, número de contenedores lanzados. El botón con
La flecha se apaga y vuelve a la selección del anfitrión.

Si SSH un usuario no tiene derechos a una toma Docker , es inmediatamente visible:
Explica la causa y muestra el comando `sudo usermod -aG docker <пользователь>`
con un botón de copia. Ejecutarlo en el host usted mismo - su aplicación no
Comience y vuelva a conectarse: el nuevo grupo está activo en nuevas sesiones SSH.
Si SSH el servidor prohíbe la transferencia de socket Docker y no hay ningún docker CLI en el host,
incluir `AllowStreamLocalForwarding yes` en `sshd_config` o instalar
Docker CLI. Si Docker no está funcionando, la solicitud le notificará.

Las acciones se realizan con derechos de usuario Docker en el host; la aplicación no
Aumenta los derechos y no utiliza `sudo` . Cambio de perfil y bloqueo de almacenamiento
El período de sesiones está cerrado Docker.

### Containers.

Los contenedores están agrupados por proyectos de compostura: primeros proyectos con ejecución
Contenedores, al final, separados contenedores. El titular del grupo muestra,
Cuántos contenedores están funcionando, y el grupo se está plegando. El filtro es buscado por nombre y
El interruptor All/Run/Stopped estrecha la lista.

En la línea de contenedores: estado, control de salud, imagen, identificación corta, estado
y puertos. Los botones comienzan, paran y reinician el contenedor, abren
Registro y terminal. En el menú "..." - suspender y reanudar, por la fuerza
completo, eliminar, soltar el puerto, conectarse a la base de datos, información y
Copiando la identificación. La terminación obligatoria y la eliminación requieren confirmación;
Los volúmenes y las redes se conservan por defecto. En el diálogo de eliminación puedes marcar por separado los recursos que quieras borrar.

### Información, registros y terminales

Haga clic en el contenedor - la información se abrirá a la derecha de la lista (en el teléfono -
pantalla separada).

- **Overview**: tiempo de imagen, comando, creación y lanzamiento, reinicia, proyecto y
  composicion de servicio, puertos, redes con direcciones IP, montaje (tipo, fuente, etc.)
  El camino en el contenedor, modo, etiquetas y variables ambientales.
- ** Registros: flujo de nuevas líneas, stderr resaltado en color. La pausa ahorra nuevos
  líneas antes de la continuación, horarios se incluyen por separado, búsqueda
  Muestra el número de partidos. Las líneas mostradas pueden ser copiadas o
  Limpiar la pantalla; sólo las últimas líneas se almacenan.
- ** JSON **: Revisar la respuesta con secretos ocultos y el botón de copia.

El terminal abre la concha dentro del contenedor en la pestaña terminal.
Pruebas de selección automática `bash` , `ash` y `sh` ; la cáscara se puede especificar
Claramente.

### Secretos.

Sin una contraseña de almacenamiento, la sección Docker no muestra ni copia los valores.
Parecen secretos. En su lugar, `••••••` (la longitud del valor no se revela):

- Valores de variables y etiquetas cuyo nombre es similar a un secreto: `PASSWORD`
  `TOKEN` , `SECRET` , `KEY` , `DSN` , `CERT` , `SESSION` , `COOKIE` , `SALT` .
  `SIGNATURE` y así sucesivamente `*_FILE` y `*_PATH` son caminos visibles.
- contraseña en la dirección del tipo `схема://пользователь:пароль@хост` - usuario, host
  y el camino permanece;
- valores de la línea de comandos: `--password` , `--token` , `--secret`
  `--requirepass`, `--api-key` , `--key` , y MySQL y MariaDB `-p<пароль>` .
  y `redis-cli` - `-a` ;
- PEM claves privadas en su conjunto y fichas de formatos conocidos GitHub , GitLab,
  Slack, `sk-…`, teclas de acceso AWS, JWT.

No se ocultan las referencias a variables `${POSTGRES_PASSWORD}`: no es en sí mismo
secreto.

Donde opera: información sobre el contenedor (comandancia, argumentos, etiquetas, variables),
pestaña JSON y ver los archivos de compostura. En el entorno variables "Mostrar
Secretos" abre valores; en la pestaña JSON "Mostrar en su totalidad" se abre
inspección completa. Ambos botones solicitan la contraseña de almacenamiento; el total JSON es copiado
como un secreto y se elimina automáticamente del portapapeles. Datos desglosados
Olvidado al cerrar la tarjeta, actualizar, bloquear el almacenamiento y cambiar
perfil.

Los registros se muestran como es: estos son datos de aplicación. Si en las líneas copiadas
(botón o énfasis) es un secreto, el texto es copiado como un secreto y
Se elimina automáticamente del portapapeles.

La terminal de contenedores proporciona acceso completo, incluyendo variables ambientales.
`env`. Cuando abres primero el terminal en el perfil, esto es reminiscencia de una pista.

La contraseña de almacenamiento protege contra la visualización accidental de secretos en la pantalla y de
mirando. De una persona detrás de un ordenador desbloqueado, no protege:
Para ello, encienda el almacenamiento de bloqueo automático en la configuración.

### Toms y archivos.

La vista de los volúmenes "Tom" agrupa por proyectos compuestos y muestra contenedores.
que los usan; los volúmenes no utilizados se marcan por separado. El camino de Tom o
montaje se abre en SFTP de este host SSH (archón de montaje - c)
asignación en la carpeta. Para la ruta local Docker se abre en el archivo
el administrador; la carpeta del paquete macOS (por ejemplo `.app` ) sólo se destaca en el Finder y
Nunca empieza. Docker Los volúmenes de las tiendas de escritorio dentro de su máquina virtual.
Sus carpetas de la computadora no abren - la aplicación explica esto.

### Transferencia de puertos

“Fly el puerto” conecta el puerto local al puerto de contenedores; por defecto
Los puertos de los contenedores se proponen, y el puerto local `0` elige el puerto libre. Para
SSH - Host dash pasa por SSH - conexión, dirección local -
`127.0.0.1`. Los pases lanzados Docker y Kubernetes se recogen en el derecho común
Panel "Transferencia de puerto": estado, dirección con copia, número de conexiones,
Tráfico y cierre. El panel se abre después de comenzar el lanzamiento.

### Conexión a la base de datos

Un contenedor con un puerto de base de datos estándar PostgreSQL , MySQL, MariaDB,
ClickHouse, Redis, MongoDB) tiene un botón "Conectar a la base de datos" - en la línea, en
menú e información. Si la conexión con tal ruta ya está guardada, es
Se abrirá inmediatamente en la sección "Databases". De lo contrario, la forma de uno nuevo se abrirá.
conexión con el motor, dirección y ruta, así como la base y el usuario,
Si están rodeados por un contenedor, necesitará introducir una contraseña.

- El puerto publicado se almacena como una dirección en el host Docker:
  directamente al ordenador, al host SSH, a través del host.
- El puerto inédito del contenedor remoto está disponible a través de contenedores IP
  SSH - host.
- Puerto de contenedores locales sin publicar recibe la ruta de contenedores
  Docker ”: el derrame se restaura con cada conexión, se busca el contenedor
  por nombre.

La conexión de un host remoto se ofrece como “Prod” por defecto; formulario
Te permite cambiar eso.

### Proyectos de computación

Haga clic en “...” en el encabezado del grupo de compostura o haga clic con el botón derecho en él.
ratones:

- **Run All** sólo los lanzamientos detuvieron los contenedores de proyectos.
- **Detenga todo** y **Restablece todo** mostrar cuántos contenedores hay
  Afectará la acción y esperará confirmación.
- **Mostrar YAML ** abre archivos de proyecto con pestañas con números de línea y
  backlight; en la parte superior está la carpeta del proyecto y los archivos ambientales. Secretos en
  `environment`, `labels` , `command` , `entrypoint` , `healthcheck.test` .
  Las contraseñas en direcciones y llaves están ocultas, los números de línea se guardan.
  Completamente" después de la contraseña, el almacenamiento muestra el texto fuente. El archivo que
  El usuario no puede leer, marcado con una explicación. La copia está activada.
  a través del portapapeles autolimpiables.
- **Cambio YAML ** requiere una contraseña de almacenamiento: los archivos de compostura pueden contener
  contraseñas y determinar qué está funcionando en el host. En el modo de edición, usted ve el original
  texto. El permiso para editar es válido por un tiempo limitado.

"Guardar y aplicar" primero comprueba la configuración en el host por el comando
`docker compose config` (o `docker-compose config` si están solos)
utilidades; nada se guarda en caso de error. Luego al lado de
Cada archivo modificado sigue siendo una copia de seguridad.
`<файл>.bak-ГГГГММДД-ЧЧММСС` , el archivo está escrito y el proyecto se actualiza
comando `docker compose up -d` ; su código de salida y terminación son visibles en la ventana.
"Guardar sin uso" deja los contenedores en funcionamiento en el anterior
configuración. Si el archivo ha cambiado en el host después de la apertura, guardar
Cancelar: Copia tus ediciones y abre el archivo de nuevo. No hay derecho a grabar.
El archivo no cambia. Si el host no tiene una utilidad de cálculo, no se hacen cambios.
Son preservados porque no pueden ser revisados.

Guardar no confía en nombres de archivos. Archivo temporal (con un nombre aleatorio) y
backup se crea exclusivamente, sin hacer clic en enlaces simbólicos,
Y está escrito a través de un archivo abierto, y los derechos se ponen a través de ese archivo.
Antes de comprobar, después de ella y alrededor de la renombre, la aplicación verifica que es
archivo todavía escrito por él (en este ordenador - por inode, por SSH - por
SHA-256 del contenido). Si el archivo es reemplazado, la caja se interrumpe, y
El original reemplazado se restaura de la copia de seguridad. Si el catálogo
El proyecto está disponible para grabar a otros usuarios, antes de guardarlo aparecerá
Advertencia, y la preservación continuará sólo después de la confirmación.

Ver y editar YAML trabajo para proyectos cuyos contenedores almacenan etiquetas.
compostura con las vías de archivo. Versiones más antiguas de compostura y otras herramientas
Sin marcas.
