import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { IBill } from '@/models/Bill';

export async function generateInvoicePDFBuffer(bill: any): Promise<Buffer> {
  const doc = new jsPDF();
  
  const charcoal: [number, number, number] = [17, 24, 39]; // Deep Charcoal
  const electricBlue: [number, number, number] = [79, 111, 255]; // Accent Blue
  const softGray: [number, number, number] = [243, 244, 246];
  
  // Background Accent (Subtle Electric Blue Bar)
  doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.rect(0, 0, 8, 297, 'F');
  
  // Header Block
  doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.rect(8, 0, 202, 50, 'F');
  
  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('WebXCrafting', 20, 25);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(162, 89, 255); // Purple accent
  doc.text('PREMIUM DIGITAL SOLUTIONS', 20, 33);
  
  // Invoice Label (Right side of header)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.text('INVOICE', 145, 32);
  
  // Horizontal Line after header
  doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 50, 195, 50);
  
  // --- INFO SECTION (2-Column) ---
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  
  // LEFT: Company Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('FROM:', 20, 65);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('WebXCrafting', 20, 72);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99); // Muted text
  doc.text('webxcrafting@gmail.com', 20, 78);
  doc.text('+91 9102615343 | +91 7974579107', 20, 84);
  doc.text('www.webxcrafting.in', 20, 90);
  
  // RIGHT: Invoice Metadata
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('DETAILS:', 130, 65);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99);
  doc.text(`Invoice Number:`, 130, 72);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.text(`#${bill.invoiceNumber}`, 165, 72);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  doc.text(`Date:`, 130, 78);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.text(`${new Date(bill.createdAt).toLocaleDateString('en-IN')}`, 165, 78);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  doc.text(`Status / UTR:`, 130, 84);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  const statusText = bill.utrNumber ? `${bill.status.toUpperCase()} (${bill.utrNumber})` : bill.status.toUpperCase();
  doc.text(statusText, 165, 84);
  
  // --- CLIENT SECTION ---
  doc.setFillColor(softGray[0], softGray[1], softGray[2]);
  doc.rect(20, 100, 175, 25, 'F');
  
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('BILL TO:', 25, 108);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(bill.clientName, 25, 117);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99);
  doc.text(`${bill.clientEmail}  |  ${bill.clientPhone}`, 85, 117);
  
  // --- TABLE SECTION ---
  const tableData = bill.items.map((item: any) => [
    item.description,
    item.quantity,
    `INR ${item.price.toLocaleString('en-IN')}`,
    `INR ${(item.price * item.quantity).toLocaleString('en-IN')}`
  ]);
  
  (doc as any).autoTable({
    startY: 135,
    margin: { left: 20, right: 15 },
    head: [['DESCRIPTION', 'QTY', 'UNIT PRICE', 'TOTAL']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: charcoal, 
      textColor: [255, 255, 255], 
      fontSize: 10, 
      fontStyle: 'bold',
      halign: 'center',
      cellPadding: 4
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right', fontStyle: 'bold' }
    },
    styles: { 
      fontSize: 10, 
      font: 'helvetica', 
      cellPadding: 4,
      lineColor: [229, 231, 235], // Light border
      lineWidth: 0.1
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    }
  });
  
  // --- FINANCIALS ---
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99);
  
  doc.text(`Subtotal :`, 130, finalY);
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.text(`INR ${(bill.subtotal || 0).toLocaleString('en-IN')}`, 195, finalY, { align: 'right' });
  
  doc.setTextColor(75, 85, 99);
  doc.text(`Discount (${bill.discountPercent || 0}%) :`, 130, finalY + 8);
  doc.setTextColor(255, 0, 0); // Red for discount
  doc.text(`- INR ${(bill.discountAmount || 0).toLocaleString('en-IN')}`, 195, finalY + 8, { align: 'right' });
  
  // Grand Total Box
  doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.rect(125, finalY + 15, 75, 15, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`GRAND TOTAL`, 130, finalY + 25);
  doc.setFontSize(14);
  doc.text(`INR ${(bill.totalAmount || 0).toLocaleString('en-IN')}`, 195, finalY + 25, { align: 'right' });
  
  // --- FOOTER & SIGNATURE ---
  const currentY = (doc as any).lastAutoTable.finalY + 30;
  const footerY = currentY > 230 ? currentY : 240; // Dynamic positioning if content is long
  
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Notes & Terms:', 20, footerY);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99);
  doc.text(bill.notes || '1. Please pay within 7 days. \n2. Bank details will be shared on WhatsApp for payment. \n3. Thank you for your business!', 20, footerY + 6, { maxWidth: 100 });
  
  // Signature Area
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  const signName = bill.generatedBy || 'Authorized Signature';
  doc.text(signName.toUpperCase(), 167, footerY + 12, { align: 'center' }); // Name above line

  // Signature Line
  doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.setLineWidth(0.5);
  doc.line(140, footerY + 15, 195, footerY + 15);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('(Authorized Signatory)', 167, footerY + 20, { align: 'center' });
  
  // Bottom Accent Bar
  doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.rect(8, 285, 202, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('Questions? Contact us on WhatsApp: +91 9102615343 | +91 7974579107   •   www.webxcrafting.in', 35, 292);
  
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
