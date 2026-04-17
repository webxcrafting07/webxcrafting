import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILead extends Document {
  name: string
  email: string
  budget: string
  message: string
  status: 'new' | 'contacted' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    budget: {
      type: String,
      default: 'Not specified',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
)

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)

export default Lead
