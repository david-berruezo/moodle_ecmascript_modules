/**
 * Plugin 3: Templates - Versión AMD
 * @module     local_learn_templates/templates_amd
 */
define(['core/templates', 'core/notification'],
    function(Templates, Notification) {

        var loadDynamicTemplate = function() {
            var container = document.getElementById('dynamic-output');

            // En AMD usamos .then() en vez de async/await
            Templates.renderForPromise('local_learn_templates/dynamic_content', {
                type: 'info',
                title: 'Dynamic Content Loaded!',
                message: 'This was rendered from JavaScript using core/templates (AMD).',
                items: true,
                list: [
                    {name: 'core/templates', description: 'Render Mustache from JS'},
                    {name: 'core/ajax', description: 'Call web services from JS'},
                    {name: 'core/notification', description: 'Show alerts and dialogs'},
                ],
                showclose: true,
            }).then(function(result) {
                // result = {html: '...', js: '...'}
                return Templates.replaceNodeContents(container, result.html, result.js);
            }).catch(Notification.exception);
        };

        var loadMultipleCards = function() {
            var container = document.getElementById('cards-output');
            container.innerHTML = '';

            var users = [
                {type: 'success', title: 'Alice', message: 'Frontend Developer', items: false, showclose: false},
                {type: 'warning', title: 'Bob', message: 'Backend Developer', items: false, showclose: false},
                {type: 'primary', title: 'Carol', message: 'Full Stack Developer', items: false, showclose: false},
            ];

            // Promise.all funciona igual en AMD
            Promise.all(
                users.map(function(user) {
                    return Templates.renderForPromise('local_learn_templates/dynamic_content', user);
                })
            ).then(function(renders) {
                renders.forEach(function(result) {
                    Templates.appendNodeContents(container, result.html, result.js);
                });
            }).catch(Notification.exception);
        };

        return {
            init: function() {
                window.console.log('[AMD] templates_amd initialized');
                document.getElementById('btn-load-template').addEventListener('click', loadDynamicTemplate);
                document.getElementById('btn-load-multiple').addEventListener('click', loadMultipleCards);
            }
        };
    }
);