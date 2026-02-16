<?php

namespace local_learn_templates\output;

// --- PHP API: Output API ---
// Una clase "renderable" que implementa "templatable"
// permite pasar datos estructurados a un template Mustache.
use renderable;
use templatable;
use renderer_base;
use stdClass;

/**
 * User card renderable.
 *
 * Esta clase encapsula los datos que necesita el template.
 * Moodle llama a export_for_template() para obtener el contexto.
 */
class user_card implements renderable, templatable
{

    /** @var stdClass user object */
    private $user;

    /** @var string role name */
    private $role;

    public function __construct(stdClass $user, string $role = 'Student')
    {
        $this->user = $user;
        $this->role = $role;
    }

    /**
     * Exporta los datos para el template Mustache.
     *
     * @param renderer_base $output
     * @return array Contexto para el template
     */
    public function export_for_template(renderer_base $output): array
    {
        return [
            'fullname' => fullname($this->user),
            'email' => $this->user->email,
            'role' => $this->role,
            'profileurl' => (new \moodle_url('/user/profile.php', ['id' => $this->user->id]))->out(),
            'pictureurl' => $output->user_picture($this->user, ['size' => 64, 'link' => false]),
            'timecreated' => userdate($this->user->timecreated),
            'is_admin' => is_siteadmin($this->user->id),
        ];
    }
}