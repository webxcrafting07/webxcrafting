import mongoose, { Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IAdmin extends Document {
  email: string
  password: string
  comparePassword(candidate: string): Promise<boolean>
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
)

// Hash password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
AdminSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password)
}

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)

export default Admin
