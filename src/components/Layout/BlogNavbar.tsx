'use client';

import Link from 'next/link';
import Image from 'next/image';
import './SimpleNavbar.css'; // We'll create this file for the custom animation


const SimpleNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center relative">
          {/* Animated Gold Glow */}
          <div className="absolute -z-10 w-[220px] h-[70px] rounded-xl glow-gold" />

          <Link href="/" className="flex items-center justify-center">
            <Image
              src="https://cdn.dzdx.in/DZDXLOGO351x86.png"
              alt="DZDX Solutions Logo"
              width={200}
              height={49}
              className="h-auto"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SimpleNavbar;
