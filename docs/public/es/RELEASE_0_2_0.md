# ConsoleCrypt 0.2.0 · Terminal, búsqueda y colaboración

Referencia traducida · [Original en ruso](../RELEASE_0_2_0.md)

Fecha: 1 de octubre de 2026. Código fuente: etiqueta `v0.2.0`
commit `dff126c8298b6b9e51f6169df8d407de07c39738` .

## ¿Qué ha cambiado?

- **Terminal:** La rueda del ratón y el trackpad trabajan con texto destacado.
  Si arrastra el puntero por encima o por debajo del terminal,
  El búfer se desplaza y la asignación continúa.
- ** Entrada:** Después de trabajar con francotiradores, IA y panel derecho es suficiente
  Un clic en el terminal. Carreras de enfoque fijas en el cierre
  Panel pop-up y dejar el campo de entrada del panel fijo.
- ** Conexión rápida:** `Ctrl+K` / `Cmd+K` buscando anfitriones salvados
  por nombre, dirección IP y nombre de usuario. Los resultados muestran la dirección.
  usuario y puerto, incluyendo configuración de grupo. `Enter`
  el anfitrión seleccionado a través de la tecla habitual y verificación de credenciales.
  La búsqueda de anfitriones y snippets se realiza localmente; la consulta para AI requiere
  Una opción clara de acción de IA.
- **Espacio de trabajo:** Ampliación de la ventana inicial Windows / macOS
  hasta 1440×900 con área de pantalla limitada disponible.
  Cuando la tira de la pestaña se desborda, se observa un contador común `(N)`.
  En una ventana estrecha, las herramientas se mueven a la siguiente línea.
- **Compartir: **Los servidores públicos soportan compartir.
  Grupos, secretos y la adición confirmada de sus propios dispositivos.
  En el cliente, el botón de actualización vuelve a comprobar la disponibilidad de funciones.
  Incluso si el cheque anterior devolvía "disponible".
  Los errores de conexión y autorización se muestran por separado.
  La publicación de datos seleccionados requiere la acción del propietario.
- **Licencia:** Un nombre corto se muestra en la ventana Acerca.
  `AGPL-3.0`. Identificador formal `AGPL-3.0-only` y texto completo
  Licencias retenidas. Los componentes de terceros conservan sus licencias.

## Paquetes.

| Plataforma | Versión. | Formato |
|---|---|---|
| Windows 10/11 x64 | 0.2.0+1257 | EXE y ZIP portátil |
| macOS 12+ Apple Silicon / Intel | 0.2.0+1258 | Universal DMG |
| Android 11+ ARM64 | 0.2.0+58 | APK |
| iOS Simulador en Mac | 0.2.0+59 | ZIP universal en dos partes |

[Скачать и проверить SHA-256](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.2.0).
Para iOS Simulador, descargar ambas partes y combinarlas.
[инструкции](BUILD_IOS.md). Este paquete está diseñado para el Simulador;
La instalación en un iPhone real requiere una firma separada.

## Comprobaciones.

- Flutter: **499 pruebas PASS, análisis sin comentarios. Regreso
  pruebas de selección y pergamino, retorno de foco, Cirilico e IME,
  ambos modos de panel derecho, búsqueda de hospedaje y volver a compartir.
- [Pipeline 190](https://git.evsikov.net/publics/consolecrypt/-/pipelines/190) :
  Windows trabajo 1257 y macOS trabajo 1258 realizado con éxito el análisis.
  Un conjunto completo de pruebas y montaje de Flutter antes del embalaje.
- Versión local, escenarios de exportación y embalaje: **20 PASS, 1 SKIP**
  Un cheque perdido macOS requiere PowerShell.
- Versiones de EXE e instalador Windows , set de DLL runtime se prueban.
  Integrity of ZIP; DMG, universal architectures and deep/strict codesign;
  certificado APK anterior y alineación ELF/ZIP para 16 KiB
  ARM64/Intel Slices y Precisely Build ZIP en dos partes iOS Simulator
- El texto completo de la AGPL se incluye y verifica en los cuatro paquetes.
- Los siete archivos públicos se descargan anónimamente; tamaños y SHA-256
  Son similares a los paquetes verificados localmente.
- El servidor de actualización publica 0.2.0 para Windows 1257, macOS 1258
  y Android 58. Firma Ed25519 verificada por clave pública anterior
  Referencias, tamaños y SHA-256 coinciden con los paquetes comprobados.
- El manual se actualiza en ruso e inglés: **29 secciones,
  72 imágenes**, incluyendo búsqueda de host, resaltar desplazamiento,
  contador de pestañas y ambos modos de panel. Las fotos están hechas de las reales.
  0.2.0 widgets cliente con datos de demostración.

Recepción interactiva en físico Windows / Android / iPhone dispositivos
No se llevó a cabo en esta carrera. Repita el cheque de la función
Servidor público, establece 0.2.0 y haga clic en la actualización en la sección
"Acceso compartido".
