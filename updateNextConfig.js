const fs = require('fs');

const removedCities = JSON.parse(fs.readFileSync('removed_cities.json', 'utf-8'));

const hubs = ['north-india', 'south-india', 'east-india', 'west-india'];

const redirects = removedCities.map((city, index) => {
  const hub = hubs[index % 4];
  return {
    source: `/locations/web-development-company-in-${city}`,
    destination: `/locations/web-development-company-in-${hub}`,
    permanent: true,
  };
});

const nextConfigContent = `/** @type {import('next').NextConfig} */
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
    return ${JSON.stringify(redirects, null, 4)};
  }
}

module.exports = nextConfig
`;

fs.writeFileSync('next.config.js', nextConfigContent);
console.log('Successfully updated next.config.js with redirects');
