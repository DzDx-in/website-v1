'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/new_main.svg"
            alt="DZDX Solutions Logo"
            width={isScrolled ? 40 : 50}
            height={isScrolled ? 40 : 50}
            className="transition-all duration-300"
          />
          <span className={`ml-2 font-bold text-white text-lg ${isScrolled ? 'text-lg' : 'text-xl'} transition-all duration-300`}>
            DZDX Solutions
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-dzdx-blue transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="text-white hover:text-dzdx-blue transition-colors">
            Careers
          </Link>
          <Link href="/support" className="text-white hover:text-dzdx-blue transition-colors">
            Support
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 border border-dzdx-blue text-dzdx-blue hover:bg-dzdx-blue hover:text-white rounded-md transition-colors duration-300"
          >
            Admin Portal
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-white hover:text-dzdx-blue py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className="text-white hover:text-dzdx-blue py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/support"
                className="text-white hover:text-dzdx-blue py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
              <Link
                href="/admin"
                className="inline-block text-center px-4 py-2 border border-dzdx-blue text-dzdx-blue hover:bg-dzdx-blue hover:text-white rounded-md transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Portal
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;