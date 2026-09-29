const fs = require('fs');

const darkB64 = fs.readFileSync('public/images/logo-dark.webp').toString('base64');
const whiteB64 = fs.readFileSync('public/images/logo-white.webp').toString('base64');

const svgDark = `<svg viewBox="0 0 1039 472" fill="none" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/webp;base64,${darkB64}" width="1039" height="472" />
</svg>`;

const svgWhite = `<svg viewBox="0 0 1039 472" fill="none" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/webp;base64,${whiteB64}" width="1039" height="472" />
</svg>`;

const faviconSvg = `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="110" fill="#090D1A" />
  <g transform="translate(56, 168) scale(0.385)">
    <image href="data:image/webp;base64,${whiteB64}" width="1039" height="472" />
  </g>
</svg>`;

fs.writeFileSync('public/images/logo-dark.svg', svgDark);
fs.writeFileSync('public/images/logo-white.svg', svgWhite);
fs.writeFileSync('public/favicon.svg', faviconSvg);
console.log('SVG files generated successfully!');
