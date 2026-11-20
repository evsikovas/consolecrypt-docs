# Compatibilidad del servidor con ConsoleCrypt 1.0.0

Referencia traducida · [Original en ruso](../COMPATIBILITY_1_0.md)

## ¿Qué ha cambiado?

Cliente 1.0.0 añade gestor KDBX y sincronización de parámetros WebDAV .
El servidor no recibe una contraseña maestra, registros KDBX o material clave biométrico.
El KDBX en sí es localmente ubicado o en un seleccionado WebDAV ; no se carga en
ConsoleCrypt Sincronizar como un archivo separado.

En el objeto cliente cifrado `VaultSettings` añadido `password_vaults` :
id, nombre, HTTPS URL , inicio de sesión y referencia a una credencial cifrada separada.
El servidor almacena el objeto como un objeto existente `EncryptedBody` sin analizar los nuevos campos.
Carriles de archivos locales, sobres de apertura rápida y Docker / Kubernetes perfiles
Las filtraciones permanecen en el dispositivo.

## ¿Es necesario mejorar el servidor?

No se necesitan nuevos endpoints, tablas, migraciones, permisos para estos cambios.
Claves de cifrado o cambios en el protocolo de cable. La versión del servidor sigue siendo independiente.
desde la versión cliente; la base de verificación actual es servidor 0.2.4 / protocolo 1.13.
Siguen existiendo restricciones sobre el tamaño de los objetos cifrados y los derechos de acceso.

Los cheques del cliente realizan la serialización de nuevas configuraciones y el intercambio cifrado
entre clientes. Controles de sincronización de servidores, conflictos, derechos, conjuntos
Acceso y copia de seguridad/restore en un flujo de trabajo separado GitHub
[Client compatibility](https://github.com/evsikovas/consolecrypt-server/actions/workflows/client-compatibility.yml)
Temporal PostgreSQL. El flujo de trabajo no publica imágenes ni cambia la producción.

Actualizar todos los dispositivos al cliente 1.0.0 antes de guardar WebDAV conexiones.
Los clientes mayores no conocen el nuevo campo, y cuando sobreescritura `VaultSettings` pueden
Reiniciar la lista de conexiones. El servidor no puede complementar la configuración descifrada
o para restaurar sus campos: esto violaría el modelo E2EE .
