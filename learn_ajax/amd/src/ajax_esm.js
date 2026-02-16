/**
 * Plugin 2: AJAX - Versión ESM
 *
 * Usa core/ajax para llamar a web services PHP desde el navegador.
 * Los web services se definen en db/services.php y classes/external/.
 *
 * @module     local_learn_ajax/ajax_esm
 */
import Ajax from 'core/ajax';
import Notification from 'core/notification';
import * as Str from 'core/str';
import * as Toast from 'core/toast';

/**
 * Carga las notas del usuario via AJAX y las muestra en el DOM.
 */
const loadNotes = async() => {
    const container = document.getElementById('notes-list');
    container.innerHTML = '<div class="text-center"><div class="spinner-border"></div></div>';

    try {
        // --- core/ajax: llamar a un web service ---
        // Ajax.call() devuelve un array de Promises (una por cada llamada)
        const results = Ajax.call([{
            methodname: 'local_learn_ajax_get_notes', // nombre del WS (de services.php)
            args: {}                                   // parámetros (vacío para get_notes)
        }]);

        // results[0] es la Promise de la primera (y única) llamada
        const notes = await results[0];

        if (notes.length === 0) {
            const noNotes = await Str.get_string('no_notes', 'local_learn_ajax');
            container.innerHTML = `<p class="text-muted">${noNotes}</p>`;
            return;
        }

        // Construir HTML con las notas
        let html = '';
        for (const note of notes) {
            html += `
                <div class="card mb-2" data-note-id="${note.id}">
                    <div class="card-body d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="card-title">${note.title}</h5>
                            <p class="card-text">${note.content}</p>
                            <small class="text-muted">${note.timeformatted}</small>
                        </div>
                        <button class="btn btn-sm btn-danger btn-delete"
                                data-note-id="${note.id}">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        }
        container.innerHTML = html;

        // Asociar eventos de borrado a los botones
        container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteNote(btn.dataset.noteId));
        });

    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Crea una nota nueva via AJAX.
 */
const createNote = async() => {
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) {
        Notification.addNotification({
            message: 'Title is required',
            type: 'error'
        });
        return;
    }

    try {
        // Llamada AJAX al web service de creación
        const results = Ajax.call([{
            methodname: 'local_learn_ajax_create_note',
            args: {title, content}  // ES6 shorthand: {title: title, content: content}
        }]);

        await results[0];

        // Limpiar formulario
        titleInput.value = '';
        contentInput.value = '';

        // Mostrar toast de éxito
        const msg = await Str.get_string('note_created', 'local_learn_ajax');
        await Toast.add(msg, {type: 'success'});

        // Recargar lista
        await loadNotes();

    } catch (error) {
        Notification.exception(error);
    }
};


/**
 * Borra una nota via AJAX.
 * @param {number|string} noteId - ID de la nota a borrar
 */
const deleteNote = async(noteId) => {
    try {
        const confirmMsg = await Str.get_string('confirm_delete', 'local_learn_ajax');

        // Usar Notification.confirm con callback
        Notification.confirm(
            'Delete',
            confirmMsg,
            'Delete',
            'Cancel',
            async() => {
                try {
                    const results = Ajax.call([{
                        methodname: 'local_learn_ajax_delete_note',
                        args: {id: parseInt(noteId)}
                    }]);
                    await results[0];

                    const msg = await Str.get_string('note_deleted', 'local_learn_ajax');
                    await Toast.add(msg, {type: 'info'});
                    await loadNotes();
                } catch (error) {
                    Notification.exception(error);
                }
            }
        );
    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Inicialización.
 */
export const init = () => {
    window.console.log('[ESM] ajax_esm initialized');

    document.getElementById('btn-create').addEventListener('click', createNote);
    loadNotes();
};