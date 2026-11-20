# RDP at ConsoleCrypt 0.5.5

Referencia traducida · [Original en ruso](../RDP.md)

Se ha añadido la capacidad de conectarse a RDP.

## Conexión.

Bajo **Hosts → New Host**, seleccione **RDP** primero. Dame un nombre.
dirección informática Windows , puerto (generalmente 3389), nombre de usuario y opcional
dominio. Utilice una cuenta de contraseña: la contraseña se puede almacenar en cifrado
Almacenamiento o entrada cuando esté conectado. Herencia SSH - parámetros de grupo,
SSH - Las llaves y los anfitriones de salto no se aplican a RDP.

Windows requiere un servidor RDP estándar habilitado y acceso autorizado
cuenta. No es necesario instalar la extensión IronRDP en el servidor.
La conexión viene directamente desde el dispositivo; el servidor de sincronización no transmite
Tráfico RDP. Antes de introducir credenciales, confirme la dirección y la huella SHA-256.
Certificado comprobando con el administrador.

Para conectar, presione el botón central en la sección **Remote Desktop**
o "+" junto a las pestañas y seleccione el host RDP guardado. Botón general "+"
El panel superior muestra ambos SSH y los hosts RDP. Si el anfitrión aún no está ahí,
Seleccione **Nuevo host**; desde la sección RDP, el formulario se abre inmediatamente con el tipo RDP.

Los escritorios abiertos se encuentran en las pestañas de la sección **Remote escritorio**.
Puede mantener hasta cuatro sesiones, cambiar entre ellas y cerrar por separado.
Guardado RDP hosts sincronización entre sus dispositivos con la nueva versión
cliente. Un host RDP puede compartirse con el dispositivo de un colega de confianza: "Joint"
acceso" en el menú host transmite la tarjeta - nombre, dirección, puerto, usuario, dominio y
Etiquetas; notas y contraseña guardada - sólo por marca (password requiere soporte)
Secretos en el servidor y, como cualquier secreto, receptores verificados. Recipiente
Él guarda una copia y decide si tomar la contraseña. Clientes hasta 0.9.14 tales
No muestran la tarjeta.

Antes de utilizar hosts RDP sincronizados, actualice **todos los dispositivos
Este almacenamiento es de hasta 0,3 o posterior. Los clientes mayores no muestran anfitriones RDP y no
tener en cuenta sus vínculos al eliminar los grupos comunes y las credenciales de contraseña.
Tal eliminación desde el dispositivo antiguo puede interrumpir la conexión RDP almacenada.
Esta limitación de compatibilidad no transmite contraseñas al servidor de sincronización.

## Pantalla completa

El botón ** Pantalla completa ** abre el escritorio remoto a la pantalla completa
El ordenador esconde el menú lateral de la aplicación. Panel superior automáticamente
Escondimiento: sobre el indicador azul en el borde superior o la prensa
**Ctrl+Alt+Home* para mostrarla. El panel se puede fijar con un botón de pin.

En el menú con el nombre de la conexión, puede cambiar sesiones RDP abiertas.
También hay permisos disponibles para buffer y carpeta, doblando la ventana, saliendo de la ventana.
Pantalla completa y cierre de la sesión actual. Salir de la pantalla completa trae de vuelta
el mismo tamaño de la ventana, y el plegado retiene la conexión. Teclado **Escape **
Se transmite de forma remota Windows .

## Control de RDP desde el teléfono - 0.5.5

En el teléfono, una sesión activa automáticamente toma la pantalla completa. El único.
control permanente - botón flotante: arrástrelo a un borde conveniente
o presionar para abrir el panel. Permite abrir el teclado, seleccionar
sesión, cambiar el tamaño, orientación, permisos e intercambio de texto. Posición del botón
Se recuerda por separado para la orientación del retrato y del paisaje.

**Tachpad está encendida por defecto.**Mire el dedo mientras el cursor se mueve.
sobre su posición. El dedo puede ser levantado y reordenado. En la tableta.
**Tocing** – haga clic debajo del dedo; la pantalla completa se activa
manualmente. El modo de conmutación está disponible en el panel y se recuerda para el host solamente
Está en este dispositivo. El ratón conectado funciona directamente.

| Touchpad gesto | Acción. |
| --- | --- |
| Un toque corto. | Camarilla izquierda |
| Dos toques rápidos. | Doble clic. |
| Doble tacto con retención o retención de unos 500 ms | Arrastre antes de liberar su dedo |
| Tocando con dos dedos | Clic derecho. |
| Movimiento paralelo de dos dedos | Desplazamiento. |
| Un pellizco | Escala 1-4x |
| Doble tacto con dos dedos | Llena una foto. |
| Tocando con tres dedos | Mostrar / ocultar el teclado |

El teclado cubre la imagen, conservando el tamaño de la superficie; área visible
Siga el cursor. Por encima del teclado es una barra de desplazamiento de teclas.
**Keys** abre un set extendido que incluye F1–F12 y combinaciones.
Una prensa de Ctrl/Alt/Win/Shift actúa en la siguiente llave, dobles cerraduras
Modificador, otra versión. Completar la composición de la palabra en el sistema
teclado antes de enviar llaves especiales.

La autorización se solicita bajo la pantalla y girar. Si el servidor se niega a cambiar
tamaño, sigue siendo la resolución original con la posibilidad de escalar. V.
**Configuración → Gestión RDP en el teléfono** velocidad disponible, aceleración, tamaño
cursor, claridad, escala Windows , orientación y auto-descubrimiento del botón.

En Android el primer **Volver* revela el control repetido dentro de dos
Es el final de la sesión. On iOS select **Curse session** in the panel.
La conexión se mantiene. **Deshable** requiere confirmación. Cambio de régimen,
sesión, dejando en el fondo, abriendo el panel y bloqueando liberan las teclas presionadas.
El bloqueo de almacenamiento (incluido automático) cierra diálogos y oculta
Escritorio, pero no sesión: Después de desbloquear la pestaña sigue funcionando.
Las sesiones cierran con un cambio de perfil y salida.

[Снимки мобильного управления](https://consolecrypt.dev/guide?lang=ru#rdp-mobile)
Muestran widgets reales con un escritorio sintético. teclado del sistema
En estas imágenes, la zona queda bajo ella. iOS
Es como un archivo para Simulator en un Mac. La redirección de carpetas en el teléfono no está disponible.

### Controles telefónicos - 0,5.5 (en inglés)

Las sesiones de teléfono abren pantalla completa con un botón de control flotante arrastrable.
Touchpad es el defecto del teléfono: mover un dedo para mover el puntero relativamente
y llevarlo a la reposición sin mover el puntero. Las tablas son directas
entrada por defecto y pantalla completa manual. Opciones de modo se almacenan por host en
este dispositivo; un ratón adjunto utiliza entrada directa.

Pulsa para hacer clic izquierdo, doble pulsación para hacer doble clic, y doble toma y mantén
por unos 500 ms para arrastrar. Pulsores derecho del grifo de dos niveles, desplazamientos paralelos del movimiento,
un zoom de pellizco 1–4×, dos-finger doble tap se ajusta al escritorio, y el tap de tres-finger
Toggles el teclado.

El teclado supera un escritorio estable en lugar de reducirlo. Un pergamino
tira de llave y ampliada **Keys** hoja proporcionan modificadores, flechas, F1–F12 y
atajos. Pulsa un modificador una vez para la siguiente llave, dos veces para bloquearla, y otra vez
para liberarlo. Terminar cualquier composición del teclado antes de enviar claves especiales.

El tamaño de la pantalla sigue el área segura y la orientación cuando el servidor permite
redimensionante. Si no está respaldada, la resolución original sigue siendo usable con local
Ampliar. Ajustes de velocidad del puntero de control, aceleración, tamaño del cursor, claridad,
Windows escala, orientación y oculto de botones.

En Android , La espalda abre los controles, y luego otra Retrocede dentro de dos segundos
Minimiza sin desconectar. En iOS , elegir **Minimizar sesión**.
La desconexión pide confirmación. Cerrar cierra sesiones y superposiciones.
[Guide screenshots](https://consolecrypt.dev/guide?lang=en#rdp-mobile) uso
píxeles de escritorio sintético y reservar un área en blanco para el teclado nativo.
iOS sigue siendo una vista previa de Simulator; la redirección de carpeta móvil no está disponible.

## Buffer de cambio

El intercambio de texto está apagado por defecto. Permítanlo para un período de sesiones específico.
Después de eso, **Ctrl+V** en el escritorio activo transmite el texto del local
un búfer e insertarlo en el remoto Windows . En macOS uso **.V**.
No es necesario pulsar el botón **Enviar* de antemano. Si el intercambio está apagado,
Ctrl+V trabaja con el búfer más remoto Windows y no lee el búfer local.

El botón **Enviar** le permite transferir texto por separado sin insertar,
**Recibir ** - solicitar el texto actual de Windows . Autotransmisión
No hay cambio local de amortiguación. Se admite el texto Unicode-text hasta 64 KiB;
No se admiten imágenes y archivos de copia a través del búfer.

## Intercambio de archivos

En macOS , Windows y Linux seleccionar la carpeta local con el diálogo del sistema para
un período de sesiones abierto específico. En el control remoto Windows abierto **Conductor ** y
Ingrese en la barra de direcciones:

```text
\\tsclient\ConsoleCrypt
```

En Linux , el diálogo necesita `xdg-desktop-portal` y su proveedor de selección de archivos.
Escritorio en la actual sesión de D-Bus. El ajuste se describe en
[инструкции Linux](../BUILD_LINUX.md#системный-выбор-папки-для-rdp).

La carpeta también puede aparecer en la sección “Este ordenador” como una carpeta redireccionada.
disco ConsoleCrypt . El cliente proporciona ** sólo la carpeta seleccionada**, incluyendo:
archivos regulares y subcarpetas dentro de ella, sin acceso a otras carpetas y discos
Dispositivos. Por defecto, el remoto Windows puede leer y copiar estos archivos.
A mi casa. Para copiar archivos de Windows a la carpeta seleccionada por separado
Grabando. Referencias simbólicas, puntos de reanálisis e ir más allá
No se admiten carpetas. At Android and iOS , folder redirects are not yet available.

El tamaño del archivo individual se limita a **256 MiB**. Se permite un período de sesiones
**512 MiB Recording Attempts**: Re-recording, overwriting and failed attempt
También están gastando ese límite. Si se alcanza el límite, termine el período de sesiones y conéctese.
Una vez más; el permiso de la carpeta tendrá que ser emitido para una nueva sesión. Este límite no es
Muestra el espacio libre real en tu dispositivo. Para la transmisión de grandes
Utilice un medio adecuado separado para compartir archivos.

Etiquetas de archivo inicial, Notificaciones de cambio de carpeta y archivo
Los bloqueos no están siendo reprogramados. Cambios en la ACL y capacidades mejoradas
El sistema de archivos no es compatible.

El permiso puede ser apagado en la sesión actual. Al bloquear el almacenamiento o salir
Las conexiones están cerradas, el acceso temporal se termina. Política Windows - Servidores
Puede prohibir portapapeles o discos redireccionados.

[Иллюстрированное руководство RU](https://consolecrypt.dev/guide?lang=ru#rdp)
[English guide](https://consolecrypt.dev/guide?lang=en#rdp)
