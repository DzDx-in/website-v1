import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '@/lib/auth';
import { sendApplicationEmail } from '@/lib/email';

// Define the application data file path
const dataFilePath = path.join(process.cwd(), 'data', 'applications.json');

// Define TypeScript interfaces
export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  resumeLink: string;
  coverLetter: string;
  portfolio?: string;
  submittedAt: string;
  status: 'new' | 'reviewing' | 'interviewed' | 'rejected' | 'hired';
  notes?: string;
}

// Helper function to read applications data
const getApplicationsData = (): JobApplication[] => {
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
    console.error('Error reading applications data:', error);
    return [];
  }
};

// Helper function to write applications data
const writeApplicationsData = (data: JobApplication[]): void => {
  try {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing applications data:', error);
  }
};

// GET handler - Get all applications (admin only)
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const applications = getApplicationsData();
    
    // Filter by jobId if provided
    const url = new URL(req.url);
    const jobId = url.searchParams.get('jobId');
    
    if (jobId) {
      const filteredApplications = applications.filter(app => app.jobId === jobId);
      return NextResponse.json(filteredApplications);
    }
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// POST handler - Submit a new application (public endpoint)
export async function POST(req: NextRequest) {
  try {
    const applicationData = await req.json();
    
    // Validate required fields
    const requiredFields = ['jobId', 'jobTitle', 'fullName', 'email', 'phone', 'resumeLink', 'coverLetter'];
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    // Create a new application with generated ID and current date
    const newApplication: JobApplication = {
      ...applicationData,
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      status: 'new',
    };
    
    const applications = getApplicationsData();
    applications.push(newApplication);
    writeApplicationsData(applications);
    
    // Send email notification
    try {
      await sendApplicationEmail(newApplication);
    } catch (emailError) {
      console.error('Error sending application email:', emailError);
      // Continue with the process even if email fails
    }
    
    return NextResponse.json({ success: true, applicationId: newApplication.id }, { status: 201 });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}