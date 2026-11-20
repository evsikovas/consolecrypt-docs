# Renovación firmada alimentada por actualización

Referencia traducida · [Original en ruso](../UPDATE_FEED_PUBLISHER.md)

`.github/workflows/update-feeds.yml` se ejecuta en GitHub - Ubuntu hospedado independientemente
de las construcciones nativas. Comproba diariamente y soporta una ejecución manual desde `main` . Aah.
publicado evento de liberación estable sólo envía una carrera separada en `main` ; el
El trabajo de la etiqueta nunca recibe el secreto de la firma. No hay desencadenantes de PR o
Trabajos de firma auto hospedados.

El secreto del repositorio **UPDATE_SIGNING_KEY** debe contener el existente Ed25519
PKCS #8 PEM llave privada. El editor lo comprueba contra la llave pública ya
integrado en clientes instalados:

```text
aK3R5vXwJ9eeqQ1iYah9fzBAIHOeKNejoRdI8weXUYo=
```

Este es un cheque fideicomiso-ancla, no una solicitud para crear una nueva clave. Un operador
debe arrancar la primera versión con un ya firmado `stable.json` y
`legacy-stable.json`. El editor se niega a inferir confianza de la liberación no firmada
metadatos solo. Mantenga la copia de seguridad fuera de Git y el VPS.
El flujo de trabajo no tiene servidor SSH llave o token Timeweb. La clave de firma está cargada
desde el medio ambiente hasta la memoria, nunca escrito a un archivo, artefacto, log o
instalador. Las pruebas generan claves efímeras en tiempo de ejecución y no leen el secreto.

## Comprobaciones de publicación

El fabricante:

1. La última versión no traducida, no predefinida `vX.Y.Z` en
   `evsikovas/consolecrypt-client` , y rechaza una última etiqueta debajo de otro establo
   La liberación. A la mayoría de 99 comunicados históricos y 32 activos por liberación se aceptan;
   las historias más grandes requieren un operador para revisar y extender el límite.
2. `SHA256SUMS-X.Y.Z.txt` , requiere exactamente uno Windows x64 EXE, macOS
   Universal DMG y Android ARM64 APK, y comprueba sus nombres, números de construcción,
   Tallas y disponibles GitHub SHA-256 digests
3. Verifica una alimentación firmada existente con el anclaje público incrustado. Rechaza.
   versión/construir degradaciones y cambios a las identidades de un ya firmado
   versión de lanzamiento. Una nueva versión necesita una nueva versión y mayores números de compilación.
4. Deja un par de corriente completo sin cambios mientras que ambos tienen al menos 14 días
   restante. De lo contrario fluye y hahes los tres instaladores, enforzando
   a 500 MiB encuadernados por archivo. Sólo sigue el activo del repositorio exacto GitHub
   paths and its `release-assets.githubusercontent.com` CDN namespace; the API
   Token nunca acompaña una descarga pública.
5. Reprueba los metadatos de liberación para las carreras, luego firma un par de 90 días y lo sube
   como activos de liberación pública utilizando la vida corta `GITHUB_TOKEN`
   `contents: write`.

`stable.json` usos `https://updates.consolecrypt.dev/releases/VERSION/NAME`
`legacy-stable.json` usos `https://updates.consolecrypt.evsikov.net/releases/VERSION/NAME`
La misma versión, números de construcción, tamaños de byte, valores SHA-256 y identidad de firma
son usados en ambos. El endpoint heredado sirve al último documento como su
`/stable.json`. Mantener viejas URL vivas es necesario para clientes instalados que
No confíe GitHub o el nuevo dominio.

## Servir los archivos públicos

El VPS sólo necesita el **public** activos de liberación firmados e instaladores. Lo es.
espejo separado debe verificar firmas, identidades y hashes, conservar el último
buenos archivos en la falla de verificación o descarga y sustituir atópicamente cada alimento
sólo después de que tanto los piensos como todos los instaladores referenciados hayan pasado la verificación. No.
Pon la clave privada de firma en ese servidor. El editor no despliega
sitio web o modificar los datos de la cuenta.

GitHub no proporciona un reemplazo atómico de dos activos de liberación. Todos los cheques.
terminar antes de que el reemplazo comience; en un fallo de carga el editor intenta
para restaurar el alimento anterior de la memoria. Una carrera posterior puede reparar un par
uno sobreviviendo la alimentación válida. El espejo de servicio no debe eliminar sus archivos de trabajo.
Debido a que un activo falta temporalmente o una carrera falla. An expired signed
la base de referencia es aceptada para la renovación, pero los clientes instalados todavía rechazan un vencimiento
alimentar hasta que la renovación llegue al espejo.

Este diseño requiere activos de liberación editables. If GitHub immutable releases are
habilitado, el editor no cierra; mover los dos activos alimentarios a un
revisado canal de distribución mutable antes de habilitar ese ajuste.

Ejecute pruebas de editor deterministas sin ninguna credenciales de producción:

```sh
node --test client/scripts/test_publish_update_feeds.mjs
```

## Restauración de un horario para discapacitados

GitHub deshabilita automáticamente los flujos de trabajo programados en un repositorio público ** después
60 días sin actividad de repositorio. Compruebe el flujo de trabajo al regresar a un
un programa diario configurado no es una promesa de indefinida
ejecución [GitHub: disabling and enabling workflows](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/disable-and-enable-workflows)

Re-enable este flujo de trabajo existente y solicite un cheque del predeterminado de confianza
rama:

```sh
gh workflow enable update-feeds.yml --repo evsikovas/consolecrypt-client
gh workflow run update-feeds.yml --repo evsikovas/consolecrypt-client --ref main
gh run list --repo evsikovas/consolecrypt-client --workflow update-feeds.yml --limit 3
```

Confirme el éxito de la carrera e inspeccione la expiración de la alimentación pública después del espejo VPS
Corre. Un par todavía válido con al menos 14 días restantes intencionalmente
Cambió. Se puede renovar una base de referencia vencida y firmada correctamente, pero los clientes
No puede aceptarlo hasta que el alimento renovado llegue al espejo de la porción. No guardián.
compromete o servicio de programación separado son requeridos por este flujo de trabajo.

## En ruso.

Workflow **Firmado feeds de actualización** comprueba la liberación todos los días. Firma ejecutada
Sólo el código de `main` a GitHub - corredor hospedado. La llave privada original se almacena
GitHub secreto `UPDATE_SIGNING_KEY` , utilizado sólo en la memoria y no cae
VPS. Los clientes existentes siguen revisando la clave pública anterior.

Con un período restante de menos de 14 días, el flujo de trabajo vuelve a comprobar los instaladores y los libera.
Un nuevo par firmado con un plazo de 90 días. La publicación de la publicación también activa la verificación.
El primer par de confianza es publicado por el operador; sin él, la firma automática está prohibida.
El espejo público verificado en el servidor guarda los archivos de trabajo anteriores cuando se produce el fallo.
El antiguo dominio de actualización continúa sirviendo las versiones instaladas del cliente.

En un repositorio público GitHub, se apaga el horario después de 60 días sin actividad.
Después de tal ruptura, gire en el comando de flujo de trabajo existente `gh workflow enable` .
y ejecutar un cheque manual desde `main` como se muestra anteriormente. Compruebe el resultado y
Fecha de caducidad de la alimentación pública después de la actualización del espejo; documento expirado
El cliente acepta sólo después de su re-signación y entrega.

## Linux alimentación (FEAT-06)

Los paquetes DEB y RPM tienen su propio documento firmado `linux-stable.json`.
`linux-x64-deb` y `linux-x64-rpm` con
`https://updates.consolecrypt.dev/releases/VERSION/NAME` URLs. Está firmado por un
llave separada Ed25519 en el secreto del repositorio **LINUX_UPDATE_SIGNING_KEY**; Linux
clientes incrustaron solamente su anclaje público:

```text
Fn0pzhn51t/i8e8VYt7/wJkkXa7n2PkYtILgnxsuVlc=
```

La misma carrera lo firma después del par principal, con los mismos cheques: la liberación
checksums, hashes de paquetes en streamed, una vida de 90 días, renovación con menos de 14
días a la izquierda, y ninguna versión o construcción de bajada contra una firma anterior Linux
Alimento. La primera alimentación Linux se firma desde la propia liberación
anterior Linux base a arranque desde). Sin el secreto la alimentación Linux es
saltado y el par principal es publicado como antes. Las dos llaves no
intercambiable: cada uno se comprueba contra su propio ancla antes de cualquier solicitud.

## En ruso: cinta Linux

Se publica una firma separada `linux-stable.json` para DEB y RPM. El suyo.
firmar su propia clave Ed25519 de un secreto `LINUX_UPDATE_SIGNING_KEY` ;
Los clientes Linux sólo conocen su clave pública (arriba). Los cheques son los mismos que para
El par principal; la primera cinta Linux se firma en la propia versión. Un secreto todavía.
No, la cinta Linux se salta, y el par principal se publica como antes.
