<?php

namespace local_learn_ajax\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_single_structure;
use core_external\external_value;

class delete_note extends external_api
{

    public static function execute_parameters(): external_function_parameters
    {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'Note ID to delete'),
        ]);
    }

    public static function execute(int $id): array
    {
        global $DB, $USER;

        $params = self::validate_parameters(self::execute_parameters(), ['id' => $id]);

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/learn_ajax:manage', $context);

        // --- PHP API: DML (verificar propiedad + borrar) ---
        // Importante: verificar que la nota pertenece al usuario actual
        $note = $DB->get_record('local_learn_ajax_notes', [
            'id' => $params['id'],
            'userid' => $USER->id,
        ], '*', MUST_EXIST); // MUST_EXIST lanza excepción si no existe

        $DB->delete_records('local_learn_ajax_notes', ['id' => $note->id]);

        return ['success' => true, 'id' => (int)$note->id];
    }

    public static function execute_returns(): external_single_structure
    {
        return new external_single_structure([
            'success' => new external_value(PARAM_BOOL, 'Whether deletion was successful'),
            'id' => new external_value(PARAM_INT, 'Deleted note ID'),
        ]);
    }
}