<?php
require_once(__DIR__ . '/../../config.php');

require_login();

$context = context_system::instance();
$PAGE->set_url(new moodle_url('/local/learn_modals/demo_esm.php'));
$PAGE->set_context($context);
$PAGE->set_title(get_string('demo_esm', 'local_learn_modals'));
$PAGE->set_heading(get_string('demo_esm', 'local_learn_modals'));

// Pasar el context ID al módulo JS — Fragment API lo necesita
$PAGE->requires->js_call_amd('local_learn_modals/modals_esm', 'init', [$context->id]);

echo $OUTPUT->header();
echo $OUTPUT->heading('Modals + Form API Demo — ESM', 3);

echo '<button id="btn-add-todo" class="btn btn-primary mb-3">'
    . get_string('add_todo', 'local_learn_modals') . '</button>';

echo '<div id="todos-list">';

// Mostrar todos existentes
$todos = $DB->get_records('local_learn_modals_todos', ['userid' => $USER->id], 'timecreated DESC');
$priorities = ['Low', 'Medium', 'High'];
$classes = ['info', 'warning', 'danger'];
foreach ($todos as $todo) {
    echo '<div class="card mb-2"><div class="card-body py-2">';
    echo '<div class="d-flex justify-content-between"><div>';
    echo '<strong>' . s($todo->title) . '</strong>';
    if ($todo->description) {
        echo '<br><small>' . s($todo->description) . '</small>';
    }
    echo '</div>';
    echo '<span class="badge badge-' . $classes[$todo->priority] . '">'
        . $priorities[$todo->priority] . '</span>';
    echo '</div></div></div>';
}

echo '</div>';

echo $OUTPUT->footer();