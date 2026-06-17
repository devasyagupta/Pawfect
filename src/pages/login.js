import { ScrollReveal } from '../utils/scroll-reveal.js';
import { auth, showToast } from '../utils/auth.js';

export async function renderLogin(container, params) {
  if (auth.isLoggedIn()) {
    showToast('You are already logged in!', 'success');
    setTimeout(() => { window.location.href = '/dashboard'; }, 100);
    return;
  }

  container.innerHTML = `
    <div class="auth-page-fullscreen">
      <!-- Background image -->
      <div class="auth-fullscreen-bg auth-signin-bg"></div>
      <!-- Stronger overlay for readability -->
      <div class="auth-bg-overlay"></div>

      <!-- Centered column: stats strip + form card -->
      <div class="auth-center-col">

        <!-- Stats strip — document flow, never overlapping -->
        <div class="auth-stats-strip">
          <div class="auth-stat-pill">
            <span class="auth-stat-icon">★</span>
            <span class="auth-stat-label">4.9 Rating</span>
          </div>
          <div class="auth-stat-pill">
            <i data-lucide="scissors" class="auth-stat-icon-svg"></i>
            <span class="auth-stat-label">1,200+ Experts</span>
          </div>
          <div class="auth-stat-pill">
            <i data-lucide="heart" class="auth-stat-icon-svg"></i>
            <span class="auth-stat-label">50,000+ Happy Pet Parents</span>
          </div>
        </div>

        <!-- Form card -->
        <div class="auth-card">
          <!-- Logo -->
          <div class="auth-card-logo">
            <span class="auth-logo-icon">🐾</span>
            <span class="auth-logo-text">Pawfect</span>
          </div>

          <h1 class="auth-card-title">Welcome Back</h1>
          <p class="auth-card-subtitle">Manage appointments, pet profiles, and premium grooming services.</p>

          <form class="auth-form" id="login-form">
            <!-- Email -->
            <div class="auth-field">
              <label class="auth-label" for="email">Email Address</label>
              <div class="auth-input-wrap">
                <i data-lucide="mail" class="auth-input-icon"></i>
                <input type="email" class="auth-input" placeholder="name@example.com" id="email" autocomplete="email" required>
              </div>
            </div>

            <!-- Password -->
            <div class="auth-field">
              <label class="auth-label" for="password">
                <span>Password</span>
                <a href="#" class="auth-link">Forgot?</a>
              </label>
              <div class="auth-input-wrap">
                <i data-lucide="lock" class="auth-input-icon"></i>
                <input type="password" class="auth-input" placeholder="••••••••" id="password" autocomplete="current-password" required>
              </div>
            </div>

            <!-- Remember me -->
            <div class="auth-options">
              <label class="auth-checkbox-label">
                <input type="checkbox" id="remember-me" checked>
                <span>Remember me</span>
              </label>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn btn-primary auth-submit-btn" id="btn-login-submit">
              Sign In 🐾
            </button>

            <!-- Divider -->
            <div class="auth-divider-line">
              <span>or continue with</span>
            </div>

            <!-- Google -->
            <button type="button" class="auth-google-btn" id="btn-social-google">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>

            <!-- Switch to signup -->
            <p class="auth-switch-text">
              New to Pawfect? <a href="/signup" class="auth-link" data-link>Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();

    const form = container.querySelector('#login-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = container.querySelector('#email').value;
      const btn = container.querySelector('#btn-login-submit');
      btn.innerHTML = `<i data-lucide="loader" class="spin"></i> Signing In...`;
      if (window.lucide) lucide.createIcons();
      setTimeout(() => {
        try {
          const user = auth.login(email, 'password');
          showToast(`Welcome back, ${user.name}! 🐾`, 'success');
          setTimeout(() => { window.location.href = '/dashboard'; }, 600);
        } catch (err) {
          showToast('Invalid credentials. Please try again.', 'error');
          btn.innerHTML = 'Sign In 🐾';
        }
      }, 1000);
    });

    const googleBtn = container.querySelector('#btn-social-google');
    googleBtn?.addEventListener('click', () => {
      showToast('Connecting with Google...', 'success');
      setTimeout(() => {
        auth.login('googleUser@example.com', 'password');
        showToast('Signed in successfully with Google!', 'success');
        setTimeout(() => { window.location.href = '/dashboard'; }, 600);
      }, 1000);
    });
  }, 50);
}
