<?php
defined('MOODLE_INTERNAL') || die();

$functions = [
    'local_learn_modals_save_todo' => [
        'classname' => 'local_learn_modals\external\save_todo',
        'description' => 'Save a new todo item',
        'type' => 'write',
        'ajax' => true,
        'loginrequired' => true,
    ],
];