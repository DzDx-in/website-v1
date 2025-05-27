'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Job } from '@/app/api/jobs/route';
import { JobApplication } from '@/app/api/applications/route';

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch dashboard data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch jobs
        const jobsResponse = await fetch('/api/jobs?admin=true', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!jobsResponse.ok) {
          if (jobsResponse.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('adminToken');
            router.push('/admin');
            return;
          }
          throw new Error('Failed to fetch jobs');
        }
        
        const jobsData = await jobsResponse.json();
        
        // Fetch recent applications
        const applicationsResponse = await fetch('/api/applications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!applicationsResponse.ok) {
          throw new Error('Failed to fetch applications');
        }
        
        const applicationsData = await applicationsResponse.json();
        
        setJobs(jobsData);
        setApplications(applicationsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Calculate dashboard statistics
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => job.isActive).length;
  const totalApplications = applications.length;
  const newApplications = applications.filter(app => app.status === 'new').length;
  
  // Get recent applications (last 5)
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout title="Dashboard" currentPath="/admin/dashboard">
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
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-500/30 mr-4">
                  <i className="fas fa-briefcase text-2xl text-blue-300"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Total Jobs</p>
                  <h3 className="text-2xl font-bold text-white">{totalJobs}</h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-500/30 mr-4">
                  <i className="fas fa-check-circle text-2xl text-green-300"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Active Listings</p>
                  <h3 className="text-2xl font-bold text-white">{activeJobs}</h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-500/30 mr-4">
                  <i className="fas fa-users text-2xl text-purple-300"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Total Applications</p>
                  <h3 className="text-2xl font-bold text-white">{totalApplications}</h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/30 rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-500/30 mr-4">
                  <i className="fas fa-bell text-2xl text-amber-300"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm">New Applications</p>
                  <h3 className="text-2xl font-bold text-white">{newApplications}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
              <button
                onClick={() => router.push('/admin/applications')}
                className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors text-sm"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>

            {recentApplications.length === 0 ? (
              <p className="text-white/70">No applications received yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left">
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-white/80 font-medium">Applicant</th>
                      <th className="pb-3 text-white/80 font-medium">Position</th>
                      <th className="pb-3 text-white/80 font-medium">Date</th>
                      <th className="pb-3 text-white/80 font-medium">Status</th>
                      <th className="pb-3 text-white/80 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((application) => (
                      <tr key={application.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-4 text-white">
                          {application.fullName}
                        </td>
                        <td className="py-4 text-white/80">
                          {application.jobTitle}
                        </td>
                        <td className="py-4 text-white/70">
                          {formatDate(application.submittedAt)}
                        </td>
                        <td className="py-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            application.status === 'new' ? 'bg-blue-500/20 text-blue-300' :
                            application.status === 'reviewing' ? 'bg-amber-500/20 text-amber-300' :
                            application.status === 'interviewed' ? 'bg-purple-500/20 text-purple-300' :
                            application.status === 'hired' ? 'bg-green-500/20 text-green-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => router.push(`/admin/applications/${application.id}`)}
                            className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
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

          {/* Job Listings Summary */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Job Listings</h2>
              <div className="space-x-4">
                <button
                  onClick={() => router.push('/admin/jobs/new')}
                  className="px-4 py-2 bg-dzdx-blue hover:bg-dzdx-light-blue transition-colors rounded-md text-white text-sm"
                >
                  <i className="fas fa-plus mr-2"></i> Add New Job
                </button>
                <button
                  onClick={() => router.push('/admin/jobs')}
                  className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors text-sm"
                >
                  View All <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>

            {jobs.length === 0 ? (
              <p className="text-white/70">No job listings created yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left">
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-white/80 font-medium">Title</th>
                      <th className="pb-3 text-white/80 font-medium">Department</th>
                      <th className="pb-3 text-white/80 font-medium">Location</th>
                      <th className="pb-3 text-white/80 font-medium">Applications</th>
                      <th className="pb-3 text-white/80 font-medium">Status</th>
                      <th className="pb-3 text-white/80 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 5).map((job) => {
                      const jobApplications = applications.filter(app => app.jobId === job.id);
                      
                      return (
                        <tr key={job.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-4 text-white">
                            {job.title}
                          </td>
                          <td className="py-4 text-white/80">
                            {job.department}
                          </td>
                          <td className="py-4 text-white/80">
                            {job.location}
                          </td>
                          <td className="py-4 text-white/80">
                            {jobApplications.length}
                          </td>
                          <td className="py-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              job.isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                              {job.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => router.push(`/admin/jobs/${job.id}`)}
                                className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() => router.push(`/admin/applications?jobId=${job.id}`)}
                                className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
                                title="View Applications"
                              >
                                <i className="fas fa-users"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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