import fs from 'fs';
import path from 'path';

const removedCitiesPath = path.resolve(process.cwd(), 'removed_cities.json');
const citiesConfigPath = path.resolve(process.cwd(), 'lib/citiesConfig.ts');

const removedCities = JSON.parse(fs.readFileSync(removedCitiesPath, 'utf-8'));

let configContent = fs.readFileSync(citiesConfigPath, 'utf-8');

// The last line of citiesConfig.ts should be '};'
if (configContent.trim().endsWith('};')) {
  configContent = configContent.substring(0, configContent.lastIndexOf('};'));
  
  // Format city names: "mumbai" -> "Mumbai"
  const capitalize = (s: string) => {
    return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  let additions = '';
  for (const city of removedCities) {
    const formattedName = capitalize(city);
    additions += `  "${city}": {
    "name": "${formattedName}",
    "state": "India",
    "description": "Looking for a top web development company in ${formattedName}? WebXCrafting builds high-performance, responsive business websites, e-commerce stores, and custom software for startups and enterprises in ${formattedName}.",
    "keywords": "web development company in ${city.replace(/-/g, ' ')}, website design agency ${city.replace(/-/g, ' ')}, web developers ${city.replace(/-/g, ' ')}, ecommerce development ${city.replace(/-/g, ' ')}"
  },
`;
  }

  // Remove trailing comma from the last addition if needed, but it's fine inside the object
  configContent += additions + '};\n';
  
  fs.writeFileSync(citiesConfigPath, configContent);
  console.log(`Successfully appended ${removedCities.length} cities to lib/citiesConfig.ts`);
} else {
  console.error("citiesConfig.ts does not end with '};'");
}
