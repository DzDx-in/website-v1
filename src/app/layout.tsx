import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'DZDX Solutions Pvt Ltd – Creators of The Real Feed',
  description:
    'DZDX Solutions is an Indian tech company building cutting-edge software and AI products. We created The Real Feed – India’s smartest news analysis app.',
  keywords:
    'DZDX, DZDX Solutions, The Real Feed, TRF, Indian news app, AI news, bias detection, sentiment analysis, Indian tech company, Kanpur startup, generative AI, innovation, AI products, software solutions',
  authors: [{ name: 'DZDX Solutions Pvt Ltd' }],
  creator: 'DZDX Solutions Pvt Ltd',
  publisher: 'DZDX Solutions Pvt Ltd',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
  openGraph: {
    title: 'DZDX – Creators of The Real Feed (TRF)',
    description:
      'Meet The Real Feed – India’s most powerful AI news analysis app. Built by DZDX Solutions Pvt Ltd.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://dzdx.in',
    siteName: 'The Real Feed by DZDX',
    images: [
      {
        url: '/public/TRF512x512.png',
        width: 1200,
        height: 630,
        alt: 'The Real Feed – Powered by DZDX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Real Feed – India’s AI-Powered News App by DZDX',
    description:
      'The Real Feed analyzes news with AI – detect bias, sentiment, tone, and emotion. Created by DZDX Solutions Pvt Ltd.',
    images: ['/images/trf-twitter-card.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/icons/icon-192x192.png',
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
              "logo": "https://dzdx.in/logo.png",
              "sameAs": [
                "https://linkedin.com/company/dzdx",
                "https://instagram.com/therealfeedapp"
              ],
              "description": "DZDX is an Indian tech company building AI-powered products like The Real Feed, an app that analyzes Indian news for bias, sentiment, and more.",
              "foundingDate": "2021",
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
