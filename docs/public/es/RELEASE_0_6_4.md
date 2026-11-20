# ConsoleCrypt 0.6.4

Referencia traducida · [Original en ruso](../RELEASE_0_6_4.md)

## Ruso

La versión está disponible para macOS , Windows , Linux y Android . La Asamblea e inspección iOS se aplazaron.

** Kubernetes en el equipo rediseñado.** A la izquierda, el navegante con racimos y
grupos de recursos (cargas, red, configuración, almacenamiento,
acceso, cluster, GitOps, recursos de usuario por grupos API y favoritos.
La primera pantalla del cúmulo es una vista en directo: nodos, cápsulas de funcionamiento, espacios de nombres,
Problemas, carga de CPU y memoria con gráficos y vainas estatales. Si está en el grupo
no metrics-servidor, la versión básica se puede instalar desde la revisión (para local)
Los racimos tienen un modo `--kubelet-insecure-tls` . La tarjeta de objeto se abre.
en la parte superior de la mesa, el asistente de grupo AI - en el panel derecho, el panel inferior de troncos y
El terminal no comprime la tabla.

- Menú de racimo por clic derecho: renombre, propiedades, marca como
  prueba o producto, color de la etiqueta, compartir a través del servidor de sincronización y
  exportación de kubeconfig.
- La ventana de grabación en el grupo de productos está confirmada por la contraseña de almacenamiento.
- La edición YAML sí revisa los cambios en el servidor. Pods created
  los controladores son ahora editados; si se niega, se muestra qué controlador
  posee el campo o los campos que el servidor ha rechazado.
- La tabla y la revisión muestran el estado actual de las cápsulas (Running, Completed,
  CrashLoopBackOff; objetos sin estado (Servicio, ConfigMap) no tienen una columna.
- GitOps: La revisión ya no cae, el flujo de recursos se construye de izquierda a derecha
  con ciclos Flux.
- Los derrames de puertos son una herramienta separada del panel derecho; la historia de los eventos.
  tarjetas con texto desplegable.
- AI Kubernetes trabaja con un modelo local incorporado y reduce el contexto
  para modelos pequeños.

**Terminal y conexiones.**

- La fuente terminal se selecciona de las fuentes monowire instaladas.
- pestañas de menú: renombrar, duplicar, cerrar otros y derecho.
- La pestaña de fondo con la nueva salida se destaca, en el menú lateral -
  contador separado de estas pestañas.
- Tab signature: nombre de la lista, dirección o nombre de la computadora, o nada.
- Importar hosts de `~/.ssh/config` (Incluir, Host, ProxyJump y claves)
  de IdentityFile.
- Las teclas calientes se reasignan en la configuración, con una advertencia sobre
  Conflictos y restablecimiento a la norma.

** Interfaz. ** Las respuestas de AI muestran Markdown. En la parte inferior del menú, se puede ver lo que
La IA responde: modelo incorporado, servidor local o API. Diálogos seguros
coloreado en colores temáticos; configuración, sincronización y páginas de respaldo
Se extiende hasta el otro lado.

Detalles: [руководство Kubernetes](KUBERNETES.md) .
