import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBill extends Document {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  notes?: string;
  generatedBy?: string;
  utrNumber?: string;
  status: 'draft' | 'sent' | 'paid';
  createdAt: Date;
  updatedAt: Date;
}

const BillSchema: Schema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    companyName: { type: String, default: 'WebXCrafting' },
    companyEmail: { type: String, required: true },
    companyPhone: { type: String, required: true },
    items: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    notes: { type: String },
    generatedBy: { type: String, default: 'WebXCrafting' },
    utrNumber: { type: String },
    status: {
      type: String,
      enum: ['draft', 'sent', 'paid'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

const Bill: Model<IBill> = mongoose.models.Bill || mongoose.model<IBill>('Bill', BillSchema);

export default Bill;
// Schema version: 1.1 (Added generatedBy)
