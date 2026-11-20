# ConsoleCrypt 0.9.1

Referencia traducida · [Original en ruso](../RELEASE_0_9_1.md)

## Ruso

La versión está disponible para macOS , Windows , Linux y Android . La Asamblea e inspección iOS se aplazaron.

**Commands** (Sync server 0.2.1). Equipo - almacenamiento compartido
varias cuentas en el mismo servidor: sus hosts, grupos, credenciales y
Los fragmentos son vistos por todos los participantes, y el papel decide quién puede cambiarlos. Nombres,
configuración de comandos y recursos se cifran con cifrado de extremo a extremo - el servidor ve
Sólo la composición de los participantes.

- “Configuración → Comandos”: Crear un equipo con un nombre, color y descripción; él
  Aparece en todos tus dispositivos.
- Invitación por correo con un papel y comentario (el compromiso no está encriptado).
  El invitado lo acepta y dicta al administrador un código de 6 grupos de dígitos;
  El participante se añade sólo después de que el administrador confirme
  "Los Codes no coinciden" no se suma.
- Funciones: propietario, administrador, editor, observador. Sólo Observador
  navega y conecta - los cambios rechazan tanto la aplicación como el servidor.
- En los "Hosts" de la izquierda son secciones "Personal" y una por equipo con su color. Está bien.
  Lo que se crea en el grupo de equipo pertenece al equipo; el anfitrión puede ser copiado.
  o pasar a un equipo desde su menú - se copian las credenciales necesarias
  junto con él. Los recursos del equipo están marcados por su color en listas y pestañas
  El observador tiene la etiqueta “sólo lectura”.
- Políticas del equipo: Marcar nuevos contextos Kubernetes y bases de datos
  No enviar recursos de equipo a asistentes de inteligencia artificial, limpiar más rápido
  contraseñas copiadas, requieren confirmación de cada comando en los hosts
  equipos. El color de tu equipo solo se puede seleccionar para tus dispositivos.
- Eliminar o dejar a un miembro cambia la clave de comando: todo está reencriptado, y
  El ex participante no leerá los nuevos datos. La pestaña "Historia" muestra
  Un registro de alineación firmado.
- Cada cambio de composición es firmado por el administrador, y cada aplicación
  Comproba toda la revista. Si el servidor muestra a un participante que nadie más tiene.
  Si el equipo ha firmado o devolverá al viejo equipo, el equipo se detiene.
  Leyendo con una advertencia, y la llave no se da a nadie.
- El comando se abre sin una red - desde el caché en la base de datos de perfil cifrado;
  Los cambios desaparecerán cuando la red esté disponible.

Necesita un servidor de sincronización 0.2.1 o nuevo; con una partición del servidor antiguo
"Teams" no está mostrando. Funciona en modos normales y corporativos
entrada. Almacenamiento personal, Compartir, Notas compartidas y Respaldos
Están trabajando como antes.

** Inicie sesión empresarial en el servidor de sincronización.** Servidor de sincronización 0.2.0 y
Sólo se puede acceder a través del servidor de autorización de la organización.
La aplicación en sí reconoce el modo servidor después de entrar en la dirección y muestra el deseado
uniforme.

- **Introducir a través de SSO (OIDC).** El botón Iniciar sesión a través de {Name} se abre
  página de inicio de la organización en el navegador del sistema; e-mail se puede especificar
  De antemano. Al entrar, puede ver el estado de espera y el botón "Cancel". Nana
  El navegador vuelve a la aplicación a través de una dirección local
  `127.0.0.1` , en Android a través de pestañas personalizadas, en iOS a través de la ventana del sistema
  entrada. PKCE y verificación `state` se utilizan; el código de entrada es desechable.
- **Acceso al Directorio Activo.** Campos de Accede (email o DOMAIN\user) y
  “Password” con la capción “Tu cuenta de organización”. La contraseña es enviada.
  Una vez en TLS, no se salva y se borra del campo después de cada intento.
- En el modo corporativo, no hay registro, contraseña de cuenta y “Olvidar la contraseña”.
  El nuevo usuario, después de iniciar sesión, pasa por la creación habitual de almacenamiento.

**Visible donde se utiliza el servidor corporativo.** En la pantalla de inicio de sesión:
Entrada a través del servidor de autorización corporativa {name} . Contraseña de la Organización
No abre el almacenamiento - necesita una contraseña de almacenamiento para esto.
“Sincronizaciones” y “Dispositivos” – la línea “Authorization: Corporate Server”
{name} (OIDC tención Active Directory)"; en un servidor normal, "Email y contraseña
cuenta.

**La aplicación recuerda cuando se registró.** Para cada servidor en el dispositivo
El método de inicio de sesión y el login (no contraseña) se guardan. En la siguiente conexión, el método
Seleccionado por adelantado, el login se establece, puedes ver el aviso "Última vez que hayas iniciado sesión"
via ... como ..." con el botón "Forget", y los servidores recientes se muestran etiquetados
“Email”, “SSO: ...”, o “AD”. Si el servidor ha cambiado el modo de inicio de sesión, la aplicación
advierte de esto. En la configuración, puede ver cómo y cuándo entró este dispositivo.

**El acceso es deshabilitado por el administrador.** Cuando la organización deshabilita la contabilidad
grabación, el servidor revoca las sesiones, y la aplicación bloquea el perfil y muestra
"El acceso está deshabilitado por el administrador."
encriptado; el perfil puede ser eliminado del dispositivo o conectado de nuevo si
El acceso está de vuelta. Errores de inicio de sesión corporativo (no se permite el dominio, ningún grupo)
Usted necesita un segundo factor, la cuenta ya está conectada, el servicio de inicio de sesión no está disponible.
Demasiados intentos) parecen ser texto claro.

**Lo que no cambia.** Encriptación, almacenamiento, dispositivos y compartir
Funcionan como antes: el login corporativo reemplaza solamente la contraseña de la cuenta.
Después de iniciar sesión, el dispositivo es un nuevo dispositivo normal, el almacenamiento abre la contraseña.
Almacenamiento, clave de recuperación o aprobación. Con antiguos servidores y
Los servidores en el modo estándar todo funciona como antes.

En iOS se añade un controlador de inicio de sesión del navegador del sistema; también se utiliza.
para la entrada OIDC en Kubernetes .

**Notas, tareas y recordatorios.** En el panel derecho junto a Snippets y
“AI” apareció el instrumento “Notas” (también en la paleta de comandos y en la tapa en la
Teléfono.

- Notas con Markdown, etiquetas y fijación. El interruptor "Task" añade
  plazo; se asignan tareas atrasadas y el número de tareas y tareas atrasadas
  Los recordatorios se pueden ver en el icono “Notas”.
- Recordatorios: "En una hora", "Hoy a las 18:00", "Mañana a las 09:00", "En una semana"
  O tu tiempo. Aunque la solicitud está abierta, una notificación con
  El botón "Abrir"; en el menú de la nota - "Recordar en una hora." Sistémico
  Aún no hay notificaciones en la solicitud cerrada.
- Notas sobre objetos. La pestaña "objeto" muestra notas a lo que está abierto
  SSH - host of active tab terminal, RDP-host, host SFTP .
  Conexión abierta a una base de datos, recurso o contexto Kubernetes
  seleccionado Docker contenedor. La pestaña “Todo” muestra todas las notas y por qué.
  Están atados, "Tasks" son sólo tareas.
- El texto del campo "Notas" de la tarjeta host puede ser transferido a una nota regular
  Button "Toma a notas."
- Las notas se encriptan en el dispositivo y se sincronizan con el cifrado de extremo a extremo, como
  El resto de los datos de almacenamiento. Eliminar el host o la base de la nota no elimina -
  Están marcados "Objeto no encontrado".

** Notas generales** (Sync server 0.2.0 enabled)
`CC_SHARED_NOTES_ENABLED`.

- Un host compartido, conexión de bases de datos o contexto Kubernetes
  En la pestaña "Objeto", aparece el bloque "Notas Generales". Todos son vistos por los participantes.
  cualquier participante puede escribir, cambiar - sólo el autor, borrar -
  autor o propietario. Note to Docker -container common SSH -host or to
  El recurso general de contexto sólo es visible para ese contenedor o recurso.
- La clave de las notas generales emite y firma el dispositivo del propietario, cada nota
  firma el dispositivo del autor - el servidor no puede cambiar la llave o leer
  texto. Hasta que el propietario nunca haya abierto la barra de notas para el objeto, los participantes
  Ellos ven un mensaje de espera. Después de la exclusión del participante, el dispositivo del propietario
  La próxima vez que se abre el panel, vuelve a encriptar las notas con una nueva clave.
- La conexión del objeto con el acceso compartido se recuerda cuando se publica y se ahorra
  Una copia personal. Para objetos publicados antes de este tema (excepto los copiados)
  anfitriones, publicar o copiar el objeto de nuevo para que aparezca
  Notas generales.

** Confirmación de contraseña de almacenamiento.**Las acciones peligrosas ya no son necesarias
Confirma al introducir un nombre de conexión, contexto o recurso en todas partes
Estoy pidiendo la contraseña de la cámara. La contraseña equivocada no hace nada, el campo
Limpiado después de cada intento, Enter confirma.

- Bases de datos: modificación y consultas peligrosas, edición de celdas y desbloqueo
  Prod” (ahora sólo contraseña y término).
- Kubernetes : aplicación YAML , creación y eliminación de recursos, reiniciar,
  escalada, cordón/drain, contenedor de depuración, acciones de GitOps, Helm rollback,
  Operaciones masivas, despejar la historia de los acontecimientos y eliminar los diálogos de IA.

* Bases de datos*

- Haga doble clic en una tabla o “Primeras 100 líneas” muestra inmediatamente los datos
  en la parte inferior - en una pestaña de visualización, que se reutiliza, en lugar de fructífero
  nuevo. La pestaña de visualización modificada manualmente se vuelve normal.
- Generado SQL (DDL "Open in the Editor", historia, borrador AI,
  el propuesto `SCAN` se añade a la pestaña actual debajo del escrito, en lugar de
  c nuevo; nada se está haciendo.
- Información de objetos funciona para PostgreSQL , MySQL/MariaDB, ClickHouse, y
  Redis: propietario, estimación del número de filas, tamaños de datos e índices, número
  columnas e índices, claves de sección y clasificación, el último VACUUM y
  ANALYZE, para las teclas Redis - tipo, TTL, longitud y memoria. Ventana de información
  agrupados en secciones, tamaños en KIB/MiB, grados marcados "conejo", hay
  Copie el botón. El elemento del menú está oculto donde no hay información.
- Los errores en el espacio de trabajo se muestran con una notificación de vidrio, no una blanca
  En el menú contextual, sólo se destaca un elemento.
- Revisar las correcciones de las celdas muestra los valores mismos - líneas en comillas, `NULL`
  Para valores vacíos, largos se acortan en lugar de `{{p0}}` . Aplicada.
  Todavía es una consulta de parámetro.
- La consulta en la ventana de salida se muestra por un bloque de código como DDL: monowire
  font, backlight, line numbers, can be highlighted and copied.
- La ventana DDL se ajusta al ancho de la pantalla y no deja espacio vacío debajo de la pantalla.
  Código corto. Las líneas largas se mueven con la indentación; si se apaga
  "Transferir las líneas," el código se desplaza hacia los laterales. Las elecciones son memorables.
- Sets básicos de snippet: SQL · PostgreSQL (20), SQL · MySQL / MariaDB (20),
  SQL · ClickHouse (20), Redis (15) y MongoDB (15) – consultas activas y largas
  Bloques, tamaños, índices, replicación, consultas pesadas. Añadido a
  "Snippets → Kits de arranque." Se pueden ejecutar en psql, mysql.
  clickhouse-client, redis-cli y mongosh dentro SSH sesiones: multiline
  hojas de consulta con un inserto; los comandos cambiantes requieren confirmación.
- Exportaciones a fórmulas de pantalla CSV/TSV para editores tabulares (ver cuadro)
  "Fórmulas verdes (para Excel)", activadas por defecto; exportación SQL
  escudos correctos comillas y barra inversa para cada base.
- Se lanza un túnel guardado con una dirección de red para conectarse a la base
  127.0.0.1 sólo.

** Acceso compartido** (Sync server 0.1.17).

- Sólo el propietario puede eliminar el elemento común; el elemento remoto puede ser restaurado al
  Dentro de 30 días: "Compartí → Recientemente borrado."
- El destinatario puede salir del acceso público – en la tarjeta del artículo o en el
  Invitaciones entrantes; quedan copias personales guardadas. El propietario ve quién
  Fuera.
- Un registro público dañado ya no rompe toda la lista: está escondido.
  La aplicación te dice cuántos registros no podías leer.
- La dirección de correo cuando se busca el destinatario ya no se transmite a la dirección de la solicitud.

*Safety*

- SFTP : Open ya no ejecuta archivos descargados capaces de ejecutar
  código (scripts, atajos, .exe, .command, .desktop, etc.) – abren como
  El texto en el editor después de la advertencia. Los archivos cargados están marcados como
  obtenido de Internet Windows y cuarentena macOS .
- Nueva frase de contraseña del repositorio - no más corto que 12 caracteres; existente
  Las bóvedas se abren como antes. La clave está encriptada por Argon2id no más débil que 64 MiB;
  Los parámetros antiguos se actualizan la próxima vez que desbloquee la frase.
- Los respaldos se registran a través de un archivo temporal creado de forma segura.
  La lectura de las copias y respuestas del servidor es limitada.
- La automatización del portapapeles se establece de 30 segundos a 1 día y funciona
  y después de reiniciar, sin tocar el contenido de otra persona.

** Windows **

- En la elección de la fuente terminal - sólo las fuentes monowidth instaladas,
  incluidos los instalados para el usuario (por ejemplo, JetBrainsMono Nerd Font);
  Los nombres "...Nerd Font Mono" y "...NFM" son intercambiables, y si la fuente no es
  set, los ajustes lo dirán. Linux también muestra las fuentes establecidas.
- La ventana está oculta de capturas de pantalla, demos de grabación y pantalla mientras está abierta.
  contraseña, clave o palabras de recuperación. "Configuración → Seguridad: "Nunca"
  "Cuando se ven secretos" o "Siempre".
