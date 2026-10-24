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

// Intersection Observer for fade-in animations
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

// Observe all sections and cards
document.querySelectorAll('.section, .expertise-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Parallax effect for hero background
const splineContainer = document.getElementById('hero-3d');

if (splineContainer) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    splineContainer.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }, { passive: true });
}

// Cursor glow effect for interactive elements
const createGlowEffect = () => {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    mix-blend-mode: screen;
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
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    glow.style.left = `${glowX - 200}px`;
    glow.style.top = `${glowY - 200}px`;
    
    requestAnimationFrame(animateGlow);
  };

  animateGlow();
};

// Only add glow effect on devices with mouse (not touch)
if (window.matchMedia('(pointer: fine)').matches) {
  createGlowEffect();
}

// Card tilt effect on hover (3D perspective)
const cards = document.querySelectorAll('.expertise-card, .contact-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    }
  });
  
  card.addEventListener('mouseleave', () => {
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

// Console easter egg for developers
console.log('%cHey there! 👋', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cLooking at the code? Let\'s talk!', 'color: #8b5cf6; font-size: 16px;');
console.log('%cEmail: mdrahil@gmail.com', 'color: #9ca3af; font-size: 14px;');
console.log('%cPhone: +61 431 864 419', 'color: #9ca3af; font-size: 14px;');

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
