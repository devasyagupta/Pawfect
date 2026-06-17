import { ScrollReveal } from '../utils/scroll-reveal.js';

export async function renderSalonDashboard(container, params) {
  container.innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-layout">
        <!-- Sidebar Navigation -->
        <aside class="dashboard-sidebar">
          <div style="display: flex; flex-direction: column; gap: var(--space-1); align-items: center; margin-bottom: var(--space-8); padding: 0 var(--space-2); text-align: center;">
            <div style="width: 64px; height: 64px; border-radius: var(--radius-2xl); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: var(--shadow-md);">🐩</div>
            <h4 style="font-size: var(--text-sm); font-weight: var(--weight-bold); margin-top: var(--space-2); line-height: 1.2;">Paws & Claws Studio</h4>
            <span class="badge badge-primary" style="margin-top: 4px;">Premium Partner</span>
          </div>
          
          <nav>
            <div class="dashboard-nav-item active" data-tab="overview">
              <i data-lucide="layout-dashboard"></i>
              <span>Overview</span>
            </div>
            <div class="dashboard-nav-item" data-tab="appointments">
              <i data-lucide="calendar"></i>
              <span>Appointments</span>
            </div>
            <div class="dashboard-nav-item" data-tab="customers">
              <i data-lucide="users"></i>
              <span>Customers</span>
            </div>
            <div class="dashboard-nav-item" data-tab="revenue">
              <i data-lucide="dollar-sign"></i>
              <span>Revenue Analytics</span>
            </div>
            <div class="dashboard-nav-item" data-tab="reviews">
              <i data-lucide="star"></i>
              <span>Reviews & Ratings</span>
            </div>
            <div class="dashboard-nav-item" data-tab="services">
              <i data-lucide="scissors"></i>
              <span>Services List</span>
            </div>
            <div style="height: 1px; background: var(--border-primary); margin: var(--space-4) 0;"></div>
            <div class="dashboard-nav-item" style="color: var(--color-danger);" onclick="window.location.href='/'">
              <i data-lucide="log-out"></i>
              <span>Logout Partner</span>
            </div>
          </nav>
        </aside>

        <!-- Main Dashboard View -->
        <main class="dashboard-main">
          <!-- Overview Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-8); flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <h1 style="font-size: var(--text-3xl); font-weight: var(--weight-bold);">Partner Dashboard</h1>
              <p style="color: var(--text-secondary); font-size: var(--text-sm);">Manage bookings, revenue charts, and customer relations for Koramangala Branch.</p>
            </div>
            <div style="display: flex; gap: var(--space-3);">
              <button class="btn btn-secondary"><i data-lucide="plus"></i> Add Appointment</button>
              <span class="badge" style="padding: var(--space-2) var(--space-4);"><i data-lucide="calendar"></i> June 12, 2026</span>
            </div>
          </div>

          <!-- Stats Grid -->
          <section class="dashboard-stats reveal">
            <!-- Stat 1 -->
            <div class="dashboard-stat-card">
              <div class="dashboard-stat-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--color-primary);"><i data-lucide="calendar-days"></i></div>
              <div class="dashboard-stat-value">12</div>
              <div class="dashboard-stat-label">Today's Bookings</div>
              <span class="dashboard-stat-change positive"><i data-lucide="trending-up"></i> +18% vs yesterday</span>
            </div>
            <!-- Stat 2 -->
            <div class="dashboard-stat-card">
              <div class="dashboard-stat-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--color-success);"><i data-lucide="banknote"></i></div>
              <div class="dashboard-stat-value">₹1.85L</div>
              <div class="dashboard-stat-label">Monthly Revenue</div>
              <span class="dashboard-stat-change positive"><i data-lucide="trending-up"></i> +24% vs last month</span>
            </div>
            <!-- Stat 3 -->
            <div class="dashboard-stat-card">
              <div class="dashboard-stat-icon" style="background: rgba(6, 182, 212, 0.15); color: var(--cyan-500);"><i data-lucide="users-round"></i></div>
              <div class="dashboard-stat-value">856</div>
              <div class="dashboard-stat-label">Total Customers</div>
              <span class="dashboard-stat-change positive"><i data-lucide="plus"></i> 45 new this month</span>
            </div>
            <!-- Stat 4 -->
            <div class="dashboard-stat-card">
              <div class="dashboard-stat-icon" style="background: rgba(249, 115, 22, 0.15); color: var(--color-warning);"><i data-lucide="star"></i></div>
              <div class="dashboard-stat-value">4.9★</div>
              <div class="dashboard-stat-label">Average Rating</div>
              <span class="dashboard-stat-change positive">128 Review logs</span>
            </div>
          </section>

          <!-- Core Widgets Layout -->
          <div class="dashboard-grid" style="margin-top: var(--space-8);">
            <!-- Revenue Analytics Chart Widget -->
            <div class="widget reveal" style="grid-column: span 2;">
              <div class="widget-header">
                <h3 class="widget-title">Revenue Analytics</h3>
                <div class="tabs">
                  <div class="tab">Week</div>
                  <div class="tab active">Month</div>
                  <div class="tab">Year</div>
                </div>
              </div>
              
              <div class="chart-placeholder">
                <div class="chart-bar" style="height: 40%;" title="₹40,000"></div>
                <div class="chart-bar" style="height: 65%;" title="₹65,000"></div>
                <div class="chart-bar" style="height: 85%;" title="₹85,000"></div>
                <div class="chart-bar" style="height: 45%;" title="₹45,000"></div>
                <div class="chart-bar" style="height: 70%;" title="₹70,000"></div>
                <div class="chart-bar" style="height: 90%;" title="₹90,000"></div>
                <div class="chart-bar" style="height: 55%;" title="₹55,000"></div>
                <div class="chart-bar" style="height: 75%;" title="₹75,000"></div>
                <div class="chart-bar" style="height: 95%;" title="₹95,000"></div>
                <div class="chart-bar" style="height: 60%;" title="₹60,000"></div>
                <div class="chart-bar" style="height: 80%;" title="₹80,000"></div>
                <div class="chart-bar" style="height: 50%;" title="₹50,000"></div>
              </div>
              
              <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-3); padding: 0 var(--space-2);">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>

            <!-- Today's Appointment Schedule Widget -->
            <div class="widget reveal">
              <div class="widget-header">
                <h3 class="widget-title">Today's Schedule</h3>
                <span class="badge badge-primary">12 Appts</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                <!-- Schedule item 1 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2) 0; border-bottom: 1px solid var(--border-secondary);">
                  <div>
                    <h5 style="font-size: var(--text-sm); font-weight: var(--weight-bold);">Buddy (Golden Retriever)</h5>
                    <span style="font-size: var(--text-xs); color: var(--text-tertiary);">Groomer: Amit • Premium Styling</span>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-primary);">09:00 AM</div>
                    <span class="badge badge-warning" style="margin-top: 2px;">In Progress</span>
                  </div>
                </div>

                <!-- Schedule item 2 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2) 0; border-bottom: 1px solid var(--border-secondary);">
                  <div>
                    <h5 style="font-size: var(--text-sm); font-weight: var(--weight-bold);">Luna (Persian Cat)</h5>
                    <span style="font-size: var(--text-xs); color: var(--text-tertiary);">Groomer: Priya • Basic Bath & Dry</span>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-primary);">10:30 AM</div>
                    <span class="badge badge-success" style="margin-top: 2px;">Confirmed</span>
                  </div>
                </div>

                <!-- Schedule item 3 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2) 0; border-bottom: 1px solid var(--border-secondary);">
                  <div>
                    <h5 style="font-size: var(--text-sm); font-weight: var(--weight-bold);">Max (German Shepherd)</h5>
                    <span style="font-size: var(--text-xs); color: var(--text-tertiary);">Groomer: Amit • Premium Spa</span>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-primary);">12:00 PM</div>
                    <span class="badge badge-success" style="margin-top: 2px;">Confirmed</span>
                  </div>
                </div>
                
                <!-- Schedule item 4 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2) 0;">
                  <div>
                    <h5 style="font-size: var(--text-sm); font-weight: var(--weight-bold);">Coco (Poodle)</h5>
                    <span style="font-size: var(--text-xs); color: var(--text-tertiary);">Groomer: Suresh • Nail Trimming</span>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-primary);">02:00 PM</div>
                    <span class="badge" style="background: var(--bg-tertiary); color: var(--text-secondary); margin-top: 2px;">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Calendar Widget -->
            <div class="widget reveal">
              <div class="widget-header">
                <h3 class="widget-title">Calendar View</h3>
                <span style="font-size: var(--text-xs); font-weight: var(--weight-bold);">June 2026</span>
              </div>
              <div class="calendar-widget">
                <div class="calendar-grid">
                  <span class="calendar-day-header">M</span>
                  <span class="calendar-day-header">T</span>
                  <span class="calendar-day-header">W</span>
                  <span class="calendar-day-header">T</span>
                  <span class="calendar-day-header">F</span>
                  <span class="calendar-day-header">S</span>
                  <span class="calendar-day-header">S</span>
                  
                  <!-- Dummy days calendar grid -->
                  <span class="calendar-day" style="opacity: 0.3;">25</span>
                  <span class="calendar-day" style="opacity: 0.3;">26</span>
                  <span class="calendar-day" style="opacity: 0.3;">27</span>
                  <span class="calendar-day" style="opacity: 0.3;">28</span>
                  <span class="calendar-day" style="opacity: 0.3;">29</span>
                  <span class="calendar-day" style="opacity: 0.3;">30</span>
                  <span class="calendar-day" style="opacity: 0.3;">31</span>
                  
                  <span class="calendar-day">1</span>
                  <span class="calendar-day has-event">2</span>
                  <span class="calendar-day">3</span>
                  <span class="calendar-day">4</span>
                  <span class="calendar-day has-event">5</span>
                  <span class="calendar-day">6</span>
                  <span class="calendar-day">7</span>
                  
                  <span class="calendar-day">8</span>
                  <span class="calendar-day has-event">9</span>
                  <span class="calendar-day">10</span>
                  <span class="calendar-day">11</span>
                  <span class="calendar-day today">12</span>
                  <span class="calendar-day has-event">13</span>
                  <span class="calendar-day">14</span>
                  
                  <span class="calendar-day has-event">15</span>
                  <span class="calendar-day">16</span>
                  <span class="calendar-day">17</span>
                  <span class="calendar-day has-event">18</span>
                  <span class="calendar-day">19</span>
                  <span class="calendar-day">20</span>
                  <span class="calendar-day has-event">21</span>
                </div>
              </div>
            </div>

            <!-- Customer Directory Widget -->
            <div class="widget reveal" style="grid-column: span 2;">
              <div class="widget-header">
                <h3 class="widget-title">Recent Customer logs</h3>
                <a href="#" style="font-size: var(--text-xs); color: var(--color-primary); font-weight: var(--weight-bold);">View Directory</a>
              </div>
              
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: var(--text-sm); text-align: left;">
                  <thead>
                    <tr style="border-bottom: 2px solid var(--border-primary); color: var(--text-tertiary);">
                      <th style="padding: var(--space-2);">Customer</th>
                      <th style="padding: var(--space-2);">Pets</th>
                      <th style="padding: var(--space-2);">Visits</th>
                      <th style="padding: var(--space-2);">Total Paid</th>
                      <th style="padding: var(--space-2);">Last Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--border-secondary);">
                      <td style="padding: var(--space-3) var(--space-2); font-weight: var(--weight-bold);">Rahul Sharma</td>
                      <td style="padding: var(--space-3) var(--space-2);">Buddy, Luna, Max</td>
                      <td style="padding: var(--space-3) var(--space-2);">24 times</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--color-success); font-weight: bold;">₹18,450</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--text-secondary);">June 5, 2026</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-secondary);">
                      <td style="padding: var(--space-3) var(--space-2); font-weight: var(--weight-bold);">Priya Kapoor</td>
                      <td style="padding: var(--space-3) var(--space-2);">Luna (Cat)</td>
                      <td style="padding: var(--space-3) var(--space-2);">12 times</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--color-success); font-weight: bold;">₹9,200</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--text-secondary);">May 15, 2026</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-secondary);">
                      <td style="padding: var(--space-3) var(--space-2); font-weight: var(--weight-bold);">Amit Reddy</td>
                      <td style="padding: var(--space-3) var(--space-2);">Bruno, Rocky</td>
                      <td style="padding: var(--space-3) var(--space-2);">8 times</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--color-success); font-weight: bold;">₹7,450</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--text-secondary);">May 01, 2026</td>
                    </tr>
                    <tr>
                      <td style="padding: var(--space-3) var(--space-2); font-weight: var(--weight-bold);">Sneha Mehta</td>
                      <td style="padding: var(--space-3) var(--space-2);">Coco (Poodle)</td>
                      <td style="padding: var(--space-3) var(--space-2);">6 times</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--color-success); font-weight: bold;">₹5,100</td>
                      <td style="padding: var(--space-3) var(--space-2); color: var(--text-secondary);">April 22, 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  // Bind interactive elements
  setTimeout(() => {
    if (window.lucide) {
      lucide.createIcons();
    }
    ScrollReveal.init();

    // Tab switcher logic for chart
    container.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tab.closest('.tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Randomize chart heights to simulate load
        const bars = container.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
          const height = Math.floor(Math.random() * 70) + 30;
          bar.style.height = height + '%';
        });
      });
    });
  }, 50);
}
