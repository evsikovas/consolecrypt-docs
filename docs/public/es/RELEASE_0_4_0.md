# ConsoleCrypt 0.4.0

Referencia traducida · [Original en ruso](../RELEASE_0_4_0.md)

## Ruso

- Android : modo Touchpad para RDP. El dedo mueve el cursor relativo a su corriente
  posición; el tacto pulsa el botón izquierdo, dos dedos pergamino, tocar dos
  presiona el botón derecho con los dedos. La retención está disponible para arrastrar y separar
  Teclado en pantalla. El panel compacto guarda el área de trabajo del teléfono.
- Windows / macOS : Instalar la IA local desde la configuración. Qwen2.5-Coder 1.5B Q4_K_M
  descargado con verificación SHA-256; llama.cpp está incluido en el paquete macOS y por separado
  Se establece en Windows . Modelo predeterminado
  Seleccionado sólo en este dispositivo, comienza bajo petición y descargas
  Después de 15 minutos de inactividad. El silicona de Apple utiliza Metal, y el Windows utiliza CPU.
  Las consultas locales pasan por los filtros de contexto existentes y la confirmación del comando.
- Cerradura automática fija en caso de inactividad y cancelación de la generación de IA.
- Los lanzamientos de clientes se recogen sólo por etiquetas de `main` . Linux usos caseros
  k3s ARC runner Android es un corredor Mac con la clave de firma anterior.

La AI local está disponible en macOS ARM64/x64 y Windows x64. Cargando el modelo - aproximadamente
1.1GB más motor; una conexión a Internet es necesaria para la instalación, no para las respuestas.
El modelo es pequeño y puede equivocarse: los comandos se ejecutan sólo después de la confirmación.
iOS El paquete sigue siendo un pre-assembly para el Simulador.

**Actualización de la antigua instalación:** antigua dirección `updates.consolecrypt.evsikov.net`
No está disponible ahora. Si la verificación incorporada la utiliza, descargue el instalador.
con [страницы загрузок](https://consolecrypt.dev/download?lang=ru) , cerca
ConsoleCrypt y actualizar la instalación existente; reemplazar la aplicación por macOS
Aplicaciones. Guarda el kit de respaldo y recuperación. Warehouse,
No es necesario eliminar los datos de aplicación y la llave de sistema. Nuevas construcciones
Recibir actualizaciones de `updates.consolecrypt.dev` .
