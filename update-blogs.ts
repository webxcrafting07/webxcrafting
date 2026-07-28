import mongoose from 'mongoose';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(process.cwd(), '.env.local') });

const BlogSchema = new mongoose.Schema({
  slug: String,
  metaTitle: String,
  metaDescription: String,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function updateBlogs() {
  await mongoose.connect(process.env.MONGODB_URI as string);

  await Blog.updateOne(
    { slug: 'outsourcing-web-development-india-guide' },
    { 
      $set: { 
        metaTitle: "Outsource Web Development India | Premium Offshore Quality",
        metaDescription: "Looking to outsource web development to India? Discover how to hire premium developers without the generic agency headaches. Get a free quote today.",
        title: "Outsource Web Development India | Premium Offshore Quality"
      } 
    }
  );

  await Blog.updateOne(
    { slug: 'progressive-web-apps-pwa-guide' },
    { 
      $set: { 
        metaTitle: "Progressive Web App Development | Build High-Speed PWAs",
        metaDescription: "Learn everything about progressive web apps and progressive web development. Reduce your mobile app development costs by 80% with our expert team.",
        title: "Progressive Web App Development | Build High-Speed PWAs"
      } 
    }
  );

  console.log("Successfully updated SEO metadata for PWA and Outsourcing blogs.");
  process.exit(0);
}

updateBlogs();
