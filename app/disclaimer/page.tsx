import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer | WebXCrafting",
  description:
    "WebXCrafting Disclaimer - Liability limitations and disclaimers",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function Disclaimer() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#030510] text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-gray-400 text-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-300 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. General Disclaimer
              </h2>
              <p>
                The information, services, and materials provided on the
                WebXCrafting website and through our services are provided on an
                "AS-IS" and "AS-AVAILABLE" basis without warranties of any kind,
                either express or implied. WebXCrafting makes no warranties,
                representations, or guarantees regarding the accuracy,
                completeness, reliability, or quality of the information or
                services provided.
              </p>
              <p className="mt-4">
                To the fullest extent permissible under applicable law,
                WebXCrafting disclaims all warranties, express or implied,
                including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Warranties of merchantability or fitness for a particular
                  purpose
                </li>
                <li>
                  Warranties regarding the accuracy or completeness of content
                </li>
                <li>
                  Warranties regarding service availability or uninterrupted
                  access
                </li>
                <li>
                  Warranties regarding freedom from viruses or harmful code
                </li>
                <li>
                  Warranties regarding the performance or functionality of our
                  services
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Limitation of Liability
              </h2>
              <p>
                WebXCrafting shall not be liable for any direct, indirect,
                incidental, special, consequential, or punitive damages,
                including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data, files, or information</li>
                <li>Damage to reputation or brand value</li>
                <li>Loss of customer relationships or opportunities</li>
                <li>Interruption of business operations</li>
                <li>Any special, direct, indirect, or consequential damages</li>
              </ul>
              <p className="mt-4">
                This applies even if WebXCrafting has been advised of the
                possibility of such damages. In no event shall WebXCrafting's
                liability exceed the total amount paid by the Client for the
                specific service that gave rise to the claim.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Accuracy of Information
              </h2>
              <p>
                While we strive to provide accurate, current, and complete
                information on our website, we make no representation or
                warranty concerning the accuracy, completeness, or reliability
                of any information displayed. Information on our website may
                contain:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Technical inaccuracies or typographical errors</li>
                <li>Outdated or deprecated information</li>
                <li>Third-party information beyond our control</li>
                <li>User-generated content or submissions</li>
                <li>
                  Content that may be offensive or inappropriate to some users
                </li>
              </ul>
              <p className="mt-4">
                We reserve the right to make changes or corrections to website
                content at any time without notice.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Third-Party Links & Content
              </h2>
              <p>
                Our website may contain links to third-party websites,
                resources, and services. WebXCrafting does not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Endorse or recommend third-party websites or content</li>
                <li>
                  Approve or guarantee the accuracy of third-party information
                </li>
                <li>
                  Assume responsibility for third-party services or products
                </li>
                <li>Control third-party privacy practices or content</li>
                <li>
                  Warrant the availability or functionality of external links
                </li>
              </ul>
              <p className="mt-4">
                Your use of third-party websites is entirely at your own risk
                and subject to their terms and conditions. WebXCrafting is not
                liable for any loss or damage resulting from your reliance on or
                use of third-party websites.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Website Availability & Interruptions
              </h2>
              <p>
                While we strive to maintain uninterrupted website availability,
                we do not guarantee that our website will be available 24/7
                without interruption or errors. Our website may be unavailable
                due to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Planned maintenance and updates</li>
                <li>Server downtime or technical issues</li>
                <li>Internet connectivity problems</li>
                <li>Cyber attacks or security incidents</li>
                <li>Third-party service failures</li>
                <li>Natural disasters or force majeure events</li>
              </ul>
              <p className="mt-4">
                WebXCrafting is not liable for any loss or inconvenience
                resulting from website unavailability or performance issues.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Development Work Limitations
              </h2>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                6.1 Browser & Device Compatibility
              </h3>
              <p>
                While we design websites to be compatible with major browsers
                and devices, we do not guarantee compatibility with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Legacy or outdated browsers</li>
                <li>Unusual device configurations</li>
                <li>Specialized assistive technologies</li>
                <li>Future browser or OS versions (beyond our control)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                6.2 Third-Party Integrations
              </h3>
              <p>
                Websites often integrate with third-party services (payment
                gateways, APIs, analytics platforms). WebXCrafting is not
                responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Downtime or failures of third-party services</li>
                <li>Changes to third-party APIs or services</li>
                <li>Deprecated or discontinued services</li>
                <li>Third-party data breaches or security issues</li>
                <li>Compliance issues with third-party terms</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                6.3 Performance Expectations
              </h3>
              <p>
                Website performance depends on many factors beyond our control,
                including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>User's internet connection speed</li>
                <li>User's device capabilities</li>
                <li>Hosting provider infrastructure</li>
                <li>Content Delivery Network (CDN) performance</li>
                <li>Database query optimization and server load</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Security Disclaimer
              </h2>
              <p>
                While we implement industry-standard security measures, no
                online service is completely secure. WebXCrafting does not
                guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Prevention of all security breaches or cyber attacks</li>
                <li>
                  Protection against zero-day exploits or advanced threats
                </li>
                <li>Complete protection of transmitted data</li>
                <li>Security of data on Client's own systems</li>
                <li>
                  Prevention of unauthorized access if credentials are
                  compromised
                </li>
              </ul>
              <p className="mt-4">Clients are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Keeping login credentials confidential</li>
                <li>Maintaining strong passwords and 2FA</li>
                <li>Updating software and security patches</li>
                <li>Regular backups of critical data</li>
                <li>Compliance with their own security policies</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Content Responsibility
              </h2>
              <p>WebXCrafting is not responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Content accuracy or legality (Client's responsibility)</li>
                <li>
                  Intellectual property infringement claims from Client-provided
                  content
                </li>
                <li>Offensive, defamatory, or inappropriate content</li>
                <li>
                  Compliance with industry-specific regulations (healthcare,
                  finance, etc.)
                </li>
                <li>Data accuracy or completeness in Client databases</li>
              </ul>
              <p className="mt-4">
                Clients warrant that they have the right to use all provided
                content and that such content does not infringe on third-party
                rights.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Professional Disclaimer
              </h2>
              <p>
                WebXCrafting provides web development services, not professional
                services in other fields. If our website contains content
                related to legal, financial, medical, or business matters, this
                content is:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Provided for informational purposes only</li>
                <li>Not professional advice in those specific fields</li>
                <li>Not a substitute for professional consultation</li>
                <li>Not guaranteed to be accurate or complete</li>
              </ul>
              <p className="mt-4">
                For legal, financial, medical, or business advice, consult with
                appropriate licensed professionals.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Compliance Limitation
              </h2>
              <p>
                While we strive to comply with applicable laws and regulations,
                WebXCrafting:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Does not guarantee compliance with industry-specific
                  regulations
                </li>
                <li>Is not responsible for Client's compliance obligations</li>
                <li>Does not provide legal or compliance advice</li>
                <li>
                  Recommends consultation with legal professionals for
                  compliance matters
                </li>
                <li>Cannot guarantee future compliance as laws change</li>
              </ul>
              <p className="mt-4">
                Clients are fully responsible for ensuring their use of our
                services complies with all applicable laws and regulations in
                their jurisdiction.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Beta Features & Experimental Services
              </h2>
              <p>
                Some features or services may be marked as "Beta,"
                "Experimental," or "In Development." These features:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Are provided "as-is" without warranties</li>
                <li>May contain bugs or instability</li>
                <li>May change or be discontinued without notice</li>
                <li>Are not recommended for production use</li>
                <li>Are fully at the user's own risk</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Data Backup & Loss
              </h2>
              <p>
                While we implement backup procedures, WebXCrafting does not
                guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Complete data recovery in all circumstances</li>
                <li>Zero data loss under any conditions</li>
                <li>Immediate recovery time objective (RTO)</li>
                <li>Protection against Client's own data deletion</li>
              </ul>
              <p className="mt-4">
                Clients are strongly encouraged to maintain their own
                independent backups of critical data. WebXCrafting is not liable
                for any data loss, corruption, or inability to recover data.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                13. No Professional Warranty
              </h2>
              <p>
                WebXCrafting provides development services based on industry
                standards and best practices. However, we do not warrant:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Specific results or business outcomes</li>
                <li>Increased sales, traffic, or conversions</li>
                <li>Search engine rankings or SEO results</li>
                <li>User experience improvements or satisfaction</li>
                <li>Performance metrics or benchmarks</li>
              </ul>
              <p className="mt-4">
                Website success depends on many factors beyond our control,
                including marketing efforts, product quality, market conditions,
                and user behavior.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                14. Force Majeure
              </h2>
              <p>
                WebXCrafting is not liable for any failure to perform services
                due to circumstances beyond reasonable control, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Natural disasters (earthquakes, floods, hurricanes)</li>
                <li>War, terrorism, or civil unrest</li>
                <li>Pandemics or epidemics</li>
                <li>Government actions or regulations</li>
                <li>Strikes, lockouts, or labor disputes</li>
                <li>Internet infrastructure failures</li>
                <li>Utility company outages</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                15. Severability
              </h2>
              <p>
                If any part of this disclaimer is found to be invalid or
                unenforceable, the remaining provisions shall continue in full
                effect. The invalidity of any provision shall not affect the
                validity of other provisions.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                16. Contact Information
              </h2>
              <p>For questions about this disclaimer:</p>
              <div className="mt-4 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <p>
                  <strong>Email:</strong> webxcrafting@gmail.com
                </p>
                <p className="mt-2">
                  <strong>Contact Form:</strong>{" "}
                  <Link
                    href="/contact"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Visit our contact page
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
