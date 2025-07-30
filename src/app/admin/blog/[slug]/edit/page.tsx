// src/app/admin/blog/[slug]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogForm from '@/components/admin/BlogForm';
import { BlogPost } from '@/app/api/blog/route';

export default function EditBlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch blog post details
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/blog/${slug}?admin=true`, {
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
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post details');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, router]);

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never published';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout title="Edit Blog Post" currentPath="/admin/blog">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
          <div className="mt-4">
            <button
              onClick={() => router.push('/admin/blog')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
            >
              Back to Blog Posts
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">Editing: {post?.title}</h2>
                <div className="text-white/60 text-sm mt-1 space-y-1">
                  <p>Created: {formatDate(post?.createdAt || '')}</p>
                  <p>Last updated: {formatDate(post?.updatedAt || '')}</p>
                  <p>Published: {formatDate(post?.publishedAt || '')}</p>
                  <p>Status: <span className={`font-medium ${post?.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                    {post?.isPublished ? 'Published' : 'Draft'}
                  </span></p>
                </div>
              </div>
              <div className="mt-3 md:mt-0 flex gap-3">
                <a
                  href={`/blog/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  View Post
                </a>
                <button
                  onClick={() => router.push('/admin/blog')}
                  className="inline-flex items-center px-4 py-2 bg-dzdx-blue/20 hover:bg-dzdx-blue/30 text-dzdx-blue rounded-md transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Blog
                </button>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
            <BlogForm post={post || undefined} isEdit={true} />
          </div>
        </>
      )}
    </AdminLayout>
  );
}