const cardRect = { left: 100, right: 600, top: 100, bottom: 800, width: 500, height: 700 };
const cutRect = { left: 200, right: 400, top: 500, bottom: 550, width: 200, height: 50 };
const winW = 800, winH = 900;
let dramaSkipOriginRelX = 320, dramaSkipOriginRelY = 400;
let dramaSkipCurrentX = 0, dramaSkipCurrentY = 0;
let dramaSkipCurrentSpotIdx = -1;

for (let step = 0; step < 8; step++) {
    const pointerX = 420 + dramaSkipCurrentX;
    const pointerY = 500 + dramaSkipCurrentY;
    const currScreenX = 420 + dramaSkipCurrentX;
    const currScreenY = 500 + dramaSkipCurrentY;
    const btnW = 120, btnH = 42;
    const pad = 14;
    const minX = Math.max(pad, cardRect.left + pad);
    const maxX = Math.min(winW - btnW - pad, cardRect.right - btnW - pad);
    const minY = Math.max(pad + 10, cardRect.top + 60);
    const maxY = Math.min(winH - btnH - pad, cardRect.bottom - btnH - pad);

    const destinations = [
        { name: "left-side",    x: cardRect.left + 16, y: cutRect.top },
        { name: "top-right",    x: cardRect.right - btnW - 16, y: cutRect.top - btnH - 24 },
        { name: "bottom-left",  x: cardRect.left + 16, y: cutRect.bottom + 18 },
        { name: "top-left",     x: cardRect.left + 16, y: cutRect.top - btnH - 24 },
        { name: "right-side",   x: cardRect.right - btnW - 16, y: cutRect.top },
        { name: "bottom-right", x: cardRect.right - btnW - 16, y: cutRect.bottom + 18 },
        { name: "above-cut",    x: cutRect.left + (cutRect.width - btnW) / 2, y: cutRect.top - btnH - 24 },
        { name: "below-cut",    x: cutRect.left + (cutRect.width - btnW) / 2, y: cutRect.bottom + 20 }
    ];

    const validSpots = destinations.map((d, index) => {
        let x = Math.max(minX, Math.min(maxX, d.x));
        let y = Math.max(minY, Math.min(maxY, d.y));
        const distFromCurrent = Math.hypot(x - currScreenX, y - currScreenY);
        const distFromPointer = Math.hypot(x + btnW / 2 - pointerX, y + btnH / 2 - pointerY);
        return { index, name: d.name, x, y, distFromCurrent, distFromPointer };
    });

    let farSpots = validSpots.filter(s => s.distFromCurrent >= 110 && s.index !== dramaSkipCurrentSpotIdx);
    farSpots.sort((a, b) => b.distFromPointer - a.distFromPointer);
    const chosen = farSpots[0] || validSpots[0];
    dramaSkipCurrentSpotIdx = chosen.index;
    const targetRelX = chosen.x - cardRect.left;
    const targetRelY = chosen.y - cardRect.top;
    const nextTx = Math.round(targetRelX - dramaSkipOriginRelX);
    const nextTy = Math.round(targetRelY - dramaSkipOriginRelY);
    console.log(`Step ${step}: chosen=${chosen.name}, nextTx=${nextTx}, nextTy=${nextTy}, distFromCurrent=${chosen.distFromCurrent.toFixed(1)}`);
    dramaSkipCurrentX = nextTx;
    dramaSkipCurrentY = nextTy;
}
