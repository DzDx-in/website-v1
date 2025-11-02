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

      {/* Complex layered grid patterns */}
      <div className="absolute inset-0">
        {/* Primary grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_120%_100%_at_50%_0%,black,transparent_70%)]" />
        {/* Secondary offset grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_100%_80%_at_50%_20%,black,transparent_60%)]" />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Animated gradient orbs - more dynamic */}
      <div className="absolute top-[-10%] right-[15%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[30%] right-[25%] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Scanning line effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-scan" />
      </div>

      <main className="relative z-10">
        {/* Hero Section - Premium Redesign */}
        <section className="relative min-h-screen flex items-center justify-center px-5 py-20">
          {/* Floating accent elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Content */}
            <div className="text-center mb-20 space-y-12">
              {/* Logo with enhanced styling */}
              <div className="animate-fade-in animate-float relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-[100px] animate-pulse" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image
                  src="https://cdn.dzdx.in/DZDXLOGO351x86.png"
                  alt="DZDX Solutions"
                  width={500}
                  height={500}
                  priority
                  className="relative w-auto h-24 md:h-28 mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Main headline with more visual interest */}
              <div className="animate-fade-in space-y-8 max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full mb-6 animate-shimmer hover:scale-105 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs text-white/60 uppercase tracking-widest font-light">Innovation in Motion</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-extralight text-white leading-[1.05] tracking-tighter">
                  <span className="block animate-text-reveal">Redefining</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                    Digital Reality
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/40 font-extralight leading-relaxed max-w-3xl mx-auto animate-text-reveal" style={{ animationDelay: '0.2s' }}>
                  Pioneering the convergence of artificial intelligence, cloud architecture, and human experience to build tomorrow's solutions today.
                </p>
              </div>

              {/* CTA Section */}
              <div className="animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <a
                  href="/trf"
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-medium rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-[0_0_80px_rgba(255,255,255,0.6)] animate-glow-pulse"
                >
                  <span className="relative z-10 text-base">Get The Real Feed Now</span>
                  <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-black rounded-full group-hover:rotate-[360deg] transition-transform duration-700">
                    <i className="fas fa-arrow-right text-white text-xs"></i>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />
                </a>

                <a
                  href="#capabilities"
                  className="group relative inline-flex items-center gap-3 px-8 py-5 border border-white/20 text-white/80 font-light rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Explore Capabilities</span>
                  <i className="fas fa-chevron-down text-xs group-hover:translate-y-2 transition-transform duration-500 relative z-10"></i>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </div>
            </div>

            {/* Featured Product Bento Grid */}
            <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Large featured card - TRF */}
              <div className="lg:col-span-2 animate-slide-up">
                <div className="group relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-10 overflow-hidden hover:border-white/30 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)]">
                  {/* Animated mesh gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>

                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
                  </div>

                  <div className="relative space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full animate-scale-pulse">
                        <div className="relative">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          <div className="absolute inset-0 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                        </div>
                        <span className="text-xs text-green-400 font-medium">LIVE NOW</span>
                      </div>

                      <div className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                        <span className="text-xs text-white/50 font-light">Available Today</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                          <i className="fas fa-newspaper text-xl bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h2 className="text-4xl font-light text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">The Real Feed</h2>
                      </div>

                      <p className="text-white/50 text-base font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                        Revolutionary AI-powered news platform that deconstructs bias, validates facts, and delivers crystallized truth through advanced machine learning.
                      </p>
                    </div>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['AI Analysis', 'Bias Detection', 'Fact Verification', 'Real-time'].map((tag, idx) => (
                        <div key={idx} className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/5 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer" style={{ transitionDelay: `${idx * 50}ms` }}>
                          <span className="text-xs text-white/60 font-light">{tag}</span>
                        </div>
                      ))}
                    </div>

                    {/* Download Links */}
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                      <a
                        href="https://apps.apple.com/us/app/the-real-feed-news-explained/id6749306200"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/store flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
                      >
                        <i className="fab fa-apple text-2xl text-white group-hover/store:scale-110 transition-transform duration-300"></i>
                        <div className="text-left">
                          <div className="text-[10px] text-white/40 font-light">Download on</div>
                          <div className="text-sm text-white font-medium">App Store</div>
                        </div>
                      </a>

                      <a
                        href="https://play.google.com/store/apps/details?id=com.dzdx.therealfeed&hl=en_IN"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/store flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
                      >
                        <i className="fab fa-google-play text-2xl text-white group-hover/store:scale-110 transition-transform duration-300"></i>
                        <div className="text-left">
                          <div className="text-[10px] text-white/40 font-light">Get it on</div>
                          <div className="text-sm text-white font-medium">Google Play</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side cards stack */}
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                {/* Newsletter card */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(168,85,247,0.3)] cursor-pointer">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-[50px] group-hover:scale-150 group-hover:bg-purple-500/20 transition-all duration-500" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                  </div>

                  <div className="relative space-y-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                      <i className="fas fa-envelope text-purple-400 text-sm group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">Stay Updated</h3>
                      <p className="text-xs text-white/40 font-light leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                        Join our community for exclusive insights and early access.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connect card */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] cursor-pointer">
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[50px] group-hover:scale-150 group-hover:bg-blue-500/20 transition-all duration-500" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 to-transparent" />
                  </div>

                  <div className="relative space-y-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <i className="fas fa-network-wired text-blue-400 text-sm group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Let's Connect</h3>
                      <p className="text-xs text-white/40 font-light leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                        Transform your vision into reality with cutting-edge solutions.
                      </p>
                    </div>
                    <a href="#contact" className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors group/link">
                      <span>Get in touch</span>
                      <i className="fas fa-arrow-right text-[10px] group-hover/link:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section - Advanced Design */}
        <section id="capabilities" className="py-32 px-5 relative">
          {/* Decorative elements */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-[80px]" />

          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-24 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-xs text-white/60 uppercase tracking-widest font-light">Core Capabilities</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tighter">
                Expertise That
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Transforms</span>
              </h2>

              <p className="text-white/30 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                Leveraging cutting-edge technology stacks and innovative methodologies to deliver transformative digital experiences.
              </p>
            </div>

            {/* Advanced Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'fa-brain',
                  title: 'Artificial Intelligence',
                  description: 'Machine learning models, natural language processing, and computer vision systems that drive intelligent automation and insights.',
                  tags: ['ML', 'NLP', 'Computer Vision'],
                  color: 'blue',
                  gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent'
                },
                {
                  icon: 'fa-mobile-alt',
                  title: 'Mobile Engineering',
                  description: 'Cross-platform applications with native performance, seamless UX, and robust architecture for iOS and Android.',
                  tags: ['React Native', 'Swift', 'Kotlin'],
                  color: 'purple',
                  gradient: 'from-purple-500/10 via-pink-500/5 to-transparent'
                },
                {
                  icon: 'fa-cloud',
                  title: 'Cloud Architecture',
                  description: 'Scalable infrastructure design, microservices orchestration, and serverless solutions for modern applications.',
                  tags: ['AWS', 'Kubernetes', 'Serverless'],
                  color: 'emerald',
                  gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent'
                },
                {
                  icon: 'fa-database',
                  title: 'Data Engineering',
                  description: 'Real-time data pipelines, analytics platforms, and distributed systems for processing at scale.',
                  tags: ['BigData', 'Analytics', 'ETL'],
                  color: 'amber',
                  gradient: 'from-amber-500/10 via-orange-500/5 to-transparent'
                },
                {
                  icon: 'fa-shield-alt',
                  title: 'Security & Compliance',
                  description: 'End-to-end encryption, zero-trust architecture, and compliance frameworks for enterprise-grade security.',
                  tags: ['Zero-Trust', 'Encryption', 'GDPR'],
                  color: 'red',
                  gradient: 'from-red-500/10 via-rose-500/5 to-transparent'
                },
                {
                  icon: 'fa-rocket',
                  title: 'DevOps & CI/CD',
                  description: 'Automated deployment pipelines, infrastructure as code, and continuous monitoring for rapid iteration.',
                  tags: ['CI/CD', 'IaC', 'Monitoring'],
                  color: 'indigo',
                  gradient: 'from-indigo-500/10 via-violet-500/5 to-transparent'
                }
              ].map((service, idx) => (
                <div key={idx} className="group animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="relative h-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm border border-white/5 rounded-3xl p-8 overflow-hidden hover:border-white/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] cursor-pointer">

                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                    {/* Animated shimmer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
                    </div>

                    {/* Content */}
                    <div className="relative space-y-6">
                      {/* Icon */}
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 flex items-center justify-center bg-${service.color}-500/10 rounded-2xl border border-${service.color}-500/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]`}>
                          <i className={`fas ${service.icon} text-${service.color}-400 text-lg group-hover:scale-110 transition-transform duration-500`} />
                        </div>
                        <i className="fas fa-arrow-up-right text-white/20 group-hover:text-white/60 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500" />
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-xl font-light text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-500">
                          {service.title}
                        </h3>
                        <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                          {service.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {service.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-white/50 font-light hover:bg-white/10 hover:border-white/20 hover:text-white/70 hover:scale-105 transition-all duration-300 cursor-pointer" style={{ transitionDelay: `${tagIdx * 50}ms` }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Glowing border on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: `inset 0 0 20px rgba(139, 92, 246, 0.2)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Premium Design */}
        <section id="contact" className="py-40 px-5 relative">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-4xl mx-auto relative">
            {/* Background card */}
            <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-16 overflow-hidden">

              {/* Animated gradient orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative text-center space-y-12">
                {/* Header */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-full">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/60 uppercase tracking-widest font-light">Join the Movement</span>
                  </div>

                  <h2 className="text-5xl md:text-6xl font-extralight text-white tracking-tighter leading-tight">
                    Stay Ahead of
                    <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tomorrow</span>
                  </h2>

                  <p className="text-white/30 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                    Subscribe for exclusive early access, product updates, and insights from the forefront of innovation.
                  </p>
                </div>

                {/* Email Form */}
                <div className="max-w-md mx-auto">
                  <EmailForm />
                </div>

                {/* Divider */}
                <div className="relative py-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-gradient-to-r from-transparent via-black to-transparent text-xs text-white/30 uppercase tracking-widest font-light">
                      Connect
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <SocialLinks />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                  <div>
                    <div className="text-2xl font-light text-white mb-1">1,400+</div>
                    <div className="text-xs text-white/30 font-light">Community Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white mb-1">2025</div>
                    <div className="text-xs text-white/30 font-light">Launch Year</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white mb-1">∞</div>
                    <div className="text-xs text-white/30 font-light">Possibilities</div>
                  </div>
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