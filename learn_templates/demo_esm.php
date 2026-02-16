<?php

// local/learn_templates/demo_esm.php
require_once(__DIR__ . '/../../config.php');

require_login();

$PAGE->set_url(new moodle_url('/local/learn_templates/demo_esm.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('demo_esm', 'local_learn_templates'));
$PAGE->set_heading(get_string('demo_esm', 'local_learn_templates'));

$PAGE->requires->js_call_amd('local_learn_templates/templates_esm', 'init');

echo $OUTPUT->header();
echo $OUTPUT->heading('Templates from JS — ESM Version', 3);

echo '<div class="mb-3">';
echo '<button id="btn-load-template" class="btn btn-primary mr-2">'
    . get_string('load_template', 'local_learn_templates') . '</button>';
echo '<button id="btn-load-multiple" class="btn btn-info">'
    . get_string('load_multiple', 'local_learn_templates') . '</button>';
echo '</div>';

echo '<div id="dynamic-output" class="mb-4"></div>';
echo '<div id="cards-output"></div>';

echo $OUTPUT->footer();