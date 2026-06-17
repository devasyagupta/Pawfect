// ============================================
// Scroll Reveal Observer
// ============================================

export class ScrollReveal {
  static init() {
    const elements = document.querySelectorAll('.reveal');
    
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  static animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const decimals = parseInt(el.dataset.decimals) || 0;
    const suffix = el.dataset.suffix || '';
    
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = start + (target - start) * eased;
      
      if (decimals > 0) {
        el.textContent = current.toFixed(decimals) + suffix;
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (decimals > 0) {
          el.textContent = target.toFixed(decimals) + suffix;
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }
    };
    
    requestAnimationFrame(step);
  }
}
