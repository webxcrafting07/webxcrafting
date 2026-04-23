require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Blog = mongoose.model('Blog', new mongoose.Schema({
    title: String, publishDate: Date, status: String
  }))

  const blogs = await Blog.find({}).select('title publishDate').sort({ publishDate: 1 }).limit(3).lean()
  blogs.forEach(b => console.log(b.publishDate?.toISOString(), '|', b.title))

  console.log('\nNow (UTC):', new Date().toISOString())

  const count = await Blog.countDocuments({
    status: 'published',
    publishDate: { $lte: new Date() }
  })
  console.log('Blogs that pass filter:', count)

  const all = await Blog.countDocuments({ status: 'published' })
  console.log('Total published blogs:', all)

  await mongoose.disconnect()
})
