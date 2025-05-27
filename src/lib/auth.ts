import { NextRequest } from 'next/server';
import { compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import getConfig from 'next/config';

// Get serverRuntimeConfig
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };

interface AuthResult {
  authenticated: boolean;
  userId?: string;
  message?: string;
}

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
    const jwtSecret = serverRuntimeConfig.JWT_SECRET || process.env.JWT_SECRET || 'default-secret-change-this';
    const decoded = verify(token, jwtSecret) as { userId: string };
    
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
  const adminEmail = serverRuntimeConfig.ADMIN_USERNAME || process.env.ADMIN_USERNAME;
  const adminPasswordHash = serverRuntimeConfig.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD_HASH;
  
  // Debug log to see if env variables are being accessed
  console.log('Environment variables check:');
  console.log('ADMIN_USERNAME available:', !!adminEmail);
  console.log('ADMIN_USERNAME available:', adminEmail);
  console.log('ADMIN_PASSWORD_HASH available:', !!adminPasswordHash);
  console.log('ADMIN_PASSWORD_HASH available:', adminPasswordHash);
  
  if (!adminEmail || !adminPasswordHash) {
    console.error('Admin credentials not configured', { 
      adminEmailExists: !!adminEmail,
      adminPasswordHashExists: !!adminPasswordHash 
    });
    return { 
      success: false, 
      message: 'Authentication failed: System not properly configured'
    };
  }

  try {
    if (email !== adminEmail) {
      return { 
        success: false, 
        message: 'Invalid credentials'
      };
    }
    
    // Compare password with stored hash
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
  const jwt = require('jsonwebtoken');
  const jwtSecret = serverRuntimeConfig.JWT_SECRET || process.env.JWT_SECRET || 'default-secret-change-this';
  
  // Create token with 24 hour expiration
  return jwt.sign(
    { userId },
    jwtSecret,
    { expiresIn: '24h' }
  );
}