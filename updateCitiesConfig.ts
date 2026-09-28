import fs from 'fs';
import path from 'path';
import { CITIES_CONFIG, CityConfig } from './lib/citiesConfig';

const retainedKeys = [
  'ongole', 'theni', 'paramakudi', 'bhiwadi', 'virar', 
  'gurgaon', 'faizabad', 'ballari', 'hoshiarpur', 'kottarakkara', 'bhopal'
];

const removedKeys = Object.keys(CITIES_CONFIG).filter(k => !retainedKeys.includes(k));
fs.writeFileSync('removed_cities.json', JSON.stringify(removedKeys, null, 2));

const newConfig: Record<string, CityConfig> = {};

retainedKeys.forEach(k => {
  if (CITIES_CONFIG[k]) {
    newConfig[k] = CITIES_CONFIG[k];
  }
});

newConfig['north-india'] = {
  name: 'North India',
  state: 'North India',
  description: 'Looking for a top web development company in North India? WebXCrafting builds high-performance business websites and software for enterprises across the region.',
  keywords: 'web development company north india, website design agency north india, ecommerce development north india',
  country: 'India'
};
newConfig['south-india'] = {
  name: 'South India',
  state: 'South India',
  description: 'Top web development agency in South India. We specialize in custom web apps, scalable e-commerce solutions, and digital marketing.',
  keywords: 'web development company south india, website design agency south india, top it companies south india',
  country: 'India'
};
newConfig['east-india'] = {
  name: 'East India',
  state: 'East India',
  description: 'Affordable web development services in East India. Get professional UI/UX design and fast-loading web applications.',
  keywords: 'web development company east india, web developers east india',
  country: 'India'
};
newConfig['west-india'] = {
  name: 'West India',
  state: 'West India',
  description: 'Premium web and mobile app development in West India. We deliver high-quality digital solutions tailored for startups.',
  keywords: 'web development company west india, website design agency west india',
  country: 'India'
};

const output = `// Supported cities config dynamically generated for best SEO
export interface CityConfig {
  name: string;
  state: string;
  description: string;
  keywords: string;
  country: string;
}

export const CITIES_CONFIG: Record<string, CityConfig> = ${JSON.stringify(newConfig, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'lib/citiesConfig.ts'), output);
console.log('Successfully updated lib/citiesConfig.ts');
