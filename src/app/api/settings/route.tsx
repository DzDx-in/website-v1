import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';

// Define the settings file path
const dataFilePath = path.join(process.cwd(), 'data', 'settings.json');

// Define TypeScript interface for settings
export interface SiteSettings {
  email: {
    notificationEmail: string;
    ccEmail: string;
    enableAutoResponder: boolean;
  };
  careerPage: {
    title: string;
    description: string;
  };
  system: {
    version: string;
    environment: string;
  };
}

// Default settings
const defaultSettings: SiteSettings = {
  email: {
    notificationEmail: 'adm.dzdx@gmail.com',
    ccEmail: '',
    enableAutoResponder: true
  },
  careerPage: {
    title: 'Join Our Team',
    description: 'Explore opportunities to be part of something extraordinary at DZDX Solutions'
  },
  system: {
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  }
};

// Helper function to read settings
const getSettings = (): SiteSettings => {
  try {
    // Create directory if it doesn't exist
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Create file with default settings if it doesn't exist
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultSettings, null, 2));
      return defaultSettings;
    }
    
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings:', error);
    return defaultSettings;
  }
};

// Helper function to write settings
const writeSettings = (data: SiteSettings): void => {
  try {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing settings:', error);
  }
};

// GET handler - Get settings
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const settings = getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT handler - Update settings
export async function PUT(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const updatedSettings = await req.json();
    const currentSettings = getSettings();
    
    // Merge updated settings with current settings
    const newSettings: SiteSettings = {
      ...currentSettings,
      ...updatedSettings,
      // Preserve system settings that shouldn't be changed by the user
      system: {
        ...currentSettings.system,
        // Only allow updating specific system fields
        ...(updatedSettings.system ? {
          environment: currentSettings.system.environment // Don't allow changing environment
        } : {})
      }
    };
    
    writeSettings(newSettings);
    
    return NextResponse.json(newSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}