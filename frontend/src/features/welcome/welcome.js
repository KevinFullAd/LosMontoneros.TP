export function mountWelcome(root, { onContinue } = {}) {
    const shadow = root; 


    Promise.all([
        fetch('./features/welcome/welcome.html').then(r => r.text()),
        fetch('./features/welcome/welcome.css').then(r => r.text())
    ]).then(([html, css]) => {
        shadow.innerHTML = `<style>${css}</style>${html}`;

        const form = shadow.querySelector('#welcome-form');
        const input = shadow.querySelector('#userName');

        form.addEventListener('submit', e => {
            e.preventDefault();
            const name = input.value.trim();
            if (!name) return;
            localStorage.setItem('user_name', name);
            if (onContinue) onContinue(name);
        });
    });
}
