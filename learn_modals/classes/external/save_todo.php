<?php
namespace local_learn_modals\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_single_structure;
use core_external\external_value;

class save_todo extends external_api
{

    public static function execute_parameters(): external_function_parameters
    {
        return new external_function_parameters([
            'title' => new external_value(PARAM_TEXT, 'Todo title'),
            'description' => new external_value(PARAM_RAW, 'Description', VALUE_DEFAULT, ''),
            'priority' => new external_value(PARAM_INT, 'Priority 0-2', VALUE_DEFAULT, 1),
        ]);
    }

    public static function execute(string $title, string $description = '', int $priority = 1): array
    {
        global $DB, $USER;

        $params = self::validate_parameters(self::execute_parameters(), [
            'title' => $title, 'description' => $description, 'priority' => $priority,
        ]);

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('local/learn_modals:manage', $context);

        $record = (object)[
            'userid' => $USER->id,
            'title' => $params['title'],
            'description' => $params['description'],
            'priority' => $params['priority'],
            'timecreated' => time(),
        ];
        $record->id = $DB->insert_record('local_learn_modals_todos', $record);

        return [
            'id' => (int)$record->id,
            'title' => $record->title,
            'priority' => (int)$record->priority,
        ];
    }

    public static function execute_returns(): external_single_structure
    {
        return new external_single_structure([
            'id' => new external_value(PARAM_INT, 'New todo ID'),
            'title' => new external_value(PARAM_TEXT, 'Todo title'),
            'priority' => new external_value(PARAM_INT, 'Priority'),
        ]);
    }
}