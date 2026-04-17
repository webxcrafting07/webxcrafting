import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Bill from '@/models/Bill';
import { sendInvoiceEmail } from '@/lib/email';
import { isAdminAuthenticated } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isAdminAuthenticated(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const bill = await Bill.findById(id);
    if (!bill) return NextResponse.json({ success: false, message: 'Bill not found' }, { status: 404 });

    const emailSent = await sendInvoiceEmail(bill);

    if (emailSent) {
      bill.status = 'sent';
      await bill.save();
      return NextResponse.json({ success: true, message: 'Invoice email sent successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to send invoice email' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
