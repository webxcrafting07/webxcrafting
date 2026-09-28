import fs from 'fs';
import path from 'path';

function publishNextCities() {
  const dataDir = path.join(__dirname, '..', 'data');
  const allCitiesPath = path.join(dataDir, 'all_cities.json');
  const statePath = path.join(dataDir, 'publish_state.json');
  const outputPath = path.join(__dirname, '..', 'lib', 'citiesConfig.ts');

  if (!fs.existsSync(allCitiesPath) || !fs.existsSync(statePath)) {
    console.error("Database files missing. Please run setup-master-cities.ts first.");
    process.exit(1);
  }

  const allCities = JSON.parse(fs.readFileSync(allCitiesPath, 'utf8'));
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));

  // Increment the published count by 100
  const NEW_LIMIT = Math.min(state.publishedCount + 100, allCities.length);
  
  if (state.publishedCount >= allCities.length) {
    console.log("All cities have already been published.");
    process.exit(0);
  }

  const citiesToPublish = allCities.slice(0, NEW_LIMIT);

  let configContent = `// Supported cities config dynamically generated for best SEO (Auto Drip-Published)
export interface CityConfig {
  name: string;
  state: string;
  description: string;
  keywords: string;
  country: string;
}

export const CITIES_CONFIG: Record<string, CityConfig> = {
`;

  for (const city of citiesToPublish) {
    const slug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    configContent += `  '${slug}': {
    name: '${city.name.replace(/'/g, "\\'")}',
    state: '${city.state.replace(/'/g, "\\'")}',
    country: '${city.country.replace(/'/g, "\\'")}',
    description: '${city.description.replace(/'/g, "\\'")}',
    keywords: '${city.keywords.replace(/'/g, "\\'")}'
  },
`;
  }

  configContent += `};\n`;

  // Write new config
  fs.writeFileSync(outputPath, configContent);

  // Update state
  state.publishedCount = NEW_LIMIT;
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

  console.log("Successfully updated citiesConfig.ts. Total published cities: " + NEW_LIMIT);
}

publishNextCities();
