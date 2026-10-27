const boxes = document.querySelectorAll(".pass-box");

const keys = document.querySelectorAll(".key");

const unlockBtn = document.getElementById("unlockBtn");

const message = document.getElementById("message");


let entered = "";


// ======================================
// YOUR PASSCODE
// ======================================

const correctPasskey = "2910";


// ======================================
// UPDATE PASSCODE BOXES
// ======================================

function updateBoxes() {

    boxes.forEach((box, index) => {

        box.classList.toggle(
            "filled",
            index < entered.length
        );

        box.classList.toggle(
            "active",
            index === entered.length &&
            entered.length < 4
        );

    });

}


// ======================================
// ADD NUMBER
// ======================================

function addNumber(number) {

    // Maximum 4 digits
    if (entered.length >= 4) {

        return;

    }


    entered += number;


    message.textContent = "";

    message.className = "message";


    updateBoxes();


    // Automatically check after 4 digits
    if (entered.length === 4) {

        checkPasskey();

    }

}


// ======================================
// CLEAR EVERYTHING
// ======================================

function clearPasskey() {

    entered = "";

    message.textContent = "";

    message.className = "message";

    updateBoxes();

}


// ======================================
// DELETE LAST NUMBER
// ======================================

function removeLast() {

    entered = entered.slice(0, -1);

    message.textContent = "";

    message.className = "message";

    updateBoxes();

}


// ======================================
// CHECK PASSCODE
// ======================================

function checkPasskey() {

    if (entered === correctPasskey) {

        message.textContent =
            "Unlocked ♡ Welcome to our little world!";

        message.className =
            "message success";

        // Show the Hey!! page overlay inside the same page
        setTimeout(() => {
            showOnlyPage("heyPage");
        }, 800);

    }

    else {

        message.textContent =
            "Hmm... that's not our little secret ♡";

        message.className =
            "message error";


        boxes.forEach((box) => {

            box.classList.add("wrong");

        });


        setTimeout(() => {

            boxes.forEach((box) => {

                box.classList.remove("wrong");

            });

            clearPasskey();

        }, 650);

    }

}


// ======================================
// NUMBER BUTTONS
// ======================================

keys.forEach((key) => {

    key.addEventListener("click", () => {

        const value = key.dataset.key;


        if (value === "clear") {

            clearPasskey();

        }


        else if (value === "backspace") {

            removeLast();

        }


        else {

            addNumber(value);

        }

    });

});


// ======================================
// UNLOCK BUTTON
// ======================================

unlockBtn.addEventListener(
    "click",
    checkPasskey
);


// ======================================
// KEYBOARD SUPPORT
// ======================================

document.addEventListener(
    "keydown",
    (event) => {


        // Number keys

        if (/^[0-9]$/.test(event.key)) {

            addNumber(event.key);

        }


        // Backspace

        else if (event.key === "Backspace") {

            removeLast();

        }


        // Escape = clear

        else if (event.key === "Escape") {

            clearPasskey();

        }


        // Enter = check

        else if (event.key === "Enter") {

            checkPasskey();

        }

    }
);


// Start the boxes

updateBoxes();


// ======================================
// HEY PAGE – YES / NO BUTTONS & CANVAS
// ======================================

function initHeyCanvas() {
    const canvas = document.getElementById("heyCanvas");
    if (!canvas || typeof canvas.getContext !== "function") return;
    if (canvas._initialized || (canvas.dataset && canvas.dataset.initialized === "true")) return;
    canvas._initialized = true;
    if (canvas.dataset) canvas.dataset.initialized = "true";
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const particles = [];

    // 1. Tumbling 3D Cheer Red & Rose Petals
    class CherryPetal {
        constructor(x, y, burst = false) {
            this.type = 'petal';
            this.reset(burst);
            if (x !== undefined && y !== undefined) {
                this.x = x;
                this.y = y;
                if (burst) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 4.5 + 2;
                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed - 1.2;
                }
            }
        }
        reset(burst = false) {
            this.x = Math.random() * w;
            this.y = burst ? Math.random() * h : -20 - Math.random() * 40;
            this.size = Math.random() * 8 + 12; // 12 to 20px
            this.fallSpeed = Math.random() * 0.7 + 0.85; // smooth drift
            this.swayAngle = Math.random() * Math.PI * 2;
            this.swaySpeed = Math.random() * 0.025 + 0.015;
            this.swayDist = Math.random() * 1.6 + 1.0;
            this.tumbleAngle = Math.random() * Math.PI * 2;
            this.tumbleSpeed = Math.random() * 0.03 + 0.018;
            this.rollAngle = Math.random() * Math.PI * 2;
            this.rollSpeed = (Math.random() - 0.5) * 0.02;
            this.alpha = Math.random() * 0.25 + 0.7;
            this.vx = 0;
            this.vy = 0;

            const palettes = [
                { c1: '#ffffff', c2: '#ff4d6d', edge: '#d90429' }, // vibrant cheer red
                { c1: '#fff0f3', c2: '#c91838', edge: '#800e20' }, // deep ruby cherry
                { c1: '#fff5f7', c2: '#ff758f', edge: '#ff3358' }, // cherry rose
                { c1: '#ffffff', c2: '#ffb3c6', edge: '#d90429' }  // cherry blossom
            ];
            const p = palettes[Math.floor(Math.random() * palettes.length)];
            this.c1 = p.c1;
            this.c2 = p.c2;
            this.edge = p.edge;
        }
        update() {
            if (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05) {
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.94;
                this.vy = this.vy * 0.94 + 0.12;
            } else {
                this.swayAngle += this.swaySpeed;
                this.x += Math.sin(this.swayAngle) * this.swayDist + 0.2;
                this.y += this.fallSpeed;
            }
            this.tumbleAngle += this.tumbleSpeed;
            this.rollAngle += this.rollSpeed;

            if (this.y > h + 25) this.reset();
            if (this.x < -25) this.x = w + 15;
            if (this.x > w + 25) this.x = -15;
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rollAngle);
            const cosT = Math.cos(this.tumbleAngle);
            const sinT = Math.sin(this.tumbleAngle);
            ctx.scale(1, Math.max(0.14, Math.abs(cosT)));
            ctx.globalAlpha = this.alpha * (0.8 + 0.2 * Math.abs(sinT));

            const grad = ctx.createRadialGradient(0, -this.size * 0.2, 1, 0, 0, this.size);
            grad.addColorStop(0, this.c1);
            grad.addColorStop(0.5, this.c2);
            grad.addColorStop(1, this.edge);
            ctx.fillStyle = grad;

            ctx.beginPath();
            const pw = this.size * 0.75;
            const ph = this.size;
            ctx.moveTo(0, -ph);
            ctx.bezierCurveTo(pw * 1.2, -ph * 0.6, pw * 1.1, ph * 0.5, 0, ph);
            ctx.bezierCurveTo(-pw * 1.1, ph * 0.5, -pw * 1.2, -ph * 0.6, 0, -ph);
            ctx.fill();

            // Delicate petal vein highlight
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, -ph * 0.7);
            ctx.quadraticCurveTo(pw * 0.1, 0, 0, ph * 0.6);
            ctx.stroke();

            ctx.restore();
        }
    }

    // 2. Floating Coquette Pinterest Charms (୨୧, ✦, ♡, 🍒, ✧)
    class PinterestCharm {
        constructor() {
            this.type = 'charm';
            this.charms = ['୨୧', '✦', '♡', '🍒', '✧', '⋆'];
            this.reset();
        }
        reset() {
            this.charm = this.charms[Math.floor(Math.random() * this.charms.length)];
            this.x = Math.random() * w;
            this.y = h + 20 + Math.random() * 40;
            this.size = Math.random() * 6 + 14;
            this.speedY = -(Math.random() * 0.4 + 0.28);
            this.sway = Math.random() * Math.PI * 2;
            this.swaySpeed = Math.random() * 0.02 + 0.01;
            this.pulse = Math.random() * Math.PI * 2;
            this.alpha = Math.random() * 0.35 + 0.55;

            const colors = ['#ffd700', '#ff3358', '#ffccd5', '#ffffff', '#ff9ebb'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.y += this.speedY;
            this.sway += this.swaySpeed;
            this.x += Math.sin(this.sway) * 0.5;
            this.pulse += 0.03;

            if (this.y < -30) this.reset();
        }
        draw() {
            ctx.save();
            const pScale = 1 + 0.12 * Math.sin(this.pulse);
            ctx.globalAlpha = this.alpha * (0.85 + 0.15 * Math.sin(this.pulse));
            ctx.translate(this.x, this.y);
            ctx.scale(pScale, pScale);

            ctx.font = `${this.size}px "Outfit", "Segoe UI Symbol", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color === '#ffd700' ? '#ffd700' : '#d90429';
            ctx.shadowBlur = 8;
            ctx.fillText(this.charm, 0, 0);
            ctx.restore();
        }
    }

    // 3. Dreamy Cherry & Champagne Bokeh Orbs
    class CherryBokeh {
        constructor() {
            this.type = 'bokeh';
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.radius = Math.random() * 32 + 25;
            this.speedY = -(Math.random() * 0.2 + 0.08);
            this.speedX = (Math.random() - 0.5) * 0.18;
            this.phase = Math.random() * Math.PI * 2;
            this.alpha = Math.random() * 0.1 + 0.06;
            this.color = Math.random() > 0.4 ? '217, 4, 41' : '255, 215, 0';
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.phase += 0.018;

            if (this.y < -this.radius * 2) this.y = h + this.radius;
            if (this.x < -this.radius * 2) this.x = w + this.radius;
            if (this.x > w + this.radius * 2) this.x = -this.radius;
        }
        draw() {
            ctx.save();
            const curR = this.radius * (1 + 0.12 * Math.sin(this.phase));
            ctx.globalAlpha = this.alpha * (0.85 + 0.15 * Math.sin(this.phase));

            const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, curR);
            grad.addColorStop(0, `rgba(${this.color}, 0.55)`);
            grad.addColorStop(0.5, `rgba(${this.color}, 0.18)`);
            grad.addColorStop(1, `rgba(${this.color}, 0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(this.x, this.y, curR, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // 4. Luminous Fairydust Twinkles
    class CherryStardust {
        constructor() {
            this.type = 'stardust';
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2.2 + 1;
            this.speedY = -(Math.random() * 0.3 + 0.12);
            this.phase = Math.random() * Math.PI * 2;
            this.color = Math.random() > 0.4 ? '#ffd700' : '#ffffff';
            this.alpha = Math.random() * 0.5 + 0.4;
        }
        update() {
            this.y += this.speedY;
            this.phase += 0.035;
            if (this.y < -10) this.y = h + 10;
        }
        draw() {
            ctx.save();
            const a = Math.max(0.15, Math.abs(Math.sin(this.phase)));
            ctx.globalAlpha = this.alpha * a;
            ctx.fillStyle = this.color;
            ctx.shadowColor = '#ffd700';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Populate particles
    for (let i = 0; i < 24; i++) {
        const p = new CherryPetal();
        p.y = Math.random() * h;
        particles.push(p);
    }
    for (let i = 0; i < 15; i++) {
        const c = new PinterestCharm();
        c.y = Math.random() * h;
        particles.push(c);
    }
    for (let i = 0; i < 8; i++) {
        particles.push(new CherryBokeh());
    }
    for (let i = 0; i < 25; i++) {
        particles.push(new CherryStardust());
    }

    // Interactive Tap/Click Ripple: flutter cherry petals on click
    const heyPageEl = document.getElementById("heyPage");
    if (heyPageEl) {
        heyPageEl.addEventListener("pointerdown", (e) => {
            if (e.target.closest("button") || e.target.closest(".hey-card")) return;
            for (let i = 0; i < 7; i++) {
                particles.push(new CherryPetal(e.clientX, e.clientY, true));
            }
            if (particles.length > 90) particles.splice(0, 7);
        });
    }

    function render() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

/* =========================================================
   CENTRALIZED SEQUENTIAL PAGE CONTROLLER
   Ensures ONLY ONE page is active at a time to prevent messy overlaps,
   while guaranteeing full browser Back button sequential history.
   ========================================================= */
let activePageTransitionTimer = null;

function showLockPage() {
    sessionStorage.clear();
    document.documentElement.classList.remove("unlocked", "return-to-cake-mode", "return-to-gifts-mode", "return-to-hey-mode");
    document.body.classList.remove("unlocked");

    const pageMap = {
        heyPage: document.getElementById("heyPage"),
        birthdayCakePage: document.getElementById("birthdayCakePage"),
        giftBoxesPage: document.getElementById("giftBoxesPage"),
        howDarePage: document.getElementById("howDarePage"),
        skipCakeDramaPage: document.getElementById("skipCakeDramaPage")
    };
    Object.values(pageMap).forEach(el => {
        if (!el) return;
        el.classList.remove("active", "visible");
        el.style.zIndex = "";
    });

    const lockPage = document.querySelector(".page");
    if (lockPage) {
        lockPage.classList.remove("is-hidden");
        lockPage.style.display = "";
        lockPage.style.visibility = "";
        lockPage.style.pointerEvents = "";
    }
    if (typeof clearPasskey === "function") clearPasskey();
}
window.showLockPage = showLockPage;

function showOnlyPage(pageId, options = {}) {
    // Sequential history navigation: push state if not from popstate
    try {
        sessionStorage.setItem("lastActivePage", pageId);
        sessionStorage.setItem("siteUnlocked", "true");
        if (!options.fromPopState && window.history && window.history.pushState) {
            if (window.location.hash !== "#" + pageId) {
                window.history.pushState({ pageId: pageId }, "", "#" + pageId);
            }
        }
    } catch (e) {}

    // Clean up any lingering transition overlays
    document.querySelectorAll(".grand-celebration-transition-overlay, div[style*='z-index: 99999999']").forEach(el => el.remove());

    // Ensure gift modal is closed when transitioning between pages
    if (typeof closeGiftModal === "function") {
        closeGiftModal(true);
    }

    // 1. Permanently eradicate Page 1 (Lock Screen) from the DOM and viewport
    document.documentElement.classList.add("unlocked");
    document.body.classList.add("unlocked");

    if (pageId === "birthdayCakePage") {
        document.documentElement.classList.add("return-to-cake-mode");
        document.documentElement.classList.remove("return-to-gifts-mode", "return-to-hey-mode");
    } else if (pageId === "giftBoxesPage") {
        document.documentElement.classList.add("return-to-gifts-mode");
        document.documentElement.classList.remove("return-to-cake-mode", "return-to-hey-mode");
    } else if (pageId === "heyPage") {
        document.documentElement.classList.add("return-to-hey-mode");
        document.documentElement.classList.remove("return-to-cake-mode", "return-to-gifts-mode");
    } else {
        document.documentElement.classList.remove("return-to-cake-mode", "return-to-gifts-mode", "return-to-hey-mode");
    }

    const lockPage = document.querySelector(".page");
    if (lockPage) {
        lockPage.classList.add("is-hidden");
        lockPage.style.display = "none";
        lockPage.style.visibility = "hidden";
        lockPage.style.pointerEvents = "none";
    }

    const pageMap = {
        heyPage: document.getElementById("heyPage"),
        birthdayCakePage: document.getElementById("birthdayCakePage"),
        giftBoxesPage: document.getElementById("giftBoxesPage"),
        howDarePage: document.getElementById("howDarePage"),
        skipCakeDramaPage: document.getElementById("skipCakeDramaPage")
    };

    // Also ensure legacy overlay elements remain hidden
    const legacyLittle = document.getElementById("littleWorldPage");
    if (legacyLittle) legacyLittle.classList.remove("active");
    const legacySurprise = document.getElementById("surprisePage");
    if (legacySurprise) legacySurprise.classList.remove("active");

    const target = pageMap[pageId];
    if (!target) return;

    // Clear any pending transition timer from an earlier switch
    if (activePageTransitionTimer) {
        clearTimeout(activePageTransitionTimer);
        activePageTransitionTimer = null;
    }

    // Collect currently visible / active outgoing pages
    const outgoingPages = [];
    Object.entries(pageMap).forEach(([id, el]) => {
        if (!el || el === target) return;
        const isCurrentActive = (id === 'heyPage' && el.classList.contains('visible')) ||
                                (id !== 'heyPage' && el.classList.contains('active'));
        if (isCurrentActive) {
            outgoingPages.push({ id, el });
        } else {
            // Clean up any other inactive elements immediately
            if (id === 'heyPage') el.classList.remove('visible');
            else el.classList.remove('active');
            el.style.zIndex = "";
        }
    });

    // 2. Bring TARGET page directly to the top layer immediately
    target.style.zIndex = "1000005";
    if (pageId === 'heyPage') {
        target.classList.add('visible');
        if (typeof initHeyCanvas === 'function') initHeyCanvas();
    } else {
        target.classList.add('active');
    }
    if (target.scrollTop !== undefined) {
        target.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 3. ZERO-GAP OVERLAP HANDOVER:
    // Keep outgoing page visible UNDERNEATH target for 380ms while target completes its fade-in.
    // This physically guarantees no white/transparent gap or background leak can ever occur!
    if (outgoingPages.length > 0 && !options.immediate) {
        outgoingPages.forEach(({ el }) => {
            el.style.zIndex = "1000000"; // sits directly below incoming target (1000005)
        });

        activePageTransitionTimer = setTimeout(() => {
            outgoingPages.forEach(({ id, el }) => {
                if (id === 'heyPage') el.classList.remove('visible');
                else el.classList.remove('active');
                el.style.zIndex = "";
            });
            target.style.zIndex = "";
            activePageTransitionTimer = null;
        }, 380);
    } else {
        // Immediate switch (e.g. direct URL / initial boot)
        outgoingPages.forEach(({ id, el }) => {
            if (id === 'heyPage') el.classList.remove('visible');
            else el.classList.remove('active');
            el.style.zIndex = "";
        });
        target.style.zIndex = "";
    }
}

window.showOnlyPage = showOnlyPage;

function handleYes() {
    // Advance sequentially from Hey Page to Birthday Cake Page
    showOnlyPage("birthdayCakePage");
    if (typeof resetCandles === "function") resetCandles();
}

function handleNo() {
    // Open the cute playful drama page
    showOnlyPage("howDarePage");
}

function handleGoBack() {
    if (typeof pauseCakeBirthdayMusic === "function") pauseCakeBirthdayMusic();
    // Go directly to Hey Page only!
    showOnlyPage("heyPage");
}

function handleBirthdayBackToHey() {
    if (typeof pauseCakeBirthdayMusic === "function") pauseCakeBirthdayMusic();
    // From Birthday Cake Page, return cleanly to Hey Page
    sessionStorage.removeItem("returnToCake");
    if (typeof resetCakeCut === "function") resetCakeCut();
    if (window.history.length > 1) {
        window.history.back();
    } else {
        showOnlyPage("heyPage");
    }
}

function handleBirthdayBack() {
    handleBirthdayBackToHey();
}

function handleBirthdayNextToGifts() {
    if (typeof pauseCakeBirthdayMusic === "function") pauseCakeBirthdayMusic();
    // From Birthday Cake Page, advance forward to Gift Boxes Page
    sessionStorage.removeItem("returnToCake");
    showOnlyPage("giftBoxesPage");
}

window.handleYes = handleYes;
window.handleNo = handleNo;
window.handleGoBack = handleGoBack;
window.handleBirthdayBackToHey = handleBirthdayBackToHey;
window.handleBirthdayBack = handleBirthdayBack;
window.handleBirthdayNextToGifts = handleBirthdayNextToGifts;
window.handleBlowButtonClick = handleBlowButtonClick;
window.toggleCakeBirthdayMusic = toggleCakeBirthdayMusic;
window.playCakeBirthdayMusic = playCakeBirthdayMusic;
window.pauseCakeBirthdayMusic = pauseCakeBirthdayMusic;

function playKnifeShing() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;

        // Realistic metallic blade "shiiing!"
        [2400, 3600, 4800].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + idx * 0.02);
            gain.gain.setValueAtTime(0, now + idx * 0.02);
            gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + idx * 0.02 + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.02 + 0.55);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.02);
            osc.stop(now + idx * 0.02 + 0.58);
        });
    } catch(e) {}
}
window.playKnifeShing = playKnifeShing;

// ======================================
// INTERACTIVE SPIDEY COMPANION
// ======================================
let spideyQuoteIndex = 0;
const spideyQuotes = [
    "wait till you see it! ୨୧",
    "pssst... press Yes! 💌",
    "made with love for you ♡",
    "i helped pick the gifts! 🕷️✨",
    "spidey senses say you'll love it! 🫰",
    "happy birthday sweetheart! 🎂💕"
];

function playSpideyChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        const notes = [659.25, 880, 1046.50, 1318.51]; // E5, A5, C6, E6 melodic chime
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);
            gain.gain.setValueAtTime(0, now + idx * 0.07);
            gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.07 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.36);
        });
    } catch(e) {}
}

function spawnSpideyHeartBurst(x, y) {
    const symbols = ["♥", "♡", "✨", "💕", "🌸", "୨୧", "🕷️"];
    const container = document.getElementById("spideyHeartsLayer") || document.getElementById("heySpideyWrap") || document.body;
    for (let i = 0; i < 7; i++) {
        const heart = document.createElement("span");
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.position = "absolute";
        heart.style.left = (x !== undefined ? x : 50) + "%";
        heart.style.top = (y !== undefined ? y : 60) + "%";
        heart.style.pointerEvents = "none";
        heart.style.userSelect = "none";
        heart.style.fontSize = Math.floor(Math.random() * 10 + 16) + "px";
        heart.style.color = ["#a4133c", "#d90429", "#ff4d6d", "#ff758f", "#ffb703"][Math.floor(Math.random() * 5)];
        heart.style.zIndex = "100";
        heart.style.transition = "all 0.85s cubic-bezier(0.19, 1, 0.22, 1)";
        heart.style.opacity = "1";
        container.appendChild(heart);

        const dx = (Math.random() - 0.5) * 85;
        const dy = -(Math.random() * 55 + 25);
        const rot = (Math.random() - 0.5) * 40;

        requestAnimationFrame(() => {
            heart.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(1.15)`;
            heart.style.opacity = "0";
        });

        setTimeout(() => heart.remove(), 900);
    }
}

function interactWithSpidey(e) {
    if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
    }
    
    // Play sweet chime
    playSpideyChime();

    // Trigger joyful bounce on rig using rAF (no synchronous layout thrashing)
    const rig = document.getElementById("spideyRig");
    if (rig) {
        rig.classList.remove("spidey-wiggle");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                rig.classList.add("spidey-wiggle");
            });
        });
        setTimeout(() => {
            if (rig) rig.classList.remove("spidey-wiggle");
        }, 700);
    }

    // Cycle quote with smooth scale pop
    spideyQuoteIndex = (spideyQuoteIndex + 1) % spideyQuotes.length;
    const speechText = document.getElementById("spideySpeechText");
    const speechBubble = document.getElementById("spideySpeechBubble");
    if (speechText) {
        if (speechBubble) {
            speechBubble.style.transform = "scale(0.94)";
            setTimeout(() => {
                speechText.textContent = spideyQuotes[spideyQuoteIndex];
                speechBubble.style.transform = "scale(1.05)";
                setTimeout(() => {
                    speechBubble.style.transform = "";
                }, 140);
            }, 90);
        } else {
            speechText.textContent = spideyQuotes[spideyQuoteIndex];
        }
    }

    // Spawn heart burst inside isolated container
    spawnSpideyHeartBurst(50, 60);
}

window.interactWithSpidey = interactWithSpidey;


// ======================================
// BIRTHDAY CAKE PAGE BACKGROUND MUSIC / TUNE
// ======================================
let cakeBirthdayAudio = null;
let isCakeMusicPlaying = false;
let cakeSynthCtx = null;
let cakeSynthTimer = null;
let isCakeSynthRunning = false;

function initCakeBirthdayMusic() {
    if (!cakeBirthdayAudio) {
        cakeBirthdayAudio = document.getElementById("cakeBirthdayAudio");
        if (!cakeBirthdayAudio) {
            cakeBirthdayAudio = new Audio();
            cakeBirthdayAudio.id = "cakeBirthdayAudio";
            cakeBirthdayAudio.loop = true;
            cakeBirthdayAudio.volume = 0.85;
            cakeBirthdayAudio.src = "assets/classic_happy_birthday.wav";
            document.body.appendChild(cakeBirthdayAudio);
        } else {
            cakeBirthdayAudio.loop = true;
            cakeBirthdayAudio.volume = 0.85;
            if (!cakeBirthdayAudio.src || cakeBirthdayAudio.src.includes("birthday_music.wav")) {
                cakeBirthdayAudio.src = "assets/classic_happy_birthday.wav";
            }
        }

        cakeBirthdayAudio.addEventListener("play", () => {
            setCakeMusicPlayingUI(true);
        });

        cakeBirthdayAudio.addEventListener("pause", () => {
            if (!isCakeSynthRunning) {
                setCakeMusicPlayingUI(false);
            }
        });

        cakeBirthdayAudio.addEventListener("error", () => {
            console.log("Cake audio load error, trying fallback path...");
            if (cakeBirthdayAudio.src && !cakeBirthdayAudio.src.includes("public/")) {
                cakeBirthdayAudio.src = "public/classic_happy_birthday.wav";
                cakeBirthdayAudio.play().catch(() => {
                    playHappyBirthdaySynth();
                });
            } else {
                playHappyBirthdaySynth();
            }
        });
    }
}

function playCakeBirthdayMusic() {
    initCakeBirthdayMusic();

    if (cakeBirthdayAudio) {
        cakeBirthdayAudio.currentTime = 0;
        const playPromise = cakeBirthdayAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isCakeMusicPlaying = true;
                setCakeMusicPlayingUI(true);
            }).catch((err) => {
                console.warn("Audio element play prevented/failed, activating classic synth tune:", err);
                playHappyBirthdaySynth();
            });
        }
    } else {
        playHappyBirthdaySynth();
    }
}

function pauseCakeBirthdayMusic() {
    if (cakeBirthdayAudio) {
        try { cakeBirthdayAudio.pause(); } catch (e) {}
    }
    stopHappyBirthdaySynth();
    isCakeMusicPlaying = false;
    setCakeMusicPlayingUI(false);
}

function toggleCakeBirthdayMusic() {
    if (isCakeMusicPlaying || isCakeSynthRunning) {
        pauseCakeBirthdayMusic();
    } else {
        playCakeBirthdayMusic();
    }
}

function setCakeMusicPlayingUI(playing) {
    isCakeMusicPlaying = playing;
    const pill = document.getElementById("cakeMusicPill");
    const icon = document.getElementById("cakeMusicIcon");
    const label = document.getElementById("cakeMusicLabel");

    if (pill) {
        if (playing) {
            pill.classList.add("playing");
            if (icon) icon.textContent = "🎶";
            if (label) label.textContent = "Classic Birthday Tune Playing";
        } else {
            pill.classList.remove("playing");
            if (icon) icon.textContent = "🎵";
            if (label) label.textContent = "Classic Birthday Tune";
        }
    }
}

// High Quality Classic Music-Box / Chime Synthesizer
function playHappyBirthdaySynth() {
    stopHappyBirthdaySynth();

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!cakeSynthCtx || cakeSynthCtx.state === "closed") {
            cakeSynthCtx = new AudioContext();
        }
        if (cakeSynthCtx.state === "suspended") {
            cakeSynthCtx.resume();
        }
    } catch (e) {
        return;
    }

    isCakeSynthRunning = true;
    setCakeMusicPlayingUI(true);

    // Classic Happy Birthday melody in G major
    const D3 = 146.83, Fs3 = 185.00, G3 = 196.00, A3 = 220.00, B3 = 246.94, C4 = 261.63;
    const D4 = 293.66, E4 = 329.63, Fs4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99, B5 = 987.77;

    const notes = [
        // Phrase 1: Happy Birthday to you
        { f: D4, d: 0.75 },
        { f: D4, d: 0.25 },
        { f: E4, d: 1.0, c: [G3, B3, D4] },
        { f: D4, d: 1.0 },
        { f: G4, d: 1.0, c: [D3, Fs3, A3, C4] },
        { f: Fs4, d: 2.0, c: [D3, Fs3, A3] },

        // Phrase 2: Happy Birthday to you
        { f: D4, d: 0.75 },
        { f: D4, d: 0.25 },
        { f: E4, d: 1.0, c: [D3, Fs3, C4] },
        { f: D4, d: 1.0 },
        { f: A4, d: 1.0, c: [G3, B3, D4] },
        { f: G4, d: 2.0, c: [G3, B3, D4] },

        // Phrase 3: Happy Birthday dear ...
        { f: D4, d: 0.75 },
        { f: D4, d: 0.25 },
        { f: D5, d: 1.0, c: [G3, B3, D4, Fs4] },
        { f: B4, d: 1.0 },
        { f: G4, d: 1.0, c: [C4, E4, G4] },
        { f: Fs4, d: 1.0 },
        { f: E4, d: 2.0, c: [C4, E4, G4] },

        // Phrase 4: Happy Birthday to you!
        { f: C5, d: 0.75 },
        { f: C5, d: 0.25 },
        { f: B4, d: 1.0, c: [G3, B3, D4] },
        { f: G4, d: 1.0 },
        { f: A4, d: 1.0, c: [D3, Fs3, A3, C4] },
        { f: G4, d: 2.4, c: [G3, B3, D4, G4] },

        // Shimmering Bell Flourish Outro
        { f: B4, d: 0.4 },
        { f: D5, d: 0.4 },
        { f: G5, d: 0.4 },
        { f: B5, d: 2.2, c: [G3, D4, G4, B4, D5] }
    ];

    const beatDuration = 0.55;
    let currentTime = cakeSynthCtx.currentTime + 0.05;

    function playChimeNote(freq, startTime, duration, vol) {
        if (!cakeSynthCtx || cakeSynthCtx.state === "closed") return;

        const osc1 = cakeSynthCtx.createOscillator();
        const gain1 = cakeSynthCtx.createGain();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(freq, startTime);

        const osc2 = cakeSynthCtx.createOscillator();
        const gain2 = cakeSynthCtx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(freq * 2, startTime);

        gain1.gain.setValueAtTime(0.001, startTime);
        gain1.gain.linearRampToValueAtTime(vol, startTime + 0.015);
        gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.6);

        gain2.gain.setValueAtTime(0.001, startTime);
        gain2.gain.linearRampToValueAtTime(vol * 0.4, startTime + 0.01);
        gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.8 + 0.3);

        osc1.connect(gain1);
        gain1.connect(cakeSynthCtx.destination);
        osc2.connect(gain2);
        gain2.connect(cakeSynthCtx.destination);

        osc1.start(startTime);
        osc2.start(startTime);
        osc1.stop(startTime + duration + 0.7);
        osc2.stop(startTime + duration + 0.4);
    }

    let noteOffset = 0;
    notes.forEach((item) => {
        const noteStart = currentTime + noteOffset;
        const noteLen = item.d * beatDuration;

        playChimeNote(item.f, noteStart, noteLen, 0.22);

        if (item.c) {
            item.c.forEach((cFreq) => {
                playChimeNote(cFreq, noteStart, noteLen * 1.2, 0.08);
            });
        }
        noteOffset += noteLen;
    });

    const loopDelayMs = (noteOffset + 1.8) * 1000;
    cakeSynthTimer = setTimeout(() => {
        if (isCakeSynthRunning) {
            playHappyBirthdaySynth();
        }
    }, loopDelayMs);
}

function stopHappyBirthdaySynth() {
    isCakeSynthRunning = false;
    if (cakeSynthTimer) {
        clearTimeout(cakeSynthTimer);
        cakeSynthTimer = null;
    }
}

function handleBlowButtonClick() {
    const candles = document.querySelectorAll(".cake-candle");
    let isCurrentlyBlown = false;
    candles.forEach((c) => {
        if (c.classList.contains("blown-out")) {
            isCurrentlyBlown = true;
        }
    });

    if (!isCurrentlyBlown) {
        toggleCandles();
    } else {
        triggerCelebrationBurst();
        playCakeBirthdayMusic();
    }
}

function toggleCandles() {
    const candles = document.querySelectorAll(".cake-candle");
    const toast = document.querySelector(".wish-toast");
    const blowBtn = document.querySelector(".btn-blow-candles");

    let isCurrentlyBlown = false;
    candles.forEach((c) => {
        if (c.classList.contains("blown-out")) {
            isCurrentlyBlown = true;
        }
    });

    if (isCurrentlyBlown) {
        candles.forEach((c) => c.classList.remove("blown-out"));
        if (toast) toast.classList.remove("show");
        if (blowBtn) blowBtn.innerHTML = "🎂 Blow Candles / Make a Wish";
        pauseCakeBirthdayMusic();
    } else {
        candles.forEach((c) => c.classList.add("blown-out"));
        if (toast) toast.classList.add("show");
        if (blowBtn) blowBtn.innerHTML = "🕯️ Relight Candles";
        triggerCelebrationBurst();
        playCakeBirthdayMusic();
    }
}

function triggerCelebrationBurst() {
    // 1. Animate side party poppers blasting
    const poppers = document.querySelectorAll(".cake-side-popper");
    poppers.forEach((popper) => {
        popper.classList.remove("popper-blasting");
        void popper.offsetWidth; // force DOM reflow
        popper.classList.add("popper-blasting");
    });

    // 2. Animate BLOW button pop
    const blowPill = document.querySelector(".cake-blow-pill-btn");
    if (blowPill) {
        blowPill.classList.remove("blasting");
        void blowPill.offsetWidth;
        blowPill.classList.add("blasting");
    }

    // 3. Generate sparkling stars and cute popper explosion particles
    const container = document.getElementById("bdayParticles") || document.querySelector(".cake-centerpiece");
    if (!container) return;

    const stars = ["✨", "⭐", "🌟", "💫", "✦", "✧", "✨", "⭐"];
    const cuteEmojis = ["🎉", "🎊", "💖", "🎀", "🌸", "✨", "🌟"];
    const colors = ["#ff4081", "#ffd700", "#00e5ff", "#b388ff", "#ff9100", "#76ff03", "#ff1744", "#ff80ab"];

    const rect = container.getBoundingClientRect();
    const width = rect.width || 380;

    // A) Left Popper blast (shoots up and right)
    for (let i = 0; i < 16; i++) {
        spawnParticle(container, {
            originX: 10,
            originY: 200,
            dx: 50 + Math.random() * 200,
            dy: -90 - Math.random() * 240,
            rot: 180 + Math.random() * 540,
            type: i % 3 === 0 ? "star" : (i % 3 === 1 ? "emoji" : "confetti"),
            stars, cuteEmojis, colors
        });
    }

    // B) Right Popper blast (shoots up and left)
    for (let i = 0; i < 16; i++) {
        spawnParticle(container, {
            originX: width - 20,
            originY: 200,
            dx: -50 - Math.random() * 200,
            dy: -90 - Math.random() * 240,
            rot: -180 - Math.random() * 540,
            type: i % 3 === 0 ? "star" : (i % 3 === 1 ? "emoji" : "confetti"),
            stars, cuteEmojis, colors
        });
    }

    // C) Center BLOW Button sparkle blast (360 radial star explosion)
    for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + (Math.random() * 0.4 - 0.2);
        const dist = 90 + Math.random() * 170;
        spawnParticle(container, {
            originX: width / 2,
            originY: 175,
            dx: Math.cos(angle) * dist,
            dy: Math.sin(angle) * dist - 25,
            rot: (Math.random() - 0.5) * 720,
            type: i % 2 === 0 ? "star" : (i % 4 === 1 ? "emoji" : "confetti"),
            stars, cuteEmojis, colors
        });
    }
}

function spawnParticle(container, opts) {
    const el = document.createElement("div");
    el.className = "burst-particle";
    el.style.left = opts.originX + "px";
    el.style.top = opts.originY + "px";
    el.style.setProperty("--dx", opts.dx + "px");
    el.style.setProperty("--dy", opts.dy + "px");
    el.style.setProperty("--rot", opts.rot + "deg");

    if (opts.type === "star") {
        el.classList.add("burst-star");
        el.textContent = opts.stars[Math.floor(Math.random() * opts.stars.length)];
        el.style.setProperty("--size", (18 + Math.random() * 16) + "px");
    } else if (opts.type === "emoji") {
        el.classList.add("burst-emoji");
        el.textContent = opts.cuteEmojis[Math.floor(Math.random() * opts.cuteEmojis.length)];
        el.style.setProperty("--size", (16 + Math.random() * 14) + "px");
    } else {
        el.classList.add("burst-confetti");
        el.style.setProperty("--color", opts.colors[Math.floor(Math.random() * opts.colors.length)]);
        el.style.setProperty("--cw", (8 + Math.random() * 8) + "px");
        el.style.setProperty("--ch", (10 + Math.random() * 10) + "px");
        el.style.setProperty("--radius", Math.random() > 0.5 ? "50%" : "2px");
    }

    container.appendChild(el);
    setTimeout(() => {
        el.remove();
    }, 1850);
}

function resetCandles() {
    const candles = document.querySelectorAll(".cake-candle");
    const toast = document.querySelector(".wish-toast");
    const blowBtn = document.querySelector(".btn-blow-candles");
    candles.forEach((c) => c.classList.remove("blown-out"));
    if (toast) toast.classList.remove("show");
    if (blowBtn) blowBtn.innerHTML = "🎂 Blow Candles / Make a Wish";
    if (typeof pauseCakeBirthdayMusic === "function") pauseCakeBirthdayMusic();
}


/* =========================================================
   OUR LITTLE WORLD
   ========================================================= */

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const answerMessage =
    document.getElementById("answerMessage");

if (yesButton) {
    yesButton.addEventListener("click", function () {
        handleYes();
    });
}

if (noButton) {
    noButton.addEventListener("click", function () {
        handleNo();
    });
}

/* =========================================================
   HOW DARE YOU PAGE – GO BACK BUTTON
   ========================================================= */

const dareBackButton =
    document.getElementById("goBackButton");

if (dareBackButton) {
    dareBackButton.addEventListener("click", handleGoBack);
}

// Make functions accessible to inline onclick
window.handleYes = handleYes;
window.handleNo = handleNo;
window.handleGoBack = handleGoBack;
window.handleBirthdayBack = handleBirthdayBack;
window.toggleCandles = toggleCandles;
window.triggerCelebrationBurst = triggerCelebrationBurst;


/* =========================================================
   GIFT BOXES PAGE
   ========================================================= */

const giftData = [
    {
        icon: "🎀",
        title: "A Little Love Note 💕",
        msg: "Behen ki pakodi ~ you are literally one of the most annoying, most loveable, most chaotic people I know — and I wouldn't trade that for anything. Happy birthday, you absolute menace. May your day be as sweet as you are (which is very, very sweet). 💖✨"
    },
    {
        icon: "✨",
        title: "A Starry Wish 🌟",
        msg: "Wishing you a year full of magic, laughter, and all the good things you deserve. May every dream you chase come true, and may you always find joy in the little things. You're a whole vibe, behen 🌸💫 Stay sparkling always!"
    },
    {
        icon: "💜",
        title: "The Best Gift 🌸",
        msg: "The best gift I can give you is this: I'll always be here for you — through every mood, every drama, every 3am moment. You're not just my behen ki pakodi, you're genuinely one of the best people I know. Happy birthday, my fav chaos gremlin! 🎉💖🎀"
    }
];

function triggerGiftCelebrationBurst(anchorEl) {
    const rect = anchorEl ? anchorEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 3;

    const symbols = ["✨", "💖", "🌸", "⭐", "🎀", "✦", "🎉", "💫"];
    const colors = ["#e11d48", "#ffd700", "#f43f5e", "#fbbf24", "#fda4af", "#a855f7"];

    for (let i = 0; i < 24; i++) {
        const particle = document.createElement("div");
        particle.className = "gift-burst-particle";
        particle.style.position = "fixed";
        particle.style.left = `${originX}px`;
        particle.style.top = `${originY}px`;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "1000020";
        particle.style.fontSize = `${16 + Math.random() * 14}px`;
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.4;
        const dist = 60 + Math.random() * 130;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 30;

        particle.style.transition = "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease";
        particle.style.transform = "translate(0, 0) scale(0.5)";
        particle.style.opacity = "1";
        document.body.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transform = `translate(${dx}px, ${dy}px) scale(1.1) rotate(${(Math.random() - 0.5) * 90}deg)`;
            particle.style.opacity = "0";
        });

        setTimeout(() => {
            particle.remove();
        }, 900);
    }
}

function openGiftBox(num) {
    const card = document.getElementById("giftCard" + num);
    if (card) {
        card.classList.add("opened");
    }

    const modal = document.getElementById("giftModal");
    const gift1Card = document.getElementById("giftModalGift1");
    const gift2Card = document.getElementById("giftModalGift2");
    const gift3Card = document.getElementById("giftModalGift3");
    const genericCard = document.getElementById("giftModalGeneric");

    if (num === 1) {
        // Show the special Gift 1 polaroid card
        if (gift1Card) gift1Card.style.display = "block";
        if (gift2Card) gift2Card.style.display = "none";
        if (gift3Card) gift3Card.style.display = "none";
        if (genericCard) genericCard.style.display = "none";
    } else if (num === 2) {
        // Show the special Gift 2 aesthetic music template card!
        if (gift1Card) gift1Card.style.display = "none";
        if (gift2Card) gift2Card.style.display = "block";
        if (gift3Card) gift3Card.style.display = "none";
        if (genericCard) genericCard.style.display = "none";
        initGift2MusicPlayer();
    } else if (num === 3) {
        // Show the special Gift 3 21 Wishes Scratch-Off Deck!
        if (gift1Card) gift1Card.style.display = "none";
        if (gift2Card) gift2Card.style.display = "none";
        if (gift3Card) gift3Card.style.display = "block";
        if (genericCard) genericCard.style.display = "none";
        initGift3ScratchDeck();
    } else {
        // Show generic fallback card
        if (gift1Card) gift1Card.style.display = "none";
        if (gift2Card) gift2Card.style.display = "none";
        if (gift3Card) gift3Card.style.display = "none";
        if (genericCard) genericCard.style.display = "block";
        const data = giftData[num - 1] || giftData[0];
        document.getElementById("modalIcon").textContent = data.icon;
        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalMsg").textContent = data.msg;
    }

    if (modal) {
        modal.classList.add("show");
        try {
            if (window.history && window.history.pushState) {
                window.history.pushState({ pageId: "giftBoxesPage", giftModalOpen: true }, "", "#giftBoxesPage");
            }
        } catch (e) {}
    }

    // Trigger sweet celebration burst around the opened gift card
    triggerGiftCelebrationBurst(card);
}

function closeGiftModal(fromPopState = false) {
    const modal = document.getElementById("giftModal");
    if (modal) {
        modal.classList.remove("show");
    }
    const gift1Card = document.getElementById("giftModalGift1");
    const gift2Card = document.getElementById("giftModalGift2");
    const gift3Card = document.getElementById("giftModalGift3");
    const genericCard = document.getElementById("giftModalGeneric");
    if (gift1Card) gift1Card.style.display = "none";
    if (gift2Card) gift2Card.style.display = "none";
    if (gift3Card) gift3Card.style.display = "none";
    if (genericCard) genericCard.style.display = "none";

    // Pause Gift 2 music when modal is closed
    pauseGift2Music();

    // If modal was closed via UI action and history was pushed for it, pop it back cleanly
    if (!fromPopState && window.history && window.history.state && window.history.state.giftModalOpen) {
        window.history.back();
    }
}

/* =========================================================
   GIFT 2: AESTHETIC MUSIC TEMPLATE & PLAYER LOGIC
   ========================================================= */

/* =========================================================
   GIFT 2: AESTHETIC POLAROID COLLAGE & SONG TEMPLATE
   ========================================================= */

const GIFT2_TUNE_DURATION = 24;

const gift2Tracks = [
    {
        photo: "assets/gift2_photos/collage_color.jpg",
        title: "Memories Collage",
        caption: "your sweet moments ♡"
    },
    {
        photo: "assets/gift2_photos/photo1_retouched.jpg",
        title: "Golden Hour Blossom",
        caption: "soft sunlight & bougainvillea 🌸"
    },
    {
        photo: "assets/gift2_photos/photo2_aesthetic.jpg",
        title: "Traditional Elegance",
        caption: "silver jhumka & saree ✨"
    },
    {
        photo: "assets/gift2_photos/photo3_aesthetic.jpg",
        title: "Sunshine Smile",
        caption: "brightest sweet smile 💛"
    },
    {
        photo: "assets/gift2_photos/photo4_aesthetic.jpg",
        title: "Midnight Glamour",
        caption: "evening saree & timeless charm 🌙"
    },
    {
        photo: "assets/gift2_photos/photo5_retouched.jpg",
        title: "Monuments & Memories",
        caption: "Victoria Memorial moments 🏛️"
    },
    {
        photo: "assets/spidey_ironman.png",
        title: "Spidey & Iron Man ୨୧",
        caption: "partners in crime • so cute ♡"
    },
    {
        photo: "assets/ironman_peeking.png",
        title: "Iron Man Peeking ୨୧",
        caption: "Tony Stark peeking in to wish you ♡"
    }
];

let gift2CurrentIndex = 0;
let gift2Audio = null;
let isGift2Playing = false;
let gift2SimulatedTimer = null;
let gift2CurrentSeconds = 0;

function initGift2MusicPlayer() {
    if (!gift2Audio) {
        gift2Audio = new Audio();
        gift2Audio.src = "assets/birthday_music.wav";
        gift2Audio.loop = true;
        gift2Audio.volume = 0.85;

        gift2Audio.addEventListener("timeupdate", updateGift2Progress);
        gift2Audio.addEventListener("loadedmetadata", updateGift2Duration);
        gift2Audio.addEventListener("ended", () => {
            if (!gift2Audio.loop) setGift2PlayingState(false);
        });

        gift2Audio.addEventListener("error", () => {
            if (!gift2Audio.src.includes("public/")) {
                gift2Audio.src = "public/birthday_music.wav";
            }
        });
    }

    renderGift2TrackInfo();
}

function renderGift2TrackInfo() {
    const track = gift2Tracks[gift2CurrentIndex];
    if (!track) return;

    const imgEl = document.getElementById("gift2MainPhoto");
    const chinTag = document.getElementById("gift2ChinTag");
    const numEl = document.getElementById("gift2CurrentTrackNum");
    const songTitle = document.getElementById("gift2SongTitle");

    // Fade out photo slightly and swap source with soft pop
    if (imgEl) {
        imgEl.style.opacity = "0.5";
        imgEl.style.transform = "scale(0.98)";
        setTimeout(() => {
            imgEl.src = track.photo;
            imgEl.style.opacity = "1";
            imgEl.style.transform = "scale(1)";
        }, 120);
    }

    if (chinTag) chinTag.textContent = track.caption;
    if (numEl) numEl.textContent = `${gift2CurrentIndex + 1} / ${gift2Tracks.length}`;
    if (songTitle) songTitle.textContent = `${track.title} ✨`;
}

function cycleGift2Photo() {
    // Tapping polaroid advances photo and starts music if paused
    nextGift2Track();
    if (!isGift2Playing) {
        playGift2Music();
    }
}

function jumpToGift2Track(idx) {
    if (idx >= 0 && idx < gift2Tracks.length) {
        gift2CurrentIndex = idx;
        renderGift2TrackInfo();
    }
}

function nextGift2Track() {
    gift2CurrentIndex = (gift2CurrentIndex + 1) % gift2Tracks.length;
    renderGift2TrackInfo();
}

function prevGift2Track() {
    gift2CurrentIndex = (gift2CurrentIndex - 1 + gift2Tracks.length) % gift2Tracks.length;
    renderGift2TrackInfo();
}

function toggleGift2Play() {
    if (!gift2Audio) initGift2MusicPlayer();

    if (isGift2Playing) {
        pauseGift2Music();
    } else {
        playGift2Music();
    }
}

function playGift2Music() {
    if (!gift2Audio) initGift2MusicPlayer();

    const p = gift2Audio.play();
    if (p !== undefined) {
        p.then(() => {
            setGift2PlayingState(true);
        }).catch(err => {
            console.log("Audio play error, fallback to public path:", err);
            gift2Audio.src = "public/birthday_music.wav";
            gift2Audio.play().then(() => setGift2PlayingState(true)).catch(() => {
                setGift2PlayingState(true);
                startGift2SimulatedPlayback();
            });
        });
    } else {
        setGift2PlayingState(true);
    }
}

function pauseGift2Music() {
    if (gift2Audio) gift2Audio.pause();
    stopGift2SimulatedPlayback();
    setGift2PlayingState(false);
}

function setGift2PlayingState(playing) {
    isGift2Playing = playing;

    const playBtnIcon = document.getElementById("gift2PlayBtnIcon");
    const centerIcon = document.getElementById("gift2CenterPlayIcon");
    const centerBadge = document.getElementById("gift2CenterPlayBadge");
    const microEq = document.getElementById("gift2MicroEq");
    const playBtn = document.getElementById("gift2PlayBtn");
    const templateCard = document.querySelector(".polaroid-song-template");

    if (playing) {
        if (playBtnIcon) playBtnIcon.textContent = "❚❚";
        if (centerIcon) centerIcon.textContent = "❚❚";
        if (centerBadge) centerBadge.classList.add("playing");
        if (microEq) microEq.classList.add("playing");
        if (playBtn) playBtn.classList.add("playing");
        if (templateCard) templateCard.classList.add("playing");
    } else {
        if (playBtnIcon) playBtnIcon.textContent = "▶";
        if (centerIcon) centerIcon.textContent = "▶";
        if (centerBadge) centerBadge.classList.remove("playing");
        if (microEq) microEq.classList.remove("playing");
        if (playBtn) playBtn.classList.remove("playing");
        if (templateCard) templateCard.classList.remove("playing");
    }
}

function startGift2SimulatedPlayback() {
    stopGift2SimulatedPlayback();
    gift2SimulatedTimer = setInterval(() => {
        gift2CurrentSeconds += 1;
        if (gift2CurrentSeconds > GIFT2_TUNE_DURATION) gift2CurrentSeconds = 0;
        updateGift2ProgressDisplay(gift2CurrentSeconds, GIFT2_TUNE_DURATION);
    }, 1000);
}

function stopGift2SimulatedPlayback() {
    if (gift2SimulatedTimer) {
        clearInterval(gift2SimulatedTimer);
        gift2SimulatedTimer = null;
    }
}

function updateGift2Progress() {
    if (!gift2Audio || isNaN(gift2Audio.duration) || gift2Audio.duration === 0) return;
    updateGift2ProgressDisplay(gift2Audio.currentTime, gift2Audio.duration);
}

function updateGift2Duration() {
    if (!gift2Audio || isNaN(gift2Audio.duration)) return;
    const totalTimeEl = document.getElementById("gift2TotalTime");
    if (totalTimeEl) totalTimeEl.textContent = formatGift2Time(gift2Audio.duration);
}

function updateGift2ProgressDisplay(current, duration) {
    const fillEl = document.getElementById("gift2ProgressFill");
    const currentTimeEl = document.getElementById("gift2CurrentTime");

    const pct = Math.min(100, Math.max(0, (current / duration) * 100));
    if (fillEl) fillEl.style.width = pct + "%";
    if (currentTimeEl) currentTimeEl.textContent = formatGift2Time(current);
}

function formatGift2Time(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function seekGift2Audio(e) {
    const bar = document.getElementById("gift2ProgressWrap");
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));

    if (gift2Audio && !isNaN(gift2Audio.duration) && gift2Audio.duration > 0) {
        gift2Audio.currentTime = ratio * gift2Audio.duration;
        updateGift2Progress();
    } else {
        gift2CurrentSeconds = ratio * GIFT2_TUNE_DURATION;
        updateGift2ProgressDisplay(gift2CurrentSeconds, GIFT2_TUNE_DURATION);
    }
}

function toggleGift2Like(e) {
    const btn = document.getElementById("gift2LikeBtn") || document.getElementById("gift2MinLikeBtn");
    const icon = document.getElementById("gift2LikeIcon") || document.getElementById("gift2MinLikeIcon");
    if (!btn || !icon) return;

    btn.classList.toggle("liked");
    icon.textContent = btn.classList.contains("liked") ? "♥" : "♡";

    if (btn.classList.contains("liked")) {
        triggerMinimalHeartSpark(e);
    }
}

function triggerMinimalHeartSpark(e) {
    const clientX = e ? e.clientX : window.innerWidth / 2;
    const clientY = e ? e.clientY : window.innerHeight / 2;

    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "gift2-burst-heart";
            heart.textContent = ["♥", "♡", "✨"][Math.floor(Math.random() * 3)];
            heart.style.left = (clientX + (Math.random() - 0.5) * 30) + "px";
            heart.style.top = (clientY + (Math.random() - 0.5) * 20) + "px";
            heart.style.setProperty("--dx", (Math.random() - 0.5) * 50 + "px");
            heart.style.setProperty("--dy", -40 - Math.random() * 50 + "px");
            document.body.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 1000);
        }, i * 70);
    }
}

function handleGiftsBack() {
    // Reset gift card opened states
    [1, 2, 3].forEach(n => {
        const card = document.getElementById("giftCard" + n);
        if (card) card.classList.remove("opened");
    });
    // Go back sequentially to birthday cake page
    if (window.history.length > 1) {
        window.history.back();
    } else {
        showOnlyPage("birthdayCakePage");
    }
}

/* =========================================================
   NEXT BUTTON — go to cake page with animation
   ========================================================= */

function goNextToCake() {
    [1, 2, 3].forEach(n => {
        const card = document.getElementById("giftCard" + n);
        if (card) card.classList.remove("opened");
    });
    showOnlyPage("birthdayCakePage");
    if (typeof resetCandles === "function") resetCandles();
    if (typeof resetCakeCut === "function") resetCakeCut();
}

let skipCakeAttempts = 0;

function resetCakeCut() {
    const reveal = document.getElementById("cakeCutReveal");
    const btn = document.getElementById("cutCakeBtn");
    const cakeAssembly = document.querySelector(".cute-cake-assembly");
    const bubble = document.getElementById("skipCakeBubble");
    const wannaBox = document.getElementById("wannaCutCard");
    skipCakeAttempts = 0;

    if (reveal) reveal.classList.remove("visible");
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span class="sparkle-sym">✦</span> <span class="btn-label">OF COURSE</span> <span class="sparkle-sym">✦</span>`;
    }
    if (bubble) bubble.classList.remove("show");
    if (wannaBox) wannaBox.classList.remove("hidden");
    if (cakeAssembly) cakeAssembly.classList.remove("cake-cut-anim");
    const dramaPage = document.getElementById("skipCakeDramaPage");
    if (dramaPage) dramaPage.classList.remove("active");
    if (typeof resetDramaButtons === "function") resetDramaButtons();
}

function handleSkipCake(e) {
    if (e && e.preventDefault) e.preventDefault();
    openSkipDramaPage();
}

/* =========================================================
   SKIP CAKE DRAMA CONTROLLER (Shrink/Grow Button Mechanics)
   ========================================================= */

let dramaAttempts = 0;

function openSkipDramaPage() {
    if (typeof pauseCakeBirthdayMusic === "function") {
        pauseCakeBirthdayMusic();
    }
    playCuteDramaEntranceSound();
    showOnlyPage("skipCakeDramaPage");
    resetDramaButtons();
}

function setMascotMood(mood) {
    const mascot = document.getElementById("dramaCakeMascot");
    const sadEyes = document.getElementById("mascotSadEyes");
    const happyEyes = document.getElementById("mascotHappyEyes");
    const sadMouth = document.getElementById("mascotSadMouth");
    const happyMouth = document.getElementById("mascotHappyMouth");
    const tears = document.getElementById("mascotTears");
    const fountain = document.getElementById("mascotCryingFountain");
    const flame = document.getElementById("mascotFlame");
    const cheeks = document.getElementById("mascotCheeks");

    if (!mascot) return;

    if (mood === "happy") {
        if (sadEyes) sadEyes.style.display = "none";
        if (happyEyes) happyEyes.style.display = "block";
        if (sadMouth) sadMouth.style.display = "none";
        if (happyMouth) happyMouth.style.display = "block";
        if (tears) tears.style.display = "none";
        if (fountain) fountain.style.display = "none";
        if (flame) {
            flame.classList.remove("flame-panic");
            flame.classList.add("flame-happy");
        }
        mascot.classList.remove("mascot-crying-panic", "mascot-victory");
        mascot.classList.add("mascot-happy");
        if (cheeks) cheeks.style.opacity = "1";
    } else if (mood === "crying") {
        if (sadEyes) sadEyes.style.display = "block";
        if (happyEyes) happyEyes.style.display = "none";
        if (sadMouth) sadMouth.style.display = "block";
        if (happyMouth) happyMouth.style.display = "none";
        if (tears) tears.style.display = "none";
        if (fountain) fountain.style.display = "block";
        if (flame) {
            flame.classList.remove("flame-happy");
            flame.classList.add("flame-panic");
        }
        mascot.classList.remove("mascot-happy", "mascot-crying-panic");
        mascot.classList.add("mascot-crying-panic");
        if (cheeks) cheeks.style.opacity = "0.7";
    } else if (mood === "victory") {
        if (sadEyes) sadEyes.style.display = "none";
        if (happyEyes) happyEyes.style.display = "block";
        if (sadMouth) sadMouth.style.display = "none";
        if (happyMouth) happyMouth.style.display = "block";
        if (tears) tears.style.display = "none";
        if (fountain) fountain.style.display = "none";
        if (flame) {
            flame.classList.remove("flame-panic");
            flame.classList.add("flame-happy");
        }
        mascot.classList.remove("mascot-happy", "mascot-crying-panic");
        mascot.classList.add("mascot-victory");
    } else {
        // Normal cute sad default state
        if (sadEyes) sadEyes.style.display = "block";
        if (happyEyes) happyEyes.style.display = "none";
        if (sadMouth) sadMouth.style.display = "block";
        if (happyMouth) happyMouth.style.display = "none";
        if (tears) tears.style.display = "block";
        if (fountain) fountain.style.display = "none";
        if (flame) {
            flame.classList.remove("flame-happy", "flame-panic");
        }
        mascot.classList.remove("mascot-happy", "mascot-crying-panic", "mascot-victory");
        if (cheeks) cheeks.style.opacity = "0.4";
    }
}

// =========================================================
// ADORABLE PLAYFUL SOUND SYSTEM (for "I'LL SKIP IT" & "Still Skip 😤")
// =========================================================
let cutePoutSoundIndex = 0;

function playCuteDramaEntranceSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!dramaAudioCtx || dramaAudioCtx.state === "closed") {
            dramaAudioCtx = new AudioCtx();
        }
        if (dramaAudioCtx.state === "suspended") {
            dramaAudioCtx.resume();
        }

        const ctx = dramaAudioCtx;
        const now = ctx.currentTime;

        // Cute playful dramatic chime: 3 descending sweet bell notes
        const notes = [783.99, 659.25, 523.25]; // G5, E5, C5
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + idx * 0.12);
            gain.gain.setValueAtTime(0, now + idx * 0.12);
            gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.12 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.42);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 0.44);
        });
    } catch (e) {}
}

function playCutePoutSound() {
    const variant = cutePoutSoundIndex % 4;
    cutePoutSoundIndex++;

    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!dramaAudioCtx || dramaAudioCtx.state === "closed") {
            dramaAudioCtx = new AudioCtx();
        }
        if (dramaAudioCtx.state === "suspended") {
            dramaAudioCtx.resume();
        }

        const ctx = dramaAudioCtx;
        const now = ctx.currentTime;

        if (variant === 0) {
            // 1. Cute cartoon pout / squeak ("Aww~ 🥺")
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(580, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.22);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (variant === 1) {
            // 2. Sweet cartoon boing spring ("Boing! 🙈")
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(740, now + 0.1);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.26);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.29);
        } else if (variant === 2) {
            // 3. Cute melodramatic music-box chime ("Noo 💔")
            [659.25, 830.61].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, now + idx * 0.06);
                gain.gain.setValueAtTime(0, now + idx * 0.06);
                gain.gain.linearRampToValueAtTime(0.16, now + idx * 0.06 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.38);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.06);
                osc.stop(now + idx * 0.06 + 0.4);
            });
        } else {
            // 4. Playful bubble slide pop ("Oops! 🍰")
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.exponentialRampToValueAtTime(920, now + 0.12);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.18);
        }
    } catch (e) {}
}

function playSoftAngrySound() {
    playCutePoutSound();
}

// Cartoon Web Audio Synthesizer (0 external dependencies)
let dramaAudioCtx = null;

function playDramaSound(type) {
    try {
        if (!dramaAudioCtx) {
            dramaAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (dramaAudioCtx.state === "suspended") {
            dramaAudioCtx.resume();
        }
        const ctx = dramaAudioCtx;
        const now = ctx.currentTime;

        if (type === "alarm") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(580, now);
            osc.frequency.linearRampToValueAtTime(740, now + 0.12);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.23);
        } else if (type === "boing") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.12);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.28);
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === "dodge") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.1);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.13);
        } else if (type === "cheer") {
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + idx * 0.05);
                gain.gain.setValueAtTime(0.1, now + idx * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.05);
                osc.stop(now + 0.75);
            });
        }
    } catch (e) {
        // Silent fallback if audio context is blocked
    }
}

function slamChaoticStamp() {
    // Disabled as per user request to remove chaotic overlays
}

function spawnDramaParticles(anchor) {
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const icons = ["🚨", "🍰", "😭", "💔", "🚓", "💨", "💥", "🧁", "🍓", "✨", "😱", "🛑"];

    // Spawn 10 crazy emojis in all directions
    for (let i = 0; i < 10; i++) {
        const p = document.createElement("div");
        p.textContent = icons[Math.floor(Math.random() * icons.length)];
        p.style.position = "fixed";
        p.style.left = `${cx}px`;
        p.style.top = `${cy}px`;
        p.style.fontSize = `${18 + Math.random() * 16}px`;
        p.style.pointerEvents = "none";
        p.style.zIndex = "1000030";
        p.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease";
        p.style.transform = "translate(0, 0) scale(0.6)";
        p.style.opacity = "1";
        document.body.appendChild(p);

        const dx = (Math.random() - 0.5) * 180;
        const dy = -45 - Math.random() * 95;

        requestAnimationFrame(() => {
            p.style.transform = `translate(${dx}px, ${dy}px) scale(1.3) rotate(${(Math.random() - 0.5) * 120}deg)`;
            p.style.opacity = "0";
        });
        setTimeout(() => p.remove(), 850);
    }

    // Spawn 1 cute comic reaction pop callout
    const comicPhrases = [
        "💔 BUT I'M DELICIOUS!",
        "🍰 FREE CAKE THO!",
        "🥺 MERCY PLEASE!",
        "🎂 CAKE CALORIES ARE 0!",
        "🐜 I'M SHRINKING!",
        "🚨 CALLING CAKE POLICE!",
        "😭 DON'T LEAVE ME!",
        "✨ JUST ONE SWEET BITE!"
    ];
    const callout = document.createElement("div");
    callout.className = "drama-comic-callout";
    callout.textContent = comicPhrases[Math.floor(Math.random() * comicPhrases.length)];
    callout.style.left = `${Math.max(10, Math.min(window.innerWidth - 220, cx - 80 + (Math.random() - 0.5) * 40))}px`;
    callout.style.top = `${Math.max(20, cy - 35)}px`;
    document.body.appendChild(callout);
    setTimeout(() => callout.remove(), 950);
}

function triggerDramaBackgroundGasp() {
    const page = document.getElementById("skipCakeDramaPage");
    if (!page) return;
    page.classList.remove("drama-gasp-active");
    void page.offsetWidth;
    page.classList.add("drama-gasp-active");
    setTimeout(() => {
        page.classList.remove("drama-gasp-active");
    }, 550);
}

let dramaSkipCurrentX = 0;
let dramaSkipCurrentY = 0;
let dramaSkipOriginRelX = null;
let dramaSkipOriginRelY = null;
let dramaSkipLastJumpTime = 0;
let dramaSkipProximityBound = false;
let dramaSkipSettleTimeout = null;
let dramaSkipCurrentSpotIdx = -1;
let dramaSkipRecentSpots = [];

const skipTaunts = [
    "Still Skip 😤",
    "Can't catch me! 🏃💨",
    "Too slow! 😜",
    "Whoosh! 💨",
    "Nope! 🍰✨",
    "Still trying?! 🙈",
    "Missed me! 🏃‍♀️",
    "Keep chasing! 🏃💨",
    "Universal Law: CAKE! 🍰",
    "Never gonna happen! 💨",
    "Cake first! 🎂😋",
    "Nice try though! 💅"
];

function playCartoonJumpSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!dramaAudioCtx || dramaAudioCtx.state === "closed") {
            dramaAudioCtx = new AudioCtx();
        }
        if (dramaAudioCtx.state === "suspended") {
            dramaAudioCtx.resume();
        }
        const ctx = dramaAudioCtx;
        const now = ctx.currentTime;
        const soundType = Math.floor(Math.random() * 3);

        if (soundType === 0) {
            // Spring Boing ("Boiiing! 💨")
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.1);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.26);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.31);
        } else if (soundType === 1) {
            // Slide Whistle swoop ("Whooosh! 🏃💨")
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(360, now);
            osc.frequency.exponentialRampToValueAtTime(980, now + 0.14);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.26);
        } else {
            // Squeak boop ("Oops! 🍰")
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(540, now);
            osc.frequency.exponentialRampToValueAtTime(1150, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(650, now + 0.18);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
        }
    } catch (e) {}
}

function spawnJumpDepartureEffects(cx, cy) {
    // 1. Dust puff cloud
    const cloud = document.createElement("div");
    cloud.className = "drama-dust-cloud";
    cloud.textContent = "💨";
    cloud.style.left = `${cx - 16}px`;
    cloud.style.top = `${cy - 16}px`;
    const pdx = (Math.random() - 0.5) * 44;
    cloud.style.setProperty("--pdx", `${pdx}px`);
    document.body.appendChild(cloud);
    setTimeout(() => cloud.remove(), 620);

    // 2. Expanding shockwave ring
    const ring = document.createElement("div");
    ring.className = "drama-jump-shockwave";
    ring.style.left = `${cx}px`;
    ring.style.top = `${cy}px`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 560);

    // 3. Cute tiny stars
    for (let i = 0; i < 4; i++) {
        const star = document.createElement("div");
        star.textContent = i % 2 === 0 ? "✨" : "✦";
        star.style.position = "fixed";
        star.style.left = `${cx}px`;
        star.style.top = `${cy}px`;
        star.style.fontSize = "14px";
        star.style.pointerEvents = "none";
        star.style.zIndex = "1000030";
        star.style.transition = "transform 0.5s ease-out, opacity 0.5s ease";
        star.style.transform = "translate(0, 0) scale(0.5)";
        star.style.opacity = "1";
        document.body.appendChild(star);

        const sdx = (Math.random() - 0.5) * 80;
        const sdy = (Math.random() - 0.5) * 80;
        requestAnimationFrame(() => {
            star.style.transform = `translate(${sdx}px, ${sdy}px) scale(1.1) rotate(${(Math.random() - 0.5) * 90}deg)`;
            star.style.opacity = "0";
        });
        setTimeout(() => star.remove(), 520);
    }
}

function spawnJumpLandingSparkles(btn) {
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const sparkles = ["✨", "✦", "💫"];

    for (let i = 0; i < 3; i++) {
        const sp = document.createElement("div");
        sp.className = "drama-landing-sparkle";
        sp.textContent = sparkles[i % sparkles.length];
        sp.style.left = `${cx}px`;
        sp.style.top = `${cy}px`;
        const angle = (i * 120 + Math.random() * 40) * (Math.PI / 180);
        const dist = 32 + Math.random() * 22;
        sp.style.setProperty("--sdx", `${Math.cos(angle) * dist}px`);
        sp.style.setProperty("--sdy", `${Math.sin(angle) * dist}px`);
        document.body.appendChild(sp);
        setTimeout(() => sp.remove(), 660);
    }
}

function spawnJumpCheekyTag(anchorX, anchorY) {
    const phrases = [
        "Too slow! 😜💨",
        "Whoosh! 💨",
        "Missed me! 🏃‍♀️💨",
        "Nope! 🍰✨",
        "Can't catch me! 🙈",
        "Cake is mandatory! 🎂",
        "Nice try! 😋",
        "Nuh-uh! 🙅‍♀️",
        "Eat the cake! 🍰🎉",
        "Almost! (Just kidding) 😜",
        "0% chance! 😂",
        "Try clicking CUT! 🍰✨"
    ];
    const tag = document.createElement("div");
    tag.className = "drama-comic-callout";
    tag.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    const clampX = Math.max(80, Math.min(window.innerWidth - 80, anchorX));
    const clampY = Math.max(60, anchorY - 15);
    tag.style.left = `${clampX}px`;
    tag.style.top = `${clampY}px`;
    document.body.appendChild(tag);
    setTimeout(() => tag.remove(), 880);
}

function checkOverlapWithCut(screenLeft, screenTop, w, h, cutRect) {
    const margin = 8;
    return !(
        screenLeft + w < cutRect.left - margin ||
        screenLeft > cutRect.right + margin ||
        screenTop + h < cutRect.top - margin ||
        screenTop > cutRect.bottom + margin
    );
}

function findNextJumpSpot(card, cutBtn, skipBtn, pointerX, pointerY) {
    const cardRect = card.getBoundingClientRect();
    const cutRect = cutBtn ? cutBtn.getBoundingClientRect() : {
        left: cardRect.left + 50,
        right: cardRect.right - 50,
        top: cardRect.bottom - 80,
        bottom: cardRect.bottom - 30,
        width: 200,
        height: 48
    };

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const btnW = skipBtn.offsetWidth || 120;
    const btnH = skipBtn.offsetHeight || 42;

    const pad = 12;
    const minX = Math.max(pad, cardRect.left + pad);
    const maxX = Math.min(winW - btnW - pad, cardRect.right - btnW - pad);
    const minY = Math.max(pad + 8, cardRect.top + 20);
    const maxY = Math.min(winH - btnH - pad, cardRect.bottom - btnH - 18);

    // Current visual position of the skip button on screen
    const currRect = skipBtn.getBoundingClientRect();
    const currScreenX = currRect.left;
    const currScreenY = currRect.top;

    // 13 rich, diverse destinations covering all card zones: TOP, LEFT, RIGHT, BOTTOM, and center
    const destinations = [
        // Top Zone
        { name: "top-left",      zone: "top-left",     x: cardRect.left + 22,                        y: cardRect.top + 28 },
        { name: "top-right",     zone: "top-right",    x: cardRect.right - btnW - 22,                y: cardRect.top + 28 },
        { name: "top-center",    zone: "top",          x: cardRect.left + (cardRect.width - btnW) / 2, y: cardRect.top + 22 },

        // Left Zone (Upper, Mid, Flank)
        { name: "upper-left",    zone: "left",         x: cardRect.left + 18,                        y: cardRect.top + cardRect.height * 0.22 },
        { name: "mid-left",      zone: "left",         x: cardRect.left + 18,                        y: cardRect.top + cardRect.height * 0.42 },
        { name: "flank-left",    zone: "left",         x: cardRect.left + 18,                        y: cutRect.top },

        // Right Zone (Upper, Mid, Flank)
        { name: "upper-right",   zone: "right",        x: cardRect.right - btnW - 18,                y: cardRect.top + cardRect.height * 0.22 },
        { name: "mid-right",     zone: "right",        x: cardRect.right - btnW - 18,                y: cardRect.top + cardRect.height * 0.42 },
        { name: "flank-right",   zone: "right",        x: cardRect.right - btnW - 18,                y: cutRect.top },

        // Above Cut button
        { name: "above-cut",     zone: "center",       x: cutRect.left + (cutRect.width - btnW) / 2, y: cutRect.top - btnH - 26 },

        // Bottom Zone (Left, Right, Center)
        { name: "bottom-left",   zone: "bottom-left",  x: cardRect.left + 22,                        y: cardRect.bottom - btnH - 22 },
        { name: "bottom-right",  zone: "bottom-right", x: cardRect.right - btnW - 22,                y: cardRect.bottom - btnH - 22 },
        { name: "bottom-center", zone: "bottom",       x: cardRect.left + (cardRect.width - btnW) / 2, y: cardRect.bottom - btnH - 18 }
    ];

    // Clamp every destination to guaranteed visible screen & card boundaries
    const validSpots = destinations.map((d, index) => {
        // Subtle organic jitter (+-8px) so identical spots never feel mechanical
        const jitterX = (Math.random() - 0.5) * 16;
        const jitterY = (Math.random() - 0.5) * 12;
        let x = Math.max(minX, Math.min(maxX, d.x + jitterX));
        let y = Math.max(minY, Math.min(maxY, d.y + jitterY));

        // If it touches the Cut button, shift it safely away from it
        if (checkOverlapWithCut(x, y, btnW, btnH, cutRect)) {
            if (y < cutRect.top + cutRect.height / 2) {
                y = Math.max(minY, cutRect.top - btnH - 16);
            } else {
                y = Math.min(maxY, cutRect.bottom + 16);
            }
        }

        const distFromCurrent = Math.hypot(x - currScreenX, y - currScreenY);
        const distFromPointer = Math.hypot(x + btnW / 2 - pointerX, y + btnH / 2 - pointerY);

        return { index, name: d.name, zone: d.zone, x, y, distFromCurrent, distFromPointer };
    });

    // Anti-repeat: Exclude the last 5 visited spots so it NEVER repeats recently used zones
    let candidates = validSpots.filter(s => !dramaSkipRecentSpots.includes(s.index));

    // Filter to spots that are comfortably far from pointer (>= 95px) and from current spot (>= 85px)
    let farSpots = candidates.filter(s => s.distFromPointer >= 95 && s.distFromCurrent >= 85);
    if (farSpots.length === 0) {
        farSpots = candidates.filter(s => s.distFromCurrent >= 70);
    }
    if (farSpots.length === 0) {
        farSpots = validSpots.filter(s => s.index !== dramaSkipCurrentSpotIdx);
    }

    // Sort by distFromPointer descending (furthest candidates first)
    farSpots.sort((a, b) => b.distFromPointer - a.distFromPointer);

    // Pick randomly among top 3 furthest spots to prevent deterministic back-and-forth ping-pong
    const topChoices = farSpots.slice(0, Math.min(3, farSpots.length));
    const chosen = topChoices[Math.floor(Math.random() * topChoices.length)];

    dramaSkipRecentSpots.push(chosen.index);
    if (dramaSkipRecentSpots.length > 5) {
        dramaSkipRecentSpots.shift();
    }
    dramaSkipCurrentSpotIdx = chosen.index;

    const targetRelX = chosen.x - cardRect.left;
    const targetRelY = chosen.y - cardRect.top;

    return { targetRelX, targetRelY, bestTargetScreenX: chosen.x, bestTargetScreenY: chosen.y };
}

function handleDramaSkipAttempt(e) {
    if (e) {
        if (typeof e.preventDefault === "function") e.preventDefault();
        if (typeof e.stopPropagation === "function") e.stopPropagation();
    }

    const skipBtn = document.getElementById("dramaSkipBtn");
    const card = document.querySelector(".drama-paper-card");
    const cutBtn = document.getElementById("dramaCutBtn");
    if (!skipBtn || !card) return;

    // Response cooldown (90ms)
    const now = Date.now();
    if (now - dramaSkipLastJumpTime < 90) return;
    dramaSkipLastJumpTime = now;

    if (typeof skipBtn.blur === "function") skipBtn.blur();

    dramaAttempts++;

    const cardRect = card.getBoundingClientRect();
    const btnRect = skipBtn.getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;

    // Ensure base un-transformed origin relative to card is known and stable
    if (dramaSkipOriginRelX === null || isNaN(dramaSkipOriginRelX)) {
        dramaSkipOriginRelX = (btnRect.left - dramaSkipCurrentX) - cardRect.left;
        dramaSkipOriginRelY = (btnRect.top - dramaSkipCurrentY) - cardRect.top;
    }

    let pointerX = cx;
    let pointerY = cy;
    if (e && e.touches && e.touches.length > 0) {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
    } else if (e && e.clientX !== undefined) {
        pointerX = e.clientX;
        pointerY = e.clientY;
    }

    // 1. Play cartoon jump sound & departure puff
    playCartoonJumpSound();
    spawnJumpDepartureEffects(cx, cy);
    spawnJumpCheekyTag(cx, cy);

    // 2. Cut button attention pulse
    if (cutBtn) {
        cutBtn.classList.remove("drama-cut-pulse");
        void cutBtn.offsetWidth;
        cutBtn.classList.add("drama-cut-pulse");
    }

    setMascotMood("crying");

    // 3. Find next spot ("from here to there")
    const btnW = skipBtn.offsetWidth || 120;
    const btnH = skipBtn.offsetHeight || 42;
    const { targetRelX, targetRelY, bestTargetScreenX } = findNextJumpSpot(card, cutBtn, skipBtn, pointerX, pointerY);

    const fromTx = dramaSkipCurrentX;
    const fromTy = dramaSkipCurrentY;
    const nextTx = Math.round(targetRelX - dramaSkipOriginRelX);
    const nextTy = Math.round(targetRelY - dramaSkipOriginRelY);

    const deltaX = nextTx - fromTx;
    const hopRot = deltaX > 15 ? Math.min(10, Math.max(5, deltaX * 0.04)) : deltaX < -15 ? Math.max(-10, Math.min(-5, deltaX * 0.04)) : (Math.random() - 0.5) * 6;

    dramaSkipCurrentX = nextTx;
    dramaSkipCurrentY = nextTy;

    // 4. Set animation properties for the cartoon jump arc (parabolic leap with high apex)
    const midX = Math.round((fromTx + nextTx) / 2);
    const midY = Math.round(Math.min(fromTy, nextTy) - 34);

    skipBtn.style.opacity = "1";
    skipBtn.style.visibility = "visible";
    skipBtn.style.display = "inline-flex";
    skipBtn.style.zIndex = "1000";
    skipBtn.style.setProperty("--hop-from-x", `${fromTx}px`);
    skipBtn.style.setProperty("--hop-from-y", `${fromTy}px`);
    skipBtn.style.setProperty("--hop-mid-x", `${midX}px`);
    skipBtn.style.setProperty("--hop-mid-y", `${midY}px`);
    skipBtn.style.setProperty("--hop-to-x", `${nextTx}px`);
    skipBtn.style.setProperty("--hop-to-y", `${nextTy}px`);
    skipBtn.style.setProperty("--hop-rot", `${hopRot}deg`);

    // Trigger bouncy jump hop animation
    skipBtn.classList.remove("is-hopping");
    void skipBtn.offsetWidth;
    skipBtn.classList.add("is-hopping");

    if (dramaSkipSettleTimeout) {
        clearTimeout(dramaSkipSettleTimeout);
        dramaSkipSettleTimeout = null;
    }

    // 5. Land cleanly and spawn sparkles
    dramaSkipSettleTimeout = setTimeout(() => {
        skipBtn.classList.remove("is-hopping");
        skipBtn.style.transform = `translate(${nextTx}px, ${nextTy}px) scale(1) rotate(0deg)`;
        spawnJumpLandingSparkles(skipBtn);
    }, 380);

    applyDramaButtonSizes();
}

function handleDramaSkipHover(e) {
    handleDramaSkipAttempt(e);
}

function attachSkipButtonJumpEvents() {
    const skipBtn = document.getElementById("dramaSkipBtn");
    const card = document.querySelector(".drama-paper-card");
    if (!skipBtn || !card) return;

    ["mouseenter", "mouseover", "pointerenter", "pointerdown", "mousedown", "click", "focus"].forEach((evt) => {
        skipBtn.addEventListener(evt, handleDramaSkipAttempt);
    });

    skipBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDramaSkipAttempt(e);
    }, { passive: false });

    if (dramaSkipProximityBound) return;
    dramaSkipProximityBound = true;

    // Proximity trigger across card: jump when mouse gets within 42px of button center (just reaching it!)
    card.addEventListener("mousemove", (e) => {
        const dramaPage = document.getElementById("skipCakeDramaPage");
        if (!dramaPage || !dramaPage.classList.contains("active")) return;
        const rect = skipBtn.getBoundingClientRect();
        const btnCx = rect.left + rect.width / 2;
        const btnCy = rect.top + rect.height / 2;
        const dist = Math.hypot(btnCx - e.clientX, btnCy - e.clientY);
        if (dist < 42) {
            handleDramaSkipAttempt(e);
        }
    });

    // Touch proximity on card
    card.addEventListener("touchmove", (e) => {
        const dramaPage = document.getElementById("skipCakeDramaPage");
        if (!dramaPage || !dramaPage.classList.contains("active")) return;
        if (!e.touches || e.touches.length === 0) return;
        const rect = skipBtn.getBoundingClientRect();
        const btnCx = rect.left + rect.width / 2;
        const btnCy = rect.top + rect.height / 2;
        const dist = Math.hypot(btnCx - e.touches[0].clientX, btnCy - e.touches[0].clientY);
        if (dist < 46) {
            handleDramaSkipAttempt(e);
        }
    }, { passive: true });
}

function applyDramaButtonSizes() {
    const cutBtn = document.getElementById("dramaCutBtn");
    const skipBtn = document.getElementById("dramaSkipBtn");
    const cutText = document.getElementById("dramaCutBtnText");
    const skipText = document.getElementById("dramaSkipBtnText");
    const statusText = document.getElementById("dramaStatusText");
    const cakeSpeech = document.getElementById("dramaCakeSpeech");
    const sadnessVal = document.getElementById("dramaSadnessVal");
    const meterFill = document.getElementById("dramaMeterFill");
    const urgentPointer = document.getElementById("dramaUrgentPointer");
    const puddle = document.getElementById("cakeTearPuddle");
    const mascot = document.getElementById("dramaCakeMascot");

    const cutTexts = [
        "FINE, I'LL CUT IT! 🍰✨",
        "✦ CUT THE CAKE! 🍰 ✦",
        "✦ JUST ONE SWEET BITE! 🎂 ✦",
        "✦ RESISTANCE IS IMPOSSIBLE! 💖 ✦",
        "✦ CAKE IS NON-NEGOTIABLE! 🎉 ✦",
        "✦ CLICK HERE TO CUT THE CAKE! 🎂🎉 ✦"
    ];

    const speechQuotes = [
        "Wait... you really wanna SKIP ME?! But I'm sweet and delicious! 🥺💔",
        "I have sprinkles and chocolate inside! Don't abandon me! 😭🍰",
        "DEFCON 1! Look at how huge the Cut button is! Surrender! 🎂😋",
        "Universal Birthday Police have surrounded the perimeter! 🚨🚓",
        "Haha, you can't touch that button! Eat me instead! 🍰🎉",
        "0 escape routes left! The birthday universe has spoken! 🍰🎉"
    ];

    const statusQuotes = [
        "✨ Notice: Every time you try to skip, the button leaps away & Cut button gets sweeter! ✨",
        "🚨 CODE RED: The cake is crying! Calories are 0 on birthdays! 🍰😳",
        "🚨 EMERGENCY: The skip button is darting everywhere! Catch it if you can! 🏃💨",
        "🚨 RUNAWAY BUTTON: It keeps leaping all over the screen! 🏃💨",
        "🚨 LEVEL 5 CHAOS: The cake is flooding the floor with tears! 💦",
        "🚨 0 OPTIONS LEFT! Surrender to the sweetness now! 🎂✨"
    ];

    const idx = Math.min(dramaAttempts, cutTexts.length - 1);
    const cutScale = (1 + dramaAttempts * 0.28).toFixed(2);

    if (cutBtn) {
        cutBtn.style.transform = `scale(${cutScale})`;
        cutBtn.style.setProperty("--cutScale", cutScale);
        cutBtn.style.zIndex = 15 + dramaAttempts;
    }

    // Button stays 100% visible, fully opaque, full size, in front of everything (NEVER hidden!)
    if (skipBtn) {
        skipBtn.style.opacity = "1";
        skipBtn.style.visibility = "visible";
        skipBtn.style.display = "inline-flex";
        skipBtn.style.zIndex = "1000";
        skipBtn.style.setProperty("--s", "1");
        skipBtn.style.setProperty("--tx", `${dramaSkipCurrentX}px`);
        skipBtn.style.setProperty("--ty", `${dramaSkipCurrentY}px`);
    }

    if (cutText) cutText.textContent = cutTexts[idx];
    if (skipText) skipText.textContent = skipTaunts[Math.min(dramaAttempts, skipTaunts.length - 1)];
    if (statusText) statusText.textContent = statusQuotes[idx];
    if (cakeSpeech) cakeSpeech.textContent = `"${speechQuotes[idx]}"`;

    if (urgentPointer && dramaAttempts >= 1) {
        urgentPointer.classList.add("active");
    }

    if (puddle) {
        puddle.style.opacity = Math.min(0.85, 0.25 + dramaAttempts * 0.16);
        puddle.setAttribute("rx", `${50 + dramaAttempts * 9}`);
        puddle.setAttribute("ry", `${10 + dramaAttempts * 2.5}`);
    }

    if (mascot && dramaAttempts >= 2) {
        mascot.classList.add("mascot-hyper-meltdown");
    }

    if (sadnessVal) {
        sadnessVal.textContent = `${Math.min(100 + dramaAttempts * 120, 9999)}% 🥺💔🔥`;
        sadnessVal.classList.add("pulse");
    }

    if (meterFill) {
        const pct = Math.min(100, 40 + dramaAttempts * 16);
        meterFill.style.width = `${pct}%`;
    }
}

function resetDramaButtons() {
    dramaAttempts = 0;
    dramaSkipCurrentX = 0;
    dramaSkipCurrentY = 0;
    dramaSkipOriginRelX = null;
    dramaSkipOriginRelY = null;
    dramaSkipCurrentSpotIdx = -1;
    dramaSkipRecentSpots = [];
    if (dramaSkipSettleTimeout) {
        clearTimeout(dramaSkipSettleTimeout);
        dramaSkipSettleTimeout = null;
    }

    const cutBtn = document.getElementById("dramaCutBtn");
    const skipBtn = document.getElementById("dramaSkipBtn");
    const cutText = document.getElementById("dramaCutBtnText");
    const skipText = document.getElementById("dramaSkipBtnText");
    const statusText = document.getElementById("dramaStatusText");
    const cakeSpeech = document.getElementById("dramaCakeSpeech");
    const sadnessVal = document.getElementById("dramaSadnessVal");
    const meterFill = document.getElementById("dramaMeterFill");
    const urgentPointer = document.getElementById("dramaUrgentPointer");
    const puddle = document.getElementById("cakeTearPuddle");
    const mascot = document.getElementById("dramaCakeMascot");
    const page = document.getElementById("skipCakeDramaPage");
    const stampsLayer = document.getElementById("dramaChaosStampsLayer");
    const card = document.querySelector(".drama-paper-card");

    if (page) {
        page.classList.remove("chaos-mode-active", "drama-gasp-active");
    }
    if (stampsLayer) {
        stampsLayer.innerHTML = "";
    }
    if (urgentPointer) {
        urgentPointer.classList.remove("active");
    }
    if (puddle) {
        puddle.style.opacity = "0";
    }
    if (mascot) {
        mascot.classList.remove("mascot-hyper-meltdown");
    }

    setMascotMood("normal");

    if (cutBtn) {
        cutBtn.style.transform = "scale(1)";
        cutBtn.style.setProperty("--cutScale", "1");
        cutBtn.style.zIndex = 10;
    }
    if (skipBtn) {
        skipBtn.style.transform = "translate(0px, 0px) scale(1) rotate(0deg)";
        skipBtn.style.opacity = "1";
        skipBtn.style.visibility = "visible";
        skipBtn.style.display = "inline-flex";
        skipBtn.style.zIndex = "1000";
        skipBtn.style.setProperty("--s", "1");
        skipBtn.style.setProperty("--tx", "0px");
        skipBtn.style.setProperty("--ty", "0px");
        skipBtn.classList.remove("jump-takeoff", "jump-landing", "drama-btn-shake", "twitch");
    }

    if (cutText) cutText.textContent = "FINE, I'LL CUT IT! 🍰✨";
    if (skipText) skipText.textContent = "Still Skip 😤";
    if (statusText) statusText.textContent = "✨ Notice: Every time you try to skip, the Cut button gets bigger & sweeter! ✨";
    if (cakeSpeech) cakeSpeech.textContent = `"Wait... you really wanna SKIP ME?! But I'm sweet and delicious! 🥺💔"`;
    if (sadnessVal) {
        sadnessVal.textContent = "100% 🥺💔";
        sadnessVal.classList.remove("pulse");
    }
    if (meterFill) meterFill.style.width = "40%";

    // Cache un-transformed origin relative to card once layout is ready
    requestAnimationFrame(() => {
        if (skipBtn && card) {
            const cardR = card.getBoundingClientRect();
            const btnR = skipBtn.getBoundingClientRect();
            dramaSkipOriginRelX = btnR.left - cardR.left;
            dramaSkipOriginRelY = btnR.top - cardR.top;
        }
    });

    attachSkipButtonJumpEvents();
}

function spawnDramaCelebrationBurst() {
    const card = document.querySelector(".drama-paper-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const shapes = ["🍰", "✨", "💖", "🎉", "🍓", "🎂", "🎀", "✦", "🥳"];

    for (let i = 0; i < 28; i++) {
        const item = document.createElement("div");
        item.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        item.style.position = "fixed";
        item.style.left = `${cx}px`;
        item.style.top = `${cy}px`;
        item.style.fontSize = `${18 + Math.random() * 16}px`;
        item.style.pointerEvents = "none";
        item.style.zIndex = "1000040";
        item.style.transition = "transform 0.9s cubic-bezier(0.12, 1, 0.25, 1), opacity 0.9s ease";
        item.style.transform = "translate(0, 0) scale(0.4)";
        item.style.opacity = "1";
        document.body.appendChild(item);

        const angle = (Math.PI * 2 * i) / 28;
        const dist = 90 + Math.random() * 180;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 20;

        requestAnimationFrame(() => {
            item.style.transform = `translate(${dx}px, ${dy}px) scale(1.3) rotate(${(Math.random() - 0.5) * 120}deg)`;
            item.style.opacity = "0";
        });
        setTimeout(() => item.remove(), 950);
    }
}

function handleDramaCutCake() {
    const statusText = document.getElementById("dramaStatusText");
    const cakeSpeech = document.getElementById("dramaCakeSpeech");
    const page = document.getElementById("skipCakeDramaPage");

    playDramaSound("cheer");

    if (page) {
        page.classList.remove("chaos-mode-active");
    }

    setMascotMood("victory");
    spawnDramaCelebrationBurst();

    if (cakeSpeech) {
        cakeSpeech.textContent = `"YAYYY! BEST DECISION EVER! 🍰🥳💖"`;
    }
    if (statusText) {
        statusText.textContent = "🎉 Cake saved! Bringing you to the cake cutting table... 🎂✨";
    }

    setTimeout(() => {
        showOnlyPage("birthdayCakePage");
        if (typeof playCakeBirthdayMusic === "function") {
            playCakeBirthdayMusic();
        }
        setTimeout(() => {
            cutTheCake();
        }, 350);
    }, 700);
}

function handleDramaBackToCake() {
    showOnlyPage("birthdayCakePage");
    if (typeof playCakeBirthdayMusic === "function") {
        playCakeBirthdayMusic();
    }
}

/* =========================================================
   CUT THE CAKE — slice animation + "I Love You" + party poppers
   ========================================================= */

function cutTheCake() {
    const reveal = document.getElementById("cakeCutReveal");
    const btn = document.getElementById("cutCakeBtn");
    const cakeAssembly = document.querySelector(".cute-cake-assembly");
    const bubble = document.getElementById("skipCakeBubble");

    if (bubble) bubble.classList.remove("show");

    // Animate cake assembly away
    if (cakeAssembly) {
        cakeAssembly.classList.add("cake-cut-anim");
    }

    // Show cut reveal
    if (reveal) {
        setTimeout(() => {
            reveal.classList.add("visible");
        }, 400);
    }

    // Update button
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="sparkle-sym">✦</span> <span class="btn-label">CAKE IS CUT!</span> <span class="sparkle-sym">✦</span>`;
    }

    // Fire party poppers all over screen
    setTimeout(() => {
        triggerFullScreenPartyPoppers();
    }, 600);

    // Also trigger the normal burst
    triggerCelebrationBurst();
}

function pokeIronMan() {
    const bubble = document.getElementById("ironmanBubble");
    const peeker = document.getElementById("ironmanPeeker");
    if (!peeker) return;

    if (bubble) {
        bubble.classList.toggle("active-bubble");
    }

    peeker.style.transform = "translateX(-50px) scale(1.12)";
    setTimeout(() => {
        peeker.style.transform = "";
    }, 700);

    if (typeof triggerCelebrationBurst === "function") {
        triggerCelebrationBurst();
    }
}
window.pokeIronMan = pokeIronMan;

function triggerFullScreenPartyPoppers() {
    const overlay = document.getElementById("partyBlastOverlay");
    if (!overlay) return;

    overlay.classList.add("active");

    const container = document.getElementById("partyBlastEmojis");
    if (!container) return;

    const emojis = ["🎉", "🎊", "🎈", "✨", "⭐", "🌟", "💫", "🎀", "💖", "🌸", "🥳", "🎆", "🎇", "💥", "🪅"];
    const colors = ["#ff4081", "#ffd700", "#00e5ff", "#b388ff", "#ff9100", "#76ff03", "#ff80ab", "#ff1744"];

    container.innerHTML = "";

    // Create 80 confetti/emoji particles
    for (let i = 0; i < 80; i++) {
        const el = document.createElement("div");
        el.className = "party-blast-particle";

        const isEmoji = Math.random() > 0.4;
        if (isEmoji) {
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.fontSize = (20 + Math.random() * 30) + "px";
        } else {
            el.style.width = (8 + Math.random() * 12) + "px";
            el.style.height = (8 + Math.random() * 14) + "px";
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        }

        el.style.left = Math.random() * 100 + "vw";
        el.style.animationDuration = (1.5 + Math.random() * 2.5) + "s";
        el.style.animationDelay = (Math.random() * 1.2) + "s";
        container.appendChild(el);
    }

    // Auto-hide overlay after 4s
    setTimeout(() => {
        overlay.classList.remove("active");
        container.innerHTML = "";
    }, 4500);
}

/* =========================================================
   GIFT 3: 21 WISHES & VOUCHERS SCRATCH-OFF DECK
   ========================================================= */

const gift3Cards = [
    {
        category: "👑 21st Grand Milestone",
        icon: "👑",
        title: "The Golden 21 Coronation ♡",
        msg: "No longer a teenager, officially stepping into your golden twenties. You carry yourself with so much grace, fierce loyalty, and effortless beauty. May this 21st year open doors you never even imagined and wrap you in the deepest happiness!",
        unlocked: false
    },
    {
        category: "🎭 Academy Award",
        icon: "🏆",
        title: "Drama Queen Lifetime Oscar",
        msg: "Awarded to Renesaan for: dramatic heavy sighs, gasping at minor inconveniences, leaving people on read for 8 hours for cinematic effect, and acting like the world is collapsing when hungry. Never change, you absolute icon!",
        unlocked: false
    },
    {
        category: "🕷️ Marvel Emergency Privilege",
        image: "assets/spidey/spidey_hanging.png",
        title: "Friendly Neighborhood Spidey Pass",
        msg: "Whenever you feel overwhelmed, anxious, or just plain tired of everyone's nonsense, activate this card. I will drop in upside-down, throw webs at your enemies, and protect your peace unconditionally! 💖🕸️",
        unlocked: false
    },
    {
        category: "🐥 Emotional Support Pass",
        image: "assets/spidey/spidey_chicken.png",
        title: "For When You Sulk Like A Baby Chick",
        msg: "Valid for those days when you sit in the corner with a grumpy pout, wearing invisible chicken hoods, refusing to talk. This voucher entitles you to compulsory forehead kisses, warm blanket rolls, and silence till you smile.",
        unlocked: false
    },
    {
        category: "⚖️ Supreme Legal Clause",
        icon: "📜",
        title: "The 'Renesaan Is Always Right' Pass",
        msg: "During our next chaotic argument, slam this card down. I will instantly surrender, apologize dramatically, and declare to the heavens that you were 1000% correct all along (even if you were dead wrong).",
        unlocked: false
    },
    {
        category: "🧋 Sugar Emergency",
        icon: "🧋",
        title: "Unlimited Iced Coffee & Boba Supply",
        msg: "If I have money, I pay. If I am garib (99% probability), you pay and I provide elite five-star conversational companionship. Either way, caffeine is non-negotiable!",
        unlocked: false
    },
    {
        category: "🌙 24/7 Crisis Hotline",
        icon: "📱",
        title: "3:00 AM Existential Meltdown Pass",
        msg: "Staring at the ceiling at 3 AM spiraling about life, the universe, or a random text from 2019? Call me. I will answer half-asleep, talk nonsense, and listen until you fall asleep peacefully.",
        unlocked: false
    },
    {
        category: "💖 High Fashion Decree",
        icon: "🏛️",
        title: "The Victoria Memorial Slay Certification",
        msg: "That blue dress at Victoria Memorial, your green saree with bougainvillea blossoms, the silver jhumkas — you don't just take photos, Renesaan, you create art. You are effortlessly breathtaking.",
        unlocked: false
    },
    {
        category: "🤪 Sisterly / Bestie Heritage",
        icon: "🌪️",
        title: "Certified Chaos Gremlin & Pakodi",
        msg: "You are unpredictable, unhinged, feral at times, but you have the biggest, purest golden heart. Life without your chaotic energy would be dull and tragic. Thank you for existing, you menace!",
        unlocked: false
    },
    {
        category: "📸 VIP Content Creator Pass",
        icon: "📸",
        title: "200 Angles Until Model Perfection",
        msg: "I will lay on the dusty floor, hold lights, adjust your hair, and take 347 continuous burst shots until we get the ONE aesthetic photo where your jawline cuts glass. Zero complaining from my side!",
        unlocked: false
    },
    {
        category: "🍕 Calorie Immunity Treaty",
        icon: "🥟",
        title: "1:00 AM Midnight Momo & Pizza Heist",
        msg: "Calories do not legally exist between midnight and 4 AM. Redeemable for piping hot spicy momos, cheesy pizza, or extra spicy noodles whenever you demand — of course from your money, bcz I am garib! 🍕💸",
        unlocked: false
    },
    {
        category: "💸 Mandatory Financial Treaty",
        image: "assets/spidey/spidey_splat.png",
        title: "You Pay The Bill (Bcz I Am Garib 😭)",
        msg: "Look at me lying on the floor in absolute ruins. My bank account balance is currently ₹4.20. You are now officially 21 — older, wiser, and financially superior. Therefore, all food, boba, iced matcha, and momo bills are legally YOUR responsibility. Thank you for your mandatory charity, my wealthy queen! 🙏💸✨",
        unlocked: false
    },
    {
        category: "🎵 Audio Sovereignty",
        icon: "🎶",
        title: "Aux Cord Monopoly & DJ Dictatorship",
        msg: "In the car or room, you control the music. Even if you loop the exact same heart-wrenching Bengali / Taylor Swift song 18 times until we both weep, no one is allowed to skip.",
        unlocked: false
    },
    {
        category: "🍫 Medical Emergency Ration",
        icon: "🍫",
        title: "Instant Dark Chocolate & Treat Delivery",
        msg: "When hormones attack and you want to punch a wall: play this card. Within minutes, chocolate and comfort snacks will be placed in your hands without speaking a single dangerous word.",
        unlocked: false
    },
    {
        category: "⭐ Sacred Blood Oath",
        icon: "⚔️",
        title: "Whoever Hurts You Deals With Me",
        msg: "If anyone ever makes you cry, diminishes your worth, or gives you anxiety, give me their name. I will fight the world on your behalf. You are protected, always.",
        unlocked: false
    },
    {
        category: "🛌 Official Laziness Permission",
        icon: "🛋️",
        title: "Zero-Productivity Blanket Burrito Day",
        msg: "A full 24 hours where you don't answer messages, don't worry about the future, and stay wrapped like a sushi roll in bed watching comfort shows with zero guilt.",
        unlocked: false
    },
    {
        category: "🚗 Adventure Escape Voucher",
        icon: "🌌",
        title: "Fresh Air & City Lights Midnight Drive",
        msg: "When home feels claustrophobic and your thoughts are too loud: redeem this for a night drive with rolled-down windows, cool breeze, music, and quiet companionship.",
        unlocked: false
    },
    {
        category: "🕊️ Heartfelt Reminder",
        icon: "🕊️",
        title: "You Are So Much More Than Enough",
        msg: "On days when you feel tired, self-conscious, or burdened by expectations: take a deep breath. Look at how much grace, kindness, and resilience you carry. You are doing so wonderfully, Renesaan.",
        unlocked: false
    },
    {
        category: "🎬 VIP Cinema Screening",
        icon: "🍿",
        title: "Blanket Fort Cinema & Gossip Night",
        msg: "Fairy lights, oversized hoodies, warm tea, endless popcorn, and unhinged gossip in between every movie scene. Zero outside world allowed.",
        unlocked: false
    },
    {
        category: "🌸 Birthday Blessing",
        icon: "🌻",
        title: "A Year of Gentle Wonders",
        msg: "I wish you honest friends, peaceful sleep, soft mornings, unexpected blessings, belly-aching laughter, and people who recognize the sheer magic in your soul.",
        unlocked: false
    },
    {
        category: "🥂 The Grand Finale",
        icon: "🥂",
        title: "To Renesaan — The One and Only ♡",
        msg: "Here's to 21 years of your light, your fire, and your chaotic beauty. I am so lucky to celebrate you today. May your twenties be pure poetry, love, and endless happiness! Happy 21st Birthday! 💖✨🎉",
        unlocked: false
    }
];

let gift3CurrentIndex = 0;
let gift3IsScratching = false;
let gift3LastPos = null;
let gift3ListenersAttached = false;
let gift3StrokeCount = 0;

function initGift3ScratchDeck() {
    renderGift3Card();
    if (!gift3ListenersAttached) {
        attachGift3ScratchListeners();
        window.addEventListener("resize", () => {
            const gift3Modal = document.getElementById("giftModalGift3");
            if (gift3Modal && gift3Modal.style.display !== "none") {
                const currentCard = gift3Cards[gift3CurrentIndex];
                if (!currentCard.unlocked) {
                    drawFoilCanvas();
                }
            }
        });
        gift3ListenersAttached = true;
    }
}

function renderGift3Card() {
    const card = gift3Cards[gift3CurrentIndex];
    if (!card) return;

    const catEl = document.getElementById("scratchCategory");
    const iconEl = document.getElementById("scratchIcon");
    const mediaWrap = document.getElementById("scratchMediaWrap");
    const imgEl = document.getElementById("scratchImg");
    const titleEl = document.getElementById("scratchTitle");
    const msgEl = document.getElementById("scratchMsg");
    const indEl = document.getElementById("scratchCardIndicator");
    const countEl = document.getElementById("scratchUnlockedCount");
    const quickBtn = document.getElementById("scratchQuickBtn");
    const canvas = document.getElementById("scratchCanvas");

    if (catEl) catEl.textContent = card.category;

    if (card.image) {
        if (mediaWrap) mediaWrap.style.display = "flex";
        if (imgEl) imgEl.src = card.image;
        if (iconEl) iconEl.style.display = "none";
    } else {
        if (mediaWrap) mediaWrap.style.display = "none";
        if (iconEl) {
            iconEl.style.display = "block";
            iconEl.textContent = card.icon;
        }
    }

    if (titleEl) titleEl.textContent = card.title;
    if (msgEl) msgEl.textContent = card.msg;
    if (indEl) indEl.textContent = `Card ${gift3CurrentIndex + 1} of ${gift3Cards.length}`;

    const unlockedCount = gift3Cards.filter(c => c.unlocked).length;
    if (countEl) countEl.textContent = unlockedCount;

    if (canvas) {
        if (card.unlocked) {
            canvas.classList.add("fade-out");
            canvas.style.pointerEvents = "none";
            if (quickBtn) quickBtn.innerHTML = "<span>✨ Revealed</span>";
        } else {
            canvas.classList.remove("fade-out");
            canvas.style.pointerEvents = "auto";
            if (quickBtn) quickBtn.innerHTML = "<span>🪄 Quick Scratch</span>";
            // Render the foil
            setTimeout(() => {
                drawFoilCanvas();
            }, 30);
        }
    }
}

function drawFoilCanvas() {
    const canvas = document.getElementById("scratchCanvas");
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let w = rect.width;
    let h = rect.height;

    // Robust fallback if modal is currently animating or 0x0
    if (!w || !h || w === 0 || h === 0) {
        const container = canvas.parentElement;
        if (container) {
            const crect = container.getBoundingClientRect();
            w = crect.width || 280;
            h = crect.height || 310;
        } else {
            w = 280;
            h = 310;
        }
        setTimeout(drawFoilCanvas, 80);
        setTimeout(drawFoilCanvas, 320);
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Luxury lilac & gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#e9d5ff");
    grad.addColorStop(0.3, "#c084fc");
    grad.addColorStop(0.7, "#f472b6");
    grad.addColorStop(1, "#fbbf24");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative stars & sparkles pattern
    const sparkles = [
        { x: w * 0.15, y: h * 0.18, sym: "✦", size: 14, color: "rgba(255,255,255,0.75)" },
        { x: w * 0.82, y: h * 0.15, sym: "⭐", size: 16, color: "rgba(255,255,255,0.8)" },
        { x: w * 0.22, y: h * 0.82, sym: "✧", size: 13, color: "rgba(255,255,255,0.7)" },
        { x: w * 0.85, y: h * 0.78, sym: "✦", size: 15, color: "rgba(255,255,255,0.75)" },
        { x: w * 0.1,  y: h * 0.5,  sym: "✧", size: 12, color: "rgba(255,255,255,0.6)" },
        { x: w * 0.9,  y: h * 0.48, sym: "⭐", size: 13, color: "rgba(255,255,255,0.65)" }
    ];

    sparkles.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.font = `${s.size}px 'DM Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.sym, s.x, s.y);
    });

    // Stamp / Badge in center
    const stampW = Math.min(w * 0.75, 195);
    const stampH = 68;
    const stampX = (w - stampW) / 2;
    const stampY = (h - stampH) / 2;

    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.shadowColor = "rgba(126, 34, 206, 0.25)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    roundRect(ctx, stampX, stampY, stampW, stampH, 16);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = "rgba(192, 132, 252, 0.55)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, stampX, stampY, stampW, stampH, 16);
    ctx.stroke();

    const cx = w / 2;
    const cy = h / 2;

    ctx.fillStyle = "#6b21a8";
    ctx.font = "bold 13px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ SCRATCH HERE 🪙", cx, cy - 8);

    ctx.fillStyle = "#9333ea";
    ctx.font = "500 10px 'DM Sans', sans-serif";
    ctx.fillText("scratch with coin or finger ♡", cx, cy + 12);
}

function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function attachGift3ScratchListeners() {
    const canvas = document.getElementById("scratchCanvas");
    if (!canvas) return;

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startScratch(e) {
        const card = gift3Cards[gift3CurrentIndex];
        if (card.unlocked) return;
        gift3IsScratching = true;
        gift3LastPos = getPos(e);
        doScratch(e);
    }

    function doScratch(e) {
        if (!gift3IsScratching) return;
        const card = gift3Cards[gift3CurrentIndex];
        if (card.unlocked) return;

        const currPos = getPos(e);
        const dpr = window.devicePixelRatio || 1;
        const ctx = canvas.getContext("2d");

        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 42 * dpr;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        if (gift3LastPos) {
            ctx.moveTo(gift3LastPos.x * dpr, gift3LastPos.y * dpr);
            ctx.lineTo(currPos.x * dpr, currPos.y * dpr);
        } else {
            ctx.arc(currPos.x * dpr, currPos.y * dpr, 21 * dpr, 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.restore();

        gift3LastPos = currPos;
        gift3StrokeCount++;

        // Periodically check if enough foil is cleared
        if (gift3StrokeCount % 8 === 0) {
            checkScratchProgress();
        }
    }

    function stopScratch() {
        if (gift3IsScratching) {
            gift3IsScratching = false;
            gift3LastPos = null;
            checkScratchProgress();
        }
    }

    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("mousemove", doScratch);
    window.addEventListener("mouseup", stopScratch);

    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        startScratch(e);
    }, { passive: false });
    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        doScratch(e);
    }, { passive: false });
    window.addEventListener("touchend", stopScratch);

    canvas.addEventListener("click", (e) => {
        const card = gift3Cards[gift3CurrentIndex];
        if (!card || card.unlocked) return;
        const pos = getPos(e);
        const dpr = window.devicePixelRatio || 1;
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(pos.x * dpr, pos.y * dpr, 38 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        checkScratchProgress();
    });
}

function checkScratchProgress() {
    const card = gift3Cards[gift3CurrentIndex];
    if (!card || card.unlocked) return;

    const canvas = document.getElementById("scratchCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;

    try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const step = Math.round(16 * dpr);
        let clearCount = 0;
        let totalSamples = 0;

        for (let x = 0; x < w; x += step) {
            for (let y = 0; y < h; y += step) {
                totalSamples++;
                const alpha = data[((y * w) + x) * 4 + 3];
                if (alpha < 128) {
                    clearCount++;
                }
            }
        }

        if (totalSamples > 0 && (clearCount / totalSamples) > 0.35) {
            unlockCurrentCard();
        }
    } catch (e) {
        // Fallback
    }
}

function unlockCurrentCard() {
    const card = gift3Cards[gift3CurrentIndex];
    if (!card || card.unlocked) return;

    card.unlocked = true;

    const canvas = document.getElementById("scratchCanvas");
    if (canvas) {
        canvas.classList.add("fade-out");
        canvas.style.pointerEvents = "none";
    }

    const quickBtn = document.getElementById("scratchQuickBtn");
    if (quickBtn) quickBtn.innerHTML = "<span>✨ Revealed</span>";

    const countEl = document.getElementById("scratchUnlockedCount");
    const unlockedCount = gift3Cards.filter(c => c.unlocked).length;
    if (countEl) countEl.textContent = unlockedCount;

    // Trigger celebration burst
    triggerCelebrationBurst();
}

function quickRevealCurrentCard() {
    unlockCurrentCard();
}

function nextScratchCard() {
    gift3CurrentIndex = (gift3CurrentIndex + 1) % gift3Cards.length;
    renderGift3Card();
}

function prevScratchCard() {
    gift3CurrentIndex = (gift3CurrentIndex - 1 + gift3Cards.length) % gift3Cards.length;
    renderGift3Card();
}

window.openGiftBox = openGiftBox;
window.closeGiftModal = closeGiftModal;
window.handleGiftsBack = handleGiftsBack;
window.goNextToCake = goNextToCake;
window.cutTheCake = cutTheCake;
window.resetCakeCut = resetCakeCut;
window.handleSkipCake = handleSkipCake;
window.openSkipDramaPage = openSkipDramaPage;
window.handleDramaSkipAttempt = handleDramaSkipAttempt;
window.handleDramaSkipHover = handleDramaSkipHover;
window.playSoftAngrySound = playSoftAngrySound;
window.handleDramaCutCake = handleDramaCutCake;
window.handleDramaBackToCake = handleDramaBackToCake;
window.triggerFullScreenPartyPoppers = triggerFullScreenPartyPoppers;
window.toggleGift2Play = toggleGift2Play;
window.cycleGift2Photo = cycleGift2Photo;
window.nextGift2Track = nextGift2Track;
window.prevGift2Track = prevGift2Track;
window.seekGift2Audio = seekGift2Audio;
window.toggleGift2Like = toggleGift2Like;
function setGift2FilterMode(mode) {}
window.setGift2FilterMode = setGift2FilterMode;
window.jumpToGift2Track = jumpToGift2Track;
window.quickRevealCurrentCard = quickRevealCurrentCard;
window.nextScratchCard = nextScratchCard;
window.prevScratchCard = prevScratchCard;
window.initGift3ScratchDeck = initGift3ScratchDeck;

/* =========================================================
   3D BIRTHDAY VIDEO NAVIGATION & DIRECT CAKE RETURN
   ========================================================= */

function goTo3DVideo() {
    if (typeof pauseCakeBirthdayMusic === "function") pauseCakeBirthdayMusic();
    sessionStorage.setItem("lastActivePage", "birthdayCakePage");
    sessionStorage.setItem("returnToCake", "true");
    window.location.href = "birthday-video.html";
}

function checkDirectCakeNavigation() {
    try {
        // Clean up any lingering transition overlays from previous navigation
        document.querySelectorAll(".grand-celebration-transition-overlay, div[style*='z-index: 99999999']").forEach(el => el.remove());

        // Check if page was refreshed / reloaded
        let isReload = false;
        try {
            const navEntries = performance.getEntriesByType && performance.getEntriesByType("navigation");
            if (navEntries && navEntries.length > 0) {
                isReload = (navEntries[0].type === "reload");
            } else if (performance.navigation) {
                isReload = (performance.navigation.type === 1);
            }
        } catch (e) {}

        // ALWAYS restart from the root Lock page on refresh
        if (isReload) {
            showLockPage();
            if (window.history && window.history.replaceState) {
                window.history.replaceState({ pageId: "lockPage" }, "", window.location.pathname);
            }
            return;
        }

        // Set initial lockPage history state if none exists
        if (window.history && window.history.replaceState && !window.history.state) {
            window.history.replaceState({ pageId: "lockPage" }, "", window.location.pathname);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get("page");
        const hash = window.location.hash;
        const returnToCake = sessionStorage.getItem("returnToCake");
        const lastActivePage = sessionStorage.getItem("lastActivePage");

        if (page === "gifts" || hash === "#giftBoxesPage" || hash === "#gifts" || lastActivePage === "giftBoxesPage") {
            sessionStorage.removeItem("returnToCake");
            showOnlyPage("giftBoxesPage", { immediate: true });
            document.documentElement.classList.remove("return-to-cake-mode");
            return;
        }

        if (page === "cake" || hash === "#birthdayCakePage" || hash === "#cake" || returnToCake === "true" || lastActivePage === "birthdayCakePage") {
            sessionStorage.removeItem("returnToCake");
            showOnlyPage("birthdayCakePage", { immediate: true });
            if (typeof resetCandles === "function") resetCandles();
            document.documentElement.classList.remove("return-to-cake-mode");
            return;
        }

        if (page === "dare" || page === "howDare" || hash === "#howDarePage") {
            sessionStorage.removeItem("returnToCake");
            showOnlyPage("howDarePage", { immediate: true });
            return;
        }

        if (page === "hey" || hash === "#heyPage" || lastActivePage === "heyPage") {
            showOnlyPage("heyPage", { immediate: true });
            if (typeof initHeyCanvas === "function") initHeyCanvas();
            return;
        }
    } catch (e) {
        console.error("Navigation routing error:", e);
    }
}

window.goTo3DVideo = goTo3DVideo;
window.checkDirectCakeNavigation = checkDirectCakeNavigation;

// Check immediately and on pageshow (e.g. browser back button / bfcache)
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkDirectCakeNavigation);
} else {
    checkDirectCakeNavigation();
}
window.addEventListener("pageshow", checkDirectCakeNavigation);
window.addEventListener("hashchange", checkDirectCakeNavigation);
window.addEventListener("popstate", (e) => {
    document.querySelectorAll(".grand-celebration-transition-overlay, div[style*='z-index: 99999999']").forEach(el => el.remove());

    // If a gift modal is currently open, close it cleanly and stay on current page
    const giftModal = document.getElementById("giftModal");
    if (giftModal && giftModal.classList.contains("show")) {
        closeGiftModal(true);
        return;
    }

    const state = e.state;
    const hash = window.location.hash;

    if (state && state.pageId) {
        if (state.pageId === "lockPage") {
            showLockPage();
        } else {
            showOnlyPage(state.pageId, { fromPopState: true, immediate: true });
        }
    } else if (hash === "#giftBoxesPage" || hash === "#gifts") {
        showOnlyPage("giftBoxesPage", { fromPopState: true, immediate: true });
    } else if (hash === "#birthdayCakePage" || hash === "#cake") {
        showOnlyPage("birthdayCakePage", { fromPopState: true, immediate: true });
    } else if (hash === "#heyPage") {
        showOnlyPage("heyPage", { fromPopState: true, immediate: true });
    } else if (hash === "#howDarePage") {
        showOnlyPage("howDarePage", { fromPopState: true, immediate: true });
    } else {
        showLockPage();
    }
});

function initGiftModalEvents() {
    const giftModal = document.getElementById("giftModal");
    if (giftModal) {
        giftModal.addEventListener("click", (e) => {
            if (e.target === giftModal) {
                closeGiftModal();
            }
        });
    }
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const m = document.getElementById("giftModal");
            if (m && m.classList.contains("show")) {
                closeGiftModal();
            }
        }
    });
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGiftModalEvents);
} else {
    initGiftModalEvents();
}

/* =========================================================
   GRAND FINALE: STARLIT WISHING SKY & TIME CAPSULE CONTROLLER
   ========================================================= */

function playSynthesizedChime(freq, type = 'sine', duration = 0.6) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

function goToGrandFinale() {
    const giftsPage = document.getElementById("giftBoxesPage");
    const finalePage = document.getElementById("grandFinalePage");

    if (giftsPage) {
        giftsPage.classList.add("slide-out-left");
        setTimeout(() => {
            giftsPage.classList.remove("active", "slide-out-left");
        }, 500);
    }

    if (finalePage) {
        setTimeout(() => {
            finalePage.classList.add("active");
            playSynthesizedChime(523.25, 'sine', 0.8);
            setTimeout(() => playSynthesizedChime(659.25, 'sine', 0.8), 150);
            setTimeout(() => playSynthesizedChime(783.99, 'sine', 1.0), 300);
        }, 300);
    }
}

function handleFinaleBackToGifts() {
    const finalePage = document.getElementById("grandFinalePage");
    const giftsPage = document.getElementById("giftBoxesPage");
    if (finalePage) finalePage.classList.remove("active");
    if (giftsPage) giftsPage.classList.add("active");
}

function handleFinaleGoToCake() {
    const finalePage = document.getElementById("grandFinalePage");
    const bdayPage = document.getElementById("birthdayCakePage");
    if (finalePage) finalePage.classList.remove("active");
    if (bdayPage) bdayPage.classList.add("active");
    if (typeof resetCandles === "function") resetCandles();
    if (typeof resetCakeCut === "function") resetCakeCut();
}

let releasedLanternCount = 0;
const lanternPacts = {
    1: {
        title: "Wardrobe Theft Ceasefire (48 Hours) 🧦✨",
        msg: "I solemnly swear not to secretly 'borrow' your oversized hoodies, favorite lipstick, or aesthetic hair clips for the next 48 hours. After 48 hours, normal sibling robbery resumes! 🧦✨",
        quote: "🧦 Lantern 1 Released: Ceasefire declared! No hoodie or lipstick theft for 48 hours! ✨"
    },
    2: {
        title: "24/7 Didi Shield & Gossip Hotline 🛡️💅",
        msg: "Unlimited lifetime access to venting about annoying people, sharing college/life drama, and having me defend you whenever anyone dares to bother my favorite elder sister!",
        quote: "🛡️ Lantern 2 Released: 24/7 Didi Shield & Gossip Hotline permanently active! 💖"
    },
    3: {
        title: "Mandatory Treaty: Didi Pays The Bill 💸🍕",
        msg: "As the elder sister who has officially hit the milestone of 21, you are now legally certified rich. Therefore, all coffee, momos, pizzas, and dessert bills belong to you bcz I am permanently garib! 😭💸",
        quote: "💸 Lantern 3 Released: Treaty sealed! Didi pays all food bills bcz I am garib! 🍕"
    },
    4: {
        title: "Unlimited Late-Night Momos & Chai 🥟☕",
        msg: "Redeemable whenever you need a 2 AM comfort snack or a steaming cup of tea. I will prepare it or order it for you with extra love, spice, and spicy chutney!",
        quote: "🥟 Lantern 4 Released: Unlimited late-night momos & laughter guaranteed! 🌸"
    },
    5: {
        title: "Best Elder Sister In The Entire Universe 👑💖",
        msg: "No matter how much we argue, steal clothes, or bicker over silly things — you are my favorite person, my role model, and the coolest sister ever. Happy 21st Birthday, behen ki pakodi! 🌸✨",
        quote: "👑 Lantern 5 Released: Blessed with the greatest, sweetest elder sister in the universe! 💖"
    }
};

function releaseLantern(id, btn) {
    if (!btn) return;

    // Highlight all lantern buttons and mark current active
    const allBtns = document.querySelectorAll(".lantern-btn");
    allBtns.forEach(b => b.classList.remove("active-selected"));
    btn.classList.add("active-selected");

    const wasAlreadyReleased = btn.classList.contains("released");
    if (!wasAlreadyReleased) {
        btn.classList.add("released");
        releasedLanternCount++;
    }

    const countEl = document.getElementById("lanternsCount");
    const toastEl = document.getElementById("lanternToast");
    const detailCard = document.getElementById("lanternDetailCard");
    const detailTitle = document.getElementById("ldetailTitle");
    const detailMsg = document.getElementById("ldetailMsg");

    const pact = lanternPacts[id] || lanternPacts[1];

    if (countEl) countEl.textContent = `${releasedLanternCount} / 5`;
    if (toastEl) toastEl.textContent = pact.quote;

    // Display revealed sister pact card prominently
    if (detailCard && detailTitle && detailMsg) {
        detailTitle.textContent = pact.title;
        detailMsg.textContent = pact.msg;
        detailCard.style.display = "block";
        detailCard.classList.remove("pop-glow");
        void detailCard.offsetWidth; // re-trigger animation
        detailCard.classList.add("pop-glow");
    }

    // Play magical pentatonic chime
    const freqs = [523.25, 587.33, 659.25, 783.99, 880.00];
    playSynthesizedChime(freqs[id - 1] || 659.25, 'triangle', 1.2);

    // Spawn soaring lantern element from button location
    const rect = btn.getBoundingClientRect();
    const flyingEl = document.createElement("div");
    flyingEl.className = "flying-sky-lantern";
    flyingEl.textContent = "🏮";
    flyingEl.style.left = `${rect.left + rect.width / 2 - 20}px`;
    flyingEl.style.top = `${rect.top}px`;
    document.body.appendChild(flyingEl);
    setTimeout(() => flyingEl.remove(), 4000);

    // If all 5 released: celebratory burst!
    if (releasedLanternCount >= 5 && !wasAlreadyReleased) {
        setTimeout(() => {
            if (toastEl) toastEl.textContent = "🌌 All 5 lanterns released! The universe heard your 21st birthday wishes, behen ki pakodi! ✨🎉";
            if (typeof triggerFullScreenPartyPoppers === "function") {
                triggerFullScreenPartyPoppers();
            }
        }, 800);
    }
}

function toggleWaxLetter() {
    const wrap = document.getElementById("waxEnvelopeWrap");
    const hint = document.getElementById("envelopeHint");
    if (!wrap) return;

    wrap.classList.toggle("open");
    const isOpen = wrap.classList.contains("open");

    if (isOpen) {
        playSynthesizedChime(659.25, 'sine', 0.5);
        setTimeout(() => playSynthesizedChime(880.00, 'sine', 0.8), 120);
        if (hint) hint.innerHTML = "<span>💌 Tap again to fold the letter back ♡</span>";
    } else {
        if (hint) hint.innerHTML = "<span>💌 Click envelope to open / close letter</span>";
    }
}

// Sibling Annoyance Prank
const didiPranks = [
    "🧦 Stole your favorite oversized hoodie!",
    "💄 Borrowed your expensive lipstick without asking!",
    "🍟 Stole the crispiest french fry right off your plate!",
    "📱 Left you on read for 4 hours just for fun!",
    "🍕 Claimed the last slice of pizza while maintaining eye contact!",
    "📸 Threatened to post your goofy childhood photos!",
    "💸 Didi please send ₹500 for iced matcha bcz I am garib!",
    "🛋️ Sat on your spot on the couch and refused to move!"
];

let prankIndex = 0;

function triggerDidiPrank(btn) {
    const quote = didiPranks[prankIndex % didiPranks.length];
    prankIndex++;

    playSynthesizedChime(340 + Math.random() * 180, 'triangle', 0.25);

    // Update in-card notice box
    const noticeBox = document.getElementById("prankNoticeBox");
    const noticeText = document.getElementById("prankNoticeText");
    if (noticeBox && noticeText) {
        noticeText.textContent = quote;
        noticeBox.style.display = "block";
        noticeBox.classList.remove("prank-pulse");
        void noticeBox.offsetWidth;
        noticeBox.classList.add("prank-pulse");
    }

    const rect = btn.getBoundingClientRect();
    const bubble = document.createElement("div");
    bubble.className = "flying-prank-bubble";
    bubble.textContent = quote;
    bubble.style.left = `${Math.max(10, Math.min(window.innerWidth - 320, rect.left - 40))}px`;
    bubble.style.top = `${rect.top - 12}px`;
    document.body.appendChild(bubble);

    setTimeout(() => bubble.remove(), 2600);
}

// Hug charge & click logic
let hugChargeInterval = null;
let hugPercentage = 0;

function clickSendHug() {
    const btn = document.getElementById("hugHeartBtn");
    const fill = document.getElementById("hugMeterFill");
    const text = document.getElementById("hugMeterText");

    hugPercentage = Math.min(100, hugPercentage + 20);
    if (fill) fill.style.width = `${hugPercentage}%`;
    if (text) text.textContent = `Sending hugs: ${Math.round(hugPercentage)}% 🫂`;

    spawnHugHeart();
    playSynthesizedChime(440 + hugPercentage * 3.5, 'sine', 0.25);

    if (btn) {
        btn.classList.add("btn-pop");
        setTimeout(() => btn.classList.remove("btn-pop"), 200);
    }

    if (hugPercentage >= 100) {
        if (text) text.textContent = "10,000 Hugs Delivered to behen ki pakodi! 💖🥳";
        if (typeof triggerFullScreenPartyPoppers === "function") {
            triggerFullScreenPartyPoppers();
        }
    }
}

function startHugCharge() {
    const btn = document.getElementById("hugHeartBtn");
    const fill = document.getElementById("hugMeterFill");
    const text = document.getElementById("hugMeterText");
    if (btn) btn.classList.add("charging");

    if (hugChargeInterval) clearInterval(hugChargeInterval);

    hugChargeInterval = setInterval(() => {
        if (hugPercentage < 100) {
            hugPercentage = Math.min(100, hugPercentage + 3.5);
            if (fill) fill.style.width = `${hugPercentage}%`;
            if (text) text.textContent = `Sending hugs: ${Math.round(hugPercentage)}% 🫂`;

            // Spawn floating hearts
            spawnHugHeart();

            if (Math.round(hugPercentage) % 15 === 0) {
                playSynthesizedChime(440 + hugPercentage * 3, 'sine', 0.2);
            }

            if (hugPercentage >= 100) {
                clearInterval(hugChargeInterval);
                hugChargeInterval = null;
                if (btn) btn.classList.remove("charging");
                if (text) text.textContent = "10,000 Hugs Delivered to behen ki pakodi! 💖🥳";
                if (typeof triggerFullScreenPartyPoppers === "function") {
                    triggerFullScreenPartyPoppers();
                }
            }
        }
    }, 60);
}

function stopHugCharge() {
    const btn = document.getElementById("hugHeartBtn");
    if (btn) btn.classList.remove("charging");
    if (hugChargeInterval) {
        clearInterval(hugChargeInterval);
        hugChargeInterval = null;
    }
}

function spawnHugHeart() {
    const btn = document.getElementById("hugHeartBtn");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const heart = document.createElement("div");
    heart.className = "flying-hug-heart";
    const emojis = ["💖", "💕", "🫂", "🌸", "✨", "🎀", "💗"];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.fontSize = `${18 + Math.random() * 16}px`;
    heart.style.left = `${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
    heart.style.top = `${rect.top + (Math.random() * 20 - 10)}px`;
    heart.style.setProperty("--tx", `${(Math.random() - 0.5) * 160}px`);
    heart.style.setProperty("--ty", `${-100 - Math.random() * 100}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1900);
}

function goToGrandCelebration() {
    playSynthesizedChime(523.25, 'sine', 0.4);
    setTimeout(() => playSynthesizedChime(659.25, 'sine', 0.5), 120);
    setTimeout(() => playSynthesizedChime(783.99, 'sine', 0.8), 240);

    // Save giftBoxesPage as last active page so returning from celebration opens gifts directly!
    try {
        sessionStorage.setItem("lastActivePage", "giftBoxesPage");
        sessionStorage.setItem("siteUnlocked", "true");
    } catch (e) {}

    const overlay = document.createElement("div");
    overlay.className = "grand-celebration-transition-overlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "99999999";
    overlay.style.background = "radial-gradient(circle at center, rgba(255, 232, 31, 0.95) 0%, rgba(255, 105, 180, 0.9) 60%, rgba(13, 6, 26, 1) 100%)";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    overlay.style.pointerEvents = "none";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
    });

    setTimeout(() => {
        window.location.href = "celebration.html";
    }, 550);
}

window.goToGrandFinale = goToGrandFinale;
window.goToGrandCelebration = goToGrandCelebration;
window.handleFinaleBackToGifts = handleFinaleBackToGifts;
window.handleFinaleGoToCake = handleFinaleGoToCake;
window.releaseLantern = releaseLantern;
window.toggleWaxLetter = toggleWaxLetter;
window.triggerDidiPrank = triggerDidiPrank;
window.startHugCharge = startHugCharge;
window.stopHugCharge = stopHugCharge;
window.clickSendHug = clickSendHug;


// =========================================================
// FRONT PAGE: CUTE ROMANTIC TIC TAC TOE LOGIC
// =========================================================

(function initRomanticTicTacToe() {
    let tttBoardState = Array(9).fill(null);
    let tttGameOver = false;
    let tttAiThinking = false;

    const tttPage = document.getElementById("tictactoePage");
    if (!tttPage) return;

    const lockPage = document.querySelector(".page");
    const tttBoard = document.getElementById("tttBoard");
    const tttCells = document.querySelectorAll(".ttt-cell");
    const tttRestartBtn = document.getElementById("tttRestartBtn");
    const tttNextBtn = document.getElementById("tttNextBtn");
    const tttStatusText = document.getElementById("tttStatusText");
    const tttUserTag = document.getElementById("tttUserTag");
    const tttAiTag = document.getElementById("tttAiTag");
    const tttCanvas = document.getElementById("tttCanvas");

    const WINNING_COMBOS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // ======================================
    // Web Audio Synthesizer (Zero External Dependencies)
    // ======================================
    let tttAudioCtx = null;
    function getAudioCtx() {
        try {
            if (!tttAudioCtx) {
                const AudioClass = window.AudioContext || window.webkitAudioContext;
                if (AudioClass) tttAudioCtx = new AudioClass();
            }
            if (tttAudioCtx && tttAudioCtx.state === "suspended") {
                tttAudioCtx.resume();
            }
            return tttAudioCtx;
        } catch (e) {
            return null;
        }
    }

    function playCuteSound(type) {
        try {
            const ctx = getAudioCtx();
            if (!ctx) return;
            const now = ctx.currentTime;

            if (type === "x") {
                // High sweet cheerful pop for player X
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(540, now);
                osc.frequency.exponentialRampToValueAtTime(860, now + 0.09);
                gain.gain.setValueAtTime(0.28, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.13);
            } else if (type === "o") {
                // Soft bubbly water-drop chime for computer O
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(420, now);
                osc.frequency.exponentialRampToValueAtTime(680, now + 0.11);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === "win") {
                // 4-note victory chime (C5, E5, G5, C6)
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, now + idx * 0.11);
                    gain.gain.setValueAtTime(0, now + idx * 0.11);
                    gain.gain.linearRampToValueAtTime(0.28, now + idx * 0.11 + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.45);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.11);
                    osc.stop(now + idx * 0.11 + 0.48);
                });
            } else if (type === "restart") {
                // Gentle whoosh click
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(480, now);
                osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.11);
            }
        } catch (e) {}
    }

    // ======================================
    // Dreamy Canvas Particles: Falling Petals & Confetti
    // ======================================
    let particles = [];
    let canvasCtx = null;
    let animFrameId = null;

    function resizeTttCanvas() {
        if (!tttCanvas) return;
        tttCanvas.width = window.innerWidth;
        tttCanvas.height = window.innerHeight;
    }

    function initParticles() {
        if (!tttCanvas) return;
        canvasCtx = tttCanvas.getContext("2d");
        resizeTttCanvas();
        window.addEventListener("resize", resizeTttCanvas);

        particles = [];
        // Spawn initial ambient sakura petals and stars
        for (let i = 0; i < 28; i++) {
            particles.push(createAmbientParticle(true));
        }

        // Pointer sparkle trail on movement
        const addPointerSparkle = (x, y) => {
            if (tttPage.classList.contains("is-hidden")) return;
            for (let i = 0; i < 2; i++) {
                particles.push({
                    x: x + (Math.random() - 0.5) * 16,
                    y: y + (Math.random() - 0.5) * 16,
                    size: Math.random() * 9 + 6,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: Math.random() * -1.5 - 0.5,
                    alpha: 1,
                    decay: 0.02 + Math.random() * 0.02,
                    type: Math.random() > 0.5 ? "heart" : "sparkle",
                    rotation: Math.random() * Math.PI * 2,
                    color: Math.random() > 0.5 ? "#ff3377" : "#ffaacc"
                });
            }
        };

        window.addEventListener("mousemove", (e) => addPointerSparkle(e.clientX, e.clientY));
        window.addEventListener("touchmove", (e) => {
            if (e.touches && e.touches[0]) {
                addPointerSparkle(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        startAnimLoop();
    }

    function createAmbientParticle(randomY = false) {
        return {
            x: Math.random() * window.innerWidth,
            y: randomY ? Math.random() * window.innerHeight : -20,
            size: Math.random() * 12 + 8,
            vx: Math.random() * 1.2 - 0.4,
            vy: Math.random() * 1.2 + 0.8,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.03,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.02 + Math.random() * 0.03,
            alpha: 0.4 + Math.random() * 0.45,
            type: Math.random() > 0.35 ? "petal" : (Math.random() > 0.5 ? "star" : "heart"),
            color: ["#ffb6c1", "#ff9bb7", "#ffa8c5", "#ffd1dc", "#ff7399"][Math.floor(Math.random() * 5)]
        };
    }

    function triggerWinBurst() {
        if (!canvasCtx) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        for (let i = 0; i < 75; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 3;
            particles.push({
                x: cx,
                y: cy,
                size: Math.random() * 14 + 8,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2.5,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.1,
                alpha: 1,
                decay: 0.008 + Math.random() * 0.012,
                type: Math.random() > 0.4 ? "heart" : (Math.random() > 0.5 ? "sparkle" : "petal"),
                color: ["#ff085e", "#ff3377", "#ff6699", "#ffaacc", "#ffdfeb", "#ffd700"][Math.floor(Math.random() * 6)]
            });
        }
    }

    function renderParticles() {
        if (!canvasCtx || !tttCanvas) return;
        canvasCtx.clearRect(0, 0, tttCanvas.width, tttCanvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            if (p.decay) {
                // Interactive / burst particles with decay
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08; // subtle gravity
                p.alpha -= p.decay;
                p.rotation += p.rotSpeed || 0.02;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
            } else {
                // Ambient drifting sakura petals
                p.wobble += p.wobbleSpeed;
                p.x += p.vx + Math.sin(p.wobble) * 0.6;
                p.y += p.vy;
                p.rotation += p.rotSpeed;

                if (p.y > window.innerHeight + 30 || p.x < -30 || p.x > window.innerWidth + 30) {
                    particles[i] = createAmbientParticle(false);
                }
            }

            canvasCtx.save();
            canvasCtx.translate(p.x, p.y);
            canvasCtx.rotate(p.rotation);
            canvasCtx.globalAlpha = Math.max(0, p.alpha);

            if (p.type === "petal") {
                canvasCtx.fillStyle = p.color;
                canvasCtx.beginPath();
                canvasCtx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
                canvasCtx.fill();
            } else if (p.type === "heart") {
                canvasCtx.fillStyle = p.color;
                const s = p.size * 0.5;
                canvasCtx.beginPath();
                canvasCtx.moveTo(0, s * 0.35);
                canvasCtx.bezierCurveTo(-s, -s * 0.5, -s * 0.7, -s * 1.1, 0, -s * 0.4);
                canvasCtx.bezierCurveTo(s * 0.7, -s * 1.1, s, -s * 0.5, 0, s * 0.35);
                canvasCtx.fill();
            } else {
                // Sparkle ✦
                canvasCtx.fillStyle = p.color;
                canvasCtx.font = `${p.size}px sans-serif`;
                canvasCtx.textAlign = "center";
                canvasCtx.textBaseline = "middle";
                canvasCtx.fillText("✦", 0, 0);
            }
            canvasCtx.restore();
        }

        animFrameId = requestAnimationFrame(renderParticles);
    }

    function startAnimLoop() {
        if (!animFrameId) {
            animFrameId = requestAnimationFrame(renderParticles);
        }
    }

    // ======================================
    // Game Mechanics & AI Logic
    // ======================================
    function checkWinner(board) {
        for (let combo of WINNING_COMBOS) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], combo: combo };
            }
        }
        if (board.every(cell => cell !== null)) {
            return { winner: "tie", combo: null };
        }
        return null;
    }

    function setTurnIndicator(isUserTurn) {
        if (!tttUserTag || !tttAiTag) return;
        if (isUserTurn) {
            tttUserTag.classList.add("active");
            tttAiTag.classList.remove("active");
        } else {
            tttUserTag.classList.remove("active");
            tttAiTag.classList.add("active");
        }
    }

    function renderBoard() {
        tttCells.forEach((cell, idx) => {
            const val = tttBoardState[idx];
            cell.innerHTML = "";
            cell.classList.remove("cell-x", "cell-o");
            if (val === "X") {
                cell.classList.add("cell-x");
                const span = document.createElement("span");
                span.className = "ttt-symbol symbol-x";
                span.textContent = "X";
                cell.appendChild(span);
            } else if (val === "O") {
                cell.classList.add("cell-o");
                const span = document.createElement("span");
                span.className = "ttt-symbol symbol-o";
                span.textContent = "O";
                cell.appendChild(span);
            }
        });
    }

    function handleCellClick(index) {
        if (tttGameOver || tttAiThinking || tttBoardState[index] !== null) {
            return;
        }

        // 1. User places X
        tttBoardState[index] = "X";
        renderBoard();
        playCuteSound("x");

        // Check if user won or tied
        const result = checkWinner(tttBoardState);
        if (result) {
            handleGameOver(result);
            return;
        }

        // 2. Computer ("u") plays O with a playful delay
        tttAiThinking = true;
        setTurnIndicator(false);
        if (tttStatusText) {
            tttStatusText.innerHTML = "Thinking... 💭";
        }

        setTimeout(() => {
            if (tttGameOver) return;
            const aiMove = getAiMove();
            if (aiMove !== -1) {
                tttBoardState[aiMove] = "O";
                renderBoard();
                playCuteSound("o");
            }
            tttAiThinking = false;

            const nextResult = checkWinner(tttBoardState);
            if (nextResult) {
                handleGameOver(nextResult);
            } else {
                setTurnIndicator(true);
                if (tttStatusText) {
                    tttStatusText.innerHTML = "Your turn! Put an <strong>X</strong> in any box ♡";
                }
            }
        }, 420);
    }

    // AI selection: user requested "u only gave O and i will put X in the boxes"
    // GUARANTEED WIN: AI deliberately avoids winning and NEVER blocks player's 3rd spot!
    function getAiMove() {
        const available = [];
        tttBoardState.forEach((val, i) => {
            if (val === null) available.push(i);
        });
        if (available.length === 0) return -1;

        // Find all moves where the player would complete 3 in a row
        const winningMovesForPlayer = [];
        for (let idx of available) {
            const copy = [...tttBoardState];
            copy[idx] = "X";
            const res = checkWinner(copy);
            if (res && res.winner === "X") {
                winningMovesForPlayer.push(idx);
            }
        }

        // 1. NEVER block the player! Keep the winning spots wide open for the player
        let safeAvailable = available.filter(idx => !winningMovesForPlayer.includes(idx));
        if (safeAvailable.length === 0) {
            safeAvailable = available;
        }

        // 2. NEVER let AI win! Filter out any move that gives O 3 in a row
        const nonWinningMovesForAi = safeAvailable.filter(idx => {
            const copy = [...tttBoardState];
            copy[idx] = "O";
            const res = checkWinner(copy);
            return !(res && res.winner === "O");
        });

        const pool = nonWinningMovesForAi.length > 0 ? nonWinningMovesForAi : safeAvailable;

        // 3. Keep player's active lines completely open and uninterrupted
        const playerIndices = [];
        tttBoardState.forEach((val, i) => {
            if (val === "X") playerIndices.push(i);
        });

        const openPlayerLines = WINNING_COMBOS.filter(combo => {
            return combo.some(idx => playerIndices.includes(idx)) &&
                   !combo.some(idx => tttBoardState[idx] === "O");
        });

        const preferredMoves = pool.filter(idx => {
            return !openPlayerLines.some(combo => combo.includes(idx));
        });

        if (preferredMoves.length > 0) {
            return preferredMoves[Math.floor(Math.random() * preferredMoves.length)];
        }

        return pool[Math.floor(Math.random() * pool.length)];
    }

    function handleGameOver(result) {
        tttGameOver = true;
        if (result.winner === "X") {
            // Winning line highlight
            if (result.combo) {
                result.combo.forEach(idx => {
                    if (tttCells[idx]) tttCells[idx].classList.add("winning-cell");
                });
            }
            if (tttStatusText) {
                tttStatusText.innerHTML = "You won my heart! 💖 Tap <strong>next</strong> to continue ♡";
            }
            triggerWinBurst();
            playCuteSound("win");
            if (tttNextBtn) {
                tttNextBtn.classList.add("pulse-highlight");
            }
        } else if (result.winner === "O") {
            if (result.combo) {
                result.combo.forEach(idx => {
                    if (tttCells[idx]) tttCells[idx].classList.add("winning-cell");
                });
            }
            if (tttStatusText) {
                tttStatusText.innerHTML = "I got this round! Tap restart or click next ♡";
            }
            if (tttNextBtn) {
                tttNextBtn.classList.add("pulse-highlight");
            }
        } else {
            // Tie
            if (tttStatusText) {
                tttStatusText.innerHTML = "It's a tie! But you still win my heart ♡";
            }
            if (tttNextBtn) {
                tttNextBtn.classList.add("pulse-highlight");
            }
        }
    }

    function restartGame() {
        tttBoardState = Array(9).fill(null);
        tttGameOver = false;
        tttAiThinking = false;
        tttCells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove("cell-x", "cell-o", "winning-cell");
        });
        if (tttStatusText) {
            tttStatusText.innerHTML = "Your turn! Put an <strong>X</strong> in any box ♡";
        }
        if (tttNextBtn) {
            tttNextBtn.classList.remove("pulse-highlight");
        }
        setTurnIndicator(true);
        playCuteSound("restart");
    }

    // ======================================
    // Page Transitions & Navigation
    // ======================================
    function goToNextPage() {
        playCuteSound("win");
        if (tttPage) {
            tttPage.classList.add("is-hidden");
        }

        // Check if user already unlocked the site in this session
        const isUnlocked = document.documentElement.classList.contains("unlocked") ||
                           sessionStorage.getItem("siteUnlocked") === "true";

        if (isUnlocked && typeof showOnlyPage === "function") {
            showOnlyPage("heyPage");
        } else {
            // Show the romantic Lock Page (photo of us + enter passkey)
            if (lockPage) {
                lockPage.classList.remove("behind-ttt", "is-hidden");
                lockPage.style.display = "";
                lockPage.style.visibility = "";
                lockPage.style.opacity = "1";
                lockPage.style.pointerEvents = "";
            }
            try {
                sessionStorage.setItem("lastActivePage", "lockPage");
            } catch (e) {}
        }
    }

    window.showTttPage = function() {
        if (lockPage) {
            lockPage.classList.add("behind-ttt");
        }
        if (tttPage) {
            tttPage.classList.remove("is-hidden");
        }
        try {
            sessionStorage.removeItem("lastActivePage");
        } catch (e) {}
    };

    // ======================================
    // Bind Event Listeners
    // ======================================
    tttCells.forEach((cell, idx) => {
        cell.addEventListener("click", () => handleCellClick(idx));
    });

    if (tttRestartBtn) {
        tttRestartBtn.addEventListener("click", restartGame);
    }

    if (tttNextBtn) {
        tttNextBtn.addEventListener("click", goToNextPage);
    }

    // Check if initial load should bypass Tic Tac Toe (e.g., returning to gifts or cake)
    try {
        const params = new URLSearchParams(window.location.search);
        const p = params.get("page");
        const h = window.location.hash;
        const lastPage = sessionStorage.getItem("lastActivePage");
        const isUnlocked = document.documentElement.classList.contains("unlocked");

        if (isUnlocked || p || (h && h !== "#tictactoePage") || (lastPage && lastPage !== "tictactoePage" && lastPage !== "lockPage")) {
            tttPage.classList.add("is-hidden");
            if (lockPage && !isUnlocked) {
                lockPage.classList.remove("behind-ttt");
            }
        } else {
            // Tic Tac Toe is the front page!
            tttPage.classList.remove("is-hidden");
            if (lockPage) {
                lockPage.classList.add("behind-ttt");
            }
        }
    } catch (e) {}

    initParticles();
    if (typeof attachSkipButtonJumpEvents === "function") {
        attachSkipButtonJumpEvents();
    }
})();







