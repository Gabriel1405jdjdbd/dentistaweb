const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');

    // Animate burger
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// Sticky Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.85)';
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
    }
});

// Smooth scroll implementation fix for older browsers (optional, usually native is fine but this ensures offset for fixed header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
