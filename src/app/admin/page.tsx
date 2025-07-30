'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EarthBackground from '@/components/EarthBackground';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      
      {/* Black overlay with 30% opacity */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-5">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <Image
              src="https://cdn.dzdx.in/favicon.svg"
              alt="DZDX Solutions Logo"
              width={150}
              height={150}
              priority
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-white mb-2 text-shadow-strong">
              Admin Portal
            </h1>
            <p className="text-dzdx-blue font-light text-shadow-default">
              Secure access for DZDX team members
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md">
                  <p>{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-white/90 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                  placeholder="admin@dzdx.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white/90 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 btn-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-white/60 text-sm">
              <p>Need access? Contact the IT department.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}