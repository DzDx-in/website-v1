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
              DZDX Terms of Service for The Real Feed Platform
            </h1>
            <p className="text-dzdx-blue font-semibold">
              <strong>Effective Date: May 15, 2025</strong>
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8 space-y-6">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Introduction
              </h2>
              <p className="text-white/90 leading-relaxed">
                Welcome to Global Scan, provided by DZDX Solutions Pvt Ltd. These Terms of Service ("Terms") govern your use of our mobile application and services. By downloading, installing, or using Global Scan, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Acceptance of Terms
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li><strong className="text-dzdx-blue">Agreement</strong>: By accessing or using Global Scan, you acknowledge that you have read, understood, and agree to these Terms</li>
                <li><strong className="text-dzdx-blue">Age Requirement</strong>: You must be at least 13 years old to use our application</li>
                <li><strong className="text-dzdx-blue">Legal Capacity</strong>: You represent that you have the legal authority to enter into these Terms</li>
                <li><strong className="text-dzdx-blue">Updates</strong>: We may modify these Terms at any time, and your continued use constitutes acceptance of any changes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Use of the Application
              </h2>
              <p className="text-white/90 mb-3">You agree to use Global Scan only for lawful purposes and in accordance with these Terms:</p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect the intellectual property rights of DZDX and others</li>
                <li>Not interfere with or disrupt the application's functionality</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not use the application for any fraudulent or malicious activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Account Responsibilities
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are liable for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Intellectual Property Rights
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>Global Scan and all related content are owned by DZDX Solutions Pvt Ltd</li>
                <li>All trademarks, logos, and service marks are property of DZDX</li>
                <li>You may not copy, modify, distribute, or create derivative works without our written consent</li>
                <li>You retain ownership of any content you create or upload through the application</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Service Availability
              </h2>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>We strive to maintain Global Scan's availability but cannot guarantee uninterrupted service</li>
                <li>We may temporarily suspend or restrict access for maintenance or updates</li>
                <li>We reserve the right to modify or discontinue features at any time</li>
                <li>We are not liable for any downtime or service interruptions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Limitation of Liability
              </h2>
              <p className="text-white/90 mb-3">To the maximum extent permitted by law:</p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>DZDX shall not be liable for any indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount paid by you for the application</li>
                <li>We provide the application "as is" without warranties of any kind</li>
                <li>You use Global Scan at your own risk</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Termination
              </h2>
              <p className="text-white/90 leading-relaxed">
                We may terminate or suspend your access to Global Scan at any time, with or without notice, for violation of these Terms or for any other reason. Upon termination, your right to use the application will cease immediately, and we may delete your account and data.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Governing Law
              </h2>
              <p className="text-white/90 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Kanpur, Uttar Pradesh, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Contact Us
              </h2>
              <p className="text-white/90 mb-3">If you have any questions about these Terms of Service, please contact us at:</p>
              <ul className="text-white/90 space-y-2 ml-4">
                <li>
                  Email: <a href="mailto:legal@dzdx.com" className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors">legal@dzdx.com</a>
                </li>
                <li>Address: DZDX Solutions Pvt Ltd, Kanpur, Uttar Pradesh, India</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-dzdx-blue mb-3">
                Severability
              </h2>
              <p className="text-white/90 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions will remain in full force and effect. These Terms constitute the entire agreement between you and DZDX regarding the use of Global Scan.
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