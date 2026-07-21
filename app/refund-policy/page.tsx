import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | WebXCrafting",
  description:
    "WebXCrafting Refund and Cancellation Policy - Terms for refunds, cancellations, and project modifications",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#030510] text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Refund & Cancellation Policy
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
                1. Overview
              </h2>
              <p>
                This Refund & Cancellation Policy outlines the terms under which
                clients may cancel projects, request refunds, or modify
                services. WebXCrafting strives to deliver exceptional service,
                but we understand that circumstances may change. Our policy
                balances client satisfaction with protection of our resources
                and development efforts.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Project Cancellation Policy
              </h2>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                2.1 Within 7 Days of Project Start (Grace Period)
              </h3>
              <p>
                If a client requests cancellation within 7 days of project
                commencement:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Refund Amount:</strong> 90% of the deposit or advance
                  payment
                </li>
                <li>
                  <strong>Condition:</strong> Minimal work must have been
                  initiated
                </li>
                <li>
                  <strong>Processing Time:</strong> Refund processed within 10
                  business days
                </li>
                <li>
                  <strong>Requirement:</strong> Client must provide written
                  cancellation request
                </li>
              </ul>
              <p className="mt-4">
                <strong>Exception:</strong> If 40% or more of work has been
                completed, the grace period does not apply and regular
                cancellation terms apply.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                2.2 During Active Development (8 Days - 80% Completion)
              </h3>
              <p>
                Once active development has commenced beyond the grace period:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Non-Refundable Portion:</strong> All payments made are
                  non-refundable once development has commenced
                </li>
                <li>
                  <strong>Partial Deliverables:</strong> Client receives all
                  work completed to date in its current state
                </li>
                <li>
                  <strong>Remaining Balance:</strong> Must be paid in full for
                  completed work
                </li>
                <li>
                  <strong>Cancellation Fee:</strong> 15% of remaining project
                  cost (to cover planning, resources allocated)
                </li>
              </ul>
              <p className="mt-4">
                <strong>Example:</strong> If a 10,000 project is 50% complete
                when cancelled, the client pays 5,000 for completed work +750
                cancellation fee = 5,750 total.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                2.3 Near Completion (80% or More)
              </h3>
              <p>If the project is 80% or more complete:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Full Payment Required:</strong> 100% of the project
                  cost must be paid
                </li>
                <li>
                  <strong>Delivery:</strong> All completed work is delivered
                  as-is
                </li>
                <li>
                  <strong>Resumption Option:</strong> Client may request
                  remaining work be completed within 30 days
                </li>
                <li>
                  <strong>Extension Charges:</strong> Any work extending beyond
                  30 days is billed separately
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                2.4 No Refunds After Project Launch
              </h3>
              <p>
                Once the website/application is launched and goes live on the
                client's domain or server:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>No refunds are available under any circumstances</li>
                <li>All payment obligations are complete</li>
                <li>Client has full ownership of the delivered project</li>
                <li>
                  Post-launch support (maintenance, updates) is available as a
                  separate service
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Refund Process
              </h2>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                3.1 Cancellation Request
              </h3>
              <p>To request cancellation, the client must:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4 mt-4">
                <li>
                  Submit a written cancellation request via email to
                  webxcrafting@gmail.com
                </li>
                <li>
                  Include the project name, project ID, and reason for
                  cancellation
                </li>
                <li>Specify the refund amount being requested</li>
                <li>Wait for written confirmation from WebXCrafting</li>
              </ol>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                3.2 Refund Processing Timeline
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Approval:</strong> WebXCrafting reviews the request
                  within 5 business days
                </li>
                <li>
                  <strong>Processing:</strong> Once approved, refunds are
                  processed within 10 business days
                </li>
                <li>
                  <strong>Bank Transfer:</strong> 5-7 business days depending on
                  the client's bank
                </li>
                <li>
                  <strong>Credit Card/Third-Party:</strong> May take up to 14
                  business days
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                3.3 Refund Method
              </h3>
              <p>
                Refunds are issued using the same payment method as the original
                transaction:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Bank transfers refunded to the original account</li>
                <li>Credit cards refunded to the same card</li>
                <li>
                  Third-party processors (PayPal, Stripe) refunded accordingly
                </li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> WebXCrafting is not responsible for
                banking delays or issues on the client's end.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                3.4 Refund Verification
              </h3>
              <p>Before processing a refund, we verify:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Valid project agreement exists</li>
                <li>Cancellation request is within applicable policy</li>
                <li>No ongoing payment disputes</li>
                <li>Client has fulfilled their obligations</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Scope Changes & Modifications
              </h2>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                4.1 Scope Expansion
              </h3>
              <p>
                If the client requests additional features or scope beyond the
                original proposal:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>A separate change order or quotation is provided</li>
                <li>Additional costs are outlined and must be approved</li>
                <li>Timeline may be extended accordingly</li>
                <li>Client must agree in writing before work begins</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                4.2 Scope Reduction
              </h3>
              <p>If the client reduces the project scope:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Cost reduction is calculated based on work saved</li>
                <li>Work already completed cannot be refunded</li>
                <li>Any payments already made are applied to the new cost</li>
                <li>A revised agreement is executed</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                4.3 Feature Removal or Change
              </h3>
              <p>
                If features are changed or removed after development begins:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Changes made prior to implementation are included in the
                  project
                </li>
                <li>Changes to completed features may incur rework fees</li>
                <li>
                  Refunds are not available for development time already spent
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Client-Initiated Project Suspension
              </h2>
              <p>If a client requests to temporarily suspend a project:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Suspension Period:</strong> Projects may be suspended
                  for up to 30 days without penalty
                </li>
                <li>
                  <strong>Team Allocation:</strong> Beyond 30 days, our team may
                  be reallocated to other projects
                </li>
                <li>
                  <strong>Resumption:</strong> Project can usually resume but
                  timeline may be extended
                </li>
                <li>
                  <strong>Payment:</strong> Outstanding payments remain due
                  regardless of suspension
                </li>
                <li>
                  <strong>Fees:</strong> Storage and overhead fees may apply for
                  extended suspensions
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Non-Refundable Items
              </h2>
              <p>
                The following are non-refundable regardless of circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Domain registration or renewal fees</li>
                <li>
                  Hosting fees (unless part of a managed service cancellation)
                </li>
                <li>SSL Certificates</li>
                <li>Third-party software licenses or APIs</li>
                <li>Planning, consultation, and design time</li>
                <li>
                  Premium plugin or template licenses (if specific to project)
                </li>
                <li>Content creation services (copywriting, photography)</li>
                <li>Past due invoices or late payment fees</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Maintenance & Support Services
              </h2>
              <p>
                Cancellation policies for ongoing maintenance and support
                services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Monthly Retainers:</strong> Can be cancelled with 30
                  days written notice; no refund for current month
                </li>
                <li>
                  <strong>Annual Plans:</strong> Can be cancelled with 60 days
                  notice; pro-rata refund for unused months
                </li>
                <li>
                  <strong>Support Tickets:</strong> Cannot be refunded once work
                  has been initiated
                </li>
                <li>
                  <strong>Cancellation Effective Date:</strong> Cancellations
                  take effect at the end of the current billing cycle
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Unsatisfactory Work
              </h2>
              <p>If a client is unsatisfied with the delivered work:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Revision Rounds:</strong> Included revision rounds
                  (typically 2-3) allow for changes
                </li>
                <li>
                  <strong>Communication:</strong> Issues must be communicated in
                  writing within 7 days of delivery
                </li>
                <li>
                  <strong>Resolution:</strong> WebXCrafting will work to address
                  specific concerns
                </li>
                <li>
                  <strong>Refund Ineligibility:</strong> If work meets the
                  agreed specifications, a refund cannot be issued due to
                  subjective dissatisfaction
                </li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> This policy does not apply if
                WebXCrafting has failed to meet the project specifications.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Payment Disputes
              </h2>
              <p>If a client disputes a charge or initiates a chargeback:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  <strong>Communication Required:</strong> Clients must contact
                  us first to resolve the dispute
                </li>
                <li>
                  <strong>Documentation:</strong> WebXCrafting will provide
                  invoice and project documentation
                </li>
                <li>
                  <strong>Credit Card Chargebacks:</strong> Pursuing chargebacks
                  may result in account suspension or legal action
                </li>
                <li>
                  <strong>Resolution:</strong> Disputes are resolved through
                  negotiation or mediation
                </li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. WebXCrafting-Initiated Cancellation
              </h2>
              <p>WebXCrafting may cancel a project if:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Client fails to pay within 30 days of invoice</li>
                <li>
                  Client violates the Terms of Service or Acceptable Use Policy
                </li>
                <li>
                  Client provides illegal or unethical project requirements
                </li>
                <li>Client is unresponsive for more than 14 days</li>
                <li>
                  The project involves illegal activity or infringes on rights
                </li>
              </ul>
              <p className="mt-4">
                In case of WebXCrafting-initiated cancellation, all completed
                work remains with WebXCrafting and no refund is issued.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Refund Limitations
              </h2>
              <p>Please note the following limitations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Refunds must be requested in writing within 30 days of
                  cancellation
                </li>
                <li>Refunds are not issued for Client breach of contract</li>
                <li>
                  Refunds are not issued if project specifications were met
                </li>
                <li>
                  Refunds do not include non-refundable items listed above
                </li>
                <li>Refund eligibility is determined solely by WebXCrafting</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Special Circumstances
              </h2>
              <p>
                WebXCrafting understands that special circumstances may arise.
                For requests outside the standard policy (hardship, force
                majeure, etc.):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>
                  Contact us at webxcrafting@gmail.com with detailed
                  explanation
                </li>
                <li>Provide supporting documentation if available</li>
                <li>
                  We will review and make a decision on a case-by-case basis
                </li>
                <li>No guarantees that exceptions will be approved</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                13. Policy Updates
              </h2>
              <p>
                WebXCrafting may update this Refund & Cancellation Policy at any
                time. Updated policies apply to future projects. Existing
                project agreements are governed by the policy terms at the time
                of the agreement.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                14. Contact & Disputes
              </h2>
              <p>For refund requests or policy questions:</p>
              <div className="mt-4 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <p>
                  <strong>Email:</strong> webxcrafting@gmail.com
                </p>
                <p className="mt-2">
                  <strong>Subject Line:</strong> Refund Request - [Project Name]
                </p>
                <p className="mt-2">
                  <strong>Legal Inquiries:</strong> webxcrafting@gmail.com
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

            {/* Quick Reference Table */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Quick Reference: Cancellation Refund Chart
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-900">
                      <th className="text-left p-3">Project Stage</th>
                      <th className="text-left p-3">Refund %</th>
                      <th className="text-left p-3">Cancellation Fee</th>
                      <th className="text-left p-3">Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-3">Within 7 Days</td>
                      <td className="p-3">90%</td>
                      <td className="p-3">None</td>
                      <td className="p-3">Minimal work started</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3">8-80% Complete</td>
                      <td className="p-3">0%</td>
                      <td className="p-3">15% of remaining</td>
                      <td className="p-3">Pay for completed work</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3">80%+ Complete</td>
                      <td className="p-3">0%</td>
                      <td className="p-3">None</td>
                      <td className="p-3">Full payment required</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3">After Launch</td>
                      <td className="p-3">0%</td>
                      <td className="p-3">None</td>
                      <td className="p-3">No refunds available</td>
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
  );
}
