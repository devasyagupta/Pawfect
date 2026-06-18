// ============================================
// PAWFECT — Chat Panel UI
// Manages the slide-up chat card with messages,
// typing indicator, image upload & send logic.
// Calls /api/chat (server-side Groq proxy) —
// the API key is NEVER present in this file.
// ============================================

// ── Live AI call ──────────────────────────────
/**
 * Send message + optional base64 image to the
 * secure backend proxy, which calls Groq.
 * @param {string} message
 * @param {string|null} imageDataUrl  full data: URL
 * @returns {Promise<string>} assistant reply
 */
async function getAIResponse(message, imageDataUrl) {
  const body = { message };
  if (imageDataUrl) body.image = imageDataUrl;

  const res = await fetch('/api/chat', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    // Server returned a friendly error message — bubble it up
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data.reply;
}

// ── Time formatter ────────────────────────────
function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// ── Chat Panel Class ──────────────────────────
export class ChatPanel {
  constructor(rootEl) {
    this.rootEl       = rootEl;
    this.isOpen       = false;
    this.isTyping     = false;
    this.pendingImage = null; // { dataUrl, name }
    this.messageCount = 0;

    this._buildDOM();
    this._bindEvents();
  }

  // ── Build Panel HTML ───────────────────────
  _buildDOM() {
    this.panel = document.createElement('div');
    this.panel.className = 'pawfect-chat-panel';
    this.panel.setAttribute('role', 'dialog');
    this.panel.setAttribute('aria-modal', 'true');
    this.panel.setAttribute('aria-label', 'Chat with Bud — Pawfect AI');

    this.panel.innerHTML = `
      <!-- Header -->
      <div class="pawfect-chat-header">
        <div class="pawfect-chat-header-avatar" id="pawfect-header-avatar-mini">🐾</div>
        <div class="pawfect-chat-header-info">
          <div class="pawfect-chat-header-name">Bud 🐾</div>
          <div class="pawfect-chat-header-status">
            <span class="pawfect-status-dot"></span>
            <span>Online · Pawfect AI Assistant</span>
          </div>
        </div>
        <button class="pawfect-chat-close" id="pawfect-close-btn" aria-label="Close chat">✕</button>
      </div>

      <!-- Messages -->
      <div class="pawfect-chat-messages" id="pawfect-messages" role="log" aria-live="polite"></div>

      <!-- Disclaimer -->
      <div class="pawfect-disclaimer" id="pawfect-disclaimer">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;opacity:.7"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        AI-generated suggestions — always consult a vet for medical concerns
      </div>

      <!-- Footer / Input -->
      <div class="pawfect-chat-footer">
        <div class="pawfect-image-preview-wrap" id="pawfect-preview-wrap">
          <img class="pawfect-preview-thumb" id="pawfect-preview-thumb" src="" alt="Selected image preview">
          <span class="pawfect-preview-label" id="pawfect-preview-label">photo.jpg</span>
          <button class="pawfect-preview-remove" id="pawfect-preview-remove" aria-label="Remove image">✕</button>
        </div>
        <div class="pawfect-input-row">
          <textarea
            class="pawfect-input-field"
            id="pawfect-input"
            placeholder="Ask about grooming, salons, pricing…"
            rows="1"
            aria-label="Chat message input"
          ></textarea>
          <div class="pawfect-input-actions">
            <label for="pawfect-file-input" class="pawfect-upload-btn" title="Upload a photo of your pet" aria-label="Upload pet photo">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </label>
            <input type="file" id="pawfect-file-input" accept="image/*" aria-label="Select image file">
            <button class="pawfect-send-btn" id="pawfect-send-btn" aria-label="Send message" disabled>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    this.rootEl.appendChild(this.panel);

    // Cache references
    this.messagesEl   = this.panel.querySelector('#pawfect-messages');
    this.inputEl      = this.panel.querySelector('#pawfect-input');
    this.sendBtn      = this.panel.querySelector('#pawfect-send-btn');
    this.closeBtn     = this.panel.querySelector('#pawfect-close-btn');
    this.fileInput    = this.panel.querySelector('#pawfect-file-input');
    this.previewWrap  = this.panel.querySelector('#pawfect-preview-wrap');
    this.previewThumb = this.panel.querySelector('#pawfect-preview-thumb');
    this.previewLabel = this.panel.querySelector('#pawfect-preview-label');
    this.previewRemove= this.panel.querySelector('#pawfect-preview-remove');

    this._appendWelcome();
  }

  // ── Welcome Banner ─────────────────────────
  _appendWelcome() {
    const welcome = document.createElement('div');
    welcome.className = 'pawfect-welcome-banner';
    welcome.innerHTML = `
      <span class="pawfect-welcome-paw">🐾</span>
      <h4>Hey! I'm Bud 👋</h4>
      <p>Your Pawfect AI grooming guide. Ask me anything about your pet's care, salons, or services in Ahmedabad!</p>
    `;
    this.messagesEl.appendChild(welcome);

    const chips = document.createElement('div');
    chips.className = 'pawfect-chips';
    chips.innerHTML = `
      <button class="pawfect-chip" data-chip="Find a salon near me">Find a salon near me</button>
      <button class="pawfect-chip" data-chip="What services do you offer?">What services?</button>
      <button class="pawfect-chip" data-chip="How much does grooming cost?">Pricing info</button>
      <button class="pawfect-chip" data-chip="How do I book an appointment?">How to book?</button>
    `;
    this.messagesEl.appendChild(chips);
  }

  // ── Event Bindings ──────────────────────────
  _bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    this.inputEl.addEventListener('input', () => {
      this._autoResize();
      this._updateSendState();
    });

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this._handleSend();
      }
    });

    this.sendBtn.addEventListener('click', () => this._handleSend());

    this.fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this._handleImageSelected(file);
      this.fileInput.value = '';
    });

    this.previewRemove.addEventListener('click', () => this._clearImagePreview());

    // Quick-reply chips (delegated)
    this.messagesEl.addEventListener('click', (e) => {
      const chip = e.target.closest('.pawfect-chip');
      if (chip) {
        const text = chip.dataset.chip;
        this.inputEl.value = text;
        this._updateSendState();
        this.inputEl.focus();
        this._handleSend();
      }
    });
  }

  // ── Auto-resize textarea ────────────────────
  _autoResize() {
    this.inputEl.style.height = 'auto';
    this.inputEl.style.height = Math.min(this.inputEl.scrollHeight, 100) + 'px';
  }

  // ── Send button enabled state ───────────────
  _updateSendState() {
    const hasText  = this.inputEl.value.trim().length > 0;
    const hasImage = this.pendingImage !== null;
    this.sendBtn.disabled = (!hasText && !hasImage) || this.isTyping;
  }

  // ── Handle image selection ──────────────────
  _handleImageSelected(file) {
    // Client-side pre-check: 4 MB max (Groq base64 limit)
    if (file.size > 4 * 1024 * 1024) {
      this._showErrorBubble('That image is too large (max 4 MB). Please resize it and try again.');
      return;
    }

    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!supportedTypes.includes(file.type)) {
      this._showErrorBubble('Unsupported image format. Please use JPEG, PNG, WebP, or GIF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.pendingImage = { dataUrl: e.target.result, name: file.name };
      this.previewThumb.src = e.target.result;
      this.previewLabel.textContent = file.name.length > 22
        ? file.name.slice(0, 20) + '…'
        : file.name;
      this.previewWrap.classList.add('visible');
      this._updateSendState();
    };
    reader.readAsDataURL(file);
  }

  // ── Clear image preview ─────────────────────
  _clearImagePreview() {
    this.pendingImage = null;
    this.previewThumb.src = '';
    this.previewWrap.classList.remove('visible');
    this._updateSendState();
  }

  // ── Append a message bubble ─────────────────
  appendMessage(role, text, imageDataUrl = null) {
    const isUser = role === 'user';
    const row = document.createElement('div');
    row.className = `pawfect-msg ${role}`;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'pawfect-msg-avatar';
    avatarEl.textContent = isUser ? 'You' : 'Bud';
    if (!isUser) avatarEl.title = 'Bud — Pawfect AI';

    const bubble = document.createElement('div');
    bubble.className = 'pawfect-bubble';

    if (imageDataUrl) {
      const img = document.createElement('img');
      img.src = imageDataUrl;
      img.className = 'pawfect-bubble-image';
      img.alt = 'Uploaded pet photo';
      bubble.appendChild(img);
    }

    if (text) {
      const textNode = document.createElement('div');
      textNode.textContent = text;
      bubble.appendChild(textNode);
    }

    const timeEl = document.createElement('div');
    timeEl.className = 'pawfect-bubble-time';
    timeEl.textContent = formatTime(new Date());
    bubble.appendChild(timeEl);

    row.appendChild(avatarEl);
    row.appendChild(bubble);
    this.messagesEl.appendChild(row);
    this._scrollToBottom();
    this.messageCount++;
  }

  // ── Error bubble (assistant-style) ─────────
  _showErrorBubble(message) {
    const row = document.createElement('div');
    row.className = 'pawfect-msg assistant';
    row.innerHTML = `
      <div class="pawfect-msg-avatar">🐾</div>
      <div class="pawfect-bubble" style="border-color:rgba(225,29,72,0.2);background:#fff5f7;">
        <div style="color:#e11d48;font-size:12px;font-weight:600;margin-bottom:4px;">⚠️ Oops!</div>
        <div>${message}</div>
        <div class="pawfect-bubble-time" style="color:#9BAAB8;">${formatTime(new Date())}</div>
      </div>
    `;
    this.messagesEl.appendChild(row);
    this._scrollToBottom();
  }

  // ── Typing indicator ────────────────────────
  _showTyping() {
    this.typingEl = document.createElement('div');
    this.typingEl.className = 'pawfect-typing-indicator';
    this.typingEl.innerHTML = `
      <div class="pawfect-msg-avatar">🐾</div>
      <div class="pawfect-typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    this.messagesEl.appendChild(this.typingEl);
    this._scrollToBottom();
    this.isTyping = true;
    this._updateSendState();
  }

  _hideTyping() {
    if (this.typingEl) {
      this.typingEl.remove();
      this.typingEl = null;
    }
    this.isTyping = false;
    this._updateSendState();
  }

  // ── Handle sending ──────────────────────────
  async _handleSend() {
    const text  = this.inputEl.value.trim();
    const image = this.pendingImage;

    if ((!text && !image) || this.isTyping) return;

    // Remove welcome banner + chips on first real message
    if (this.messageCount === 0) {
      this.messagesEl.querySelector('.pawfect-chips')?.remove();
      this.messagesEl.querySelector('.pawfect-welcome-banner')?.remove();
    }

    // Append user message immediately
    this.appendMessage('user', text || null, image ? image.dataUrl : null);

    // Clear inputs
    this.inputEl.value = '';
    this.inputEl.style.height = 'auto';
    this._clearImagePreview();
    this._updateSendState();

    // Show typing dots — Groq is fast so this won't linger
    this._showTyping();

    try {
      const reply = await getAIResponse(text || null, image ? image.dataUrl : null);
      this._hideTyping();
      this.appendMessage('assistant', reply);
    } catch (err) {
      this._hideTyping();
      this._showErrorBubble(err.message || 'Something went wrong. Please try again. 🐾');
    }
  }

  // ── Scroll helpers ──────────────────────────
  _scrollToBottom() {
    requestAnimationFrame(() => {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    });
  }

  // ── Open / Close ────────────────────────────
  open() {
    this.isOpen = true;
    this.panel.classList.add('open');
    setTimeout(() => this.inputEl?.focus(), 420);
  }

  close() {
    this.isOpen = false;
    this.panel.classList.remove('open');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}
