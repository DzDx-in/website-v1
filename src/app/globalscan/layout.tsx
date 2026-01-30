import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GlobalScan: Barcode & QR to PC | ALWAYS FREE - Android, Mac & Windows',
  description:
    'GlobalScan lets you instantly transfer QR codes and barcodes from your Android phone to Mac or Windows computer over WiFi. View history, manage scans, and export to Excel. ALWAYS FREE - No hidden charges, no subscriptions, forever free!',
  keywords: [
    'GlobalScan',
    'free barcode scanner',
    'free QR code scanner',
    'QR to PC free',
    'barcode to computer free',
    'Android to Mac free app',
    'Android to Windows free',
    'WiFi barcode transfer',
    'QR code transfer app free',
    'mobile to desktop scanner',
    'free inventory management app',
    'barcode Excel export free',
    'wireless barcode scanner free',
    'DZDX Solutions',
    'scan history management',
    'free QR scanner app',
    'no subscription barcode app'
  ].join(', '),
  authors: [{ name: 'DZDX Solutions Pvt Ltd' }],
  creator: 'DZDX Solutions Pvt Ltd',
  publisher: 'DZDX Solutions Pvt Ltd',
  robots: 'index, follow',
  openGraph: {
    title: 'GlobalScan: Barcode & QR to PC - ALWAYS FREE Forever',
    description:
      'Transfer QR codes and barcodes from Android to Mac/Windows over WiFi. ALWAYS FREE app with Excel export, scan history, and real-time sync. Zero cost forever!',
    type: 'website',
    locale: 'en_IN',
    url: '/globalscan',
    siteName: 'DZDX Solutions',
    images: [
      {
        url: '/dzdx/globalscan-og.png',
        width: 1200,
        height: 630,
        alt: 'GlobalScan - Barcode & QR to PC by DZDX Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlobalScan: Barcode & QR to PC | ALWAYS FREE',
    description:
      'Wirelessly transfer QR codes from Android to Mac/Windows. Excel export, scan history & real-time sync. ALWAYS FREE - Zero cost forever!',
    images: ['/dzdx/globalscan-og.png'],
  },
  alternates: {
    canonical: '/globalscan',
  },
};

export default function GlobalScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Schema.org: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "GlobalScan: Barcode & QR to PC - ALWAYS FREE",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Android, macOS, Windows",
            "description": "GlobalScan is ALWAYS FREE - a powerful app that enables seamless transfer of QR codes and barcodes from Android phones to Mac or Windows computers over WiFi. Features include scan history management, Excel export, and real-time synchronization. Zero cost forever, no hidden charges!",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2030-12-31"
            },
            "author": {
              "@type": "Organization",
              "name": "DZDX Solutions Pvt Ltd",
              "url": "https://dzdx.in"
            },
            "softwareVersion": "1.0",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "150"
            },
            "featureList": [
              "ALWAYS FREE - Zero cost forever",
              "Wireless QR code transfer via WiFi",
              "Cross-platform support (Android, Mac, Windows)",
              "Scan history management",
              "Excel spreadsheet export",
              "Real-time synchronization",
              "Secure local network connection",
              "No subscriptions, no in-app purchases, no hidden fees"
            ]
          }),
        }}
      />

      {/* Schema.org: HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Transfer QR Codes from Android to PC using GlobalScan (ALWAYS FREE)",
            "description": "Learn how to wirelessly transfer QR codes and barcodes from your Android phone to Mac or Windows computer using GlobalScan - ALWAYS FREE, zero cost forever!",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Download ALWAYS FREE Apps",
                "text": "Download GlobalScan on your Android phone and Mac/Windows computer - ALWAYS FREE, zero cost forever"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Connect via WiFi",
                "text": "Both devices connect automatically when on the same WiFi network"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Scan & Transfer",
                "text": "Scan any QR code or barcode and watch it appear on your computer instantly"
              }
            ],
            "totalTime": "PT2M"
          }),
        }}
      />

      {/* Schema.org: FAQPage for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does GlobalScan transfer QR codes from phone to computer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GlobalScan uses your local WiFi network to wirelessly transfer scanned QR codes and barcodes from your Android phone to your Mac or Windows computer in real-time. No internet connection is required - data stays on your local network for maximum security."
                }
              },
              {
                "@type": "Question",
                "name": "Is GlobalScan ALWAYS FREE?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! GlobalScan is ALWAYS FREE - zero cost forever! There are absolutely NO hidden charges, NO subscriptions, NO in-app purchases, and NO premium tiers. The Android app and desktop companion apps for both Mac and Windows are completely FREE and will remain FREE forever. We believe great software should be accessible to everyone."
                }
              },
              {
                "@type": "Question",
                "name": "Can I export scanned barcodes to Excel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, GlobalScan includes built-in Excel export functionality. You can export all your scanned QR codes and barcodes to Excel spreadsheets directly from the desktop application, making it perfect for inventory management and data tracking."
                }
              },
              {
                "@type": "Question",
                "name": "What platforms does GlobalScan support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GlobalScan supports Android phones (version 8.0+) as the scanner device, and both Mac (macOS 11.0+) and Windows (Windows 10/11) computers as receiving devices. Download the .dmg file for Mac or .exe file for Windows."
                }
              },
              {
                "@type": "Question",
                "name": "Is my data secure with GlobalScan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, GlobalScan keeps your data completely secure. All data transfer happens over your local WiFi network - no cloud storage, no external servers. Your scanned data never leaves your local network."
                }
              }
            ]
          }),
        }}
      />

      {children}
    </>
  );
}
