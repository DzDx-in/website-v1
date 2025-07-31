import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'The Real Feed – India’s Smartest AI-Powered News App | DZDX Solutions',
  description:
    'Experience The Real Feed, India’s leading AI-powered news analysis app by DZDX Solutions Pvt Ltd, uncovering bias, sentiment, and emotional tone in headlines and articles.',
  keywords: [
    'The Real Feed', 'DZDX Solutions', 'AI news app', 'news analysis', 'bias detection',
    'sentiment analysis', 'Indian news app', 'real-time news intelligence'
  ].join(', '),
  authors: [{ name: 'DZDX Solutions Pvt Ltd' }],
  creator: 'DZDX Solutions Pvt Ltd',
  publisher: 'DZDX Solutions Pvt Ltd',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    title: 'The Real Feed – AI-Powered News Analysis App by DZDX',
    description:
      'The Real Feed analyzes Indian news to detect bias, sentiment, and emotional tone with AI — by DZDX Solutions.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://dzdx.in/trf',
    siteName: 'The Real Feed by DZDX',
    images: [
      {
        url: 'https://cdn.dzdx.in/TRF512x512.png',
        width: 1200,
        height: 630,
        alt: 'The Real Feed – AI News Analysis App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Real Feed – India’s AI News Analysis App by DZDX',
    description:
      'Explore The Real Feed, an AI-driven app that uncovers bias, tone, and sentiment in news headlines and articles. Created by DZDX Solutions.',
    images: ['https://cdn.dzdx.in/TRF512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: 'https://cdn.dzdx.in/TRF512x512.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* GEO Meta */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Kanpur" />
        <meta name="geo.position" content="26.4499;80.3319" />
        <meta name="ICBM" content="26.4499, 80.3319" />

        {/* PWA & App Meta */}
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://dzdx.in" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Schema.org: DZDX + The Real Feed */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DZDX Solutions Pvt Ltd",
              "url": "https://dzdx.in",
              "logo": "https://cdn.dzdx.in/TRF512x512.png",
              "sameAs": [
                "https://linkedin.com/company/dzdx-in",
                "https://instagram.com/dzdx.in/"
              ],
              "description": "DZDX is an Indian tech company building AI-powered products like The Real Feed, an app that analyzes Indian news for bias, sentiment, and more.",
              "foundingDate": "2025",
              "founders": [{ "@type": "Person", "name": "Rayan Singh Din" }],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressLocality": "Kanpur",
                "addressRegion": "Uttar Pradesh"
              },
              "subOrganization": {
                "@type": "SoftwareApplication",
                "name": "The Real Feed",
                "url": "https://dzdx.in/trf",
                "applicationCategory": "NewsApplication",
                "operatingSystem": "Android, iOS, Web",
                "description": "The Real Feed is India's smartest AI-powered news analysis app, detecting bias, sentiment, and emotion in real time.",
                "offers": {
                  "@type": "Offer",
                  "price": "0.00",
                  "priceCurrency": "INR"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "150+"
                }
              }
            }),
          }}
        />

        {/* Meta Pixel Code */}
        <script
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
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=802246002129134&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Metricool Tracker */}
        <script
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
        
      </head>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
