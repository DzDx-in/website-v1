'use client';

import { useEffect } from 'react';

export default function FluidLandingPage() {
  useEffect(() => {
    // Store original body styles
    const originalBodyStyle = {
      overflow: document.body.style.overflow,
      height: document.body.style.height,
    };

    // Set body styles for scroll effect
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    const timer = setTimeout(() => {
      const heroTitle = document.getElementById('heroTitle') as HTMLElement;
      const heroSubtitle = document.getElementById('heroSubtitle') as HTMLElement;
      const backgroundOverlay = document.getElementById('backgroundOverlay') as HTMLElement;
      const heroContent = document.getElementById('heroContent') as HTMLElement;
      const scrollIndicator = document.getElementById('scrollIndicator') as HTMLElement;
      const featuresContainer = document.getElementById('featuresContainer') as HTMLElement;

      let ticking = false;
      let hasAutoScrolled = false;
      let touchStartY = 0;
      let lastScrollTime = 0;
      let scrollVelocity = 0;
      let isInHeroSection = true;

      function autoScrollToFeatures() {
        if (hasAutoScrolled) return;
        hasAutoScrolled = true;
        
        const featuresTop = featuresContainer.offsetTop;
        window.scrollTo({
          top: featuresTop,
          behavior: 'smooth'
        });
      }

      function resetHeroState() {
        hasAutoScrolled = false;
        isInHeroSection = true;
        if (heroTitle) {
          heroTitle.style.transform = 'scale(1)';
          heroTitle.style.setProperty('color', '#000000', 'important');
        }
        if (backgroundOverlay) {
          backgroundOverlay.style.background = '#f8f9fc';
        }
        if (heroSubtitle) {
          heroSubtitle.style.opacity = '1';
        }
        if (scrollIndicator) {
          scrollIndicator.classList.remove('hidden');
        }
      }

      function updateOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const featuresTop = featuresContainer.offsetTop;
        
        const maxScroll = documentHeight - windowHeight;
        const scrollProgress = Math.min(scrollTop / maxScroll, 1);
        
        // Check if we're back in hero section
        if (scrollTop < featuresTop - 200) {
          if (!isInHeroSection) {
            resetHeroState();
          }
          isInHeroSection = true;
        } else {
          isInHeroSection = false;
        }
        
        // Ultra sensitive auto-scroll trigger - only when in hero section
        if (!hasAutoScrolled && isInHeroSection && scrollTop > 50) {
          autoScrollToFeatures();
          return;
        }
        
        // Only apply hero effects when in hero section
        if (isInHeroSection) {
          // Hide scroll indicator after user starts scrolling
          if (scrollIndicator) {
            if (scrollProgress > 0.02) {
              scrollIndicator.classList.add('hidden');
            } else {
              scrollIndicator.classList.remove('hidden');
            }
          }
          
          // Hero scaling effects
          const heroScrollProgress = Math.min(scrollTop / (featuresTop * 0.8), 1);
          const maxScale = 500;
          const scale = 1 + (maxScale - 1) * Math.pow(heroScrollProgress, 0.8);
          
          if (heroTitle) {
            heroTitle.style.transform = `scale(${scale})`;
            heroTitle.style.setProperty('color', '#000000', 'important');
          }
          
          const insideLetterThreshold = 100;
          if (scale > insideLetterThreshold) {
            const insideProgress = Math.min((scale - insideLetterThreshold) / (maxScale - insideLetterThreshold), 1);
            const bgColorValue = 255 - Math.floor(255 * insideProgress);
            const bgColor = `rgb(${bgColorValue}, ${bgColorValue}, ${bgColorValue})`;
            if (backgroundOverlay) {
              backgroundOverlay.style.background = bgColor;
            }
          } else {
            if (backgroundOverlay) {
              backgroundOverlay.style.background = '#f8f9fc';
            }
          }
          
          const subtitleOpacity = Math.max(0, 1 - heroScrollProgress * 4);
          if (heroSubtitle) {
            heroSubtitle.style.opacity = subtitleOpacity.toString();
          }
        }
        
        ticking = false;
      }

      function requestScrollUpdate() {
        if (!ticking) {
          requestAnimationFrame(updateOnScroll);
          ticking = true;
        }
      }

      // Touch event handlers for mobile - ultra sensitive
      function handleTouchStart(e: TouchEvent) {
        touchStartY = e.touches[0].clientY;
      }

      function handleTouchMove(e: TouchEvent) {
        const touchY = e.touches[0].clientY;
        const touchDelta = touchStartY - touchY;
        
        // Ultra sensitive - if user swipes up more than 30px, auto-scroll to features, but only in hero section
        if (touchDelta > 30 && !hasAutoScrolled && isInHeroSection) {
          autoScrollToFeatures();
        }
      }

      // Wheel event for desktop - ultra sensitive
      function handleWheel(e: WheelEvent) {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastScrollTime;
        lastScrollTime = currentTime;
        
        // Calculate scroll velocity
        scrollVelocity = Math.abs(e.deltaY) / deltaTime;
        
        // Ultra sensitive - any downward scroll triggers auto-scroll, but only in hero section
        if (e.deltaY > 0 && !hasAutoScrolled && isInHeroSection) {
          autoScrollToFeatures();
        }
      }

      // Add event listeners
      window.addEventListener('scroll', requestScrollUpdate, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('wheel', handleWheel, { passive: true });
      
      // Scroll indicator click handler
      if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
          autoScrollToFeatures();
        });
      }
      
      updateOnScroll();

      // Feature animations - improved intersection observer
      const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add a small delay to create sequential animation
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
          } else {
            // Remove visible class when out of view to re-trigger animation
            entry.target.classList.remove('visible');
          }
        });
      }, observerOptions);

      // Observe all feature sections
      document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
      });

      // Stagger animations
      document.querySelectorAll('.section').forEach(section => {
        const featurePoints = section.querySelectorAll('.feature-points li');
        const problemExamples = section.querySelectorAll('.problem-examples li');
        
        featurePoints.forEach((point, index) => {
          (point as HTMLElement).style.transitionDelay = `${index * 0.2}s`;
        });
        
        problemExamples.forEach((example, index) => {
          (example as HTMLElement).style.transitionDelay = `${index * 0.3}s`;
        });
      });

      // Stagger footer cards
      document.querySelectorAll('.feature-card').forEach((card, index) => {
        (card as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
      });

      // Stagger timeline items
      document.querySelectorAll('.timeline-item').forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.3}s`;
      });

      return () => {
        window.removeEventListener('scroll', requestScrollUpdate);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('wheel', handleWheel);
        observer.disconnect();
        // Restore original body styles
        document.body.style.overflow = originalBodyStyle.overflow;
        document.body.style.height = originalBodyStyle.height;
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      // Restore original body styles on cleanup
      document.body.style.overflow = originalBodyStyle.overflow;
      document.body.style.height = originalBodyStyle.height;
    };
  }, []);

  return (
    <div className="fluid-landing-wrapper">
      <style jsx>{`
        .fluid-landing-wrapper {
          position: relative;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Mac Hero Section */
        .mac-hero-section {
          height: 500vh; /* Much more height for extended zoom experience */
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fc;
        }

        .mac-hero-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 1000;
          pointer-events: none;
        }

        .mac-scroll-indicator {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: bounce 2s infinite;
          cursor: pointer;
          pointer-events: auto;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .mac-scroll-indicator.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .mac-scroll-text {
          font-size: 0.9rem;
          color: #667eea;
          font-weight: 500;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .mac-scroll-arrow {
          width: 24px;
          height: 24px;
          border: 2px solid #667eea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(102, 126, 234, 0.1);
          backdrop-filter: blur(10px);
        }

        .mac-scroll-arrow::after {
          content: '';
          width: 8px;
          height: 8px;
          border-right: 2px solid #667eea;
          border-bottom: 2px solid #667eea;
          transform: rotate(45deg);
          margin-top: -2px;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        .mac-hero-title {
          font-size: 4rem;
          font-weight: 700;
          color: #000000 !important;
          transform-origin: calc(50% - 10px) center;
          margin: 0;
          padding: 0;
          line-height: 1;
          transition: transform 0.1s ease-out;
        }
        
        /* Force title to stay pure black always */
        #heroTitle {
          color: #000000 !important;
        }
        
        #heroTitle * {
          color: #000000 !important;
        }

        .mac-hero-subtitle {
          font-size: 1.2rem;
          color: rgba(0,0,0,0.7);
          margin-top: 1rem;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        .mac-background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #f8f9fc;
          z-index: 999;
          transition: background 0.3s ease;
        }

        /* Features Section - naturally flows after hero */
        .features-container {
          background: #000;
          color: #fff;
          position: relative;
          z-index: 1001;
          overflow-x: hidden;
        }

        .section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5rem 5%;
          position: relative;
          opacity: 0;
          transform: translateY(100px) scale(0.95);
          transition: opacity 1.2s ease, transform 1.2s ease;
        }

        .section.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Staggered feature sections */
        .section:nth-child(1) { transition-delay: 0s; }
        .section:nth-child(2) { transition-delay: 0.2s; }
        .section:nth-child(3) { transition-delay: 0.4s; }
        .section:nth-child(4) { transition-delay: 0.6s; }
        .section:nth-child(5) { transition-delay: 0.8s; }
        .section:nth-child(6) { transition-delay: 1s; }

        .content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10%;
          max-width: 1400px;
          width: 100%;
          align-items: center;
        }

        .feature-side {
          text-align: left;
        }

        .feature-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
          display: block;
          transform: scale(0.8);
          transition: transform 0.6s ease;
        }

        .section.visible .feature-icon {
          transform: scale(1);
        }

        .feature-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, #888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feature-description {
          font-size: 1.3rem;
          line-height: 1.6;
          color: #ccc;
          margin-bottom: 2rem;
        }

        .feature-points {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .feature-points li {
          font-size: 1.1rem;
          color: #aaa;
          margin-bottom: 0.8rem;
          padding-left: 1.5rem;
          position: relative;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .section.visible .feature-points li {
          opacity: 1;
          transform: translateX(0);
        }

        .feature-points li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: #007AFF;
          font-weight: bold;
        }

        .problem-side {
          text-align: left;
          padding: 3rem;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 20px;
          border: 1px solid #333;
          position: relative;
          overflow: hidden;
        }

        .problem-side::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 0, 0, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .section.visible .problem-side::before {
          opacity: 1;
        }

        .problem-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #ff6b6b;
        }

        .problem-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #ddd;
          margin-bottom: 2rem;
        }

        .problem-examples {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .problem-examples li {
          font-size: 1rem;
          color: #ff9999;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(255, 0, 0, 0.1);
          border-radius: 10px;
          border-left: 4px solid #ff6b6b;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .section.visible .problem-examples li {
          opacity: 1;
          transform: translateX(0);
        }

        .footer-section {
          background: #111;
          padding: 3rem 5%;
          text-align: center;
        }

        /* Timeline Section */
        .timeline-section {
          background: #0a0a0a;
          min-height: auto;
          padding: 8rem 5% 6rem;
        }

        .timeline-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .timeline-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #007AFF 0%, #667eea 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .timeline-subtitle {
          font-size: 1.3rem;
          color: #888;
          margin-bottom: 4rem;
        }

        .timeline-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        /* Main snake line */
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(
            to bottom,
            #007AFF 0%,
            #667eea 25%,
            #764ba2 50%,
            #667eea 75%,
            #007AFF 100%
          );
          border-radius: 2px;
          transform: translateX(-50%);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }

        .timeline-item {
          position: relative;
          margin: 3rem 0;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }

        .section.visible .timeline-item {
          opacity: 1;
          transform: translateY(0);
        }

        /* Alternating left/right positioning */
        .timeline-left {
          text-align: right;
          padding-right: calc(50% + 3rem);
        }

        .timeline-right {
          text-align: left;
          padding-left: calc(50% + 3rem);
        }

        .timeline-dot {
          position: absolute;
          top: 1rem;
          width: 20px;
          height: 20px;
          background: #007AFF;
          border-radius: 50%;
          border: 4px solid #0a0a0a;
          box-shadow: 0 0 0 4px #007AFF, 0 0 20px rgba(0, 122, 255, 0.4);
          z-index: 10;
        }

        .timeline-left .timeline-dot {
          right: calc(50% - 10px);
        }

        .timeline-right .timeline-dot {
          left: calc(50% - 10px);
        }

        .timeline-current {
          background: #00ff88 !important;
          box-shadow: 0 0 0 4px #0a0a0a, 0 0 0 8px #00ff88, 0 0 30px rgba(0, 255, 136, 0.6) !important;
          animation: pulse-current 2s infinite;
        }

        @keyframes pulse-current {
          0%, 100% {
            box-shadow: 0 0 0 4px #0a0a0a, 0 0 0 8px #00ff88, 0 0 30px rgba(0, 255, 136, 0.6);
          }
          50% {
            box-shadow: 0 0 0 4px #0a0a0a, 0 0 0 12px #00ff88, 0 0 40px rgba(0, 255, 136, 0.8);
          }
        }

        .timeline-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          padding: 2rem;
          border-radius: 15px;
          border: 1px solid #333;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .timeline-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.2);
        }

        .timeline-current-card {
          background: linear-gradient(135deg, #1a2a1a 0%, #2a3a2a 100%) !important;
          border: 1px solid #00ff88 !important;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }

        .timeline-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0, 122, 255, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .timeline-card:hover::before {
          opacity: 1;
        }

        .timeline-year {
          font-size: 0.9rem;
          color: #007AFF;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .timeline-current-card .timeline-year {
          color: #00ff88;
        }

        .timeline-card h3 {
          font-size: 1.4rem;
          color: #fff;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .timeline-card p {
          color: #ccc;
          line-height: 1.6;
          margin: 0;
        }

        /* Snake effect with CSS curves */
        .timeline-item:nth-child(odd) .timeline-card {
          margin-right: 2rem;
        }

        .timeline-item:nth-child(even) .timeline-card {
          margin-left: 2rem;
        }

        /* Add connection lines from dots to cards */
        .timeline-left::after {
          content: '';
          position: absolute;
          top: 1.6rem;
          right: calc(50% + 10px);
          width: 2rem;
          height: 2px;
          background: linear-gradient(to left, #007AFF, transparent);
        }

        .timeline-right::after {
          content: '';
          position: absolute;
          top: 1.6rem;
          left: calc(50% + 10px);
          width: 2rem;
          height: 2px;
          background: linear-gradient(to right, #007AFF, transparent);
        }

        @media (max-width: 768px) {
          .timeline-container::before {
            left: 2rem;
          }
          
          .timeline-left,
          .timeline-right {
            text-align: left;
            padding-left: 4rem;
            padding-right: 1rem;
          }
          
          .timeline-left .timeline-dot,
          .timeline-right .timeline-dot {
            left: 1rem;
          }
          
          .timeline-left::after,
          .timeline-right::after {
            left: 2rem;
            width: 1.5rem;
            background: linear-gradient(to right, #007AFF, transparent);
          }
          
          .timeline-title {
            font-size: 2.2rem;
          }
          
          .timeline-card {
            padding: 1.5rem;
          }
        }

        .footer-section {
          background: #111;
          padding: 3rem 5%;
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #007AFF;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          background: #1a1a1a;
          padding: 2rem;
          border-radius: 15px;
          border: 1px solid #333;
          transform: scale(0.9);
          opacity: 0;
          transition: all 0.6s ease;
        }

        .footer-section.visible .feature-card {
          transform: scale(1);
          opacity: 1;
        }

        .feature-card h3 {
          color: #007AFF;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .feature-card p {
          color: #ccc;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .mac-hero-title {
            font-size: 2.5rem;
          }
          
          .mac-hero-subtitle {
            font-size: 1rem;
          }
          
          .content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .feature-title {
            font-size: 2.5rem;
          }
          
          .problem-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="mac-background-overlay" id="backgroundOverlay"></div>
      
      <div className="mac-hero-section">
        <div className="mac-hero-content" id="heroContent">
          <h1 className="mac-hero-title" id="heroTitle">The Real Feed</h1>
          <p className="mac-hero-subtitle" id="heroSubtitle">Make your mouse feel right at home on Mac</p>
        </div>
        
        <div className="mac-scroll-indicator" id="scrollIndicator">
          <span className="mac-scroll-text">Scroll to explore</span>
          <div className="mac-scroll-arrow"></div>
        </div>
      </div>

      <div className="features-container" id="featuresContainer">
        {/* Basic Analysis Section */}
        <section className="section" data-section="basic-analysis">
          <div className="content">
            <div className="feature-side">
              <span className="feature-icon">🧠</span>
              <h2 className="feature-title">Basic Analysis</h2>
              <p className="feature-description">
                Understand the true nature of every article with comprehensive sentiment and bias analysis.
              </p>
              <ul className="feature-points">
                <li>Headline & Article Sentiment Analysis</li>
                <li>Tone Detection (Critical, Informative, Sarcastic)</li>
                <li>Intent Recognition (Inform, Persuade, Provoke)</li>
                <li>Bias Score Rating</li>
              </ul>
            </div>
            <div className="problem-side">
              <h3 className="problem-title">The Current Problem</h3>
              <p className="problem-description">
                Most readers consume news without understanding the hidden emotional manipulation and bias built into headlines and articles.
              </p>
              <ul className="problem-examples">
                <li>"BREAKING: Economy CRASHES as Politicians FAIL" - Fear-driven, biased language</li>
                <li>Articles designed to provoke anger rather than inform</li>
                <li>Hidden partisan slants that go unnoticed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Emotional Analysis Section */}
        <section className="section" data-section="emotions">
          <div className="content">
            <div className="feature-side">
              <span className="feature-icon">🔝</span>
              <h2 className="feature-title">Emotional Intelligence</h2>
              <p className="feature-description">
                Detect emotional manipulation in news content before it influences your judgment.
              </p>
              <ul className="feature-points">
                <li>Neutral content identification</li>
                <li>Fear-driven language detection</li>
                <li>Disgust and repulsion flagging</li>
                <li>Emotional balance scoring</li>
              </ul>
            </div>
            <div className="problem-side">
              <h3 className="problem-title">Emotional Manipulation</h3>
              <p className="problem-description">
                News outlets deliberately trigger fear, anger, and disgust to increase engagement and clicks, distorting your perception of reality.
              </p>
              <ul className="problem-examples">
                <li>Fear-mongering headlines about rare events</li>
                <li>Outrage-inducing content for higher engagement</li>
                <li>Emotional language that bypasses rational thinking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Readability Section */}
        <section className="section" data-section="readability">
          <div className="content">
            <div className="feature-side">
              <span className="feature-icon">📚</span>
              <h2 className="feature-title">Readability Metrics</h2>
              <p className="feature-description">
                Understand how accessible and complex news content really is.
              </p>
              <ul className="feature-points">
                <li>Difficulty level assessment</li>
                <li>Grade level requirements</li>
                <li>Flesch Reading Ease scoring</li>
                <li>Accessibility recommendations</li>
              </ul>
            </div>
            <div className="problem-side">
              <h3 className="problem-title">Complexity Confusion</h3>
              <p className="problem-description">
                Many news articles are unnecessarily complex or overly simplified, preventing proper understanding of important issues.
              </p>
              <ul className="problem-examples">
                <li>Important topics dumbed down beyond usefulness</li>
                <li>Complex jargon that excludes average readers</li>
                <li>No indication of reading difficulty level</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="section" data-section="summary">
          <div className="content">
            <div className="feature-side">
              <span className="feature-icon">📝</span>
              <h2 className="feature-title">Intelligent Summaries</h2>
              <p className="feature-description">
                Get concise, unbiased summaries that capture the essential information without the fluff.
              </p>
              <ul className="feature-points">
                <li>AI-generated paragraph summaries</li>
                <li>Key point extraction (3-4 core takeaways)</li>
                <li>Bias-free condensation</li>
                <li>Time-saving insights</li>
              </ul>
            </div>
            <div className="problem-side">
              <h3 className="problem-title">Information Overload</h3>
              <p className="problem-description">
                Articles are often padded with unnecessary content, making it hard to extract the actual news quickly.
              </p>
              <ul className="problem-examples">
                <li>500-word articles with 2 sentences of actual news</li>
                <li>Repetitive content to increase reading time</li>
                <li>Important facts buried in promotional text</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Factual Claims Section */}
        <section className="section" data-section="factual">
          <div className="content">
            <div className="feature-side">
              <span className="feature-icon">📢</span>
              <h2 className="feature-title">Factual Verification</h2>
              <p className="feature-description">
                Identify and verify explicit factual claims with transparent sourcing and credibility scores.
              </p>
              <ul className="feature-points">
                <li>Quoted claims highlighting</li>
                <li>Source credibility assessment</li>
                <li>Attribution verification</li>
                <li>Fact vs. opinion separation</li>
              </ul>
            </div>
            <div className="problem-side">
              <h3 className="problem-title">Fact-Fiction Blur</h3>
              <p className="problem-description">
                Most news mixes facts, opinions, and speculation without clear distinction, making verification impossible.
              </p>
              <ul className="problem-examples">
                <li>Opinions presented as facts</li>
                <li>Unverified claims from unnamed sources</li>
                <li>Speculation mixed with actual reporting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Entity Recognition Section */}
        <section className="section" data-section="entities">
          <div className="content">
            <div className="feature-side">
              <span className="feature-icon">🧾</span>
              <h2 className="feature-title">Key Entity Mapping</h2>
              <p className="feature-description">
                Automatically identify and categorize all important people, organizations, locations, and timeframes.
              </p>
              <ul className="feature-points">
                <li>Person identification and context</li>
                <li>Organization and company tracking</li>
                <li>Geographic location mapping</li>
                <li>Temporal reference extraction</li>
              </ul>
            </div>
            <div className="problem-side">
              <h3 className="problem-title">Context Confusion</h3>
              <p className="problem-description">
                Articles often mention entities without proper context, leaving readers confused about who's who and what's what.
              </p>
              <ul className="problem-examples">
                <li>Names mentioned without introduction</li>
                <li>Unclear organizational relationships</li>
                <li>Geographic references without context</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section section">
          <div className="timeline-content">
            <h2 className="timeline-title">How News Analysis Evolved</h2>
            <p className="timeline-subtitle">From basic reporting to AI-powered truth detection</p>
            
            <div className="timeline-container">
              <div className="timeline-item timeline-left">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">1990s</div>
                  <h3>Traditional Media Era</h3>
                  <p>Newspapers and TV dominated. Editorial bias existed but was often transparent. Fact-checking was internal and basic.</p>
                </div>
              </div>

              <div className="timeline-item timeline-right">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">2000s</div>
                  <h3>Digital Revolution</h3>
                  <p>Online news exploded. Speed became priority over accuracy. First fact-checking websites emerged like Snopes and PolitiFact.</p>
                </div>
              </div>

              <div className="timeline-item timeline-left">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">2010s</div>
                  <h3>Social Media Chaos</h3>
                  <p>Facebook and Twitter became news sources. Clickbait headlines optimized for engagement. Echo chambers and filter bubbles formed.</p>
                </div>
              </div>

              <div className="timeline-item timeline-right">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">2016</div>
                  <h3>Fake News Crisis</h3>
                  <p>Election misinformation peak. "Fake news" entered mainstream vocabulary. Manual fact-checking couldn't keep up with viral false content.</p>
                </div>
              </div>

              <div className="timeline-item timeline-left">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">2020</div>
                  <h3>AI Detection Begins</h3>
                  <p>First AI tools for detecting bias and misinformation. COVID-19 "infodemic" showed need for real-time analysis. Basic sentiment analysis tools emerged.</p>
                </div>
              </div>

              <div className="timeline-item timeline-right">
                <div className="timeline-dot timeline-current"></div>
                <div className="timeline-card timeline-current-card">
                  <div className="timeline-year">2025</div>
                  <h3>The Real Feed Era</h3>
                  <p>Comprehensive AI analysis of every article. Real-time bias detection, emotional manipulation flagging, and factual verification at scale.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with All Features */}
        <section className="footer-section section">
          <div className="footer-content">
            <h2 className="footer-title">The Complete Analysis Platform</h2>
            <p style={{fontSize: '1.2rem', color: '#ccc', marginBottom: '2rem'}}>
              Every feature working together to give you the clearest picture.
            </p>
            
            <div className="features-grid">
              <div className="feature-card">
                <h3>🧠 Basic Analysis</h3>
                <p>Sentiment, tone, intent, and bias detection</p>
              </div>
              <div className="feature-card">
                <h3>🔝 Emotional Intelligence</h3>
                <p>Fear, disgust, and emotional manipulation detection</p>
              </div>
              <div className="feature-card">
                <h3>📚 Readability Metrics</h3>
                <p>Difficulty level and grade assessments</p>
              </div>
              <div className="feature-card">
                <h3>📝 Smart Summaries</h3>
                <p>AI-generated summaries and key points</p>
              </div>
              <div className="feature-card">
                <h3>📢 Factual Claims</h3>
                <p>Verification and source credibility</p>
              </div>
              <div className="feature-card">
                <h3>🧾 Entity Recognition</h3>
                <p>People, organizations, locations, and timeline mapping</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}