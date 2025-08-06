'use client';

import Link from 'next/link';
import EarthBackground from '@/components/EarthBackground';

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      
      <main className="relative z-20 flex flex-col min-h-screen px-5 py-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow-strong">
              DZDX Privacy Policy
            </h1>
            <p className="text-dzdx-blue font-semibold">
              <strong>Effective Date: May 15, 2025</strong>
            </p>
          </div>

          {/* Privacy Content */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8 space-y-6">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Introduction
              </h2>
              <p className="text-white/90 leading-relaxed">
                At DZDX Solutions Pvt Ltd, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our Global Scan application.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Information We Collect
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li><strong className="text-dzdx-blue">Personal information</strong>: We may collect your name, email address, and account information when you create an account</li>
                <li><strong className="text-dzdx-blue">Device information</strong>: We collect device-specific information such as your device model, operating system version, unique device identifiers, and mobile network information</li>
                <li><strong className="text-dzdx-blue">Usage data</strong>: Information about how you use our application, including features accessed and in-app actions</li>
                <li><strong className="text-dzdx-blue">Location information</strong>: With your permission, we may collect and process information about your precise or approximate location</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                How We Use Your Information
              </h2>
              <p className="text-white/90 mb-3">We use the collected information to:</p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>Provide, maintain, and improve Global Scan</li>
                <li>Create and maintain your account</li>
                <li>Process your requests and respond to your inquiries</li>
                <li>Troubleshoot and fix issues with our application</li>
                <li>Protect against fraudulent, unauthorized, or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Data Storage and Security
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>All user data is stored on our self-hosted servers located in Kanpur, Uttar Pradesh, India</li>
                <li>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction</li>
                <li>While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Third-Party Sharing
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>We do not share your personal information with any third parties</li>
                <li>We do not sell, rent, or lease your personal information to any company or individual</li>
                <li>Global Scan does not contain advertisements or ad-related tracking technologies</li>
                <li>Your data remains exclusively on our self-hosted servers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Your Rights
              </h2>
              <p className="text-white/90 mb-3">You have the right to:</p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Children&apos;s Privacy
              </h2>
              <p className="text-white/90 leading-relaxed">
                Our application is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete such information from our servers immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Changes to This Privacy Policy
              </h2>
              <p className="text-white/90 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Effective Date&quot; at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Contact Us
              </h2>
              <p className="text-white/90 mb-3">If you have any questions about this Privacy Policy, please contact us at:</p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>
                  Email: <a href="mailto:privacy@dzdx.com" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">privacy@dzdx.com</a>
                </li>
                <li>Address: DZDX Solutions Pvt Ltd, Kanpur, Uttar Pradesh, India</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Compliance
              </h2>
              <p className="text-white/90 leading-relaxed">
                This Privacy Policy is compliant with Google Play Store guidelines and applicable data protection laws.
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}