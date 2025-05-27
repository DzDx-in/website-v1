'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import JobForm from '@/components/admin/JobForm';

export default function NewJobPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  return (
    <AdminLayout title="Create New Job" currentPath="/admin/jobs">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-6">
        <p className="text-white/80">
          Create a new job posting. All fields marked with an asterisk (*) are required.
          The job will be created with the status you select and will be visible to candidates
          only if marked as Active.
        </p>
      </div>

      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <JobForm />
      </div>
    </AdminLayout>
  );
}