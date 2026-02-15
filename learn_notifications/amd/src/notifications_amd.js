/**
 * Plugin 1: Notifications - Versión AMD
 *
 * Este archivo usa el formato AMD (define/require).
 * Moodle lo soporta por retrocompatibilidad, pero ya NO se acepta
 * para código nuevo. Está aquí solo para que entiendas el formato
 * legacy que encontrarás en plugins existentes.
 *
 * @module     local_learn_notifications/notifications_amd
 * @copyright  2026 David Berruezo
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3+
 */
define(
    // 1) Array de dependencias — los módulos del core que necesitamos
    ['core/notification', 'core/str', 'core/toast'],

    // 2) Función que recibe los módulos como parámetros
    function(Notification, Str, Toast) {

        /**
         * Muestra una alerta simple de Moodle.
         * Es un diálogo modal con un botón "OK".
         */
        var showAlert = function() {
            // Primero obtenemos el string traducido del servidor
            Str.get_string('greeting', 'local_learn_notifications', 'David')
                .then(function(greeting) {
                    // Notification.alert(título, mensaje, botón_ok)
                    return Notification.alert(
                        'Alert Demo (AMD)',
                        greeting,
                        'OK'
                    );
                })
                .catch(Notification.exception);
            // .catch(Notification.exception) → muestra errores de forma elegante
        };

        /**
         * Muestra un diálogo de confirmación con "Sí" y "Cancelar".
         * Devuelve una Promise que se resuelve si el usuario confirma.
         */
        var showConfirm = function() {
            Str.get_strings([
                {key: 'confirm_title', component: 'local_learn_notifications'},
                {key: 'confirm_body', component: 'local_learn_notifications', param: '5'},
                {key: 'yes'},     // Strings del core de Moodle (sin component)
                {key: 'cancel'},
            ]).then(function(strings) {
                // strings es un array en el mismo orden que las keys
                return Notification.confirm(
                    strings[0],  // título
                    strings[1],  // cuerpo
                    strings[2],  // botón confirmar
                    strings[3],  // botón cancelar
                    function() {
                        // Callback si el usuario confirma
                        window.console.log('[AMD] El usuario CONFIRMÓ');
                        Notification.addNotification({
                            message: 'Action confirmed!',
                            type: 'success'
                        });
                    },
                    function() {
                        // Callback si el usuario cancela
                        window.console.log('[AMD] El usuario CANCELÓ');
                    }
                );
            }).catch(Notification.exception);
        };

        /**
         * Muestra notificaciones de los 4 tipos en la parte superior de la página.
         * Estos son los banners que ves normalmente en Moodle.
         */
        var showAllTypes = function() {
            Str.get_strings([
                {key: 'success_msg', component: 'local_learn_notifications'},
                {key: 'warning_msg', component: 'local_learn_notifications'},
                {key: 'error_msg', component: 'local_learn_notifications'},
                {key: 'info_msg', component: 'local_learn_notifications'},
            ]).then(function(strings) {
                // Notification.addNotification() añade banners arriba de la página
                Notification.addNotification({message: strings[0], type: 'success'});
                Notification.addNotification({message: strings[1], type: 'warning'});
                Notification.addNotification({message: strings[2], type: 'error'});
                Notification.addNotification({message: strings[3], type: 'info'});
            }).catch(Notification.exception);
        };

        /**
         * Muestra un Toast — notificación temporal que desaparece sola.
         * Disponible desde Moodle 4.0+
         */
        var showToast = function() {
            Str.get_string('toast_saved', 'local_learn_notifications')
                .then(function(message) {
                    // Toast.add(mensaje, opciones)
                    return Toast.add(message, {type: 'success'});
                })
                .catch(Notification.exception);
        };

        /**
         * Demuestra cómo obtener múltiples strings del servidor
         * y usarlas dinámicamente en el DOM.
         */
        var fetchStrings = function() {
            var container = document.getElementById('strings-output');
            if (!container) {
                return;
            }
            Str.get_strings([
                {key: 'greeting', component: 'local_learn_notifications', param: 'AMD User'},
                {key: 'pluginname', component: 'local_learn_notifications'},
            ]).then(function(strings) {
                container.innerHTML =
                    '<p><strong>Greeting:</strong> ' + strings[0] + '</p>' +
                    '<p><strong>Plugin name:</strong> ' + strings[1] + '</p>';
            }).catch(Notification.exception);
        };

        // ---------------------------------------------------------------
        // EXPORTACIÓN AMD: devolvemos un objeto con la función `init`
        // que será llamada desde PHP con js_call_amd()
        // ---------------------------------------------------------------
        return {
            /**
             * Función de inicialización — llamada desde PHP.
             * @param {string} username - nombre del usuario (pasado desde PHP)
             */
            init: function(username) {
                window.console.log('[AMD] notifications_amd inicializado para: ' + username);

                // Asociar eventos a los botones
                document.getElementById('btn-alert').addEventListener('click', showAlert);
                document.getElementById('btn-confirm').addEventListener('click', showConfirm);
                document.getElementById('btn-all').addEventListener('click', showAllTypes);
                document.getElementById('btn-toast').addEventListener('click', showToast);
                document.getElementById('btn-strings').addEventListener('click', fetchStrings);
            }
        };
    }
);