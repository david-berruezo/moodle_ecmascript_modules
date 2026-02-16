<?php
defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $ADMIN->add('localplugins', new admin_externalpage(
        'local_learn_ajax',
        get_string('pluginname', 'local_learn_ajax'),
        new moodle_url('/local/learn_ajax/demo_esm.php')
    ));
}