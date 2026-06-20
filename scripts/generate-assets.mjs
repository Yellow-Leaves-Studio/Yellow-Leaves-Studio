/**
 * Generates favicon set, app icons, OG images, and the press-kit zip from
 * the panda mascot SVGs in src/brand/. Run after changing brand art:
 * `npm run assets`. Outputs are committed (not built per-deploy).
 */
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import satori from 'satori';
import pngToIco from 'png-to-ico';

const require = createRequire(import.meta.url);
const exec = promisify(execFile);

const CREAM = '#fff8e2';
const INK = '#2f2a24';
const INK_SOFT = '#8a8174';
const YELLOW = '#ffc83d';

const fullSvg = await readFile('src/brand/mascot-panda.svg');
const faceSvg = await readFile('src/brand/mascot-panda-face.svg');

await mkdir('public/og', { recursive: true });
await rm('public/press', { recursive: true, force: true });
const kit = 'public/press/yellow-leaves-studio-press-kit';
await mkdir(kit, { recursive: true });

// --- Favicons & icons (from the panda face) ---
await cp('src/brand/mascot-panda-face.svg', 'public/favicon.svg');

const facePng = (size, pad = 0) =>
  sharp(faceSvg, { density: 300 })
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: 'transparent' })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: 'transparent' })
    .png()
    .toBuffer();

await writeFile('public/favicon.ico', await pngToIco([await facePng(16), await facePng(32), await facePng(48)]));
await writeFile('public/apple-touch-icon.png', await sharp(await facePng(180, 16)).flatten({ background: CREAM }).png().toBuffer());
await writeFile('public/icon-512.png', await sharp(await facePng(512, 46)).flatten({ background: CREAM }).png().toBuffer());

// --- OG images ---
const fontFile = (p) => readFile(require.resolve(p));
const fonts = [
  { name: 'Baloo 2', data: await fontFile('@fontsource/baloo-2/files/baloo-2-latin-800-normal.woff'), weight: 800, style: 'normal' },
  { name: 'Nunito', data: await fontFile('@fontsource/nunito/files/nunito-latin-400-normal.woff'), weight: 400, style: 'normal' },
];

const mascotPng = await sharp(fullSvg, { density: 300 }).resize(380, 291, { fit: 'contain', background: 'transparent' }).png().toBuffer();
const mascotUri = `data:image/png;base64,${mascotPng.toString('base64')}`;

const el = (type, style, children, extra = {}) => ({ type, props: { style, children, ...extra } });

async function og(file, title, subtitle, titleSize = 62) {
  const tree = el('div', { width: 1200, height: 630, display: 'flex', backgroundColor: CREAM, padding: 72, alignItems: 'center' }, [
    el('div', { display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 40 }, [
      el('div', { fontFamily: 'Nunito', fontSize: 26, color: INK_SOFT, letterSpacing: 2 }, 'YELLOW LEAVES STUDIO'),
      el('div', { fontFamily: 'Baloo 2', fontSize: titleSize, color: INK, lineHeight: 1.05, marginTop: 22 }, title),
      el('div', { width: 120, height: 12, backgroundColor: YELLOW, borderRadius: 6, marginTop: 30 }, undefined),
      el('div', { fontFamily: 'Nunito', fontSize: 29, color: INK_SOFT, marginTop: 26, lineHeight: 1.4 }, subtitle),
    ]),
    el('img', { width: 380, height: 291 }, undefined, { src: mascotUri, width: 380, height: 291 }),
  ]);
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  await writeFile(file, await sharp(Buffer.from(svg)).png().toBuffer());
}

await og('public/og/default.png', 'cute games & apps, made with care.', 'A cozy indie studio — maker of Leave Smart.', 58);
await og('public/og/leave-smart.png', 'Leave Smart', 'Smart location-based reminders for iPhone — free on the App Store.');
await og('public/og/about.png', 'About the studio', 'A tiny studio with a cozy name.');
await og('public/og/press.png', 'Press kit', 'Logos, facts, and panda stickers.');

// --- Press kit ---
await cp('src/brand/mascot-panda.svg', `${kit}/mascot.svg`);
await cp('src/brand/mascot-panda-face.svg', `${kit}/mark.svg`);
await writeFile(`${kit}/mascot-1024.png`, await sharp(fullSvg, { density: 300 }).resize(1024, 786, { fit: 'contain', background: 'transparent' }).png().toBuffer());
await writeFile(`${kit}/mark-1024.png`, await sharp(faceSvg, { density: 300 }).resize(1024, 1024, { fit: 'contain', background: 'transparent' }).png().toBuffer());
await exec('zip', ['-r', '-X', 'yellow-leaves-studio-press-kit.zip', 'yellow-leaves-studio-press-kit'], { cwd: 'public/press' });

console.log('Assets generated.');
