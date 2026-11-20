# Actualizaciones ConsoleCrypt

Referencia traducida · [Original en ruso](../UPDATES.md)

De la versión 0.1.12 sobre Windows , macOS y Android (sobre Linux - a partir de 0.9.14, ver a continuación) en los ajustes hay una sección **Actualizaciones**:

- **Comproba las actualizaciones en la puesta en marcha** - guardadas en este dispositivo
  Interruptor. Cuando se apaga, no hay solicitudes en el lanzamiento.
- ** Comprobar las actualizaciones** - funciona independientemente del interruptor.
- **Descargar e instalar ** - aparece para la nueva versión. Muestra el movimiento.
  Descargue y ejecute el instalador después de comprobar el archivo.

Las pruebas de inicio no establecen nada por sí mismas y no interrumpen SSH sesiones.
Hay confirmación antes de la instalación. Los perfiles, el almacenamiento y la configuración se guardan.

**Switch from the old update address:** as of October 19, 2026
`updates.consolecrypt.evsikov.net` no disponible. asambleas utilizando esta dirección,
Usted no será capaz de obtener una nueva liberación a través de la verificación integrada. Descargar el instalador
con [страницы загрузок](https://consolecrypt.dev/download?lang=ru) , cerca
ConsoleCrypt y actualizar la instalación existente. Sobre macOS reemplazar la aplicación
Aplicaciones. No borre la aplicación con sus datos, almacenamiento o sistema
Paquete de llaves: Actualización manual las guarda. Se están utilizando nuevas asambleas
`updates.consolecrypt.dev`. Primero, guarda el kit de respaldo y recuperación.

En Windows , se inicia el instalador para el usuario actual; la aplicación
Cierra la conexión y la base de datos antes de salir. Android es necesario
Permite instalar actualizaciones desde ConsoleCrypt y confirmar la ventana del sistema.
En macOS después de la descarga, seleccione una nueva carpeta o nombre DMG en el diálogo del sistema.
**Guarda y abre. El archivo guardado es revisado por SHA-256 y se abre:
Complete la aplicación, arrastre una nueva copia a Aplicaciones y confirme el reemplazo.
La cancelación del diálogo no inicia la instalación; un intento repetido utiliza el verificado
descarga. Los archivos existentes no están sobrescritos.

**Switch de ConsoleCrypt 0.2.1 y versiones anteriores a macOS :** si aparece después de la actualización
"No puede abrir el programa", descargar el DMG actual con
[сайта через браузер](https://consolecrypt.dev/download?lang=ru)
y reemplazar la aplicación una vez en Aplicaciones. El viejo cargador de arranque etiquetado DMG como
creado sin el consentimiento del usuario; esta etiqueta fue transferida a la aplicación.
Esto también es posible para una copia de la nueva versión descargada por el viejo descargador.
Re-downloading the botón in the old application repeats the problem even with
nuevo instalador: la fijación del cargador de arranque comienza a funcionar sólo después
La primera edición de la copia corregida. En versiones desde 0.2.2 se utiliza
Autorización del sistema para guardar el instalador. Protección
macOS y la caja de arena permanecen en, el almacenamiento y el paquete clave no se debe eliminar.

La lista de lanzamientos está firmada Ed25519 ; el cliente contiene sólo la clave de verificación pública.
Los archivos se verifican en SHA-256 después de la descarga y otra vez antes del lanzamiento.
Incorrect signature, corrupted file, expired list and attempted rollback
Están bloqueando la instalación. No se envían almacenamiento, contraseñas y fichas de cuenta
Actualizar servidor. No tiene acceso al servidor de sincronización ni a su base de datos.

La clave de publicación y firma se gestiona fuera del repositorio público. Actualización
se pone a disposición después de la publicación del paquete de plataforma soportada,
Cheques y metadatos firmados.
El espejo de actualización muestra cada 15 minutos. Antes de los dos
listas firmadas de la nueva versión conserva la versión verificada anterior.

## Linux y iOS

0.9.14 copia instalada de DEB o RPM (paquete `consolecrypt`
`/opt/consolecrypt` ), actualizado de la misma manera que otros ordenadores: cheque
En el lanzamiento, “Check Updates” y “Download and Install.” Linux tiene su propia cinta.
`https://updates.consolecrypt.dev/linux-stable.json` , firmado por un
clave Ed25519 ; clave Windows , macOS y Android no lo firma, y viceversa.
El paquete es verificado por la firma y SHA-256, entonces el sistema pide una contraseña.
el administrador `pkexec` , polkit , y el administrador del paquete lo coloca: `apt-get` (o
`dpkg` for DEB, `dnf` , `zypper` or `rpm` for RPM. Perfiles, repositorios y sistema
El teclado se guarda; la nueva versión se abre con el botón "Reset". Si.
cerrar la ventana de contraseña, la instalación se cancela, y el paquete verificado permanece para
Inténtalo de nuevo. Sin `pkexec` o con un error de administrador de paquetes, instalar el paquete
manualmente con [страницы загрузок](https://consolecrypt.dev/download?lang=ru) como
descrito en [инструкции Linux](BUILD_LINUX.md) .

Versión 0.9.14 en Linux instalar manualmente una vez: versiones anteriores de la cinta
Linux no leas. Una copia no lanzada del paquete (sembly de la fuente),
La carpeta copiada todavía muestra sólo la página de descarga.

En iOS , el cargador de arranque de escritorio está deshabilitado. El nuevo Simulator ZIP está instalado
[инструкции](BUILD_IOS.md) ; un iPhone real requiere una firma separada.
