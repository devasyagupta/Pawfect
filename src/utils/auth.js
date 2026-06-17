// ============================================
// PAWFECT — Mock Authentication Manager
// ============================================

export const auth = {
  getCurrentUser() {
    const userJson = localStorage.getItem('pawfect_user');
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  login(email, password) {
    // Derive display name and initials from email
    const namePart = email.split('@')[0].replace(/[._]/g, ' ');
    const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    const userObj = {
      name: displayName,
      email: email,
      initials,
      location: 'Ahmedabad, GJ'
    };

    localStorage.setItem('pawfect_user', JSON.stringify(userObj));
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: userObj } }));
    return userObj;
  },

  signup(name, email, phone) {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const userObj = {
      name,
      email,
      phone,
      initials,
      location: 'Ahmedabad, GJ'
    };

    localStorage.setItem('pawfect_user', JSON.stringify(userObj));
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: userObj } }));
    return userObj;
  },

  logout() {
    localStorage.removeItem('pawfect_user');
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: null } }));
  }
};

export function showToast(message, type = 'success') {
  // Check if a toast container already exists
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  const icon = type === 'success' ? 'check-circle' : 'alert-circle';
  const iconColor = type === 'success' ? 'var(--sage)' : 'var(--coral)';
  
  const toastItem = document.createElement('div');
  toastItem.className = `toast ${type}`;
  toastItem.style.display = 'flex';
  toastItem.style.alignItems = 'center';
  toastItem.style.gap = '12px';
  toastItem.style.marginBottom = '10px';
  
  toastItem.innerHTML = `
    <i data-lucide="${icon}" style="color: ${iconColor};"></i>
    <span style="font-size: var(--text-sm); font-weight: var(--weight-medium);">${message}</span>
  `;
  
  toastContainer.appendChild(toastItem);
  
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: { class: 'lucide-icon' },
      nameAttr: 'data-lucide',
      node: toastItem
    });
  }
  
  setTimeout(() => {
    toastItem.style.opacity = '0';
    toastItem.style.transform = 'translateY(10px)';
    toastItem.style.transition = 'all 0.4s ease';
    setTimeout(() => {
      toastItem.remove();
      if (toastContainer.children.length === 0) {
        toastContainer.remove();
      }
    }, 400);
  }, 2500);
}
