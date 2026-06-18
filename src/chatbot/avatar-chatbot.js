// ============================================
// PAWFECT — Floating 3D Avatar (Three.js)
// Primary: loads /public/models/bud.glb via GLTFLoader
// Fallback: procedural Pomeranian-inspired mesh
//           (matches Bud's orange/white palette)
// ============================================

import { MakeoverWizard } from './makeover-wizard.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ── Colour palette (Bud's colours) ──────────
const ORANGE     = 0xd4680a;  // main coat
const ORANGE_LT  = 0xe8892b;  // highlight fur
const WHITE      = 0xfaf6f0;  // chest / muzzle / paws
const DARK_BROWN = 0x2c1a0e;  // nose / eyes
const BLUE       = 0x5b9bd5;  // collar
const GOLD       = 0xc9a055;  // tag
const PINK       = 0xf4a0a0;  // tongue

// ── Material factory ─────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.75,
    metalness: 0.0,
    ...opts,
  });
}

// ── Procedural Bud (Pomeranian-inspired) ─────
// Used only when bud.glb hasn't been provided yet.
function buildProceduralBud() {
  const group = new THREE.Group();

  // --- Body (fluffy round torso) ---
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.50, 32, 24),
    mat(ORANGE, { roughness: 0.8 })
  );
  body.scale.set(1, 1.1, 0.88);
  body.position.set(0, -0.10, 0);
  group.add(body);

  // White chest bib
  const chest = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 24, 18),
    mat(WHITE, { roughness: 0.85 })
  );
  chest.scale.set(0.9, 1.1, 0.7);
  chest.position.set(0, -0.04, 0.26);
  group.add(chest);

  // --- Head ---
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.40, 32, 24),
    mat(ORANGE)
  );
  head.position.set(0, 0.64, 0.04);
  group.add(head);

  // White muzzle area
  const muzzle = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 24, 16),
    mat(WHITE, { roughness: 0.9 })
  );
  muzzle.scale.set(1.1, 0.80, 0.82);
  muzzle.position.set(0, 0.52, 0.30);
  group.add(muzzle);

  // Nose (dark oval)
  const nose = new THREE.Mesh(
    new THREE.SphereGeometry(0.068, 16, 12),
    mat(DARK_BROWN, { roughness: 0.35 })
  );
  nose.scale.set(1.1, 0.75, 0.8);
  nose.position.set(0, 0.58, 0.48);
  group.add(nose);

  // Smile / mouth line — flat torus arc
  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.10, 0.018, 8, 20, Math.PI),
    mat(DARK_BROWN)
  );
  smile.position.set(0, 0.46, 0.48);
  smile.rotation.z = Math.PI;
  group.add(smile);

  // Tongue (pink oval)
  const tongue = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 12, 8),
    mat(PINK, { roughness: 0.6 })
  );
  tongue.scale.set(1, 0.55, 0.7);
  tongue.position.set(0, 0.42, 0.50);
  group.add(tongue);

  // Eyes (left & right)
  [-0.17, 0.17].forEach(x => {
    const eyeWhite = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 16, 12),
      mat(WHITE, { roughness: 0.2 })
    );
    eyeWhite.position.set(x, 0.73, 0.30);
    group.add(eyeWhite);

    const iris = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 14, 10),
      mat(DARK_BROWN, { roughness: 0.3 })
    );
    iris.position.set(x, 0.73, 0.34);
    group.add(iris);

    // Specular highlight
    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 8, 6),
      mat(WHITE, { roughness: 0.05, metalness: 0.5 })
    );
    shine.position.set(x + 0.022, 0.755, 0.38);
    group.add(shine);
  });

  // Ears (pointed, upright, fanning out)
  [-1, 1].forEach(side => {
    const ear = new THREE.Mesh(
      new THREE.ConeGeometry(0.16, 0.30, 12),
      mat(ORANGE_LT)
    );
    ear.position.set(side * 0.30, 0.96, 0.0);
    ear.rotation.z = side * -0.28;
    group.add(ear);
  });

  // --- Paws (white) ---
  [-0.24, 0.24].forEach(x => {
    const paw = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 10),
      mat(WHITE, { roughness: 0.9 })
    );
    paw.scale.set(1, 0.65, 0.9);
    paw.position.set(x, -0.52, 0.24);
    group.add(paw);
  });

  // --- Collar (blue band) ---
  const collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.30, 0.045, 10, 32),
    mat(BLUE, { roughness: 0.55 })
  );
  collar.position.set(0, 0.26, 0.06);
  collar.rotation.x = Math.PI / 2 - 0.22;
  group.add(collar);

  // Tag ring (small gold loop)
  const tagRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.028, 0.008, 6, 14),
    mat(GOLD, { roughness: 0.2, metalness: 0.7 })
  );
  tagRing.position.set(0, 0.14, 0.31);
  group.add(tagRing);

  // Tag (oval gold disc) — "BUD"
  const tag = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.065, 0.018, 18),
    mat(GOLD, { roughness: 0.15, metalness: 0.75 })
  );
  tag.position.set(0, 0.06, 0.34);
  tag.rotation.x = Math.PI / 2;
  group.add(tag);

  // --- Fluffy tail (curling up-left) ---
  const tail = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 12),
    mat(ORANGE_LT, { roughness: 0.85 })
  );
  tail.scale.set(1.4, 0.9, 0.7);
  tail.position.set(-0.50, 0.10, -0.28);
  group.add(tail);

  // Tail tip (white fringe)
  const tailTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.10, 12, 8),
    mat(WHITE, { roughness: 0.9 })
  );
  tailTip.position.set(-0.60, 0.24, -0.28);
  group.add(tailTip);

  group.scale.setScalar(0.72);
  return group;
}

// ── Main init ─────────────────────────────────
export function initChatbot() {
  const root = document.getElementById('pawfect-chatbot-root');
  if (!root) return;

  // ── Avatar wrapper ───────────────────────
  const avatarWrap = document.createElement('div');
  avatarWrap.className = 'pawfect-avatar-wrap';
  avatarWrap.setAttribute('role', 'button');
  avatarWrap.setAttribute('aria-label', 'Chat with Bud, Pawfect AI');
  avatarWrap.setAttribute('tabindex', '0');
  avatarWrap.title = 'Chat with Bud 🐾';

  const ring   = document.createElement('div');
  ring.className = 'pawfect-avatar-ring';

  const canvas = document.createElement('canvas');
  canvas.className = 'pawfect-avatar-canvas';
  canvas.width  = 200;
  canvas.height = 200;

  const badge = document.createElement('div');
  badge.className = 'pawfect-avatar-badge';
  badge.id = 'pawfect-notif-badge';
  badge.textContent = '1';

  const label = document.createElement('div');
  label.className = 'pawfect-avatar-label';
  label.textContent = 'Chat with Bud';

  // ── Speech bubble (persistent, above avatar) ──
  const speechBubble = document.createElement('div');
  speechBubble.className = 'pawfect-speech-bubble';
  speechBubble.textContent = 'Chat with Bud 🐾';

  avatarWrap.appendChild(speechBubble);
  avatarWrap.appendChild(canvas);
  avatarWrap.appendChild(ring);
  avatarWrap.appendChild(badge);
  avatarWrap.appendChild(label);
  root.appendChild(avatarWrap);

  // ── Makeover Wizard ─────────────────────
  const wizard = new MakeoverWizard(root);

  // ── Three.js Scene ───────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(200, 200);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20);
  camera.position.set(0, 0.28, 3.2);
  camera.lookAt(0, 0.08, 0);

  // ── Lighting ─────────────────────────────
  const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.8);
  keyLight.position.set(2.5, 4, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xd0e8ff, 1.0);
  fillLight.position.set(-3, 1, 2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xe47d5d, 0.55);
  rimLight.position.set(0, -2, -3);
  scene.add(rimLight);

  scene.add(new THREE.AmbientLight(0xfff8f0, 1.0));

  // ── Mascot: try GLB first, procedural fallback ──
  let mascot = null;
  let glbLoaded = false;

  // Start with procedural Bud immediately (no flash)
  mascot = buildProceduralBud();
  scene.add(mascot);

  // Attempt to load the real bud.glb
  const loader = new GLTFLoader();
  loader.load(
    '/models/bud.glb',

    // ✅ Success — swap out procedural model
    (gltf) => {
      // Dispose procedural mesh
      if (mascot) {
        scene.remove(mascot);
        mascot.traverse(child => {
          if (child.isMesh) {
            child.geometry?.dispose();
            (Array.isArray(child.material)
              ? child.material
              : [child.material]
            ).forEach(m => m?.dispose());
          }
        });
      }

      mascot = gltf.scene;

      // Enable shadows on every mesh in the GLB
      mascot.traverse(child => {
        if (child.isMesh) {
          child.castShadow    = true;
          child.receiveShadow = true;
          // Ensure materials render correctly in sRGB pipeline
          if (child.material) {
            const mats = Array.isArray(child.material)
              ? child.material : [child.material];
            mats.forEach(m => { m.needsUpdate = true; });
          }
        }
      });

      // ── Auto-scale & centre ───────────────────
      // 1. Compute raw bounding box BEFORE any transform
      const box    = new THREE.Box3().setFromObject(mascot);
      const size   = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      console.log('🐾 Bud GLB loaded — raw size:', size.toArray().map(v => v.toFixed(3)));

      // 2. Scale so the tallest axis fits in a ~1.6 unit viewport
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 1.6 / maxDim;
      mascot.scale.setScalar(scale);

      // 3. Re-compute box after scale, then shift so model base sits at y=0
      //    and is centred on x/z — works regardless of Tripo3D's export origin
      const boxScaled = new THREE.Box3().setFromObject(mascot);
      const sizeScaled  = boxScaled.getSize(new THREE.Vector3());
      const centerScaled = boxScaled.getCenter(new THREE.Vector3());

      mascot.position.x = -centerScaled.x;
      mascot.position.z = -centerScaled.z;
      // Sit the model bottom at y = -0.75 so it's vertically centred in view
      mascot.position.y = -centerScaled.y - sizeScaled.y * 0.18;

      // 4. Rotate to face camera if model was exported facing away
      //    (Tripo3D typically exports facing +Z, so no rotation needed;
      //     uncomment the line below if Bud faces backwards)
      // mascot.rotation.y = Math.PI;

      scene.add(mascot);
      glbLoaded = true;
      console.log('🐾 Bud GLB model ready — scaled ×' + scale.toFixed(3));
    },

    // Progress (optional)
    undefined,

    // ❌ Not found — keep procedural, log softly
    (err) => {
      console.info(
        '🐾 bud.glb not found — using procedural Bud.\n' +
        '   Drop your generated model at: /public/models/bud.glb'
      );
    }
  );

  // ── Animation Loop ────────────────────────
  let animFrame;
  const clock = new THREE.Clock();
  let hoverScale    = 1.0;
  const targetScale = { val: 1.0 };
  let glbBaseY      = 0;   // set after GLB is placed; bob adds to this
  let glbBaseScale  = 1.0; // set after GLB is placed

  // Patch the GLB success callback to record base values
  // (We do this by storing them when glbLoaded flips — checked below)
  let glbJustLoaded = false;

  function animate() {
    animFrame = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (mascot) {
      // Record base Y once on the first frame after GLB loads
      if (glbLoaded && !glbJustLoaded) {
        glbBaseY     = mascot.position.y;
        glbBaseScale = mascot.scale.x;
        glbJustLoaded = true;
      }

      // Smooth hover scale (applies to both modes)
      hoverScale += (targetScale.val - hoverScale) * 0.12;

      if (glbLoaded) {
        // --- GLB idle: bob + gentle yaw sway + breathing scale ---
        const breathe = 1 + Math.sin(t * 1.3) * 0.012;
        mascot.position.y = glbBaseY + Math.sin(t * 1.1) * 0.055;
        mascot.rotation.y = Math.sin(t * 0.55) * 0.20;
        mascot.scale.setScalar(glbBaseScale * breathe * hoverScale);
      } else {
        // --- Procedural idle: full animation set ---
        mascot.position.y = Math.sin(t * 1.1) * 0.06;
        mascot.rotation.y = t * 0.22 + Math.sin(t * 0.65) * 0.10;

        const breathe = 1 + Math.sin(t * 1.4) * 0.012;

        // Tail wag
        const children = mascot.children;
        const tailIdx  = children.length - 2;
        if (children[tailIdx]) {
          children[tailIdx].position.x = -0.50 + Math.sin(t * 3.8) * 0.10;
          children[tailIdx].position.y =  0.10 + Math.sin(t * 3.8) * 0.06;
        }

        mascot.scale.setScalar(0.72 * breathe * hoverScale);
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  // ── Hover ────────────────────────────────
  avatarWrap.addEventListener('mouseenter', () => { targetScale.val = 1.12; });
  avatarWrap.addEventListener('mouseleave', () => { targetScale.val = 1.0;  });

  // ── Click: toggle wizard ───────────────────
  function handleToggle() {
    wizard.toggle();
    if (wizard.isOpen) {
      badge.classList.add('hidden');
      root.classList.add('chat-open');     // hides speech bubble
    } else {
      root.classList.remove('chat-open');  // shows speech bubble again
    }
  }
  avatarWrap.addEventListener('click', handleToggle);
  avatarWrap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); }
  });

  // ── Cleanup ───────────────────────────────
  const observer = new MutationObserver(() => {
    if (!document.getElementById('pawfect-chatbot-root')) {
      cancelAnimationFrame(animFrame);
      renderer.dispose();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: false });

  console.log('🐾 Bud AI chatbot initialized');
}

