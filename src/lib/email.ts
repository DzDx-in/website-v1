import nodemailer from 'nodemailer';
import { JobApplication } from '@/app/api/applications/route';
import getConfig from 'next/config';

// Get serverRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig() || { 
  serverRuntimeConfig: {},
  publicRuntimeConfig: {}
};

// Create a transporter using environment variables
// These should be set in your .env.local file
const createTransporter = () => {
  const emailServer = serverRuntimeConfig.EMAIL_SERVER || process.env.EMAIL_SERVER || 'smtp.gmail.com';
  const emailPort = parseInt(serverRuntimeConfig.EMAIL_PORT || process.env.EMAIL_PORT || '587');
  const emailSecure = serverRuntimeConfig.EMAIL_SECURE === 'true' || process.env.EMAIL_SECURE === 'true';
  const emailUser = serverRuntimeConfig.EMAIL_USER || process.env.EMAIL_USER;
  const emailPassword = serverRuntimeConfig.EMAIL_PASSWORD || process.env.EMAIL_PASSWORD;

  return nodemailer.createTransport({
    host: emailServer,
    port: emailPort,
    secure: emailSecure,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
};

// Function to send email notification for new job application
export async function sendApplicationEmail(application: JobApplication): Promise<void> {
  const transporter = createTransporter();
  
  // Recipient email address - this should be your HR or recruitment email
  const toEmail = serverRuntimeConfig.NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || 'adm.dzdx@gmail.com';
  const emailUser = serverRuntimeConfig.EMAIL_USER || process.env.EMAIL_USER;
  const baseUrl = publicRuntimeConfig.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
  const ccEmail = serverRuntimeConfig.CC_EMAIL || process.env.CC_EMAIL;
  
  // Format the email body
  const emailHtml = `
    <h2>New Job Application Received</h2>
    <p><strong>Position:</strong> ${application.jobTitle}</p>
    <p><strong>Applicant:</strong> ${application.fullName}</p>
    <p><strong>Email:</strong> ${application.email}</p>
    <p><strong>Phone:</strong> ${application.phone}</p>
    <p><strong>Resume:</strong> <a href="${application.resumeLink}" target="_blank">View Resume</a></p>
    ${application.portfolio ? `<p><strong>Portfolio:</strong> <a href="${application.portfolio}" target="_blank">View Portfolio</a></p>` : ''}
    
    <h3>Cover Letter / Message:</h3>
    <div style="padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
      ${application.coverLetter.replace(/\n/g, '<br>')}
    </div>
    
    <p style="margin-top: 20px;">
      <a href="${baseUrl}/admin/applications/${application.id}" style="padding: 10px 15px; background-color: #4682b4; color: white; text-decoration: none; border-radius: 5px;">
        View Application in Admin Panel
      </a>
    </p>
  `;
  
  // Send the email
  await transporter.sendMail({
    from: `"DZDX Careers" <${emailUser}>`,
    to: toEmail,
    cc: ccEmail, // Optional CC address
    subject: `New Job Application: ${application.jobTitle} - ${application.fullName}`,
    html: emailHtml,
    // Optional text version for email clients that don't support HTML
    text: `New Job Application\n\nPosition: ${application.jobTitle}\nApplicant: ${application.fullName}\nEmail: ${application.email}\nPhone: ${application.phone}\n\nResume: ${application.resumeLink}\n${application.portfolio ? `Portfolio: ${application.portfolio}\n` : ''}\n\nCover Letter:\n${application.coverLetter}`,
  });
}

// Function to send status update email to applicant
export async function sendStatusUpdateEmail(application: JobApplication): Promise<void> {
  const transporter = createTransporter();
  const emailUser = serverRuntimeConfig.EMAIL_USER || process.env.EMAIL_USER;
  // const baseUrl = publicRuntimeConfig.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
  const notificationEmail = serverRuntimeConfig.NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || 'adm.dzdx@gmail.com';
  
  // Status-specific messaging
  let statusMessage = '';
  let subject = '';
  
  switch (application.status) {
    case 'reviewing':
      subject = 'Your Application is Under Review - DZDX Solutions';
      statusMessage = `
        <p>We're pleased to inform you that your application for the <strong>${application.jobTitle}</strong> position is now under review by our team.</p>
        <p>We carefully review each application, and this process typically takes 1-2 weeks. We'll contact you once we've completed the initial review.</p>
      `;
      break;
    case 'interviewed':
      subject = 'Interview Scheduled - DZDX Solutions';
      statusMessage = `
        <p>Thank you for your patience throughout our review process. We'd like to invite you to interview for the <strong>${application.jobTitle}</strong> position.</p>
        <p>Our HR team will contact you shortly to schedule a convenient time for the interview.</p>
      `;
      break;
    case 'rejected':
      subject = 'Update on Your Application - DZDX Solutions';
      statusMessage = `
        <p>Thank you for your interest in the <strong>${application.jobTitle}</strong> position at DZDX Solutions.</p>
        <p>After careful consideration, we've decided to move forward with other candidates whose qualifications more closely match our current needs.</p>
        <p>We appreciate your interest in joining our team and encourage you to apply for future openings that align with your skills and experience.</p>
      `;
      break;
    case 'hired':
      subject = 'Welcome to DZDX Solutions!';
      statusMessage = `
        <p>Congratulations! We're thrilled to inform you that you've been selected for the <strong>${application.jobTitle}</strong> position at DZDX Solutions.</p>
        <p>Our HR team will contact you shortly with details about the next steps, including paperwork, start date, and onboarding information.</p>
        <p>We're excited to welcome you to the DZDX team!</p>
      `;
      break;
    default:
      return; // Don't send an email for other statuses
  }
  
  // Format the email body
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #0a0a0f; padding: 20px; text-align: center;">
        <img src="https://cdn.dzdx.in/dzdx_nobg.png" alt="DZDX Solutions Logo" style="max-width: 150px;">
      </div>
      
      <div style="padding: 20px; background-color: #f7f7f7;">
        <h2 style="color: #4682b4;">Application Status Update</h2>
        
        <p>Dear ${application.fullName},</p>
        
        ${statusMessage}
        
        <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:adm.dzdx@gmail.com">adm.dzdx@gmail.com</a>.</p>
        
        <p>Thank you for your interest in DZDX Solutions.</p>
        
        <p>Best regards,<br>
        The DZDX Recruitment Team</p>
      </div>
      
      <div style="background-color: #0a0a0f; color: white; padding: 15px; text-align: center; font-size: 12px;">
        <p>&copy; 2025 DZDX Solutions Pvt Ltd. All Rights Reserved.</p>
      </div>
    </div>
  `;
  
  // Send the email
  await transporter.sendMail({
    from: `"DZDX Careers" <${emailUser}>`,
    to: application.email,
    bcc: notificationEmail, // BCC the HR team
    subject: subject,
    html: emailHtml,
    // Text version
    text: `Application Status Update\n\nDear ${application.fullName},\n\n${statusMessage.replace(/<[^>]*>/g, '')}\n\nIf you have any questions, please contact us at adm.dzdx@gmail.com.\n\nBest regards,\nThe DZDX Recruitment Team`,
  });
}