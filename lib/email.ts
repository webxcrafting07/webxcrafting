import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendLeadNotification(lead: { name: string; email: string; budget?: string; message: string }) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER

  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_app_password_here') {
    console.warn('SMTP_PASS not configured. Skipping email notification.')
    return
  }

  const mailOptions = {
    from: `"WebXCrafting Alerts" <${process.env.SMTP_USER}>`,
    to: notificationEmail,
    subject: `🚀 New Lead: ${lead.name}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: linear-gradient(135deg, #4f6fff, #a259ff); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Project Inquiry</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">WebXCrafting Leads</p>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <div style="margin-bottom: 25px;">
            <p style="color: #7b82a8; margin: 0; font-size: 13px; font-weight: 600; text-transform: uppercase;">From</p>
            <p style="color: #03050a; margin: 5px 0 0; font-size: 18px; font-weight: 700;">${lead.name}</p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <p style="color: #7b82a8; margin: 0; font-size: 13px; font-weight: 600; text-transform: uppercase;">Email</p>
            <p style="color: #4f6fff; margin: 5px 0 0; font-size: 16px;">${lead.email}</p>
          </div>
          
          ${lead.budget ? `
          <div style="margin-bottom: 25px;">
            <p style="color: #7b82a8; margin: 0; font-size: 13px; font-weight: 600; text-transform: uppercase;">Budget Range</p>
            <p style="color: #03050a; margin: 5px 0 0; font-size: 16px; font-weight: 600;">${lead.budget}</p>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 30px; padding: 20px; background-color: #f3f5ff; border-left: 4px solid #4f6fff; border-radius: 4px;">
            <p style="color: #7b82a8; margin: 0 0 10px; font-size: 13px; font-weight: 600; text-transform: uppercase;">Message</p>
            <p style="color: #03050a; margin: 0; font-size: 15px; line-height: 1.6;">${lead.message}</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard" style="display: inline-block; padding: 14px 28px; background-color: #4f6fff; color: white; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; transition: background 0.3s;">
              View Lead in Dashboard →
            </a>
          </div>
        </div>
        
        <div style="padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="color: #999999; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} WebXCrafting. All rights reserved.</p>
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

export async function sendClientAutoReply(clientEmail: string, clientName: string) {
  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_app_password_here') return

  const mailOptions = {
    from: `"WebXCrafting Support" <${process.env.SMTP_USER}>`,
    to: clientEmail,
    subject: `Thank you for reaching out, ${clientName}! ✨`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #03050a; color: #e8eaf6; border-radius: 16px; overflow: hidden; border: 1px solid rgba(79, 111, 255, 0.2);">
        <div style="background: linear-gradient(135deg, #4f6fff, #a259ff); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: -0.5px;">Message Received!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">We're excited to learn about your project.</p>
        </div>
        
        <div style="padding: 40px 35px; background-color: #03050a;">
          <p style="font-size: 18px; margin-bottom: 20px;">Hi <strong>${clientName}</strong>,</p>
          <p style="color: #7b82a8; font-size: 15px; line-height: 1.8; margin-bottom: 30px;">
            Thank you for contacting <strong>WebXCrafting</strong>. We've successfully received your inquiry and our team is already reviewing the details.
          </p>
          
          <div style="background: rgba(79, 111, 255, 0.05); border: 1px solid rgba(79, 111, 255, 0.1); border-radius: 12px; padding: 25px; margin-bottom: 35px;">
            <h3 style="color: #4f6fff; margin-top: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">What happens next?</h3>
            <ul style="color: #7b82a8; font-size: 14px; padding-left: 20px; margin: 15px 0 0; line-height: 1.6;">
              <li style="margin-bottom: 10px;">Our expert team will analyze your requirements.</li>
              <li style="margin-bottom: 10px;">We will contact you via email or phone within 24 hours.</li>
              <li>We will schedule a brief discovery call to discuss your vision.</li>
            </ul>
          </div>
          
          <p style="color: #7b82a8; font-size: 15px; margin-bottom: 40px;">
            In the meantime, feel free to check out our recent work on our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portfolio" style="color: #4f6fff; text-decoration: none; font-weight: 600;">Portfolio</a>.
          </p>
          
          <div style="text-align: center; border-top: 1px solid rgba(99, 120, 255, 0.1); padding-top: 30px; margin-top: 30px;">
            <p style="color: #7b82a8; font-size: 13px; margin-bottom: 15px;">Follow us for latest updates</p>
            <div style="display: flex; justify-content: center; gap: 15px;">
              <a href="https://www.linkedin.com/in/webx-crafting-a1a875402/" style="background: rgba(255,255,255,0.05); width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; color: #4f6fff; text-decoration: none;">li</a>
              <a href="https://www.instagram.com/webxcrafting" style="background: rgba(255,255,255,0.05); width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; color: #4f6fff; text-decoration: none;">ig</a>
              <a href="#" style="background: rgba(255,255,255,0.05); width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; color: #4f6fff; text-decoration: none;">tw</a>
            </div>
          </div>
        </div>
        
        <div style="padding: 25px; text-align: center; background-color: rgba(79, 111, 255, 0.05);">
          <p style="color: #7b82a8; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} WebXCrafting. All rights reserved.</p>
          <p style="color: #4f6fff; font-size: 11px; margin-top: 5px;">Premium Web Solutions for Modern Businesses</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Client auto-reply email sent successfully.')
  } catch (error) {
    console.error('Error sending client auto-reply email:', error)
  }
}
