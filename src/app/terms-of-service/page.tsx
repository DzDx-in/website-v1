'use client';

import Link from 'next/link';
import EarthBackground from '@/components/EarthBackground';

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      
      <main className="relative z-20 flex flex-col min-h-screen px-5 py-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow-strong">
              DZDX Terms of Service
            </h1>
            <p className="text-dzdx-blue font-semibold">
              <strong>Last updated: 05/08/2025</strong>
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8 space-y-6">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Introduction
              </h2>
              <p className="text-white/90 leading-relaxed mb-4">
                Welcome to DZDX Solutions Private Limited (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;)!
                These Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) govern your use of our website located at dzdx.in operated by DZDX Solutions Private Limited.
              </p>
              <div className="text-white/90 space-y-2">
                <p><strong className="text-dzdx-blue">Company Details:</strong> DZDX Solutions Private Limited</p>
                <p><strong className="text-dzdx-blue">CIN:</strong> U62090UP2025PTC224447</p>
                <p><strong className="text-dzdx-blue">Registered Address:</strong> Off No. 19, First Floor, Sgm Plaza, 8/226(1), Arya Nagar (Kanpur Nagar), Kanpur Nagar, Arya Nagar, Uttar Pradesh, India, 208002.</p>
                <p><strong className="text-dzdx-blue">Contact:</strong> <a href="mailto:support@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">support@dzdx.in</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Acceptance of Terms
              </h2>
              <p className="text-white/90 leading-relaxed mb-3">
                Your agreement with us includes these Terms and our Privacy Policy. You acknowledge that you have read and understood these Agreements, and agree to be bound by them.
              </p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li><strong className="text-dzdx-blue">Electronic Signature:</strong> By clicking &quot;I Agree,&quot; continuing to use the Service, or accessing any content, you provide your electronic signature and consent under the Information Technology Act, 2000</li>
                <li><strong className="text-dzdx-blue">Free Service:</strong> The Service is provided at no monetary cost to users. Should DZDX ever introduce paid features, separate terms will be presented for your review and acceptance</li>
                <li><strong className="text-dzdx-blue">Disagreement:</strong> If you do not agree with these Terms, please contact us at <a href="mailto:support@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">support@dzdx.in</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Grievance Officer & Compliance
              </h2>
              <div className="text-white/90 space-y-3">
                <p><strong className="text-dzdx-blue">Grievance Officer Email:</strong> <a href="mailto:grievance@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">grievance@dzdx.in</a></p>
                <p><strong className="text-dzdx-blue">Complaint Resolution Timeline:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Acknowledgment: Within 72 hours of receipt</li>
                  <li>• Resolution: Within 15 days of acknowledgment</li>
                  <li>• All complaints handled in accordance with IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Communications
              </h2>
              <p className="text-white/90 leading-relaxed">
                By using our Service, you agree to subscribe to newsletters, marketing or promotional materials. You may opt out by following the unsubscribe link or emailing <a href="mailto:support@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">support@dzdx.in</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Content & Intellectual Property
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>Content found on this Service is the property of DZDX Solutions Private Limited or used with permission</li>
                <li>You may not distribute, modify, transmit, or use said Content without express written permission</li>
                <li><strong className="text-dzdx-blue">User-Generated Content:</strong> By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use such content</li>
                <li>Service and its original content remain the exclusive property of DZDX Solutions Private Limited</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                User Indemnification
              </h2>
              <p className="text-white/90 leading-relaxed mb-3">
                You agree to indemnify and hold harmless DZDX Solutions Private Limited from claims arising from:
              </p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit through the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Prohibited Uses
              </h2>
              <p className="text-white/90 leading-relaxed mb-3">
                You agree not to use the Service:
              </p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>In violation of applicable laws or regulations</li>
                <li>To exploit or harm minors</li>
                <li>For spam or unauthorized solicitation</li>
                <li>To impersonate others</li>
                <li>For illegal, fraudulent, or harmful purposes</li>
                <li>To interfere with service functionality</li>
                <li>To gain unauthorized access to systems</li>
                <li>To introduce malicious software</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Account Responsibilities
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>You must be at least 18 years old to create an account</li>
                <li>You must provide accurate, complete, and current information</li>
                <li>You are responsible for maintaining account confidentiality</li>
                <li>You are liable for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Copyright Policy & DMCA
              </h2>
              <p className="text-white/90 leading-relaxed mb-3">
                We respect intellectual property rights. For copyright infringement claims, please contact our Designated Agent:
              </p>
              <div className="text-white/90 space-y-2">
                <p><strong className="text-dzdx-blue">Copyright Desk</strong></p>
                <p>DZDX Solutions Private Limited</p>
                <p>Off No. 19, First Floor, SGM Plaza, 8/226(1), Arya Nagar, Kanpur, Uttar Pradesh 208002, India</p>
                <p>Email: <a href="mailto:copyright@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">copyright@dzdx.in</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Service Availability & Termination
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>We may terminate or suspend accounts for violation of Terms</li>
                <li>We may modify or discontinue services at any time</li>
                <li>Upon termination, you may request data export within 30 days</li>
                <li>Data may be permanently deleted after 90 days unless legally required to retain</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Disclaimers & Limitations
              </h2>
              <div className="text-white/90 space-y-3">
                <p><strong className="text-dzdx-blue">Disclaimer:</strong> Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.</p>
                <p><strong className="text-dzdx-blue">Limitation of Liability:</strong> Our liability is limited to the amount paid for services in the preceding 12 months.</p>
                <p><strong className="text-dzdx-blue">Consumer Rights:</strong> Nothing excludes warranties that cannot be excluded under applicable consumer protection laws.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Governing Law & Dispute Resolution
              </h2>
              <p className="text-white/90 leading-relaxed mb-3">
                These Terms are governed by the laws of India. Dispute resolution process:
              </p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li><strong className="text-dzdx-blue">Negotiation:</strong> Good faith negotiation for 30 days</li>
                <li><strong className="text-dzdx-blue">Mediation:</strong> Mediation in Kanpur, Uttar Pradesh</li>
                <li><strong className="text-dzdx-blue">Arbitration:</strong> Final settlement under Arbitration and Conciliation Act, 2015</li>
                <li><strong className="text-dzdx-blue">Jurisdiction:</strong> Exclusive jurisdiction of courts in Kanpur, Uttar Pradesh</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Changes to Terms
              </h2>
              <p className="text-white/90 leading-relaxed">
                We may amend these Terms at any time. For material changes affecting your rights, we will provide 30 days&apos; prior notice via email or website notice. Your continued use constitutes acceptance of revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Contact Information
              </h2>
              <div className="text-white/90 space-y-2">
                <p><strong className="text-dzdx-blue">General Support:</strong> <a href="mailto:support@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">support@dzdx.in</a></p>
                <p><strong className="text-dzdx-blue">Grievance Officer:</strong> <a href="mailto:grievance@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">grievance@dzdx.in</a></p>
                <p><strong className="text-dzdx-blue">Copyright Issues:</strong> <a href="mailto:copyright@dzdx.in" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">copyright@dzdx.in</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Acknowledgement
              </h2>
              <p className="text-white/90 leading-relaxed">
                BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue transition-colors hover:opacity-90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
