import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage: string
  author: string
  status: 'draft' | 'published'
  readTime: number
  metaTitle: string
  metaDescription: string
  featured: boolean
  publishDate: Date
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'WebXCrafting',
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    readTime: {
      type: Number,
      default: 5,
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title should be under 70 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description should be under 160 characters'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

// Auto-generate slug from title if not provided
BlogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  // Auto-calculate read time from content (~200 words/min)
  if (this.content) {
    const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    this.readTime = Math.max(1, Math.ceil(wordCount / 200))
  }
  next()
})

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)

export default Blog
