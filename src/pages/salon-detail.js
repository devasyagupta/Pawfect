// ============================================
// PAWFECT — Salon Detail Page (Complete Redesign)
// Dynamic, per-salon content from Ahmedabad CSV
// ============================================

import { ScrollReveal } from '../utils/scroll-reveal.js';
import { auth, showToast } from '../utils/auth.js';
import {
  fetchSalonById,
  fetchAllSalons,
  getSalonGallery,
  getSalonServices,
  getSalonPackages,
  getSalonDescription,
  getSalonHours,
  getSalonPetTypes,
  getSimilarSalons,
  getSalonThumb,
} from '../utils/salon-data.js';

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const ADDONS_CATALOG = [
  { id: 'nail',   label: 'Nail Trimming',         price: 199, lucide: 'scissors' },
  { id: 'tick',   label: 'Tick & Flea Treatment', price: 299, lucide: 'shield'   },
  { id: 'teeth',  label: 'Teeth Cleaning',        price: 249, lucide: 'zap'      },
  { id: 'aroma',  label: 'Aromatherapy',          price: 399, lucide: 'leaf'     },
  { id: 'paw',    label: 'Paw Balm Treatment',    price: 149, lucide: 'heart'    },
  { id: 'deshed', label: 'Deshedding Treatment',  price: 499, lucide: 'wind'     },
];

// ─────────────────────────────────────────────────────────────
// RENDER HELPERS
// ─────────────────────────────────────────────────────────────

function renderStars(rating) {
  const full = Math.floor(parseFloat(rating) || 0);
  return Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < full ? '#F59E0B' : 'var(--border-primary)'}">★</span>`
  ).join('');
}

function fmtPrice(n) {
  return '₹' + parseInt(n).toLocaleString('en-IN');
}

function renderGallery(gallery, salonName) {
  const [main, ...thumbs] = gallery;
  return `
    <section class="sd-gallery reveal">
      <div class="sd-gallery-main">
        <img src="${main}" alt="${salonName} – main salon view"
          onerror="this.src='/assets/salon_109.png'">
        <div class="sd-gallery-overlay">
          <button class="sd-photo-btn" id="view-photos-btn">
            <i data-lucide="images" style="width:14px;height:14px;"></i>
            View all photos
          </button>
        </div>
      </div>
      <div class="sd-gallery-thumbs">
        ${thumbs.slice(0, 4).map((src, i) => `
          <div class="sd-thumb" style="${i === 3 ? 'position:relative;' : ''}">
            <img src="${src}" alt="${salonName} – salon photo ${i + 2}"
              onerror="this.src='/assets/salon_109.png'" loading="lazy">
            ${i === 3 ? `<div class="sd-thumb-overlay"><span>+4 more</span></div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderBadges(salon) {
  const isVerified = salon.verified === 'Yes';
  const isHomeService = /home|van|doorstep/i.test(salon.visit_type || '');
  const rating = parseFloat(salon.rating) || 0;
  const isPremium = rating >= 4.8;
  const badges = [];
  if (isVerified) badges.push(`<span class="sd-badge sd-badge-verified"><i data-lucide="shield-check" style="width:11px;height:11px;"></i> Verified Business</span>`);
  if (isPremium) badges.push(`<span class="sd-badge sd-badge-premium"><i data-lucide="star" style="width:11px;height:11px;"></i> Premium Partner</span>`);
  if (isHomeService) badges.push(`<span class="sd-badge sd-badge-home"><i data-lucide="truck" style="width:11px;height:11px;"></i> Home Service</span>`);
  return badges.join('');
}

// Service cards — professional SVG icons, no emoji
function renderServiceCards(services) {
  if (!services.length) return `<p style="color:var(--text-secondary);font-size:var(--text-sm);">Contact salon for service details.</p>`;
  return `
    <div class="sd-services-grid">
      ${services.map(svc => `
        <div class="sd-service-card">
          <div class="sd-service-icon">
            <i data-lucide="${svc.lucide}" style="width:20px;height:20px;"></i>
          </div>
          <div class="sd-service-label">${svc.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Add-ons section — interactive, with prices
function renderAddOns() {
  return `
    <section class="section-sm reveal" style="border-top:1px solid var(--border-primary);padding-top:var(--space-8);">
      <div style="margin-bottom:var(--space-5);">
        <span class="section-label">Enhance Your Session</span>
        <h2 class="sd-section-title">Add-Ons</h2>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-top:6px;line-height:1.6;">
          Select additional services to complement your chosen package. Added to your total instantly.
        </p>
      </div>
      <div class="sd-addons-grid" id="addons-grid">
        ${ADDONS_CATALOG.map(addon => `
          <div class="sd-addon-card" data-addon-id="${addon.id}" data-addon-price="${addon.price}" data-addon-label="${addon.label}">
            <div class="sd-addon-icon">
              <i data-lucide="${addon.lucide}" style="width:16px;height:16px;"></i>
            </div>
            <div class="sd-addon-body">
              <div class="sd-addon-label">${addon.label}</div>
              <div class="sd-addon-price">${fmtPrice(addon.price)}</div>
            </div>
            <button class="sd-addon-btn" data-addon-id="${addon.id}" aria-label="Add ${addon.label}" type="button">
              <i data-lucide="plus" style="width:14px;height:14px;"></i>
            </button>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderPackages(packages) {
  return `
    <div class="sd-packages-grid">
      ${packages.map((pkg, i) => `
        <div class="sd-package-card ${pkg.featured ? 'featured' : ''}" data-pkg-index="${i}" data-pkg-price="${pkg.price}" data-pkg-name="${pkg.name}">
          ${pkg.featured ? `<div class="sd-pkg-badge">★ Most Popular</div>` : ''}
          <div class="sd-pkg-name">${pkg.name}</div>
          <div class="sd-pkg-price">${fmtPrice(pkg.price)}</div>
          <ul class="sd-pkg-features">
            ${pkg.features.map(f => `<li><i data-lucide="check" style="width:13px;height:13px;color:var(--sage);flex-shrink:0;"></i>${f}</li>`).join('')}
          </ul>
          <button class="btn ${pkg.featured ? 'btn-primary' : 'btn-secondary'} w-full sd-pkg-select-btn" style="margin-top:auto;" data-pkg-index="${i}" type="button">
            Select Package
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function renderReviewsSection(salon) {
  const rating = parseFloat(salon.rating) || 0;
  const count = parseInt(salon.reviews_count) || 0;
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-6);">
      <div>
        <span class="section-label">Reviews</span>
        <h2 class="sd-section-title">Customer Reviews</h2>
      </div>
      <div style="text-align:right;">
        <div style="font-size:var(--text-2xl);font-weight:var(--weight-extrabold);color:var(--text-primary);">${rating}★</div>
        <div style="font-size:11px;color:var(--text-tertiary);">${count} verified visits</div>
      </div>
    </div>

    <div class="sd-empty-reviews">
      <div class="sd-empty-reviews-icon">💬</div>
      <h3 style="font-size:var(--text-base);font-weight:var(--weight-bold);margin-bottom:8px;color:var(--text-primary);">No customer reviews yet</h3>
      <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-4);line-height:1.5;">
        Be the first to share your experience at ${salon.name}.<br>Your review helps other pet owners in Ahmedabad.
      </p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
        <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Overall Rating based on ${count} visits to this salon.</div>
      </div>
      <div class="sd-rating-bar-group" style="margin-top:var(--space-4);">
        ${[5,4,3,2,1].map(star => {
          const total = count;
          const starDist = { 5: 0.65, 4: 0.22, 3: 0.08, 2: 0.03, 1: 0.02 };
          const pct = Math.round((starDist[star] || 0) * 100);
          return `
            <div class="sd-rating-bar-row">
              <span class="sd-rating-bar-label">${star}★</span>
              <div class="sd-rating-bar-track"><div class="sd-rating-bar-fill" style="width:${pct}%"></div></div>
              <span class="sd-rating-bar-pct">${pct}%</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderInfoGrid(salon) {
  const hours = getSalonHours(salon.id);
  const petTypes = getSalonPetTypes(salon);
  const isHomeService = /home|van|doorstep/i.test(salon.visit_type || '');
  const hasParking = salon.valet_parking === 'Available';
  const tables = salon.grooming_tables;

  const infoItems = [
    { icon: 'clock',    label: 'Opening Hours',   value: `${hours.open} – ${hours.close}`, sub: 'Mon – Sun' },
    { icon: 'scissors', label: 'Grooming Tables', value: `${tables || '–'} Tables`,        sub: 'Concurrent capacity' },
    { icon: 'car',      label: 'Parking',         value: hasParking ? 'Available' : 'Street Parking', sub: hasParking ? 'On-site parking' : 'Nearby street parking' },
    { icon: 'home',     label: 'Service Type',    value: isHomeService ? 'Salon + Home Visit' : 'At Salon', sub: isHomeService ? 'Van / Doorstep available' : 'In-salon only' },
    { icon: 'heart',    label: 'Pets Accepted',   value: petTypes.label, sub: petTypes.icon },
    { icon: 'phone',    label: 'Contact',         value: salon.contact_number || 'N/A', sub: 'Call to enquire' },
  ];

  return `
    <div class="sd-info-grid">
      ${infoItems.map(item => `
        <div class="sd-info-item">
          <div class="sd-info-icon"><i data-lucide="${item.icon}" style="width:16px;height:16px;"></i></div>
          <div>
            <div class="sd-info-label">${item.label}</div>
            <div class="sd-info-value">${item.value}</div>
            <div class="sd-info-sub">${item.sub}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSimilarSalons(similars) {
  if (!similars.length) return '';
  return `
    <section class="sd-similar reveal" style="border-top:1px solid var(--border-primary);padding-top:var(--space-8);margin-top:var(--space-2);">
      <div style="margin-bottom:var(--space-6);">
        <span class="section-label">More in Ahmedabad</span>
        <h2 class="sd-section-title">Similar Salons</h2>
      </div>
      <div class="sd-similar-grid">
        ${similars.map(s => {
          const thumb = getSalonThumb(s.id);
          const isVerified = s.verified === 'Yes';
          return `
            <div class="sd-similar-card" onclick="window.history.pushState(null,'','/salon/${s.id}');window.dispatchEvent(new PopStateEvent('popstate'));" role="button" tabindex="0" aria-label="View ${s.name}">
              <div class="sd-similar-img">
                <img src="${thumb}" alt="${s.name}" onerror="this.src='/assets/salon_109.png'" loading="lazy">
                ${isVerified ? `<span class="sd-similar-verified"><i data-lucide="shield-check" style="width:9px;height:9px;"></i> Verified</span>` : ''}
              </div>
              <div class="sd-similar-body">
                <div class="sd-similar-name">${s.name}</div>
                <div class="sd-similar-meta">
                  <span style="color:#F59E0B;font-size:11px;">★</span>
                  <span style="font-size:11px;font-weight:700;">${s.rating}</span>
                  <span style="font-size:10px;color:var(--text-tertiary);">(${s.reviews_count})</span>
                </div>
                <div class="sd-similar-loc">
                  <i data-lucide="map-pin" style="width:9px;height:9px;"></i>
                  ${s.locality}
                </div>
                <div class="sd-similar-price">from ${fmtPrice(s.starting_price_inr)}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

// ─────────────────────────────────────────────────────────────
// BOOKING SIDEBAR
// ─────────────────────────────────────────────────────────────

function renderBookingSidebar(salon, packages) {
  // Read user-keyed pets (same key as dashboard.js)
  const user = auth.getCurrentUser();
  const userId = user?.email || null;
  let pets = [];
  if (userId) {
    try { pets = JSON.parse(localStorage.getItem(`pawfect_pets_${userId}`) || '[]'); } catch {}
  }
  // Fallback: try legacy key
  if (!pets.length) {
    try { pets = JSON.parse(localStorage.getItem('pawfect_pets') || '[]'); } catch {}
  }

  const hours = getSalonHours(salon.id);
  const isHomeService = /home|van|doorstep/i.test(salon.visit_type || '');

  const timeSlots = [];
  const openHour  = hours.open.includes('8:30') ? 8 : hours.open.includes('9:30') ? 9 : hours.open.includes('10') ? 10 : 9;
  const closeHour = hours.close.includes('7:30') ? 19 : hours.close.includes('8:30') ? 20 : hours.close.includes('8:00') ? 20 : 19;
  for (let h = openHour; h < closeHour; h++) {
    const period  = h < 12 ? 'AM' : 'PM';
    const display = h <= 12 ? h : h - 12;
    timeSlots.push(`${display}:00 ${period}`);
  }

  const petsHTML = pets.length
    ? `<select class="input" id="booking-pet-select">
        ${pets.map((p, i) => `<option value="${i}">${p.name} (${p.breed || p.type || 'Pet'})</option>`).join('')}
       </select>`
    : `<div class="sd-no-pets">
        <div style="font-size:1.6rem;margin-bottom:6px;"><i data-lucide="paw-print" style="width:28px;height:28px;color:var(--coral);"></i></div>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:10px;">No pets added yet</p>
        <a href="/pet-profile" data-link class="btn btn-secondary" style="font-size:11px;padding:6px 14px;">+ Add Pet</a>
       </div>`;

  const visitTypeOptions = isHomeService
    ? `<option value="salon">At Salon Session</option><option value="home">At Home (Doorstep)</option>`
    : `<option value="salon">At Salon Session</option>`;

  const today = new Date().toISOString().split('T')[0];
  const featuredPkg = packages.find(p => p.featured) || packages[0];

  return `
    <div class="sd-booking-widget" id="booking-widget">

      <!-- Price header (updates live) -->
      <div class="sd-booking-header">
        <div class="sd-booking-price-main" id="booking-price-header">
          ₹0
          <span class="sd-booking-price-label">no package selected</span>
        </div>
        <div class="sd-booking-rating">
          <span style="color:#F59E0B;">★</span>
          <span>${salon.rating}</span>
          <span style="color:var(--text-tertiary);">(${salon.reviews_count} reviews)</span>
        </div>
      </div>

      <!-- Step progress -->
      <div class="sd-booking-steps" id="booking-steps">
        <div class="sd-step active" data-step="1" data-label="Package">1</div>
        <div class="sd-step-line"></div>
        <div class="sd-step" data-step="2" data-label="Pet">2</div>
        <div class="sd-step-line"></div>
        <div class="sd-step" data-step="3" data-label="Date">3</div>
        <div class="sd-step-line"></div>
        <div class="sd-step" data-step="4" data-label="Time">4</div>
        <div class="sd-step-line"></div>
        <div class="sd-step" data-step="5" data-label="Confirm">5</div>
      </div>

      <!-- Step 1: Select Package -->
      <div class="sd-booking-step-content active" data-step-content="1">
        <div class="sd-step-label">Step 1 — Select Package</div>
        <select class="input" id="booking-service-select">
          <option value="" disabled selected>Select a package...</option>
          ${packages.map((p, idx) => `<option value="${idx}">${p.name} — ${fmtPrice(p.price)}</option>`).join('')}
        </select>
        <div style="margin-top:10px;">
          <label style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--text-primary);display:block;margin-bottom:6px;">Visit Type</label>
          <select class="input" id="booking-visit-type">
            ${visitTypeOptions}
          </select>
        </div>
        <button class="btn btn-primary w-full sd-next-btn" id="step1-continue-btn" style="margin-top:var(--space-4);opacity:0.5;cursor:not-allowed;" data-next="2" disabled>Continue →</button>
      </div>

      <!-- Step 2: Select Pet -->
      <div class="sd-booking-step-content" data-step-content="2">
        <div class="sd-step-label">Step 2 — Select Pet</div>
        ${petsHTML}
        <button class="btn btn-primary w-full sd-next-btn" style="margin-top:var(--space-4);" data-next="3" ${!pets.length ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>Continue →</button>
        <button class="btn btn-ghost w-full sd-back-btn" style="margin-top:8px;font-size:var(--text-xs);" data-back="1">← Back</button>
      </div>

      <!-- Step 3: Choose Date -->
      <div class="sd-booking-step-content" data-step-content="3">
        <div class="sd-step-label">Step 3 — Choose Date</div>
        <input type="date" class="input" id="booking-date" min="${today}" style="font-size:var(--text-sm);">
        <div style="font-size:10px;color:var(--text-tertiary);margin-top:6px;">Open: ${hours.open} – ${hours.close} · Mon – Sun</div>
        <button class="btn btn-primary w-full sd-next-btn" style="margin-top:var(--space-4);" data-next="4">Continue →</button>
        <button class="btn btn-ghost w-full sd-back-btn" style="margin-top:8px;font-size:var(--text-xs);" data-back="2">← Back</button>
      </div>

      <!-- Step 4: Choose Time -->
      <div class="sd-booking-step-content" data-step-content="4">
        <div class="sd-step-label">Step 4 — Choose Time Slot</div>
        <div class="sd-time-slots">
          ${timeSlots.map(slot => `
            <button class="sd-time-slot" data-time="${slot}" type="button">${slot}</button>
          `).join('')}
        </div>
        <button class="btn btn-primary w-full sd-next-btn" style="margin-top:var(--space-4);" data-next="5">Continue →</button>
        <button class="btn btn-ghost w-full sd-back-btn" style="margin-top:8px;font-size:var(--text-xs);" data-back="3">← Back</button>
      </div>

      <!-- Step 5: Confirm -->
      <div class="sd-booking-step-content" data-step-content="5">
        <div class="sd-step-label">Step 5 — Confirm Booking</div>
        <div class="sd-price-summary" id="price-summary">
          <!-- filled dynamically -->
        </div>
        <button class="btn btn-primary w-full btn-lg" id="confirm-booking-btn" style="margin-top:var(--space-4);">
          <i data-lucide="calendar-check" style="width:15px;height:15px;"></i>
          Book Appointment
        </button>
        <button class="btn btn-ghost w-full sd-back-btn" style="margin-top:8px;font-size:var(--text-xs);" data-back="4">← Back</button>
      </div>

      <!-- Trust signals -->
      <div class="sd-booking-trust">
        <div><i data-lucide="zap" style="width:11px;height:11px;color:var(--sage);"></i> Free cancellation up to 24h prior</div>
        <div><i data-lucide="shield" style="width:11px;height:11px;color:var(--sage);"></i> Secured via Pawfect Secure</div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// MAIN RENDER
// ─────────────────────────────────────────────────────────────

export async function renderSalonDetail(container, params) {
  const salonId = params?.id;

  // Loading state
  container.innerHTML = `
    <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;margin-top:92px;">
      <div class="sd-loader"></div>
      <p style="color:var(--text-secondary);font-size:var(--text-sm);">Loading salon details…</p>
    </div>
  `;

  const [salon, allSalons] = await Promise.all([
    fetchSalonById(salonId),
    fetchAllSalons(),
  ]);

  if (!salon) {
    container.innerHTML = `
      <div style="min-height:70vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;margin-top:92px;text-align:center;">
        <div style="font-size:4rem;">🔍</div>
        <h1 style="font-size:var(--text-2xl);font-weight:bold;color:var(--text-primary);">Salon Not Found</h1>
        <p style="color:var(--text-secondary);font-size:var(--text-sm);">We couldn't find a salon with ID "${salonId}".</p>
        <a href="/discover" data-link class="btn btn-primary">Browse All Salons</a>
      </div>
    `;
    setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
    return;
  }

  const gallery     = getSalonGallery(salon.id);
  const services    = getSalonServices(salon);
  const packages    = getSalonPackages(salon);
  const description = getSalonDescription(salon);
  const similars    = getSimilarSalons(salon, allSalons);
  const isVerified  = salon.verified === 'Yes';
  const isHomeService = /home|van|doorstep/i.test(salon.visit_type || '');
  const rating      = parseFloat(salon.rating) || 0;

  container.innerHTML = `
    <div class="salon-detail-page container" style="margin-top:92px;padding-bottom:var(--space-16);">

      ${renderGallery(gallery, salon.name)}

      <div class="salon-detail-content" style="margin-top:var(--space-8);">

        <!-- ═══════════════ MAIN CONTENT ═══════════════ -->
        <main>

          <!-- ── HEADER ── -->
          <div class="salon-info-section reveal">
            <div class="sd-badge-row">
              ${renderBadges(salon)}
            </div>

            <h1 class="sd-salon-name">${salon.name}</h1>

            <div class="sd-salon-meta">
              <div class="sd-meta-item">
                <span class="sd-stars">${renderStars(rating)}</span>
                <span class="sd-rating-num">${rating}</span>
                <span class="sd-rating-count">(${salon.reviews_count} reviews)</span>
              </div>
              <span class="sd-meta-sep">·</span>
              <div class="sd-meta-item">
                <i data-lucide="map-pin" style="width:13px;height:13px;color:var(--coral);"></i>
                <span>${salon.locality}, Ahmedabad</span>
              </div>
              ${isHomeService ? `
                <span class="sd-meta-sep">·</span>
                <div class="sd-meta-item">
                  <i data-lucide="truck" style="width:13px;height:13px;color:var(--sage);"></i>
                  <span style="color:var(--sage);font-weight:600;">Home Service</span>
                </div>
              ` : ''}
            </div>

            <p class="sd-description">${description}</p>

            <!-- Quick info strip -->
            <div class="sd-quick-strip">
              <div class="sd-quick-item">
                <i data-lucide="clock" style="width:14px;height:14px;color:var(--coral);"></i>
                <div>
                  <div class="sd-quick-val">${getSalonHours(salon.id).open} – ${getSalonHours(salon.id).close}</div>
                  <div class="sd-quick-key">Open Hours</div>
                </div>
              </div>
              <div class="sd-quick-item">
                <i data-lucide="scissors" style="width:14px;height:14px;color:var(--indigo-500);"></i>
                <div>
                  <div class="sd-quick-val">${salon.grooming_tables || '–'} Tables</div>
                  <div class="sd-quick-key">Grooming Capacity</div>
                </div>
              </div>
              <div class="sd-quick-item">
                <i data-lucide="car" style="width:14px;height:14px;color:var(--sage);"></i>
                <div>
                  <div class="sd-quick-val">${salon.valet_parking === 'Available' ? 'Free Parking' : salon.valet_parking === 'Not Applicable' ? 'N/A' : 'Street Parking'}</div>
                  <div class="sd-quick-key">Parking</div>
                </div>
              </div>
              <div class="sd-quick-item">
                <i data-lucide="map-pin" style="width:14px;height:14px;color:var(--gold);"></i>
                <div>
                  <div class="sd-quick-val">${salon.locality}</div>
                  <div class="sd-quick-key">Location</div>
                </div>
              </div>
            </div>
          </div>



          <!-- ── ADD-ONS ── -->
          ${renderAddOns()}

          <!-- ── PRICING PACKAGES ── -->
          <section class="section-sm reveal" style="border-top:1px solid var(--border-primary);padding-top:var(--space-8);">
            <div style="margin-bottom:var(--space-5);">
              <span class="section-label">Pricing</span>
              <h2 class="sd-section-title">Choose Your Package</h2>
              <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-top:6px;">Click a package to select it. Your choice is reflected instantly in the booking panel.</p>
            </div>
            ${renderPackages(packages)}
          </section>

          <!-- ── SALON INFORMATION ── -->
          <section class="section-sm reveal" style="border-top:1px solid var(--border-primary);padding-top:var(--space-8);">
            <div style="margin-bottom:var(--space-5);">
              <span class="section-label">Salon Details</span>
              <h2 class="sd-section-title">Salon Information</h2>
            </div>
            ${renderInfoGrid(salon)}
            <div class="sd-address-card">
              <i data-lucide="navigation" style="width:14px;height:14px;color:var(--coral);flex-shrink:0;"></i>
              <div>
                <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-tertiary);margin-bottom:3px;">Full Address</div>
                <div style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.5;">${salon.address}</div>
              </div>
            </div>
          </section>

          <!-- ── REVIEWS ── -->
          <section class="section-sm reveal" style="border-top:1px solid var(--border-primary);padding-top:var(--space-8);">
            ${renderReviewsSection(salon)}
          </section>

          <!-- ── SIMILAR SALONS ── -->
          ${renderSimilarSalons(similars)}

        </main>

        <!-- ═══════════════ BOOKING SIDEBAR ═══════════════ -->
        <aside>
          ${renderBookingSidebar(salon, packages)}
        </aside>

      </div>
    </div>
  `;

  // ── POST-RENDER INTERACTIVITY ──────────────────────────────
  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();

    // ─── Booking state ─────────────────────────────────────
    let selectedPkgIndex = -1;
    const selectedAddons = new Map(); // id → { label, price }

    // ─── Continue button disabled state update ──────────────
    function updateContinueButtonState() {
      const btn = container.querySelector('#step1-continue-btn');
      if (!btn) return;
      const isSelected = selectedPkgIndex >= 0;
      btn.disabled = !isSelected;
      btn.style.opacity = isSelected ? '1' : '0.5';
      btn.style.cursor = isSelected ? 'pointer' : 'not-allowed';
      btn.style.pointerEvents = isSelected ? 'auto' : 'none';
    }

    // ─── Package card active state ─────────────────────────
    function selectPackage(idx) {
      selectedPkgIndex = idx;

      // Update card visual state
      container.querySelectorAll('.sd-package-card').forEach((card, i) => {
        card.classList.toggle('active', i === idx);
      });

      // Update select button labels
      container.querySelectorAll('.sd-pkg-select-btn').forEach((btn, i) => {
        if (i === idx) {
          btn.textContent = '✓ Selected';
          btn.classList.add('btn-primary');
          btn.classList.remove('btn-secondary');
        } else {
          btn.textContent = 'Select Package';
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-secondary');
        }
      });

      // Sync sidebar service dropdown
      const serviceSelect = container.querySelector('#booking-service-select');
      if (serviceSelect) {
        if (idx >= 0) {
          serviceSelect.selectedIndex = idx + 1; // skip default placeholder option
        } else {
          serviceSelect.selectedIndex = 0; // "Select a package..."
        }
      }

      // Update price header & summary
      updatePriceHeader();
      updateContinueButtonState();
    }

    // ─── Live price header update ───────────────────────────
    function updatePriceHeader() {
      const priceEl = container.querySelector('#booking-price-header');
      if (!priceEl) return;
      const addonsTotal = Array.from(selectedAddons.values()).reduce((s, a) => s + a.price, 0);

      if (selectedPkgIndex >= 0) {
        const pkg = packages[selectedPkgIndex];
        const subtotal = pkg.price + addonsTotal;
        const label = addonsTotal > 0 ? 'package + add-ons' : 'selected package';
        priceEl.innerHTML = `${fmtPrice(subtotal)}<span class="sd-booking-price-label">${label}</span>`;
      } else {
        priceEl.innerHTML = `${fmtPrice(addonsTotal)}<span class="sd-booking-price-label">add-ons only</span>`;
      }
    }

    // ─── Add-on toggle ──────────────────────────────────────
    container.querySelectorAll('.sd-addon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.addonId;
        const card = container.querySelector(`.sd-addon-card[data-addon-id="${id}"]`);
        if (!card) return;

        if (selectedAddons.has(id)) {
          selectedAddons.delete(id);
          card.classList.remove('selected');
          btn.innerHTML = `<i data-lucide="plus" style="width:14px;height:14px;"></i>`;
        } else {
          const price = parseInt(card.dataset.addonPrice);
          const label = card.dataset.addonLabel;
          selectedAddons.set(id, { label, price });
          card.classList.add('selected');
          btn.innerHTML = `<i data-lucide="check" style="width:14px;height:14px;"></i>`;
        }
        if (window.lucide) lucide.createIcons();
        updatePriceHeader();
        // Update summary if currently visible
        if (container.querySelector('[data-step-content="5"].active')) {
          buildPriceSummary();
        }
      });
    });

    // ─── Package card click handlers ────────────────────────
    container.querySelectorAll('.sd-pkg-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.pkgIndex);
        if (selectedPkgIndex === idx) {
          // Deselect
          selectPackage(-1);
          showToast('Package deselected.', 'info');
        } else {
          selectPackage(idx);
          // Scroll to booking widget
          const widget = container.querySelector('#booking-widget');
          widget?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          showToast(`${packages[idx].name} selected!`, 'success');
        }
      });
    });

    // Initialize as deselected (State A) on page load
    selectPackage(-1);

    // ─── Booking step navigation ────────────────────────────
    let currentStep = 1;
    const totalSteps = 5;

    function goToStep(n) {
      if (n > currentStep) {
        if (currentStep === 1 && selectedPkgIndex < 0) {
          showToast('Please select a package first', 'error');
          return;
        }
        if (currentStep === 3) {
          const dateEl = container.querySelector('#booking-date');
          if (!dateEl || !dateEl.value) { showToast('Please select a date', 'error'); return; }
        }
        if (currentStep === 4) {
          const selectedSlot = container.querySelector('.sd-time-slot.selected');
          if (!selectedSlot) { showToast('Please choose a time slot', 'error'); return; }
        }
      }

      currentStep = Math.max(1, Math.min(totalSteps, n));

      container.querySelectorAll('.sd-step').forEach(el => {
        const s = parseInt(el.dataset.step);
        el.classList.toggle('active', s === currentStep);
        el.classList.toggle('completed', s < currentStep);
      });

      container.querySelectorAll('.sd-step-line').forEach((el, index) => {
        el.classList.toggle('completed', index < currentStep - 1);
      });

      container.querySelectorAll('.sd-booking-step-content').forEach(el => {
        const s = parseInt(el.dataset.stepContent);
        el.classList.toggle('active', s === currentStep);
      });

      if (currentStep === 5) buildPriceSummary();
    }

    // ─── Price summary builder ──────────────────────────────
    function buildPriceSummary() {
      const dateEl       = container.querySelector('#booking-date');
      const selectedSlot = container.querySelector('.sd-time-slot.selected');
      const petSelect    = container.querySelector('#booking-pet-select');
      const visitTypeEl  = container.querySelector('#booking-visit-type');

      const pkgSelected = selectedPkgIndex >= 0;
      const pkgName     = pkgSelected ? packages[selectedPkgIndex].name : 'Not Selected';
      const pkgPrice    = pkgSelected ? packages[selectedPkgIndex].price : 0;

      const addonsTotal = Array.from(selectedAddons.values()).reduce((s, a) => s + a.price, 0);
      const platformFee = pkgSelected ? 49 : 0;
      const subtotal    = pkgPrice + addonsTotal;
      const gst         = Math.round(subtotal * 0.18);
      const total       = subtotal + platformFee + gst;

      const dateFormatted = dateEl?.value
        ? new Date(dateEl.value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
        : '—';
      const timeSelected = selectedSlot?.dataset?.time || '—';
      const petName      = petSelect ? petSelect.options[petSelect.selectedIndex]?.text : 'Your Pet';
      const visitType    = visitTypeEl ? visitTypeEl.options[visitTypeEl.selectedIndex]?.text : 'At Salon';

      const addonsRows = Array.from(selectedAddons.values()).map(a => `
        <div class="sd-summary-row" style="font-size:var(--text-xs);color:var(--text-secondary);">
          <span>+ ${a.label}</span><span>${fmtPrice(a.price)}</span>
        </div>
      `).join('');

      const summaryEl = container.querySelector('#price-summary');
      if (!summaryEl) return;
      summaryEl.innerHTML = `
        <div class="sd-summary-row sd-summary-detail">
          <span>📅 Date</span><strong>${dateFormatted}</strong>
        </div>
        <div class="sd-summary-row sd-summary-detail">
          <span>🕐 Time</span><strong>${timeSelected}</strong>
        </div>
        <div class="sd-summary-row sd-summary-detail">
          <span>🐾 Pet</span><strong>${petName}</strong>
        </div>
        <div class="sd-summary-row sd-summary-detail">
          <span>🚐 Visit</span><strong>${visitType}</strong>
        </div>
        <div class="sd-summary-divider"></div>
        <div class="sd-summary-row">
          <span>${pkgName}</span><span>${fmtPrice(pkgPrice)}</span>
        </div>
        ${addonsRows}
        ${addonsTotal > 0 ? `
          <div class="sd-summary-row" style="font-size:var(--text-xs);color:var(--text-tertiary);">
            <span>Add-ons Subtotal</span><span>${fmtPrice(addonsTotal)}</span>
          </div>` : ''}
        <div class="sd-summary-row" style="font-size:var(--text-xs);color:var(--text-tertiary);">
          <span>Platform Fee</span><span>+${fmtPrice(platformFee)}</span>
        </div>
        <div class="sd-summary-row" style="font-size:var(--text-xs);color:var(--text-tertiary);">
          <span>GST (18%)</span><span>+${fmtPrice(gst)}</span>
        </div>
        <div class="sd-summary-divider"></div>
        <div class="sd-summary-row sd-summary-total">
          <span>Total</span><span style="color:var(--coral);">${fmtPrice(total)}</span>
        </div>
      `;
    }

    // ─── Next / Back buttons ────────────────────────────────
    container.querySelectorAll('.sd-next-btn').forEach(btn => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next)));
    });
    container.querySelectorAll('.sd-back-btn').forEach(btn => {
      btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.back)));
    });

    // ─── Time slot selection ────────────────────────────────
    container.querySelectorAll('.sd-time-slot').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.sd-time-slot').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // ─── Sidebar service dropdown sync ─────────────────────
    const serviceSelect = container.querySelector('#booking-service-select');
    serviceSelect?.addEventListener('change', () => {
      const val = serviceSelect.value;
      if (val === '') {
        selectPackage(-1);
      } else {
        const idx = parseInt(val);
        if (idx >= 0 && idx < packages.length) selectPackage(idx);
      }
    });

    // ─── Confirm booking — saves to localStorage ────────────
    const confirmBtn = container.querySelector('#confirm-booking-btn');
    confirmBtn?.addEventListener('click', () => {
      const user = auth.getCurrentUser();
      if (!user) {
        showToast('Please sign in to book an appointment', 'error');
        setTimeout(() => {
          window.history.pushState(null, '', '/login');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 1000);
        return;
      }

      const dateEl       = container.querySelector('#booking-date');
      const selectedSlot = container.querySelector('.sd-time-slot.selected');
      const petSelect    = container.querySelector('#booking-pet-select');
      const visitTypeEl  = container.querySelector('#booking-visit-type');

      // Validate
      if (!dateEl?.value) { showToast('Please select a date', 'error'); goToStep(3); return; }
      if (!selectedSlot)  { showToast('Please choose a time slot', 'error'); goToStep(4); return; }

      const pkg         = packages[selectedPkgIndex];
      const addonsTotal = Array.from(selectedAddons.values()).reduce((s, a) => s + a.price, 0);
      const platformFee = 49;
      const subtotal    = pkg.price + addonsTotal;
      const gst         = Math.round(subtotal * 0.18);
      const total       = subtotal + platformFee + gst;
      const petName     = petSelect ? petSelect.options[petSelect.selectedIndex]?.text : '';
      const time        = selectedSlot?.dataset?.time || '';

      // Booking object
      const booking = {
        id:        Date.now().toString(),
        salonId:   salon.id,
        salonName: salon.name,
        service:   pkg.name,
        petName,
        date:      `${dateEl.value}T10:00:00`,
        time,
        addons:    Array.from(selectedAddons.values()).map(a => a.label),
        total,
        visitType: visitTypeEl?.value || 'salon',
        status:    'upcoming',
        bookedAt:  new Date().toISOString(),
      };

      // Persist to localStorage
      const bookingsKey = `pawfect_bookings_${user.email}`;
      let existing = [];
      try { existing = JSON.parse(localStorage.getItem(bookingsKey) || '[]'); } catch {}
      existing.push(booking);
      localStorage.setItem(bookingsKey, JSON.stringify(existing));

      // Award loyalty points (1 per ₹10 spent)
      const pointsKey = `pawfect_points_${user.email}`;
      const pts = parseInt(localStorage.getItem(pointsKey) || '0');
      localStorage.setItem(pointsKey, String(pts + Math.floor(total / 10)));

      // UI feedback
      confirmBtn.innerHTML = `<i data-lucide="loader" style="width:15px;height:15px;animation:spin 1s linear infinite;"></i> Booking…`;
      confirmBtn.disabled = true;
      if (window.lucide) lucide.createIcons();

      setTimeout(() => {
        showToast(`🎉 Appointment confirmed at ${salon.name}!`, 'success');
        confirmBtn.innerHTML = `<i data-lucide="check-circle" style="width:15px;height:15px;"></i> Booking Confirmed!`;
        confirmBtn.style.background = 'var(--sage)';
        if (window.lucide) lucide.createIcons();
        // Navigate to dashboard
        setTimeout(() => {
          window.history.pushState(null, '', '/dashboard');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 2000);
      }, 1500);
    });

    // ─── Gallery photo button ───────────────────────────────
    const photoBtn = container.querySelector('#view-photos-btn');
    photoBtn?.addEventListener('click', () => showToast('Gallery viewer coming soon!', 'success'));

    // ─── Similar salon keyboard nav ─────────────────────────
    container.querySelectorAll('.sd-similar-card').forEach(card => {
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') card.click();
      });
    });

  }, 80);
}
