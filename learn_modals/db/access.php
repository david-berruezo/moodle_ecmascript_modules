<?php
defined('MOODLE_INTERNAL') || die();

$capabilities = [
    'local/learn_modals:manage' => [
        'captype' => 'write',
        'contextlevel' => CONTEXT_SYSTEM,
        'archetypes' => ['user' => CAP_ALLOW, 'manager' => CAP_ALLOW],
    ],
];