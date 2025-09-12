// src/app/[uuid]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';

interface RouteData {
  uuid: string;
  buttonLink: string;
  buttonText: string;
}

export default function DynamicRoutePage() {
  const params = useParams();
  const uuid = params?.uuid as string;
  
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!uuid) {
      setError('Invalid URL');
      setLoading(false);
      return;
    }

    const fetchRouteData = async () => {
      try {
        const response = await fetch(`/api/public/routes/${uuid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('Page not found');
          } else {
            setError('Failed to load page');
          }
          return;
        }

        const data = await response.json();
        setRouteData(data);
      } catch (err) {
        console.error('Error fetching route data:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchRouteData();
  }, [uuid]);

  const handleButtonClick = async () => {
    if (!routeData || isClicked) return;

    setIsClicked(true);

    // Track the click
    try {
      await fetch(`/api/public/routes/${uuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error('Error tracking click:', err);
      // Don't prevent navigation even if tracking fails
    }

    // Small delay to ensure tracking is sent, then redirect
    setTimeout(() => {
      window.open(routeData.buttonLink, '_blank');
    }, 100);
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <EarthBackground />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative z-20">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <EarthBackground />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative z-20 text-center">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Oops!</h1>
            <p className="text-white/80 mb-6">{error}</p>
            <Link 
              href="/" 
              className="inline-block bg-dzdx-blue hover:bg-dzdx-light-blue text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <EarthBackground />
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="relative z-20 text-center max-w-lg mx-auto px-4">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <Image
                src="https://cdn.dzdx.in/dzdx_nobg.png"
                alt="DZDX Solutions"
                width={80}
                height={80}
                className="mx-auto hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Welcome Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Welcome to DZDX Solutions
          </h1>
          <p className="text-white/70 mb-8">
            Click the button below to join our WhatsApp group and stay connected with us.
          </p>

          {/* WhatsApp Button */}
          <button
            onClick={handleButtonClick}
            disabled={isClicked}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-lg
              flex items-center justify-center gap-3
              transition-all duration-300
              ${isClicked 
                ? 'bg-green-600 text-white cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
              }
            `}
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            {isClicked ? 'Redirecting...' : routeData?.buttonText || 'Join WhatsApp Group'}
          </button>

          {/* Additional Info */}
          <p className="text-white/50 text-sm mt-6">
            By clicking above, you&apos;ll be redirected to WhatsApp to join our group.
          </p>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link 
              href="/" 
              className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors text-sm"
            >
              Visit our main website
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid #4682b4;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}