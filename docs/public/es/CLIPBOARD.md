# Buffer Exchange / Clipboard

Referencia traducida · [Original en ruso](../CLIPBOARD.md)

## Ruso

ConsoleCrypt copia datos de tres maneras.

- **Secrets** - contraseñas, claves, valores revelados Kubernetes Secreto, variables
  ambiente Docker , células de base de datos sensibles, palabras establecidas
  Texto de recuperación del búfer de sesión RDP. No caen en la historia del búfer y
  Otros dispositivos son etiquetados como secretos por los gestores de amortiguadores y eliminados de
  Buffers después de un tiempo determinado.
- ** Texto personal** - asignación en el terminal y los registros, los resultados de las solicitudes. No.
  entra en la historia del búfer y otros dispositivos, pero no se elimina:
  El trabajo en el terminal no debe interferir. Si la secreción parece un secreto
  `password=…` , token, clave privada), se copia como un secreto.
- ** Texto ordinario** - caminos, identificadores, claves públicas, comandos.

El período de eliminación se establece en “Configuración → Seguridad → Limpiar el portapapeles”:
30 segundos a 1 día, por defecto 30 segundos. La política del equipo sólo puede ser
acortar la sentencia. El término está experimentando un reinicio de la aplicación. Despejados de amortiguación, sólo
Si sigue siendo nuestro secreto, lo que copiaste más tarde en otra aplicación,
No se lava. Si no está disponible un búfer seguro en el dispositivo, la aplicación
Dice, “No fue posible copiarlo con seguridad”, y no copia nada.

| Plataforma | Lo que está garantizado |
|---|---|
| Windows 10/11 | El secreto no entra en el registro de amortiguación (Win+V) y el amortiguador de la nube; los monitores de amortiguación cumplen con el acuerdo Windows saltarlo. Removido a tiempo y al cerrar la ventana de aplicación. |
| macOS | El secreto no va al iPhone/iPad a través de un portapapeles universal, marcado como oculto y temporal para los gestores de amortiguadores. Retirada a tiempo y al salir de la aplicación. |
| Linux (GTK, X11 y Wayland) | El secreto está sólo en el portapapeles, no en la asignación para insertar el botón medio. Los gestores de amortiguadores son etiquetados como “secretos” (KDE Klipper lo tiene en cuenta). Al salir de la aplicación, el secreto desaparece, no se transmite al gestor de amortiguación. |
| iOS | Sólo en este dispositivo (sin Handoff), el sistema elimina el secreto a tiempo, incluso cuando la aplicación se descarga. |
| Android | El secreto está marcado como sensible: no es visible en la notificación de copia del sistema y los avisos de teclado. Removido por el sistema de relojes de alarma, incluso si la aplicación está doblada o descargada; en modo de ahorro de energía - con un retraso de hasta ~ 10 minutos. |

** Android en el fondo.** Android evita que la aplicación plegada lea el búfer
Así que no podemos verificar que siga siendo nuestro secreto. Configuración
Limpiar el búfer en el fondo, incluso si no puedes verificar que hay nuestro secreto.
(Incluido por defecto) despeja el búfer sin comprobar - puede desaparecer
texto que copiaste en otra aplicación durante el período de espera. Si.
Apágalo, el secreto permanece en el búfer hasta que regrese a ConsoleCrypt .
Entonces nuestro secreto es borrado, pero el texto de alguien más no lo es. Después de reiniciar el teléfono
La limpieza se completa la próxima vez que se abra la aplicación.

Restricciones: Una aplicación que ya había leído el búfer antes de borrar podría
guardar el secreto; los gestores de amortiguadores que no apoyan las notas pueden
Escríbalo.
