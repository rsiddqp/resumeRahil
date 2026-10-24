// Dynamic year update
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.setAttribute(
      'aria-expanded',
      mobileMenu.classList.contains('active')
    );
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip empty or just '#' links
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Enhanced Intersection Observer for staggered fade-in animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }, delay * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements with staggered delays
document.querySelectorAll('.section, .expertise-card, .timeline-item, [data-animate]').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px) scale(0.95)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
  el.dataset.delay = Math.min(index % 6, 5);
  observer.observe(el);
});

// Enhanced parallax effect for hero background
const splineContainer = document.getElementById('hero-3d');

if (splineContainer) {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const opacity = Math.max(0, 1 - scrolled / 800);
        splineContainer.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(${1 + scrolled * 0.0001})`;
        splineContainer.style.opacity = opacity;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Add smooth reveal for tech tags
const techTags = document.querySelectorAll('.tech-tags span');
techTags.forEach((tag, index) => {
  tag.style.opacity = '0';
  tag.style.transform = 'translateY(10px)';
  tag.style.transition = `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
  
  const tagObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        tagObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  tagObserver.observe(tag);
});

// Enhanced cursor glow effect with gradient
const createGlowEffect = () => {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.18), rgba(6, 182, 212, 0.12) 40%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.4s ease;
    mix-blend-mode: screen;
    filter: blur(20px);
  `;
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  const animateGlow = () => {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    
    glow.style.left = `${glowX - 250}px`;
    glow.style.top = `${glowY - 250}px`;
    
    requestAnimationFrame(animateGlow);
  };

  animateGlow();
};

// Only add glow effect on devices with mouse (not touch)
if (window.matchMedia('(pointer: fine)').matches) {
  createGlowEffect();
}

// Enhanced card tilt effect with magnetic attraction
const cards = document.querySelectorAll('.expertise-card, .contact-card, .timeline-content');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      const translateX = ((x - centerX) / centerX) * 5;
      const translateY = ((y - centerY) / centerY) * 5;
      
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(10px)`;
      card.style.transition = 'none';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.transform = '';
  });
});

// Typing effect for gradient text (optional enhancement)
const gradientText = document.querySelector('.gradient-text');
if (gradientText && window.location.hash === '') {
  const text = gradientText.textContent;
  gradientText.textContent = '';
  gradientText.style.opacity = '1';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      gradientText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  
  setTimeout(typeWriter, 1000);
}

// Performance monitoring
if ('performance' in window && 'PerformanceObserver' in window) {
  try {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.loadTime > 2500) {
          console.warn('Slow resource detected:', entry.name, entry.loadTime + 'ms');
        }
      }
    });
    perfObserver.observe({ entryTypes: ['resource'] });
  } catch (e) {
    // PerformanceObserver not supported
  }
}

// Preload critical images and assets
const preloadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

preloadImages();

// Animated stats counter on scroll
const animateStats = () => {
  const stats = document.querySelectorAll('[data-stat]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        entry.target.style.animation = 'statPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
        entry.target.style.animationDelay = `${Math.random() * 0.2}s`;
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => statsObserver.observe(stat));
};

// Add stat animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes statPop {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

animateStats();

// Console easter egg for developers
console.log('%c✨ Hey there! 👋', 'color: #3b82f6; font-size: 28px; font-weight: bold; text-shadow: 0 0 10px rgba(59,130,246,0.5);');
console.log('%c🚀 Looking at the code? Let\'s talk!', 'color: #06b6d4; font-size: 18px; font-weight: 600;');
console.log('%c📧 Email: mdrahil@gmail.com', 'color: #94a3b8; font-size: 15px;');
console.log('%c📱 Phone: +61 431 864 419', 'color: #94a3b8; font-size: 15px;');
console.log('%c💼 Portfolio redesigned with modern aesthetics', 'color: #8b5cf6; font-size: 14px; font-style: italic;');

// Spline scene initialization (when available)
const initSplineScene = () => {
  const splineViewer = document.querySelector('spline-viewer');
  
  if (splineViewer) {
    // Add loading state
    splineViewer.style.opacity = '0';
    splineViewer.style.transition = 'opacity 1s ease-in-out';
    
    // Listen for Spline load event
    splineViewer.addEventListener('load', () => {
      splineViewer.style.opacity = '1';
      console.log('✨ Spline scene loaded');
    });
    
    // Error handling
    splineViewer.addEventListener('error', (e) => {
      console.warn('Spline scene failed to load:', e);
      // Fallback to gradient background
      const fallback = document.querySelector('.gradient-fallback');
      if (fallback) {
        fallback.style.opacity = '1';
      }
    });
  }
};

// Initialize Spline when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSplineScene);
} else {
  initSplineScene();
}

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful');
      },
      (err) => {
        // Service worker not critical, fail silently
      }
    );
  });
}
