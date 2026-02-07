// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    // Change icon from hamburger to X
    const icon = hamburger.querySelector('i');
    if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements we want to animate
document.querySelectorAll('.service-card, .benefits-content, .testimonial-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Specific animation style for when visible
const style = document.createElement('style');
style.innerHTML = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Quick Appointment Form -> WhatsApp
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value.trim();
        const schedule = document.getElementById('schedule').value.trim();
        const message = document.getElementById('message').value.trim();

        const textLines = [
            `Hola, quiero agendar una cita en Clinica Dental Alcivar.`,
            `Nombre: ${name}`,
            `Teléfono: ${phone}`,
            `Motivo: ${service}`,
            `Horario preferido: ${schedule}`
        ];

        if (message) {
            textLines.push(`Detalles: ${message}`);
        }

        const text = encodeURIComponent(textLines.join('\n'));
        const url = `https://wa.me/593988797615?text=${text}`;
        window.open(url, '_blank');
    });
}

// Service cards flip and WhatsApp CTA
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('.service-cta')) {
            return;
        }
        card.classList.toggle('is-flipped');
    });
});

const serviceCtas = document.querySelectorAll('.service-cta');
serviceCtas.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const service = button.getAttribute('data-service') || 'Servicio dental';
        const text = encodeURIComponent(`Hola, deseo agendar una cita para ${service}.`);
        const url = `https://wa.me/593988797615?text=${text}`;
        window.open(url, '_blank');
    });
});

// Share location
const shareLocationBtn = document.getElementById('shareLocationBtn');
if (shareLocationBtn) {
    const locationText = 'Jardines del Salado, Manzana 193, Villa 9, Guayaquil, Ecuador';
    const locationUrl = 'https://www.google.com/maps/search/?api=1&query=Jardines%20del%20Salado,%20Manzana%20193,%20Villa%209,%20Guayaquil,%20Ecuador';

    shareLocationBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Clínica Dental Alcívar',
                    text: locationText,
                    url: locationUrl
                });
            } catch (error) {
                // ignored
            }
        } else {
            navigator.clipboard.writeText(`${locationText} - ${locationUrl}`);
            shareLocationBtn.textContent = 'Ubicación copiada';
            setTimeout(() => {
                shareLocationBtn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> Compartir ubicación';
            }, 2000);
        }
    });
}

// Gallery Carousel
const carousel = document.querySelector('[data-carousel]');
if (carousel) {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');

    let currentIndex = 0;
    let autoplayId = null;

    const createDots = () => {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    };

    const updateDots = () => {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    const startAutoplay = () => {
        stopAutoplay();
        autoplayId = setInterval(nextSlide, 4500);
    };

    const stopAutoplay = () => {
        if (autoplayId) {
            clearInterval(autoplayId);
            autoplayId = null;
        }
    };

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoplay();
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    createDots();
    goToSlide(0);
    startAutoplay();
}
