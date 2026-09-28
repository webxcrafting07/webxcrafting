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

const KEYWORD_POOL = [
  // Web Development & Design
  "web development company in {city}",
  "best website provider in {city}",
  "website design agency {city}",
  "affordable website design {city}",
  "professional web design {city}",
  "premium web design {city}",
  "cheap website development {city}",
  "fast loading website design {city}",
  "responsive web design {city}",
  "website redesign agency {city}",
  "website audit services {city}",
  "web hosting and maintenance {city}",
  "custom website development {city}",
  "top rated website designers {city}",
  "best freelance web developer {city}",
  "hire web developers {city}",
  "web developers near me {city}",
  "local web designers {city}",
  "website maintenance services {city}",
  "website security services {city}",
  
  // SEO & GMB
  "best google my business gmb setup {city}",
  "gmb ranking expert {city}",
  "google reviews optimization {city}",
  "best seo services {city}",
  "local seo services {city}",
  "google ranking expert {city}",
  "seo optimized website {city}",
  "seo consultant {city}",
  "on page seo expert {city}",
  "technical seo agency {city}",
  "ecommerce seo services {city}",
  "google maps ranking {city}",
  
  // Digital Marketing & Ads
  "digital marketing agency {city}",
  "google ads management {city}",
  "facebook ads expert {city}",
  "social media marketing {city}",
  "ppc management agency {city}",
  "content marketing agency {city}",
  "lead generation website design {city}",
  "digital marketing consultant {city}",
  "online marketing services {city}",
  
  // E-commerce
  "ecommerce development {city}",
  "b2c ecommerce solutions {city}",
  "shopify store design {city}",
  "woocommerce development {city}",
  "custom ecommerce website {city}",
  "ecommerce website builders {city}",
  "multi vendor marketplace development {city}",
  
  // Specific Niche Websites
  "real estate website design {city}",
  "healthcare web developers {city}",
  "restaurant website designers {city}",
  "education portal development {city}",
  "corporate website development {city}",
  "b2b website design {city}",
  "ngo website design {city}",
  "law firm website design {city}",
  "gym website design {city}",
  "travel agency website design {city}",
  "portfolio website design {city}",
  "hotel website developers {city}",
  
  // Software, SaaS & Apps
  "software developers {city}",
  "custom software development {city}",
  "SaaS developers {city}",
  "mobile app development company {city}",
  "android app development {city}",
  "ios app development {city}",
  "react native developers {city}",
  "flutter app development {city}",
  "web application development {city}",
  "custom web portal development {city}",
  "fintech software developers {city}",
  "enterprise software development {city}",
  "startup web development {city}",
  "API integration services {city}",
  "custom cms development {city}",
  
  // Tech Stack Specific
  "react js development {city}",
  "next.js experts {city}",
  "wordpress development {city}",
  "node js developers {city}",
  "python web development {city}",
  "php developers {city}",
  "mern stack developers {city}",
  "full stack developers {city}",
  
  // UI/UX & Agencies
  "top it companies in {city}",
  "top digital agency {city}",
  "ui ux design agency {city}",
  "landing page designers {city}",
  "creative web design {city}",
  "wireframing and prototyping {city}",
  "website mockups {city}",
  "best web development agency {city}"
];

// Helper to get random keywords (returns all 50+ shuffled to avoid exact duplicate strings)
function getRandomKeywords(city: string, state: string, country: string) {
  const shuffled = [...KEYWORD_POOL].sort(() => 0.5 - Math.random());
  return shuffled.map(kw => 
    kw.replace(/{city}/g, city)
      .replace(/{state}/g, state)
      .replace(/{country}/g, country)
  ).join(', ');
}

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
  
  // Hardcode priority cities to ensure they are always first
  const priorityCities = [
    { name: 'Virar', state: 'Maharashtra', country: 'India' },
    { name: 'Bhopal', state: 'Madhya Pradesh', country: 'India' },
    { name: 'Kanpur', state: 'Uttar Pradesh', country: 'India' },
    { name: 'Indore', state: 'Madhya Pradesh', country: 'India' },
    { name: 'Jaipur', state: 'Rajasthan', country: 'India' },
    { name: 'Bangalore', state: 'Karnataka', country: 'India' },
    { name: 'Mumbai', state: 'Maharashtra', country: 'India' },
  ];

  allCities = [...priorityCities, ...allCities];

  let count = 0;

  for (const city of allCities) {
    const slug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (seenSlugs.has(slug) || slug.length < 3) continue;
    seenSlugs.add(slug);

    const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const descTemplate = DESC_TEMPLATES[hash % DESC_TEMPLATES.length];

    const description = descTemplate
      .replace(/{city}/g, city.name)
      .replace(/{state}/g, city.state)
      .replace(/{country}/g, city.country);

    // Give each city all 50+ highly relevant shuffled keywords
    const keywords = getRandomKeywords(city.name, city.state, city.country);

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
