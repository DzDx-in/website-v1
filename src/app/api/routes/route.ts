// src/app/api/routes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '@/lib/auth';

// Define the routes data file path
const dataFilePath = path.join(process.cwd(), 'data', 'dynamic-routes.json');

// Define TypeScript interface
export interface DynamicRoute {
  id: string;
  uuid: string; // The UUID part of the URL (dzdx.in/<uuid>)
  buttonLink: string; // WhatsApp group link
  buttonText: string; // Name/text of the button
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  clicks: number; // Track how many times the link was clicked
  description?: string; // Optional description for admin reference
}

// Helper function to read routes data
const getRoutesData = (): DynamicRoute[] => {
  try {
    // Create directory if it doesn't exist
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Create file with empty array if it doesn't exist
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]));
      return [];
    }
    
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading routes data:', error);
    return [];
  }
};

// Helper function to write routes data
const writeRoutesData = (data: DynamicRoute[]): void => {
  try {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing routes data:', error);
  }
};

// GET handler - Get all routes (admin only)
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const routes = getRoutesData();
    
    // Sort by creation date, newest first
    return NextResponse.json(routes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
  }
}

// POST handler - Create a new route (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const routeData = await req.json();
    
    // Validate required fields
    const requiredFields = ['buttonLink', 'buttonText'];
    for (const field of requiredFields) {
      if (!routeData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const routes = getRoutesData();
    
    // Generate unique UUID and ensure it doesn't exist
    let uuid = uuidv4();
    while (routes.some(route => route.uuid === uuid)) {
      uuid = uuidv4();
    }
    
    // Create new route
    const newRoute: DynamicRoute = {
      id: uuidv4(),
      uuid: uuid,
      buttonLink: routeData.buttonLink,
      buttonText: routeData.buttonText,
      isActive: routeData.isActive !== undefined ? routeData.isActive : true,
      description: routeData.description || '',
      clicks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to routes array
    routes.push(newRoute);
    
    // Save to file
    writeRoutesData(routes);
    
    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error('Error creating route:', error);
    return NextResponse.json({ error: 'Failed to create route' }, { status: 500 });
  }
}

// DELETE handler - Delete a route (admin only)
export async function DELETE(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const routeId = url.searchParams.get('id');
    
    if (!routeId) {
      return NextResponse.json({ error: 'Route ID is required' }, { status: 400 });
    }

    const routes = getRoutesData();
    const routeIndex = routes.findIndex(route => route.id === routeId);
    
    if (routeIndex === -1) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    // Remove route
    routes.splice(routeIndex, 1);
    
    // Save to file
    writeRoutesData(routes);
    
    return NextResponse.json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error('Error deleting route:', error);
    return NextResponse.json({ error: 'Failed to delete route' }, { status: 500 });
  }
}