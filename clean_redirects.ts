import fs from 'fs';
import path from 'path';

const nextConfigPath = path.resolve(process.cwd(), 'next.config.js');
let configContent = fs.readFileSync(nextConfigPath, 'utf-8');

// We know the redirects start at `async redirects() { return [` and end around `]; },`
// We'll replace the redirects function body with an empty array.
const newConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverExternalPackages: ['mongoose'],
  async redirects() {
    return [];
  }
};

module.exports = nextConfig;
`;

fs.writeFileSync(nextConfigPath, newConfig);
console.log("Successfully removed redirects from next.config.js");
