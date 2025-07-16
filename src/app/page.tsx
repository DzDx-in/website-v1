'use client';

// import { useState } from 'react';
import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';
import EmailForm from '@/components/ui/EmailForm';
import SocialLinks from '@/components/ui/SocialLinks';
import Footer from '@/components/Layout/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-5 text-center">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="mb-4">
            <Image
              src="/new_main.svg"
              alt="DZDX Solutions Logo"
              width={350}
              height={350}
              priority
              className="mx-auto"
            />
          </div>

          {/* Company Name */}
          <h1 className="text-2xl md:text-4xl lg:text-3xl font-bold text-dzdx-gold mb-4 text-shadow-strong tracking-wider">
            Solutions Pvt Ltd
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-dzdx-blue font-light mb-8 text-shadow-default tracking-wide">
            Compiling Innovation. Delivering Solutions....
          </p>

          {/* Email Form */}
          <div className="mb-8 animate-slide-up">
            <EmailForm />
          </div>

          {/* Social Links */}
          <div className="animate-slide-up">
            <SocialLinks />
          </div>
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}