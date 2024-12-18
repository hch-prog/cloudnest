const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateImages() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/og-image.svg'));
  

  await sharp(svgBuffer)
    .resize(1200, 630)
    .toFile(path.join(__dirname, '../public/og-image.png'));
  
  await sharp(svgBuffer)
    .resize(1200, 630)
    .toFile(path.join(__dirname, '../public/cloudnest.png'));
  
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(path.join(__dirname, '../public/favicon.ico'));
  
  await sharp(svgBuffer)
    .resize(180, 180)
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  
  await sharp(svgBuffer)
    .resize(16, 16)
    .toFile(path.join(__dirname, '../public/favicon-16x16.png'));
  
  console.log('✅ All images generated successfully!');
}

generateImages().catch(console.error);
