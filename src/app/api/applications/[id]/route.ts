import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { JobApplication } from '../route';
import { isAuthenticated } from '@/lib/auth';
import { sendStatusUpdateEmail } from '@/lib/email';

const dataFilePath = path.join(process.cwd(), 'data', 'applications.json');

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

const writeApplicationsData = (data: JobApplication[]): void => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing applications data:', error);
  }
};

const getIdFromRequest = (request: NextRequest): string | null => {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1] || null;
};

export async function GET(request: NextRequest) {
  try {
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = getIdFromRequest(request);
    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const applications = getApplicationsData();
    const application = applications.find(app => app.id === id);

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = getIdFromRequest(request);
    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const updateData = await request.json();
    const applications = getApplicationsData();
    const applicationIndex = applications.findIndex(app => app.id === id);

    if (applicationIndex === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const previousStatus = applications[applicationIndex].status;

    const updatedApplication: JobApplication = {
      ...applications[applicationIndex],
      ...updateData,
      id,
      submittedAt: applications[applicationIndex].submittedAt,
    };

    applications[applicationIndex] = updatedApplication;
    writeApplicationsData(applications);

    if (previousStatus !== updatedApplication.status) {
      try {
        await sendStatusUpdateEmail(updatedApplication);
      } catch (emailError) {
        console.error('Error sending status update email:', emailError);
      }
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = getIdFromRequest(request);
    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const applications = getApplicationsData();
    const applicationIndex = applications.findIndex(app => app.id === id);

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
