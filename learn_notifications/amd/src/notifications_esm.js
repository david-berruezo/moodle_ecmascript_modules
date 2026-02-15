/**
 * Plugin 1: Notifications - Versión ESM
 *
 * Este es el formato OBLIGATORIO para código nuevo en Moodle (desde 3.10).
 * Usa import/export nativos de JavaScript ES2015+.
 * Babel lo transpila a AMD por detrás para que RequireJS lo cargue.
 *
 * @module     local_learn_notifications/notifications_esm
 * @copyright  2026 David Berruezo
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3+
 */

// ---------------------------------------------------------------
// IMPORTACIONES ESM — la diferencia principal con AMD
// En vez de define(['core/notification'], function(Notification) {...})
// usamos import directamente.
// ---------------------------------------------------------------
import Notification from 'core/notification';
import * as Str from 'core/str';
import * as Toast from 'core/toast';

/**
 * Muestra una alerta simple de Moodle.
 */
const showAlert = async() => {
    try {
        // En ESM podemos usar async/await en vez de .then()
        const greeting = await Str.get_string('greeting', 'local_learn_notifications', 'David');
        await Notification.alert('Alert Demo (ESM)', greeting, 'OK');
    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Muestra un diálogo de confirmación.
 * Nota: Notification.confirm() no devuelve Promise en versiones antiguas,
 * así que usamos callbacks.
 */
const showConfirm = async() => {
    try {
        const strings = await Str.get_strings([
            {key: 'confirm_title', component: 'local_learn_notifications'},
            {key: 'confirm_body', component: 'local_learn_notifications', param: '5'},
            {key: 'yes'},
            {key: 'cancel'},
        ]);

        Notification.confirm(
            strings[0],
            strings[1],
            strings[2],
            strings[3],
            () => {
                window.console.log('[ESM] El usuario CONFIRMÓ');
                Notification.addNotification({
                    message: 'Action confirmed!',
                    type: 'success'
                });
            },
            () => {
                window.console.log('[ESM] El usuario CANCELÓ');
            }
        );
    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Muestra los 4 tipos de notificación banner.
 */
const showAllTypes = async() => {
    try {
        const keys = ['success_msg', 'warning_msg', 'error_msg', 'info_msg'];
        const types = ['success', 'warning', 'error', 'info'];

        const strings = await Str.get_strings(
            keys.map(key => ({key, component: 'local_learn_notifications'}))
        );

        // Desestructuración + forEach — más limpio que AMD
        strings.forEach((message, index) => {
            Notification.addNotification({message, type: types[index]});
        });
    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Muestra un Toast.
 */
const showToast = async() => {
    try {
        const message = await Str.get_string('toast_saved', 'local_learn_notifications');
        await Toast.add(message, {type: 'success'});
    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Obtiene strings del servidor y las muestra en el DOM.
 */
const fetchStrings = async() => {
    const container = document.getElementById('strings-output');
    if (!container) {
        return;
    }
    try {
        const strings = await Str.get_strings([
            {key: 'greeting', component: 'local_learn_notifications', param: 'ESM User'},
            {key: 'pluginname', component: 'local_learn_notifications'},
        ]);

        // Template literals — una ventaja de ES2015+
        container.innerHTML = `
            <p><strong>Greeting:</strong> ${strings[0]}</p>
            <p><strong>Plugin name:</strong> ${strings[1]}</p>
        `;
    } catch (error) {
        Notification.exception(error);
    }
};

// ---------------------------------------------------------------
// EXPORTACIÓN ESM — en vez de return { init: function() {} }
// usamos export const init = ...
// ---------------------------------------------------------------

/**
 * Función de inicialización — llamada desde PHP.
 * @param {string} username - nombre del usuario
 */
export const init = (username) => {
    window.console.log(`[ESM] notifications_esm inicializado para: ${username}`);

    document.getElementById('btn-alert').addEventListener('click', showAlert);
    document.getElementById('btn-confirm').addEventListener('click', showConfirm);
    document.getElementById('btn-all').addEventListener('click', showAllTypes);
    document.getElementById('btn-toast').addEventListener('click', showToast);
    document.getElementById('btn-strings').addEventListener('click', fetchStrings);
};