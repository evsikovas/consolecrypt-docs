# ConsoleCrypt 1.0.1

Referencia traducida · [Original en ruso](../RELEASE_1_0_1.md)

## Ruso

En esta versión, fortalecemos la protección de la aplicación y hacemos que las notas a las contraseñas sean más convenientes.

- **Passwords:** Notas en la tarjeta abierta se muestran en texto plano.
  Las contraseñas permanecen ocultas, la base de datos KDBX conserva el cifrado.
- ** SFTP :** La descarga se escribe por primera vez en un archivo separado, luego atómico
  Está siendo trasladado a su lugar. Controles de ruta protegen contra la salida de la carpeta seleccionada
  via simlinks y directorio swapping; descarga interrumpida no estropea el archivo antiguo.
- ** SSH :** Integración actualizada de russh y Pageant; firmas RSA adicionalmente
  Usan cegueras con aleatoria del sistema. Para las nuevas llaves, recomendamos
  Ed25519 ; la restricción RSA corriente sigue descrita en SEGURIDAD.md.
- ** Linux y dependencias:** Se ha movido el parche inseguro del iterador de GLib,
  Se han actualizado las dependencias nativas y se han sustituido varios componentes no respaldados.
- **Verificación:** Verificación ampliada del gráfico Cargo, incluyendo plugins Flutter,
  Agregado regresiones para la compatibilidad de los archivos, RSA, GLib y D-Bus.

Servidor 0.2.5 fija la retención de límite de Argon2 cuando cancela una solicitud
Limita la respuesta de transmisión del OIDC. Pruebas de servidor con PostgreSQL se verifican
Solución de almacenamiento y rechazo de los datos de recuperación de otras personas.

El trabajo en seguridad continúa: fijaciones y cheques automáticos
Reduzca los riesgos, pero no sustituya la protección de los dispositivos desbloqueados.

Paquetes: Windows , macOS , Linux DEB/RPM, Android y iOS Simulador para Mac.
Simulador no está instalado en el iPhone.
