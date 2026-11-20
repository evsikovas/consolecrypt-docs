# Local AI / Local AI - 1.0.0

Referencia traducida · [Original en ruso](../LOCAL_AI.md)

## Ruso

En Windows , macOS y Linux x64, abra Ajustes → Incorporación de la IA local.
Está disponible una selección de tres modelos Q4_K_M:

| Opción | Modelo | Descargar GGUF | Punto de referencia de RAM general |
| --- | --- | --- | --- |
| Tranquila. | Qwen2.5-Coder 1.5B Instrucciones | 1.117.320.768 bytes, aproximadamente 1.1 GB | 4 conciertos. |
| Medio. | Qwen3.5 4B | 2,740,937,888 bytes, cerca de 2.7GB | 8 conciertos |
| Pesado. | Qwen3.5 9B | 5,680,522,464 bytes, cerca de 5,7GB | 16 conciertos. |

La estrella recomienda la variante más grande correspondiente a la memoria total.
ordenador (4/8/16 GB). Si la memoria es desconocida o menos de 4 GB, no hay estrella.
La recomendación no cambia el modelo seleccionado o el cuadro predeterminado. Es un guía, no un guía.
Garantía de velocidad: Deje la memoria al sistema y otros programas. En Apple Silicon.
es utilizado por Metal, en Intel Mac, Windows x64 y Linux x64 - CPU. Android y iOS
no mostrar la partición de instalación integrada; configurar otros proveedores
Todavía está ahí.

### Instalación y conmutación

1. Seleccione un modelo y haga clic en “Install Local AI”. Los archivos GGUF grandes no son
   Instala la aplicación. macOS contiene un pequeño motor firmado.
   llama.cpp, Windows y Linux descargarlo por separado.
2. Espera el cheque de descarga y tamaño y SHA-256. El progreso puede verse en los ajustes;
   La descarga puede ser cancelada y continuada más tarde. La instalación no comienza por sí misma.
   Cuando inicie una solicitud o cambie una recomendación.
3. La casilla “Utilizar por defecto después de la instalación” está habilitada inicialmente y
   Está almacenado sólo en este dispositivo. Proveedores de nube y sus
   Queda la selección sincronizada. La eliminación de la bandera trae de vuelta la opción habitual.
4. Abre la sala de chat o la paleta AI. El modelo comienza en la primera solicitud; disponible
   Comience y detenga botones. Después de 15 minutos sin petición, el proceso se descarga.
   Y la generación activa lo mantiene en marcha.
5. Al elegir otro modelo, el proceso actual se detiene; ya descargado
   Los modelos se conservan. Instala una nueva si no tienes ya una. Eliminar.
   sólo el modelo seleccionado y sus descargas incompletas, guardando otros modelos,
   motor y preferencias.

Después de instalar el modelo local, cuando el defecto está habilitado, seleccione otro.
El modelo no descargado conyet conduce a una oferta para instalarlo: no envía la solicitud al proveedor de la nube.
Es invisible para el usuario. Elegir un modelo e instalarlo son acciones diferentes.

### Actualización de 0.4.1

El nombre de archivo, ID y SHA-256 Qwen2.5-Coder 1.5B se guardan. Los modelos se encuentran
un directorio permanente de datos de usuario fuera del paquete de aplicación reemplazable.
GGUF compatible verificado se reutiliza cuando se actualiza o se repara
El motor, sin recargar. Modelo seleccionado y configuración predeterminada
El nuevo modelo recomendado no los reemplaza.

A macOS 0,5 carreras sin una App Sandbox para una cáscara local convencional, pero
Utiliza los catálogos de contenedores rellenados anteriores en su lugar. No remueva el contenedor.
modelo, bóveda o llavero del sistema. Con dos catálogos diferentes llenos
o error de acceso, el lanzamiento se detiene con una explicación; los datos no se combinan
No son reemplazados por un perfil vacío. Más información: [локальные терминалы](LOCAL_TERMINALS.md) .

### Contexto y acceso

Las solicitudes van a `127.0.0.1` con un token aleatorio del lanzamiento actual, sin un sistema
HTTP - proxy El contexto y la filtración de secretos pasan por el núcleo existente
ConsoleCrypt. El camino hacia el modelo y el token del proceso no se sincronizan a través de la bóveda.
El bloqueo de almacenamiento, el cambio de perfil y la salida paran el modelo. Se necesita Internet
cuando se instala, y las respuestas se calculan en el ordenador.

Revisa los comandos propuestos. In [локальном терминале](LOCAL_TERMINALS.md)
Insertar está disponible sin Enter, y luego se ejecuta manualmente después de la verificación; para SSH
Se mantiene una confirmación separada de la aplicación. El chat se almacena en la memoria de la sesión.

[Руководство со снимками RU](https://consolecrypt.dev/guide?lang=ru#local-ai)
[English guide](https://consolecrypt.dev/guide?lang=en#local-ai).
Las fotos son verdaderos widgets con estados demo; no muestran
Carga o medición real de la velocidad del modelo.

### Fuentes y licencias

- [llama.cpp b11739](https://github.com/ggml-org/llama.cpp/releases/tag/b11739) , MIT.
- [Qwen2.5-Coder-1.5B-Instruct-GGUF](https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF) :
  Oficial GGUF Qwen, Apache-2.0, revisión `f86cb2c1fa58255f8052cc32aeede1b7482d4361` .
- [Qwen3.5-4B-GGUF](https://huggingface.co/unsloth/Qwen3.5-4B-GGUF) :
  Modelo Qwen, cuantificación GGUF y distribución de Unsloth, Apache-2.0,
  Auditoría `e87f176479d0855a907a41277aca2f8ee7a09523`
- [Qwen3.5-9B-GGUF](https://huggingface.co/unsloth/Qwen3.5-9B-GGUF) :
  Modelo Qwen, cuantificación GGUF y distribución de Unsloth, Apache-2.0,
  Auditoría `3885219b6810b007914f3a7950a8d1b469d598a5`

Exacto URL , dimensiones y SHA-256 están en
`client/flutter/lib/ai/local/local_ai_catalog.dart`. El texto está disponible en la configuración
"Fuentes y licencias de modelos", incluyendo licencias sin conexión a Internet.
Para Qwen3.5, el motor está configurado sin una respuesta de razonamiento separada. Paquete CUDA aún no
implementado.

### Modelo propio (GGUF)

"Añada su modelo (GGUF) ..." selecciona el archivo en el ordenador. ConsoleCrypt cheques
GGUF header (versiones 2 y 3), copia el archivo a su carpeta modelo, contando SHA-256 por
El camino, y elige el modelo; el original no cambia, se puede quitar. Repetidas
Agregar el mismo archivo utiliza una copia ya hecha. El modelo se llama por nombre.
archivo y marcado "Own"; punto de referencia RAM - una estimación por tamaño de archivo (no menos de 4 GB).
Compruebe el origen y la licencia de su modelo usted mismo. Antes de cada primer lanzamiento
En una sesión, se comprueba una copia contra SHA-256. "Eliminar" elimina la copia y elimina el modelo de la computadora.
La lista seleccionada se convierte en Qwen2.5-Coder 1.5B. Tu modelo de aplicación nunca será
Descargar: Si la copia falta, elimine el modelo y agregue el archivo de nuevo. Adecuado.
modelos que leen el llama.cpp b11739, con una plantilla de chat dentro del GGUF.
