<?php

// local/learn_templates/demo_php.php
// Muestra cómo renderizar templates Mustache desde PHP (Output API)
require_once(__DIR__ . '/../../config.php');

require_login();

$PAGE->set_url(new moodle_url('/local/learn_templates/demo_php.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('demo_php', 'local_learn_templates'));
$PAGE->set_heading(get_string('demo_php', 'local_learn_templates'));

echo $OUTPUT->header();
echo $OUTPUT->heading('Templates from PHP — Output API', 3);

// --- PHP API: Output API — Método 1: Renderable + Templatable ---
// Usamos la clase user_card que implementa renderable + templatable.
$user = $DB->get_record('user', ['id' => $USER->id]);
$card = new \local_learn_templates\output\user_card($user, 'Administrator');

// $OUTPUT->render() busca el template que corresponda a la clase
// local_learn_templates\output\user_card → templates/user_card.mustache
echo $OUTPUT->heading('Method 1: Renderable class', 4);
echo $OUTPUT->render($card);

// --- PHP API: Output API — Método 2: render_from_template() directo ---
// Cuando no necesitas una clase, puedes pasar datos directamente.
echo $OUTPUT->heading('Method 2: Direct render_from_template()', 4);

$templatedata = [
    'type' => 'success',
    'title' => 'Rendered from PHP!',
    'message' => 'This template was rendered using $OUTPUT->render_from_template().',
    'items' => true,
    'list' => [
        ['name' => 'DML API', 'description' => '$DB->get_record(), insert, update, delete'],
        ['name' => 'Form API', 'description' => 'moodleform for user input'],
        ['name' => 'Output API', 'description' => 'Renderers and Mustache templates'],
    ],
    'showclose' => false,
];

echo $OUTPUT->render_from_template('local_learn_templates/dynamic_content', $templatedata);

// --- Método 3: Varios usuarios ---
echo $OUTPUT->heading('Method 3: Multiple users from database', 4);

$users = $DB->get_records('user', ['deleted' => 0, 'suspended' => 0], 'firstname', '*', 0, 5);
foreach ($users as $u) {
    if ($u->id == 1) {
        continue; // Saltar guest
    }
    $role = is_siteadmin($u->id) ? 'Admin' : 'User';
    $usercard = new \local_learn_templates\output\user_card($u, $role);
    echo $OUTPUT->render($usercard);
}

echo $OUTPUT->footer();