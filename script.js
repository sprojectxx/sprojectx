/* ============================================
   SPROJECTXX — Interactions & Animations
   ============================================ */

// ── Loader ──
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1600);
});

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (cursor && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .pf-card, .port-item, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursorRing.style.width = '56px';
            cursorRing.style.height = '56px';
            cursorRing.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursorRing.style.width = '36px';
            cursorRing.style.height = '36px';
            cursorRing.style.opacity = '0.6';
        });
    });
}

// ── Nav Scroll ──
const nav = document.getElementById('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            // Only remove on index page (no forced scrolled class)
            if (!nav.classList.contains('scrolled') || !document.querySelector('.page-hero')) {
                nav.classList.remove('scrolled');
            }
        }
    }, { passive: true });
}

// ── Hamburger / Mobile Menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── FAQ Accordion ──
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        const icon = q.querySelector('svg');
        const isOpen = answer.style.display === 'block';

        // Close all
        document.querySelectorAll('.faq-a').forEach(a => { a.style.display = 'none'; });
        document.querySelectorAll('.faq-q svg').forEach(s => {
            s.style.transform = '';
        });

        if (!isOpen) {
            answer.style.display = 'block';
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    });
});

// ── Smooth hover tilt on cards (subtle) ──
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
    });
});

// ── Parallax on hero image ──
const heroImg = document.querySelector('.hero-image-wrap img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
    }, { passive: true });
}

// ── Counter animation for stats ──
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const num = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
        el.textContent = num + suffix;
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-num');
            nums.forEach(num => {
                const text = num.textContent;
                const digits = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/\d/g, '');
                if (!isNaN(digits)) animateCounter(num, digits, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-row').forEach(row => statsObserver.observe(row));

// ── Page transition on link click ──
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('http') &&
        !href.startsWith('mailto') &&
        !href.startsWith('tel') &&
        href.endsWith('.html')
    ) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    }
});

// Fade in on page load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
});
