import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs for all routes
export function middleware(request: NextRequest) {
  // Just passing through - we're using this to ensure environment variables are loaded
  return NextResponse.next();
}

// Configure the matcher to run for all API routes
export const config = {
  matcher: '/api/:path*',
};