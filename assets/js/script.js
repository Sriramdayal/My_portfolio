// --- INITIALIZATION ---
lucide.createIcons();

// --- VIEW NAVIGATION ---
function switchView(viewName) {
    // Reset nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-cyan-500/10', 'text-cyan-400', 'border-cyan-500/20');
        btn.classList.remove('text-pink-400', 'bg-pink-500/10', 'border-pink-500/20');
        btn.classList.add('text-slate-500');
    });

    // Highlight active button
    const activeBtn = document.getElementById(`nav-${viewName}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-500');

        if (viewName === 'demo') {
            activeBtn.classList.add('bg-pink-500/10', 'text-pink-400', 'border-pink-500/20');
        } else {
            activeBtn.classList.add('bg-cyan-500/10', 'text-cyan-400', 'border-cyan-500/20');
        }
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

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu-overlay');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}

// --- TERMINAL LOGIC ---
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    'help': 'Available commands: <span class="text-cyan-400">whoami</span>, <span class="text-cyan-400">about</span>, <span class="text-cyan-400">projects</span>, <span class="text-pink-400">demo</span>, <span class="text-cyan-400">skills</span>, <span class="text-cyan-400">contact</span>, <span class="text-cyan-400">clear</span>',
    'whoami': 'Ramachandra Dayal K // AI Engineer based in Chennai, India.',
    'projects': 'Loading Project Index...',
    'demo': 'ESTABLISHING NEURAL LINK... CONNECTING TO JARVIS...',
    'skills': 'Analyzing Neural Pathways...',
    'contact': 'Initiating Uplink Protocol...',
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
            responseLine.innerHTML = commands[cmd];
            terminalOutput.appendChild(responseLine);

            // Trigger navigation
            if (cmd === 'projects') setTimeout(() => switchView('projects'), 800);
            if (cmd === 'demo') setTimeout(() => switchView('demo'), 1000);
            if (cmd === 'skills') setTimeout(() => switchView('skills'), 800);
            if (cmd === 'contact') setTimeout(() => switchView('contact'), 800);
        } else {
            const errorLine = document.createElement('div');
            errorLine.className = 'text-red-400 mb-2';
            errorLine.innerText = `Error: Command '${input}' not recognized.`;
            terminalOutput.appendChild(errorLine);
        }

        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

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

// Initialize
switchView('terminal');
