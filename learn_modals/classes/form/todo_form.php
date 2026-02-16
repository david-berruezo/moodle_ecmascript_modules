<?php
namespace local_learn_modals\form;
// --- PHP API: Form API ---
// moodleform es la clase base para todos los formularios de Moodle.
// Genera HTML, valida datos, y maneja CSRF automáticamente.
defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/formslib.php');

class todo_form extends \moodleform
{

    /**
     * Define los campos del formulario.
     * Moodle llama a este método automáticamente.
     */
    protected function definition()
    {
        $mform = $this->_form; // MoodleQuickForm instance

        // Campo de texto simple
        $mform->addElement('text', 'title', get_string('todo_title', 'local_learn_modals'));
        $mform->setType('title', PARAM_TEXT);    // PARAM_TEXT limpia HTML
        $mform->addRule('title', null, 'required', null, 'client'); // Validación cliente

        // Textarea
        $mform->addElement('textarea', 'description',
            get_string('todo_description', 'local_learn_modals'),
            ['rows' => 4]);
        $mform->setType('description', PARAM_RAW);

        // Select / Dropdown
        $priorities = [
            0 => get_string('priority_low', 'local_learn_modals'),
            1 => get_string('priority_medium', 'local_learn_modals'),
            2 => get_string('priority_high', 'local_learn_modals'),
        ];
        $mform->addElement('select', 'priority',
            get_string('todo_priority', 'local_learn_modals'),
            $priorities);
        $mform->setDefault('priority', 1);
    }

    /**
     * Validación del lado servidor.
     * Moodle llama a esto cuando se envía el formulario.
     */
    public function validation($data, $files)
    {
        $errors = [];
        if (empty(trim($data['title']))) {
            $errors['title'] = 'Title cannot be empty';
        }
        if (strlen($data['title']) > 255) {
            $errors['title'] = 'Title too long (max 255 characters)';
        }
        return $errors;
    }
}