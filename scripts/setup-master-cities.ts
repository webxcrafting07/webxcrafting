import fs from 'fs';
import path from 'path';
import { City, State, Country } from 'country-state-city';

const TARGET_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'AE', 'SG', 'IN', 'NZ', 'IE', 'ZA'];

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

function generateMasterDatabase() {
  console.log("Fetching global cities...");
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

  // Shuffle cities randomly
  allCities = allCities.sort(() => 0.5 - Math.random());
  
  const selectedCities: Record<string, any> = {};
  const seenSlugs = new Set();
  let count = 0;

  for (const city of allCities) {
    const slug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (seenSlugs.has(slug) || slug.length < 3) continue;
    seenSlugs.add(slug);

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

    selectedCities[slug] = {
      name: city.name,
      state: city.state,
      country: city.country,
      description,
      keywords
    };
    
    count++;
    if (count >= 5000) break;
  }

  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  // Save the master database of 5000 cities
  fs.writeFileSync(
    path.join(dataDir, 'all_cities.json'), 
    JSON.stringify(Object.values(selectedCities), null, 2)
  );

  // Initialize state with first 100 cities
  fs.writeFileSync(
    path.join(dataDir, 'publish_state.json'),
    JSON.stringify({ publishedCount: 100 }, null, 2)
  );

  console.log("Successfully generated data/all_cities.json with " + count + " global locations.");
}

generateMasterDatabase();
