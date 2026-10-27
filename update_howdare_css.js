import fs from 'fs';

const cssPath = 'style.css';
let s = fs.readFileSync(cssPath, 'utf8');

const p1 = s.indexOf('/* =========================================================\n   HOW DARE YOU PAGE');
const p2 = s.indexOf('/* =========================================\n   HEY, I HAVE A SURPRISE PAGE');

if (p1 === -1 || p2 === -1) {
    console.error('Markers not found! p1:', p1, 'p2:', p2);
    process.exit(1);
}

const replacement = `/* =========================================================
   HOW DARE YOU PAGE  –  PINTEREST CHEER RED & COMIC MAKEOVER
   Playful response when "No" is clicked on the Hey Page
   ========================================================= */

#howDarePage {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000002;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: radial-gradient(ellipse at 50% 20%, #fffdfc 0%, #fff0f3 35%, #ffd6df 70%, #ffb3c1 100%);
}

#howDarePage.active {
    display: flex;
    animation: darePageAppear 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes darePageAppear {
    0% {
        opacity: 0;
        transform: scale(0.96);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* Ambient Cheer Red Aurora & Soft Mist */
.dare-aurora {
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(ellipse 65% 55% at 50% 15%, rgba(217, 4, 41, 0.14) 0%, transparent 68%),
        radial-gradient(ellipse 60% 50% at 15% 75%, rgba(255, 77, 109, 0.16) 0%, transparent 65%),
        radial-gradient(ellipse 55% 45% at 85% 65%, rgba(239, 35, 60, 0.12) 0%, transparent 60%),
        radial-gradient(ellipse 70% 60% at 50% 95%, rgba(247, 220, 229, 0.45) 0%, transparent 75%);
    z-index: 0;
    animation: dareAuroraPulse 8s ease-in-out infinite alternate;
}

@keyframes dareAuroraPulse {
    0% { filter: hue-rotate(0deg); opacity: 0.9; }
    50% { filter: hue-rotate(8deg); opacity: 1.05; }
    100% { filter: hue-rotate(-8deg); opacity: 0.92; }
}

/* Film Grain & Scrapbook Dot Texture */
.dare-grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: 
        radial-gradient(rgba(217, 4, 41, 0.08) 1.2px, transparent 0),
        radial-gradient(rgba(198, 90, 120, 0.06) 1px, transparent 0);
    background-size: 28px 28px, 14px 14px;
    opacity: 0.65;
    z-index: 1;
}

/* Main Scrapbook Plaque Card */
.how-dare-card {
    position: relative;
    z-index: 15;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 36px;
    padding: 48px 42px 38px;
    text-align: center;
    max-width: 580px;
    width: 100%;
    margin: auto;
    box-shadow: 
        0 24px 60px rgba(164, 19, 60, 0.16),
        0 0 35px rgba(255, 77, 109, 0.18),
        inset 0 0 0 1.5px rgba(255, 255, 255, 0.95);
    border: 2px dashed rgba(217, 4, 41, 0.42);
    animation: dareCardBounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both, dareCardFloat 4.5s ease-in-out 0.8s infinite alternate;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.how-dare-card:hover {
    transform: translateY(-4px) rotate(-0.5deg);
    box-shadow: 
        0 28px 70px rgba(164, 19, 60, 0.22),
        0 0 45px rgba(255, 77, 109, 0.25),
        inset 0 0 0 1.5px rgba(255, 255, 255, 1);
}

@keyframes dareCardBounce {
    0% { opacity: 0; transform: translateY(45px) scale(0.9); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes dareCardFloat {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-8px) rotate(0.4deg); }
}

/* Washi Tape Details */
.dare-washi {
    position: absolute;
    top: -14px;
    width: 105px;
    height: 28px;
    background: linear-gradient(135deg, rgba(217, 4, 41, 0.88), rgba(255, 77, 109, 0.82));
    backdrop-filter: blur(4px);
    border-radius: 3px;
    box-shadow: 0 4px 14px rgba(164, 19, 60, 0.22);
    border-left: 2px dashed rgba(255, 255, 255, 0.8);
    border-right: 2px dashed rgba(255, 255, 255, 0.8);
    z-index: 20;
}
.washi-top-left { left: 45px; transform: rotate(-4deg); }
.washi-top-right { right: 45px; transform: rotate(3deg); background: linear-gradient(135deg, rgba(164, 19, 60, 0.88), rgba(217, 4, 41, 0.82)); }

.dare-ribbon-badge {
    position: absolute;
    top: 16px;
    right: 22px;
    font-size: 14px;
    font-weight: 700;
    color: #d90429;
    background: rgba(217, 4, 41, 0.08);
    border: 1px solid rgba(217, 4, 41, 0.28);
    padding: 3px 12px;
    border-radius: 20px;
    filter: drop-shadow(0 2px 8px rgba(217, 4, 41, 0.25));
    animation: gentleSway 3s ease-in-out infinite alternate;
}

/* Angry Puppy Stage & Animations */
.angry-puppy-stage {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto 18px;
}

.angry-puppy-frame {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    background: #ffffff;
    border: 6px solid #ffffff;
    box-shadow: 
        0 14px 35px rgba(217, 4, 41, 0.28),
        0 0 25px rgba(255, 77, 109, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: puppyTantrum 3.2s ease-in-out infinite;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.angry-puppy-frame:hover {
    transform: scale(1.1) rotate(6deg);
}

@keyframes puppyTantrum {
    0%, 100% { transform: rotate(0deg) scale(1); }
    15%      { transform: rotate(-6deg) scale(1.04) translateY(-4px); }
    30%      { transform: rotate(6deg) scale(1.02) translateY(-2px); }
    45%      { transform: rotate(-5deg) scale(1.05) translateY(-5px); }
    60%      { transform: rotate(4deg) scale(1.01) translateY(-1px); }
    75%      { transform: rotate(-2deg) scale(1.03) translateY(-3px); }
}

.angry-puppy-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* Comic Steam and Sweat Animations */
.puppy-steam-cloud {
    position: absolute;
    pointer-events: none;
    user-select: none;
    z-index: 5;
}

.steam-left {
    left: -20px;
    top: 8px;
    font-size: 30px;
    animation: steamPuffLeft 2.2s ease-in-out infinite;
}

.steam-right {
    right: -20px;
    top: 6px;
    font-size: 26px;
    animation: steamPuffRight 2.2s ease-in-out 0.6s infinite;
}

@keyframes steamPuffLeft {
    0%   { opacity: 0; transform: translate(0, 0) scale(0.6) rotate(0deg); }
    40%  { opacity: 0.95; transform: translate(-14px, -16px) scale(1.15) rotate(-15deg); }
    100% { opacity: 0; transform: translate(-26px, -32px) scale(1.4) rotate(-30deg); }
}

@keyframes steamPuffRight {
    0%   { opacity: 0; transform: translate(0, 0) scale(0.6) rotate(0deg); }
    40%  { opacity: 0.95; transform: translate(14px, -16px) scale(1.15) rotate(15deg); }
    100% { opacity: 0; transform: translate(26px, -32px) scale(1.4) rotate(30deg); }
}

.puppy-anger-sweat {
    position: absolute;
    right: 4px;
    bottom: 24px;
    font-size: 24px;
    pointer-events: none;
    animation: sweatDrop 1.8s ease-in-out infinite;
}

@keyframes sweatDrop {
    0%, 100% { transform: translateY(0); opacity: 0.9; }
    50%      { transform: translateY(8px) scale(1.1); opacity: 1; }
}

/* Eyebrow Label */
.dare-eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #a4133c;
    background: rgba(217, 4, 41, 0.08);
    border: 1px solid rgba(217, 4, 41, 0.28);
    border-radius: 20px;
    padding: 5px 18px;
    margin-bottom: 10px;
}

/* Title & Animated Knife */
.how-dare-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2.8rem, 6vw, 3.8rem);
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: 2px;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #7a0c1e 0%, #c91838 40%, #d90429 70%, #ff4d6d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 12px rgba(201, 24, 74, 0.25));
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    animation: dareTitleShake 4s ease-in-out infinite;
}

@keyframes dareTitleShake {
    0%, 100% { transform: rotate(0deg); }
    92%      { transform: rotate(-1.5deg); }
    94%      { transform: rotate(1.5deg); }
    96%      { transform: rotate(-1.5deg); }
    98%      { transform: rotate(1.5deg); }
}

.knife-symbol {
    display: inline-block;
    font-size: clamp(2.4rem, 5vw, 3.2rem);
    transform-origin: center bottom;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
    animation: knifeStab 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
    cursor: pointer;
}

@keyframes knifeStab {
    0%, 100% { transform: rotate(-12deg) scale(1); }
    35%      { transform: rotate(-38deg) scale(1.22) translate(-4px, -6px); }
    50%      { transform: rotate(-8deg) scale(1.05); }
    65%      { transform: rotate(-25deg) scale(1.12); }
}

/* Subtext & Plea */
.dare-subtext {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.1rem, 2.2vw, 1.25rem);
    font-weight: 600;
    color: #4c2633;
    margin-bottom: 6px;
}

.dare-subtext strong {
    color: #d90429;
    font-weight: 800;
}

.dare-plea {
    font-family: 'Caveat', cursive;
    font-size: clamp(1.35rem, 2.5vw, 1.6rem);
    font-weight: 700;
    color: #c9184a;
    margin-bottom: 14px;
}

.dare-middle-symbols {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    font-size: 18px;
    color: #ff4d6d;
    margin-bottom: 22px;
}

.dare-middle-symbols span {
    animation: gentleBob 2.5s ease-in-out infinite alternate;
}
.dare-middle-symbols span:nth-child(2) { animation-delay: 0.3s; }
.dare-middle-symbols span:nth-child(3) { animation-delay: 0.6s; }
.dare-middle-symbols span:nth-child(4) { animation-delay: 0.9s; }
.dare-middle-symbols span:nth-child(5) { animation-delay: 1.2s; }

@keyframes gentleBob {
    0% { transform: translateY(0); }
    100% { transform: translateY(-6px); }
}

/* GO BACK BUTTON – LUXURY CHEER RED HEARTBEAT PILL */
#howDarePage .go-back-button {
    font-family: 'Outfit', sans-serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 16px 36px;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    white-space: nowrap;
    background: linear-gradient(135deg, #a4133c 0%, #d90429 50%, #ef233c 100%);
    color: #ffffff;
    box-shadow: 
        0 10px 25px rgba(217, 4, 41, 0.42),
        0 0 15px rgba(255, 77, 109, 0.3);
    animation: goBackHeartbeat 2.2s ease-in-out infinite;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes goBackHeartbeat {
    0%, 100% { transform: scale(1); box-shadow: 0 10px 25px rgba(217, 4, 41, 0.42), 0 0 15px rgba(255, 77, 109, 0.3); }
    30%      { transform: scale(1.05); box-shadow: 0 14px 35px rgba(217, 4, 41, 0.6), 0 0 24px rgba(255, 77, 109, 0.5); }
    45%      { transform: scale(1.02); }
    60%      { transform: scale(1.04); box-shadow: 0 12px 30px rgba(217, 4, 41, 0.5), 0 0 20px rgba(255, 77, 109, 0.4); }
}

#howDarePage .go-back-button:hover {
    transform: translateY(-4px) scale(1.06);
    box-shadow: 
        0 16px 40px rgba(217, 4, 41, 0.65),
        0 0 30px rgba(255, 77, 109, 0.6);
}

#howDarePage .go-back-button:active {
    transform: translateY(-1px) scale(0.99);
}

.dare-bottom-note {
    font-family: 'Caveat', cursive;
    font-size: 15px;
    color: #a4133c;
    margin-top: 14px;
}

/* Floating Comic Background Decos */
#howDarePage .dare-deco {
    position: fixed;
    z-index: 3;
    pointer-events: none;
    animation: heyFloatDeco 6s ease-in-out infinite;
    color: #ff758f;
    opacity: 0.75;
    user-select: none;
    text-shadow: 0 0 10px rgba(217, 4, 41, 0.25);
}

#howDarePage .dare-star-1   { font-size: 1.5rem; top:  8%; left:  7%; animation-delay: 0s; color: #ffd700; }
#howDarePage .dare-star-2   { font-size: 1.1rem; top: 18%; right: 9%; animation-delay: 1.4s; color: #ffb703; }
#howDarePage .dare-heart-1  { font-size: 1.9rem; top: 78%; left:  6%; animation-delay: 0.8s; }
#howDarePage .dare-heart-2  { font-size: 1.8rem; top: 22%; left:  12%; animation-delay: 2.2s; }
#howDarePage .dare-heart-3  { font-size: 1.6rem; top: 84%; right: 14%; animation-delay: 1.7s; color: #d90429; }
#howDarePage .dare-paw-1    { font-size: 1.6rem; top: 48%; left:  4%; animation-delay: 1.1s; }
#howDarePage .dare-paw-2    { font-size: 1.7rem; top: 52%; right: 5%; animation-delay: 2.8s; }
#howDarePage .dare-sparkle-1{ font-size: 1.5rem; top: 32%; right: 11%; animation-delay: 0.5s; color: #ffd700; }
#howDarePage .dare-sparkle-2{ font-size: 1.4rem; bottom: 12%; left: 16%; animation-delay: 2s; color: #ffd700; }
#howDarePage .dare-angry-1  { font-size: 2rem; top: 12%; right: 18%; animation-delay: 0.3s; }
#howDarePage .dare-angry-2  { font-size: 1.8rem; bottom: 20%; left: 8%; animation-delay: 1.5s; }
#howDarePage .dare-smoke-1  { font-size: 2rem; top: 68%; right: 8%; animation-delay: 1.9s; }
#howDarePage .dare-bow      { font-size: 1.8rem; bottom: 6%; right: 48%; animation-delay: 2.4s; color: #d90429; }

/* Responsive Adjustments for Mobile & Tablets */
@media (max-width: 650px) {
    .how-dare-card {
        padding: 38px 24px 30px;
    }
    .angry-puppy-stage {
        width: 140px;
        height: 140px;
        margin-bottom: 12px;
    }
    .angry-puppy-frame {
        width: 140px;
        height: 140px;
        border-width: 4px;
    }
    .how-dare-title {
        font-size: 2.2rem;
    }
    .knife-symbol {
        font-size: 2rem;
    }
    #howDarePage .go-back-button {
        font-size: 15px;
        padding: 14px 24px;
        white-space: normal;
    }
}

`;

s = s.slice(0, p1) + replacement + s.slice(p2);
fs.writeFileSync(cssPath, s, 'utf8');
console.log('Successfully updated howDarePage CSS in style.css');
