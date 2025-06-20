import { NextRequest } from 'next/server';
import { compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';

interface AuthResult {
  authenticated: boolean;
  userId?: string;
  message?: string;
}

// Environment variables should be set in .env.local
// ADMIN_USERNAME=admin@dzdx.com
// ADMIN_PASSWORD_HASH=<bcrypt hash of your password>
// JWT_SECRET=<your-secret-key>

export async function isAuthenticated(req: NextRequest): Promise<AuthResult> {
  // Check for auth header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, message: 'No token provided' };
  }

  // Extract token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return { authenticated: false, message: 'Invalid token format' };
  }

  try {
    // Verify JWT token
    const decoded = verify(token, process.env.JWT_SECRET || 'default-secret-change-this') as { userId: string };
    
    return { 
      authenticated: true,
      userId: decoded.userId
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return { authenticated: false, message: 'Invalid token' };
  }
}

export async function authenticateUser(email: string, password: string): Promise<{ token?: string; success: boolean; message: string }> {
  // Check if credentials match admin credentials
  const adminEmail = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  
  if (!adminEmail || !adminPasswordHash) {
    console.error('Admin credentials not configured');
    return { 
      success: false, 
      message: 'Authentication failed: System not properly configured'
    };
  }

  if (email !== adminEmail) {
    return { 
      success: false, 
      message: 'Invalid credentials'
    };
  }

  try {
    // Compare password with stored hash
    console.log('Comparing password:', password, 'with hash:', adminPasswordHash);
    const passwordMatch = await compare(password, adminPasswordHash);
    
    if (!passwordMatch) {
      return { 
        success: false, 
        message: 'Invalid credentials'
      };
    }

    // Generate JWT token
    const token = generateToken(adminEmail);
    
    return { 
      token,
      success: true, 
      message: 'Authentication successful'
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { 
      success: false, 
      message: 'Authentication failed'
    };
  }
}

function generateToken(userId: string): string {
  // Using ES6 import style is not possible in this context because of
  // the dynamic nature of the import in a function. For middleware and
  // API routes, we need to use a conditional import or import at the top level.
  // This is a known limitation with Next.js and ESM modules.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const jwt = require('jsonwebtoken');
  
  // Create token with 24 hour expiration
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'default-secret-change-this',
    { expiresIn: '24h' }
  );
}