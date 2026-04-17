import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  image: string
  liveLink: string
  status: 'completed' | 'ongoing'
  category: 'Business' | 'E-commerce' | 'Job Portal' | 'Custom'
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['completed', 'ongoing'],
      default: 'ongoing',
    },
    category: {
      type: String,
      enum: ['Business', 'E-commerce', 'Job Portal', 'Custom'],
      required: [true, 'Category is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)

export default Project
