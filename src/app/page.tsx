'use client';

import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';
import EmailForm from '@/components/ui/EmailForm';
import SocialLinks from '@/components/ui/SocialLinks';
import Footer from '@/components/Layout/Footer';
import '@/styles/style.css';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <EarthBackground />

      {/* Grid overlay for futuristic feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <main className="relative z-0 min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
          <div className="max-w-5xl mx-auto space-y-16">

            {/* Logo with glow */}
            <div className="animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] animate-pulse" />
                <Image
                  src="https://cdn.dzdx.in/DZDXLOGO351x86.png"
                  alt="DZDX Solutions Logo"
                  width={512}
                  height={512}
                  priority
                  className="relative mx-auto mb-8 drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Tagline with gradient */}
            <div className="animate-fade-in space-y-6">
              <p className="text-xl md:text-2xl bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent font-light tracking-wide">
                Compiling Innovation. Delivering Solutions.
              </p>
            </div>

            {/* Featured Product - Enhanced */}
            <div className="animate-slide-up">
              <div className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-14 max-w-3xl mx-auto overflow-hidden hover:border-white/30 transition-all duration-500">
                {/* Animated gradient orb */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700" />

                <div className="relative space-y-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                    <i className="fas fa-newspaper text-3xl bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent"></i>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                    The Real Feed
                  </h2>

                  <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                    AI-powered news analysis that reveals bias, separates facts from opinions,
                    and delivers truth without the noise.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center pt-6">
                    <a
                      href="/trf"
                      className="group/btn relative inline-flex items-center px-10 py-4 bg-white text-black font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                      <span className="relative z-10">Explore Now</span>
                      <i className="fas fa-arrow-right ml-3 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10"></i>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </a>

                    <div className="flex items-center text-white/50 text-sm backdrop-blur-sm bg-white/5 px-5 py-3 rounded-full border border-white/10">
                      <div className="relative mr-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      <span className="font-light">1,400+ waiting • Launching Aug 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Signup - Refined */}
            <div className="animate-slide-up">
              <div className="space-y-6">
                <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] font-light">
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

        {/* Services Grid - Enhanced */}
        <section className="py-32 px-5 relative">
          {/* Section gradient accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                What We Do
              </h2>
              <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Building intelligent solutions for the modern world
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: 'fa-brain',
                  color: 'blue',
                  title: 'AI Solutions',
                  description: 'Cutting-edge artificial intelligence applications that transform how we process and understand information.'
                },
                {
                  icon: 'fa-mobile-alt',
                  color: 'purple',
                  title: 'Mobile Apps',
                  description: 'Native and cross-platform mobile applications designed for exceptional user experiences.'
                },
                {
                  icon: 'fa-cloud',
                  color: 'green',
                  title: 'Cloud Solutions',
                  description: 'Scalable cloud infrastructure and services that power modern digital experiences.'
                }
              ].map((service, idx) => (
                <div key={idx} className="group animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                    <div className="relative">
                      <div className={`w-14 h-14 bg-${service.color}-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 border border-${service.color}-500/20`}>
                        <i className={`fas ${service.icon} text-${service.color}-400 text-xl`}></i>
                      </div>

                      <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
                        {service.title}
                      </h3>

                      <p className="text-white/60 leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}