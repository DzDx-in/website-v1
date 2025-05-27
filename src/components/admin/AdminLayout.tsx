'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EarthBackground from '@/components/EarthBackground';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  currentPath: string;
}

const AdminLayout = ({ children, title, currentPath }: AdminLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = (): void => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  // Navigation items
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-th-large' },
    { path: '/admin/jobs', label: 'Job Listings', icon: 'fas fa-briefcase' },
    { path: '/admin/applications', label: 'Applications', icon: 'fas fa-users' },
    { path: '/admin/settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication check is complete
  }

  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      
      {/* Black overlay with 30% opacity */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="relative z-20 flex h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:flex-col md:w-64 bg-black/60 backdrop-blur-md">
          <div className="p-4 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center">
              <Image
                src="/new_main.svg"
                alt="DZDX Solutions Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <div>
                <span className="text-white font-semibold block">DZDX Solutions</span>
                <span className="text-white/60 text-xs">Admin Portal</span>
              </div>
            </Link>
          </div>
          
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-6 py-3 text-white hover:bg-white/10 transition-colors ${
                      currentPath === item.path || currentPath.startsWith(`${item.path}/`) 
                        ? 'bg-dzdx-blue/20 border-l-4 border-dzdx-blue' 
                        : ''
                    }`}
                  >
                    <i className={`${item.icon} w-5 text-center mr-3 ${
                      currentPath === item.path || currentPath.startsWith(`${item.path}/`)
                        ? 'text-dzdx-blue'
                        : 'text-white/70'
                    }`}></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-3 text-white/70"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Navbar */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-30">
          <div className="flex items-center justify-between p-4">
            <Link href="/admin/dashboard" className="flex items-center">
              <Image
                src="/new_main.svg"
                alt="DZDX Solutions Logo"
                width={30}
                height={30}
                className="mr-2"
              />
              <span className="text-white font-semibold">DZDX Admin</span>
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="bg-black/90 backdrop-blur-md">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`flex items-center px-6 py-4 text-white hover:bg-white/10 transition-colors ${
                        currentPath === item.path || currentPath.startsWith(`${item.path}/`)
                          ? 'bg-dzdx-blue/20 border-l-4 border-dzdx-blue' 
                          : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className={`${item.icon} w-5 text-center mr-3 ${
                        currentPath === item.path || currentPath.startsWith(`${item.path}/`)
                          ? 'text-dzdx-blue'
                          : 'text-white/70'
                      }`}></i>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-6 py-4 text-white hover:bg-white/10 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt w-5 text-center mr-3 text-white/70"></i>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto pt-4 pb-12 px-4 md:px-8 md:pt-8 md:pb-16 md:mt-0 mt-16">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{title}</h1>
            <nav className="text-sm text-white/60">
              <Link href="/admin/dashboard" className="hover:text-dzdx-blue transition-colors">
                Dashboard
              </Link>
              {currentPath !== '/admin/dashboard' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-white/80">{title}</span>
                </>
              )}
            </nav>
          </header>
          
          <main className="flex-1">{children}</main>
          
          <footer className="mt-12 text-center text-white/60 text-sm">
            &copy; 2025 DZDX Solutions Pvt Ltd. All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;