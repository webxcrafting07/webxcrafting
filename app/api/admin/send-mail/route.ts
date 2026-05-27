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
        body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #03050a; color: #e8eaf6; margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; }
        .container { max-width: 600px; margin: 40px auto; background-color: #0a0e1c; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(99,120,255,0.2); }
        .header { background: linear-gradient(135deg, #4f6fff, #a259ff); padding: 30px; text-align: center; }
        .header img { max-width: 180px; height: auto; margin-bottom: 12px; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; display: none; } /* Hidden as we use logo now */
        .content { padding: 40px 30px; line-height: 1.8; color: #b0b8d8; font-size: 16px; }
        .content h2, .content h3 { color: #e8eaf6; }
        .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #4f6fff, #a259ff); color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; box-shadow: 0 4px 15px rgba(79, 111, 255, 0.4); }
        .footer { background-color: #050811; padding: 30px 20px; text-align: center; font-size: 13px; color: #7b82a8; border-top: 1px solid rgba(99,120,255,0.1); }
        .footer a { color: #4f6fff; text-decoration: none; }
        .social-icons { margin: 20px 0; }
        .social-icons a { display: inline-block; margin: 0 10px; text-decoration: none; }
        .social-icons img { width: 32px; height: 32px; opacity: 0.85; transition: opacity 0.3s; }
        .social-icons a:hover img { opacity: 1; }
        @media only screen and (max-width: 620px) {
          .container { margin: 20px; border-radius: 12px; }
          .content { padding: 30px 20px; font-size: 15px; }
          .header { padding: 25px; }
        }
      </style>
    </head>
    <body>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #03050a;">
        <tr>
          <td align="center">
            <div class="container">
              <div class="header">
                <img src="https://www.webxcrafting.in/logo-wxc.png" alt="WebXCrafting Logo" />
                <h1>WebXCrafting</h1>
              </div>
              <div class="content">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <div class="footer">
                <div class="social-icons">
                  <a href="#" target="_blank"><img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook"/></a>
                  <a href="#" target="_blank"><img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram"/></a>
                  <a href="#" target="_blank"><img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn"/></a>
                  <a href="#" target="_blank"><img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter"/></a>
                </div>
                <p style="margin-bottom: 8px;">© ${new Date().getFullYear()} WebXCrafting. Premium Digital Solutions.</p>
                <p><a href="https://www.webxcrafting.in">www.webxcrafting.in</a> | <a href="mailto:webxcrafting@gmail.com">webxcrafting@gmail.com</a></p>
                <p style="margin-top: 15px; font-size: 11px; opacity: 0.6;">You are receiving this email because you are a valued client of WebXCrafting.</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
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
