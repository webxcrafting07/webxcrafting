import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { config } from 'dotenv';
config({ path: path.resolve(process.cwd(), '.env.local') });

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
}, { strict: false });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// Keywords to link and their target URLs
const linkMap = [
  { keyword: "web development", url: "/services" },
  { keyword: "e-commerce", url: "/services" },
  { keyword: "Next.js", url: "/" },
  { keyword: "React", url: "/" },
  { keyword: "local SEO", url: "/locations" },
];

async function injectLinks() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI missing");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const blogs = await Blog.find({ status: "published" });
    console.log(`Found ${blogs.length} published blogs.`);

    let totalLinksInjected = 0;

    for (const blog of blogs) {
      let updatedContent = blog.content;
      let injectedCount = 0;

      for (const { keyword, url } of linkMap) {
        // Regex to find the keyword only if it's NOT already inside an <a> tag
        // This is a naive regex but works well enough for seeded content without existing links
        const regex = new RegExp(`(?<!<a[^>]*>\\s*)\\b(${keyword})\\b(?!\\s*<\\/a>)`, "gi");
        
        // Only replace the FIRST occurrence in each blog to avoid link spam
        let replaced = false;
        updatedContent = updatedContent.replace(regex, (match: string) => {
          if (!replaced) {
            replaced = true;
            injectedCount++;
            return `<a href="${url}" style="color: #4f6fff; font-weight: 500; text-decoration: underline;">${match}</a>`;
          }
          return match;
        });
      }

      // Add a powerful CTA at the very end linking to locations if not already there
      if (!updatedContent.includes("Find us in your city")) {
        updatedContent += `
          <div style="margin-top: 40px; padding: 20px; background: rgba(79, 111, 255, 0.1); border-radius: 12px; border: 1px solid rgba(79, 111, 255, 0.2);">
            <h3 style="margin-top: 0; color: #e8eaf6;">Ready to grow your local business?</h3>
            <p style="margin-bottom: 0;">We provide top-tier web development services across India. <a href="/locations" style="color: #4f6fff; font-weight: 700; text-decoration: underline;">Find us in your city</a> and get a free consultation today.</p>
          </div>
        `;
        injectedCount++;
      }

      if (injectedCount > 0) {
        blog.content = updatedContent;
        await blog.save();
        totalLinksInjected += injectedCount;
        console.log(`Updated blog: ${blog.slug} (+${injectedCount} links)`);
      }
    }

    console.log(`Successfully injected ${totalLinksInjected} internal links across the blog database.`);
    process.exit(0);
  } catch (err) {
    console.error("Error injecting links:", err);
    process.exit(1);
  }
}

injectLinks();
