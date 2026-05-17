import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { IBill } from '@/models/Bill';
import { LOGO_BASE64 } from './logo-base64';

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
  
  const charcoal: [number, number, number] = [17, 24, 39]; // Deep Charcoal (#111827)
  const electricBlue: [number, number, number] = [79, 111, 255]; // Accent Blue (#4f6fff)
  const softGray: [number, number, number] = [243, 244, 246];

  // ==========================================
  // PAGE 1: EXECUTIVE COVER PAGE
  // ==========================================
  
  // Fill charcoal background for page 1
  doc.setFillColor(13, 15, 26);
  doc.rect(0, 0, 210, 297, "F");
  
  // Left electric blue accent glow bar
  doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.rect(0, 0, 10, 297, "F");

  // Logo image centered
  try {
    doc.addImage(LOGO_BASE64, "PNG", 90, 45, 30, 30);
  } catch (e) {
    console.error("Failed to add image to server PDFCover:", e);
    // Draw vector fallback logo if image fail
    doc.setFillColor(79, 111, 255);
    doc.rect(90, 45, 15, 15, "F");
    doc.setFillColor(162, 89, 255);
    doc.rect(95, 50, 15, 15, "F");
  }

  // Company Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("WebXCrafting", 105, 90, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(162, 89, 255);
  doc.text("PREMIUM CUSTOM WEB DEVELOPMENT & SEO", 105, 98, { align: "center" });
  
  doc.setDrawColor(79, 111, 255);
  doc.setLineWidth(0.6);
  doc.line(40, 110, 170, 110);

  // Proposal Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("DIGITAL ARCHITECTURE PROPOSAL", 105, 125, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(156, 163, 175);
  doc.text("Personalized Project Estimate & Technical Roadmap", 105, 133, { align: "center" });

  // Prepared Client Card
  const cardY = 160;
  doc.setFillColor(22, 28, 45); // Dark blue card background
  doc.rect(30, cardY, 150, 65, "F");
  
  doc.setDrawColor(79, 111, 255);
  doc.setLineWidth(0.3);
  doc.rect(30, cardY, 150, 65, "D");

  doc.setTextColor(162, 89, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("PREPARED EXCLUSIVELY FOR:", 40, cardY + 12);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(lead.name, 40, cardY + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175);
  doc.text(`Email: ${lead.email}`, 40, cardY + 32);

  // Extract phone number if present in the message
  const phoneMatch = lead.message.match(/WhatsApp Number:\s*([^\n]+)/i) || lead.message.match(/Phone:\s*([^\n]+)/i);
  const clientPhone = phoneMatch ? phoneMatch[1].trim() : "Provided on Inquiry";
  doc.text(`WhatsApp: ${clientPhone}`, 40, cardY + 38);

  doc.setTextColor(162, 89, 255);
  doc.setFont("helvetica", "bold");
  doc.text("DOCUMENT CONTROL:", 40, cardY + 48);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Ref: #WXC-${Math.floor(100000 + Math.random() * 900000)}   |   Date: ${new Date().toLocaleDateString("en-IN")}`, 40, cardY + 56);

  // Footer cover
  doc.setTextColor(107, 114, 128);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`© ${new Date().getFullYear()} WebXCrafting. All rights reserved. Confidential document.`, 105, 275, { align: "center" });

  // ==========================================
  // PAGE 2: SPECS AND FINANCIAL DETAILS
  // ==========================================
  doc.addPage();

  // Left accent bar
  doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.rect(0, 0, 8, 297, "F");

  // Mini Header Banner
  doc.setFillColor(17, 24, 39);
  doc.rect(8, 0, 202, 35, "F");

  try {
    doc.addImage(LOGO_BASE64, "PNG", 20, 7, 20, 20);
  } catch (e) {}

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("WebXCrafting", 48, 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(162, 89, 255);
  doc.text("PREMIUM CUSTOM WEB DEVELOPMENT & SEO", 48, 23);

  // Quote info right aligned mini header
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("PROJECT ESTIMATE", 145, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text("Interactive Proposal Breakdown", 145, 21);

  // Header line
  doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.setLineWidth(0.4);
  doc.line(20, 35, 195, 35);

  // Section Title
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("01. SERVICE SPECIFICATIONS & PRICING", 20, 48);

  // Parse specifications from message
  const specItems: any[] = [];
  const isCalculator = lead.message.includes("Website Cost Calculator") || (lead.budget && lead.budget.includes("(Calculated)"));
  let tableHeader = ["TECHNICAL SPECIFICATION CATEGORY", "SELECTED SOLUTION & SCOPE", "DELIVERY ALLOCATION"];

  if (isCalculator) {
    tableHeader = ["TECHNICAL SPECIFICATION CATEGORY", "SELECTED SOLUTION & SCOPE", "PRICE (INR)"];
    const specLines = lead.message.split("\n");
    specLines.forEach(line => {
      let cleanLine = line.replace(/^[-*]\s+/, "").trim();
      
      if (cleanLine.startsWith("Website Type:")) {
        const match = cleanLine.match(/Website Type:\s*(.*?)\s*\(Base:\s*₹?([0-9,]+)\)/);
        if (match) {
          specItems.push(["Website Type Tier", match[1].trim(), `INR ${match[2].trim()}`]);
        } else {
          const parts = cleanLine.split(":");
          specItems.push(["Website Type Tier", parts.slice(1).join(":").trim(), "Included"]);
        }
      } 
      else if (cleanLine.startsWith("Page Count:")) {
        const match = cleanLine.match(/Page Count:\s*(.*?)\s*\(\+₹?([0-9,]+)\)/);
        if (match) {
          const priceVal = match[2].trim();
          const displayPrice = (priceVal === "0" || priceVal === "") ? "Included" : `INR ${priceVal}`;
          specItems.push(["Scale & Page Count", match[1].trim(), displayPrice]);
        } else {
          const parts = cleanLine.split(":");
          specItems.push(["Scale & Page Count", parts.slice(1).join(":").trim(), "Included"]);
        }
      }
      else if (cleanLine.startsWith("Design Level:")) {
        const match = cleanLine.match(/Design Level:\s*(.*?)\s*\(\+₹?([0-9,]+)\)/);
        if (match) {
          const priceVal = match[2].trim();
          const displayPrice = (priceVal === "0" || priceVal === "") ? "Included" : `INR ${priceVal}`;
          specItems.push(["UI/UX Design Level", match[1].trim(), displayPrice]);
        } else {
          const parts = cleanLine.split(":");
          specItems.push(["UI/UX Design Level", parts.slice(1).join(":").trim(), "Included"]);
        }
      }
      else if (cleanLine.startsWith("Support Plan:")) {
        const match = cleanLine.match(/Support Plan:\s*(.*?)\s*\(\+₹?([0-9,]+)\)/);
        if (match) {
          const priceVal = match[2].trim();
          const displayPrice = (priceVal === "0" || priceVal === "") ? "Included" : `INR ${priceVal}`;
          specItems.push(["Support & SLA Maintenance", match[1].trim(), displayPrice]);
        } else {
          const parts = cleanLine.split(":");
          specItems.push(["Support & SLA Maintenance", parts.slice(1).join(":").trim(), "Included"]);
        }
      }
      else if (cleanLine.startsWith("Addon Features:")) {
        const content = cleanLine.replace("Addon Features:", "").trim();
        if (content && content !== "None" && content !== "None (+₹0)") {
          const addons = content.split(/\),\s*/);
          addons.forEach(addonStr => {
            if (!addonStr.trim()) return;
            let formattedAddon = addonStr.trim();
            if (!formattedAddon.endsWith(")")) {
              formattedAddon += ")";
            }
            const match = formattedAddon.match(/(.*?)\s*\(\+₹?([0-9,]+)\)/);
            if (match) {
              specItems.push([`Addon Feature: ${match[1].trim()}`, "Advanced Integration", `INR ${match[2].trim()}`]);
            }
          });
        }
      }
    });
  }

  // If no specs found or not calculator, fall back to parsing or custom consultation
  if (specItems.length === 0) {
    const specLines = lead.message.split("\n");
    let hasSpecs = false;
    specLines.forEach(line => {
      if (line.includes(":") && !line.startsWith("http") && !line.toLowerCase().includes("message")) {
        const parts = line.split(":");
        const key = parts[0].trim();
        const val = parts.slice(1).join(":").trim();
        if (key && val && !key.toLowerCase().includes("whatsapp") && !key.toLowerCase().includes("phone") && !key.toLowerCase().includes("email")) {
          specItems.push([key, val, "Included in scope"]);
          hasSpecs = true;
        }
      }
    });
    if (!hasSpecs) {
      const cleanMsg = lead.message.replace(/Website URL:.*|WhatsApp Number:.*/g, "").trim();
      specItems.push(["Custom Consultation Inquiry", cleanMsg || "Requesting custom estimate.", "TBD on Discovery Call"]);
    }
  }

  // Render Table
  (doc as any).autoTable({
    startY: 53,
    margin: { left: 20, right: 15 },
    head: [tableHeader],
    body: specItems,
    theme: "grid",
    headStyles: {
      fillColor: [17, 24, 39],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: "bold",
      halign: "left",
      cellPadding: 6
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: "bold" },
      1: { cellWidth: 90 },
      2: { halign: "right", fontStyle: "bold", cellWidth: 35 }
    },
    styles: {
      fontSize: 9,
      font: "helvetica",
      cellPadding: 5.5,
      lineColor: [229, 231, 235],
      lineWidth: 0.1,
      overflow: "linebreak"
    },
    alternateRowStyles: {
      fillColor: [250, 250, 252]
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 8;

  // --- GRAND TOTAL ESTIMATE BOX ---
  doc.setFillColor(79, 111, 255);
  doc.rect(20, finalY, 175, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ESTIMATED BUDGET / INVESTMENT", 25, finalY + 8);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 215, 255);
  doc.text("Estimated Timeline: 7 - 14 Business Days", 25, finalY + 16);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const budgetText = lead.budget ? lead.budget.replace(" (Calculated)", "").replace("₹", "INR ") : "Open discussion";
  doc.text(`${budgetText}*`, 190, finalY + 14, { align: "right" });

  // 100% NEGOTIABLE Pill Tag Badge
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(150, finalY + 16, 40, 4.5, 1.5, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(79, 111, 255);
  doc.text("100% NEGOTIABLE", 170, finalY + 19.5, { align: "center" });

  // --- NEGOTIABLE WARNING BOX (PURPLE BORDER) ---
  const negotiableY = finalY + 34;
  doc.setFillColor(243, 244, 246);
  doc.rect(20, negotiableY, 175, 28, "F");

  doc.setDrawColor(162, 89, 255); // Purple left border for premium accent
  doc.setLineWidth(0.8);
  doc.line(20, negotiableY, 20, negotiableY + 28);

  doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("💡 BUDGET & TIMELINE ARE 100% NEGOTIABLE", 25, negotiableY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99);
  doc.text("Please note that this pricing is a preliminary dynamic estimate. We are highly flexible\nand open to customization and negotiations to fit your specific budget targets and technical\nmilestones. Let's connect to finalize a plan that fits your exact goals!", 25, negotiableY + 15);

  // Footer Page 2
  doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.rect(8, 284, 202, 13, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text("WebXCrafting   •   webxcrafting@gmail.com   •   +91 9102615343 | +91 7974579107   •   Page 2", 36, 292);

  // ==========================================
  // PAGE 3: TECHNICAL ROADMAP
  // ==========================================
  doc.addPage();

  // Left accent bar
  doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.rect(0, 0, 8, 297, "F");

  // Mini Header Banner
  doc.setFillColor(17, 24, 39);
  doc.rect(8, 0, 202, 35, "F");

  try {
    doc.addImage(LOGO_BASE64, "PNG", 20, 7, 20, 20);
  } catch (e) {}

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("WebXCrafting", 48, 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(162, 89, 255);
  doc.text("PREMIUM CUSTOM WEB DEVELOPMENT & SEO", 48, 23);

  // Quote info right aligned mini header
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TECHNICAL ROADMAP", 140, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text("Engineering Phases & Delivery Timeline", 140, 21);

  // Header line
  doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
  doc.setLineWidth(0.4);
  doc.line(20, 35, 195, 35);

  // Section Title
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("02. ENGINEERING ROADMAP & IMPLEMENTATION PHASES", 20, 48);

  // Draw Vertical Timeline line
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(1);
  doc.line(30, 58, 30, 185);

  // Timeline Phase 1
  doc.setFillColor(162, 89, 255); // Purple
  doc.circle(30, 68, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(79, 111, 255);
  doc.text("Phase 1: Discovery, Wireframing & UX Strategy (Days 1 - 3)", 38, 70);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text("Conduct a kickoff meeting, draft complete UX wireframes, maps website structures,\nand review client asset integration.", 38, 76);

  // Timeline Phase 2
  doc.setFillColor(79, 111, 255); // Blue
  doc.circle(30, 103, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(79, 111, 255);
  doc.text("Phase 2: High-Fidelity Branding & Responsive Design (Days 4 - 7)", 38, 105);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text("Build bespoke modern layouts styled explicitly around your company guidelines.\nCraft full mobile-responsive prototypes with interactive hover states.", 38, 111);

  // Timeline Phase 3
  doc.setFillColor(162, 89, 255); // Purple
  doc.circle(30, 138, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(79, 111, 255);
  doc.text("Phase 3: Full-Stack Production Engineering (Days 8 - 12)", 38, 140);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text("Program clean Next.js server components with maximum performance optimizations.\nConfigure secured API routes, MongoDB collection mappings, and control dashboards.", 38, 146);

  // Timeline Phase 4
  doc.setFillColor(79, 111, 255); // Blue
  doc.circle(30, 173, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(79, 111, 255);
  doc.text("Phase 4: Performance Audits, Local SEO Setup & Launch (Days 13 - 15)", 38, 175);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text("Conduct strict speed audits (<1s load times), validate Schema.org microdata,\nand register your sitemap with Google Search Console.", 38, 181);

  // --- OFFICIAL SEAL (VECTOR GRAPHICS) ---
  const sealY = 230;
  const sealX = 40;
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
  
  // Signature lines on the right side
  const sigX = 130;
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.5);
  doc.line(sigX, sealY + 8, sigX + 50, sealY + 8);
  
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Authorized Verification Signature", sigX + 25, sealY + 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text("WebXCrafting Operations Unit", sigX + 25, sealY + 19, { align: "center" });

  // Footer Page 3
  doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
  doc.rect(8, 284, 202, 13, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text("WebXCrafting   •   webxcrafting@gmail.com   •   +91 9102615343 | +91 7974579107   •   Page 3", 36, 292);

  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
