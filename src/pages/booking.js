import { ScrollReveal } from '../utils/scroll-reveal.js';

export async function renderBooking(container, params) {
  container.innerHTML = `
    <div class="booking-page container">
      <!-- Header -->
      <div style="margin-bottom: var(--space-8); text-align: center;">
        <span class="section-label"><i data-lucide="check-circle"></i> Booking</span>
        <h1 class="section-title">Schedule Grooming Service</h1>
        <p class="section-subtitle">Complete 5 simple steps to confirm your appointment at Paws & Claws Studio.</p>
      </div>

      <!-- Booking Flow Structure -->
      <div class="booking-layout">
        <!-- Steps content -->
        <main class="glass-card" style="padding: var(--space-8);">
          <!-- Progress Indicator -->
          <div class="booking-progress">
            <div class="booking-progress-step active" id="pstep-1">
              <div class="booking-progress-dot">1</div>
              <span class="booking-progress-label">Pet</span>
            </div>
            <div class="booking-progress-line" id="pline-1"></div>
            <div class="booking-progress-step" id="pstep-2">
              <div class="booking-progress-dot">2</div>
              <span class="booking-progress-label">Service</span>
            </div>
            <div class="booking-progress-line" id="pline-2"></div>
            <div class="booking-progress-step" id="pstep-3">
              <div class="booking-progress-dot">3</div>
              <span class="booking-progress-label">Date</span>
            </div>
            <div class="booking-progress-line" id="pline-3"></div>
            <div class="booking-progress-step" id="pstep-4">
              <div class="booking-progress-dot">4</div>
              <span class="booking-progress-label">Time</span>
            </div>
            <div class="booking-progress-line" id="pline-4"></div>
            <div class="booking-progress-step" id="pstep-5">
              <div class="booking-progress-dot">5</div>
              <span class="booking-progress-label">Confirm</span>
            </div>
          </div>

          <div style="margin: var(--space-8) 0; height: 1px; background: var(--border-primary);"></div>

          <!-- Step 1: Choose Pet -->
          <div class="booking-step-content active" id="step-content-1">
            <h3 style="margin-bottom: var(--space-6);">Choose Your Pet</h3>
            <div class="pet-select-grid">
              <div class="pet-select-card selected" data-pet="Buddy" data-emoji="🐕" data-breed="Golden Retriever">
                <div class="pet-emoji">🐕</div>
                <h4 style="font-size: var(--text-lg); font-weight: var(--weight-bold);">Buddy</h4>
                <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 4px;">Golden Retriever (3 yrs)</p>
              </div>
              <div class="pet-select-card" data-pet="Luna" data-emoji="🐈" data-breed="Persian Cat">
                <div class="pet-emoji">🐈</div>
                <h4 style="font-size: var(--text-lg); font-weight: var(--weight-bold);">Luna</h4>
                <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 4px;">Persian Cat (2 yrs)</p>
              </div>
              <div class="pet-select-card" data-pet="Max" data-emoji="🐕" data-breed="German Shepherd">
                <div class="pet-emoji">🐕</div>
                <h4 style="font-size: var(--text-lg); font-weight: var(--weight-bold);">Max</h4>
                <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 4px;">German Shepherd (4 yrs)</p>
              </div>
              <div class="pet-select-card" style="border-style: dashed; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-2);" onclick="window.location.href='/pet-profile'">
                <i data-lucide="plus" style="width: 24px; height: 24px; color: var(--color-primary);"></i>
                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-primary);">Add New Pet</h4>
              </div>
            </div>
          </div>

          <!-- Step 2: Select Service -->
          <div class="booking-step-content" id="step-content-2">
            <h3 style="margin-bottom: var(--space-6);">Select Grooming Service</h3>
            <div class="service-select-grid">
              <div class="service-select-card selected" data-service="Premium Styling" data-price="999" data-duration="90 mins">
                <div style="font-size: 2rem;">✂️</div>
                <div style="flex: 1;">
                  <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold);">Premium Styling</h4>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary);">90 mins • Haircut + Spa + Wash</span>
                </div>
                <div style="font-weight: var(--weight-bold); color: var(--color-primary);">₹999</div>
              </div>
              
              <div class="service-select-card" data-service="Basic Grooming" data-price="499" data-duration="45 mins">
                <div style="font-size: 2rem;">🛁</div>
                <div style="flex: 1;">
                  <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold);">Basic Grooming</h4>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary);">45 mins • Bath + Brush + Blow dry</span>
                </div>
                <div style="font-weight: var(--weight-bold); color: var(--color-primary);">₹499</div>
              </div>

              <div class="service-select-card" data-service="Royal Spa" data-price="1999" data-duration="120 mins">
                <div style="font-size: 2rem;">👑</div>
                <div style="flex: 1;">
                  <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold);">Royal Spa Package</h4>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary);">120 mins • Anti-flea + Massage + Facial</span>
                </div>
                <div style="font-weight: var(--weight-bold); color: var(--color-primary);">₹1,999</div>
              </div>

              <div class="service-select-card" data-service="Nail Trimming" data-price="199" data-duration="20 mins">
                <div style="font-size: 2rem;">💅</div>
                <div style="flex: 1;">
                  <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold);">Nail Trimming</h4>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary);">20 mins • File & Defense spray</span>
                </div>
                <div style="font-weight: var(--weight-bold); color: var(--color-primary);">₹199</div>
              </div>

              <div class="service-select-card" data-service="Tick Treatment" data-price="599" data-duration="60 mins">
                <div style="font-size: 2rem;">🔬</div>
                <div style="flex: 1;">
                  <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold);">Tick & Flea Defense</h4>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary);">60 mins • Medicated shampoo wash</span>
                </div>
                <div style="font-weight: var(--weight-bold); color: var(--color-primary);">₹599</div>
              </div>

              <div class="service-select-card" data-service="Dental Care Session" data-price="299" data-duration="30 mins">
                <div style="font-size: 2rem;">🦷</div>
                <div style="flex: 1;">
                  <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold);">Dental Hygiene</h4>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary);">30 mins • Scaling & fresh breath gel</span>
                </div>
                <div style="font-weight: var(--weight-bold); color: var(--color-primary);">₹299</div>
              </div>
            </div>
          </div>

          <!-- Step 3: Pick Date -->
          <div class="booking-step-content" id="step-content-3">
            <h3 style="margin-bottom: var(--space-6);">Select Appointment Date</h3>
            <div style="padding: var(--space-4); background: var(--bg-hover); border-radius: var(--radius-xl);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold);" id="current-month-year">June 2026</h4>
                <div style="display: flex; gap: var(--space-2);">
                  <button class="btn btn-secondary btn-sm" id="prev-month"><i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i></button>
                  <button class="btn btn-secondary btn-sm" id="next-month"><i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i></button>
                </div>
              </div>
              <div class="date-grid">
                <div class="date-cell header">Mon</div>
                <div class="date-cell header">Tue</div>
                <div class="date-cell header">Wed</div>
                <div class="date-cell header">Thu</div>
                <div class="date-cell header">Fri</div>
                <div class="date-cell header">Sat</div>
                <div class="date-cell header">Sun</div>
                
                <!-- Week 1 -->
                <div class="date-cell disabled">25</div>
                <div class="date-cell disabled">26</div>
                <div class="date-cell disabled">27</div>
                <div class="date-cell disabled">28</div>
                <div class="date-cell disabled">29</div>
                <div class="date-cell disabled">30</div>
                <div class="date-cell disabled">31</div>
                <!-- Month Dates -->
                <div class="date-cell" data-date="June 1, 2026">1</div>
                <div class="date-cell" data-date="June 2, 2026">2</div>
                <div class="date-cell" data-date="June 3, 2026">3</div>
                <div class="date-cell" data-date="June 4, 2026">4</div>
                <div class="date-cell" data-date="June 5, 2026">5</div>
                <div class="date-cell" data-date="June 6, 2026">6</div>
                <div class="date-cell" data-date="June 7, 2026">7</div>
                
                <div class="date-cell" data-date="June 8, 2026">8</div>
                <div class="date-cell" data-date="June 9, 2026">9</div>
                <div class="date-cell" data-date="June 10, 2026">10</div>
                <div class="date-cell" data-date="June 11, 2026">11</div>
                <div class="date-cell today selected" data-date="June 12, 2026">12</div>
                <div class="date-cell" data-date="June 13, 2026">13</div>
                <div class="date-cell" data-date="June 14, 2026">14</div>
                
                <div class="date-cell" data-date="June 15, 2026">15</div>
                <div class="date-cell" data-date="June 16, 2026">16</div>
                <div class="date-cell" data-date="June 17, 2026">17</div>
                <div class="date-cell" data-date="June 18, 2026">18</div>
                <div class="date-cell" data-date="June 19, 2026">19</div>
                <div class="date-cell" data-date="June 20, 2026">20</div>
                <div class="date-cell" data-date="June 21, 2026">21</div>

                <div class="date-cell" data-date="June 22, 2026">22</div>
                <div class="date-cell" data-date="June 23, 2026">23</div>
                <div class="date-cell" data-date="June 24, 2026">24</div>
                <div class="date-cell" data-date="June 25, 2026">25</div>
                <div class="date-cell" data-date="June 26, 2026">26</div>
                <div class="date-cell" data-date="June 27, 2026">27</div>
                <div class="date-cell" data-date="June 28, 2026">28</div>
              </div>
            </div>
          </div>

          <!-- Step 4: Pick Time -->
          <div class="booking-step-content" id="step-content-4">
            <h3 style="margin-bottom: var(--space-6);">Select Booking Time Slot</h3>
            <div class="time-grid">
              <div class="time-slot selected" data-time="09:00 AM">09:00 AM</div>
              <div class="time-slot" data-time="10:00 AM">10:00 AM</div>
              <div class="time-slot unavailable">10:30 AM</div>
              <div class="time-slot" data-time="11:00 AM">11:00 AM</div>
              <div class="time-slot" data-time="12:00 PM">12:00 PM</div>
              <div class="time-slot unavailable">01:00 PM</div>
              <div class="time-slot" data-time="02:00 PM">02:00 PM</div>
              <div class="time-slot" data-time="03:00 PM">03:00 PM</div>
              <div class="time-slot" data-time="04:00 PM">04:00 PM</div>
              <div class="time-slot unavailable">05:00 PM</div>
              <div class="time-slot" data-time="05:30 PM">05:30 PM</div>
              <div class="time-slot" data-time="06:00 PM">06:00 PM</div>
            </div>
          </div>

          <!-- Step 5: Confirm -->
          <div class="booking-step-content" id="step-content-5">
            <h3 style="margin-bottom: var(--space-6);">Confirm Booking Details</h3>
            <div style="padding: var(--space-5); border: 1.5px solid var(--color-primary); background: var(--color-primary-light); border-radius: var(--radius-2xl);">
              <div style="display: flex; gap: var(--space-4); align-items: center; margin-bottom: var(--space-4);">
                <div style="font-size: 3rem;">🐕</div>
                <div>
                  <h4 style="font-size: var(--text-lg); font-weight: var(--weight-bold);" id="confirm-pet">Buddy (Golden Retriever)</h4>
                  <p style="font-size: var(--text-sm); color: var(--text-secondary);" id="confirm-service">Premium Styling — ₹999</p>
                </div>
              </div>
              
              <div style="height: 1px; background: var(--border-primary); margin: var(--space-4) 0;"></div>
              
              <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                <div style="display: flex; justify-content: space-between; font-size: var(--text-sm);">
                  <span style="color: var(--text-tertiary);"><i data-lucide="calendar" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Date:</span>
                  <span style="font-weight: var(--weight-semibold);" id="confirm-date">June 12, 2026</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: var(--text-sm);">
                  <span style="color: var(--text-tertiary);"><i data-lucide="clock" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Time Slot:</span>
                  <span style="font-weight: var(--weight-semibold);" id="confirm-time">09:00 AM</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: var(--text-sm);">
                  <span style="color: var(--text-tertiary);"><i data-lucide="scissors" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Salon Studio:</span>
                  <span style="font-weight: var(--weight-semibold);">Paws & Claws Studio</span>
                </div>
              </div>
            </div>

            <!-- Confirmation message and success screen trigger -->
            <div style="text-align: center; margin-top: var(--space-6);">
              <button class="btn btn-primary btn-lg w-full" id="confirm-pay-btn" style="background: var(--gradient-primary); color: white;">
                Confirm & Pay ₹1,049
              </button>
              <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-3);">🛡️ Payments are secured via 256-bit SSL technology.</p>
            </div>
          </div>

          <!-- Bottom Navigation Controls -->
          <div style="display: flex; justify-content: space-between; margin-top: var(--space-8);">
            <button class="btn btn-secondary" id="btn-back" style="display: none;"><i data-lucide="arrow-left"></i> Back</button>
            <button class="btn btn-primary" id="btn-next" style="margin-left: auto;">Next <i data-lucide="arrow-right"></i></button>
          </div>
        </main>

        <!-- Booking Summary Sidebar -->
        <aside class="booking-summary glass-card">
          <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); margin-bottom: var(--space-4);">Summary</h3>
          <div style="display: flex; gap: var(--space-3); align-items: center; margin-bottom: var(--space-4);">
            <div style="width: 50px; height: 50px; border-radius: var(--radius-lg); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🐩</div>
            <div>
              <h4 style="font-size: var(--text-sm); font-weight: var(--weight-bold);">Paws & Claws Studio</h4>
              <p style="font-size: var(--text-xs); color: var(--text-secondary);">Koramangala, Bangalore</p>
            </div>
          </div>

          <div style="height: 1px; background: var(--border-primary); margin: var(--space-4) 0;"></div>

          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <div class="booking-summary-row">
              <span>Pet Selected:</span>
              <strong id="summary-pet">Buddy (🐕)</strong>
            </div>
            <div class="booking-summary-row">
              <span>Service:</span>
              <strong id="summary-service">Premium Styling</strong>
            </div>
            <div class="booking-summary-row">
              <span>Duration:</span>
              <span id="summary-duration">90 mins</span>
            </div>
            <div class="booking-summary-row">
              <span>Date:</span>
              <strong id="summary-date">June 12, 2026</strong>
            </div>
            <div class="booking-summary-row">
              <span>Time Slot:</span>
              <strong id="summary-time">09:00 AM</strong>
            </div>
          </div>

          <div style="height: 1px; background: var(--border-primary); margin: var(--space-4) 0;"></div>

          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <div class="booking-summary-row">
              <span>Subtotal:</span>
              <span id="summary-subtotal">₹999</span>
            </div>
            <div class="booking-summary-row">
              <span>Platform Fee:</span>
              <span>₹50</span>
            </div>
            <div class="booking-summary-total">
              <span>Total:</span>
              <span id="summary-total" style="color: var(--color-primary);">₹1,049</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;

  // Bind interactive elements
  setTimeout(() => {
    if (window.lucide) {
      lucide.createIcons();
    }
    ScrollReveal.init();
    initBookingFlow(container);
  }, 50);
}

function initBookingFlow(container) {
  let currentStep = 1;
  const totalSteps = 5;

  const btnNext = container.querySelector('#btn-next');
  const btnBack = container.querySelector('#btn-back');
  const payBtn = container.querySelector('#confirm-pay-btn');

  // Summary variables
  let petName = "Buddy";
  let petEmoji = "🐕";
  let serviceName = "Premium Styling";
  let servicePrice = 999;
  let serviceDuration = "90 mins";
  let bookingDate = "June 12, 2026";
  let bookingTime = "09:00 AM";

  // Cache elements
  const sPet = container.querySelector('#summary-pet');
  const sService = container.querySelector('#summary-service');
  const sDuration = container.querySelector('#summary-duration');
  const sDate = container.querySelector('#summary-date');
  const sTime = container.querySelector('#summary-time');
  const sSubtotal = container.querySelector('#summary-subtotal');
  const sTotal = container.querySelector('#summary-total');

  const cPet = container.querySelector('#confirm-pet');
  const cService = container.querySelector('#confirm-service');
  const cDate = container.querySelector('#confirm-date');
  const cTime = container.querySelector('#confirm-time');

  function updateSummary() {
    if (sPet) sPet.textContent = `${petName} (${petEmoji})`;
    if (sService) sService.textContent = serviceName;
    if (sDuration) sDuration.textContent = serviceDuration;
    if (sDate) sDate.textContent = bookingDate;
    if (sTime) sTime.textContent = bookingTime;
    
    if (sSubtotal) sSubtotal.textContent = `₹${servicePrice}`;
    if (sTotal) sTotal.textContent = `₹${servicePrice + 50}`;
    
    // confirmation section
    if (cPet) cPet.textContent = `${petName} (${petEmoji})`;
    if (cService) cService.textContent = `${serviceName} — ₹${servicePrice}`;
    if (cDate) cDate.textContent = bookingDate;
    if (cTime) cTime.textContent = bookingTime;
    if (payBtn) payBtn.textContent = `Confirm & Pay ₹${servicePrice + 50}`;
  }

  // Pet Card Selection
  container.querySelectorAll('.pet-select-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.dataset.pet) {
        container.querySelectorAll('.pet-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        petName = card.dataset.pet;
        petEmoji = card.dataset.emoji;
        updateSummary();
      }
    });
  });

  // Service Selection
  container.querySelectorAll('.service-select-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.service-select-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      serviceName = card.dataset.service;
      servicePrice = parseInt(card.dataset.price);
      serviceDuration = card.dataset.duration;
      updateSummary();
    });
  });

  // Date Selection
  container.querySelectorAll('.date-grid .date-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      if (!cell.classList.contains('disabled') && !cell.classList.contains('header')) {
        container.querySelectorAll('.date-grid .date-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        bookingDate = cell.dataset.date;
        updateSummary();
      }
    });
  });

  // Time Selection
  container.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      if (!slot.classList.contains('unavailable')) {
        container.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        bookingTime = slot.dataset.time;
        updateSummary();
      }
    });
  });

  // Next / Back buttons
  btnNext?.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  });

  btnBack?.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  function goToStep(step) {
    // Hide all step contents
    container.querySelectorAll('.booking-step-content').forEach(c => c.classList.remove('active'));
    // Show new step content
    container.querySelector(`#step-content-${step}`)?.classList.add('active');

    // Update Progress Dots & Lines
    for (let i = 1; i <= totalSteps; i++) {
      const pstep = container.querySelector(`#pstep-${i}`);
      const pline = container.querySelector(`#pline-${i - 1}`);
      
      if (i < step) {
        pstep?.classList.remove('active');
        pstep?.classList.add('completed');
        if (pline) pline.classList.add('filled');
      } else if (i === step) {
        pstep?.classList.add('active');
        pstep?.classList.remove('completed');
        if (pline) pline.classList.remove('filled');
      } else {
        pstep?.classList.remove('active');
        pstep?.classList.remove('completed');
        if (pline) pline.classList.remove('filled');
      }
    }

    // Toggle Back button visibility
    if (step === 1) {
      if (btnBack) btnBack.style.display = 'none';
    } else {
      if (btnBack) btnBack.style.display = 'inline-flex';
    }

    // Toggle Next button text/visibility
    if (step === totalSteps) {
      if (btnNext) btnNext.style.display = 'none';
    } else {
      if (btnNext) btnNext.style.display = 'inline-flex';
    }

    currentStep = step;
  }

  // Trigger Booking Confirmation Toast & redirect
  payBtn?.addEventListener('click', () => {
    // Create toast success notification
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.innerHTML = `
      <div class="toast success">
        <i data-lucide="check-circle" style="color: var(--color-success);"></i>
        <div>
          <h5 style="margin: 0; font-weight: bold;">Booking Successful!</h5>
          <span style="font-size: var(--text-xs); color: var(--text-secondary);">Your appointment for ${petName} is confirmed.</span>
        </div>
      </div>
    `;
    document.body.appendChild(toastContainer);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toastContainer.style.opacity = '0';
      setTimeout(() => {
        toastContainer.remove();
        // Redirect to customer dashboard overview
        window.location.href = '/dashboard';
      }, 500);
    }, 3000);
  });
}
