import { mkdir, copyFile, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE_URL = 'https://charitics.temptics.com';

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function copy(src, dest) {
  await ensureDir(dirname(dest));
  await copyFile(src, dest);
}

async function download(url, dest) {
  await ensureDir(dirname(dest));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  await pipeline(response.body, createWriteStream(dest));
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function copyVendors() {
  const vendors = [
  ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'assets/vendor/bootstrap/bootstrap.min.css'],
  ['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'assets/vendor/bootstrap/bootstrap.bundle.min.js'],
  ['node_modules/@splidejs/splide/dist/css/splide.min.css', 'assets/vendor/splide/splide.min.css'],
  ['node_modules/@splidejs/splide/dist/js/splide.min.js', 'assets/vendor/splide/splide.min.js'],
  ['node_modules/@splidejs/splide-extension-auto-scroll/dist/js/splide-extension-auto-scroll.min.js', 'assets/vendor/splide/splide-extension-auto-scroll.min.js'],
  ['node_modules/swiper/swiper-bundle.min.css', 'assets/vendor/swiper/swiper-bundle.min.css'],
  ['node_modules/swiper/swiper-bundle.min.js', 'assets/vendor/swiper/swiper-bundle.min.js'],
  ['node_modules/slim-select/dist/slimselect.css', 'assets/vendor/slim-select/slimselect.css'],
  ['node_modules/slim-select/dist/slimselect.min.js', 'assets/vendor/slim-select/slimselect.min.js'],
  ['node_modules/animate.css/animate.min.css', 'assets/vendor/animate-wow/animate.min.css'],
  ['node_modules/wow.js/dist/wow.min.js', 'assets/vendor/animate-wow/wow.min.js'],
  ['node_modules/split-type/umd/index.min.js', 'assets/vendor/splittype/index.min.js'],
  ['node_modules/mixitup/dist/mixitup.min.js', 'assets/vendor/mixitup/mixitup.min.js'],
  ['node_modules/fslightbox/index.js', 'assets/vendor/fslightbox/fslightbox.js'],
  ['node_modules/flatpickr/dist/flatpickr.min.css', 'assets/vendor/flatpickr/flatpickr.min.css'],
  ['node_modules/flatpickr/dist/flatpickr.min.js', 'assets/vendor/flatpickr/flatpickr.js'],
  ];

  for (const [src, dest] of vendors) {
    const srcPath = join(ROOT, src);
    const destPath = join(ROOT, dest);
    if (await fileExists(srcPath)) {
      await copy(srcPath, destPath);
      console.log(`Copied: ${dest}`);
    } else {
      console.warn(`Missing npm package file: ${src}`);
    }
  }
}

async function downloadRemoteAssets() {
  const remoteFiles = [
    'assets/css/style.css',
    'assets/icon/flaticon_charitics.css',
    'assets/js/main.js',
    'assets/js/tab.js',
    'assets/js/accordion.js',
    'assets/js/progressbar.js',
    'assets/js/donate-form.js',
    'assets/img/logo.svg',
    'assets/img/logo-white.svg',
    'assets/img/user-1.png',
    'assets/img/user-2.png',
    'assets/img/user-3.png',
    'assets/img/vector-img.png',
    'assets/img/banner-img.png',
    'assets/img/banner-img-vector-1.png',
    'assets/img/banner-img-vector-2.png',
    'assets/img/about-img.png',
    'assets/img/about-img-vector-1.svg',
    'assets/img/about-img-vector-2.svg',
    'assets/img/about-block-img.jpg',
    'assets/img/about-vector-1.png',
    'assets/img/donation-1.jpg',
    'assets/img/donation-2.jpg',
    'assets/img/donation-3.jpg',
    'assets/img/donation-4.jpg',
    'assets/img/donate-form-vector.svg',
    'assets/img/event-img.jpg',
    'assets/img/blog-b-1.jpg',
    'assets/img/blog-2.jpg',
    'assets/img/blog-b-3.jpg',
    'assets/img/events-vector-1.png',
    'assets/img/events-vector-2.svg',
    'assets/img/why-join.jpg',
    'assets/img/member-1.jpg',
    'assets/img/member-2.jpg',
    'assets/img/member-3.jpg',
    'assets/img/member-4.jpg',
    'assets/img/blog-1.jpg',
    'assets/img/blog-3.jpg',
    'assets/img/gallery-item-1.png',
    'assets/img/gallery-item-2.png',
    'assets/img/gallery-item-3.png',
    'assets/img/gallery-item-4.png',
    'assets/img/gallery-item-5.png',
    'assets/img/gallery-item-6.png',
    'assets/img/footer-vector-img.png',
    'assets/img/breadcrumb-bg.jpg',
    'assets/img/banner-bg-shape.svg',
    'assets/img/about-block-icon-bg.svg',
    'assets/img/donations-bg.png',
    'assets/img/donations-bg-img.jpg',
    'assets/img/donate-form-wrapper-bg.png',
    'assets/img/donate-form-bg.jpg',
    'assets/img/stats-events-bg-shape.svg',
    'assets/img/stat-bg.png',
    'assets/img/cta-bg.jpg',
    'assets/img/volunteer-bg-1.jpg',
    'assets/img/donate-form-2-bg.jpg',
    'assets/img/service-bg.png',
    'assets/img/quote-icon.svg',
    'assets/img/quote-icon-white.svg',
    'assets/icon/flaticon_charitics.woff2',
    'assets/icon/flaticon_charitics.woff',
    'assets/icon/flaticon_charitics.eot',
    'assets/icon/flaticon_charitics.ttf',
    'assets/icon/flaticon_charitics.svg',
  ];

  for (const file of remoteFiles) {
    const dest = join(ROOT, file);
    if (await fileExists(dest)) {
      console.log(`Already exists: ${file}`);
      continue;
    }
    try {
      await download(`${BASE_URL}/${file}`, dest);
      console.log(`Downloaded: ${file}`);
    } catch (error) {
      console.warn(`Could not download ${file}: ${error.message}`);
    }
  }

  // Download flaticon font files referenced in CSS
  const iconCssPath = join(ROOT, 'assets/icon/flaticon_charitics.css');
  if (await fileExists(iconCssPath)) {
    const { readFile } = await import('node:fs/promises');
    const css = await readFile(iconCssPath, 'utf8');
    const fontMatches = [...css.matchAll(/url\(['"]?\.\/([^'")?#]+)/g)];
    for (const [, fontFile] of fontMatches) {
      const dest = join(ROOT, 'assets/icon', fontFile);
      if (!(await fileExists(dest))) {
        try {
          await download(`${BASE_URL}/assets/icon/${fontFile}`, dest);
          console.log(`Downloaded font: assets/icon/${fontFile}`);
        } catch (error) {
          console.warn(`Could not download font assets/icon/${fontFile}: ${error.message}`);
        }
      }
    }
  }
}

async function main() {
  console.log('Setting up charitics assets...\n');
  await copyVendors();
  console.log('');
  await downloadRemoteAssets();
  console.log('\nSetup complete!');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
