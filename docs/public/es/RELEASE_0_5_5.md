# ConsoleCrypt 0,5

Referencia traducida · [Original en ruso](../RELEASE_0_5_5.md)

## Ruso

Por teléfono, RDP se abre automáticamente a la pantalla completa. Paneles permanentes
Son reemplazados por un solo botón flotante, y puedes moverlo al borde, y puedes moverlo a través de él.
abrir el teclado, cambiar el modo de control, seleccionar una sesión y apagar
Escritorio sin apagar.

- **El touchpad predeterminado en el teléfono.** El dedo mueve el cursor relativo a él.
  disposiciones. Toque con dos dedos - clic derecho, movimiento paralelo.
  pergamino, pellizco - escala 1-4×, doble tacto con dos dedos - entrar
  Una imagen, tocando con tres dedos - teclado.
- **El teclado está en la parte superior del escritorio.** La imagen no está comprimida. La pista de llaves.
  arriba del teclado y una hoja separada ofrecen Ctrl, Alt, Win, Shift, flechas,
  F1-F12 y combinaciones. Una prensa del modificador actúa en la siguiente clave,
  Doble lo arregla, la próxima lo libera.
- **Tamaño para el tamaño de la pantalla.** La autorización se solicita en función de la orientación y
  Área segura; escala Windows se puede seleccionar en la configuración. Si.
  RDP server does not support resizing, session continues to work
  con permiso previo.
- ** Ajustes de control local.** Velocidad, aceleración, tamaño del cursor
  Claridad, orientación y auto-descubrimiento del botón. Modo de control para el anfitrión
  Sólo se recuerda en este dispositivo.
- **Import SSH -hosts.** botón de importación en forma de un nuevo SSH -host en el
  El ordenador ofrece direcciones de los archivos estándar OpenSSH `known_hosts` .
  Los registros se pueden seleccionar antes de guardar. Nombres de usuario y contraseñas
  Es necesario especificar por separado; las claves de confianza no se cambian.
  Se saltan nombres, plantillas, claves revocadas y registros de autoridad de certificados.
- **Paleta de mando.** Nueva terminal local abre zsh a macOS
  Windows ofrece distribuciones PowerShell, cmd e instalado WSL.
- Superposición fija de los botones del sistema de la ventana y el panel lateral en macOS .
  Además de colocar filtros de host al girar el teléfono.
- El Qwen3.5 9B se llama "Heavy". Modelo de identificadores y
  La ubicación de los archivos descargados no cambia.

La tableta conserva el diseño habitual y la transición manual a la pantalla completa.
En Android , el primer "Volver" revela el control repetido dentro de dos
Cierra la sesión. Requiere confirmación. Bloqueo
El repositorio cierra sesiones y sus diálogos.

[Управление RDP](RDP.md) · [Локальные терминалы](LOCAL_TERMINALS.md) ·
[Локальный ИИ](LOCAL_AI.md)

Archive iOS está destinado a Simulator en Mac; no es un instalador para Mac.
iPhone físico. La redirección de carpetas en RDP móvil todavía no está disponible.
