// ============================================
// PAWFECT — Pet Profile Page (Data-Driven)
// No hardcoded data. All content from localStorage.
// ============================================

import { ScrollReveal } from '../utils/scroll-reveal.js';
import { auth, showToast } from '../utils/auth.js';

// ─── Pet type emoji map ───────────────────────────────────────
const PET_EMOJI = {
  Dog: '🐕', Cat: '🐈', Rabbit: '🐇', Bird: '🐦',
  Hamster: '🐹', Fish: '🐟', Other: '🐾',
};

const SPECIES_OPTIONS = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Hamster', 'Fish', 'Other'];
const GENDER_OPTIONS = ['Male', 'Female'];
const VAX_OPTIONS = ['Fully Vaccinated', 'Partially Vaccinated', 'Not Vaccinated', 'Unknown'];

// ─── localStorage helpers ─────────────────────────────────────
function getPets(userId) {
  try { return JSON.parse(localStorage.getItem(`pawfect_pets_${userId}`) || '[]'); }
  catch { return []; }
}

function savePets(userId, pets) {
  localStorage.setItem(`pawfect_pets_${userId}`, JSON.stringify(pets));
}

function getBookings(userId) {
  try { return JSON.parse(localStorage.getItem(`pawfect_bookings_${userId}`) || '[]'); }
  catch { return []; }
}

// ─── Age calculation from DOB ─────────────────────────────────
function calcAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  const totalMonths = years * 12 + months;
  if (totalMonths < 1) return 'Less than 1 month';
  if (totalMonths < 12) return `${totalMonths} month${totalMonths !== 1 ? 's' : ''} old`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return m > 0 ? `${y} yr ${m} mo old` : `${y} year${y !== 1 ? 's' : ''} old`;
}

// ─── Unique ID ────────────────────────────────────────────────
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ─── Render: single pet card ──────────────────────────────────
function renderPetCard(pet) {
  const age = calcAge(pet.dob);
  const emoji = pet.photoEmoji || PET_EMOJI[pet.species] || '🐾';
  const vaxBadge = pet.vaccinationStatus === 'Fully Vaccinated'
    ? `<span class="pp-badge pp-badge-vax">✓ Vaccinated</span>`
    : pet.vaccinationStatus && pet.vaccinationStatus !== 'Unknown'
    ? `<span class="pp-badge pp-badge-partial">${pet.vaccinationStatus}</span>`
    : '';

  return `
    <div class="pp-pet-card" data-pet-id="${pet.id}">
      <div class="pp-pet-card-avatar" style="background:linear-gradient(135deg,var(--coral-bg),rgba(201,160,85,0.08));">
        ${pet.photo
          ? `<img src="${pet.photo}" alt="${pet.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`
          : `<span style="font-size:2.8rem;line-height:1;">${emoji}</span>`}
      </div>
      <div class="pp-pet-card-body">
        <div class="pp-pet-card-top">
          <div>
            <h3 class="pp-pet-name">${pet.name}</h3>
            <div class="pp-pet-meta-row">
              ${pet.species ? `<span class="pp-meta-chip">${emoji} ${pet.species}</span>` : ''}
              ${pet.breed ? `<span class="pp-meta-chip">${pet.breed}</span>` : ''}
              ${pet.gender ? `<span class="pp-meta-chip">${pet.gender}</span>` : ''}
              ${age ? `<span class="pp-meta-chip">🎂 ${age}</span>` : ''}
              ${pet.weight ? `<span class="pp-meta-chip">⚖️ ${pet.weight} kg</span>` : ''}
            </div>
          </div>
          <div class="pp-pet-actions">
            ${vaxBadge}
            <button class="pp-btn-icon pp-edit-btn" data-pet-id="${pet.id}" aria-label="Edit pet" title="Edit">
              <i data-lucide="edit-3" style="width:15px;height:15px;"></i>
            </button>
            <button class="pp-btn-icon pp-delete-btn" data-pet-id="${pet.id}" aria-label="Delete pet" title="Delete">
              <i data-lucide="trash-2" style="width:15px;height:15px;"></i>
            </button>
          </div>
        </div>

        ${pet.notes || pet.medicalConditions || pet.allergies || pet.behaviourNotes || pet.groomingStyle
          ? `<div class="pp-pet-notes-grid">
            ${pet.medicalConditions ? `<div class="pp-pet-note-item"><span class="pp-note-label">Medical</span><span class="pp-note-val">${pet.medicalConditions}</span></div>` : ''}
            ${pet.allergies ? `<div class="pp-pet-note-item"><span class="pp-note-label">Allergies</span><span class="pp-note-val">${pet.allergies}</span></div>` : ''}
            ${pet.behaviourNotes ? `<div class="pp-pet-note-item"><span class="pp-note-label">Behaviour</span><span class="pp-note-val">${pet.behaviourNotes}</span></div>` : ''}
            ${pet.groomingStyle ? `<div class="pp-pet-note-item"><span class="pp-note-label">Grooming style</span><span class="pp-note-val">${pet.groomingStyle}</span></div>` : ''}
            ${pet.notes ? `<div class="pp-pet-note-item"><span class="pp-note-label">Notes</span><span class="pp-note-val">${pet.notes}</span></div>` : ''}
          </div>`
          : ''}
      </div>
    </div>
  `;
}

// ─── Render: grooming history for a pet ──────────────────────
function renderGroomingHistory(petName, bookings) {
  const past = bookings.filter(b => {
    const isSamePet = b.petName === petName;
    const isPast = new Date(b.date) < new Date();
    return isSamePet && isPast;
  });

  if (!past.length) {
    return `
      <div class="pp-history-empty">
        <div style="font-size:2rem;margin-bottom:8px;">🕐</div>
        <p>No grooming history yet.<br><span style="color:var(--text-tertiary);font-size:var(--text-xs);">Completed appointments will appear here.</span></p>
      </div>
    `;
  }

  return past.map(b => {
    const d = new Date(b.date);
    const dateLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    return `
      <div class="pp-history-item">
        <div class="pp-history-dot"></div>
        <div class="pp-history-date">${dateLabel}</div>
        <div class="pp-history-card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <h5 style="font-size:var(--text-sm);font-weight:var(--weight-bold);">${b.salonName || 'Grooming Session'}</h5>
            <span class="badge badge-success">Completed</span>
          </div>
          ${b.service ? `<p style="font-size:var(--text-xs);color:var(--text-secondary);margin-top:4px;">${b.service}</p>` : ''}
        </div>
      </div>`;
  }).join('');
}

// ─── Build Add/Edit Pet Modal HTML ───────────────────────────
function buildPetModal(pet = null) {
  const isEdit = !!pet;
  const title = isEdit ? `Edit ${pet.name}` : 'Add New Pet';
  const btnLabel = isEdit ? 'Save Changes' : 'Add Pet';

  return `
    <div class="pp-modal-backdrop" id="pp-modal-backdrop"></div>
    <div class="pp-modal" id="pp-pet-modal" role="dialog" aria-modal="true" aria-label="${title}" style="overflow-y:hidden; max-height: 90vh;">
      <button class="pp-modal-close" id="pp-modal-close" aria-label="Close">
        <i data-lucide="x" style="width:18px;height:18px;"></i>
      </button>

      <div class="pp-modal-header" style="text-align: center; margin-bottom: 0;">
        <div class="pp-modal-title-icon" style="font-size: 2.2rem; line-height: 1; margin-bottom: 8px;">🐾</div>
        <h2 class="pp-modal-title" style="margin-bottom: 4px;">${title}</h2>
        
        <!-- Step progress indicator -->
        <div class="pet-modal-steps" style="display:flex; align-items:center; justify-content:center; gap:var(--space-6); margin: var(--space-4) 0 0;">
          <div class="pet-modal-step active" data-pet-step="1" style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:bold; color:var(--coral); transition: all 0.3s;">
            <span class="step-num" style="width:22px; height:22px; border-radius:50%; background:var(--coral); color:white; display:flex; align-items:center; justify-content:center; font-size:10px; border:1px solid var(--coral); transition: all 0.3s;">1</span>
            <span>Basic Info</span>
          </div>
          <div class="pet-modal-step-line" style="flex:1; height:2px; min-width:40px; max-width:60px; background:var(--border-primary); transition: all 0.3s;"></div>
          <div class="pet-modal-step" data-pet-step="2" style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:bold; color:var(--text-tertiary); transition: all 0.3s;">
            <span class="step-num" style="width:22px; height:22px; border-radius:50%; background:var(--bg-secondary); border:1px solid var(--border-primary); color:var(--text-tertiary); display:flex; align-items:center; justify-content:center; font-size:10px; transition: all 0.3s;">2</span>
            <span>Health &amp; Prefs</span>
          </div>
        </div>
      </div>

      <form class="pp-modal-form" id="pp-pet-form" novalidate style="display:flex; flex-direction:column; overflow:hidden; gap:0; height:100%;">
        <input type="hidden" id="pp-pet-id" value="${isEdit ? pet.id : ''}">

        <!-- Scrollable fields container -->
        <div class="pp-modal-scrollable-fields" style="flex:1; overflow-y:auto; padding: var(--space-4) var(--space-2); max-height: 52vh;">
          
          <!-- Step 1: Basic Info -->
          <div class="pet-form-step" data-step-content="1">
            
            <!-- Photo upload (Circular avatar style) -->
            <div class="pp-form-field" style="margin-bottom:var(--space-5); text-align:center;">
              <div class="pp-photo-upload" id="pp-photo-zone" style="position:relative; width: 100px; height: 100px; border-radius: 50%; border: 2px dashed var(--border-primary); margin: 0 auto; display: flex; align-items: center; justify-content: center; background: var(--bg-secondary); overflow: hidden; transition: all var(--transition-fast); cursor:pointer;">
                <div class="upload-hover-overlay" style="position: absolute; inset: 0; background: rgba(228, 125, 93, 0.08); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity var(--transition-fast);">
                  <i data-lucide="camera" style="width: 20px; height: 20px; color: var(--coral);"></i>
                </div>
                <div class="pp-photo-preview" id="pp-photo-preview" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                  ${isEdit && pet.photo
                    ? `<img src="${pet.photo}" alt="Pet photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
                    : `<div class="pp-photo-placeholder" style="display:flex; flex-direction:column; align-items:center; gap:2px; color:var(--text-tertiary);">
                        <span style="font-size: 1.5rem; line-height: 1; filter: grayscale(1) opacity(0.5);">🐾</span>
                        <span style="font-size: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.04em;">Upload</span>
                       </div>`}
                </div>
                <input type="file" id="pp-photo-input" accept="image/*" style="display:none;">
              </div>
              <p style="font-size:10px;color:var(--text-tertiary);margin-top:6px;margin-bottom:0;">JPG, PNG or WebP • Max 2MB</p>
            </div>

            <!-- Row 1: Name + Species -->
            <div class="pp-form-row">
              <div class="pp-form-field">
                <label class="pp-form-label" for="pp-name">Pet Name *</label>
                <input class="pp-form-input" type="text" id="pp-name" placeholder="e.g. Rocky"
                  value="${isEdit ? pet.name : ''}" required autocomplete="off">
              </div>
              <div class="pp-form-field">
                <label class="pp-form-label" for="pp-species">Species *</label>
                <select class="pp-form-input" id="pp-species" required>
                  <option value="">Select species…</option>
                  ${SPECIES_OPTIONS.map(s =>
                    `<option value="${s}" ${isEdit && pet.species === s ? 'selected' : ''}>${s}</option>`
                  ).join('')}
                </select>
              </div>
            </div>

            <!-- Row 2: Breed + Gender -->
            <div class="pp-form-row">
              <div class="pp-form-field">
                <label class="pp-form-label" for="pp-breed">Breed <span class="pp-optional">(optional)</span></label>
                <input class="pp-form-input" type="text" id="pp-breed" placeholder="e.g. Labrador"
                  value="${isEdit ? pet.breed || '' : ''}" autocomplete="off">
              </div>
              <div class="pp-form-field">
                <label class="pp-form-label" for="pp-gender">Gender</label>
                <select class="pp-form-input" id="pp-gender">
                  <option value="">Not specified</option>
                  ${GENDER_OPTIONS.map(g =>
                    `<option value="${g}" ${isEdit && pet.gender === g ? 'selected' : ''}>${g}</option>`
                  ).join('')}
                </select>
              </div>
            </div>

            <!-- Row 3: DOB + Weight -->
            <div class="pp-form-row">
              <div class="pp-form-field">
                <label class="pp-form-label" for="pp-dob">Date of Birth</label>
                <input class="pp-form-input" type="date" id="pp-dob"
                  value="${isEdit ? pet.dob || '' : ''}" max="${new Date().toISOString().split('T')[0]}">
              </div>
              <div class="pp-form-field">
                <label class="pp-form-label" for="pp-weight">Weight (kg)</label>
                <input class="pp-form-input" type="number" id="pp-weight" placeholder="e.g. 12.5"
                  value="${isEdit ? pet.weight || '' : ''}" min="0" max="200" step="0.1">
              </div>
            </div>

          </div>

          <!-- Step 2: Health & Preferences -->
          <div class="pet-form-step" style="display:none;" data-step-content="2">
            
            <!-- Vaccination -->
            <div class="pp-form-field">
              <label class="pp-form-label" for="pp-vax">Vaccination Status</label>
              <select class="pp-form-input" id="pp-vax">
                <option value="">Not specified</option>
                ${VAX_OPTIONS.map(v =>
                  `<option value="${v}" ${isEdit && pet.vaccinationStatus === v ? 'selected' : ''}>${v}</option>`
                ).join('')}
              </select>
            </div>

            <!-- Medical Conditions -->
            <div class="pp-form-field">
              <label class="pp-form-label" for="pp-medical">Medical Conditions</label>
              <textarea class="pp-form-input pp-form-textarea" id="pp-medical" placeholder="e.g. Hip dysplasia, Skin allergy…" rows="2">${isEdit ? pet.medicalConditions || '' : ''}</textarea>
            </div>

            <!-- Allergies -->
            <div class="pp-form-field">
              <label class="pp-form-label" for="pp-allergies">Allergies</label>
              <textarea class="pp-form-input pp-form-textarea" id="pp-allergies" placeholder="e.g. Dust, certain shampoos…" rows="2">${isEdit ? pet.allergies || '' : ''}</textarea>
            </div>

            <!-- Behaviour Notes -->
            <div class="pp-form-field">
              <label class="pp-form-label" for="pp-behaviour">Behaviour Notes</label>
              <textarea class="pp-form-input pp-form-textarea" id="pp-behaviour" placeholder="e.g. Nervous around dryers, loves treats…" rows="2">${isEdit ? pet.behaviourNotes || '' : ''}</textarea>
            </div>

            <!-- Preferred Grooming Style -->
            <div class="pp-form-field">
              <label class="pp-form-label" for="pp-grooming">Preferred Grooming Style</label>
              <input class="pp-form-input" type="text" id="pp-grooming" placeholder="e.g. Short trim, feathering kept…"
                value="${isEdit ? pet.groomingStyle || '' : ''}">
            </div>

            <!-- Special Notes -->
            <div class="pp-form-field">
              <label class="pp-form-label" for="pp-notes">Special Notes</label>
              <textarea class="pp-form-input pp-form-textarea" id="pp-notes" placeholder="Anything else the groomer should know…" rows="2">${isEdit ? pet.notes || '' : ''}</textarea>
            </div>

          </div>

        </div>

        <!-- Sticky Footer Buttons -->
        <div class="pp-form-actions" style="margin-top:auto; padding-top:var(--space-4); border-top:1px solid var(--border-secondary); flex-shrink:0; display:flex; justify-content:space-between; width: 100%;">
          <button type="button" class="btn btn-outline" id="pp-modal-back" style="display:none;">← Back</button>
          <button type="button" class="btn btn-outline" id="pp-modal-cancel">Cancel</button>
          
          <button type="button" class="btn btn-primary" id="pp-modal-next">Next Step →</button>
          <button type="submit" class="btn btn-primary" id="pp-form-submit" style="display:none;">
            <i data-lucide="save" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i>
            ${btnLabel}
          </button>
        </div>
      </form>
    </div>
  `;
}

// ─── Main render function ─────────────────────────────────────
export async function renderPetProfile(container, params) {

  const user = auth.getCurrentUser();

  // Auth guard
  if (!user) {
    container.innerHTML = `
      <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;">
        <div style="text-align:center;max-width:400px;">
          <div style="font-size:3rem;margin-bottom:16px;">🔒</div>
          <h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:8px;">Sign In Required</h2>
          <p style="color:var(--text-secondary);margin-bottom:24px;">Please sign in to manage your pet profiles.</p>
          <a href="/login" class="btn btn-primary" data-link>Sign In</a>
          <a href="/signup" class="btn btn-secondary" data-link style="margin-left:12px;">Create Account</a>
        </div>
      </div>
    `;
    setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
    return;
  }

  const userId = user.email;
  let pets = getPets(userId);
  const bookings = getBookings(userId);

  // ── Build page ──
  function renderPage() {
    pets = getPets(userId); // always fresh

    const hasHistory = (petName) => bookings.some(b => b.petName === petName && new Date(b.date) < new Date());

    const pageHTML = `
      <div class="pp-page container" style="margin-top:96px;padding-bottom:var(--space-16);">

        <!-- Page header -->
        <div class="pp-page-header">
          <div>
            <span class="section-label">🐾 Your Pets</span>
            <h1 style="font-size:clamp(1.5rem,4vw,2.2rem);font-weight:var(--weight-extrabold);margin-top:4px;">My Pet Profiles</h1>
            <p style="color:var(--text-secondary);font-size:var(--text-sm);margin-top:4px;">
              ${pets.length > 0
                ? `${pets.length} pet${pets.length > 1 ? 's' : ''} registered. Click a pet to view details and grooming history.`
                : 'Add your pets to manage their profiles and track grooming history.'}
            </p>
          </div>
          <button class="btn btn-primary" id="btn-add-pet-top">
            <i data-lucide="plus" style="width:15px;height:15px;"></i>
            Add Pet
          </button>
        </div>

        <!-- Pets grid or empty state -->
        ${pets.length === 0
          ? `<div class="pp-empty-state">
              <div class="pp-empty-icon">🐾</div>
              <h3 class="pp-empty-title">No pets added yet</h3>
              <p class="pp-empty-sub">Add your first pet to start booking grooming services and tracking their health history.</p>
              <button class="btn btn-primary btn-lg" id="btn-add-pet-empty">
                <i data-lucide="plus" style="width:16px;height:16px;"></i>
                Add Your First Pet
              </button>
            </div>`
          : `<div class="pp-pets-list" id="pp-pets-list">
              ${pets.map(pet => `
                <div class="pp-pet-section">
                  ${renderPetCard(pet)}

                  <!-- Grooming history for this pet -->
                  <div class="pp-pet-history-section">
                    <h4 class="pp-history-heading">
                      <i data-lucide="clock" style="width:14px;height:14px;color:var(--coral);"></i>
                      Grooming History
                    </h4>
                    <div class="pp-history-timeline">
                      ${renderGroomingHistory(pet.name, bookings)}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>`}

        <!-- Modal container (injected dynamically) -->
        <div id="pp-modal-container"></div>
      </div>
    `;

    container.innerHTML = pageHTML;

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
      ScrollReveal.init();
      bindEvents();
    }, 50);
  }

  // ── Open modal ──
  function openModal(pet = null) {
    const modalContainer = container.querySelector('#pp-modal-container');
    if (!modalContainer) return;
    modalContainer.innerHTML = buildPetModal(pet);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();

      // Animate in
      const modal = modalContainer.querySelector('#pp-pet-modal');
      const backdrop = modalContainer.querySelector('#pp-modal-backdrop');
      requestAnimationFrame(() => {
        backdrop?.classList.add('open');
        modal?.classList.add('open');
      });

      // Photo upload
      const photoZone = modalContainer.querySelector('#pp-photo-zone');
      const photoInput = modalContainer.querySelector('#pp-photo-input');
      const photoPreview = modalContainer.querySelector('#pp-photo-preview');

      photoZone?.addEventListener('click', () => photoInput?.click());
      photoInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
          showToast('Image too large. Max 2MB.', 'error'); return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          photoPreview.innerHTML = `<img src="${ev.target.result}" alt="Pet preview" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
        };
        reader.readAsDataURL(file);
      });

      // Multi-step modal navigation
      let currentPetStep = 1;
      const step1Div = modalContainer.querySelector('.pet-form-step[data-step-content="1"]');
      const step2Div = modalContainer.querySelector('.pet-form-step[data-step-content="2"]');
      
      const step1Indicator = modalContainer.querySelector('.pet-modal-step[data-pet-step="1"]');
      const step2Indicator = modalContainer.querySelector('.pet-modal-step[data-pet-step="2"]');
      const stepLine = modalContainer.querySelector('.pet-modal-step-line');
      
      const backBtn = modalContainer.querySelector('#pp-modal-back');
      const cancelBtn = modalContainer.querySelector('#pp-modal-cancel');
      const nextBtn = modalContainer.querySelector('#pp-modal-next');
      const submitBtn = modalContainer.querySelector('#pp-form-submit');

      const updateStepUI = () => {
        if (currentPetStep === 1) {
          step1Div.style.display = 'block';
          step2Div.style.display = 'none';
          
          step1Indicator.style.color = 'var(--coral)';
          step1Indicator.querySelector('.step-num').style.background = 'var(--coral)';
          step1Indicator.querySelector('.step-num').style.color = 'white';
          step1Indicator.querySelector('.step-num').style.borderColor = 'var(--coral)';
          
          step2Indicator.style.color = 'var(--text-tertiary)';
          step2Indicator.querySelector('.step-num').style.background = 'var(--bg-secondary)';
          step2Indicator.querySelector('.step-num').style.color = 'var(--text-tertiary)';
          step2Indicator.querySelector('.step-num').style.borderColor = 'var(--border-primary)';
          stepLine.style.background = 'var(--border-primary)';
          
          backBtn.style.display = 'none';
          cancelBtn.style.display = 'block';
          nextBtn.style.display = 'block';
          submitBtn.style.display = 'none';
        } else {
          step1Div.style.display = 'none';
          step2Div.style.display = 'block';
          
          step1Indicator.style.color = 'var(--sage)';
          step1Indicator.querySelector('.step-num').style.background = 'var(--sage)';
          step1Indicator.querySelector('.step-num').style.color = 'white';
          step1Indicator.querySelector('.step-num').style.borderColor = 'var(--sage)';
          
          step2Indicator.style.color = 'var(--coral)';
          step2Indicator.querySelector('.step-num').style.background = 'var(--coral)';
          step2Indicator.querySelector('.step-num').style.color = 'white';
          step2Indicator.querySelector('.step-num').style.borderColor = 'var(--coral)';
          stepLine.style.background = 'var(--sage)';
          
          backBtn.style.display = 'block';
          cancelBtn.style.display = 'none';
          nextBtn.style.display = 'none';
          submitBtn.style.display = 'inline-flex';
        }
      };

      nextBtn.addEventListener('click', () => {
        // Validate step 1 fields
        const name = modalContainer.querySelector('#pp-name')?.value.trim();
        const species = modalContainer.querySelector('#pp-species')?.value;
        if (!name || !species) {
          showToast('Please fill in Pet Name and Species.', 'error');
          return;
        }
        currentPetStep = 2;
        updateStepUI();
      });

      backBtn.addEventListener('click', () => {
        currentPetStep = 1;
        updateStepUI();
      });

      // Close handlers
      const closeModal = () => {
        backdrop?.classList.remove('open');
        modal?.classList.remove('open');
        setTimeout(() => {
          modalContainer.innerHTML = '';
          document.body.style.overflow = '';
        }, 320);
      };

      modalContainer.querySelector('#pp-modal-close')?.addEventListener('click', closeModal);
      cancelBtn?.addEventListener('click', closeModal);
      backdrop?.addEventListener('click', closeModal);
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); }
      });

      // Form submit
      const form = modalContainer.querySelector('#pp-pet-form');
      form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = modalContainer.querySelector('#pp-name')?.value.trim();
        const species = modalContainer.querySelector('#pp-species')?.value;

        if (!name || !species) {
          showToast('Please fill in Pet Name and Species.', 'error'); return;
        }

        const petId = modalContainer.querySelector('#pp-pet-id')?.value;
        const photoImg = photoPreview?.querySelector('img');
        const photo = photoImg ? photoImg.src : null;

        const petData = {
          id: petId || genId(),
          name,
          species,
          breed: modalContainer.querySelector('#pp-breed')?.value.trim() || '',
          gender: modalContainer.querySelector('#pp-gender')?.value || '',
          dob: modalContainer.querySelector('#pp-dob')?.value || '',
          weight: parseFloat(modalContainer.querySelector('#pp-weight')?.value) || '',
          photo: photo && photo.startsWith('data:') ? photo : (petId ? pets.find(p => p.id === petId)?.photo || null : null),
          photoEmoji: PET_EMOJI[species] || '🐾',
          vaccinationStatus: modalContainer.querySelector('#pp-vax')?.value || '',
          notes: modalContainer.querySelector('#pp-notes')?.value.trim() || '',
          medicalConditions: modalContainer.querySelector('#pp-medical')?.value.trim() || '',
          allergies: modalContainer.querySelector('#pp-allergies')?.value.trim() || '',
          behaviourNotes: modalContainer.querySelector('#pp-behaviour')?.value.trim() || '',
          groomingStyle: modalContainer.querySelector('#pp-grooming')?.value.trim() || '',
          createdAt: petId ? (pets.find(p => p.id === petId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Save
        if (petId) {
          const idx = pets.findIndex(p => p.id === petId);
          if (idx !== -1) pets[idx] = petData;
        } else {
          pets.push(petData);
        }
        savePets(userId, pets);

        // Dispatch so dashboard can pick up
        window.dispatchEvent(new CustomEvent('pets-updated'));

        const msg = petId ? `${name} updated! 🐾` : `${name} added to your family! 🐾`;
        showToast(msg, 'success');
        closeModal();
        setTimeout(() => renderPage(), 350);
      });
    }, 30);
  }

  // ── Bind all events ──
  function bindEvents() {
    // Add pet buttons
    container.querySelector('#btn-add-pet-top')?.addEventListener('click', () => openModal());
    container.querySelector('#btn-add-pet-empty')?.addEventListener('click', () => openModal());

    // Edit buttons
    container.querySelectorAll('.pp-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const petId = btn.dataset.petId;
        const pet = pets.find(p => p.id === petId);
        if (pet) openModal(pet);
      });
    });

    // Delete buttons
    container.querySelectorAll('.pp-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const petId = btn.dataset.petId;
        const pet = pets.find(p => p.id === petId);
        if (!pet) return;

        // Simple confirm
        if (!confirm(`Remove ${pet.name} from your profile? This cannot be undone.`)) return;
        pets = pets.filter(p => p.id !== petId);
        savePets(userId, pets);
        window.dispatchEvent(new CustomEvent('pets-updated'));
        showToast(`${pet.name} removed.`, 'success');
        renderPage();
      });
    });
  }

  // Initial render
  renderPage();
}
