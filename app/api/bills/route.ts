import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Bill from '@/models/Bill';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    if (!isAdminAuthenticated(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const bills = await Bill.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bills });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAdminAuthenticated(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectDB();

    // Generate Invoice Number: WXC-YYYY-NNNN
    const year = new Date().getFullYear();
    const count = await Bill.countDocuments({
      createdAt: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
    });

    const invoiceNumber = `WXC-${year}-${(count + 1).toString().padStart(4, '0')}`;

    const bill = await Bill.create({
      ...body,
      invoiceNumber,
      companyName: 'WebXCrafting',
      companyEmail: process.env.SMTP_USER || 'webxcrafting@gmail.com',
      companyPhone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 9102615343',
    });

    return NextResponse.json({ success: true, data: bill });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
