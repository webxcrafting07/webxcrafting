import fs from 'fs';
import path from 'path';
import { City, State, Country } from 'country-state-city';

// We want to target high-value countries for web development clients.
const TARGET_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'AE', 'SG', 'IN', 'NZ', 'IE', 'ZA'];

// A set of templates to randomize descriptions and make them unique to avoid "doorway pages" penalty
const DESC_TEMPLATES = [
  "Looking for a top web development company in {city}? WebXCrafting builds high-performance, responsive business websites, e-commerce stores, and custom software for startups and enterprises in {city}, {state}, {country}.",
  "Elevate your {city} based business with our premium web development services. At WebXCrafting, we specialize in Next.js, React, and e-commerce solutions tailored for {city}, {state} companies.",
  "WebXCrafting is a leading web design and software development agency serving {city}, {country}. We craft lightning-fast web applications and SEO-optimized sites to help your local business grow.",
  "Need a reliable web developer in {city}? Our team at WebXCrafting delivers custom SaaS platforms, professional landing pages, and scalable digital solutions for the {city}, {state} market.",
  "From stunning corporate websites to complex e-commerce portals, WebXCrafting provides elite web development services in {city}. Join top businesses in {state} who trust our tech expertise."
];

const KEYWORDS_TEMPLATES = [
  "web development company in {city}, website design agency {city}, web developers {city}, ecommerce development {city}, {city} it companies",
  "best web design in {city}, software developers {city}, {city} {country} web agency, custom web apps {city}",
  "hire web developers {city} {state}, top digital agency {city}, next.js developers {city}, react js development {city}",
  "affordable website design {city}, {city} e-commerce experts, local web developers in {city}, SaaS developers {city}"
];

function generateConfig() {
  console.log("Fetching cities...");
  let allCities = [];
  
  for (const countryCode of TARGET_COUNTRIES) {
    const countryObj = Country.getCountryByCode(countryCode);
    if (!countryObj) continue;

    const states = State.getStatesOfCountry(countryCode);
    for (const stateObj of states) {
      const cities = City.getCitiesOfState(countryCode, stateObj.isoCode);
      for (const cityObj of cities) {
        allCities.push({
          name: cityObj.name,
          state: stateObj.name,
          country: countryObj.name,
        });
      }
    }
  }

  // Shuffle and pick 5000 cities
  allCities = allCities.sort(() => 0.5 - Math.random());
  const selectedCities = allCities.slice(0, 5000);

  let configContent = `// Supported cities config dynamically generated for best SEO (5000+ Global Locations)
export interface CityConfig {
  name: string;
  state: string;
  description: string;
  keywords: string;
  country: string;
}

export const CITIES_CONFIG: Record<string, CityConfig> = {
`;

  const seenSlugs = new Set();
  let count = 0;

  for (const city of selectedCities) {
    const slug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Ensure unique slug
    if (seenSlugs.has(slug) || slug.length < 3) continue;
    seenSlugs.add(slug);

    // Randomize templates using a deterministic hash so it doesn't change on every rebuild
    const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const descTemplate = DESC_TEMPLATES[hash % DESC_TEMPLATES.length];
    const kwTemplate = KEYWORDS_TEMPLATES[hash % KEYWORDS_TEMPLATES.length];

    const description = descTemplate
      .replace(/{city}/g, city.name)
      .replace(/{state}/g, city.state)
      .replace(/{country}/g, city.country);

    const keywords = kwTemplate
      .replace(/{city}/g, city.name)
      .replace(/{state}/g, city.state)
      .replace(/{country}/g, city.country);

    configContent += `  '${slug}': {
    name: '${city.name.replace(/'/g, "\\'")}',
    state: '${city.state.replace(/'/g, "\\'")}',
    country: '${city.country.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    keywords: '${keywords.replace(/'/g, "\\'")}'
  },
`;
    count++;
    if (count >= 100) break;
  }

  configContent += `};\n`;

  const outputPath = path.join(__dirname, '..', 'lib', 'citiesConfig.ts');
  fs.writeFileSync(outputPath, configContent);
  console.log("Successfully generated lib/citiesConfig.ts with " + count + " unique global locations.");
}

generateConfig();
