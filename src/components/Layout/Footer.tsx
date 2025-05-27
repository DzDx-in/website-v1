'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="fixed bottom-4 left-0 right-0 z-30 text-center">
      <div className="text-white/80 text-sm text-shadow-default">
        &copy; 2025 DZDX Solutions Pvt Ltd. All Rights Reserved.
        
        <div className="mt-1 space-x-4">
          <Link 
            href="/" 
            className="text-white/80 hover:text-dzdx-blue hover:underline transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            href="/support" 
            className="text-white/80 hover:text-dzdx-blue hover:underline transition-colors duration-300"
          >
            Support
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-white/80 hover:text-dzdx-blue hover:underline transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/jobs" 
            className="text-white/80 hover:text-dzdx-blue hover:underline transition-colors duration-300"
          >
            Career
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;