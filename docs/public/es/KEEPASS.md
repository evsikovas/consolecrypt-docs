# Contraseñas en KDBX, Vault y OpenBao

Referencia traducida · [Original en ruso](../KEEPASS.md)

Abra la sección **Passwords** en la barra lateral. Antes de la apertura de la base, disponible
**Crear KDBX **, **Abrir KDBX ** y **Connect WebDAV **, a continuación se guardan bases.
La sección de inicio de sesión ya no tiene una entrada separada a KDBX .

Después de abrirse en la parte superior izquierda están las carpetas de la base seleccionada y la lista de bases.
Está anclado desde abajo. El botón **+** junto a la Base de Contraseñas le permite abrir otro.
Crear una nueva base o conectarla WebDAV . En el medio hay una lista de registros.
a la derecha - una tarjeta compacta del registro seleccionado con copia de campos individuales y un botón
**Cambio. En una ventana estrecha, la tarjeta se abre en lugar de la lista; la flecha vuelve.
a los registros. El ancho de carpetas y tarjetas se puede cambiar por el ratón, tirando vertical
separadores. El ancho es limitado para que los paneles adyacentes sigan siendo accesibles.
Las contraseñas y los valores de los campos adicionales no se muestran en la lista.

Comenzando con 1.0.1, las notas en la tarjeta abierta son siempre visibles en texto plano.
incluyendo notas multilíneas. Contraseña y otros campos secretos siguen siendo
escondido. Esto sólo cambia la pantalla: el archivo KDBX todavía está encriptado.

El registro se puede arrastrar a la carpeta de la misma base de datos. Cuando la carpeta está rota, se ilumina.
La transferencia a otra base de esta manera no se realiza. Hay grupos disponibles.
Nuevos registros, campos protegidos adicionales y registros móviles a la basura.
La búsqueda funciona por nombres, logins y URL sin mirar el significado de secretos.

Cada cambio confirmado se registra automáticamente en un cifrado
KDBX : escribir creación/corrección, nuevo grupo, transferencia y eliminación. Empujar por separado
"Guardar la base" no es necesario. El estado indica preservación y terminación.
Si se produce un error, los cambios permanecen en la base de datos abierta; disponible **Repeat save**
y **Guardar copia local** en el menú de acción de la base de datos.

La transición a la terminal deja las bases abiertas a una paleta de comandos.
Menu **ную → Bloquear la base ** cierra la base seleccionada; si automático
La preservación falló, primero hay una confirmación de la pérdida de cambios.
Bloqueo ConsoleCrypt y perfiles cambiantes cierran todas las bases de datos, terminan WebDAV
Limpian los moldes.

## Importar y exportar entradas KDBX

Abre la base de datos y elige importar o exportar en su menú. Usa CSV para hojas de cálculo o JSON de ConsoleCrypt para conservar rutas de grupos y campos personalizados. Revisa la vista previa antes de confirmar la importación. [Formatos y pasos de transferencia](../../../guide/es.md#password-manager-kdbx-transfer)

## Conexiones a Vault y OpenBao

En Contraseñas, añade la dirección del servidor y elige la autenticación con token o con usuario y contraseña. Tras iniciar sesión, abre las carpetas del motor KV y selecciona un secreto para ver sus campos. [Conectar y consultar secretos](../../../guide/es.md#password-manager-vault-openbao)

## WebDAV y sincronización

En la pantalla inicial, presione **Connect WebDAV ** (para base adicional -
**+** en la parte inferior izquierda) y especificar el nombre, la dirección completa HTTPS del archivo.
`.kdbx` , login y contraseña WebDAV o una ficha de aplicación separada. Para la edición
Con la conexión guardada, presione el equipo a la derecha de la base. Campo de contraseña vacía
Al editar guarda la vieja contraseña. La eliminación de la conexión no elimina
archivo con WebDAV . Usado HTTP Cabeza básica HTTPS; para servicios de dos factores
La autorización generalmente requiere una aplicación separada token/password.

Las opciones de conexión se incluyen en los ajustes de almacenamiento cifrados ConsoleCrypt .
La contraseña WebDAV se almacena en credenciales cifradas separadas. Conectado.
a este almacenamiento de dispositivos con un cliente actualizado aparecen a través de lo habitual
sincronización.
El servidor ConsoleCrypt no recibe ninguna configuración o contraseña abierta. El propio archivo KDBX
almacenado en el seleccionado WebDAV , sus registros no se importan en ConsoleCrypt .
Los caminos locales son recordados sólo en este ordenador y por separado para el perfil.

La dirección debe terminar con el nombre del archivo **.kdbx**. Por ejemplo,
`https://webdav.example/folder/Passwords.kdbx`. Un servidor o una dirección de carpeta
Desviado inmediatamente en el formulario y cuando se abre la antigua conexión, a la red
solicitar y solicitar una contraseña maestra. En el momento de la apertura, el botón **Cancel** está disponible.
El tiempo de conexión es de 10 segundos, cada solicitud HTTP es de 20 segundos.

La apertura es realizada por el GET de un archivo cifrado. Si GET no devuelve el ETag,
cliente solicita propiedad WebDAV `getetag` via PROPFIND with Depth: 0,
Si es necesario, prueba HEAD y repite GET con If-Match. So obtained
La versión se refiere a los bytes que están siendo abiertos, no a un archivo más nuevo.
ETag como un identificador simple sin comillas se normaliza para HTTP .

Guardar utiliza un PUT con el If-Match del ETag fuerte original. Si la respuesta es
no contiene un nuevo ETag, el cliente vuelve a recibir y comprueba el archivo guardado.
El próximo auto-salvado sigue funcionando. A 412 cambios locales
permanecer en la base de datos abierta: puede guardar una copia y abrir el archivo actual.

Si no hay ETag confiable en absoluto o es débil, el cliente utiliza un ETag excepcional.
cerradura WebDAV de LOCK. Bajo bloqueo, re-descarga el archivo y lo compara.
SHA256 bytes encriptados con la versión abierta por el usuario. Sólo cuando
Coincidentemente, un PUT se ejecuta con una señal de bloqueo en Si; luego se envía UNLOCK.
El conflicto cancela la grabación y también elimina el bloqueo. Si no hay confianza
ETag, sin bloqueo permitido, el cliente no sobreescribirá el archivo sin protección;
Es posible guardar una copia local.

No se realizan redirecciones: especificar la dirección final HTTPS a los datos
El login no fue a otro servidor. Un cheque TLS es obligatorio. El límite KDBX -
128 MiB; la parización de metadatos se limita a 256 KiB. Computation of File Fingerprint
Se realiza en un aislato separado para no bloquear la interfaz.

## Windows Hola y la clave física

La primera apertura requiere una contraseña maestra KDBX y, si se utiliza, una contraseña clave.
archivo. Después de la apertura exitosa, abra el menú ** en la barra de datos y
Seleccione ** Windows Hola/print** o **Physical FIDO2 key**.

La apertura rápida se habilita por separado para cada base de datos en cada ordenador.
Windows Hola muestra una huella dactilar basada en el sistema, la cara o el control PIN del dispositivo.
La clave física requiere FIDO2 con PRF/hmac-secret: necesita configurarla.
registro y confirmación, cuando se abre - PIN y toque. At Windows PIN
solicitando el sistema. Una llave ordinaria sin PRF no es adecuada.

La aplicación almacena sólo la clave compuesta cifrada KDBX localmente. El suyo.
Un sobre criptográfico separado requiere material que libera un sobre del sistema.
Protector de dispositivo o clave FIDO2 registrada. On Android used
Keystore con petición del sistema CryptoObject: el resultado se verifica criptográficamente.
No sólo por un diálogo exitoso. El sobre está atado al perfil, el almacenamiento,
Dirección de base y método de confirmación. No está sincronizado y no se enciende.
a una copia de seguridad ConsoleCrypt . Master Contraseña y archivo clave restante reservado
forma de entrar. Después de cambiar la contraseña principal en otra aplicación, abra la base de datos
contraseña y volver a habilitar la apertura rápida.

## Generador y menú de bases de datos

El botón ** Generador de contraseña** está disponible en la pantalla de inicio y en la sección abierta
Base. En el editor de grabación, el botón junto a la contraseña sugiere generar uno nuevo.
Contraseña y ponla en el campo. Esto no guarda el registro hasta que el editor lo confirme.
El generador también está disponible al crear una contraseña maestra para una nueva base de datos.

Duración – de 8 a 128 caracteres; A–Z, a–z, numerales y caracteres especiales se incluyen por separado.
Símbolos, símbolos similares se pueden excluir. Cada grupo seleccionado es necesario
Está presente. Se utiliza un generador de sistema operativo criptográfico. Copiar funciona.
a través de un buffer protegido común con un temporizador de la configuración ConsoleCrypt .

PCM en la parte inferior de la lista abre un menú compacto: abra / seleccione, bloque,
guardar una copia local, configurar una apertura rápida, repetir el fracasado
guardar, cambiar WebDAV - conexión o eliminar la base de la lista.
**Eliminar de la lista** requiere confirmación y deja el archivo KDBX en disco o
WebDAV. Las acciones se refieren a la base en la que se llama el menú, incluyendo las inactivas.

PCM abre el menú ** Abre la tarjeta de registro ** Muévete a otro
grupo de...** y **Delete**. Para transferir, seleccione la carpeta en el siguiente menú; actual
La carpeta está marcada y no está disponible para la re-selección. La transferencia se mantiene inmediatamente.
La eliminación requiere confirmación y traslada el registro a la cesta de la base de datos.

## Renombramiento y supresión de grupos

En la versión 1.0.4, la carpeta regular tiene un menú **.**, que también está disponible en PCM.
Seleccione **Renombre **, introduzca un nuevo nombre y guárdalo. Registros y archivos adjuntos
Las carpetas almacenan sus identificadores; los caminos en las tarjetas se actualizan automáticamente.
En el teléfono, primero seleccione la carpeta a través del botón del grupo, luego haga clic en **е** al lado.

**Eliminar** requiere confirmación y transferencia de la carpeta seleccionada con todas las carpetas adjuntas
carpetas y entradas a la cesta KDBX . Esto no es una eliminación irrevocable del contenido.
Grupo de raíz ("No carpeta"), cesta y carpetas ya se movió en él por estos
Las acciones no pueden cambiarse. Si la cesta del sistema está anida en una carpeta regular,
La eliminación de esta carpeta no está disponible, y se permite renombrar. Después de eliminar la carpeta seleccionada, la interfaz vuelve.
a su padre o a todos los grupos. Ambas operaciones se guardan automáticamente.
incluyendo bases de datos a través de WebDAV; la protección contra los cambios de archivos externos sigue siendo activa.

## Papelera de reciclaje: limpieza y eliminación final (1.0.6)

La cesta del sistema KDBX está indicada por el icono de la cesta. Seleccione o la carpeta dentro.
Haga clic en "Clear la cesta" por encima de la lista. El equipo también está disponible a través de
**е** / PCM del carrito mismo; en el teléfono - via **е** al lado de la selección del grupo.
La confirmación elimina de la base de datos actual ** todos los grupos, grupos anidados y registros**
canastas. La carpeta del sistema vacío permanece, los datos existentes se almacenan fuera de ella.

Para un grupo separado o entrada dentro del carrito, seleccione **Delete Forever**.
La acción requiere confirmación; eliminar el grupo incluye todo su contenido.
No se dispone de grupos remotos de renombramiento. La carpeta habitual con el nombre Trash no
Se considera una cesta: se utiliza el identificador del sistema KDBX.
Limpieza y eliminación final se guardan automáticamente, incluso a través de
WebDAV. Las copias de seguridad encriptadas previamente creadas `.bak` no se eliminan.

## Ctrl+K desde la terminal

1. Presione **Ctrl+K**, ingrese **passwords:** (o **passwords:**).
2. Abra la base de datos almacenada o seleccione **Abrir KDBX **.
3. Después del colon, introduzca el nombre de servicio, login o el nombre del campo API.
4. Seleccionar **record** con flechas y prensa **Enter**. El búfer no cambia en este punto.
5. En el submenú, seleccione qué copiar: contraseña, login, URL, notas o campo API.
   Sólo el siguiente **Enter** o haga clic en el campo copia el valor.
6. **Esc** regresa de los campos a los registros encontrados, otro **Esc** vuelve a los regulares.
   Equipos. Si vuelves al momento de recibir el campo, se cancela la copia.

Los valores de los secretos no se muestran en los resultados, no indexados o indexados.
Está siendo transmitido por AI. Los registros de la cesta están excluidos de la paleta. Copiar utiliza un común
Buffer protegido ConsoleCrypt y tiempo de limpieza de los ajustes de aplicación; comandos
Al mismo tiempo, no se ejecutan en el terminal.

## Preservación y compatibilidad

Los cambios se registran automáticamente después de que cada transacción sea confirmada.
Preservación local crea cerca
una copia encriptada `<имя>.kdbx.<время>.bak` y reemplaza la fuente a través de un cifrado
archivo temporal. Si la fuente ha cambiado desde la apertura, está prohibida la sobreescritura.
Las copias de seguridad son eliminadas por el usuario. **Guardar una copia local** requiere
El nuevo nombre no reemplaza un archivo existente.

Supported AES-256 / ChaCha20, AES-KDF / Argon2d / Argon2id; password, binario
32-byte, 64-character hex, XML v1/v2 y archivo clave arbitrario, incluyendo
Modo sólo el archivo clave. Los adjuntos y la historia se guardan al editar
archivos; interfaz de acceso independiente, TOTP, cambio de contraseña maestra
Y las teclas de hardware de respuesta de desafío KeePass no se implementan.
Los grupos de renombramiento y eliminación están disponibles en la versión 1.0.4. FIDO2 se utiliza localmente para abrir rápidamente, sin cambios
formato KDBX .

Límites: base 128 MiB, archivo clave 1 MiB; Argon2 hasta 256 MiB, 50 iteraciones
16 arroyos; AES-KDF a 100 millones de rondas. La operación del empleado se cancela por
dos minutos. Nueva base: KDBX 4, Argon2id 64 MiB, 3 iteraciones, 1 corriente.

kdbx.dart 2.5.0, GPL-3.0. Fuentes, licencias y cambios son
c `client/flutter/vendor/kdbx` Compatibilidad de las bases de prueba adicionalmente
Es verificada por un lector independiente de PyKeePass.

## Android y iOS a 1.0.0

Local KDBX del diálogo del sistema se importa en el directorio privado permanente.
Aplicaciones: Una copia temporal del selector puede desaparecer después de que el diálogo esté cerrado.
Autosave cambia esta copia encriptada. Úsalo para descargarlo.
**Guardar una copia local** y completar el diálogo de exportación. Original
El documento no se sobrescribe automáticamente. Cuando la apertura se cancela, sólo
Una nueva copia incompleta, no el archivo original.

WebDAV se abre directamente y trabaja con el mismo archivo borrado en todos los sistemas operativos.
En una pantalla estrecha, la base y la carpeta se seleccionan por un menú compacto, lista y tarjeta.
Se presentan a su vez. Para acciones con el registro disponible "..." y larga prensa.

Desbloqueo rápido implementado para Windows Hola, Apple Secure
Enclave y Android Keystore. FIDO2/PRF se mantiene en Windows / macOS ; Linux -port
La biometría aún no se ha aplicado. Público iOS Paquete – Simulador sólo en Mac
No confirma el escáner físico en el iPhone. Más detalles:
[поддержка платформ](PLATFORM_SUPPORT.md).

## Inglés: renombrar y eliminar grupos (1.0.4)

En el escritorio, haga clic con el botón derecho en una carpeta normal o abra su menú ****. **Renombre** mantiene
entrada y subgrupo IDs y refresca sus caminos. En un teléfono, seleccione la carpeta
con el botón de grupos, a continuación, abrir el menú contiguo ** ** **.**
confirmación y mueve el subárbol completo a la barra de reciclaje KDBX, preservando
sus entradas y secretos. Los grupos root y reciclados no pueden ser renombrados o reciclados de nuevo.
Una carpeta normal que contiene el cubo de reciclaje del sistema puede ser renombrada pero no
borrado sea, evitando un movimiento en su propio descendiente. Ambas operaciones autosalden a los archivos locales o WebDAV y retengan el cambio externo
protección. Después de la eliminación, la navegación vuelve al padre o a todos los grupos.

## Inglés: papelera de reciclaje (1.0.6)

El cubo de reciclaje real KDBX tiene un icono de basura. Seleccione o una carpeta reciclado y
use **Bot de reciclaje de vacío**, o abra el menú ** de la papelera.**/click derecho. Por teléfono,
el menú de grupo seleccionado está junto al botón de grupos. Confirmación permanente
elimina todos los grupos reciclados, subgrupos y entradas manteniendo al mismo tiempo datos activos;
El sistema vacío se queda. Un grupo reciclado o entrada también tiene **Delete
permanentemente**, con confirmación. Ambas operaciones autosalvaron localmente o a través de
WebDAV. Los archivos existentes encriptados `.bak` se guardan.
