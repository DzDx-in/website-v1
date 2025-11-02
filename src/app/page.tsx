'use client';

import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';
import EmailForm from '@/components/ui/EmailForm';
import SocialLinks from '@/components/ui/SocialLinks';
import Footer from '@/components/Layout/Footer';
import '@/styles/style.css';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <EarthBackground />

      {/* Futuristic grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_100%_80%_at_50%_0%,black_40%,transparent)]" />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <main className="relative z-10">
        {/* Hero Section - Completely Redesigned */}
        <section className="min-h-screen flex items-center justify-center px-5 py-20">
          <div className="max-w-6xl mx-auto w-full">

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left Side - Brand & CTA */}
              <div className="space-y-10">
                {/* Logo */}
                <div className="animate-fade-in">
                  <Image
                    src="https://cdn.dzdx.in/DZDXLOGO351x86.png"
                    alt="DZDX Solutions"
                    width={400}
                    height={400}
                    priority
                    className="w-auto h-20 md:h-24"
                  />
                </div>

                {/* Headline */}
                <div className="animate-fade-in space-y-6">
                  <h1 className="text-5xl md:text-7xl font-extralight text-white leading-[1.1] tracking-tight">
                    Building the
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Future
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg">
                    We craft intelligent solutions that redefine possibilities. From AI-powered applications to cutting-edge cloud infrastructure.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="animate-slide-up flex flex-wrap gap-4">
                  <a
                    href="/trf"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                  >
                    <span className="relative z-10">Explore The Real Feed</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300 relative z-10"></i>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-light rounded-full hover:bg-white/5 transition-all duration-300"
                  >
                    <span>Get in Touch</span>
                    <i className="fas fa-paper-plane text-sm"></i>
                  </a>
                </div>

                {/* Stats */}
                <div className="animate-slide-up flex gap-12 pt-6">
                  <div>
                    <div className="text-3xl font-light text-white mb-1">1,400+</div>
                    <div className="text-sm text-white/40 font-light">Early adopters</div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-white mb-1">Aug 2025</div>
                    <div className="text-sm text-white/40 font-light">Next launch</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Featured Card */}
              <div className="animate-slide-up lg:animate-slide-left">
                <div className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 overflow-hidden hover:border-white/20 transition-all duration-700">

                  {/* Floating gradient orbs inside card */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                      <div className="relative">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <div className="absolute inset-0 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      <span className="text-xs text-white/60 font-light">Now in Development</span>
                    </div>

                    {/* Icon */}
                    {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl border border-white/10">
                      <i className="fas fa-newspaper text-2xl bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent"></i>
                    </div> */}

                    {/* Content */}
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-4xl font-light text-white">
                        The Real Feed
                      </h2>

                      <p className="text-white/60 text-base leading-relaxed font-light">
                        AI-powered news analysis that reveals bias, separates facts from opinions, and delivers truth without the noise. Experience journalism reimagined.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {[
                        { icon: 'fa-shield-alt', text: 'Bias Detection' },
                        { icon: 'fa-brain', text: 'AI Analysis' },
                        { icon: 'fa-check-circle', text: 'Fact Verified' },
                        { icon: 'fa-bolt', text: 'Real-time' }
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <i className={`fas ${feature.icon} text-blue-400 text-sm`}></i>
                          <span className="text-white/70 text-sm font-light">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Minimal & Clean */}
        <section className="py-32 px-5 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-20">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <span className="text-xs text-white/50 uppercase tracking-wider font-light">Capabilities</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight mb-4">
                What We Build
              </h2>
              <p className="text-white/40 text-lg font-light max-w-2xl">
                Transforming ideas into reality through cutting-edge technology
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'fa-brain',
                  title: 'AI Solutions',
                  description: 'Intelligent systems that learn, adapt, and deliver insights.',
                  gradient: 'from-blue-500/10 to-cyan-500/10'
                },
                {
                  icon: 'fa-mobile-alt',
                  title: 'Mobile First',
                  description: 'Native experiences that users love, on every platform.',
                  gradient: 'from-purple-500/10 to-pink-500/10'
                },
                {
                  icon: 'fa-cloud',
                  title: 'Cloud Native',
                  description: 'Scalable infrastructure built for the modern web.',
                  gradient: 'from-emerald-500/10 to-teal-500/10'
                }
              ].map((service, idx) => (
                <div key={idx} className="group animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="relative h-full p-8 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">

                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <i className={`fas ${service.icon} text-white/80`}></i>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-light text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-sm font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-6 flex items-center gap-2 text-white/30 group-hover:text-white/60 transition-colors duration-300">
                      <span className="text-xs font-light">Learn more</span>
                      <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Minimalist */}
        <section id="contact" className="py-32 px-5 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <span className="text-xs text-white/50 uppercase tracking-wider font-light">Connect</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">
                Stay in the Loop
              </h2>

              <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
                Get early access to new products, updates, and exclusive insights.
              </p>

              <div className="pt-6">
                <EmailForm />
              </div>

              <div className="pt-8">
                <SocialLinks />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}