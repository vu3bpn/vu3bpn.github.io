/* ── Scroll progress bar ───────────────────────────────────── */
window.addEventListener('scroll', () => {
    const el = document.getElementById('scroll-indicator');
    if (!el) return;
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    el.style.transform = `scaleX(${max > 0 ? scrolled / max : 0})`;
}, { passive: true });

/* ── Mobile sidebar toggle ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar   = document.getElementById('sidebar');
    const overlay   = document.getElementById('overlay');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        hamburger.classList.add('open');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
    }

    hamburger?.addEventListener('click', () =>
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar()
    );
    overlay?.addEventListener('click', closeSidebar);
});

/* ── Content loader ────────────────────────────────────────── */
function loadContent(sectionId, fileName) {
    const el = document.getElementById(sectionId);
    if (!el) return;

    // Skip animation class logic for the nav sidebar
    const isNav = sectionId === 'contents';

    if (!isNav) {
        el.classList.remove('loaded');
        el.classList.add('loading');
    }

    fetch(fileName)
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.text();
        })
        .then(html => {
            el.innerHTML = html;

            if (!isNav) {
                // Force reflow then animate in
                void el.offsetWidth;
                el.classList.remove('loading');
                el.classList.add('loaded');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Mark active nav link
            markActiveLink(fileName);

            // Close mobile sidebar after navigation
            if (!isNav) {
                document.getElementById('sidebar')?.classList.remove('open');
                document.getElementById('overlay')?.classList.remove('open');
                document.getElementById('hamburger')?.classList.remove('open');
            }
        })
        .catch(err => {
            if (!isNav) {
                el.classList.remove('loading');
                el.classList.add('loaded');
                el.innerHTML = `
                    <div style="padding:2rem;opacity:0.5;font-style:italic;">
                        Could not load <code>${fileName}</code>.
                    </div>`;
            }
            console.error('Error loading content:', err);
        });
}

/* ── Active nav highlighting ───────────────────────────────── */
function markActiveLink(fileName) {
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
        a.classList.remove('active');
        // Match by onclick attribute or href
        const onclick = a.getAttribute('onclick') || '';
        if (onclick.includes(fileName) || a.getAttribute('href') === fileName) {
            a.classList.add('active');
        }
    });
}

/* ── Utility: show a raw section (legacy support) ─────────── */
function showSection(sectionId) {
    document.querySelectorAll('.main > div').forEach(s => {
        s.style.display = 'none';
    });
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
}
