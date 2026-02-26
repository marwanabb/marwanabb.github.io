/* ======================================================
   Marwan Abbas — Site JS
   Scroll-reveal, active nav tracking, mobile menu
   ====================================================== */

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Scroll-triggered section reveal ----
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.12 }
);
sections.forEach((s) => observer.observe(s));

// ---- Active nav link tracking ----
const navLinks = document.querySelectorAll('.panel__nav-link');
const contentEl = document.getElementById('content');

function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
            current = section.id;
        }
    });
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href').substring(1);
        const target = document.getElementById(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// ---- Mobile menu ----
const menuToggle = document.getElementById('menu-toggle');
const panel = document.getElementById('panel');

function closeMobileMenu() {
    panel.classList.remove('open');
    menuToggle.classList.remove('open');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    menuToggle.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when clicking outside panel inner
panel.addEventListener('click', (e) => {
    if (e.target === panel) closeMobileMenu();
});

// ---- Profile image fallback ----
const profileImgs = document.querySelectorAll('.panel__photo, .mobile-header__avatar');
profileImgs.forEach((img) => {
    img.addEventListener('error', function () {
        this.src =
            'data:image/svg+xml,' +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23162a1e" width="200" height="200"/><text fill="%234caf80" font-family="sans-serif" font-size="64" x="50%" y="54%" text-anchor="middle" dominant-baseline="middle">MA</text></svg>'
            );
    });
});
