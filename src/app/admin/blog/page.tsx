// src/app/admin/blog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { BlogPost } from '@/app/api/blog/route';

const AdminBlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch blog posts
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/blog?admin=true', {
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
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not published';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Delete blog post
  const handleDeletePost = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      // Remove post from state
      setPosts(posts.filter(post => post.slug !== slug));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post. Please try again.');
    }
  };

  // Toggle post published status
  const handleToggleStatus = async (post: BlogPost) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      const updatedPost = { 
        ...post, 
        isPublished: !post.isPublished,
        publishedAt: !post.isPublished ? new Date().toISOString() : post.publishedAt
      };

      const response = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedPost)
      });

      if (!response.ok) {
        throw new Error('Failed to update blog post status');
      }

      const responseData = await response.json();

      // Update post in state
      setPosts(posts.map(p => p.slug === post.slug ? responseData : p));
    } catch (error) {
      console.error('Error updating blog post status:', error);
      alert('Failed to update blog post status. Please try again.');
    }
  };

  // Filter posts based on status
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'published') return post.isPublished;
    if (filter === 'draft') return !post.isPublished;
    return true;
  });

  // Get reading time
  const getReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min`;
  };

  return (
    <AdminLayout title="Blog Posts" currentPath="/admin/blog">
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
                All ({posts.length})
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'published' 
                    ? 'bg-dzdx-blue text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                Published ({posts.filter(p => p.isPublished).length})
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'draft' 
                    ? 'bg-dzdx-blue text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                Drafts ({posts.filter(p => !p.isPublished).length})
              </button>
            </div>

            <button
              onClick={() => router.push('/admin/blog/new')}
              className="px-4 py-2 bg-dzdx-blue hover:bg-dzdx-light-blue transition-colors rounded-md text-white"
            >
              <i className="fas fa-plus mr-2"></i> New Blog Post
            </button>
          </div>

          {/* Blog Posts Table */}
          {filteredPosts.length === 0 ? (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 text-center">
              <p className="text-white/70 mb-4">
                {filter === 'all' ? 'No blog posts found.' : `No ${filter} posts found.`}
              </p>
              {filter !== 'all' ? (
                <button
                  onClick={() => setFilter('all')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  Show All Posts
                </button>
              ) : (
                <button
                  onClick={() => router.push('/admin/blog/new')}
                  className="px-4 py-2 bg-dzdx-blue hover:bg-dzdx-light-blue text-white rounded-md transition-colors"
                >
                  Create Your First Post
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
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Published
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Updated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Reading Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white line-clamp-2">
                                {post.title}
                              </div>
                              <div className="text-xs text-white/60 mt-1 line-clamp-1">
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.isPublished 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {post.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{formatDate(post.publishedAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{formatDate(post.updatedAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">{getReadingTime(post.content)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => router.push(`/admin/blog/${post.slug}/edit`)}
                              title="Edit"
                              className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleToggleStatus(post)}
                              title={post.isPublished ? 'Unpublish' : 'Publish'}
                              className={`${
                                post.isPublished 
                                  ? 'text-amber-400 hover:text-amber-300' 
                                  : 'text-green-400 hover:text-green-300'
                              } transition-colors`}
                            >
                              <i className={`fas ${post.isPublished ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.slug, post.title)}
                              title="Delete"
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Post"
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

export default AdminBlogPage;