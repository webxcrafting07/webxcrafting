// Main runner: combines all blog parts and seeds the database
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) { console.error('❌ MONGODB_URI not found in .env.local'); process.exit(1) }

const BlogSchema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true }, excerpt: String, content: String,
  category: String, tags: [String], coverImage: { type: String, default: '' },
  author: { type: String, default: 'WebXCrafting' },
  status: { type: String, default: 'published' }, readTime: Number,
  metaTitle: String, metaDescription: String,
  featured: { type: Boolean, default: false },
  publishDate: Date,
}, { timestamps: true })

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)

// Helper to calculate read time from HTML content
function calcReadTime(html) {
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

async function seed() {
  console.log('🔗 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected!\n')

  // Load all article parts
  const { blogs: part1 } = require('./seed-blogs')
  const part2 = require('./seed-blogs-2')
  const part3 = require('./seed-blogs-3')
  const part4 = require('./seed-blogs-4')

  const allBlogs = [...part1, ...part2, ...part3, ...part4]

  console.log(`📝 Seeding ${allBlogs.length} blog posts...\n`)

  // Add calculated readTime and defaults
  for (const blog of allBlogs) {
    blog.readTime = calcReadTime(blog.content)
    blog.status = blog.status || 'published'
    blog.author = blog.author || 'WebXCrafting'
    blog.featured = blog.featured || false
  }

  // Clear existing blogs
  const existing = await Blog.countDocuments()
  if (existing > 0) {
    console.log(`🗑️  Removing ${existing} existing blog posts...`)
    await Blog.deleteMany({})
  }

  // Insert all blogs
  const result = await Blog.insertMany(allBlogs)
  console.log(`✅ Successfully inserted ${result.length} blog posts!\n`)

  // Print schedule
  console.log('📅 Publishing Schedule:')
  console.log('─'.repeat(70))
  for (const blog of result) {
    const date = new Date(blog.publishDate).toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    })
    const isPast = new Date(blog.publishDate) <= new Date()
    const marker = isPast ? '✅ LIVE' : '⏰ SCHEDULED'
    console.log(`  ${marker}  ${date}  →  ${blog.title}`)
  }
  console.log('─'.repeat(70))
  console.log(`\n🎉 Done! Visit /blog to see your published posts.\n`)

  await mongoose.disconnect()
}

seed().catch((err) => { console.error('❌ Error:', err); process.exit(1) })
