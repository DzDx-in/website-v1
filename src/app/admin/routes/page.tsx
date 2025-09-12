// src/app/admin/routes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

interface DynamicRoute {
  id: string;
  uuid: string;
  buttonLink: string;
  buttonText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  clicks: number;
  description?: string;
}

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<DynamicRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<DynamicRoute | null>(null);
  const [formData, setFormData] = useState({
    buttonLink: '',
    buttonText: '',
    description: '',
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Fetch routes
  const fetchRoutes = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/routes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        router.push('/admin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch routes');
      }

      const data = await response.json();
      setRoutes(data);
    } catch (err) {
      console.error('Error fetching routes:', err);
      setError('Failed to load routes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, [router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingRoute ? `/api/routes/${editingRoute.id}` : '/api/routes';
      const method = editingRoute ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save route');
      }

      await fetchRoutes();
      setShowCreateForm(false);
      setEditingRoute(null);
      setFormData({
        buttonLink: '',
        buttonText: '',
        description: '',
        isActive: true,
      });
    } catch (err) {
      console.error('Error saving route:', err);
      alert(err instanceof Error ? err.message : 'Failed to save route');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (route: DynamicRoute) => {
    if (!confirm(`Are you sure you want to delete the route for "${route.buttonText}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/routes?id=${route.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete route');
      }

      await fetchRoutes();
    } catch (err) {
      console.error('Error deleting route:', err);
      alert('Failed to delete route');
    }
  };

  // Handle edit
  const handleEdit = (route: DynamicRoute) => {
    setEditingRoute(route);
    setFormData({
      buttonLink: route.buttonLink,
      buttonText: route.buttonText,
      description: route.description || '',
      isActive: route.isActive,
    });
    setShowCreateForm(true);
  };

  // Cancel form
  const cancelForm = () => {
    setShowCreateForm(false);
    setEditingRoute(null);
    setFormData({
      buttonLink: '',
      buttonText: '',
      description: '',
      isActive: true,
    });
  };

  // Copy URL to clipboard
  const copyUrl = async (uuid: string) => {
    const url = `${window.location.origin}/${uuid}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
      alert('Failed to copy URL');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout title="Dynamic Routes" currentPath="/admin/routes">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-500/20 text-red-300 p-6 rounded-xl">
            <i className="fas fa-exclamation-triangle text-2xl mb-4"></i>
            <p>{error}</p>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchRoutes();
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-dzdx-blue hover:bg-dzdx-light-blue text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              Create New Route
            </button>
            <div className="flex-1"></div>
            <div className="text-white/70 text-sm flex items-center gap-4">
              <span>Total Routes: {routes.length}</span>
              <span>Active: {routes.filter(r => r.isActive).length}</span>
            </div>
          </div>

          {/* Create/Edit Form Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {editingRoute ? 'Edit Route' : 'Create New Route'}
                  </h2>
                  <button
                    onClick={cancelForm}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      WhatsApp Group Link *
                    </label>
                    <input
                      type="url"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      placeholder="https://chat.whatsapp.com/..."
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-dzdx-blue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Button Text *
                    </label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      placeholder="Join our WhatsApp Group"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-dzdx-blue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Description (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Internal description for reference"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-dzdx-blue"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-dzdx-blue bg-white/10 border-white/20 rounded focus:ring-dzdx-blue focus:ring-2"
                    />
                    <label htmlFor="isActive" className="text-white/80 text-sm">
                      Active (route will be accessible)
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 px-4 bg-dzdx-blue hover:bg-dzdx-light-blue disabled:opacity-50 text-white rounded-lg transition-colors"
                    >
                      {submitting ? 'Saving...' : editingRoute ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Routes Table */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10">
            {routes.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-link text-4xl text-white/30 mb-4"></i>
                <p className="text-white/60 mb-4">No dynamic routes created yet</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-dzdx-blue hover:bg-dzdx-light-blue text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Create Your First Route
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 text-white/80 font-medium">Route URL</th>
                      <th className="text-left py-4 px-6 text-white/80 font-medium">Button Text</th>
                      <th className="text-left py-4 px-6 text-white/80 font-medium">Status</th>
                      <th className="text-left py-4 px-6 text-white/80 font-medium">Clicks</th>
                      <th className="text-left py-4 px-6 text-white/80 font-medium">Created</th>
                      <th className="text-right py-4 px-6 text-white/80 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map((route) => (
                      <tr key={route.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <code className="text-dzdx-blue bg-dzdx-blue/20 px-2 py-1 rounded text-sm">
                              dzdx.in/{route.uuid}
                            </code>
                            <button
                              onClick={() => copyUrl(route.uuid)}
                              className="text-white/60 hover:text-dzdx-blue transition-colors"
                              title="Copy URL"
                            >
                              <i className="fas fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-white">
                          <div>
                            <div className="font-medium">{route.buttonText}</div>
                            {route.description && (
                              <div className="text-white/60 text-sm">{route.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            route.isActive 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {route.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white">
                          <span className="text-dzdx-blue font-mono">{route.clicks}</span>
                        </td>
                        <td className="py-4 px-6 text-white/70 text-sm">
                          {formatDate(route.createdAt)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end space-x-2">
                            <a
                              href={`/${route.uuid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
                              title="Preview"
                            >
                              <i className="fas fa-external-link-alt"></i>
                            </a>
                            <button
                              onClick={() => handleEdit(route)}
                              className="text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(route)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
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

      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid #4682b4;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AdminLayout>
  );
}