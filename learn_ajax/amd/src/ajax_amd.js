/**
 * Plugin 2: AJAX - Versión AMD
 * Mismo comportamiento que ajax_esm.js pero con sintaxis AMD.
 *
 * @module     local_learn_ajax/ajax_amd
 */
define(['core/ajax', 'core/notification', 'core/str', 'core/toast'],
    function(Ajax, Notification, Str, Toast) {

        var loadNotes = function() {
            var container = document.getElementById('notes-list');
            container.innerHTML = '<div class="text-center"><div class="spinner-border"></div></div>';

            // Ajax.call() es idéntico en AMD y ESM
            var results = Ajax.call([{
                methodname: 'local_learn_ajax_get_notes',
                args: {}
            }]);

            results[0].then(function(notes) {
                if (notes.length === 0) {
                    return Str.get_string('no_notes', 'local_learn_ajax').then(function(noNotes) {
                        container.innerHTML = '<p class="text-muted">' + noNotes + '</p>';
                    });
                }

                var html = '';
                notes.forEach(function(note) {
                    html += '<div class="card mb-2" data-note-id="' + note.id + '">' +
                        '<div class="card-body d-flex justify-content-between align-items-start">' +
                        '<div><h5 class="card-title">' + note.title + '</h5>' +
                        '<p class="card-text">' + note.content + '</p>' +
                        '<small class="text-muted">' + note.timeformatted + '</small></div>' +
                        '<button class="btn btn-sm btn-danger btn-delete" data-note-id="' +
                        note.id + '">Delete</button></div></div>';
                });
                container.innerHTML = html;

                container.querySelectorAll('.btn-delete').forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        deleteNote(btn.dataset.noteId);
                    });
                });

                return;
            }).catch(Notification.exception);
        };

        var createNote = function() {
            var titleInput = document.getElementById('note-title');
            var contentInput = document.getElementById('note-content');
            var title = titleInput.value.trim();
            var content = contentInput.value.trim();

            if (!title) {
                Notification.addNotification({message: 'Title is required', type: 'error'});
                return;
            }

            var results = Ajax.call([{
                methodname: 'local_learn_ajax_create_note',
                args: {title: title, content: content}
            }]);

            results[0].then(function() {
                titleInput.value = '';
                contentInput.value = '';
                return Str.get_string('note_created', 'local_learn_ajax');
            }).then(function(msg) {
                Toast.add(msg, {type: 'success'});
                loadNotes();
            }).catch(Notification.exception);
        };

        var deleteNote = function(noteId) {
            Str.get_string('confirm_delete', 'local_learn_ajax').then(function(confirmMsg) {
                Notification.confirm('Delete', confirmMsg, 'Delete', 'Cancel', function() {
                    var results = Ajax.call([{
                        methodname: 'local_learn_ajax_delete_note',
                        args: {id: parseInt(noteId)}
                    }]);
                    results[0].then(function() {
                        return Str.get_string('note_deleted', 'local_learn_ajax');
                    }).then(function(msg) {
                        Toast.add(msg, {type: 'info'});
                        loadNotes();
                    }).catch(Notification.exception);
                });
            });
        };

        return {
            init: function() {
                window.console.log('[AMD] ajax_amd initialized');
                document.getElementById('btn-create').addEventListener('click', createNote);
                loadNotes();
            }
        };
    }
);