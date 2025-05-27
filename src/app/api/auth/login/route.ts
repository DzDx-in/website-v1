import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Authenticate user
    const authResult = await authenticateUser(email, password);
    
    if (authResult.success && authResult.token) {
      return NextResponse.json({
        success: true,
        token: authResult.token,
        message: 'Authentication successful'
      });
    } else {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}