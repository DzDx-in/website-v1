'use client';

import Footer from '@/components/Layout/Footer';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function RealFeedWithAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1200,
    height: 800
  });
  // const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // setIsMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const features = [
    {
      title: "Emotional Headlines, Hidden Motives",
      description: "We detect emotional tone and hidden intent — so you know what's real.",
      media: "https://cdn.dzdx.in/1.webp",
      type: "image"
    },
    {
      title: "Opinions Disguised as Facts",
      description: "We tag every sentence as fact, opinion, or speculation — and rate story balance.",
      media: "https://cdn.dzdx.in/1.webm",
      type: "video"
    },
    {
      title: "Long, Complex & Hard to Read",
      description: "We break it down into short summaries and key points — so you get the gist fast.",
      media: "https://cdn.dzdx.in/1.webp",
      type: "image"
    },
    {
      title: "Can't Trust What You Read",
      description: "We show all sources and rate trust — so you know what's verified.",
      media: "https://cdn.dzdx.in/1.webm",
      type: "video"
    },
    {
      title: "Subtle Psychological Influence",
      description: "We flag manipulation tactics — so you stay in control of how you think.",
      media: "https://cdn.dzdx.in/1.webp",
      type: "image"
    },
    {
      title: "One-Sided Stories, No Space to Think",
      description: "We merge multiple views and open discussions — so you see the full picture.",
      media: "https://cdn.dzdx.in/1.webm",
      type: "video"
    }
  ];

  // Check if mobile
  const isMobile = windowDimensions.width < 768;
  const isTablet = windowDimensions.width >= 768 && windowDimensions.width < 1024;

  // Calculate transformation based on scroll and screen size - adjusted for mobile
  const maxScroll = isMobile ? 300 : 400;
  const progress = Math.min(scrollY / maxScroll, 1);
  const scale = isMobile ? 1 - (progress * 0.5) : 1 - (progress * 0.75); // Less dramatic scaling on mobile
  // const screenHeight = windowDimensions.height;
  const navbarHeight = isMobile ? 48 : 64; // adjust if your mobile navbar is shorter
  const navbarTop = isMobile ? 10 : 10;    // adjust if needed
  const navbarCenter = navbarTop + (navbarHeight / 2);
  const screenCenter = windowDimensions.height / 2;
  const distanceToNavCenter = screenCenter - navbarCenter;
  const translateY = -progress * distanceToNavCenter;
  const navbarOpacity = progress > 0.7 ? (progress - 0.7) * 3.33 : 0;

  return (
    <div className="relative min-h-[200vh]">
      {/* Video Background - Fixed */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.dzdx.in/landing.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Golden gradient overlay - Matching root page theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#1a1a1a]/40 to-[#3a2a1e]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#FFD70015,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#DAA52010,_transparent_70%)]" />
      </div>

      {/* Floating Navbar */}
      <div
        className="fixed top-2.5 left-2 right-2 sm:left-4 sm:right-4 h-12 sm:h-16 bg-black/10 backdrop-blur-md rounded-xl border border-white/10 transition-opacity duration-500 flex items-center justify-between px-3 sm:px-6 z-50"
        style={{
          opacity: navbarOpacity
        }}
      >
        {/* Left side: Show "THE REAL FEED" in navbar on mobile when fully scrolled */}
        <div className="flex-1 flex items-center">
          {isMobile && progress === 1 && (
            <span className="text-white font-bold tracking-wider text-lg whitespace-nowrap">
              THE REAL FEED
            </span>
          )}
        </div>

        {/* Right side - Download Buttons */}
        <div className="flex gap-2">
          <a
            href="https://apps.apple.com/in/app/the-real-feed-news-explained/id6749306200"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 text-white font-medium transition-all duration-200 text-xs sm:text-sm"
          >
            iOS
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.dzdx.therealfeed&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 text-white font-medium transition-all duration-200 text-xs sm:text-sm"
          >
            Android
          </a>
        </div>
      </div>

      {/* The Real Feed Title with Cone Animation */}
      {!(isMobile && progress === 1) && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[60] px-4">
          <h1
            className="text-white font-bold tracking-wider transition-all duration-200 ease-out text-center whitespace-nowrap"
            style={{
              fontSize: `clamp(${isMobile ? '2.2rem' : isTablet ? '4.5rem' : '7rem'}, ${isMobile ? '10vw' : isTablet ? '8vw' : '7vw'}, ${isMobile ? '3.5rem' : isTablet ? '7rem' : '10rem'})`,
              transform: `translateY(${translateY}px) scale(${scale})`,
              transformOrigin: 'center center',
              textShadow: '0 4px 30px rgba(0,0,0,0.8)',
              lineHeight: 1.1,
              letterSpacing: isMobile ? '0.05em' : '0.08em',
            }}
          >
            THE REAL FEED
          </h1>
        </div>
      )}

      {/* Call-to-Action overlay on the landing screen */}
      <div
        className="fixed inset-0 flex items-end justify-center pb-16 sm:pb-20 pointer-events-none z-15 px-4"
        style={{
          opacity: 1 - progress * 2 // Fade out as user scrolls
        }}
      >
        <div className="pointer-events-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="https://apps.apple.com/in/app/the-real-feed-news-explained/id6749306200"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-3 px-6 sm:py-4 sm:px-8 text-white font-medium transition-all duration-200 text-base sm:text-lg shadow-2xl text-center"
          >
            Download on iOS
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.dzdx.therealfeed&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-3 px-6 sm:py-4 sm:px-8 text-white font-medium transition-all duration-200 text-base sm:text-lg shadow-2xl text-center"
          >
            Download on Android
          </a>
        </div>
      </div>

      {/* Spacer to enable scrolling */}
      <div className="h-screen"></div>

      {/* Shadow fade transition from hero to content */}
      <div className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black/80 pointer-events-none z-20" style={{ top: 'calc(100vh - 10rem)' }} />

      {/* Content below the animation */}
      <div id="features-section" className="relative z-0 text-white bg-black/80 backdrop-blur-sm">
        <div className="relative">
          <div className="w-full py-12 sm:py-20">
            {/* Features Layout - Mobile: Vertical Cards, Desktop: Horizontal Scroll */}
            {isMobile ? (
              // Mobile Layout: Vertical Stack
              <div className="px-4 space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    What Makes us Real
                  </h2>
                </div>

                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer"
                    // style={{ height: '400px' }}
                  >
                    
                    {feature.type === "image" ? (
                      <Image
                        src={feature.media}
                        alt={feature.title}
                        fill
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="100vw"
                        priority={index === 0}
                      />
                    ) : (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      >
                        <source src={feature.media} type="video/mp4" />
                      </video>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                    {/* Bottom Gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)'
                      }}
                    ></div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6 z-10">
                      <h3 className="text-xl font-bold mb-3 text-white drop-shadow-lg">{feature.title}</h3>
                      <p className="text-sm text-white/90 leading-relaxed mb-4 drop-shadow-md">
                        {feature.description}
                      </p>
                      <button className="self-start bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-2 px-4 text-white font-medium transition-all duration-200 drop-shadow-lg text-sm">
                        Learn more →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop/Tablet Layout: Simple Horizontal Scroll
              <div className="relative w-full py-16 overflow-hidden">
                {/* Section Header */}
                <div className="max-w-7xl mx-auto px-8 mb-12 text-center">
                  <h2 className="text-4xl md:text-6xl font-light text-white mb-4">
                    What Makes us <span className="text-blue-400">Real</span>
                  </h2>
                  <p className="text-white/60">
                    AI-powered transparency for unbiased journalism
                  </p>
                </div>

                {/* Scroll Buttons */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20">
                  <button
                    onClick={() => {
                      const container = document.getElementById('features-scroll-container');
                      if (container) container.scrollLeft -= 400;
                    }}
                    className="w-12 h-12 rounded-full bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
                  >
                    <i className="fas fa-chevron-left text-blue-400" />
                  </button>
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
                  <button
                    onClick={() => {
                      const container = document.getElementById('features-scroll-container');
                      if (container) container.scrollLeft += 400;
                    }}
                    className="w-12 h-12 rounded-full bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
                  >
                    <i className="fas fa-chevron-right text-blue-400" />
                  </button>
                </div>

                {/* Scrolling Cards Container */}
                <div
                  id="features-scroll-container"
                  className="overflow-x-scroll overflow-y-hidden w-full px-8"
                  style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  <div className="flex gap-6 pb-8">
                    {/* Feature Cards */}
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="relative rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer bg-black/40 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                        style={{
                          width: '350px',
                          minHeight: '480px',
                        }}
                      >
                        {/* Media Background */}
                        {feature.type === "image" ? (
                          <Image
                            src={feature.media}
                            alt={feature.title}
                            fill
                            className="absolute inset-0 w-full h-full object-cover"
                            sizes="350px"
                            priority={index === 0}
                          />
                        ) : (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          >
                            <source src={feature.media} type="video/mp4" />
                          </video>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />

                        {/* Gradient Bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-6 z-10">
                          <h3 className="text-xl font-medium text-white mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-white/70 text-sm leading-relaxed mb-4">
                            {feature.description}
                          </p>
                          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                            <span>Learn more</span>
                            <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons - Hidden on mobile */}
                {/* <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
                  <button
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-white transition-all duration-200"
                    onClick={() => {
                      const container = document.querySelector('.overflow-x-auto');
                      if (container) {
                        const cardWidth = isTablet ? 280 + 16 : 320 + 24;
                        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                      }
                    }}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-white transition-all duration-200"
                    onClick={() => {
                      const container = document.querySelector('.overflow-x-auto');
                      if (container) {
                        const cardWidth = isTablet ? 280 + 16 : 320 + 24;
                        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                      }
                    }}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div> */}
              </div>
            )}
          </div>

          {/* Now Live Section */}
          <div className="relative py-12 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-400/30 mb-4">
                  <span className="font-semibold">NOW LIVE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                  Available Now on iOS & Android
                </h2>
                <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                  Experience authentic news analysis powered by AI. Download The Real Feed today and see news differently.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {/* iOS Card */}
                <a
                  href="https://apps.apple.com/in/app/the-real-feed-news-explained/id6749306200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">iOS</h3>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base mb-4">
                    Download from the App Store
                  </p>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="font-medium">Get it now</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>

                {/* Android Card */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.dzdx.therealfeed&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Android</h3>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.6,9.48L16.85,8.73C17.05,8.17 17.16,7.58 17.16,7C17.16,4.24 14.92,2 12.16,2C9.4,2 7.16,4.24 7.16,7C7.16,7.58 7.27,8.17 7.47,8.73L6.72,9.48C5.87,10.33 5.38,11.5 5.38,12.74V17C5.38,18.66 6.72,20 8.38,20H16C17.66,20 19,18.66 19,17V12.74C19,11.5 18.5,10.33 17.6,9.48M14.97,11.22C14.97,11.75 14.54,12.19 14,12.19C13.46,12.19 13.03,11.75 13.03,11.22C13.03,10.68 13.46,10.25 14,10.25C14.54,10.25 14.97,10.68 14.97,11.22M10.03,11.22C10.03,11.75 9.6,12.19 9.06,12.19C8.53,12.19 8.09,11.75 8.09,11.22C8.09,10.68 8.53,10.25 9.06,10.25C9.6,10.25 10.03,10.68 10.03,11.22Z" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base mb-4">
                    Download from Google Play
                  </p>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="font-medium">Get it now</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* User Stats */}
              <div className="mt-12 sm:mt-16 text-center">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20 max-w-md mx-auto">
                  <div className="text-4xl sm:text-6xl font-bold text-white mb-2">
                    1,410+
                  </div>
                  <div className="text-white/70 text-sm sm:text-lg uppercase tracking-wider">
                    Users Already Onboard
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Shadow fade before footer */}
      <div className="relative h-1">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/80 to-black/40 pointer-events-none" />
      </div>

      <Footer />

      <style jsx>{`
        #features-scroll-container::-webkit-scrollbar {
          display: none;
        }
        #features-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
} 