<?php
// --- PHP API: External Functions API (registro) ---
// Aquí defines qué funciones externas expone tu plugin.
// Estas funciones serán accesibles via AJAX desde JavaScript.
defined('MOODLE_INTERNAL') || die();

$functions = [
    // Cada función tiene un nombre único con prefijo del componente
    'local_learn_ajax_get_notes' => [
        'classname' => 'local_learn_ajax\external\get_notes',
        'description' => 'Get all notes for the current user',
        'type' => 'read',           // read = no modifica datos
        'ajax' => true,             // ¡IMPORTANTE! Permite llamadas desde core/ajax
        'loginrequired' => true,
    ],
    'local_learn_ajax_create_note' => [
        'classname' => 'local_learn_ajax\external\create_note',
        'description' => 'Create a new note',
        'type' => 'write',          // write = modifica datos
        'ajax' => true,
        'loginrequired' => true,
    ],
    'local_learn_ajax_delete_note' => [
        'classname' => 'local_learn_ajax\external\delete_note',
        'description' => 'Delete a note',
        'type' => 'write',
        'ajax' => true,
        'loginrequired' => true,
    ],
];