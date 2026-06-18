// ============================================
// PAWFECT - Main Application Entry
// ============================================

import { Router } from './utils/router.js';
import { ScrollReveal } from './utils/scroll-reveal.js';
import { renderLanding } from './pages/landing.js';
import { renderDiscover } from './pages/discover.js';
import { renderSalonDetail } from './pages/salon-detail.js';
// booking.js removed — booking happens directly from salon detail pages
import { renderPetProfile } from './pages/pet-profile.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderSalonDashboard } from './pages/salon-dashboard.js';
import { renderLogin } from './pages/login.js';
import { renderSignup } from './pages/signup.js';
import { renderBlog } from './pages/blog.js';
import { auth, showToast } from './utils/auth.js';
import { initChatbot } from './chatbot/avatar-chatbot.js';
import { initScrollAnimations, killScrollAnimations } from './utils/gsap-animations.js';



// Initialize router
const router = new Router('app');

// Register routes
router.addRoute('/', renderLanding);
router.addRoute('/discover', renderDiscover);
router.addRoute('/salon/:id', renderSalonDetail);
// /booking route removed — redirect gracefully
router.addRoute('/booking', (container) => {
  container.innerHTML = `<div style="min-height:60vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;padding:40px 20px;text-align:center;">
    <div style="font-size:3rem;">🐾</div>
    <h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);">Book via a Salon</h2>
    <p style="color:var(--text-secondary);max-width:360px;">Browse our verified salons and book directly from the salon page.</p>
    <a href="/discover" class="btn btn-primary" data-link>Browse Salons</a>
  </div>`;
  if (window.lucide) lucide.createIcons();
});
router.addRoute('/pet-profile', renderPetProfile);
router.addRoute('/dashboard', renderDashboard);
router.addRoute('/salon-dashboard', renderSalonDashboard);
router.addRoute('/login', renderLogin);
router.addRoute('/signup', renderSignup);
router.addRoute('/blog', renderBlog);
router.addRoute('/blog/:id', renderBlog);

// Dynamic Navbar authentication update
function updateAuthUI() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  let authWrapper = document.getElementById('nav-auth-wrapper');
  if (!authWrapper) {
    authWrapper = document.createElement('div');
    authWrapper.id = 'nav-auth-wrapper';
    authWrapper.style.display = 'flex';
    authWrapper.style.alignItems = 'center';
    authWrapper.style.gap = '12px';
    
    const bookNowBtn = navActions.querySelector('a[href="/booking"]');
    if (bookNowBtn) {
      navActions.insertBefore(authWrapper, bookNowBtn);
    } else {
      navActions.appendChild(authWrapper);
    }
  }

  const user = auth.getCurrentUser();
  if (user) {
    authWrapper.innerHTML = `
      <a href="/dashboard" class="nav-link" data-link style="font-weight: 600;">Dashboard</a>
      <a href="/dashboard" class="avatar avatar-sm" data-link style="background: linear-gradient(135deg, var(--coral), var(--coral-dark)); font-weight: bold; color: white; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; font-size: 11px; text-decoration: none; border: 2px solid var(--border-primary); box-shadow: var(--shadow-premium);" title="${user.name}">
        ${user.initials}
      </a>
    `;
  } else {
    authWrapper.innerHTML = `
      <a href="/login" class="nav-link" data-link style="font-weight: 600;">Sign In</a>
    `;
  }

  // Mobile menu links updates
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    const existingAuthLinks = mobileMenu.querySelectorAll('.mobile-auth-link');
    existingAuthLinks.forEach(link => link.remove());

    const mobileAuthContainer = document.createElement('div');
    mobileAuthContainer.className = 'mobile-auth-link';
    mobileAuthContainer.style.borderTop = '1px solid var(--border-primary)';
    mobileAuthContainer.style.marginTop = 'var(--space-2)';
    mobileAuthContainer.style.paddingTop = 'var(--space-2)';
    mobileAuthContainer.style.display = 'flex';
    mobileAuthContainer.style.flexDirection = 'column';
    mobileAuthContainer.style.gap = 'var(--space-1)';

    if (user) {
      mobileAuthContainer.innerHTML = `
        <div style="display: flex; gap: var(--space-3); align-items: center; padding: 12px 18px;">
          <div style="background: linear-gradient(135deg, var(--coral), var(--coral-dark)); font-weight: bold; color: white; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; font-size: 10px;">
            ${user.initials}
          </div>
          <div>
            <div style="font-size: var(--text-xs); font-weight: bold; color: var(--text-primary);">${user.name}</div>
            <div style="font-size: 9px; color: var(--text-tertiary);">${user.email}</div>
          </div>
        </div>
        <a href="/dashboard" class="mobile-link" data-link>Dashboard</a>
        <a href="/pet-profile" class="mobile-link" data-link>Pet Profile</a>
        <a href="#" class="mobile-link" id="mobile-logout-btn" style="color: var(--color-danger);">Log Out</a>
      `;
    } else {
      mobileAuthContainer.innerHTML = `
        <a href="/login" class="mobile-link" data-link>Sign In</a>
        <a href="/signup" class="mobile-link" data-link>Register</a>
      `;
    }
    mobileMenu.appendChild(mobileAuthContainer);

    const mobileLogoutBtn = mobileMenu.querySelector('#mobile-logout-btn');
    mobileLogoutBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      auth.logout();
      showToast('Logged out successfully!', 'success');
      window.location.href = '/';
    });
  }
}

// Start router
router.init();
updateAuthUI();

// Initialize floating 3D chatbot widget
initChatbot();

// Listen to auth events
window.addEventListener('auth-state-changed', () => {
  updateAuthUI();
});


// Initialize navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  mobileMenuToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ── Contact Us Modal ─────────────────────────────────────────
const contactModal = document.getElementById('contact-modal');
const contactBackdrop = document.getElementById('contact-backdrop');
const contactOpenBtn = document.getElementById('btn-contact-us');
const contactCloseBtn = document.getElementById('contact-modal-close');
const mobileContactBtn = document.getElementById('btn-mobile-contact');

function openContactModal() {
  if (!contactModal) return;
  contactModal.classList.add('open');
  contactBackdrop?.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 10);
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove('open');
  contactBackdrop?.classList.remove('open');
  document.body.style.overflow = '';
}

contactOpenBtn?.addEventListener('click', openContactModal);
mobileContactBtn?.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  openContactModal();
});
contactCloseBtn?.addEventListener('click', closeContactModal);
contactBackdrop?.addEventListener('click', closeContactModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeContactModal();
});

// Active nav link
function updateActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (path === href || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Listen for route changes
window.addEventListener('popstate', updateActiveNav);
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-link]')) {
    setTimeout(updateActiveNav, 10);
  }
});

updateActiveNav();

// Initialize Lucide icons (including footer)
if (window.lucide) {
  lucide.createIcons();
}

// Re-init icons after page changes (also re-init footer icons)
window.addEventListener('route-changed', () => {
  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();
    updateActiveNav();
    updateAuthUI();
    // Kill previous GSAP context and reinitialise for new page
    killScrollAnimations();
    initScrollAnimations();
  }, 80);
});

// Fire GSAP on initial page load (after router renders first route)
setTimeout(initScrollAnimations, 120);

// Ripple effect on buttons
document.addEventListener('mousedown', (e) => {
  const btn = e.target.closest('.btn');
  if (btn) {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--ripple-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    btn.style.setProperty('--ripple-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }
});

console.log('🐾 Pawfect - Premium Pet Grooming Marketplace');
