/* ============================================
   Animal Crossing Valentine - Script
   ============================================ */

// ---------- Chat Flow Data ----------
const chatFlow = {
  start: {
    messages: [
      { sender: 'Sebastian', text: 'Hola Ari' }
    ],
    options: [
      { text: 'Hola Sebis', next: 'greeting_positive' },
      { text: 'No quiero hablar ahora', next: 'greeting_negative' }
    ]
  },
  greeting_positive: {
    messages: [
      { sender: 'Sebastian', text: 'Ariana momento serio' }
    ],
    options: [
      { text: 'Que cosa 😮', next: 'question' },
      { text: 'Serio 😐', next: 'question' }
    ]
  },
  greeting_negative: {
    messages: [
      { sender: 'Sebastian', text: 'T.T' },
      { sender: 'Sebastian', text: 'sera solo un momento Ariana >:(' }
    ],
    options: [
      { text: 'Esta bien', next: 'question' },
      { text: 'Dime amor', next: 'question' }
    ]
  },
  question: {
    messages: [
      { sender: 'Sebastian', text: 'Tengo que hacerte una pregunta, ya que pronto es una fecha importante' }
    ],
    options: [
      { text: 'Dime Dime Dime', next: 'love_declaration' },
      { text: 'Que cosa 😮', next: 'love_declaration' }
    ]
  },
  love_declaration: {
    messages: [
      { sender: 'Sebastian', text: 'Si sabes que te amo muchísimo más de lo que tu jamas podrás amarme no?' }
    ],
    options: [
      { text: 'Si lo se amor. Te amo, pero no más de lo que tu me amas', next: 'proposal' },
      { text: 'No, yo te amo más', next: '__lie_attempt__' }
    ]
  },
  lie_reply: {
    messages: [
      { sender: 'Sebastian', text: 'Jamás' }
    ],
    options: [],
    autoNext: 'proposal',
    autoDelay: 1200
  },
  proposal: {
    messages: [
      { sender: 'Sebastian', text: 'Bueno ahora que deje claro que te amo mucho más, hay algo más que quiero preguntarte.' },
      { type: 'typing_pause', duration: 4500 },
      { sender: 'Sebastian', text: 'Quieres ser mi San Valentin? ❤️' }
    ],
    options: [
      { text: 'Si quiero, te amo', next: 'final' },
      { text: 'No deseo, buenas tardes.', next: '__nook_reject__' }
    ]
  },
  final: {
    messages: [
      { sender: 'Sebastian', text: 'Te amo muchísimo mas princesita' },
      { sender: 'Sebastian', text: 'Bueno eso era todo, ya no puedo esperar para verte mañana. Nuevamente te amo mucho más. Espero te gustara' }
    ],
    options: [],
    endScreen: true
  }
};

// ---------- State ----------
let currentState = 'menu';
let audioCtx = null;
let lieAttempts = 0;
let nookRejectAttempts = 0;

// ---------- DOM Elements ----------
const screens = {
  menu: document.getElementById('screen-menu'),
  phone: document.getElementById('screen-phone')
};
const phoneFrame = document.getElementById('phone-frame');
const chatMessagesEl = document.getElementById('chat-messages');
const chatOptionsEl = document.getElementById('chat-options');

// ---------- Screen Management ----------
function changeScreen(to) {
  const current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');

  screens[to].classList.add('active');
  currentState = to;

  if (to === 'phone') {
    updatePhoneTime();
    phoneFrame.classList.remove('chat-mode');
  }
}

// ---------- Chat Mode (inside phone) ----------
function openChat() {
  phoneFrame.classList.add('chat-mode');
  chatMessagesEl.innerHTML = '';
  chatOptionsEl.innerHTML = '';
  lieAttempts = 0;
  nookRejectAttempts = 0;
  startChat('start');
}

function closeChat() {
  phoneFrame.classList.remove('chat-mode');
}

// ---------- Phone Time ----------
function updatePhoneTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('phone-time').textContent = `${h}:${m}`;
}

// ---------- Audio (AC-style bleeps) ----------
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playBleep() {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.value = 280 + Math.random() * 320;
    gain.gain.value = 0.03;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.stop(audioCtx.currentTime + 0.07);
  } catch (e) {
    // Silently fail if audio context has issues
  }
}

// ---------- Chat Engine ----------
function startChat(stepId) {
  const step = chatFlow[stepId];
  if (!step) return;

  showMessages(step.messages, 0, () => {
    if (step.autoNext) {
      setTimeout(() => startChat(step.autoNext), step.autoDelay || 800);
    } else if (step.options && step.options.length > 0) {
      showOptions(step.options);
    } else if (step.endScreen) {
      setTimeout(() => showFinalScreen(), 2000);
    }
  });
}

function showMessages(messages, index, onComplete) {
  if (index >= messages.length) {
    if (onComplete) onComplete();
    return;
  }

  const msg = messages[index];

  // Handle typing pause indicator
  if (msg.type === 'typing_pause') {
    const indicator = createTypingIndicator();
    chatMessagesEl.appendChild(indicator);
    scrollToBottom();
    setTimeout(() => {
      indicator.remove();
      showMessages(messages, index + 1, onComplete);
    }, msg.duration || 2000);
    return;
  }

  const bubble = createBubble(msg.sender, msg.text, 'left');
  chatMessagesEl.appendChild(bubble);

  const textEl = bubble.querySelector('.bubble-text');
  typewriterEffect(textEl, msg.text, () => {
    scrollToBottom();
    setTimeout(() => {
      showMessages(messages, index + 1, onComplete);
    }, 600);
  });
}

function createTypingIndicator() {
  const wrapper = document.createElement('div');
  wrapper.className = 'bubble left';

  const nameTag = document.createElement('div');
  nameTag.className = 'name-tag';
  nameTag.textContent = 'Sebastian';
  wrapper.appendChild(nameTag);

  const content = document.createElement('div');
  content.className = 'bubble-content typing-indicator';
  content.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  wrapper.appendChild(content);

  return wrapper;
}

function createBubble(sender, text, side) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${side}`;

  if (side === 'left' && sender) {
    const nameTag = document.createElement('div');
    nameTag.className = 'name-tag';
    nameTag.textContent = sender;
    bubble.appendChild(nameTag);
  }

  const content = document.createElement('div');
  content.className = 'bubble-content';

  const textSpan = document.createElement('span');
  textSpan.className = 'bubble-text';
  content.appendChild(textSpan);

  bubble.appendChild(content);
  return bubble;
}

function typewriterEffect(el, text, onComplete) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.appendChild(cursor);

  const speed = 45;

  function type() {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      if (i % 2 === 0) playBleep();
      i++;
      scrollToBottom();
      setTimeout(type, speed);
    } else {
      cursor.remove();
      if (onComplete) onComplete();
    }
  }

  type();
}

function showOptions(options) {
  chatOptionsEl.innerHTML = '';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => handleOption(opt));
    chatOptionsEl.appendChild(btn);
  });
}

function handleOption(option) {
  // ---------- Special: Lie detector (etapa 4) ----------
  if (option.next === '__lie_attempt__') {
    lieAttempts++;

    if (lieAttempts <= 2) {
      // First and second attempt: show alert, don't send message
      showChatAlert('No se permite mentir en este chat');
      return;
    }
    // Third attempt: send message, get "Jamás", continue
    addUserBubble(option.text);
    chatOptionsEl.innerHTML = '';
    setTimeout(() => startChat('lie_reply'), 800);
    return;
  }

  // ---------- Special: Nook rejection (etapa 5) ----------
  if (option.next === '__nook_reject__') {
    nookRejectAttempts++;

    if (nookRejectAttempts === 1) {
      // First attempt: Tom Nook overlay
      showNookAlert('RESPUESTA NO APROBADA POR TOM NOOK', false);
      return;
    }
    // Second attempt: Tom Nook zoomed + update, then only option 1
    showNookAlert('Update de NookPhone', true, () => {
      // Show only the first option
      chatOptionsEl.innerHTML = '';
      const step = chatFlow['proposal'];
      const safeOpt = step.options[0];
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = safeOpt.text;
      btn.addEventListener('click', () => handleOption(safeOpt));
      chatOptionsEl.appendChild(btn);
    });
    return;
  }

  // ---------- Normal flow ----------
  addUserBubble(option.text);
  chatOptionsEl.innerHTML = '';

  setTimeout(() => {
    startChat(option.next);
  }, 800);
}

function addUserBubble(text) {
  const userBubble = createBubble(null, text, 'right');
  chatMessagesEl.appendChild(userBubble);
  const textEl = userBubble.querySelector('.bubble-text');
  textEl.textContent = text;
  scrollToBottom();
}

function scrollToBottom() {
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

// ---------- Chat Alert (lie detector) ----------
function showChatAlert(message) {
  const alert = document.createElement('div');
  alert.className = 'chat-alert';
  alert.innerHTML = `<div class="chat-alert-content"><p>${message}</p></div>`;
  phoneFrame.appendChild(alert);

  setTimeout(() => {
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 400);
  }, 1000);
}

// ---------- Nook Alert (proposal rejection) ----------
function showNookAlert(message, zoomed, onDismiss) {
  const alert = document.createElement('div');
  alert.className = 'nook-overlay';
  alert.innerHTML = `
    <div class="nook-overlay-bg"></div>
    <div class="nook-overlay-content ${zoomed ? 'zoomed' : ''}">
      <img src="SVGs/tomnook tpose.png" alt="Tom Nook" class="nook-image">
      <p class="nook-message">${message}</p>
    </div>
  `;
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.classList.add('fade-out');
    setTimeout(() => {
      alert.remove();
      if (onDismiss) onDismiss();
    }, 400);
  }, 1500);
}

// ---------- Final Screen ----------
function showFinalScreen() {
  closeChat();
  setTimeout(() => changeScreen('menu'), 800);
}

// ---------- Event Listeners ----------
document.addEventListener('DOMContentLoaded', () => {
  // Menu → Phone
  document.getElementById('btn-continue').addEventListener('click', () => {
    initAudio();
    changeScreen('phone');
  });

  // Messages app → Chat (inside phone)
  document.getElementById('app-messages').addEventListener('click', () => {
    openChat();
  });

  // Chat back button → Phone apps
  document.getElementById('btn-chat-back').addEventListener('click', () => {
    closeChat();
  });

  // Make non-Messages apps do a gentle shake when tapped
  document.querySelectorAll('.app-slot:not(#app-messages)').forEach(slot => {
    slot.addEventListener('click', () => {
      slot.style.animation = 'none';
      slot.offsetHeight;
      slot.style.animation = 'shake 0.4s ease';
    });
  });
});

// Shake animation (added via JS to avoid CSS bloat)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-4px); }
    40% { transform: translateX(4px); }
    60% { transform: translateX(-3px); }
    80% { transform: translateX(3px); }
  }
`;
document.head.appendChild(shakeStyle);
