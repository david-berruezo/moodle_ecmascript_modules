/**
 * Plugin 4: Modals - Versión ESM
 *
 * Usa core/modal_factory para crear diálogos modales,
 * y core/fragment para cargar formularios PHP dentro del modal via AJAX.
 *
 * @module     local_learn_modals/modals_esm
 */
import ModalFactory from 'core/modal_factory';
import ModalEvents from 'core/modal_events';
import Fragment from 'core/fragment';
import Ajax from 'core/ajax';
import Notification from 'core/notification';
import * as Toast from 'core/toast';
import * as Str from 'core/str';

/** @var {number} Context ID del sistema (pasado desde PHP) */
let contextId;

/**
 * Abre un modal con el formulario de Todo cargado via Fragment API.
 */
const openTodoModal = async() => {
    try {
        const title = await Str.get_string('add_todo', 'local_learn_modals');

        // --- core/modal_factory: crear un modal ---
        const modal = await ModalFactory.create({
            type: ModalFactory.types.SAVE_CANCEL,  // Modal con botón Save y Cancel
            title: title,
            // --- core/fragment: cargar HTML desde PHP via AJAX ---
            // Esto llama a local_learn_modals_output_fragment_todo_form() en lib.php
            body: Fragment.loadFragment(
                'local_learn_modals',    // componente
                'todo_form',             // nombre del fragmento (sufijo del callback)
                contextId,               // ID de contexto (requerido por Fragment API)
                {}                       // parámetros adicionales
            ),
        });

        // --- core/modal_events: escuchar eventos del modal ---
        modal.getRoot().on(ModalEvents.save, (e) => {
            e.preventDefault();
            submitForm(modal);
        });

        modal.show();

    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Procesa el formulario del modal y envía los datos al web service.
 * @param {Object} modal - Instancia del modal
 */
const submitForm = async(modal) => {
    // Extraer datos del formulario dentro del modal
    const form = modal.getRoot().find('form');
    const formData = new FormData(form[0]);

    const title = formData.get('title');
    const description = formData.get('description');
    const priority = parseInt(formData.get('priority'));

    if (!title || !title.trim()) {
        Notification.addNotification({message: 'Title is required', type: 'error'});
        return;
    }

    try {
        const results = Ajax.call([{
            methodname: 'local_learn_modals_save_todo',
            args: {title, description, priority}
        }]);

        await results[0];

        modal.destroy();

        const msg = await Str.get_string('todo_saved', 'local_learn_modals');
        await Toast.add(msg, {type: 'success'});

        // Añadir la nueva tarjeta al DOM
        const container = document.getElementById('todos-list');
        const priorities = ['Low', 'Medium', 'High'];
        const classes = ['info', 'warning', 'danger'];
        container.insertAdjacentHTML('afterbegin', `
            <div class="card mb-2">
                <div class="card-body py-2">
                    <div class="d-flex justify-content-between">
                        <div>
                            <strong>${title}</strong>
                            ${description ? '<br><small>' + description + '</small>' : ''}
                        </div>
                        <span class="badge badge-${classes[priority]}">${priorities[priority]}</span>
                    </div>
                </div>
            </div>
        `);

    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Inicialización.
 * @param {number} ctxId - Context ID del sistema
 */
export const init = (ctxId) => {
    contextId = ctxId;
    window.console.log('[ESM] modals_esm initialized');
    document.getElementById('btn-add-todo').addEventListener('click', openTodoModal);
};