const cardRect = { left: 100, right: 620, top: 80, bottom: 820, width: 520, height: 740 };
const cutRect = { left: 240, right: 480, top: 560, bottom: 620, width: 240, height: 60 };
const winW = 800, winH = 950;
let dramaSkipOriginRelX = 340, dramaSkipOriginRelY = 480;
let dramaSkipCurrentX = 0, dramaSkipCurrentY = 0;
let recentSpotIndices = [];

for (let step = 0; step < 25; step++) {
    const pointerX = 420 + dramaSkipCurrentX;
    const pointerY = 500 + dramaSkipCurrentY;
    const currScreenX = 420 + dramaSkipCurrentX;
    const currScreenY = 500 + dramaSkipCurrentY;
    const btnW = 120, btnH = 42;
    const pad = 16;
    const minX = Math.max(pad, cardRect.left + pad);
    const maxX = Math.min(winW - btnW - pad, cardRect.right - btnW - pad);
    const minY = Math.max(pad + 10, cardRect.top + 45);
    const maxY = Math.min(winH - btnH - pad, cardRect.bottom - btnH - 20);

    const destinations = [
        { name: "top-left",        x: cardRect.left + 24,                        y: cardRect.top + 50 },
        { name: "top-right",       x: cardRect.right - btnW - 24,                y: cardRect.top + 50 },
        { name: "upper-left",      x: cardRect.left + 20,                        y: cardRect.top + 160 },
        { name: "upper-right",     x: cardRect.right - btnW - 20,                y: cardRect.top + 160 },
        { name: "mid-left",        x: cardRect.left + 20,                        y: cardRect.top + 270 },
        { name: "mid-right",       x: cardRect.right - btnW - 20,                y: cardRect.top + 270 },
        { name: "above-cut",       x: cutRect.left + (cutRect.width - btnW) / 2, y: cutRect.top - btnH - 32 },
        { name: "far-left-flank",  x: cardRect.left + 20,                        y: cutRect.top },
        { name: "far-right-flank", x: cardRect.right - btnW - 20,                y: cutRect.top },
        { name: "bottom-left",     x: cardRect.left + 24,                        y: cardRect.bottom - btnH - 28 },
        { name: "bottom-center",   x: cutRect.left + (cutRect.width - btnW) / 2, y: cardRect.bottom - btnH - 22 },
        { name: "bottom-right",    x: cardRect.right - btnW - 24,                y: cardRect.bottom - btnH - 28 }
    ];

    const validSpots = destinations.map((d, index) => {
        const jitterX = (Math.random() - 0.5) * 32;
        const jitterY = (Math.random() - 0.5) * 26;
        let x = Math.max(minX, Math.min(maxX, d.x + jitterX));
        let y = Math.max(minY, Math.min(maxY, d.y + jitterY));

        const distFromCurrent = Math.hypot(x - currScreenX, y - currScreenY);
        const distFromPointer = Math.hypot(x + btnW / 2 - pointerX, y + btnH / 2 - pointerY);
        return { index, name: d.name, x, y, distFromCurrent, distFromPointer };
    });

    // Anti-repeat: Exclude the last 5 visited spots!
    let candidateSpots = validSpots.filter(s => !recentSpotIndices.includes(s.index));

    // Exclude spots that are too close to current button position (< 120px) or pointer (< 110px)
    let farEnough = candidateSpots.filter(s => s.distFromPointer >= 120 && s.distFromCurrent >= 110);
    if (farEnough.length === 0) {
        farEnough = candidateSpots.filter(s => s.distFromCurrent >= 90);
    }
    if (farEnough.length === 0) {
        farEnough = validSpots.filter(s => !recentSpotIndices.slice(-2).includes(s.index));
    }

    // Pick randomly from the top 3 furthest spots to prevent deterministic oscillation
    farEnough.sort((a, b) => b.distFromPointer - a.distFromPointer);
    const topChoices = farEnough.slice(0, 3);
    const chosen = topChoices[Math.floor(Math.random() * topChoices.length)];

    recentSpotIndices.push(chosen.index);
    if (recentSpotIndices.length > 5) recentSpotIndices.shift();

    const targetRelX = chosen.x - cardRect.left;
    const targetRelY = chosen.y - cardRect.top;
    const nextTx = Math.round(targetRelX - dramaSkipOriginRelX);
    const nextTy = Math.round(targetRelY - dramaSkipOriginRelY);
    console.log(`Step ${String(step).padStart(2)}: chosen=${chosen.name.padEnd(16)} (idx=${String(chosen.index).padStart(2)}), tx=${String(nextTx).padStart(4)}, ty=${String(nextTy).padStart(4)}, jumpDist=${chosen.distFromCurrent.toFixed(0)}px`);
    dramaSkipCurrentX = nextTx;
    dramaSkipCurrentY = nextTy;
}
