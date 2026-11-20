# ConsoleCrypt 0.5.2

Referencia traducida · [Original en ruso](../RELEASE_0_5_2.md)

## Ruso

La primera edición de la serie 0,5: terminales locales, catálogo extendido
modelos y guardar descargado local AI cuando se actualiza.

- ** Terminales locales en macOS y Windows :** zsh, PowerShell, cmd y separado
  ficha para cada distribución WSL instalada. Puedes mantenerlos cerca.
  con SSH - sesiones. Soporte de entrada interactiva, redimensionamiento,
  Controlar las teclas y completar el proceso al cerrar la pestaña o bloquear.
- **Objetivo para AI: ** La cáscara local transmite su dialecto sin ficticios
  SSH - host. Para comandos y snippets locales de IA, hay disponible un inserto sin Enter;
  La ejecución después de la inspección sigue siendo manual. SFTP y lanzamiento masivo para SSH .
- **Tres modelos locales: ** ligero Qwen2.5-Coder 1.5B, mediano Qwen3.5 4B y potente
  Qwen3.5 9B. Ajustes muestran el volumen de carga, referencia RAM, fuentes y
  licencias. La estrella recomienda la opción para la memoria total del ordenador, sin cambiar
  Su elección es automática.
- **Guardar la IA local al actualizar:** instalación del motor separada de
  Archivos GGUF. El modelo probado se reutiliza; el cambio de modelo no elimina
  El resto. La eliminación del modelo seleccionado no elimina otros modelos y motor.
- ** macOS :** Correr un zsh regular requiere salir de la App Sandbox. Datos anteriores
  contenedores utilizados en el sitio; el paquete actual se firma ad-hoc y no
  notarizado; en caso de conflicto de dos almacenamientos o un error
  Acceso a paradas de lanzamiento con una explicación. Vault y Keychain no deben ser eliminados.
- ** Windows :** Freezing al cerrar la terminal local antes de la terminación
  Intercambios de arranque ConPTY; PowerShell y cmd se verifican en el actual Windows corredor.
- Arreglado el procedimiento para restaurar el amortiguador terminal después de eventos desaparecidos
  Y el contraste del panel móvil RDP en un tema oscuro.

Detalles: [локальные терминалы](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/LOCAL_TERMINALS.md) , [локальный ИИ](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/LOCAL_AI.md)
[обновления](https://github.com/evsikovas/consolecrypt-client/blob/v0.5.2/docs/public/UPDATES.md) . Local shells and built-in local AI are available
En macOS / Windows ; Linux y plataformas móviles conservan las capacidades existentes.
El paquete iOS está diseñado para el Simulador, no para la instalación en un iPhone físico.

### Paquetes 0.5.2

Los siete archivos se publican en [релизе v0.5.2](https://github.com/evsikovas/consolecrypt-client/releases/tag/v0.5.2) .
Sizes and SHA-256 are checked against published files;
Uso [SHA256SUMS-0.5.2.txt](https://github.com/evsikovas/consolecrypt-client/releases/download/v0.5.2/SHA256SUMS-0.5.2.txt) .

| Plataforma | Asamblea General | Formato |
| --- | --- | --- |
| macOS ARM64 e Intel x86-64 | 0.5.2+21011 | Universal DMG |
| Windows x64 | 0.5.2+21012 | EXE y ZIP portátil |
| Linux x64 | 0.5.2+21013 | DEB and RPM |
| Android ARM64 | 0.5.2+21014 | APK |
| iOS Simulador en Mac | 0.5.2+21015 | ZIP universal |

Windows Los paquetes no tienen una firma Authenticode. APK conserva el certificado anterior
iOS la vista previa fue instalada y lanzada en Simulator; [инструкция запуска](BUILD_IOS.md)
Esto no es un cheque RDP en un teléfono físico. Sobre Windows confirmó el presente
PowerShell/cmd y generación de los tres modelos locales de la CPU. Varios.
No se incluyeron distribuciones y actualizaciones reales de WSL a 0.4.1.
Una matriz verificada. Las imágenes RU/EN muestran una interfaz real con imágenes sintéticas
datos; no son un registro de estos cheques nativos.

Antes de actualizar, guardar un kit de copia de seguridad y recuperación;
No borre los datos de aplicación, modelos o llavero del sistema.
