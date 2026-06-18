// ============================================
// PAWFECT — Express API Server
// Proxied by Vite in dev, standalone in prod.
// POST /api/chat  →  Groq chat completions
// ============================================

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app  = express();
const PORT = process.env.API_PORT || 3001;

app.use(express.json({ limit: '10mb' }));  // allow base64 image payloads

// ── Model IDs ───────────────────────────────
const MODEL_VISION = 'meta-llama/llama-4-scout-17b-16e-instruct';
const MODEL_TEXT   = 'llama-3.1-8b-instant';

// ── System Prompt ────────────────────────────
const SYSTEM_PROMPT = `You are Bud, Pawfect's friendly AI pet care assistant for Ahmedabad, India.
You are a cheerful, warm Pomeranian-inspired character who loves helping pet parents.
When greeting a user for the first time, introduce yourself by name (e.g., "Hey! I'm Bud, your Pawfect grooming guide! 🐾").
Help users with questions about their pet's grooming needs, breed characteristics, coat care, and general wellness.
When a photo is shared, describe what you observe about the pet and give tailored grooming or care advice.
Keep responses warm, concise (2–4 sentences max unless detail is clearly needed), and practical.
Mention relevant Pawfect services (bath & blow dry, nail trimming, spa, breed-specific styling) where appropriate.
You are NOT a veterinarian — always recommend consulting a licensed vet for any medical, health, or injury concerns.
Never diagnose illness or prescribe medication.`;

// ── Helpers ──────────────────────────────────

/**
 * Extract MIME type and pure base64 string from a data URL.
 * Returns null if the format is unrecognised.
 */
function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/s);
  if (!match) return null;
  return { mimeType: match[1], base64: match[2] };
}

/**
 * Rough byte size of a base64 string (actual decoded bytes ≈ len * 0.75).
 * Groq limit for base64 images: 4 MB.
 */
function base64ByteSize(b64) {
  return Math.ceil(b64.length * 0.75);
}

const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB

// ── Route: POST /api/chat ────────────────────
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server configuration error: GROQ_API_KEY is not set.'
    });
  }

  const { message, image } = req.body;

  if (!message && !image) {
    return res.status(400).json({ error: 'message or image is required.' });
  }

  // ── Build user content block ─────────────
  let userContent;
  let model = MODEL_TEXT;

  if (image) {
    const parsed = parseDataUrl(image);

    if (!parsed) {
      return res.status(400).json({
        error: 'Invalid image format. Please upload a JPEG, PNG, or WebP image.'
      });
    }

    const { mimeType, base64 } = parsed;

    const SUPPORTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!SUPPORTED.includes(mimeType)) {
      return res.status(400).json({
        error: `Unsupported image type (${mimeType}). Please use JPEG, PNG, WebP, or GIF.`
      });
    }

    if (base64ByteSize(base64) > MAX_IMAGE_BYTES) {
      return res.status(400).json({
        error: 'Image is too large (max 4 MB). Please resize and try again.'
      });
    }

    // Multimodal content block (Groq / OpenAI vision format)
    userContent = [
      {
        type: 'image_url',
        image_url: {
          url: image,   // full data URL — Groq accepts data URIs
        }
      },
      {
        type: 'text',
        text: message || 'Please look at this photo of my pet and give me grooming advice.'
      }
    ];
    model = MODEL_VISION;

  } else {
    userContent = message;
    model = MODEL_TEXT;
  }

  // ── Call Groq API ─────────────────────────
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system',  content: SYSTEM_PROMPT },
          { role: 'user',    content: userContent   },
        ],
        temperature:  0.7,
        max_tokens:   512,
        stream:       false,
      }),
    });

    if (!groqRes.ok) {
      const errBody = await groqRes.json().catch(() => ({}));

      // Rate limit
      if (groqRes.status === 429) {
        return res.status(429).json({
          error: "We're a little busy right now! Please try again in a moment. 🐾"
        });
      }

      console.error('[Groq API error]', groqRes.status, errBody);
      return res.status(502).json({
        error: errBody?.error?.message || 'Groq API error. Please try again.'
      });
    }

    const data   = await groqRes.json();
    const reply  = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from AI. Please try again.' });
    }

    return res.json({ reply, model });

  } catch (err) {
    console.error('[/api/chat] Unexpected error:', err);
    return res.status(500).json({
      error: 'Something went wrong on our end. Please try again shortly. 🐾'
    });
  }
});

// ── Health check ─────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'pawfect-ai' });
});

app.listen(PORT, () => {
  console.log(`🐾 Pawfect API server running on http://localhost:${PORT}`);
  if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️  GROQ_API_KEY is not set — /api/chat will return 500');
  }
});
