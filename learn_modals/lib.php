<?php
// --- PHP API: Fragment API ---
// Los "fragment callbacks" permiten renderizar trozos de página
// y enviarlos al navegador vía AJAX. Útil para cargar formularios
// dentro de modales sin recargar la página.

defined('MOODLE_INTERNAL') || die();

/**
 * Fragment callback para cargar el formulario todo.
 *
 * Los fragment callbacks siguen la convención:
 * local_PLUGINNAME_output_fragment_NOMBRE($args)
 *
 * Se llaman desde JS con: Fragment.loadFragment('local_learn_modals', 'todo_form', contextid, params)
 *
 * @param array $args Arguments from JS
 * @return string HTML del formulario
 */
function local_learn_modals_output_fragment_todo_form($args)
{
    global $CFG;

    // Crear instancia del formulario
    // El segundo parámetro de moodleform es la URL de acción;
    // para fragmentos usamos null y procesamos con AJAX
    $form = new \local_learn_modals\form\todo_form(null, null, 'post', '', ['class' => 'todo-form']);

    // Si hay datos previos, rellenar el formulario
    if (!empty($args['jsonformdata'])) {
        $data = json_decode($args['jsonformdata']);
        $form->set_data($data);
    }

    return $form->render();
}