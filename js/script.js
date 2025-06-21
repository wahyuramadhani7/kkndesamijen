// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initParticles();
    initScrollAnimations();
    initCounterAnimation();
    initBackToTop();
    initSmoothScrolling();
    initLoadingAnimation();
    initParallaxEffect();
    initCardHoverEffects();
    initTypingAnimation();
    initGlitchEffect();
    initMouseTrail();
    initMagneticButtons();
    initScrollProgress();
    initAdvancedAnimations();
    initFloatingAnimation();
    initTextReveal();
    initImageLazyLoad();
    initFormValidation();
    
    console.log('🌱 KKN Desa Mijen website loaded with enhanced animations');
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Active nav link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Floating particles animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-8px
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration
    const duration = Math.random() * 10 + 5;
    particle.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = `${delay}s`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    
    container.appendChild(particle);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for different animation types
                if (entry.target.classList.contains('about-card')) {
                    entry.target.style.animationDelay = '0.2s';
                }
                
                if (entry.target.classList.contains('kegiatan-card')) {
                    const cards = document.querySelectorAll('.kegiatan-card');
                    cards.forEach((card, index) => {
                        if (card === entry.target) {
                            card.style.animationDelay = `${index * 0.2}s`;
                        }
                    });
                }
                
                if (entry.target.classList.contains('gallery-item')) {
                    const items = document.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        if (item === entry.target) {
                            item.style.animationDelay = `${index * 0.1}s`;
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll(`
        .about-card,
        .kegiatan-card,
        .gallery-item,
        .contact-item,
        .stat-item
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Counter animation for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(31, 41, 55, 0.9);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = loadingOverlay.querySelector('.loading-spinner');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(52, 211, 153, 0.3);
        border-top: 3px solid #34d399;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const geometricShapes = document.querySelectorAll('.geometric-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        geometricShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Add hover effects to cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.kegiatan-card, .about-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(52, 211, 153, 0.3)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Add typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #34d399';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Add glitch effect to logo
function initGlitchEffect() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            logo.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ffff,
                0 2px #ffff00,
                0 -2px #ff00ff
            `;
            
            setTimeout(() => {
                logo.style.textShadow = 'none';
            }, 100);
        }
    }, 500);
}

// Add mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(52, 211, 153, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            x += (parseFloat(nextDot.style.left) - x) * 0.3;
            y += (parseFloat(nextDot.style.top) - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Add magnetic effect to buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #34d399, #10b981);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add intersection observer for advanced animations
function initAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add stagger animation to children
                const children = element.querySelectorAll('.fade-in');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe sections for advanced animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add floating animation to elements
function initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const duration = 3 + Math.random() * 2; // 3-5 seconds
        const delay = index * 0.5;
        
        element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Add text reveal animation
function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                element.textContent = '';
                
                // Create spans for each character
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(20px)';
                    span.style.transition = `all 0.3s ease ${index * 0.05}s`;
                    element.appendChild(span);
                    
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                textObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(element => {
        textObserver.observe(element);
    });
}

// Lazy loading for images
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Remove error class after user starts typing
                    input.addEventListener('input', function() {
                        this.classList.remove('error');
                    });
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Pesan berhasil dikirim!';
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #10b981;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                `;
                
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.style.transform = 'translateX(0)';
                }, 100);
                
                setTimeout(() => {
                    successMessage.style.transform = 'translateX(400px)';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 3000);
                
                // Reset form
                form.reset();
            }
        });
    });
}

// Add custom cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #34d399;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Change cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .kegiatan-card, .gallery-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(52, 211, 153, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .particle {
        position: absolute;
        background: rgba(52, 211, 153, 0.6);
        border-radius: 50%;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
    }
    
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);