// src/app/[uuid]/layout.tsx
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // You could fetch route data here to customize metadata if needed
  return {
    title: 'Join Our Community - DZDX Solutions',
    description: 'Join our WhatsApp group to stay connected with DZDX Solutions and get the latest updates.',
    openGraph: {
      title: 'Join Our Community - DZDX Solutions',
      description: 'Join our WhatsApp group to stay connected with DZDX Solutions and get the latest updates.',
      images: ['/dzdx/android-chrome-512x512.png'],
    },
    robots: {
      index: false, // Don't index these dynamic routes
      follow: false,
    },
  };
}

export default function DynamicRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}