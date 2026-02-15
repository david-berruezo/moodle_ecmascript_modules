# PLUGIN 1: `local/learn_notifications`

## Nivel ⭐ — Notificaciones, Strings y Toast

### Descripción

Plugin de aprendizaje que enseña a usar el sistema de notificaciones de Moodle desde JavaScript.
Incluye **dos versiones** del mismo ejercicio: una en formato **AMD** (legacy) y otra en **ESM** (estándar actual obligatorio), para que puedas comparar la sintaxis lado a lado.

### Lo que aprenderás

**JavaScript (módulos del core de Moodle):**

- `core/notification` — Alertas, confirmaciones y banners de notificación (success, warning, error, info)
- `core/str` — Obtener strings de idioma traducidas desde el servidor vía AJAX
- `core/toast` — Notificaciones temporales tipo "toast" que desaparecen solas (Moodle 4.0+)

**PHP (APIs de Moodle):**

- **String API** — `get_string()` para internacionalización de textos en la interfaz
- **Page API** — `$PAGE` para configurar la página (URL, contexto, título, heading)
- **Output API** — `$OUTPUT` para renderizar el header, footer y contenido HTML
- **Carga de JS** — `$PAGE->requires->js_call_amd()` para cargar módulos JavaScript desde PHP

### Estructura de archivos

```
local/learn_notifications/
│
├── version.php                        # Versión del plugin, requisitos y metadatos
│
├── lang/
│   └── en/
│       └── local_learn_notifications.php   # Strings de idioma (inglés)
│
├── amd/
│   └── src/
│       ├── notifications_amd.js       # JS con sintaxis AMD (define/require)
│       │                              # → Usa .then() para Promises
│       │                              # → Exporta con return { init: function() {} }
│       │
│       └── notifications_esm.js       # JS con sintaxis ESM (import/export)
│                                      # → Usa async/await para Promises
│                                      # → Exporta con export const init = () => {}
│
├── demo_amd.php                       # Página PHP que carga la versión AMD
│                                      # → js_call_amd('local_learn_notifications/notifications_amd', 'init', [...])
│
└── demo_esm.php                       # Página PHP que carga la versión ESM
                                       # → js_call_amd('local_learn_notifications/notifications_esm', 'init', [...])
```

### Después de compilar con Grunt, se genera:

```
amd/
├── src/
│   ├── notifications_amd.js           # Tu código fuente (lo que editas)
│   └── notifications_esm.js           # Tu código fuente (lo que editas)
└── build/
    ├── notifications_amd.min.js       # Compilado por Grunt (lo que Moodle carga)
    ├── notifications_amd.min.js.map   # Source map para debug
    ├── notifications_esm.min.js       # Compilado por Grunt (Babel transpila ESM → AMD)
    └── notifications_esm.min.js.map   # Source map para debug
```

### Compilar

```bash
cd C:\htdocs\moodle\public
npx grunt amd --root=local/learn_notifications
```

### Probar

```
http://moodle.test/local/learn_notifications/demo_esm.php   ← Versión ESM
http://moodle.test/local/learn_notifications/demo_amd.php   ← Versión AMD
```

### Diferencia clave entre ESM y AMD

```
╔═════════════════════════════════════════════════════════════════════╗
║  ESM (estándar actual — lo que debes escribir)                     ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  import Notification from 'core/notification';                      ║
║  import * as Str from 'core/str';                                   ║
║  import * as Toast from 'core/toast';                               ║
║                                                                     ║
║  const showAlert = async() => {                                     ║
║      const msg = await Str.get_string('key', 'component');          ║
║      await Notification.alert('Title', msg, 'OK');                  ║
║  };                                                                 ║
║                                                                     ║
║  export const init = (username) => { ... };                         ║
║                                                                     ║
╠═════════════════════════════════════════════════════════════════════╣
║  AMD (legacy — solo para entender código existente)                 ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  define(['core/notification', 'core/str', 'core/toast'],            ║
║      function(Notification, Str, Toast) {                           ║
║                                                                     ║
║      var showAlert = function() {                                   ║
║          Str.get_string('key', 'component').then(function(msg) {    ║
║              return Notification.alert('Title', msg, 'OK');         ║
║          }).catch(Notification.exception);                          ║
║      };                                                             ║
║                                                                     ║
║      return { init: function(username) { ... } };                   ║
║  });                                                                ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```
