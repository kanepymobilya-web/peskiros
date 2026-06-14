// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initApp();
});

// App State
const state = {
  activeTab: 'dashboard',
  agentsActive: 4,
  memorySize: 142, // KB
  apiCost: 1.42,
  ttsEnabled: false,
  currentModel: 'deepseek-v4',
  
  // Inbox data
  inbox: [
    {
      id: 1,
      sender: 'techblog.org',
      email: 'editor@techblog.org',
      time: '11:42',
      subject: 'Re: SEO İş Birliği Fırsatı',
      snippet: 'Bizimle backlink iş birliği yapmak istediğinizi belirttiniz. Detaylar nedir?',
      body: `<p>Merhaba Jarvis,</p>
             <p>Web sitemiz üzerinden backlink iş birliği yapmak istediğinize dair bir mail aldım. Bahsettiğiniz 'Yeni Nesil SEO Rehberi' içeriğini inceledim ve oldukça kaliteli buldum. Sitemizde bu konuda bir link paylaşımı yapabiliriz.</p>
             <p>Teklifiniz ve detaylarınız tam olarak nedir? Hangi makalemizden link çıkışı istiyorsunuz?</p>
             <p>Saygılarımla,<br>techblog.org Editör Ekibi</p>`,
      tags: ['Backlink Outreach', 'Önemli'],
      status: 'review', // review, approved, declined
      draft: `Merhaba techblog.org Ekibi,

Hızlı dönüşünüz ve makalemize gösterdiğiniz ilgi için çok teşekkürler! 

Sitenizde yer alan "2026'da Dijital Pazarlama Trendleri" makalenizdeki "Backlink Stratejileri" başlığı altından bizim "Yeni Nesil SEO Rehberi" sayfamıza (https://company.com/seo-guide) link vermenizi öneriyoruz. Bu, okuyucularınıza yüksek değerli ek bağlam sunacaktır.

Karşılık olarak, bizim de bir sonraki blog yazımızda sizin sitemize ilgili bir link ile referans vermekten memnuniyet duyacağımızı belirtmek isterim.

Onaylarsanız makaleyi düzenlemeniz için gerekli çapa metnini (anchor text) iletebilirim.

Saygılarımla,
CEO (Hermes AI Aracılığıyla)`
    },
    {
      id: 2,
      sender: 'content-king.com',
      email: 'partnership@content-king.com',
      time: '10:15',
      subject: 'Re: Sponsorlu İçerik Yayınlama',
      snippet: 'Yazınızı yayınlamak için 100$ bütçe talep ediyoruz...',
      body: `<p>Sayın Yetkili,</p>
             <p>İçerik pazarlama ekibimiz gönderdiğiniz makale taslağını inceledi. Sitemizdeki yüksek otorite (Domain Authority) değeri sebebiyle, dışarı giden link içeren yazılar için 100 USD tutarında bir sponsorluk bedeli uygulamaktayız.</p>
             <p>Bütçeniz buna uygunsa faturayı kesip yazınızı gün içinde yayına alabiliriz. Geri dönüşünüzü bekliyoruz.</p>
             <p>Saygılar,<br>Content King Partnership Manager</p>`,
      tags: ['Pazarlık'],
      status: 'review',
      draft: `Merhaba Content King Ekibi,

100 USD tutarındaki teklifiniz için teşekkürler. Ancak sitemiz tamamen ücretsiz eğitim rehberleri sunmaktadır ve ticari olmayan bir SEO bütçesiyle çalışıyoruz.

Bütçeyi 70 USD seviyesine çekebilirseniz veya karşılıklı link değişimi (link exchange) formülünü kabul ederseniz hemen süreci başlatabiliriz. 

Alternatif tekliflerimizi değerlendirmenizi rica ederim.

Saygılarımla,
CEO (Hermes AI Aracılığıyla)`
    },
    {
      id: 3,
      sender: 'seo-masters.net',
      email: 'hello@seo-masters.net',
      time: 'Dün',
      subject: 'Öneri: Ücretsiz Rehber Değişimi',
      snippet: 'Harika bir SEO rehberiniz olduğunu gördük. Karşılıklı link paylaşımı yapabiliriz.',
      body: `<p>Merhaba SEO Yöneticisi,</p>
             <p>Kendi sitemizde link inşası yaparken sizin 'Gelişmiş Web Tasarım Rehberi' makalenizle karşılaştık. İçeriğiniz gerçekten harika.</p>
             <p>Kendi portalımızda size ait linkleri paylaşırken, sizin de bir yazınızda bizim 'Arama Motoru Optimizasyonu Sırları' makalemize yönlendirme yapmanızı öneriyoruz. Bu ücretsiz takas her iki tarafa da organik trafik kazandıracaktır.</p>
             <p>Detayları görüşmek dileğiyle.</p>`,
      tags: ['Link Exchange'],
      status: 'review',
      draft: `Merhaba SEO Masters Ekibi,

Karşılıklı içerik paylaşımı teklifiniz oldukça rasyonel. Bahsettiğiniz 'Arama Motoru Optimizasyonu Sırları' makalenizin linkini inceledik, sitemizdeki 'Modern Arama Algoritmaları' başlıklı yazımıza çok uygun düşüyor.

Önümüzdeki hafta güncelleyeceğimiz yazıya linkinizi ekleyeceğiz. Sizden de bizim 'Gelişmiş Web Tasarım Rehberi' linkimizi ilgili anchor text ile eklemenizi bekliyoruz.

İş birliği için şimdiden teşekkürler!

Saygılarımla,
CEO (Hermes AI Aracılığıyla)`
    }
  ],
  
  // Goals Mode simulator
  goalRunning: false,
  goalInterval: null,
  goalTickCount: 0,
  goalTotalTicks: 20,
  goalSimCost: 0,

  // Video Studio Simulator
  videoRunning: false,
  videoInterval: null,
  videoIteration: 0,
  videoSubtitleIndex: 0,
  videoPlaybackInterval: null,
  
  // Obsidian Memory Nodes
  memoryNodes: [
    { id: 1, name: 'Brand Voice', x: 200, y: 150, details: '#### Marka Sesi ve Tonu\n\n* **Tonlama:** Profesyonel, samimi ve direkt.\n* **Kural:** Asla "yapay zeka spami" gibi robotik konuşma yapma.\n* **Kullanım:** outreach maillerinde, takip mesajlarında.' },
    { id: 2, name: 'Julian Goldie Outreach Style', x: 400, y: 120, details: '#### Link İnşası İletişim Şablonu\n\n* **Prensip:** "Kısa, direkt ve samimi".\n* **Outreach Stili:** Alıcıyı sıkmadan, ilk cümlede değeri sun.\n* **Bütçe Sınırı:** Maksimum link başına $80 bütçe pazarlığı yap.' },
    { id: 3, name: 'SMTP Credentials', x: 180, y: 300, details: '#### E-posta Bağlantı Detayları\n\n* **Sunucu:** smtp.google.com (TLS)\n* **Port:** 587\n* **Dedicated Email:** `agent.jarvis@company.com`\n* **Durum:** Bağlantı Yetkilendirildi.' },
    { id: 4, name: 'Google Service Account Key', x: 320, y: 340, details: '#### Google API credentials\n\n* **Service Email:** `admin-orchestrator@agent-os.iam.gserviceaccount.com`\n* **İzin Yetkileri:** Gmail API, GSheets API (Otonom Listeler için).' },
    { id: 5, name: 'Outreach Targets', x: 550, y: 200, details: '#### Outreach Hedef Veritabanı\n\n* **Kaynak:** `active_campaign_sheet.xlsx`\n* **Kategori Filtresi:** Tech, Marketing, SaaS Blogs.\n* **İletişim Sırası:** 142 Site listelendi.' },
    { id: 6, name: 'SEO Target Link', x: 500, y: 320, details: '#### Hedef Link Detayı\n\n* **Makale:** "Yeni Nesil SEO Rehberi"\n* **Hedef URL:** `https://company.com/seo-guide`\n* **Sektör:** Arama Motoru Optimizasyonu' },
    { id: 7, name: 'Kim K2.7 Directive', x: 300, y: 220, details: '#### Kim K2.7 (Moonshot)\n\n* **Yetkinlik:** Otonom kodlama ve teknik mimari inşası.\n* **Bağlam Limiti:** 256.000 Token.\n* **Görev:** Video kurgu araçlarının CLI komutlarını ve Suno API parametrelerini koordine eder.' },
    { id: 8, name: 'HeyGen CLI Config', x: 450, y: 220, details: '#### HeyGen CLI Entegrasyonu\n\n* **Yol:** `/usr/local/bin/heygen`\n* **Parametreler:** `--avatar ceo-clone --voice ceo-voice-v2`\n* **Fonksiyon:** Kod müdahalesiyle otonom video render döngüsü.' }
  ],
  memoryLinks: [
    { source: 1, target: 2 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 6 },
    { source: 2, target: 6 },
    { source: 4, target: 1 },
    { source: 7, target: 8 },
    { source: 7, target: 1 },
    { source: 8, target: 5 }
  ]
};

// Elements
const el = {
  navItems: document.querySelectorAll('.nav-item'),
  viewPanes: document.querySelectorAll('.view-pane'),
  pageTitle: document.getElementById('page-title'),
  pageSubtitle: document.getElementById('page-subtitle'),
  
  // Telemetry
  statsAgents: document.getElementById('stats-agents'),
  statsMemory: document.getElementById('stats-memory'),
  statsCost: document.getElementById('stats-cost'),
  inboxBadge: document.getElementById('inbox-badge'),
  
  // Dashboard Settings
  btnReconnectGoogle: document.getElementById('btn-reconnect-google'),
  btnChangeInbox: document.getElementById('btn-change-inbox'),
  inboxStatusLabel: document.getElementById('inbox-status-label'),
  dashboardConsole: document.getElementById('dashboard-console'),
  
  // Jarvis
  chatInput: document.getElementById('chat-input'),
  btnSend: document.getElementById('btn-send'),
  btnMic: document.getElementById('btn-mic'),
  chatMessages: document.getElementById('chat-messages'),
  ttsToggle: document.getElementById('tts-toggle'),
  ttsRate: document.getElementById('tts-rate'),
  voiceCanvas: document.getElementById('voice-wave-canvas'),
  
  // Inbox
  mailList: document.getElementById('mail-list'),
  detailSender: document.getElementById('detail-sender'),
  detailTime: document.getElementById('detail-time'),
  detailBody: document.getElementById('detail-body'),
  draftText: document.getElementById('draft-text'),
  inboxPendingText: document.getElementById('inbox-pending-text'),
  btnDraftApprove: document.getElementById('btn-draft-approve'),
  btnDraftDecline: document.getElementById('btn-draft-decline'),
  btnDraftRegenerate: document.getElementById('btn-draft-regenerate'),
  
  // Goals
  goalInput: document.getElementById('goal-input'),
  btnStartGoal: document.getElementById('btn-start-goal'),
  btnStopGoal: document.getElementById('btn-stop-goal'),
  goalsTickCount: document.getElementById('goals-tick-count'),
  goalsCost: document.getElementById('goals-cost'),
  goalsJudgeStatus: document.getElementById('goals-judge-status'),
  goalsConsole: document.getElementById('goals-console'),
  stepAnalysis: document.getElementById('step-analysis'),
  stepTasks: document.getElementById('step-tasks'),
  stepExecuting: document.getElementById('step-executing'),
  stepJudge: document.getElementById('step-judge'),
  
  // Video Studio Elements
  videoKeywordInput: document.getElementById('video-keyword-input'),
  btnStartVideo: document.getElementById('btn-start-video'),
  btnStopVideo: document.getElementById('btn-stop-video'),
  videoIterationBadge: document.getElementById('video-iteration-badge'),
  vStepTriage: document.getElementById('v-step-triage'),
  vStepScript: document.getElementById('v-step-script'),
  vStepRender: document.getElementById('v-step-render'),
  vStepJudge: document.getElementById('v-step-judge'),
  videoJudgeScore: document.getElementById('video-judge-score'),
  videoJudgeStatusLabel: document.getElementById('video-judge-status-label'),
  videoJudgeComment: document.getElementById('video-judge-comment'),
  videoConsole: document.getElementById('video-console'),
  
  // Player Elements
  playerIdleContent: document.getElementById('player-idle-content'),
  playerActiveContent: document.getElementById('player-active-content'),
  playerCaptionTitle: document.getElementById('player-caption-title'),
  playerSubtitleText: document.getElementById('player-subtitle-text'),
  playerPlayBtn: document.getElementById('player-play-btn'),
  playerProgressBar: document.getElementById('player-progress-bar'),
  playerTimeDisplay: document.getElementById('player-time-display'),
  
  // Memory Graph
  memoryCanvas: document.getElementById('memory-canvas'),
  memoryNodeTitle: document.getElementById('memory-node-title'),
  memoryNodeContent: document.getElementById('memory-node-content')
};

// Canvas drawing state
let voiceCtx = null;
let waveAnimationFrame = null;
let wavePhase = 0;
let isJarvisSpeaking = false;

// Obsidian Canvas Drag state
let graphCtx = null;
let selectedNode = null;
let dragNode = null;
let dragOffset = { x: 0, y: 0 };

// ----------------------------------------------------
// CORE APP INITIALIZATION
// ----------------------------------------------------
function initApp() {
  // Navigation Event Listeners
  el.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  // Settings events
  el.ttsToggle.addEventListener('change', (e) => {
    state.ttsEnabled = e.target.checked;
  });
  
  el.btnReconnectGoogle.addEventListener('click', () => {
    addDashboardLog('SYSTEM: Re-authenticating Google Cloud OAuth 2.0...');
    setTimeout(() => {
      addDashboardLog('SYSTEM: Google Service Account successfully re-linked. API healthy.');
      speak("Google servis hesabı bağlantısı başarıyla güncellendi, efendim.");
    }, 1000);
  });

  el.btnChangeInbox.addEventListener('click', () => {
    const newMail = prompt("Yeni Dedicated Inbox E-posta Adresi Girin:", "agent.jarvis@company.com");
    if (newMail) {
      state.inboxStatusLabel.textContent = `${newMail} (Active)`;
      addDashboardLog(`SYSTEM: Dedicated inbox changed to ${newMail}`);
      speak(`Gelen kutusu adresi ${newMail} olarak değiştirildi.`);
    }
  });

  // Init sub-modules
  initJarvisModule();
  initInboxModule();
  initGoalsModule();
  initVideoModule();
  initMemoryModule();
  initChannelsModule();

  // Trigger voice visualizer loop
  initVoiceWave();
  
  // Dynamic tick logs trigger
  setInterval(() => {
    if (!state.goalRunning && !state.videoRunning && Math.random() < 0.2) {
      generateBackgroundTick();
    }
  }, 10000);
}

// SWITCH NAVIGATION TABS
function switchTab(tabName) {
  state.activeTab = tabName;
  
  // Toggle nav items active
  el.navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Toggle view panes active
  el.viewPanes.forEach(pane => {
    if (pane.id === `view-${tabName}`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  // Update Page Title
  const titles = {
    dashboard: { title: 'Mission Control', subtitle: 'Agentic workflow system and telemetry overview' },
    jarvis: { title: 'Hermes Jarvis', subtitle: 'Direct computer execution and voice butler assistant' },
    inbox: { title: 'Draft-Gate Inbox', subtitle: 'Draft verification center for outbound communication' },
    kanban: { title: 'Orkestratör Ajan', subtitle: 'Task breaking, delegation, and parallel planning board' },
    goals: { title: 'Goals Mode', subtitle: '24/7 autonomous objective solver and self-healing executor' },
    'video-studio': { title: 'Otonom Video Fabrikası', subtitle: 'SEO keyword to avatar video rendering pipeline with AQA Judge' },
    channels: { title: 'Sohbet Kanalları Entegrasyonu', subtitle: 'Telegram ve WhatsApp üzerinden bildirimler ve uzaktan kontrol' },
    memory: { title: 'Obsidian Bellek Ağı', subtitle: 'Centralized memory vault mapping brand voice and metadata' }
  };

  el.pageTitle.textContent = titles[tabName].title;
  el.pageSubtitle.textContent = titles[tabName].subtitle;

  // Specific triggers
  if (tabName === 'memory') {
    resizeMemoryCanvas();
  }
}

// ----------------------------------------------------
// TELEMETRY LOGGERS
// ----------------------------------------------------
function addDashboardLog(text) {
  const time = new Date().toLocaleTimeString('tr-TR', { hour12: false });
  const line = document.createElement('div');
  line.className = 'console-line';
  line.textContent = `[${time}] ${text}`;
  el.dashboardConsole.appendChild(line);
  el.dashboardConsole.scrollTop = el.dashboardConsole.scrollHeight;
}

function generateBackgroundTick() {
  const logs = [
    'TICK: Checking dedicated mailbox for new replies...',
    'TICK: Syncing context changes to Obsidian memory map.',
    'TICK: Evaluated campaign ROI. Running models within budget.',
    'TICK: Scheduled followup task verified in queue.',
    'TICK: Checked connection latency to Google Workspace APIs - 45ms (Excellent).'
  ];
  const rand = logs[Math.floor(Math.random() * logs.length)];
  addDashboardLog(rand);
}

// TEXT TO SPEECH (TTS) - Elegant British English Voice
function speak(text) {
  if (!state.ttsEnabled || !window.speechSynthesis) return;

  try {
    // Stop current utterance
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) {
      console.warn("SpeechSynthesis has no voices loaded yet.");
      return;
    }

    const utterance = new SpeechUtterance(text);
    
    // Attempt to select British English
    let selectedVoice = voices.find(voice => voice.lang.includes('en-GB') && voice.name.toLowerCase().includes('google'));
    if (!selectedVoice) selectedVoice = voices.find(voice => voice.lang.includes('en-GB'));
    if (!selectedVoice) selectedVoice = voices.find(voice => voice.lang.includes('en-US'));

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = parseFloat(el.ttsRate.value) || 1.0;
    
    utterance.onstart = () => {
      isJarvisSpeaking = true;
    };
    utterance.onend = () => {
      isJarvisSpeaking = false;
    };
    utterance.onerror = () => {
      isJarvisSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error("SpeechSynthesis speak error caught to prevent crash:", err);
    isJarvisSpeaking = false;
  }
}

// Ensure voices are loaded
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

// ----------------------------------------------------
// HERMES JARVIS CHAT MODULE
// ----------------------------------------------------
function initJarvisModule() {
  el.btnSend.addEventListener('click', sendJarvisMessage);
  el.chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendJarvisMessage();
  });

  const keyInput = document.getElementById('openrouter-key');
  if (keyInput) {
    // Save/load key to/from localStorage to prevent erasing injected key
    const savedKey = localStorage.getItem('openrouter_key');
    if (!savedKey && keyInput.value) {
      localStorage.setItem('openrouter_key', keyInput.value.trim());
    } else if (savedKey) {
      keyInput.value = savedKey;
    }
    
    keyInput.addEventListener('change', () => {
      localStorage.setItem('openrouter_key', keyInput.value.trim());
      addDashboardLog("SYSTEM: OpenRouter API Key updated successfully.");
    });
  }

  const modelSelect = document.getElementById('model-select');
  if (modelSelect) {
    // Load model from localStorage or use default
    const savedModel = localStorage.getItem('selected_model') || 'deepseek-v4';
    modelSelect.value = savedModel;
    state.currentModel = savedModel;

    modelSelect.addEventListener('change', (e) => {
      state.currentModel = e.target.value;
      localStorage.setItem('selected_model', state.currentModel);
      addDashboardLog(`SYSTEM: Active Model changed to ${modelSelect.options[modelSelect.selectedIndex].text}`);
    });
  }

  let recording = false;
  el.btnMic.addEventListener('click', () => {
    recording = !recording;
    if (recording) {
      el.btnMic.classList.add('recording');
      addJarvisLog('CEO (Voice)', 'Listening for voice input...');
      speak("Yes, CEO? I am listening.");
    } else {
      el.btnMic.classList.remove('recording');
      // Mock vocal instruction
      el.chatInput.value = " techblog.org taslağını onayla ve gönder";
      speak("Understood, sir.");
    }
  });
}

function addJarvisLog(sender, text, isBot = false) {
  const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${isBot ? 'message-bot' : 'message-user'}`;
  
  msgDiv.innerHTML = `
    <div class="msg-avatar">${isBot ? 'H' : 'CEO'}</div>
    <div class="msg-bubble">
      <p>${text.replace(/\n/g, '<br>')}</p>
      <span class="msg-time">${time}</span>
    </div>
  `;
  el.chatMessages.appendChild(msgDiv);
  el.chatMessages.scrollTop = el.chatMessages.scrollHeight;
}

function sendJarvisMessage() {
  const text = el.chatInput.value.trim();
  if (!text) return;

  addJarvisLog('CEO', text, false);
  el.chatInput.value = '';

  // Simulate or process response
  setTimeout(() => {
    processJarvisCommand(text);
  }, 800);
}

function processJarvisCommand(input) {
  const clean = input.toLowerCase();
  const key = localStorage.getItem('openrouter_key') || '';
  
  if (clean.startsWith('/help')) {
    const help = `Very well, sir. Here are my operational directives:
    - **"/email"**: Drafts outreach communications.
    - **"/goal [hedef]"**: Activates 24/7 Autonomous execution.
    - **"/memory"**: Displays Obsidian network database.
    - Ask normal questions about **Agent OS**, **Goals Mode**, or **Draft-Gate**.`;
    addJarvisLog('Hermes Jarvis', help, true);
    speak("Here are your direct commands, CEO.");
  } 
  else if (clean.startsWith('/email')) {
    addJarvisLog('Hermes Jarvis', 'Drafting backlink partnership email for techblog.org. It has been directed to the Draft-Gate Inbox tab, sir.', true);
    speak("Outreach mail has been drafted and queued inside the Draft Gate.");
    switchTab('inbox');
  } 
  else if (clean.startsWith('/goal')) {
    const goalText = input.replace(/^\/goal\s*/i, '');
    addJarvisLog('Hermes Jarvis', `Initializing autonomous goal orchestration. Loading subtask arrays for: "${goalText}"`, true);
    speak("Orchestrating autonomous loop directives. Please wait.");
    switchTab('goals');
    el.goalInput.value = goalText;
    startGoalsSimulation();
  }
  else if (clean.startsWith('/memory')) {
    addJarvisLog('Hermes Jarvis', 'Obsidian central memory network holds 6 key nodes. The active map lists: Brand Voice, Julian Goldie Outreach Style, SMTP credentials, Google Service Account Key, Outreach Targets, and SEO Target Link.', true);
    speak("I have queried the Obsidian memory vault for you.");
    switchTab('memory');
  }
  else if (clean.includes('inbox') || clean.includes('onayla') || clean.includes('e-posta')) {
    addJarvisLog('Hermes Jarvis', 'I am on it. Directing you to the Draft-Gate. We have pending drafts awaiting your review, sir.', true);
    speak("Navigating to the Draft Gate. Please review the pending outreach drafts.");
    switchTab('inbox');
  }
  else if (clean.includes('kimsin') || clean.includes('hedef') || clean.includes('goals')) {
    addJarvisLog('Hermes Jarvis', 'I am Jarvis. The executive engine of Agent OS. I execute actions, manage your inbox, write emails, and run 24/7 autonomous loops until your strategic targets are secured.', true);
    speak("I am Jarvis. The executive engine of your Agentic OS.");
  }
  else if (key && !input.startsWith('/')) {
    // Real-time OpenRouter request
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message message-bot';
    thinkingDiv.id = 'jarvis-thinking';
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    thinkingDiv.innerHTML = `
      <div class="msg-avatar">H</div>
      <div class="msg-bubble">
        <p class="text-muted"><em>Hermes Jarvis yanıt hazırlıyor...</em></p>
        <span class="msg-time">${time}</span>
      </div>
    `;
    el.chatMessages.appendChild(thinkingDiv);
    el.chatMessages.scrollTop = el.chatMessages.scrollHeight;

    const modelMapping = {
      'deepseek-v4': 'deepseek/deepseek-v4-pro',
      'hermes': 'google/gemini-2.5-flash',
      'kim': 'moonshotai/moonshot-v1-8k',
      'gemini': 'google/gemini-2.5-pro',
      'claude': 'anthropic/claude-3.5-sonnet'
    };
    const activeModelId = modelMapping[state.currentModel] || 'deepseek/deepseek-v4-pro';

    fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://192.168.1.57',
        'X-Title': 'Hakan OS'
      },
      body: JSON.stringify({
        model: activeModelId,
        messages: [
          {
            role: 'system',
            content: "You are Hermes Jarvis, an advanced AI agent assistant operating on Hakan OS (Agent OS). You speak in a polite, sophisticated British butler persona (like Alfred or Jarvis). You address the user as 'CEO' or 'Sir'. Keep your responses helpful, elegant, and concise. You can write in Turkish or English, depending on what the user speaks."
          },
          {
            role: 'user',
            content: input
          }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      const th = document.getElementById('jarvis-thinking');
      if (th) th.remove();

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const reply = data.choices[0].message.content;
        addJarvisLog('Hermes Jarvis', reply, true);
        speak(reply);
      } else {
        const errMsg = "Apologies, Sir. I encountered an issue parsing the response from the OpenRouter node.";
        addJarvisLog('Hermes Jarvis', errMsg, true);
        speak(errMsg);
        console.error("OpenRouter API returned error:", data);
      }
    })
    .catch(err => {
      const th = document.getElementById('jarvis-thinking');
      if (th) th.remove();
      const errMsg = `Apologies, Sir. I could not establish a connection to OpenRouter. ${err.message}`;
      addJarvisLog('Hermes Jarvis', errMsg, true);
      speak(errMsg);
    });
  }
  else {
    addJarvisLog('Hermes Jarvis', `Understood, CEO. I am scheduling a task to process: "${input}". Let me know if I should initiate the Goals Mode loop.`, true);
    speak("Very well, sir. I have logged that request.");
  }
}

// VOICE CANVAS SINE WAVE SIMULATION
function initVoiceWave() {
  voiceCtx = el.voiceCanvas.getContext('2d');
  resizeVoiceCanvas();
  window.addEventListener('resize', resizeVoiceCanvas);
  renderVoiceWave();
}

function resizeVoiceCanvas() {
  if (el.voiceCanvas) {
    el.voiceCanvas.width = el.voiceCanvas.parentElement.clientWidth;
  }
}

function renderVoiceWave() {
  voiceCtx.clearRect(0, 0, el.voiceCanvas.width, el.voiceCanvas.height);
  
  // Wave configuration based on Jarvis state
  let amplitude = 4;
  let frequency = 0.05;
  if (isJarvisSpeaking) {
    amplitude = 15;
    frequency = 0.12;
  } else if (el.btnMic.classList.contains('recording')) {
    amplitude = 10;
    frequency = 0.08;
  }

  voiceCtx.beginPath();
  voiceCtx.strokeStyle = isJarvisSpeaking ? '#8a2be2' : '#00b4ff';
  voiceCtx.lineWidth = 2;
  
  for (let x = 0; x < el.voiceCanvas.width; x++) {
    const y = el.voiceCanvas.height / 2 + Math.sin(x * frequency + wavePhase) * amplitude;
    if (x === 0) {
      voiceCtx.moveTo(x, y);
    } else {
      voiceCtx.lineTo(x, y);
    }
  }
  voiceCtx.stroke();

  // Draw second thin wave
  voiceCtx.beginPath();
  voiceCtx.strokeStyle = 'rgba(0, 180, 255, 0.3)';
  voiceCtx.lineWidth = 1;
  for (let x = 0; x < el.voiceCanvas.width; x++) {
    const y = el.voiceCanvas.height / 2 + Math.sin(x * (frequency * 0.8) - wavePhase) * (amplitude * 0.6);
    if (x === 0) {
      voiceCtx.moveTo(x, y);
    } else {
      voiceCtx.lineTo(x, y);
    }
  }
  voiceCtx.stroke();

  wavePhase += 0.15;
  waveAnimationFrame = requestAnimationFrame(renderVoiceWave);
}

// ----------------------------------------------------
// DRAFT-GATE INBOX MODULE
// ----------------------------------------------------
let activeMailId = 1;

function initInboxModule() {
  // Inbox clicks
  const items = el.mailList.querySelectorAll('.mail-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const id = parseInt(item.getAttribute('data-id'));
      loadMailDetail(id);
    });
  });

  // Action Buttons
  el.btnDraftApprove.addEventListener('click', () => {
    approveDraft();
  });

  el.btnDraftDecline.addEventListener('click', () => {
    declineDraft();
  });

  el.btnDraftRegenerate.addEventListener('click', () => {
    regenerateDraft();
  });
}

function loadMailDetail(id) {
  activeMailId = id;
  const mail = state.inbox.find(m => m.id === id);
  if (!mail) return;

  el.detailSender.innerHTML = `${mail.sender} &lt;${mail.email}&gt;`;
  el.detailTime.textContent = `${mail.time} (Outreach)`;
  el.detailBody.innerHTML = mail.body;
  el.draftText.value = mail.draft;

  // Handle status style
  const statusBadge = document.querySelector('.draft-status-badge');
  const panel = document.querySelector('.draft-gate-panel');
  if (mail.status === 'approved') {
    statusBadge.textContent = 'GÖNDERİLDİ';
    statusBadge.style.background = 'rgba(0, 230, 120, 0.15)';
    statusBadge.style.color = 'var(--neon-mint)';
    panel.style.borderColor = 'rgba(0, 230, 120, 0.2)';
    el.btnDraftApprove.disabled = true;
    el.btnDraftDecline.disabled = true;
    el.btnDraftRegenerate.disabled = true;
  } else if (mail.status === 'declined') {
    statusBadge.textContent = 'İPTAL EDİLDİ';
    statusBadge.style.background = 'rgba(255, 60, 100, 0.15)';
    statusBadge.style.color = 'var(--neon-coral)';
    panel.style.borderColor = 'rgba(255, 60, 100, 0.2)';
    el.btnDraftApprove.disabled = true;
    el.btnDraftDecline.disabled = true;
    el.btnDraftRegenerate.disabled = true;
  } else {
    statusBadge.textContent = 'AI TASLAĞI HAZIR';
    statusBadge.style.background = 'rgba(160, 50, 255, 0.15)';
    statusBadge.style.color = 'var(--neon-purple)';
    panel.style.borderColor = 'rgba(0, 150, 255, 0.2)';
    el.btnDraftApprove.disabled = false;
    el.btnDraftDecline.disabled = false;
    el.btnDraftRegenerate.disabled = false;
  }
}

function approveDraft() {
  const mail = state.inbox.find(m => m.id === activeMailId);
  if (!mail) return;

  mail.status = 'approved';
  mail.draft = el.draftText.value;
  
  // Add telemetry feedback
  state.apiCost += 0.08;
  el.statsCost.textContent = `$${state.apiCost.toFixed(2)}`;
  
  addDashboardLog(`DRAFTGATE: CEO approved outreach to ${mail.sender}. Outbox request initiated.`);
  addDashboardLog(`OUTBOX: Message successfully delivered to ${mail.email} via Google SMTP server account.`);
  
  // Update badge count
  const pendingCount = state.inbox.filter(m => m.status === 'review').length;
  if (pendingCount > 0) {
    el.inboxBadge.textContent = pendingCount;
    el.inboxPendingText.textContent = `${pendingCount} Taslak Bekliyor`;
  } else {
    el.inboxBadge.style.display = 'none';
    el.inboxPendingText.textContent = `Tüm Taslaklar Onaylandı`;
  }

  // Reload current detail
  loadMailDetail(activeMailId);
  speak(`The outreach email has been approved and delivered to ${mail.sender}, sir.`);
}

function declineDraft() {
  const mail = state.inbox.find(m => m.id === activeMailId);
  if (!mail) return;

  mail.status = 'declined';
  addDashboardLog(`DRAFTGATE: CEO declined and deleted draft response for ${mail.sender}.`);
  
  const pendingCount = state.inbox.filter(m => m.status === 'review').length;
  if (pendingCount > 0) {
    el.inboxBadge.textContent = pendingCount;
    el.inboxPendingText.textContent = `${pendingCount} Taslak Bekliyor`;
  } else {
    el.inboxBadge.style.display = 'none';
    el.inboxPendingText.textContent = `Tüm Taslaklar Onaylandı`;
  }

  loadMailDetail(activeMailId);
  speak("Very well, sir. The draft has been terminated.");
}

function regenerateDraft() {
  const mail = state.inbox.find(m => m.id === activeMailId);
  if (!mail) return;

  speak("Regenerating response with a direct tone, sir.");
  
  const tones = [
    `Merhaba techblog.org Ekibi,

Rehber linkimizi (https://company.com/seo-guide) sitenizdeki Dijital Trendler yazısının uygun bir bölümünde paylaşabilirseniz çok memnun oluruz. Karşılığında biz de sizin sitenizden bahsedecek bir link ekleyeceğiz.

Kısa bir dönüşünüzü bekleriz.

Saygılarımla,
CEO (Hermes AI)`,
    
    `Selamlar techblog.org editörü,

Gönderdiğiniz maile binaen, sizin "Pazarlama 2026" makalenizdeki "Link Stratejileri" kısmına eklenmek isteriz. Karşılıklı fayda sağlayacağımız bu teklif için sizden haber bekliyoruz.

Saygılarımızla,
Outreach Ekibi`
  ];

  mail.draft = tones[Math.floor(Math.random() * tones.length)];
  loadMailDetail(activeMailId);
  addDashboardLog(`DRAFTGATE: Regenerated draft for ${mail.sender} using Claude 3.5 Sonnet.`);
}

// ----------------------------------------------------
// KANBAN ORCHESTRATION MODULE
// ----------------------------------------------------
window.moveCard = function(cardId, targetColId) {
  const card = document.querySelector(`[data-id="${cardId}"]`);
  const targetCol = document.getElementById(targetColId).querySelector('.kanban-cards');
  
  if (card && targetCol) {
    targetCol.appendChild(card);
    
    // Update movement arrows dynamically
    const footer = card.querySelector('.card-footer .flex-row') || card.querySelector('.card-footer');
    let arrowHtml = '';

    if (targetColId === 'col-backlog') {
      arrowHtml = `<button class="btn-card-move" onclick="moveCard('${cardId}', 'col-progress')"><i data-lucide="arrow-right"></i></button>`;
    } else if (targetColId === 'col-progress') {
      arrowHtml = `
        <div class="flex-row gap-4">
          <button class="btn-card-move" onclick="moveCard('${cardId}', 'col-backlog')"><i data-lucide="arrow-left"></i></button>
          <button class="btn-card-move" onclick="moveCard('${cardId}', 'col-review')"><i data-lucide="arrow-right"></i></button>
        </div>
      `;
    } else if (targetColId === 'col-review') {
      arrowHtml = `
        <div class="flex-row gap-4">
          <button class="btn-card-move" onclick="moveCard('${cardId}', 'col-progress')"><i data-lucide="arrow-left"></i></button>
          <button class="btn-card-move" onclick="moveCard('${cardId}', 'col-completed')"><i data-lucide="arrow-right"></i></button>
        </div>
      `;
    } else if (targetColId === 'col-completed') {
      arrowHtml = `<button class="btn-card-move" onclick="moveCard('${cardId}', 'col-review')"><i data-lucide="arrow-left"></i></button>`;
    }

    // Replace movement buttons inside footer
    const existingButtons = card.querySelector('.btn-card-move') || card.querySelector('.flex-row');
    if (existingButtons) existingButtons.remove();
    
    const wrapper = card.querySelector('.card-footer');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = arrowHtml.trim();
    wrapper.appendChild(tempDiv.firstChild);

    // Re-trigger lucide icons
    lucide.createIcons();
    updateKanbanCounts();
    
    addDashboardLog(`ORCHESTRATOR: Task '${card.querySelector('h4').textContent}' moved to '${targetColId.replace('col-', '').toUpperCase()}'`);
  }
};

function updateKanbanCounts() {
  const cols = ['col-backlog', 'col-progress', 'col-review', 'col-completed'];
  cols.forEach(colId => {
    const col = document.getElementById(colId);
    const count = col.querySelector('.kanban-cards').children.length;
    col.querySelector('.count-badge').textContent = count;
  });
}

// ----------------------------------------------------
// GOALS MODE MODULE
// ----------------------------------------------------
function initGoalsModule() {
  el.btnStartGoal.addEventListener('click', () => {
    startGoalsSimulation();
  });
  el.btnStopGoal.addEventListener('click', () => {
    stopGoalsSimulation();
  });
}

window.setGoalText = function(btn) {
  el.goalInput.value = btn.textContent;
};

function startGoalsSimulation() {
  const text = el.goalInput.value.trim();
  if (!text) {
    alert("Lütfen otonom orkestrasyon için bir hedef girin.");
    return;
  }

  state.goalRunning = true;
  state.goalTickCount = 0;
  state.goalSimCost = 0;
  
  el.btnStartGoal.disabled = true;
  el.btnStopGoal.disabled = false;
  
  // Reset steppers
  document.querySelectorAll('.progress-step').forEach(s => s.className = 'progress-step');
  el.stepAnalysis.classList.add('active');
  
  el.goalsTickCount.textContent = '0 / 20';
  el.goalsCost.textContent = '$0.00 / $5.00';
  el.goalsJudgeStatus.textContent = 'Değerlendiriliyor';
  el.goalsJudgeStatus.className = 'val text-amber';
  
  el.goalsConsole.innerHTML = '';
  addGoalLog('SYSTEM: Goals mode initialized. Translating goal sentence...');
  speak("Goals mode initialized. Translating your target objective, sir.");
  
  // Orchestrator loop
  let stepIndex = 0;
  state.goalInterval = setInterval(() => {
    stepIndex++;
    
    if (stepIndex === 1) {
      el.stepAnalysis.className = 'progress-step completed';
      el.stepTasks.className = 'progress-step active';
      addGoalLog('ORCHESTRATOR: Parsed target. Discovered 3 dependencies.');
      addGoalLog('ORCHESTRATOR: Building campaign roadmap. Assigning parallel agents.');
    } 
    else if (stepIndex === 2) {
      el.stepTasks.className = 'progress-step completed';
      el.stepExecuting.className = 'progress-step active';
      addGoalLog('CLERK: Scheduler connected. Initiating 20-tick continuous loop...');
    } 
    else if (stepIndex > 2 && stepIndex <= 10) {
      // Execute ticks
      state.goalTickCount += 2;
      state.goalSimCost += 0.35;
      
      el.goalsTickCount.textContent = `${state.goalTickCount} / 20`;
      el.goalsCost.textContent = `$${state.goalSimCost.toFixed(2)} / $5.00`;
      
      if (state.goalTickCount === 2) {
        addGoalLog('TICK 2: Fetching web index directories. Filter: technology blogs.');
      } else if (state.goalTickCount === 4) {
        addGoalLog('TICK 4: Scraped techblog.org, developer-hub.com. Reading site structures.');
      } else if (state.goalTickCount === 6) {
        addGoalLog('TICK 6: Extraction complete. Found target contacts. Generating SMTP requests.');
      } else if (state.goalTickCount === 8) {
        addGoalLog('TICK 8: ERROR: Outbox credentials rate limit reached on SMTP. Connection interrupted.');
        addGoalLog('SYSTEM: Warning. Entering Self-Healing mode (Automatic Tick Action)...');
        speak("Warning. System encountered an SMTP connection error. Initiating self healing.");
      } else if (state.goalTickCount === 10) {
        addGoalLog('TICK 10: SELF-HEALING SUCCESS: Swapped SMTP endpoint. Google Service Token renewed.');
        addGoalLog('TICK 10: Resuming outreach campaigns. Building drafts.');
        speak("Self healing completed. Swapping SMTP credentials. Resuming outreach.");
      }
    } 
    else if (stepIndex > 10 && stepIndex <= 15) {
      state.goalTickCount += 2;
      state.goalSimCost += 0.22;
      el.goalsTickCount.textContent = `${state.goalTickCount} / 20`;
      el.goalsCost.textContent = `$${state.goalSimCost.toFixed(2)} / $5.00`;
      
      if (state.goalTickCount === 12) {
        addGoalLog('TICK 12: Drafting outreach templates via Claude 3.5 Sonnet.');
      } else if (state.goalTickCount === 14) {
        addGoalLog('TICK 14: Directing draft layouts to Draft-Gate Inbox.');
      } else if (state.goalTickCount === 16) {
        addGoalLog('TICK 16: Sending notifications to CEO slack hook.');
      } else if (state.goalTickCount === 18) {
        addGoalLog('TICK 18: Checking Obsidian memory sync tags... OK.');
      } else if (state.goalTickCount === 20) {
        addGoalLog('TICK 20: Stepper complete. Invoking Judge model to verify achievements...');
        el.stepExecuting.className = 'progress-step completed';
        el.stepJudge.className = 'progress-step active';
        speak("Tick execution completed. Invoking the Judge model.");
      }
    } 
    else if (stepIndex === 16) {
      // Judge Model Review
      el.stepJudge.className = 'progress-step completed';
      el.goalsJudgeStatus.textContent = 'ONAYLANDI';
      el.goalsJudgeStatus.className = 'val text-mint';
      
      addGoalLog('JUDGE: Verification success. 5 relevant outreach drafts built. SMTP stable.');
      addGoalLog('SYSTEM: Autonomous loop finished. Total cost: $' + state.goalSimCost.toFixed(2));
      speak("Strategic target successfully completed, sir. All email drafts have been queued for your approval.");
      
      // Update real telemetry stats
      state.apiCost += state.goalSimCost;
      el.statsCost.textContent = `$${state.apiCost.toFixed(2)}`;
      
      stopGoalsSimulation();
    }
  }, 1200);
}

function stopGoalsSimulation() {
  state.goalRunning = false;
  clearInterval(state.goalInterval);
  el.btnStartGoal.disabled = false;
  el.btnStopGoal.disabled = true;
}

function addGoalLog(text) {
  const line = document.createElement('div');
  line.className = 'console-line';
  if (text.includes('ERROR') || text.includes('Warning')) {
    line.className = 'console-line text-amber';
  } else if (text.includes('SUCCESS') || text.includes('success')) {
    line.className = 'console-line text-mint';
  } else if (text.includes('ORCHESTRATOR')) {
    line.className = 'console-line text-neon';
  }
  line.textContent = text;
  el.goalsConsole.appendChild(line);
  el.goalsConsole.scrollTop = el.goalsConsole.scrollHeight;
}

// ----------------------------------------------------
// AI VIDEO AGENTS STUDIO MODULE
// ----------------------------------------------------
function initVideoModule() {
  el.btnStartVideo.addEventListener('click', () => {
    startVideoSimulation();
  });
  el.btnStopVideo.addEventListener('click', () => {
    stopVideoSimulation();
  });
  
  // Player Play button listener
  el.playerPlayBtn.addEventListener('click', () => {
    toggleMockPlayerPlayback();
  });
}

function startVideoSimulation() {
  const keyword = el.videoKeywordInput.value.trim();
  if (!keyword) {
    alert("Lütfen video üretimi için bir SEO anahtar kelimesi girin.");
    return;
  }

  state.videoRunning = true;
  state.videoIteration = 1;
  el.btnStartVideo.disabled = true;
  el.btnStopVideo.disabled = false;

  // Reset UI elements
  el.videoIterationBadge.textContent = "İterasyon: 1";
  document.querySelectorAll('#view-video-studio .progress-step').forEach(s => s.className = 'progress-step');
  el.videoJudgeScore.textContent = "-- / 10";
  el.videoJudgeStatusLabel.textContent = "BEKLENİYOR";
  el.videoJudgeStatusLabel.className = "status status-idle";
  el.videoJudgeComment.textContent = "Video analiz ediliyor...";
  
  // Hide player, show idle placeholder
  el.playerIdleContent.style.display = "flex";
  el.playerActiveContent.style.display = "none";
  resetPlayerState();

  el.videoConsole.innerHTML = '';
  addVideoLog(`SYSTEM: Video production pipeline initiated for keyword: "${keyword}"`);
  speak(`Initializing autonomous video agents crew for keyword ${keyword}, sir.`);

  // Progress ticks
  let stepIndex = 0;
  
  state.videoInterval = setInterval(() => {
    stepIndex++;
    
    if (stepIndex === 1) {
      el.vStepTriage.className = "progress-step active";
      addVideoLog("TRIAGE: Traffic controller dividing script writing and asset pipelines.");
      addVideoLog("SYSTEM: Assigned Video Script Writer, Suno API, and HeyGen CLI rendering agents.");
    } 
    else if (stepIndex === 2) {
      el.vStepTriage.className = "progress-step completed";
      el.vStepScript.className = "progress-step active";
      addVideoLog("SCRIPT WRITER: Klonlanmış CEO ses profili analiz ediliyor.");
      addVideoLog(`SCRIPT WRITER: Created SEO-focused script. Keyword density [${keyword}] optimized for Google AIO.`);
    } 
    else if (stepIndex === 3) {
      el.vStepScript.className = "progress-step completed";
      el.vStepRender.className = "progress-step active";
      addVideoLog("HEYGEN CLI: Calling avatar render engine. Parameter: `--avatar ceo-clone --voice-id ceo-voice-v2`");
      addVideoLog("SUNO API: Bestelenen Lofi / Ambient arka plan müziği sentezleniyor.");
    } 
    else if (stepIndex === 4) {
      el.vStepRender.className = "progress-step completed";
      el.vStepJudge.className = "progress-step active";
      addVideoLog("JUDGE: Render output received. Reviewing video frames and vocal synchronization...");
    } 
    else if (stepIndex === 5) {
      // Iteration 1 Failure ("Go Again Mate!")
      el.videoIterationBadge.textContent = "İterasyon: 1";
      el.videoJudgeScore.textContent = "7.2 / 10";
      el.videoJudgeStatusLabel.textContent = "REDDEDİLDİ";
      el.videoJudgeStatusLabel.className = "status btn-danger"; // styled like danger
      el.videoJudgeComment.textContent = "Go again mate! Missing progress bar and voice synchronization offset by 0.4s.";
      
      addVideoLog("JUDGE: Rejecting iteration 1. Deficiencies: Progress bar missing, audio synch offset.");
      addVideoLog("SYSTEM: Iterative Quality Control triggered. Rerunning production pipeline.");
      speak("Go again mate! The video is rejected by the judge. Initiating auto correction.");
    } 
    else if (stepIndex === 6) {
      // Auto-correction step
      addVideoLog("KIM K2.7 (Technical Motor): Parsing judge feedbacks. Modifying HeyGen CLI video overlay configurations.");
      addVideoLog("VIDEO EDITOR AGENT: Injecting animated progress bar component into HTML layer.");
    } 
    else if (stepIndex === 7) {
      // Iteration 2 Starts
      state.videoIteration = 2;
      el.videoIterationBadge.textContent = "İterasyon: 2";
      addVideoLog("SYSTEM: Re-rendering video files with updated editor configurations.");
      
      // Reset steps
      document.querySelectorAll('#view-video-studio .progress-step').forEach(s => s.className = 'progress-step completed');
      el.vStepJudge.className = "progress-step active";
    } 
    else if (stepIndex === 8) {
      // Iteration 2 Approved!
      el.vStepJudge.className = "progress-step completed";
      el.videoJudgeScore.textContent = "9.4 / 10";
      el.videoJudgeStatusLabel.textContent = "ONAYLANDI";
      el.videoJudgeStatusLabel.className = "status status-running";
      el.videoJudgeComment.textContent = "Excellent work! Progress bar added. 1080p output approved.";
      
      addVideoLog("JUDGE: Verification success. 9.4/10 score. Render approved.");
      addVideoLog(`SYSTEM: Autonomous video successfully compiled. Saving output: "${keyword}_Video.mp4"`);
      speak("Approved! Excellent video production, sir.");
      
      state.apiCost += 0.85;
      el.statsCost.textContent = `$${state.apiCost.toFixed(2)}`;
      
      // Launch player
      startMockPlayer(keyword);
      stopVideoSimulation();
    }
  }, 1200);
}

function stopVideoSimulation() {
  state.videoRunning = false;
  clearInterval(state.videoInterval);
  el.btnStartVideo.disabled = false;
  el.btnStopVideo.disabled = true;
}

function addVideoLog(text) {
  const time = new Date().toLocaleTimeString('tr-TR', { hour12: false });
  const line = document.createElement('div');
  line.className = 'console-line';
  if (text.includes('Rejecting') || text.includes('REDDEDİLDİ')) {
    line.className = 'console-line text-amber';
  } else if (text.includes('success') || text.includes('APPROVED') || text.includes('ONAYLANDI')) {
    line.className = 'console-line text-mint';
  } else if (text.includes('TRIAGE')) {
    line.className = 'console-line text-neon';
  }
  line.textContent = `[${time}] ${text}`;
  el.videoConsole.appendChild(line);
  el.videoConsole.scrollTop = el.videoConsole.scrollHeight;
}

// MOCK PLAYER CONTROLS & INTERACTIVE LOGIC
let playerInterval = null;
let playerProgress = 0;
let playerPlaying = false;
let playerCaptions = [];

function startMockPlayer(keyword) {
  el.playerIdleContent.style.display = "none";
  el.playerActiveContent.style.display = "flex";
  el.playerCaptionTitle.textContent = `${keyword.replace(/\s+/g, '_')}_Video.mp4`;
  
  // Set captions
  playerCaptions = [
    { start: 0, end: 3, text: `Merhaba arkadaşlar! Bugün sizlere yapay zeka ajanlarının devrimsel gücünü anlatacağım.` },
    { start: 3, end: 7, text: `Tek başımıza ChatGPT ile konuşmak eskide kaldı. Artık Kim K2.7 gibi devasa 256k bağlamlı uzmanlarla çalışıyoruz.` },
    { start: 7, end: 11, text: `HeyGen CLI ve Suno API ile bu video otonom olarak üretildi ve Judge tarafından onaylandı.` },
    { start: 11, end: 15, text: `Bu sayede Google AI Overview sıralamalarında 1 numaraya çıkıyoruz. Kendi fabrikanızı kurun!` }
  ];

  playerProgress = 0;
  playerPlaying = true;
  el.playerPlayBtn.innerHTML = '<i data-lucide="pause" class="size-16"></i>';
  lucide.createIcons();

  runPlayerLoop();
}

function runPlayerLoop() {
  clearInterval(playerInterval);
  playerInterval = setInterval(() => {
    if (!playerPlaying) return;

    playerProgress += 1;
    if (playerProgress > 15) {
      playerProgress = 0; // Loop
    }

    // Update Progress bar width
    const percentage = (playerProgress / 15) * 100;
    el.playerProgressBar.style.width = `${percentage}%`;
    
    // Update Time display
    el.playerTimeDisplay.textContent = `0:${playerProgress.toString().padStart(2, '0')} / 0:15`;
    
    // Update subtitles
    const activeCaption = playerCaptions.find(c => playerProgress >= c.start && playerProgress < c.end);
    if (activeCaption) {
      el.playerSubtitleText.textContent = activeCaption.text;
    } else {
      el.playerSubtitleText.textContent = "";
    }
  }, 1000);
}

function toggleMockPlayerPlayback() {
  playerPlaying = !playerPlaying;
  if (playerPlaying) {
    el.playerPlayBtn.innerHTML = '<i data-lucide="pause" class="size-16"></i>';
    speak("Resuming playback, sir.");
  } else {
    el.playerPlayBtn.innerHTML = '<i data-lucide="play" class="size-16"></i>';
    speak("Playback paused.");
  }
  lucide.createIcons();
}

function resetPlayerState() {
  clearInterval(playerInterval);
  playerPlaying = false;
  playerProgress = 0;
  el.playerProgressBar.style.width = "0%";
  el.playerTimeDisplay.textContent = "0:00 / 0:15";
  el.playerSubtitleText.textContent = "";
}

// ----------------------------------------------------
// OBSIDIAN MEMORY GRAPH MODULE
// ----------------------------------------------------
function initMemoryModule() {
  graphCtx = el.memoryCanvas.getContext('2d');
  
  // Set default node selection
  selectMemoryNode(state.memoryNodes[0]);
  
  // Event listeners on Canvas
  el.memoryCanvas.addEventListener('mousedown', handleGraphMouseDown);
  el.memoryCanvas.addEventListener('mousemove', handleGraphMouseMove);
  el.memoryCanvas.addEventListener('mouseup', handleGraphMouseUp);
}

function resizeMemoryCanvas() {
  if (el.memoryCanvas) {
    el.memoryCanvas.width = el.memoryCanvas.parentElement.clientWidth;
    el.memoryCanvas.height = el.memoryCanvas.parentElement.clientHeight - 60;
    drawMemoryGraph();
  }
}

function drawMemoryGraph() {
  if (!graphCtx) return;
  
  graphCtx.clearRect(0, 0, el.memoryCanvas.width, el.memoryCanvas.height);
  
  // Draw Links (Lines)
  state.memoryLinks.forEach(link => {
    const from = state.memoryNodes.find(n => n.id === link.source);
    const to = state.memoryNodes.find(n => n.id === link.target);
    
    if (from && to) {
      graphCtx.beginPath();
      graphCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      graphCtx.lineWidth = 1;
      
      // If either is selected, highlight link
      if ((selectedNode && from.id === selectedNode.id) || (selectedNode && to.id === selectedNode.id)) {
        graphCtx.strokeStyle = 'rgba(0, 180, 255, 0.35)';
        graphCtx.lineWidth = 2;
      }
      
      graphCtx.moveTo(from.x, from.y);
      graphCtx.lineTo(to.x, to.y);
      graphCtx.stroke();
    }
  });

  // Draw Nodes (Circles)
  state.memoryNodes.forEach(node => {
    const isSelected = selectedNode && selectedNode.id === node.id;
    
    // Outer glow for selected
    if (isSelected) {
      graphCtx.beginPath();
      graphCtx.arc(node.x, node.y, 14, 0, Math.PI * 2);
      graphCtx.fillStyle = 'rgba(0, 180, 255, 0.25)';
      graphCtx.fill();
    }
    
    graphCtx.beginPath();
    graphCtx.arc(node.x, node.y, 7, 0, Math.PI * 2);
    graphCtx.fillStyle = isSelected ? '#00b4ff' : 'rgba(120, 140, 200, 0.6)';
    graphCtx.fill();
    
    // Text Label
    graphCtx.font = '11px Space Grotesk';
    graphCtx.fillStyle = isSelected ? '#fff' : '#8a90a2';
    graphCtx.textAlign = 'center';
    graphCtx.fillText(node.name, node.x, node.y - 14);
  });
}

function handleGraphMouseDown(e) {
  const rect = el.memoryCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  // Find if clicked node
  let clicked = null;
  state.memoryNodes.forEach(node => {
    const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
    if (dist < 15) {
      clicked = node;
    }
  });
  
  if (clicked) {
    selectedNode = clicked;
    dragNode = clicked;
    dragOffset.x = clicked.x - mouseX;
    dragOffset.y = clicked.y - mouseY;
    selectMemoryNode(clicked);
    drawMemoryGraph();
  }
}

function handleGraphMouseMove(e) {
  const rect = el.memoryCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  if (dragNode) {
    dragNode.x = mouseX + dragOffset.x;
    dragNode.y = mouseY + dragOffset.y;
    drawMemoryGraph();
  } else {
    // Hover cursor styling
    let hover = false;
    state.memoryNodes.forEach(node => {
      const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
      if (dist < 15) hover = true;
    });
    el.memoryCanvas.style.cursor = hover ? 'pointer' : 'default';
  }
}

function handleGraphMouseUp() {
  dragNode = null;
}

function selectMemoryNode(node) {
  el.memoryNodeTitle.textContent = node.name;
  
  // Format simple markdown details into HTML structure
  let mdHtml = node.details
    .replace(/#### (.*)/g, '<h4>$1</h4>')
    .replace(/\* \*\*(.*?)\*\*(.*)/g, '<li><strong>$1</strong>$2</li>')
    .replace(/\n\n/g, '<br>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
    
  if (mdHtml.includes('<li>')) {
    mdHtml = mdHtml.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  }
  
  el.memoryNodeContent.innerHTML = mdHtml;
}

// ----------------------------------------------------
// CHAT CHANNELS INTEGRATION MODULE
// ----------------------------------------------------
function initChannelsModule() {
  const tgToken = document.getElementById('tg-token');
  const tgChatId = document.getElementById('tg-chat-id');
  const btnTgTest = document.getElementById('btn-tg-test');
  const btnTgSave = document.getElementById('btn-tg-save');
  const tgStatus = document.getElementById('tg-status');
  const tgAutoReply = document.getElementById('tg-auto-reply');
  const tgNotifications = document.getElementById('tg-notifications');

  const btnWaTabQr = document.getElementById('btn-wa-tab-qr');
  const btnWaTabCloud = document.getElementById('btn-wa-tab-cloud');
  const waContentQr = document.getElementById('wa-content-qr');
  const waContentCloud = document.getElementById('wa-content-cloud');
  const waStatus = document.getElementById('wa-status');
  const waQrOverlay = document.getElementById('wa-qr-overlay');
  const btnWaQrRefresh = document.getElementById('btn-wa-qr-refresh');
  
  const waPhoneId = document.getElementById('wa-phone-id');
  const waToken = document.getElementById('wa-token');
  const btnWaCloudTest = document.getElementById('btn-wa-cloud-test');
  const btnWaCloudSave = document.getElementById('btn-wa-cloud-save');

  // WhatsApp Tab Switching
  btnWaTabQr.addEventListener('click', () => {
    btnWaTabQr.classList.add('active-tab-btn');
    btnWaTabQr.style.color = '#fff';
    btnWaTabCloud.classList.remove('active-tab-btn');
    btnWaTabCloud.style.color = 'var(--text-muted)';
    waContentQr.style.display = 'flex';
    waContentCloud.style.display = 'none';
    addChannelLog("WA: QR Kod moduna geçildi.");
  });

  btnWaTabCloud.addEventListener('click', () => {
    btnWaTabCloud.classList.add('active-tab-btn');
    btnWaTabCloud.style.color = '#fff';
    btnWaTabQr.classList.remove('active-tab-btn');
    btnWaTabQr.style.color = 'var(--text-muted)';
    waContentQr.style.display = 'none';
    waContentCloud.style.display = 'flex';
    addChannelLog("WA: Meta Cloud API moduna geçildi.");
  });

  // Telegram - Test Connection (Real API Fetch Request)
  btnTgTest.addEventListener('click', () => {
    const token = tgToken.value.trim();
    const chatId = tgChatId.value.trim();

    if (!token || !chatId) {
      alert("Lütfen hem Bot Token hem de Chat ID değerlerini doldurun.");
      addChannelLog("TG Hata: Eksik kimlik bilgileri.");
      return;
    }

    addChannelLog(`TG: ${chatId} sohbet kimliğine test mesajı gönderiliyor...`);
    btnTgTest.disabled = true;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🔔 Hakan OS - Bildirim Testi\n\nTelegram entegrasyonu başarıyla doğrulandı! Sistem telemetry ve Draft-Gate uyarıları artık buradan iletilecektir."
      })
    })
    .then(res => res.json())
    .then(data => {
      btnTgTest.disabled = false;
      if (data.ok) {
        addChannelLog("TG: Test mesajı başarıyla gönderildi ve doğrulandı!");
        tgStatus.textContent = "Aktif";
        tgStatus.className = "status status-running";
        speak("Telegram bağlantısı başarıyla kuruldu, efendim.");
      } else {
        addChannelLog(`TG Hata: ${data.description}`);
        alert(`Telegram API Hatası:\n${data.description}`);
      }
    })
    .catch(err => {
      btnTgTest.disabled = false;
      addChannelLog(`TG Bağlantı Hatası: ${err.message}`);
      alert(`Sunucu ile iletişim kurulamadı. İnternet bağlantınızı veya Token değerini kontrol edin.`);
    });
  });

  // Telegram - Save Settings
  btnTgSave.addEventListener('click', () => {
    const token = tgToken.value.trim();
    const chatId = tgChatId.value.trim();

    if (!token || !chatId) {
      alert("Lütfen ayarları kaydetmeden önce alanları doldurun.");
      return;
    }

    addChannelLog(`TG: Ayarlar kaydedildi. Otomatik Yanıt: ${tgAutoReply.checked ? 'Açık' : 'Kapalı'}, Bildirimler: ${tgNotifications.checked ? 'Açık' : 'Kapalı'}`);
    tgStatus.textContent = "Aktif";
    tgStatus.className = "status status-running";
    speak("Telegram entegrasyon ayarları başarıyla kaydedildi.");
  });

  // WhatsApp - QR Scan Simulation (Interactive Wow factor)
  let qrTimer = null;
  function startQrScanSimulation() {
    clearTimeout(qrTimer);
    waQrOverlay.style.display = 'none';
    waStatus.textContent = "Oturum Bekleniyor";
    waStatus.className = "status status-idle";
    
    addChannelLog("WA: Yeni QR Kod üretildi. Okutulması bekleniyor...");

    // Simulate scanning after 6 seconds
    qrTimer = setTimeout(() => {
      if (state.activeTab === 'channels' && waContentQr.style.display !== 'none') {
        waQrOverlay.style.display = 'flex';
        waStatus.textContent = "Aktif (Web)";
        waStatus.className = "status status-running";
        addChannelLog("WA: QR Kod tarandı! Oturum başarıyla açıldı. Telefon: +90 532 754 3652");
        speak("WhatsApp Web bağlantısı kuruldu, efendim.");
      }
    }, 6000);
  }

  btnWaQrRefresh.addEventListener('click', () => {
    const img = document.getElementById('wa-qr-img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=peskiros-session-${Math.random()}`;
    startQrScanSimulation();
  });

  // WhatsApp Cloud API Actions
  btnWaCloudTest.addEventListener('click', () => {
    const phoneId = waPhoneId.value.trim();
    const token = waToken.value.trim();

    if (!phoneId || !token) {
      alert("Lütfen test yapmadan önce Phone ID ve Erişim Tokenı alanlarını doldurun.");
      return;
    }

    addChannelLog(`WA: Meta Cloud API üzerinden test gönderiliyor (Phone: ${phoneId})...`);
    // Mock successful Meta Cloud API request
    setTimeout(() => {
      addChannelLog("WA: Meta API test mesajı gönderim sırasına eklendi (Mock Success).");
      waStatus.textContent = "Aktif (Cloud)";
      waStatus.className = "status status-running";
      speak("WhatsApp API test mesajı gönderildi.");
    }, 1000);
  });

  btnWaCloudSave.addEventListener('click', () => {
    const phoneId = waPhoneId.value.trim();
    const token = waToken.value.trim();

    if (!phoneId || !token) {
      alert("Lütfen ayarları kaydetmeden önce alanları doldurun.");
      return;
    }

    addChannelLog(`WA: Meta Cloud API konfigürasyonu kaydedildi. Phone ID: ${phoneId}`);
    waStatus.textContent = "Aktif (Cloud)";
    waStatus.className = "status status-running";
    speak("WhatsApp Cloud API ayarları güncellendi.");
  });

  // Auto trigger QR scan simulation when opening this tab
  const originalSwitchTab = switchTab;
  switchTab = function(tabName) {
    originalSwitchTab(tabName);
    if (tabName === 'channels') {
      startQrScanSimulation();
    } else {
      clearTimeout(qrTimer);
    }
  };
}

function addChannelLog(text) {
  const consoleBox = document.getElementById('channels-console');
  if (!consoleBox) return;
  const time = new Date().toLocaleTimeString('tr-TR', { hour12: false });
  const line = document.createElement('div');
  line.className = 'console-line';
  line.textContent = `[${time}] ${text}`;
  consoleBox.appendChild(line);
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

