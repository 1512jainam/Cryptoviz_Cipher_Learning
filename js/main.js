document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
    initializeCipherCards();
    initializeDemoFunctionality();
});

function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    const messages = [
        "Decoding the secrets of cryptography...",
        "Exploring classical ciphers...",
        "Mastering encryption techniques...",
        "Visualizing cryptographic algorithms...",
        "Learning through interactive demos..."
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentMessage.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}


function initializeCipherCards() {
    const cipherCards = document.querySelectorAll('.cipher-card[data-href]');
    
    cipherCards.forEach(card => {
        card.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            if (href) {
                
                try {
                    window.location.href = href;
                } catch (error) {
                    console.error('Navigation failed:', error);
                    
                    window.open(href, '_blank');
                }
            }
        });
        

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Open ${card.querySelector('h4').textContent} page`);
    });
}


function initializeDemoFunctionality() {
    const demoInput = document.getElementById('demo-input');
    const demoOutput = document.getElementById('demo-output');
    
    if (demoInput && demoOutput) {

        demoInput.addEventListener('input', function() {
            const encrypted = caesarEncrypt(this.value, 3);
            demoOutput.textContent = encrypted;
        });
    }
}


function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}


function encryptDemo() {
    const demoInput = document.getElementById('demo-input');
    const demoOutput = document.getElementById('demo-output');
    
    if (demoInput && demoOutput) {
        const inputText = demoInput.value || 'Hello World!';
        const encrypted = caesarEncrypt(inputText, 3);
        

        demoOutput.style.transform = 'scale(1.05)';
        demoOutput.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            demoOutput.textContent = encrypted;
            demoOutput.style.transform = 'scale(1)';
        }, 150);
    }
}


function scrollToCiphers() {
    const ciphersSection = document.getElementById('ciphers');
    if (ciphersSection) {
        ciphersSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}


function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    

    const cards = document.querySelectorAll('.cipher-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}


window.addEventListener('load', () => {
    setTimeout(initializeScrollAnimations, 500);
});


document.addEventListener('mousemove', (e) => {

    const binaryBg = document.getElementById('binary-bg');
    if (binaryBg) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        binaryBg.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
});


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cyber-btn-blue') || e.target.classList.contains('cyber-btn-purple')) {

        const button = e.target;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
});


const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .cipher-card {
        position: relative;
        overflow: hidden;
    }
    
    .cipher-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
    }
    
    .cipher-card:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);