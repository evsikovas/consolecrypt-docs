# Acceso público ConsoleCrypt

Referencia traducida · [Original en ruso](../SHARING.md)

Compartir se refiere a los anfitriones seleccionados, francotiradores, colecciones e individuales
secretos. Su almacenamiento personal y su llave no son compartidas con colegas. Participantes
Se debe utilizar un servidor de sincronización; debe apoyar y
Permitir funciones apropiadas. Un perfil local no envía datos.

## Controlar el soporte del servidor

Los hosts seleccionados están disponibles en el servidor público `https://sync.consolecrypt.dev` .
Snippets, Colecciones Compartidas, Secretos Individuales y Adición Confirmada de Propio
Dispositivos. En su servidor, el administrador incluye estas características por separado:
[настройки Docker Compose и Helm](HOSTING.md). Habilitar la función no publica
Datos personales: el envío del artículo seleccionado requiere una acción explícita del propietario.

En el cliente **0.2.0 y más tarde ** click ** Compartir → Actualizar datos compartidos**,
para volver a comprobar las capacidades del servidor después de que se enciendan o la red
errores. El botón está disponible para el perfil de sincronización desenlazado. Anexo
muestra errores de conexión, autorización y almacenamiento seguro del sistema operativo;
No significa que la función esté deshabilitada. En la versión anterior, el botón puede ser
Inactivo después de un chequeo no exitoso previamente – actualizar el cliente primero.

## Navegación en el cliente

En **0.2.2 y más tarde** pestaña **Disponible para mí** muestra los artículos recibidos, y
He compartido los elementos que controlas. Bloque de dispositivo
Ubicación separada: **Agregue este dispositivo** lanza una solicitud de un nuevo dispositivo
El dispositivo **Confirme el dispositivo ** se utiliza en el dispositivo ya verificado.
** Solicitudes de dispositivo** acciones de espera abiertas; continuar agregando y
Verificar la historia firmada es en **Otras actividades**.
**La huella de las teclas de mi dispositivo** está disponible en el título de sección. Transición entre pestañas
o la importación del paquete no da acceso en sí mismo.

## Empieza a trabajar juntos.

1. Un colega entra en el mismo servidor.
2. Desde el menú host o snippet, seleccione **Compartir**. Mira eso.
   Que campos serán enviados, encontrar un colega por correo y nota
   **Den acceso a este dispositivo**. Las teclas del dispositivo se fijan en su
   El dispositivo con el estado "Seleccionado (no revisado)".
3. Haga clic en **Ver ** al lado del dispositivo (cliente 0.9.2 y posterior):
   ** Código de seguridad** - 12 grupos de dígitos calculados a partir de claves
   Ambos dispositivos. Un colega abre el mismo cheque para tu dispositivo y
   dicta su código por teléfono o en persona, usted lo introduce (inserto deshabilitado).
   Puede escanear personalmente el código **QR** de la pantalla de un colega. Dirección y lista postales
   Los dispositivos del servidor solo no confirman la autenticidad de las teclas.
4. Seleccionar derechos: **Reader** por defecto; **Editor** puede cambiar el general
   elemento. Haga clic en **Compartir ** y enviar la línea.
5. Colleagues open **Acceso compartido **Disponible para mí **, cheques si desea
   El propietario toma el elemento de la misma manera. Conseguir un snippet nunca
   lanza el equipo.

### Comprobación de las claves de los colegas (cliente 0.9.2)

- Estatus de dispositivo de coligueo: **Seleccionado (no verificado)**, **Verificado <дата> ** y
  Las llaves han cambiado. Si el servidor se comunica a otro dispositivo conocido
  claves, el nuevo acceso a este dispositivo no es posible antes de volver a comprobar;
  Los elementos existentes para nuevas teclas no se reencriptan.
- Configuración de almacenamiento **Acceso compartido: sólo verificado** (Configuración →
  Almacenamiento: Por defecto, se emiten secretos, accesos al kube y conexiones de bases de datos
  Sólo dispositivos verificados, hosts, grupos y snippets - y seleccionados.
  La política se aplica a nuevas cuestiones y nuevos dispositivos cuando se cambia el acceso;
  Los receptores existentes todavía tienen acceso.
- Después de la actualización, todos los participantes en los elementos existentes están marcados como “Seleccionados”
  "Una vez que se muestra una lista de destinatarios de secretos, se accede al kube.
  Y el DB vale la pena comprobarlo.
- Los artículos de un propietario unverificado se etiquetan "Owner Not Verified": sus anfitriones
  No se conectan automáticamente, los snippets muestran la fuente.
- Las correcciones se almacenan en una base de datos de perfil cifrado en cada dispositivo
  (Sincronización entre dispositivos en las siguientes versiones)

El host se envía sin contraseña, clave privada, enlaces personales a credenciales
y equipos locales. Al crear una copia personal, el destinatario selecciona su cuenta.
datos o introduce una contraseña al conectarse. Dirección modificada o SSH - puerto de general
El host debe ser revisado por separado antes de una nueva conexión, incluyendo los anfitriones de salto.

## Colecciones y secretos

La colección general contiene referencias a elementos comunes claramente seleccionados. No lo es.
distribuye los derechos a las filiales: cada host, snippet o secreto tiene su propio
composición de los participantes. El elemento no disponible del niño se muestra cerrado.
Agregar un host personal a un grupo personal no lo publica automáticamente.

El secreto es transmitido por una acción separada en las credenciales con una advertencia y
Confirmación. El valor está oculto a **Mostrar** y despejado de la pantalla por el temporizador,
cerrar y cerrar. Copiar revierte el acceso al servidor.
Frase de contraseña SSH - la clave se transmite por separado; no se adjunta a la clave
automáticamente. Los secretos no lo convierten en AI o en una visión general de metadatos.

## Conexión Kubernetes y bases de datos

Contextos Kubernetes y conexiones de bases de datos se transmiten sólo cuando
soporte de servidor; el antiguo servidor esconde estas actividades. Cuentas para
el predeterminado no se transmite, pero la ruta a través del host personal SSH, el perfil de transición,
Un proxy, túnel o contexto es elegido por el destinatario cuando se guarda la copia.
Los detalles se pueden encontrar en secciones Kubernetes y bases de datos.

## RDP hosts (client 0.9.14)

host RDP se puede compartir de la misma manera que SSH host: **Share...** en el menú
hosta. La tarjeta incluye dirección, puerto, usuario, dominio y etiquetas; notas y
contraseña guardada - sólo en una marca separada (password - sólo verificada)
Dispositivos. Servidor y protocolo no cambian, clientes hasta 0.9.14
No se muestran. Detalles: [RDP.md](RDP.md) .

## Sus dispositivos.

Desde 0.9.14, el dispositivo que el servidor pretende ser el tuyo no se convierte en el receptor.
Secretos, Conexiones Kubernetes o Bases de Datos: Sus Dispositivos se comparten
Solo acceda a través de una conexión confirmada (“Agregar este dispositivo”).
Una búsqueda de su propia dirección de cuenta es rechazada.

## Notas generales

Si el servidor admite notas compartidas `supports_notes_v1` , en el panel derecho
Notas en modo Objeto para un host compartido, base de datos o contexto Kubernetes
El bloque "Apuntes Generales" aparece. Todos los participantes del objeto pueden verlo; pueden escribirlo.
cualquier participante, cambie la nota - sólo su autor, suprímase - el autor o
propietario. Note to Docker -container common SSH -host or to the resource shared
El contexto sólo es visible para ese contenedor o recurso. Tareas y recordatorios
Son personales.

Las notas están encriptadas en el dispositivo. Las notas son proporcionadas por el dispositivo del propietario y
El servidor no puede cambiar la clave ni leer el texto. Adiós.
El propietario nunca ha abierto la barra de notas para el objeto, los participantes ver
Mensaje de espera. Después de la exclusión del participante, el dispositivo del propietario
el siguiente panel de apertura re-encripta las notas con una nueva clave; excluido
El participante ya no recibe nuevas notas.

## Múltiples dispositivos de un colega

El espacio de trabajo personal está sincronizado por la confirmación habitual de los dispositivos. Acceso.
Los elementos comunes se revisan por separado. Propietario del elemento común original
Abre ** Nuevos dispositivos patentados ** y selecciona un dispositivo ya probado
colegas, derechos máximos, plazo y número de nuevos dispositivos. Modo manual seleccionado
por defecto. El modo automático debe estar habilitado explícitamente; el propietario debe
Manténgase en línea con una aplicación desbloqueada.

1. Transfiera el paquete de permiso público al nuevo dispositivo de un colega.
2. Aquí, seleccione **Agregue este dispositivo**, abra el paquete y cree una solicitud.
3. Enviar una solicitud al dispositivo ya probado de un colega, seleccione
   **Confirma el dispositivo** e introduce el código (6 grupos de 5 dígitos) de la nueva pantalla
   Dispositivos - el código en sí no se muestra ni sustituye a este paso.
4. Devuelve el paquete confirmado al nuevo dispositivo y selecciona
   **Otros actos → Continuar agregando el dispositivo**. Introduzca el código de la pantalla.
   dispositivo de confirmación.
5. El propietario comienza a comprobar, el nuevo dispositivo responde de ** Solicitudes de dispositivo**
   El propietario entonces acepta la solicitud. En modo automático, la aplicación del propietario
   Esto se hace para una solicitud ya confirmada. Los cheques de código siguen siendo
   obligatorio en ambos regímenes.

Los paquetes contienen llaves públicas y confirmaciones firmadas, sin contraseñas.
Las claves privadas y el contenido del artículo. La importación de paquetes no le da acceso.
Un nuevo dispositivo no puede mejorar su papel ni invitar a otro usuario.
Una vez que el propietario se reinicia, se puede requerir un nuevo cheque de propiedad clave.
Desactivar el permiso se mantiene localmente incluso cuando el servidor no está disponible.

## Remoción, salida y recuperación

Sólo el propietario puede eliminar el elemento común: a partir del servidor **0.1.17**
El servidor rechaza la eliminación del editor `owner_only`, incluso de los antiguos.
Los clientes, por lo tanto, no se pierden los datos del propietario. Los destinatarios pierden el acceso inmediatamente.
El servidor almacena el último contenido cifrado del elemento eliminado.
**30 días**: en el cliente **0.8.7** y más tarde abierto **Compartí →
Quitar ** y presionar ** Restaurar **. El artículo está reeditado con el mismo
dispositivos distintos de los que no tienen acceso; los receptores lo aceptan de nuevo comparando
Código del propietario. Después de 30 días, sólo queda la marca de eliminación firmada.
Los elementos suprimidos dentro de este período se contabilizan en el límite de elementos comunes.

El destinatario puede seleccionar en cualquier momento **Exit desde el acceso público** en la tarjeta.
elemento o en una invitación entrante. Todos sus dispositivos pierden el acceso inmediatamente.
En el servidor, el artículo desaparece de la lista, y las copias personales guardadas permanecen.
El Propietario ve que el Participante se ha retirado; el próximo cambio de derechos, el Participante
Retirada de la lista firmada. Sólo puede ser re-addicionado con nuevos.
por invitación. Estas acciones están disponibles si el servidor reporta soporte.
Los botones del antiguo servidor están ocultos.

## Revocación, conflicto y recuperación

En **Compartí → Control de acceso** el dispositivo original del propietario puede
Cambiar los derechos y eliminar el dispositivo. Los participantes cambiantes crean una nueva clave
Encriptación y una nueva versión del elemento. Datos ya leídos y copias personales
No puedes apagarlo. Si la contraseña transmitida o SSH clave ya no es válida,
Cambia al servidor de destino también.

Un error de red deja el cambio firmado en una cola separada. Echa un vistazo.
cola y enviarla de vuelta. Un conflicto de derechos o versiones bloquea la versión antigua.
cambio; la aplicación no lo lleva silenciosamente a una nueva era. Supresión del expediente
La cola no cancela el cambio ya aceptado por el servidor.

Controladores de almacenamiento de sistema operativo seguro Detectar recuperación de viejo
base local. Use una reconciliación explícita con el propietario y
Revisando la historia firmada. No eliminar Keychain o las teclas del sistema para
Pasa la cerradura. El servidor puede retrasar nuevos estados; el cliente
detecta un rebote por debajo del estado ya observado, pero no promete instantáneo
Frescura global con un servidor indisponible o inescrupuloso.

Si el servidor devolvió un registro dañado o el registro no pudo verificar las firmas
y encriptación, está oculta, y el resto de la lista está funcionando; en la lista
“N records were not readable.”
