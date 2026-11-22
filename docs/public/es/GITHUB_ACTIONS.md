# GitHub Acciones: el cliente nativo construye

Referencia traducida · [Original en ruso](../GITHUB_ACTIONS.md)

El flujo de trabajo `Client tag release` publica sólo un establo exacto `vX.Y.Z`
etiqueta cuya versión coincide `pubspec.yaml` y cuyo compromiso pertenece a `main`
Un lanzamiento manual desde `main` ejecuta la misma auditoría, las pruebas y las seis
tareas de empaquetado para crear una versión candidata. Las ejecuciones desde otras ramas
son rechazados antes de que los corredores persistentes reciban código. Los candidatos no publican
lanzamientos, actualizaciones de firmas o anuncios enviados. Los empujes de la rama no construyen.
Ningún código de solicitud de tiraje ejecuta en corredores nativos persistentes.

| Runner | Trabajos | Herramientas necesarias |
|---|---|---|
| Dedicado `self-hosted, macOS, ARM64, consolecrypt, client` | Android , iOS Simulador; macOS a menos que se haya sobreseído | Flutter 3.47.5, Rust 1.98, Python; Android SDK 36, build-tools 36.0.0, NDK 28.2.13676358, CMake 3.22.1; Xcode completo y CocoaPods |
| GitHub -hosted `windows-2025` | Windows x64 | MSVC C++/ATL y Windows SDK; `ci-windows.ps1` disposiciones Flutter, Perl e Inno Setup |
| GitHub -hosted `ubuntu-24.04` | Linux DEB/RPM | Isolated Ubuntu 22.04 Docker constructor, nativo Secret Service/FFI tests Kubernetes aceptación y Linux CPU local-AI humo de inferencia |

La variable de repositorio `MACOS_BUILD_RUNNER` supera sólo el trabajo macOS utilizando un
JSON conjunto de etiquetas, por ejemplo `["macos-26"]` Android y iOS utilizar el dedicado
Mac; Android conserva su clave de firma existente `ci-macos-tools.sh` disposiciones
El SDK detonado cuando está ausente. Uno dedicado Mac serializa sus trabajos.
El trabajo iOS compila, instala y lanza la aplicación en un desechable
Simulador. No requiere credenciales de provisión de Apple o producir un IPA.

Las tareas de compilación tienen el permiso `contents: read`. Una vez completadas las cinco
compilaciones de plataforma y la tarea de firma para RuStore, el publicador comprueba los resultados.
Adjunta nueve archivos al borrador. Incluyen el DMG de macOS, instalador y ZIP portátil de Windows, DEB y RPM
de Linux, APK directo de Android, ZIP universal para iOS Simulator y los paquetes APK y AAB de RuStore.
Sube las sumas SHA-256 antes de publicar. Solo el publicador recibe
`contents: write` y `actions: write` Pide `update-feeds.yml` sobre confianza
`main` después de la publicación. Sitio web y el despliegue del servidor tienen una etiqueta independiente
flujos de trabajo. Los archivos Simulator son para Xcode en Mac, no para iPhones físicos.

Los controles de dependencia se ejecutan sólo en GitHub -hosted `ubuntu-24.04` . release
`validate` carreras de empleo `client/scripts/dependency-audit.py` (pinned `cargo-deny`
y `osv-scanner` , SHA-256 verificado) antes de que cualquier trabajo nativo comience.
`dependency-audit.yml` repetirlo semanalmente, en el despacho manual y en las solicitudes de tirada
ese toque se manifiesta o bloquea los ficheros, incluyendo Dependabot. Su trabajo de auditoría tiene
`contents: read` ; un trabajo separado con `issues: write` (nunca en solicitudes de tirada)
abre, actualiza o cierra el tema de "dependencia vulnerabilidad". Política y excepciones:
[BUILDING.md](../BUILDING.md#проверка-зависимостей).

En Windows , habilitar el modo de desarrollador para que Flutter pueda crear enlaces de plugins, y
Elija un directorio de trabajo corto cuando registre el corredor:

```powershell
.\config.cmd --url https://github.com/evsikovas/consolecrypt-client --work C:\cc-ghw --labels consolecrypt,client
```

Ingrese la ficha de registro del repositorio en el aviso interactivo. El verificado
Windows usos del corredor `C:\cc-ghw` . Un espacio de trabajo más anidado alcanzó 260 caracteres
Dentro de OpenSSL proveedores y hizo que su configuración nativa Perl falla a pesar de
el archivo existió. El directorio corto resolvió el fracaso; simlinks habilitantes o
Windows El soporte de larga trayectoria por sí solo no fija este límite de Perl. Cuando se reubica un
corredor existente, espere hasta que esté ocioso y preservar su configuración y viejo
checkout/cache hasta que se verifique la nueva ubicación.

## Número de construcción

`client/scripts/github-build-number.py` sets:

```text
10000 + GITHUB_RUN_NUMBER * 1000 + GITHUB_RUN_ATTEMPT * 10 + platform
platform: macOS=1, Windows=2, Linux=3, Android=4, iOS=5
```

La fórmula produce `11011` – `11015` para la primera ejecución / intento. Cada trabajo nativo
También comprueba que su número reservado supera el suelo de construcción de la fuente actual.
Los registros reciben nuevos números. Attempts above 99 and Android versionCode overflow
Fallo cerrado. No reiniciar/crear este flujo de trabajo y reutilizar su secuencia de números de ejecución
sin elevar la base de referencia sobre todas las obras publicadas. No publiques a una persona mayor
correr después de una nueva carrera ya ha enviado.

Windows nativo `FILEVERSION` y los componentes de la versión Inno Setup se limitan a
`65535`. El embalaje actualmente pone el número completo de construcción en el cuarto componente.
Antes de superar ese límite, cambiar y probar la representación de metadatos Windows
preservando al mismo tiempo la versión completa de aplicación/actualización y monotónica Android
`versionCode`. Con la fórmula actual, la carrera 56 excede el límite Windows incluso
en su primer intento; muchos registros pueden alcanzarlo antes. El límite se aplica tanto a los candidatos manuales como a las versiones de etiquetas. No reajuste la secuencia de ejecución GitHub para trabajar a su alrededor.

## Firma y credenciales

- Las variables de repositorio `ANDROID_HOME` y `JAVA_HOME` apuntan a las variables existentes
  SDK y JDK en el corredor Mac cuando están fuera de las ubicaciones estándar.
- No GitHub repositorio secreto es necesario para la compilación. La vida corta
  workflow token fetches source y sube artefactos CI.
- El Mac Runner debe mantener la vista previa Android
  `$ANDROID_USER_HOME/debug.keystore` (predeterminado `$HOME/.android/debug.keystore` ).
  `build-android.sh` se niega a reemplazarlo en silencio. Una llave de reemplazo previene
  Actualizaciones sobre un APK instalado.
- Variable de repositorio opcional `CC_CODESIGN_IDENTITY` selecciona una existente
  macOS llavero firmando identidad por nombre o SHA-1. Sin ella, construye retenimiento
  El comportamiento ad-hoc anterior. La distribución de ID de desarrollador necesita notarización.
- La tarea de iOS genera un ZIP universal para Xcode Simulator en Mac.
  La distribución para iPhone requiere una firma y un canal de distribución independientes.
- Las teclas de firma de actualización `UPDATE_SIGNING_KEY` y `LINUX_UPDATE_SIGNING_KEY`
  para la alimentación separada Linux permanecen limitadas a la alimentación de actualización separada)
  flujo de trabajo. La tarea de RuStore recibe las claves de firma de la aplicación y de subida
  que se utilizan para firmar el APK y el AAB. Véase [RELEASING.md](RELEASING.md) y
  [UPDATE_FEED_PUBLISHER.md](UPDATE_FEED_PUBLISHER.md).
- El trabajo hospedado `announce` funciona después de la publicación. Cada canal comienza
  Cuando el propietario lo haya configurado: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`
  (canal de proyecto), la variable `TELEGRAM_PERSONAL_CHAT_ID` (un segundo canal);
  `announce-telegram.py` mantiene su diario por canal, y `EVSIKOVNET_TOKEN`
  `announce-evsikovnet.py` crea o actualiza la liberación en evsikov.net con la
  Notas rusas y enlaces de descarga de consolacrypt.dev. Los scripts se niegan a publicar
  fuera de este trabajo de liberación; uso local `--dry-run`

Antes de enviar el anuncio, `announce` espera hasta 30 minutos a que la página muestre la versión,
los siete enlaces de descarga directa, incluido el ZIP del simulador, y la ficha oficial de RuStore.
El despliegue del sitio web utiliza su flujo de trabajo de etiquetas separadas. Un tiempo retiene a cada uno
canal de anuncios; no elimina los paquetes de clientes publicados.
El flujo de trabajo manual `Encrypted client compatibility` también funciona cripto/sinc
test on an isolated Ubuntu runner without packaging or publication.

Los artefactos se conservan durante 30 días e incluyen sólo paquete explícito, suma de comprobación
y los caminos de la versión. El informe de prueba Linux utiliza un esquema JSON.
llaveros de prueba, salida de tiempo libre y accesorios privados no se suben.

## Limpieza de salida generada

La limpieza de salida generada completa funciona **solo después de un establo GitHub
han sido publicados. Persistente Windows y Mac construyen empleos `clean: false`
checkout y retener las salidas ignoradas de Cargo/Flutter, paquetes locales y la propiedad
Cadilla de humo de IA después de la compilación, prueba o subes los fallos. Trabajos de diagnóstico también
Guárdalos. El flujo de trabajo registra el repositorio, fuente commit, run y plataforma
en un marcador de propiedad del espacio de trabajo antes de construir.

Después de la publicación, un trabajo separado de limpieza de Mac verifica ese marcador y
la corriente de la salida `HEAD` El corredor persistente Windows mantiene su
generar caché de construcción después de la publicación de modo que la próxima versión construye
incrementalmente; utilice el flujo de trabajo de mantenimiento vigilado abajo para limpiarlo. No realizan ningún chequeo y rechazan a un extranjero o
más nuevo espacio de trabajo. Los flujos de trabajo de liberación, diagnóstico y mantenimiento comparten uno
grupo de concurrencia, por lo que otra construcción no puede comenzar mientras la limpieza posterior a la publicación
está corriendo. La publicación se registra sólo después GitHub ha aceptado al público
liberación; un fallo posterior de envío alimentado por actualización no impide la limpieza de eso
ya publicados. Carga completa de artefactos y GitHub troncos permanecen.

Esta política se aplica a las etiquetas que contienen estos cambios de flujo de trabajo. El inmutable
`v0.5.2` flujo de trabajo todavía contiene la limpieza anterior por trabajo `always()`. Hosted
Mac máquinas virtuales y Linux ARC `emptyDir` espacios de trabajo son efímeros; retenimiento
Los archivos en un trabajo no los preservan después de que la máquina o la vaina es destruida.
Un corredor persistente abruptamente terminado también puede perder su trabajo final de limpieza.
use el flujo de trabajo de mantenimiento vigilado abajo después de la publicación.

La limpieza está restringida a la exacta `GITHUB_WORKSPACE` de este repositorio y
Chequea Git root/origin y rastrea los archivos antes de borrar cualquier cosa. Está cerrado.
lista cubre Cargo `target` directorios, Flutter `build` / `.dart_tool` , Android
`.gradle` / `.cxx` , y `dist` . Un simlink/junción en los antepasados de un objetivo
los enlaces dentro de los árboles generados se eliminan sin seguirlos.
Fuente, `.local` recibos, modelos de aplicación/vault, claves de firma, SDKs, Cargo
registro, caché pub e instalaciones de herramientas compartidas están fuera de esta lista.
Si un acabado de construcción elimina o crea un archivo durante la traversal, se limpia
sólo `ENOENT` / `ENOTEMPTY` hasta cinco veces (3.85 segundos del desvío total).
Los fallos persistentes siguen siendo fracasos; los diagnósticos incluyen el tipo de error y errno,
sin excepción texto, caminos absolutos o valores ambientales.

Windows GitHub trabajos reutilizados `.ci-cache/local-ai-smoke` dentro de la salida vigilada.
Su marcador de propiedad lo une a este repositorio y espacio de trabajo, independientemente de
el número de intento, por lo que una reingresación puede reutilizar descargas verificadas. Publicación posterior
limpiar elimina este caché de propiedad junto con los productos de construcción generados. El viejo
`C:\GitLab-Runner\tools\consolecrypt-local-ai-smoke` caché se conserva a menos que
un operador opta explícitamente por el mantenimiento de ese conocido camino CI.

Linux records of its job ownership under `RUNNER_TEMP` before starting Docker and
etiqueta el contenedor con repositorio/run/attempt/job. Tanto la trampa de salida normal
una llamada separada `always()` paso `cleanup-linux-job.py` para detener el cálculo incluso
Cuando una construcción falla o se cancela. El ayudante comprueba el recibo de propiedad,
etiquetas, imagen y montaje exacto `/work` fuente, entonces elimina sólo el inspeccionado
Identificación de contenedores. La falta de propiedad o los caminos vinculados fallan cerrados.
El ayudante conserva el rasguño de la fuente de propiedad y un recibo seguro; ARC eventualmente
elimina su compartimiento `emptyDir` con la cápsula. La imagen del constructor y compartida Docker
Se mantienen las capas. No hay una depresión global Docker de la pruna o volumen.

`Runner generated-output maintenance` es un manual separado, **sólo solo**
flujo de trabajo. No construye paquetes, implementa, recibe secretos de firma o cambio
etiquetas liberadas. Utiliza el mismo grupo de concurrencia que construye la liberación, por lo que espera
Hasta que la liberación haya terminado. Requiere una etiqueta estable publicada, verifica
que su GitHub La liberación es pública, y rechaza la limpieza si el espacio de trabajo actual
`HEAD` difiere de esa etiqueta. Por lo tanto, no se puede utilizar una versión publicada más antigua
para borrar un nuevo intento fallido. Su control de herramientas está anidado por separado con
`clean: false`. Los guardias de línea corren **antes** checkout: rechazan el enlace/junción
Un espacio de trabajo extranjero y un directorio de herramientas existentes a menos que sea
vacío o ya la esperada limpieza de Git checkout (incluido no rastreado/ignorado)
ficheros). El checkout no debe borrarse
Archivos desconocidos antes de que la limpieza vigilada funcione.

```sh
gh workflow run runner-cleanup.yml --ref main -f platform=macos -f published_tag=v0.5.2
gh workflow run runner-cleanup.yml --ref main -f platform=windows -f published_tag=v0.5.2

# Explicit one-time cleanup of known old Windows CI GGUF/download/runtime files.
gh workflow run runner-cleanup.yml --ref main \
  -f platform=windows -f published_tag=v0.5.2 -f legacy_windows_ai_cache=true
```

La opción legado-cache predetermina a falso, no acepta ningún camino arbitrario, rechaza
enlaces/reparar puntos y contenidos inesperados de tiempo de ejecución, y preserva la selección,
registros, recibos y archivos desconocidos. No inspecciona Windows datos de aplicación.
Los límites de eliminación se prueban con pequeños depósitos temporales de propiedad
`python3 -m unittest discover -s client/scripts -p 'test_ci_cleanup.py' -v`.
La prueba de unión Windows se ejecuta en Windows y se salta explícitamente en otros lugares.
`test_cleanup_policy.py` también verifica que una creación/publicación de liberación fallida
no emite la señal de publicación que permite la limpieza completa.
`test_linux_cleanup.py` cubre Docker límites de propiedad; `tests/test_linux_ci.py`
también matar una cáscara de productor sintético con `SIGKILL` e invocar la limpieza final como
un nuevo proceso, sin depender de su trampa de salida. Estos usan una falsificación Docker, no
contenedores de usuario en vivo.

## Ruso

`main` almacena la base fuente verificada. Para liberar, subir la versión, añadir
notas de liberación, enviar un compromiso a `main` , luego etiqueta `vX.Y.Z` a ese compromiso.
Una ejecución manual desde `main` genera una versión candidata. Una etiqueta estable publica la
versión en GitHub y activa las actualizaciones firmadas cuando terminan todas las tareas.
CI firma el APK directo de Android con la clave habitual del ejecutor, prepara el APK y el AAB con las
claves de firma de la aplicación y de subida y prueba la compilación de iOS en Xcode Simulator.

Después de la publicación, la tarea `announce` anuncia la liberación en canales que
creado por el propietario: Canal de telegramas del proyecto `TELEGRAM_BOT_TOKEN`
`TELEGRAM_CHAT_ID` ), segundo canal (variable `TELEGRAM_PERSONAL_CHAT_ID` ; diario
`announce-telegram.py` vía canales) y evsikov.net `EVSIKOVNET_TOKEN` :
`announce-evsikovnet.py` crea o actualiza una liberación con notas y
enlace a consolacrypt.dev. Fuera de esta tarea, los scripts no se publican; localmente,
`--dry-run`.


### Etiquetas diagnósticas Windows

Para la verificación aislada de ConPTY antes de crear una nueva liberación estable
etiqueta invariable `check-windows-0.5.2-1` (seguir intentos es un nuevo número).
`windows-native-check.yml` en el formato de la etiqueta del corredor anfitrión y la afiliación
commit `main` , luego lanzamientos `ci-windows.ps1 -NativeOnly` a Windows .
Este modo compila y realiza sólo pruebas nativas; no retrocede
número de instalador, no recopila la aplicación, no descarga modelos y no publica
La liberación. Los resultados intermedios se mantienen tanto después del éxito como después del error.
La limpieza completa se realiza sólo después de la publicación de una versión estable.
Trabajos de diagnóstico y liberación usan una cola común para limpiar
El número publicado no se intersectió con la nueva asamblea de diagnóstico.
La versión regular `vX.Y.Z` repite el conjunto completo de cheques y embalaje de todas las plataformas.

### Pre-assembly Windows

`windows-preview.yml` se lanza manualmente (Actions → Windows construcción de la vista previa)
Ejecute el flujo de trabajo, una rama para elegir en la nube `windows-2025` . Él llama.
`ci-windows.ps1 -PackageOnly` : instala herramientas y monta instaladores y
ZIP portátil sin una prueba de la liberación. El resultado es un artefacto
`windows-preview` durante 14 días; lanzamiento, actualización de cintas y número de construcción no
afectado. Es un montaje manual de cheques, no una liberación.
