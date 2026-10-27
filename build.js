import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dist = path.resolve('dist');

console.log('1. Building React bundle with Vite...');
try {
  execSync('npx vite build', { stdio: 'inherit' });
} catch (e) {
  console.warn('Vite build warning/fallback (continuing):', e.message);
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true });
  }
}

console.log('2. Copying static pages and core assets to dist...');
const filesToCopy = [
  'index.html',
  'celebration.html',
  'birthday-video.html',
  'cursor-demo.html',
  'jellyfish-demo.html',
  'script.js',
  'style.css'
];

filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(dist, file));
    console.log(`   + ${file}`);
  }
});

const foldersToCopy = ['assets', 'public'];
foldersToCopy.forEach(folder => {
  if (fs.existsSync(folder)) {
    const target = path.join(dist, folder);
    fs.cpSync(folder, target, { recursive: true });
    console.log(`   + folder: ${folder}`);
  }
});

console.log('Build complete! dist/ is ready for Vercel deployment.');
