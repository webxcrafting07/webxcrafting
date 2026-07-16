import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BlogSchema = new mongoose.Schema({
  title: String,
  coverImage: String,
}, { strict: false });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function updateImages() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const blogs = await Blog.find({});
    let updatedCount = 0;

    for (const blog of blogs) {
      // Set the cover image to dynamically use the OG image generator with the blog's title
      const newImageUrl = `/api/og?title=${encodeURIComponent(blog.title)}`;
      
      // Update if it has the default image or if we just want to force update all of them
      blog.coverImage = newImageUrl;
      await blog.save();
      updatedCount++;
      console.log(`Updated coverImage for: ${blog.title}`);
    }

    console.log(`Successfully updated ${updatedCount} blogs with dynamic OG images!`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating blogs:", error);
    process.exit(1);
  }
}

updateImages();
