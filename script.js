const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const navbar = document.querySelector('.navbar');
if (navbar) {
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.app-showcase, .section-header, .about-text, .contact-item, .feature-card, .service-card').forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function () {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wird gesendet...';
        submitBtn.disabled = true;
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" type="button" aria-label="Schliessen">&times;</button>
        </div>
    `;
    const colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6' };
    notification.style.cssText = `
        position: fixed; top: 88px; right: 20px; z-index: 10000;
        background: ${colors[type] || colors.info}; color: white;
        padding: 1rem 1.3rem; border-radius: 12px; max-width: 380px;
        box-shadow: 0 16px 40px rgba(0,0,0,.3);
    `;
    notification.querySelector('.notification-content').style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:1rem;';
    notification.querySelector('.notification-close').style.cssText = 'background:none;border:0;color:white;font-size:1.4rem;cursor:pointer;line-height:1;';
    document.body.appendChild(notification);
    notification.querySelector('.notification-close').addEventListener('click', () => notification.remove());
    setTimeout(() => notification.remove(), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Schliessen">&times;</button>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');

    const openLightbox = (src, alt) => {
        lightboxImage.src = src;
        lightboxImage.alt = alt || 'Screenshot';
        lightboxCaption.textContent = alt || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.hero-screenshot, .screenshot-item img').forEach((img) => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
});
