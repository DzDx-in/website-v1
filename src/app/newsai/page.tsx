'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Brain, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

// Import reusable components
import AnalysisSection from '@/components/analysis/AnalysisSection';
import AnalysisCard from '@/components/analysis/AnalysisCard';
import ProgressBar from '@/components/analysis/ProgressBar';
import SourceBadge from '@/components/analysis/SourceBadge';
import MockArticle from '@/components/analysis/MockArticle';

// Import data configuration
import { analysisData, AnalysisConfig } from '@/data/analysisData';

const NewsAIPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const newsChannelsRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  // Sample news queries that rotate - use useMemo to prevent recreation
  const newsQueries = useMemo(() => [
    "Latest AI developments",
    "Climate change updates",
    "Election coverage analysis",
    "Tech industry news",
    "Global economic trends"
  ], []);

  // Typing animation for demo query
  useEffect(() => {
    let queryIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeQuery = () => {
      const current = newsQueries[queryIndex];

      if (!isDeleting) {
        setCurrentQuery(current.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === current.length) {
          setTimeout(() => isDeleting = true, 2000);
        }
      } else {
        setCurrentQuery(current.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          queryIndex = (queryIndex + 1) % newsQueries.length;
        }
      }
    };

    const interval = setInterval(typeQuery, isDeleting ? 50 : 100);
    return () => clearInterval(interval);
  }, [newsQueries]);

  // Auto-scrolling news channels
  useEffect(() => {
    const scrollContainer = newsChannelsRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scroll = () => {
      scrollPosition += 1;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  // Scroll handler for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let indexToShow = -1;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            const index = sectionsRef.current.findIndex(s => s === entry.target);
            if (index !== -1) {
              maxRatio = entry.intersectionRatio;
              indexToShow = index;
            }
          }
        });

        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;

        if (indexToShow !== -1) {
          // Only block backward activation if scrolling down
          if (scrollingDown && activeSectionIndex !== null && indexToShow < activeSectionIndex) return;

          setActiveSectionIndex(indexToShow);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSectionIndex]);

  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setEmail('');
    alert('Thank you! You\'ll be among the first to experience unbiased news analysis.');
  };

  const testimonials = [
    {
      quote: "Finally, a tool that cuts through media bias and gives me the facts I need to make informed decisions.",
      name: "Dr. Sarah Mitchell",
      title: "Political Analyst",
      company: "Georgetown University",
      avatar: "SM"
    },
    {
      quote: "The AI analysis is incredibly detailed. I can see exactly how different outlets frame the same story.",
      name: "James Rodriguez",
      title: "Investigative Journalist",
      company: "Reuters",
      avatar: "JR"
    },
    {
      quote: "This platform has revolutionized how our newsroom approaches fact-checking and bias detection.",
      name: "Lisa Chen",
      title: "Editor-in-Chief",
      company: "Digital Tribune",
      avatar: "LC"
    }
  ];

  const newsChannels = [
    "cnn", "bbc", "reuters", "ap", "npr", "wsj", "nyt", "wapo", "fox", "msnbc",
    "guardian", "telegraph", "ft", "economist", "bloomberg", "politico", "axios", "vox"
  ];

  // Render content component based on analysis config
  const renderContentComponent = (config: AnalysisConfig) => {
    return (
      <div className="space-y-4">
        {config.metrics?.map((metric, index) => (
          <AnalysisCard
            key={`metric-${config.id}-${index}`}
            label={metric.label}
            value={metric.value}
            description={metric.description}
            color={config.color + "-400"}
            borderColor={config.color + "-500/20"}
          />
        ))}

        {config.progressBars?.map((bar, index) => (
          <ProgressBar
            key={`progress-${config.id}-${index}`}
            label={bar.label}
            value={bar.value}
            color={bar.color}
          />
        ))}

        {config.sources?.map((source, index) => (
          <SourceBadge
            key={`source-${config.id}-${index}`}
            name={source.name}
            grade={source.grade}
            credibility={source.credibility}
            type={source.type}
            description={source.description}
          />
        ))}
      </div>
    );
  };
  // Render image component based on type
  const renderImageComponent = (config: AnalysisConfig) => {
    switch (config.imageType) {
      case 'article':
        return (
          <MockArticle
            source="CNN"
            headline="Major Economic Policy Announced"
            content="Officials today announced sweeping changes to economic policy that could reshape the financial landscape..."
            highlights={[
              { text: "Officials today announced", type: "sentiment" },
              { text: "could reshape", type: "bias" }
            ]}
            overlays={[
              { type: "Sentiment", value: "+7.2" }
            ]}
          />
        );
      case 'dashboard':
        return (
          <div className={`bg-gradient-to-br from-${config.color}-900 to-${config.color === 'green' ? 'teal' : 'purple'}-900 rounded-2xl p-6`}>
            <div className="text-center mb-6">
              <h4 className="text-white font-bold mb-2">{config.title} Dashboard</h4>
              <div className={`text-${config.color}-300 text-sm`}>Real-time analysis</div>
            </div>
            <div className="space-y-3">
              {config.progressBars?.map((bar, index) => (
                <div key={`dashboard-bar-${config.id}-${index}`} className="bg-black/20 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{bar.label}</span>
                    <span className={`text-${bar.color} font-bold`}>{bar.value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className={`bg-${bar.color} h-2 rounded-full`} style={{ width: `${bar.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'comparison':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/50 rounded-xl p-4 border border-blue-500/30">
                <div className="text-xs text-blue-300 mb-2">Liberal Frame</div>
                <h5 className="text-white text-sm font-bold mb-2">Progressive Policy Reform</h5>
                <p className="text-gray-300 text-xs">&ldquo;Groundbreaking economic justice initiative...&rdquo;</p>
              </div>
              <div className="bg-red-900/50 rounded-xl p-4 border border-red-500/30">
                <div className="text-xs text-red-300 mb-2">Conservative Frame</div>
                <h5 className="text-white text-sm font-bold mb-2">Government Overreach</h5>
                <p className="text-gray-300 text-xs">&ldquo;Dangerous expansion of federal control...&rdquo;</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-white text-sm font-bold">Balance Score</div>
              <div className="text-yellow-400 text-lg font-bold">4.2/10</div>
              <div className="text-xs text-gray-400">Highly polarized coverage</div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`bg-gradient-to-br from-${config.color}-900 to-purple-900 rounded-2xl p-6`}>
            <div className="text-center">
              <h4 className="text-white font-bold mb-2">{config.title}</h4>
              <div className={`text-${config.color}-300 text-sm`}>Analysis Visualization</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-visible">
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showNav
        ? 'translate-y-0 bg-black/90 backdrop-blur-lg border-b border-white/10'
        : '-translate-y-full'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-400">NewsScope</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#analysis" className="text-gray-300 hover:text-white transition-colors">Analysis</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all transform hover:scale-105">
              Try Beta
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-radial from-purple-600/5 to-transparent rounded-full"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Most Advanced
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-400 hover:to-red-300 transition-all duration-500 cursor-default">
              News Analysis
            </span>
            Platform Ever Built
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Cut through media bias with AI-powered analysis.
            <br />Get the facts, detect propaganda, understand the truth.
          </p>

          {/* Live Demo Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-4">
                <Search className="w-6 h-6 text-blue-400 mr-4" />
                <div className="flex-1 text-left">
                  <div className="text-gray-400 text-sm mb-1">Try News AI:</div>
                  <div className="text-white text-lg font-medium">
                    {currentQuery}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Analyze
                </button>
              </div>
              <p className="text-sm text-gray-400">AI searches latest news and provides comprehensive analysis</p>
            </div>
          </div>

          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for beta access"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400"
            />
            <button
              onClick={handleEmailSubmit}
              disabled={isSubmitting}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  Get Beta Access
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* News Channels Section */}
      <section className="py-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Analyzing News From Leading Sources</h3>
            <p className="text-gray-400">Real-time analysis across hundreds of news outlets worldwide</p>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={newsChannelsRef}
              className="flex space-x-8 animate-scroll"
              style={{ width: 'calc(200% + 2rem)' }}
            >
              {/* First set */}
              {newsChannels.map((channel, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="text-white/80 font-semibold text-sm uppercase tracking-wider">
                    {channel}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {newsChannels.map((channel, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="text-white/80 font-semibold text-sm uppercase tracking-wider">
                    {channel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced News Analysis Section */}
      <section id="analysis" className="bg-black relative">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Introduction */}
        <div className="max-w-7xl mx-auto">
          <div
            ref={el => { sectionsRef.current[0] = el; }}
            className={`text-center py-24 transition-all duration-1000 ${activeSectionIndex === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 bg-clip-text text-transparent">
              Advanced News Analysis
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deep dive into every aspect of news articles with our comprehensive AI analysis engine.
            </p>
          </div>
        </div>

        {/* Analysis Sections - Responsive height based on content */}
        {analysisData.map((config, index) => {
          const stepCount = (config.metrics?.length || 0) + (config.progressBars?.length || 0) + (config.sources?.length || 0);

          return (
            <div
              key={config.id}
              className="relative"
              style={{
                // Dynamic height based on content with responsive scaling
                height: `max(${Math.max(stepCount * 25, 120)}vh, ${stepCount * 200 + 600}px)`,
                minHeight: '100vh'
              }}
            >
              <AnalysisSection
                ref={el => { sectionsRef.current[index + 1] = el; }}
                title={config.title}
                subtitle={config.subtitle}
                color={config.color}
                layout={config.layout}
                imageComponent={renderImageComponent(config)}
                contentComponent={renderContentComponent(config)}
                walkthrough={config.walkthrough}
                metrics={config.metrics}
                progressBars={config.progressBars}
                sources={config.sources}
                className=""
                isActive={activeSectionIndex === index + 1}
              />
            </div>
          );
        })}
      </section>

      <section className="relative z-[10] h-[300vh] bg-black">
        <div className="sticky top-0 h-screen flex items-center justify-center z-20 pointer-events-none">
          <Image
            src="/dzdx_nobg.png"
            alt="DZDX Logo"
            width={800}
            height={600}
            className="max-h-[80vh] object-contain"
          />
        </div>
      </section>

      {/* Demo Analysis Section */}
      <section id="demo" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={el => { sectionsRef.current[10] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-1000"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-black">See NewsScope in Action</h2>
              <p className="text-xl text-gray-600">Watch how our AI analyzes real news articles in seconds</p>
            </div>

            <div className="relative bg-black rounded-3xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Mock Article */}
                <div className="bg-white rounded-2xl p-6">
                  <div className="text-black">
                    <div className="text-xs text-gray-500 mb-2">CNN • 2 hours ago</div>
                    <h3 className="text-xl font-bold mb-4">Breaking: Major Economic Policy Announced</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      In a surprising move today, officials announced sweeping changes to economic policy that could reshape the financial landscape. The controversial decision has sparked debate among experts...
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      <span>📊 Analyzing...</span>
                      <span>🔍 Fact-checking...</span>
                      <span>🎯 Detecting bias...</span>
                    </div>
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 text-white">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Analysis Results
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Bias Score:</span>
                      <span className="text-yellow-400">3.2/10 (Slight Left)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sentiment:</span>
                      <span className="text-blue-400">Neutral (6.1/10)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emotion:</span>
                      <span className="text-orange-400">Uncertainty (High)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Factual Grade:</span>
                      <span className="text-green-400">B+ (8.3/10)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Readability:</span>
                      <span className="text-purple-400">Grade 12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={el => { sectionsRef.current[11] = el; }}
            className="text-center opacity-0 translate-y-8 transition-all duration-1000"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-16">Trusted by News Professionals</h2>

            <div className="relative">
              <div className="bg-gray-800 rounded-3xl p-12 max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-light text-gray-200 mb-8 leading-relaxed">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg text-white">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-400">{testimonials[activeTestimonial].title}, {testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            ref={el => { sectionsRef.current[12] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-1000"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to see through
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 bg-clip-text text-transparent">
                media manipulation?
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12">
              Join the beta and experience the most advanced news analysis platform ever created.
            </p>

            <div className="max-w-md mx-auto flex gap-3 mb-12">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
              <button
                onClick={handleEmailSubmit}
                disabled={isSubmitting}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Join Beta
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
              @keyframes fade-in-up {
                from {
                  opacity: 0;
                  transform: translateY(32px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              .animate-fade-in-up {
                animation: fade-in-up 1s ease-out forwards;
              }
              
              .bg-gradient-radial {
                background: radial-gradient(circle, var(--tw-gradient-stops));
              }
      
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .animate-scroll {
                animation: scroll 60s linear infinite;
              }
              
              .animate-scroll:hover {
                animation-play-state: paused;
              }
      
              /* Ensure fixed elements work properly */
              body {
                overflow-x: hidden;
              }
      
              /* Fix for sticky/fixed positioning conflicts */
              #analysis {
                position: relative;
                z-index: 0;
              }
.fade-out-black {
  opacity: 0.15;
  filter: brightness(0.2);
  transition: opacity 0.8s ease, filter 0.8s ease;
}

.fade-in-section {
  opacity: 1;
  filter: brightness(1);
  transition: opacity 0.8s ease, filter 0.8s ease;
}

            `}</style>
    </div>
  );
};

export default NewsAIPage;