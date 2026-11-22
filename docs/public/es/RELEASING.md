# Versión de lanzamiento / Liberaciones

Referencia traducida · [Original en ruso](../RELEASING.md)

Conjuntos realizados [GitHub Actions](https://github.com/evsikovas/consolecrypt-client/blob/main/.github/workflows/client.yml) en el repositorio
`evsikovas/consolecrypt-client` [Раннеры и нумерация](GITHUB_ACTIONS.md)
Fuentes y archivos de bloqueo se almacenan en Git; los instaladores se almacenan en archivos adjuntos de liberación.
No añadir `dist/` , fichas, Android llavero o claves de firma privada.

1. Aumentar la versión a través de `python3 client/scripts/bump-version.py --part patch`
   (Para la liberación funcional, uso `--part minor` ). Crea.
   `docs/public/RELEASE_X_Y_Z.md` con una descripción de cambios y limitaciones.
2. Compruebe los cambios y enviar el compromiso a `main` . Las ramas de empuje no recogen paquetes.
   Antes de etiquetar, realizar pruebas en vivo que no están en CI `#[ignore]` :

   ```sh
   python3 client/scripts/live-stand.py list
   python3 client/scripts/live-stand.py sharing
   python3 client/scripts/live-stand.py fingerprint --host <windows-host>
   python3 client/scripts/live-stand.py rdp --host <windows-host> --user <user> --certificate-sha256 <hex>
   ```

   `sharing` levanta desechables PostgreSQL 16 en Docker y adyacente
   `consolecrypt-server` en el bucleback con todas las banderas públicas y FileMailer,
   Comienza a compartir y realizar pruebas de inscripción y elimina todo. `rdp`
   Configurar (derechos 600) para el anfitrión Windows en el que el propietario ha autorizado las pruebas;
   La contraseña se toma de `CC_RDP_LIVE_PASSWORD` o `~/.config/consolecrypt-test/rdp.env`
   Y no está impreso, es SHA-256. Kubernetes y Linux
   Servicio Secreto verifica Linux tarea CI; pruebas de consulta del sistema
   (Secure Enclave, Windows Hola) se ejecuta manualmente.
3. Crear una etiqueta anotada en este commit y enviarla:

   ```sh
   git tag -a vX.Y.Z -m 'ConsoleCrypt X.Y.Z'
   git push origin vX.Y.Z
   ```

4. **Actions → Client tag release** comprueba la versión, el commit en `main` y la auditoría de
   dependencias (`cargo deny`, `osv-scanner`). Consulte [BUILDING.md](../BUILDING.md#проверка-зависимостей).
   Prepara las compilaciones de macOS, Windows, Linux, Android y iOS Simulator. Una tarea aparte genera los paquetes de RuStore.
   Antes de crear la etiqueta, resuelva la incidencia de dependencias o documente una excepción con fecha de revisión.
   Para ejecutar la auditoría localmente, use `python3 client/scripts/dependency-audit.py check`.
   Los números de construcción se emiten por separado a cada plataforma; todos conservan uno `X.Y.Z` .
5. Cuando terminan todas las tareas, el publicador comprueba `ConsoleCrypt.version` y adjunta nueve archivos
   al borrador. Incluyen el DMG de macOS, instalador y ZIP portátil de Windows, DEB y RPM de Linux, APK directo de Android,
   ZIP universal de iOS Simulator para Mac y los paquetes APK y AAB de RuStore. Sube
   `SHA256SUMS-X.Y.Z.txt` antes de publicar la versión en GitHub.
   La liberación existente no está sobrescrito. Si la descarga se termina después de la creación
   borrador, compruébalo manualmente antes de reiniciar; archivos publicados
   y las etiquetas permanecen sin cambios, las correcciones se emiten con una nueva versión.
6. Workflow ejecutará por separado una cinta firmada en una de confianza `main` . Comprobación.
   los resultados de este flujo de trabajo y la disponibilidad de instaladores sin autorización.
   El sitio y el servidor se emiten con sus propias etiquetas en repositorios separados;
   La publicación del cliente por sí sola no cambia la composición de producción.
7. Antes de docs y el enlace del sitio a una nueva liberación, verifique sus activos y
   Actualizar los enlaces (salida vecinal `consolecrypt-docs` y `consolecrypt-site` ):

   ```sh
   python3 client/scripts/verify-client-release.py --tag vX.Y.Z --download > verified-downloads.json
   python3 client/scripts/update-release-docs.py verified-downloads.json --docs ../consolecrypt-docs --site ../consolecrypt-site
   ```

   El primer script revisa la versión publicada: un archivo de cada tipo,
   un número de construcción por plataforma, dimensiones, caminos y digerir GitHub vs.
   `SHA256SUMS` , cintas permitibles; con `--download` instaladores de descarga y
   Verifica SHA-256. La segunda reescritura en README docs título, enlaces y
   ensamblados de mesa, y en el sitio - `download.html` , `index.html` y `assets/en.js` ;
   Si la versión anterior se deja atrás después de la edición, no graba nada.
   `--check` sólo le dice que va a cambiar. Luego `npm test` en el sitio; versión
   Los sitios en `package.json` y `releases/0.1.N.md` se editan manualmente.

## Cambiar desde el antiguo servidor de actualización

Clientes hasta 0,3.2 confianza solamente `git.evsikov.net` y
`updates.consolecrypt.evsikov.net` , incluyendo cada redirección. Viejo `stable.json`
Debe apuntar a los archivos reales bajo el antiguo dominio de confianza, con el anterior
Firma. Redirección a GitHub o un nuevo dominio no actualizará a un cliente viejo.
Después de la instalación se utiliza 0.3.2 `https://updates.consolecrypt.dev/stable.json`
Y la misma llave pública.

No cambie las sincronizaciones guardadas URL en los perfiles: se incluyen en la sincronización local.
Compartir acceso a la confianza vinculante. Mantener un antiguo dominio de API como alias
La misma instancia del servidor y la misma base de datos; redireccion convencional o segunda independiente
Un servidor vacío no es sustituto de esta compatibilidad.
