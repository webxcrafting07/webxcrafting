import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { recipients, subject, message } = await req.json()

    if (!recipients || !subject || !message) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
    }

    const emailList = recipients
      .split(/[\n,]+/)
      .map((e: string) => e.trim())
      .filter((e: string) => e.length > 0 && e.includes('@'));

    if (emailList.length === 0) {
      return NextResponse.json({ success: false, message: 'No valid email addresses provided' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0ece8; color: #1a1a1a; -webkit-text-size-adjust: 100%; }
        .outer { padding: 32px 16px; background-color: #f0ece8; }
        .card { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }

        /* Banner */
        .banner { position: relative; background: linear-gradient(135deg, #111827 0%, #1e3a5f 60%, #2d6a4f 100%); padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; overflow: hidden; }
        .banner::after { content: ''; position: absolute; right: -20px; top: -20px; width: 200px; height: 130px; background: rgba(255,255,255,0.06); border-radius: 50%; }
        .banner-logo { display: flex; align-items: center; gap: 10px; z-index: 1; }
        .banner-logo img { width: 40px; height: 40px; object-fit: contain; border-radius: 6px; }
        .banner-logo-text { color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .banner-tagline { color: rgba(255,255,255,0.6); font-size: 12px; margin-top: 2px; letter-spacing: 0.3px; }

        /* Body */
        .body { padding: 36px 32px; line-height: 1.75; font-size: 15px; color: #333333; }
        .body p { margin-bottom: 18px; }
        .body a { color: #d97706; text-decoration: none; border-bottom: 1px solid #d97706; }

        /* Footer */
        .footer-note { padding: 16px 32px; font-size: 11px; color: #888888; line-height: 1.6; border-top: 1px solid #eeeeee; background: #fafafa; }
        .footer-note a { color: #d97706; text-decoration: none; }
        .footer-dark { background: #1a1a1a; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .footer-dark-text { color: #9ca3af; font-size: 11px; }
        .social-row { display: flex; gap: 12px; align-items: center; }
        .social-row a img { width: 20px; height: 20px; opacity: 0.65; display: block; }

        @media only screen and (max-width: 600px) {
          .outer { padding: 16px 8px; }
          .banner { padding: 22px 20px; }
          .body { padding: 28px 20px; font-size: 14px; }
          .footer-note { padding: 14px 20px; }
          .footer-dark { padding: 18px 20px; }
          .banner-logo-text { font-size: 17px; }
        }
      </style>
    </head>
    <body>
      <div class="outer">
        <div class="card">

          <!-- Banner Header -->
          <div class="banner">
            <div class="banner-logo">
              <img src="https://www.webxcrafting.in/logo-wxc.png" alt="WebXCrafting Logo" />
              <div>
                <div class="banner-logo-text">WebXCrafting</div>
                <div class="banner-tagline">Build your digital future with us</div>
              </div>
            </div>
          </div>

          <!-- Email Body -->
          <div class="body">
            ${message.replace(/\n/g, '<br>')}
            <br>
            <p style="margin-top: 24px; color: #555;">Kind regards,<br><strong style="color: #111827;">WebXCrafting Team</strong></p>
          </div>

          <!-- Disclaimer Note -->
          <div class="footer-note">
            This email was sent to you because you are a valued client or contact of WebXCrafting. 
            If you have any queries, contact us at <a href="mailto:webxcrafting@gmail.com">webxcrafting@gmail.com</a>.
          </div>

          <!-- Dark Footer -->
          <div class="footer-dark">
            <div class="footer-dark-text">
              Copyright WebXCrafting ${new Date().getFullYear()}. All rights reserved.<br>
              <a href="https://www.webxcrafting.in" style="color: #d97706; text-decoration: none;">www.webxcrafting.in</a>
            </div>
            <div class="social-row">
              <a href="https://www.facebook.com/profile.php?id=61570712849063" target="_blank">
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook"/>
              </a>
              <a href="https://www.instagram.com/webxcrafting" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram"/>
              </a>
              <a href="https://www.linkedin.com/in/webx-crafting-a1a875402/" target="_blank">
                <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn"/>
              </a>
            </div>
          </div>

        </div>
      </div>
    </body>
    </html>
    `

    // Send emails
    const sendPromises = emailList.map(async (email: string) => {
      try {
        await transporter.sendMail({
          from: `"WebXCrafting" <${process.env.SMTP_USER}>`,
          to: email,
          subject: subject,
          html: htmlContent,
        });
        return { email, status: 'success' };
      } catch (err) {
        console.error(`Failed to send to ${email}`, err);
        return { email, status: 'failed' };
      }
    });

    const results = await Promise.all(sendPromises);
    const successCount = results.filter(r => r.status === 'success').length;

    return NextResponse.json({ 
      success: true, 
      message: `Sent ${successCount} out of ${emailList.length} emails.` 
    })
  } catch (error: any) {
    console.error('Bulk email error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
