# ConsoleCrypt 0.1.10 · Verificación de números

Referencia traducida · [Original en ruso](../RELEASE_0_1_10.md)

Fecha: 30 de septiembre de 2026. Fuente es una etiqueta inmutable `v0.1.10` .
El cliente utiliza un verdadero puente Rust; `CC_MOCK` no está habilitado.

| Plataforma | Paquete | Asamblea General |
|---|---|---|
| Windows 10/11 x64 | EXE y ZIP portátil | 1208 |
| macOS Silicon Intel/Apple | Universal DMG | 1209 |
| Android 11+ ARM64 | APK | 22 |

Reconnecting native TextInput cuando se activa el terminal
Enfóquese únicamente la pestaña visible y transfiera el foco a la ventana del niño Flutter Windows .
La entrada de texto permanece a través de IME; UTF-8 Cyrillic se transmite sin conversión
En el diseño del teclado. La pestaña oculta y la ventana de confirmación no interceptan la entrada.

Windows y macOS proyecto construido GitLab runners (pipeline150, jobs1208/1209).
`flutter analyze` , todas las pruebas de 393 Flutter y 6 pruebas de versión aprobadas
en ambos anfitriones. La regresión revisa un clic después de perder el foco.
`Привет, ёж!` , Composición IME, conmutación de pestañas, Entrar y Ctrl+C.
Windows servicio encuentra herramientas instaladas; falta Flutter, Perl
Inno Setup se toma de las versiones oficiales con verificación commit/SHA-256.

Cheques de descargas DMG/EXE/ZIP emparejaron artefactos CI. ZIP se ha ido.
CRC verificación y contiene EXE, Rust Bridge, Flutter, ICU y DLL Visual C+++.
DMG pasó `hdiutil verify` ; versión interior 0.1.10, build1209, arquitectura
x86_64 y arm64, referencia Aplicaciones y validación `codesign --verify` .
La aplicación en este Mac no comenzó durante el cheque.

La APK está hecha del mismo árbol público con la nueva construcción22. Paquete verificado
`io.consolecrypt.consolecrypt` , versiónName0.1.10, versiónCode22, firma,
`zipalign -P 16` y 16KiB ELF diseño de las tres bibliotecas nativas.
El certificado de firma es el mismo que el APK anterior, por lo que la actualización es compatible.

Comprobación de teclado nativo en dos ordenadores problemáticos Windows10 específicos
Sigue siendo una prueba de aceptación del usuario: esta máquina no tiene ningún trabajador.
mesa. Después de la actualización, compruebe cambiar de otra aplicación a la terminal.
entrar en el diseño ruso e inglés, selección de texto, conmutación SSH - pestañas
Volver a concentrarse después de que el diálogo se cierre. No es posible considerar la imitación de IME en
Autotesta el control completo del teclado físico de cada ordenador.

Los paquetes están destinados a pre-testing. Windows no consignado
Publisher, macOS sin notarización por Apple, APK utiliza un certificado de desarrollo.
El APK actual no corrió en un teléfono físico en esta carrera.

El servidor 0.1.9 / protocolo 1.5 y el sitio tienen versiones separadas. Cambiar el cliente
No hay necesidad de volver a montar el servidor. El sitio se coloca en un separado `consolecrypt-site` .

[Релиз и SHA-256](https://git.evsikov.net/publics/consolecrypt/-/releases/v0.1.10).
