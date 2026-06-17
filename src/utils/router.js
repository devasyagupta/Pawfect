// ============================================
// Client-side SPA Router
// ============================================

export class Router {
  constructor(appElementId) {
    this.appEl = document.getElementById(appElementId);
    this.routes = [];
    this.currentRoute = null;

    // Intercept link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== window.location.pathname) {
          this.navigate(href);
        }
      }
    });

    // Handle back/forward
    window.addEventListener('popstate', () => {
      this.resolve();
    });
  }

  addRoute(path, handler) {
    // Convert route pattern to regex
    const paramNames = [];
    const regexStr = path.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    const regex = new RegExp(`^${regexStr}$`);
    this.routes.push({ path, regex, paramNames, handler });
  }

  navigate(path) {
    history.pushState(null, '', path);
    this.resolve();
  }

  async resolve() {
    const path = window.location.pathname;
    
    // Page transition
    const transition = document.getElementById('page-transition');
    transition?.classList.add('active');

    await new Promise(r => setTimeout(r, 300));

    // Find matching route
    let matched = false;
    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        
        // Fade out current content
        if (this.appEl) {
          this.appEl.classList.add('page-exit-active');
          await new Promise(r => setTimeout(r, 200));
          
          this.appEl.innerHTML = '';
          this.appEl.classList.remove('page-exit-active');
          
          // Render new page
          await route.handler(this.appEl, params);
          
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'instant' });
          
          // Fade in
          this.appEl.classList.add('page-enter');
          requestAnimationFrame(() => {
            this.appEl.classList.remove('page-enter');
            this.appEl.classList.add('page-enter-active');
            setTimeout(() => {
              this.appEl.classList.remove('page-enter-active');
            }, 400);
          });
        }

        this.currentRoute = route;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Fallback to landing
      this.navigate('/');
      return;
    }

    // End transition
    transition?.classList.remove('active');
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('route-changed', { detail: { path } }));
  }

  init() {
    this.resolve();
  }
}
