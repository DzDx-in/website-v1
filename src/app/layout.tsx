import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'DZDX Solutions Pvt Ltd - Compiling Innovation. Delivering Solutions.',
  description: 'DZDX Solutions is a technology company focused on innovative software solutions and cutting-edge development.',
  keywords: 'DZDX, technology, software solutions, innovation, development, consulting',
  authors: [{ name: 'DZDX Solutions Pvt Ltd' }],
  creator: 'DZDX Solutions Pvt Ltd',
  publisher: 'DZDX Solutions Pvt Ltd',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
  openGraph: {
    title: 'DZDX Solutions Pvt Ltd',
    description: 'Compiling Innovation. Delivering Solutions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DZDX Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DZDX Solutions Pvt Ltd',
    description: 'Compiling Innovation. Delivering Solutions.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
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
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
