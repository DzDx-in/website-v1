// src/app/admin/blog/new/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPostPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  return (
    <AdminLayout title="Create New Blog Post" currentPath="/admin/blog">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-6">
        <p className="text-white/80">
          Create a new blog post using Markdown formatting. All fields marked with an asterisk (*) are required.
          You can save as a draft or publish immediately.
        </p>
      </div>

      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <BlogForm />
      </div>
    </AdminLayout>
  );
}