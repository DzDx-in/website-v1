'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { JobApplication } from '@/app/api/applications/route';
import { Job } from '@/app/api/jobs/route';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    jobId: '',
    status: ''
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Set initial filter from URL if present
    const jobIdParam = searchParams.get('jobId');
    if (jobIdParam) {
      setFilters(prev => ({ ...prev, jobId: jobIdParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch applications
        const appResponse = await fetch('/api/applications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!appResponse.ok) {
          if (appResponse.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('adminToken');
            router.push('/admin');
            return;
          }
          throw new Error('Failed to fetch applications');
        }
        
        const appData = await appResponse.json();
        
        // Fetch jobs for filtering
        const jobsResponse = await fetch('/api/jobs?admin=true', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!jobsResponse.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const jobsData = await jobsResponse.json();
        
        setApplications(appData);
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load applications. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const jobMatch = !filters.jobId || app.jobId === filters.jobId;
    const statusMatch = !filters.status || app.status === filters.status;
    return jobMatch && statusMatch;
  });

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout title="Applications" currentPath="/admin/applications">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Filter Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Job Filter */}
              <div>
                <label htmlFor="jobFilter" className="block text-white/80 mb-2">
                  Job Position
                </label>
                <select
                  id="jobFilter"
                  value={filters.jobId}
                  onChange={(e) => setFilters({ ...filters, jobId: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                >
                  <option value="">All Positions</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label htmlFor="statusFilter" className="block text-white/80 mb-2">
                  Status
                </label>
                <select
                  id="statusFilter"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ jobId: '', status: '' })}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {filteredApplications.length} Application{filteredApplications.length !== 1 ? 's' : ''}
            </h2>

            {filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/70 mb-4">No applications match your filter criteria.</p>
                <button
                  onClick={() => setFilters({ jobId: '', status: '' })}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  Show All Applications
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Date Applied
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{application.fullName}</div>
                          <div className="text-xs text-white/60">{application.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/80">{application.jobTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{formatDate(application.submittedAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'new' ? 'bg-blue-500/20 text-blue-300' :
                            application.status === 'reviewing' ? 'bg-amber-500/20 text-amber-300' :
                            application.status === 'interviewed' ? 'bg-purple-500/20 text-purple-300' :
                            application.status === 'hired' ? 'bg-green-500/20 text-green-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => router.push(`/admin/applications/${application.id}`)}
                            className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}