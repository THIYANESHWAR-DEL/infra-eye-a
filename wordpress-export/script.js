/**
 * CyberSuraksha AI - WordPress Static Export
 * JavaScript functionality
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initSmoothScroll();
    initQuiz();
    initSettings();
    initParticles();
    initAnimations();
});

// ========================================
// Theme Management
// ========================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeSwitch = document.getElementById('themeSwitch');
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle button in navbar
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Theme switch in settings
    if (themeSwitch) {
        themeSwitch.checked = savedTheme === 'dark';
        themeSwitch.addEventListener('change', function() {
            setTheme(this.checked ? 'dark' : 'light');
        });
    }
    
    function toggleTheme() {
        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
            sunIcons.forEach(icon => icon.classList.add('hidden'));
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
        } else {
            document.body.classList.remove('dark');
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
            moonIcons.forEach(icon => icon.classList.add('hidden'));
        }
        localStorage.setItem('theme', theme);
        
        // Update switch if exists
        if (themeSwitch) {
            themeSwitch.checked = theme === 'dark';
        }
    }
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
        });
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks) {
                    navLinks.classList.remove('mobile-open');
                }
            }
        });
    });
}

// ========================================
// Quiz Functionality
// ========================================
function initQuiz() {
    const quizModal = document.getElementById('quizModal');
    const startQuizBtn = document.getElementById('startQuiz');
    const closeQuizBtn = document.getElementById('closeQuiz');
    const closeResultBtn = document.getElementById('closeResult');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');
    
    const questions = [
        {
            question: "What is the minimum recommended password length?",
            options: ["6 characters", "8 characters", "12 characters", "4 characters"],
            correct: 2
        },
        {
            question: "Which of these is a sign of a phishing email?",
            options: ["From a known sender", "Urgent action required", "No links in email", "Proper grammar"],
            correct: 1
        },
        {
            question: "What should you do if you receive a suspicious call?",
            options: ["Share OTP", "Hang up and verify", "Give bank details", "Click unknown links"],
            correct: 1
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    // Open quiz modal
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            quizModal.classList.add('show');
            resetQuiz();
            showQuestion();
        });
    }
    
    // Close quiz modal
    if (closeQuizBtn) {
        closeQuizBtn.addEventListener('click', function() {
            quizModal.classList.remove('show');
        });
    }
    
    // Close on backdrop click
    if (quizModal) {
        quizModal.addEventListener('click', function(e) {
            if (e.target === quizModal) {
                quizModal.classList.remove('show');
            }
        });
    }
    
    // Close result
    if (closeResultBtn) {
        closeResultBtn.addEventListener('click', function() {
            quizModal.classList.remove('show');
        });
    }
    
    // Submit answer
    if (submitAnswerBtn) {
        submitAnswerBtn.addEventListener('click', function() {
            const selected = document.querySelector('input[name="answer"]:checked');
            
            if (!selected) {
                alert('Please select an answer');
                return;
            }
            
            const answer = parseInt(selected.value);
            
            if (answer === questions[currentQuestion].correct) {
                score++;
                showToast('Correct answer!', 'success');
            } else {
                showToast('Wrong answer', 'error');
            }
            
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });
    }
    
    function showQuestion() {
        const q = questions[currentQuestion];
        document.getElementById('questionNum').textContent = currentQuestion + 1;
        document.getElementById('quizQuestion').textContent = q.question;
        
        const optionsHtml = q.options.map((opt, i) => `
            <label class="quiz-option">
                <input type="radio" name="answer" value="${i}">
                <span>${opt}</span>
            </label>
        `).join('');
        
        document.getElementById('quizOptions').innerHTML = optionsHtml;
    }
    
    function showResult() {
        quizContainer.classList.add('hidden');
        quizResult.classList.remove('hidden');
        
        document.getElementById('finalScore').textContent = score;
        document.getElementById('earnedXP').textContent = score * 50;
    }
    
    function resetQuiz() {
        currentQuestion = 0;
        score = 0;
        quizContainer.classList.remove('hidden');
        quizResult.classList.add('hidden');
    }
}

// ========================================
// Settings
// ========================================
function initSettings() {
    // Language buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('language') || 'en';
    
    updateLanguageUI(currentLang);
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
        });
    });
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'ta' : 'en';
            setLanguage(newLang);
        });
    }
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        updateLanguageUI(lang);
        showToast(lang === 'ta' ? 'மொழி மாற்றப்பட்டது!' : 'Language changed!', 'success');
    }
    
    function updateLanguageUI(lang) {
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
            if (btn.classList.contains('active')) {
                btn.innerHTML = '✓ ' + btn.textContent.replace('✓ ', '');
            } else {
                btn.textContent = btn.textContent.replace('✓ ', '');
            }
        });
        
        const langBadge = document.querySelector('.lang-badge');
        if (langBadge) {
            langBadge.textContent = lang.toUpperCase();
        }
    }
    
    // Color picker
    const colorBtns = document.querySelectorAll('.color-btn');
    const colors = {
        'teal': '174 72% 40%',
        'purple': '280 60% 50%',
        'blue': '217 91% 60%',
        'orange': '25 95% 53%',
        'green': '142 76% 36%',
        'rose': '346 77% 50%'
    };
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.dataset.color;
            document.documentElement.style.setProperty('--primary', colors[color]);
            
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            localStorage.setItem('primaryColor', color);
            showToast('Color updated!', 'success');
        });
    });
    
    // Restore saved color
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor && colors[savedColor]) {
        document.documentElement.style.setProperty('--primary', colors[savedColor]);
        colorBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.color === savedColor);
        });
    }
    
    // Profile save
    const profileSaveBtn = document.querySelector('.profile-card .btn-primary');
    if (profileSaveBtn) {
        profileSaveBtn.addEventListener('click', function() {
            showToast('Profile saved!', 'success');
        });
    }
}

// ========================================
// Floating Particles
// ========================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: hsla(174, 72%, 40%, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
    
    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-30px) translateX(10px);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Scroll Animations
// ========================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.feature-card, .module-card, .lesson-card, .stat-card, .settings-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add visible animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Toast Notifications
// ========================================
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;
    
    // Add toast styles if not exists
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 1.5rem;
                background: var(--card);
                border: 1px solid var(--border);
                border-radius: 0.75rem;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                z-index: 10000;
                animation: toastSlideIn 0.3s ease;
            }
            
            .toast-success {
                border-left: 4px solid hsl(142, 76%, 36%);
            }
            
            .toast-error {
                border-left: 4px solid hsl(0, 84%, 60%);
            }
            
            .toast-icon {
                width: 1.5rem;
                height: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                font-size: 0.75rem;
                font-weight: bold;
            }
            
            .toast-success .toast-icon {
                background: hsla(142, 76%, 36%, 0.1);
                color: hsl(142, 76%, 36%);
            }
            
            .toast-error .toast-icon {
                background: hsla(0, 84%, 60%, 0.1);
                color: hsl(0, 84%, 60%);
            }
            
            .toast-message {
                font-size: 0.875rem;
                font-weight: 500;
            }
            
            @keyframes toastSlideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes toastSlideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// Mobile Menu Styles
// ========================================
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            .nav-links {
                position: fixed;
                top: 4rem;
                left: 0;
                right: 0;
                background: var(--card);
                border-bottom: 1px solid var(--border);
                padding: 1rem;
                flex-direction: column;
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }
            
            .nav-links.mobile-open {
                transform: translateY(0);
                opacity: 1;
                pointer-events: auto;
                display: flex;
            }
            
            .nav-link {
                width: 100%;
                padding: 0.75rem 1rem;
            }
        }
        
        .navbar.scrolled {
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);
})();

// ========================================
// Filter Tabs Functionality
// ========================================
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // In a real implementation, this would filter the lessons
        // For this static export, we just show the visual feedback
    });
});

console.log('CyberSuraksha AI - Static Export Loaded Successfully');
