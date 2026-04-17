import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Bill from '@/models/Bill';
import { generateInvoicePDFBuffer } from '@/lib/pdfGenerator';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    
    const bill = await Bill.findById(id);
    if (!bill) {
       return new NextResponse('Bill not found', { status: 404 });
    }

    const pdfBuffer = await generateInvoicePDFBuffer(bill);

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${bill.invoiceNumber}.pdf"`,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
