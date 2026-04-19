import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | WebXCrafting',
  description: 'WebXCrafting Terms of Service - Legal terms governing your use of our services',
}

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#030510] text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legal agreement between you ("Client," "User," or "you") and WebXCrafting ("Company," "we," "us," or "our"). By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms in their entirety.
            </p>
            <p className="mt-4">
              If you do not agree with any part of these Terms, you may not use our services. We reserve the right to modify these Terms at any time without prior notice. Your continued use of our services constitutes acceptance of any changes.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services Scope</h2>
            <p>
              WebXCrafting provides web development, web design, e-commerce solutions, job portals, custom web applications, and related digital services ("Services"). Specific service details, deliverables, timelines, and pricing are outlined in individual project agreements or proposals.
            </p>
            <p className="mt-4">
              The scope of Services includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Website design and development</li>
              <li>Custom web application development</li>
              <li>E-commerce platform setup and integration</li>
              <li>Job portal creation and management systems</li>
              <li>Responsive design and mobile optimization</li>
              <li>Integration with third-party services (payment gateways, APIs, databases)</li>
              <li>Content management system setup</li>
              <li>Testing and quality assurance</li>
              <li>Technical support during development phase</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Project Agreement & Proposal</h2>
            <p>
              Before commencing work, we will provide a detailed proposal outlining:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Project scope and deliverables</li>
              <li>Timeline and milestones</li>
              <li>Pricing and payment terms</li>
              <li>Technical specifications</li>
              <li>Number of revision rounds</li>
              <li>Support and maintenance terms</li>
            </ul>
            <p className="mt-4">
              The Client must review and approve the proposal before work begins. Any changes to the scope are subject to a separate change order and may impact timeline and cost.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment & Billing</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.1 Payment Terms</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A deposit (typically 50% of project cost) is required to commence work</li>
              <li>Remaining balance is due upon project completion</li>
              <li>Payment terms will be specified in the project proposal</li>
              <li>We accept various payment methods: bank transfer, credit cards, and payment gateways</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.2 Late Payments</h3>
            <p>
              If payment is not received within the agreed timeframe, we reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Suspend work or delivery of services</li>
              <li>Charge late fees (as specified in the project agreement)</li>
              <li>Withhold access to deliverables</li>
              <li>Terminate the project and invoice for work completed</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.3 Currency & Taxes</h3>
            <p>
              All prices are quoted in INR (Indian Rupees) unless otherwise specified. If you are outside India, international payment methods may incur additional charges. You are responsible for any applicable taxes, VAT, or duties in your jurisdiction.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Revisions & Changes</h2>
            <p>
              Unless otherwise specified, the standard package includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Up to 2-3 rounds of revisions during development</li>
              <li>Revisions typically include changes to design, layout, and basic functionality</li>
              <li>Major revisions, scope changes, or additional features may require additional payment</li>
            </ul>
            <p className="mt-4">
              All revision requests must be submitted in writing. We will implement revisions within a reasonable timeframe (typically 3-5 business days). Additional revision rounds beyond the included limit will be charged at our standard hourly rate.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Client Responsibilities</h2>
            <p>The Client agrees to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Provide accurate, timely, and complete information for the project</li>
              <li>Supply necessary content (text, images, logos, videos) in usable formats</li>
              <li>Respond to communications within 2-3 business days</li>
              <li>Review deliverables and provide feedback promptly</li>
              <li>Provide timely approvals to prevent project delays</li>
              <li>Ensure compliance with applicable laws and regulations</li>
              <li>Own all rights to provided content or obtain permission</li>
              <li>Keep login credentials and access information confidential</li>
            </ul>
            <p className="mt-4">
              Delays caused by Client non-compliance may extend project timelines. WebXCrafting is not liable for delays caused by Client actions or inaction.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.1 Work Product</h3>
            <p>
              Upon full payment, the Client receives ownership of the final website/application code and design. This includes source code, design files, and all custom-developed components specific to the project.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.2 WebXCrafting IP</h3>
            <p>
              WebXCrafting retains ownership of:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Pre-existing templates, frameworks, and libraries</li>
              <li>Tools, processes, and methodologies developed</li>
              <li>General concepts and ideas applicable to other projects</li>
              <li>Our logo, brand, and marketing materials</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.3 Third-Party IP</h3>
            <p>
              The Client is responsible for ensuring that all provided content does not infringe upon third-party intellectual property rights. WebXCrafting is not liable for IP infringement claims related to Client-provided content.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.4 Open Source</h3>
            <p>
              If the project uses open-source libraries or frameworks, the Client must comply with their respective licenses. WebXCrafting will provide documentation of all open-source components used.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Hosting & Domain Management</h2>
            <p>
              Website hosting and domain registration are separate from development services:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>We can assist in setting up hosting, but the Client typically owns and manages the hosting account</li>
              <li>The Client is responsible for annual domain renewal and hosting fees</li>
              <li>WebXCrafting can manage hosting on behalf of the Client (paid separately)</li>
              <li>Server maintenance, backups, and security updates are the Client's responsibility unless included in a maintenance package</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Timeline & Delivery</h2>
            <p>
              Project timelines are estimates and depend on:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Client feedback and approval timeliness</li>
              <li>Clarity and completeness of project requirements</li>
              <li>Third-party API or service availability</li>
              <li>Availability of Client resources and decisions</li>
            </ul>
            <p className="mt-4">
              WebXCrafting will make reasonable efforts to meet proposed timelines but cannot guarantee specific delivery dates due to unforeseen circumstances. If delays exceed 2 weeks beyond the agreed timeline due to our negligence, the Client may request a partial refund of outstanding payment (not to exceed 10% of project cost).
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Warranty & Disclaimer</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">10.1 Development Warranty</h3>
            <p>
              The delivered website/application will:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Function as specified in the project proposal</li>
              <li>Be compatible with major browsers (Chrome, Firefox, Safari, Edge)</li>
              <li>Be responsive on mobile, tablet, and desktop devices</li>
              <li>Be free of critical bugs at launch (minor bugs may exist)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">10.2 Post-Launch Support</h3>
            <p>
              We provide limited support for 30 days after launch to address critical bugs. After this period, ongoing support and maintenance are available as paid services.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">10.3 General Warranty Disclaimer</h3>
            <p>
              WebXCrafting provides services "as-is" without warranty of any kind, express or implied. We disclaim liability for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Third-party integrations or APIs</li>
              <li>Website performance in future web browsers or technologies</li>
              <li>Data loss (Client is responsible for backups)</li>
              <li>Security breaches resulting from Client negligence</li>
              <li>Compatibility with future updates or OS versions</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Limitation of Liability</h2>
            <p>
              In no event shall WebXCrafting be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Indirect, incidental, consequential, or punitive damages</li>
              <li>Lost profits, revenue, data, or business opportunities</li>
              <li>Damages exceeding the total amount paid for the project</li>
              <li>Claims arising from Client misuse or non-compliance</li>
              <li>Third-party claims unrelated to our negligence</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Business information, strategies, and trade secrets</li>
              <li>Project details and technical specifications</li>
              <li>Login credentials and access information</li>
              <li>Personal data of the Client's customers (as applicable)</li>
            </ul>
            <p className="mt-4">
              WebXCrafting may use the completed project in its portfolio (unless the Client opts out) and may reference the Client's company name in marketing materials.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Termination</h2>
            <p>
              Either party may terminate the project agreement:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li><strong>By mutual consent:</strong> Both parties agree in writing</li>
              <li><strong>For breach:</strong> If a party materially breaches these Terms and fails to cure within 7 days of written notice</li>
              <li><strong>For non-payment:</strong> If the Client fails to pay within 30 days of the invoice date</li>
            </ul>
            <p className="mt-4">
              In case of termination, the Client pays for all work completed up to that point. Partial work may not be delivered. Upon termination, all access to the project will be revoked unless the final balance is paid.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Acceptable Use Policy</h2>
            <p>
              The Client agrees not to use Services to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Create illegal content or facilitate illegal activities</li>
              <li>Harass, abuse, or defame any individual or organization</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware, spam, or viruses</li>
              <li>Engage in phishing, fraud, or deception</li>
              <li>Violate privacy or data protection laws</li>
              <li>Access systems without authorization</li>
              <li>Overload or disrupt server operations</li>
            </ul>
            <p className="mt-4">
              WebXCrafting may refuse service or terminate the agreement if the above terms are violated.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Indemnification</h2>
            <p>
              The Client agrees to indemnify and hold harmless WebXCrafting from any claims, damages, losses, or expenses arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Client-provided content or data</li>
              <li>Client violation of these Terms</li>
              <li>Client violation of applicable laws</li>
              <li>Third-party IP infringement claims related to Client content</li>
              <li>Client use of the Services in unauthorized ways</li>
            </ul>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms shall be resolved as follows:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4 mt-4">
              <li><strong>Negotiation:</strong> Both parties will attempt to resolve the dispute in good faith</li>
              <li><strong>Mediation:</strong> If unresolved, either party may request mediation</li>
              <li><strong>Arbitration/Litigation:</strong> Disputes shall be governed by the laws of India and resolved in the courts of India</li>
            </ol>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">17. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of India, without regard to principles of conflict of law. Both parties agree to the exclusive jurisdiction of Indian courts.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">18. Contact Information</h2>
            <p>For questions about these Terms:</p>
            <div className="mt-4 p-6 bg-gray-900 rounded-lg border border-gray-700">
              <p><strong>Email:</strong> legal@webxcrafting.com</p>
              <p className="mt-2"><strong>Contact Form:</strong> <Link href="/contact" className="text-blue-400 hover:text-blue-300">Visit our contact page</Link></p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}
