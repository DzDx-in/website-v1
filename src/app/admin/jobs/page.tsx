'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  applicationDeadline?: string;
  isActive: boolean;
}

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch jobs
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/jobs?admin=true', {
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
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  // Format date to human-readable form
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No deadline';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Delete job
  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      // Remove job from state
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  // Toggle job active status
  const handleToggleStatus = async (job: Job) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      const updatedJob = { ...job, isActive: !job.isActive };

      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedJob)
      });

      if (!response.ok) {
        throw new Error('Failed to update job status');
      }

      // Update job in state
      setJobs(jobs.map(j => j.id === job.id ? updatedJob : j));
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status. Please try again.');
    }
  };

  // Filter jobs based on status
  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'active') return job.isActive;
    if (filter === 'inactive') return !job.isActive;
    return true;
  });

  return (
    <AdminLayout title="Job Listings" currentPath="/admin/jobs">
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
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'all' 
                    ? 'bg-dzdx-blue text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'active' 
                    ? 'bg-dzdx-blue text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'inactive' 
                    ? 'bg-dzdx-blue text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                Inactive
              </button>
            </div>

            <button
              onClick={() => router.push('/admin/jobs/new')}
              className="px-4 py-2 bg-dzdx-blue hover:bg-dzdx-light-blue transition-colors rounded-md text-white"
            >
              <i className="fas fa-plus mr-2"></i> Add New Job
            </button>
          </div>

          {/* Jobs Table */}
          {filteredJobs.length === 0 ? (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 text-center">
              <p className="text-white/70 mb-4">No job listings found.</p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  Show All Jobs
                </button>
              )}
            </div>
          ) : (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Deadline
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
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{job.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{job.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{job.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{formatDate(job.postedDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{formatDate(job.applicationDeadline)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job.isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                          }`}>
                            {job.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => router.push(`/admin/jobs/${job.id}`)}
                              title="Edit"
                              className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleToggleStatus(job)}
                              title={job.isActive ? 'Deactivate' : 'Activate'}
                              className={`${
                                job.isActive ? 'text-amber-400 hover:text-amber-300' : 'text-green-400 hover:text-green-300'
                              } transition-colors`}
                            >
                              <i className={`fas ${job.isActive ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              title="Delete"
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                            <a
                              href={`/jobs/${job.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Public Page"
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <i className="fas fa-external-link-alt"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminJobsPage;