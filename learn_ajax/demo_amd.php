<?php
require_once(__DIR__ . '/../../config.php');

require_login();

$PAGE->set_url(new moodle_url('/local/learn_ajax/demo_esm.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('demo_esm', 'local_learn_ajax'));
$PAGE->set_heading(get_string('demo_esm', 'local_learn_ajax'));

$PAGE->requires->js_call_amd('local_learn_ajax/ajax_amd', 'init');

echo $OUTPUT->header();
echo $OUTPUT->heading('AJAX Notes Demo — ESM Version', 3);

echo '<div class="row">';
echo '<div class="col-md-4">';
echo '<div class="card"><div class="card-body">';
echo '<h5 class="card-title">New Note</h5>';
echo '<div class="mb-3">';
echo '<label for="note-title" class="form-label">Title</label>';
echo '<input type="text" class="form-control" id="note-title" placeholder="Enter title...">';
echo '</div>';
echo '<div class="mb-3">';
echo '<label for="note-content" class="form-label">Content</label>';
echo '<textarea class="form-control" id="note-content" rows="3" placeholder="Enter content..."></textarea>';
echo '</div>';
echo '<button id="btn-create" class="btn btn-primary w-100">'
    . get_string('add_note', 'local_learn_ajax') . '</button>';
echo '</div></div>';
echo '</div>';

echo '<div class="col-md-8">';
echo '<h5>Your Notes</h5>';
echo '<div id="notes-list"></div>';
echo '</div>';
echo '</div>';

echo $OUTPUT->footer();