import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'Download The Real Feed - India\'s #1 AI News Analysis App | Now Available on iOS & Android',
  description:
    'Download The Real Feed v1.0.0 - India\'s smartest AI-powered news app. Detect bias, analyze sentiment, get real-time news intelligence, and join community discussions. Now available on iOS and Android.',
  keywords: [
    // Primary keywords
    'AI news app India', 'news analysis app', 'download news app',
    // Long-tail keywords  
    'detect fake news app India', 'AI powered news reader', 'news bias detection app', 'sentiment analysis news app',
    // Location-based
    'Indian news app', 'news app India download', 'AI news analysis India',
    // App-specific
    'The Real Feed app', 'DZDX news app', 'real-time news intelligence app', 'news comment section app'
  ].join(', '),
  authors: [{ name: 'DZDX Solutions Pvt Ltd' }],
  creator: 'DZDX Solutions Pvt Ltd',
  publisher: 'DZDX Solutions Pvt Ltd',
  robots: 'index, follow',
  // Remove viewport from here - moved to separate export below
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-itunes-app': 'app-id=6749306200',
    'application-name': 'The Real Feed',
    'apple-mobile-web-app-title': 'The Real Feed',
    'google-play-app': 'app-id=com.dzdx.therealfeed',
    'geo.region': 'IN',
    'geo.country': 'IN',
  },
  openGraph: {
    title: 'Download The Real Feed - India\'s AI News Analysis App',
    description:
      'Experience India\'s most advanced AI news app. Detect bias, analyze sentiment, and engage with real-time news intelligence. Now available on iOS and Android.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://dzdx.in/the-real-feed',
    siteName: 'The Real Feed by DZDX',
    images: [
      {
        url: '/trf/android-chrome-512x512.png',
        width: 1200,
        height: 630,
        alt: 'The Real Feed - AI News Analysis App Download',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download The Real Feed - India\'s AI News Analysis App',
    description:
      'Get India\'s smartest news app with AI-powered bias detection, sentiment analysis, and community discussions. Now available on iOS and Android.',
    images: ['/trf/android-chrome-512x512.png'],
    creator: '@dzdx_in',
    site: '@dzdx_in',
  },
  icons: {
    icon: [
      { url: '/trf/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/trf/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/trf/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/trf/apple-touch-icon.png',
    shortcut: '/trf/favicon.ico',
  },
  alternates: {
    canonical: 'https://dzdx.in/the-real-feed',
  }
};

// Separate viewport export (required in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#1a1a2e',
};

export default function TRFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Schema.org: Mobile Application */}
      <Script
        id="schema-mobile-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            "name": "The Real Feed",
            "alternateName": "TRF",
            "description": "India's smartest AI-powered news analysis app with bias detection, sentiment analysis, and real-time intelligence.",
            "applicationCategory": "NewsApplication",
            "operatingSystem": ["Android", "iOS"],
            "url": "https://dzdx.in/the-real-feed",
            "downloadUrl": "https://dzdx.in/the-real-feed",
            "version": "1.0.0",
            "datePublished": "2025-08-15",
            "author": {
              "@type": "Organization",
              "name": "DZDX Solutions Pvt Ltd",
              "url": "https://dzdx.in"
            },
            "publisher": {
              "@type": "Organization",
              "name": "DZDX Solutions Pvt Ltd",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cdn.dzdx.in/the-real-feed512x512.png"
              }
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1000",
              "bestRating": "5",
              "worstRating": "1"
            },
            "featureList": [
              "AI-powered bias detection",
              "Real-time sentiment analysis",
              "News intelligence insights",
              "Community discussion platform",
              "Personalized news feed",
              "Offline reading support"
            ],
            "screenshot": [
              "https://cdn.dzdx.in/the-real-feed-screenshot-1.png",
              "https://cdn.dzdx.in/the-real-feed-screenshot-2.png"
            ],
            "softwareRequirements": "Android 6.0+ or iOS 12.0+",
            "fileSize": "25MB",
            "inLanguage": ["en-IN", "hi-IN"],
            "countriesSupported": ["IN"],
            "softwareAddOn": {
              "@type": "SoftwareApplication",
              "name": "Comment System",
              "description": "Community-driven discussion platform within the app"
            }
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "When will The Real Feed app be available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Real Feed is now available on both Android and iOS platforms."
                }
              },
              {
                "@type": "Question",
                "name": "What makes The Real Feed different from other news apps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Real Feed uses advanced AI to detect bias, analyze sentiment, and provide real-time news intelligence, along with a community discussion platform."
                }
              }
            ]
          }),
        }}
      />

      {/* HowTo Schema */}
      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to use The Real Feed AI News Analysis",
            "description": "Learn how to get the most out of The Real Feed's AI-powered news analysis features",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Download and Install",
                "text": "Download The Real Feed from Google Play or App Store"
              },
              {
                "@type": "HowToStep",
                "name": "Explore News Feed",
                "text": "Browse AI-analyzed news with bias and sentiment indicators"
              },
              {
                "@type": "HowToStep",
                "name": "Join Discussions",
                "text": "Share your views in the community comment section"
              }
            ]
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "DZDX Solutions",
                "item": "https://dzdx.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "The Real Feed",
                "item": "https://dzdx.in/the-real-feed"
              }
            ]
          }),
        }}
      />

      {/* Meta Pixel Code */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '802246002129134');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent', {
              content_name: 'The Real Feed App Page',
              content_category: 'Mobile App',
              content_ids: ['trf-app'],
              content_type: 'product'
            });
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=802246002129134&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* Metricool Tracker */}
      <Script
        id="metricool-tracker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function loadScript(a){
              var b=document.getElementsByTagName("head")[0],
                  c=document.createElement("script");
              c.type="text/javascript";
              c.src="https://tracker.metricool.com/resources/be.js";
              c.onreadystatechange=a;
              c.onload=a;
              b.appendChild(c);
            }
            loadScript(function(){
              beTracker.t({hash:"34148d143b013aecb31d0e7c9e4bb271"});
            });
          `,
        }}
      />
      {children}
    </>
  );
}
