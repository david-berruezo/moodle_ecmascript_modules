<?php

// local/learn_notifications/demo_amd.php
require_once(__DIR__ . '/../../config.php');

require_login();

$PAGE->set_url(new moodle_url('/local/learn_notifications/demo_amd.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('demo_amd', 'local_learn_notifications'));
$PAGE->set_heading(get_string('demo_amd', 'local_learn_notifications'));

// La ÚNICA diferencia: cargamos el módulo AMD en vez del ESM
$PAGE->requires->js_call_amd(
    'local_learn_notifications/notifications_amd',
    'init',
    [$USER->firstname]
);

echo $OUTPUT->header();
echo $OUTPUT->heading('Notifications Demo — AMD Version', 3);

echo '<div class="mb-3">';
echo '<p>Este demo usa los mismos módulos del core pero con sintaxis <strong>AMD</strong> ';
echo '(define/require). Compara el código con la versión ESM.</p>';
echo '</div>';

echo '<div class="btn-group-vertical gap-2" role="group">';
echo '<button id="btn-alert" class="btn btn-primary mb-2">'
    . get_string('btn_alert', 'local_learn_notifications') . '</button>';
echo '<button id="btn-confirm" class="btn btn-warning mb-2">'
    . get_string('btn_confirm', 'local_learn_notifications') . '</button>';
echo '<button id="btn-all" class="btn btn-info mb-2">'
    . get_string('btn_all', 'local_learn_notifications') . '</button>';
echo '<button id="btn-toast" class="btn btn-success mb-2">'
    . get_string('btn_toast', 'local_learn_notifications') . '</button>';
echo '<button id="btn-strings" class="btn btn-secondary mb-2">'
    . get_string('btn_strings', 'local_learn_notifications') . '</button>';
echo '</div>';

echo '<div id="strings-output" class="mt-4 p-3 border rounded"></div>';

echo $OUTPUT->footer();