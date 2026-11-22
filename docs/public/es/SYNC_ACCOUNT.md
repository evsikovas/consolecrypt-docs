# Cuenta y sincronización

Referencia traducida · [Original en ruso](../SYNC_ACCOUNT.md)

## Ruso

El perfil de sincronización vincula este dispositivo a la cuenta del servidor.
sincronización ConsoleCrypt . El servidor almacena sólo datos cifrados: abierto
el almacenamiento se puede almacenar con una contraseña, una clave de recuperación o aprobación con el ya
un dispositivo de confianza. Una contraseña o un login en una cuenta sólo prueba al servidor que
Tú.

### Conexión al servidor

1. **Agregar perfil → Conectarse al servidor** (o **Configuración →)
   Sincronización > Enable sincronización** para perfil local.
2. Introduzca la dirección del servidor y haga clic en **Confirm **. El apéndice dice `/v1/meta`
   Muestra el formulario de inicio de sesión que el servidor está esperando.
3. La nueva cuenta pasa por la creación habitual de un repositorio: una contraseña de almacenamiento y
   Kit de recuperación. El segundo dispositivo está conectado por una contraseña de almacenamiento, una clave.
   Restauración o aprobación.

La aplicación recuerda en este dispositivo cómo has iniciado sesión en cada servidor:
método de inicio de sesión y login (nunca contraseña o fichas). En la próxima conexión.
Este método se selecciona por adelantado, el login se sustituye, y la dirección reciente es visible
servidores con una etiqueta de método - "Email", "SSO: ...", "AD". La pista se puede quitar
El botón **Forget*.

### Sincronizar conexiones de Vault y OpenBao

Las conexiones se guardan en la bóveda personal cifrada. Para cada conexión puedes activar la sincronización de su contraseña o token. Tras sincronizar un segundo dispositivo, selecciona la conexión e inicia sesión. El cliente consulta los valores de los campos directamente en Vault u OpenBao. Configura el acceso biométrico en cada dispositivo. [Instrucciones](../../../guide/es.md#password-manager-vault-openbao)

### Nuevo dispositivo de aprobación y clave de almacenamiento (0.9.2)

Cada dispositivo recuerda la huella dactilar de la llave de su almacenamiento y comprueba con ella cualquier
recibido clave - cuando se desbloquea con una contraseña, clave de recuperación, huella dactilar
o Windows Hola, cuando fue aprobado y sincronizado. Si el servidor
entregada otra clave, la aplicación muestra la pantalla "Otras teclas de almacenamiento":
los datos en el dispositivo no cambian, se detiene la sincronización, se acepta "nuevo"
No hay llave. No introduzca secretos en este dispositivo, copie el diagnóstico y
Notificar al administrador del servidor.

Con el servidor 0.2.2 y el nuevo, la aprobación es la siguiente: en un dispositivo de confianza.
Abrir la consulta en **Dispositivos** - el nuevo dispositivo muestra inmediatamente el nombre
Aprobando y el código del par. El código se calcula a partir de las teclas de ambos dispositivos y debe
coincida en ambas pantallas; marque el partido en ambas. Firma de la aprobación
Cubre la llave de almacenamiento, y el nuevo dispositivo la comprueba con la llave que usas.
confirmado. Con el antiguo servidor, la aprobación funciona como antes, y la clave
La tienda está marcada “no confirmada” – una vez ingrese la contraseña de la tienda
(**Dispositivos** o **Configuración → Almacenamiento → Confirmación de contraseña**). Si.
El otro dispositivo en la cuenta dijo una clave diferente, y **Los dispositivos** aparecerán.
Una advertencia con una sugerencia de retirarla.

### Solicitud de eliminación (0.9.14, protocolo 1.13)

Servidor 0.2.4 permite que un dispositivo de confianza del propietario aún no
La bóveda está desbloqueada, solicita la eliminación de la bóveda. No es un almacén.
Retirado inmediatamente: 7 días espera en el estado de "despertación planeada" y
Todavía está en sincronización. El Dispositivo Confiado aparece en
"Sincronización" Advertencia "El almacenamiento se eliminará ..." con un botón
"Guardar almacenamiento" - cancela la eliminación. Si no hiciste la solicitud,
Cancele la eliminación y cambie la contraseña de su cuenta. Eliminación de un dispositivo de confianza
Todavía sucede de inmediato.

### Almacenamiento remoto y verificación de datos (0.9.14)

Si el almacenamiento se elimina en el servidor, la sincronización se detiene con lo comprensible
La razón ("storage not found on the server") y no repite los intentos indefinidamente.
Un objeto de un servidor que no ha pasado la autenticación no reemplaza a este último.
Buena copia local: La aplicación muestra una advertencia. Incluso si el servidor
una vez le dijo al dispositivo que revisara el código del par, aprobación sin esa verificación
Ya no es aceptado.

### Entrada corporativa (Enterprise)

servidor de sincronización 0.2.0 y posterior (Protocol 1.8) puede trabajar en
Modo de empresa: iniciar sesión en la cuenta solo se realiza a través de la empresa
El servidor de autorización de la organización. Registro, contraseña de cuenta y restablecimiento de contraseñas
No hay correo en este modo.

- **IdP sobre OIDC** (por ejemplo. ID de entrada, AD FS, Keycloak, Google Workspace:
  El botón ** Iniciar sesión {name} ** abre la página de inicio de sesión de la organización.
  navegador del sistema. El campo de correo electrónico es opcional - sólo se sustituye
  en la página de entrada. Al iniciar sesión, la aplicación está esperando el navegador; **Cancel**
  interrumpe la entrada. En el ordenador, el navegador vuelve a la aplicación a través de
  `http://127.0.0.1:…/auth/callback` , en Android y iOS
  `consolecrypt://auth/callback`. La aplicación utiliza PKCE y cheques
  `state` ; un código de entrada de una sola vez vive 60 segundos.
- **Active Directory / LDAP:** campos ** Login (email o DOMAIN\user)** y
  **Password** bajo la capción "Tu cuenta de organización". Contraseña.
  Transmitido al servidor sobre TLS una vez, no guardado y borrado del campo
  después de cada intento.

Dondequiera que se muestre una cuenta o conexión a un servidor, la aplicación dice que
El servidor de autorización corporativa se utiliza:

- En la pantalla de inicio de sesión - "Introducir a través del servidor de autorización corporativa {name} ".
  La contraseña de la organización no abre el repositorio - necesita una contraseña para esto
  repositorios”;
- **Configuración → Cuenta y sincronización** – línea **Autorización:
  Enterprise server - {name} (OIDC Silencioso Active Directory)**
  así como cuando entró el dispositivo. En el servidor estándar allí.
  por escrito “Email and account password”;
- En **Sincronización** y **Dispositivos**.

Si el servidor cambió el modo (por ejemplo, cambió desde el inicio de sesión a la contraseña)
Enterprise, la pantalla de inicio de sesión advierte sobre esto: la contraseña anterior de la cuenta
Ya no se usa.

El login de la empresa no proporciona acceso a los datos. Después de que el dispositivo entre,
nuevo dispositivo convencional: hay protección contra la entrada desde el nuevo dispositivo,
Carta de nuevo dispositivo y aprobación. No IdP, no Active Directory, no server
No tienen nada que abrir la bóveda.

**El acceso es deshabilitado por el administrador.** Si la organización desactiva la contabilidad
un registro (en el comando IdP, AD o administrador del servidor), el servidor revoca todos
sesiones. La aplicación bloquea el perfil y muestra “El acceso está deshabilitado”
“administrador”. Los datos locales siguen encriptados. Podemos intentarlo.
* Inicie sesión de nuevo** (si se devuelve el acceso), cambie a otro perfil o
** Eliminar el perfil de este dispositivo** - no hay nada en el servidor.
Está cambiando.

Otros Enterprise Login Mensajes: Correo electrónico Dominio No permitido, No necesita
El segundo factor es necesario, la cuenta de la organización ya está asociada con
otra cuenta, el servicio de inicio de sesión de la organización no está disponible, demasiados intentos
(El apéndice muestra cuando puedes repetirlo.)

Los servidores y servidores más antiguos funcionan como de costumbre.
Configurar el modo de empresa en el servidor se describe en la documentación del servidor.
