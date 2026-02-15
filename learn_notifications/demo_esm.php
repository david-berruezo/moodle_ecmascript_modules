<?php
require_once(__DIR__ . '/../../config.php');

// --- PHP API: Access API ---
require_login(); // Obliga a estar logueado

// --- PHP API: Page API ---
$PAGE->set_url(new moodle_url('/local/learn_notifications/demo_esm.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('demo_esm', 'local_learn_notifications'));
$PAGE->set_heading(get_string('demo_esm', 'local_learn_notifications'));

// --- PHP API: Cargar módulo JS ---
// js_call_amd(component/module, function, [params])
// Aunque el archivo es ESM, Babel lo transpila a AMD, por eso se llama js_call_amd
$PAGE->requires->js_call_amd(
    'local_learn_notifications/notifications_esm', // componente/módulo (sin .js)
    'init',                                         // función a llamar
    [$USER->firstname]                              // parámetros (se pasan como JSON)
);

// --- PHP API: Output API ---
echo $OUTPUT->header();

echo $OUTPUT->heading('Notifications Demo — ESM Version', 3);

echo '<div class="mb-3">';
echo '<p>Este demo usa <code>core/notification</code>, <code>core/str</code> y ';
echo '<code>core/toast</code> con sintaxis <strong>ESM</strong> (import/export).</p>';
echo '</div>';

// Botones — usan data-action para buenas prácticas, pero aquí usamos IDs para simplificar
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