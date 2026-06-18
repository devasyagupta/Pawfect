// ============================================================
// PAWFECT — GSAP + ScrollTrigger Premium Animation System
// Implements: hero stagger, scroll reveals, parallax,
//             image reveals, counters, batch stagger, text masks
// ============================================================

let _ctx   = null;
let _ready = false;

// ── Safe element selectors ──────────────────────────────────
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ── Wait for GSAP CDN to load ───────────────────────────────
function waitForGSAP(cb, tries = 30) {
  if (window.gsap && window.ScrollTrigger) { cb(); return; }
  if (tries <= 0) return;
  setTimeout(() => waitForGSAP(cb, tries - 1), 100);
}

// ── Public API ──────────────────────────────────────────────
export function killScrollAnimations() {
  if (_ctx) { _ctx.revert(); _ctx = null; }
  if (window.ScrollTrigger) {
    window.ScrollTrigger.getAll().forEach(t => t.kill());
  }
  document.body.classList.remove('gsap-loaded');
}

export function initScrollAnimations() {
  waitForGSAP(_run);
}

// ── Core runner ──────────────────────────────────────────────
function _run() {
  const g  = window.gsap;
  const ST = window.ScrollTrigger;
  if (!g || !ST) return;

  // Kill any previous context
  killScrollAnimations();

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  g.registerPlugin(ST);
  document.body.classList.add('gsap-loaded');

  _ctx = g.context(() => {

    // ── 1. Scroll Progress Bar ──────────────────────────────
    const bar = $('#scroll-progress-bar');
    if (bar) {
      g.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'html',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0,
        },
      });
    }

    // ── 2. Hero ─────────────────────────────────────────────
    const hero = $('.hero');
    if (hero) {
      const tl = g.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });

      // Content stagger — line by line
      const heroItems = [
        ['.hero-tagline',  0.06, { y: 32, opacity: 0 }, 0.8],
        ['.hero-title',    0.18, { y: 48, opacity: 0 }, 0.85],
        ['.hero-subtitle', 0.30, { y: 32, opacity: 0 }, 0.75],
        ['.hero-actions',  0.44, { y: 30, opacity: 0 }, 0.72],
        ['.hero-trust',    0.58, { y: 24, opacity: 0 }, 0.65],
      ];

      heroItems.forEach(([sel, pos, from, dur]) => {
        const el = $(sel, hero) || $(sel);
        if (el) tl.from(el, { ...from, duration: dur }, pos);
      });

      // Hero image — scale from 0.9 + fade
      const heroImg = $('.hero-image-container') || $('.hero-right');
      if (heroImg) {
        tl.from(heroImg, {
          opacity: 0, scale: 0.9, x: 30,
          duration: 1.05, ease: 'power2.out', clearProps: 'all',
        }, 0.15);
      }

      // Floating cards — staggered pop-in
      const cards = $$('.floating-card', hero);
      if (cards.length) {
        tl.from(cards, {
          opacity: 0, scale: 0.72, y: 28,
          stagger: { each: 0.11 },
          duration: 0.72, ease: 'back.out(1.8)', clearProps: 'all',
        }, 0.52);
      }
    }

    // ── 3. Section Titles & Subtitles ───────────────────────
    _batchReveal(g, ST, '.section-title', {
      y: 42, opacity: 0,
      duration: 0.85, ease: 'power3.out',
      start: 'top 88%',
    });

    _batchReveal(g, ST, '.section-subtitle', {
      y: 24, opacity: 0,
      duration: 0.7, ease: 'power2.out',
      start: 'top 90%',
    }, 0.12);

    // ── 4. Why Choose Cards — stagger + slight rotation ──────
    const whyGrid = $('.why-choose-grid');
    if (whyGrid && $$('.why-card', whyGrid).length) {
      g.from($$('.why-card', whyGrid), {
        y: 60, opacity: 0, rotation: 2.5,
        stagger: { each: 0.13, from: 'start' },
        duration: 0.82, ease: 'power2.out',
        scrollTrigger: {
          trigger: whyGrid,
          start: 'top 82%',
          once: true,
        },
        clearProps: 'all',
      });
    }

    // ── 5. How Pawfect Works ─────────────────────────────────
    const howSection = $('.how-it-works-section');
    if (howSection) {
      // Text content slides in from left
      const howLeftChildren = $$('.how-left > *', howSection);
      if (howLeftChildren.length) {
        g.from(howLeftChildren, {
          x: -55, opacity: 0,
          stagger: 0.13, duration: 0.82, ease: 'power2.out',
          scrollTrigger: { trigger: howSection, start: 'top 80%', once: true },
          clearProps: 'all',
        });
      }

      // Center image scales up
      const howCenter = $('.how-center', howSection);
      if (howCenter) {
        g.from(howCenter, {
          opacity: 0, scale: 0.87, y: 34,
          duration: 1.05, ease: 'power2.out',
          scrollTrigger: { trigger: howSection, start: 'top 78%', once: true },
          clearProps: 'all',
        });
      }

      // Timeline steps slide from right, one by one
      const timelineSteps = $$('.timeline-step', howSection);
      if (timelineSteps.length) {
        g.from(timelineSteps, {
          x: 55, opacity: 0,
          stagger: 0.1, duration: 0.72, ease: 'power2.out',
          scrollTrigger: {
            trigger: $('.how-right-timeline', howSection) || howSection,
            start: 'top 80%',
            once: true,
          },
          clearProps: 'all',
        });
      }
    }

    // ── 6. Pet Transformations ──────────────────────────────
    const transformSection = $('.transformations-section');
    if (transformSection) {
      // Stat numbers count up via clip + scale
      const statNums = $$('[style*="text-3xl"]', transformSection);
      if (statNums.length) {
        g.from(statNums, {
          y: 35, opacity: 0,
          stagger: 0.1, duration: 0.72, ease: 'power2.out',
          scrollTrigger: { trigger: transformSection, start: 'top 82%', once: true },
          clearProps: 'all',
        });
      }

      // Comparison slider — clip-path reveal
      const sliderWrap = $('.compare-slider-wrapper', transformSection);
      if (sliderWrap) {
        g.from(sliderWrap, {
          opacity: 0, scale: 0.93, y: 45,
          duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: sliderWrap, start: 'top 85%', once: true },
          clearProps: 'all',
        });
      }
    }

    // ── 7. Featured Salon Cards — batch stagger ──────────────
    const salonCards = $$('.salon-card');
    if (salonCards.length) {
      // Set stagger indices for CSS var approach too
      salonCards.forEach((c, i) => c.style.setProperty('--stagger-i', i));

      ST.batch(salonCards, {
        onEnter: batch => {
          g.from(batch, {
            y: 55, opacity: 0,
            stagger: { each: 0.1 },
            duration: 0.78, ease: 'power2.out',
            clearProps: 'all',
          });
        },
        start: 'top 88%',
        once: true,
      });
    }

    // ── 8. FAQ Items — slide up independently ────────────────
    const faqItems = $$('.faq-item');
    if (faqItems.length) {
      g.from(faqItems, {
        y: 38, opacity: 0,
        stagger: { each: 0.09 },
        duration: 0.68, ease: 'power2.out',
        scrollTrigger: {
          trigger: $('.faq-list') || faqItems[0],
          start: 'top 85%',
          once: true,
        },
        clearProps: 'all',
      });
    }

    // ── 9. Premium CTA — split slide ─────────────────────────
    const ctaSection = $('.premium-cta-section');
    if (ctaSection) {
      const ctaLeft = $$('.premium-cta-left > *');
      if (ctaLeft.length) {
        g.from(ctaLeft, {
          x: -55, opacity: 0,
          stagger: 0.13, duration: 0.82, ease: 'power2.out',
          scrollTrigger: { trigger: ctaSection, start: 'top 80%', once: true },
          clearProps: 'all',
        });
      }

      const ctaRight = $('.premium-cta-right');
      if (ctaRight) {
        g.from(ctaRight, {
          x: 60, opacity: 0, scale: 0.93,
          duration: 1.0, ease: 'power2.out',
          scrollTrigger: { trigger: ctaSection, start: 'top 78%', once: true },
          clearProps: 'all',
        });
      }
    }

    // ── 10. Footer ───────────────────────────────────────────
    const footer = $('footer') || $('.footer');
    if (footer) {
      g.from(footer, {
        y: 40, opacity: 0,
        duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 95%', once: true },
        clearProps: 'all',
      });
    }

    // ── 11. Parallax ─────────────────────────────────────────
    const heroEl = $('.hero');
    if (heroEl) {
      // Hero image column moves slower than scroll
      const heroImg = $('.hero-image-container') || $('.hero-right');
      if (heroImg) {
        g.to(heroImg, {
          y: -80, ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Floating cards — different parallax speeds
      const floatCards = $$('.floating-card', heroEl);
      const speeds     = [-55, -30, -70, -42];
      floatCards.forEach((card, i) => {
        g.to(card, {
          y: speeds[i] ?? -45,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.6 + i * 0.25,
          },
        });
      });
    }

    // ── 12. Image Reveals via clip-path ──────────────────────
    $$('.salon-card-image, .how-slide').forEach(wrap => {
      g.from(wrap, {
        clipPath: 'inset(12% 6% 0% 6% round 16px)',
        scale: 1.08,
        duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: wrap, start: 'top 90%', once: true },
        clearProps: 'all',
      });
    });

    // ── 13. Discover / Generic page reveals ──────────────────
    // Any .reveal elements not already targeted get a generic fade-up
    $$('.reveal').forEach(el => {
      if (el.classList.contains('hero') ||
          el.classList.contains('why-choose-section') ||
          el.classList.contains('faq-section') ||
          el.classList.contains('how-it-works-section') ||
          el.classList.contains('premium-cta-section') ||
          el.dataset.gsapBound) return;

      el.dataset.gsapBound = '1';
      g.from(el, {
        y: 30, opacity: 0,
        duration: 0.75, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        clearProps: 'all',
      });
    });

    // ── 14. Stat counter elements ─────────────────────────────
    $$('[data-count]').forEach(el => {
      const target   = parseFloat(el.dataset.count);
      const suffix   = el.dataset.suffix || '';
      const decimals = (el.dataset.count.includes('.')) ? 1 : 0;
      const counter  = { val: 0 };

      g.to(counter, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate() {
          el.textContent = decimals
            ? counter.val.toFixed(decimals) + suffix
            : Math.round(counter.val).toLocaleString() + suffix;
        },
        onComplete() {
          el.textContent = target + suffix;
        },
      });
    });

  }); // end context
}

// ── Helper: batch stagger reveal ─────────────────────────────
function _batchReveal(g, ST, selector, fromVars, extraDelay = 0) {
  const els = $$(selector);
  els.forEach((el, i) => {
    g.from(el, {
      ...fromVars,
      delay: extraDelay + i * 0.04,
      scrollTrigger: {
        trigger: el,
        start: fromVars.start || 'top 88%',
        once: true,
      },
      clearProps: 'all',
    });
  });
}
