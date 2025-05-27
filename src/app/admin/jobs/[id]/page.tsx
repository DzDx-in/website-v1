'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import JobForm from '@/components/admin/JobForm';
import { Job } from '@/app/api/jobs/route';

export default function EditJobPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch job details
    const fetchJob = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/jobs/${jobId}?admin=true`, {
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
            throw new Error('Job not found');
          }
          throw new Error('Failed to fetch job details');
        }
        
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, router]);

  return (
    <AdminLayout title="Edit Job" currentPath="/admin/jobs">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
          <div className="mt-4">
            <button
              onClick={() => router.push('/admin/jobs')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">Editing: {job?.title}</h2>
                <p className="text-white/60 text-sm mt-1">
                  Last updated: {new Date(job?.postedDate || '').toLocaleDateString()}
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <a
                  href={`/jobs/${jobId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  View Public Page
                </a>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
            <JobForm job={job || undefined} isEdit={true} />
          </div>
        </>
      )}
    </AdminLayout>
  );
}