# Clave de seguridad (YubiKey, FIDO2)

Referencia traducida · [Original en ruso](../SECURITY_KEY.md)

## Ruso

El almacenamiento se puede abrir con una llave física de seguridad USB – YubiKey o
otra tecla FIDO2 con la extensión `hmac-secret` y su código PIN. Función
opcional e incluido por separado para cada unidad de almacenamiento
El dispositivo. La frase de contraseña y la clave de recuperación siguen funcionando: si la clave
perdido o su PIN bloqueado, abrir el almacenamiento con una frase de contraseña.

**Donde funciona (versión preliminar):** Windows 10/11 (a través de la versión del sistema)
WebAuthn, PIN pide una ventana Windows y macOS
PIN. Linux y las plataformas móviles todavía no están soportadas.

### Cómo encenderlo

1. Desbloquear la bóveda con una frase de contraseña.
2. **Configuraciones → Almacenamiento → Clave de Seguridad Física** – Activar.
3. Insertar la clave, introducir su código PIN FIDO2 y pulsar la tecla dos veces: primero
   El toque registra la llave, la segunda recibe el secreto para el sobre.

La clave debe tener un FIDO2 PIN. Si no lo es, Windows ofrecerá crear un PIN en
Primera inscripción; en macOS , pídaselo a Yubico Authenticator. Después de las ocho.
FIDO está bloqueado en la llave - sólo puede quitar la cerradura
Reset FIDO, mientras borra todos los registros en la clave.

### Cómo desbloquear

En la pantalla de bloqueo, pulse **Desbloquear con la llave de seguridad**, introduzca el PIN.
(a Windows ) en la ventana del sistema y pulsa la tecla.

### Cómo funciona.

* Cuando se activa, la clave crea una cuenta para `consolecrypt.dev` .
  Vive sólo como un identificador en ConsoleCrypt . Accidentalmente
  La llave de sal responde con 32 bytes de HMAC, el mismo valor que el WebAuthn PRF.
  Esta respuesta sella la clave de almacenamiento en un sobre local.
* El sobre y la sal sólo están en el archivo de clave de perfil en este dispositivo: no están
  Están sincronizados, no entren en copias de seguridad y en el servidor.
* Ni la sal ni el identificador sin la llave misma y su PIN abrirán el almacenamiento.
  Otra clave, incluso el mismo fabricante, responderá de manera diferente.
* Apagando elimina el sobre; la cuenta en los restos clave (se puede eliminar).
  c “Configuración → Cuentas → Clave de Seguridad” en Windows o en Yubico
  Authenticator.
