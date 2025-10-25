// /src/app.js
import { mountWelcome } from './features/welcome/welcome.js';
import { mountMaintenance } from './features/maintenance/maintenance.js';

const app = document.getElementById('app');

/* ---------- Router ---------- */
function route(path) {
    app.innerHTML = '';

    switch (path) {
        case '/':
        case '/inicio':
            mountWelcome(app, { onContinue: () => navigate('/trabajando') });
            break;

        case '/trabajando':
            mountMaintenance(app, {
                error: 'Esta sección aún no está implementada.',
                onReturn: () => navigate('/')
            });
            break;

        default:
            mountMaintenance(app, {
                error: `Ruta no encontrada: ${path}`,
                onReturn: () => navigate('/')
            });
            break;
    }
}

/* ---------- Navegación ---------- */
function navigate(path) {
    // si el hash actual es distinto → cambia hash
    if (location.hash.slice(1) !== path) {
        location.hash = path;
    } else {
        // si es el mismo → fuerza render
        route(path);
    }
}

/* ---------- Manejo de errores seguro ---------- */
function safeRoute() {
    try {
        const currentPath = location.hash.slice(1) || '/';
        route(currentPath);
    } catch (err) {
        console.error(err);
        mountMaintenance(app, {
            error: err.message || String(err),
            onReturn: () => navigate('/')
        });
    }
}

/* ---------- Eventos ---------- */
window.addEventListener('hashchange', safeRoute);
document.addEventListener('DOMContentLoaded', safeRoute);
