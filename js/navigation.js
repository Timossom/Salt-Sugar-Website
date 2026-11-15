/* Mobile navigation — works on all Salt & Sugar pages. */
document.querySelectorAll('.navbar').forEach(navbar => {
    const button = navbar.querySelector('.nav-toggle');
    const links = navbar.querySelector('nav');
    if (!button || !links) return;
    const close = () => {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Άνοιγμα μενού');
        links.classList.remove('nav-open');
    };
    button.addEventListener('click', () => {
        const opening = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(opening));
        button.setAttribute('aria-label', opening ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού');
        links.classList.toggle('nav-open', opening);
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    document.addEventListener('click', event => { if (!navbar.contains(event.target)) close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 800) close(); });
});
