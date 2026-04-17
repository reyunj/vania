// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Typing Effect
const typingTexts = [
    'Meme Queen 👑',
    'Viral Content Creator',
    'Trend Spotter 🔥',
    'Professional Laughter Provider',
    'Social Media Wizard'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) return;
    
    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }
    
    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function highlightActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-purple-600');
                link.classList.add('text-gray-700');
            });
            
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.remove('text-gray-700');
                activeLink.classList.add('text-purple-600');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Gallery Cards Hover Effect
document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('bg-white/90');
    } else {
        navbar.classList.remove('bg-white', 'shadow-md');
        navbar.classList.add('bg-white/90');
    }
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter Egg: Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    document.querySelectorAll('.gradient-text').forEach(element => {
        let colorIndex = 0;
        setInterval(() => {
            element.style.background = `linear-gradient(135deg, ${colors[colorIndex]} 0%, ${colors[(colorIndex + 1) % colors.length]} 100%)`;
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            colorIndex = (colorIndex + 1) % colors.length;
        }, 500);
    });
    
    showNotification('You found the secret! Welcome to the rainbow mode! ', 'info');
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(highlightActiveLink, 100));

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'h' to go home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log('🎉 Vania Meelim Meme Portfolio - Welcome! Press "h" for home or try the Konami Code for a rainbow surprise! Let\'s go viral! 🚀');
