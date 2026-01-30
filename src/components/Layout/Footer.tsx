'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-black/40 text-white/80 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Description */}
        <div className="space-y-4">
          <Image
            src="https://cdn.dzdx.in/dzdx_nobg.png"
            alt="DZDX Logo"
            width={150}
            height={40}
            className="h-auto"
          />
          <p className="text-sm">
            Building innovative software solutions that transform how you work.
            From AI-powered news analysis to productivity tools, we&apos;re
            committed to delivering technology that matters.
          </p>
          <p className="text-sm font-semibold">DZDX Solutions Pvt. Ltd.</p>
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Our Products</h3>
          <div className="space-y-3">
            <Link href="/therealfeed" className="group flex items-center gap-3 hover:text-white transition-colors">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <i className="fas fa-newspaper text-blue-400 text-sm" />
              </div>
              <div>
                <p className="font-medium text-sm">The Real Feed</p>
                <p className="text-xs text-white/50">AI-Powered News Analysis</p>
              </div>
            </Link>
            <Link href="/globalscan" className="group flex items-center gap-3 hover:text-white transition-colors">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                <i className="fas fa-qrcode text-cyan-400 text-sm" />
              </div>
              <div>
                <p className="font-medium text-sm">GlobalScan</p>
                <p className="text-xs text-white/50">Barcode & QR to PC</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact & Office</h3>
          <p className="text-sm">
            <strong>Office:</strong><br />
            Off No. 19, First Floor, SGM Plaza, 8/226(1),<br />
            Arya Nagar, Kanpur, Uttar Pradesh,<br />
            India
          </p>
          <p className="text-sm">
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
        &copy; 2026 DZDX Solutions Pvt. Ltd. All rights reserved. |
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
        |
        <Link href="/blog" className="hover:underline px-2">
          Blogs
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
