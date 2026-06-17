import { ScrollReveal } from '../utils/scroll-reveal.js';

// ── Real blog content ──────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 'how-often-groom-dog',
    category: 'Grooming Tips',
    categoryColor: '#E47D5D',
    title: 'How Often Should You Groom Your Dog?',
    excerpt: 'The right grooming frequency depends on your dog\'s breed, coat type, and lifestyle. Here\'s a complete guide for Ahmedabad pet owners.',
    author: 'Dr. Priya Mehta',
    authorInitials: 'PM',
    date: 'June 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=380&fit=crop&q=85',
    featured: true,
    tags: ['Dogs', 'Grooming', 'Ahmedabad'],
  },
  {
    id: 'cat-grooming-guide-indian-breeds',
    category: 'Cat Care',
    categoryColor: '#C9A055',
    title: 'Cat Grooming Guide for Indian Breeds',
    excerpt: 'Indian cats including Persian and Indian Domestic breeds have unique grooming needs. Learn how to keep your cat\'s coat healthy year-round.',
    author: 'Ananya Shah',
    authorInitials: 'AS',
    date: 'June 6, 2026',
    readTime: '4 min read',
    image: '/assets/salon_110.png',
    featured: false,
    tags: ['Cats', 'Grooming'],
  },
  {
    id: 'benefits-professional-pet-spa',
    category: 'Spa & Wellness',
    categoryColor: '#6366f1',
    title: 'Benefits of Professional Pet Spa Treatments',
    excerpt: 'From stress relief to skin health — professional spa treatments do far more than just clean your pet. Discover why regular spa sessions matter.',
    author: 'Rohan Patel',
    authorInitials: 'RP',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image: '/assets/salon_113.png',
    featured: false,
    tags: ['Spa', 'Wellness', 'Dogs', 'Cats'],
  },
  {
    id: 'pet-hygiene-ahmedabad-summer',
    category: 'Seasonal Care',
    categoryColor: '#10b981',
    title: 'Pet Hygiene During Ahmedabad Summers',
    excerpt: 'With temperatures crossing 40°C, Ahmedabad summers are tough on pets. Here are the essential hygiene practices every local pet owner needs to know.',
    author: 'Dr. Priya Mehta',
    authorInitials: 'PM',
    date: 'May 20, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=380&fit=crop&q=85',
    featured: false,
    tags: ['Summer', 'Ahmedabad', 'Health'],
  },
  {
    id: 'first-grooming-appointment-checklist',
    category: 'First-Timer Guide',
    categoryColor: '#E47D5D',
    title: 'First Grooming Appointment Checklist',
    excerpt: 'Is this your pet\'s first professional grooming session? Use this step-by-step checklist to prepare your dog or cat and make it a stress-free experience.',
    author: 'Ananya Shah',
    authorInitials: 'AS',
    date: 'May 14, 2026',
    readTime: '5 min read',
    image: '/assets/salon_107.png',
    featured: false,
    tags: ['Tips', 'First-timers'],
  },
  {
    id: 'choosing-right-groomer-ahmedabad',
    category: 'Advice',
    categoryColor: '#C9A055',
    title: 'How to Choose the Right Groomer in Ahmedabad',
    excerpt: 'Not all groomers are equal. Learn the 7 key factors to evaluate when picking a grooming salon in Satellite, Bodakdev, or SG Highway.',
    author: 'Rohan Patel',
    authorInitials: 'RP',
    date: 'May 5, 2026',
    readTime: '6 min read',
    image: '/assets/salon_104.png',
    featured: false,
    tags: ['Ahmedabad', 'Advice'],
  },
];

// ── Full article content ───────────────────────────────────────────
const ARTICLE_CONTENT = {
  'how-often-groom-dog': {
    body: `
      <p>Grooming your dog regularly is one of the most important aspects of pet care — yet many pet owners in Ahmedabad are unsure how often to schedule professional sessions. The honest answer: <strong>it depends on your dog's breed, coat length, and daily lifestyle.</strong></p>

      <h2>Short-haired breeds</h2>
      <p>Breeds like Labrador Retrievers, Beagles, and Dalmatians have short, low-maintenance coats. A professional groom every <strong>6–8 weeks</strong> is generally sufficient. Between visits, a weekly brush at home removes dead hair and stimulates the skin.</p>

      <h2>Medium-haired breeds</h2>
      <p>Golden Retrievers, Border Collies, and Cocker Spaniels fall in the middle — they need professional grooming every <strong>4–6 weeks</strong>. Their coats can mat if left too long, especially behind the ears and under the legs.</p>

      <h2>Long-haired and double-coated breeds</h2>
      <p>Shih Tzus, Pomeranians, Afghan Hounds, and similar breeds need grooming every <strong>3–4 weeks</strong>. Without regular maintenance, mats can form close to the skin and cause painful skin infections.</p>

      <h2>Ahmedabad's summer consideration</h2>
      <p>Ahmedabad's extreme summer heat (often 42–44°C) makes more frequent grooming a health necessity, not just a cosmetic choice. Dense coats trap heat, raising your dog's core body temperature. A professional summer trim from May to August can significantly reduce heat stress and improve comfort.</p>

      <h2>Signs your dog needs grooming now</h2>
      <ul>
        <li>Visible mats or tangling in the coat</li>
        <li>Unusual odour that persists after a home bath</li>
        <li>Scratching or biting at the skin</li>
        <li>Nails clicking loudly on hard floors</li>
        <li>Ears smelling musty or showing redness</li>
      </ul>

      <h2>Professional vs. home grooming</h2>
      <p>Home grooming between appointments is valuable — regular brushing, ear cleaning, and tooth brushing all matter. But professional groomers have the training to spot early skin conditions, parasites, and ear infections that most pet owners would miss.</p>

      <p>At Pawfect, our partner salons across Ahmedabad — from Paawsh in Memnagar to HUFT on Satellite Road — offer breed-specific grooming packages tailored to your dog's coat type and your schedule.</p>
    `,
    related: ['pet-hygiene-ahmedabad-summer', 'first-grooming-appointment-checklist']
  },
  'cat-grooming-guide-indian-breeds': {
    body: `
      <p>Cats are famously self-cleaning animals — but that doesn't mean they don't need professional grooming. Especially in a city like Ahmedabad where heat, dust, and humidity stress their coats, regular grooming is essential for cat health.</p>

      <h2>Persian cats</h2>
      <p>Persian cats are the most common long-haired breed in Indian households. Their dense, silky coats mat quickly — especially in Ahmedabad's humid monsoon months. Persians need professional grooming every <strong>3–4 weeks</strong> and daily brushing at home.</p>

      <h2>Indian Domestic (Desi) cats</h2>
      <p>The short-coated Indian domestic cat is relatively low-maintenance. Monthly professional grooming sessions help control shedding, check for parasites, and keep the coat clean. They're generally resilient, but flea and tick checks are critical during monsoon.</p>

      <h2>Siamese and other shorthair breeds</h2>
      <p>Siamese, British Shorthair, and similar breeds need grooming every 6–8 weeks. Their finer coats don't mat, but regular de-shedding treatments dramatically reduce hairball formation and seasonal shedding around the home.</p>

      <h2>The monsoon challenge</h2>
      <p>Ahmedabad's July–September monsoon creates high humidity that encourages fungal skin infections in cats. Professional groomers can identify and flag these early — a major advantage of consistent salon visits.</p>

      <h2>What a professional cat groom includes</h2>
      <ul>
        <li>Full coat brushing and de-matting</li>
        <li>Hypoallergenic shampoo bath</li>
        <li>Blow dry and styling</li>
        <li>Nail trim and paw pad moisturising</li>
        <li>Ear cleaning</li>
        <li>Sanitary trim</li>
      </ul>

      <p>Not every groomer is experienced with cats — they require a calm, separate space away from dogs. Our Pawfect cat-specialist partners in Ahmedabad, including Tales Of Tails on Drive In Road, maintain dedicated cat grooming rooms.</p>
    `,
    related: ['how-often-groom-dog', 'benefits-professional-pet-spa']
  },
  'benefits-professional-pet-spa': {
    body: `
      <p>When most people hear "pet spa," they imagine an indulgent luxury experience — nice, but optional. In reality, professional spa treatments provide measurable health benefits for dogs and cats that go well beyond a clean coat.</p>

      <h2>1. Skin health and hydration</h2>
      <p>Professional spa treatments use medicated and organic shampoos calibrated to your pet's skin pH. Home shampoos — even pet-labelled ones — are often too harsh or too mild. Regular spa visits restore the skin's natural moisture barrier, reducing flakiness, itchiness, and hot spots.</p>

      <h2>2. Stress reduction</h2>
      <p>Aromatherapy baths with lavender and chamomile extracts have measurable calming effects on anxious dogs. Several of our partner salons — including Paawsh Pet Salon — use certified pet-safe essential oils as part of their spa protocols.</p>

      <h2>3. Coat conditioning and shine</h2>
      <p>Deep conditioning treatments penetrate the hair shaft to repair split ends and reduce breakage. The result is a noticeably shinier, softer coat that's easier to manage between salon visits.</p>

      <h2>4. Early health detection</h2>
      <p>Experienced groomers handle your pet's entire body during a spa session. This means they often notice lumps, skin irritations, ear infections, or nail problems <strong>before they become serious</strong> — something many pet owners miss at home.</p>

      <h2>5. Parasite management</h2>
      <p>In Ahmedabad's warm climate, fleas and ticks are year-round concerns. Medicated spa baths using neem, tea tree, or veterinary-grade antiparasitic shampoos significantly reduce parasite load — especially important after monsoon walks.</p>

      <h2>How often should you book a spa treatment?</h2>
      <p>Most dogs benefit from a full spa treatment every 4–6 weeks. Between sessions, a basic bath and brush at home maintains hygiene. If your dog has skin conditions, your vet may recommend bi-monthly medicated spa treatments.</p>
    `,
    related: ['how-often-groom-dog', 'choosing-right-groomer-ahmedabad']
  },
  'pet-hygiene-ahmedabad-summer': {
    body: `
      <p>Ahmedabad's summers are among the most intense in India. With temperatures regularly exceeding 42°C from April through June, pet hygiene isn't just about cleanliness — it's a health priority.</p>

      <h2>Heat stress and your pet's coat</h2>
      <p>A common mistake is thinking a thick coat protects dogs from heat. For double-coated breeds like German Shepherds and Huskies, professional de-shedding treatments remove the dead undercoat, improving airflow to the skin. This can reduce body temperature by several degrees.</p>
      <p><strong>Important:</strong> Never shave a double-coated breed without veterinary advice. Their outer coat also protects against sunburn.</p>

      <h2>Paw care in Ahmedabad summers</h2>
      <p>Asphalt in Ahmedabad can reach 70°C during peak summer hours (11am–4pm). Walking your dog on these surfaces causes painful burns and blistering. Schedule walks before 8am and after 7pm, and apply a pet-safe paw balm after each walk.</p>

      <h2>Bathing frequency</h2>
      <p>In summer, most dogs benefit from bathing every 2–3 weeks rather than the standard monthly schedule. The combination of heat, dust, and increased outdoor activity means coats attract more debris and develop odour faster.</p>

      <h2>Ear and eye care</h2>
      <p>Ahmedabad's dust and heat increase the risk of ear infections in floppy-eared breeds. Check ears weekly for redness, unusual smell, or discharge. Wipe away any eye discharge gently with damp cotton — never use soap near the eyes.</p>

      <h2>Hydration and grooming timing</h2>
      <p>Groom your pet early in the morning when temperatures are cooler. Ensure fresh, cool water is always available. After any professional grooming session in summer, allow your pet to rest in an air-conditioned or well-ventilated space to cool down gradually.</p>

      <h2>Monsoon transition (July–September)</h2>
      <p>Post-monsoon, humidity spikes and fungal skin infections become common. Schedule a post-monsoon deep-clean spa session in August or September to remove any fungal build-up from the wet season.</p>
    `,
    related: ['how-often-groom-dog', 'first-grooming-appointment-checklist']
  },
  'first-grooming-appointment-checklist': {
    body: `
      <p>First grooming appointments can be stressful — for both the pet and the owner. Preparation makes a significant difference. Use this checklist to ensure your pet's first professional grooming experience is calm and positive.</p>

      <h2>Before the appointment</h2>
      <ul>
        <li><strong>Book with a beginner-friendly salon.</strong> Tell the salon explicitly that this is your pet's first grooming session. Our Pawfect-verified salons are briefed to handle first-timers with extra care.</li>
        <li><strong>Brush at home 1–2 days before.</strong> Remove any minor tangles before the appointment so the groomer can focus on the full groom rather than just detangling.</li>
        <li><strong>No food 2 hours before.</strong> A full stomach combined with travel and handling can cause nausea, especially in puppies and kittens.</li>
        <li><strong>Practice handling.</strong> For 1–2 weeks before the appointment, regularly touch your pet's paws, ears, and muzzle so being handled during grooming feels familiar.</li>
        <li><strong>Bring vaccination records.</strong> Most professional salons require proof of current rabies and core vaccinations. Keep a copy on your phone.</li>
      </ul>

      <h2>On the day</h2>
      <ul>
        <li>Arrive 5–10 minutes early so your pet can adjust to the new environment.</li>
        <li>Stay calm yourself — pets read your anxiety and respond to it.</li>
        <li>Bring a favourite treat or toy for positive association.</li>
        <li>Inform the groomer of any specific sensitivities (sensitive ears, past trauma, aggressive reactions to certain tools).</li>
      </ul>

      <h2>What to expect during the groom</h2>
      <p>A full groom typically takes 1.5–3 hours depending on breed and coat condition. Most professional salons will contact you when the session is complete. Do not insist on watching the groom — pets behave differently when owners are present, and it often makes the process harder.</p>

      <h2>After the appointment</h2>
      <ul>
        <li>Reward your pet with praise and a treat immediately after pickup.</li>
        <li>Let them rest in a quiet space — grooming is tiring.</li>
        <li>Inspect the groom together with the groomer before leaving and ask about anything you didn't expect.</li>
        <li>Book the next appointment before you leave — consistency makes each visit easier for your pet.</li>
      </ul>
    `,
    related: ['how-often-groom-dog', 'choosing-right-groomer-ahmedabad']
  },
  'choosing-right-groomer-ahmedabad': {
    body: `
      <p>Choosing a groomer is not just about price or proximity. The groomer you select has direct access to your pet's physical wellbeing and emotional state for several hours. Here are 7 factors that separate great groomers from average ones in Ahmedabad.</p>

      <h2>1. Certifications and training</h2>
      <p>Look for groomers who have completed formal training from recognised grooming academies. In India, certifications from institutions like the All India Dog Breeders Association or international schools (City & Guilds, NDGAA) indicate a serious professional.</p>

      <h2>2. Transparency about their process</h2>
      <p>A good groomer will walk you through exactly what they plan to do before starting. If a salon is vague about its process or reluctant to answer questions, look elsewhere.</p>

      <h2>3. Clean, organised facilities</h2>
      <p>Cleanliness is a direct indicator of professionalism. Inspect the grooming tables, tools, and bathing stations before booking. Tables should be wipe-clean and sanitised between pets. Scissors and clippers should be visible and clean.</p>

      <h2>4. Breed-specific expertise</h2>
      <p>Not every groomer knows every breed. A Poodle's coat requires very different techniques from a Labrador's. Always ask whether the groomer has specific experience with your breed before booking.</p>

      <h2>5. Real customer reviews</h2>
      <p>Google reviews are your most reliable signal in Ahmedabad's grooming market. Look for reviews that mention the specific groomer's name, describe the process, and include before/after photos. Beware of salons with uniformly generic 5-star reviews.</p>

      <h2>6. Handling methods</h2>
      <p>Visit in person if possible and observe how groomers interact with animals in their care. You should see calm, patient handling with no shouting, restraint, or visible distress. Any salon using muzzles routinely or keeping dogs in cages for long periods post-groom warrants further questions.</p>

      <h2>7. Emergency protocols</h2>
      <p>Ask what the salon's procedure is if your pet becomes distressed, is injured, or has a medical episode during grooming. A professional salon should have a clear protocol and a relationship with a nearby veterinary clinic.</p>

      <p>All 25 salons listed on Pawfect Ahmedabad have been individually reviewed against these criteria. Salons carrying the Verified badge have passed our complete groomer quality checklist.</p>
    `,
    related: ['first-grooming-appointment-checklist', 'benefits-professional-pet-spa']
  },
};

// ── Helpers ────────────────────────────────────────────────────────
function renderBlogCard(post, featured = false) {
  return `
    <article class="blog-card ${featured ? 'blog-card-featured' : ''}" onclick="window.location.href='/blog/${post.id}'" role="button" tabindex="0" aria-label="Read: ${post.title}">
      <div class="blog-card-image-wrap">
        <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='/assets/salon_109.png'">
        <span class="blog-card-category" style="--cat-color:${post.categoryColor};">${post.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span>${post.date}</span>
          <span class="blog-meta-dot">·</span>
          <span>${post.readTime}</span>
        </div>
        <h2 class="blog-card-title">${post.title}</h2>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-card-footer">
          <div class="blog-author">
            <div class="blog-author-avatar">${post.authorInitials}</div>
            <span>${post.author}</span>
          </div>
          <span class="blog-read-more">Read →</span>
        </div>
      </div>
    </article>
  `;
}

function renderArticlePage(container, postId) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  if (!post) {
    container.innerHTML = `<div style="text-align:center;padding:80px 20px;"><h2>Article not found</h2><a href="/blog" class="btn btn-primary" data-link style="margin-top:20px;">← Back to Blog</a></div>`;
    setTimeout(() => { if (window.lucide) lucide.createIcons(); ScrollReveal.init(); }, 50);
    return;
  }

  const content = ARTICLE_CONTENT[postId];
  const relatedPosts = (content?.related || []).map(id => BLOG_POSTS.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = `
    <div class="blog-article-page" style="padding-top:80px;">

      <!-- Article Hero -->
      <div class="blog-article-hero">
        <img src="${post.image}" alt="${post.title}" onerror="this.src='/assets/salon_109.png'">
        <div class="blog-article-hero-overlay"></div>
      </div>

      <div class="container">
        <div class="blog-article-layout">
          <article class="blog-article-body">

            <!-- Breadcrumb -->
            <div class="blog-breadcrumb">
              <a href="/blog" data-link class="blog-bc-link">Blog</a>
              <span>›</span>
              <span style="color:${post.categoryColor};">${post.category}</span>
            </div>

            <!-- Title -->
            <h1 class="blog-article-title">${post.title}</h1>

            <!-- Byline -->
            <div class="blog-byline">
              <div class="blog-author">
                <div class="blog-author-avatar">${post.authorInitials}</div>
                <div>
                  <div style="font-weight:var(--weight-bold);font-size:var(--text-sm);">${post.author}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Pet Care Specialist</div>
                </div>
              </div>
              <div class="blog-byline-right">
                <span>${post.date}</span>
                <span class="blog-meta-dot">·</span>
                <span>🕐 ${post.readTime}</span>
                <span class="blog-category-pill" style="background:${post.categoryColor}15;color:${post.categoryColor};border:1px solid ${post.categoryColor}30;">${post.category}</span>
              </div>
            </div>

            <!-- Body content -->
            <div class="blog-content">
              ${content?.body || '<p>Full article coming soon.</p>'}
            </div>

            <!-- Tags -->
            <div class="blog-tags">
              ${post.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
            </div>

            <!-- CTA -->
            <div class="blog-article-cta">
              <div class="blog-cta-text">
                <h3>Ready to book a professional grooming session?</h3>
                <p>Browse 25 verified salons across Ahmedabad — compare ratings, prices, and services.</p>
              </div>
              <a href="/discover" class="btn btn-primary" data-link>Browse Salons →</a>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="blog-article-sidebar">
            ${relatedPosts.length ? `
              <div class="blog-sidebar-widget">
                <h4 class="blog-sidebar-title">Related Articles</h4>
                ${relatedPosts.map(rp => `
                  <div class="blog-sidebar-item" onclick="window.location.href='/blog/${rp.id}'" role="button">
                    <div class="blog-sidebar-img">
                      <img src="${rp.image}" alt="${rp.title}" loading="lazy" onerror="this.src='/assets/salon_109.png'">
                    </div>
                    <div>
                      <div style="font-size:var(--text-xs);font-weight:var(--weight-bold);color:${rp.categoryColor};margin-bottom:4px;">${rp.category}</div>
                      <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);line-height:1.35;color:var(--text-primary);">${rp.title}</div>
                      <div style="font-size:11px;color:var(--text-tertiary);margin-top:4px;">${rp.readTime}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <div class="blog-sidebar-widget">
              <h4 class="blog-sidebar-title">Find a Salon Near You</h4>
              <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:16px;">25 verified grooming salons across Ahmedabad. Browse by area.</p>
              <a href="/discover" class="btn btn-primary w-full" data-link>Browse Salons</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();
  }, 50);
}

// ── Main export ────────────────────────────────────────────────────
export async function renderBlog(container, params) {
  const articleId = params?.id;

  if (articleId) {
    renderArticlePage(container, articleId);
    return;
  }

  // ── Blog homepage ──
  const featured = BLOG_POSTS.find(p => p.featured);
  const rest = BLOG_POSTS.filter(p => !p.featured);

  container.innerHTML = `
    <div class="blog-page" style="padding-top:80px;">

      <!-- Hero -->
      <div class="blog-hero">
        <div class="container">
          <span class="section-label"><i data-lucide="book-open" style="width:12px;height:12px;"></i> Pawfect Blog</span>
          <h1 class="blog-hero-title">Pet Care Guides &<br>Grooming Expertise</h1>
          <p class="blog-hero-sub">Expert advice for Ahmedabad pet parents — written by certified groomers and veterinary specialists.</p>
        </div>
      </div>

      <div class="container blog-main-content">

        <!-- Featured post -->
        ${featured ? `
          <section style="margin-bottom:var(--space-12);">
            <div class="blog-section-label">Featured Article</div>
            ${renderBlogCard(featured, true)}
          </section>
        ` : ''}

        <!-- All posts grid -->
        <section>
          <div class="blog-section-label">All Articles</div>
          <div class="blog-grid">
            ${rest.map(p => renderBlogCard(p)).join('')}
          </div>
        </section>

        <!-- Newsletter CTA -->
        <div class="blog-newsletter">
          <div class="blog-newsletter-text">
            <h3>Get Weekly Pet Care Tips</h3>
            <p>Join 12,000+ Ahmedabad pet parents who receive our weekly grooming guides and exclusive offers.</p>
          </div>
          <form class="blog-newsletter-form" onsubmit="event.preventDefault();this.querySelector('input').value='';this.querySelector('button').textContent='Subscribed ✓';">
            <input type="email" placeholder="Your email address" required>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    ScrollReveal.init();
  }, 50);
}
