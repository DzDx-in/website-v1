// src/app/api/routes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';
import { DynamicRoute } from '../route';

// Define the routes data file path
const dataFilePath = path.join(process.cwd(), 'data', 'dynamic-routes.json');

// Helper function to read routes data
const getRoutesData = (): DynamicRoute[] => {
  try {
    if (!fs.existsSync(dataFilePath)) {
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

// Helper function to extract ID from the request URL
const getIdFromRequest = (request: NextRequest): string | null => {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1] || null;
};

// GET handler - Get a specific route by ID (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const routeId = getIdFromRequest(request);
    if (!routeId) return NextResponse.json({ error: 'Invalid route ID' }, { status: 400 });

    const routes = getRoutesData();
    const route = routes.find(r => r.id === routeId);

    if (!route) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    return NextResponse.json(route);
  } catch (error) {
    console.error('Error fetching route:', error);
    return NextResponse.json({ error: 'Failed to fetch route' }, { status: 500 });
  }
}

// PUT handler - Update a route (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const routeId = getIdFromRequest(request);
    if (!routeId) return NextResponse.json({ error: 'Invalid route ID' }, { status: 400 });

    const updateData = await request.json();
    const routes = getRoutesData();
    const routeIndex = routes.findIndex(r => r.id === routeId);

    if (routeIndex === -1) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    // Update the route
    const existingRoute = routes[routeIndex];
    const updatedRoute: DynamicRoute = {
      ...existingRoute,
      ...updateData,
      id: existingRoute.id, // Don't allow ID changes
      uuid: existingRoute.uuid, // Don't allow UUID changes
      clicks: existingRoute.clicks, // Don't allow manual clicks changes
      createdAt: existingRoute.createdAt, // Don't allow creation date changes
      updatedAt: new Date().toISOString(),
    };

    routes[routeIndex] = updatedRoute;
    writeRoutesData(routes);

    return NextResponse.json(updatedRoute);
  } catch (error) {
    console.error('Error updating route:', error);
    return NextResponse.json({ error: 'Failed to update route' }, { status: 500 });
  }
}

// DELETE handler - Delete a route (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const routeId = getIdFromRequest(request);
    if (!routeId) return NextResponse.json({ error: 'Invalid route ID' }, { status: 400 });

    const routes = getRoutesData();
    const routeIndex = routes.findIndex(r => r.id === routeId);

    if (routeIndex === -1) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    // Remove the route
    routes.splice(routeIndex, 1);
    writeRoutesData(routes);

    return NextResponse.json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error('Error deleting route:', error);
    return NextResponse.json({ error: 'Failed to delete route' }, { status: 500 });
  }
}