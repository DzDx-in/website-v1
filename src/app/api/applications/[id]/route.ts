import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { JobApplication } from '../route';
import { isAuthenticated } from '@/lib/auth';
import { sendStatusUpdateEmail } from '@/lib/email';

// Define the application data file path
const dataFilePath = path.join(process.cwd(), 'data', 'applications.json');

// Helper function to read applications data
const getApplicationsData = (): JobApplication[] => {
  try {
    if (!fs.existsSync(dataFilePath)) {
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
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing applications data:', error);
  }
};

// GET handler - Get a specific application (admin only)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const applications = getApplicationsData();
    const application = applications.find(app => app.id === params.id);
    
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}

// PUT handler - Update application status (admin only)
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
    
    const updateData = await req.json();
    const applications = getApplicationsData();
    const applicationIndex = applications.findIndex(app => app.id === params.id);
    
    if (applicationIndex === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    
    const previousStatus = applications[applicationIndex].status;
    
    // Update the application
    const updatedApplication: JobApplication = {
      ...applications[applicationIndex],
      ...updateData,
      id: params.id, // Ensure ID doesn't change
      submittedAt: applications[applicationIndex].submittedAt, // Preserve original submission date
    };
    
    applications[applicationIndex] = updatedApplication;
    writeApplicationsData(applications);
    
    // Send email notification if status has changed
    if (previousStatus !== updatedApplication.status) {
      try {
        await sendStatusUpdateEmail(updatedApplication);
      } catch (emailError) {
        console.error('Error sending status update email:', emailError);
        // Continue with the process even if email fails
      }
    }
    
    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

// DELETE handler - Delete an application (admin only)
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
    
    const applications = getApplicationsData();
    const applicationIndex = applications.findIndex(app => app.id === params.id);
    
    if (applicationIndex === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    
    applications.splice(applicationIndex, 1);
    writeApplicationsData(applications);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}