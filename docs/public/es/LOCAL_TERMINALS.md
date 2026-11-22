# Terminales locales ( terminales locales) 0,5

Referencia traducida · [Original en ruso](../LOCAL_TERMINALS.md)

## Ruso

En la serie 0,5, la cáscara local se abre junto a las sesiones SSH en la sección
"Terminal." Es un proceso en su computadora con los derechos de su usuario.
El servidor de sincronización y la conexión SSH no son necesarios.

1. Abra el "Terminal" y haga clic en el nuevo botón de la pestaña `Cmd+T` en macOS /
   `Ctrl+T` at Windows . El botón general "+" de la aplicación todavía selecciona
   Guardado SSH /RDP conexiones.
2. En el grupo Local Shells, seleccione **zsh** en macOS o
   ** Windows PowerShell**, ** Command Prompt** o instalado **PowerShell 7**
   on Windows . A continuación se encuentran los hosts guardados SSH.
3. En Windows , cada distribución instalada **WSL** se muestra por separado.
   Puede abrir Ubuntu, Debian y varias pestañas del mismo shell al mismo tiempo.
   ConsoleCrypt no instala WSL y se distribuye automáticamente.
4. Compruebe el nombre de la ficha: la cáscara local se firma “Este ordenador”.
   WSL conserva el nombre de distribución. Entrar, cambiar el tamaño, teclas de control
   Los programas interactivos se ejecutan a través de PTY (ConPTY en Windows ).
5. Cerrar la ficha completa el proceso. "Reconectar la concha" se abre.
   No es una continuación del viejo programa. Bloqueo de la bóveda
   (incluido automático) no cierra terminales: después de desbloquear
   locales y SSH tabs siguen funcionando, así como túneles preservados SSH.
   RDP sessions and sessions Kubernetes Change of profile and exit are closed.

El cierre completa su propia cáscara y su actual grupo de primer plano.
Procesos de antecedentes separados (por ejemplo, se ejecutan por separado `nohup`)
No quería; toda la distribución WSL no se detiene.

Para una pestaña local, no hay acción SFTP : SFTP se ejecuta a través de SSH -host.
Los proyectiles locales no crean registros ficticios y no se sincronizan como
SSH - conexiones. En 0,5 están disponibles en macOS y Windows ; Linux , Android y iOS
Siguen utilizando conexiones remotas existentes.

[Pegar varias líneas en PowerShell](../../../guide/es.md#local-terminals-powershell-paste)

### AI y francotiradores

La paleta y el chat reciben el tipo de shell seleccionado: zsh, PowerShell, cmd o
Concha POSIX para WSL. El terminal local no recibe la dirección imaginaria SSH del host.
El texto de salida se transmite a la AI sólo cuando se selecciona explícitamente el contexto; compruébalo.
antes de enviarlo al proveedor seleccionado.

Para la ficha local disponible ** "Insert" sin Enter**. Botón automático
Los comandos y snippets AI están deshabilitados; el lanzamiento masivo está destinado a SSH .
Compruebe el texto insertado y si desea ejecutarlo, haga clic en Introdúzcase.
La entrada terminal normal no está limitada por esta regla.

### Actualización macOS

[Instalar las dos aplicaciones desde el DMG](../../../guide/es.md#first-start-macos-install)

Para una sesión normal de zsh local fuera del contenedor, paquete 0,5 obras sin App Sandbox.
La construcción actual se firma ad-hoc y no se notariza. Tiempo de ejecución endurecido
Se incluye sólo cuando se construye con ID de desarrollador; esto no es una propiedad del paquete ad-hoc actual. Al actualizar, la aplicación busca la anterior
Perfil y datos locales de IA en contenedor 0.4.1 y los utiliza en el sitio.
No retire el contenedor, la bóveda, los archivos de modelo o la llave de sistema.
Si ambos directorios contienen datos o el directorio anterior no está disponible, la aplicación
muestra un error antes de crear un perfil: no combina diferentes almacenamientos y no
Reemplaza el perfil antiguo con un perfil vacío. Guardar una copia de seguridad antes de actualizar.

### Dirección y verificación ejecutivas

[Глава со снимками RU](https://consolecrypt.dev/guide?lang=ru#local-terminals)
[English guide](https://consolecrypt.dev/guide?lang=en#local-terminals).
Snapshots 0.5 son verdaderos widgets Flutter con cáscaras sintéticas y texto.
La pantalla WSL muestra la variante de interfaz Windows en la prueba de widget, en lugar de ejecutarla.
Windows o WSL. Los cheques del paquete instalado se indican por separado en
[заметках выпуска](RELEASE_0_5_2.md).
