import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

interface HighlightArea {
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
}

interface MetricConfig {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  highlightArea?: HighlightArea;
}

interface ProgressConfig {
  label: string;
  value: number;
  color: string;
  highlightArea?: HighlightArea;
}

interface SourceConfig {
  name: string;
  grade: string;
  credibility: number;
  type: 'primary' | 'secondary' | 'opinion';
  description: string;
  highlightArea?: HighlightArea;
}

interface WalkthroughConfig {
  enabled: boolean;
  screenshotUrl: string;
  title: string;
  description: string;
}

interface AnalysisSectionProps {
  title: string;
  subtitle?: string;
  color: string;
  layout: 'imageLeft' | 'textLeft';
  imageComponent: React.ReactNode;
  contentComponent: React.ReactNode;
  className?: string;
  walkthrough?: WalkthroughConfig;
  metrics?: MetricConfig[];
  progressBars?: ProgressConfig[];
  sources?: SourceConfig[];
  isActive?: boolean;
}

type WalkthroughItem = 
  | (MetricConfig & { type: 'metric' })
  | (ProgressConfig & { type: 'progress' })
  | (SourceConfig & { type: 'source' });

const AnalysisSection = forwardRef<HTMLDivElement, AnalysisSectionProps>(
  ({
    title,
    subtitle,
    color,
    layout,
    imageComponent,
    contentComponent,
    className = "",
    walkthrough,
    metrics = [],
    progressBars = [],
    sources = [],
    isActive = true
  }, ref) => {
    const [activeStepIndex, setActiveStepIndex] = useState(-1);
    const [screenshotDimensions, setScreenshotDimensions] = useState({ width: 0, height: 0 });
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const screenshotRef = useRef<HTMLImageElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeHighlight, setActiveHighlight] = useState<HighlightArea | null>(null);
    const screenshotWrapperRef = useRef<HTMLDivElement>(null);
    
    // Create unique ID for this instance
    const instanceId = useRef(`analysis-${Math.random().toString(36).substr(2, 9)}`);

    const isImageLeft = layout === 'imageLeft';
    const shouldUseWalkthrough = walkthrough?.enabled && (metrics.length > 0 || progressBars.length > 0 || sources.length > 0);

    // Combine all items that can be highlighted - use useMemo to prevent recreation
    const allItems = useMemo(() => [
      ...metrics.map(m => ({ ...m, type: 'metric' as const })),
      ...progressBars.map(p => ({ ...p, type: 'progress' as const })),
      ...sources.map(s => ({ ...s, type: 'source' as const }))
    ], [metrics, progressBars, sources]);

    // Intersection Observer for section visibility
    useEffect(() => {
      const currentRef = ref && 'current' in ref ? ref.current : sectionRef.current;
      if (!currentRef) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Section is visible - we can handle visibility logic here if needed
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(currentRef);

      return () => observer.disconnect();
    }, [ref]);

    // Update screenshot dimensions when image loads
    useEffect(() => {
      const updateDimensions = () => {
        if (screenshotRef.current) {
          const rect = screenshotRef.current.getBoundingClientRect();
          setScreenshotDimensions({ width: rect.width, height: rect.height });
        }
      };

      const img = screenshotRef.current;
      if (img) {
        if (img.complete) {
          updateDimensions();
        } else {
          img.addEventListener('load', updateDimensions);
          return () => img.removeEventListener('load', updateDimensions);
        }
      }

      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Intersection Observer for step tracking
    useEffect(() => {
      if (!shouldUseWalkthrough) return;

      // Clear previous state when starting fresh
      setActiveStepIndex(-1);

      const observer = new IntersectionObserver(
        (entries) => {
          // Get all visible entries with their positions
          const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .map(entry => {
              const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
              const rect = entry.boundingClientRect;
              const viewportCenter = window.innerHeight / 2;
              const elementCenter = rect.top + rect.height / 2;
              const distanceFromCenter = Math.abs(elementCenter - viewportCenter);

              return {
                index,
                ratio: entry.intersectionRatio,
                distanceFromCenter,
                rect,
                instanceId: instanceId.current
              };
            })
            .filter(item => item.index !== -1);

          if (visibleEntries.length > 0) {
            // Find the entry closest to the center of the viewport
            const closestToCenter = visibleEntries.reduce((closest, current) => {
              return current.distanceFromCenter < closest.distanceFromCenter ? current : closest;
            });

            // Only update if it's a different step and belongs to this instance
            if (closestToCenter.index !== activeStepIndex && closestToCenter.instanceId === instanceId.current) {
              setActiveStepIndex(closestToCenter.index);
            }
          }
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // Simplified thresholds
          rootMargin: '0px 0px 0px 0px' // No margins - use full viewport
        }
      );

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        stepRefs.current.forEach((ref) => {
          if (ref) {
            // Add instance identifier to the element
            ref.setAttribute('data-instance', instanceId.current);
            observer.observe(ref);
          }
        });
      }, 100);

      return () => {
        observer.disconnect();
        setActiveStepIndex(-1);
      };
    }, [shouldUseWalkthrough, title, activeStepIndex]); // Include activeStepIndex dependency

    useEffect(() => {
      if (activeStepIndex >= 0 && activeStepIndex < allItems.length) {
        const highlight = allItems[activeStepIndex].highlightArea;
        setActiveHighlight(highlight || null);
      }
    }, [activeStepIndex, allItems]); // Include allItems dependency

    // Helper functions for colors
    const getBorderColor = (color: string) => {
      const colors: Record<string, string> = {
        blue: '#3B82F6',
        purple: '#8B5CF6',
        green: '#10B981',
        red: '#EF4444',
        cyan: '#06B6D4',
        orange: '#F97316',
        indigo: '#6366F1'
      };
      return colors[color] || '#6B7280';
    };

    const getBackgroundColor = (color: string) => {
      const colors: Record<string, string> = {
        blue: 'rgba(59, 130, 246, 0.1)',
        purple: 'rgba(139, 92, 246, 0.1)',
        green: 'rgba(16, 185, 129, 0.1)',
        red: 'rgba(239, 68, 68, 0.1)',
        cyan: 'rgba(6, 182, 212, 0.1)',
        orange: 'rgba(249, 115, 22, 0.1)',
        indigo: 'rgba(99, 102, 241, 0.1)'
      };
      return colors[color] || 'rgba(107, 114, 128, 0.1)';
    };

    const getShadowColor = (color: string) => {
      const colors: Record<string, string> = {
        blue: '0 0 20px rgba(59, 130, 246, 0.5)',
        purple: '0 0 20px rgba(139, 92, 246, 0.5)',
        green: '0 0 20px rgba(16, 185, 129, 0.5)',
        red: '0 0 20px rgba(239, 68, 68, 0.5)',
        cyan: '0 0 20px rgba(6, 182, 212, 0.5)',
        orange: '0 0 20px rgba(249, 115, 22, 0.5)',
        indigo: '0 0 20px rgba(99, 102, 241, 0.5)'
      };
      return colors[color] || '0 0 20px rgba(107, 114, 128, 0.5)';
    };

    const getColorClass = (color: string) => {
      const colorMap: Record<string, string> = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        green: 'text-green-400',
        red: 'text-red-400',
        cyan: 'text-cyan-400',
        orange: 'text-orange-400',
        indigo: 'text-indigo-400'
      };
      return colorMap[color] || 'text-gray-400';
    };

    // Render walkthrough step with proper typing
    const renderWalkthroughStep = (item: typeof allItems[0], index: number) => {
      const isActiveStep = index === activeStepIndex;
      const stepNumber = index + 1;

      // Get appropriate values based on item type
      let displayLabel = '';
      let displayValue = '';
      let displayDescription = '';

      if (item.type === 'metric') {
        displayLabel = item.label;
        displayValue = item.value;
        displayDescription = item.description || '';
      } else if (item.type === 'progress') {
        displayLabel = item.label;
        displayValue = `${item.value}%`;
        displayDescription = ''; // Progress bars don't have descriptions
      } else if (item.type === 'source') {
        displayLabel = item.name;
        displayValue = `${item.credibility}/10`;
        displayDescription = item.description;
      }

      return (
        <div
          ref={el => { stepRefs.current[index] = el; }}
          className={`flex items-center py-8 transition-all duration-300 ${isActiveStep ? 'opacity-100' : 'opacity-60'}`}
          style={{ minHeight: '150px' }} // Reduced height for more responsive detection
        >
          <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 w-full ${isActiveStep ? `border-${color}-500/50 shadow-lg` : 'border-white/10'
            }`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isActiveStep ? `bg-${color}-500 text-white` : 'bg-gray-600 text-gray-300'
                }`}>
                {stepNumber}
              </div>
              <div className="flex-1">
                <h4 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${isActiveStep ? getColorClass(color) : 'text-gray-300'
                  }`}>
                  {displayLabel}
                </h4>
                {displayDescription && (
                  <p className={`text-sm mb-1 transition-colors duration-300 ${isActiveStep ? 'text-white' : 'text-gray-400'
                    }`}>
                    {displayDescription}
                  </p>
                )}
                <div className={`text-sm font-medium transition-colors duration-300 ${isActiveStep ? `text-${color}-300` : 'text-gray-500'
                  }`}>
                  {displayValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    if (shouldUseWalkthrough) {
      // Calculate transform values for centering the highlight
      let imageTransform = 'scale(1)';
      let highlightStyle = {};

      if (activeHighlight && screenshotDimensions.width && screenshotDimensions.height) {
        // Calculate the center of the highlight area
        const highlightCenterX = activeHighlight.xPercent + activeHighlight.widthPercent / 2;
        const highlightCenterY = activeHighlight.yPercent + activeHighlight.heightPercent / 2;

        // Scale factor - reduced for less enlargement
        const scale = 1.4;

        // Calculate how much to translate the image so the highlight center becomes viewport center
        const translateX = (50 - highlightCenterX);
        const translateY = (50 - highlightCenterY);

        imageTransform = `scale(${scale}) translate(${translateX}%, ${translateY}%)`;

        // Calculate highlight position relative to the image bounds
        // Get actual image dimensions and position
        const imageRect = screenshotRef.current?.getBoundingClientRect();
        const containerRect = screenshotWrapperRef.current?.getBoundingClientRect();

        if (imageRect && containerRect) {
          // Calculate the highlight position within the scaled image bounds
          const scaledImageWidth = imageRect.width * scale;
          const scaledImageHeight = imageRect.height * scale;

          // Ensure highlight stays within image bounds
          const highlightWidth = Math.min(
            (activeHighlight.widthPercent / 100) * scaledImageWidth,
            containerRect.width * 0.8 // Max 80% of container width
          );
          const highlightHeight = Math.min(
            (activeHighlight.heightPercent / 100) * scaledImageHeight,
            containerRect.height * 0.8 // Max 80% of container height
          );

          highlightStyle = {
            position: 'absolute' as const,
            left: '50%',
            top: '50%',
            width: `${highlightWidth}px`,
            height: `${highlightHeight}px`,
            transform: 'translate(-50%, -50%)',
            border: '2px solid',
            borderColor: getBorderColor(color),
            backgroundColor: getBackgroundColor(color),
            borderRadius: '6px',
            boxShadow: getShadowColor(color),
            zIndex: 30,
            pointerEvents: 'none' as const,
          };
        }
      }

      return (
        <div
          ref={ref || sectionRef}
          className={`relative h-full ${isActive ? 'fade-in-section' : 'fade-out-black'} ${className}`}
        >
          {/* Full-screen Layout */}
          <div className="flex min-h-full">
            {/* Screenshot Side - Sticky */}
            <div className={`${isImageLeft ? 'order-1' : 'order-2'} w-1/2`}>
              <div className="sticky top-0 w-full h-screen z-10 bg-black/90 backdrop-blur-sm">
                <div className="relative w-full h-full overflow-hidden">
                  {/* Image with transform */}
                  <div
                    ref={screenshotWrapperRef}
                    className="w-full h-full transition-transform duration-700 ease-in-out"
                    style={{
                      transform: imageTransform,
                      transformOrigin: 'center center',
                    }}
                  >
                    <Image
                      ref={screenshotRef}
                      src={walkthrough?.screenshotUrl || '/dzdx_nobg.png'}
                      alt={`${title} Interface`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Centered highlight box */}
                  {activeHighlight && (
                    <div
                      className="transition-all duration-300"
                      style={highlightStyle}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Content Side - Scrollable */}
            <div className={`${isImageLeft ? 'order-2' : 'order-1'} w-1/2 relative`}>
              {/* Sticky Header */}
              <div
                className={`sticky top-0 w-full bg-black/90 backdrop-blur-sm border-b border-white/10 p-8 z-20`}
              >
                <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${getColorClass(color)}`}>
                  🔸 {title}
                </h3>
                {subtitle && (
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                    {subtitle}
                  </p>
                )}
                {walkthrough && (
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold text-white mb-2">{walkthrough.title}</h4>
                    <p className="text-gray-300">{walkthrough.description}</p>
                  </div>
                )}
              </div>

              {/* Scrollable Steps (under sticky title) */}
              <div className="relative pt-12 pb-12">
                {/* Reduced top spacing for more immediate detection */}
                <div className="h-16"></div>
                {allItems.map((item, index) => (
                  <div key={`step-${item.type}-${index}`} className="px-8">
                    {renderWalkthroughStep(item, index)}
                  </div>
                ))}
                {/* Reduced bottom spacing */}
                <div className="h-32"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Fallback to original layout if walkthrough is disabled
    return (
      <div
        ref={ref || sectionRef}
        className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${className}`}
      >
        {/* Image Component */}
        <div className={`relative ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="w-full h-full">
            {imageComponent}
          </div>
        </div>

        {/* Content Component */}
        <div className={`space-y-8 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div>
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${getColorClass(color)}`}>
              🔸 {title}
            </h3>
            {subtitle && (
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="space-y-4">
              {contentComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AnalysisSection.displayName = 'AnalysisSection';

export default AnalysisSection;