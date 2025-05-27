import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Job } from '../route';
import { isAuthenticated } from '@/lib/auth';

// Define the job data file path
const dataFilePath = path.join(process.cwd(), 'data', 'jobs.json');

// Helper function to read jobs data
const getJobsData = (): Job[] => {
  try {
    if (!fs.existsSync(dataFilePath)) {
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
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing jobs data:', error);
  }
};

// GET handler - Get a specific job
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobs = getJobsData();
    const job = jobs.find(job => job.id === params.id);
    
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    // For public requests, only return active jobs
    const url = new URL(req.url);
    const isAdminRequest = url.searchParams.get('admin') === 'true';
    
    if (!isAdminRequest && !job.isActive) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

// PUT handler - Update a job (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const jobData = await req.json();
    const jobs = getJobsData();
    const jobIndex = jobs.findIndex(job => job.id === params.id);
    
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    // Update the job while preserving id and postedDate
    const updatedJob: Job = {
      ...jobs[jobIndex],
      ...jobData,
      id: params.id, // Ensure ID doesn't change
      postedDate: jobs[jobIndex].postedDate, // Preserve original posted date
    };
    
    jobs[jobIndex] = updatedJob;
    writeJobsData(jobs);
    
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

// DELETE handler - Delete a job (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const jobs = getJobsData();
    const jobIndex = jobs.findIndex(job => job.id === params.id);
    
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    // Option 1: Hard delete
    jobs.splice(jobIndex, 1);
    
    // Option 2: Soft delete (uncomment if preferred)
    // jobs[jobIndex].isActive = false;
    
    writeJobsData(jobs);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}