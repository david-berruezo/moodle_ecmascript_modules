<?php
namespace local_learn_ajax\external;

// --- PHP API: External Functions API ---
// Desde Moodle 4.2+ se usa el nuevo patrón con atributos PHP 8
use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_multiple_structure;
use core_external\external_single_structure;
use core_external\external_value;

/**
 * External function to get user notes.
 */
class get_notes extends external_api
{

    /**
     * Define los parámetros de ENTRADA.
     * Esta función no necesita parámetros (las notas son del usuario logueado).
     */
    public static function execute_parameters(): external_function_parameters
    {
        return new external_function_parameters([]);
    }

    /**
     * Lógica principal — aquí usamos la DML API.
     */
    public static function execute(): array
    {
        global $DB, $USER;

        // Validar contexto (obligatorio en toda external function)
        $context = \context_system::instance();
        self::validate_context($context);

        // --- PHP API: DML ---
        // get_records() devuelve un array de objetos
        $notes = $DB->get_records(
            'local_learn_ajax_notes',       // tabla (sin prefijo mdl_)
            ['userid' => $USER->id],        // condiciones WHERE
            'timecreated DESC'              // ORDER BY
        );

        $result = [];
        foreach ($notes as $note) {
            $result[] = [
                'id' => (int)$note->id,
                'title' => $note->title,
                'content' => $note->content ?? '',
                'timecreated' => (int)$note->timecreated,
                // userdate() formatea la fecha según el idioma del usuario
                'timeformatted' => userdate($note->timecreated, get_string('strftimedatetime', 'langconfig')),
            ];
        }

        return $result;
    }


    /**
     * Define la estructura de SALIDA.
     * Moodle valida automáticamente que tu retorno coincida con esta estructura.
     */
    public static function execute_returns(): external_multiple_structure
    {
        return new external_multiple_structure(
            new external_single_structure([
                'id' => new external_value(PARAM_INT, 'Note ID'),
                'title' => new external_value(PARAM_TEXT, 'Note title'),
                'content' => new external_value(PARAM_RAW, 'Note content'),
                'timecreated' => new external_value(PARAM_INT, 'Creation timestamp'),
                'timeformatted' => new external_value(PARAM_TEXT, 'Formatted date'),
            ])
        );
    }
}