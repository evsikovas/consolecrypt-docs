# ConsoleCrypt 0.3.0 · SSH y escritorios remotos

Referencia traducida · [Original en ruso](../RELEASE_0_3_0.md)

**Agregó la capacidad de conectarse a RDP.**

Windows - Los ordenadores ahora pueden ser guardados junto a SSH servidores en una lista
hosts. Seleccione el tipo de conexión al crear el host - el formulario mostrará el apropiado
campos. Las conexiones guardadas se sincronizan a través de su almacenamiento cifrado.

- ** Mesas de trabajo en tabs.** Hasta cuatro sesiones paralelas de RDP, panel
  Ficha de estilo terminal y cierre independiente de conexiones.
- ** Pantalla completa.** El escritorio absorbe toda la pantalla del ordenador.
  El panel deslizante en la parte superior le permite cambiar la conexión, para girar la ventana.
  Volver al tamaño normal y cerrar la sesión.
- ** Intercambio de texto.** Ctrl+V (омV a macOS ) transmite el texto local e inmediatamente
  Introdúzcalo en una sesión RDP activa. La autorización se incluye por separado para cada
  Enviar y recibir botones también están disponibles.
- ** Compartir archivos.** Seleccione una carpeta en macOS , Windows o Linux . Ella aparecerá.
  como un disco redireccionado en Windows . Por defecto, sólo está disponible para la lectura.
  La grabación se incluye por separado.
- ** Verificación del servidor.** Confirmación del certificado antes de la autenticación; guardada
  La contraseña permanece en el núcleo nativo y no se transmite a la interfaz.
- **Inserto en SSH - terminal en Windows .** Además de Ctrl+V, se dispone de una combinación
  Shift+Insert con el mismo cheque de texto multilínea antes de la inserción.
- ** Guía actualizada.** Conexión RDP paso a paso, pestañas y permisos
  descrito en ruso e inglés. La sección SFTP se llama “Default Editor”.

Adición a Windows - el servidor no necesita ser instalado: se utiliza un estándar
Microsoft RDP. El tráfico RDP va directamente sin un servidor de sincronización.

[Скачать](https://consolecrypt.evsikov.net/download?lang=ru)
[Руководство RDP](https://consolecrypt.evsikov.net/guide?lang=ru#rdp)
[Исходный код](https://git.evsikov.net/publics/consolecrypt)

## Disponibilidad

El intercambio a través del amortiguador admite texto hasta 64 KiB. Transferencia de archivos mediante amortiguación
no activado; utilice la carpeta seleccionada para los archivos. Carpetas de redireccionamiento
Mientras esté disponible en ordenadores, con un límite de 256 MiB por archivo. Política de servidor
Windows puede prohibir estas posibilidades. Transfering RDP hosts to colleagues for now
iOS sigue siendo un pre-assembly para el Simulador.

## Una limitación conocida

Cuando cambie la carpeta conectada en una sesión RDP activa, puede apagar la sesión.
Si esto sucede, conectar de nuevo y seleccionar la carpeta deseada. Corrección
Se está preparando para la próxima versión.
