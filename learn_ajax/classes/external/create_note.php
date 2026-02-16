<?php
namespace local_learn_ajax\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_single_structure;
use core_external\external_value;

class create_note extends external_api
{

    public static function execute_parameters(): external_function_parameters
    {
        return new external_function_parameters([
            'title' => new external_value(PARAM_TEXT, 'Note title'),
            'content' => new external_value(PARAM_RAW, 'Note content', VALUE_DEFAULT, ''),
        ]);
    }

    public static function execute(string $title, string $content = ''): array
    {
        global $DB, $USER;

        // Validar parámetros — Moodle limpia XSS automáticamente según PARAM_*
        $params = self::validate_parameters(self::execute_parameters(), [
            'title' => $title,
            'content' => $content,
        ]);

        $context = \context_system::instance();
        // echo '<pre>' . print_r($context, true) . '</pre>';
        // die();

        self::validate_context($context);

        // --- PHP API: Access API ---
        // require_capability('local/learn_ajax:manage', $context);

        // --- PHP API: DML (insertar) ---
        $record = new \stdClass();
        $record->userid = $USER->id;
        $record->title = $params['title'];
        $record->content = $params['content'];
        $record->timecreated = time();

        $record->id = $DB->insert_record('local_learn_ajax_notes', $record);

        return [
            'id' => (int)$record->id,
            'title' => $record->title,
            'content' => $record->content,
            'timecreated' => (int)$record->timecreated,
            'timeformatted' => userdate($record->timecreated),
        ];
    }

    public static function execute_returns(): external_single_structure
    {
        return new external_single_structure([
            'id' => new external_value(PARAM_INT, 'New note ID'),
            'title' => new external_value(PARAM_TEXT, 'Note title'),
            'content' => new external_value(PARAM_RAW, 'Note content'),
            'timecreated' => new external_value(PARAM_INT, 'Creation timestamp'),
            'timeformatted' => new external_value(PARAM_TEXT, 'Formatted date'),
        ]);
    }
}