import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | WebXCrafting',
  description: 'WebXCrafting Cookie Policy - Information about cookies and tracking technologies',
}

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#030510] text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored by your browser that help a website remember information while you browse. On this site, we only use cookies that are essential for functionality and authentication.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Cookies Used by WebXCrafting</h2>
            <p>
              WebXCrafting uses a single strictly necessary cookie to support admin login and authenticated access to the dashboard.
            </p>
            <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-700">
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>admin_token:</strong> HTTP-only cookie used for admin authentication and session verification</li>
                <li><strong>Purpose:</strong> Keep the admin logged in while accessing the dashboard</li>
                <li><strong>Duration:</strong> 7 days when logged in</li>
                <li><strong>Security:</strong> Set with <code>httpOnly</code>, <code>sameSite='strict'</code>, and <code>secure</code> in production</li>
              </ul>
            </div>
            <p className="mt-4 text-gray-400">
              We do not currently use analytics, marketing, advertising, or social media cookies on the public-facing website.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Why This Cookie Is Necessary</h2>
            <p>
              The admin authentication cookie is required to verify the admin session for the protected dashboard area. Without this cookie, admin users would have to re-authenticate on every request.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Browser Controls</h2>
            <p>
              You can manage cookies through your browser settings. Disabling cookies may affect the admin login experience, but it will not impact the public website pages.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Consent</h2>
            <p>
              Because the only cookie set by this website is strictly necessary for admin authentication, no cookie consent banner is required for the public site.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to This Policy</h2>
            <p>
              If we add any additional cookies in the future (for analytics, marketing, or other purposes), we will update this policy accordingly and clearly describe those cookies.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p>If you have questions about our cookie usage:</p>
            <div className="mt-4 p-6 bg-gray-900 rounded-lg border border-gray-700">
              <p><strong>Email:</strong> privacy@webxcrafting.com</p>
              <p className="mt-2"><strong>Contact Form:</strong> <Link href="/contact" className="text-blue-400 hover:text-blue-300">Visit our contact page</Link></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookie Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3 bg-gray-900">Cookie Name</th>
                    <th className="text-left p-3 bg-gray-900">Purpose</th>
                    <th className="text-left p-3 bg-gray-900">Duration</th>
                    <th className="text-left p-3 bg-gray-900">Consent Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="p-3">admin_token</td>
                    <td className="p-3">Admin authentication/session</td>
                    <td className="p-3">7 days</td>
                    <td className="p-3">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}
