import { ScrollReveal } from '../utils/scroll-reveal.js';

/**
 * Per-salon image map — 100% CURATED local assets only.
 * Every image is a verified pet grooming salon scene.
 * Generated and validated: grooming station, groomer working,
 * bath area, reception, spa room, waiting lounge, equipment.
 * NO external URLs. NO random stock photos. NO unrelated content.
 */

// Our verified pool of 12 unique grooming salon images
const GS = {
  interior1:  '/assets/gs_interior_1.png',   // Modern salon floor, grooming tables, equipment
  groomer1:   '/assets/gs_groomer_1.png',    // Groomer trimming golden retriever
  reception:  '/assets/gs_reception.png',    // Salon reception desk with staff
  bath:       '/assets/gs_bath.png',         // Dog being bathed in stainless tub
  spa:        '/assets/gs_spa.png',          // Luxury pet spa treatment room
  equipment:  '/assets/gs_equipment.png',    // Grooming tools on stainless table
  waiting:    '/assets/gs_waiting.png',      // Waiting area / lounge
  nail:       '/assets/gs_nail.png',         // Groomer trimming dog nails
  storefront: '/assets/gs_storefront.png',   // Premium salon storefront exterior
  blowdry:    '/assets/gs_blowdry.png',      // Groomer blow-drying dog
  interior2:  '/assets/gs_interior_2.png',   // Boutique salon interior
  haircut:    '/assets/gs_haircut.png',      // Groomer trimming poodle
};

const SALON_IMAGE_MAP = {
  101: GS.reception,    // Paawsh Pet Salon & Spa — Memnagar
  102: GS.interior1,    // Heads Up For Tails — Satellite Road
  103: GS.groomer1,     // Zigly For Happy Pets — Bodakdev
  104: GS.bath,         // Sneh Pet Store — Thaltej
  105: GS.haircut,      // Just Dogs Spa — Nehrunagar
  106: GS.waiting,      // Pandya Pets — Chandkheda
  107: GS.equipment,    // Bark Babies Boutique — South Bopal
  108: GS.storefront,   // Doggy Do Parlour — Satellite
  109: GS.spa,          // Heads Up For Tails Spa — Bodakdev
  110: GS.blowdry,      // Tales Of Tails — Drive In Road
  111: GS.nail,         // Urban Pets Salon — Shivranjani
  112: GS.interior2,    // Scooby Pet World — Maninagar
  113: GS.reception,    // The Pet Universe Studio — Isanpur
  114: GS.groomer1,     // Aww My Dog! — Panchwati
  115: GS.bath,         // Woofly India — Mobile Service
  116: GS.interior1,    // Shree Sai Pets — Bapunagar
  117: GS.spa,          // Punjab Pets — Chandkheda
  118: GS.haircut,      // Buddy's Pet Shop — Vastral
  119: GS.waiting,      // Le Chine Pet Boutique — New CG Road
  120: GS.blowdry,      // Gaudrin Of Woof — Ranip
  121: GS.storefront,   // Pups And Paws — Ambawadi
  122: GS.equipment,    // Black Angel Pet Care — Gota Road
  123: GS.nail,         // Happy Tails Pet Spa — Chandkheda
  124: GS.interior2,    // The Dog Land — Tragad
  125: GS.groomer1,     // Pet Paws Studio — Vaishno Devi Circle
};

const FALLBACK_IMAGE = GS.interior1;

function getSalonImage(salonId) {
  return SALON_IMAGE_MAP[parseInt(salonId)] || FALLBACK_IMAGE;
}

const LOCALITIES = [
  { label: 'All Areas', value: '' },
  { label: 'Satellite', value: 'Satellite' },
  { label: 'Bodakdev', value: 'Bodakdev' },
  { label: 'Thaltej', value: 'Thaltej' },
  { label: 'Memnagar', value: 'Memnagar' },
  { label: 'Chandkheda', value: 'Chandkheda' },
  { label: 'South Bopal', value: 'South Bopal' },
  { label: 'Vastrapur', value: 'Vastrapur' },
  { label: 'Maninagar', value: 'Maninagar' },
  { label: 'Prahlad Nagar', value: 'Prahlad Nagar' },
  { label: 'Navrangpura', value: 'Navrangpura' },
];

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const fields = [];
    let current = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { fields.push(current.trim()); current = ''; }
      else current += ch;
    }
    fields.push(current.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = fields[i] || ''; });
    return obj;
  });
}

function getPriceTier(price) {
  const p = parseInt(price) || 0;
  if (p < 800) return '₹';
  if (p <= 1200) return '₹₹';
  return '₹₹₹';
}

function getServiceTags(salon) {
  const specialty = (salon.specialty || '').toLowerCase();
  const visitType = (salon.visit_type || '').toLowerCase();
  const tags = [];
  if (specialty.includes('groom') || specialty.includes('trim') || specialty.includes('styling') || specialty.includes('cut')) tags.push('Grooming');
  if (specialty.includes('spa') || specialty.includes('aroma') || specialty.includes('bath')) tags.push('Spa');
  if (specialty.includes('nail') || specialty.includes('paw')) tags.push('Nail Care');
  if (visitType.includes('home') || visitType.includes('van') || visitType.includes('doorstep')) tags.push('Home Visit');
  return tags.slice(0, 3);
}

function renderSalonCards(salons) {
  if (!salons.length) {
    return `<div class="discover-empty-state" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--space-16) var(--space-4); background: var(--bg-card-solid); border: 1px dashed var(--border-primary); border-radius: var(--radius-xl); box-shadow: var(--shadow-premium); margin: var(--space-4) 0;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--coral-bg); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-6); color: var(--coral);">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <path d="M8 11h6"></path>
        </svg>
      </div>
      <h3 style="font-size: var(--text-lg); font-weight: var(--weight-extrabold); color: var(--navy); margin-bottom: var(--space-2);">No Salons Match Your Filters</h3>
      <p style="color: var(--text-secondary); font-size: var(--text-sm); max-width: 320px; line-height: 1.6; margin-bottom: var(--space-6);">
        We couldn't find any salons matching your current selection. Try broadening your area or removing some filters to explore more options.
      </p>
      <button id="empty-clear-btn" class="btn btn-primary btn-md">
        <i data-lucide="filter-x" style="width: 16px; height: 16px; margin-right: 6px; display: inline-block; vertical-align: middle;"></i>
        Clear All Filters
      </button>
    </div>`;
  }
  return salons.map(salon => {
    const img = getSalonImage(salon.id);
    const priceTier = getPriceTier(salon.starting_price_inr);
    const isHomeService = salon.visit_type?.includes('Home') || salon.visit_type?.includes('Van');
    const isVerified = salon.verified === 'Yes';
    const hasParking = salon.valet_parking === 'Available';
    const serviceTags = getServiceTags(salon);
    const rating = parseFloat(salon.rating) || 0;
    const starsFull = Math.floor(rating);
    const starsHtml = Array.from({length: 5}, (_, i) =>
      `<span style="color:${i < starsFull ? '#F59E0B' : 'var(--border-primary)'};">★</span>`
    ).join('');

    return `
      <a href="/salon/${salon.id}" class="salon-card-premium" data-link data-salon-id="${salon.id}" role="button" tabindex="0" aria-label="View ${salon.name}">
        <div class="scp-image-wrap">
          <img src="${img}" alt="${salon.name} grooming salon" loading="lazy" onerror="this.src='/assets/salon_109.png'">
          <div class="scp-image-overlay"></div>

          <!-- Top badges -->
          <div class="scp-badges-top">
            ${isVerified ? '<span class="scp-badge scp-badge-verified"><i data-lucide="shield-check" style="width:10px;height:10px;"></i> Verified</span>' : ''}
            ${isHomeService ? '<span class="scp-badge scp-badge-home">🚐 Home</span>' : ''}
          </div>

          <!-- Save button -->
          <button class="salon-card-fav" onclick="event.preventDefault();event.stopPropagation();this.classList.toggle('liked');" aria-label="Save salon">
            <i data-lucide="heart" style="width:15px;height:15px;"></i>
          </button>

          <!-- Price overlay bottom-left -->
          <div class="scp-price-overlay">
            <span class="scp-price-tier-pill">${priceTier}</span>
            <span class="scp-price-value">from ₹${salon.starting_price_inr}</span>
          </div>
        </div>

        <div class="scp-body">
          <!-- Name + Rating row -->
          <div class="scp-top">
            <h3 class="scp-name">${salon.name}</h3>
            <div class="scp-rating-block">
              <span class="scp-rating-num">${salon.rating}</span>
              <span class="scp-star">★</span>
              <span class="scp-reviews">(${salon.reviews_count})</span>
            </div>
          </div>

          <!-- Locality -->
          <div class="scp-location">
            <i data-lucide="map-pin" style="width:11px;height:11px;flex-shrink:0;"></i>
            <span>${salon.locality}, Ahmedabad</span>
          </div>

          <!-- Service tags -->
          <div class="scp-tags">
            ${serviceTags.map(t => `<span class="scp-tag">${t}</span>`).join('')}
            ${hasParking ? '<span class="scp-tag scp-tag-muted">🅿️ Parking</span>' : ''}
          </div>

          <!-- Popular package -->
          <div class="scp-package">
            <i data-lucide="sparkles" style="width:10px;height:10px;color:var(--gold);flex-shrink:0;"></i>
            <span>${salon.popular_package || 'Full Grooming Package'}</span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

export async function renderDiscover(container, params) {
  container.innerHTML = `
    <div class="discover-marketplace" style="padding-top:80px;">

      <!-- ===================== HERO ===================== -->
      <div class="dm-hero">
        <div class="dm-hero-bg"></div>
        <div class="container dm-hero-inner">
          <div class="dm-hero-text">
            <span class="section-label" style="color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.15);">
              <i data-lucide="map-pin" style="width:12px;height:12px;"></i> Ahmedabad · 25 Salons Listed
            </span>
            <h1 class="dm-hero-title">Find Ahmedabad's Best<br>Pet Grooming Salons</h1>
            <p class="dm-hero-sub">25 verified grooming salons across Ahmedabad — compare, filter, and book the perfect match for your pet.</p>
          </div>

          <!-- Hero stat cards -->
          <div class="dm-hero-stats">
            <div class="dm-stat-card">
              <div class="dm-stat-icon">🏆</div>
              <div class="dm-stat-val">25</div>
              <div class="dm-stat-label">Verified Salons</div>
            </div>
            <div class="dm-stat-card">
              <div class="dm-stat-icon">⭐</div>
              <div class="dm-stat-val">4.8+</div>
              <div class="dm-stat-label">Average Rating</div>
            </div>
            <div class="dm-stat-card">
              <div class="dm-stat-icon">💰</div>
              <div class="dm-stat-val">₹399</div>
              <div class="dm-stat-label">Starting From</div>
            </div>
            <div class="dm-stat-card">
              <div class="dm-stat-icon">🚐</div>
              <div class="dm-stat-val">8+</div>
              <div class="dm-stat-label">Home Service</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== SEARCH BAR ===================== -->
      <div class="container">
        <div class="dm-search-bar" id="discover-search">
          <div class="dm-search-field">
            <i data-lucide="search" style="width:16px;height:16px;color:var(--text-tertiary);flex-shrink:0;"></i>
            <input type="text" id="search-keyword" placeholder="Search salon name, service…" autocomplete="off">
          </div>
          <div class="dm-search-divider"></div>
          <div class="dm-search-field">
            <i data-lucide="map-pin" style="width:16px;height:16px;color:var(--text-tertiary);flex-shrink:0;"></i>
            <input type="text" id="search-location" placeholder="Area (e.g. Satellite, Bodakdev)" autocomplete="off">
          </div>
          <button class="dm-search-btn" id="do-search">
            <i data-lucide="search" style="width:18px;height:18px;"></i>
            <span>Search</span>
          </button>
        </div>

        <!-- ===================== LOCALITY CHIPS ===================== -->
        <div class="dm-locality-chips" id="locality-chips">
          ${LOCALITIES.map((loc, i) => `
            <button class="dm-locality-chip ${i === 0 ? 'active' : ''}" data-locality="${loc.value}">
              ${loc.value === '' ? '<i data-lucide="layers" style="width:12px;height:12px;"></i>' : ''}
              ${loc.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- ===================== MAIN BODY ===================== -->
      <section style="background: var(--bg-secondary); border-top: 1px solid var(--border-primary); margin-top: 24px; width: 100%;">
        <div class="container">
          <div class="dm-body">

          <!-- ========== FILTER SIDEBAR ========== -->
          <aside class="dm-sidebar" id="dm-sidebar">
            <div class="dm-sidebar-header">
              <h3>Filters</h3>
              <button id="clear-filters" class="dm-clear-btn">Clear All</button>
            </div>

            <!-- Rating -->
            <div class="dm-filter-group">
              <h4 class="dm-filter-title">Minimum Rating</h4>
              <div class="dm-radio-group">
                <label class="dm-radio"><input type="radio" name="rating" value="0" checked><span>All Ratings</span></label>
                <label class="dm-radio"><input type="radio" name="rating" value="4.0"><span>4.0 ★ &amp; above</span></label>
                <label class="dm-radio"><input type="radio" name="rating" value="4.5"><span>4.5 ★ &amp; above</span></label>
                <label class="dm-radio"><input type="radio" name="rating" value="4.8"><span>4.8 ★ &amp; above</span></label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="dm-filter-group">
              <h4 class="dm-filter-title">Price Range</h4>
              <div class="dm-price-chips">
                <button class="dm-price-chip" data-tier="₹">₹ &lt;₹800</button>
                <button class="dm-price-chip" data-tier="₹₹">₹₹ ₹800–₹1200</button>
                <button class="dm-price-chip" data-tier="₹₹₹">₹₹₹ Premium</button>
              </div>
            </div>

            <!-- Services -->
            <div class="dm-filter-group">
              <h4 class="dm-filter-title">Services</h4>
              <label class="dm-checkbox"><input type="checkbox" id="svc-grooming"><span>Full Grooming</span></label>
              <label class="dm-checkbox"><input type="checkbox" id="svc-spa"><span>Spa &amp; Bath</span></label>
              <label class="dm-checkbox"><input type="checkbox" id="svc-nail"><span>Nail &amp; Paw Care</span></label>
              <label class="dm-checkbox"><input type="checkbox" id="svc-home"><span>Home / Van Service</span></label>
            </div>

            <!-- Amenities -->
            <div class="dm-filter-group">
              <h4 class="dm-filter-title">Amenities</h4>
              <label class="dm-checkbox"><input type="checkbox" id="filter-parking"><span>🅿️ Valet Parking</span></label>
            </div>

            <!-- Verified toggle -->
            <div class="dm-filter-group" style="border-bottom:none;">
              <div class="dm-verified-row">
                <div>
                  <div class="dm-filter-title" style="margin-bottom:2px;">Verified Only</div>
                  <div style="font-size:10px;color:var(--text-tertiary);">Background-checked groomers</div>
                </div>
                <button class="dm-toggle" id="verified-toggle" role="switch" aria-checked="false"></button>
              </div>
            </div>
          </aside>

          <!-- ========== LISTINGS ========== -->
          <main class="dm-main">

            <!-- Controls bar -->
            <div class="dm-controls-bar">
              <div class="dm-quick-stats" id="quick-stats">
                <span class="dm-qs-item" id="qs-count"><strong>25</strong> Salons</span>
                <span class="dm-qs-sep">·</span>
                <span class="dm-qs-item"><i data-lucide="shield-check" style="width:11px;height:11px;color:var(--sage-light);"></i> <strong id="qs-verified">25</strong> Verified</span>
                <span class="dm-qs-sep">·</span>
                <span class="dm-qs-item">🚐 <strong id="qs-home">8</strong> Home Service</span>
              </div>

              <div class="dm-sort-row">
                <label class="dm-sort-label">Sort by</label>
                <select class="dm-sort-select" id="sort-select">
                  <option value="top-rated">Top Rated</option>
                  <option value="price-low">Lowest Price</option>
                  <option value="price-high">Highest Price</option>
                  <option value="most-reviews">Most Popular</option>
                  <option value="name">Name A–Z</option>
                </select>
                <button class="dm-mobile-filter-btn" id="dm-filter-toggle">
                  <i data-lucide="sliders-horizontal" style="width:14px;height:14px;"></i> Filters
                </button>
              </div>
            </div>

            <!-- Salon grid -->
            <div class="listing-grid-premium" id="salon-listing">
              <div style="grid-column:1/-1;padding:60px;text-align:center;color:var(--text-secondary);">
                <div class="dm-spinner">⟳</div>
                <p style="margin-top:12px;font-size:var(--text-sm);">Loading Ahmedabad salons…</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
  `;

  // ────────────────────────────────────────────────
  // LOGIC
  // ────────────────────────────────────────────────
  setTimeout(async () => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();

    // Load CSV
    let allSalons = [];
    try {
      const resp = await fetch('/ahmedabad_pet_grooming_data.csv');
      const text = await resp.text();
      allSalons = parseCSV(text);
    } catch {
      container.querySelector('#salon-listing').innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-secondary);">Failed to load salon data. Please refresh.</div>';
      return;
    }

    let filteredSalons = [...allSalons];

    // ── Sorting ──────────────────────────────────
    function sortSalons(salons, method) {
      const sorted = [...salons];
      switch (method) {
        case 'top-rated':    return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        case 'price-low':    return sorted.sort((a, b) => parseInt(a.starting_price_inr) - parseInt(b.starting_price_inr));
        case 'price-high':   return sorted.sort((a, b) => parseInt(b.starting_price_inr) - parseInt(a.starting_price_inr));
        case 'most-reviews': return sorted.sort((a, b) => parseInt(b.reviews_count) - parseInt(a.reviews_count));
        case 'name':         return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:             return sorted;
      }
    }

    // ── Filter + Render ──────────────────────────
    function applyAll() {
      const ratingMin = parseFloat(container.querySelector('input[name="rating"]:checked')?.value || '0');
      const activeLocality = container.querySelector('.dm-locality-chip.active')?.dataset.locality || '';
      const searchKw = container.querySelector('#search-keyword')?.value.trim().toLowerCase() || '';
      const searchLoc = container.querySelector('#search-location')?.value.trim().toLowerCase() || '';
      const verifiedOnly = container.querySelector('#verified-toggle')?.classList.contains('active');
      const parkingOnly = container.querySelector('#filter-parking')?.checked;

      const selectedTiers = [...container.querySelectorAll('.dm-price-chip.active')].map(c => c.dataset.tier);
      const svcGrooming = container.querySelector('#svc-grooming')?.checked;
      const svcSpa = container.querySelector('#svc-spa')?.checked;
      const svcNail = container.querySelector('#svc-nail')?.checked;
      const svcHome = container.querySelector('#svc-home')?.checked;
      const hasServiceFilter = svcGrooming || svcSpa || svcNail || svcHome;

      filteredSalons = allSalons.filter(s => {
        const rating = parseFloat(s.rating) || 0;
        const price = parseInt(s.starting_price_inr) || 0;
        const tier = getPriceTier(price);
        const locality = (s.locality || '').toLowerCase();
        const specialty = (s.specialty || '').toLowerCase();
        const visitType = (s.visit_type || '').toLowerCase();
        const name = (s.name || '').toLowerCase();

        if (rating < ratingMin) return false;
        if (activeLocality && !locality.includes(activeLocality.toLowerCase())) return false;
        if (searchLoc && !locality.includes(searchLoc) && !name.includes(searchLoc)) return false;
        if (searchKw && !name.includes(searchKw) && !specialty.includes(searchKw) && !locality.includes(searchKw)) return false;
        if (selectedTiers.length && !selectedTiers.includes(tier)) return false;
        if (verifiedOnly && s.verified !== 'Yes') return false;
        if (parkingOnly && s.valet_parking !== 'Available') return false;

        if (hasServiceFilter) {
          let match = false;
          if (svcGrooming && (specialty.includes('groom') || specialty.includes('trim') || specialty.includes('cut') || specialty.includes('styling'))) match = true;
          if (svcSpa && (specialty.includes('spa') || specialty.includes('bath') || specialty.includes('aroma'))) match = true;
          if (svcNail && (specialty.includes('nail') || specialty.includes('paw'))) match = true;
          if (svcHome && (visitType.includes('home') || visitType.includes('van'))) match = true;
          if (!match) return false;
        }
        return true;
      });

      // Apply sort
      const sortMethod = container.querySelector('#sort-select')?.value || 'top-rated';
      const sorted = sortSalons(filteredSalons, sortMethod);

      // Update listing
      const listing = container.querySelector('#salon-listing');
      if (listing) listing.innerHTML = renderSalonCards(sorted);

      // Update quick stats
      const homeCount = sorted.filter(s => s.visit_type?.includes('Home') || s.visit_type?.includes('Van')).length;
      const verifiedCount = sorted.filter(s => s.verified === 'Yes').length;
      const qsCount = container.querySelector('#qs-count');
      const qsVerified = container.querySelector('#qs-verified');
      const qsHome = container.querySelector('#qs-home');
      if (qsCount) qsCount.innerHTML = `<strong>${sorted.length}</strong> Salon${sorted.length !== 1 ? 's' : ''}`;
      if (qsVerified) qsVerified.textContent = verifiedCount;
      if (qsHome) qsHome.textContent = homeCount;

      if (window.lucide) lucide.createIcons();

      // Bind empty state clear button
      container.querySelector('#empty-clear-btn')?.addEventListener('click', clearAll);
    }

    function clearAll() {
      container.querySelectorAll('input[name="rating"]').forEach(r => r.checked = r.value === '0');
      container.querySelectorAll('.dm-price-chip').forEach(c => c.classList.remove('active'));
      container.querySelectorAll('#svc-grooming,#svc-spa,#svc-nail,#svc-home,#filter-parking').forEach(c => c.checked = false);
      container.querySelector('#verified-toggle')?.classList.remove('active');
      const kwEl = container.querySelector('#search-keyword');
      const locEl = container.querySelector('#search-location');
      if (kwEl) kwEl.value = '';
      if (locEl) locEl.value = '';
      // Reset locality chips to "All"
      container.querySelectorAll('.dm-locality-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
      applyAll();
    }

    // Initial render (sorted top-rated by default)
    applyAll();

    // ── Event Listeners ───────────────────────────

    // Locality chips
    container.querySelectorAll('.dm-locality-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        container.querySelectorAll('.dm-locality-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        applyAll();
      });
    });

    // Rating
    container.querySelectorAll('input[name="rating"]').forEach(r => r.addEventListener('change', applyAll));

    // Price chips
    container.querySelectorAll('.dm-price-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        applyAll();
      });
    });

    // Service / parking checkboxes
    ['#svc-grooming','#svc-spa','#svc-nail','#svc-home','#filter-parking'].forEach(sel => {
      container.querySelector(sel)?.addEventListener('change', applyAll);
    });

    // Verified toggle
    const vt = container.querySelector('#verified-toggle');
    vt?.addEventListener('click', () => {
      const next = !vt.classList.contains('active');
      vt.classList.toggle('active', next);
      vt.setAttribute('aria-checked', next);
      applyAll();
    });

    // Sort
    container.querySelector('#sort-select')?.addEventListener('change', applyAll);

    // Search
    container.querySelector('#do-search')?.addEventListener('click', applyAll);
    ['#search-keyword','#search-location'].forEach(sel => {
      container.querySelector(sel)?.addEventListener('keydown', e => { if (e.key === 'Enter') applyAll(); });
    });

    // Clear filters
    container.querySelector('#clear-filters')?.addEventListener('click', clearAll);

    // Mobile filter sidebar toggle
    const sidebar = container.querySelector('#dm-sidebar');
    container.querySelector('#dm-filter-toggle')?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
    });

    // Close sidebar on outside click (mobile)
    document.addEventListener('click', e => {
      if (sidebar?.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          !container.querySelector('#dm-filter-toggle')?.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });

  }, 50);
}
