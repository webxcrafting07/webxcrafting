/**
 * WebXCrafting - Google Instant Indexing API Script
 * ------------------------------------------------
 * This script allows you to request Google to instantly crawl and index
 * your new or updated website pages using the official Google Indexing API.
 * 
 * Requirements:
 * 1. service-account.json in the project root folder.
 * 2. The Service Account email must have "Owner" permissions in Google Search Console for your website property.
 * 
 * Usage:
 * - Single URL: node scripts/google-instant-indexing.js https://www.webxcrafting.in/about
 * - Bulk (Sitemap): node scripts/google-instant-indexing.js sitemap
 */

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Load configurations
const envUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webxcrafting.in';
const baseUrl = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
const credsFile = path.join(__dirname, '..', 'service-account.json');

// Guide to generate credentials if missing
if (!fs.existsSync(credsFile)) {
  console.log("\n=================================================================================");
  console.log("❌ ERROR: service-account.json NOT FOUND!");
  console.log("=================================================================================");
  console.log("To use Google Instant Indexing, please follow these steps to get your JSON key:");
  console.log("\n1. Go to Google Cloud Console (https://console.cloud.google.com).");
  console.log("2. Create a new project or select your existing project.");
  console.log("3. Enable the 'Web Search Indexing API' in the API Library.");
  console.log("4. Go to 'APIs & Services' > 'Credentials'.");
  console.log("5. Click 'Create Credentials' > 'Service Account'.");
  console.log("6. Give it a name, role as 'Owner' or 'Editor', and complete the setup.");
  console.log("7. Click on your newly created Service Account, go to the 'Keys' tab.");
  console.log("8. Click 'Add Key' > 'Create New Key' > Select 'JSON' > Click 'Create'.");
  console.log("9. Rename the downloaded file to 'service-account.json' and place it in:");
  console.log(`   ${path.resolve(__dirname, '..')}`);
  console.log("\n10. IMPORTANT: Copy the Service Account email (e.g. your-name@project.iam.gserviceaccount.com).");
  console.log("11. Go to Google Search Console (https://search.google.com/search-console).");
  console.log("12. Select your website property, go to 'Settings' > 'Users and Permissions'.");
  console.log("13. Click 'Add User', paste the Service Account email, set permission to 'Owner'.");
  console.log("=================================================================================\n");
  process.exit(1);
}

const creds = JSON.parse(fs.readFileSync(credsFile, 'utf8'));

// Helper to get Google OAuth Access Token
async function getAccessToken() {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const payload = {
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: iat,
    exp: exp
  };

  console.log("🔑 Authenticating with Google OAuth...");
  // Sign the JWT (JSON Web Token) with the RS256 algorithm and the Service Account's private key
  const token = jwt.sign(payload, creds.private_key, { algorithm: 'RS256' });

  // Request the OAuth 2.0 access token
  const response = await axios.post('https://oauth2.googleapis.com/token', 
    new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token
    }).toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return response.data.access_token;
}

// Request indexation for a single URL
async function indexUrl(url, accessToken) {
  const cleanUrl = url.trim();
  console.log(`🚀 Requesting instant indexing for: ${cleanUrl}`);
  
  try {
    const response = await axios.post(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        url: cleanUrl,
        type: 'URL_UPDATED' // Google API supports URL_UPDATED (for new/updated pages) or URL_DELETED
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    console.log(`✅ Success! Google received the request for ${cleanUrl}.`);
    console.log(`ℹ️ Response Status: ${response.status} - ${response.statusText}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to index ${cleanUrl}:`, error.response ? error.response.data : error.message);
    return false;
  }
}

// Extract URLs from Sitemap
async function getUrlsFromSitemap() {
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  console.log(`🌐 Fetching sitemap from: ${sitemapUrl}`);
  
  try {
    const response = await axios.get(sitemapUrl);
    const xml = response.data;
    
    // Extract using regex to avoid external dependency issues
    const urls = [];
    const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1]);
    }
    
    return urls;
  } catch (error) {
    console.error("❌ Failed to fetch/parse sitemap.xml. Ensure the website is running locally (if checking local sitemap) or live:", error.message);
    return [];
  }
}

// Main Execution
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("\n💡 USAGE:");
    console.log("  For a single page:  node scripts/google-instant-indexing.js <url>");
    console.log("  For all sitemap URLs: node scripts/google-instant-indexing.js sitemap");
    console.log("\nExample:");
    console.log("  node scripts/google-instant-indexing.js https://www.webxcrafting.in/services");
    console.log("  node scripts/google-instant-indexing.js sitemap\n");
    process.exit(0);
  }

  const target = args[0];

  try {
    const accessToken = await getAccessToken();
    console.log("🔓 Access Token obtained successfully!\n");

    if (target.toLowerCase() === 'sitemap') {
      const urls = await getUrlsFromSitemap();
      if (urls.length === 0) {
        console.log("⚠️ No URLs found to index. Check if your sitemap has items.");
        return;
      }
      
      console.log(`📬 Found ${urls.length} URLs in sitemap. Starting bulk submit...`);
      let successCount = 0;
      
      // Google has quota limits (typically 200 per day for normal sites), so we submit sequentially
      for (const url of urls) {
        // Wait 1 second between requests to respect Google limits and prevent rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        const ok = await indexUrl(url, accessToken);
        if (ok) successCount++;
      }
      
      console.log(`\n🎉 Bulk indexing complete! Submitted ${successCount}/${urls.length} URLs successfully.`);
    } else {
      if (!target.startsWith('http')) {
        console.error("❌ Invalid URL. The URL must start with http:// or https://");
        process.exit(1);
      }
      await indexUrl(target, accessToken);
    }
  } catch (error) {
    console.error("💥 Fatal error during indexation process:", error.message);
  }
}

main();
