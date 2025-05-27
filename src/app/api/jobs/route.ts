import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '@/lib/auth';

// Define the job data file path
const dataFilePath = path.join(process.cwd(), 'data', 'jobs.json');

// Define TypeScript interfaces
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  applicationDeadline?: string;
  isActive: boolean;
}

// Helper function to read jobs data
const getJobsData = (): Job[] => {
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
    console.error('Error reading jobs data:', error);
    return [];
  }
};

// Helper function to write jobs data
const writeJobsData = (data: Job[]): void => {
  try {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing jobs data:', error);
  }
};

// GET handler - Get all jobs (public endpoint)
export async function GET(req: NextRequest) {
  try {
    const jobs = getJobsData();
    
    // For public endpoint, only return active jobs
    const url = new URL(req.url);
    const isAdminRequest = url.searchParams.get('admin') === 'true';
    
    if (isAdminRequest) {
      // Check if the request is authenticated for admin view
      const authResult = await isAuthenticated(req);
      if (!authResult.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // Return all jobs for admin
      return NextResponse.json(jobs);
    } else {
      // Return only active jobs for public view
      const activeJobs = jobs.filter(job => job.isActive);
      return NextResponse.json(activeJobs);
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST handler - Create a new job (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jobData = await req.json();
    
    // Validate required fields
    const requiredFields = ['title', 'department', 'location', 'type', 'experience', 'description', 'responsibilities', 'requirements'];
    for (const field of requiredFields) {
      if (!jobData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    // Create a new job with generated ID and current date
    const newJob: Job = {
      ...jobData,
      id: uuidv4(),
      postedDate: new Date().toISOString(),
      isActive: true,
    };
    
    const jobs = getJobsData();
    jobs.push(newJob);
    writeJobsData(jobs);
    
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}