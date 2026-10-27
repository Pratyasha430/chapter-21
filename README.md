# Chapter 21 — Grand Birthday Celebration ୨୧

A curated, interactive birthday website celebrating chapter 21.

## 🌸 Pages & Highlights
- **Index (`/` / `index.html`)**: Interactive Lockscreen & Passkey Verification (`2910`), Tic-Tac-Toe minigame, Surprise Reveal Boxes, Birthday Cake with mic-interactive candle blowing, and custom audio player.
- **Grand Celebration (`/celebration.html`)**: Ambient fluttering cherry blossom snowfall, on-demand Blossom Shower button, interactive starlight fireworks, vintage vinyl music player, and sweet scrapbook polaroid.
- **Scrapbook & Memory Lane (`/birthday-video.html`)**: Cinematic scrapbook memory cards, floating charms, and musical journey.
- **Interactive Demos**: Deep sea bioluminescence (`jellyfish-demo.html`) and stardust coquette ribbon cursor (`cursor-demo.html`).

---

## 🚀 How to Deploy on Vercel

### Option 1: Deploy with GitHub (Recommended & Easiest)
1. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Under **"Import Git Repository"**, find and select **`Pratyasha430/chapter-21`**.
4. In the Project Configuration:
   - **Framework Preset**: Leave as **Other** (configured automatically via `vercel.json`).
   - **Root Directory**: `./` (leave default).
   - **Build and Output Settings**: Leave empty / default (`vercel.json` already sets build command to `null` and output to `.`).
5. Click **"Deploy"**.
6. In **5–10 seconds**, your website will be live at `https://chapter-21.vercel.app` (or your custom domain)!

### Option 2: Deploy via Vercel CLI
If you have Node.js and Vercel CLI installed:
```bash
npm i -g vercel
vercel
```
Follow the prompt instructions (defaults are pre-configured in `vercel.json`).

---

## 🛠 Tech Stack
- **Languages**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Graphics & Physics**: HTML5 Canvas 2D API (Cherry Blossom & Sakura Shower, Starlight Fireworks, Stardust Cursor)
- **Audio**: Web Audio API (real-time chime & sound synthesis) + HTML5 `<audio>` media streaming
- **Styling**: Pure custom CSS (Glassmorphism, Coquette & Pinterest aesthetic, responsive layouts)
- **Hosting Configuration**: `vercel.json` for instant zero-build static deployment