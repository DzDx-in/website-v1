'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-black/40 text-white/80 py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo + Description */}
        <div className="space-y-4">
          <Image
            src="/dzdx_nobg.png"
            alt="DZDX Logo"
            width={150}
            height={40}
            className="h-auto"
          />
          <p>
            Revolutionizing news consumption through AI-powered analysis.
            We&apos;re committed to delivering unbiased, factual information
            that empowers informed decision-making.
          </p>
          <p className="text-sm font-semibold">DZDX Solutions Pvt. Ltd.</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact & Office</h3>
          <p>
            <strong>Headquarters:</strong><br />
            Off No. 19, First Floor, SGM Plaza, 8/226(1),<br />
            Arya Nagar, Kanpur, Uttar Pradesh,<br />
            India
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@dzdx.in" className="hover:underline">
              support@dzdx.in
            </a>
            <br />
            <strong>Phone:</strong>{' '}
            <a href="tel:+918948983888" className="hover:underline">
              +91 89489 83888
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-white/60">
        &copy; 2025 DZDX Solutions Pvt. Ltd. All rights reserved. |
        <Link href="/privacy-policy" className="hover:underline px-2">
          Privacy Policy
        </Link>
        |
        <Link href="/terms-of-service" className="hover:underline px-2">
          Terms of Service
        </Link>
        |
        <Link href="/support" className="hover:underline px-2">
          Support
        </Link>
        |
        <Link href="/career" className="hover:underline px-2">
          Career
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
