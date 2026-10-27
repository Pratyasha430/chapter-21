// Test mobile and desktop
function runSimulation(label, cardRect, cutRect, winW, winH) {
    console.log(`\n=== ${label} (${winW}x${winH}) ===`);
    const btnW = 120, btnH = 42;
    let dramaSkipRecentSpots = [];
    let dramaSkipCurrentSpotIdx = -1;
    let currScreenX = cardRect.left + (cardRect.width - btnW)/2;
    let currScreenY = cutRect.top;

    function checkOverlapWithCut(screenLeft, screenTop, w, h, cutR) {
        const margin = 8;
        return !(
            screenLeft + w < cutR.left - margin ||
            screenLeft > cutR.right + margin ||
            screenTop + h < cutR.top - margin ||
            screenTop > cutR.bottom + margin
        );
    }

    function findSpot(pointerX, pointerY) {
        const pad = 12;
        const minX = Math.max(pad, cardRect.left + pad);
        const maxX = Math.min(winW - btnW - pad, cardRect.right - btnW - pad);
        const minY = Math.max(pad + 10, cardRect.top + 25);
        const maxY = Math.min(winH - btnH - pad, cardRect.bottom - btnH - 18);

        const destinations = [
            { name: "top-left",      zone: "top-left",     x: cardRect.left + 20,                        y: cardRect.top + 32 },
            { name: "top-right",     zone: "top-right",    x: cardRect.right - btnW - 20,                y: cardRect.top + 32 },
            { name: "top-center",    zone: "top",          x: cardRect.left + (cardRect.width - btnW)/2, y: cardRect.top + 24 },
            { name: "upper-left",    zone: "left",         x: cardRect.left + 16,                        y: cardRect.top + cardRect.height * 0.22 },
            { name: "upper-right",   zone: "right",        x: cardRect.right - btnW - 16,                y: cardRect.top + cardRect.height * 0.22 },
            { name: "mid-left",      zone: "left",         x: cardRect.left + 16,                        y: cardRect.top + cardRect.height * 0.42 },
            { name: "mid-right",     zone: "right",        x: cardRect.right - btnW - 16,                y: cardRect.top + cardRect.height * 0.42 },
            { name: "flank-left",    zone: "left",         x: cardRect.left + 16,                        y: cutRect.top },
            { name: "flank-right",   zone: "right",        x: cardRect.right - btnW - 16,                y: cutRect.top },
            { name: "above-cut",     zone: "center",       x: cutRect.left + (cutRect.width - btnW) / 2, y: cutRect.top - btnH - 26 },
            { name: "bottom-left",   zone: "bottom-left",  x: cardRect.left + 20,                        y: cardRect.bottom - btnH - 22 },
            { name: "bottom-right",  zone: "bottom-right", x: cardRect.right - btnW - 20,                y: cardRect.bottom - btnH - 22 },
            { name: "bottom-center", zone: "bottom",       x: cardRect.left + (cardRect.width - btnW)/2, y: cardRect.bottom - btnH - 18 }
        ];

        const validSpots = destinations.map((d, index) => {
            const jitterX = (Math.random() - 0.5) * 16;
            const jitterY = (Math.random() - 0.5) * 14;
            let x = Math.max(minX, Math.min(maxX, d.x + jitterX));
            let y = Math.max(minY, Math.min(maxY, d.y + jitterY));

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

        // Anti-repeat: Exclude last 5 visited spots
        let candidates = validSpots.filter(s => !dramaSkipRecentSpots.includes(s.index));

        // Must be away from pointer and current spot
        let farSpots = candidates.filter(s => s.distFromPointer >= 95 && s.distFromCurrent >= 85);
        if (farSpots.length === 0) {
            farSpots = candidates.filter(s => s.distFromCurrent >= 70);
        }
        if (farSpots.length === 0) {
            farSpots = validSpots.filter(s => s.index !== dramaSkipCurrentSpotIdx);
        }

        // Sort by distFromPointer descending
        farSpots.sort((a, b) => b.distFromPointer - a.distFromPointer);
        const topChoices = farSpots.slice(0, Math.min(3, farSpots.length));
        const chosen = topChoices[Math.floor(Math.random() * topChoices.length)];

        dramaSkipRecentSpots.push(chosen.index);
        if (dramaSkipRecentSpots.length > 5) dramaSkipRecentSpots.shift();
        dramaSkipCurrentSpotIdx = chosen.index;
        currScreenX = chosen.x;
        currScreenY = chosen.y;
        return chosen;
    }

    for (let i = 0; i < 12; i++) {
        const spot = findSpot(currScreenX + 50, currScreenY + 20);
        console.log(`Jump #${String(i+1).padStart(2)}: -> ${spot.name.padEnd(14)} (${spot.zone.padEnd(12)}) at (${Math.round(spot.x)}, ${Math.round(spot.y)}) dist=${Math.round(spot.distFromCurrent)}px`);
    }
}

// 1. Desktop
runSimulation("Desktop", { left: 200, right: 760, top: 60, bottom: 840, width: 560, height: 780 }, { left: 330, right: 630, top: 620, bottom: 680, width: 300, height: 60 }, 1200, 900);

// 2. Mobile
runSimulation("Mobile (iPhone)", { left: 16, right: 374, top: 30, bottom: 790, width: 358, height: 760 }, { left: 45, right: 345, top: 600, bottom: 660, width: 300, height: 60 }, 390, 844);
