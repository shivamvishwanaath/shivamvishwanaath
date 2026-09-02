/**
 * Generates optimized social/hero images from the master portrait PNG:
 *   public/images/shivam-vishwanaath-og.jpg   (1200x630, for link previews / JSON-LD)
 *   public/images/shivam-vishwanaath.webp     (hero source, replaces heavy PNG usage)
 *
 * Usage: node scripts/generate-og.mjs
 */
import sharp from 'sharp';
import path from 'path';

const imagesDir = path.resolve('public', 'images');
const src = path.join(imagesDir, 'shivam-vishwanaath.png');

const ogInfo = await sharp(src)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(imagesDir, 'shivam-vishwanaath-og.jpg'));

const webpInfo = await sharp(src)
  .webp({ quality: 82 })
  .toFile(path.join(imagesDir, 'shivam-vishwanaath.webp'));

console.log('OG image :', ogInfo.width + 'x' + ogInfo.height, (ogInfo.size / 1024).toFixed(0) + ' KB');
console.log('Hero WebP:', webpInfo.width + 'x' + webpInfo.height, (webpInfo.size / 1024).toFixed(0) + ' KB');
