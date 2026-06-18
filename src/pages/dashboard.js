import { ScrollReveal } from '../utils/scroll-reveal.js';
import { auth, showToast } from '../utils/auth.js';

// ─── Empty-state helpers ──────────────────────────────────
function emptyState({ icon, title, subtitle, btnLabel, btnHref }) {
  // Check if icon is a lucide name (alphabetic, lowercase, hyphens) or an emoji
  const isLucide = /^[a-z\-]+$/.test(icon);
  const iconHTML = isLucide
    ? `<i data-lucide="${icon}" style="width:24px;height:24px;color:var(--coral);"></i>`
    : icon;
  return `
    <div class="ds-empty-state" style="border: 1px dashed var(--border-primary); border-radius: var(--radius-xl); padding: var(--space-6) var(--space-4); background: var(--bg-secondary);">
      <div class="ds-empty-icon" style="width:48px;height:48px;border-radius:50%;background:var(--bg-tertiary);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);">${iconHTML}</div>
      <h4 class="ds-empty-title" style="font-size:var(--text-sm);font-weight:var(--weight-bold);margin-bottom:4px;">${title}</h4>
      <p class="ds-empty-sub" style="font-size:var(--text-xs);color:var(--text-secondary);margin:0 auto;max-width:240px;line-height:1.4;">${subtitle}</p>
      ${btnLabel ? `<a href="${btnHref}" class="btn btn-primary btn-sm" data-link style="margin-top:var(--space-4);font-size:11px;padding:6px 14px;">${btnLabel}</a>` : ''}
    </div>
  `;
}

// ─── Dynamic date ─────────────────────────────────────────
function getTodayLabel() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── Get user data from localStorage (real data only) ─────
function getUserPets(userId) {
  try { return JSON.parse(localStorage.getItem(`pawfect_pets_${userId}`) || '[]'); }
  catch { return []; }
}

function getUserBookings(userId) {
  try { return JSON.parse(localStorage.getItem(`pawfect_bookings_${userId}`) || '[]'); }
  catch { return []; }
}

function getUserFavorites(userId) {
  try { return JSON.parse(localStorage.getItem(`pawfect_favorites_${userId}`) || '[]'); }
  catch { return []; }
}

function getUserPoints(userId) {
  return parseInt(localStorage.getItem(`pawfect_points_${userId}`) || '0');
}

export async function renderDashboard(container, params) {
  const user = auth.getCurrentUser();

  // Redirect to login if not authenticated
  if (!user) {
    container.innerHTML = `
      <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;">
        <div style="text-align:center;max-width:400px;">
          <div style="display:flex;justify-content:center;margin-bottom:16px;"><i data-lucide="lock" style="width:48px;height:48px;color:var(--text-tertiary);"></i></div>
          <h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:8px;">Sign In Required</h2>
          <p style="color:var(--text-secondary);margin-bottom:24px;">Please sign in to access your dashboard and manage your pets and bookings.</p>
          <a href="/login" class="btn btn-primary" data-link>Sign In</a>
          <a href="/signup" class="btn btn-secondary" data-link style="margin-left:12px;">Create Account</a>
        </div>
      </div>
    `;
    setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
    return;
  }

  // Load real user data
  const userId = user.email;
  const pets = getUserPets(userId);
  const bookings = getUserBookings(userId);
  const favorites = getUserFavorites(userId);
  const points = getUserPoints(userId);

  // Derive upcoming/past bookings
  const now = new Date();
  const upcomingBookings = bookings.filter(b => new Date(b.date) >= now);
  const pastBookings = bookings.filter(b => new Date(b.date) < now);

  // Build initials/display name
  const displayName = user.name || user.email.split('@')[0];
  const firstName = displayName.split(' ')[0];
  const initials = user.initials || displayName.substring(0, 2).toUpperCase();

  // ── Upcoming bookings widget content ──
  const bookingsContent = upcomingBookings.length
    ? upcomingBookings.slice(0, 3).map(b => {
        const d = new Date(b.date);
        const mon = d.toLocaleDateString('en-IN', { month: 'short' });
        const day = d.getDate();
        const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        return `
          <div class="appointment-item">
            <div class="appointment-date-badge">
              <span class="month">${mon}</span>
              <span class="day">${day}</span>
            </div>
            <div class="appointment-info" style="flex:1;">
              <h5>${b.salonName || 'Grooming Salon'}</h5>
              <p>${b.service || 'Grooming Service'}${b.petName ? ` for <strong>${b.petName}</strong>` : ''}</p>
            </div>
            <span class="badge badge-primary">${time}</span>
          </div>`;
      }).join('')
    : emptyState({
        icon: 'calendar',
        title: 'No upcoming appointments',
        subtitle: 'Book a grooming session for your pet.',
        btnLabel: 'Book Appointment',
        btnHref: '/discover'
      });

  // ── Pets widget content ──
  const petEmoji = { Dog: '🐕', Cat: '🐈', Rabbit: '🐇', Bird: '🐦' };
  const petColors = [
    'linear-gradient(135deg,#6366f1,#8b5cf6)',
    'linear-gradient(135deg,#10b981,#06b6d4)',
    'linear-gradient(135deg,#f59e0b,#ef4444)',
    'linear-gradient(135deg,#ec4899,#8b5cf6)',
    'linear-gradient(135deg,#3b82f6,#6366f1)',
  ];

  const petsContent = pets.length
    ? pets.slice(0, 3).map((pet, i) => `
        <div style="display:flex;gap:var(--space-3);align-items:center;padding:var(--space-3);background:var(--bg-hover);border-radius:var(--radius-xl);cursor:pointer;" onclick="window.location.href='/pet-profile'">
          <div style="width:44px;height:44px;border-radius:var(--radius-full);background:${petColors[i % petColors.length]};display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;">
            ${petEmoji[pet.type] || '🐾'}
          </div>
          <div style="flex:1;min-width:0;">
            <h5 style="font-weight:var(--weight-bold);font-size:var(--text-sm);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${pet.name}</h5>
            <span style="font-size:var(--text-xs);color:var(--text-tertiary);">${pet.breed || pet.type || 'Pet'}</span>
          </div>
          <i data-lucide="chevron-right" style="color:var(--text-muted);flex-shrink:0;"></i>
        </div>
      `).join('')
    : emptyState({
        icon: 'dog',
        title: 'No pets registered yet',
        subtitle: 'Add your first pet to start booking grooming services.',
        btnLabel: 'Add Your First Pet',
        btnHref: '/pet-profile'
      });

  // ── Recent activity widget content ──
  const activityContent = pastBookings.length
    ? pastBookings.slice(0, 4).map(b => {
        const d = new Date(b.date);
        const dateLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-3);border-bottom:1px solid var(--border-secondary);">
            <div style="display:flex;gap:var(--space-3);align-items:center;">
              <div style="width:40px;height:40px;border-radius:var(--radius-lg);background:var(--bg-tertiary);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i data-lucide="scissors" style="width:16px;height:16px;color:var(--text-secondary);"></i></div>
              <div>
                <h5 style="font-size:var(--text-sm);font-weight:var(--weight-bold);">${b.salonName || 'Grooming Salon'}</h5>
                <span style="font-size:var(--text-xs);color:var(--text-tertiary);">${b.service || 'Grooming Service'}${b.petName ? ` for ${b.petName}` : ''} · ${dateLabel}</span>
              </div>
            </div>
            <span class="badge badge-success">Completed</span>
          </div>`;
      }).join('')
    : `
      <div class="ds-empty-state empty-past-sessions" style="border: 1.5px dashed rgba(123, 166, 141, 0.25); border-radius: var(--radius-xl); padding: var(--space-6) var(--space-4); background: rgba(123, 166, 141, 0.02); text-align: center; width: 100%;">
        <div class="ds-empty-icon" style="width:52px; height:52px; border-radius:50%; background:rgba(123, 166, 141, 0.1); color:var(--sage-dark); display:flex; align-items:center; justify-content:center; margin:0 auto var(--space-3); filter: drop-shadow(0 2px 4px rgba(123, 166, 141, 0.15));">
          <i data-lucide="scissors" style="width:22px; height:22px;"></i>
        </div>
        <h4 class="ds-empty-title" style="font-size:var(--text-sm); font-weight:var(--weight-bold); color:var(--text-primary); margin-bottom:6px;">Your Style Journey Awaits</h4>
        <p class="ds-empty-sub" style="font-size:var(--text-xs); color:var(--text-secondary); margin:0 auto var(--space-4); max-width:240px; line-height:1.45;">Completed sessions, styling records, and digital report cards will appear here.</p>
        <a href="/discover" class="btn btn-sm" data-link style="background: var(--sage); color: white; border: none; font-size: 11px; padding: 6px 14px; box-shadow: 0 4px 12px rgba(123, 166, 141, 0.25);">Find a Salon</a>
      </div>
    `;

  // ── Favorites widget content ──
  const favoritesContent = favorites.length
    ? favorites.slice(0, 3).map(fav => `
        <a href="/salon/${fav.id}" style="display:flex;gap:var(--space-3);align-items:center;padding:var(--space-3);background:var(--bg-hover);border-radius:var(--radius-xl);cursor:pointer;text-decoration:none;color:inherit;" data-link>
          <div style="width:44px;height:44px;border-radius:var(--radius-xl);background:var(--bg-secondary);overflow:hidden;flex-shrink:0;">
            <img src="${fav.image || '/assets/salon_109.png'}" alt="${fav.name}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
          </div>
          <div style="flex:1;min-width:0;">
            <h5 style="font-weight:var(--weight-bold);font-size:var(--text-sm);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${fav.name}</h5>
            <span style="font-size:var(--text-xs);color:var(--text-tertiary);">⭐ ${fav.rating || '4.8'} · ${fav.locality || 'Ahmedabad'}</span>
          </div>
          <i data-lucide="heart" style="color:var(--coral);flex-shrink:0;width:15px;height:15px;"></i>
        </a>
      `).join('')
    : `
      <div class="ds-empty-state empty-favourite-salons" style="border: 1.5px dashed rgba(228, 125, 93, 0.25); border-radius: var(--radius-xl); padding: var(--space-6) var(--space-4); background: rgba(228, 125, 93, 0.02); text-align: center; width: 100%;">
        <div class="ds-empty-icon" style="width:52px; height:52px; border-radius:50%; background:rgba(228, 125, 93, 0.1); color:var(--coral); display:flex; align-items:center; justify-content:center; margin:0 auto var(--space-3); filter: drop-shadow(0 2px 4px rgba(228, 125, 93, 0.15));">
          <i data-lucide="heart" style="width:22px; height:22px;"></i>
        </div>
        <h4 class="ds-empty-title" style="font-size:var(--text-sm); font-weight:var(--weight-bold); color:var(--text-primary); margin-bottom:6px;">Keep Your Favorites Close</h4>
        <p class="ds-empty-sub" style="font-size:var(--text-xs); color:var(--text-secondary); margin:0 auto var(--space-4); max-width:240px; line-height:1.45;">Tap the heart icon on any salon to save it for easy access and priority booking.</p>
        <a href="/discover" class="btn btn-primary btn-sm" data-link style="font-size: 11px; padding: 6px 14px; box-shadow: var(--shadow-coral);">Explore Salons</a>
      </div>
    `;

  // Calculate upcoming booking hero content
  let heroBookingHTML = '';
  if (upcomingBookings.length > 0) {
    const nextB = upcomingBookings[0];
    const d = new Date(nextB.date);
    const dateLabel = d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
    const timeLabel = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    
    // Countdown
    const diffTime = d - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let countdownLabel = '';
    if (diffDays === 0) countdownLabel = 'Today';
    else if (diffDays === 1) countdownLabel = 'Tomorrow';
    else countdownLabel = `In ${diffDays} days`;

    heroBookingHTML = `
      <div class="hero-booking-card" style="background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: var(--space-6); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; min-height: 220px; box-shadow: 0 12px 30px rgba(15, 29, 54, 0.15); height: 100%; border-top: 4px solid var(--coral);">
        <!-- Soft glowing radial light in top right -->
        <div style="position: absolute; top: -50px; right: -50px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(228, 125, 93, 0.22) 0%, transparent 70%); pointer-events: none; z-index: 1;"></div>
        <!-- Watermark paw print -->
        <div style="position: absolute; right: 10px; bottom: -10px; font-size: 7.5rem; opacity: 0.08; pointer-events: none; transform: rotate(15deg); filter: blur(0.5px); z-index: 1;">🐾</div>
        
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
            <span style="background: var(--coral); color: white; border: none; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: var(--radius-full); text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 2px 8px rgba(228, 125, 93, 0.35);">Next Session</span>
            <span style="font-size: var(--text-xs); color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 4px;">
              <i data-lucide="clock" style="width: 12px; height: 12px;"></i> ${countdownLabel}
            </span>
          </div>
          <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); color: #FFFFFF; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${nextB.salonName}</h3>
          <p style="color: rgba(255,255,255,0.7); font-size: var(--text-xs); margin-bottom: var(--space-4);">${nextB.service || 'Grooming Service'}${nextB.petName ? ` for <strong>${nextB.petName}</strong>` : ''}</p>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: var(--space-4); margin-top: auto; position: relative; z-index: 2;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">📅</div>
            <div>
              <div style="font-size: 11px; font-weight: bold; color: white;">${dateLabel}</div>
              <div style="font-size: 10px; color: rgba(255,255,255,0.5);">${timeLabel}</div>
            </div>
          </div>
          <a href="/salon/${nextB.salonId || 101}" class="btn btn-sm" data-link style="background: #FFFFFF; color: var(--navy); border: none; font-size: 10px; padding: 6px 12px; font-weight: 700; border-radius: var(--radius-full); transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">View Salon</a>
        </div>
      </div>
    `;
  } else {
    heroBookingHTML = `
      <div class="hero-booking-card-empty" style="background: var(--bg-card-solid); border: 1.5px dashed var(--border-primary); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; min-height: 220px; box-shadow: var(--shadow-premium); height: 100%; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -30px; left: -30px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(228, 125, 93, 0.08) 0%, transparent 70%); pointer-events: none;"></div>
        <div style="font-size: 2.8rem; margin-bottom: var(--space-2); line-height: 1; filter: drop-shadow(0 4px 8px rgba(228,125,93,0.12));">🗓️</div>
        <h3 style="font-size: var(--text-sm); font-weight: var(--weight-bold); color: var(--text-primary); margin-bottom: 4px;">No upcoming pampering</h3>
        <p style="color: var(--text-secondary); font-size: var(--text-xs); max-width: 280px; margin-bottom: var(--space-4); line-height: 1.45;">Keep your furry friend looking and smelling fresh. Book a premium grooming session today!</p>
        <a href="/discover" class="btn btn-primary btn-sm" data-link style="box-shadow: var(--shadow-coral);">Book Grooming Session</a>
      </div>
    `;
  }

  // Calculate pets gallery content
  let petsGalleryHTML = '';
  if (pets.length > 0) {
    petsGalleryHTML = `
      <div class="dashboard-pets-gallery" style="background: var(--bg-card-solid); border: 1px solid var(--border-primary); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; min-height: 220px; box-shadow: var(--shadow-premium); height: 100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
          <h3 style="font-size:var(--text-sm); font-weight:var(--weight-bold); color:var(--text-primary); margin:0;">My Pets</h3>
          <a href="/pet-profile" data-link style="font-size:10px; font-weight:bold; color:var(--coral); text-decoration:none;">View Profiles</a>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:var(--space-3); flex:1; align-items:center;">
          ${pets.slice(0, 2).map((pet, i) => {
            const emoji = petEmoji[pet.type || pet.species] || '🐾';
            const color = petColors[i % petColors.length];
            return `
              <div class="dashboard-pet-card" style="--border-color: ${color};" onclick="window.location.href='/pet-profile'">
                <div class="dashboard-pet-avatar" style="background:${color};">
                  ${pet.photo
                    ? `<img src="${pet.photo}" alt="${pet.name}" style="width:100%; height:100%; object-fit:cover;">`
                    : emoji}
                </div>
                <div style="font-weight:var(--weight-bold); font-size:var(--text-xs); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; color:var(--text-primary);">${pet.name}</div>
                <div style="font-size:9px; color:var(--text-tertiary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">${pet.breed || pet.type || 'Pet'}</div>
              </div>`;
          }).join('')}
          <div class="dashboard-add-pet-card" onclick="window.location.href='/pet-profile'">
            <div class="dashboard-add-pet-icon">
              <i data-lucide="plus" style="width:16px; height:16px;"></i>
            </div>
            <span style="font-size:10px; font-weight:bold; color:var(--coral);">Add Pet</span>
          </div>
        </div>
      </div>
    `;
  } else {
    petsGalleryHTML = `
      <div class="dashboard-pets-gallery empty" style="background: var(--bg-card-solid); border: 1px solid var(--border-primary); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; min-height: 220px; box-shadow: var(--shadow-premium); height: 100%; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(228, 125, 93, 0.08) 0%, transparent 70%); pointer-events: none;"></div>
        <div style="font-size: 2.2rem; margin-bottom: 6px; filter: drop-shadow(0 4px 8px rgba(228,125,93,0.12));">🐾</div>
        <h4 style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: 4px; color: var(--text-primary);">No pets registered</h4>
        <p style="color: var(--text-secondary); font-size: 9px; max-width: 160px; margin-bottom: var(--space-4); line-height: 1.35;">Add your pets to track vaccinations and styles.</p>
        <button class="btn btn-outline btn-xs" onclick="window.location.href='/pet-profile'" style="font-size:10px; padding:4px 12px;">+ Add Pet</button>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-layout">

        <!-- ── Sidebar ── -->
        <aside class="dashboard-sidebar">
          <div style="display:flex;gap:var(--space-3);align-items:center;margin-bottom:var(--space-8);padding:0 var(--space-2);">
            <div class="avatar avatar-md" style="background:var(--gradient-primary);font-weight:bold;color:white;display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;font-size:14px;flex-shrink:0;">${initials}</div>
            <div style="min-width:0;">
              <h4 style="font-size:var(--text-sm);font-weight:var(--weight-bold);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${displayName}</h4>
              <span style="font-size:var(--text-xs);color:var(--text-tertiary);">${user.email}</span>
            </div>
          </div>

          <nav>
            <div class="dashboard-nav-item active" data-tab="overview">
              <i data-lucide="layout-dashboard"></i><span>Overview</span>
            </div>
            <div class="dashboard-nav-item" data-tab="pets" onclick="window.location.href='/pet-profile'">
              <i data-lucide="dog"></i><span>My Pets</span>
            </div>
            <div class="dashboard-nav-item" data-tab="favorites" onclick="window.location.href='/discover'">
              <i data-lucide="heart"></i><span>Favourite Salons</span>
            </div>
            <div style="height:1px;background:var(--border-primary);margin:var(--space-4) 0;"></div>
            <div class="dashboard-nav-item" id="dashboard-logout-btn" style="color:var(--color-danger);">
              <i data-lucide="log-out"></i><span>Logout</span>
            </div>
          </nav>
        </aside>

        <!-- ── Main ── -->
        <main class="dashboard-main">

          <!-- Header -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-6);flex-wrap:wrap;gap:var(--space-4);">
            <div>
              <h1 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin:0;">Welcome back, ${firstName}! 👋</h1>
              <p style="color:var(--text-secondary);font-size:var(--text-sm);margin-top:4px;margin-bottom:0;">
                ${pets.length > 0
                  ? `You have <strong>${pets.length} pet${pets.length > 1 ? 's' : ''}</strong> registered${upcomingBookings.length > 0 ? ` and <strong>${upcomingBookings.length} upcoming</strong> appointment${upcomingBookings.length > 1 ? 's' : ''}` : ''}.`
                  : 'Get started by adding your pet and booking a grooming session.'}
              </p>
            </div>
            <span class="badge" style="padding:var(--space-2) var(--space-4);white-space:nowrap;">
              <i data-lucide="calendar" style="width:14px;height:14px;vertical-align:middle;"></i> ${getTodayLabel()}
            </span>
          </div>

          <!-- Redesigned Hero Booking & Pets Gallery Row -->
          <div class="dashboard-hero-row" style="display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-6); margin-bottom: var(--space-2);">
            <div class="dashboard-hero-booking" style="min-width:0;">
              ${heroBookingHTML}
            </div>
            <div class="dashboard-hero-pets" style="min-width:0;">
              ${petsGalleryHTML}
            </div>
          </div>

          <!-- Slim, Compact Stats Strip -> Refactored to Distinct Premium Cards -->
          <div class="dashboard-stats-grid reveal">
            <div class="dashboard-stat-pill">
              <div class="dashboard-stat-pill-icon" style="background:rgba(228, 125, 93, 0.08); color:var(--coral);"><i data-lucide="calendar-check" style="width:16px; height:16px;"></i></div>
              <div>
                <div style="font-size:9px; color:var(--text-tertiary); text-transform:uppercase; font-weight:bold; line-height:1.2;">Bookings</div>
                <div style="font-size:var(--text-sm); font-weight:var(--weight-extrabold); color:var(--text-primary); line-height:1.2;">${bookings.length}</div>
              </div>
            </div>
            <div class="dashboard-stat-pill">
              <div class="dashboard-stat-pill-icon" style="background:rgba(139, 92, 246, 0.08); color:#8b5cf6;"><i data-lucide="dog" style="width:16px; height:16px;"></i></div>
              <div>
                <div style="font-size:9px; color:var(--text-tertiary); text-transform:uppercase; font-weight:bold; line-height:1.2;">Pets</div>
                <div style="font-size:var(--text-sm); font-weight:var(--weight-extrabold); color:var(--text-primary); line-height:1.2;">${pets.length}</div>
              </div>
            </div>
            <div class="dashboard-stat-pill">
              <div class="dashboard-stat-pill-icon" style="background:rgba(6, 182, 212, 0.08); color:#06b6d4;"><i data-lucide="heart" style="width:16px; height:16px;"></i></div>
              <div>
                <div style="font-size:9px; color:var(--text-tertiary); text-transform:uppercase; font-weight:bold; line-height:1.2;">Favorites</div>
                <div style="font-size:var(--text-sm); font-weight:var(--weight-extrabold); color:var(--text-primary); line-height:1.2;">${favorites.length}</div>
              </div>
            </div>
            <div class="dashboard-stat-pill">
              <div class="dashboard-stat-pill-icon" style="background:rgba(201, 160, 85, 0.08); color:var(--gold);"><i data-lucide="award" style="width:16px; height:16px;"></i></div>
              <div>
                <div style="font-size:9px; color:var(--text-tertiary); text-transform:uppercase; font-weight:bold; line-height:1.2;">Points</div>
                <div style="font-size:var(--text-sm); font-weight:var(--weight-extrabold); color:var(--text-primary); line-height:1.2;">${points}</div>
              </div>
            </div>
          </div>

          <!-- Widgets Grid -->
          <div class="dashboard-grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--space-6);">

            <!-- Past Sessions (Grooming History) -->
            <div class="widget reveal" style="background:var(--bg-card-solid); border:1px solid var(--border-primary); border-radius:var(--radius-xl); padding:var(--space-6); box-shadow:var(--shadow-premium);">
              <div class="widget-header" style="margin-bottom:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
                <h3 class="widget-title" style="font-size:var(--text-sm); font-weight:var(--weight-bold); color:var(--text-primary); margin:0;">Past Sessions</h3>
              </div>
              <div style="display:flex; flex-direction:column; gap:var(--space-3);">${activityContent}</div>
            </div>

            <!-- Favourite Salons -->
            <div class="widget reveal" style="background:var(--bg-card-solid); border:1px solid var(--border-primary); border-radius:var(--radius-xl); padding:var(--space-6); box-shadow:var(--shadow-premium);">
              <div class="widget-header" style="margin-bottom:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
                <h3 class="widget-title" style="font-size:var(--text-sm); font-weight:var(--weight-bold); color:var(--text-primary); margin:0;">Favourite Salons</h3>
                <a href="/discover" data-link style="font-size:var(--text-xs); color:var(--coral); font-weight:var(--weight-bold); text-decoration:none;">Explore All</a>
              </div>
              <div style="display:flex; flex-direction:column; gap:var(--space-3);">${favoritesContent}</div>
            </div>

          </div>
        </main>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();

    const logoutBtn = container.querySelector('#dashboard-logout-btn');
    logoutBtn?.addEventListener('click', () => {
      auth.logout();
      showToast('Logged out successfully!', 'success');
      setTimeout(() => window.location.href = '/', 600);
    });
  }, 50);
}
