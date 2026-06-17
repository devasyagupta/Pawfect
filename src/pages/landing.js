import { ScrollReveal } from '../utils/scroll-reveal.js';

// Top 4 salons from CSV for featured section
// All images are verified local pet grooming scene assets
const FEATURED_SALONS = [
  {
    id: 102,
    name: "Heads Up For Tails",
    locality: "Satellite Road",
    rating: "5.0",
    reviews: "115",
    price: "₹1,499",
    badge: "Top Rated",
    img: "/assets/gs_interior_1.png",
    services: "Royal Spa, Aromatherapy, Paw Balm",
  },
  {
    id: 104,
    name: "Sneh Pet Grooming",
    locality: "Thaltej",
    rating: "5.0",
    reviews: "468",
    price: "₹899",
    badge: "Most Popular",
    img: "/assets/gs_groomer_1.png",
    services: "Nail Clipping, Ear Care, Conditioning",
  },
  {
    id: 101,
    name: "Paawsh Pet Salon & Spa",
    locality: "Memnagar",
    rating: "4.9",
    reviews: "77",
    price: "₹1,299",
    badge: "Premium",
    img: "/assets/gs_reception.png",
    services: "Breed-specific cuts, Medicated baths",
  },
  {
    id: 107,
    name: "Bark Babies Boutique",
    locality: "South Bopal",
    rating: "4.9",
    reviews: "204",
    price: "₹999",
    badge: "Verified",
    img: "/assets/gs_haircut.png",
    services: "Teeth Cleaning, Custom Cuts, Anti-dandruff",
  },
];


export async function renderLanding(container, params) {
  container.innerHTML = `
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="hero container">
        <div class="hero-grid">
          <!-- Left Content -->
          <div class="hero-content reveal">
            <div class="hero-tagline">
              <span class="badge badge-primary">🐾 Ahmedabad's #1 Pet Care Platform</span>
            </div>
            <h1 class="hero-title">
              GROOMING AND WELLNESS <span class="text-gradient">AT THEIR FINEST</span>
            </h1>
            <p class="hero-subtitle">
              Book premium grooming, spa, and wellness services from Ahmedabad's most trusted certified salons — from Satellite to Bodakdev.
            </p>
            <div class="hero-actions">
              <a href="/discover" class="btn btn-primary btn-lg" data-link>Explore Salons</a>
              <a href="/booking" class="btn btn-secondary btn-lg" data-link>Book Appointment</a>
            </div>
            
            <div class="hero-trust">
              <div class="hero-trust-row">
                <i data-lucide="check-circle-2"></i>
                <span>100% Certified Professional Groomers</span>
              </div>
              <div class="hero-trust-row">
                <i data-lucide="check-circle-2"></i>
                <span>Eco-friendly organic spa products only</span>
              </div>
              <div class="hero-trust-row">
                <i data-lucide="check-circle-2"></i>
                <span>25+ verified salons across Ahmedabad</span>
              </div>
            </div>
          </div>
          
          <!-- Right: Organic Image Composition -->
          <div class="hero-composition reveal reveal-delay-2">
            <!-- Animated blob background -->
            <div class="hero-blob">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
                <defs>
                  <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#E47D5D;stop-opacity:0.18"/>
                    <stop offset="50%" style="stop-color:#F4A78D;stop-opacity:0.12"/>
                    <stop offset="100%" style="stop-color:#C9A055;stop-opacity:0.06"/>
                  </linearGradient>
                </defs>
                <path fill="url(#blobGrad)" d="M421.5,295.5Q419,341,389,377Q359,413,319.5,443Q280,473,232.5,457.5Q185,442,145,419Q105,396,79,358.5Q53,321,47.5,275Q42,229,56,183Q70,137,107.5,109.5Q145,82,183.5,52.5Q222,23,268.5,29.5Q315,36,353,65.5Q391,95,410,137Q429,179,428,224.5Q427,270,421.5,295.5Z">
                  <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
                    M421.5,295.5Q419,341,389,377Q359,413,319.5,443Q280,473,232.5,457.5Q185,442,145,419Q105,396,79,358.5Q53,321,47.5,275Q42,229,56,183Q70,137,107.5,109.5Q145,82,183.5,52.5Q222,23,268.5,29.5Q315,36,353,65.5Q391,95,410,137Q429,179,428,224.5Q427,270,421.5,295.5Z;
                    M440,300Q430,350,398,388Q366,426,322,452Q278,478,230,462Q182,446,142,418Q102,390,72,348Q42,306,38,258Q34,210,55,166Q76,122,113,92Q150,62,196,44Q242,26,288,32Q334,38,370,70Q406,102,426,146Q446,190,448,238Q450,286,440,300Z;
                    M421.5,295.5Q419,341,389,377Q359,413,319.5,443Q280,473,232.5,457.5Q185,442,145,419Q105,396,79,358.5Q53,321,47.5,275Q42,229,56,183Q70,137,107.5,109.5Q145,82,183.5,52.5Q222,23,268.5,29.5Q315,36,353,65.5Q391,95,410,137Q429,179,428,224.5Q427,270,421.5,295.5Z
                  "/>
                </path>
              </svg>
            </div>

            <!-- Hero dog image -->
            <div class="hero-image-container">
              <img src="/assets/hero_golden_retriever.png" alt="Beautiful Golden Retriever" loading="eager">
            </div>
            
            <!-- Grooming Card -->
            <div class="floating-card floating-card-1 float-slow wiggle-hover" style="flex-direction:column;align-items:center;padding:16px 20px;">
              <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,rgba(228,125,93,0.12),rgba(201,160,85,0.08));border:2px solid rgba(228,125,93,0.2);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">✂️</div>
              <div style="font-size:11px;font-weight:700;margin-top:6px;color:var(--text-primary);">Grooming</div>
            </div>

            <!-- Product Card -->
            <div class="floating-card floating-card-2 float-medium wiggle-hover" style="flex-direction:column;padding:14px 16px;max-width:180px;">
              <img src="/assets/dog_food_product.png" alt="Premium Dog Food" style="width:100%;height:80px;object-fit:cover;border-radius:10px;margin-bottom:8px;">
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-primary);">PREMIUM | 5KG</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">Premium Grain-Free Dog Food</div>
              <a href="/discover" class="btn btn-outline" style="margin-top:8px;padding:4px 12px;font-size:10px;" data-link>Buy Now</a>
            </div>

            <!-- Testimonial Card -->
            <div class="floating-card floating-card-3 float-slow wiggle-hover" style="animation-delay:0.8s;flex-direction:column;padding:14px 18px;max-width:220px;">
              <div style="display:flex;gap:2px;margin-bottom:6px;">
                <span style="color:#C9A055;">★</span><span style="color:#C9A055;">★</span><span style="color:#C9A055;">★</span><span style="color:#C9A055;">★</span><span style="color:#C9A055;">★</span>
                <span style="font-size:11px;font-weight:700;margin-left:4px;">4.9/5</span>
              </div>
              <div style="font-size:10px;color:var(--text-secondary);line-height:1.5;font-style:italic;">"Best grooming service in Ahmedabad! My lab looks amazing every time."</div>
              <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
                <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--coral-bg),rgba(201,160,85,0.1));display:flex;align-items:center;justify-content:center;font-size:0.8rem;">👩</div>
                <div>
                  <div style="font-size:10px;font-weight:700;color:var(--text-primary);">PRIYA SHARMA</div>
                  <div style="font-size:9px;color:var(--text-tertiary);">Bodakdev, Ahmedabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Search Experience Section -->
      <section class="search-header-section container reveal reveal-delay-3">
        <div class="search-container-airbnb">
          <a href="/discover" class="search-item" data-link>
            <label style="cursor: pointer;">Location</label>
            <input type="text" placeholder="Where are you?" value="Satellite, Ahmedabad" readonly style="cursor: pointer;">
          </a>
          <a href="/discover" class="search-item" data-link>
            <label style="cursor: pointer;">Pet Type</label>
            <select disabled style="opacity:1; cursor: pointer;">
              <option>Dog (All Breeds)</option>
              <option>Cat</option>
            </select>
          </a>
          <a href="/discover" class="search-item" data-link>
            <label style="cursor: pointer;">Service</label>
            <input type="text" placeholder="What service?" value="Full Styling &amp; Spa" readonly style="cursor: pointer;">
          </a>
          <a href="/discover" class="search-item" data-link>
            <label style="cursor: pointer;">Date</label>
            <input type="text" placeholder="Pick Date" value="Anytime / Today" readonly style="cursor: pointer;">
          </a>
          <a href="/discover" class="search-btn-airbnb" data-link>
            <i data-lucide="search" style="width:20px;height:20px;"></i>
          </a>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section reveal" style="background: var(--bg-secondary); border-top: 1px solid var(--border-primary); border-bottom: 1px solid var(--border-primary); padding: var(--space-12) 0; margin: var(--space-12) 0; width: 100%; max-width: none; position: relative; z-index: 10;">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-decor-bubble">🐾</div>
              <div class="stat-icon-wrapper"><i data-lucide="paw-print"></i></div>
              <div>
                <div class="stat-number" data-count="50000" data-suffix="+">0</div>
                <div class="stat-label">Pets Groomed</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-decor-bubble">💈</div>
              <div class="stat-icon-wrapper"><i data-lucide="store"></i></div>
              <div>
                <div class="stat-number" data-count="25" data-suffix="+">0</div>
                <div class="stat-label">Ahmedabad Salons</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-decor-bubble">⭐</div>
              <div class="stat-icon-wrapper"><i data-lucide="star"></i></div>
              <div>
                <div class="stat-number" data-count="4.8" data-suffix="/5">0</div>
                <div class="stat-label">Average Rating</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-decor-bubble">📍</div>
              <div class="stat-icon-wrapper"><i data-lucide="map-pin"></i></div>
              <div>
                <div class="stat-number" data-count="10" data-suffix="+">0</div>
                <div class="stat-label">Areas Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
        </div>
      </section>

      <!-- How Pawfect Works Section -->
      <section class="how-it-works-section reveal">
        <div class="container">
          <div class="how-it-works-grid">
            <div class="how-left">
              <span class="section-label">🐾 Doorstep Grooming Experience</span>
              <h2 class="section-title">Luxury Grooming,<br>Picked Up &amp; Delivered</h2>
              <p class="supporting-text">
                Busy schedule? Let Pawfect handle everything. Book a service, we'll safely pick up your pet, provide professional grooming at a certified Ahmedabad salon, and bring them back happy and pampered.
              </p>
              <a href="/booking" class="btn btn-primary btn-lg" data-link>Book Pickup Service</a>
            </div>
            
            <div class="how-center">
              <div class="how-floating-badge how-floating-badge-1">
                <span style="color:var(--gold);">★</span>
                <span>4.9 Rating</span>
              </div>
              <div class="how-floating-badge how-floating-badge-2">
                <i data-lucide="shield-check" style="width:12px;height:12px;color:var(--sage-light);"></i>
                <span>Safe &amp; Verified Groomers</span>
              </div>
              <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                <div class="how-van-wrapper" id="how-slideshow">
                  <!-- Step 1: Book Service -->
                  <div class="how-slide active" data-slide="1">
                    <img src="/assets/book_service.png" class="how-slide-image" alt="Book Service — phone screen booking interface" loading="eager">
                  </div>
                  <!-- Step 2: Pet Pickup -->
                  <div class="how-slide" data-slide="2">
                    <img src="/assets/pawfect_van.png" class="how-slide-image" alt="Pet Pickup — Pawfect Premium Pet Grooming Van with Golden Retriever" loading="lazy">
                  </div>
                  <!-- Step 3: Salon Appointment -->
                  <div class="how-slide" data-slide="3">
                    <img src="/assets/gs_waiting.png" class="how-slide-image" alt="Salon Appointment — pet waiting in a salon reception lobby" loading="lazy">
                  </div>
                  <!-- Step 4: Grooming & Spa -->
                  <div class="how-slide" data-slide="4">
                    <img src="/assets/gs_spa.png" class="how-slide-image" alt="Grooming & Spa — groomer actively bathing a dog" loading="lazy">
                  </div>
                  <!-- Step 5: Safe Drop-Off -->
                  <div class="how-slide" data-slide="5">
                    <img src="/assets/safe_dropoff.png" class="how-slide-image" alt="Safe Drop-Off — happy groomed pet returned to doorstep" loading="lazy">
                  </div>
                </div>
                <!-- Slideshow Dot Indicators -->
                <div class="how-slideshow-dots" id="how-slideshow-dots">
                  <button class="how-dot active" data-dot="1" aria-label="Go to Step 1"></button>
                  <button class="how-dot" data-dot="2" aria-label="Go to Step 2"></button>
                  <button class="how-dot" data-dot="3" aria-label="Go to Step 3"></button>
                  <button class="how-dot" data-dot="4" aria-label="Go to Step 4"></button>
                  <button class="how-dot" data-dot="5" aria-label="Go to Step 5"></button>
                </div>
              </div>
            </div>
            
            <div class="how-right-timeline" id="how-timeline">
              <div class="timeline-step active" data-step="1">
                <div class="timeline-step-icon"><i data-lucide="calendar"></i></div>
                <div class="timeline-step-content">
                  <h4 class="timeline-step-title">1. Book Service</h4>
                  <p class="timeline-step-desc">Pick date, time, and service tier in seconds.</p>
                </div>
              </div>
              <div class="timeline-step" data-step="2">
                <div class="timeline-step-icon"><i data-lucide="truck"></i></div>
                <div class="timeline-step-content">
                  <h4 class="timeline-step-title">2. Pet Pickup</h4>
                  <p class="timeline-step-desc">Our Pawfect van collects your companion safely.</p>
                </div>
              </div>
              <div class="timeline-step" data-step="3">
                <div class="timeline-step-icon"><i data-lucide="store"></i></div>
                <div class="timeline-step-content">
                  <h4 class="timeline-step-title">3. Salon Appointment</h4>
                  <p class="timeline-step-desc">Priority VIP queue at our certified Ahmedabad salon.</p>
                </div>
              </div>
              <div class="timeline-step" data-step="4">
                <div class="timeline-step-icon"><i data-lucide="paw-print"></i></div>
                <div class="timeline-step-content">
                  <h4 class="timeline-step-title">4. Grooming &amp; Spa</h4>
                  <p class="timeline-step-desc">Pampering with premium organic shampoo &amp; trim styles.</p>
                </div>
              </div>
              <div class="timeline-step" data-step="5">
                <div class="timeline-step-icon"><i data-lucide="home"></i></div>
                <div class="timeline-step-content">
                  <h4 class="timeline-step-title">5. Safe Drop-Off</h4>
                  <p class="timeline-step-desc">Returned clean and happy to your doorstep.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PET TRANSFORMATION SECTION -->
      <section class="transformations-section" style="background: var(--bg-accent-tint); border-top: 1px solid var(--border-primary); border-bottom: 1px solid var(--border-primary); padding: var(--section-space) 0; margin: var(--section-space) 0 0 0; width: 100%; max-width: none; position: relative;">
        <div class="container">
          <div class="section-header" style="margin-bottom:var(--space-8); text-align: center;">
            <span class="section-label">✨ Before &amp; After</span>
            <h2 class="section-title">Pet Transformations</h2>
            <p class="section-subtitle">Real transformations from Ahmedabad pet parents. Professional grooming, spa treatments and breed-specific styling.</p>
          </div>

          <!-- Transformation stats -->
          <div style="display:flex;justify-content:center;gap:var(--space-10);margin-bottom:var(--space-8);flex-wrap:wrap;">
            <div style="text-align:center;">
              <div style="font-size:var(--text-3xl);font-weight:900;color:var(--coral);font-family:var(--font-display);line-height:1;">5,000+</div>
              <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-tertiary);margin-top:4px;">Transformations</div>
            </div>
            <div style="width:1px;background:var(--border-primary);"></div>
            <div style="text-align:center;">
              <div style="font-size:var(--text-3xl);font-weight:900;color:var(--coral);font-family:var(--font-display);line-height:1;">4.9 ★</div>
              <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-tertiary);margin-top:4px;">Average Rating</div>
            </div>
            <div style="width:1px;background:var(--border-primary);"></div>
            <div style="text-align:center;">
              <div style="font-size:var(--text-3xl);font-weight:900;color:var(--coral);font-family:var(--font-display);line-height:1;">25+</div>
              <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-tertiary);margin-top:4px;">Partner Salons</div>
            </div>
          </div>
          
          <div style="max-width:900px;margin:0 auto;">
            <div class="compare-slider-wrapper reveal">
              <div class="compare-slider" id="compare-slider">
                <!-- After Container -->
                <div class="after-img-container">
                  <img src="/assets/after_grooming.png" alt="Groomed Maltese After" draggable="false">
                  <span class="label label-after">Groomed (After)</span>
                </div>
                
                <!-- Before Container -->
                <div class="before-img-container" id="before-container">
                  <img src="/assets/before_grooming.png" alt="Shaggy Maltese Before" draggable="false">
                  <span class="label label-before">Matted (Before)</span>
                </div>
                
                <!-- Handle -->
                <div class="slider-handle" id="slider-handle">
                  <div class="slider-button">
                    <i data-lucide="chevrons-left-right" style="width:18px;height:18px;"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Salons -->
      <section class="featured-salons-section" style="padding: var(--section-space) 0; margin-bottom: 0; width: 100%; max-width: none;">
        <div class="container">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:var(--space-8);">
            <div>
              <span class="section-label">⭐ Top Rated in Ahmedabad</span>
              <h2 class="section-title" style="margin-bottom:0;">Featured Salons Nearby</h2>
            </div>
            <a href="/discover" class="btn btn-outline" data-link>View All <i data-lucide="arrow-right" style="width:14px;height:14px;margin-left:4px;"></i></a>
          </div>
          
          <div class="salons-grid stagger-children">
            ${FEATURED_SALONS.map(s => `
            <a href="/salon/${s.id}" class="salon-card" data-link>
              <div class="salon-card-image">
                <img src="${s.img}" alt="${s.name} grooming salon interior" loading="lazy" onerror="this.src='/assets/salon_109.png'">
                <span class="salon-card-badge">${s.badge}</span>
                <button class="salon-card-fav" onclick="event.preventDefault();event.stopPropagation();this.classList.toggle('liked');" aria-label="Save">
                  <i data-lucide="heart" style="width:14px;height:14px;"></i>
                </button>
              </div>
              <div class="salon-card-info">
                <div class="salon-card-header">
                  <span class="salon-card-name">${s.name}</span>
                  <span class="salon-card-rating">
                    <span class="star">★</span>
                    <span>${s.rating}</span>
                  </span>
                </div>
                <span class="salon-card-distance"><i data-lucide="map-pin" style="width:11px;height:11px;margin-right:3px;"></i>${s.locality}</span>
                <span class="salon-card-services">${s.services}</span>
                <span class="salon-card-price">Starts at <strong>${s.price}</strong></span>
              </div>
            </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Premium CTA Section — Two Column -->
      <section class="premium-cta-section reveal">
        <div class="premium-cta-glow-1"></div>
        <div class="premium-cta-glow-2"></div>
        <div class="container premium-cta-container">
          <div class="premium-cta-left">
            <span class="premium-cta-badge">🐾 Ahmedabad's Most Trusted</span>
            <h2 class="premium-cta-heading">Ahmedabad's Most Trusted<br>Pet Grooming Platform</h2>
            <p class="premium-cta-subtitle">
              Book premium grooming, wellness, spa and nail care services from trusted salons across Ahmedabad — from Satellite to SG Highway.
            </p>
            <div class="premium-cta-actions">
              <a href="/booking" class="btn premium-btn-appointment" data-link>Book Appointment</a>
              <a href="/discover" class="btn premium-btn-explore" data-link>Browse Salons</a>
            </div>
          </div>
          <div class="premium-cta-right">
            <div class="premium-cta-image-wrap">
              <img src="/assets/cta_premium_pets.png" alt="Happy dog and cat with groomer at Pawfect Ahmedabad" loading="lazy">
              <!-- Floating trust badges -->
              <div class="cta-float-badge cta-float-badge-1">
                <span style="color:#FFD700;">★★★★★</span>
                <span>4.9 Rating</span>
              </div>
              <div class="cta-float-badge cta-float-badge-2">
                <i data-lucide="users" style="width:14px;height:14px;color:var(--sage-light);"></i>
                <span>50,000+ Happy Pet Parents</span>
              </div>
              <div class="cta-float-badge cta-float-badge-3">
                <i data-lucide="shield-check" style="width:14px;height:14px;color:var(--coral-light);"></i>
                <span>Verified Groomers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Bind animation observers
  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();
    
    // Count-up stats
    document.querySelectorAll('[data-count]').forEach(el => {
      ScrollReveal.animateCounter(el, parseFloat(el.dataset.count), 1800);
    });

    // ============================================
    // DYNAMIC SYNCED SLIDESHOW
    // ============================================
    const slideshow = container.querySelector('#how-slideshow');
    const timeline = container.querySelector('#how-timeline');
    const dotsContainer = container.querySelector('#how-slideshow-dots');
    
    if (slideshow && timeline && dotsContainer) {
      const slides = slideshow.querySelectorAll('.how-slide');
      const steps = timeline.querySelectorAll('.timeline-step');
      const dots = dotsContainer.querySelectorAll('.how-dot');
      
      let currentStep = 1;
      const totalSteps = 5;
      let autoplayTimer = null;
      let pauseResumeTimer = null;
      
      function showStep(stepIndex) {
        currentStep = stepIndex;
        
        // Update Slides
        slides.forEach(slide => {
          const slideNum = parseInt(slide.dataset.slide);
          if (slideNum === stepIndex) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
        
        // Update Timeline Steps
        steps.forEach(step => {
          const stepNum = parseInt(step.dataset.step);
          if (stepNum === stepIndex) {
            step.classList.add('active');
            step.classList.remove('dimmed');
          } else {
            step.classList.remove('active');
            step.classList.add('dimmed');
          }
        });
        
        // Update Dots
        dots.forEach(dot => {
          const dotNum = parseInt(dot.dataset.dot);
          if (dotNum === stepIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
          let nextStep = currentStep + 1;
          if (nextStep > totalSteps) {
            nextStep = 1;
          }
          showStep(nextStep);
        }, 3500); // 3.5 seconds per slide
      }
      
      function stopAutoplay() {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }
      
      function handleManualInteraction(stepIndex) {
        // Stop autoplay and show selected step
        stopAutoplay();
        showStep(stepIndex);
        
        // Clear previous pause-resume timeout
        if (pauseResumeTimer) {
          clearTimeout(pauseResumeTimer);
        }
        
        // Resume autoplay after 5 seconds of inactivity
        pauseResumeTimer = setTimeout(() => {
          startAutoplay();
        }, 5000);
      }
      
      // Attach click events to Timeline Steps
      steps.forEach(step => {
        step.addEventListener('click', () => {
          const stepNum = parseInt(step.dataset.step);
          handleManualInteraction(stepNum);
        });
      });
      
      // Attach click events to Dot Indicators
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const dotNum = parseInt(dot.dataset.dot);
          handleManualInteraction(dotNum);
        });
      });
      
      // Initialize active states (Start at step 1)
      showStep(1);
      startAutoplay();
      
      // Cleanup function to prevent interval leaks on page transitions
      const onRouteChanged = () => {
        stopAutoplay();
        if (pauseResumeTimer) clearTimeout(pauseResumeTimer);
        window.removeEventListener('route-changed', onRouteChanged);
        window.removeEventListener('popstate', onRouteChanged);
      };
      window.addEventListener('route-changed', onRouteChanged);
      window.addEventListener('popstate', onRouteChanged);
    }

    // ============================================
    // PREMIUM Before/After Slider
    // ============================================
    const slider = container.querySelector('#compare-slider');
    const handle = container.querySelector('#slider-handle');
    const beforeContainer = container.querySelector('#before-container');

    if (slider && handle && beforeContainer) {
      let isDragging = false;
      let currentPercent = 50;

      // Prevent all selection on slider
      const noSelectStyle = {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
      };

      Object.assign(slider.style, noSelectStyle);
      slider.querySelectorAll('img').forEach(img => {
        Object.assign(img.style, { ...noSelectStyle, pointerEvents: 'none', draggable: false });
        img.setAttribute('draggable', 'false');
      });

      function setPosition(percent) {
        percent = Math.max(1, Math.min(99, percent));
        currentPercent = percent;
        handle.style.left = `${percent}%`;
        beforeContainer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      }

      function getClientX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
      }

      function onMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const rect = slider.getBoundingClientRect();
        const x = getClientX(e) - rect.left;
        setPosition((x / rect.width) * 100);
      }

      function startDrag(e) {
        isDragging = true;
        slider.style.cursor = 'grabbing';
        handle.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        document.body.style.WebkitUserSelect = 'none';
        // Position immediately on click
        const rect = slider.getBoundingClientRect();
        const x = getClientX(e) - rect.left;
        setPosition((x / rect.width) * 100);
        e.preventDefault();
      }

      function stopDrag() {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = 'col-resize';
        handle.style.cursor = 'grab';
        document.body.style.userSelect = '';
        document.body.style.WebkitUserSelect = '';
      }

      // Mouse events
      slider.addEventListener('mousedown', startDrag);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', stopDrag);

      // Touch events
      slider.addEventListener('touchstart', startDrag, { passive: false });
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', stopDrag);

      // Prevent context menu & image drag
      slider.addEventListener('contextmenu', e => e.preventDefault());
      slider.addEventListener('dragstart', e => e.preventDefault());

      // Cursor on handle
      handle.style.cursor = 'grab';
      slider.style.cursor = 'col-resize';

      // Handle glow on slider hover
      slider.addEventListener('mouseenter', () => {
        handle.classList.add('handle-glow');
      });
      slider.addEventListener('mouseleave', () => {
        if (!isDragging) handle.classList.remove('handle-glow');
      });

      // Initialize at 50%
      setPosition(50);
    }
  }, 50);
}
