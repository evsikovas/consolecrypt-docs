# ConsoleCrypt 1.0.4

Referencia traducida · [Original en ruso](../RELEASE_1_0_4.md)

## Ruso

El administrador de contraseñas puede ahora renombrar y eliminar grupos KDBX .

- En el ordenador, abra el menú **ppp** en la carpeta o haga clic en él con el botón derecho del ratón.
- En el teléfono, seleccione una carpeta a través del botón del grupo, luego abra **е** al lado.
- **Renombre ** cambia el nombre de la carpeta seleccionada, guardando sus registros y grupos anidados.
- **Eliminar** requiere confirmación y transferencia de la carpeta con todos los contenidos a la papelera de reciclaje KDBX .
  El grupo raíz y las carpetas de la cesta están protegidas de estas acciones.
- Si la cesta del sistema se encuentra dentro de una carpeta regular, eliminar a su padre está prohibido.
  El renombramiento sigue disponible. Esto evita la pérdida de contenido anidado.
- Ambas operaciones se guardan automáticamente en un archivo local o a través de WebDAV .
  Si el archivo ha cambiado desde el exterior, se mantiene la protección anterior contra la sobreescritura.

La corrección se incluye en Windows , macOS , Linux DEB/RPM, Android y iOS Simulador.
iOS El Simulador está diseñado para funcionar en un Mac, no un iPhone físico.
El protocolo de sincronización y el esquema del servidor no cambian; no necesita actualizar el servidor de sincronización para esta solución.

En el CI eliminó la prueba de preparación para la carrera Linux -cluster. Este cheque pasa.
antes de lanzar construcciones nativas de todas las plataformas; el error ahora indica un
etapa sin publicación de secretos y datos brutos del cluster.
