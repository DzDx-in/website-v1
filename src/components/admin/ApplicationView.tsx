'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobApplication } from '@/app/api/applications/route';

interface ApplicationViewProps {
  application: JobApplication;
}

const ApplicationView = ({ application }: ApplicationViewProps) => {
  const [status, setStatus] = useState<JobApplication['status']>(application.status);
  const [notes, setNotes] = useState(application.notes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const handleStatusUpdate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      const response = await fetch(`/api/applications/${application.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, notes })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update application status');
      }

      setSuccess('Application status updated successfully!');
      
      // Refresh the page after short delay
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      console.error('Error updating application:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded-md">
          <p>{success}</p>
        </div>
      )}

      {/* Application Header */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-1">{application.fullName}</h2>
            <p className="text-dzdx-blue">
              Applied for: <span className="font-medium">{application.jobTitle}</span>
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              application.status === 'new' ? 'bg-blue-500/20 text-blue-300' :
              application.status === 'reviewing' ? 'bg-amber-500/20 text-amber-300' :
              application.status === 'interviewed' ? 'bg-purple-500/20 text-purple-300' :
              application.status === 'hired' ? 'bg-green-500/20 text-green-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="text-white/70 text-sm">
          Submitted: {formatDate(application.submittedAt)}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-dzdx-blue mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          <div>
            <p className="text-white/70 mb-1">Email</p>
            <p className="font-medium">
              <a href={`mailto:${application.email}`} className="text-dzdx-blue hover:underline">
                {application.email}
              </a>
            </p>
          </div>
          <div>
            <p className="text-white/70 mb-1">Phone</p>
            <p className="font-medium">
              <a href={`tel:${application.phone}`} className="text-dzdx-blue hover:underline">
                {application.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Resume & Portfolio */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-dzdx-blue mb-4">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-white/70 mb-2">Resume</p>
            <a 
              href={application.resumeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
            >
              <i className="fas fa-file-alt mr-2"></i>
              View Resume
            </a>
          </div>
          {application.portfolio && (
            <div>
              <p className="text-white/70 mb-2">Portfolio</p>
              <a 
                href={application.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              >
                <i className="fas fa-globe mr-2"></i>
                View Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Cover Letter */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-dzdx-blue mb-4">Cover Letter</h3>
        <div className="bg-white/5 p-4 rounded-md text-white whitespace-pre-line">
          {application.coverLetter}
        </div>
      </div>

      {/* Update Status */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-dzdx-blue mb-4">Update Application Status</h3>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-white/90 mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as JobApplication['status'])}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
          >
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="interviewed">Interviewed</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="notes" className="block text-white/90 mb-2">
            Internal Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            placeholder="Add notes about this candidate (private to admin team)"
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleStatusUpdate}
            disabled={loading}
            className="px-6 py-2 btn-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Updating...
              </div>
            ) : (
              'Update Status'
            )}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push('/admin/applications')}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Applications
        </button>
        
        <div className="space-x-3">
          <a 
            href={`mailto:${application.email}`}
            className="inline-flex items-center px-4 py-2 bg-dzdx-blue/80 hover:bg-dzdx-blue text-white rounded-md transition-colors"
          >
            <i className="fas fa-envelope mr-2"></i>
            Email Candidate
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplicationView;