import nodemailer from 'nodemailer'
import { generateInvoicePDFBuffer, generateProposalPDFBuffer } from './pdfGenerator';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: (Number(process.env.SMTP_PORT) || 465) === 465, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Add timeout for better reliability
  connectionTimeout: 10000,
  greetingTimeout: 10000,
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://webxcrafting.in'

export async function sendLeadNotification(lead: { name: string; email: string; budget?: string; message: string }) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER

  if (!process.env.SMTP_USER) {
    console.error('SMTP_USER not configured. Cannot send email.')
    return
  }

  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_app_password_here') {
    console.warn(`SMTP_PASS for ${process.env.SMTP_USER} not configured or using placeholder. Skipping email notification.`)
    return
  }

  const mailOptions = {
    from: `"WebXCrafting Alerts" <${process.env.SMTP_USER}>`,
    to: notificationEmail,
    subject: `🚀 New Lead: ${lead.name}`,
    html: `
      <div style="font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid #f0f0f0;">
        <div style="background: #030510; padding: 40px 30px; text-align: center;">
          <div style="margin-bottom: 24px;">
            <img src="${SITE_URL}/logo-wxc.png" alt="WebXCrafting" style="width: 50px; height: 50px;">
          </div>
          <div style="display: inline-block; padding: 8px 16px; background: rgba(79, 111, 255, 0.1); border-radius: 100px; margin-bottom: 16px;">
            <span style="color: #4f6fff; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">New Business Alert</span>
          </div>
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px;">New Lead <span style="color: #4f6fff;">Received</span></h1>
        </div>
        
        <div style="padding: 40px 35px;">
          <div style="display: flex; gap: 20px; margin-bottom: 30px; padding-bottom: 25px; border-bottom: 1px solid #f0f0f0;">
            <div style="flex: 1;">
              <p style="color: #94a3b8; margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Client Name</p>
              <p style="color: #0f172a; margin: 4px 0 0; font-size: 18px; font-weight: 700;">${lead.name}</p>
            </div>
            <div style="flex: 1;">
              <p style="color: #94a3b8; margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Budget</p>
              <p style="color: #0f172a; margin: 4px 0 0; font-size: 18px; font-weight: 700;">${lead.budget || 'Not specified'}</p>
            </div>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p style="color: #94a3b8; margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Contact Information</p>
            <p style="color: #4f6fff; margin: 4px 0 0; font-size: 16px; font-weight: 600;">${lead.email}</p>
          </div>
          
          <div style="margin-bottom: 40px; padding: 25px; background-color: #f8fafc; border-radius: 16px; border: 1px solid #f1f5f9;">
            <p style="color: #94a3b8; margin: 0 0 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Project Message</p>
            <p style="color: #334155; margin: 0; font-size: 15px; line-height: 1.7; font-style: italic;">"${lead.message}"</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${SITE_URL}/admin/dashboard" style="display: inline-block; padding: 16px 35px; background-color: #4f6fff; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 20px rgba(79, 111, 255, 0.25);">
              Manage in Dashboard →
            </a>
          </div>
        </div>
        
        <div style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #f0f0f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">This is an automated notification from WebXCrafting CMS.</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Lead notification email sent successfully.')
  } catch (error) {
    console.error('Error sending lead notification email:', error)
  }
}

export async function sendClientAutoReply(clientEmail: string, clientName: string, budget?: string, message?: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_app_password_here') {
    console.warn('SMTP credentials missing or incomplete. Skipping client auto-reply.')
    return
  }

  let pdfAttachment: any = null;
  let customIntro = `Thank you for reaching out to us. We have received your inquiry regarding a new project, and we're thrilled at the possibility of working together.`;

  if (message) {
    try {
      const pdfBuffer = await generateProposalPDFBuffer({ name: clientName, email: clientEmail, budget, message });
      pdfAttachment = {
        filename: `WebXCrafting_Proposal_${clientName.replace(/\s+/g, '_')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      };
      
      if (budget && budget !== 'Not specified') {
        customIntro = `Thank you for utilizing our <strong>Website Cost Calculator</strong>! We have successfully received your inquiry and custom specifications. 
        We have automatically compiled a comprehensive project estimate proposal PDF and attached it directly to this email for your records. 
        Please note that this is a dynamic ballpark figure: <strong>our pricing and timelines are highly customizable and 100% negotiable</strong> to fit your business budget. Let's discuss to find the perfect plan for you!`;
      } else {
        customIntro = `Thank you for reaching out to us! We have successfully received your inquiry. 
        A professional custom proposal PDF has been generated based on your inquiry message and is attached to this email. 
        Please note that <strong>our project scopes, budget allocations, and timelines are 100% negotiable</strong> to perfectly align with your goals!`;
      }
    } catch (err) {
      console.error('Failed to generate proposal PDF attachment:', err);
    }
  }

  const mailOptions: any = {
    from: `"WebXCrafting Support" <${process.env.SMTP_USER}>`,
    to: clientEmail,
    subject: budget ? `Your Custom Web Proposal & Estimate from WebXCrafting ✨` : `Thank you for reaching out, ${clientName}! ✨`,
    html: `
      <div style="font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); border: 1px solid #e2e8f0;">
        <div style="background: #030510; padding: 60px 40px; text-align: center; position: relative;">
          <div style="margin-bottom: 24px;">
            <img src="${SITE_URL}/logo-wxc.png" alt="WebXCrafting" style="width: 64px; height: 64px; margin-bottom: 20px;">
          </div>
          <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.1;">Welcome to <span style="color: #4f6fff;">WebXCrafting</span></h1>
          <p style="color: #94a3b8; margin: 15px 0 0; font-size: 18px; font-weight: 500;">Your digital transformation starts here.</p>
        </div>
        
        <div style="padding: 50px 45px;">
          <p style="font-size: 20px; margin-bottom: 20px; color: #0f172a;">Hi <strong>${clientName}</strong>,</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 40px;">
            ${customIntro}
          </p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 35px; margin-bottom: 45px;">
            <h3 style="color: #4f6fff; margin-top: 0; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">The Next Steps</h3>
            
            <div style="display: flex; margin-bottom: 20px;">
              <div style="min-width: 24px; height: 24px; border-radius: 50%; background: #4f6fff; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; margin-right: 15px; margin-top: 2px;">1</div>
              <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6;"><strong>Analysis:</strong> Our experts are reviewing your requirements right now.</p>
            </div>
            
            <div style="display: flex; margin-bottom: 20px;">
              <div style="min-width: 24px; height: 24px; border-radius: 50%; background: #4f6fff; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; margin-right: 15px; margin-top: 2px;">2</div>
              <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6;"><strong>Discovery:</strong> We will contact you within 24 hours to discuss negotiable points and align with your exact budget goals.</p>
            </div>
            
            <div style="display: flex;">
              <div style="min-width: 24px; height: 24px; border-radius: 50%; background: #4f6fff; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; margin-right: 15px; margin-top: 2px;">3</div>
              <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6;"><strong>Execution:</strong> We will establish a custom development plan and begin engineering your vision.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 50px;">
            <p style="color: #64748b; font-size: 15px; margin-bottom: 25px;">While you wait, feel free to explore our journey or chat with our experts:</p>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
              <a href="${SITE_URL}/portfolio" style="display: inline-block; padding: 18px 40px; background-color: #030510; color: white; text-decoration: none; border-radius: 14px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">View Our Portfolio</a>
              <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919102615343'}" style="display: inline-block; padding: 18px 40px; background-color: #25d366; color: white; text-decoration: none; border-radius: 14px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">WhatsApp Chat</a>
            </div>
          </div>
          
          <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 40px;">
            <p style="color: #94a3b8; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 25px;">Connect With Us</p>
            <div style="display: flex; justify-content: center; align-items: center; gap: 24px;">
              <a href="https://www.webxcrafting.in" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/domain.png" alt="Website" width="32" height="32" style="display: block; border: 0;">
              </a>
              <a href="https://www.linkedin.com/in/webx-crafting-a1a875402/" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="LinkedIn" width="32" height="32" style="display: block; border: 0;">
              </a>
              <a href="https://www.instagram.com/webxcrafting" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" width="32" height="32" style="display: block; border: 0;">
              </a>
            </div>
          </div>
        </div>
        
        <div style="padding: 35px; text-align: center; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0; font-weight: 500;">&copy; ${new Date().getFullYear()} WebXCrafting. All rights reserved.</p>
          <p style="color: #4f6fff; font-size: 11px; margin-top: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Premium Web Solutions &bull; Negotiable &amp; Customizable</p>
        </div>
      </div>
    `
  };

  if (pdfAttachment) {
    mailOptions.attachments = [pdfAttachment];
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Client auto-reply email sent successfully.')
  } catch (error) {
    console.error('Error sending client auto-reply email:', error)
  }
}

export async function sendInvoiceEmail(bill: any) {
  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_app_password_here') return

  const pdfBuffer = await generateInvoicePDFBuffer(bill);

  const mailOptions = {
    from: `"WebXCrafting Billing" <${process.env.SMTP_USER}>`,
    to: bill.clientEmail,
    subject: `Invoice from WebXCrafting - ${bill.invoiceNumber}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #03050a; color: #e8eaf6; border-radius: 20px; overflow: hidden; border: 1px solid rgba(79, 111, 255, 0.2); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
        <div style="background: linear-gradient(135deg, #111827, #1e293b); padding: 50px 30px; text-align: center; border-bottom: 2px solid #4f6fff;">
          <div style="margin-bottom: 20px;">
            <img src="${SITE_URL}/logo-wxc.png" alt="WebXCrafting" style="width: 60px; height: 60px;">
          </div>
          <p style="color: #4f6fff; margin: 10px 0 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px;">Payment Received / Invoice</p>
        </div>
        
        <div style="padding: 40px 35px; background-color: #03050a;">
          <p style="font-size: 18px; margin-bottom: 25px; color: #ffffff;">Hi <strong>${bill.clientName}</strong>,</p>
          <p style="color: #94a3b8; font-size: 16px; line-height: 1.8; margin-bottom: 35px;">
            Thank you for your business. We are pleased to confirm that your invoice for <strong>${bill.invoiceNumber}</strong> has been generated. 
            A professional PDF copy has been attached to this email for your records.
          </p>
          
          <div style="background: rgba(79, 111, 255, 0.03); border: 1px solid rgba(79, 111, 255, 0.1); border-radius: 16px; padding: 30px; margin-bottom: 40px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
              <div style="text-align: left;">
                <p style="color: #64748b; margin: 0; font-size: 12px; text-transform: uppercase; font-weight: 700;">Invoice Date</p>
                <p style="color: #f1f5f9; margin: 5px 0 0; font-size: 15px; font-weight: 600;">${new Date(bill.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <div style="text-align: right;">
                <p style="color: #64748b; margin: 0; font-size: 12px; text-transform: uppercase; font-weight: 700;">Invoice ID</p>
                <p style="color: #f1f5f9; margin: 5px 0 0; font-size: 15px; font-weight: 600;">#${bill.invoiceNumber}</p>
              </div>
            </div>
            
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding: 20px 0; margin-bottom: 25px;">
              ${bill.items.map((item: any) => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #f1f5f9; font-size: 15px;">${item.description} (x${item.quantity})</span>
                  <span style="color: #94a3b8; font-size: 15px;">₹${Number(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              `).join('')}
            </div>

            <div style="text-align: center; padding-top: 10px;">
              <p style="color: #94a3b8; margin: 0; font-size: 13px; font-weight: 600;">GRAND TOTAL DUE</p>
              <h2 style="color: #4f6fff; margin: 10px 0 0; font-size: 42px; font-weight: 800; letter-spacing: -1px;">₹${Number(bill.totalAmount).toLocaleString('en-IN')}</h2>
            </div>
          </div>
          
          <div style="background: linear-gradient(90deg, rgba(79, 111, 255, 0.1), transparent); padding: 20px; border-radius: 12px; margin-bottom: 40px; border-left: 4px solid #4f6fff;">
             <p style="color: #f1f5f9; margin: 0; font-size: 14px; font-weight: 600;">Payment Notice:</p>
             <p style="color: #94a3b8; margin: 5px 0 0; font-size: 14px; line-height: 1.5;">${bill.notes || 'Please clear the payment within 7 working days. You can also pay via WhatsApp using the link below.'}</p>
          </div>

          <div style="text-align: center; margin-bottom: 20px;">
            <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" style="display: inline-block; padding: 18px 35px; background-color: #4f6fff; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 20px rgba(79, 111, 255, 0.3);">
              Contact Billing on WhatsApp
            </a>
          </div>
        </div>
        
        <div style="padding: 20px 35px 40px; text-align: center;">
          <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 30px;">
            <p style="color: #64748b; font-size: 13px; margin-bottom: 20px;">Follow us on</p>
            <div style="display: flex; justify-content: center; align-items: center; gap: 24px;">
              <a href="https://www.webxcrafting.in" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/domain.png" alt="Website" width="32" height="32" style="display: block; border: 0;">
              </a>
              <a href="https://www.linkedin.com/in/webx-crafting-a1a875402/" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="LinkedIn" width="32" height="32" style="display: block; border: 0;">
              </a>
              <a href="https://www.instagram.com/webxcrafting" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" width="32" height="32" style="display: block; border: 0;">
              </a>
            </div>
          </div>
        </div>

        <div style="padding: 30px; text-align: center; background-color: #111827; border-top: 1px solid rgba(255, 255, 255, 0.05);">
          <p style="color: #64748b; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} WebXCrafting Premium Digital Solutions.</p>
          <p style="color: #4f6fff; font-size: 11px; margin-top: 8px; text-transform: uppercase; letter-spacing: 2px;">Professional • Reliable • Advanced</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `Invoice-${bill.invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Invoice email with attachment sent successfully.')
    return true
  } catch (error) {
    console.error('Error sending invoice email:', error)
    return false
  }
}

export async function sendCustomReply(toEmail: string, toName: string, message: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_app_password_here') {
    console.warn('SMTP credentials missing or incomplete. Skipping custom reply.')
    return false
  }

  const mailOptions = {
    from: `"WebXCrafting Support" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `Re: Your inquiry with WebXCrafting ✨`,
    html: `
      <div style="font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); border: 1px solid #e2e8f0;">
        <div style="background: #030510; padding: 60px 40px; text-align: center; position: relative;">
          <div style="margin-bottom: 24px;">
            <img src="${SITE_URL}/logo-wxc.png" alt="WebXCrafting" style="width: 64px; height: 64px;">
          </div>
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.2;">Personalized <span style="color: #4f6fff;">Response</span></h1>
          <p style="color: #94a3b8; margin: 10px 0 0; font-size: 16px;">From the desk of WebXCrafting</p>
        </div>
        
        <div style="padding: 50px 45px;">
          <div style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 40px; white-space: pre-wrap;">${message}</div>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 35px; margin-bottom: 45px; text-align: center;">
            <h3 style="color: #4f6fff; margin-top: 0; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Ready to Start?</h3>
            <p style="color: #64748b; font-size: 15px; margin-bottom: 25px;">Explore our previous work or chat with us directly:</p>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
              <a href="${SITE_URL}/portfolio" style="display: inline-block; padding: 14px 28px; background-color: #030510; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px;">View Portfolio</a>
              <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" style="display: inline-block; padding: 14px 28px; background-color: #25d366; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px;">WhatsApp Chat</a>
            </div>
          </div>
          
          <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 40px;">
            <p style="color: #94a3b8; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 25px;">Connect With Us</p>
            <div style="display: flex; justify-content: center; align-items: center; gap: 24px;">
              <a href="https://www.webxcrafting.in" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/domain.png" alt="Website" width="32" height="32" style="display: block; border: 0;">
              </a>
              <a href="https://www.linkedin.com/in/webx-crafting-a1a875402/" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/linkedin-circled--v1.png" alt="LinkedIn" width="32" height="32" style="display: block; border: 0;">
              </a>
              <a href="https://www.instagram.com/webxcrafting" style="text-decoration: none;">
                <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" width="32" height="32" style="display: block; border: 0;">
              </a>
            </div>
          </div>
        </div>
        
        <div style="padding: 35px; text-align: center; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0; font-weight: 500;">&copy; ${new Date().getFullYear()} WebXCrafting. All rights reserved.</p>
          <p style="color: #4f6fff; font-size: 11px; margin-top: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Premium Web Solutions</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Custom reply email sent successfully.')
    return true
  } catch (error) {
    console.error('Error sending custom reply email:', error)
    return false
  }
}
