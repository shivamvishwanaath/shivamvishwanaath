import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Simple CRC32 implementation
function makeCRCTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  return crcTable;
}

const crcTable = makeCRCTable();

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function writeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const toCrc = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const c = crc32(toCrc);
  chunk.writeUInt32BE(c, 8 + len);
  return chunk;
}

function createPng(width, height, drawFn) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = writeChunk('IHDR', ihdrData);

  // Raw image scanlines
  const rowBytes = width * 4;
  const rawData = Buffer.alloc((1 + rowBytes) * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + rowBytes);
    rawData[rowOffset] = 0; // Filter byte 0 (None)
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const idatCompressed = zlib.deflateSync(rawData);
  const idatChunk = writeChunk('IDAT', idatCompressed);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Brand SVG-like drawing: Dark background, glowing red border, SV monogram shape
function drawBrandBadge(x, y, width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 1;
  const dist = Math.hypot(x - cx, y - cy);

  // Rounded squircle / box
  const pad = width * 0.08;
  const insideBox = x >= pad && x <= width - pad && y >= pad && y <= height - pad;

  // Outer border check
  const onBorder = insideBox && (
    x <= pad + width * 0.08 || x >= width - pad - width * 0.08 ||
    y <= pad + height * 0.08 || y >= height - pad - height * 0.08
  );

  // Center 'S' and 'V' lettermark simplified geometry
  const nx = (x - pad) / (width - 2 * pad);
  const ny = (y - pad) / (height - 2 * pad);

  // 'S' on left half (0.15 - 0.48)
  const isS = (
    (nx >= 0.18 && nx <= 0.45 && ny >= 0.22 && ny <= 0.32) || // top bar
    (nx >= 0.18 && nx <= 0.28 && ny >= 0.22 && ny <= 0.52) || // top left vert
    (nx >= 0.18 && nx <= 0.45 && ny >= 0.46 && ny <= 0.56) || // mid bar
    (nx >= 0.35 && nx <= 0.45 && ny >= 0.50 && ny <= 0.78) || // bot right vert
    (nx >= 0.18 && nx <= 0.45 && ny >= 0.70 && ny <= 0.80)    // bot bar
  );

  // 'V' on right half (0.52 - 0.85)
  const vLeft = Math.abs(ny - (nx - 0.52) / 0.18 * 0.58 - 0.22) < 0.10 && nx >= 0.52 && nx <= 0.70;
  const vRight = Math.abs(ny - (0.88 - nx) / 0.18 * 0.58 - 0.22) < 0.10 && nx >= 0.68 && nx <= 0.88;
  const isV = (vLeft || vRight) && ny >= 0.22 && ny <= 0.80;

  if (isS || isV) {
    return [255, 255, 255, 255]; // Crisp white text
  }

  if (onBorder) {
    return [239, 68, 68, 255]; // Red border #ef4444
  }

  if (insideBox) {
    return [15, 15, 15, 255]; // Deep dark graphite background #0f0f0f
  }

  return [0, 0, 0, 0]; // Transparent outside
}

// Simple ICO generator from 16x16 and 32x32 PNGs
function createIco(png16, png32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type
  header.writeUInt16LE(2, 4); // 2 images

  const dirEntry1 = Buffer.alloc(16);
  dirEntry1.writeUInt8(16, 0); // width
  dirEntry1.writeUInt8(16, 1); // height
  dirEntry1.writeUInt8(0, 2);  // color count
  dirEntry1.writeUInt8(0, 3);  // reserved
  dirEntry1.writeUInt16LE(1, 4); // color planes
  dirEntry1.writeUInt16LE(32, 6); // bpp
  dirEntry1.writeUInt32LE(png16.length, 8); // size
  dirEntry1.writeUInt32LE(6 + 16 * 2, 12); // offset

  const dirEntry2 = Buffer.alloc(16);
  dirEntry2.writeUInt8(32, 0); // width
  dirEntry2.writeUInt8(32, 1); // height
  dirEntry2.writeUInt8(0, 2);  // color count
  dirEntry2.writeUInt8(0, 3);  // reserved
  dirEntry2.writeUInt16LE(1, 4); // color planes
  dirEntry2.writeUInt16LE(32, 6); // bpp
  dirEntry2.writeUInt32LE(png32.length, 8); // size
  dirEntry2.writeUInt32LE(6 + 16 * 2 + png16.length, 12); // offset

  return Buffer.concat([header, dirEntry1, dirEntry2, png16, png32]);
}

const publicDir = path.resolve('public');

const png16 = createPng(16, 16, drawBrandBadge);
const png32 = createPng(32, 32, drawBrandBadge);
const png180 = createPng(180, 180, drawBrandBadge);
const png192 = createPng(192, 192, drawBrandBadge);
const png512 = createPng(512, 512, drawBrandBadge);
const ico = createIco(png16, png32);

fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

console.log('✅ Generated lightweight high-performance favicons:');
console.log('favicon-16x16.png:', png16.length, 'bytes');
console.log('favicon-32x32.png:', png32.length, 'bytes');
console.log('apple-touch-icon.png:', png180.length, 'bytes');
console.log('android-chrome-192x192.png:', png192.length, 'bytes');
console.log('android-chrome-512x512.png:', png512.length, 'bytes');
console.log('favicon.ico:', ico.length, 'bytes');
