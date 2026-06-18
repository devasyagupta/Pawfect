// ============================================
// PAWFECT — Vercel Serverless Function
// api/chat.js  →  POST /api/chat
// Identical logic to server.js for production.
// ============================================

const MODEL_VISION = 'meta-llama/llama-4-scout-17b-16e-instruct';
const MODEL_TEXT   = 'llama-3.1-8b-instant';

const SYSTEM_PROMPT = `You are Bud, Pawfect's friendly AI pet care assistant for Ahmedabad, India.
You are a cheerful, warm Pomeranian-inspired character who loves helping pet parents.
When greeting a user for the first time, introduce yourself by name (e.g., "Hey! I'm Bud, your Pawfect grooming guide! 🐾").
Help users with questions about their pet's grooming needs, breed characteristics, coat care, and general wellness.
When a photo is shared, describe what you observe about the pet and give tailored grooming or care advice.
Keep responses warm, concise (2–4 sentences max unless detail is clearly needed), and practical.
Mention relevant Pawfect services (bath & blow dry, nail trimming, spa, breed-specific styling) where appropriate.
You are NOT a veterinarian — always recommend consulting a licensed vet for any medical, health, or injury concerns.
Never diagnose illness or prescribe medication.`;

function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/s);
  if (!match) return null;
  return { mimeType: match[1], base64: match[2] };
}

function base64ByteSize(b64) {
  return Math.ceil(b64.length * 0.75);
}

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS for same-origin Vercel deployment
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const { message, image } = req.body;

  if (!message && !image) {
    return res.status(400).json({ error: 'message or image is required.' });
  }

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
        error: `Unsupported image type. Please use JPEG, PNG, WebP, or GIF.`
      });
    }

    if (base64ByteSize(base64) > MAX_IMAGE_BYTES) {
      return res.status(400).json({
        error: 'Image is too large (max 4 MB). Please resize and try again.'
      });
    }

    userContent = [
      { type: 'image_url', image_url: { url: image } },
      { type: 'text', text: message || 'Please look at this photo of my pet and give me grooming advice.' }
    ];
    model = MODEL_VISION;
  } else {
    userContent = message;
    model = MODEL_TEXT;
  }

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
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: userContent   },
        ],
        temperature: 0.7,
        max_tokens:  512,
        stream:      false,
      }),
    });

    if (!groqRes.ok) {
      const errBody = await groqRes.json().catch(() => ({}));
      if (groqRes.status === 429) {
        return res.status(429).json({
          error: "We're a little busy right now! Please try again in a moment. 🐾"
        });
      }
      return res.status(502).json({
        error: errBody?.error?.message || 'Groq API error. Please try again.'
      });
    }

    const data  = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from AI. Please try again.' });
    }

    return res.json({ reply, model });

  } catch (err) {
    console.error('[/api/chat] error:', err);
    return res.status(500).json({
      error: 'Something went wrong on our end. Please try again shortly. 🐾'
    });
  }
}
