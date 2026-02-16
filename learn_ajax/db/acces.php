<?php
defined('MOODLE_INTERNAL') || die();

$capabilities = [
    'local/learn_ajax:manage' => [
        'captype' => 'write',
        'contextlevel' => CONTEXT_SYSTEM,
        'archetypes' => [
            'manager' => CAP_ALLOW,
            'editingteacher' => CAP_ALLOW,
            // Si quieres que el admin también lo tenga explícitamente:
            'user' => CAP_ALLOW,  // ← esto se lo da a TODOS los usuarios autenticados
        ],
    ],
];