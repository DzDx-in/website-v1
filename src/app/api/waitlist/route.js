// app/api/waitlist/route.js (for Next.js 13+ with App Router)

import fs from 'fs';
import path from 'path';

// Path to the JSON file (stored in the project root)
const waitlistFilePath = path.join(process.cwd(), 'waitlist-data.json');

// Initialize the JSON file if it doesn't exist
function initializeWaitlistFile() {
  if (!fs.existsSync(waitlistFilePath)) {
    const initialData = {
      submissions: [],
      totalCount: 0,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(waitlistFilePath, JSON.stringify(initialData, null, 2));
  }
}

// Read waitlist data
function readWaitlistData() {
  try {
    const data = fs.readFileSync(waitlistFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading waitlist data:', error);
    return { submissions: [], totalCount: 0, lastUpdated: new Date().toISOString() };
  }
}

// Write waitlist data
function writeWaitlistData(data) {
  try {
    fs.writeFileSync(waitlistFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing waitlist data:', error);
    return false;
  }
}

// For Next.js 13+ App Router (app/api/waitlist/route.js)
export async function POST(request) {
  try {
    const { email, phone } = await request.json();

    // Validate input
    if (!email || !phone) {
      return Response.json({
        success: false,
        error: 'Email and phone number are required'
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({
        success: false,
        error: 'Please provide a valid email address'
      }, { status: 400 });
    }

    // Initialize file if needed
    initializeWaitlistFile();

    // Read existing data
    const waitlistData = readWaitlistData();

    // Check if email already exists
    const existingSubmission = waitlistData.submissions.find(
      submission => submission.email.toLowerCase() === email.toLowerCase()
    );

    if (existingSubmission) {
      return Response.json({
        success: false,
        error: 'This email is already on the waitlist'
      }, { status: 409 });
    }

    // Create new submission
    const newSubmission = {
      id: Date.now().toString(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'Unknown',
      ipAddress: request.headers.get('x-forwarded-for') || 'Unknown'
    };

    // Add to submissions array
    waitlistData.submissions.push(newSubmission);
    waitlistData.totalCount = waitlistData.submissions.length;
    waitlistData.lastUpdated = new Date().toISOString();

    // Save to file
    const saveSuccess = writeWaitlistData(waitlistData);

    if (saveSuccess) {
      return Response.json({
        success: true,
        message: 'Successfully added to waitlist!',
        data: {
          id: newSubmission.id,
          email: newSubmission.email,
          timestamp: newSubmission.timestamp,
          position: waitlistData.totalCount
        }
      }, { status: 201 });
    } else {
      return Response.json({
        success: false,
        error: 'Failed to save waitlist data'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return Response.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    initializeWaitlistFile();
    const waitlistData = readWaitlistData();
    
    return Response.json({
      success: true,
      data: {
        totalCount: waitlistData.totalCount,
        lastUpdated: waitlistData.lastUpdated,
        recentSubmissions: waitlistData.submissions.slice(-5).reverse()
      }
    });
  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    return Response.json({
      success: false,
      error: 'Failed to fetch waitlist statistics'
    }, { status: 500 });
  }
}