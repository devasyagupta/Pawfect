// ============================================================
// PAWFECT — Bud AI Makeover Wizard
// Multi-step premium onboarding experience
// ============================================================

import '../styles/makeover.css';
import { ChatPanel } from './chat-panel.js';

// ── Data ────────────────────────────────────────────────────
const BREEDS = [
  'Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'Pomeranian',
  'Beagle', 'Bulldog', 'French Bulldog', 'Poodle', 'Yorkshire Terrier',
  'Siberian Husky', 'Dachshund', 'Shih Tzu', 'Boxer', 'Dobermann',
  'Great Dane', 'Maltese', 'Chihuahua', 'Rottweiler', 'Border Collie',
  'Cocker Spaniel', 'Dalmation', 'Samoyed', 'Chow Chow', 'Akita',
  'Bichon Frise', 'Persian Cat', 'Maine Coon', 'Siamese Cat',
  'Bengal Cat', 'Scottish Fold', 'Ragdoll Cat', 'British Shorthair',
  'Abyssinian', 'Sphynx', 'Other Breed',
];

const COAT_OPTIONS = [
  { id: 'short',  label: 'Short',       icon: '🔷' },
  { id: 'long',   label: 'Long',        icon: '🌊' },
  { id: 'curly',  label: 'Curly',       icon: '🌀' },
  { id: 'wavy',   label: 'Wavy',        icon: '〰️' },
  { id: 'wiry',   label: 'Wiry',        icon: '🔗' },
  { id: 'double', label: 'Double Coat', icon: '🧥' },
];

const STYLE_OPTIONS = [
  { id: 'modern',  name: 'Modern Grooming',    desc: 'Clean lines, contemporary look',    bg: '/assets/gs_haircut.png'  },
  { id: 'breed',   name: 'Breed Standard',     desc: 'Classic, show-ready elegance',      bg: '/assets/gs_groomer_1.png'},
  { id: 'fluffy',  name: 'Fluffy & Adorable',  desc: 'Round, cute, teddy bear look',      bg: '/assets/after_grooming.png'},
  { id: 'low',     name: 'Low Maintenance',    desc: 'Easy care, practical fresh trim',   bg: '/assets/gs_bath.png'     },
  { id: 'luxury',  name: 'Luxury Spa Look',    desc: 'Premium full-service treatment',    bg: '/assets/gs_spa.png'      },
  { id: 'sporty',  name: 'Sporty & Athletic',  desc: 'Active, lightweight, easy-moving',  bg: '/assets/gs_blowdry.png'  },
];

// ── Recommendation engine ────────────────────────────────────
function generateRecommendation(state) {
  const { petName, breed, coatType, size, age, coatCondition, styles, season } = state;
  const name = petName || 'your pet';

  const styleMap = {
    fluffy:  { name: 'Teddy Bear Cut',      icon: '🧸', desc: 'Rounded, plush, irresistibly cute' },
    breed:   { name: 'Breed Standard Cut',  icon: '🏆', desc: 'Classic show-worthy elegance' },
    modern:  { name: 'Modern Layered Trim', icon: '✂️', desc: 'Contemporary, clean silhouette' },
    low:     { name: 'Short Practical Trim',icon: '🌿', desc: 'Easy care, fresh and neat' },
    luxury:  { name: 'Royal Spa Treatment', icon: '👑', desc: 'Full luxury experience' },
    sporty:  { name: 'Athletic Puppy Cut',  icon: '⚡', desc: 'Active, lightweight, easy-moving' },
  };

  const primaryId  = styles[0] || 'modern';
  const primary    = styleMap[primaryId] || { name: 'Classic Grooming', icon: '✨', desc: 'Timeless, clean and fresh' };

  const diffMap  = { short: 'Easy', long: 'Medium', curly: 'High', wavy: 'Medium', wiry: 'Medium', double: 'High' };
  const freqMap  = { short: 'Every 8–12 weeks', long: 'Every 6–8 weeks', curly: 'Every 4–6 weeks', wavy: 'Every 6–8 weeks', wiry: 'Every 6–8 weeks', double: 'Every 8–10 weeks' };
  const durMap   = { small: '45–60 min', medium: '1–1.5 hrs', large: '1.5–2.5 hrs', giant: '2–3 hrs' };

  const why = [
    `${name}'s ${coatType || 'beautiful'} coat and ${breed || 'unique breed'} characteristics make the ${primary.name} an ideal choice.`,
    age === 'puppy'  ? ' As a puppy, gentle grooming builds positive lifelong associations.' : '',
    (coatCondition === 'poor' || coatCondition === 'needs-grooming') ? ' A thorough conditioning treatment is recommended first given the current coat condition.' : '',
    season === 'summer'
      ? ' This lighter style will keep them cool and comfortable through the summer heat.'
      : ' This style provides natural warmth and insulation for the cooler months ahead.',
  ].join('');

  const addOns = ['Nail Trimming', 'Ear Cleaning', 'Coat Conditioning', 'Paw Balm'];
  if (styles.includes('luxury'))  addOns.push('Aromatherapy Rinse');
  if (coatType === 'double' || (breed && (breed.toLowerCase().includes('husky') || breed.toLowerCase().includes('retriever')))) addOns.push('De-shedding Treatment');
  if (coatCondition === 'poor')   addOns.push('Deep Repair Mask');

  const isLuxury  = styles.includes('luxury') || coatCondition === 'poor';
  const isPremium = styles.includes('breed')  || size === 'large' || size === 'giant';

  let pkg;
  if (isLuxury) {
    pkg = { name: 'Royal Spa Experience', price: '₹1,499+', badge: '✨ Premium Package',
            services: ['Full Bath & Blow Dry', 'Breed Specific Cut', 'Aromatherapy', 'Nail Art', 'Paw Massage', 'Ear Cleaning'] };
  } else if (isPremium) {
    pkg = { name: 'Premium Grooming', price: '₹1,099+', badge: '⭐ Recommended',
            services: ['Bath & Blow Dry', 'Custom Cut', 'Nail Trimming', 'Ear Cleaning', 'Coat Conditioning'] };
  } else {
    pkg = { name: 'Essential Bath & Trim', price: '₹899+', badge: '💚 Best Value',
            services: ['Bath & Blow Dry', 'Basic Trim', 'Nail Trimming', 'Ear Cleaning'] };
  }

  const brushFreq = (coatType === 'long' || coatType === 'curly') ? 'daily' : '2–3 times a week';
  const tips = [
    `Brush ${name} ${brushFreq} to keep the coat healthy and tangle-free.`,
    `Schedule grooming sessions ${freqMap[coatType] || 'every 6–8 weeks'} for best results.`,
    `Use pH-balanced, breed-appropriate shampoo suited to ${name}'s coat type.`,
    'Trim nails every 3–4 weeks to maintain healthy paw posture.',
    season === 'summer'
      ? 'Ensure fresh water and shade after grooming sessions in warm weather.'
      : 'Maintain coat length during cooler months for natural warmth.',
  ];

  return {
    styleName: primary.name,
    styleIcon: primary.icon,
    styleDesc: primary.desc,
    why,
    difficulty: diffMap[coatType]  || 'Medium',
    frequency:  freqMap[coatType]  || 'Every 6–8 weeks',
    duration:   durMap[size]       || '1–1.5 hrs',
    season:     season === 'summer' ? '☀️ Summer Ready' : '❄️ Winter Cozy',
    addOns:     addOns.slice(0, 6),
    package:    pkg,
    tips,
  };
}

// ── MakeoverWizard class ─────────────────────────────────────
export class MakeoverWizard {
  constructor(rootEl) {
    this.root        = rootEl;
    this.isOpen      = false;
    this.currentStep = 0; // 0 = home
    this.totalSteps  = 5;
    this._chatPanel  = null;
    this._panel      = null;
    this._contentEl  = null;
    this._progressEl = null;
    this._navEl      = null;

    this.state = {
      petName: '', breed: '', size: '', coatType: '',
      age: '', coatCondition: '', photo: null,
      styles: [], season: '', specialRequests: '',
    };

    this._build();
  }

  // ── Build panel skeleton ─────────────────────────────────
  _build() {
    this._panel = document.createElement('div');
    this._panel.className = 'whiskers-panel';

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'whiskers-panel-header';
    hdr.innerHTML = `
      <div class="whiskers-brand">
        <span class="whiskers-brand-paw">🐾</span> Bud
      </div>
      <button class="whiskers-close-btn" aria-label="Close">✕</button>
    `;
    hdr.querySelector('.whiskers-close-btn').addEventListener('click', () => this.close());
    this._panel.appendChild(hdr);

    // Progress (hidden on home)
    this._progressEl = document.createElement('div');
    this._progressEl.className = 'wk-progress-wrap';
    this._progressEl.style.display = 'none';
    this._panel.appendChild(this._progressEl);

    // Content area
    this._contentEl = document.createElement('div');
    this._contentEl.className = 'whiskers-content';
    this._panel.appendChild(this._contentEl);

    // Nav (hidden on home)
    this._navEl = document.createElement('div');
    this._navEl.className = 'wk-nav';
    this._navEl.style.display = 'none';
    this._panel.appendChild(this._navEl);

    this.root.appendChild(this._panel);
    this._showHome();
  }

  // ── Views ────────────────────────────────────────────────
  _showHome() {
    this.currentStep = 0;
    this._progressEl.style.display = 'none';
    this._navEl.style.display = 'none';
    this._contentEl.innerHTML = '';

    const home = document.createElement('div');
    home.className = 'wk-home';
    home.innerHTML = `
      <div class="wk-home-hero">
        <span class="wk-home-mascot">🐾</span>
        <div class="wk-home-title">Hi, I'm Bud! 👋</div>
        <div class="wk-home-tagline">Pawfect AI Style Guide</div>
        <p class="wk-home-desc">I help you discover the perfect grooming style for your pet and find the best salons in Ahmedabad.</p>
      </div>
      <div class="wk-option-cards">
        <div class="wk-option-card primary" id="wk-start-makeover">
          <div class="wk-option-icon">🐶</div>
          <div class="wk-option-body">
            <div class="wk-option-title">Give My Pet a Makeover</div>
            <div class="wk-option-sub">Upload your pet and receive personalized grooming style recommendations.</div>
            <div class="wk-option-cta">Start Makeover →</div>
          </div>
        </div>
        <div class="wk-option-card secondary" id="wk-open-chat">
          <div class="wk-option-icon">💬</div>
          <div class="wk-option-body">
            <div class="wk-option-title">Ask About Pawfect</div>
            <div class="wk-option-sub">Learn about grooming, pricing, breeds, appointments and services.</div>
            <div class="wk-option-cta">Ask Questions →</div>
          </div>
        </div>
      </div>
    `;

    this._contentEl.appendChild(home);
    home.querySelector('#wk-start-makeover').addEventListener('click', () => this._goTo(1));
    home.querySelector('#wk-open-chat').addEventListener('click', () => this._openChat());
  }

  _goTo(step, dir = 'fwd') {
    this.currentStep = step;
    this._updateProgress();
    this._contentEl.innerHTML = '';

    const animClass = dir === 'fwd' ? 'wk-enter' : 'wk-enter-back';

    switch (step) {
      case 1: this._step1(animClass); break;
      case 2: this._step2(animClass); break;
      case 3: this._step3(animClass); break;
      case 4: this._step4(animClass); break;
      case 5: this._step5(animClass); break;
    }

    this._updateNav();
    this._contentEl.scrollTop = 0;
  }

  // ── Progress ──────────────────────────────────────────────
  _updateProgress() {
    this._progressEl.style.display = 'block';
    const pct = (this.currentStep / this.totalSteps) * 100;
    this._progressEl.innerHTML = `
      <div class="wk-progress-meta">
        <span class="wk-progress-label">Step ${this.currentStep} of ${this.totalSteps}</span>
        <div class="wk-step-dots">
          ${Array.from({ length: this.totalSteps }, (_, i) => {
            const s = i + 1;
            const cls = s < this.currentStep ? 'done' : s === this.currentStep ? 'active' : '';
            return `<div class="wk-step-dot ${cls}"></div>`;
          }).join('')}
        </div>
      </div>
      <div class="wk-progress-track">
        <div class="wk-progress-fill" style="width:${pct}%"></div>
      </div>
    `;
  }

  // ── Nav bar ───────────────────────────────────────────────
  _updateNav() {
    this._navEl.style.display = 'flex';
    this._navEl.innerHTML = '';

    // Back button
    const back = document.createElement('button');
    back.className = 'wk-back';
    back.innerHTML = this.currentStep === 1 ? '← Home' : '← Back';
    back.addEventListener('click', () => {
      if (this.currentStep === 1) this._showHome();
      else this._goTo(this.currentStep - 1, 'bwd');
    });
    this._navEl.appendChild(back);

    // Continue button (step 5 manages its own buttons)
    if (this.currentStep < 5) {
      const cont = document.createElement('button');
      cont.className = 'wk-continue';
      cont.id = 'wk-continue';
      cont.innerHTML = this.currentStep === 4 ? 'Get My Style ✨' : 'Continue →';
      cont.disabled = !this._stepValid();
      cont.addEventListener('click', () => { if (!cont.disabled) this._goTo(this.currentStep + 1); });
      this._navEl.appendChild(cont);

      // Re-validate on any input
      this._contentEl.addEventListener('input', () => {
        const btn = document.getElementById('wk-continue');
        if (btn) btn.disabled = !this._stepValid();
      }, { passive: true });
    }
  }

  _stepValid() {
    const s = this.state;
    switch (this.currentStep) {
      case 1: return s.petName.trim().length > 0;
      case 2: return s.breed && s.size && s.coatType && s.age;
      case 3: return true; // photo optional
      case 4: return s.styles.length > 0;
      default: return true;
    }
  }

  _revalidate() {
    const btn = document.getElementById('wk-continue');
    if (btn) btn.disabled = !this._stepValid();
  }

  // ── STEP 1: Pet Name ──────────────────────────────────────
  _step1(anim) {
    const el = document.createElement('div');
    el.className = `wk-step ${anim}`;
    el.innerHTML = `
      <div class="wk-step-eyebrow">Step 1 of 5</div>
      <div class="wk-step-title">Hi! 😊<br>Let's start with<br>your furry friend.</div>
      <div class="wk-step-sub">What's your pet's name?</div>
      <div class="wk-field">
        <input class="wk-input" id="wk-petname" type="text" maxlength="40"
          placeholder="Enter your pet's name…"
          value="${this.state.petName}"
          style="font-size:18px;font-weight:700;">
      </div>
    `;
    this._contentEl.appendChild(el);
    const inp = el.querySelector('#wk-petname');
    inp.addEventListener('input', e => { this.state.petName = e.target.value; this._revalidate(); });
    setTimeout(() => inp.focus(), 180);
  }

  // ── STEP 2: Pet Details ───────────────────────────────────
  _step2(anim) {
    const name = this.state.petName || 'your pet';
    const el = document.createElement('div');
    el.className = `wk-step ${anim}`;
    el.innerHTML = `
      <div class="wk-step-eyebrow">Step 2 of 5</div>
      <div class="wk-step-title">Tell me about <span style="color:#E47D5D">${name}</span> 🐾</div>

      <div class="wk-field">
        <label class="wk-label">Breed</label>
        <div class="wk-breed-wrap">
          <input class="wk-input" id="wk-breed" placeholder="Search breed…" value="${this.state.breed}" autocomplete="off">
          <div class="wk-breed-dropdown" id="wk-bdrop" style="display:none;"></div>
        </div>
      </div>

      <div class="wk-field">
        <label class="wk-label">Size</label>
        <div class="wk-radio-group">
          ${['Small','Medium','Large','Giant'].map(s =>
            `<button class="wk-pill ${this.state.size === s.toLowerCase() ? 'selected' : ''}" data-group="size" data-val="${s.toLowerCase()}">${s}</button>`
          ).join('')}
        </div>
      </div>

      <div class="wk-field">
        <label class="wk-label">Coat Type</label>
        <div class="wk-coat-grid">
          ${COAT_OPTIONS.map(c =>
            `<div class="wk-coat-card ${this.state.coatType === c.id ? 'selected' : ''}" data-coat="${c.id}">
               <span class="wk-coat-icon">${c.icon}</span>
               <span class="wk-coat-label">${c.label}</span>
             </div>`
          ).join('')}
        </div>
      </div>

      <div class="wk-field">
        <label class="wk-label">Age</label>
        <div class="wk-radio-group">
          ${['Puppy','Adult','Senior'].map(a =>
            `<button class="wk-pill ${this.state.age === a.toLowerCase() ? 'selected' : ''}" data-group="age" data-val="${a.toLowerCase()}">${a}</button>`
          ).join('')}
        </div>
      </div>

      <div class="wk-field">
        <label class="wk-label">Current Coat Condition</label>
        <div class="wk-radio-group">
          ${[['Excellent','excellent'],['Good','good'],['Needs Grooming','needs-grooming'],['Poor','poor']].map(([l,v]) =>
            `<button class="wk-pill ${this.state.coatCondition === v ? 'selected' : ''}" data-group="coatCondition" data-val="${v}">${l}</button>`
          ).join('')}
        </div>
      </div>
    `;

    this._contentEl.appendChild(el);

    // Breed search
    const breedInp  = el.querySelector('#wk-breed');
    const breedDrop = el.querySelector('#wk-bdrop');

    const filterBreeds = q => {
      if (!q) { breedDrop.style.display = 'none'; return; }
      const matches = BREEDS.filter(b => b.toLowerCase().includes(q.toLowerCase())).slice(0, 8);
      if (!matches.length) { breedDrop.style.display = 'none'; return; }
      breedDrop.innerHTML = matches.map(b => `<div class="wk-breed-option">${b}</div>`).join('');
      breedDrop.style.display = 'block';
      breedDrop.querySelectorAll('.wk-breed-option').forEach(opt => {
        opt.addEventListener('click', () => {
          this.state.breed = opt.textContent;
          breedInp.value   = opt.textContent;
          breedDrop.style.display = 'none';
          this._revalidate();
        });
      });
    };

    breedInp.addEventListener('input', e => { this.state.breed = e.target.value; filterBreeds(e.target.value); });
    document.addEventListener('click', e => {
      if (!el.querySelector('.wk-breed-wrap').contains(e.target)) breedDrop.style.display = 'none';
    });

    // Pills
    el.querySelectorAll('.wk-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        el.querySelectorAll(`.wk-pill[data-group="${group}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.state[group] = btn.dataset.val;
        this._revalidate();
      });
    });

    // Coat cards
    el.querySelectorAll('.wk-coat-card').forEach(card => {
      card.addEventListener('click', () => {
        el.querySelectorAll('.wk-coat-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.state.coatType = card.dataset.coat;
        this._revalidate();
      });
    });
  }

  // ── STEP 3: Photo Upload ──────────────────────────────────
  _step3(anim) {
    const name = this.state.petName || 'your pet';
    const el   = document.createElement('div');
    el.className = `wk-step ${anim}`;

    el.innerHTML = `
      <div class="wk-step-eyebrow">Step 3 of 5</div>
      <div class="wk-step-title">Now let me meet<br><span style="color:#E47D5D">${name}</span>! 📸</div>
      <div class="wk-step-sub">Upload a photo for a personalized style analysis. (Optional but recommended!)</div>

      <div class="wk-upload-area" id="wk-uarea">
        <span class="wk-upload-emoji">📸</span>
        <div class="wk-upload-title">Drop a photo here</div>
        <div class="wk-upload-hint">JPG, PNG, HEIC — up to 10 MB</div>
        <div class="wk-upload-btns">
          <button class="wk-upload-btn prim" id="wk-upbtn">📸 Upload Photo</button>
          <button class="wk-upload-btn sec" id="wk-cambtn">📷 Take Photo</button>
        </div>
        <input type="file" id="wk-fileinp" accept="image/*" style="display:none">
        <input type="file" id="wk-caminp" accept="image/*" capture="environment" style="display:none">
      </div>

      <div class="wk-preview" id="wk-preview">
        <img id="wk-pimg" src="" alt="${name} photo preview">
        <div class="wk-preview-overlay" id="wk-overlay">
          <div class="wk-analysis-title">✨ Analyzing ${name}…</div>
          <ul class="wk-analysis-list">
            <li class="wk-analysis-item"><span class="wk-analysis-check">✓</span> Analyzing face</li>
            <li class="wk-analysis-item"><span class="wk-analysis-check">✓</span> Detecting coat type</li>
            <li class="wk-analysis-item"><span class="wk-analysis-check">✓</span> Identifying breed</li>
            <li class="wk-analysis-item"><span class="wk-analysis-check">✓</span> Measuring proportions</li>
            <li class="wk-analysis-item"><span class="wk-analysis-check">✓</span> Estimating fur length</li>
          </ul>
        </div>
      </div>

      <div style="margin-top:16px;text-align:center;">
        <div style="font-size:11px;color:#9BAAB8;margin-bottom:8px;">Need help? Try a sample:</div>
        <div class="wk-sample-row">
          <img class="wk-sample-thumb" src="/assets/hero_golden_retriever.png" alt="Sample dog">
          <img class="wk-sample-thumb" src="/assets/hero_cat_studio.png" alt="Sample cat">
          <img class="wk-sample-thumb" src="/assets/paw_dog_cat.png" alt="Sample pets">
        </div>
      </div>
    `;

    this._contentEl.appendChild(el);

    const uarea   = el.querySelector('#wk-uarea');
    const preview = el.querySelector('#wk-preview');
    const pimg    = el.querySelector('#wk-pimg');
    const overlay = el.querySelector('#wk-overlay');
    const items   = el.querySelectorAll('.wk-analysis-item');

    const runAnalysis = (src) => {
      this.state.photo = src;
      pimg.src         = src;
      uarea.style.display = 'none';
      preview.classList.add('visible');

      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('done'), 300 + i * 420);
      });

      setTimeout(() => {
        overlay.innerHTML = `
          <div style="font-size:28px">✅</div>
          <div class="wk-analysis-title">Analysis Complete!</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.72);">Ready for style recommendations</div>
        `;
      }, 300 + items.length * 420 + 200);
    };

    const handleFile = file => {
      if (!file?.type?.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => runAnalysis(e.target.result);
      reader.readAsDataURL(file);
    };

    el.querySelector('#wk-upbtn').addEventListener('click', () => el.querySelector('#wk-fileinp').click());
    el.querySelector('#wk-cambtn').addEventListener('click', () => el.querySelector('#wk-caminp').click());
    el.querySelector('#wk-fileinp').addEventListener('change', e => handleFile(e.target.files[0]));
    el.querySelector('#wk-caminp').addEventListener('change',  e => handleFile(e.target.files[0]));

    uarea.addEventListener('dragover',  e => { e.preventDefault(); uarea.classList.add('dragover'); });
    uarea.addEventListener('dragleave', () => uarea.classList.remove('dragover'));
    uarea.addEventListener('drop',      e => { e.preventDefault(); uarea.classList.remove('dragover'); handleFile(e.dataTransfer.files[0]); });

    el.querySelectorAll('.wk-sample-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => runAnalysis(thumb.src));
    });

    // Restore state if already uploaded
    if (this.state.photo) {
      pimg.src = this.state.photo;
      uarea.style.display = 'none';
      preview.classList.add('visible');
      overlay.innerHTML = `<div style="font-size:28px">✅</div><div class="wk-analysis-title">Photo Ready!</div>`;
    }
  }

  // ── STEP 4: Style Selection ───────────────────────────────
  _step4(anim) {
    const name = this.state.petName || 'your pet';
    const el   = document.createElement('div');
    el.className = `wk-step ${anim}`;

    el.innerHTML = `
      <div class="wk-step-eyebrow">Step 4 of 5</div>
      <div class="wk-step-title">How would you like<br><span style="color:#E47D5D">${name}</span> to look?</div>
      <div class="wk-step-sub">Select one or more styles you love.</div>

      <div class="wk-style-grid">
        ${STYLE_OPTIONS.map(s => `
          <div class="wk-style-card ${this.state.styles.includes(s.id) ? 'selected' : ''}" data-sid="${s.id}">
            <div class="wk-style-bg" style="background-image:url(${s.bg})"></div>
            <div class="wk-style-overlay"></div>
            <div class="wk-style-check">✓</div>
            <div class="wk-style-body">
              <div class="wk-style-name">${s.name}</div>
              <div class="wk-style-desc">${s.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="wk-field">
        <label class="wk-label">Season</label>
        <div class="wk-radio-group">
          <button class="wk-pill ${this.state.season === 'summer' ? 'selected' : ''}" data-group="season" data-val="summer">☀️ Summer Ready</button>
          <button class="wk-pill ${this.state.season === 'winter' ? 'selected' : ''}" data-group="season" data-val="winter">❄️ Winter Cozy</button>
        </div>
      </div>

      <div class="wk-field">
        <label class="wk-label">Special Requests <span style="font-weight:400;text-transform:none;color:#9BAAB8;">(optional)</span></label>
        <textarea class="wk-textarea" id="wk-special" maxlength="300"
          placeholder="e.g. Teddy Bear Cut, Lion Mane, Trim only ears, Round face, Leave tail fluffy…">${this.state.specialRequests}</textarea>
      </div>
    `;

    this._contentEl.appendChild(el);

    // Style card multi-select
    el.querySelectorAll('.wk-style-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.sid;
        if (this.state.styles.includes(id)) {
          this.state.styles = this.state.styles.filter(s => s !== id);
          card.classList.remove('selected');
        } else {
          this.state.styles.push(id);
          card.classList.add('selected');
        }
        this._revalidate();
      });
    });

    // Season pills
    el.querySelectorAll('.wk-pill[data-group="season"]').forEach(btn => {
      btn.addEventListener('click', () => {
        el.querySelectorAll('.wk-pill[data-group="season"]').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.state.season = btn.dataset.val;
      });
    });

    // Special requests
    el.querySelector('#wk-special').addEventListener('input', e => { this.state.specialRequests = e.target.value; });
  }

  // ── STEP 5: Loading + Result ──────────────────────────────
  _step5(anim) {
    this._navEl.style.display = 'none';

    const STEPS = [
      'Reading pet profile…',
      'Analyzing coat characteristics…',
      'Matching grooming styles…',
      'Calculating recommendations…',
      'Preparing your style guide…',
    ];

    const loader = document.createElement('div');
    loader.className = 'wk-loading';
    loader.innerHTML = `
      <div class="wk-loading-paw">🐾</div>
      <div class="wk-loading-title">Generating your perfect makeover…</div>
      <div class="wk-loading-sub">Bud is working his magic ✨</div>
      <div class="wk-loading-steps">
        ${STEPS.map((s, i) => `
          <div class="wk-lstep" id="wk-ls${i}">
            <div class="wk-lstep-dot">${i + 1}</div>
            <span>${s}</span>
          </div>
        `).join('')}
      </div>
    `;

    this._contentEl.appendChild(loader);

    STEPS.forEach((_, i) => {
      setTimeout(() => {
        const cur  = document.getElementById(`wk-ls${i}`);
        const prev = i > 0 ? document.getElementById(`wk-ls${i - 1}`) : null;
        if (cur) cur.classList.add('active');
        if (prev) { prev.classList.remove('active'); prev.classList.add('done'); prev.querySelector('.wk-lstep-dot').textContent = '✓'; }
      }, i * 500);
    });

    const totalMs = STEPS.length * 500 + 500;
    setTimeout(() => {
      // Mark last done
      const last = document.getElementById(`wk-ls${STEPS.length - 1}`);
      if (last) { last.classList.add('done'); last.querySelector('.wk-lstep-dot').textContent = '✓'; }

      setTimeout(() => {
        this._contentEl.innerHTML = '';
        this._showResult();
      }, 350);
    }, totalMs);
  }

  _showResult() {
    const rec  = generateRecommendation(this.state);
    const name = this.state.petName || 'your pet';

    const el = document.createElement('div');
    el.className = 'wk-result';
    el.innerHTML = `
      <div class="wk-result-hero">
        <span class="wk-result-icon">${rec.styleIcon}</span>
        <div class="wk-result-title">Perfect Style Found!</div>
        <div class="wk-result-sub">Based on ${name}'s breed, coat, age and preferences…</div>
      </div>

      <!-- Main recommendation -->
      <div class="wk-rec-card">
        <div class="wk-rec-style-row">
          <span class="wk-rec-style-icon">${rec.styleIcon}</span>
          <div>
            <div class="wk-rec-style-name">${rec.styleName}</div>
            <div class="wk-rec-style-desc">${rec.styleDesc}</div>
          </div>
        </div>
        <div class="wk-rec-why">${rec.why}</div>
        <div class="wk-rec-stats">
          <div class="wk-rec-stat"><div class="wk-rec-stat-label">Maintenance</div><div class="wk-rec-stat-value">${rec.difficulty}</div></div>
          <div class="wk-rec-stat"><div class="wk-rec-stat-label">Frequency</div><div class="wk-rec-stat-value">${rec.frequency}</div></div>
          <div class="wk-rec-stat"><div class="wk-rec-stat-label">Session Duration</div><div class="wk-rec-stat-value">${rec.duration}</div></div>
          <div class="wk-rec-stat"><div class="wk-rec-stat-label">Best Season</div><div class="wk-rec-stat-value">${rec.season}</div></div>
        </div>
        <div class="wk-label" style="margin-bottom:8px;">Suggested Add-ons</div>
        <div class="wk-addons">${rec.addOns.map(a => `<span class="wk-addon">✓ ${a}</span>`).join('')}</div>
      </div>

      <!-- Package -->
      <div class="wk-package">
        <div class="wk-pkg-badge">${rec.package.badge}</div>
        <div class="wk-pkg-name">${rec.package.name}</div>
        <div class="wk-pkg-price">${rec.package.price} <span style="font-size:13px;font-weight:400;opacity:0.6;">/ session</span></div>
        <div class="wk-pkg-services">${rec.package.services.map(s => `<span class="wk-pkg-service">✓ ${s}</span>`).join('')}</div>
        <a href="/discover" class="wk-pkg-book" id="wk-book-now" data-link>📅 Book Now — ${rec.package.price}</a>
      </div>

      <!-- Tips -->
      <div class="wk-tips">
        <div class="wk-tips-title">💡 Care Tips for ${name}</div>
        ${rec.tips.map(t => `<div class="wk-tip"><div class="wk-tip-dot"></div><span>${t}</span></div>`).join('')}
      </div>

      <!-- Final buttons -->
      <div class="wk-final-btns">
        <a href="/discover" class="wk-btn wk-btn-primary" id="wk-book-appt" data-link>📅 Book Appointment</a>
        <button class="wk-btn wk-btn-ghost" id="wk-restart">🔄 Start Again</button>
        <button class="wk-btn wk-btn-ghost" id="wk-chat-q">💬 Chat with Bud</button>
      </div>
    `;

    this._contentEl.appendChild(el);

    // Wire buttons
    el.querySelector('#wk-restart').addEventListener('click', () => {
      this.state = { petName:'', breed:'', size:'', coatType:'', age:'', coatCondition:'', photo:null, styles:[], season:'', specialRequests:'' };
      this._showHome();
    });

    el.querySelector('#wk-chat-q').addEventListener('click', () => this._openChat());

    // SPA-aware link handling
    el.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.close();
        // Trigger router via history push + popstate
        history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    });
  }

  // ── Chat fallback ─────────────────────────────────────────
  _openChat() {
    this.close();
    if (!this._chatPanel) {
      const chatRoot = document.createElement('div');
      chatRoot.id = 'pawfect-chat-fallback';
      chatRoot.style.cssText = 'position:fixed;bottom:108px;right:24px;z-index:9001;';
      document.body.appendChild(chatRoot);
      this._chatPanel = new ChatPanel(chatRoot);
    }
    this._chatPanel.open();
  }

  // ── Public API ────────────────────────────────────────────
  open()   { this.isOpen = true;  this._panel.classList.add('open'); }
  close()  { this.isOpen = false; this._panel.classList.remove('open'); this.root.classList.remove('chat-open'); }
  toggle() { this.isOpen ? this.close() : this.open(); }
}
