# ConsoleCrypt 1.1.3

Referencia traducida · [Original en ruso](../RELEASE_1_1_3.md)

## Ruso

Fijaciones de seguridad y pantalla completa macOS .

- **SQLite/SQLCipher:** causa eliminada de RUSTSEC-2026-0459
  (CVE-2026-119375). En caso de discrepancia en el tamaño de la base de datos y páginas WAL
  El resto no leído de la página ahora se reinicia. Corrección oficial
  SQLite portado a ambos motores incorporados; actualización de dependencia regular
  Esto no resolvería el problema con SQLCipher.
- ** macOS :** El panel nativo ya no ocupa una banda extra por encima de la aplicación
  Cuando te mueves a la pantalla completa. Cuando se va, su antiguo estado vuelve.
  El procesamiento se aplica a una ventana de pantalla completa regular y guarda
  Restaurar la ventana después de RDP de pantalla completa.
- ** Terminal minimalista en macOS :** botón SFTP y otras acciones
  colocado en una banda superior común con una indentación nativa para botones del sistema.
  Rolling y estirar el panel izquierdo de las pestañas ya no cambia la acción
  debajo de los botones de la ventana. Al cambiar la posición de las pestañas, se guarda la sesión y la paleta.
- ** Comprobaciones:** WAL leyó cheques de regresión tamaños de página y límites
  búfer; la función inicial sirve como un control negativo. Controles de auditoría
  Hashes del código C corregido, cabeceras, envoltorios Rust y script de construcción.
  Se revisan el cifrado, el cambio de clave, la reapertura de bases de datos y la búsqueda.

Los formatos locales de base de datos y sincronización no cambian. Actualización del servidor
No se requiere sincronización para esta liberación.

Paquetes: Windows , macOS , Linux DEB/RPM, Android , individual APK/AABs for RuStore
y iOS Simulador para Mac. Simulador no está instalado en el iPhone.
