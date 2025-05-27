'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ApplicationView from '@/components/admin/ApplicationView';
import { JobApplication } from '@/app/api/applications/route';

export default function ViewApplicationPage() {
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const applicationId = params.id as string;

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch application details
    const fetchApplication = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/applications/${applicationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('adminToken');
            router.push('/admin');
            return;
          }
          if (response.status === 404) {
            throw new Error('Application not found');
          }
          throw new Error('Failed to fetch application details');
        }
        
        const data = await response.json();
        setApplication(data);
      } catch (err) {
        console.error('Error fetching application:', err);
        setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId, router]);

  return (
    <AdminLayout title="Application Details" currentPath="/admin/applications">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
          <div className="mt-4">
            <button
              onClick={() => router.push('/admin/applications')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
            >
              Back to Applications
            </button>
          </div>
        </div>
      ) : application ? (
        <ApplicationView application={application} />
      ) : (
        <div className="text-center py-8">
          <p className="text-white/70 mb-4">Application not found.</p>
          <button
            onClick={() => router.push('/admin/applications')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
          >
            Back to Applications
          </button>
        </div>
      )}
    </AdminLayout>
  );
}