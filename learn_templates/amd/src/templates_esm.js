/**
 * Plugin 3: Templates - Versión ESM
 *
 * Usa core/templates para renderizar plantillas Mustache desde JavaScript.
 * Los templates viven en templates/ y se cargan via AJAX.
 *
 * @module     local_learn_templates/templates_esm
 */
import Templates from 'core/templates';
import Notification from 'core/notification';

/**
 * Renderiza un template Mustache con datos y lo inserta en el DOM.
 */
const loadDynamicTemplate = async() => {
    const container = document.getElementById('dynamic-output');

    try {
        // --- core/templates: renderizar un template ---
        // Templates.renderForPromise(component/template, contexto)
        // Devuelve {html, js} — html es el HTML renderizado, js es el JS inline del template
        const {html, js} = await Templates.renderForPromise(
            'local_learn_templates/dynamic_content', // componente/nombre_template
            {
                // Contexto: los datos que recibe el template Mustache
                type: 'info',
                title: 'Dynamic Content Loaded!',
                message: 'This was rendered from JavaScript using core/templates.',
                items: true,
                list: [
                    {name: 'core/templates', description: 'Render Mustache from JS'},
                    {name: 'core/ajax', description: 'Call web services from JS'},
                    {name: 'core/notification', description: 'Show alerts and dialogs'},
                ],
                showclose: true,
            }
        );

        // Insertar el HTML en el contenedor
        // Templates.replaceNodeContents() también ejecuta el JS inline del template
        Templates.replaceNodeContents(container, html, js);

    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Renderiza múltiples tarjetas dinámicas.
 */
const loadMultipleCards = async() => {
    const container = document.getElementById('cards-output');
    container.innerHTML = '';

    const users = [
        {type: 'success', title: 'Alice', message: 'Frontend Developer', items: false, showclose: false},
        {type: 'warning', title: 'Bob', message: 'Backend Developer', items: false, showclose: false},
        {type: 'primary', title: 'Carol', message: 'Full Stack Developer', items: false, showclose: false},
    ];

    try {
        // Renderizar múltiples templates en paralelo con Promise.all
        const renders = await Promise.all(
            users.map(user =>
                Templates.renderForPromise('local_learn_templates/dynamic_content', user)
            )
        );

        // Insertar todos los resultados
        for (const {html, js} of renders) {
            // appendNodeContents añade SIN reemplazar el contenido existente
            Templates.appendNodeContents(container, html, js);
        }
    } catch (error) {
        Notification.exception(error);
    }
};

/**
 * Inicialización.
 */
export const init = () => {
    window.console.log('[ESM] templates_esm initialized');
    document.getElementById('btn-load-template').addEventListener('click', loadDynamicTemplate);
    document.getElementById('btn-load-multiple').addEventListener('click', loadMultipleCards);
};