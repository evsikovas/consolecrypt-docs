# Kubernetes

ConsoleCrypt 1.2.1 · [Desplegar un contenedor en Kubernetes](../../../guide/es.md#release-1-2-1-deploy) · [Supervisar un host SSH y restaurar un reenvío](../../../guide/es.md#release-1-2-1-ssh)

Referencia traducida · [Original en ruso](../KUBERNETES.md)

## Ruso

La sección Kubernetes combina conexiones de racimo, recursos, registros y terminales.
Pod, túneles, Helm, GitOps y ayudante de IA. Operaciones principales
API Kubernetes : install `kubectl` , `flux` o `helm` para la visualización,
Los registros, la concha y el puerto hacia adelante no son necesarios.

### Interfaz de computadora

Navegador a la izquierda: lista de grupos y grupos de recursos plegados
(cargas, red, configuración, almacenamiento, acceso, cluster, GitOps,
Recursos de usuario por grupos API y favoritos. El botón de flecha
dobla el navegador, y el menú principal de la aplicación al trabajar con el clúster
Se dobla automáticamente.

El clúster se abre a la vista: nodos, vainas de funcionamiento, espacios de nombres,
Problemas, carga de CPU y memoria con gráficos y vainas estatales. Se toman métricas
del servidor de métricas. Si no, la revisión sugerirá instalar la versión básica en
`kube-system`; para grupos locales con certificados de kubelet auto-firmados
encendido `--kubelet-insecure-tls` . Para un grupo de producción, abra primero
ventana de grabación.

La tarjeta de objeto se abre sobre la mesa. Registros y terminales - en la parte inferior
Paneles, ayudante de IA y lanzamientos de puertos activos están en el panel derecho.
Haga clic derecho en el clúster abre el menú: renombre, propiedades, marca cómo
Pruebas o ventas, etiquetas de color, compartir y exportar kubeconfig.

### Conexión.

1. Abrir Kubernetes e importar kubeconfig del archivo o pasta YAML .
   En el ordenador, también puede seleccionar varios archivos y escanear la carpeta.
2. Marcar los contextos adecuados. Compruebe la dirección de la API, usuario, espacio de nombres y
   Una forma de autorización. El kubeconfig original no cambia.
3. Para un grupo de producción de trabajo, encienda "Prod". Si es necesario,
   Configure la ruta a través de un host o proxy guardado SSH.
4. Conéctese al contexto. Los derechos de usuario en Kubernetes continúan
   Ley: La interfaz no otorga derechos adicionales.

Las fichas y claves privadas se almacenan en almacenamiento cifrado. Conexión
sincronizado entre dispositivos a través de un servidor ConsoleCrypt en cifrado
Ves. Las solicitudes a Kubernetes se envían desde el dispositivo al cluster a lo largo de la ruta seleccionada.
El servidor de sincronización no envía este tráfico.

Todas las plataformas tienen un token, certificado de cliente, y OIDC compatible.
Los plugins externos de inicio de sesión sólo están disponibles en el ordenador. Antes de la importación
Muestra comando, argumentos, y encontrado archivo binario; startup requiere
Una confirmación separada de su SHA-256. Después de la confirmación de sustitución del archivo
solicitado de nuevo. En Windows uso `.exe` : shells `.cmd` no
Están empezando. Los comandos que requieren stdin interactivo no se ejecutan en secreto.
Por teléfono, seleccione la ficha, el certificado de cliente o OIDC.

En el acceso compartido, puede transferir el contexto al dispositivo verificado de un colega.
Por defecto, las credenciales no se incluyen: el destinatario utiliza su propio.
La transferencia de llaves o fichas requiere una elección explícita separada. Exportación
kubeconfig también se ejecuta por separado y crea un archivo que puede contener un archivo.
Mantenlo como un archivo de acceso a grupos.

### Recursos y protección de la producción

Seleccione el espacio de nombres y el tipo de recurso. La lista se actualiza a través del reloj; búsqueda,
Los filtros y la configuración de la columna ayudan a reducir las opciones. Disponible en la tarjeta
Estado YAML, eventos y objetos relacionados. Para el volumen de trabajo soportado
Puedes abrir la historia de la salida y comparar revisiones.

El cambio YAML pasa por la vista previa de la diferencia y seca:
“Aplicar” primero comprueba los cambios en el servidor. Aplicación, eliminación,
El escalado y el reinicio requieren acción del usuario. Conflicto de propiedad
no se regraban sin confirmación separada; si se rechaza,
que gestor de campo (por ejemplo, controlador) posee el campo o qué campos
El servidor lo rechazó. En un Pod, sólo se puede cambiar la imagen.
`activeDeadlineSeconds` , añadir tolerancias, así como etiquetas y anotaciones -
El resto cambia a través del propietario (Deployment, StatefulSet, etc.).
Secret oculta valores predeterminados; los valores de visualización se hacen por separado.
El documento con marcadores `[redacted]` no se puede utilizar: los valores ocultos no se utilizan.
Son reemplazados por el texto de máscaras.

&quot; Prod &quot; restringe por la fuerza los cambios en el núcleo, incluidas las solicitudes de recursos externos
CLI a través del proxy local. Usted puede abrir claramente una ventana del tiempo en su computadora.
los registros durante 10 minutos - se confirma por la contraseña de almacenamiento; en la ventana del teléfono
no disponible. Cada cambio (aplicación YAML , eliminación, reiniciar,
escalada, acciones de GitOps, reversas de Helm, operaciones de masa, también
Es compatible con una contraseña de almacenamiento, no entrando un nombre de recurso o contexto.
Los cambios masivos están prohibidos en la producción, incluso cuando la ventana está abierta. Exec y Port-Forward tienen permisos separados
contexto de producción.

### Logros, conchas y túneles

En la tarjeta Pod, seleccione el contenedor y abra los registros. Flujo disponible, filtro,
El límite de tiempo y el lanzamiento previo del contenedor. Workload le permite recoger
Registros de Pods conectados. Ahorro en el intercambio de computadora y sistema en el teléfono
Se hacen bajo petición.

Shell se abre en la pestaña terminal. Comprobaciones automáticas de selección
`/bin/bash` , `/bin/ash` , entonces `/bin/sh` ; usted puede elegir el comando explícitamente.
Copiar, buscar y gestionar terminales utiliza una interfaz común
ConsoleCrypt.

Por defecto, el puerto hacia adelante crea una dirección local `127.0.0.1` y muestra el estado en el
túneles. En un ordenador fuera de la producción, usted puede permitir por separado otro
Interfaz IP después de la advertencia; en el teléfono y en la producción esto no está disponible.
La parada del túnel cierra la toma local. On Android active
Los túneles son compatibles con un servicio de primer nivel con una notificación y un botón de parada.
Asamblea e inspección Kubernetes a iOS aplazada. La versión actual incluye
macOS , Windows , Linux y Android Bloqueo de almacenamiento (incluyendo:
automática) no cierra la sesión del grupo: terminales de cápsulas y derrames
Continuar trabajando, y después de desbloquear la partición de nuevo abre la misma
cúmulo. Si la configuración de conexión ha cambiado durante la cerradura, la sesión
Se cierra y se vuelve a abrir. La revista de auditoría está escrita sólo cuando
almacenamiento desbloqueado, la historia de los eventos durante la cerradura no es
Todavía está ahí. Las sesiones cierran con un cambio de perfil y salida.

Los pases lanzados Kubernetes y Docker se recogen en un panel derecho común
“Port rollover”: estado, dirección local con copia, tráfico y
Para. El panel se abre después de comenzar el lanzamiento.

### Conexión a la base de datos

Pod con un puerto de base de datos estándar PostgreSQL , MySQL, MariaDB
ClickHouse, Redis, MongoDB) tiene un botón “Conectar a la base de datos”. Si en la sección
“Databases” ya ha salvado la conexión con la misma ruta, inmediatamente
Se abre. Alternativamente, un formulario con una ruta a través de Kubernetes abre: para Pod
de StatefulSet - al propio Pod (tiene un nombre permanente), de otro modo al único
Servicio de selección de Pod, o a su Despliegue, para que la conexión sobreviva
reiniciar las cápsulas. El nombre de la base de datos y el usuario se sustituyen de variables.
Los alrededores del contenedor, si se especifican explícitamente; los valores de Secret no son legibles.
La transferencia portuaria se restaura en cada conexión a la base, y
Se aplican permisos de entrada a este contexto.

### Helm y GitOps

Helm muestra historia de liberación, valores, manifiesto y diferencias entre revisiones.
Todos los valores de cadena están ocultos; campos con nombres de credenciales están ocultos
independientemente del tipo. Los valores calculados pueden ser
Incompleta si la versión guardada de Helm no contiene defectos de dependencia.
Comparación con un clúster lee objetos vivos y mapea los campos de los salvados
manifesto; no es el resultado del defecto del servidor o la conclusión del controlador
Oh, deriva. Las limitaciones de RBAC, los resultados incompletos y los campos ocultos se indican explícitamente.
Rollback está disponible en su computadora a través de un instalado por separado
`helm`.

GitOps muestra fuentes Flux, Kustomizations, HelmReleases, notificaciones
Automatización de imágenes y aplicaciones de CD Argo, cuando se disponga de CRDs apropiados.
El examen, las dependencias y la corriente de recursos ayudan a pasar de la fuente a la carga de trabajo.
“Flujo relacionado”, “Sincronizar con ahora”
fuente, “Flux suspend/resume” y
Argo sync/refresh pasan por las limitaciones de confirmación y producción; consejos
Y la ventana de confirmación explica lo que Flux hará. La suspensión puede ir acompañada por
La razón y el recordatorio local; el recordatorio en sí mismo no renueva nada.

Las notificaciones de Flux opcionales están habilitadas para el contexto y se ejecutan internamente.
anexo abierto. La historia de los eventos también se incluye por separado, almacenado
localmente en una base de datos cifrada por hasta siete días y no se sincroniza. Deficiencia
Los derechos o la limitación del alcance de los datos se muestran claramente.

### Context Terminal and AI

En la computadora, la terminal contextual ejecuta la concha local seleccionada.
Su temporal `KUBECONFIG` indica un proxy de acceso revocable local:
Las claves de racimo reales no están escritas en este archivo. La pestaña se mantiene atada.
En su contexto, el espacio de nombres elegido se establece por defecto. Instalación
Los CLI adicionales requieren confirmación del método de comando e instalación.
Para un gestor de paquetes, la fuente y la versión determinan sus ajustes.

WSL requiere `/bin/bash` y está disponible cuando una distribución seleccionada puede acceder a una protegida.
loopback proxy Windows Si la red WSL no permite esto, el lanzamiento se cancela.
con explicación; la aplicación no abre un proxy en interfaces externas.

AI utiliza el proveedor seleccionado en la configuración. Antes de acceder a los datos
Cluster requiere consentimiento; los proveedores seleccionados son enviados
y datos despejados. Las herramientas de IA leen recursos, eventos y colas de registro.
El comando, o YAML, sigue siendo la frase: la ejecución es normal.
Confirmación, evaluación de riesgos y limitaciones de producción. El chat es contextual. A diferencia de la historia local de los acontecimientos, la historia
La IA puede sincronizarse con E2EE cuando el ajuste de sincronización de chat está habilitado.
