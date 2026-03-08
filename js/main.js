/**
 * Portfolio Site - Main JavaScript
 * 洗練ダーク × エディトリアル - スムーズスクロール、フェードイン、モバイルメニュー
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Scroll Progress Bar
    // ========================================
    const progressBar = document.querySelector('.progress-bar__fill');

    const updateProgressBar = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Intersection Observer for Fade-in Animations
    // ========================================
    const fadeElements = document.querySelectorAll(
        '.section, .strength-card, .experience-card, .skill-item, .interest-card, .research__content'
    );

    // Add fade-in class to elements
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observerOptions = {
        root: null,
        rootMargin: '-80px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // ========================================
    // Header Background on Scroll
    // ========================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            header.style.borderBottomColor = 'rgba(245, 158, 11, 0.1)';
        } else {
            header.style.boxShadow = 'none';
            header.style.borderBottomColor = '';
        }
    });

    // ========================================
    // Active Navigation Link Highlighting
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__menu a');

    const highlightNavOnScroll = () => {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    // ========================================
    // Stagger Animation for Grid Items
    // ========================================
    const staggerContainers = document.querySelectorAll('.strengths__grid, .experience__grid, .skills__grid, .interests__grid');

    staggerContainers.forEach(container => {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // ========================================
    // Parallax Effect for Hero (弱める)
    // ========================================
    const heroContent = document.querySelector('.hero__content');
    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.9));
        }
        ticking = false;
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // ========================================
    // Typing Effect
    // ========================================
    const typingElement = document.getElementById("typing-text");
    const prefersReducedMotionTyping = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typingElement && !prefersReducedMotionTyping) {
        const text = typingElement.dataset.text || typingElement.textContent;
        typingElement.textContent = "";
        typingElement.classList.add("hero__role--typing");

        let charIndex = 0;
        const typingSpeed = 100; // ms per character

        const typeChar = () => {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        };

        // Start typing after a short delay
        setTimeout(typeChar, 800);
    } else if (typingElement) {
        // If reduced motion is preferred, just show the text
        typingElement.textContent = typingElement.dataset.text || typingElement.textContent;
    }


    const scrollIndicator = document.querySelector('.hero__scroll');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.3s ease';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
});
