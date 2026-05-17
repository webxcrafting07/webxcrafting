const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-00.i6ugxay.mongodb.net:27017,ac-bkp5zmm-shard-00-01.i6ugxay.mongodb.net:27017,ac-bkp5zmm-shard-00-02.i6ugxay.mongodb.net:27017/webcraft?ssl=true&replicaSet=atlas-bkp5zmm-shard-0&authSource=admin&retryWrites=true&w=majority';

// Define mini-schema for Blog
const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  excerpt: String
}, { collection: 'blogs' });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function findBrokenLinks() {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('SUCCESS: Connected to MongoDB.');

    const blogs = await Blog.find({}).lean();
    console.log(`Retrieved ${blogs.length} blogs. Scanning for suspicious links...`);

    let foundCount = 0;
    for (const blog of blogs) {
      const matchInContent = blog.content.match(/(https?:\/\/[^\s"<>\'\`]+|\/[^\s"<>\'\`]+)/gi);
      const matchInExcerpt = blog.excerpt.match(/(https?:\/\/[^\s"<>\'\`]+|\/[^\s"<>\'\`]+)/gi);
      
      const allLinks = [...(matchInContent || []), ...(matchInExcerpt || [])];
      
      const brokenLinks = allLinks.filter(link => link.includes('$') || link.endsWith('$'));
      
      if (brokenLinks.length > 0) {
        foundCount++;
        console.log(`\n🔴 Found broken link in Blog: "${blog.title}" (${blog.slug})`);
        console.log(`   Broken Links:`, brokenLinks);
        // Print context
        const index = blog.content.indexOf('$');
        if (index !== -1) {
          const contextStart = Math.max(0, index - 60);
          const contextEnd = Math.min(blog.content.length, index + 60);
          console.log(`   Context: "...${blog.content.substring(contextStart, contextEnd)}..."`);
        }
      }
    }

    if (foundCount === 0) {
      console.log('🎉 No blogs with broken "$" links found in content.');
    } else {
      console.log(`\n🔍 Found ${foundCount} blog(s) containing broken links.`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error during debugging:', error);
  }
}

findBrokenLinks();
