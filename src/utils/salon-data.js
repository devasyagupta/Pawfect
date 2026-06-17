// ============================================
// PAWFECT — Salon Data Utility
// Centralised module for dynamic per-salon data
// ============================================

import { auth } from './auth.js';

// ── CSV Parser ─────────────────────────────────────────────────────────────
export function parseCSV(text) {
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

// ── Fetch All Salons ────────────────────────────────────────────────────────
let _cachedSalons = null;

export async function fetchAllSalons() {
  if (_cachedSalons) return _cachedSalons;
  const res = await fetch('/ahmedabad_pet_grooming_data.csv');
  const text = await res.text();
  _cachedSalons = parseCSV(text);
  return _cachedSalons;
}

export async function fetchSalonById(id) {
  const salons = await fetchAllSalons();
  return salons.find(s => String(s.id) === String(id)) || null;
}

// ── Gallery Images ──────────────────────────────────────────────────────────
// 100% CURATED local assets. AI-generated, verified pet grooming scenes.
// Each salon gets [hero, img2, img3, img4] — all confirmed salon content.
// NO Unsplash URLs. NO random stock. NO unrelated images.

// Verified pool — every image confirmed to show grooming salon content
const GS = {
  interior1:  '/assets/gs_interior_1.png',   // Modern salon floor, multiple grooming tables
  groomer1:   '/assets/gs_groomer_1.png',    // Groomer trimming golden retriever with scissors
  reception:  '/assets/gs_reception.png',    // Salon reception desk with staff member
  bath:       '/assets/gs_bath.png',         // Dog being bathed in professional stainless tub
  spa:        '/assets/gs_spa.png',          // Luxury pet spa treatment room with organic products
  equipment:  '/assets/gs_equipment.png',    // Full set of grooming tools on stainless table
  waiting:    '/assets/gs_waiting.png',      // Welcoming waiting area / customer lounge
  nail:       '/assets/gs_nail.png',         // Groomer carefully trimming dog nails
  storefront: '/assets/gs_storefront.png',   // Premium pet salon storefront exterior
  blowdry:    '/assets/gs_blowdry.png',      // Groomer blow-drying golden retriever
  interior2:  '/assets/gs_interior_2.png',   // Boutique salon with teal wall and wood accents
  haircut:    '/assets/gs_haircut.png',      // Groomer giving poodle a stylish trim
};

const GALLERY_MAP = {
  101: [GS.reception,  GS.groomer1,  GS.bath,      GS.spa       ],
  102: [GS.interior1,  GS.reception, GS.equipment, GS.blowdry   ],
  103: [GS.groomer1,   GS.bath,      GS.waiting,   GS.nail      ],
  104: [GS.bath,       GS.interior2, GS.groomer1,  GS.equipment ],
  105: [GS.haircut,    GS.interior1, GS.bath,      GS.waiting   ],
  106: [GS.waiting,    GS.reception, GS.nail,      GS.spa       ],
  107: [GS.equipment,  GS.groomer1,  GS.bath,      GS.interior1 ],
  108: [GS.storefront, GS.reception, GS.interior2, GS.waiting   ],
  109: [GS.spa,        GS.blowdry,   GS.nail,      GS.equipment ],
  110: [GS.blowdry,    GS.interior1, GS.bath,      GS.groomer1  ],
  111: [GS.nail,       GS.interior2, GS.reception, GS.haircut   ],
  112: [GS.interior2,  GS.groomer1,  GS.bath,      GS.equipment ],
  113: [GS.reception,  GS.spa,       GS.waiting,   GS.interior1 ],
  114: [GS.groomer1,   GS.haircut,   GS.bath,      GS.equipment ],
  115: [GS.bath,       GS.blowdry,   GS.groomer1,  GS.interior2 ],
  116: [GS.interior1,  GS.nail,      GS.reception, GS.spa       ],
  117: [GS.spa,        GS.groomer1,  GS.equipment, GS.waiting   ],
  118: [GS.haircut,    GS.bath,      GS.interior2, GS.nail      ],
  119: [GS.waiting,    GS.storefront,GS.reception, GS.blowdry   ],
  120: [GS.blowdry,    GS.interior1, GS.bath,      GS.spa       ],
  121: [GS.storefront, GS.groomer1,  GS.waiting,   GS.nail      ],
  122: [GS.equipment,  GS.bath,      GS.interior2, GS.reception ],
  123: [GS.nail,       GS.blowdry,   GS.spa,       GS.groomer1  ],
  124: [GS.interior2,  GS.equipment, GS.bath,      GS.haircut   ],
  125: [GS.groomer1,   GS.interior1, GS.reception, GS.blowdry   ],
};

const GALLERY_FALLBACK = [
  GS.interior1,
  GS.groomer1,
  GS.bath,
  GS.reception,
];



export function getSalonGallery(salonId) {
  return GALLERY_MAP[parseInt(salonId)] || GALLERY_FALLBACK;
}


// ── Services Derivation ─────────────────────────────────────────────────────
const SERVICE_DEFINITIONS = [
  {
    key: 'full_grooming',
    label: 'Full Grooming',
    icon: '✂️',
    lucide: 'scissors',
    keywords: ['groom', 'trim', 'haircut', 'cut', 'styling', 'style', 'profil'],
  },
  {
    key: 'bath_blowdry',
    label: 'Bath & Blow Dry',
    icon: '🚿',
    lucide: 'wind',
    keywords: ['bath', 'shampoo', 'wash', 'blow', 'blowout', 'blowdry'],
  },
  {
    key: 'tick_treatment',
    label: 'Tick & Flea Treatment',
    icon: '🛡️',
    lucide: 'shield',
    keywords: ['tick', 'flea', 'parasite', 'anti-flea', 'anti-parasite', 'flea dip', 'medicated'],
  },
  {
    key: 'nail_care',
    label: 'Nail Trimming',
    icon: '💅',
    lucide: 'scissors',
    keywords: ['nail', 'claw', 'paw', 'filing'],
  },
  {
    key: 'fur_conditioning',
    label: 'Fur Conditioning',
    icon: '✨',
    lucide: 'sparkles',
    keywords: ['condition', 'coat', 'de-shed', 'deshed', 'undercoat', 'mat', 'demat', 'dematting', 'shed'],
  },
  {
    key: 'ear_cleaning',
    label: 'Ear Cleaning',
    icon: '👂',
    lucide: 'activity',
    keywords: ['ear', 'pluck', 'ear canal', 'eye', 'tear'],
  },
  {
    key: 'cat_grooming',
    label: 'Cat Grooming',
    icon: '🐱',
    lucide: 'heart',
    keywords: ['cat', 'feline', 'kitten', 'persian'],
  },
  {
    key: 'spa',
    label: 'Spa & Aromatherapy',
    icon: '🌿',
    lucide: 'leaf',
    keywords: ['spa', 'aroma', 'massage', 'ozone', 'organic', 'hydrat', 'therapy', 'herbal', 'neem'],
  },
  {
    key: 'teeth_cleaning',
    label: 'Teeth Cleaning',
    icon: '🦷',
    lucide: 'zap',
    keywords: ['dental', 'teeth', 'oral', 'mouth'],
  },
  {
    key: 'home_service',
    label: 'Home Service',
    icon: '🏠',
    lucide: 'home',
    keywords: ['home', 'doorstep', 'van', 'mobile', 'in-home'],
  },
];

export function getSalonServices(salon) {
  const combined = `${salon.specialty || ''} ${salon.visit_type || ''}`.toLowerCase();
  const matched = SERVICE_DEFINITIONS.filter(def =>
    def.keywords.some(kw => combined.includes(kw))
  );
  return matched.slice(0, 8);
}

// ── Pricing Packages ────────────────────────────────────────────────────────
export function getSalonPackages(salon) {
  const base = parseInt(salon.starting_price_inr) || 699;
  const popular = salon.popular_package || 'Premium Package';
  const specialty = (salon.specialty || '').toLowerCase();

  // Basic package — always at base price
  const basicFeatures = ['Shampoo Bath', 'Blow Dry & Brush'];
  if (specialty.includes('nail') || specialty.includes('claw')) basicFeatures.push('Nail Clipping');
  if (specialty.includes('ear')) basicFeatures.push('Ear Cleaning');
  basicFeatures.push('Towel Dry Finish');

  // Mid package — popular package from CSV (~1.6x)
  const midPrice = Math.round((base * 1.65) / 50) * 50;
  const midFeatures = ['Bath & Blow Dry', 'Breed-Specific Haircut', 'Nail Trimming', 'Ear Cleaning'];
  if (specialty.includes('spa') || specialty.includes('aroma')) midFeatures.push('Aromatherapy Rinse');
  if (specialty.includes('coat') || specialty.includes('condition')) midFeatures.push('Coat Conditioning');

  // Luxury — signature spa (~2.6x)
  const luxPrice = Math.round((base * 2.6) / 100) * 100;
  const luxFeatures = ['Full Grooming Session', 'Therapeutic Spa Bath', 'Paw Massage & Balm', 'Dental Spray', 'Fur Conditioning', 'Aromatic Finishing Spray'];

  return [
    {
      name: 'Basic Clean',
      price: base,
      features: basicFeatures,
      featured: false,
      selectLabel: 'Select',
    },
    {
      name: popular,
      price: midPrice,
      features: midFeatures,
      featured: true,
      selectLabel: 'Most Popular',
    },
    {
      name: 'Royal Spa Experience',
      price: luxPrice,
      features: luxFeatures,
      featured: false,
      selectLabel: 'Select',
    },
  ];
}

// ── Description Generator ────────────────────────────────────────────────────
export function getSalonDescription(salon) {
  const name = salon.name || 'This salon';
  const locality = salon.locality || 'Ahmedabad';
  const specialty = salon.specialty || '';
  const visitType = salon.visit_type || 'At Salon Session';
  const tables = salon.grooming_tables;
  const parking = salon.valet_parking;

  const isHomeService = visitType.toLowerCase().includes('home') || visitType.toLowerCase().includes('van');
  const isPremiumPartner = salon.verified === 'Yes';

  // Build unique sentence fragments from specialty
  const specialtyParts = specialty
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(', ');

  let desc = `${name} is a ${isPremiumPartner ? 'verified premium partner' : 'trusted local salon'} in ${locality}, Ahmedabad, `;
  desc += `specialising in ${specialtyParts || 'professional pet grooming'} for dogs and cats. `;

  if (isHomeService) {
    desc += `Beyond the salon, they offer a convenient at-home grooming service — bringing expert care directly to your doorstep. `;
  }

  if (tables && parseInt(tables) > 4) {
    desc += `With ${tables} dedicated grooming stations, they can comfortably handle multiple appointments throughout the day. `;
  }

  if (parking === 'Available') {
    desc += `Free parking is available on-site for a hassle-free visit. `;
  }

  desc += `Every session is tailored to your pet's breed, coat type, and temperament — ensuring a calm and comfortable experience from start to finish.`;

  return desc;
}

// ── Opening Hours ────────────────────────────────────────────────────────────
// Deterministic variation per salon to feel real but no random fluctuation
const HOURS_VARIANTS = [
  { open: '9:00 AM', close: '8:00 PM' },
  { open: '10:00 AM', close: '7:00 PM' },
  { open: '9:30 AM', close: '8:30 PM' },
  { open: '8:30 AM', close: '7:30 PM' },
  { open: '10:00 AM', close: '8:00 PM' },
];

export function getSalonHours(salonId) {
  const idx = (parseInt(salonId) || 0) % HOURS_VARIANTS.length;
  return HOURS_VARIANTS[idx];
}

// ── Pet Types ────────────────────────────────────────────────────────────────
export function getSalonPetTypes(salon) {
  const specialty = (salon.specialty || '').toLowerCase();
  const hasCat = specialty.includes('cat') || specialty.includes('feline') || specialty.includes('kitten') || specialty.includes('rabbit');
  const hasDog = !hasCat || specialty.includes('dog') || specialty.includes('breed') || specialty.includes('puppy');
  if (hasCat && hasDog) return { label: 'Dogs & Cats', icon: '🐶🐱' };
  if (hasCat) return { label: 'All Pets', icon: '🐶🐱🐰' };
  return { label: 'Dogs & Cats', icon: '🐶🐱' };
}

// ── Similar Salons ────────────────────────────────────────────────────────────
export function getSimilarSalons(salon, allSalons) {
  if (!salon || !allSalons) return [];
  const others = allSalons.filter(s => s.id !== salon.id);

  // Score: same locality = +3, rating within 0.3 = +2, home service match = +1
  const isHome = v => (v || '').toLowerCase().includes('home') || (v || '').toLowerCase().includes('van');

  const scored = others.map(s => {
    let score = 0;
    if (s.locality === salon.locality) score += 3;
    if (Math.abs(parseFloat(s.rating) - parseFloat(salon.rating)) <= 0.3) score += 2;
    if (isHome(s.visit_type) === isHome(salon.visit_type)) score += 1;
    return { salon: s, score };
  });

  scored.sort((a, b) => b.score - a.score || Math.random() - 0.5);
  return scored.slice(0, 3).map(x => x.salon);
}

// ── Pets from localStorage ────────────────────────────────────────────────────
export function getUserPets() {
  try {
    const user = auth.getCurrentUser();
    const userId = user?.email || null;
    let pets = [];
    if (userId) {
      const userRaw = localStorage.getItem(`pawfect_pets_${userId}`);
      if (userRaw) pets = JSON.parse(userRaw);
    }
    if (!pets.length) {
      const raw = localStorage.getItem('pawfect_pets');
      if (raw) pets = JSON.parse(raw);
    }
    return Array.isArray(pets) ? pets : [];
  } catch {
    return [];
  }
}

// ── Discovery image (used on similar salon cards) ────────────────────────────
export function getSalonThumb(salonId) {
  const gallery = getSalonGallery(salonId);
  return gallery[0];
}
