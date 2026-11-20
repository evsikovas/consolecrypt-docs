# ConsoleCrypt 0.8.5

Referencia traducida · [Original en ruso](../RELEASE_0_8_5.md)

## Ruso

La versión está disponible para macOS , Windows , Linux y Android . La Asamblea e inspección iOS se aplazaron.

**Databases – nueva sección.** PostgreSQL , MySQL y MariaDB, ClickHouse, Redis
y MongoDB. Las conexiones se almacenan en almacenamiento cifrado, las solicitudes van
directamente desde el dispositivo.

- Conexiones: Formulario con Control de Comunicación, Importación de Línea de Conexión y `.pgpass`
  El color de la etiqueta, grupos y etiquetas, la vista de los azulejos o lista.
- Itinerario a la base: directamente, a través de SSH host, perfil de salto o proxy, a través
  salvado SSH - túnel, lanzamiento de alimentación Kubernetes o contenedor Docker
  El túnel y el goteo se levantan cuando están conectados.
- Las conexiones marcadas con el “Prod” son sólo de lectura; los derechos de función están disponibles
  Míralo. En el resto, el registro se incluye explícitamente.
- Workspace en el espíritu de clientes SQL clásicos. A la izquierda hay una estructura de carpetas.
  (cuadros, puntos de vista, funciones; columnas, índices, limitaciones, disparadores)
  La mesa abierta está marcada con un marco. A la derecha, las pestañas de solicitud, el editor con
  números de línea, retroiluminación, autoaddición en el cursor, formato y
  Búsqueda de reemplazo.
- Ejecución de un operador dedicado o actual ( Вы/Ctrl+Enter) y todo
  Script ( X/Alt+X). Variables de las solicitudes, verificación y confirmación
  Cambio de solicitudes.
- Los resultados son una tabla compacta con números de fila, clasificación, filtro,
  fijando y escondiendo columnas; en el teléfono - tarjetas de grabación.
- ANÁLISIS DE EXPLAINA y EXPLAINA en forma de árbol de plan con tiempo, líneas y
  Costo.
- Células correctas en los resultados de una tabla con visualización SQL antes de usar.
- Exportar y copiar resultados, historia de solicitudes con favoritos, snippets.
- Asistente de consulta AI: compilar, explicar, corregir y acelerar una consulta.
  El diagrama y las líneas sólo entrarán en el modelo con su consentimiento.
- Redis: Árbol clave a través de SCAN e insinuar en lugar de KEYS. MongoDB: Equipos en
  Es una sintaxis familiar.
- Kubernetes : “Conectar a la base de datos” botón en los fondos inferiores con puertos base estándar
  datos.

** Docker - nueva partición.** Motor en este ordenador o guardado
SSH - host; si el usuario no tiene derechos al socket Docker , esto es inmediatamente visible.

- Los contenedores están agrupados por proyectos de compostura, lanzados desde arriba, filtro por
  estado y búsqueda.
- Registros, terminal dentro del contenedor, información: puertos, redes, montaje,
  etiquetas y JSON .
- Las contraseñas en variables ambientales están ocultas; puede mostrarlas y copiarlas después de
  Introduciendo la contraseña de la cámara.
- Los diseños y contenedores que los utilizan. Formas de los volúmenes y
  montajes se abren en SFTP , y para local Docker - en el archivo
  Gerente.
- Pasando el puerto por el túnel SSH . Pasos Docker y Kubernetes recogidos en uno
  panel derecho.
- Conéctese a una base de datos desde un contenedor con un solo botón.
- Programa de compostura de menús: iniciar, detener o reiniciar todo
  Véase YAML . Ajuste - después de la contraseña de la tienda: se verifican los cambios,
  Una copia de seguridad se almacena cerca, luego el proyecto se reinicia.

** Interfaz.

- Listas desplegadas en estilo de vidrio con una fuente compacta. Menú, consejos y
  Los diálogos se coloran en el color de fondo de la configuración.
- El indicador AI es verde, solo mientras el modelo incorporado esté funcionando.
- SFTP muestra "sin acceso" para carpetas sin licencia en lugar de una lista en blanco.
- Se ofrece una actualización incluso si sólo el número de construcción es más nuevo.
- El instalador para macOS se ha vuelto más pequeño.

Detalles: [руководство по базам данных](DATABASES.md) y
[руководство по Docker](DOCKER.md).
