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

            <!-- Cat Polaroid Collage Card -->
            <div class="floating-card floating-card-2 hero-cat-polaroid float-medium"
                 style="flex-direction:column;padding:0;background:transparent;border:none;box-shadow:none;overflow:visible;">
              <div style="
                background:#fff;
                border-radius:4px;
                padding:10px 10px 10px 10px;
                box-shadow:
                  0 16px 48px rgba(27,42,74,0.22),
                  0 4px 14px rgba(27,42,74,0.12),
                  inset 0 1px 0 rgba(255,255,255,0.9);
                transform: rotate(3deg);
                transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
                width: 230px;
                cursor: default;
              "
              onmouseenter="this.style.transform='rotate(1deg) scale(1.04)';this.style.boxShadow='0 24px 60px rgba(27,42,74,0.26),0 6px 18px rgba(27,42,74,0.14),inset 0 1px 0 rgba(255,255,255,0.9)'"
              onmouseleave="this.style.transform='rotate(3deg)';this.style.boxShadow='0 16px 48px rgba(27,42,74,0.22),0 4px 14px rgba(27,42,74,0.12),inset 0 1px 0 rgba(255,255,255,0.9)'"
              >
                <img
                  src="/assets/hero_cat_studio.png"
                  alt="Cat grooming at Pawfect"
                  style="
                    width:100%;
                    height:190px;
                    object-fit:cover;
                    object-position:center 15%;
                    border-radius:2px;
                    display:block;
                  "
                >
              </div>
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

      <!-- Why Choose Pawfect Section -->
      <section class="why-choose-section reveal">
        <div class="container">
          <div class="section-header" style="text-align:center;margin-bottom:0;">
            <h2 class="section-title section-title-animate">Why Choose Pawfect?</h2>
            <p class="section-subtitle section-subtitle-animate" style="max-width:520px;margin:10px auto 0;">
              Premium pet grooming made simple, safe and trusted across Ahmedabad.
            </p>
          </div>
          <div class="why-choose-grid">

            <!-- Card 1: Certified Groomers -->
            <div class="why-card">
              <div class="why-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div>
                <h3 class="why-card-title">Certified Groomers</h3>
                <p class="why-card-desc">Every partner salon is professionally verified and experienced before joining our platform.</p>
              </div>
            </div>

            <!-- Card 2: Verified Reviews -->
            <div class="why-card">
              <div class="why-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
              </div>
              <div>
                <h3 class="why-card-title">Verified Reviews</h3>
                <p class="why-card-desc">Only genuine customer reviews from real appointments — no fake ratings, ever.</p>
              </div>
            </div>

            <!-- Card 3: Doorstep Services -->
            <div class="why-card">
              <div class="why-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <h3 class="why-card-title">Doorstep Services</h3>
                <p class="why-card-desc">Book trusted home grooming for maximum convenience — we come to you.</p>
              </div>
            </div>

            <!-- Card 4: Premium Care -->
            <div class="why-card">
              <div class="why-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div>
                <h3 class="why-card-title">Premium Care</h3>
                <p class="why-card-desc">Luxury grooming products and gentle techniques designed for your pet's comfort.</p>
              </div>
            </div>

          </div>
        </div>
      </section>




      <!-- How Pawfect Works Section -->

      <section class="how-it-works-section reveal">
        <div class="container">
          <div class="how-it-works-grid">
            <div class="how-left">
              <h2 class="section-title" style="margin-bottom:8px;">Luxury Grooming,<br>Picked Up &amp; Delivered</h2>
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
            <h2 class="section-title">Pet Transformations</h2>
            <p class="section-subtitle" style="margin-top:10px;">Real transformations from Ahmedabad pet parents. Professional grooming, spa treatments and breed-specific styling.</p>
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
                  <img src="/assets/after_grooming.png" alt="Groomed Maltese After" draggable="false" loading="lazy">
                  <span class="label label-after">Groomed (After)</span>
                </div>
                
                <!-- Before Container -->
                <div class="before-img-container" id="before-container">
                  <img src="/assets/before_grooming.png" alt="Shaggy Maltese Before" draggable="false" loading="lazy">
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
          <div style="text-align:center;margin-bottom:var(--space-10);">
            <h2 class="section-title" style="margin-bottom:10px;">Featured Salons Nearby</h2>
            <p class="section-subtitle">Top-rated pet grooming salons trusted by Ahmedabad pet parents.</p>
            <div style="margin-top:var(--space-5);">
              <a href="/discover" class="btn btn-outline" data-link>View All Salons <i data-lucide="arrow-right" style="width:14px;height:14px;margin-left:4px;"></i></a>
            </div>
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

      <!-- FAQ Section -->
      <section class="faq-section reveal">
        <div class="container">
          <div class="section-header" style="text-align:center;margin-bottom:var(--space-10);">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <p class="section-subtitle" style="max-width:480px;margin:10px auto 0;">Everything you need to know about booking and grooming with Pawfect.</p>
          </div>
          <div class="faq-list" id="faq-list">

            <div class="faq-item">
              <button class="faq-trigger">
                How do I book a salon?
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-body"><div class="faq-body-inner">Browse our verified salons on the Discover page, select your preferred salon, choose a service package, and book directly from the salon's page. You'll receive a confirmation instantly.</div></div>
            </div>

            <div class="faq-item">
              <button class="faq-trigger">
                Can I cancel my appointment?
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-body"><div class="faq-body-inner">Yes, you can cancel or reschedule appointments up to 24 hours before the scheduled time from your Dashboard. Cancellations within 24 hours may be subject to salon-specific policies.</div></div>
            </div>

            <div class="faq-item">
              <button class="faq-trigger">
                Do salons provide home service?
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-body"><div class="faq-body-inner">Select partner salons on Pawfect offer doorstep grooming services across Ahmedabad. Look for the "Home Service" badge when browsing salons on the Discover page to filter for this option.</div></div>
            </div>

            <div class="faq-item">
              <button class="faq-trigger">
                How are salons verified?
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-body"><div class="faq-body-inner">Every salon on Pawfect undergoes a thorough verification process including license checks, groomer certifications, hygiene audits, and customer review verification before being listed on the platform.</div></div>
            </div>

            <div class="faq-item">
              <button class="faq-trigger">
                Which breeds are supported?
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-body"><div class="faq-body-inner">Pawfect supports all common dog and cat breeds — from Golden Retrievers and Labradors to Persian cats and Pomeranians. Our groomer network is trained for breed-specific styling and care.</div></div>
            </div>

            <div class="faq-item">
              <button class="faq-trigger">
                Can I book grooming for cats?
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-body"><div class="faq-body-inner">Absolutely! Many of our partner salons specialize in feline grooming. Look for the "Cat Friendly" tag when browsing the Discover page to find cat-specialist groomers near you.</div></div>
            </div>

          </div>
        </div>
      </section>

      <!-- Premium CTA Section &mdash; Two Column -->

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

    // ── FAQ Accordion ──────────────────────────────────────────
    container.querySelectorAll('.faq-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        container.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // ── Back To Top Button ─────────────────────────────────────
    let btt = document.getElementById('pawfect-btt');
    if (!btt) {
      btt = document.createElement('button');
      btt.id = 'pawfect-btt';
      btt.className = 'back-to-top';
      btt.setAttribute('aria-label', 'Back to top');
      btt.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
      document.body.appendChild(btt);
      btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    const bttScroll = () => {
      if (window.scrollY > 400) btt.classList.add('visible');
      else btt.classList.remove('visible');
    };
    window.addEventListener('scroll', bttScroll, { passive: true });
    window.addEventListener('route-changed', () => {
      window.removeEventListener('scroll', bttScroll);
      btt?.remove();
    }, { once: true });

    // ── Image Loading Fade ─────────────────────────────────────
    container.querySelectorAll('img').forEach(img => {
      if (img.complete) { img.classList.add('loaded'); }
      else {
        img.classList.add('loading');
        img.addEventListener('load', () => {
          img.classList.remove('loading');
          img.classList.add('loaded');
        }, { once: true });
      }
    });

    // ── Stagger Children IntersectionObserver ──────────────────
    const staggerEls = container.querySelectorAll('.stagger-children');
    if (staggerEls.length) {
      const staggerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            Array.from(entry.target.children).forEach((child, i) => {
              child.style.setProperty('--stagger-i', i);
            });
            entry.target.classList.add('in-view');
            staggerObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      staggerEls.forEach(el => staggerObs.observe(el));
    }

    // ── 3D Tilt on Why-Cards ────────────────────────────────────
    container.querySelectorAll('.why-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-8px) scale(1.01) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
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
