'use client';

import Footer from '@/components/Layout/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Download URLs
const DOWNLOAD_URLS = {
  mac: '/downloads/GlobalScan.dmg',
  windows: '/downloads/GlobalScan.exe',
  android: 'https://play.google.com/store/apps/details?id=com.dzdx.barcode.client'
};

export default function GlobalScanPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1200,
    height: 800
  });
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [downloadPlatform, setDownloadPlatform] = useState<'mac' | 'windows' | 'android' | null>(null);
  const [countdown, setCountdown] = useState(5);

  // Handle download click
  const handleDownload = (platform: 'mac' | 'windows' | 'android') => {
    setDownloadPlatform(platform);
    setCountdown(5);
    setShowModal(true);
  };

  // Countdown and download effect
  useEffect(() => {
    if (!showModal || !downloadPlatform) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Trigger download or redirect
      if (downloadPlatform === 'android') {
        // Use location.href to avoid popup blocker
        window.location.href = DOWNLOAD_URLS.android;
      } else {
        // Create download link for Mac/Windows
        const link = document.createElement('a');
        link.href = DOWNLOAD_URLS[downloadPlatform];
        link.download = downloadPlatform === 'mac' ? 'GlobalScan.dmg' : 'GlobalScan.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // Close modal after a brief delay
      setTimeout(() => {
        setShowModal(false);
        setDownloadPlatform(null);
      }, 500);
    }
  }, [showModal, countdown, downloadPlatform]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Generate particles
    const generatedParticles = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`
    }));
    setParticles(generatedParticles);

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: 'fa-wifi',
      title: 'Wireless Transfer',
      description: 'Instantly send scanned QR codes and barcodes from your phone to your computer over WiFi. No cables, no hassle.',
      color: 'cyan',
      gradient: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      icon: 'fa-desktop',
      title: 'Cross-Platform',
      description: 'Works seamlessly on both Mac and Windows. One app to connect your Android device to any computer.',
      color: 'purple',
      gradient: 'from-purple-500/20 to-pink-500/10'
    },
    {
      icon: 'fa-history',
      title: 'History & Management',
      description: 'View all your scanned codes in one place. Search, filter, and organize your scan history effortlessly.',
      color: 'emerald',
      gradient: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      icon: 'fa-file-excel',
      title: 'Excel Export',
      description: 'Automatically export scanned data to Excel spreadsheets. Perfect for inventory, tracking, and data management.',
      color: 'green',
      gradient: 'from-green-500/20 to-lime-500/10'
    },
    {
      icon: 'fa-bolt',
      title: 'Real-Time Sync',
      description: 'Scans appear on your computer instantly. No delays, no waiting. Your workflow stays uninterrupted.',
      color: 'yellow',
      gradient: 'from-yellow-500/20 to-amber-500/10'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Secure Connection',
      description: 'Your data stays on your local network. No cloud storage, no privacy concerns. Complete control over your scans.',
      color: 'red',
      gradient: 'from-red-500/20 to-orange-500/10'
    }
  ];

  const useCases = [
    { icon: 'fa-warehouse', title: 'Inventory Management', desc: 'Scan products and update your inventory in real-time' },
    { icon: 'fa-store', title: 'Retail & POS', desc: 'Speed up checkout with mobile scanning to desktop' },
    { icon: 'fa-clipboard-list', title: 'Asset Tracking', desc: 'Track equipment and assets across your organization' },
    { icon: 'fa-truck', title: 'Logistics', desc: 'Streamline shipping and receiving with instant data transfer' },
  ];

  // Check if mobile
  const isMobile = windowDimensions.width < 768;
  const isTablet = windowDimensions.width >= 768 && windowDimensions.width < 1024;

  // Calculate transformation based on scroll
  const maxScroll = isMobile ? 300 : 400;
  const progress = Math.min(scrollY / maxScroll, 1);
  const scale = isMobile ? 1 - (progress * 0.5) : 1 - (progress * 0.75);
  const navbarHeight = isMobile ? 48 : 64;
  const navbarTop = isMobile ? 10 : 10;
  const navbarCenter = navbarTop + (navbarHeight / 2);
  const screenCenter = windowDimensions.height / 2;
  const distanceToNavCenter = screenCenter - navbarCenter;
  const translateY = -progress * distanceToNavCenter;
  const navbarOpacity = progress > 0.7 ? (progress - 0.7) * 3.33 : 0;

  return (
    <div className="relative min-h-[200vh]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#0a0a0f]">
        {/* Animated gradient orbs */}
        <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/15 to-blue-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[30%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,255,255,0.02)_1.5px,transparent_1.5px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black,transparent_70%)]" />

        {/* QR code pattern overlay - subtle */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm4 4v12h12V4H4zm2 2h8v8H6V6zm24-6h20v20H30V0zm4 4v12h12V4H34zm2 2h8v8h-8V6zM0 30h20v20H0V30zm4 4v12h12V34H4zm2 2h8v8H6v-8zm24-6h20v20H30V30zm4 4v12h12V34H34zm2 2h8v8h-8v-8zM0 60h8v-8H0v8zm52-60h8v8h-8V0zm0 52h8v8h-8v-8z' fill='%2300FFFF' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Mouse follower gradient */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="fixed w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-float z-0"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}

      {/* Floating Navbar */}
      <div
        className="fixed top-2.5 left-2 right-2 sm:left-4 sm:right-4 h-12 sm:h-16 bg-black/20 backdrop-blur-xl rounded-xl border border-cyan-500/20 transition-all duration-500 flex items-center justify-between px-3 sm:px-6 z-50"
        style={{
          opacity: navbarOpacity
        }}
      >
        <div className="flex-1 flex items-center">
          {isMobile && progress === 1 && (
            <span className="text-white font-bold tracking-wider text-sm whitespace-nowrap">
              GlobalScan
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleDownload('mac')}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-sm border border-cyan-500/30 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 text-cyan-400 font-medium transition-all duration-200 text-xs sm:text-sm flex items-center gap-1"
          >
            <i className="fab fa-apple" />
            <span className="hidden sm:inline">Mac</span>
          </button>
          <button
            onClick={() => handleDownload('windows')}
            className="bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border border-blue-500/30 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 text-blue-400 font-medium transition-all duration-200 text-xs sm:text-sm flex items-center gap-1"
          >
            <i className="fab fa-windows" />
            <span className="hidden sm:inline">Windows</span>
          </button>
          <button
            onClick={() => handleDownload('android')}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-sm border border-emerald-500/30 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 text-emerald-400 font-medium transition-all duration-200 text-xs sm:text-sm flex items-center gap-1"
          >
            <i className="fab fa-android" />
            <span className="hidden sm:inline">Android</span>
          </button>
        </div>
      </div>

      {/* Hero Title with Cone Animation */}
      {!(isMobile && progress === 1) && (
        <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-[60] px-4">
          {/* Logo/Icon - fades out faster */}
          <div
            className="mb-6 transition-all duration-200 ease-out"
            style={{
              transform: `scale(${scale})`,
              opacity: Math.max(0, 1 - progress * 2)
            }}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl border border-cyan-500/30 flex items-center justify-center shadow-[0_0_60px_rgba(0,255,255,0.3)]">
              <i className="fas fa-desktop text-4xl sm:text-5xl text-cyan-400" />
            </div>
          </div>

          <h1
            className="text-white font-bold tracking-wider transition-all duration-200 ease-out text-center"
            style={{
              fontSize: `clamp(${isMobile ? '1.5rem' : isTablet ? '3rem' : '4rem'}, ${isMobile ? '8vw' : isTablet ? '6vw' : '5vw'}, ${isMobile ? '2.5rem' : isTablet ? '5rem' : '7rem'})`,
              transform: `translateY(${translateY - (progress * (isMobile ? 20 : 45))}px) scale(${scale})`,
              transformOrigin: 'center center',
              textShadow: '0 4px 30px rgba(0,255,255,0.5)',
              lineHeight: 1.1,
              letterSpacing: isMobile ? '0.02em' : '0.05em',
            }}
          >
            GlobalScan
          </h1>
          <p
            className="text-cyan-400/80 font-light tracking-wide transition-all duration-200 ease-out text-center mt-2"
            style={{
              fontSize: `clamp(${isMobile ? '0.9rem' : isTablet ? '1.2rem' : '1.5rem'}, ${isMobile ? '4vw' : '2vw'}, ${isMobile ? '1.2rem' : '2rem'})`,
              transform: `scale(${scale})`,
              opacity: Math.max(0, 1 - progress * 1.5)
            }}
          >
            Barcode & QR to PC
          </p>
        </div>
      )}

      {/* Tagline and CTA on landing screen */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-end pb-20 sm:pb-24 pointer-events-none z-15 px-4"
        style={{
          opacity: 1 - progress * 2
        }}
      >
        <p className="text-white/60 text-center text-sm sm:text-lg mb-4 max-w-xl">
          Seamlessly transfer QR codes & barcodes from your Android phone to Mac or Windows over WiFi
        </p>
        <p className="text-emerald-400/80 text-center text-xs sm:text-sm mb-6 flex items-center justify-center gap-2">
          <i className="fas fa-check-circle" />
          100% Free - No hidden charges ever
        </p>
        <div className="pointer-events-auto flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => handleDownload('mac')}
            className="group bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur-sm border border-cyan-500/30 rounded-full py-3 px-5 sm:py-3 sm:px-6 text-white font-medium transition-all duration-300 text-sm sm:text-base shadow-[0_0_30px_rgba(0,255,255,0.2)] text-center flex items-center justify-center gap-2"
          >
            <i className="fab fa-apple text-lg" />
            Mac
          </button>
          <button
            onClick={() => handleDownload('windows')}
            className="group bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 backdrop-blur-sm border border-blue-500/30 rounded-full py-3 px-5 sm:py-3 sm:px-6 text-white font-medium transition-all duration-300 text-sm sm:text-base shadow-[0_0_30px_rgba(59,130,246,0.2)] text-center flex items-center justify-center gap-2"
          >
            <i className="fab fa-windows text-lg" />
            Windows
          </button>
          <button
            onClick={() => handleDownload('android')}
            className="group bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 backdrop-blur-sm border border-emerald-500/30 rounded-full py-3 px-5 sm:py-3 sm:px-6 text-white font-medium transition-all duration-300 text-sm sm:text-base shadow-[0_0_30px_rgba(16,185,129,0.2)] text-center flex items-center justify-center gap-2"
          >
            <i className="fab fa-android text-lg" />
            Android
          </button>
        </div>
      </div>

      {/* Spacer to enable scrolling */}
      <div className="h-screen"></div>

      {/* Shadow fade transition from hero to content */}
      <div className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0f] pointer-events-none z-20" style={{ top: 'calc(100vh - 10rem)' }} />

      {/* Content below the animation */}
      <div className="relative z-10 bg-[#0a0a0f]">

        {/* How It Works Section */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-xs text-cyan-400 uppercase tracking-widest font-medium">How It Works</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
                Simple. <span className="text-cyan-400">Seamless.</span> Fast.
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Connect your Android phone to your computer in seconds and start transferring scans instantly
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Install Both Apps', desc: 'Download GlobalScan on your Android phone and Mac/Windows computer', icon: 'fa-download' },
                { step: '02', title: 'Connect via WiFi', desc: 'Both devices connect automatically when on the same WiFi network', icon: 'fa-wifi' },
                { step: '03', title: 'Scan & Transfer', desc: 'Scan any QR code or barcode and watch it appear on your computer instantly', icon: 'fa-qrcode' },
              ].map((item, idx) => (
                <div key={idx} className="group relative">
                  <div className="relative p-8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,255,255,0.15)]">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                      {item.step}
                    </div>
                    <div className="mt-4">
                      <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <i className={`fas ${item.icon} text-2xl text-cyan-400`} />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                      <p className="text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20 rounded-full mb-6">
                <i className="fas fa-star text-purple-400 text-sm" />
                <span className="text-xs text-purple-400 uppercase tracking-widest font-medium">Features</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
                Everything You <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Need</span>
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Powerful features designed to streamline your workflow and boost productivity
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`group relative p-8 bg-gradient-to-br ${feature.gradient} backdrop-blur-xl border border-white/10 rounded-3xl hover:border-${feature.color}-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,255,255,0.1)] overflow-hidden`}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>

                  <div className="relative">
                    <div className={`w-14 h-14 bg-${feature.color}-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-${feature.color}-500/30`}>
                      <i className={`fas ${feature.icon} text-xl text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                    <p className="text-white/50 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-500/20 rounded-full mb-6">
                <i className="fas fa-lightbulb text-emerald-400 text-sm" />
                <span className="text-xs text-emerald-400 uppercase tracking-widest font-medium">Use Cases</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
                Built for <span className="text-emerald-400">Business</span>
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                From small businesses to enterprise, GlobalScan adapts to your needs
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="group text-center p-8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 border border-emerald-500/20">
                    <i className={`fas ${useCase.icon} text-2xl text-emerald-400`} />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{useCase.title}</h3>
                  <p className="text-white/50 text-sm">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="relative py-20 sm:py-32 px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent -z-10" />

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 px-6 py-3 rounded-full border border-cyan-500/30 mb-6">
                <span className="font-semibold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  AVAILABLE NOW
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
                Download <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">GlobalScan</span>
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Get started in minutes. Download the app for your devices and experience seamless barcode & QR transfer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Mac Card */}
              <button
                onClick={() => handleDownload('mac')}
                className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,255,255,0.2)] overflow-hidden text-left"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px]" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                        <i className="fab fa-apple text-3xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white">Mac</h3>
                        <p className="text-white/50 text-sm">macOS 11.0+</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-download text-cyan-400" />
                    </div>
                  </div>

                  <p className="text-white/60 mb-6">
                    Desktop companion app for macOS. Receive and manage all your scanned codes in one place.
                  </p>

                  <div className="flex items-center gap-2 text-cyan-400 font-medium">
                    <span>Download .dmg</span>
                    <i className="fas fa-arrow-right text-sm group-hover:translate-x-2 transition-transform duration-500" />
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-emerald-400">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-check-circle" />
                        ALWAYS FREE - No hidden charges
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Windows Card */}
              <button
                onClick={() => handleDownload('windows')}
                className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(59,130,246,0.2)] overflow-hidden text-left"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                        <i className="fab fa-windows text-3xl text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white">Windows</h3>
                        <p className="text-white/50 text-sm">Windows 10/11</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-download text-blue-400" />
                    </div>
                  </div>

                  <p className="text-white/60 mb-6">
                    Desktop companion app for Windows. Receive and manage all your scanned codes in one place.
                  </p>

                  <div className="flex items-center gap-2 text-blue-400 font-medium">
                    <span>Download .exe</span>
                    <i className="fas fa-arrow-right text-sm group-hover:translate-x-2 transition-transform duration-500" />
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-emerald-400">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-check-circle" />
                        ALWAYS FREE - No hidden charges
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Android Card */}
              <button
                onClick={() => handleDownload('android')}
                className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(16,185,129,0.2)] overflow-hidden md:col-span-2 lg:col-span-1 text-left"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-[80px]" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                        <i className="fab fa-android text-3xl text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white">Android</h3>
                        <p className="text-white/50 text-sm">Android 8.0+</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-download text-emerald-400" />
                    </div>
                  </div>

                  <p className="text-white/60 mb-6">
                    Mobile scanner app with powerful QR code and barcode recognition. Scan and send instantly.
                  </p>

                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span>Get on Play Store</span>
                    <i className="fas fa-arrow-right text-sm group-hover:translate-x-2 transition-transform duration-500" />
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-emerald-400">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-check-circle" />
                        ALWAYS FREE - No hidden charges
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Free Forever Banner */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-full">
                <i className="fas fa-gift text-emerald-400" />
                <span className="text-white/80 font-medium">Completely Free Forever - No subscriptions, no in-app purchases, no hidden fees</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
              {[
                { value: 'Free', label: 'To Download' },
                { value: '<1s', label: 'Transfer Speed' },
                { value: '100%', label: 'Local & Secure' },
              ].map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="text-3xl sm:text-4xl font-light text-white mb-2 group-hover:text-cyan-400 transition-colors duration-500">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-[3rem] p-12 sm:p-16 text-center overflow-hidden">
              {/* Animated orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
                  Ready to Streamline Your <span className="text-cyan-400">Workflow?</span>
                </h2>
                <p className="text-lg text-white/50 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who have already transformed how they handle barcode and QR code data transfer.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      const downloadSection = document.getElementById('download');
                      if (downloadSection) {
                        downloadSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] hover:scale-105"
                  >
                    <span>Get Started Free</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/70 font-medium rounded-full hover:bg-white/5 hover:text-white transition-all duration-300"
                  >
                    <span>Back to Home</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Shadow fade before footer */}
      <div className="relative h-1">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a0a0f] to-black/40 pointer-events-none" />
      </div>

      <Footer />

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              setDownloadPlatform(null);
            }}
          />

          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-cyan-500/30 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-[0_0_100px_rgba(0,255,255,0.2)] animate-modal-in">
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[80px]" />

            <div className="relative">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                {downloadPlatform === 'mac' && <i className="fab fa-apple text-4xl text-white" />}
                {downloadPlatform === 'windows' && <i className="fab fa-windows text-4xl text-blue-400" />}
                {downloadPlatform === 'android' && <i className="fab fa-android text-4xl text-emerald-400" />}
              </div>

              {/* Thank you message */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Thank You!
              </h3>
              <p className="text-white/70 mb-6">
                {downloadPlatform === 'android'
                  ? 'Redirecting you to Google Play Store...'
                  : `Your download for ${downloadPlatform === 'mac' ? 'Mac' : 'Windows'} will start automatically...`
                }
              </p>

              {/* Countdown */}
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                  {countdown}
                </div>
                <p className="text-white/50 text-sm mt-2">seconds</p>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                />
              </div>

              {/* Free badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm">
                <i className="fas fa-gift" />
                <span>ALWAYS FREE - Enjoy!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        @keyframes modal-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
