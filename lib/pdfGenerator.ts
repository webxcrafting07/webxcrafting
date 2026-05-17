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

export async function generateProposalPDFBuffer(lead: { name: string; email: string; budget?: string; message: string }): Promise<Buffer> {
  const doc = new jsPDF();
  
  const charcoal: [number, number, number] = [17, 24, 39]; // Deep Charcoal
  const electricBlue: [number, number, number] = [79, 111, 255]; // Accent Blue
  const softGray: [number, number, number] = [243, 244, 246];
  
  // Background Accent Stripe
  doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.rect(0, 0, 8, 297, 'F');
  
  // Header Block
  doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.rect(8, 0, 202, 50, 'F');
  
  // Custom geometric Logo icon (interlocking tech block)
  doc.setFillColor(79, 111, 255);
  doc.rect(20, 15, 10, 10, 'F');
  doc.setFillColor(162, 89, 255);
  doc.rect(25, 20, 10, 10, 'F');
  
  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('WebXCrafting', 42, 24);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(162, 89, 255);
  doc.text('PREMIUM CUSTOM WEB DEVELOPMENT & SEO', 42, 32);
  
  // Title (Right side of header banner)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PROJECT PROPOSAL', 130, 25);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(156, 163, 175);
  doc.text('Custom Estimate & Scope', 130, 32);
  
  // Horizontal line
  doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 50, 195, 50);
  
  // --- CLIENT DETAILS SECTION ---
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PREPARED FOR:', 20, 65);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.text(lead.name, 20, 72);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99);
  doc.text(`Email: ${lead.email}`, 20, 78);
  
  // Extracted WhatsApp/Phone if available in message
  let phone = 'Not specified';
  const phoneMatch = lead.message.match(/Client Phone:\s*([^\n]+)/i);
  if (phoneMatch) {
    phone = phoneMatch[1].trim();
  } else {
    const whatsappMatch = lead.message.match(/WhatsApp Number:\s*([^\n]+)/i);
    if (whatsappMatch) phone = whatsappMatch[1].trim();
  }
  doc.text(`Contact: ${phone}`, 20, 84);
  
  // Proposal Meta
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('PROPOSAL DETAILS:', 120, 65);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99);
  doc.text(`Proposal Ref: #WXC-${Math.floor(100000 + Math.random() * 900000)}`, 120, 72);
  doc.text(`Date Generated: ${new Date().toLocaleDateString('en-IN')}`, 120, 78);
  doc.text(`Valid Until: 30 Days from date`, 120, 84);
  
  // Divider
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.2);
  doc.line(20, 92, 195, 92);
  
  // --- SPECIFICATIONS / MESSAGE SECTION ---
  const lines = lead.message.split('\n');
  const specs: any[] = [];
  
  for (const line of lines) {
    if (line.startsWith('- ')) {
      const cleanLine = line.substring(2).trim();
      const colonIdx = cleanLine.indexOf(':');
      if (colonIdx !== -1) {
        const item = cleanLine.substring(0, colonIdx).trim();
        const value = cleanLine.substring(colonIdx + 1).trim();
        specs.push([item, value]);
      } else {
        specs.push([cleanLine, 'Selected']);
      }
    }
  }
  
  let currentY = 100;
  
  if (specs.length > 0) {
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('PROJECT SPECIFICATIONS & ITEMIZATION', 20, 102);
    
    (doc as any).autoTable({
      startY: 108,
      margin: { left: 20, right: 15 },
      head: [['ITEM SPECIFICATION CATEGORY', 'SELECTED CHOICES & DELIVERABLES']],
      body: specs,
      theme: 'grid',
      headStyles: {
        fillColor: charcoal,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'left',
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 70, fontStyle: 'bold' },
        1: { cellWidth: 'auto' }
      },
      styles: {
        fontSize: 9,
        font: 'helvetica',
        cellPadding: 5,
        lineColor: [229, 231, 235],
        lineWidth: 0.1
      },
      alternateRowStyles: {
        fillColor: [250, 250, 252]
      }
    });
    
    currentY = (doc as any).lastAutoTable.finalY + 12;
  } else {
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('CLIENT ENQUIRY & MESSAGE', 20, 102);
    
    doc.setFillColor(softGray[0], softGray[1], softGray[2]);
    doc.rect(20, 108, 175, 45, 'F');
    
    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    
    const cleanMsg = lead.message.replace(/Website URL:.*|WhatsApp Number:.*/g, '').trim();
    const textLines = doc.splitTextToSize(cleanMsg || 'Requesting information for custom website development.', 165);
    doc.text(textLines, 25, 116);
    
    currentY = 165;
  }
  
  // --- ESTIMATED INVESTMENT BOX ---
  doc.setFillColor(79, 111, 255);
  doc.rect(20, currentY, 175, 22, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ESTIMATED BUDGET / INVESTMENT', 25, currentY + 8);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 215, 255);
  doc.text('Estimated Timeline: 7 - 14 Business Days', 25, currentY + 16);
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const budgetText = lead.budget ? lead.budget.replace(' (Calculated)', '') : 'Open discussion';
  doc.text(`${budgetText}*`, 190, currentY + 14, { align: 'right' });
  
  // --- NEGOTIATION / FLEXIBILITY BADGE ---
  const negotiableY = currentY + 34;
  doc.setFillColor(243, 244, 246);
  doc.rect(20, negotiableY, 175, 28, 'F');
  
  doc.setDrawColor(162, 89, 255);
  doc.setLineWidth(0.8);
  doc.line(20, negotiableY, 20, negotiableY + 28);
  
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('💡 BUDGET & TIMELINE ARE 100% NEGOTIABLE', 25, negotiableY + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99);
  doc.text('Please note that this pricing is a preliminary dynamic estimate. We are highly flexible\nand open to customization and negotiations to fit your specific budget targets and technical\nmilestones. Let\'s connect to finalize a plan that fits your exact goals!', 25, negotiableY + 15);
  
  // --- WHY WEBXCRAFTING SECTION ---
  const benefitsY = negotiableY + 40;
  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('WHY PARTNER WITH WEBXCRAFTING?', 20, benefitsY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text('✓ Premium Next.js 16 frameworks for ultra-responsive load speeds (<1s).', 25, benefitsY + 7);
  doc.text('✓ Harmonized color palettes, elegant animations, and state-of-the-art UI.', 25, benefitsY + 14);
  doc.text('✓ Full SEO optimization, Schema.org markups, and Google index registry.', 25, benefitsY + 21);
  
  // --- OFFICIAL SEAL (VECTOR GRAPHICS) ---
  const sealX = 168;
  const sealY = benefitsY + 12;
  doc.setDrawColor(79, 111, 255);
  doc.setLineWidth(0.4);
  doc.circle(sealX, sealY, 14, "D"); // Outer circle
  doc.setDrawColor(162, 89, 255);
  doc.circle(sealX, sealY, 12, "D"); // Inner circle
  
  // Text inside seal
  doc.setTextColor(79, 111, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5);
  doc.text("OFFICIAL", sealX, sealY - 4, { align: "center" });
  doc.setTextColor(162, 89, 255);
  doc.setFontSize(6);
  doc.text("VERIFIED", sealX, sealY + 1, { align: "center" });
  doc.setTextColor(79, 111, 255);
  doc.setFontSize(4);
  doc.text("BUDGET & QUALITY", sealX, sealY + 5, { align: "center" });

  // Footer Banner
  doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.rect(8, 284, 202, 13, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('WebXCrafting   •   contact@webxcrafting.in   •   +91 9102615343   •   www.webxcrafting.in', 36, 292);
  
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
