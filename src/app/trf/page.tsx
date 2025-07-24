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

  // Waitlist form state
  const [waitlistForm, setWaitlistForm] = useState({
    email: '',
    phone: ''
  });
  const [waitlistStatus, setWaitlistStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  // Waitlist stats state
  const [waitlistStats, setWaitlistStats] = useState({
    totalCount: 1410,
    recentSubmissions: [],
    loading: true
  });

  // Countdown state - Launch date: March 15, 2025
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

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

    // Fetch waitlist stats
    fetchWaitlistStats();

    // Setup countdown timer
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearInterval(countdownInterval);
    };
  }, []);

  // Fetch waitlist statistics
  const fetchWaitlistStats = async () => {
    try {
      const response = await fetch('/api/waitlist');
      const data = await response.json();

      if (data.success) {
        const actualCount = data.data.totalCount;
        const boostedTotal = 1410 + actualCount; // Boost by adding actual count to base 1410

        setWaitlistStats({
          totalCount: boostedTotal,
          recentSubmissions: data.data.recentSubmissions || [],
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching waitlist stats:', error);
      setWaitlistStats(prev => ({ ...prev, loading: false }));
    }
  };

  // Update countdown timer
  const updateCountdown = () => {
    const launchDate = new Date('2025-08-15T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    } else {
      setCountdown({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      });
    }
  };

  // Handle waitlist form submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!waitlistForm.email || !waitlistForm.phone) {
      setWaitlistStatus({
        loading: false,
        success: false,
        error: 'Please fill in all fields'
      });
      return;
    }

    setWaitlistStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waitlistForm),
      });

      const data = await response.json();

      if (data.success) {
        setWaitlistStatus({
          loading: false,
          success: true,
          error: ''
        });
        setWaitlistForm({ email: '', phone: '' });

        // Refresh waitlist stats after successful submission
        fetchWaitlistStats();

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowWaitlistModal(false);
          setWaitlistStatus({ loading: false, success: false, error: '' });
        }, 3000);
      } else {
        setWaitlistStatus({
          loading: false,
          success: false,
          error: data.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      let errorMessage = 'Network error. Please try again.';
      if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
      }
      setWaitlistStatus({
        loading: false,
        success: false,
        error: errorMessage
      });
    }
  };

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
      <div className="fixed inset-0 w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover blur"
        >
          <source src="https://cdn.dzdx.in/landing.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.9) 100%)`
          }}
        ></div>
      </div>

      {/* Floating Navbar */}
      <div
        className="fixed top-2.5 left-2 right-2 sm:left-4 sm:right-4 h-12 sm:h-16 bg-black/10 backdrop-blur-md rounded-xl border border-white/10 transition-opacity duration-500 flex items-center justify-between px-3 sm:px-6 z-10"
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

        {/* Right side - CTA Button */}
        <button
          onClick={() => setShowWaitlistModal(true)}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 text-white font-medium transition-all duration-200 text-sm sm:text-base"
        >
          Join Waitlist
        </button>
      </div>

      {/* The Real Feed Title with Cone Animation */}
      {!(isMobile && progress === 1) && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20 px-4">
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
        <div className="pointer-events-auto">
          <button
            onClick={() => setShowWaitlistModal(true)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-3 px-6 sm:py-4 sm:px-8 text-white font-medium transition-all duration-200 text-base sm:text-lg shadow-2xl"
          >
            Join the Waitlist →
          </button>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={() => setShowWaitlistModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white text-xl sm:text-2xl"
            >
              ×
            </button>

            {waitlistStatus.success ? (
              <div className="text-center py-6 sm:py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/20 text-green-400 mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Welcome to the Real Feed!</h3>
                <p className="text-white/80 text-sm sm:text-base">
                  You&apos;re on the waitlist! We&apos;ll notify you as soon as The Real Feed launches.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Join The Real Feed</h3>
                  <p className="text-white/80 text-sm sm:text-base">
                    Be the first to experience authentic news analysis powered by AI.
                  </p>
                </div>

                <form onSubmit={handleWaitlistSubmit} className="space-y-3 sm:space-y-4">
                  {waitlistStatus.error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-xs sm:text-sm">
                      {waitlistStatus.error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={waitlistForm.email}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-white/50 text-sm sm:text-base"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={waitlistForm.phone}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, phone: e.target.value })}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-white/50 text-sm sm:text-base"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={waitlistStatus.loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-medium py-2.5 px-4 sm:py-3 sm:px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {waitlistStatus.loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Joining...
                      </div>
                    ) : (
                      'Join Waitlist'
                    )}
                  </button>
                </form>

                <p className="text-white/60 text-xs text-center mt-3 sm:mt-4">
                  We&apos;ll only use your information to notify you about The Real Feed launch.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Spacer to enable scrolling */}
      <div className="h-screen"></div>

      {/* Content below the animation */}
      <div id="features-section" className="relative z-0 text-white">
        <div
          className="absolute inset-0 backdrop-blur-md bg-black/20"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        ></div>

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
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

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
              // Desktop/Tablet Layout: Horizontal Scroll
              <div className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
                <div
                  className="overflow-x-auto overflow-y-hidden w-full h-full scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                  style={{
                    scrollBehavior: 'smooth',
                    touchAction: 'pan-x pinch-zoom'
                  }}
                >
                  <div className="flex items-center space-x-4 sm:space-x-6 px-4 sm:px-6 py-4 h-full" style={{ marginLeft: isTablet ? '30px' : '60px' }}>

                    {/* "What Makes us Real" text as first item */}
                    <div
                      className="flex-shrink-0 h-full flex items-center justify-center text-2xl sm:text-3xl lg:text-5xl font-bold text-white whitespace-nowrap"
                      style={{
                        width: isTablet ? '50%' : '40%',
                        scrollSnapAlign: 'start',
                      }}
                    >
                      What Makes us Real →
                    </div>

                    {/* Feature Cards */}
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 group cursor-pointer"
                        style={{
                          width: isTablet ? '35%' : '25%',
                          height: '100%',
                          scrollSnapAlign: 'start'
                        }}
                      >
                        {/* Media Background */}
                        {feature.type === "image" ? (
                          <Image
                            src={feature.media}
                            alt={feature.title}
                            fill
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 35vw, 100vw"
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
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

                        {/* Bottom Gradient */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)'
                          }}
                        ></div>

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-start p-4 sm:p-6 lg:p-8 pt-6 sm:pt-8 lg:pt-10 z-10">
                          <div className="mb-4 sm:mb-6 lg:mb-8">
                            <h3 className="text-lg sm:text-xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white drop-shadow-lg">{feature.title}</h3>
                            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 lg:mb-6 drop-shadow-md">
                              {feature.description}
                            </p>
                          </div>
                          <button className="self-start bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-2 px-3 sm:py-2.5 sm:px-4 lg:py-3 lg:px-6 text-white font-medium transition-all duration-200 drop-shadow-lg text-xs sm:text-sm lg:text-base">
                            Learn more →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons - Hidden on mobile */}
                <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
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
                </div>
              </div>
            )}
          </div>

          {/* People Waiting Section */}
          <div className="relative py-12 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">

                {/* People Waiting Counter */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                    People Waiting
                  </h2>

                  {/* Main Counter Box */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-2">
                      {waitlistStats.loading ? '1,410' : waitlistStats.totalCount.toLocaleString()}
                    </div>
                    <div className="text-white/70 text-sm sm:text-lg uppercase tracking-wider">
                      Total Registered
                    </div>
                  </div>

                  <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8">
                    Join thousands of people who are ready to experience <br className="hidden sm:block" />
                    <strong>The Real Feed</strong>
                  </p>

                </div>

                {/* Countdown Timer */}
                <div className="text-center lg:text-right order-1 lg:order-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                    Until Launch
                  </h2>

                  <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                        {countdown.days}
                      </div>
                      <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">
                        Days
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                        {countdown.hours}
                      </div>
                      <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">
                        Hours
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                        {countdown.minutes}
                      </div>
                      <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">
                        Minutes
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-6 border border-white/20">
                      <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                        {countdown.seconds}
                      </div>
                      <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">
                        Sec
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Launch Date</h3>
                    <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">
                      August 15, 2025
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm">
                      The Real Feed will be available on iOS, Android, and Web
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Final Call-to-Action Section */}
          <div className="relative py-12 sm:py-20 text-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready for Real News?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8">
                Join thousands of users who are waiting to experience news without the noise.
              </p>
              <button
                onClick={() => setShowWaitlistModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-200 shadow-2xl"
              >
                Join the Waitlist
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />

    </div>
  );
} 