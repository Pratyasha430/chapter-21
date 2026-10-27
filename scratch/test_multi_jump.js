const cardRect = { left: 100, right: 600, top: 100, bottom: 800, width: 500, height: 700 };
const cutRect = { left: 200, right: 400, top: 500, bottom: 550, width: 200, height: 50 };
const winW = 800, winH = 900;
let dramaSkipOriginRelX = 320, dramaSkipOriginRelY = 400;
let dramaSkipCurrentX = 0, dramaSkipCurrentY = 0;
let recentSpotIndices = [];

for (let step = 0; step < 16; step++) {
    const pointerX = 420 + dramaSkipCurrentX;
    const pointerY = 500 + dramaSkipCurrentY;
    const currScreenX = 420 + dramaSkipCurrentX;
    const currScreenY = 500 + dramaSkipCurrentY;
    const btnW = 120, btnH = 42;
    const pad = 16;
    const minX = Math.max(pad, cardRect.left + pad);
    const maxX = Math.min(winW - btnW - pad, cardRect.right - btnW - pad);
    const minY = Math.max(pad + 10, cardRect.top + 60);
    const maxY = Math.min(winH - btnH - pad, cardRect.bottom - btnH - pad);

    // 10 diverse spots all around the card
    const destinations = [
        { name: "far-left-mid",     x: cardRect.left + 20, y: cutRect.top },
        { name: "top-right",        x: cardRect.right - btnW - 20, y: cardRect.top + 70 },
        { name: "bottom-left",      x: cardRect.left + 20, y: cardRect.bottom - btnH - 30 },
        { name: "top-left",         x: cardRect.left + 20, y: cardRect.top + 70 },
        { name: "far-right-mid",    x: cardRect.right - btnW - 20, y: cutRect.top },
        { name: "bottom-right",     x: cardRect.right - btnW - 20, y: cardRect.bottom - btnH - 30 },
        { name: "above-cut",        x: cutRect.left + (cutRect.width - btnW) / 2, y: cutRect.top - btnH - 35 },
        { name: "bottom-center",    x: cutRect.left + (cutRect.width - btnW) / 2, y: cardRect.bottom - btnH - 24 },
        { name: "mid-upper-left",   x: cardRect.left + 35, y: cardRect.top + 200 },
        { name: "mid-upper-right",  x: cardRect.right - btnW - 35, y: cardRect.top + 200 }
    ];

    const validSpots = destinations.map((d, index) => {
        // Add random jitter +- 18px
        const jitterX = (Math.random() - 0.5) * 30;
        const jitterY = (Math.random() - 0.5) * 24;
        let x = Math.max(minX, Math.min(maxX, d.x + jitterX));
        let y = Math.max(minY, Math.min(maxY, d.y + jitterY));

        const distFromCurrent = Math.hypot(x - currScreenX, y - currScreenY);
        const distFromPointer = Math.hypot(x + btnW / 2 - pointerX, y + btnH / 2 - pointerY);
        return { index, name: d.name, x, y, distFromCurrent, distFromPointer };
    });

    // Exclude recent spots (last 4 visited)
    let candidateSpots = validSpots.filter(s => !recentSpotIndices.includes(s.index));

    // Filter by distance from pointer
    let farEnough = candidateSpots.filter(s => s.distFromPointer >= 120 && s.distFromCurrent >= 90);
    if (farEnough.length === 0) {
        farEnough = candidateSpots.filter(s => s.distFromCurrent >= 70);
    }
    if (farEnough.length === 0) {
        farEnough = validSpots.filter(s => !recentSpotIndices.slice(-2).includes(s.index));
    }

    // Pick randomly among top 3 furthest from pointer to avoid deterministic ping-pong
    farEnough.sort((a, b) => b.distFromPointer - a.distFromPointer);
    const topChoices = farEnough.slice(0, 3);
    const chosen = topChoices[Math.floor(Math.random() * topChoices.length)];

    recentSpotIndices.push(chosen.index);
    if (recentSpotIndices.length > 4) recentSpotIndices.shift();

    const targetRelX = chosen.x - cardRect.left;
    const targetRelY = chosen.y - cardRect.top;
    const nextTx = Math.round(targetRelX - dramaSkipOriginRelX);
    const nextTy = Math.round(targetRelY - dramaSkipOriginRelY);
    console.log(`Step ${step}: chosen=${chosen.name.padEnd(16)} (idx=${chosen.index}), nextTx=${String(nextTx).padStart(4)}, nextTy=${String(nextTy).padStart(4)}, distCurrent=${chosen.distFromCurrent.toFixed(0)}px`);
    dramaSkipCurrentX = nextTx;
    dramaSkipCurrentY = nextTy;
}
