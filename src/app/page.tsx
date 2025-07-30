'use client';

import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';
import EmailForm from '@/components/ui/EmailForm';
import SocialLinks from '@/components/ui/SocialLinks';
import Footer from '@/components/Layout/Footer';
import '@/styles/style.css';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <EarthBackground />

      <main className="relative z-0 min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Logo */}
            <div className="animate-fade-in">
              <Image
                src="https://cdn.dzdx.in/DZDXLOGO351x86.png"
                alt="DZDX Solutions Logo"
                width={512}
                height={512}
                priority
                className="mx-auto mb-6"
              />
            </div>

            {/* Brand */}
            <div className="animate-fade-in space-y-4">
              <p className="text-lg md:text-xl text-white/70 font-light">
                Compiling Innovation. Delivering Solutions.
              </p>
            </div>

            {/* Featured Product */}
            <div className="animate-slide-up">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl mb-4">
                    <i className="fas fa-newspaper text-2xl text-blue-400"></i>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-medium text-white">
                    The Real Feed
                  </h2>
                  
                  <p className="text-white/80 text-base md:text-lg leading-relaxed">
                    AI-powered news analysis that reveals bias, separates facts from opinions, 
                    and delivers truth without the noise.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                    <a 
                      href="/trf"
                      className="inline-flex items-center px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 group"
                    >
                      <span>Explore Now</span>
                      <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </a>
                    
                    <div className="flex items-center text-white/60 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span>1,400+ waiting • Launching Aug 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Signup */}
            <div className="animate-slide-up">
              <div className="space-y-4">
                <h3 className="text-white/70 text-sm uppercase tracking-wider font-medium">
                  Stay Updated
                </h3>
                <EmailForm />
              </div>
            </div>

            {/* Social Links */}
            <div className="animate-slide-up">
              <SocialLinks />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                What We Do
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Building intelligent solutions for the modern world
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className="fas fa-brain text-blue-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-4">AI Solutions</h3>
                  <p className="text-white/70 leading-relaxed">
                    Cutting-edge artificial intelligence applications that transform how we process and understand information.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className="fas fa-mobile-alt text-purple-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-4">Mobile Apps</h3>
                  <p className="text-white/70 leading-relaxed">
                    Native and cross-platform mobile applications designed for exceptional user experiences.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className="fas fa-cloud text-green-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-4">Cloud Solutions</h3>
                  <p className="text-white/70 leading-relaxed">
                    Scalable cloud infrastructure and services that power modern digital experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}