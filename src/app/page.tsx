'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';
import EmailForm from '@/components/ui/EmailForm';
import SocialLinks from '@/components/ui/SocialLinks';
import Footer from '@/components/Layout/Footer';
import '@/styles/style.css';

export default function HomePage() {
  // Testimonials data
  const testimonials = [
    { quote: "The Real Feed changed how I consume news. No more bias, just facts.", author: "Sarah Chen", role: "Journalist", rating: 5, icon: "fa-newspaper" },
    { quote: "DZDX built our entire infrastructure. Lightning fast, rock solid.", author: "Marcus Rodriguez", role: "CTO, TechCorp", rating: 5, icon: "fa-code" },
    { quote: "Their AI solutions are years ahead. Truly next-generation.", author: "Dr. Emily Watson", role: "AI Researcher", rating: 5, icon: "fa-brain" },
    { quote: "Best mobile app development team I've ever worked with.", author: "James Park", role: "Product Manager", rating: 5, icon: "fa-mobile-alt" },
    { quote: "They transformed our cloud architecture. Incredible results.", author: "Priya Sharma", role: "DevOps Lead", rating: 5, icon: "fa-cloud" },
    { quote: "Security-first approach that actually delivers. Highly recommended.", author: "Alex Thompson", role: "CISO", rating: 5, icon: "fa-shield-alt" },
    { quote: "From concept to deployment in record time. Amazing execution.", author: "Lisa Wong", role: "Startup Founder", rating: 5, icon: "fa-rocket" },
    { quote: "Their data engineering expertise saved us millions. Pure genius.", author: "Robert Martinez", role: "Data Architect", rating: 5, icon: "fa-database" },
    { quote: "Professional, efficient, and innovative. Everything we needed.", author: "Sophie Anderson", role: "VP Engineering", rating: 5, icon: "fa-cogs" },
    { quote: "The Real Feed is the future of journalism. Revolutionary platform.", author: "Michael Zhang", role: "News Editor", rating: 5, icon: "fa-edit" }
  ];

  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Generate particles on client side only
    const generatedParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`
    }));
    setParticles(generatedParticles);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="relative bg-black">
      {/* <EarthBackground /> */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-[#1a1a1a] to-[#3a2a1e]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#FFD70020,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#DAA52015,_transparent_70%)]" />
      </div>

      {/* Floating Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[80%] max-w-[80vw] animate-slide-down">
        <div className="relative group">
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/15 via-amber-500/15 to-yellow-500/15 rounded-full blur-xl animate-pulse" />

          {/* Navbar container */}
          <div className="relative px-8 py-4 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 backdrop-blur-xl border-2 border-yellow-500/20 rounded-full hover:border-yellow-500/30 transition-all duration-500 flex items-center justify-center">
            <Image
              src="https://cdn.dzdx.in/DZDXLOGO351x86.png"
              alt="DZDX Solutions"
              width={180}
              height={180}
              priority
              className="w-auto h-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
            />
          </div>
        </div>
      </nav>

      {/* Mouse follower gradient */}
      <div
        className="fixed w-[800px] h-[800px] rounded-full pointer-events-none z-0 opacity-30 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      />

      {/* Multi-layer grid patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,0.03)_1.5px,transparent_1.5px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_120%_100%_at_50%_0%,black,transparent_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_100%_80%_at_50%_30%,black,transparent_70%)]" style={{ transform: `translateY(${parallaxOffset}px)` }} />
      </div>

      {/* Dynamic gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[10%] w-[700px] h-[700px] bg-gradient-to-br from-blue-500/15 to-cyan-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[25%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-purple-500/15 to-pink-500/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[15%] right-[15%] w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/12 to-teal-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-scan" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-scan" style={{ animationDelay: '4s' }} />
      </div>

      <main className="relative z-10">

        {/* SECTION 1: HERO - Magnetic Title */}
        <section data-section="0" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden">
          {/* Shadow fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
          {/* Floating particles */}
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}

          <div className="max-w-7xl mx-auto w-full text-center">
            {/* Magnetic title effect */}
            <div className="relative mb-16 perspective-1000 overflow-visible">
              <h1
                className="text-7xl md:text-9xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 leading-[1.3] tracking-tighter mb-6 pb-8 overflow-visible"
                style={{
                  transform: windowSize.width > 0 ? `rotateX(${(mousePosition.y - windowSize.height / 2) * 0.01}deg) rotateY(${(mousePosition.x - windowSize.width / 2) * 0.01}deg)` : 'none',
                  textShadow: '0 0 80px rgba(59,130,246,0.5)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                  paddingBottom: '0.2em'
                }}
              >
                The Future
                <span className="block text-6xl md:text-8xl mt-4 pb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_60px_rgba(139,92,246,0.8)]">
                  is Intelligence
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-white/40 font-extralight max-w-4xl mx-auto leading-relaxed animate-text-reveal">
                Where artificial minds meet human ambition. Crafting tomorrow's digital reality, today.
              </p>
            </div>

            {/* Revolutionary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up">
              <a
                href="/the-real-feed"
                className="group relative inline-flex items-center gap-5 px-12 py-6 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-700 hover:scale-110 hover:shadow-[0_0_100px_rgba(255,255,255,0.8)] hover:pr-16"
              >
                <span className="relative z-10 text-lg">Experience The Real Feed</span>
                <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-black rounded-full group-hover:rotate-[360deg] transition-transform duration-1000">
                  <i className="fas fa-arrow-right text-white text-sm"></i>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </a>

              <button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-4 px-10 py-6 border-2 border-white/20 text-white font-light rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-700 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 text-lg">Explore Our World</span>
                <i className="fas fa-chevron-down text-sm relative z-10 group-hover:translate-y-2 group-hover:animate-bounce transition-transform duration-700"></i>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
                <div className="w-1.5 h-2 bg-white/50 rounded-full mx-auto animate-scroll-indicator" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE REAL FEED - Cinematic Reveal */}
        <section data-section="1" className="relative min-h-screen flex items-center justify-center px-5 py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

          <div className="max-w-7xl mx-auto w-full relative px-5">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

              {/* Left: Video/Visual */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-[80px] group-hover:blur-[100px] transition-all duration-700" />

                <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border-2 border-white/10 rounded-[3rem] overflow-visible group-hover:border-white/30 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_100px_rgba(59,130,246,0.4)]">

                  {/* Animated mesh */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem] overflow-hidden">
                    <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '0.7s' }} />
                  </div>

                  {/* Video container */}
                  <div className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="https://cdn.dzdx.in/landing.webm" type="video/webm" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 px-6 py-3 bg-green-500/20 backdrop-blur-xl border-2 border-green-400/40 rounded-full animate-scale-pulse z-10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-green-400 font-bold text-sm">LIVE NOW</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full">
                  <i className="fas fa-newspaper text-blue-400" />
                  <span className="text-xs text-white/60 uppercase tracking-widest font-light">Featured Product</span>
                </div>

                <h2 className="text-6xl md:text-7xl font-extralight text-white leading-[1.1] tracking-tighter">
                  The Real Feed
                  <span className="block text-5xl md:text-6xl mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Truth Without Noise
                  </span>
                </h2>

                <p className="text-xl text-white/50 font-light leading-relaxed">
                  Revolutionary AI-powered news platform that deconstructs bias, validates facts, and delivers crystallized truth through advanced machine learning. Experience journalism reimagined.
                </p>

                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: 'fa-shield-alt', text: 'Bias Detection', color: 'blue' },
                    { icon: 'fa-brain', text: 'AI Analysis', color: 'purple' },
                    { icon: 'fa-check-circle', text: 'Fact Verified', color: 'green' },
                    { icon: 'fa-bolt', text: 'Real-time', color: 'yellow' }
                  ].map((feature, idx) => (
                    <div key={idx} className="group flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-500 cursor-pointer">
                      <div className={`w-12 h-12 flex items-center justify-center bg-${feature.color}-500/10 rounded-xl border border-${feature.color}-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <i className={`fas ${feature.icon} text-${feature.color}-400 group-hover:scale-110 transition-transform duration-500`} />
                      </div>
                      <span className="text-white/70 font-light group-hover:text-white transition-colors">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Download buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <a
                    href="https://apps.apple.com/us/app/the-real-feed-news-explained/id6749306200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all duration-300"
                  >
                    <i className="fab fa-apple text-3xl text-white group-hover:scale-110 transition-transform duration-300"></i>
                    <div className="text-left">
                      <div className="text-[11px] text-white/40 font-light">Download on</div>
                      <div className="text-base text-white font-medium">App Store</div>
                    </div>
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.dzdx.therealfeed&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all duration-300"
                  >
                    <i className="fab fa-google-play text-3xl text-white group-hover:scale-110 transition-transform duration-300"></i>
                    <div className="text-left">
                      <div className="text-[11px] text-white/40 font-light">Download on</div>
                      <div className="text-base text-white font-medium">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Infinity Scroll - What We Do */}
        <section data-section="2" className="relative py-40 overflow-x-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black -z-10" />

          <div className="max-w-7xl mx-auto px-5 mb-24 text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm border border-white/40 rounded-full mb-8">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-xs text-white uppercase tracking-widest font-medium">Our Expertise</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-6">
              <span className="text-white">What We </span><span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">Craft</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/80 font-light max-w-3xl mx-auto">
              Pushing boundaries across AI, mobile, cloud, and beyond
            </p>
          </div>

          {/* Horizontal infinity scroll */}
          <div className="relative">
            <div className="flex animate-marquee hover:pause-animation">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 px-3">
                  {[
                    { icon: 'fa-brain', title: 'Artificial Intelligence', desc: 'Neural networks that think', gradient: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/30' },
                    { icon: 'fa-mobile-alt', title: 'Mobile First', desc: 'Apps that feel alive', gradient: 'from-purple-500/20 to-pink-500/10', border: 'border-purple-500/30' },
                    { icon: 'fa-cloud', title: 'Cloud Native', desc: 'Infrastructure that scales', gradient: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/30' },
                    { icon: 'fa-database', title: 'Data Engineering', desc: 'Insights from chaos', gradient: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/30' },
                    { icon: 'fa-shield-alt', title: 'Security First', desc: 'Fort Knox level protection', gradient: 'from-red-500/20 to-rose-500/10', border: 'border-red-500/30' },
                    { icon: 'fa-rocket', title: 'DevOps Excellence', desc: 'Deploy at light speed', gradient: 'from-indigo-500/20 to-violet-500/10', border: 'border-indigo-500/30' },
                  ].map((item, idx) => (
                    <div
                      key={`${setIndex}-${idx}`}
                      className={`group relative w-[280px] sm:w-[350px] md:w-[400px] h-[380px] sm:h-[440px] md:h-[500px] bg-gradient-to-br ${item.gradient} backdrop-blur-xl border-2 ${item.border} rounded-2xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex-shrink-0 hover:scale-105 transition-all duration-700 cursor-pointer overflow-hidden`}
                    >
                      {/* Shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500" />
                      </div>

                      <div className="relative h-full flex flex-col justify-between">
                        <div>
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/10 rounded-2xl md:rounded-3xl mb-5 sm:mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/20">
                            <i className={`fas ${item.icon} text-2xl sm:text-3xl md:text-4xl text-white`} />
                          </div>

                          <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-3 sm:mb-4 tracking-tight">
                            {item.title}
                          </h3>

                          <p className="text-white/50 text-sm sm:text-base md:text-lg font-light">
                            {item.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 text-white/40 group-hover:text-white/80 transition-colors">
                          <span className="text-sm font-light">Explore</span>
                          <i className="fas fa-arrow-right text-xs group-hover:translate-x-2 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Number Counter - Impact */}
        <section data-section="3" className="relative min-h-screen flex items-center justify-center px-5 py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black -z-10" />

          <div className="max-w-7xl mx-auto w-full text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/30 rounded-full mb-12">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white uppercase tracking-widest font-medium">Real Impact</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-extralight text-white mb-20">
              Numbers That <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Matter</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12 mb-20">
              {[
                { number: '2,500', suffix: '+', label: 'Active Users', icon: 'fa-users', color: 'blue' },
                { number: '99.9', suffix: '%', label: 'Uptime SLA', icon: 'fa-server', color: 'green' },
                { number: '24', suffix: '/7', label: 'Global Support', icon: 'fa-headset', color: 'purple' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-white/30 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_20px_80px_rgba(59,130,246,0.3)]"
                >
                  <div className={`w-16 h-16 flex items-center justify-center bg-${stat.color}-500/10 rounded-2xl mb-8 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-${stat.color}-500/20`}>
                    <i className={`fas ${stat.icon} text-3xl text-${stat.color}-400`} />
                  </div>

                  <div className={`text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-300 mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    {stat.number}<span className="text-5xl">{stat.suffix}</span>
                  </div>

                  <div className="text-white/50 text-lg font-light uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-2xl text-white/40 font-extralight max-w-3xl mx-auto">
              Trusted by innovators worldwide to build the impossible
            </p>
          </div>
        </section>

        {/* SECTION 5: Testimonial/Social Proof Carousel */}
        <section data-section="4" className="relative py-40 overflow-x-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black -z-10" />

          <div className="max-w-7xl mx-auto px-5 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm border border-white/30 rounded-full mb-8">
                <i className="fas fa-star text-yellow-400" />
                <span className="text-xs text-white uppercase tracking-widest font-medium">User Love</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tighter">
                What They <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Say</span>
              </h2>
            </div>

            {/* Horizontal testimonial scroll */}
            <div className="relative">
              <div className="flex animate-marquee hover:pause-animation">
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-6 px-3">
                    {testimonials.map((testimonial, idx) => (
                      <div
                        key={`${setIndex}-${idx}`}
                        className="group relative w-[280px] sm:w-[350px] md:w-[400px] h-[240px] sm:h-[260px] md:h-[280px] p-6 sm:p-7 md:p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2rem] hover:border-white/30 transition-all duration-700 hover:scale-105 flex-shrink-0 overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500" />
                        </div>

                        <div className="absolute -top-3 -left-3 text-6xl text-yellow-400/20 font-serif leading-none">"</div>

                        <div className="relative h-full flex flex-col justify-between">
                          <div>
                            <p className="text-white/70 text-base font-light leading-relaxed mb-6 italic line-clamp-3">
                              {testimonial.quote}
                            </p>

                            <div className="flex gap-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-400 text-xs" />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full flex-shrink-0 flex items-center justify-center">
                              <i className={`fas ${testimonial.icon} text-yellow-400 text-sm`} />
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">{testimonial.author}</div>
                              <div className="text-white/40 text-xs">{testimonial.role}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Grand Finale - Connect */}
        <section data-section="5" id="contact" className="relative min-h-screen flex items-center justify-center px-5 py-20 ">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black" />
          {/* Fade to transparent at bottom for footer merge - starts after content */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none z-10" /> */}

          <div className="max-w-5xl mx-auto w-full relative z-20">
            <div className="relative bg-gradient-to-br from-white/[0.1] to-white/[0.02] backdrop-blur-3xl border-2 border-white/20 rounded-[4rem] p-16 md:p-20 overflow-hidden hover:border-white/40 transition-all duration-700">

              {/* Animated orbs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px] animate-pulse" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }} />

              <div className="relative text-center space-y-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs text-white/60 uppercase tracking-widest font-light">Let's Build Together</span>
                </div>

                <h2 className="text-6xl md:text-8xl font-extralight text-white tracking-tighter leading-tight">
                  Ready to Create
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Magic?
                  </span>
                </h2>

                <p className="text-2xl text-white/40 font-light max-w-3xl mx-auto leading-relaxed">
                  Join visionaries, dreamers, and builders shaping tomorrow. Your next breakthrough starts here.
                </p>

                <div className="max-w-md mx-auto">
                  <EmailForm />
                </div>

                <div className="relative py-12">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-6 bg-gradient-to-r from-transparent via-black to-transparent text-xs text-white/30 uppercase tracking-widest font-light">
                      Or Connect Directly
                    </span>
                  </div>
                </div>

                <SocialLinks />

                <div className="grid grid-cols-3 gap-10 pt-12 border-t border-white/10">
                  <div>
                    <div className="text-4xl font-light text-white mb-2">∞</div>
                    <div className="text-xs text-white/30 font-light uppercase tracking-wider">Possibilities</div>
                  </div>
                  <div>
                    <div className="text-4xl font-light text-white mb-2">2025</div>
                    <div className="text-xs text-white/30 font-light uppercase tracking-wider">Innovation Year</div>
                  </div>
                  <div>
                    <div className="text-4xl font-light text-white mb-2">24/7</div>
                    <div className="text-xs text-white/30 font-light uppercase tracking-wider">We're Here</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Shadow fade before footer */}
      <div className="relative h-20">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-black/40 pointer-events-none" />
      </div>

      <Footer />

      <style jsx>{`
        @keyframes scroll-indicator {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
