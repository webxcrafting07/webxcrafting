import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | WebXCrafting",
  description:
    "WebXCrafting Privacy Policy - How we collect, use, and protect your personal data",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#030510] text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
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
                1. Introduction
              </h2>
              <p>
                WebXCrafting ("we," "us," "our," or "Company") respects your
                privacy and is committed to protecting your personal data. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website, use our
                services, and interact with us.
              </p>
              <p className="mt-4">
                Please read this Privacy Policy carefully. By accessing and
                using WebXCrafting, you acknowledge that you have read,
                understood, and agree to be bound by all the terms of this
                Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Contact Information:</strong> Name, email address,
                  phone number, company name, address
                </li>
                <li>
                  <strong>Account Information:</strong> Username, password,
                  profile information when registering for an account
                </li>
                <li>
                  <strong>Project Details:</strong> Information about your
                  project requirements, specifications, and preferences
                </li>
                <li>
                  <strong>Communication:</strong> Messages, inquiries, feedback,
                  and support requests
                </li>
                <li>
                  <strong>Payment Information:</strong> Transaction details (we
                  do not store full credit card details; payment processing is
                  handled by secure third parties)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent, links
                  clicked, referral source
                </li>
                <li>
                  <strong>Device Information:</strong> IP address, browser type,
                  operating system, device identifiers
                </li>
                <li>
                  <strong>Cookies & Tracking:</strong> We use cookies, pixels,
                  and similar technologies to enhance your experience
                </li>
                <li>
                  <strong>Analytics:</strong> Performance metrics to improve our
                  website and services
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                2.3 Third-Party Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Information from business partners and service providers
                </li>
                <li>
                  Data from publicly available sources to verify information or
                  enhance services
                </li>
                <li>
                  Information with your consent from third-party platforms
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>
                  Responding to inquiries, requests, and providing customer
                  support
                </li>
                <li>
                  Sending promotional updates, newsletters (with your consent)
                </li>
                <li>Personalizing and customizing your experience</li>
                <li>Analyzing website usage and performance</li>
                <li>
                  Detecting and preventing fraud, security incidents, and abuse
                </li>
                <li>
                  Complying with legal obligations and enforcing agreements
                </li>
                <li>Marketing and business development activities</li>
                <li>Creating anonymous, aggregated analytics data</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. How We Share Your Information
              </h2>
              <p>
                We do not sell your personal data. However, we may share
                information in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                4.1 Service Providers
              </h3>
              <p>
                We engage trusted third parties (hosting providers, email
                services, payment processors, analytics platforms) who process
                data on our behalf under strict confidentiality agreements.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                4.2 Business Partners
              </h3>
              <p>
                With your consent, we may share information with partners to
                enhance our services or develop new offerings.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                4.3 Legal Compliance
              </h3>
              <p>
                We may disclose information when required by law, law
                enforcement requests, or to protect our rights, privacy, and
                safety.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                4.4 Business Transfers
              </h3>
              <p>
                In case of merger, acquisition, bankruptcy, or asset sale, your
                information may be transferred as part of that transaction.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Data Security
              </h2>
              <p>
                We implement industry-standard security measures including
                encryption, firewalls, and secure servers to protect your data.
                However, no method of transmission over the Internet is
                completely secure. We cannot guarantee absolute security.
              </p>
              <p className="mt-4">
                Our team members are trained on data protection practices, and
                we maintain strict access controls to personal data.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Cookies & Tracking Technologies
              </h2>
              <p>
                We use a strictly necessary cookie only for admin authentication
                and session verification. We do not currently use analytics,
                marketing, or advertising cookies on the public-facing website.
              </p>
              <p className="mt-4">
                For detailed information about the admin cookie, please refer to
                our{" "}
                <Link
                  href="/cookie-policy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Data Retention
              </h2>
              <p>
                We retain your personal data for as long as necessary to fulfill
                the purposes outlined in this Privacy Policy, unless a longer
                retention period is required or permitted by law. When data is
                no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Your Rights & Choices
              </h2>
              <p>
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Correction:</strong> Update inaccurate or incomplete
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request removal of your data (right
                  to be forgotten)
                </li>
                <li>
                  <strong>Portability:</strong> Receive data in a structured
                  format
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing
                  communications
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Revoke previously given
                  consent
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at privacy@webxcrafting.com
                with "Data Request" in the subject line.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. GDPR & International Compliance
              </h2>
              <p>
                If you are in the EU, EEA, or UK, your data is protected under
                GDPR. We process data only with a lawful basis such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Your explicit consent</li>
                <li>Performance of a contract</li>
                <li>Compliance with legal obligations</li>
                <li>Protection of vital interests</li>
                <li>Legitimate business interests</li>
              </ul>
              <p className="mt-4">
                You have the right to lodge a complaint with your local data
                protection authority.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Children's Privacy
              </h2>
              <p>
                Our services are not directed to children under 13 years of age.
                We do not knowingly collect personal data from children. If we
                discover such data, we will delete it promptly. Parents or
                guardians concerned about a child's data should contact us
                immediately.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for their privacy practices. Please review their
                privacy policies before providing personal information.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Policy Updates
              </h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be
                posted on this page with an updated date. Your continued use of
                our services constitutes acceptance of the revised policy.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                13. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data
                practices:
              </p>
              <div className="mt-4 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <p>
                  <strong>Email:</strong> privacy@webxcrafting.com
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
                <p className="mt-2">
                  <strong>Mail:</strong> WebXCrafting, India
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
