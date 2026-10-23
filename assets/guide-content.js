// SPDX-License-Identifier: AGPL-3.0-only
// Unreleased changes are explicitly marked. Images are real Flutter widgets with
// synthetic demo services, never captures of a user's unlocked workspace.
const b = (ru, en) => ({ ru, en });
const shot = (name, ru, en, options = {}) => ({ name, caption: b(ru, en), width: 1440, height: 900, ...options });
export const guideGroups = [
  { id: 'start', title: b('Начало работы', 'Getting started') },
  { id: 'workspace', title: b('Рабочее пространство', 'Your workspace') },
  { id: 'collaboration', title: b('Совместная работа', 'Working together') },
  { id: 'control', title: b('Настройки и обслуживание', 'Settings and maintenance') },
];
export const guideSections = [
  {
    id: 'first-start', group: 'start', title: b('Первый запуск и профили', 'First launch and profiles'),
    intro: b('Начните локально или подключите зашифрованную синхронизацию. Профиль объединяет своё хранилище и, при наличии, аккаунт на выбранном сервере.', 'Start locally or connect encrypted sync. A profile contains its own vault and, when connected, an account on the chosen server.'),
    steps: [
      b('Установите клиент из раздела «Скачать». На macOS перенесите ConsoleCrypt в Applications; на Windows запустите установщик; на Linux установите DEB или RPM по главе «Установка Linux»; на Android подтвердите установку APK в системном диалоге.', 'Install the client from Downloads. On macOS, drag ConsoleCrypt to Applications; on Windows, run the installer; on Linux, install the DEB or RPM as described in the Linux installation chapter; on Android, confirm the APK installation in the system dialog.'),
      b('На macOS и Windows приложение открывается в большом окне, которое подстраивается под доступное место на экране. Измените его размер под свою работу: терминал и боковые инструменты могут оставаться рядом.', 'On macOS and Windows, the app starts in a large window fitted to the available screen space. Resize it for your workflow so the terminal and side tools can stay alongside each other.'),
      b('Для работы без сервера выберите «Работать локально», задайте название профиля и создайте хранилище.', 'To work without a server, choose “Use locally”, name the profile and create a vault.'),
      b('Для нескольких устройств выберите «Подключиться к серверу», проверьте HTTPS-адрес и войдите или создайте аккаунт. Подтвердите email, если сервер этого требует.', 'For multiple devices, choose “Connect to a server”, check its HTTPS address and sign in or create an account. Verify your email when required by the server.'),
      b('Переключайте профили в верхней части бокового меню. Дополнительные профили и включение синхронизации доступны в настройках; данные разных профилей не смешиваются.', 'Switch profiles at the top of the sidebar. Settings lets you add profiles or enable sync; data from different profiles stays separate.'),
      b('При подключении сервера «Проверить» сначала показывает версию сервера, протокол и открыта ли регистрация. Укажите имя этого устройства — оно появится в списке ваших устройств. Ссылка «Забыли пароль аккаунта?» сбрасывает пароль аккаунта по почте, но не парольную фразу хранилища.', 'When connecting a server, Check first shows the server version, protocol and whether registration is open. Enter a name for this device — it appears in your device list. “Forgot account password?” resets the account password by email, not the vault passphrase.'),
      b('«Настройки → Профили» переименовывают и удаляют профили. Удаление стирает профиль только с этого устройства и требует отметки «Я понимаю, что это действие необратимо»; зашифрованное хранилище синхронизированного профиля на сервере не затрагивается, а локальное хранилище можно вернуть только из резервной копии. Флажок «Открывать последний профиль при запуске» в «Оформлении» сразу открывает последний профиль (система может запросить доступ к связке ключей).', '“Settings → Profiles” renames and deletes profiles. Deleting removes the profile from this device only and needs the “I understand that this cannot be undone” tick; a synced profile’s encrypted vault on the server is not touched, while a local vault can come back only from a backup. The “Open the last profile at startup” checkbox in Appearance opens the last profile right away (the system may ask for keychain access).'),
    ],
    note: b('Веб-кабинет обслуживает публичный сервер sync.consolecrypt.dev и сохраняет аккаунты consolecrypt.evsikov.net. Используйте прежние email и пароль. Старый домен сейчас недоступен, а адрес существующего профиля автоматически не меняется. Сохраните резервную копию перед перенастройкой сервера. Аккаунты других серверов не появляются здесь автоматически.', 'The account portal serves public sync.consolecrypt.dev and retains consolecrypt.evsikov.net accounts. Use your existing email and password. The old domain is currently unavailable, and existing profile addresses do not change automatically. Save a backup before reconfiguring the server. Accounts from other servers do not appear here automatically.'),
    image: shot('welcome', 'Первый запуск: локальная работа, подключение сервера и восстановление из копии.', 'First launch: local use, server connection and restoring a backup.'),
    images: [
      shot('login-standard', 'Подключение к своему серверу: «Проверить» показывает версию и протокол, затем вход или регистрация по email и паролю аккаунта.', 'Connecting to your own server: Check shows its version and protocol, then sign in or register with an email and account password.'),
      shot('profiles-menu', 'Переключатель профилей вверху бокового меню: активный профиль, «Добавить профиль…» и «Управление профилями».', 'The profile switcher at the top of the sidebar: the active profile, “Add profile…” and “Manage profiles”.'),
    ],
  },
  {
    id: 'linux-install', group: 'start', title: b('Установка Linux: DEB, RPM и связка ключей', 'Linux installation: DEB, RPM and keyring'),
    intro: b('Клиент предназначен для x86-64 (x64) с графическим рабочим столом: Ubuntu 22.04, Debian 12 и Fedora 43. Выберите пакет своего дистрибутива; пакетный менеджер проверит зависимости.', 'The client targets x86-64 (x64) graphical desktops: Ubuntu 22.04, Debian 12 and Fedora 43. Choose the package for your distribution; the package manager checks dependencies.'),
    keywords: ['Linux', 'Ubuntu', 'Debian', 'Fedora', 'x86-64', 'DEB', 'RPM', 'apt', 'dnf', 'Secret Service', 'keyring', 'GNOME Keyring', 'связка ключей'],
    steps: [
      b('На странице «Скачать» выберите DEB для Ubuntu/Debian или RPM для Fedora. Проверьте поддерживаемые версии системы и архитектуру в описании релиза, затем сравните SHA-256 файла с опубликованной контрольной суммой.', 'On Downloads, choose DEB for Ubuntu/Debian or RPM for Fedora. Check the supported system versions and architecture in the release notes, then compare the file’s SHA-256 with the published checksum.'),
      b('Откройте терминал в папке с загруженным пакетом. В примере ниже замените consolecrypt.deb или consolecrypt.rpm точным именем своего файла; выполните только команду для своего формата.', 'Open a terminal in the folder containing the downloaded package. Replace consolecrypt.deb or consolecrypt.rpm below with your exact filename; run only the command for your package format.'),
      b('После установки запустите ConsoleCrypt из меню приложений в своей обычной графической сессии. Не запускайте клиент через sudo: ключи и настройки принадлежат вашему пользователю.', 'After installation, open ConsoleCrypt from your application menu in your normal desktop session. Do not run the client with sudo: its keys and settings belong to your user.'),
      b('Для ключей устройства нужна работающая и разблокированная системная связка ключей с Secret Service, например GNOME Keyring. Создайте и разблокируйте основную связку средствами рабочего стола до запуска клиента. Пароль связки ключей отличается от пароля аккаунта ConsoleCrypt и парольной фразы хранилища.', 'Device keys require a running, unlocked system keyring with Secret Service, such as GNOME Keyring. Create and unlock the default keyring using your desktop tools before starting the client. The keyring password is separate from your ConsoleCrypt account password and vault passphrase.'),
      b('На Linux обновления устанавливаются вручную: скачайте новый DEB или RPM со страницы «Скачать» и установите тем же способом. Перед обновлением сохраните зашифрованную резервную копию и завершите важные SSH-сессии; хранилище и связку ключей сохраняйте.', 'Linux updates are installed manually: download the new DEB or RPM from Downloads and install it in the same way. Before updating, save an encrypted backup and finish important SSH sessions; keep your vault and keyring.'),
    ],
    blocks: [
      { title: b('Ubuntu / Debian — пакет DEB', 'Ubuntu / Debian — DEB package'), caption: b('Имя файла — пример. apt устанавливает локальный пакет и доступные зависимости из настроенных репозиториев.', 'The filename is an example. apt installs the local package and available dependencies from your configured repositories.'), code: 'sudo apt install ./consolecrypt.deb' },
      { title: b('Fedora — пакет RPM', 'Fedora — RPM package'), caption: b('Имя файла — пример. dnf устанавливает локальный пакет и проверяет зависимости. Не отключайте эти проверки.', 'The filename is an example. dnf installs the local package and checks dependencies. Keep these checks enabled.'), code: 'sudo dnf install ./consolecrypt.rpm' },
    ],
    note: b('Если Secret Service недоступен или связка заблокирована, исправьте её состояние в настройках рабочего стола и повторите действие. Клиент не заменяет защищённое хранение ключей записью в обычный файл. Не удаляйте связку ключей ради устранения ошибки: это может лишить устройство доступа.', 'If Secret Service is unavailable or the keyring is locked, resolve its state in your desktop settings and retry. The client does not fall back to storing keys in a plain file. Do not delete your keyring to clear an error: doing so can remove this device’s access.'),
  },
  {
    id: 'passwords', group: 'start', title: b('Какой пароль нужен?', 'Which password do I need?'),
    intro: b('В ConsoleCrypt есть разные уровни доступа. Сброс пароля аккаунта по почте не открывает зашифрованное хранилище.', 'ConsoleCrypt has separate access layers. Resetting your account password by email does not unlock the encrypted vault.'),
    table: { headings: [b('Что', 'What'), b('Для чего', 'Purpose')], rows: [
      [b('Пароль аккаунта', 'Account password'), b('Вход на сервер и в веб-кабинет; его можно сбросить через email.', 'Signing in to the server and website account; it can be reset by email.')],
      [b('Парольная фраза хранилища', 'Vault passphrase'), b('Расшифровка данных на устройстве. Сервер её не знает.', 'Decrypting data on your device. The server does not know it.')],
      [b('Комплект восстановления', 'Recovery Kit'), b('Восстановление доступа к хранилищу при потере парольной фразы.', 'Recovering vault access after losing the passphrase.')],
      [b('Пароль связки ключей macOS', 'macOS Keychain password'), b('Системное разрешение доступа к ключу устройства; обычно пароль учётной записи Mac.', 'System permission to access a device key; usually your Mac user account password.')],
      [b('Пароль или ключ SSH', 'SSH password or key'), b('Вход на удалённый хост, а не на сервер синхронизации.', 'Signing in to a remote host, separate from the sync server.')],
    ] },
    steps: [
      b('Если macOS спрашивает доступ к связке «Вход» после новой сборки, проверьте название приложения и используйте пароль этой связки. Смена подписи приложения может вызывать новое разрешение.', 'If macOS asks for access to the login Keychain after a new build, check the application name and use that Keychain’s password. A changed app signature may require renewed permission.'),
      b('Если пароль Mac меняли, пароль связки ключей мог остаться прежним. Проверьте состояние связки в системном приложении «Связка ключей», не удаляя ключи ConsoleCrypt.', 'After a Mac account password change, the Keychain may still use its previous password. Check it in Keychain Access without deleting ConsoleCrypt keys.'),
    ],
    note: b('Не сбрасывайте связку ключей ради устранения диалога: это может удалить ключи устройства. Сначала сохраните комплект восстановления и зашифрованную резервную копию.', 'Do not reset the Keychain just to remove a prompt: doing so may delete device keys. Preserve your Recovery Kit and an encrypted backup first.'),
  },
  {
    id: 'vault', group: 'start', title: b('Хранилище, восстановление и биометрия', 'Vault, recovery and biometrics'),
    intro: b('Хранилище открывается на вашем устройстве. Настройте блокировку и способ разблокировки сразу после создания.', 'Your vault unlocks on your device. Configure locking and unlocking after creating it.'),
    steps: [
      b('Сохраните комплект восстановления офлайн и выполните проверку слов. Слова и QR-код дают доступ к хранилищу: не отправляйте их по почте, в чат или ИИ.', 'Save the Recovery Kit offline and complete the word check. Its words and QR code grant vault access: do not send them by email, chat or AI.'),
      b('На телефоне слова комплекта восстановления отображаются целиком. Количество колонок зависит от ширины экрана и размера шрифта; QR-код расположен под словами. Прокрутите экран, чтобы сохранить весь комплект.', 'On phones, Recovery Kit words remain whole. The column count follows the screen width and text size, with the QR code below the words. Scroll to save the complete kit.'),
      b('Заблокированное хранилище открывается парольной фразой или, если включено, Touch ID, Windows Hello или отпечатком. На этом же экране есть «Забыли парольную фразу?», «Выйти», «Удалить этот профиль…» и «Добавить профиль».', 'A locked vault opens with its passphrase or, when enabled, Touch ID, Windows Hello or a fingerprint. The same screen offers “Forgot passphrase?”, Sign out, “Delete this profile…” and “Add profile”.'),
      b('«Забыли парольную фразу?» открывает восстановление: введите 24 слова комплекта (или текст его QR-кода) либо, на доверенном устройстве с включённой разблокировкой устройством, выберите «Это доверенное устройство». Затем задайте новую парольную фразу.', '“Forgot passphrase?” opens recovery: enter the kit’s 24 words (or its QR-code text) or, on a trusted device with device unlock enabled, choose “This trusted device”. Then set a new passphrase.'),
      b('В «Настройки → Хранилище» выберите время автоблокировки. «Заблокировать сейчас» закрывает хранилище; «Изменить парольную фразу…» меняет именно его парольную фразу.', 'In “Settings → Vault”, select the auto-lock interval. “Lock now” locks the vault; “Change passphrase…” changes the vault passphrase.'),
      b('Новая парольная фраза хранилища должна быть не короче 12 символов. Существующие хранилища открываются прежней фразой; при следующей разблокировке фразой ключ перешифровывается с более стойкими параметрами Argon2id (не слабее 64 МиБ).', 'A new vault passphrase needs at least 12 characters. Existing vaults still open with their current passphrase; at the next passphrase unlock the key is re-wrapped with stronger Argon2id parameters (at least 64 MiB).'),
      b('Опасные действия подтверждаются паролем хранилища, а не вводом имени подключения, контекста или ресурса: изменяющие запросы к базам и правки ячеек, «Разблокировать прод», применение YAML, удаление, перезапуск и масштабирование в Kubernetes. Неверный пароль ничего не выполняет, поле очищается после каждой попытки, Enter подтверждает.', 'Dangerous actions are confirmed with the vault passphrase instead of typing a connection, context or resource name: changing database queries and cell edits, Unlock production, YAML apply, deletion, restart and scaling in Kubernetes. A wrong passphrase runs nothing, the field is cleared after every attempt and Enter confirms.'),
      b('Разблокировка устройством по умолчанию выключена. Чтобы включить её, откройте хранилище парольной фразой и в «Настройки → Хранилище» включите «Разблокировка через Touch ID», «… Windows Hello» или «… отпечаток пальца». Система один раз попросит подтверждение; биометрию заранее настройте в системе.', 'Unlocking with this device is off by default. To turn it on, unlock the vault with its passphrase and in “Settings → Vault” enable “Unlock with Touch ID”, “… Windows Hello” or “… fingerprint”. The system asks for confirmation once; set up biometrics in system settings first.'),
      b('Что это даёт: на Mac и iPhone ключ разблокировки хранится в Secure Enclave, в Windows — в Windows Hello, на Android — в Keystore. Система выдаёт его только после отпечатка, лица или пароля устройства, поэтому другая программа не получит ключ без вашего подтверждения. Если добавить отпечаток или сбросить Windows Hello, разблокировка устройством отключится: откройте хранилище парольной фразой и включите её снова.', 'What it protects: on Mac and iPhone the unlock key is held by the Secure Enclave, on Windows by Windows Hello, on Android by the Keystore. The system releases it only after your fingerprint, face or device password, so another program cannot get the key without your confirmation. Adding a fingerprint or resetting Windows Hello switches device unlock off: unlock with the vault passphrase and turn it on again.'),
      b('В Linux такой защиты нет: ключ лежит в связке ключей рабочего стола, и разблокировка без пароля доступна любой программе вашего пользователя. Поэтому там она выключена по умолчанию и включается только после предупреждения.', 'Linux has no such protection: the key sits in the desktop keyring, so unlocking without a passphrase is available to any program running under your user account. It is off by default there and can be turned on only after a warning.'),
      b('Без разблокировки устройством локальная база хранилища открывается только парольной фразой или комплектом восстановления. После обновления разблокировка устройством остаётся выключенной до первого входа парольной фразой; затем приложение предложит включить её снова.', 'Without device unlock, the local vault database opens only with the passphrase or the Recovery Kit. After the update, device unlock stays off until you unlock with the passphrase; the app then offers to turn it on again.'),
      b('Если комплект потерян, пока хранилище открыто создайте «Новый комплект восстановления…» и сохраните его. Предыдущий комплект перестанет действовать.', 'If the kit is lost while the vault is still unlocked, create and save a “New Recovery Kit…”. The previous kit will stop working.'),
    ],
    note: b('Разблокировка устройством — настройка этого устройства для этого хранилища, она не синхронизируется и не заменяет парольную фразу и комплект восстановления. Системный диалог может предложить пароль устройства. Face ID на физическом iPhone ещё требует отдельной проверки.', 'Device unlock is a setting of this device for this vault: it does not sync and does not replace your passphrase and Recovery Kit. The system dialog may offer your device password. Face ID on a physical iPhone still needs separate verification.'),
    image: shot('vault-settings', 'Разблокировка через Touch ID включена и защищена системой; секреты на снимке не раскрыты.', 'Unlock with Touch ID is on and protected by the system; no secrets are revealed.'),
    images: [
      shot('recovery-kit-mobile', 'Комплект восстановления на телефоне: слова целиком, QR-код ниже. На иллюстрации только демонстрационные данные.', 'Recovery Kit on a phone: whole words with the QR code below. The illustration contains demonstration data only.', { width: 412, height: 915 }),
      shot('unlock', 'Экран разблокировки: парольная фраза, системная разблокировка, «Забыли парольную фразу?» и действия с профилем.', 'The unlock screen: passphrase, system unlock, “Forgot passphrase?” and profile actions.'),
      shot('recovery', 'Восстановление доступа: ключ восстановления из 24 слов или это доверенное устройство, затем новая парольная фраза.', 'Recovering access: the 24-word Recovery Key or this trusted device, then a new passphrase.'),
      shot('change-passphrase', '«Изменить парольную фразу…» в настройках хранилища.', '“Change passphrase…” in the vault settings.'),
      shot('recovery-kit-new', '«Новый комплект восстановления…»: старый комплект перестанет работать.', '“New Recovery Kit…”: the old kit stops working.'),
    ],
  },
  {
    id: 'devices', group: 'start', title: b('Синхронизация и доверенные устройства', 'Sync and trusted devices'),
    intro: b('Вход в аккаунт и право расшифровывать хранилище — разные действия. Новое устройство требует подтверждения.', 'Signing in and being allowed to decrypt the vault are separate actions. A new device needs approval.'),
    steps: [
      b('На втором устройстве выберите тот же сервер и аккаунт. Если требуется доверие, откройте «Устройства» на уже доверенном устройстве.', 'On the second device, select the same server and account. When approval is required, open “Devices” on an already trusted device.'),
      b('Выберите ожидающее устройство, нажмите «Проверить и одобрить» и сверьте весь показанный код на обоих устройствах через независимый канал.', 'Select the pending device, choose “Verify and approve” and compare the entire displayed code on both devices through an independent channel.'),
      b('Отметьте «Все 6 групп в точности совпадают…» и нажмите «Одобрить». Если хотя бы одна группа отличается, нажмите «Коды не совпадают»: запрос будет отклонён, а ключ хранилища не передаётся.', 'Tick “All 6 groups exactly match…” and choose Approve. If any group differs, choose “Codes don’t match”: the request is rejected and no vault key is handed over.'),
      b('В разделе «Синхронизация» проверьте подключение, очередь изменений и конфликты. Изменения при отсутствии сети остаются локально и отправляются после восстановления связи. Индикатор «Синх.» в верхней панели показывает то же кратко: последнюю синхронизацию, сервер, очередь, «Синхронизировать» и «Подробнее».', 'In “Synchronization”, check the connection, pending changes and conflicts. Offline changes remain local and are sent when connectivity returns. The Sync indicator in the top bar shows the same at a glance: last sync, server, queue, “Sync now” and “Details”.'),
      b('«Настройки → Аккаунт и синхронизация → Отключиться (сохранить данные локально)…» превращает профиль в локальный: данные остаются на устройстве, зашифрованная копия на сервере не меняется. Флажок «Также отозвать это устройство на сервере» сразу отзывает его.', '“Settings → Account & sync → Disconnect (keep data locally)…” turns the profile into a local one: the data stays on the device and the encrypted copy on the server is unchanged. “Also revoke this device on the server” revokes it at the same time.'),
      b('Потерянное устройство отзовите в клиенте или веб-кабинете. Повторное подключение требует нового подтверждения.', 'Revoke a lost device in the client or website account. Reconnecting it requires a new approval.'),
    ],
    note: b('Отзыв прекращает сеансы и будущую синхронизацию, но не стирает уже прочитанные данные и не меняет пароли на SSH-серверах. При компрометации замените соответствующие пароли и ключи на самих хостах.', 'Revocation ends sessions and future sync, but cannot erase previously read data or change SSH-server passwords. After a compromise, replace the affected passwords and keys on the hosts themselves.'),
    images: [
      shot('device-approve', 'Одобрение нового устройства: 6 групп кода сверяются с экраном нового устройства; коды демонстрационные.', 'Approving a new device: the 6 code groups are compared with the new device’s screen; demo codes.'),
      shot('sync', 'Состояние синхронизации и очередь демонстрационного профиля.', 'Sync status and queue for the demo profile.'),
      shot('sync-popover', 'Индикатор «Синх.» в верхней панели: последняя синхронизация, сервер и очередь.', 'The Sync indicator in the top bar: last sync, server and queue.'),
      shot('disconnect', '«Отключиться (сохранить данные локально)…» с необязательным отзывом этого устройства.', '“Disconnect (keep data locally)…” with optional revocation of this device.'),
    ],
    image: shot('devices', 'Список демонстрационных устройств; подтверждение доступа выполняется отдельно.', 'Demo device list; access approval is a separate step.'),
  },
  {
    id: 'device-protection', group: 'start', title: b('Защита от входа с нового устройства', 'Protection against sign-ins from new devices'),
    keywords: ['новое устройство', 'new device', 'Это не я', 'This wasn’t me', 'Это я', 'It’s me', 'Не подтверждено', 'Not confirmed', 'ограничения', 'restricted', 'письмо', 'email', 'Выйти на всех устройствах', 'Sign out on all devices'],
    intro: b('Если кто-то войдёт в ваш аккаунт с нового устройства, вы сразу об этом узнаете, а само устройство первое время ограничено. Для защиты нужен сервер синхронизации 0.1.16 или новее.', 'If someone signs in to your account from a new device, you find out right away, and the device is restricted for a while. This protection needs sync server 0.1.16 or later.'),
    steps: [
      b('О каждом новом устройстве сервер присылает письмо на адрес аккаунта. В письме есть ссылка «Это не я».', 'For every new device, the server sends an email to your account address. The email contains a “This wasn’t me” link.'),
      b('На ваших доверенных устройствах появляется уведомление «Новое устройство вошло в аккаунт» с именем устройства и системой. Если входили вы, нажмите «Это я», и уведомление скроется.', 'Your trusted devices show a “New device signed in” notice with the device name and system. If it was you, choose “It’s me” to dismiss the notice.'),
      b('В разделе «Устройства» такое устройство помечено «Не подтверждено» и «Новое, ограничения до …». Первые 14 дней оно не может отзывать ваши доверенные устройства и завершать их сеансы, а попытки открыть хранилище с новых устройств ограничены по частоте.', 'In Devices, such a device is marked “Not confirmed” and “New, restricted until …”. For its first 14 days it cannot revoke your trusted devices or end their sessions, and attempts to open the vault from new devices are rate-limited.'),
      b('Если входили не вы, отзовите устройство: «Отозвать…» в уведомлении, меню устройства в разделе «Устройства» или ссылка «Это не я» в письме, которая открывает личный кабинет. Затем смените пароль аккаунта: тот, кто вошёл, его знает.', 'If it was not you, revoke the device: “Revoke…” in the notice, the device menu in Devices or the “This wasn’t me” link in the email, which opens your website account. Then change your account password: whoever signed in knows it.'),
      b('«Настройки → Аккаунт и синхронизация → Выйти на всех устройствах…» завершает все сеансы аккаунта, включая текущий. Устройства снова входят паролем аккаунта, их локальные данные сохраняются.', '“Settings → Account & sync → Sign out on all devices…” ends every session of the account, including this one. Devices sign in again with the account password; their local data is kept.'),
    ],
    note: b('Вход в аккаунт сам по себе не открывает хранилище: новому устройству по-прежнему нужно одобрение со сверкой кода на доверенном устройстве. Если выйти на всех устройствах или сменить пароль с нового устройства, доверенные устройства в первые дни не затрагиваются.', 'Signing in does not open the vault by itself: a new device still needs approval with a code check on a trusted device. Signing out everywhere or changing the password from a new device leaves trusted devices untouched during its first days.'),
    image: shot('devices', 'Уведомление о новом входе и новое устройство с пометками «Не подтверждено» и «Новое, ограничения до …»; все устройства демонстрационные.', 'The new sign-in notice and a new device marked “Not confirmed” and “New, restricted until …”; all devices are demo devices.'),
  },
  {
    id: 'enterprise-sign-in', group: 'start', title: b('Корпоративный вход: SSO и Active Directory', 'Corporate sign-in: SSO and Active Directory'),
    keywords: ['SSO', 'OIDC', 'Active Directory', 'AD', 'LDAP', 'Entra ID', 'AD FS', 'Keycloak', 'Okta', 'Google Workspace', 'enterprise', 'корпоративный', 'Доступ отключён', 'Access disabled'],
    intro: b('Сервер синхронизации 0.2.0 и новее может пускать в аккаунты только через сервер авторизации вашей организации. Клиент 0.9.0 сам узнаёт режим сервера и показывает нужную форму. Меняется только вход в аккаунт: хранилище по-прежнему открывает ваш пароль хранилища.', 'Sync server 0.2.0 and later can admit accounts only through your organisation’s authorization server. Client 0.9.0 detects the server’s mode and shows the matching form. Only the account sign-in changes: your vault passphrase still opens the vault.'),
    steps: [
      b('Выберите «Подключиться к серверу», введите HTTPS-адрес, который дал администратор, и нажмите «Проверить». Для корпоративного сервера появится блок «Корпоративный вход» с названием сервера авторизации; регистрации, пароля аккаунта и «Забыли пароль» в этом режиме нет.', 'Choose “Connect to a server”, enter the HTTPS address from your administrator and press Check. A corporate server shows a “Corporate sign-in” block naming the authorization server; registration, the account password and “Forgot password” are not offered in this mode.'),
      b('SSO (OIDC): при желании укажите e-mail и нажмите «Войти через …». Страница входа организации откроется в системном браузере; после входа браузер вернёт вас в приложение. Пока вход идёт, в приложении виден статус ожидания и кнопка «Отмена».', 'SSO (OIDC): optionally enter your e-mail and press “Sign in with …”. Your organisation’s sign-in page opens in the system browser and returns you to the app afterwards. While signing in, the app shows a waiting state with Cancel.'),
      b('Active Directory: введите логин (e-mail, UPN или DOMAIN\\user) и пароль домена. Пароль уходит на сервер один раз по TLS, не сохраняется и стирается из поля после каждой попытки.', 'Active Directory: enter your login (e-mail, UPN or DOMAIN\\user) and domain password. The password goes to the server once over TLS, is never stored and is cleared from the field after every attempt.'),
      b('Новый пользователь после первого входа создаёт хранилище, как обычно. Уже известное устройство открывает хранилище паролем хранилища; новое устройство одобряется со сверкой кода, ключом восстановления или паролем хранилища.', 'A new user creates a vault after the first sign-in as usual. A known device opens the vault with the vault passphrase; a new device is approved with a code check, the Recovery Key or the vault passphrase.'),
      b('Приложение запоминает для каждого сервера способ входа и логин (не пароль): в следующий раз они подставлены, а подсказка «В прошлый раз вы входили через …» предлагает «Забыть». В «Настройках», «Синхронизации» и «Устройствах» строка «Авторизация» показывает корпоративный сервер и когда это устройство вошло.', 'The app remembers the sign-in method and login (never the password) for every server: next time they are prefilled, and the hint “Last time you signed in with …” offers Forget. Settings, Sync and Devices show the corporate server and when this device signed in under “Authorization”.'),
      b('Если организация отключит вашу учётную запись, приложение покажет «Доступ отключён администратором» и заблокирует профиль. Данные на устройстве остаются зашифрованными; профиль можно удалить с устройства или войти снова, когда доступ вернут.', 'If your organisation disables your account, the app shows “Access disabled by the administrator” and locks the profile. Data on the device stays encrypted; you can delete the profile from the device or sign in again once access is restored.'),
    ],
    note: b('Пароль организации не открывает хранилище, и ни сервер авторизации, ни сервер синхронизации не получают ключей хранилища. Ошибки входа — домен не допущен, нет нужной группы, требуется второй фактор, учётная запись уже связана с другим аккаунтом, служба входа недоступна — показываются понятным текстом; с ними обращайтесь к администратору.', 'Your organisation’s password does not open the vault, and neither the authorization server nor the sync server receives vault keys. Sign-in errors — domain not allowed, group missing, second factor required, identity already linked to another account, sign-in service unavailable — are explained in plain words; contact your administrator about them.'),
    image: shot('enterprise-login-sso', 'Сервер с входом через SSO: блок «Корпоративный вход», необязательный e-mail и кнопка «Войти через Acme SSO»; сервер демонстрационный.', 'A server with SSO sign-in: the “Corporate sign-in” block, an optional e-mail and the “Sign in with Acme SSO” button; the server is a demo one.'),
    images: [
      shot('enterprise-login-ldap', 'Вход через Active Directory: логин домена и пароль организации.', 'Active Directory sign-in: the domain login and the organisation’s password.'),
      shot('enterprise-settings', 'Настройки: строка «Авторизация» называет корпоративный сервер и показывает, когда вошло это устройство.', 'Settings: the Authorization row names the corporate server and shows when this device signed in.'),
      shot('enterprise-disabled', 'Учётная запись отключена организацией: профиль заблокирован, данные остаются зашифрованными.', 'The account was disabled by the organisation: the profile is locked and the data stays encrypted.'),
    ],
    links: [{ href: 'https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/SYNC_ACCOUNT.md', text: b('Аккаунт, синхронизация и корпоративный вход ↗', 'Account, sync and corporate sign-in ↗') }],
  },
  {
    id: 'hosts', group: 'workspace', title: b('Хосты: добавить, найти, подключиться', 'Hosts: add, find and connect'),
    intro: b('Хост хранит параметры подключения по SSH или RDP. Карточки и список показывают адрес, пользователя и группу.', 'A host stores SSH or RDP connection settings. Cards and list rows show its address, user and group.'),
    steps: [
      b('Откройте «Хосты → Новый хост» и сначала выберите SSH или RDP. Задайте имя, адрес, порт, пользователя и учётные данные. Для SSH доступны наследование из группы и jump-хосты; для RDP — пароль и необязательный домен Windows, порт по умолчанию 3389.', 'Open “Hosts → New host” and first choose SSH or RDP. Enter a name, address, port, username and credential. SSH supports group defaults and jump hosts; RDP uses a password, an optional Windows domain and port 3389 by default.'),
      b('На компьютере в форме нового SSH-хоста нажмите «Импорт». Клиент читает ~/.ssh/known_hosts и /etc/ssh/ssh_known_hosts на Linux/macOS, либо %USERPROFILE%\\\\.ssh\\\\known_hosts на Windows. Просмотрите адреса и отметьте нужные; уже сохранённые подключения исключаются. Пользователя и учётные данные укажите отдельно.', 'On desktop, click Import in the new SSH-host form. It reads ~/.ssh/known_hosts and /etc/ssh/ssh_known_hosts on Linux/macOS, or %USERPROFILE%\\\\.ssh\\\\known_hosts on Windows. Review and select addresses; existing connections are excluded. Supply usernames and credentials separately.'),
      b('Импорт создаёт подключения, но не переносит доверие к ключам. Хешированные имена, шаблоны, отозванные ключи и записи CA пропускаются. При первом подключении проверьте ключ сервера обычным способом.', 'Import creates connections without importing key trust. Hashed names, patterns, revoked keys and CA records are skipped. Verify the server key normally when first connecting.'),
      b("Кнопка «Из ~/.ssh/config» рядом с «Импорт» читает конфигурацию OpenSSH (с Include). Каждая запись Host становится хостом с адресом, портом и пользователем; блоки с масками вроде Host * применяются как значения по умолчанию. Хосты из ProxyJump импортируются вместе с выбранным, а ключи из IdentityFile можно сразу добавить в хранилище — зашифрованный ключ сохраняет свою парольную фразу. ProxyCommand не поддерживается.", "“From ~/.ssh/config”, next to Import, reads your OpenSSH configuration (including Include files). Each Host entry becomes a host with its address, port and user; wildcard blocks such as Host * apply as defaults. ProxyJump hosts are imported with the chosen host, and IdentityFile keys can be added to the vault at once — an encrypted key keeps its passphrase. ProxyCommand is not supported."),
      b('Используйте поиск по именам, адресам, группам и тегам. Переключатель карточки/список меняет представление; карточка группы открывает её содержимое.', 'Search names, addresses, groups and tags. The grid/list toggle changes the view; opening a group card shows its contents.'),
      b('Нажмите в центре карточки хоста или на значок подключения. В зависимости от типа откроется терминал или удалённый рабочий стол.', 'Click the centre of a host card or its connect icon. A terminal or remote desktop tab opens according to the connection type.'),
      b('В меню «…» доступны подключение, SFTP, редактирование, удаление и добавление в существующую группу. «Поделиться…» показывается при поддержке сервером, «Копировать в команду…» и «Переместить в команду…» — если у вас есть команды (глава «Команды»).', 'The “…” menu offers connection, SFTP, editing, deletion and adding to an existing group. “Share…” appears when the server supports it, “Copy to team…” and “Move to team…” when you have teams (see Teams).'),
      b('Форма хоста состоит из карточек. «Аутентификация»: пароль (его можно сохранить в хранилище или вводить при подключении), SSH-ключ (выбрать, создать или импортировать прямо здесь), агент (системный SSH-агент или путь к сокету) либо «Из группы». «Выбрать учётные данные…» назначает уже сохранённые.', 'The host form is made of cards. Authentication: a password (saved in the vault or entered at connect time), an SSH key (pick, generate or import it right here), an agent (the system SSH agent or a socket path) or “Inherit from group”. “Choose credential…” assigns a saved one.'),
      b('«Безопасность»: политика ключа хоста — «Спрашивать» (подтверждать неизвестные ключи), «Строгая» (только ключи из известных хостов) или «Принимать новые» (сохранять неизвестные автоматически); изменённый ключ блокирует подключение всегда. Там же SSH-реализация («Встроенный (russh)» или «Системный OpenSSH (совместимость)» для старых серверов), интервал keepalive и «Проброс агента» — включайте его только для доверенных хостов.', 'Security: the host-key policy — Ask (confirm unknown keys), Strict (only keys from known hosts) or Accept new (save unknown keys automatically); a changed key always blocks the connection. It also holds the SSH implementation (“Built-in (russh)” or “System OpenSSH (compatibility)” for old servers), the keepalive interval and “Agent forwarding” — enable it only for hosts you trust.'),
      b('«Организация» хранит теги и свободные заметки. Внизу формы «Итоговые настройки» показывают, что реально будет использовано при подключении — группа, пользователь, порт, учётные данные и маршрут — и откуда взято каждое значение; там же видны проблемы, например удалённый jump-хост.', 'Organisation holds tags and free-text notes. At the bottom, “Effective settings” show what a connection will actually use — group, user, port, credential and route — and where each value comes from; problems such as a deleted jump host appear there too.'),
    ],
    image: shot('hosts', 'Обзор демонстрационных хостов и их параметров подключения.', 'An overview of demo hosts and their connection details.'),
    images: [
      shot('inventory-production', 'Хосты внутри демонстрационной группы: карточки, поиск и действия подключения.', 'Hosts in a demo group: cards, search and connection actions.'),
      shot('host-menu', 'Меню действий выбранного хоста.', 'The selected host’s action menu.'),
      shot('host-editor', 'Новый SSH-хост: тип подключения, адрес, пользователь, группа и аутентификация.', 'A new SSH host: connection type, address, user, group and authentication.'),
      shot('host-editor-security', 'Карточка «Безопасность»: политика ключа хоста, SSH-реализация, keepalive и проброс агента.', 'The Security card: host-key policy, SSH implementation, keepalive and agent forwarding.'),
      shot('host-effective', '«Итоговые настройки»: что будет использовано при подключении и откуда это взято.', '“Effective settings”: what a connection will use and where it comes from.'),
      shot('host-import', 'Импорт адресов из демонстрационного known_hosts: выбор перед сохранением.', 'Importing addresses from a demo known_hosts: select before saving.'),
      shot('ssh-config-import', 'Импорт из ~/.ssh/config: записи Host с адресами из документационных диапазонов.', 'Importing from ~/.ssh/config: Host entries with documentation-range addresses.'),
    ],
  },
  {
    id: 'rdp', group: 'workspace', keywords: ['RDP', 'Windows', 'clipboard', 'буфер обмена', 'диски', 'folder'],
    title: b('RDP: удалённый рабочий стол Windows', 'RDP: Windows remote desktop'),
    intro: b('Добавлена возможность подключиться к RDP. ConsoleCrypt подключается напрямую к стандартному серверу Microsoft RDP; устанавливать дополнение IronRDP на Windows не нужно.', 'ConsoleCrypt now supports RDP connections. It connects directly to a standard Microsoft RDP server; no IronRDP add-on needs to be installed on Windows.'),
    steps: [
      b('В «Хостах» создайте подключение типа RDP. Укажите адрес, пользователя Windows, пароль и, при необходимости, домен. Пароль можно сохранить в зашифрованном хранилище или вводить при каждом подключении. Настройки SSH-группы не применяются к RDP.', 'In “Hosts”, create an RDP connection. Enter the address, Windows username, password and optional domain. Save the password in the encrypted vault or enter it for each connection. SSH group defaults do not apply to RDP.'),
      b('Перед подключением проверьте адрес, учётную запись и отпечаток сертификата. Сверьте отпечаток с администратором сервера. При изменении данных хоста подтверждение потребуется заново.', 'Before connecting, review the address, account and certificate fingerprint. Compare the fingerprint with the server administrator. Changed host details require a fresh confirmation.'),
      b('В разделе «Удалённый рабочий стол» нажмите кнопку подключения в центре или «+» рядом с вкладками и выберите сохранённый RDP-хост. Открытые рабочие столы находятся в панели вкладок. Переключайтесь между ними, открывайте новые и закрывайте ненужные. Одновременно доступны до четырёх RDP-сеансов.', 'Under “Remote desktop”, use the central connection button or the “+” beside the tabs to choose a saved RDP host. Open desktops appear in the tab strip. Switch between them, open new sessions and close sessions you no longer need. Up to four RDP sessions can run at once.'),
      b('Нажмите «Во весь экран»: рабочий стол займёт весь экран компьютера. Чтобы показать верхнюю панель, наведите указатель на синий индикатор у верхнего края или нажмите Ctrl+Alt+Home. Панель можно закрепить. В ней доступны переключение подключений, разрешения, сворачивание окна, возврат к обычному размеру и закрытие текущего сеанса. Escape передаётся удалённому компьютеру.', 'Click “Full screen” to use the entire screen. Reveal the top connection bar by moving to the blue indicator at the top edge or pressing Ctrl+Alt+Home. Pin the bar if needed. It lets you switch sessions, manage permissions, minimize the window, restore its previous size or disconnect the current session. Escape is sent to the remote computer.'),
      b('Включите обмен текстом для выбранного сеанса. Теперь Ctrl+V (⌘V на macOS) в активном рабочем столе передаёт локальный текст и вставляет его в Windows — предварительно нажимать «Отправить» не нужно. При выключенном обмене Ctrl+V использует буфер самой удалённой Windows.', 'Enable text clipboard access for the selected session. Ctrl+V (⌘V on macOS) in the active desktop now sends and pastes local text into Windows without first clicking “Send”. With sharing disabled, Ctrl+V uses the remote Windows clipboard only.'),
      b('Кнопка «Отправить» передаёт текст без вставки, а «Получить» запрашивает текст из Windows. Изменение локального буфера само по себе ничего не отправляет. Поддерживается текст до 64 КиБ; изображения и файлы через буфер не передаются.', '“Send” offers text without pasting, while “Receive” requests text from Windows. Changing the local clipboard alone does not send anything. Text up to 64 KiB is supported; images and files are not transferred through the clipboard.'),
      b('На macOS, Windows и Linux выберите одну локальную папку в разрешениях сеанса. Дождитесь состояния «Папка подключена» и откройте ConsoleCrypt в разделе перенаправленных дисков Проводника Windows. По умолчанию разрешено только чтение; запись включается отдельно. Другие папки и диски компьютера не предоставляются.', 'On macOS, Windows and Linux, select one local folder in session permissions. Wait for “Folder connected”, then open ConsoleCrypt under redirected drives in Windows File Explorer. Access is read-only by default; enable writing separately. Other local folders and drives are not shared.'),
      b('Если папка не подключилась, проверьте политику перенаправления дисков на Windows-сервере. Рабочий стол продолжает работать независимо от доступа к папке. Замена папки прерывает операции с ранее открытыми файлами.', 'If the folder is unavailable, check the Windows server drive-redirection policy. The desktop remains usable independently of folder access. Replacing the folder interrupts operations on previously opened files.'),
      b('Обмен поддерживает файлы до 256 МиБ и суммарно до 512 МиБ попыток записи за сеанс. После достижения лимита переподключитесь. Символические ссылки, исходные отметки времени и блокировки файлов не переносятся.', 'File exchange supports files up to 256 MiB and up to 512 MiB of attempted writes per session. Reconnect after reaching the limit. Symbolic links, original timestamps and file locks are not transferred.'),
      b('Отключите разрешение на папку или буфер в панели сеанса, когда обмен закончен. Блокировка хранилища и выход закрывают соединения и отзывают временные разрешения.', 'Turn off folder or clipboard access in the session panel when finished. Locking the vault or signing out closes connections and revokes temporary permissions.'),
    ],
    note: b('Перед созданием RDP-хостов обновите все устройства рабочего пространства до версии 0.3 или новее. Старые клиенты не видят RDP-хосты, но могут изменить связанные учётные данные и группы. RDP-хосты синхронизируются между вашими устройствами с актуальной версией клиента. Передача RDP-хоста коллегам пока недоступна. На мобильных устройствах перенаправление папок недоступно. Доступность буфера и диска также зависит от политики Windows-сервера.', 'Before creating RDP hosts, update every workspace device to version 0.3 or later. Older clients cannot see RDP hosts but can change their related credentials and groups. RDP hosts sync between your devices running a current client. Sharing RDP hosts with colleagues is not available yet. Folder redirection is unavailable on mobile. Clipboard and drive availability also depends on Windows server policy.'),
    image: shot('rdp-host-editor', 'Создание RDP-хоста: отдельные поля Windows и сохранение пароля в хранилище. Демонстрационные данные.', 'Creating an RDP host: Windows-specific fields and saving its password in the vault. Demo data.', { width: 1280, height: 860 }),
    images: [shot('rdp-host-picker', 'Выбор сохранённого RDP-хоста из раздела удалённого рабочего стола.', 'Choosing a saved RDP host from Remote desktop.', { width: 1440, height: 900 }), shot('rdp-permissions', 'Разрешения демонстрационного сеанса: текстовый буфер и выбранная папка с отдельным правом записи. Рабочий стол Windows на снимке не отображается.', 'Demo session permissions: text clipboard and a selected folder with a separate write permission. The Windows desktop is not shown.', { width: 1280, height: 860 }), shot('rdp-fullscreen-bar', 'Панель полного экрана: переключение подключения, разрешения и управление окном. Демонстрационные данные.', 'Full-screen connection bar: session switching, permissions and window controls. Demo data.', { width: 680, height: 48 })],
  },
  {
  "id": "rdp-mobile",
  "group": "workspace",
  "keywords": [
    "RDP",
    "Android",
    "iOS",
    "touchpad",
    "тачпад",
    "mouse",
    "мышь",
    "IME",
    "keyboard",
    "клавиатура",
    "drag",
    "перетаскивание",
    "landscape"
  ],
  "title": {
    "ru": "RDP на телефоне: тачпад и клавиатура",
    "en": "RDP on a phone: touchpad and keyboard"
  },
  "intro": {
    "ru": "На телефоне подключённый рабочий стол автоматически открывается на весь экран. По умолчанию включён тачпад: палец двигает курсор относительно его текущего положения. Одна плавающая кнопка открывает управление сеансом.",
    "en": "On a phone, the connected desktop automatically opens fullscreen. Touchpad is the default: your finger moves the pointer relative to its current position. One floating button opens the session controls."
  },
  "table": {
    "headings": [
      {
        "ru": "Жест в режиме тачпада",
        "en": "Touchpad gesture"
      },
      {
        "ru": "Действие",
        "en": "Action"
      }
    ],
    "rows": [
      [
        {
          "ru": "Движение одним пальцем",
          "en": "Move one finger"
        },
        {
          "ru": "Перемещение курсора; палец можно поднимать и переносить.",
          "en": "Move the pointer; lift and reposition your finger as needed."
        }
      ],
      [
        {
          "ru": "Короткое касание",
          "en": "Short tap"
        },
        {
          "ru": "Левый клик в текущей позиции курсора.",
          "en": "Left-click at the current pointer position."
        }
      ],
      [
        {
          "ru": "Два быстрых касания",
          "en": "Two quick taps"
        },
        {
          "ru": "Двойной левый клик.",
          "en": "Double left-click."
        }
      ],
      [
        {
          "ru": "Двойное касание с удержанием второго или удержание около 500 мс",
          "en": "Double-tap and hold the second tap, or hold for about 500 ms"
        },
        {
          "ru": "Начать перетаскивание; отпускание пальца отпускает кнопку мыши.",
          "en": "Start dragging; lifting the finger releases the mouse button."
        }
      ],
      [
        {
          "ru": "Касание двумя пальцами",
          "en": "Two-finger tap"
        },
        {
          "ru": "Правый клик.",
          "en": "Right-click."
        }
      ],
      [
        {
          "ru": "Параллельное движение двух пальцев",
          "en": "Move two fingers together"
        },
        {
          "ru": "Прокрутка без перемещения курсора.",
          "en": "Scroll without moving the pointer."
        }
      ],
      [
        {
          "ru": "Щипок",
          "en": "Pinch"
        },
        {
          "ru": "Масштаб 1–4×; курсор остаётся видимым при перемещении к краю.",
          "en": "Zoom 1–4×; the view follows the pointer near an edge."
        }
      ],
      [
        {
          "ru": "Двойное касание двумя пальцами",
          "en": "Two-finger double tap"
        },
        {
          "ru": "Вписать рабочий стол в экран.",
          "en": "Fit the desktop to the screen."
        }
      ],
      [
        {
          "ru": "Касание тремя пальцами",
          "en": "Three-finger tap"
        },
        {
          "ru": "Открыть или скрыть клавиатуру.",
          "en": "Show or hide the keyboard."
        }
      ]
    ]
  },
  "steps": [
    {
      "ru": "Нажмите плавающую кнопку у края. Откроется сетка плиток: клавиатура, тачпад или прямое касание, специальные клавиши, буфер, сеансы, ориентация и сворачивание. Перетащите кнопку к удобному краю; её положение запоминается отдельно для двух ориентаций.",
      "en": "Tap the floating button at the edge. A grid of tiles opens with the keyboard, touchpad or direct touch, extra keys, clipboard, sessions, orientation and minimize. Drag the button to a convenient edge; its position is remembered separately for both orientations."
    },
    {
      "ru": "В режиме «Касание» нажатие действует под пальцем. Выбранный для хоста режим сохраняется только на этом устройстве. Подключённая мышь работает обычным способом.",
      "en": "In Direct touch mode, a tap acts under your finger. The selected mode for a host is remembered only on this device. An attached mouse works normally."
    },
    {
      "ru": "Клавиатура появляется поверх рабочего стола, не сжимая его. Над ней есть полоса дополнительных клавиш; отдельный лист открывает F1–F12, стрелки и сочетания. Одно касание Ctrl, Alt, Win или Shift действует на следующую клавишу; двойное фиксирует модификатор, следующее отпускает.",
      "en": "The keyboard overlays the desktop without shrinking it. An extra-key strip appears above it; a separate sheet provides F1–F12, arrows and shortcuts. Tap Ctrl, Alt, Win or Shift once for the next key, twice to lock the modifier, then again to release it."
    },
    {
      "ru": "Если клавиатура ещё составляет слово, сначала завершите ввод. До окончания композиции дополнительные клавиши не отправляют команды. Смена сеанса, уход в фон и блокировка отпускают зажатые клавиши и кнопки мыши.",
      "en": "If the keyboard is still composing a word, finish that input first. Extra keys do not send commands during composition. Switching sessions, going into the background and locking release held keys and mouse buttons."
    },
    {
      "ru": "В мобильных настройках RDP выберите скорость и ускорение курсора, его размер, чёткость, масштаб Windows, ориентацию и автоскрытие кнопки. Разрешение подстраивается под экран, если RDP-сервер разрешает изменение размера; иначе сеанс сохраняет прежнее разрешение.",
      "en": "Mobile RDP settings provide pointer speed and acceleration, cursor size, clarity, Windows scale, orientation and button hiding. Resolution follows the screen when the RDP server supports resizing; otherwise the session keeps its existing resolution."
    },
    {
      "ru": "На Android кнопка «Назад» сначала скрывает клавиатуру. Затем она раскрывает управление; повторное нажатие в течение двух секунд сворачивает сеанс без отключения. Можно переключаться между четырьмя сеансами. «Отключить» запрашивает подтверждение.",
      "en": "On Android, Back first hides the keyboard. It then opens the controls; another press within two seconds minimizes without disconnecting. Switch among up to four sessions. Disconnect asks for confirmation."
    }
  ],
  "note": {
    "ru": "На планшете полный экран включается вручную, а автоматический режим выбирает прямое касание. При включённом экранном дикторе используется прямое касание и кнопка не скрывается. Перенаправление папок на телефоне недоступно. Для iOS доступна прежняя предварительная сборка 0.5.6 для Simulator на Mac; выпуск 0.6.3 для iOS отложен. На снимках настоящие виджеты; рабочий стол Windows нарисован синтетически. Пустая область зарезервирована для системной клавиатуры.",
    "en": "Tablets enter fullscreen manually, and automatic mode selects direct touch. With a screen reader enabled, direct touch is used and the button stays visible. Phone folder redirection is unavailable. The earlier iOS 0.5.6 preview is available for Simulator on Mac; iOS 0.6.3 is deferred. Screenshots use real widgets with a drawn, synthetic Windows desktop; the empty area is reserved for the system keyboard."
  },
  "images": [
    {
      "name": "mobile-rdp-portrait-dark",
      "caption": {
        "ru": "Рабочий стол и плавающая кнопка: постоянные панели скрыты.",
        "en": "Desktop and floating button, with permanent panels hidden."
      },
      "width": 780,
      "height": 1688,
      "layout": "phone"
    },
    {
      "name": "mobile-rdp-portrait-controls-dark",
      "caption": {
        "ru": "Меню управления в портретной ориентации.",
        "en": "Session controls in portrait orientation."
      },
      "width": 780,
      "height": 1688,
      "layout": "phone"
    },
    {
      "name": "mobile-rdp-portrait-keyboard-dark",
      "caption": {
        "ru": "Полоса клавиш над зарезервированной областью системной клавиатуры.",
        "en": "Extra-key strip above the reserved system-keyboard area."
      },
      "width": 780,
      "height": 1688,
      "layout": "phone"
    },
    {
      "name": "mobile-rdp-landscape-controls-dark",
      "caption": {
        "ru": "Альбомная ориентация и меню управления.",
        "en": "Landscape orientation and session controls."
      },
      "width": 1688,
      "height": 780
    },
    {
      "name": "mobile-rdp-landscape-keyboard-dark",
      "caption": {
        "ru": "Клавиши в альбомной ориентации; размер рабочего стола сохраняется.",
        "en": "Keys in landscape orientation; the desktop size stays stable."
      },
      "width": 1688,
      "height": 780
    },
    {
      "name": "mobile-rdp-portrait-controls-light",
      "caption": {
        "ru": "Те же элементы управления в светлой теме.",
        "en": "The same controls in the light theme."
      },
      "width": 780,
      "height": 1688,
      "layout": "phone"
    }
  ]
},
  {
    id: 'quick-connect', group: 'workspace', keywords: ['IP', 'SSH', 'Enter', '⌘K', 'Ctrl+K', 'command palette'], title: b('Быстрый поиск и подключение', 'Quick search and connect'),
    intro: b('Найдите сохранённый хост из любой части приложения и сразу откройте SSH- или RDP-сеанс. Палитра команд объединяет поиск хостов, сниппетов и быстрые действия.', 'Find a saved host from anywhere in the app and open an SSH or RDP session. The command palette brings together hosts, snippets and quick actions.'),
    steps: [
      b('В верхней панели круглая кнопка «+» открывает список сохранённых SSH- и RDP-хостов. Найдите хост по имени или адресу и выберите его для подключения. Если нужного хоста ещё нет, нажмите «Новый хост». Поиск занимает свободное место между названием раздела и кнопкой «+»; справа отображается компактный статус «Синх.».', 'In the top bar, the round “+” button opens your saved SSH and RDP hosts. Find a host by name or address and select it to connect. If it is not saved yet, click “New host”. Search fills the available space between the section title and the “+” button; the compact “Sync” status appears on the right.'),
      b('Нажмите ⌘K на macOS или Ctrl+K на Windows/Linux. Начните вводить имя хоста или его IP-адрес; поиск также учитывает адрес и имя пользователя в строке подключения.', 'Press ⌘K on macOS or Ctrl+K on Windows/Linux. Type a host name or IP address; search also matches the address and username shown in its connection label.'),
      b('Смотрите результаты в группе «Хосты». Под названием указаны параметры подключения: проверьте адрес, пользователя и порт перед выбором.', 'Look in the Hosts group. The connection details appear below each name: check the address, username and port before choosing.'),
      b('Выберите результат стрелками ↑ и ↓ и нажмите Enter либо щёлкните по строке. Приложение откроет SSH-терминал или RDP-сеанс в зависимости от типа хоста. При первом подключении проверьте ключ SSH или сертификат RDP.', 'Choose a result with ↑ and ↓, then press Enter or click its row. The app opens an SSH terminal or RDP session according to the host type. On the first connection, verify the SSH host key or RDP certificate.'),
      b('Esc закрывает палитру. Если хост не найден, добавьте его в разделе «Хосты» и повторите поиск.', 'Esc closes the palette. If a host is not found, add it in Hosts and search again.'),
    ],
    note: b('Поиск сохранённых хостов выполняется локально. Если введённое имя или IP-адрес не найдено, Enter не отправляет запрос ИИ. Для ИИ явно нажмите соответствующую строку или выберите её стрелками и подтвердите. Ввод адреса не создаёт новый хост.', 'Saved-host search runs locally. If the entered name or IP address is not found, Enter does not send an AI request. To use AI, explicitly click its row or select it with the arrow keys and confirm. Typing an address does not create a new host.'),
    image: shot('host-palette', 'Локальный поиск сохранённых хостов в палитре команд.', 'Local search for saved hosts in the command palette.'),
    images: [shot('connection-picker', 'Общая кнопка «+»: выбор сохранённых SSH- и RDP-хостов.', 'The global “+”: choosing saved SSH and RDP hosts.', { width: 1440, height: 900 })],
  },
  {
    id: 'groups', group: 'workspace', title: b('Группы и jump-хосты', 'Groups and jump hosts'),
    intro: b('Группы помогают ориентироваться и задавать общие параметры. Цепочка jump-хостов позволяет добраться до SSH-хоста через промежуточные узлы.', 'Groups organize your inventory and provide common settings. A jump-host chain reaches an SSH host through intermediate machines.'),
    steps: [
      b('Откройте «Хосты» в левом меню и нажмите «Новая группа». Хосты и группы находятся в одном каталоге; для окружений и проектов можно создавать вложенные группы.', 'Open “Hosts” in the left menu and click “New group”. Hosts and groups share one inventory; use nested groups for environments and projects.'),
      b('В настройках группы задайте общие имя пользователя, порт, учётные данные и профиль jump-хостов. Значение, заданное на хосте, имеет приоритет над наследованием.', 'Set a group’s common username, port, credential and jump-host profile. A value set directly on a host overrides inheritance.'),
      b('В разделе профилей jump-хостов создайте профиль и выберите существующие хосты в нужном порядке. Назначьте профиль группе или отдельному хосту.', 'Create a jump-host profile and choose existing hosts in the required order. Assign the profile to a group or individual host.'),
      b('В карточке «Jump-хосты» формы хоста выберите «Наследовать / напрямую» (профиль группы, если он есть), «Профиль jump-хостов» или «Своя цепочка». Своя цепочка собирается кнопкой добавления узла из существующих хостов; число узлов не ограничено, а под цепочкой показан итоговый маршрут.', 'In the host form’s Jump hosts card choose “Inherit / direct” (the group’s profile, if any), “Jump profile” or “Custom chain”. A custom chain is built from existing hosts with the add-hop button; there is no limit on hops, and the resulting route is shown below the chain.'),
      b('Перед перемещением или удалением группы проверьте итоговые унаследованные параметры: изменение родителя может изменить подключение.', 'Before moving or deleting a group, check the resulting inherited settings: changing its parent can change the connection.'),
    ],
    note: b('SSH-соединения устанавливает клиент напрямую, включая jump-хосты. Сервер синхронизации не передаёт SSH-трафик. Личная группа и общая коллекция — разные объекты; правила общей коллекции описаны ниже.', 'The client establishes SSH connections directly, including jump hosts. The sync server never relays SSH traffic. A private group and a shared collection are different objects; shared collections are explained below.'),
    image: shot('inventory-groups', 'Демонстрационный каталог групп и навигация внутри рабочего пространства.', 'Demo group inventory and workspace navigation.'),
    images: [
      shot('group-editor', 'Новая группа: название, родитель и параметры по умолчанию для её хостов.', 'A new group: its name, parent and defaults for its hosts.'),
      shot('jump-profiles', 'Профили jump-хостов: именованные цепочки промежуточных узлов.', 'Jump profiles: named chains of intermediate hosts.'),
      shot('host-editor-jump', 'Своя цепочка из двух jump-хостов и итоговый маршрут к хосту.', 'A custom chain of two jump hosts and the resulting route to the host.'),
      shot('host-groups', 'Добавление демонстрационного хоста в существующую группу.', 'Adding a demo host to an existing group.'),
    ],
  },
  {
    id: 'credentials', group: 'workspace', title: b('Пароли, ключи и учётные данные', 'Passwords, keys and credentials'),
    intro: b('Учётные данные хранятся отдельно от хостов: один набор можно назначить нескольким подключениям.', 'Credentials are separate from hosts: one credential can be assigned to multiple connections.'),
    steps: [
      b('В «Учётные данные → Новые учётные данные» выберите тип: пароль, новый SSH-ключ, импорт существующего ключа, SSH-сертификат (приватный ключ и сертификат OpenSSH) или SSH-агент — системный либо внешний по пути к сокету или каналу.', 'In “Credentials → New credential”, choose a type: a password, a new SSH key, an imported key, an SSH certificate (a private key plus its OpenSSH certificate) or an SSH agent — the system one or an external agent by socket or pipe path.'),
      b('Новый ключ создаётся на устройстве как Ed25519, RSA 3072 или RSA 4096; приватная часть сразу попадает в хранилище, а публичный ключ показывается для добавления в authorized_keys. Ключи FIDO2 пока не создаются.', 'A new key is generated on the device as Ed25519, RSA 3072 or RSA 4096; the private part goes straight into the vault and the public key is shown for authorized_keys. FIDO2 keys cannot be created yet.'),
      b('Укажите понятное название. Назначьте учётные данные хосту или группе; для ключа с парольной фразой заполните её отдельно.', 'Use a descriptive name. Assign the credential to a host or group; enter a key passphrase separately when required.'),
      b('Откройте карточку для просмотра метаданных и публичного ключа. Секрет появляется только после явного действия; копирование требует осторожности с буфером обмена.', 'Open its card for metadata and the public key. A secret is revealed only after an explicit action; handle clipboard copies carefully.'),
      b('Скопированный секрет очищается по выбранному таймеру, если буфер не был заменён другим значением. Изменение настройки действует на следующие копирования. Аварийное закрытие приложения и история системного буфера могут помешать удалению.', 'A copied secret is cleared after the selected timeout if the clipboard has not been replaced with another value. Changing the setting affects future copies. An app crash or system clipboard history can prevent removal.'),
    ],
    note: b('Не помещайте пароль или приватный ключ в название хоста, заметки или сниппет. Для передачи секрета коллеге используйте отдельный защищённый процесс «Поделиться», а не ИИ-чат.', 'Do not put a password or private key into a host name, note or snippet. Use the separate protected sharing workflow to share a secret with a colleague, rather than AI chat.'),
    image: shot('credentials', 'Учётные данные в демонстрационном хранилище; значения скрыты.', 'Credentials in a demo vault; values are masked.'),
    images: [
      shot('credential-chooser', 'Выбор типа новых учётных данных.', 'Choosing the type of a new credential.'),
      shot('credential-generate', 'Создание SSH-ключа: название и алгоритм.', 'Generating an SSH key: name and algorithm.'),
    ],
  },
  {
    id: 'host-keys', group: 'workspace', title: b('Известные хосты и проверка SSH-ключа', 'Known hosts and SSH-key verification'),
    intro: b('Ключ сервера подтверждает, к какому SSH-хосту вы подключаетесь. Это отдельная проверка от доверия устройству ConsoleCrypt.', 'A server key identifies the SSH host you are connecting to. This is separate from trusting a ConsoleCrypt device.'),
    steps: [
      b('При первом подключении сверьте отпечаток ключа с администратором или доверенным источником и только затем примите его.', 'On first connection, compare the key fingerprint with the administrator or another trusted source before accepting it.'),
      b('Сохранённые ключи находятся в отдельном боковом разделе «Известные хосты». Проверяйте адрес, алгоритм и отпечаток.', 'Saved keys appear in the separate “Known hosts” sidebar section. Check the address, algorithm and fingerprint.'),
      b('Если ключ изменился, подключение блокируется. Сначала выясните причину; удаляйте старую запись только после независимой проверки нового ключа.', 'If the key changes, connection is blocked. Establish the reason first; remove the old entry only after independently verifying the new key.'),
    ],
    image: shot('known-hosts', 'Отдельный список известных SSH-хостов с демонстрационными отпечатками.', 'A separate known-host list with demo fingerprints.'),
  },
  {
    id: 'terminal', group: 'workspace', title: b('Терминал, вкладки и выделение', 'Terminal, tabs and selection'),
    intro: b('Одна вкладка — одна терминальная сессия: SSH, а на macOS и Windows также локальная оболочка. На телефоне есть панель специальных клавиш, а на компьютере — горячие клавиши и контекстное меню.', 'Each tab is one terminal session: SSH, plus local shells on macOS and Windows. Phones have a special-key bar; computers have shortcuts and a context menu.'),
    steps: [
      b('Нажмите внутри терминала для ввода. Новое подключение открывается кнопкой «+». Когда вкладки не помещаются, прокручивайте полосу колёсиком или стрелками по краям. Рядом со стрелками показано общее число открытых вкладок в скобках.', 'Click inside the terminal to type. The “+” button opens another connection. When tabs overflow, scroll the strip with the mouse wheel or its edge arrows. The total number of open tabs appears in parentheses beside the arrows.'),
      b('Чтобы выделить несколько экранов вывода, удерживайте кнопку мыши и прокручивайте историю колёсиком. Можно вывести указатель за верхний или нижний край терминала: история начнёт прокручиваться автоматически, продолжая выделение.', 'To select several screens of output, hold the mouse button and scroll the history with the wheel. Move the pointer beyond the terminal’s top or bottom edge to scroll automatically while extending the selection.'),
      b('Выделите текст и откройте меню правой кнопкой мыши. Доступны «Копировать», «Вставить», выделение всего, «Спросить ИИ» и сохранение выделенного в сниппет. Shift+F10 открывает меню с клавиатуры.', 'Select text and right-click for the menu. It offers Copy, Paste, Select all, Ask AI and saving the selection as a snippet. Shift+F10 opens it from the keyboard.'),
      b('На телефоне используйте значок клавиатуры и «…» под терминалом. Рядом доступны Esc, Tab, Ctrl+C, Ctrl+D, Ctrl+L и стрелки; полоса прокручивается.', 'On a phone, use the keyboard icon and “…” below the terminal. Esc, Tab, Ctrl+C, Ctrl+D, Ctrl+L and arrows are also available in the scrollable bar.'),
      b('Многострочная вставка и управляющие символы требуют проверки. Проверьте хост и текст до подтверждения; команды после вставки выполняются по вашему действию.', 'Multiline paste and control characters require review. Check the target and text before confirming; execution remains your action.'),
      b("Правый клик по вкладке открывает меню: переименовать, дублировать, закрыть, закрыть другие и вкладки справа. Фоновая вкладка, в которой появился новый вывод, подсвечивается, а в боковом меню рядом с числом вкладок появляется отдельный счётчик таких вкладок. В «Настройки → Терминал» выбираются шрифт (из установленных моноширинных) и подпись вкладки: имя из списка, адрес или имя компьютера, либо ничего.", "Right-click a tab to rename, duplicate, close it, close others or close tabs to the right. A background tab with new output is highlighted, and the sidebar shows a separate count of such tabs next to the tab count. Settings → Terminal sets the font (from installed monospace fonts) and the tab subtitle: the list name, the address or computer name, or nothing."),
      b('При обрыве связи используйте переподключение в баннере вкладки. Буфер вывода сохраняется до закрытия вкладки; закрытие завершает эту сессию.', 'After a disconnect, use reconnect in the tab’s banner. The output buffer stays until the tab closes; closing ends that session.'),
    ],
    note: b('После обновления откройте новую SSH-сессию. Встроенный SSH запрашивает UTF-8 для ввода и удаления кириллицы. Если символы всё ещё искажаются, проверьте UTF-8 локаль удалённого хоста: настройки его оболочки и SSH-сервера могут перекрывать запрос клиента.', 'Open a new SSH session after updating. Built-in SSH requests UTF-8 for entering and deleting Cyrillic text. If characters are still corrupted, check the remote host’s UTF-8 locale: its shell and SSH-server settings can override the client’s request.'),
    images: [shot('terminal-tab-menu', 'Меню вкладки по правому клику: переименовать, дублировать и закрыть.', 'The tab menu on right-click: rename, duplicate and close.'), shot('terminal-settings', '«Настройки → Терминал»: шрифт, размер, цветовая схема и подпись вкладки.', '“Settings → Terminal”: font, size, colour scheme and tab subtitle.'), shot('terminal-selection-scroll', 'Выделение текста в середине истории демонстрационного терминала.', 'Text selected in the middle of the demo terminal’s scrollback history.'), shot('terminal-tabs-overflow', 'Восемь открытых демонстрационных вкладок: навигация по полосе и счётчик.', 'Eight open demo tabs: strip navigation and the tab count.'), shot('mobile-terminal', 'Демонстрационный терминал Android с панелью специальных клавиш.', 'Demo Android terminal with its special-key bar.', {width: 824, height: 1830, layout: 'phone'})],
    image: shot('terminal-menu', 'Контекстное меню над выделением в демонстрационном терминале.', 'Context menu over a selection in the demo terminal.'),
  },
  {
    "id": "local-terminals",
    "group": "workspace",
    "keywords": [
      "zsh",
      "PowerShell",
      "cmd",
      "WSL",
      "PTY",
      "ConPTY",
      "локальный",
      "local shell"
    ],
    "title": {
      "ru": "Локальные терминалы: zsh, PowerShell и WSL",
      "en": "Local terminals: zsh, PowerShell and WSL"
    },
    "intro": {
      "ru": "На macOS и Windows можно открыть оболочку своего компьютера рядом с SSH-вкладками. Она запускается с вашими обычными правами пользователя и не требует сервера синхронизации.",
      "en": "On macOS and Windows you can open a shell on this computer alongside SSH tabs. It runs as your ordinary OS user and does not require a sync server."
    },
    "steps": [
      {"ru": "В палитре Cmd+K / Ctrl+K выберите «Новый локальный терминал». На macOS сразу откроется zsh; на Windows появится выбор PowerShell, cmd и отдельных WSL-дистрибутивов.", "en": "In the Cmd+K / Ctrl+K palette, choose New local terminal. macOS opens zsh immediately; Windows offers PowerShell, cmd and individual WSL distributions."},
      {
        "ru": "Откройте «Терминал» и нажмите кнопку новой вкладки, Cmd+T на macOS или Ctrl+T на Windows. В группе «Локальные оболочки» выберите zsh, Windows PowerShell, Command Prompt либо установленный PowerShell 7. Общая кнопка «+» приложения по-прежнему выбирает SSH/RDP-хосты.",
        "en": "Open Terminal and use its new-tab button, Cmd+T on macOS or Ctrl+T on Windows. Under Local shells choose zsh, Windows PowerShell, Command Prompt or installed PowerShell 7. The app’s global “+” still opens the SSH/RDP host picker."
      },
      {
        "ru": "Каждый установленный WSL-дистрибутив отображается отдельно. Выберите Ubuntu, Debian или другой доступный дистрибутив; можно открыть несколько вкладок одной оболочки. Сам WSL клиент не устанавливает.",
        "en": "Each installed WSL distribution appears separately. Choose Ubuntu, Debian or another available distribution; you can open several tabs for one shell. The client does not install WSL itself."
      },
      {
        "ru": "Проверяйте подпись «Этот компьютер» и имя WSL-дистрибутива, переключаясь между локальной и SSH-вкладкой. Ввод, изменение размера, Ctrl+C и интерактивные программы используют настоящий PTY/ConPTY. SFTP доступен для SSH-хоста, у локальной вкладки этого действия нет.",
        "en": "Check the This computer label and WSL distribution name when switching between local and SSH tabs. Input, resizing, Ctrl+C and interactive programs use a real PTY/ConPTY. SFTP is an SSH-host action and is absent from the local tab."
      },
      {
        "ru": "ИИ получает диалект активной оболочки и только явно выбранный контекст. AI-команды и сниппеты в локальную вкладку можно «Вставить» без Enter; автоматическое выполнение отключено. Проверьте текст и нажмите Enter сами, если хотите его выполнить.",
        "en": "AI receives the active shell dialect and only explicitly selected context. AI commands and snippets can be inserted into a local tab without Enter; automatic execution is disabled. Review the text and press Enter yourself if you want to run it."
      },
      {
        "ru": "Закрытие вкладки завершает её процесс. «Перезапустить оболочку» создаёт новую сессию. Блокировка хранилища, смена профиля и выход закрывают оболочку и её текущую foreground-группу. Отсоединённые фоновые процессы (например, nohup) не разыскиваются; весь WSL-дистрибутив не останавливается.",
        "en": "Closing a tab ends its process. Restart shell starts a new session. Vault lock, profile switch and quit close the shell and its current foreground process group. Detached/background processes such as nohup are not searched for, and the entire WSL distribution is not stopped."
      }
    ],
    "note": {
      "ru": "Локальные оболочки 0.5 доступны на macOS и Windows. Пакет macOS работает без App Sandbox и сохраняет прежние каталоги данных на месте; не удаляйте контейнер 0.4.1, модели, vault или Keychain. При конфликте двух каталогов или ошибке доступа запуск останавливается до создания нового профиля. Снимки ниже — виджеты с синтетическими профилями, не доказательство нативного запуска WSL.",
      "en": "Local shells in 0.5 support macOS and Windows. The macOS package runs without App Sandbox and reuses existing storage in place; keep the 0.4.1 container, models, vault and Keychain. Conflicting or unreadable storage stops startup before creating a new profile. The screenshots below use widgets with synthetic profiles, not a native WSL run."
    },
    "images": [
      {"name": "local-terminal-palette", "caption": {"ru": "Новый локальный терминал в палитре команд.", "en": "New local terminal in the command palette."}, "width": 1440, "height": 900},
      {
        "name": "terminal-local-picker",
        "caption": {
          "ru": "Выбор локальной zsh и SSH-хостов: настоящий интерфейс с демонстрационными профилями.",
          "en": "Choosing local zsh and SSH hosts: real interface with demo profiles."
        },
        "width": 1440,
        "height": 900
      },
      {
        "name": "terminal-local-tabs",
        "caption": {
          "ru": "SSH и локальная zsh рядом. Текст терминала синтетический; пользовательские команды не выполнялись.",
          "en": "SSH and local zsh side by side. Terminal text is synthetic; no user commands ran."
        },
        "width": 1440,
        "height": 900
      },
      {
        "name": "terminal-wsl-picker",
        "caption": {
          "ru": "Windows-вариант выбора PowerShell, cmd и двух WSL-дистрибутивов в widget-тесте на macOS. Оболочки не запускались.",
          "en": "Windows-style picker for PowerShell, cmd and two WSL distributions in a macOS-hosted widget test. No shells ran."
        },
        "width": 1440,
        "height": 900
      }
    ]
  },
  {
    id: 'shortcuts', group: 'workspace', title: b('Горячие клавиши', 'Keyboard shortcuts'),
    intro: b("Основной модификатор — ⌘ на macOS и Ctrl на Windows/Linux. Копирование на Windows не занимает Ctrl+C: эта комбинация прерывает команду. Сочетания приложения можно переназначить в «Настройки → Горячие клавиши»: нажмите «Изменить» и новую комбинацию с ⌘/Ctrl или Alt. Если она занята другой командой, у той сочетание снимется; если её использует система или терминал, появится предупреждение. «Восстановить по умолчанию» возвращает таблицу ниже.", "The main modifier is ⌘ on macOS and Ctrl on Windows/Linux. Copy on Windows does not use Ctrl+C, which interrupts a command. App shortcuts can be remapped in Settings → Keyboard shortcuts: choose Change and press a new combination with ⌘/Ctrl or Alt. If another command has it, that command loses it; if the system or terminal uses it, you are warned. Restore defaults brings back the table below."),
    table: { headings: [b('Действие', 'Action'), b('macOS', 'macOS'), b('Windows / Linux', 'Windows / Linux')], rows: [
      [b('Найти хост, сниппет или действие', 'Find a host, snippet or action'), b('⌘K', '⌘K'), b('Ctrl+K', 'Ctrl+K')],
      [b('Новая вкладка SSH', 'New SSH tab'), b('⌘T', '⌘T'), b('Ctrl+T', 'Ctrl+T')],
      [b('Закрыть активную вкладку', 'Close active tab'), b('⌘W', '⌘W'), b('Ctrl+W', 'Ctrl+W')],
      [b('Новый хост', 'New host'), b('⌘N', '⌘N'), b('Ctrl+N', 'Ctrl+N')],
      [b('Заблокировать хранилище', 'Lock vault'), b('⌘L', '⌘L'), b('Ctrl+L', 'Ctrl+L')],
      [b('Настройки', 'Settings'), b('⌘,', '⌘,'), b('Ctrl+,', 'Ctrl+,')],
      [b('Сниппеты', 'Snippets'), b('⌘.', '⌘.'), b('Ctrl+.', 'Ctrl+.')],
      [b('Копировать в терминале', 'Copy in terminal'), b('⌘C', '⌘C'), b('Ctrl+Shift+C', 'Ctrl+Shift+C')],
      [b('Вставить в терминал', 'Paste in terminal'), b('⌘V', '⌘V'), b('Ctrl+V; в Windows также Shift+Insert', 'Ctrl+V; also Shift+Insert on Windows')],
    ] },
    note: b('Комбинации приложения обрабатываются раньше терминала. Чтобы отправить Ctrl+L удалённой оболочке, на телефоне используйте одноимённую кнопку панели клавиш.', 'Application shortcuts take priority over terminal input. To send Ctrl+L to the remote shell on a phone, use its special-key button.'),
    image: shot('shortcuts-settings', '«Настройки → Горячие клавиши»: каждое действие можно переназначить или вернуть по умолчанию.', '“Settings → Keyboard shortcuts”: every action can be remapped or restored to its default.'),
  },
  {
    id: 'sftp', group: 'workspace', title: b('SFTP: передача и просмотр файлов', 'SFTP: transfers and file preview'),
    intro: b('Откройте SFTP из меню хоста или бокового раздела. Файлы передаются непосредственно между вашим устройством и SSH-хостом.', 'Open SFTP from a host’s menu or the sidebar. Files travel directly between your device and the SSH host.'),
    steps: [
      b('Выберите хост и подключитесь. На компьютере используйте локальную и удалённую панели; на телефоне — переключение области и системный выбор файла.', 'Select a host and connect. On a computer, use the local and remote panes; on a phone, switch areas and use the system file picker.'),
      b('Выделите файл и выберите загрузку или скачивание. Следите за передачами в панели активности; там отображаются ход выполнения и отмена.', 'Select a file and choose upload or download. The activity panel shows transfer progress and cancellation.'),
      b('Для чтения откройте «Быстрый просмотр». Номера строк находятся в отдельной колонке: при выделении и копировании текста они не попадают в буфер.', 'For reading, open “Quick Look”. Line numbers are in a separate gutter and are excluded from text selection and copying.'),
      b('Папка, которую SSH-пользователь не может прочитать, помечается «Нет доступа» вместо пустого списка. Из Docker путь тома или монтирования на SSH-хосте открывается сразу в SFTP.', 'A folder the SSH user cannot read is marked as inaccessible instead of looking empty. From Docker, a volume or mount path on an SSH host opens straight in SFTP.'),
      b('Меню действий (кнопка на панели или правый клик) собирает всё для выбранных файлов: открыть, открыть в программе, быстрый просмотр, скачать, загрузить сюда, новая папка и новый файл, переименовать, дублировать, удалить, «Свойства», скопировать путь или имя и обновить.', 'The actions menu (toolbar button or right-click) gathers everything for the selected files: open, open with, Quick Look, download, upload here, new folder and new file, rename, duplicate, delete, Get Info, copy path or name and refresh.'),
      b('«Свойства» показывают размер, расположение, владельца и права. Права меняются флажками «Чтение», «Запись», «Выполнение» для владельца, группы и остальных или восьмеричным кодом; «Применить» сохраняет их на сервере. Для символической ссылки права относятся к объекту, на который она указывает.', 'Get Info shows the size, location, owner and permissions. Change permissions with the Read, Write and Execute checkboxes for owner, group and others or with an octal code; Apply saves them on the server. For a symbolic link, permissions apply to the item it points to.'),
      b('Путь в верхней строке можно отредактировать или скопировать; поиск фильтрует текущую папку. Колонки, «Сначала папки» и показ скрытых файлов настраиваются в заголовке списка, а неудавшиеся передачи можно повторить из панели активности.', 'The path bar can be edited or copied; search filters the current folder. Columns, “Folders first” and showing hidden files are set in the list header, and failed transfers can be retried from the activity panel.'),
    ],
    images: [
      shot('sftp-actions', 'Меню действий для выбранного файла на демонстрационном хосте.', 'The actions menu for a selected file on a demo host.'),
      shot('sftp-get-info', '«Свойства» файла: размер, владелец и права с восьмеричным кодом.', 'Get Info for a file: size, owner and permissions with the octal code.'),
    ],
    image: shot('sftp-preview', 'Быстрый просмотр демонстрационного файла с отдельной колонкой номеров строк.', 'Quick Look for a demo file with a separate line-number gutter.'),
  },
  {
    id: 'sftp-editor', group: 'workspace', keywords: ['vscode', 'code.exe', 'stfp'], title: b('SFTP: редактор по умолчанию', 'SFTP: default editor'),
    intro: b('На компьютере файл можно открыть во внешнем редакторе. ConsoleCrypt запоминает выбранную программу на этом устройстве.', 'On a computer, files can open in an external editor. ConsoleCrypt remembers the chosen application on that device.'),
    steps: [
      b('В «Настройки → SFTP → Редактор по умолчанию» нажмите «Выбрать программу» и укажите установленный VS Code, Zed или другой редактор.', 'In “Settings → SFTP → Default editor”, choose “Choose Application” and select an installed VS Code, Zed or another editor.'),
      b('Действия «Открыть» и «Открыть в редакторе» используют этот выбор. «Открыть в программе…» позволяет выбрать другую программу для отдельного файла; «Системный редактор» сбрасывает настройку.', '“Open” and “Open in editor” use that choice. “Open with…” selects another application for one file; “System default” resets the preference.'),
      b('Файлы, которые при открытии могли бы выполнить код (скрипты, ярлыки, .exe, .command, .desktop и т. п.), ConsoleCrypt никогда не запускает. «Открыть» сначала предупреждает «Этот файл может выполнить код», затем «Открыть как текст» открывает файл в текстовом редакторе. Если редактор не найден, предлагается «Выбрать редактор…». Загруженные файлы помечаются как полученные из интернета (Windows) и помещаются в карантин (macOS).', 'ConsoleCrypt never runs files whose default action would execute code (scripts, shortcuts, .exe, .command, .desktop and similar). “Open” first warns “This file can run code”, then “Open as Text” opens the file in a text editor. When no editor is found, “Choose an Editor…” is offered. Downloaded files are marked as coming from the Internet (Windows) and quarantined (macOS).'),
      b('Прочитайте предупреждение перед первым открытием: рабочая копия хранится локально, а каждое сохранение загружается на удалённый сервер автоматически.', 'Read the first-use notice: a working copy is stored locally, and each save uploads it to the remote server automatically.'),
      b('При изменении удалённого файла другим пользователем решите конфликт в панели редактирования. Завершите редактирование через ConsoleCrypt, чтобы закончить загрузку и удалить рабочую копию.', 'If another user changes the remote file, resolve the conflict in the editing panel. Stop editing through ConsoleCrypt to complete the upload and remove the working copy.'),
    ],
    note: b('Автосохранение, резервные копии и облачные функции внешнего редактора находятся вне контроля ConsoleCrypt. Эта настройка предназначена для компьютеров; на мобильных платформах работа с файлами зависит от системных возможностей.', 'External-editor autosave, backups and cloud features are outside ConsoleCrypt’s control. This preference is for desktop systems; mobile file handling depends on system capabilities.'),
    image: shot('sftp-settings', 'Локальная настройка запомненного редактора в демонстрационном клиенте.', 'The remembered-editor local preference in the demo client.'),
    images: [shot('sftp-open-as-text', '«Открыть» для скрипта: файл откроется как текст и не будет запущен.', 'Open on a script: the file opens as text and never runs.')],
  },
  {
    id: 'tunnels', group: 'workspace', title: b('SSH-туннели', 'SSH tunnels'),
    intro: b('Туннель использует SSH-соединение к выбранному хосту. Есть локальное перенаправление, удалённое перенаправление и динамический SOCKS5.', 'A tunnel uses an SSH connection to the chosen host. Local forwarding, remote forwarding and dynamic SOCKS5 are available.'),
    steps: [
      b('Откройте «Туннели» и создайте туннель. Выберите хост, тип, адрес и порт прослушивания; для локального или удалённого типа задайте целевой адрес и порт.', 'Open “Tunnels” and create one. Select the host, type, listening address and port; for local or remote forwarding, specify a destination address and port.'),
      b('Предпочитайте 127.0.0.1 для локального сервиса, который нужен только вам. При адресе не из loopback (например, 0.0.0.0) форма показывает предупреждение «Привязка не к loopback-интерфейсу», и сохранить туннель можно только после отметки «Я понимаю, что этот туннель доступен из сети». Для удалённого перенаправления такой адрес работает, только если на SSH-сервере разрешён GatewayPorts.', 'Prefer 127.0.0.1 for a local service needed only by you. A non-loopback address (such as 0.0.0.0) shows a “Not bound to loopback” warning, and the tunnel can be saved only after ticking “I understand this tunnel is reachable from the network”. For remote forwarding such an address works only if the SSH server allows GatewayPorts.'),
      b('Запустите туннель переключателем и проверьте его состояние: строка показывает число активных соединений и время работы, а при ошибке — её причину. После завершения работы остановите его. «Запускать автоматически после разблокировки» поднимает туннель при каждом открытии хранилища на этом устройстве.', 'Start the tunnel with its switch and check its status: the row shows active connections and uptime, or the reason after an error. Stop it when finished. “Start automatically after unlock” brings the tunnel up every time the vault is unlocked on this device.'),
    ],
    note: b('Определение туннеля может синхронизироваться вместе с хранилищем; запущенный туннель работает на конкретном устройстве. На телефоне работа в фоне зависит от ограничений ОС.', 'A tunnel definition can sync with the vault; a running tunnel belongs to the device where it was started. On phones, background operation depends on OS restrictions.'),
    image: shot('tunnels', 'Демонстрационные определения туннелей и их состояния.', 'Demo tunnel definitions and statuses.'),
    images: [shot('tunnel-editor', 'Удалённое перенаправление на 0.0.0.0: предупреждение и обязательное подтверждение.', 'Remote forwarding on 0.0.0.0: the warning and the required acknowledgement.')],
  },
  {
    id: 'snippets', group: 'workspace', title: b('Сниппеты, переменные и базовые наборы', 'Snippets, variables and starter sets'),
    intro: b('Сниппет — сохранённая команда или шаблон. Откройте инструмент значком </> справа или горячей клавишей.', 'A snippet is a saved command or template. Open the tool with the </> icon on the right or its shortcut.'),
    steps: [
      b('Нажмите «Новый сниппет», укажите имя, команду, тип, теги и при необходимости набор. В шаблоне используйте переменные вида {{service}}: для каждой можно задать описание и значение по умолчанию.', 'Choose “New snippet” and enter its name, command, type, tags and optional set. Use variables such as {{service}} in the template; each can have a description and a default value.'),
      b('Уровень риска — «Только чтение», «Изменяющая», «Разрушительная» или «Неизвестно» — решает, как строго подтверждается запуск: изменяющие и разрушительные команды выполняются только после отметки, что вы проверили команду. Для хостов команды с политикой «Спрашивать перед опасными командами» отметка нужна всегда.', 'The risk level — Read-only, Modifying, Destructive or Unknown — decides how strictly a run is confirmed: modifying and destructive commands run only after you tick that you checked the command. On team hosts with the “Ask before running risky commands” policy the tick is always required.'),
      b('«Базовые наборы» предлагает «Диагностика Linux», Docker, Kubernetes и наборы для баз данных: SQL · PostgreSQL, SQL · MySQL/MariaDB и SQL · ClickHouse (по 20 запросов), Redis и MongoDB (по 15) — активные и долгие запросы, блокировки, размеры, индексы, репликация и тяжёлые запросы. Добавляйте нужные наборы явно; команды становятся обычными объектами вашего хранилища.', '“Starter packages” offers Linux diagnostics, Docker, Kubernetes and database sets: SQL · PostgreSQL, SQL · MySQL/MariaDB and SQL · ClickHouse (20 queries each), Redis and MongoDB (15 each) — active and long-running queries, locks, sizes, indexes, replication and top queries. Add the sets explicitly; their commands become ordinary vault objects.'),
      b('Сниппеты баз данных выполняются и внутри psql, mysql, clickhouse-client, redis-cli и mongosh в SSH-сессии: многострочный запрос уходит одной вставкой, а изменяющие команды требуют подтверждения.', 'Database snippets also run inside psql, mysql, clickhouse-client, redis-cli and mongosh in an SSH session: a multi-line query is sent as one paste, and changing commands need confirmation.'),
      b('Редактируйте, переносите в другой набор или удаляйте команды. Удаление набора удаляет его сниппеты после подтверждения и синхронизируется; примеры не возвращаются сами.', 'Edit commands, move them to another set or delete them. Deleting a set deletes its snippets after confirmation and syncs the change; examples do not reappear automatically.'),
      b('Перед использованием заполните переменные и проверьте итоговую команду: окно переменных показывает её предпросмотр. «Вставить» вставляет её в терминал без Enter; «Запустить» открывает подтверждение с хостом, командой и уровнем риска. «Запустить в нескольких терминалах…» из меню сниппета выполняет команду в выбранных открытых вкладках терминала после отдельного подтверждения.', 'Fill variables and inspect the rendered command before using it: the variables dialog shows a preview. “Insert” puts it in the terminal without Enter; “Run” opens a confirmation with the host, the command and the risk level. “Run in multiple terminals…” in the snippet menu runs the command in the open terminal tabs you select after a separate confirmation.'),
    ],
    note: b('Изменения сниппетов синхронизируются в профиле с сервером. В локальном профиле они остаются локально. Полученный от коллеги сниппет также не выполняется автоматически.', 'Snippet changes sync in a server-connected profile. They stay local in a local profile. A snippet received from a colleague never executes automatically either.'),
    images: [
      shot('snippets-editor', 'Редактор сниппета: шаблон с переменными, их значения по умолчанию и уровень риска.', 'The snippet editor: a template with variables, their defaults and the risk level.'),
      shot('snippets-variables', 'Перед запуском: значения переменных и предпросмотр итоговой команды.', 'Before running: variable values and a preview of the final command.'),
      shot('snippets-run-confirm', 'Подтверждение разрушительной команды: хост, команда и обязательная отметка.', 'Confirming a destructive command: the host, the command and the required tick.'),
      shot('snippet-packages', 'Фильтрация и управление наборами сниппетов.', 'Filtering and managing snippet sets.'),
    ],
    image: shot('snippet-catalog', 'Базовые наборы: Linux, Docker, Kubernetes и наборы для баз данных.', 'Starter packages: Linux, Docker, Kubernetes and the database sets.'),
  },
  {
    id: 'ai', group: 'workspace', title: b('ИИ-чат и отправляемый контекст', 'AI chat and the context you send'),
    images: [
      shot('ai-providers', '«Настройки → ИИ-провайдеры»: локальные и удалённый провайдеры, провайдер по умолчанию и приватность по умолчанию.', '“Settings → AI providers”: local and remote providers, the default provider and default privacy.'),
      shot('ai-provider-dialog', 'Добавление провайдера: адрес, модель, ключ API в хранилище и профиль приватности.', 'Adding a provider: address, model, an API key kept in the vault and the privacy profile.'),
    ],
    intro: b('Вы сами выбираете провайдера, контекст и последующее действие. Ответ модели не запускает команды.', 'You choose the provider, context and subsequent action. A model’s answer does not execute commands.'),
    steps: [
      b('В «Настройки → ИИ-провайдеры» нажмите «Добавить провайдера»: выберите тип, адрес, модель и при необходимости ключ API (он хранится в хранилище), затем «Сохранить и проверить». Один провайдер отмечается как используемый по умолчанию. Для удалённого провайдера проверьте адрес и его политику обработки данных.', 'In “Settings → AI providers”, choose “Add provider”: pick the type, address, model and, if needed, an API key (kept in the vault), then “Save & test”. One provider is marked as the default. For a remote provider, check its address and data-handling policy.'),
      b('«Приватность по умолчанию» задаёт профиль скрытия данных; в окне провайдера можно выбрать свой профиль для конкретного провайдера.', '“Default privacy” sets the redaction profile; the provider dialog can set a different profile for that provider.'),
      b('«Строгий» профиль скрывает секреты, адреса, имена хостов, пользователей и БД. «Стандартный» сохраняет метаданные хостов; «Локальный» даёт больше контекста, продолжая скрывать секреты.', 'The Strict profile hides secrets, addresses, hostnames, usernames and database names. Standard keeps host metadata; Local provides more context while still hiding secrets.'),
      b('Выделите нужный текст терминала и выберите «Спросить ИИ» либо включите добавление выделения в чате. Проверьте контекст перед «Отправить»; не вставляйте секреты в свободный текст.', 'Select the required terminal text and choose “Ask AI”, or enable attaching the selection in chat. Review the context before Send; do not paste secrets into free text.'),
      b('Перед «Вставить» или «Выполнить…» проверьте предложенную команду и целевой хост. Для исполнения приложение запрашивает подтверждение; оцените команду самостоятельно.', 'Before “Insert” or “Execute…”, review the proposed command and target host. Execution requires confirmation; assess the command yourself.'),
      b("Ответы отображают Markdown: заголовки, списки, выделение и код; команды из блоков кода показываются карточками с действиями. Значок внизу бокового меню показывает, кто отвечает по умолчанию: встроенная модель (чип), локальный сервер (сервер) или облачный API (глобус); по нажатию открываются настройки. Чип зелёный, только пока встроенная модель действительно работает: при запуске он синий, при ошибке красный, а не запущенная модель показана серым — она стартует с первым запросом.", "Answers render Markdown: headings, lists, emphasis and code; commands in code blocks appear as cards with actions. The icon at the bottom of the sidebar shows who answers by default: the built-in model (chip), a local server (server) or a cloud API (globe); clicking it opens Settings. The chip is green only while the built-in model is actually running: blue while it starts, red after an error and grey when it is not running yet; it starts with the first request."),
    ],
    note: b('Подсистема ИИ не имеет API к парольной фразе и приватным ключам хранилища. Текущий чат хранится в памяти сессии: не рассчитывайте на сохранение или синхронизацию переписки. Блокировка хранилища или смена профиля очищает чат и отменяет текущий ответ; уже отправленный провайдеру контекст этим не удаляется.', 'The AI subsystem has no API access to the vault passphrase or private keys. The current chat is held in session memory: do not rely on conversation persistence or sync. Locking the vault or switching profiles clears the chat and cancels the current response; this does not erase context already sent to the provider.'),
    image: shot('workspace-ai-selection', 'ИИ-чат с выбранным контекстом демонстрационного терминала.', 'AI chat with selected context from the demo terminal.'),
  },
  {
    "id": "local-ai",
    "group": "workspace",
    "keywords": [
      "AI",
      "ИИ",
      "Qwen",
      "llama.cpp",
      "offline",
      "локальный",
      "Metal",
      "CPU",
      "RAM"
    ],
    "title": {
      "ru": "Локальный ИИ: три модели и обновление",
      "en": "Local AI: three models and upgrades"
    },
    "intro": {
      "ru": "На macOS и Windows модель отвечает на вашем компьютере. Можно выбрать лёгкую Qwen2.5-Coder 1.5B, среднюю Qwen3.5 4B или мощную Qwen3.5 9B; уже скачанные модели сохраняются при обновлении.",
      "en": "On macOS and Windows, the model answers on your computer. Choose Light Qwen2.5-Coder 1.5B, Medium Qwen3.5 4B or Strong Qwen3.5 9B and preserves downloaded models across updates."
    },
    "table": {
      "headings": [
        {
          "ru": "Вариант",
          "en": "Tier"
        },
        {
          "ru": "Модель и загрузка",
          "en": "Model and download"
        },
        {
          "ru": "Общая ОЗУ: ориентир",
          "en": "Total RAM guidance"
        }
      ],
      "rows": [
        [
          {
            "ru": "Лёгкая",
            "en": "Light"
          },
          {
            "ru": "Qwen2.5-Coder 1.5B Q4_K_M · 1,1 ГБ",
            "en": "Qwen2.5-Coder 1.5B Q4_K_M · 1.1 GB"
          },
          {
            "ru": "4 ГиБ",
            "en": "4 GiB"
          }
        ],
        [
          {
            "ru": "Средняя",
            "en": "Medium"
          },
          {
            "ru": "Qwen3.5 4B Q4_K_M · 2,7 ГБ",
            "en": "Qwen3.5 4B Q4_K_M · 2.7 GB"
          },
          {
            "ru": "8 ГиБ",
            "en": "8 GiB"
          }
        ],
        [
          {
            "ru": "Тяжёлая",
            "en": "Heavy"
          },
          {
            "ru": "Qwen3.5 9B Q4_K_M · 5,7 ГБ",
            "en": "Qwen3.5 9B Q4_K_M · 5.7 GB"
          },
          {
            "ru": "16 ГиБ",
            "en": "16 GiB"
          }
        ]
      ]
    },
    "steps": [
      {
        "ru": "В настройках откройте «Встроенный локальный ИИ» и выберите модель. Звезда рекомендует вариант по общей памяти компьютера, но не меняет выбор автоматически. При неизвестном объёме или менее 4 ГиБ звезды нет. ОЗУ — ориентир, а не обещание скорости.",
        "en": "In Settings, open Built-in local AI and select a model. The star recommends a tier based on total system RAM but never changes your choice automatically. Unknown RAM or less than 4 GiB shows no star. RAM guidance is not a speed guarantee."
      },
      {
        "ru": "Нажмите «Установить локальный ИИ». Файлы проверяются по размеру и SHA-256; прогресс виден, загрузку можно отменить и продолжить. В Windows отдельно устанавливается движок; macOS включает небольшой движок в пакет. Большие файлы моделей не входят в установщик приложения.",
        "en": "Choose Install local AI. Files are checked by exact size and SHA-256; progress is visible and downloads can be cancelled and resumed. Windows installs a separate runtime; macOS includes the small runtime in its package. Large model files are not bundled in the app installer."
      },
      {
        "ru": "Флажок «Использовать по умолчанию после установки» хранится только на этом устройстве. Снятие возвращает обычный выбор провайдера. После установки локальной модели при включённом default выбор другой, ещё не скачанной модели приводит к предложению установить её без незаметной отправки запроса в облако.",
        "en": "Use by default after installation is saved only on this device. Turning it off returns to your usual provider. After a local model is installed with local default enabled, selecting another model that is not downloaded asks for installation instead of silently sending the request to the cloud."
      },
      {
        "ru": "Смена модели останавливает текущий процесс и сохраняет остальные GGUF-файлы. «Удалить» удаляет только выбранную модель и её частичные загрузки. Обновление или ремонт движка повторно использует проверенную модель; прежний Qwen2.5-Coder 1.5B и настройки default сохраняются.",
        "en": "Switching models stops the current process and retains the other GGUF files. Remove deletes only the selected model and its partial downloads. Updating or repairing the runtime reuses a verified model; the original Qwen2.5-Coder 1.5B and default preference are preserved."
      },
      {
        "ru": "Модель запускается при первом запросе либо кнопкой запуска. После 15 минут без запросов, блокировки vault, смены профиля или выхода процесс останавливается. Apple Silicon использует Metal; Intel Mac и Windows x64 — CPU. На Linux и мобильных платформах встроенная установка недоступна.",
        "en": "The model starts on the first request or with Start. It stops after 15 idle minutes, vault lock, profile switch or quit. Apple Silicon uses Metal; Intel Mac and Windows x64 use CPU. Built-in installation is unavailable on Linux and mobile platforms."
      },
      {
        "ru": "Откройте «Источники и лицензии моделей»: 1.5B опубликована Qwen, версии 4B/9B — GGUF-квантования Qwen от Unsloth; все три используют Apache-2.0. Лицензионный текст доступен без интернета.",
        "en": "Open Model sources and licenses: Qwen publishes the 1.5B GGUF, and Unsloth provides GGUF quantizations of Qwen 4B/9B; all three use Apache-2.0. License text is available offline."
      }
    ],
    "note": {
      "ru": "Локальный запрос идёт только на 127.0.0.1 со случайным токеном; фильтрация контекста сохраняется. В локальном терминале AI-команда вставляется без Enter и выполняется вами вручную после проверки. На macOS не удаляйте прежний контейнер данных при обновлении 0.4.1 → 0.5: профиль и модель используются на месте. Снимки показывают синтетические состояния, не реальную загрузку или скорость ответов.",
      "en": "Local requests use only 127.0.0.1 with a random token; context filtering remains active. In local terminals, AI commands are inserted without Enter and executed manually after your review. On macOS, keep the previous data container when upgrading 0.4.1 to 0.5: the profile and model are reused in place. Screenshots show synthetic states, not real downloads or response speeds."
    },
    "images": [
      {
        "name": "local-ai-catalog",
        "caption": {
          "ru": "Три модели, размеры и ориентиры ОЗУ. Звезда 9B рассчитана для демонстрационных 16 ГиБ, а не измерена на пользовательском компьютере.",
          "en": "Three models, sizes and RAM guidance. The 9B star uses synthetic 16 GiB hardware, not a measurement of the user’s computer."
        },
        "width": 1440,
        "height": 900
      },
      {
        "name": "local-ai-install",
        "caption": {
          "ru": "Выбор локальной модели и настройка default. Демонстрационный профиль.",
          "en": "Local model selection and the default preference. Demo profile."
        },
        "width": 1440,
        "height": 900
      },
      {
        "name": "local-ai-progress",
        "caption": {
          "ru": "Индикатор загрузки и проверки с отменой; прогресс синтетический.",
          "en": "Download and verification progress with cancellation; progress is synthetic."
        },
        "width": 1440,
        "height": 900
      },
      {
        "name": "local-ai-ready",
        "caption": {
          "ru": "Готовая выбранная модель и действия остановки и удаления; состояние процесса демонстрационное.",
          "en": "The selected model is ready with stop and remove actions; the process state is simulated."
        },
        "width": 1440,
        "height": 900
      }
    ]
  },
  {
    id: 'notes', group: 'workspace', title: b('Заметки, задачи и напоминания', 'Notes, tasks and reminders'),
    keywords: ['заметки', 'notes', 'задачи', 'tasks', 'напоминание', 'reminder', 'Markdown', 'TODO'],
    intro: b('«Заметки» — инструмент правой панели рядом со «Сниппетами» и «ИИ». Он открывается значком заметки, из палитры команд и из шапки на телефоне. Заметки шифруются на устройстве и синхронизируются вместе с хранилищем.', 'Notes is a right-panel tool next to Snippets and AI. Open it with the note icon, from the command palette or from the phone header. Notes are encrypted on the device and sync with the vault.'),
    steps: [
      b('Вкладка «Объект» показывает заметки к тому, что открыто сейчас: SSH-хосту активной вкладки терминала, RDP-хосту, хосту SFTP, подключению к базе данных, ресурсу или контексту Kubernetes, выбранному Docker-контейнеру. «+» создаёт заметку, уже привязанную к этому объекту.', 'The Object tab shows notes about what is open now: the SSH host of the active terminal tab, the RDP host, the SFTP host, the database connection, the Kubernetes resource or context, the selected Docker container. “+” creates a note already attached to that object.'),
      b('«Все» показывает все заметки и к чему они привязаны, «Задачи» — только задачи: просроченные выше и выделены, выполненные собраны отдельно. Поиск ищет по заголовку, тексту и меткам.', '“All” lists every note and what it is attached to; “Tasks” lists only tasks, with overdue ones first and highlighted, and completed ones grouped separately. Search covers titles, text and tags.'),
      b('Текст пишется в Markdown, вкладка «Просмотр» показывает результат. Добавьте метки через запятую или закрепите заметку из её меню. Переключатель «Задача» добавляет срок и отметку «Выполнено».', 'Write the text in Markdown; the Preview tab shows the result. Add comma-separated tags or pin a note from its menu. The Task switch adds a due time and a Done mark.'),
      b('«Напоминание» предлагает «Через час», «Сегодня в 18:00», «Завтра в 09:00», «Через неделю» или своё время. Пока приложение открыто, в срок появляется уведомление с кнопкой «Открыть»; число просроченных задач и сработавших напоминаний видно на значке «Заметок».', 'Reminder offers in an hour, today at 18:00, tomorrow at 09:00, in a week or a time of your choice. While the app is open a notice with Open appears on time; the Notes icon counts overdue tasks and reminders that went off.'),
      b('Текст из поля «Заметки» карточки хоста можно перенести в обычную заметку кнопкой «Перенести в заметки». Удаление хоста или базы заметки не удаляет: у них появляется пометка «Объект не найден».', 'The host card’s free-text notes move into a regular note with “Move to notes”. Deleting a host or database keeps its notes, marked “Object not found”.'),
    ],
    note: b('Системных уведомлений при закрытом приложении пока нет: напоминание сработает, когда приложение снова будет открыто.', 'There are no system notifications while the app is closed yet: a reminder fires when the app is open again.'),
    image: shot('notes-object', 'Заметки к SSH-хосту активной вкладки: просроченная задача, заметка с меткой и общие заметки хоста; все данные демонстрационные.', 'Notes about the SSH host of the active tab: an overdue task, a tagged note and the host’s shared notes; all data is demo data.'),
    images: [
      shot('notes-tasks', 'Вкладка «Задачи»: просроченные выше, у каждой задачи срок, напоминание и привязка.', 'The Tasks tab: overdue first, each task with its due time, reminder and attachment.'),
      shot('notes-editor', 'Задача с Markdown, меткой, сроком и напоминанием.', 'A task with Markdown, a tag, a due time and a reminder.'),
    ],
  },
  {
    id: 'teams', group: 'collaboration', title: b('Команды', 'Teams'),
    keywords: ['команда', 'team', 'участники', 'members', 'роль', 'role', 'владелец', 'owner', 'администратор', 'admin', 'редактор', 'editor', 'наблюдатель', 'viewer', 'приглашение', 'invitation', 'код', 'code', 'цвет', 'colour', 'color', 'политики', 'policies', 'смена ключа', 'key rotation', 'Личное', 'Personal'],
    intro: b('Команда — общее хранилище нескольких аккаунтов на одном сервере. Её хосты, группы, учётные данные и сниппеты видят все участники, а роль решает, кто может их менять. Названия, настройки и ресурсы команды зашифрованы сквозным шифрованием: сервер видит только состав участников. Команды доступны в профиле с синхронизацией на сервере 0.2.1 и новее (публичный sync.consolecrypt.dev их поддерживает); в локальном профиле раздела «Команды» нет.', 'A team is a vault shared by several accounts on the same server. All members see its hosts, groups, credentials and snippets; roles decide who may change them. Team names, settings and resources are end-to-end encrypted: the server only sees who is a member. Teams are available in a synced profile on server 0.2.1 or later (public sync.consolecrypt.dev supports them); a local profile has no Teams section.'),
    steps: [
      b('Откройте «Настройки → Команды». Здесь собраны ваши команды с ролью и числом участников, входящие приглашения и кнопки «Создать команду» и «Обновить». Нажмите на команду, чтобы открыть её окно.', 'Open “Settings → Teams”. It lists your teams with your role and the member count, incoming invitations and the “Create team” and Refresh buttons. Click a team to open its window.'),
      b('«Создать команду»: задайте название, описание и цвет из палитры или «Свой…». Создатель становится владельцем, команда появляется на всех ваших устройствах после разблокировки. Если сервер требует подтверждения почты, сначала подтвердите адрес.', '“Create team”: set a name, a description and a colour from the palette or “Custom…”. The creator becomes the owner, and the team appears on all your devices after they unlock. If the server requires a verified email, verify your address first.'),
      b('На вкладке «Участники» нажмите «Пригласить участника»: укажите почту, роль и, при желании, комментарий. Комментарий не шифруется — сервер может его прочитать. Сервер не сообщает, есть ли такой аккаунт; письмо уходит, только если аккаунт существует и на сервере настроена почта. Приглашение действует 7 дней, ожидающие приглашения можно отменить.', 'On “Members”, choose “Invite member”: enter the email, the role and, optionally, a note. The note is not encrypted — the server can read it. The server does not reveal whether such an account exists; an email is sent only if the account exists and the server has mail configured. An invitation is valid for 7 days; pending invitations can be cancelled.'),
      b('Приглашённый видит приглашение в «Настройки → Команды» и нажимает «Принять» (или «Отклонить»). Появляется код из 6 групп по 5 цифр — его нужно продиктовать администратору лично, по телефону или в мессенджере.', 'The invitee sees the invitation in “Settings → Teams” and chooses Accept (or Decline). A code of 6 groups of 5 digits appears — read it to the admin in person, by phone or in a messenger.'),
      b('У администратора в окне команды появляется «… принял(а) приглашение» и кнопка «Сверить код». Сравните все группы с экраном коллеги, отметьте совпадение и нажмите «Добавить в команду». Если коды различаются, нажмите «Коды не совпадают»: никто не будет добавлен, а приглашение отклоняется.', 'The admin’s team window shows “… accepted the invitation” with “Compare code”. Compare every group with your colleague’s screen, tick the confirmation and choose “Add to team”. If the codes differ, choose “Codes don’t match”: nobody is added and the invitation is rejected.'),
      b('Роли: «Владелец» один, он может назначать администраторов и передавать владение («Сделать владельцем»). «Администратор» приглашает редакторов и наблюдателей, меняет их роли, удаляет участников и меняет настройки. «Редактор» меняет ресурсы, «Наблюдатель» только просматривает и подключается — у его команды в списках пометка «Только чтение».', 'Roles: there is one Owner, who can appoint admins and hand over ownership (“Make owner”). An Admin invites editors and viewers, changes their roles, removes members and edits settings. An Editor changes resources; a Viewer only views and connects, and their team is marked “Read only” in lists.'),
      b('В разделе «Хосты» слева появляются «Личное» и каждая команда со своим цветом и числом хостов; у хостов команды в списке есть цветная метка. В разделе команды «Новая группа команды» создаёт группу в команде: всё, что создано в группе команды, принадлежит команде.', 'In Hosts, the sidebar shows Personal and each team with its colour and host count; team hosts carry a coloured label in lists. In a team section, “New team group” creates a group inside the team: everything created in a team group belongs to the team.'),
      b('Меню «…» хоста предлагает «Копировать в команду…» и «Переместить в команду…» (в команды, где вы можете редактировать), а для хоста команды — «Переместить в личное». Нужные хосту учётные данные копируются вместе с ним. Вкладки терминала хостов команды отмечены полоской её цвета.', 'A host’s “…” menu offers “Copy to team…” and “Move to team…” (into teams you can edit), and “Move to personal” for a team host. The credentials the host needs are copied along. Terminal tabs of team hosts carry a stripe in the team colour.'),
      b('Вкладка «Настройки» команды: название, описание, цвет и политики. «Отмечать новые контексты Kubernetes и базы данных как рабочие (прод)» — новые подключения команды сразу считаются продом. «Не отправлять эти ресурсы ИИ-помощникам» — ресурсы команды не попадают в контекст ИИ. «Спрашивать перед опасными командами» — команды из сниппетов и ИИ на хостах команды выполняются только после отметки «Я проверил(а) эту команду…», даже если они только читают; текст, набранный в терминале вручную, не проверяется. Настройки меняют владелец и администраторы, остальные видят их только для чтения.', 'The team’s Settings tab holds the name, description, colour and policies. “Mark new Kubernetes contexts and databases as production” makes the team’s new connections production right away. “Never send these resources to AI assistants” keeps team resources out of AI context. “Ask before running risky commands” runs snippet and AI commands on team hosts only after ticking “I checked this command…”, even read-only ones; text you type into the terminal yourself is not checked. Owners and admins change settings; everyone else sees them read-only.'),
      b('«Мой цвет для этой команды» меняет цвет только на ваших устройствах. «Покинуть команду» доступно всем, кроме владельца (сначала передайте владение). «Сменить ключ» вручную выпускает ключ нового поколения; номер поколения показан внизу вкладки.', '“My colour for this team” changes the colour on your devices only. “Leave team” is available to everyone except the owner (hand over ownership first). “Rotate key” issues a new key generation manually; the generation number is shown at the bottom of the tab.'),
      b('Когда участник уходит или его удаляют, ключ команды меняется: новые ресурсы шифруются ключом нового поколения, и бывший участник их не прочитает. Если смена ключа ещё нужна, у администратора появляется пометка и предупреждение со «Сменить ключ». Вкладка «История» показывает подписанный журнал: кто, когда и кого добавил, удалил, повысил, передал владение или сменил ключ.', 'When a member leaves or is removed, the team key is rotated: new resources are encrypted with the next key generation and the former member cannot read them. If a rotation is still due, admins see a badge and a warning with “Rotate key”. The History tab shows the signed log: who added, removed or promoted whom, handed over ownership or rotated the key, and when.'),
    ],
    table: { headings: [b('Ограничение сервера', 'Server limit'), b('По умолчанию', 'Default')], rows: [
      [b('Команд на один аккаунт', 'Teams per account'), b('50 (CC_MAX_TEAMS_PER_ACCOUNT)', '50 (CC_MAX_TEAMS_PER_ACCOUNT)')],
      [b('Участников в команде', 'Members per team'), b('200 (CC_MAX_TEAM_MEMBERS)', '200 (CC_MAX_TEAM_MEMBERS)')],
      [b('Срок приглашения', 'Invitation lifetime'), b('7 дней', '7 days')],
      [b('Приглашений от команды', 'Invitations per team'), b('не больше 20 в час', 'at most 20 per hour')],
    ] },
    note: b('Каждое изменение состава подписывает администратор, и каждый клиент проверяет весь журнал сам. Если сервер покажет участника, которого никто не подписывал, или вернёт более старый состав, команда встанет на паузу «только чтение» с предупреждением, а ключи никому не будут переданы. Удалённый участник сохраняет только то, что уже успел скачать. Политика «Очищать скопированные секреты через» сохраняется в настройках команды, но клиент 0.9.1 очищает буфер обмена по локальной настройке «Безопасность».', 'Every membership change is signed by an admin, and every client verifies the whole log itself. If the server shows a member nobody signed, or an older membership, the team is paused read-only with a warning and no keys are handed out. A removed member keeps only what they had already downloaded. The “Clear copied secrets after” policy is saved in the team settings, but client 0.9.1 clears the clipboard according to the local Security setting.'),
    image: shot('teams-settings', '«Настройки → Команды»: входящее приглашение с комментарием и две команды с ролью и числом участников; все адреса демонстрационные.', '“Settings → Teams”: an incoming invitation with a note and two teams with your role and member count; all addresses are demo addresses.'),
    images: [
      shot('teams-create', 'Создание команды: название, описание и цвет.', 'Creating a team: name, description and colour.'),
      shot('teams-members', 'Вкладка «Участники»: запрос на вступление со «Сверить код», роли участников и отправленное приглашение.', 'The Members tab: a join request with “Compare code”, member roles and a sent invitation.'),
      shot('teams-invite', 'Приглашение участника: почта, роль и комментарий, который сервер может прочитать.', 'Inviting a member: email, role and a note the server can read.'),
      shot('teams-join-code', 'Приглашённый принял приглашение: код из 6 групп для сверки с администратором (код демонстрационный).', 'The invitee accepted: the 6-group code to compare with the admin (a demo code).'),
      shot('teams-compare', 'Администратор сверяет тот же код, отмечает совпадение и добавляет участника.', 'The admin compares the same code, ticks the match and adds the member.'),
      shot('teams-policies', 'Вкладка «Настройки»: название, описание, цвет и политики команды.', 'The Settings tab: the team’s name, description, colour and policies.'),
      shot('teams-history', 'Вкладка «История»: подписанный журнал добавлений, смены роли, удаления и смены ключа.', 'The History tab: the signed log of additions, a role change, a removal and a key rotation.'),
      shot('teams-hosts', 'Хосты: разделы «Личное» и команд с их цветами, метки команд у хостов.', 'Hosts: Personal and team sections in their colours, with team labels on hosts.'),
      shot('teams-hosts-section', 'Раздел команды: только её группы и хосты, кнопка «Новая группа команды».', 'A team section: only its groups and hosts, with “New team group”.'),
      shot('teams-host-menu', 'Меню личного хоста: «Копировать в команду…» и «Переместить в команду…».', 'A personal host’s menu: “Copy to team…” and “Move to team…”.'),
      shot('teams-terminal', 'Вкладки терминала хостов команд отмечены полосками цвета команды.', 'Terminal tabs of team hosts carry stripes in the team colours.'),
      shot('teams-run-confirm', 'Политика «Спрашивать перед опасными командами»: даже безопасный сниппет на хосте команды требует отметки.', 'The “Ask before running risky commands” policy: even a harmless snippet on a team host needs the tick.'),
    ],
  },
  {
    id: 'sharing-start', group: 'collaboration', title: b('Совместный доступ: с чего начать', 'Sharing: getting started'),
    intro: b('Делитесь отдельными элементами с проверенными устройствами людей на том же сервере. Ваше личное хранилище и его ключ не передаются.', 'Share individual items with verified devices of people on the same server. Your private vault and its key are not shared.'),
    steps: [
      b('Откройте «Совместный доступ». Вкладки «Я поделился» и «Доступно мне» показывают созданные и полученные элементы. При недоступной функции проверьте поддержку и настройки сервера.', 'Open “Sharing”. “Shared by me” and “Available to me” list created and received items. If unavailable, check server support and configuration.'),
      b('В карточке «Доступ на другом устройстве» собраны добавление этого устройства и подтверждение другого. «Запросы устройств» и «Другие действия» находятся ниже; вкладки со списками остаются над карточкой.', 'The “Access on another device” card groups adding this device and confirming another. “Device requests” and “More actions” are below; the item-list tabs stay above the card.'),
      b('В меню хоста или сниппета выберите «Поделиться…». Просмотрите данные: хост передаётся без личных учётных данных; заметки требуют отдельного внимания.', 'Choose “Share…” in a host or snippet menu. Review the data: a host is shared without private credentials; pay particular attention to notes.'),
      b('Найдите устройства коллеги по email. Коллега открывает «Код моего устройства»; сравните весь код через независимый канал и отметьте подтверждение.', 'Find your colleague’s devices by email. They open “My device verification code”; compare the whole code through an independent channel and confirm it.'),
      b('Оставьте «Чтение» для просмотра или явно выберите «Редактирование». Проверьте получателей и опубликуйте. Получатель сверяет код владельца в «Проверить и принять».', 'Keep “Read” for viewing, or explicitly choose “Edit”. Check recipients and publish. The recipient verifies the owner’s code in “Verify and accept”.'),
    ],
    note: b('Доступность зависит от совместимого сервера, подтверждённой почты и доверия устройствам. На публичном sync.consolecrypt.dev включены общий доступ, группы, секреты и подтверждённое добавление новых устройств коллеги. Каждый элемент публикуется только по явному действию его владельца. На своём сервере совместный доступ по умолчанию выключен — флаги описаны в главе «Свой сервер: возможности, флаги и лимиты».', 'Availability depends on a compatible server, verified email and device trust. Sharing, groups, secrets and verified enrollment of a colleague’s new devices are enabled on public sync.consolecrypt.dev. Each item is published only through an explicit action by its owner. On your own server sharing is off by default; the flags are described in “Your own server: features, flags and limits”.'),
    images: [shot('sharing-recipient', 'Полный пример кода устройства для независимой проверки; не используйте демонстрационный код для реального доверия.', 'A complete example device code for independent verification; never use the demo code to establish real trust.'), shot('sharing-roles', 'Выбор прав: чтение или редактирование.', 'Selecting Reader or Editor access.')],
    image: shot('sharing-main', 'Совместный доступ: карточка устройств и полученные элементы со скрытым секретом и кнопкой «Выйти из общего доступа».', 'Sharing: the device card and received items with a masked secret and Leave share.'),
  },
  {
    id: 'sharing-items', group: 'collaboration',
    image: shot('sharing-secret', 'Отдельный диалог публикации секрета: значение скрыто, согласие ещё не дано.', 'The separate secret-publishing dialog: the value is masked and consent has not been given.'), title: b('Общие хосты, группы и секреты', 'Shared hosts, groups and secrets'),
    intro: b('Каждый элемент имеет собственный доступ. Группа не выдаёт права ко всем вложенным данным автоматически.', 'Each item has its own access rights. A group does not automatically grant access to all its children.'),
    steps: [
      b('Для полученного хоста создайте личную копию и назначьте свои учётные данные. Перед новым адресом или портом требуется отдельная проверка, включая цепочку jump-хостов.', 'For a received host, create a private copy and assign your own credential. A new address or port needs a separate check, including its jump-host chain.'),
      b('Публикуя группу, явно выберите ссылки на уже независимо опубликованные элементы. Получатель увидит недоступные вложения как закрытые; добавление личного хоста в группу само по себе ничего не публикует.', 'When publishing a group, explicitly select references to items already shared independently. Inaccessible children remain locked for the recipient; adding a private host to a group does not publish it.'),
      b('Секрет публикуется отдельно из карточки учётных данных, с явным предупреждением. Основной пароль или ключ и парольная фраза SSH-ключа — отдельные элементы; скрытый предпросмотр не раскрывает значение.', 'Publish a secret separately from the credential card, with an explicit warning. The main password or key and an SSH-key passphrase are separate items; the masked preview reveals no value.'),
      b('Получатель явно показывает секрет или копирует его после актуальной проверки доступа. Показ ограничен по времени; блокировка, смена профиля и закрытие диалога убирают раскрытое значение.', 'The recipient explicitly reveals or copies the secret after a fresh access check. Revealing is time-limited; locking, switching profiles and closing the dialog remove the revealed value.'),
    ],
    note: b('«Чтение» разрешает увидеть и сохранить доступные данные, включая отдельно выданный секрет. Оно не может запретить копирование уже прочитанного. Секреты не добавляются в обычный JSON хоста, сниппет или контекст ИИ.', 'Reader permits viewing and saving accessible data, including a separately shared secret. It cannot prevent copying data that has already been read. Secrets are not put into ordinary host JSON, snippets or AI context.'),
    images: [shot('share-accept', '«Проверить и принять»: владелец, его устройство и код для сверки по независимому каналу; данные демонстрационные.', '“Verify and accept”: the owner, their device and the code to compare through an independent channel; demo data.')],
  },
  {
    id: 'databases-sharing', group: 'collaboration', title: b('Общие подключения баз данных', 'Shared database connections'),
    keywords: ['база данных', 'БД', 'database', 'PostgreSQL', 'MySQL', 'Общее', 'Shared', 'Вы поделились', 'Shared by you', 'личная копия', 'personal copy', 'маршрут', 'route'],
    intro: b('Сохранённым подключением к базе можно поделиться с проверенным устройством коллеги — так же, как хостом или контекстом Kubernetes. Нужен сервер синхронизации 0.1.15 или новее с включённой функцией; на sync.consolecrypt.dev она включена. Со старым сервером пункт не показывается. На своём сервере функцию включает флаг CC_SHARED_DB_CONNECTIONS_ENABLED (глава «Свой сервер: возможности, флаги и лимиты»).', 'A saved database connection can be shared with a colleague’s verified device, just like a host or a Kubernetes context. It needs sync server 0.1.15 or later with the feature enabled; sync.consolecrypt.dev has it on. With an older server the action is hidden. On your own server the CC_SHARED_DB_CONNECTIONS_ENABLED flag turns it on (see “Your own server: features, flags and limits”).'),
    steps: [
      b('В разделе «Базы данных» откройте меню «…» подключения и выберите «Совместный доступ». Блок «Что будет передано» показывает всё, что получит коллега: имя, движок, адрес, порт, базу, пользователя, вид маршрута и пометку «Прод». Режим TLS и ограничения тоже передаются.', 'In Databases, open the connection’s “…” menu and choose “Sharing”. “What will be shared” lists everything the colleague receives: the name, engine, address, port, database, user, route type and production marker. The TLS mode and limits are shared too.'),
      b('Группа, история запросов, настройки ИИ и разрешения сеанса не передаются. Пароль и ключ клиента уходят только с отметкой «Передать сохранённый пароль и ключ клиента» и только если сервер поддерживает общие секреты.', 'Groups, query history, AI settings and session permissions are never shared. The password and client key are sent only with “Include the saved password and client key” ticked, and only if the server supports shared secrets.'),
      b('Маршрут через SSH-хост, профиль переходов, прокси или туннель не передаётся: получатель выбирает свой. У проброса Kubernetes сохраняются пространство имён и нагрузка, а контекст выбирает получатель; у Docker сохраняется имя контейнера, а движок выбирает получатель. Такое подключение нельзя сохранить как прямое.', 'A route through an SSH host, jump profile, proxy or tunnel is not shared: the recipient picks their own. A Kubernetes forward keeps its namespace and workload while the recipient picks the context; a Docker forward keeps the container name while the recipient picks the engine. Such a connection cannot be saved as direct.'),
      b('Найдите устройства коллеги по email, сверьте код устройства через независимый канал, выберите права и нажмите «Поделиться».', 'Find your colleague’s devices by email, compare the device code through an independent channel, choose the role and select Share.'),
      b('У получателя подключение появляется вверху раздела «Базы данных», в блоке «Общие подключения», с меткой «Общее»; свои опубликованные помечены «Вы поделились». «Проверить и принять» подтверждает владельца, «Подробнее» открывает сохранение личной копии, участников и отзыв доступа. Пароль и ключ клиента импортируются в копию только по явной отметке.', 'For the recipient, the connection appears at the top of Databases under “Shared connections” with a “Shared” badge; your own published ones say “Shared by you”. “Verify and accept” confirms the owner, and “Details” opens saving a personal copy, members and revoking access. The password and client key are imported into the copy only when explicitly ticked.'),
      b('Копия прод-подключения остаётся прод-подключением и открывается только на чтение. Подключения можно добавлять в общие группы.', 'A copy of a production connection stays a production connection and opens read-only. Connections can be added to shared groups.'),
    ],
    note: b('Отзыв доступа не отменяет уже скопированный пароль — смените его на сервере базы данных.', 'Revoking access does not invalidate a password that has already been copied; change it on the database server.'),
    image: shot('db-shared', 'Общие подключения: полученные с меткой «Общее», своё — «Вы поделились», приглашение ждёт проверки.', 'Shared connections: received ones marked “Shared”, your own “Shared by you”, and an invitation awaiting verification.'),
    images: [shot('db-share', 'Публикация подключения: что получит коллега; маршрут не передаётся, пароль — только по отметке.', 'Sharing a connection: what the colleague receives; the route is not shared, and the password only when ticked.')],
  },
  {
    id: 'shared-notes', group: 'collaboration', title: b('Общие заметки к общим объектам', 'Shared notes on shared objects'),
    keywords: ['общие заметки', 'shared notes', 'заметки', 'notes', 'совместный доступ', 'sharing'],
    intro: b('У общего хоста, подключения к базе данных или контекста Kubernetes есть общие заметки: их видят все участники. Нужен сервер синхронизации 0.2.0 или новее, на котором администратор включил общие заметки (CC_SHARED_NOTES_ENABLED). На объект — до 500 заметок, каждая до 288 КиБ в зашифрованном виде.', 'A shared host, database connection or Kubernetes context has shared notes that every member sees. This needs sync server 0.2.0 or later with shared notes enabled by the administrator (CC_SHARED_NOTES_ENABLED). An object holds up to 500 notes of up to 288 KiB each, encrypted.'),
    steps: [
      b('Откройте общий объект и инструмент «Заметки» на вкладке «Объект». Под личными заметками появится блок «Общие заметки»; «+» в нём создаёт общую заметку.', 'Open the shared object and the Notes tool on the Object tab. Below your personal notes, a “Shared notes” block appears; its “+” creates a shared note.'),
      b('Писать может любой участник. Изменить заметку может только автор, удалить — автор или владелец объекта. У каждой заметки видно, кто её автор: «Вы», «Владелец» или «Участник».', 'Any member can write. Only the author edits a note; the author or the object’s owner deletes it. Each note shows its author: You, Owner or Member.'),
      b('Заметка к Docker-контейнеру общего SSH-хоста или к ресурсу общего контекста Kubernetes видна только у этого контейнера или ресурса.', 'A note about a Docker container of a shared SSH host or a resource of a shared Kubernetes context shows only with that container or resource.'),
      b('Пока владелец ни разу не открыл панель заметок для объекта, участники видят сообщение об ожидании. После исключения участника устройство владельца при следующем открытии панели перешифровывает заметки новым ключом.', 'Until the owner has opened the notes panel for the object once, members see a waiting message. After a member is removed, the owner’s device moves the notes to a new key the next time the panel opens.'),
      b('Связь объекта с общим доступом запоминается при публикации и при сохранении личной копии. Для объектов, опубликованных до 0.9.0 (кроме скопированных хостов), опубликуйте или скопируйте объект заново.', 'The link between an object and its share is remembered when you publish it or save a personal copy. For objects published before 0.9.0 (other than copied hosts), publish or copy the object again.'),
    ],
    note: b('Ключ общих заметок выдаёт и подписывает устройство владельца, а каждую заметку подписывает устройство автора: сервер не может прочитать текст, подменить ключ или выдать чужую заметку за вашу.', 'The owner’s device issues and signs the shared-notes key, and the author’s device signs every note: the server can neither read the text, substitute the key nor pass someone else’s note off as yours.'),
    image: shot('notes-object', 'Блок «Общие заметки» у общего хоста: заметка участника и ваша заметка с кнопкой удаления.', 'The Shared notes block of a shared host: a member’s note and your own note with its delete button.'),
  },
  {
    id: 'sharing-devices', group: 'collaboration', title: b('Новые собственные устройства коллеги', 'A colleague’s new personal devices'),
    intro: b('Разрешение касается только новых устройств уже проверенного коллеги. Оно не приглашает других людей и не повышает права.', 'A grant applies only to new devices belonging to an already verified colleague. It does not invite other people or elevate permissions.'),
    steps: [
      b('Владелец элемента открывает «Новые собственные устройства», выбирает проверенное опорное устройство коллеги, предел прав, срок и число добавлений. По умолчанию используется ручное подтверждение; автоматическое включается явно.', 'The item owner opens “New personal devices” and chooses the colleague’s verified anchor device, role ceiling, expiry and admission limit. Manual approval is the default; Automatic must be explicitly enabled.'),
      b('Передайте публичный пакет разрешения новому устройству. В карточке «Доступ на другом устройстве» нажмите «Добавить это устройство»: оно проверяет пакет и создаёт запрос с правами чтения по умолчанию.', 'Forward the public grant package to the new device. Choose “Add this device” in the “Access on another device” card: it inspects the package and creates a request with Reader as the default.'),
      b('На уже проверенном устройстве коллеги нажмите «Подтвердить устройство», сравните полный код нового устройства и передайте подтверждённый пакет обратно.', 'On the colleague’s already verified device, choose “Confirm another device”, compare the new device’s entire code and return the endorsed package.'),
      b('Новое устройство продолжает добавление и отвечает на проверку владения ключом через «Запросы устройств». В ручном режиме владелец подтверждает запрос; автоматический действует только в заранее разрешённых пределах.', 'The new device continues enrollment and responds to the key-possession challenge through “Device requests”. In Manual mode, the owner approves the request; Automatic acts only within the pre-authorized limits.'),
    ],
    note: b('Для выполнения процесса владелец должен быть в сети с открытым хранилищем. В обоих режимах требуется полная сверка кода; импорт пакета сам по себе не выдаёт доступ. Публичный пакет содержит открытые ключи и подписи, а не слова восстановления или приватные ключи. На своём сервере эту возможность включает флаг CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED.', 'Completing the workflow requires the owner to be online with an unlocked vault. Both modes require full code verification; importing a package alone grants no access. Public packages contain public keys and signatures, not recovery words or private keys. On your own server the CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED flag turns this on.'),
    image: shot('enrollment-owner', 'Настройка разрешения новых устройств: ручное подтверждение остаётся исходным вариантом.', 'Configuring a new-device grant: Manual approval remains the initial choice.'),
  },
  {
    id: 'sharing-revoke', group: 'collaboration', title: b('Отзыв, очередь и восстановление доверия', 'Revocation, queues and trust recovery'),
    intro: b('Владелец управляет участниками. Редактор изменяет содержимое, а доступ участников остаётся под контролем владельца.', 'The owner manages participants. An editor changes content; participant access remains under the owner’s control.'),
    steps: [
      b('Откройте управление доступом элемента и отзовите нужное устройство. Для новых данных меняется ключ; ранее прочитанные копии остаются у получателя.', 'Open an item’s access management and revoke the appropriate device. The key changes for future data; previously read copies remain with the recipient.'),
      b('Чтобы остановить дальнейшее добавление устройств, отзовите разрешение новых устройств. Уже принятые устройства отзываются отдельно.', 'Revoke the new-device grant to stop future admissions. Devices already admitted must be revoked separately.'),
      b('Проверьте очередь отправки: подписи и изменения, ожидающие сети, можно повторить явно. Удаление задания из очереди не отменяет уже опубликованное изменение.', 'Check the outgoing queue: pending signed changes can be retried explicitly. Removing a queued operation does not undo a change already published.'),
      b('При предупреждении об устаревшем состоянии используйте явное восстановление доверия с владельцем и сохранённым публичным пакетом. Не удаляйте системные ключи для обхода проверки.', 'When warned about stale state, use explicit trust recovery with the owner and the saved public package. Do not delete system keys to bypass the check.'),
      b('Удалить общий элемент может только владелец: «Удалить общий объект» сразу закрывает доступ получателям. В течение 30 дней его можно восстановить: «Я поделился» → «Недавно удалённые» → «Восстановить». Восстановленный элемент снова передаётся тем же людям, кроме вышедших, и они принимают его заново.', 'Only the owner can delete a shared item: “Delete shared item” removes recipients’ access at once. For 30 days it can be restored from “Shared by me” → “Recently deleted” → “Restore”. A restored item is shared again with the same people except those who left, and they accept it again.'),
      b('Получатель может выйти из общего доступа кнопкой «Выйти из общего доступа» в карточке элемента или во входящем приглашении. Элемент перестаёт приходить на все его устройства, сохранённые личные копии остаются, а владелец видит, кто вышел.', 'A recipient can leave with “Leave share” on the item or on an incoming invitation. The item stops arriving on all of their devices, saved personal copies stay, and the owner sees who left.'),
      b('Если общую запись не удаётся прочитать, она скрывается, а над списком появляется предупреждение с числом таких записей; остальные элементы показываются как обычно.', 'A shared entry that cannot be read is hidden, and a warning above the list says how many entries were skipped; the other items show as usual.'),
    ],
    note: b('Если секрет мог утечь, отзыв в ConsoleCrypt не заменяет смену пароля или SSH-ключа на целевом сервере. Ни ручное, ни автоматическое добавление устройств не стирает сохранённые получателем данные. Восстановление удалённого и выход из общего доступа требуют сервера синхронизации 0.1.17 или новее; со старым сервером эти кнопки не показываются.', 'If a secret may have leaked, revoking access in ConsoleCrypt does not replace changing the password or SSH key on the target server. Neither Manual nor Automatic enrollment erases a recipient’s saved data. Restoring deleted items and leaving a share need sync server 0.1.17 or later; with an older server these buttons are hidden.'),
    image: shot('sharing-deleted', '«Недавно удалённые»: общие элементы можно восстановить в течение 30 дней.', 'Recently deleted: shared items can be restored for 30 days.'),
    images: [shot('share-access', '«Управление доступом»: проверенное устройство коллеги и его роль; будущие изменения шифруются новым ключом.', '“Manage access”: a colleague’s verified device and its role; future changes are encrypted with a new key.')],
  },
  {
    id: 'settings-overview', group: 'control', title: b('Настройки: что где находится', 'Settings: what is where'),
    keywords: ['настройки', 'settings', 'профили', 'profiles', 'аккаунт', 'account', 'хранилище', 'vault', 'безопасность', 'security', 'терминал', 'terminal', 'обновления', 'updates'],
    intro: b('«Настройки» открываются в левом меню или сочетанием ⌘, / Ctrl+,. Это одна прокручиваемая страница из карточек; часть карточек появляется только там, где функция доступна. Настройки внешнего вида, терминала, горячих клавиш и редактора хранятся на устройстве, а данные хранилища — в зашифрованном профиле.', 'Settings open from the sidebar or with ⌘, / Ctrl+,. It is one scrolling page of cards; some cards appear only where the feature is available. Appearance, terminal, shortcut and editor preferences stay on the device, while vault data lives in the encrypted profile.'),
    table: { headings: [b('Карточка', 'Card'), b('Что в ней', 'What it holds')], rows: [
      [b('Профили', 'Profiles'), b('Список профилей, «Добавить профиль», переименование и удаление с этого устройства.', 'The profile list, “Add profile”, renaming and removing from this device.')],
      [b('Аккаунт и синхронизация (или «Синхронизация» у локального профиля)', 'Account & sync (or Sync for a local profile)'), b('Сервер, способ входа, аккаунт, устройство; смена пароля аккаунта, отключение, выход. У локального профиля — включение синхронизации.', 'Server, sign-in method, account, device; changing the account password, disconnecting, signing out. A local profile offers enabling sync.')],
      [b('Хранилище', 'Vault'), b('Автоблокировка, разблокировка устройством, смена парольной фразы, новый комплект восстановления, резервные копии, «Заблокировать сейчас».', 'Auto-lock, device unlock, changing the passphrase, a new Recovery Kit, backups, “Lock now”.')],
      [b('Команды', 'Teams'), b('Команды профиля и приглашения; только на сервере с командами.', 'The profile’s teams and invitations; only on a server with teams.')],
      [b('Оформление', 'Appearance'), b('Тема, эффект стекла, размер текста, цвета, боковая и правая панели, язык, открытие последнего профиля.', 'Theme, glass effect, text size, colours, sidebar and right panel, language, opening the last profile.')],
      [b('Безопасность', 'Security'), b('Очистка буфера обмена и защита от скриншотов и записи экрана.', 'Clipboard clearing and screenshot and screen-recording protection.')],
      [b('Локальный ИИ и ИИ-провайдеры', 'Local AI and AI providers'), b('Встроенная модель (где доступна), провайдеры, приватность по умолчанию.', 'The built-in model (where available), providers, default privacy.')],
      [b('Терминал', 'Terminal'), b('История команд, размер и семейство шрифта, цветовая тема, подпись вкладки, буфер прокрутки.', 'Command history, font size and family, colour theme, tab subtitle, scrollback.')],
      [b('Горячие клавиши и SFTP', 'Keyboard shortcuts and SFTP'), b('Переназначение сочетаний и редактор по умолчанию — на компьютере.', 'Remapping shortcuts and the default editor — on computers.')],
      [b('Обновления и О программе', 'Updates and About'), b('Проверка обновлений, версия, автор и лицензии.', 'Update checks, version, author and licences.')],
    ] },
    steps: [
      b('Карточки находятся в порядке таблицы. Главы этого руководства описывают каждую подробно: «Хранилище, восстановление и биометрия», «Команды», «Цвета, размер текста и эффект стекла», «Скриншоты и защита экрана», «ИИ-чат», «Терминал», «Горячие клавиши», «Обновления клиента».', 'Cards follow the order of the table. The chapters of this guide describe each one: “Vault, recovery and biometrics”, “Teams”, “Colors, text size and glass effects”, “Screenshots and screen protection”, “AI chat”, “Terminal”, “Keyboard shortcuts”, “Client updates”.'),
      b('Буфер прокрутки терминала хранится только на этом устройстве и никогда не синхронизируется. Карточка «Удалённый рабочий стол» появляется только на телефоне.', 'Terminal scrollback stays on this device and never syncs. The Remote desktop card appears on phones only.'),
    ],
    image: shot('settings-overview', 'Верх страницы «Настройки»: профили, аккаунт и синхронизация, хранилище.', 'The top of Settings: profiles, account and sync, the vault.'),
    images: [
      shot('terminal-settings', '«Терминал»: история команд, шрифт, цветовая тема, подпись вкладки и буфер прокрутки.', 'Terminal: command history, font, colour theme, tab subtitle and scrollback.'),
      shot('ai-providers', '«Безопасность» и «ИИ-провайдеры»: очистка буфера, локальные и удалённый провайдеры, приватность по умолчанию.', 'Security and AI providers: clipboard clearing, local and remote providers, default privacy.'),
    ],
  },
  {
    id: 'appearance', group: 'control', title: b('Цвета, размер текста и эффект стекла', 'Colors, text size and glass effects'),
    intro: b('Настройки внешнего вида сохраняются на этом устройстве. Размер текста интерфейса и шрифт терминала регулируются отдельно.', 'Appearance preferences are stored on this device. Interface text size and terminal font size are adjusted separately.'),
    steps: [
      b('В «Настройки → Внешний вид» выберите системную, светлую или тёмную тему и уменьшите или увеличьте масштаб текста относительно базовых 100%.', 'In “Settings → Appearance”, choose System, Light or Dark and decrease or increase text scale relative to the 100% baseline.'),
      b('Настройте акцент и фон через спектр или значение цвета; сброс возвращает исходную тему. В разделе терминала задайте его шрифт, размер и буфер прокрутки.', 'Set accent and background using the spectrum or a color value; reset restores the original theme. The terminal section controls its font, size and scrollback buffer.'),
      b('Для терминала выберите готовую палитру или «Настроить / импортировать…». Поддерживаются ConsoleCrypt JSON и цветовые пресеты iTerm; можно отдельно менять фон, текст, курсор, выделение и ANSI-цвета.', 'Choose a terminal preset or “Customize / import…”. ConsoleCrypt JSON and iTerm color presets are supported; background, text, cursor, selection and ANSI colors can be adjusted individually.'),
      b('Переключите стекло: прозрачное, по умолчанию, тонированное или непрозрачное. Если эффекты упрощены, посмотрите сообщение о производительности и системные настройки прозрачности.', 'Choose Clear, Default, Tinted or Solid glass. If effects are simplified, check the performance message and system transparency settings.'),
      b('Выпадающие списки во всём приложении выполнены в том же стиле стекла с компактным шрифтом. Меню, подсказки и диалоги окрашиваются в выбранный цвет фона.', 'Drop-down lists across the app use the same glass style with compact type. Menus, tooltips and dialogs take the background colour you choose.'),
    ],
    note: b('Окна безопасности остаются непрозрачными. Системное уменьшение прозрачности и режим производительности могут ограничить эффект; выбор палитры терминала не обязан менять интерфейс.', 'Security dialogs stay opaque. System transparency reduction and performance mode can limit glass effects; terminal palette selection is independent of the interface.'),
    image: shot('appearance', 'Настройки темы, масштаба и стекла демонстрационного интерфейса.', 'Theme, scale and glass settings in the demo interface.'),
  },
  {
    id: 'right-panel', group: 'control', title: b('Правая панель: пузыри или единая область', 'Right panel: bubbles or one workspace'),
    intro: b('Сниппеты, заметки, ИИ и пробросы портов находятся в правой панели инструментов. Выберите удобное поведение в настройках внешнего вида.', 'Snippets, notes, AI and port forwards are in the right-side tool panel. Choose its behavior in appearance settings.'),
    steps: [
      b('«Пузыри» открывает инструмент отдельной всплывающей карточкой. Кнопка закрытия убирает карточку.', 'Bubbles opens the tool as a separate floating card. The close button dismisses it.'),
      b('«Единая панель» разворачивает общую рабочую область справа. На широком экране можно изменить её ширину и продолжать работу с терминалом рядом.', 'Unified panel expands a shared workspace on the right. On a wide display, resize it and continue using the terminal alongside it.'),
      b('Закончив работу с инструментом, закройте его и щёлкните внутри активного терминала, чтобы продолжить ввод. Это возвращает ввод в SSH-сессию после работы с полями палитры или правой панели.', 'When finished with a tool, close it and click inside the active terminal to resume typing. This returns input to the SSH session after using the palette or right-panel fields.'),
      b('Переключайтесь между значками сниппетов, ИИ и пробросов портов. Панель пробросов показывает запущенные пробросы Kubernetes и Docker вместе и открывается сама после запуска нового. На узком экране инструмент открывается поверх рабочей области, чтобы его элементы оставались доступными.', 'Switch between the snippet, AI and port-forward icons. The forwards panel lists running Kubernetes and Docker forwards together and opens by itself when a new one starts. On a narrow screen, the tool opens over the workspace so its controls remain usable.'),
    ],
    image: shot('panel-mode-settings', 'Два режима правой панели в настройках.', 'The two right-panel modes in settings.'),
    images: [shot('workspace-snippets-expanded', 'Развёрнутая панель сниппетов рядом с демонстрационным терминалом.', 'The expanded snippets panel alongside a demo terminal.'), shot('workspace-ai-expanded', 'Развёрнутая панель ИИ рядом с демонстрационным терминалом.', 'The expanded AI panel alongside a demo terminal.')],
  },
  {
    id: 'screenshots', group: 'control', title: b('Скриншоты и защита экрана', 'Screenshots and screen protection'),
    intro: b('Возможность запретить захват экрана зависит от ОС. Настройка разрешения сохраняется только на текущем устройстве.', 'Whether an app can block screen capture depends on the OS. Capture preferences are local to the current device.'),
    table: { headings: [b('Платформа', 'Platform'), b('Поведение', 'Behavior')], rows: [
      [b('Android', 'Android'), b('В настройках безопасности включите «Разрешить скриншоты». По умолчанию захват запрещён; переключатель также влияет на запись экрана и превью недавних приложений.', 'Enable “Allow screenshots” in security settings. Capture is blocked by default; the toggle also affects recording and recent-app previews.')],
      [b('macOS', 'macOS'), b('Скриншоты разрешены. Современная macOS не даёт приложению надёжного способа полностью запретить скриншоты и запись; рабочего переключателя запрета нет.', 'Screenshots are allowed. Modern macOS does not provide a reliable way for an app to block all screenshots and recording; there is no working block toggle.')],
      [b('iOS', 'iOS'), b('Универсального запрета скриншотов нет. Превью приложения при уходе в фон закрывается защитной заставкой; физический iPhone проверяется отдельно.', 'There is no universal screenshot block. An app-switcher cover protects the preview when backgrounded; physical-iPhone checks remain separate.')],
      [b('Windows', 'Windows'), b('«Настройки → Безопасность → Скрывать окно от записи экрана»: «Никогда», «Когда видны секреты» (по умолчанию) или «Всегда». Пока показаны пароль, ключ или слова восстановления, окно не попадает в скриншоты, запись и демонстрацию экрана.', '“Settings → Security → Hide window from screen capture”: Never, While secrets are shown (default) or Always. While a password, key or recovery words are shown, the window stays out of screenshots, recordings and screen sharing.')],
    ] },
    steps: [
      b('Там же «Очищать буфер обмена» задаёт, когда скопированный секрет удаляется из буфера: от 30 секунд до 1 дня. Очистка срабатывает и после перезапуска приложения и не трогает то, что вы скопировали позже в других программах.', 'In the same section, “Clear clipboard” sets when a copied secret is removed from the clipboard: from 30 seconds to 1 day. Clearing also completes after an app restart and never touches what you copied later in other apps.'),
    ],
    note: b('Не делайте снимки раскрытых секретов или комплекта восстановления. Все изображения этого руководства созданы на демонстрационных данных.', 'Do not capture revealed secrets or your Recovery Kit. Every image in this guide uses demo data.'),
    image: shot('mobile-screen-capture', 'Переключатель разрешения скриншотов в демонстрационном интерфейсе Android; это снимок интерфейса, а не проверка захвата на физическом телефоне.', 'Screenshot permission in the demo Android interface; this shows the UI, not capture enforcement on a physical phone.', {width: 824, height: 1830, layout: 'phone'}),
    images: [shot('security-settings', 'Раздел безопасности на macOS: время очистки буфера обмена и пояснение об ограничении ОС.', 'The macOS security section: the clipboard clearing time and the OS limitation.'), shot('security-settings-windows', 'Windows: «Скрывать окно от записи экрана» — «Никогда», «Когда видны секреты» или «Всегда».', 'Windows: “Hide window from screen capture” — Never, While secrets are shown or Always.')],
  },
  {
    id: 'backups', group: 'control',
    image: shot('backups', 'Зашифрованные резервные копии и расписание в демонстрационном клиенте.', 'Encrypted backups and scheduling in the demo client.'), title: b('Резервные копии и восстановление', 'Backups and restore'),
    intro: b('Синхронизация не заменяет резервную копию. Сохраняйте зашифрованный файл отдельно от устройства и комплект восстановления отдельно от файла.', 'Sync does not replace a backup. Keep the encrypted file apart from your device and the Recovery Kit apart from that file.'),
    steps: [
      b('В «Резервные копии» экспортируйте хранилище в файл .ccbackup. На компьютере можно настроить папку и расписание автоматических копий; мобильные возможности ограничены системным выбором файлов.', 'In “Backups”, export the vault as a .ccbackup file. On a computer, configure a folder and automatic-backup schedule; mobile capabilities depend on the system file picker.'),
      b('Для восстановления выберите файл на стартовом экране или в разделе резервных копий. Сначала проверьте информацию о копии.', 'To restore, choose the file from the welcome screen or backup section. Review its information first.'),
      b('Откройте копию парольной фразой либо комплектом восстановления и новой парольной фразой. Восстановление создаёт новый локальный профиль на этом устройстве; существующие профили не затрагиваются. Чтобы снова синхронизировать данные, включите синхронизацию в этом профиле.', 'Unlock the backup with its passphrase, or with the Recovery Kit and a new passphrase. Restoring creates a new local profile on this device; existing profiles are not touched. To sync the data again, enable sync in that profile.'),
    ],
    images: [shot('restore-backup', 'Восстановление со стартового экрана: файл .ccbackup открывается в новый локальный профиль.', 'Restoring from the welcome screen: a .ccbackup file opens into a new local profile.')],
    note: b('При переносе на другой сервер не удаляйте исходный профиль до проверки восстановления. Локальные настройки редактора, внешнего вида и буфер терминала не становятся синхронизируемыми данными хранилища.', 'When moving to another server, keep the original profile until you verify the restore. Editor and appearance preferences and terminal scrollback do not become synced vault data.'),
  },
  {
    id: 'about', group: 'control', title: b('Версия, автор и лицензии', 'Version, author and licenses'),
    image: shot('about-license', 'Окно «О программе»: версия, автор и обозначения лицензий клиента и сервера.', 'About: version, author and the client and server license labels.'),
    intro: b('В разделе «О программе» собраны сведения об установленном приложении: версия, номер сборки, автор и лицензии.', 'About shows details of the installed app: its version, build number, author and licenses.'),
    steps: [
      b('Откройте «Настройки → О программе». На macOS это окно также доступно из меню ConsoleCrypt.', 'Open “Settings → About”. On macOS, the same dialog is also available from the ConsoleCrypt app menu.'),
      b('При обращении в поддержку укажите версию и номер сборки из этого окна вместе с вашей операционной системой. Они помогают определить, какое обновление установлено.', 'When contacting support, include the version and build number from this dialog along with your operating system. They identify the update you have installed.'),
      b('Лицензии клиента и сервера показаны отдельно; в интерфейсе обе обозначены AGPL-3.0. Проверка новых версий находится в разделе «Обновления».', 'Client and server licenses are listed separately; both are labelled AGPL-3.0 in the interface. Check for new versions in Updates.'),
    ],
  },
  {
    id: 'updates', group: 'control',
    image: shot('updates', 'Проверка обновлений с отдельным переключателем проверки при запуске.', 'Update checking with a separate startup-check preference.'), title: b('Обновления клиента', 'Client updates'),
    intro: b('На Windows, macOS и Android в «Настройки → Обновления» есть проверка при запуске и ручная проверка. Проверка не устанавливает обновление сама. На Linux новый пакет скачивается с сайта и устанавливается вручную.', 'On Windows, macOS and Android, “Settings → Updates” offers startup checks and a manual check. A check does not install an update by itself. On Linux, download the new package from the website and install it manually.'),
    steps: [
      b('Отключите автоматическую проверку, если хотите проверять вручную. Нажмите «Проверить обновления» и просмотрите новую версию и описание.', 'Turn off automatic checks if you prefer manual checks. Choose “Check for updates” and review the new version and notes.'),
      b('Сохраните резервную копию и завершите важные сессии перед установкой. При загрузке через приложение пакет проверяется по подписанным сведениям и контрольной сумме; установка требует вашего действия.', 'Save a backup and finish important sessions before installation. When downloaded through the app, the package is checked against signed metadata and a checksum; installation requires your action.'),
      b('На Windows «Скачать и установить» загружает и проверяет установщик, затем ConsoleCrypt закрывается, установщик обновляет приложение и запускает его снова. SSH-сеансы закрываются, профили и хранилища сохраняются. Копия, распакованная из ZIP-архива, сама не обновляется: скачайте установщик или новый архив со страницы «Скачать». На Android используется системная установка APK.', 'On Windows, “Download and install” downloads and verifies the installer; then ConsoleCrypt closes, the installer updates the app and starts it again. SSH sessions close; profiles and vaults are kept. A copy unpacked from the ZIP archive cannot update itself: download the installer or a new archive from Downloads. Android uses the system APK installer.'),
      b('При переходе на Windows с версии 0.8.5 и более ранних обновление через приложение может не установиться. Один раз скачайте версию 0.8.6 со страницы «Скачать» и установите её вручную поверх прежней — профили и хранилища сохранятся. Следующие обновления устанавливаются из приложения.', 'On Windows, updating from 0.8.5 or earlier through the app may fail. Download 0.8.6 from Downloads once and install it manually over the previous version; profiles and vaults are kept. Later updates install from the app.'),
      b('На Linux загрузите новый DEB или RPM со страницы «Скачать» и установите его вручную через пакетный менеджер. Инструкция находится в главе «Установка Linux».', 'On Linux, download the new DEB or RPM from Downloads and install it manually with your package manager. See the Linux installation chapter for instructions.'),
      b('В ConsoleCrypt 0.2.2 и новее на macOS после загрузки выберите новое имя или папку для DMG в системном диалоге «Сохранить и открыть». После открытия DMG завершите приложение, перенесите новую копию в Applications и подтвердите замену.', 'With ConsoleCrypt 0.2.2 or newer on macOS, choose a new DMG filename or folder in the system “Save and open” dialog after downloading. Once the DMG opens, quit the app, drag the new copy to Applications and confirm replacement.'),
      b('Отмена диалога оставляет проверенную загрузку для повторной попытки. Для сохранения выберите новое имя: существующий файл не перезаписывается.', 'Cancelling the dialog keeps the verified download ready for retry. Choose a new filename when saving: an existing file is never overwritten.'),
    ],
    note: b('Если на macOS ConsoleCrypt не открывается после обновления через старое приложение, один раз скачайте актуальный DMG через браузер. Закройте ConsoleCrypt и замените его в Applications. Повторная загрузка через старую кнопку не устранит блокировку. Хранилище и связку ключей удалять не нужно. После первого запуска заменённой копии следующие обновления используют системный диалог «Сохранить и открыть».', 'If ConsoleCrypt cannot open on macOS after an update from the old app, download the latest DMG once through your browser. Quit ConsoleCrypt and replace it in Applications. Downloading again through the old button will not clear the block. Keep your vault and Keychain. After the replaced app starts, later updates use the system “Save and open” dialog.'),
    links: [{ href: 'https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/UPDATES.md', text: b('Полная инструкция обновления клиента ↗', 'Full client update instructions ↗') }],
  },
  {
    id: 'server-account', group: 'control', title: b('Аккаунт: пароль, отключение и личный кабинет', 'Account: password, disconnecting and the website account'),
    intro: b('Веб-кабинет управляет аккаунтом публичного сервера. Работа с расшифрованными хостами, ключами и сниппетами остаётся в приложении.', 'The website account manages your public-server account. Decrypted hosts, keys and snippets remain in the application.'),
    steps: [
      b('Откройте «Личный кабинет» и используйте email и пароль нашего публичного сервера (включая существующие аккаунты consolecrypt.evsikov.net). Здесь можно подтвердить email, изменить пароль аккаунта и отозвать устройства.', 'Open “Account” and use your public-server email and account password, including existing consolecrypt.evsikov.net accounts. You can verify email, change the account password and revoke devices here.'),
      b('Для закрытого контура разверните совместимый сервер из отдельной серверной части репозитория. Инструкции Docker и Helm предназначены для администратора.', 'For a private environment, deploy a compatible server from the repository’s server component. Docker and Helm instructions are intended for administrators.'),
      b('В клиенте создайте профиль с HTTPS-адресом своего сервера и войдите или зарегистрируйтесь, если сервер открыт для регистрации; на корпоративном сервере вход идёт через вашу организацию. Настройки почты, резервных копий сервера и доступности общего доступа задаёт администратор.', 'Create a client profile using your server’s HTTPS address and sign in, or register if the server allows registration; a corporate server signs you in through your organisation. The administrator configures email, server backups and sharing availability.'),
      b('В приложении «Настройки → Аккаунт и синхронизация» показывают сервер, способ входа, аккаунт и имя этого устройства. «Изменить пароль аккаунта» запрашивает текущий и новый пароль (не короче 10 символов); парольная фраза хранилища при этом не меняется. На корпоративном сервере пароль меняется в вашей организации.', 'In the app, “Settings → Account & sync” shows the server, the sign-in method, the account and this device’s name. “Change account password” asks for the current and a new password (at least 10 characters); the vault passphrase does not change. On a corporate server the password is changed in your organisation.'),
      b('«Выйти» завершает сеанс этого устройства, «Выйти на всех устройствах…» — все сеансы аккаунта. «Отключиться (сохранить данные локально)…» превращает профиль в локальный и при желании отзывает это устройство на сервере.', '“Sign out” ends this device’s session; “Sign out on all devices…” ends every session of the account. “Disconnect (keep data locally)…” turns the profile into a local one and can also revoke this device on the server.'),
    ],
    image: shot('settings-overview', '«Настройки»: профили, «Аккаунт и синхронизация» с действиями аккаунта и хранилище.', 'Settings: profiles, “Account & sync” with the account actions, and the vault.'),
    images: [shot('account-password', '«Изменить пароль аккаунта»: парольная фраза хранилища при этом не меняется.', '“Change account password”: the vault passphrase stays the same.')],
    note: b('Сервер видит аккаунты и служебные метаданные, хранит зашифрованные объекты и не имеет ключа их расшифровки. Учётная запись другого сервера не переносится через вход в этот веб-кабинет.', 'The server sees accounts and operational metadata, stores encrypted objects and has no decryption key. Signing in to this website does not transfer an account from another server.'),
  },
  {
  "id": "kubernetes-connections",
  "group": "workspace",
  "title": {
    "ru": "Kubernetes: подключения и доступ",
    "en": "Kubernetes: connections and access"
  },
  "intro": {
    "ru": "Импортируйте существующие контексты и храните доступы в зашифрованном хранилище. Запросы к кластеру идут с вашего устройства.",
    "en": "Import existing contexts and keep credentials in your encrypted vault. Cluster requests originate from your device."
  },
  "keywords": [
    "Kubernetes",
    "kubeconfig",
    "kubectl",
    "Flux",
    "Helm"
  ],
  "steps": [
    {
      "ru": "Откройте Kubernetes, нажмите импорт kubeconfig и выберите файл или вставьте YAML. На компьютере доступны несколько файлов и сканирование папки.",
      "en": "Open Kubernetes, choose kubeconfig import and select a file or paste YAML. Desktop supports multiple files and folder scanning."
    },
    {
      "ru": "Отметьте контексты, проверьте сервер, пользователя, namespace и способ входа. Для рабочего кластера включите «Прод». Исходный файл не меняется.",
      "en": "Select contexts and review the server, user, namespace and authentication. Mark production clusters. The original file is unchanged."
    },
    {
      "ru": "При exec-авторизации просмотрите путь, аргументы и SHA-256 бинарного файла. Импорт сам не запускает команду; первый запуск требует отдельного разрешения.",
      "en": "For exec authentication, review the executable path, arguments and SHA-256. Import does not run the command; its first execution needs separate approval."
    },
    {
      "ru": "При необходимости настройте SSH или прокси, затем подключитесь. На телефоне используйте token, client certificate или OIDC; внешние exec-плагины доступны на компьютере.",
      "en": "Configure SSH or a proxy when needed, then connect. Use token, client certificate or OIDC on mobile; external exec plugins require desktop."
    },
    {
      "ru": "Для коллег откройте совместный доступ и выберите контекст. Учётные данные исключены по умолчанию; включайте их только отдельным осознанным действием.",
      "en": "To share with colleagues, open Shared access and select a context. Credentials are excluded by default and require explicit inclusion."
    }
  ],
  "links": [
    {
      "href": "https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/KUBERNETES.md",
      "text": {
        "ru": "Подробная инструкция Kubernetes ↗",
        "en": "Full Kubernetes instructions ↗"
      }
    }
  ],
  "images": [
    {
      "name": "kube-inventory-1400",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 1400,
      "height": 1000
    },
    {
      "name": "kube-inventory-412",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 412,
      "height": 915
    }
  ],
  "note": {
    "ru": "Кластеры синхронизируются в зашифрованном виде. Экспорт kubeconfig создаёт отдельный файл, который может содержать секреты.",
    "en": "Cluster connections sync as encrypted objects. Exporting a kubeconfig creates a separate file that can contain secrets."
  }
},
  {
  "id": "kubernetes-resources",
  "group": "workspace",
  "title": {
    "ru": "Kubernetes: ресурсы и изменения",
    "en": "Kubernetes: resources and changes"
  },
  "intro": {
    "ru": "Живой список и карточки показывают объекты доступных API, включая установленные CRD.",
    "en": "Live lists and details show objects from available APIs, including installed CRDs."
  },
  "keywords": [
    "Kubernetes",
    "kubeconfig",
    "kubectl",
    "Flux",
    "Helm"
  ],
  "steps": [
    {
      "ru": "На компьютере слева находится навигатор: кластеры и сворачиваемые группы ресурсов, пользовательские ресурсы по API-группам и избранное. Кластер открывается на обзоре с узлами, запущенными подами, проблемами, графиками CPU и памяти и состояниями подов. Если metrics-server не установлен, обзор предложит базовую версию; для локальных кластеров включите --kubelet-insecure-tls. Правый клик по кластеру: переименовать, свойства, тест/прод, цвет метки, поделиться и экспорт kubeconfig.",
      "en": "On desktop, the navigator on the left lists clusters and collapsible resource groups, custom resources by API group and favourites. A cluster opens on an overview with nodes, running Pods, problems, CPU and memory charts and Pod states. Without metrics-server the overview offers a basic one; turn on --kubelet-insecure-tls for local clusters. Right-click a cluster for rename, properties, test/production, colour label, sharing and kubeconfig export."
    },
    {
      "ru": "Выберите namespace и тип ресурса. Используйте поиск, фильтр и настройки колонок; список обновляется автоматически.",
      "en": "Select a namespace and resource kind. Use search, filtering and column settings; the list updates automatically."
    },
    {
      "ru": "Откройте объект: доступны состояние, YAML, события и связанные ресурсы. Workloads поддерживают историю rollout и сравнение ревизий.",
      "en": "Open an object for status, YAML, events and related resources. Supported workloads expose rollout history and revision comparisons."
    },
    {
      "ru": "Для изменения YAML откройте редактор и нажмите «Применить»: изменения сначала проверяются на сервере, затем показываются diff и подтверждение паролем хранилища. При отказе видно, какой контроллер владеет полем или какие поля отклонены. Конфликт владения полями требует отдельного решения.",
      "en": "To edit YAML, open the editor and choose Apply: the change is validated on the server first, then the diff and a vault passphrase confirmation follow. A refusal shows which controller owns a field or which fields were rejected. Field ownership conflicts require a separate decision."
    },
    {
      "ru": "Удаление, restart, масштабирование, cordon/drain и debug-контейнер выполняются после подтверждения паролем хранилища — имя ресурса вводить не нужно. Значения Secret скрыты и раскрываются отдельно.",
      "en": "Deletion, restart, scaling, cordon/drain and debug containers require confirmation with the vault passphrase; no resource name needs typing. Secret values are hidden and revealed separately."
    },
    {
      "ru": "В контексте «Прод» изменения заблокированы. На компьютере можно открыть временное окно записи на 10 минут, подтвердив его паролем хранилища; массовые изменения в production всё равно запрещены.",
      "en": "A production context blocks writes. Desktop allows a 10-minute write window confirmed with the vault passphrase; bulk production mutations remain prohibited."
    }
  ],
  "links": [
    {
      "href": "https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/KUBERNETES.md",
      "text": {
        "ru": "Подробная инструкция Kubernetes ↗",
        "en": "Full Kubernetes instructions ↗"
      }
    }
  ],
  "images": [
    {
      "name": "kube-resources-1400",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 1400,
      "height": 1000
    },
    {
      "name": "kube-resources-412",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 412,
      "height": 915
    }
  ],
  "note": {
    "ru": "Права Kubernetes RBAC сохраняются. Метрики появляются при доступном metrics-server; отсутствие данных или прав отображается явно.",
    "en": "Kubernetes RBAC still applies. Metrics require an accessible metrics-server; missing data or permissions are reported explicitly."
  }
},
  {
  "id": "kubernetes-logs-shell",
  "group": "workspace",
  "title": {
    "ru": "Kubernetes: логи, shell и туннели",
    "en": "Kubernetes: logs, shell and tunnels"
  },
  "intro": {
    "ru": "Логи, shell и port-forward встроены в клиент и не требуют внешнего kubectl.",
    "en": "Logs, shell and port forwarding are built into the client and require no external kubectl."
  },
  "keywords": [
    "Kubernetes",
    "kubeconfig",
    "kubectl",
    "Flux",
    "Helm"
  ],
  "steps": [
    {
      "ru": "В карточке Pod выберите контейнер и откройте логи. Можно включить поток, фильтровать строки и посмотреть предыдущий запуск контейнера.",
      "en": "Select a container in Pod details and open Logs. Stream output, filter lines or inspect the previous container run."
    },
    {
      "ru": "В workload откройте логи связанных Pod. Сохраните результат в файл на компьютере или через системный обмен на телефоне.",
      "en": "Open related Pod logs from a workload. Save output to a file on desktop or use system sharing on mobile."
    },
    {
      "ru": "Запущенные пробросы портов собраны в правой панели вместе с пробросами Docker: у каждого — статус, локальный адрес с кнопкой копирования, Pod и порт, трафик и остановка. Панель открывается сама после запуска проброса, а в шапке кластера есть кнопка «Пробросы: N».",
      "en": "Running port forwards live in the right panel together with Docker forwards: each shows its status, local address with a copy button, Pod and port, traffic and a stop button. The panel opens after a forward starts, and the cluster header has a “Port forwards: N” button."
    },
    {
      "ru": "Откройте терминал Pod. Автовыбор пробует bash, ash и sh; отдельный выбор позволяет задать команду. В production нужен соответствующий доступ контекста.",
      "en": "Open the Pod terminal. Automatic selection tries bash, ash and sh, or choose a command explicitly. Production requires the corresponding context permission."
    },
    {
      "ru": "Создайте port-forward для нужного порта. Используйте показанный локальный адрес и остановите туннель после работы.",
      "en": "Create a port forward for the desired port. Use the displayed local address and stop the tunnel when finished."
    },
    {
      "ru": "У Pod со стандартным портом базы данных (PostgreSQL, MySQL, MariaDB, ClickHouse, Redis, MongoDB) есть кнопка «Подключиться к БД». Она открывает сохранённое подключение с тем же маршрутом или форму в «Базах данных» с маршрутом через Kubernetes: к самому Pod для StatefulSet, иначе к единственному Service или Deployment — так подключение переживёт перезапуск подов. Проброс восстанавливается при каждом подключении.",
      "en": "A Pod with a standard database port (PostgreSQL, MySQL, MariaDB, ClickHouse, Redis, MongoDB) has a “Connect to database” button. It opens a saved connection with the same route, or a Databases form with a Kubernetes route: to the Pod itself for a StatefulSet, otherwise to its only Service or Deployment, so the connection survives Pod restarts. The forward is restored on every connect."
    },
    {
      "ru": "На Android активные туннели видны в уведомлении с кнопкой остановки. Проверка Kubernetes на iOS и новая сборка iOS отложены. Блокировка хранилища закрывает сессии.",
      "en": "On Android, active tunnels appear in a notification with a stop action. Kubernetes testing and a new build for iOS are deferred. Locking the vault closes sessions."
    }
  ],
  "links": [
    {
      "href": "https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/KUBERNETES.md",
      "text": {
        "ru": "Подробная инструкция Kubernetes ↗",
        "en": "Full Kubernetes instructions ↗"
      }
    }
  ],
  "images": [
    {
      "name": "kube-details-1400",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 1400,
      "height": 1000
    },
    {
      "name": "kube-details-412",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 412,
      "height": 915
    },
    {
      "name": "kube-database-1400",
      "caption": {
        "ru": "Pod с PostgreSQL и кнопкой «Подключиться к БД». Демонстрационные данные.",
        "en": "A PostgreSQL Pod with the “Connect to database” button. Demonstration data."
      },
      "width": 1400,
      "height": 1000
    }
  ]
},
  {
  "id": "kubernetes-gitops",
  "group": "workspace",
  "title": {
    "ru": "Kubernetes: GitOps и проблемы",
    "en": "Kubernetes: GitOps and problems"
  },
  "intro": {
    "ru": "Flux и Argo CD отображаются по доступным CRD. Обзор объединяет состояние, зависимости и переходы к проблемным объектам.",
    "en": "Flux and Argo CD are discovered from available CRDs. Overview combines status, dependencies and links to problematic objects."
  },
  "keywords": [
    "Kubernetes",
    "kubeconfig",
    "kubectl",
    "Flux",
    "Helm"
  ],
  "steps": [
    {
      "ru": "Откройте GitOps и выберите источники, Kustomizations, HelmReleases или другие доступные группы. Поиск сужает список.",
      "en": "Open GitOps and select sources, Kustomizations, HelmReleases or another available group. Search narrows the list."
    },
    {
      "ru": "Используйте карту ресурсов и зависимости для перехода от источника к workload. Статус и события помогают понять причину ошибки.",
      "en": "Use resource flow and dependencies to navigate from a source to its workload. Status and events help explain failures."
    },
    {
      "ru": "Для Flux выберите «Синхронизировать сейчас», «Синхронизировать вместе с источником» или «Приостановить/Возобновить синхронизацию» — подсказка у кнопки объясняет, что сделает Flux. Проверьте объект и подтвердите действие паролем хранилища. Для Argo доступны sync и refresh.",
      "en": "For Flux, select Sync now, Sync with source or Pause/Resume sync — the tooltip explains what Flux will do. Review the object and confirm with the vault passphrase. Argo provides sync and refresh."
    },
    {
      "ru": "Причина приостановки и напоминание задаются отдельно. Напоминание не возобновляет объект автоматически.",
      "en": "Set a suspension reason and reminder separately. A reminder never resumes an object automatically."
    },
    {
      "ru": "При необходимости включите уведомления Flux и историю событий для контекста. История хранится локально до семи дней; уведомления работают внутри открытого приложения.",
      "en": "Optionally enable Flux alerts and event history for the context. History stays local for up to seven days; alerts operate within the running app."
    },
    {
      "ru": "Раздел «Проблемы» собирает диагностику Pod, workloads, узлов и GitOps. Откройте объект, логи или объяснение ИИ из найденной проблемы.",
      "en": "Problems collects diagnostics for Pods, workloads, nodes and GitOps. Open the object, logs or an AI explanation from a finding."
    }
  ],
  "links": [
    {
      "href": "https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/KUBERNETES.md",
      "text": {
        "ru": "Подробная инструкция Kubernetes ↗",
        "en": "Full Kubernetes instructions ↗"
      }
    }
  ],
  "images": [
    {
      "name": "kube-gitops-1400",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 1400,
      "height": 1000
    },
    {
      "name": "kube-gitops-412",
      "caption": {
        "ru": "GitOps на телефоне с демонстрационными данными. Панель фильтров прокручена; для поиска прокрутите её к началу.",
        "en": "GitOps on a phone with demonstration data. The filter panel is scrolled; scroll it to the top to use search."
      },
      "width": 412,
      "height": 915
    }
  ],
  "note": {
    "ru": "Если части API недоступны по RBAC или достигнут лимит данных, обзор помечается неполным.",
    "en": "Overview is marked partial when RBAC prevents some reads or a data limit is reached."
  }
},
  {
  "id": "kubernetes-helm",
  "group": "workspace",
  "title": {
    "ru": "Kubernetes: Helm",
    "en": "Kubernetes: Helm"
  },
  "intro": {
    "ru": "Просматривайте сохранённые Helm-релизы и сравнивайте их с текущим кластером.",
    "en": "Inspect stored Helm releases and compare them with the current cluster."
  },
  "keywords": [
    "Kubernetes",
    "kubeconfig",
    "kubectl",
    "Flux",
    "Helm"
  ],
  "steps": [
    {
      "ru": "Откройте Helm, выберите namespace и релиз. История показывает статус, chart и номер ревизии.",
      "en": "Open Helm, choose a namespace and release. History shows status, chart and revision."
    },
    {
      "ru": "Откройте values и манифест. Все строковые values скрываются, как и поля с именами учётных данных. Вычисленные values могут быть неполными для зависимостей chart.",
      "en": "Inspect values and manifest. All string values and credential-named fields are masked. Computed values may be incomplete for chart dependencies."
    },
    {
      "ru": "Сравните две ревизии или выберите сравнение с кластером. Недоступные и скрытые данные отмечаются отдельно.",
      "en": "Compare two revisions or select live comparison. Unavailable and masked data are indicated separately."
    },
    {
      "ru": "Для rollback на компьютере требуется установленный helm и отдельное подтверждение паролем хранилища. Production-ограничения действуют и для этой операции.",
      "en": "Desktop rollback requires installed helm and separate approval with the vault passphrase. Production restrictions apply to this operation too."
    }
  ],
  "links": [
    {
      "href": "https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/KUBERNETES.md",
      "text": {
        "ru": "Подробная инструкция Kubernetes ↗",
        "en": "Full Kubernetes instructions ↗"
      }
    }
  ],
  "images": [
    {
      "name": "kube-helm-1400",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 1400,
      "height": 1000
    },
    {
      "name": "kube-helm-412",
      "caption": {
        "ru": "Интерфейс Kubernetes с демонстрационными данными.",
        "en": "Kubernetes interface with demonstration data."
      },
      "width": 412,
      "height": 915
    }
  ],
  "note": {
    "ru": "Сравнение с кластером читает сохранённый манифест и живые объекты; оно не выполняет dry-run и не заменяет диагностику drift контроллера.",
    "en": "Live comparison reads the stored manifest and live objects; it does not perform dry-run or replace controller drift diagnostics."
  }
},
  {
  "id": "kubernetes-terminal-ai",
  "group": "workspace",
  "title": {
    "ru": "Kubernetes: терминал контекста и ИИ",
    "en": "Kubernetes: context terminal and AI"
  },
  "intro": {
    "ru": "Контекст остаётся явным и для локальных команд, и для помощи ИИ.",
    "en": "The context remains explicit for both local commands and AI assistance."
  },
  "keywords": [
    "Kubernetes",
    "kubeconfig",
    "kubectl",
    "Flux",
    "Helm"
  ],
  "steps": [
    {
      "ru": "На компьютере откройте терминал контекста и выберите оболочку. Заголовок показывает кластер и namespace по умолчанию; вкладка остаётся на этом контексте при навигации.",
      "en": "On desktop, open a context terminal and choose a shell. Its title shows the cluster and default namespace; the tab keeps that context during navigation."
    },
    {
      "ru": "kubectl и Flux используют временный kubeconfig локального прокси. Реальные ключи кластера не записываются в этот файл, а ограничения «Прод» проверяются прокси.",
      "en": "kubectl and Flux use a temporary kubeconfig for the local proxy. Actual cluster keys are not written to that file, and the proxy enforces production policy."
    },
    {
      "ru": "Если CLI не найден, просмотрите предложение установки, точную команду и способ установки. Источник пакета задаётся настройками пакетного менеджера. Выполнение требует отдельного подтверждения.",
      "en": "If a CLI is missing, review the installation option, exact command and installation method. Package sources follow the package manager configuration. Execution requires separate approval."
    },
    {
      "ru": "Откройте ИИ из панели Kubernetes или карточки проблемы. Проверьте провайдера и разрешите чтение данных кластера.",
      "en": "Open AI from the Kubernetes panel or a problem. Check the provider and consent to cluster data access."
    },
    {
      "ru": "Обсудите ресурсы, события и хвосты логов. Предложенные команды и YAML выполняются только после вашего действия через обычные проверки.",
      "en": "Discuss resources, events and log tails. Suggested commands and YAML only execute after your action through the normal checks."
    }
  ],
  "links": [
    {
      "href": "https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/KUBERNETES.md",
      "text": {
        "ru": "Подробная инструкция Kubernetes ↗",
        "en": "Full Kubernetes instructions ↗"
      }
    }
  ],
  "note": {
    "ru": "Внешний провайдер получает выбранные очищенные данные. Для WSL требуется доступ к loopback-прокси Windows; неподходящий сетевой режим не открывает прокси наружу.",
    "en": "An external provider receives selected sanitized data. WSL requires access to the Windows loopback proxy; incompatible networking never exposes an external proxy listener."
  }
},
  {
    id: 'databases-connections', group: 'workspace', title: b('Базы данных: подключения и маршруты', 'Databases: connections and routes'),
    keywords: ['PostgreSQL', 'MySQL', 'MariaDB', 'ClickHouse', 'Redis', 'MongoDB', 'SQL', '.pgpass', 'база данных', 'БД', 'database', 'SSH', 'tunnel', 'туннель', 'TLS', 'SCRAM', 'channel binding', 'шифрование', 'encryption'],
    intro: b('Раздел «Базы данных» работает с PostgreSQL, MySQL и MariaDB, ClickHouse, Redis и MongoDB. Драйверы встроены в приложение, подключения хранятся в зашифрованном хранилище, а запросы идут с вашего устройства прямо в базу.', 'The Databases section works with PostgreSQL, MySQL and MariaDB, ClickHouse, Redis and MongoDB. Drivers are built into the app, connections live in the encrypted vault, and queries go from your device straight to the database.'),
    steps: [
      b('Откройте «Базы данных» в боковом меню и нажмите «Новое подключение к БД». Укажите имя, движок, адрес, порт, базу (для Redis — номер), пользователя и пароль. «Проверить подключение» покажет версию сервера ещё до сохранения.', 'Open Databases in the sidebar and choose “New database connection”. Enter a name, engine, host, port, database (an index for Redis), username and password. “Test connection” shows the server version before you save.'),
      b('Пароль можно сохранить в хранилище или вводить при каждом открытии — тогда он используется один раз и нигде не остаётся. В блоке «Защита TLS» по умолчанию проверяются сертификат и имя сервера; для локального адреса и проброса порта режим сам переключается на «Предпочитать шифрование».', 'Save the password in the vault or type it each time you open the connection; a typed password is used once and not kept. Under “TLS protection”, the certificate and hostname are verified by default; for a local address or a port forward the mode switches to “Prefer encryption” by itself.'),
      b('Шифрование не отключается молча. «Предпочитать шифрование» обходится без TLS только внутри туннеля или проброса (SSH-хост, профиль переходов, SSH-туннель, Kubernetes, Docker) и на этом компьютере. Напрямую к другому хосту без TLS подключение завершится ошибкой, и пароль не уйдёт; если открытое соединение допустимо, выберите «Отключить TLS» явно.', 'Encryption is never dropped silently. “Prefer encryption” goes without TLS only inside a tunnel or forward (SSH host, jump profile, SSH tunnel, Kubernetes, Docker) and on this computer. A direct connection to another host without TLS fails and the password is not sent; if an unencrypted connection is acceptable, choose “Disable TLS” explicitly.'),
      b('PostgreSQL в режиме «Требовать шифрование» привязывает пароль к TLS-соединению (SCRAM-SHA-256-PLUS), поэтому перехватчик с поддельным сертификатом пароль не получит. Для серверов с аутентификацией md5 или password есть переключатель «Разрешить вход без привязки к TLS (менее безопасно)», по умолчанию он выключен. По сети без TLS PostgreSQL не отправляет пароль открытым текстом.', 'With “Require encryption”, PostgreSQL binds the password to the TLS connection (SCRAM-SHA-256-PLUS), so an interceptor with a forged certificate cannot obtain it. Servers that use md5 or password authentication need “Allow sign-in without TLS binding (less secure)”, which is off by default. Over the network without TLS, PostgreSQL never sends the password in plain text.'),
      b('Фактическая защита видна в шапке рабочей области и на карточке подключения: «TLS (проверен)», «TLS (без проверки сертификата)», «Без TLS — защищено туннелем» или «Без TLS».', 'The actual protection shows in the workspace header and on the connection card: “TLS (verified)”, “TLS (certificate not verified)”, “No TLS — protected by a tunnel” or “No TLS”.'),
      b('В блоке «Маршрут подключения» выберите путь к базе: напрямую, через сохранённый SSH-хост или профиль SSH-переходов, через сохранённый SSH-туннель, проброс порта Kubernetes (Pod, Service, Deployment или StatefulSet) или контейнер Docker. Туннель и пробросы поднимаются сами при подключении, уже запущенные используются повторно. Сохранённый туннель с сетевым адресом прослушивания для подключения к базе запускается только на 127.0.0.1.', 'Under “Connection route”, choose how to reach the database: directly, through a saved SSH host or SSH jump profile, through a saved SSH tunnel, a Kubernetes port forward (Pod, Service, Deployment or StatefulSet) or a Docker container. Tunnels and forwards start by themselves on connect; running ones are reused. A saved tunnel with a network bind address starts on 127.0.0.1 only when a database connection uses it.'),
      b('Если адрес — localhost, а порт совпадает с локальным портом сохранённого туннеля, форма предложит использовать этот туннель. Через туннель TLS по-прежнему проверяет исходное имя сервера базы.', 'When the host is localhost and the port matches a saved tunnel’s local port, the form offers to use that tunnel. Through any route, TLS still verifies the original database hostname.'),
      b('«Импорт подключения» принимает строку подключения (postgres://, mysql://, clickhouse://, redis://, mongodb://, mongodb+srv://) или файл .pgpass. Перед сохранением проверьте найденные подключения: для каждого можно отметить «Прод», выбрать маршрут и решить, сохранять ли пароль.', '“Import connection” accepts a connection string (postgres://, mysql://, clickhouse://, redis://, mongodb://, mongodb+srv://) or a .pgpass file. Review the connections found before saving: for each one, mark production, pick a route and decide whether to keep the password.'),
      b('Для рабочих баз включите «Прод — только чтение, запись лишь во временном окне». В блоке «Группа» задайте группу, метки и цвет: цвет виден на плитке и в шапке рабочей области. Поиск находит подключение по имени, адресу, базе, движку и меткам, а метки над списком работают как фильтры.', 'Turn on “Production — read only, writes only in a temporary window” for live databases. Under “Group”, set the group, tags and colour; the colour shows on the card and in the workspace header. Search matches the name, host, database, engine and tags, and the tags above the list act as filters.'),
      b('Переключатель справа от поиска меняет плитки на компактный список, как в разделе «Хосты»; выбор запоминается на этом устройстве. Значок рядом с именем показывает маршрут, меню «…» открывает подключение, изменение и удаление.', 'The toggle next to search switches between cards and a compact list, as in Hosts; the choice is remembered on this device. The icon next to a name shows the route, and the “…” menu connects, edits or deletes.'),
    ],
    note: b('Подключения синхронизируются между устройствами только в зашифрованном виде; сервер синхронизации не видит ни пароли, ни запросы. Сами запросы идут с устройства к базе по выбранному маршруту.', 'Connections sync between your devices only in encrypted form; the sync server sees neither passwords nor queries. Queries travel from the device to the database over the chosen route.'),
    links: [{ href: 'https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/DATABASES.md', text: b('Подробная инструкция по базам данных ↗', 'Full Databases instructions ↗') }],
    image: shot('db-connections', 'Демонстрационные подключения: значки маршрута, цвет, метка «ПРОД» и фильтры по меткам.', 'Demo connections: route icons, colour labels, the PROD badge and tag filters.'),
    images: [shot('db-connections-list', 'Те же подключения компактным списком.', 'The same connections as a compact list.'), shot('db-connection-form', 'Выбор маршрута в форме подключения: SSH-хост, профиль переходов, Kubernetes, туннель или контейнер Docker.', 'Choosing the route in the connection form: SSH host, jump profile, Kubernetes, tunnel or Docker container.')],
  },
  {
    id: 'databases-queries', group: 'workspace', title: b('Базы данных: структура, запросы и результаты', 'Databases: structure, queries and results'),
    keywords: ['SQL', 'EXPLAIN', 'ANALYZE', 'query', 'запрос', 'Redis', 'SCAN', 'MongoDB', 'автодополнение', 'completion', 'DDL', 'Ctrl+Enter', 'курсор', 'caret', 'выделение', 'selection', 'Выбрано строк'],
    intro: b('Нажмите на подключение, чтобы открыть рабочую область: слева структура базы, справа вкладки запросов, редактор и таблица результатов. Границы панелей перетаскиваются. Основной модификатор — ⌘ на macOS и Ctrl на Windows и Linux.', 'Click a connection to open its workspace: the database structure on the left, query tabs, the editor and the result grid on the right. Drag the panel borders to resize them. The main modifier is ⌘ on macOS and Ctrl on Windows and Linux.'),
    table: { headings: [b('Действие в редакторе', 'Editor action'), b('macOS', 'macOS'), b('Windows / Linux', 'Windows / Linux')], rows: [
      [b('Выполнить выделение или оператор на строке курсора', 'Run the selection or the statement on the caret’s line'), b('⌘↵', '⌘↵'), b('Ctrl+Enter', 'Ctrl+Enter')],
      [b('Выполнить весь скрипт', 'Run the whole script'), b('⌥X или ⇧⌘↵', '⌥X or ⇧⌘↵'), b('Alt+X или Ctrl+Shift+Enter', 'Alt+X or Ctrl+Shift+Enter')],
      [b('Дополнить у курсора', 'Complete at the caret'), b('⌃Space', '⌃Space'), b('Ctrl+Space', 'Ctrl+Space')],
      [b('Форматировать запрос', 'Format the query'), b('⇧⌘F', '⇧⌘F'), b('Ctrl+Shift+F', 'Ctrl+Shift+F')],
      [b('Закомментировать строки', 'Toggle line comments'), b('⌘/', '⌘/'), b('Ctrl+/', 'Ctrl+/')],
      [b('Поиск и замена', 'Find and replace'), b('⌘F', '⌘F'), b('Ctrl+F', 'Ctrl+F')],
      [b('Отменить запрос', 'Cancel the query'), b('⌘.', '⌘.'), b('Ctrl+.', 'Ctrl+.')],
      [b('EXPLAIN', 'EXPLAIN'), b('⌘E', '⌘E'), b('Ctrl+E', 'Ctrl+E')],
      [b('История запросов', 'Query history'), b('⌘H', '⌘H'), b('Ctrl+H', 'Ctrl+H')],
      [b('ИИ-помощник', 'AI assistant'), b('⌘I', '⌘I'), b('Ctrl+I', 'Ctrl+I')],
    ] },
    steps: [
      b('Структура загружается по мере раскрытия и раскладывает объекты по папкам: таблицы, представления, функции, последовательности, словари; у таблицы — колонки, индексы, ограничения и триггеры. Раскрытая таблица обведена рамкой, ключевые колонки отмечены значками. Поиск фильтрует уже загруженные объекты, соседняя кнопка сворачивает всё.', 'The structure loads as you expand it and sorts objects into folders: tables, views, functions, sequences, dictionaries; a table holds columns, indexes, constraints and triggers. The expanded table is framed, and key columns carry icons. Search filters the objects already loaded; the button next to it collapses everything.'),
      b('В меню объекта — «Первые 100 строк», «Показать DDL», «Вставить имя» и «Сведения об объекте». Для коллекции MongoDB есть «Схема по выборке документов»: типы полей и доля документов, в которых поле встречается.', 'An object’s menu offers “Preview first 100 rows”, “Show DDL”, “Insert identifier” and “Object details”. A MongoDB collection also has “Infer schema from sample”: field types and the share of documents that contain each field.'),
      b('Двойной щелчок по таблице или «Первые 100 строк» сразу выполняют запрос и показывают данные внизу — во вкладке просмотра «имя — данные». Такая вкладка одна и переиспользуется для следующей таблицы; если изменить её текст, она становится обычной вкладкой.', 'Double-clicking a table or choosing “Preview first 100 rows” runs the query right away and shows the data below in a preview tab named “name — data”. There is one such tab, reused for the next table; once you edit its text it becomes an ordinary tab.'),
      b('«Сведения об объекте» для PostgreSQL, MySQL/MariaDB, ClickHouse и Redis собраны по разделам: владелец, оценка числа строк, размеры данных и индексов, число колонок и индексов, ключи секционирования и сортировки, последние VACUUM и ANALYZE, для ключа Redis — тип, TTL, длина и память. Размеры показаны в КиБ/МиБ, оценки помечены «≈», «Копировать» копирует всё текстом. Где сведений нет, пункт меню скрыт.', '“Object details” for PostgreSQL, MySQL/MariaDB, ClickHouse and Redis are grouped in sections: owner, estimated rows, data and index sizes, column and index counts, partitioning and sorting keys, last VACUUM and ANALYZE, and for a Redis key its type, TTL, length and memory. Sizes are in KiB/MiB, estimates are marked “≈” and “Copy” copies everything as text. Where there is nothing to show, the menu item is hidden.'),
      b('DDL показывается с подсветкой и номерами строк, каждый оператор (CREATE TABLE, каждый CREATE INDEX) отделён чертой. Окно подстраивается под ширину экрана; длинные строки переносятся с отступом, а если выключить «Переносить строки», прокручиваются вбок — выбор запоминается. «Копировать» копирует весь текст, «Открыть в редакторе» добавляет его в текущую вкладку ниже написанного; ничего не выполняется.', 'DDL is shown highlighted with line numbers, each statement (CREATE TABLE, every CREATE INDEX) separated by a rule. The dialog follows the window width; long lines wrap with an indent, and turning off “Wrap lines” scrolls them sideways instead, a choice that is remembered. “Copy” copies the whole text, and “Open in editor” adds it to the current tab below the existing text; nothing runs.'),
      b('Редактор нумерует строки, подсвечивает синтаксис и дополняет ключевые слова, таблицы и колонки, в том числе по псевдониму: o. после FROM orders o. Кнопка «+» над редактором открывает новую вкладку запроса.', 'The editor numbers lines, highlights syntax and completes keywords, tables and columns, including through an alias: o. after FROM orders o. The “+” above the editor opens another query tab.'),
      b('«Выполнить» и ⌘↵ / Ctrl+Enter запускают выделенный фрагмент, а без выделения — оператор на строке курсора, как в привычных SQL-клиентах. Операторы разделяются точкой с запятой и пустыми строками; с любой строки многострочного оператора выполняется он целиком, а на пустой строке — ближайший оператор выше. Стрелка рядом предлагает «Весь скрипт»: операторы выполняются по очереди и останавливаются на первой ошибке. Переменные вида {{name}} заполняются в отдельном окне и передаются драйверу параметрами, а не вклеиваются в текст.', '“Run” and ⌘↵ / Ctrl+Enter execute the selection or, without one, the statement on the caret’s line, as in familiar SQL clients. Statements end at a semicolon or a blank line; from any line of a multi-line statement the whole statement runs, and on a blank line the nearest statement above runs. The arrow next to Run offers “Whole script”: statements run one by one and stop at the first error. Variables such as {{name}} are filled in a separate window and bound as driver parameters, never pasted into the text.'),
      b('Результат — компактная таблица с номерами строк. Колонки сортируются, фильтруются, закрепляются и скрываются; длинное значение открывается целиком. Сначала загружается часть строк (лимит задаётся в «Ограничениях» подключения), остальное — кнопкой «Загрузить ещё». Строка состояния показывает число строк и время. На телефоне результат показан карточками записей.', 'Results are a compact grid with row numbers. Columns can be sorted, filtered, pinned and hidden; a long value opens in full. The first rows load right away (the limit is set under the connection’s Limits), the rest with “Load more”. The status bar shows the row count and time. On a phone, results appear as record cards.'),
      b('Щелчок по ячейке выделяет её рамкой, ⌘C / Ctrl+C копирует значение. Щелчок по номеру строки выбирает строку, Shift+щелчок расширяет выбор, ⌘/Ctrl+щелчок добавляет или убирает строку, Esc снимает выбор. В строке состояния появляется «Выбрано строк: N», а копирование, экспорт и ИИ-помощник работают с выбранными строками.', 'A click frames a cell, and ⌘C / Ctrl+C copies its value. A click on a row number selects the row, Shift+click extends the selection, ⌘/Ctrl+click adds or removes a row and Esc clears the selection. The status line shows “Selected: N rows”, and copy, export and the AI assistant use the selected rows.'),
      b('EXPLAIN строит дерево плана: у каждого шага строки и стоимость, полоса показывает долю самого шага, «JSON» открывает исходный план. «Выполнить с ANALYZE» добавляет реальное время, но действительно выполняет запрос, поэтому доступно только для непрод-подключений и требует подтверждения.', 'EXPLAIN draws the plan as a tree: each step shows rows and cost, a bar marks the step’s own share, and “JSON” opens the raw plan. “Execute with ANALYZE” adds real timings but actually runs the query, so it is available only for non-production connections and asks for confirmation first.'),
      b('Redis: ключи раскладываются по папкам по разделителю «:» и читаются порциями через SCAN, у ключа видны тип и TTL. Команда KEYS не выполняется — вместо неё предлагается такой же SCAN, который добавляется в текущую вкладку. MongoDB: команды пишутся в привычном синтаксисе оболочки, например db.orders.find({ status: "paid" }).', 'Redis: keys are grouped into folders by the “:” separator and read page by page with SCAN; each key shows its type and TTL. KEYS is never run; the equivalent SCAN is offered instead and added to the current tab. MongoDB: commands use the familiar shell syntax, for example db.orders.find({ status: "paid" }).'),
    ],
    note: b('Значения колонок с именами вроде password, token или secret скрыты. Скопированные из результата данные удаляются из буфера по таймеру из настроек безопасности.', 'Values in columns named like password, token or secret are masked. Data copied from results is cleared from the clipboard by the timer in security settings.'),
    image: shot('db-workspace', 'Рабочая область: раскрытая таблица orders, запрос с подсветкой и результат на демонстрационных данных; в шапке — статус TLS и «Разблокировать прод».', 'The workspace: the expanded orders table, a highlighted query and its result on demo data; the header shows the TLS status and Unlock production.'),
    images: [shot('db-preview-tab', 'Вкладка просмотра «orders — данные»: первые строки таблицы показаны сразу.', 'The “orders — data” preview tab: the table’s first rows appear right away.'), shot('db-details', 'Сведения о таблице orders: разделы, размеры в МиБ, оценки со знаком «≈».', 'Details of the orders table: sections, sizes in MiB and estimates marked “≈”.'), shot('db-explain', 'План EXPLAIN: шаги, оценка строк и стоимости, полосы показывают долю каждого шага.', 'An EXPLAIN plan: steps, estimated rows and cost; bars show each step’s share.'), shot('db-ddl', 'DDL таблицы orders: подсветка, номера строк, операторы разделены чертой, кнопка переноса строк.', 'DDL of the orders table: highlighting, line numbers, statements separated by rules and the line-wrap button.'), shot('db-row-selection', 'Выбраны три строки: в строке состояния «Выбрано строк: 3».', 'Three rows selected: the status line reads “Selected: 3 rows”.')],
  },
  {
    id: 'databases-changes', group: 'workspace', title: b('Базы данных: прод, изменения, история и экспорт', 'Databases: production, changes, history and export'),
    keywords: ['production', 'прод', 'read only', 'только чтение', 'UPDATE', 'CSV', 'JSON', 'export', 'экспорт', 'history', 'история', 'правка', 'edit', 'ячейка', 'cell', 'NULL'],
    intro: b('Прод-подключение работает только на чтение, а любое изменение сначала показывается вам. В непрод-сессии запись включается явно, в проде — только во временном окне.', 'A production connection is read-only, and any change is shown to you before it runs. Writes are turned on explicitly in a non-production session, and in production only within a temporary window.'),
    steps: [
      b('Прод защищён в два слоя. На сервере PostgreSQL и MySQL/MariaDB выполняют запросы в транзакции только для чтения, а ClickHouse получает readonly. В приложении каждый запрос разбирается до отправки: изменяющие команды и попытки снять защиту не уходят на сервер. Если изменить прод всё же нужно, откройте временное окно записи — см. главу «Базы данных: запись в прод».', 'Production has two layers of protection. On the server, PostgreSQL and MySQL/MariaDB run queries in read-only transactions and ClickHouse gets readonly. In the app, each query is parsed before sending: changing commands and attempts to lift the protection never reach the server. When production must be changed, open a temporary write window; see “Databases: writing to production”.'),
      b('Кнопка «Проверить права» в шапке рабочей области сообщает, подтверждена ли защита на сервере и может ли роль писать. Для прода лучше роль только для чтения: SELECT или pg_read_all_data в PostgreSQL, SELECT в MySQL, профиль readonly в ClickHouse, ACL +@read -@write в Redis, роль read в MongoDB.', '“Check privileges” in the workspace header reports whether server-side protection is verified and whether the role can write. For production, prefer a read-only role: SELECT or pg_read_all_data in PostgreSQL, SELECT in MySQL, a readonly profile in ClickHouse, ACL +@read -@write in Redis and the read role in MongoDB.'),
      b('Непрод-подключение тоже открывается в режиме «Только чтение». Кнопка с замком в шапке разрешает запись до закрытия подключения. Изменяющий или опасный запрос (DROP, TRUNCATE, UPDATE или DELETE без WHERE, FLUSHALL, удаление коллекции) показывается в окне «Подтверждение запроса» блоком кода с подсветкой и номерами строк, его можно выделить и скопировать. Выполнить запрос можно только после ввода пароля хранилища; неверный пароль ничего не выполняет.', 'A non-production connection also opens read-only. The lock button in the header allows writes until the connection closes. A changing or dangerous query (DROP, TRUNCATE, UPDATE or DELETE without WHERE, FLUSHALL, dropping a collection) is shown in “Review query” as a highlighted code block with line numbers that you can select and copy. It runs only after you enter the vault passphrase; a wrong passphrase runs nothing.'),
      b('На компьютере, когда запись разрешена (непрод-сессия или прод с открытым окном записи), ячейки результата простого SELECT из одной таблицы с первичным ключом правятся прямо в таблице. Двойной щелчок открывает ячейку: Enter сохраняет значение, Esc отменяет правку, Tab переходит к следующей ячейке. Тип значения берётся из колонки и проверяется при вводе, NULL задаётся отдельной кнопкой. Изменённые ячейки подсвечиваются.', 'On desktop, when writes are allowed (a non-production session or production with an open write window), cells of a simple single-table SELECT with a primary key are edited right in the grid. Double-click a cell: Enter keeps the value, Esc cancels the edit and Tab moves to the next cell. The value type comes from the column and is checked as you type; NULL has its own button. Changed cells are highlighted.'),
      b('Правки копятся. «Проверить изменения» показывает сгенерированные UPDATE по первичному ключу с самими значениями — строки в кавычках, NULL для пустых, длинные значения сокращены; выполняется по-прежнему запрос с параметрами. Применение подтверждается паролем хранилища, «Отменить изменения» сбрасывает правки. После подтверждения правки применяются одной транзакцией; если хотя бы одна не нашла свою строку, откатываются все. Без права записи двойной щелчок открывает просмотр значения.', 'Edits accumulate. “Review pending edits” shows the generated UPDATE statements keyed by the primary key with the actual values — quoted strings, NULL for empty cells, long values shortened — while what runs is still the parameterized query. Applying needs the vault passphrase, and “Discard changes” drops the edits. Once confirmed, the edits apply in one transaction; if any of them does not find its row, all of them roll back. Without write access, a double-click opens the value viewer.'),
      b('«История запросов» хранит текст, время, длительность, число строк и ошибки, но не значения параметров и не данные. Есть фильтры «Успешные», «С ошибками» и «Избранное». По умолчанию история зашифрована и хранится только на этом устройстве; её можно включить в синхронизацию или отключить. Запрос из истории сохраняется как сниппет, а {{name}} становятся его переменными.', '“Query history” keeps the text, time, duration, row count and errors, but not parameter values or data. Filter by Successful, With errors or Favorites. By default history is encrypted and stays on this device; you can sync it or turn it off. Save a query from history as a snippet, and its {{name}} placeholders become snippet variables.'),
      b('Скопируйте ячейку, строку, выделение или весь загруженный результат. «Экспорт результата» заново выполняет запрос на чтение и потоком пишет в файл все строки — CSV, TSV, JSON, NDJSON, Markdown или SQL INSERT, с прогрессом и отменой. В CSV и TSV формулы для табличных редакторов экранируются (флажок «Экранировать формулы (для Excel)», включён по умолчанию), а SQL INSERT экранирует кавычки и обратную косую черту по правилам каждой базы. Изменяющий запрос для экспорта не повторяется.', 'Copy a cell, a row, a selection or the whole loaded result. “Export result” re-runs the read query and streams every row to a file as CSV, TSV, JSON, NDJSON, Markdown or SQL INSERT, with progress and cancellation. CSV and TSV escape spreadsheet formulas (“Escape formulas (for Excel)”, on by default), and SQL INSERT escapes quotes and backslashes correctly for each database. A changing query is never repeated for export.'),
    ],
    note: b('Защита в приложении дополняет права базы, но не заменяет их. Главное ограничение для прода — учётная запись только для чтения.', 'The app’s protection complements database privileges but does not replace them. For production, a read-only account remains the main safeguard.'),
    image: shot('db-prod-write', 'Правка в таблице: изменённая ячейка подсвечена, следующая открыта для ввода, «Проверить изменения (1)» покажет UPDATE.', 'Editing in the grid: the changed cell is highlighted, the next one is open for input, and “Review pending edits (1)” shows the UPDATE.'),
    images: [shot('db-query-review', 'Проверка правок: UPDATE с самими значениями и поле пароля хранилища.', 'Reviewing edits: the UPDATE statements with the actual values and the vault passphrase field.')],
  },
  {
    id: 'databases-production', group: 'workspace', title: b('Базы данных: запись в прод', 'Databases: writing to production'),
    keywords: ['production', 'прод', 'Разблокировать прод', 'Unlock production', 'Заблокировать', 'Lock', 'окно записи', 'write window', 'Изменение в проде', 'Production change'],
    intro: b('Прод-подключение открывается только на чтение. Если изменить прод всё же нужно, откройте временное окно записи: оно действует несколько минут и только в этом сеансе.', 'A production connection opens read-only. When production must be changed, open a temporary write window: it lasts a few minutes and applies to this session only.'),
    steps: [
      b('Нажмите «Разблокировать прод» в шапке рабочей области. Введите пароль хранилища и выберите срок: 5, 15 или 30 минут. Пароль хранилища проверяется в ядре приложения.', 'Choose “Unlock production” in the workspace header. Enter the vault passphrase and pick 5, 15 or 30 minutes. The passphrase is checked by the app core.'),
      b('Пока окно открыто, в шапке горит красная метка «Запись в прод до ЧЧ:ММ» с обратным отсчётом и кнопкой «Заблокировать». Каждый изменяющий запрос по-прежнему показывается на проверку и выполняется только после ввода пароля хранилища. Ячейки результата можно править прямо в таблице.', 'While the window is open, the header shows a red “Production writes until HH:MM” badge with a countdown and a Lock button. Every changing statement is still shown for review and runs only after you enter the vault passphrase. Result cells can be edited right in the grid.'),
      b('Окно закрывается само по истечении срока, по кнопке «Заблокировать», при отключении, блокировке хранилища или смене профиля. Чтения и в открытом окне идут в транзакциях только для чтения.', 'The window closes by itself when the time runs out, on Lock, on disconnect, when the vault locks or when the profile changes. Reads still run in read-only transactions while it is open.'),
      b('Роль только для чтения сервер не пропустит и в открытом окне: после разблокировки приложение проверяет права и предупреждает, если роль не может писать. Изменения, сделанные в окне, отмечены в истории запросов меткой «Изменение в проде».', 'The server still refuses a read-only role: after unlocking, the app checks privileges and warns when the role cannot write. Changes made in the window are marked “Production change” in query history.'),
    ],
    note: b('На телефонах окно записи недоступно. Для повседневной работы с продом лучше учётная запись базы только для чтения: тогда случайное изменение невозможно даже в открытом окне.', 'Phones never get a write window. For everyday work with production, prefer a read-only database account: then an accidental change is impossible even with the window open.'),
    image: shot('db-prod-unlock', 'Разблокировка прода: пароль хранилища и срок окна записи.', 'Unlocking production: the vault passphrase and the length of the write window.'),
    images: [shot('db-prod-write', 'Открытое окно записи: красная метка со временем окончания, обратный отсчёт и кнопка «Заблокировать».', 'An open write window: the red badge with its end time, the countdown and the Lock button.')],
  },
  {
    id: 'databases-ai', group: 'workspace', title: b('Базы данных: ИИ-помощник', 'Databases: AI assistant'),
    keywords: ['AI', 'ИИ', 'SQL', 'assistant', 'помощник', 'consent', 'согласие'],
    intro: b('Помощник составляет, объясняет, исправляет и ускоряет запросы. Он работает с провайдером из «Настройки → ИИ» и ничего не выполняет сам.', 'The assistant writes, explains, fixes and speeds up queries. It uses the provider from Settings → AI and never runs anything on its own.'),
    steps: [
      b('Откройте панель кнопкой ИИ в шапке рабочей области или сочетанием ⌘I / Ctrl+I. Выберите провайдера и задачу: составить, объяснить, исправить или оптимизировать запрос по плану EXPLAIN, перевести в другой диалект, сделать сниппет с переменными, предложить типовые запросы или объяснить выбранные строки.', 'Open the panel with the AI button in the workspace header or ⌘I / Ctrl+I. Pick the provider and the task: compose, explain, fix or optimize a query using its EXPLAIN plan, translate it to another dialect, turn it into a parameterized snippet, suggest example queries or explain selected rows.'),
      b('Опишите, что нужно, и нажмите «ИИ-помощник». В окне «Проверьте контекст ИИ» отметьте, что можно передать: метаданные схемы, явно выбранные строки, выборку до 20 строк или один запрос на чтение до 50 строк. По умолчанию всё выключено, а без согласия модель не получает ни схему, ни данные.', 'Describe what you need and choose “AI assistant”. In “Review AI context”, tick what may be shared: schema metadata, explicitly selected rows, a sample of up to 20 rows or one read-only query of up to 50 rows. Everything starts off, and without consent the model receives neither schema nor data.'),
      b('Ответ приходит черновиком с пояснением и списком переданного контекста. «Принять черновик» добавляет его в текущую вкладку редактора ниже написанного — запуск остаётся за вами, с обычными проверками. «Уточнить» продолжает разговор, «Отклонить» убирает черновик.', 'The answer arrives as a draft with an explanation and the list of context that was shared. “Accept draft” adds it to the current editor tab below the existing text; running it is up to you, with the usual checks. “Refine” continues the conversation and “Reject” discards the draft.'),
      b('Пароли, строки подключения и адреса серверов модель не получает никогда. Для внешних провайдеров со строгой приватностью имена таблиц и колонок заменяются псевдонимами перед отправкой и восстанавливаются в ответе. Для прод-подключений черновики DDL только показываются.', 'Passwords, connection strings and server addresses are never sent to the model. For external providers with Strict privacy, table and column names are replaced with aliases before sending and restored in the answer. For production connections, DDL drafts are shown but cannot be run.'),
    ],
    note: b('Кнопка со щитом в панели отзывает выданное согласие для текущего подключения.', 'The shield button in the panel revokes the consent given for the current connection.'),
    image: shot('db-ai', 'ИИ-помощник: черновик запроса по описанию; модели переданы только имена двух таблиц.', 'The AI assistant: a draft query from a description; only two table names were shared with the model.'),
  },
  {
    id: 'docker-containers', group: 'workspace', title: b('Docker: хосты и контейнеры', 'Docker: hosts and containers'),
    keywords: ['Docker', 'container', 'контейнер', 'compose', 'docker.sock', 'docker group', 'SSH'],
    intro: b('Раздел Docker подключается к движку на этом компьютере или на сохранённом SSH-хосте. К удалённому движку клиент обращается через SSH-подключение хоста.', 'The Docker section connects to the engine on this computer or on a saved SSH host. A remote engine is reached through the host’s SSH connection.'),
    steps: [
      b('Откройте Docker в боковом меню. В списке — «Этот компьютер» и сохранённые SSH-хосты; найдите нужный и нажмите «Подключиться». В шапке появятся версия движка, платформа и число запущенных контейнеров.', 'Open Docker in the sidebar. The list shows This computer and your saved SSH hosts; find one and choose Connect. The header then shows the engine version, platform and the number of running containers.'),
      b('Если у SSH-пользователя нет прав на сокет Docker, это видно сразу: приложение покажет команду добавления пользователя в группу docker. Выполните её на хосте сами и подключитесь снова — новая группа действует в новых SSH-сессиях. Если sshd запрещает проброс сокета, включите AllowStreamLocalForwarding yes или установите на хосте docker CLI.', 'If the SSH user cannot access the Docker socket, you see it right away, along with the command that adds the user to the docker group. Run it on the host yourself and reconnect; the new group applies to new SSH sessions. If sshd forbids socket forwarding, set AllowStreamLocalForwarding yes or install the docker CLI on the host.'),
      b('Контейнеры сгруппированы по compose-проектам, запущенные — сверху, отдельные контейнеры — в конце. Заголовок группы показывает, сколько запущено, и сворачивает её. Фильтр ищет по имени и образу, переключатель «Все / Запущенные / Остановленные» сужает список.', 'Containers are grouped by compose project, with running ones first and standalone containers last. A group header shows how many are running and collapses the group. The filter matches names and images, and the All / Running / Stopped switch narrows the list.'),
      b('В строке контейнера видны состояние, проверка здоровья, образ, короткий ID и порты. Кнопки запускают, останавливают и перезапускают контейнер, открывают логи и терминал. В меню «…» — пауза, принудительное завершение, удаление, проброс порта, сведения и копирование ID. Завершение и удаление требуют подтверждения; именованные тома при удалении сохраняются.', 'Each row shows the state, health check, image, short ID and ports. Buttons start, stop and restart the container and open its logs and terminal. The “…” menu adds pause, kill, remove, port forwarding, details and Copy ID. Kill and Remove ask for confirmation; named volumes survive removal.'),
    ],
    note: b('Действия выполняются с правами пользователя Docker на хосте: приложение не повышает права и не запускает sudo. Смена профиля и блокировка хранилища закрывают сессию Docker.', 'Actions run with the Docker user’s rights on the host: the app never elevates privileges or runs sudo. Switching profiles or locking the vault closes the Docker session.'),
    links: [{ href: 'https://github.com/evsikovas/consolecrypt-docs/blob/main/docs/public/DOCKER.md', text: b('Подробная инструкция по Docker ↗', 'Full Docker instructions ↗') }],
    image: shot('docker-hosts', 'Выбор движка: этот компьютер или сохранённый SSH-хост.', 'Choosing an engine: this computer or a saved SSH host.'),
    images: [shot('docker-containers', 'Демонстрационные контейнеры по compose-проектам с фильтром состояния.', 'Demo containers grouped by compose project, with the state filter.')],
  },
  {
    id: 'docker-details', group: 'workspace', title: b('Docker: сведения, логи, тома и пробросы', 'Docker: details, logs, volumes and forwards'),
    keywords: ['Docker', 'logs', 'логи', 'terminal', 'терминал', 'volume', 'том', 'mount', 'SFTP', 'port forward', 'проброс', 'environment', 'секреты', 'secrets', 'JSON', 'inspect', 'Показать полностью', 'Show in full'],
    intro: b('Нажмите на контейнер, чтобы открыть его сведения справа, не теряя список.', 'Click a container to open its details on the right while keeping the list in view.'),
    steps: [
      b('Вкладка «Обзор» показывает образ, команду, перезапуски, порты, сети с IP-адресами, монтирования, метки и переменные окружения. «JSON» — полный ответ inspect с кнопкой копирования.', 'The Overview tab shows the image, command, restarts, ports, networks with IP addresses, mounts, labels and environment variables. JSON holds the full inspect output with a copy button.'),
      b('Пароли, токены и ключи скрыты не только в переменных окружения, но и в адресах, командах и аргументах, метках, на вкладке JSON и в просмотре compose. Ссылки вида ${POSTGRES_PASSWORD} остаются видны — это не сам секрет.', 'Passwords, tokens and keys are masked not only in environment variables but also in URLs, commands and arguments, labels, the JSON tab and the compose view. References such as ${POSTGRES_PASSWORD} stay visible: they are not the secret itself.'),
      b('«Показать секреты» в переменных и «Показать полностью» на вкладке JSON запрашивают пароль хранилища. Скопированный текст сам удаляется из буфера обмена, «Скрыть секреты» снова прячет значения, а раскрытое забывается при закрытии карточки, обновлении и блокировке хранилища.', '“Show secrets” in the environment and “Show in full” on the JSON tab ask for the vault passphrase. Copied text clears from the clipboard automatically, “Hide secrets” masks the values again, and revealed data is forgotten when the details close or reload and when the vault locks.'),
      b('Вкладка «Логи» следит за новыми строками, stderr выделен цветом. Доступны пауза (новые строки копятся), отметки времени, поиск с числом совпадений, копирование показанных строк и очистка. «Терминал» открывает оболочку внутри контейнера отдельной вкладкой: автовыбор пробует bash, ash и sh, либо укажите оболочку сами.', 'The Logs tab follows new lines, with stderr in its own colour. Pause (new lines are kept), timestamps, search with a match count, copying the shown lines and clearing are available. Terminal opens a shell inside the container in its own terminal tab: automatic detection tries bash, ash and sh, or choose the shell yourself.'),
      b('Вид «Тома» показывает тома по compose-проектам и контейнеры, которые их используют; неиспользуемые помечены. Путь тома или монтирования открывается в SFTP этого SSH-хоста, а для локального Docker — в файловом менеджере. Тома Docker Desktop хранятся внутри его виртуальной машины, поэтому их папку с компьютера не открыть.', 'The Volumes view lists volumes by compose project with the containers that use them; unused ones are marked. A volume or mount path opens in SFTP on that SSH host, or in the file manager for local Docker. Docker Desktop keeps volumes inside its virtual machine, so their folders cannot be opened from the computer.'),
      b('«Пробросить порт» связывает локальный порт с портом контейнера; 0 выбирает свободный порт. Для SSH-хоста проброс идёт через SSH-подключение. Запущенные пробросы Docker и Kubernetes собраны в общей правой панели «Проброс портов»: адрес с копированием, трафик и остановка.', '“Forward port” links a local port to a container port; 0 picks a free one. On an SSH host, the forward runs through the SSH connection. Running Docker and Kubernetes forwards share the right-hand “Port forwards” panel with the address, a copy button, traffic and Stop.'),
      b('У контейнера со стандартным портом базы данных есть кнопка «Подключиться к БД». Если подключение с таким маршрутом уже сохранено, оно сразу откроется в «Базах данных». Иначе появится форма с движком, портом, маршрутом и — если они есть в окружении — именем базы и пользователем; останется ввести пароль. Опубликованный порт сохраняется как обычный адрес, а для неопубликованного проброс восстанавливается при каждом подключении.', 'A container with a standard database port has a “Connect to database” button. If a connection with the same route is already saved, it opens in Databases at once. Otherwise a form appears with the engine, port and route filled in, plus the database name and user when the environment has them; only the password is left. A published port is saved as an ordinary address; for an unpublished one, the forward is restored on every connect.'),
    ],
    image: shot('docker-details', 'Сведения контейнера: порты, сети, монтирования, метки и скрытые секреты окружения.', 'Container details: ports, networks, mounts, labels and masked environment secrets.'),
    images: [shot('docker-json', 'Вкладка JSON: пароль в команде скрыт, полный текст — после пароля хранилища.', 'The JSON tab: the password in the command is masked; the full text needs the vault passphrase.'), shot('docker-volumes', 'Тома по проектам и контейнеры, которые их используют.', 'Volumes by project and the containers that use them.'), shot('docker-forwards', 'Проброс порта контейнера в общей правой панели.', 'A container port forward in the shared right panel.'), shot('docker-database', '«Подключиться к БД»: форма с маршрутом «Контейнер Docker», осталось ввести пароль.', '“Connect to database”: the form with the Docker container route; only the password is left.')],
  },
  {
    id: 'docker-compose', group: 'workspace', title: b('Docker: compose-проекты', 'Docker: compose projects'),
    keywords: ['Docker', 'compose', 'YAML', 'docker compose', 'compose.yaml', 'up -d', 'backup'],
    intro: b('Меню заголовка compose-группы управляет всем проектом и открывает его файлы.', 'The menu on a compose group header controls the whole project and opens its files.'),
    steps: [
      b('Нажмите «…» в заголовке проекта или щёлкните по нему правой кнопкой мыши. «Запустить все» запускает только остановленные контейнеры; «Остановить все» и «Перезапустить все» сообщают, сколько контейнеров затронут, и ждут подтверждения.', 'Choose “…” on the project header or right-click it. “Start all” starts only the stopped containers; “Stop all” and “Restart all” say how many containers are affected and wait for confirmation.'),
      b('«Показать YAML» открывает файлы проекта вкладками, с номерами строк и подсветкой; вверху указаны папка проекта и файлы окружения. Файл, который SSH-пользователь не может прочитать, помечается отдельно. Пароли и токены в файлах скрыты; «Показать полностью» открывает исходный текст после пароля хранилища. Копирование идёт через буфер с автоочисткой.', '“View YAML” opens the project files as tabs with line numbers and highlighting; the project folder and environment files are listed at the top. A file the SSH user cannot read is marked as such. Passwords and tokens in the files are masked; “Show in full” shows the original text after the vault passphrase. Copying goes through the self-clearing clipboard.'),
      b('Чтобы изменить файлы, нажмите «Изменить YAML» и введите пароль хранилища: compose-файлы могут содержать пароли и определяют, что запущено на хосте. Разрешение на правку действует ограниченное время; после него пароль спросят снова.', 'To edit, choose “Edit YAML” and enter the vault passphrase: compose files can contain passwords and decide what runs on the host. Editing permission lasts a limited time; after that the passphrase is asked again.'),
      b('«Сохранить и применить» сначала проверяет конфигурацию на хосте командой compose config. При ошибке ничего не сохраняется. Затем рядом с файлом остаётся резервная копия вида compose.yaml.bak-ГГГГММДД-ЧЧММСС, файл записывается, и проект обновляется командой compose up -d; её вывод виден в окне. «Сохранить без применения» оставляет запущенные контейнеры на прежней конфигурации.', '“Save and apply” first validates the configuration on the host with compose config; on errors nothing is saved. Then a backup such as compose.yaml.bak-YYYYMMDD-HHMMSS is kept next to the file, the file is written and the project is updated with compose up -d, whose output appears in the window. “Save without applying” leaves the running containers on the previous configuration.'),
      b('Если файл изменился на хосте после открытия, сохранение отменяется: скопируйте свои правки и откройте файл заново. Без прав на запись файл не меняется.', 'If a file changed on the host after you opened it, saving is refused: copy your edits and open the file again. Without write permission, the file stays unchanged.'),
      b('Сохранение защищено от подмены файлов. Временный файл и резервная копия создаются без перехода по символическим ссылкам, а до и после замены приложение сверяет, что это всё ещё записанный им файл. Если файл подменили, сохранение прерывается, а исходный файл восстанавливается из резервной копии. Если каталог проекта доступен на запись другим пользователям, перед сохранением появится предупреждение.', 'Saving is protected against file swaps. The temporary file and the backup are created without following symbolic links, and before and after the replacement the app checks that the file is still the one it wrote. If a file was swapped, saving stops and the original is restored from the backup. If other users can write to the project folder, a warning appears before saving.'),
    ],
    note: b('Проекты, контейнеры которых не хранят меток compose с путями к файлам (старые версии compose или другие инструменты), просмотр и правку YAML не поддерживают.', 'Projects whose containers do not carry the compose labels with file paths (older compose versions or other tools) cannot show or edit their YAML.'),
    image: shot('docker-compose-menu', 'Меню compose-проекта: YAML и действия со всеми контейнерами.', 'The compose project menu: YAML and actions on every container.'),
    images: [shot('docker-compose-yaml', 'Файлы compose вкладками с номерами строк: пароли скрыты, «Показать полностью» и правка — после пароля хранилища.', 'Compose files as tabs with line numbers: passwords are masked; “Show in full” and editing require the vault passphrase.')],
  },
  {
    id: 'server-setup', group: 'control', title: b('Свой сервер: Kubernetes', 'Your own server: Kubernetes'),
    intro: b('Сервер нужен для синхронизации устройств и совместной работы. Для локальной работы клиента он не требуется. Ни сайт продукта, ни аналитика для установки собственного сервера не нужны.', 'A server enables device sync and collaboration. The client does not need one for local use. Neither the product website nor analytics is required to run your own server.'),
    keywords: ['self-host', 'hosting', 'Helm', 'Kubernetes', 'PostgreSQL'],
    steps: [
      b('Подготовьте Kubernetes, Helm, PostgreSQL 16 и домен с HTTPS. Для небольшой установки можно использовать встроенную PostgreSQL из Helm chart; подробные варианты описаны в инструкции ниже.', 'Prepare Kubernetes, Helm, PostgreSQL 16 and an HTTPS domain. A small installation can use the PostgreSQL bundled with the Helm chart; the full instructions below describe both options.'),
      b('Скачайте исходники. Храните kubeconfig, пароль базы и SMTP-пароль вне репозитория. Создайте namespace и Secret с URL вашей PostgreSQL из приватного файла.', 'Download the source. Keep kubeconfig, the database password and SMTP password outside the repository. Create a namespace and a Secret containing your PostgreSQL URL from a private file.'),
      b('Скопируйте пример Helm values в приватный каталог. Задайте адрес образа и его неизменяемый digest, свой домен, IngressClass, TLS и существующий Secret базы. Оставьте обязательные подписи запросов включёнными.', 'Copy the example Helm values into a private directory. Configure the image repository and immutable digest, your domain, IngressClass, TLS and existing database Secret. Keep mandatory request signatures enabled.'),
      b('Проверьте values через helm lint и установите chart. Пример ниже рассчитан на внешний PostgreSQL и уже настроенный TLS Ingress; реальные домены и пути подставьте свои.', 'Validate the values with helm lint and install the chart. The example below assumes external PostgreSQL and an already configured TLS Ingress; substitute your own domains and file paths.'),
      b('Ingress должен пропускать только /v1, /healthz и /readyz, передавать WebSocket /v1/events/ws, принимать тела запросов до 16 МиБ и не менять путь, параметры и тело: запросы подписаны. Порт метрик 9090 в Ingress не публикуйте.', 'The Ingress should pass only /v1, /healthz and /readyz, forward the /v1/events/ws WebSocket, accept request bodies up to 16 MiB and never rewrite the path, query or body: requests are signed. Do not publish metrics port 9090 through the Ingress.'),
      b('Проверьте /readyz и /v1/meta: в ответе видны server_version, protocol_version и возможности сервера. Для команд нужен сервер 0.2.1, для корпоративного входа и общих заметок — 0.2.0; если версия старше, закрепите в values свежий digest образа (см. «Свой сервер: резервные копии, обновления и команды»). В клиенте выберите подключение к серверу и укажите базовый HTTPS-адрес без /v1. Войдите или зарегистрируйтесь и проверьте синхронизацию на втором устройстве.', 'Check /readyz and /v1/meta: the reply shows server_version, protocol_version and the server’s capabilities. Teams need server 0.2.1, corporate sign-in and shared notes need 0.2.0; if the version is older, pin a newer image digest in your values (see “Your own server: backups, upgrades and commands”). In the client, choose a server connection and enter its base HTTPS address without /v1. Sign in or register and test sync on a second device.'),
      b('Для почты настройте SMTP с TLS и отдельным Secret (mail.transport: smtp); без почты администратор подтверждает адреса командой admin verify-email. Команды включены по умолчанию, а совместный доступ, общие заметки и защита от входа с нового устройства включаются отдельными флагами — см. «Свой сервер: возможности, флаги и лимиты». Настройте резервные копии PostgreSQL и проверяйте восстановление до обновлений.', 'For email, configure SMTP with TLS and a separate Secret (mail.transport: smtp); without mail, the administrator verifies addresses with admin verify-email. Teams are on by default, while sharing, shared notes and new-device protection are enabled with separate flags — see “Your own server: features, flags and limits”. Schedule PostgreSQL backups and verify restoration before upgrades.'),
    ],
    blocks: [
      {
        title: b('1. Исходники и Secret базы', '1. Source and database Secret'),
        caption: b('Пример для sh/bash/zsh. Файл database-url содержит строку подключения вашей базы; команда читает его, не выводя содержимое.', 'Example for sh/bash/zsh. The database-url file contains your database connection string; the command reads it without printing its contents.'),
        code: 'git clone https://github.com/evsikovas/consolecrypt-server.git\ncd consolecrypt-server\nkubectl --kubeconfig /private/path/kubeconfig.yaml create namespace consolecrypt\nkubectl --kubeconfig /private/path/kubeconfig.yaml -n consolecrypt create secret generic consolecrypt-database \\\n  --from-file=database-url=/private/path/database-url',
      },
      {
        title: b('2. Проверка и установка Helm chart', '2. Validate and install the Helm chart'),
        caption: b('Сначала заполните приватный файл values.yaml по полной инструкции. Пример работает с Helm 3 и 4. Перед обновлением сохраните резервную копию базы: откат Helm не отменяет миграции.', 'Complete your private values.yaml using the full instructions first. The example works with Helm 3 and 4. Back up the database before upgrading: a Helm rollback does not undo migrations.'),
        code: 'helm lint server/helm/consolecrypt-server -f /private/path/values.yaml\nhelm upgrade --install consolecrypt server/helm/consolecrypt-server \\\n  --namespace consolecrypt \\\n  --kubeconfig /private/path/kubeconfig.yaml \\\n  -f /private/path/values.yaml \\\n  --history-max 10 --wait --timeout 10m',
      },
      {
        title: b('3. Проверка работающего API', '3. Check the running API'),
        caption: b('Используйте свой домен. /readyz подтверждает готовность базы, /v1/meta показывает версию и протокол сервера.', 'Use your own domain. /readyz confirms database readiness; /v1/meta reports the server version and protocol.'),
        code: 'curl --fail https://sync.example.com/readyz\ncurl --fail https://sync.example.com/v1/meta',
      },
    ],
    links: [{ href: 'https://github.com/evsikovas/consolecrypt-server/blob/main/docs/public/HOSTING.md', text: b('Полная инструкция: Docker, Helm, HTTPS, почта и резервные копии ↗', 'Full instructions: Docker, Helm, HTTPS, email and backups ↗') }],
    note: b('Учётные записи разных серверов независимы. Сервер хранит зашифрованные данные и служебные метаданные, не расшифровывает хранилище и не участвует в SSH-соединениях. Не переносите действующие хранилища без резервной копии.', 'Accounts on different servers are independent. The server stores encrypted data and operational metadata, never decrypts your vault and never carries SSH connections. Back up existing vaults before moving them.'),
    image: shot('welcome', 'Подключение клиента: выберите сервер или начните работать локально.', 'Client connection: choose a server or start working locally.'),
    images: [shot('sync', 'Синхронизация: подключённый профиль, состояние и действия для проверки обмена данными.', 'Sync: the connected profile, status and actions for checking data exchange.')],
  },
  {
    id: 'server-docker', group: 'control', title: b('Свой сервер: Docker Compose', 'Your own server: Docker Compose'),
    intro: b('На одном Linux-сервере можно запустить ConsoleCrypt без Kubernetes: готовый образ сервера, PostgreSQL 16 и Caddy для HTTPS. База и сертификаты сохраняются в постоянных томах Docker.', 'Run ConsoleCrypt on a single Linux server without Kubernetes: a prebuilt server image, PostgreSQL 16 and Caddy for HTTPS. Database data and certificates are kept in persistent Docker volumes.'),
    keywords: ['self-host', 'hosting', 'Docker Compose', 'PostgreSQL', 'Caddy', 'HTTPS', 'SMTP', 'контейнеры'],
    steps: [
      b('Подготовьте Linux-сервер AMD64 или ARM64 с Docker Engine, Docker Compose 2.24.4 или новее, Git и Python 3.9 или новее. Укажите домен, направьте его DNS на сервер и освободите входящие TCP-порты 80 и 443 для HTTPS (UDP 443 Caddy использует для HTTP/3, он необязателен). Другой proxy не должен занимать эти порты.', 'Prepare an AMD64 or ARM64 Linux server with Docker Engine, Docker Compose 2.24.4 or newer, Git and Python 3.9 or newer. Point your domain’s DNS at the server and make inbound TCP ports 80 and 443 available for HTTPS (Caddy uses UDP 443 for optional HTTP/3). No other proxy may hold these ports.'),
      b('Скачайте пример и запустите генератор конфигурации. Он создаёт случайные пароли базы и приватный server.env вне репозитория, спрашивает настройки SMTP и отказывается перезаписывать существующий файл. Сохраняйте этот файл при обновлениях.', 'Download the example and run the configuration generator. It creates random database passwords and a private server.env outside the repository, asks for SMTP settings and refuses to overwrite an existing file. Keep this file when upgrading.'),
      b('Проверьте конфигурацию и запустите профиль https. Compose загрузит готовый образ сервера, поднимет PostgreSQL и Caddy. Сборка Rust и Helm не нужны; миграции базы выполняются сервером при запуске.', 'Validate the configuration and start the https profile. Compose downloads the prebuilt server image and starts PostgreSQL and Caddy. Rust builds and Helm are not required; the server runs database migrations on startup.'),
      b('Проверьте /readyz и /v1/meta по своему HTTPS-домену. PostgreSQL не публикует порт на хосте, а HTTP-порт API доступен только на 127.0.0.1. Клиенты подключаются через Caddy; не открывайте 8080 в интернет.', 'Check /readyz and /v1/meta through your HTTPS domain. PostgreSQL does not publish a host port; the API’s HTTP port is bound to 127.0.0.1 only. Clients connect through Caddy; do not expose port 8080 to the internet.'),
      b('В клиенте выберите свой сервер и введите https://sync.example.com без /v1. Создайте учётную запись, проверьте доставку почты и синхронизацию двух устройств. В этом примере подтверждение email обязательно; без SMTP (генератор с --mail-disabled) администратор подтверждает адрес командой admin verify-email. Чтобы закрыть регистрацию, задайте CC_REGISTRATION_OPEN=false в server.env и пересоздайте сервис server.', 'In the client, choose your own server and enter https://sync.example.com without /v1. Create an account, check email delivery and sync between two devices. This example requires email verification; without SMTP (the generator with --mail-disabled) the administrator verifies an address with admin verify-email. To close registration, set CC_REGISTRATION_OPEN=false in server.env and recreate the server service.'),
      b('Проверьте server_version в /v1/meta: пример закреплён за проверенным образом и может отставать от последнего выпуска. Для команд нужен сервер 0.2.1, для корпоративного входа и общих заметок — 0.2.0; как сменить образ, описано в главе «Свой сервер: резервные копии, обновления и команды». Флаги совместного доступа задаются в server.env, а настройки, которых нет в compose.yaml (лимиты команд, корпоративный вход), — в отдельном compose.override.yaml.', 'Check server_version in /v1/meta: the example pins a tested image and may lag behind the latest release. Teams need server 0.2.1, corporate sign-in and shared notes need 0.2.0; “Your own server: backups, upgrades and commands” explains changing the image. Sharing flags go into server.env, while settings that compose.yaml does not list (team limits, corporate sign-in) go into a separate compose.override.yaml.'),
      b('Если на хосте уже работает свой HTTPS reverse proxy, уберите --profile https и направьте proxy на http://127.0.0.1:8080 (порт меняет CC_HTTP_PORT). Proxy должен перезаписывать X-Forwarded-For, передавать WebSocket /v1/events/ws, принимать тела до 16 МиБ и не менять путь, параметры и тело подписанных запросов.', 'If the host already runs your own HTTPS reverse proxy, drop --profile https and point the proxy at http://127.0.0.1:8080 (CC_HTTP_PORT changes the port). The proxy must overwrite X-Forwarded-For, forward the /v1/events/ws WebSocket, accept bodies up to 16 MiB and never change the path, query or body of signed requests.'),
      b('Настройте резервные копии PostgreSQL и проверяйте восстановление (команды — в главе «Свой сервер: резервные копии, обновления и команды»). Перед обновлением сохраняйте базу, приватную конфигурацию и текущий digest образа. Имя Compose-проекта — consolecrypt-selfhost: другое имя создаст другую базу. Перезапуск контейнеров сохраняет данные; down -v и docker volume prune удаляют их.', 'Schedule PostgreSQL backups and test restoration (commands are in “Your own server: backups, upgrades and commands”). Before upgrading, save the database, private configuration and current image digest. The Compose project name is consolecrypt-selfhost: another name creates another database. Restarting containers preserves data; down -v and docker volume prune delete it.'),
    ],
    blocks: [
      {
        title: b('1. Пример и приватная конфигурация', '1. Example and private configuration'),
        caption: b('Команды для терминала Linux, Bash или zsh. Замените sync.example.com своим доменом. Генератор запрашивает пароль SMTP без отображения на экране.', 'Commands for a Linux terminal, Bash or zsh. Replace sync.example.com with your domain. The generator requests the SMTP password without displaying it.'),
        code: 'git clone --depth 1 https://github.com/evsikovas/consolecrypt-server.git consolecrypt-server-docker\ncd consolecrypt-server-docker\nexport CC_INSTALL_DIR="$HOME/.config/consolecrypt-docker"\nexport CC_API_DOMAIN="sync.example.com"\npython3 server/deploy/docker/init-config.py \\\n  --directory "$CC_INSTALL_DIR" --domain "$CC_API_DOMAIN"',
      },
      {
        title: b('2. Запуск с HTTPS', '2. Start with HTTPS'),
        caption: b('В том же терминале определите помощник cc_compose. config --quiet проверяет файл без вывода паролей; Caddy получает сертификат для указанного домена.', 'In the same terminal, define the cc_compose helper. config --quiet validates the file without printing passwords; Caddy obtains a certificate for your chosen domain.'),
        code: 'cc_compose() {\n  docker compose --env-file "$CC_INSTALL_DIR/server.env" \\\n    -f server/deploy/docker/compose.yaml --profile https "$@"\n}\ncc_compose config --quiet\ncc_compose pull\ncc_compose up -d --wait --wait-timeout 180\ncc_compose ps',
      },
      {
        title: b('3. Проверка и подключение клиента', '3. Check and connect your client'),
        caption: b('Ожидаются HTTP 200, ready в /readyz и JSON с версией в /v1/meta. Для клиента используйте этот же домен с https://. Если сертификат ещё не получен, проверьте DNS, порты и журнал Caddy по полной инструкции.', 'Expect HTTP 200, ready from /readyz and version JSON from /v1/meta. Use the same domain with https:// in the client. If the certificate is not ready yet, check DNS, ports and Caddy logs using the full instructions.'),
        code: 'curl --fail "https://$CC_API_DOMAIN/readyz"\ncurl --fail "https://$CC_API_DOMAIN/v1/meta"',
      },
    ],
    links: [
      { href: 'https://github.com/evsikovas/consolecrypt-server/blob/main/docs/public/HOSTING.md#docker-compose', text: b('Полная инструкция Docker: HTTPS, SMTP, резервные копии и обновления ↗', 'Full Docker instructions: HTTPS, SMTP, backups and upgrades ↗') },
      { href: 'https://github.com/evsikovas/consolecrypt-server/blob/main/server/deploy/native/README.md', text: b('Настройки SMTP и установка без Docker: приватный файл конфигурации ↗', 'SMTP settings and installation without Docker: private configuration file ↗') },
    ],
    note: b('Этот Compose запускает сервер синхронизации. Он не расшифровывает хранилища и не передаёт SSH-трафик. Приватный server.env содержит пароли: не публикуйте его и не прикладывайте к отчётам. Не запускайте генератор заново для существующей базы. Для смены SMTP измените server.env и пересоздайте контейнер сервера; пересборка образа не нужна.', 'This Compose setup runs the sync server. It never decrypts vaults or carries SSH traffic. The private server.env contains passwords: do not publish it or attach it to reports. Do not run the generator again for an existing database. To change SMTP settings, edit server.env and recreate the server container; no image rebuild is needed.'),
    image: shot('welcome', 'В клиенте выберите свой сервер и укажите его HTTPS-адрес.', 'Choose your own server in the client and enter its HTTPS address.'),
  },
  {
    id: 'server-enterprise', group: 'control', title: b('Свой сервер: корпоративный вход и общие заметки', 'Your own server: corporate sign-in and shared notes'),
    keywords: ['enterprise', 'OIDC', 'LDAP', 'Active Directory', 'Entra ID', 'AD FS', 'Keycloak', 'Okta', 'Google Workspace', 'CC_AUTH_MODE', 'sharedNotesEnabled', 'CC_SHARED_NOTES_ENABLED', 'self-host'],
    intro: b('Начиная с сервера 0.2.0 (протокол 1.9) сервер умеет работать в режиме enterprise: вход в аккаунты только через IdP по OpenID Connect или через Active Directory / LDAP. Это часть открытого сервера, без отдельной сборки и лицензии. Шифрование, хранилища, устройства, общий доступ и команды (сервер 0.2.1) работают в обоих режимах.', 'Since server 0.2.0 (protocol 1.9) the server can run in enterprise mode: accounts sign in only through an OpenID Connect IdP or Active Directory / LDAP. It is part of the open-source server, with no separate build or licence. Encryption, vaults, devices, sharing and teams (server 0.2.1) work in both modes.'),
    steps: [
      b('Обновите сервер до 0.2.0 и сохраните резервную копию базы: миграция 0011 только добавляет таблицы. Проверьте аккаунты командой admin list-users.', 'Upgrade the server to 0.2.0 and back up the database first: migration 0011 only adds tables. Review the accounts with admin list-users.'),
      b('OIDC: зарегистрируйте сервер в IdP как конфиденциальный клиент с адресом возврата https://<сервер>/v1/auth/oidc/callback, выберите пресет (entra, adfs, keycloak, google, okta или generic) и положите client secret и 32-байтовый ключ шифрования refresh token в Secret. Задайте config.publicUrl.', 'OIDC: register the server with your IdP as a confidential client with the redirect URI https://<server>/v1/auth/oidc/callback, pick a preset (entra, adfs, keycloak, google, okta or generic) and put the client secret and a 32-byte refresh-token sealing key into a Secret. Set config.publicUrl.'),
      b('LDAP / AD: используйте ldaps:// (или ldap:// со STARTTLS), сервисную учётку для поиска и при необходимости обязательную группу. Порог неудачных входов сервера задайте меньше порога блокировки учёток в политике домена.', 'LDAP / AD: use ldaps:// (or ldap:// with STARTTLS), a service account for searches and optionally a required group. Keep the server’s failed sign-in limit below the domain’s account lockout threshold.'),
      b('Включите auth.mode: enterprise (CC_AUTH_MODE=enterprise) и перезапустите сервер. При старте он проверяет IdP или каталог и падает с понятной ошибкой; admin auth status и admin auth test повторяют проверки. Пользователям нужен клиент 0.9.0 или новее. В Docker Compose ключи CC_AUTH_*, CC_OIDC_* и CC_LDAP_* и файлы секретов задаются в отдельном compose.override.yaml; файлы секретов должны быть доступны пользователю контейнера (UID 65532), а для OIDC нужен CC_PUBLIC_URL.', 'Set auth.mode: enterprise (CC_AUTH_MODE=enterprise) and restart the server. On start it checks the IdP or directory and fails with a clear error; admin auth status and admin auth test repeat the checks. Users need client 0.9.0 or later. With Docker Compose, put the CC_AUTH_*, CC_OIDC_* and CC_LDAP_* keys and secret files into a separate compose.override.yaml; secret files must be readable by the container user (UID 65532), and OIDC needs CC_PUBLIC_URL.'),
      b('После переключения регистрация, вход, сброс и смена пароля аккаунта отвечают enterprise_auth_required, а сеансы, открытые паролем, перестают обновляться: каждый пользователь один раз входит через IdP или AD. Существующий аккаунт с паролем привязывается автоматически, только если его домен есть в allowedDomains (CC_AUTH_ALLOWED_DOMAINS); иначе вход завершится ошибкой identity_conflict, и администратор привязывает его командой admin identity link (OIDC sub или objectGUID из AD). При привязке пароль аккаунта удаляется, прежние сеансы завершаются; устройства и хранилища сохраняются.', 'After the switch, registration, sign-in, password reset and password change answer enterprise_auth_required, and sessions opened with a password stop refreshing: every user signs in once through the IdP or AD. An existing password account is linked automatically only if its domain is in allowedDomains (CC_AUTH_ALLOWED_DOMAINS); otherwise sign-in fails with identity_conflict and the administrator links it with admin identity link (the OIDC sub or the AD objectGUID). Linking removes the account password and ends earlier sessions; devices and vaults are kept.'),
      b('Отключённые в IdP или AD сотрудники теряют доступ к синхронизации не позже чем через auth.recheckMinutes (по умолчанию 15) + 1 минуту: сессии отзываются, приложение блокирует профиль. Если IdP или AD недоступен, сессии работают ещё auth.recheckGraceHours (по умолчанию 24 часа), затем обновление отвечает idp_unavailable до восстановления источника.', 'Employees disabled in the IdP or AD lose sync access within auth.recheckMinutes (15 by default) + 1 minute: their sessions are revoked and the app locks the profile. If the IdP or AD is unreachable, sessions keep working for auth.recheckGraceHours (24 hours by default), after which refresh answers idp_unavailable until the source returns.'),
      b('Вход по LDAP защищает учётки домена от блокировки: после 3 неудачных попыток за 15 минут на логин (и 30 с одного IP) сервер отвечает 429, не обращаясь к AD. Для Google Workspace обязателен список допустимых доменов, а проверка MFA для него не поддерживается; для Entra ID нужен issuer с tenant id, /common не принимается.', 'LDAP sign-in protects domain accounts from lockout: after 3 failed attempts in 15 minutes per login (and 30 per IP) the server answers 429 without contacting AD. Google Workspace requires the allowed-domain list and does not support the MFA check; Entra ID needs an issuer with the tenant id, /common is rejected.'),
      b('Аварийного входа по паролю в режиме enterprise нет. Если IdP или AD неисправен, временно верните CC_AUTH_MODE=standard и задайте пароль командой admin set-password --email … --password-stdin; при повторном включении enterprise пароль снова удаляется при входе пользователя. admin identity unlink снимает привязку, admin session revoke завершает сеансы, admin list-users показывает способ входа каждого аккаунта.', 'There is no emergency password sign-in in enterprise mode. If the IdP or AD fails, temporarily switch back to CC_AUTH_MODE=standard and set a password with admin set-password --email … --password-stdin; once enterprise is on again, the password is removed at the user’s next sign-in. admin identity unlink removes a link, admin session revoke ends sessions, and admin list-users shows each account’s sign-in method.'),
      b('Общие заметки включаются отдельно флагом sharedNotesEnabled (CC_SHARED_NOTES_ENABLED) вместе с objectSharingEnabled — в любом режиме входа.', 'Shared notes are enabled separately with the sharedNotesEnabled flag (CC_SHARED_NOTES_ENABLED) together with objectSharingEnabled, in either sign-in mode.'),
    ],
    blocks: [
      {
        title: b('Helm: вход через Entra ID', 'Helm: sign-in with Entra ID'),
        caption: b('Фрагмент приватного values.yaml. Идентификаторы и имя Secret замените своими; секреты храните только в Secret.', 'A fragment of your private values.yaml. Replace the identifiers and the Secret name with your own; keep secrets only in the Secret.'),
        code: 'config:\n  publicUrl: https://sync.example.com\n  objectSharingEnabled: true\n  sharedNotesEnabled: true\nauth:\n  mode: enterprise\n  provider: oidc\n  displayName: Acme SSO\n  allowedDomains: [example.com]\n  oidc:\n    preset: entra\n    issuer: https://login.microsoftonline.com/<tenant-id>/v2.0\n    clientId: <application-id>\n    requiredClaim: groups=<group-object-id>\n    existingSecret: consolecrypt-oidc',
      },
      {
        title: b('Проверка конфигурации', 'Check the configuration'),
        caption: b('Kubernetes и Docker Compose (помощник cc_compose из главы о Docker). --login для LDAP ищет пользователя, проверяет группу и отключение; с --password-stdin выполняется настоящий bind, который учитывается политикой блокировки домена. Для OIDC --login сразу перепроверяет аккаунт в IdP.', 'Kubernetes and Docker Compose (the cc_compose helper from the Docker chapter). For LDAP, --login looks up the user, its group and disabled state; with --password-stdin it performs a real bind that counts towards the domain lockout policy. For OIDC, --login re-checks the account with the IdP right away.'),
        code: 'kubectl -n consolecrypt exec deployment/consolecrypt -- \\\n  /usr/local/bin/consolecrypt-server admin auth status\nkubectl -n consolecrypt exec deployment/consolecrypt -- \\\n  /usr/local/bin/consolecrypt-server admin auth test --login alice@example.com\n\ncc_compose exec -T server /usr/local/bin/consolecrypt-server admin auth status\ncc_compose exec -T server /usr/local/bin/consolecrypt-server admin list-users',
      },
    ],
    links: [
      { href: 'https://github.com/evsikovas/consolecrypt-server/blob/main/docs/public/ENTERPRISE.md', text: b('Полная инструкция enterprise-режима: все ключи, рецепты IdP и AD ↗', 'Full enterprise-mode instructions: every setting, IdP and AD recipes ↗') },
      { href: 'https://github.com/evsikovas/consolecrypt-server/blob/main/docs/public/HOSTING.md', text: b('Установка и флаги совместного доступа ↗', 'Installation and sharing flags ↗') },
    ],
    note: b('Сервер авторизации только подтверждает личность. Ни IdP, ни AD, ни сервер синхронизации не получают ничего, чем можно расшифровать хранилище; после входа устройство — обычное новое устройство с защитой от входа с нового устройства.', 'The authorization server only proves identity. Neither the IdP, AD nor the sync server receives anything that decrypts a vault; after signing in, the device is an ordinary new device covered by new-device protection.'),
    image: shot('enterprise-login-ldap', 'Так клиент видит сервер в режиме enterprise с Active Directory.', 'How the client sees a server in enterprise mode with Active Directory.'),
  },
  {
    id: 'server-config', group: 'control', title: b('Свой сервер: возможности, флаги и лимиты', 'Your own server: features, flags and limits'),
    keywords: ['self-host', 'CC_TEAMS_ENABLED', 'CC_MAX_TEAMS_PER_ACCOUNT', 'CC_MAX_TEAM_MEMBERS', 'CC_OBJECT_SHARING_ENABLED', 'CC_SHARED_NOTES_ENABLED', 'CC_SHARED_DB_CONNECTIONS_ENABLED', 'CC_DEVICE_PROTECTION_ENABLED', 'CC_REGISTRATION_OPEN', 'CC_MAIL_TRANSPORT', 'compose.override.yaml', 'extraEnv', 'флаги', 'flags', 'лимиты', 'limits'],
    intro: b('Возможности своего сервера включаются переменными CC_*. В Docker Compose они задаются в приватном server.env (для переменных, которые перечислены в compose.yaml) или в отдельном compose.override.yaml, в Helm — блоками config, auth и mail файла values, а для запуска без контейнеров — в окружении службы или приватном JSON-файле (--config). Значения ниже — значения сервера по умолчанию.', 'Your own server’s features are turned on with CC_* variables. With Docker Compose they go into the private server.env (for the variables compose.yaml lists) or a separate compose.override.yaml; with Helm into the config, auth and mail blocks of your values file; without containers into the service environment or a private JSON file (--config). The values below are the server defaults.'),
    table: { headings: [b('Возможность', 'Feature'), b('Переменная (Helm)', 'Variable (Helm)'), b('По умолчанию', 'Default')], rows: [
      [b('Регистрация новых аккаунтов', 'New account registration'), b('CC_REGISTRATION_OPEN (config.registrationOpen)', 'CC_REGISTRATION_OPEN (config.registrationOpen)'), b('включена', 'on')],
      [b('Обязательное подтверждение email', 'Required email verification'), b('CC_REQUIRE_EMAIL_VERIFICATION (config.requireEmailVerification)', 'CC_REQUIRE_EMAIL_VERIFICATION (config.requireEmailVerification)'), b('выключено; в примере Docker включено', 'off; on in the Docker example')],
      [b('Почта', 'Mail'), b('CC_MAIL_TRANSPORT: smtp, file или disabled (mail.transport)', 'CC_MAIL_TRANSPORT: smtp, file or disabled (mail.transport)'), b('disabled; в примере Docker smtp', 'disabled; smtp in the Docker example')],
      [b('Подписи запросов устройств', 'Device request signatures'), b('CC_REQUIRE_REQUEST_PROOF (config.requireRequestProof)', 'CC_REQUIRE_REQUEST_PROOF (config.requireRequestProof)'), b('включены', 'on')],
      [b('Команды', 'Teams'), b('CC_TEAMS_ENABLED (в Helm через extraEnv)', 'CC_TEAMS_ENABLED (via extraEnv in Helm)'), b('включены', 'on')],
      [b('Команд на аккаунт / участников в команде', 'Teams per account / members per team'), b('CC_MAX_TEAMS_PER_ACCOUNT / CC_MAX_TEAM_MEMBERS', 'CC_MAX_TEAMS_PER_ACCOUNT / CC_MAX_TEAM_MEMBERS'), b('50 / 200', '50 / 200')],
      [b('Совместный доступ (основной флаг)', 'Sharing (main flag)'), b('CC_OBJECT_SHARING_ENABLED (config.objectSharingEnabled)', 'CC_OBJECT_SHARING_ENABLED (config.objectSharingEnabled)'), b('выключен', 'off')],
      [b('Общие группы и общие секреты', 'Shared groups and shared secrets'), b('CC_SHARED_GROUPS_ENABLED, CC_SHARED_SECRETS_ENABLED', 'CC_SHARED_GROUPS_ENABLED, CC_SHARED_SECRETS_ENABLED'), b('выключены', 'off')],
      [b('Общие контексты Kubernetes и подключения к базам', 'Shared Kubernetes contexts and database connections'), b('CC_SHARED_KUBE_CONTEXTS_ENABLED, CC_SHARED_DB_CONNECTIONS_ENABLED', 'CC_SHARED_KUBE_CONTEXTS_ENABLED, CC_SHARED_DB_CONNECTIONS_ENABLED'), b('выключены', 'off')],
      [b('Общие заметки', 'Shared notes'), b('CC_SHARED_NOTES_ENABLED (config.sharedNotesEnabled)', 'CC_SHARED_NOTES_ENABLED (config.sharedNotesEnabled)'), b('выключены', 'off')],
      [b('Новые устройства коллеги при участии владельца', 'A colleague’s new devices with the owner online'), b('CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED', 'CC_SHARING_OWNER_ONLINE_ENROLLMENT_ENABLED'), b('выключено', 'off')],
      [b('Защита от входа с нового устройства', 'New-device protection'), b('CC_DEVICE_PROTECTION_ENABLED (config.deviceProtection.enabled), карантин CC_DEVICE_QUARANTINE_DAYS', 'CC_DEVICE_PROTECTION_ENABLED (config.deviceProtection.enabled), quarantine CC_DEVICE_QUARANTINE_DAYS'), b('выключена; карантин 14 дней', 'off; 14-day quarantine')],
      [b('Корпоративный вход', 'Corporate sign-in'), b('CC_AUTH_MODE (auth.mode)', 'CC_AUTH_MODE (auth.mode)'), b('standard', 'standard')],
      [b('Хранилищ на аккаунт / размер хранилища', 'Vaults per account / vault size'), b('CC_MAX_VAULTS_PER_ACCOUNT / CC_MAX_VAULT_BYTES', 'CC_MAX_VAULTS_PER_ACCOUNT / CC_MAX_VAULT_BYTES'), b('50 / 1 ГиБ', '50 / 1 GiB')],
      [b('Метрики Prometheus (/metrics)', 'Prometheus metrics (/metrics)'), b('CC_METRICS_LISTEN (metrics.enabled)', 'CC_METRICS_LISTEN (metrics.enabled)'), b('порт 9090; в примере Docker выключены', 'port 9090; off in the Docker example')],
    ] },
    steps: [
      b('Совместный доступ выключен по умолчанию. Каждое расширение — группы, секреты, Kubernetes, базы данных, заметки, новые устройства коллеги — требует основного флага CC_OBJECT_SHARING_ENABLED и включённых подписей запросов, иначе сервер не запустится. Включайте только нужное; выключение флага скрывает общие объекты и заметки, не удаляя их зашифрованное содержимое. Клиент узнаёт возможности авторизованным запросом /v1/shares/capabilities, а не по /v1/meta.', 'Sharing is off by default. Every extension — groups, secrets, Kubernetes, databases, notes, a colleague’s new devices — needs the main CC_OBJECT_SHARING_ENABLED flag and request signatures turned on, otherwise the server refuses to start. Enable only what you need; turning a flag off hides shared objects and notes without deleting their encrypted content. The client learns the capabilities from the authenticated /v1/shares/capabilities, not from /v1/meta.'),
      b('Команды (сервер 0.2.1) включены по умолчанию и не зависят от флагов совместного доступа. CC_TEAMS_ENABLED принимает только true или false; при false маршруты команд отвечают 404, и клиенты скрывают раздел «Команды». Если подтверждение email обязательно, аккаунт без подтверждённой почты не может создать команду. Приглашения действуют 7 дней, команда отправляет не больше 20 в час, назначать администраторов может только владелец.', 'Teams (server 0.2.1) are on by default and do not depend on the sharing flags. CC_TEAMS_ENABLED accepts only true or false; with false the team routes answer 404 and clients hide the Teams section. If email verification is required, an account without a verified address cannot create a team. Invitations last 7 days, a team sends at most 20 per hour, and only the owner can appoint admins.'),
      b('Защита от входа с нового устройства отправляет письма со ссылкой «Это не я», которая ведёт на страницу аккаунта CC_PUBLIC_URL/account. Перед включением выложите такую страницу и настройте почту; без SMTP письма не отправляются, остальная защита работает. В примере Docker CC_PUBLIC_URL пуст, а Caddy отдаёт только API.', 'New-device protection sends emails with a “This wasn’t me” link to the account page at CC_PUBLIC_URL/account. Publish such a page and configure mail before turning it on; without SMTP no emails are sent, while the rest of the protection works. In the Docker example CC_PUBLIC_URL is empty and Caddy serves only the API.'),
      b('Без почты (CC_MAIL_TRANSPORT=disabled) администратор подтверждает адреса командой admin verify-email и выдаёт одноразовый код сброса пароля командой admin reset-token. Чтобы закрыть сервер для новых людей, выключите регистрацию; на корпоративном сервере аккаунты создаются при первом входе через IdP или AD (CC_AUTH_AUTO_CREATE).', 'Without mail (CC_MAIL_TRANSPORT=disabled) the administrator verifies addresses with admin verify-email and issues a one-time password-reset token with admin reset-token. To close the server to newcomers, turn registration off; on a corporate server accounts are created at the first sign-in through the IdP or AD (CC_AUTH_AUTO_CREATE).'),
      b('Docker Compose передаёт серверу только переменные, перечисленные в compose.yaml: регистрацию, почту, флаги совместного доступа и защиту устройств меняйте в server.env и пересоздавайте сервис server. Лимиты команд, корпоративный вход и другие ключи задайте в compose.override.yaml в приватном каталоге и подключите его вторым -f в помощнике cc_compose. В Helm флаги лежат в блоке config, а переменные без собственного ключа (например, лимиты команд) — в extraEnv.', 'Docker Compose passes the server only the variables listed in compose.yaml: change registration, mail, sharing flags and device protection in server.env and recreate the server service. Put team limits, corporate sign-in and other keys into a compose.override.yaml in your private directory and add it as a second -f in the cc_compose helper. In Helm the flags live in the config block, and variables without their own key (such as team limits) go into extraEnv.'),
    ],
    blocks: [
      {
        title: b('Docker Compose: флаги в server.env', 'Docker Compose: flags in server.env'),
        caption: b('Строки приватного server.env: пример включает общий доступ и общие заметки и закрывает регистрацию. После правки пересоздайте только сервис server: cc_compose up -d --wait --wait-timeout 180 server.', 'Lines of the private server.env: this example enables sharing and shared notes and closes registration. After editing, recreate only the server service: cc_compose up -d --wait --wait-timeout 180 server.'),
        code: 'CC_OBJECT_SHARING_ENABLED=true\nCC_SHARED_NOTES_ENABLED=true\nCC_REGISTRATION_OPEN=false',
      },
      {
        title: b('Docker Compose: лимиты команд в compose.override.yaml', 'Docker Compose: team limits in compose.override.yaml'),
        caption: b('Файл в приватном каталоге $CC_INSTALL_DIR, рядом с server.env.', 'A file in the private $CC_INSTALL_DIR directory next to server.env.'),
        code: '# $CC_INSTALL_DIR/compose.override.yaml\nservices:\n  server:\n    environment:\n      CC_MAX_TEAMS_PER_ACCOUNT: "20"\n      CC_MAX_TEAM_MEMBERS: "50"',
      },
      {
        title: b('Docker Compose: помощник cc_compose с override-файлом', 'Docker Compose: the cc_compose helper with the override file'),
        caption: b('Без второго -f Docker Compose не читает override-файл из другого каталога. Используйте этот вариант помощника для всех команд.', 'Without the second -f, Docker Compose does not read an override file from another directory. Use this helper for all commands.'),
        code: 'cc_compose() {\n  docker compose --env-file "$CC_INSTALL_DIR/server.env" \\\n    -f server/deploy/docker/compose.yaml \\\n    -f "$CC_INSTALL_DIR/compose.override.yaml" --profile https "$@"\n}\ncc_compose config --quiet\ncc_compose up -d --wait --wait-timeout 180 server',
      },
      {
        title: b('Helm: фрагмент values.yaml', 'Helm: a values.yaml fragment'),
        caption: b('Добавьте нужные ключи в свой полный values-файл и примените его той же командой helm upgrade --install.', 'Add the keys you need to your complete values file and apply it with the same helm upgrade --install command.'),
        code: 'config:\n  requireRequestProof: true\n  objectSharingEnabled: true\n  sharedNotesEnabled: true\nextraEnv:\n  - name: CC_MAX_TEAM_MEMBERS\n    value: "50"',
      },
    ],
    links: [{ href: 'https://github.com/evsikovas/consolecrypt-server/blob/main/docs/public/HOSTING.md', text: b('Полная инструкция: флаги совместного доступа, защита устройств, почта ↗', 'Full instructions: sharing flags, device protection, mail ↗') }],
    note: b('Флаги меняют только то, что сервер разрешает. Сервер по-прежнему хранит лишь шифротекст и служебные метаданные: ни одна настройка не даёт ему ключей хранилищ, команд или общих объектов.', 'Flags change only what the server allows. The server still stores only ciphertext and operational metadata: no setting gives it the keys of vaults, teams or shared objects.'),
    image: shot('teams-settings', 'Клиент показывает «Команды», только если сервер их поддерживает.', 'The client shows Teams only when the server supports them.'),
  },
  {
    id: 'server-maintenance', group: 'control', title: b('Свой сервер: резервные копии, обновления и команды', 'Your own server: backups, upgrades and commands'),
    keywords: ['self-host', 'pg_dump', 'pg_restore', 'backup', 'restore', 'резервная копия', 'восстановление', 'upgrade', 'обновление', 'rotate-epoch', 'admin', 'verify-email', 'reset-token', 'list-users', 'readyz', 'healthz', 'metrics', 'digest'],
    intro: b('Все постоянные данные сервера лежат в PostgreSQL. Резервная копия базы и приватной конфигурации — главное, что нужно для восстановления. Команды администратора работают с аккаунтами и сеансами, но никогда не дают доступа к содержимому хранилищ.', 'All persistent server data lives in PostgreSQL. A database backup plus the private configuration is what a restore needs. Admin commands manage accounts and sessions but never give access to vault contents.'),
    steps: [
      b('Регулярно делайте pg_dump в формате custom и храните зашифрованные копии вне узла с базой. Отдельно сохраните server.env или values-файл, секреты и тома Caddy. Копия содержит метаданные аккаунтов, хотя содержимое хранилищ зашифровано.', 'Run pg_dump in custom format regularly and keep encrypted copies off the database node. Separately keep server.env or your values file, secrets and the Caddy volumes. A copy contains account metadata even though vault contents are encrypted.'),
      b('Проверяйте восстановление в отдельной пустой базе, не подключённой к рабочим клиентам: сверьте таблицы, миграции, число записей и sharing_instance.instance_id. Список архива не заменяет пробное восстановление.', 'Test restoring into a separate empty database that no live client uses: compare tables, migrations, row counts and sharing_instance.instance_id. An archive listing does not replace a test restore.'),
      b('После аварийного восстановления закройте клиентский доступ, восстановите всю базу до запуска API и перед возвратом доступа выполните admin rotate-epoch --all: клиенты заметят откат и дозагрузят то, чего нет в копии. Эта команда не сбрасывает доверие общих элементов; UUID экземпляра сервера должен сохраниться.', 'After a disaster restore, close client access, restore the whole database before starting the API and run admin rotate-epoch --all before reopening: clients notice the rollback and re-upload what the backup lacks. The command does not reset trust in shared items; the server instance UUID must be preserved.'),
      b('Обновление: сделайте и проверьте копию, сохраните прежний digest и конфигурацию. Возьмите digest образа из манифеста, приложенного к выпуску сервера на странице Releases репозитория consolecrypt-server, и задайте его в CC_SERVER_IMAGE (Docker) или image.digest (Helm), а CC_SOURCE_CODE_URL / config.sourceCodeUrl — на исходники этого выпуска. Затем проверьте /readyz, /v1/meta, почту и синхронизацию двух устройств.', 'Upgrading: make and verify a backup, keep the previous digest and configuration. Take the image digest from the manifest attached to the server release on the consolecrypt-server repository’s Releases page and set it in CC_SERVER_IMAGE (Docker) or image.digest (Helm), with CC_SOURCE_CODE_URL / config.sourceCodeUrl pointing at that release’s source. Then check /readyz, /v1/meta, mail and sync between two devices.'),
      b('Миграции встроены в сервер и выполняются при старте; возврат к старому образу их не откатывает. CC_RUN_MIGRATIONS=false (в Helm migrations.runAtStartup: false и migrations.job.enabled: false) используйте только для заранее проверенного совместимого отката. Последние миграции: 0008 — защита устройств (0.1.16), 0009 — удаление общих объектов владельцем (0.1.17), 0010 — общие заметки и 0011 — корпоративный вход (0.2.0), 0012 — команды (0.2.1).', 'Migrations are built into the server and run at start; going back to an older image does not undo them. Use CC_RUN_MIGRATIONS=false (migrations.runAtStartup: false and migrations.job.enabled: false in Helm) only for a rollback you have verified as compatible. Recent migrations: 0008 device protection (0.1.16), 0009 owner deletion of shared items (0.1.17), 0010 shared notes and 0011 corporate sign-in (0.2.0), 0012 teams (0.2.1).'),
      b('Не меняйте major-версию PostgreSQL сменой тега, не используйте down -v, docker volume prune и helm uninstall и не удаляйте PVC ради обновления. /healthz отвечает без обращения к базе (проверка живости), /readyz проверяет базу, /v1/meta показывает версию, протокол и возможности; метрики Prometheus доступны на отдельном порту 9090.', 'Do not change the PostgreSQL major version by switching the tag, and do not use down -v, docker volume prune or helm uninstall, or delete PVCs to upgrade. /healthz answers without touching the database (liveness), /readyz checks the database, /v1/meta shows the version, protocol and capabilities; Prometheus metrics are served on a separate port 9090.'),
    ],
    table: { headings: [b('Команда администратора', 'Admin command'), b('Что делает', 'What it does')], rows: [
      [b('admin list-users', 'admin list-users'), b('Аккаунты: статус, способ входа (password, oidc, ldap), число устройств и хранилищ.', 'Accounts: status, sign-in method (password, oidc, ldap), device and vault counts.')],
      [b('admin verify-email --email …', 'admin verify-email --email …'), b('Отмечает почту аккаунта подтверждённой (сервер без SMTP).', 'Marks the account email as verified (a server without SMTP).')],
      [b('admin reset-token --email …', 'admin reset-token --email …'), b('Печатает одноразовый код сброса пароля аккаунта.', 'Prints a single-use account password-reset token.')],
      [b('admin set-password --email … --password-stdin', 'admin set-password --email … --password-stdin'), b('Задаёт новый пароль аккаунта из stdin и завершает все сеансы.', 'Sets a new account password from stdin and signs out all sessions.')],
      [b('admin disable-user / enable-user --email …', 'admin disable-user / enable-user --email …'), b('Отключает аккаунт с отзывом сеансов или включает его снова.', 'Disables an account and revokes its sessions, or enables it again.')],
      [b('admin session revoke --email …', 'admin session revoke --email …'), b('Завершает все сеансы аккаунта.', 'Signs out every session of the account.')],
      [b('admin rotate-epoch --all | --vault <id>', 'admin rotate-epoch --all | --vault <id>'), b('После восстановления базы: меняет эпохи хранилищ, чтобы клиенты заметили откат.', 'After a database restore: rotates vault epochs so clients detect the rollback.')],
      [b('admin auth status | test, admin identity link | unlink', 'admin auth status | test, admin identity link | unlink'), b('Корпоративный вход: проверки IdP или AD и привязка аккаунтов (глава о корпоративном входе).', 'Corporate sign-in: IdP or AD checks and account linking (see the corporate sign-in chapter).')],
    ] },
    blocks: [
      {
        title: b('Docker Compose: копия и проверка', 'Docker Compose: backup and check'),
        caption: b('pg_dump выполняется внутри контейнера PostgreSQL через локальный сокет, пароль не попадает в аргументы. Помощник cc_compose — из главы о Docker.', 'pg_dump runs inside the PostgreSQL container over its local socket, so no password appears in arguments. The cc_compose helper comes from the Docker chapter.'),
        code: 'umask 077\nCC_BACKUP_FILE="$CC_INSTALL_DIR/backups/consolecrypt-$(date -u +%Y%m%dT%H%M%SZ).dump"\nmkdir -p "$CC_INSTALL_DIR/backups"\ncc_compose exec -T postgres pg_dump -U postgres -d consolecrypt \\\n  --format=custom --no-owner --no-acl > "$CC_BACKUP_FILE"\ncc_compose exec -T postgres pg_restore --list < "$CC_BACKUP_FILE" > "$CC_BACKUP_FILE.list"',
      },
      {
        title: b('Docker Compose: обновление образа', 'Docker Compose: upgrading the image'),
        caption: b('Сначала замените CC_SERVER_IMAGE и CC_SOURCE_CODE_URL в server.env на значения нового выпуска.', 'First replace CC_SERVER_IMAGE and CC_SOURCE_CODE_URL in server.env with the new release’s values.'),
        code: 'cc_compose config --quiet\ncc_compose pull server\ncc_compose up -d --wait --wait-timeout 180 server\ncurl --fail "https://$CC_API_DOMAIN/readyz"\ncurl --fail "https://$CC_API_DOMAIN/v1/meta"',
      },
      {
        title: b('Команды администратора', 'Admin commands'),
        caption: b('Первая строка — Docker Compose, вторая — Kubernetes. После восстановления базы rotate-epoch выполняется до возврата клиентского доступа.', 'The first line is Docker Compose, the second Kubernetes. After a database restore, rotate-epoch runs before client access returns.'),
        code: 'cc_compose exec -T server /usr/local/bin/consolecrypt-server admin verify-email --email user@example.com\nkubectl -n consolecrypt exec deployment/consolecrypt -- \\\n  /usr/local/bin/consolecrypt-server admin rotate-epoch --all',
      },
    ],
    links: [{ href: 'https://github.com/evsikovas/consolecrypt-server/blob/main/docs/public/HOSTING.md', text: b('Полная инструкция: резервные копии, восстановление и обновление ↗', 'Full instructions: backups, restore and upgrades ↗') }],
    note: b('Восстановление сервера из копии не заменяет клиентские резервные копии: зашифрованный файл .ccbackup и комплект восстановления каждого пользователя остаются его собственной страховкой.', 'Restoring the server from a backup does not replace client backups: each user’s encrypted .ccbackup file and Recovery Kit remain their own safety net.'),
  },
];
