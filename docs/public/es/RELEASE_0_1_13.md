# ConsoleCrypt 0.1.13 · Verificación de números

Referencia traducida · [Original en ruso](../RELEASE_0_1_13.md)

Fecha: 30 de septiembre de 2026. Fuentes - tag `v0.1.13` , commit `4dd26f2` .
Se utiliza el puente Rust real `CC_MOCK=false` .

| Plataforma | Paquetes. | Versión nativa |
|---|---|---|
| Windows 10/11 x64 | EXE y ZIP portátil | 0.1.13+1221 |
| macOS Apple Silicon e Intel | Universal DMG | 0.1.13+1222 |
| Android 11+ ARM64 | APK | 0.1.13+27 |

Regresión fija cuando Windows manejaba Enter, pero no caracteres convencionales.
Ahora el evento del teclado del hardware transfiere el diseño actual Unicode; Flutter
Marca el evento procesado de manera que la entrada de texto OS no duplica el carácter.
IME-composition continúa utilizando TextInput nativo. Prueba de regresión
reprodujo el fallo antes de la corrección y pasa después de ella: `ф` , `Я` , `ё` , espacio,
El latín habitual, la retención clave y Enter. Previos de Focus, Ocultos
pestañas, IME y Ctrl+C se guardan. Esto es una prueba de los eventos de Flutter, no prueba.
El teclado físico funciona en todos Windows ordenadores.

Sección agregada "Actualizaciones": autocheck en el lanzamiento, su desconexión, manual
Comprobación y descarga / iniciación del instalador. Metadatos firmados Ed25519 , HTTPS
Las cargas se limitan a direcciones de confianza, y SHA-256 se comprueba antes de la instalación.
Comprobada firmas incorrectas, sustitución clave, fecha de caducidad, prohibición de patadas,
archivos entrecortados/demasiado grandes, digerir incorrecta, redireccionado a otros
dominio, guardar interruptor, repetir después del error, Android permisos
ida y vuelta y cancelación de instalación por el usuario.

GitLab pipeline155 / puestos de trabajo1221,1222 ensamblados con éxito Windows y macOS .
Análisis estadístico y todas las pruebas 406 de Flutter se realizaron en ambos corredores.
ZIP aprobó la CRC; Windows recurso de versión contiene 0,1.13+1221.
DMG aprobó el control de integridad `codesign --verify --deep --strict`
versión del paquete1222 y arquitecturas x86_64/arm64; hay enlaces de aplicaciones dentro.
APK contiene la versiónName0.1.13/versionCode27, ha pasado la verificación de firmas.
`zipalign -P 16` y la alineación ELF de las tres bibliotecas nativas.
El certificado APK es el mismo que la versión anterior, por lo que la instalación en la parte superior es compatible.

Actualización cerrada Editor Despliegado Independientemente de la API y el sitio
Git público. Lee los lanzamientos cada cinco minutos, comprueba los paquetes de todos.
La plataforma y firma el alimento. Un cliente Dart ha verificado la firma real Node.
La clave de firma sólo está disponible para el editor; el Pod web no la recibe. Datos de datos
Los almacenamientos y cuentas no están involucrados en la comprobación de las actualizaciones.

Restricciones: La instalación todavía requiere cheques de aceptación en Windows10 problemático
Computación y física Android . Windows lanza Inno installer y cierra
cliente; Android requiere validación del sistema; macOS abre DMG
Reemplazar la aplicación por el usuario. Los instaladores en esta carrera no comenzaron.
para reemplazar las aplicaciones existentes. Los paquetes siguen siendo preliminares:
Windows sin autenticidad, macOS sin la notarización de Apple, APK
Certificado de desarrollo.

[Релиз и контрольные суммы](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.13)
· [Инструкция по обновлениям](UPDATES.md) .
