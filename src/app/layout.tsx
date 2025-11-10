import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

// Add metadataBase and fix image paths
export const metadata: Metadata = {
  metadataBase: new URL('https://dzdx.in'),
  title: 'DZDX Solutions - India\'s Premier AI Technology Company | Innovative Apps',
  description:
    'DZDX Solutions Pvt Ltd develops cutting-edge AI-powered applications including The Real Feed news analysis app. Leading Indian tech innovation from Kanpur.',
  keywords: [
    'DZDX Solutions', 'AI technology company India', 'Indian AI startup', 'tech company Kanpur',
    'AI applications', 'The Real Feed', 'news analysis technology', 'artificial intelligence India'
  ].join(', '),
  authors: [{ name: 'DZDX Solutions Pvt Ltd' }],
  creator: 'DZDX Solutions Pvt Ltd',
  publisher: 'DZDX Solutions Pvt Ltd',
  robots: 'index, follow',
  // Remove viewport from here - moved to separate export below
  openGraph: {
    title: 'DZDX Solutions - Leading AI Technology Company in India',
    description:
      'Discover innovative AI-powered applications by DZDX Solutions, including The Real Feed news analysis app. Indian tech innovation at its finest.',
    type: 'website',
    locale: 'en_IN',
    url: '/', // Will be resolved with metadataBase
    siteName: 'DZDX Solutions',
    images: [
      {
        url: '/dzdx/android-chrome-512x512.png', // Will be resolved with metadataBase
        width: 1200,
        height: 630,
        alt: 'DZDX Solutions - AI Technology Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DZDX Solutions - India\'s AI Technology Innovation Hub',
    description:
      'Building the future with AI-powered applications like The Real Feed. Indian tech company delivering cutting-edge solutions.',
    images: ['/dzdx/android-chrome-512x512.png'], // Will be resolved with metadataBase
  },
  icons: {
    icon: [
      { url: '/dzdx/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/dzdx/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/dzdx/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/dzdx/apple-touch-icon.png',
    shortcut: '/dzdx/favicon.ico',
  },
  alternates: {
    canonical: '/', // Will be resolved with metadataBase
  },
};

// Separate viewport export (required in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#0a0a0f',
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/dzdx/site.webmanifest" />

        {/* Schema.org: Company Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DZDX Solutions Pvt Ltd",
              "url": "https://dzdx.in",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dzdx.in/dzdx/android-chrome-512x512.png",
                "width": "512",
                "height": "512"
              },
              "sameAs": [
                "https://linkedin.com/company/dzdx-in",
                "https://instagram.com/dzdx.in/"
              ],
              "description": "DZDX Solutions is a leading Indian AI technology company developing innovative applications like The Real Feed news analysis app.",
              "foundingDate": "2025",
              "founders": [{ "@type": "Person", "name": "Rayan Singh Din" }],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressLocality": "Kanpur",
                "addressRegion": "Uttar Pradesh"
              },
              "knowsAbout": [
                "Artificial Intelligence",
                "News Analysis",
                "Mobile App Development",
                "Sentiment Analysis",
                "Bias Detection"
              ]
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
