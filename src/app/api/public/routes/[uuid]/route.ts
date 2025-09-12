// src/app/api/public/routes/[uuid]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the routes data file path
const dataFilePath = path.join(process.cwd(), 'data', 'dynamic-routes.json');

// Define TypeScript interface
export interface DynamicRoute {
  id: string;
  uuid: string;
  buttonLink: string;
  buttonText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  clicks: number;
  description?: string;
}

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

// Helper function to extract UUID from the request URL
const getUuidFromRequest = (request: NextRequest): string | null => {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1] || null;
};

// GET handler - Get route by UUID (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const uuid = getUuidFromRequest(request);
    if (!uuid) {
      return NextResponse.json({ error: 'Invalid UUID' }, { status: 400 });
    }

    const routes = getRoutesData();
    const route = routes.find(r => r.uuid === uuid && r.isActive);

    if (!route) {
      return NextResponse.json({ error: 'Route not found or inactive' }, { status: 404 });
    }

    // Return only necessary public data
    return NextResponse.json({
      uuid: route.uuid,
      buttonLink: route.buttonLink,
      buttonText: route.buttonText,
    });
  } catch (error) {
    console.error('Error fetching public route:', error);
    return NextResponse.json({ error: 'Failed to fetch route' }, { status: 500 });
  }
}

// POST handler - Track click (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const uuid = getUuidFromRequest(request);
    if (!uuid) {
      return NextResponse.json({ error: 'Invalid UUID' }, { status: 400 });
    }

    const routes = getRoutesData();
    const routeIndex = routes.findIndex(r => r.uuid === uuid && r.isActive);

    if (routeIndex === -1) {
      return NextResponse.json({ error: 'Route not found or inactive' }, { status: 404 });
    }

    // Increment click count
    routes[routeIndex].clicks += 1;
    writeRoutesData(routes);

    return NextResponse.json({ success: true, clicks: routes[routeIndex].clicks });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 });
  }
}