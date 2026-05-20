// --- INITIALIZATION ---
lucide.createIcons();

// --- VIEW NAVIGATION ---
function switchView(viewName) {
    // Reset nav buttons
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.classList.remove('bg-cyan-500/10', 'text-cyan-400', 'border-cyan-500/20');
        btn.classList.remove('text-pink-400', 'bg-pink-500/10', 'border-pink-500/20');
        btn.classList.remove('active');
        btn.classList.add('text-slate-500');
    });

    // Highlight active button (Desktop)
    const activeBtn = document.getElementById(`nav-${viewName}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-500');
        activeBtn.classList.add('active');

        if (viewName === 'demo') {
            activeBtn.classList.add('bg-pink-500/10', 'text-pink-400', 'border-pink-500/20');
        } else {
            activeBtn.classList.add('bg-cyan-500/10', 'text-cyan-400', 'border-cyan-500/20');
        }
    }

    // Highlight active button (Mobile)
    const activeMobileBtn = document.getElementById(`mobile-nav-${viewName}`);
    if (activeMobileBtn) {
        activeMobileBtn.classList.remove('text-slate-500');
        activeMobileBtn.classList.add('active');
    }

    // Update Header
    const titles = {
        'terminal': 'TERMINAL_MODULE',
        'projects': 'PROJECT_INDEX',
        'demo': 'NEURAL_LINK_V1.0',
        'skills': 'CAPABILITIES_MATRIX',
        'contact': 'UPLINK_STATION'
    };
    const titleEl = document.getElementById('header-title');

    if (viewName === 'demo') {
        titleEl.className = "text-base md:text-lg font-bold text-pink-500 uppercase tracking-widest flex items-center gap-2 truncate";
    } else {
        titleEl.className = "text-base md:text-lg font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2 truncate";
    }

    titleEl.innerHTML = `<span class="animate-pulse">_</span> ${titles[viewName]}`;

    // Transition Views
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.remove('fade-enter-active');
        el.classList.add('hidden-view');
    });

    const target = document.getElementById(`view-${viewName}`);
    target.classList.remove('hidden-view');
    target.classList.add('fade-enter');
    void target.offsetWidth; // force reflow
    target.classList.add('fade-enter-active');
}

// --- VISUAL EFFECTS CONTROL ---
function toggleFX() {
    const scanlines = document.getElementById('scanlines');
    const toggleBtn = document.getElementById('fx-toggle');
    if (scanlines.classList.contains('hidden')) {
        scanlines.classList.remove('hidden');
        toggleBtn.innerHTML = `<i data-lucide="eye" class="w-3 h-3"></i><span>FX: ON</span>`;
        toggleBtn.className = "flex items-center gap-1 px-2 py-0.5 md:py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 transition-colors";
    } else {
        scanlines.classList.add('hidden');
        toggleBtn.innerHTML = `<i data-lucide="eye-off" class="w-3 h-3"></i><span>FX: OFF</span>`;
        toggleBtn.className = "flex items-center gap-1 px-2 py-0.5 md:py-1 rounded bg-slate-900 border border-slate-700 text-slate-500 hover:border-slate-600 transition-colors";
    }
    lucide.createIcons();
}

// --- TERMINAL LOGIC ---
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    'help': 'Available directives:<br>' + 
            '  - <span class="text-cyan-400 font-bold">whoami</span>    : Display bio identifier<br>' + 
            '  - <span class="text-cyan-400 font-bold">projects</span>  : Access projects index<br>' + 
            '  - <span class="text-pink-400 font-bold">demo</span>      : Initiate Jarvis Neural Link<br>' + 
            '  - <span class="text-cyan-400 font-bold">skills</span>    : Read capabilities matrix<br>' + 
            '  - <span class="text-cyan-400 font-bold">contact</span>   : Initiate Uplink Protocol<br>' + 
            '  - <span class="text-cyan-400 font-bold">status</span>    : Check hardware & network telemetry<br>' +
            '  - <span class="text-cyan-400 font-bold">clear</span>     : Wipe terminal console buffers',
    'whoami': 'Ramachandra Dayal K // AI Engineer based in Chennai, India.<br>Passionate about building state-of-the-art NLP, CV pipelines, and optimized AI models.',
    'projects': 'Directing to Project Showcase Index... [REDIRECTING]',
    'demo': 'ESTABLISHING NEURAL LINK... CONNECTING TO JARVIS AGENT SPACE...',
    'skills': 'Accessing skill sets and matrix metrics... [REDIRECTING]',
    'contact': 'Opening Secure Uplink Station communications... [REDIRECTING]',
    'status': () => {
        const gpu = document.getElementById('gpu-stat').innerText;
        const ram = document.getElementById('ram-stat').innerText;
        return '=== HARDWARE TELEMETRY ===<br>' +
               `System Status   : <span class="text-emerald-500 font-bold">● ONLINE</span><br>` +
               `GPU Load        : <span class="text-cyan-400">${gpu}</span><br>` +
               `RAM Allocation  : <span class="text-purple-400">${ram}</span><br>` +
               `Uplink Latency  : <span class="text-green-400">24ms (EXCELLENT)</span><br>` +
               `Encryption Node : Node-04-Chennai (AES-256)<br>` +
               `Neural Sync     : <span class="text-pink-400 font-bold">STABLE</span>`;
    }
};

terminalInput.addEventListener('keydown', async function (e) {
    if (e.key === 'Enter') {
        const input = this.value.trim();
        if (input === '') return;

        // User Line
        const userLine = document.createElement('div');
        userLine.className = 'text-cyan-400 mb-1 mt-2';
        userLine.innerHTML = `<span class="mr-2 font-bold">➜</span>${input}`;
        terminalOutput.appendChild(userLine);

        const cmd = input.toLowerCase();

        // System Response
        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (commands[cmd]) {
            const responseLine = document.createElement('div');
            responseLine.className = 'text-slate-300 mb-2';
            
            // Handle command function vs string
            const outputVal = (typeof commands[cmd] === 'function') ? commands[cmd]() : commands[cmd];
            responseLine.innerHTML = outputVal;
            terminalOutput.appendChild(responseLine);

            // Trigger navigation
            if (cmd === 'projects') setTimeout(() => switchView('projects'), 800);
            if (cmd === 'demo') setTimeout(() => switchView('demo'), 1000);
            if (cmd === 'skills') setTimeout(() => switchView('skills'), 800);
            if (cmd === 'contact') setTimeout(() => switchView('contact'), 800);
        } else {
            const errorLine = document.createElement('div');
            errorLine.className = 'text-red-400 mb-2';
            errorLine.innerText = `Error: Directive '${input}' unrecognized. Type 'help' for directives.`;
            terminalOutput.appendChild(errorLine);
        }

        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// --- TYPEWRITER WELCOME EFFECT ---
const welcomeLines = [
    { text: '// Establishing secure node connection... OK', class: 'text-slate-500' },
    { text: '// Initializing bio-metrics handshake...', class: 'text-slate-500' },
    { text: 'Welcome to the interface of <span class="text-cyan-400 font-bold">Ramachandra Dayal K</span>.', class: 'text-slate-200 font-bold text-base' },
    { text: 'Core Focus: <span class="text-purple-400">Computer Vision, NLP & LLMs</span>', class: 'text-slate-300' },
    { text: '', class: '' },
    { text: '🔭 Working on: <span class="text-yellow-500 font-semibold">LLM fine-tuning</span><br>🌱 Learning: <span class="text-yellow-500 font-semibold">Deep Learning & Model Optimization</span><br>💬 Ask about: <span class="text-yellow-500 font-semibold">Computer Vision, NLP, ML, Python, or Automation</span>', class: 'text-yellow-500/80 border-l-2 border-yellow-500 pl-3 italic text-xs md:text-sm' },
    { text: '', class: '' },
    { text: 'Input <span class="text-cyan-400 font-bold">help</span> to view available terminal directive keys.', class: 'text-cyan-600 font-semibold' }
];

function typeText(element, text) {
    return new Promise(resolve => {
        let i = 0;
        let currentText = '';
        let isTag = false;
        
        function tick() {
            if (i >= text.length) {
                resolve();
                return;
            }
            
            const char = text[i];
            if (char === '<') isTag = true;
            
            currentText += char;
            
            if (char === '>') isTag = false;
            
            element.innerHTML = currentText;
            i++;
            
            if (isTag) {
                tick();
            } else {
                setTimeout(tick, text.length > 50 ? 5 : 15);
            }
        }
        tick();
    });
}

async function runWelcomeSequence() {
    terminalOutput.innerHTML = '';
    for (const line of welcomeLines) {
        if (line.text === '') {
            terminalOutput.appendChild(document.createElement('br'));
        } else {
            const el = document.createElement('div');
            el.className = line.class;
            terminalOutput.appendChild(el);
            await typeText(el, line.text);
        }
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
}

// --- UPLINK FORM INTERCEPTOR ---
const uplinkForm = document.getElementById('uplink-form');
const transmissionOverlay = document.getElementById('transmission-overlay');
const transmissionStatus = document.getElementById('transmission-status');

if (uplinkForm) {
    uplinkForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        // Show overlay
        transmissionOverlay.classList.remove('hidden');
        transmissionOverlay.classList.add('flex');
        
        const steps = [
            '[UPLINK] Initiating telemetry handshake...',
            '[UPLINK] Secure SSL connection established.',
            '[CYPHER] Encrypting request payload with AES-256...',
            '[SYS] Routing telemetry packet through Chennai-Node-04...'
        ];
        
        for (const step of steps) {
            const line = document.createElement('div');
            line.innerText = step;
            transmissionStatus.appendChild(line);
            await new Promise(r => setTimeout(r, 600));
        }
        
        const isPlaceholder = uplinkForm.action.includes('YOUR_UNIQUE_ID');
        
        if (isPlaceholder) {
            const line = document.createElement('div');
            line.className = 'text-yellow-500 mt-2 font-bold';
            line.innerHTML = '[WARN] Formspree ID is unconfigured (using fallback).<br>[MOCK] Writing message to virtual pipeline...';
            transmissionStatus.appendChild(line);
            
            await new Promise(r => setTimeout(r, 1200));
            
            const successLine = document.createElement('div');
            successLine.className = 'text-emerald-400 mt-2 font-bold animate-pulse';
            successLine.innerText = '● TRANSMISSION SENT SUCCESSFULLY (MOCK_UPLINK)';
            transmissionStatus.appendChild(successLine);
        } else {
            const line = document.createElement('div');
            line.className = 'text-cyan-400 mt-2';
            line.innerText = '[SYS] Forwarding payload to Formspree server...';
            transmissionStatus.appendChild(line);
            
            try {
                const formData = new FormData(uplinkForm);
                const response = await fetch(uplinkForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const successLine = document.createElement('div');
                    successLine.className = 'text-emerald-400 mt-2 font-bold animate-pulse';
                    successLine.innerText = '● TRANSMISSION DELIVERED SECURELY';
                    transmissionStatus.appendChild(successLine);
                } else {
                    throw new Error('Server rejected submission');
                }
            } catch (err) {
                const errLine = document.createElement('div');
                errLine.className = 'text-red-400 mt-2 font-bold';
                errLine.innerText = `● EXCEPTION: UPLINK FAILED. ${err.message}`;
                transmissionStatus.appendChild(errLine);
            }
        }
        
        // Add Close Button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mt-6 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-mono text-xs transition-all shadow-[0_0_10px_rgba(234,88,12,0.4)]';
        closeBtn.innerText = 'DISCONNECT UPLINK';
        closeBtn.onclick = function() {
            transmissionOverlay.classList.remove('flex');
            transmissionOverlay.classList.add('hidden');
            transmissionStatus.innerHTML = '';
            uplinkForm.reset();
        };
        transmissionOverlay.appendChild(closeBtn);
    });
}

// --- LIVE SIMULATION (Stats & Clock) ---
setInterval(() => {
    document.getElementById('system-clock').innerText = new Date().toLocaleTimeString();
}, 1000);

setInterval(() => {
    const gpu = Math.floor(Math.random() * 40) + 10;
    const ram = Math.floor(Math.random() * 20) + 30;
    document.getElementById('gpu-stat').innerText = `${gpu}%`;
    document.getElementById('gpu-bar').style.width = `${gpu}%`;
    document.getElementById('ram-stat').innerText = `${ram}%`;
    document.getElementById('ram-bar').style.width = `${ram}%`;
}, 2500);

// --- OS DETECTION & THEME ---
function detectOS() {
    const ua = window.navigator.userAgent.toLowerCase();
    
    // Explicit override via URL parameter for testing/verification (e.g. ?os=ios)
    const urlParams = new URLSearchParams(window.location.search);
    const osOverride = urlParams.get('os');
    if (osOverride && ['ios', 'android', 'windows', 'macos', 'default'].includes(osOverride.toLowerCase())) {
        return osOverride.toLowerCase();
    }

    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod") || (ua.includes("macintosh") && navigator.maxTouchPoints > 1)) {
        return "ios";
    }
    if (ua.includes("android")) {
        return "android";
    }
    if (ua.includes("windows")) {
        return "windows";
    }
    if (ua.includes("mac")) {
        return "macos";
    }
    return "default";
}

function applyOSTheme() {
    const os = detectOS();
    document.documentElement.setAttribute('data-os', os);
    console.log(`[SYS] OS Detected: ${os}. Applying theme configuration.`);
}

// Initialize
applyOSTheme();
switchView('terminal');
runWelcomeSequence();
