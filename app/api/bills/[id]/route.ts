import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Bill from '@/models/Bill';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isAdminAuthenticated(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const bill = await Bill.findById(id);
    if (!bill) return NextResponse.json({ success: false, message: 'Bill not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: bill });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isAdminAuthenticated(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectDB();
    const bill = await Bill.findByIdAndUpdate(id, body, { new: true });
    if (!bill) return NextResponse.json({ success: false, message: 'Bill not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: bill });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isAdminAuthenticated(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const bill = await Bill.findByIdAndDelete(id);
    if (!bill) return NextResponse.json({ success: false, message: 'Bill not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Bill deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
