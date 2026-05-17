const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/logo-wxc.png');
const outputPath = path.join(__dirname, '../lib/logo-base64.ts');

try {
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    const base64String = logoBuffer.toString('base64');
    const fileContent = `// Auto-generated logo base64 data string
export const LOGO_BASE64 = "data:image/png;base64,${base64String}";
`;
    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    console.log('Successfully generated lib/logo-base64.ts');
  } else {
    console.error('Logo file not found at public/logo-wxc.png');
  }
} catch (err) {
  console.error('Failed to generate base64 logo:', err);
}
