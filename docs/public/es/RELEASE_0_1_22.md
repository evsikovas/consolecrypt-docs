# ConsoleCrypt 0.1.22 · GNU AGPL-3.0 solo

Referencia traducida · [Original en ruso](../RELEASE_0_1_22.md)

Fecha: 1 de octubre de 2026. Código fuente verificado: etiqueta `v0.1.22`
commit `38cbfe1a166227488f251479b911809206ef3402` .

Cliente, servidor, bibliotecas compartidas y documentación ConsoleCrypt se utilizan ahora
**GNU AGPL-3.0-only**. README, información "Sobre el programa", metadatos de Cargo,
Se aceptan especificaciones de puentes nativos y texto de licencia en distribuciones.
El texto completo de la AGPL está incluido en macOS, Windows, Android y iOS Simulador.
Los componentes de terceros conservan sus licencias. Cuestiones publicadas anteriormente
Las licencias concedidas para ellos no son cambiadas. [Подробности](LICENSING.md)

| Plataforma | Paquete | Versión verificada |
|---|---|---|
| Windows 10/11 x64 | EXE y ZIP portátil | 0.1.22+1244 |
| macOS Apple Silicon e Intel | Universal DMG | 0.1.22+1245 |
| Android 11+ ARM64 | APK | 0.1.22+55 |
| iOS Simulador en Mac | ZIP universal en dos partes | 0.1.22+56 |

## Comprobaciones.

- Flutter: análisis sin errores y prueba **462 PASS. Windows / macOS
  [pipeline185](https://git.evsikov.net/publics/consolecrypt/-/pipelines/185)
  Se completó con éxito antes del embalaje.
- El general Rust crates: **61 prueba PASS**. Cargo-deny licencias disponibles para
  cliente y espacio de trabajo general; las excepciones AGPL se limitan a nuestras cajas.
- Escenarios de versión, exportación y embalaje: **20 PASS, 1 SKIP**. El único
  El chequeo local perdido requiere PowerShell; real Windows trabajo
  1244 ensambla con éxito el instalador y archivo portátil.
- Windows : aplicación e instalación de la versión 0.1.22.1244, DLL kit,
  Se verifica la integridad del ZIP y el texto completo del AGPL.
- macOS : versión 0.1.22+1245, DMG integrity, universal architectures,
  Codiseño profundo/stricto, enlace de aplicaciones y texto completo AGPL son verificados.
- Android : versión 0.1.22+55, antiguo certificado APK, zipalign16KB,
  Se verifican la alineación nativa ELF y los activos AGPL.
- iOS Simulador: versión 0.1.22+56, rebanadas ARM64/Intel Runner /App
  Activo AGPL, CRC y SHA-256 partes combinadas de ZIP probadas.
- Los siete archivos publicados se descargan anónimamente; tamaños y SHA-256
  Son similares a los paquetes verificados localmente. Limitada CI188/job1248
  Enlaces de activos registrados sin nuevas credenciales permanentes.

## Descargar

[Релиз и контрольные суммы](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.22).
Para iOS Simulador descargar ambas partes y combinar por [инструкции](BUILD_IOS.md) .
Es un ZIP para Simulator, no un IPA para un teléfono.

El sitio está actualizado independientemente de la API: versión del sitio 0.1.18, código 84563e1,
Los instaladores listos están disponibles en [странице загрузки](https://consolecrypt.evsikov.net/download) .
81 rutas/recursos públicos, incluyendo 54 imágenes; 26Nodos test
Se pierde una verificación opcional de una cuenta real.
El servidor de actualización publica 0.1.22 para Windows1244, macOS1245 y Android55.
Firma Ed25519 verificada por el anterior anclaje de confianza pública del cliente; dimensiones,
SHA-256 y las referencias corresponden a los instaladores verificados.

Comportamiento SSH , sincronización y compartir no cambió en esta versión.
Instalación y recepción interactiva en físico Windows / Android /iPhone
Los dispositivos no se llevaron a cabo en esta carrera. Comprobaciones nativas del pasado
Las versiones se describen en [0.1.21](RELEASE_0_1_21.md) .

Inglés: ConsoleCrypt 's actual cliente de primera persona, servidor, bibliotecas compartidas
y la documentación usan GNU AGPL-3.0 solo. Licencias de terceros e históricas
Los subsidios de licencia siguen sin cambiar. Pruebas All462 Flutter y 61 Rust compartido
Las pruebas pasaron. Las versiones del instalador y el texto completo de la licencia AGPL
verificado y los siete archivos de lanzamiento público fueron descargados y comprobados
contra SHA-256. Instalación de dispositivos físicos y aceptación interactiva
no se realizaron en esta verificación de la liberación.
