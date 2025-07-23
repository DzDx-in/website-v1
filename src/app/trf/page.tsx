'use client';

import { useEffect, useState } from 'react';

export default function RealFeedWithAnimation() {
  const [scrollY, setScrollY] = useState(0);

  const [windowDimensions, setWindowDimensions] = useState({
    width: 1200,
    height: 800
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

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

  // Features data with placeholder media
  const features = [
    {
      title: "Real Stories.",
      description: "Share authentic moments without filters or facades. Connect through genuine experiences that matter.",
      media: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop&crop=center",
      type: "image"
    },
    {
      title: "Real Connections.",
      description: "Build meaningful relationships with people who share your values and interests.",
      media: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761",
      type: "video"
    },
    {
      title: "Real Moments.",
      description: "Capture life's authentic experiences without the pressure of perfection.",
      media: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=600&fit=crop&crop=center",
      type: "image"
    },
    {
      title: "Real Community.",
      description: "Join a space where authenticity thrives and genuine connections flourish.",
      media: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
      type: "video"
    },
    {
      title: "Real Impact.",
      description: "Make a difference in your community through meaningful interactions and shared experiences.",
      media: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=600&fit=crop&crop=center",
      type: "image"
    },
    {
      title: "Real Growth.",
      description: "Grow personally and professionally in an environment that values authenticity over algorithms.",
      media: "https://player.vimeo.com/external/295045879.sd.mp4?s=7f920155580dd27c9ded3fc8dd27c8d76e5290b4&profile_id=139&oauth2_token_id=57447761",
      type: "video"
    }
  ];

  // Calculate transformation based on scroll and screen size
  const maxScroll = 400;
  const progress = Math.min(scrollY / maxScroll, 1);
  const scale = 1 - (progress * 0.75);
  const screenHeight = windowDimensions.height;
  const navbarHeight = 64;
  const navbarTop = 10;
  const navbarCenter = navbarTop + (navbarHeight / 2);
  const screenCenter = screenHeight / 2;
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
          <source src="https://player.vimeo.com/external/424735705.sd.mp4?s=b90eb1f9a48e6c82db4b2e4bb90e1f5ecb2b9a5e&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
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
        className="fixed top-2.5 left-4 right-4 h-16 bg-black/10 backdrop-blur-md rounded-xl border border-white/10 transition-opacity duration-500 flex items-center justify-between px-6 z-10"
        style={{
          opacity: navbarOpacity
        }}
      >
        {/* Left side - empty or logo */}
        <div className="w-20"></div>
      
        {/* Right side - CTA Button */}
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-2 px-4 text-white font-medium transition-all duration-200">
          Join Waitlist
        </button>
      </div>

      {/* The Real Feed Title with Cone Animation */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-11">
        <h1
          className="text-white font-bold tracking-wider transition-all duration-200 ease-out"
          style={{
            fontSize: `${10 - progress * 1}rem`,
            transform: `translateY(${translateY}px) scale(${scale})`,
            transformOrigin: 'center center',
            textShadow: '0 4px 30px rgba(0,0,0,0.8)',
          }}
        >
          THE REAL FEED
        </h1>
      </div>

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
          <div className="w-full py-20">
            {/* Features Layout with sliding animation */}
            <div className="relative w-full h-[600px] overflow-hidden">
              
              {/* Horizontal scrolling container that includes both text and cards */}
              <div 
                className="overflow-x-auto overflow-y-hidden w-full h-full scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                style={{ 
                  scrollBehavior: 'smooth',
                  touchAction: 'pan-x pinch-zoom'
                }}
              >
                <div className="flex items-center space-x-6 px-6 py-4 h-full" style={{ marginLeft: '60px' }}>
                  
                  {/* "What Makes us Real" text as first item */}
                  <div
                    className="flex-shrink-0 h-full flex items-center justify-center text-3xl lg:text-5xl font-bold text-white whitespace-nowrap"
                    style={{
                      width: '40%',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    What Makes us Real →
                  </div>

                  {/* Feature Cards */}
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="relative rounded-3xl overflow-hidden flex-shrink-0 group cursor-pointer"
                      style={{
                        width: '320px',
                        height: `${Math.min(550, windowDimensions.height * 0.65)}px`,
                        scrollSnapAlign: 'start'
                      }}
                    >
                      {/* Media Background */}
                      {feature.type === "image" ? (
                        <img
                          src={feature.media}
                          alt={feature.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

                      {/* Fallback Background Gradient */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
                        style={{ display: 'none' }}
                      ></div>

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
                      <div className="relative h-full flex flex-col justify-start p-8 pt-10 z-10">
                        <div className="mb-8">
                          <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">{feature.title}</h3>
                          <p className="text-base text-white/90 leading-relaxed mb-6 drop-shadow-md">
                            {feature.description}
                          </p>
                        </div>
                        <button className="self-start bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-3 px-6 text-white font-medium transition-all duration-200 drop-shadow-lg">
                          Learn more →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-white transition-all duration-200"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    const cardWidth = 320 + 24; // card width + gap
                    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                  }
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-white transition-all duration-200"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    const cardWidth = 320 + 24; // card width + gap
                    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                  }
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}