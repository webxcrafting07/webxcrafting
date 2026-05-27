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
        body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #000000; color: #ededed; margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; }
        .wrapper { padding: 40px 20px; background-color: #000000; }
        .container { max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border-radius: 12px; overflow: hidden; border: 1px solid #1f1f1f; }
        .header { background-color: #0a0a0a; padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #1f1f1f; }
        .header img { max-width: 120px; height: auto; display: block; margin: 0 auto; }
        .content { padding: 40px; line-height: 1.7; color: #a1a1aa; font-size: 15px; }
        .content h2, .content h3 { color: #ffffff; font-weight: 600; margin-top: 0; }
        .content p { margin-top: 0; margin-bottom: 20px; }
        .footer { background-color: #050505; padding: 30px 40px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #1f1f1f; }
        .footer a { color: #4f6fff; text-decoration: none; transition: color 0.2s; }
        .footer a:hover { color: #a259ff; }
        .social-icons { margin: 0 0 20px 0; }
        .social-icons a { display: inline-block; margin: 0 8px; text-decoration: none; }
        .social-icons img { width: 24px; height: 24px; opacity: 0.6; filter: grayscale(100%); transition: all 0.3s ease; }
        .social-icons a:hover img { opacity: 1; filter: grayscale(0%); }
        @media only screen and (max-width: 620px) {
          .wrapper { padding: 20px 10px; }
          .content { padding: 30px 20px; font-size: 14px; }
          .header { padding: 30px 20px 20px 20px; }
          .footer { padding: 30px 20px; }
        }
      </style>
    </head>
    <body>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000;">
        <tr>
          <td align="center" class="wrapper">
            <div class="container">
              <div class="header">
                <img src="https://www.webxcrafting.in/logo-wxc.png" alt="WebXCrafting Logo" />
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
                <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} WebXCrafting. Premium Digital Solutions.</p>
                <p style="margin: 0;"><a href="https://www.webxcrafting.in">www.webxcrafting.in</a> | <a href="mailto:webxcrafting@gmail.com">webxcrafting@gmail.com</a></p>
                <p style="margin: 20px 0 0 0; font-size: 11px; opacity: 0.5;">You are receiving this email because you are a valued client of WebXCrafting.</p>
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
