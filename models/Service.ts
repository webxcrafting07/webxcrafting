import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IService extends Document {
  title: string
  description: string
  price: number
  originalPrice?: number
  features: string[]
  popular: boolean
  icon: string
  order: number
  detailedDescription: string
  paymentTerms: string
  additionalCharges: string
  requirements: string[]
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema = new Schema<IService>(
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
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Price cannot be negative'],
    },
    features: {
      type: [String],
      default: [],
    },
    popular: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '🌐',
    },
    order: {
      type: Number,
      default: 0,
    },
    detailedDescription: {
      type: String,
      default: '',
    },
    paymentTerms: {
      type: String,
      default: '50% Advance, 50% after completion',
    },
    additionalCharges: {
      type: String,
      default: 'Domain and Hosting charges are separate.',
    },
    requirements: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)

export default Service
