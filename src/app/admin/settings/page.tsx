'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { SiteSettings } from '@/app/api/settings/route';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    
    // Fetch settings
    const fetchSettings = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/settings', {
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
          throw new Error('Failed to fetch settings');
        }
        
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to load settings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [router]);

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      email: {
        ...settings.email,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };

  const handleCareerPageSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!settings) return;
    
    const { name, value } = e.target;
    setSettings({
      ...settings,
      careerPage: {
        ...settings.careerPage,
        [name]: value
      }
    });
  };

  const saveSettings = async (section: 'email' | 'careerPage') => {
    if (!settings) return;
    
    setSuccess('');
    setError('');
    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      // Determine which part of the settings to update
      const updateData = {
        [section]: settings[section]
      };

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess('Settings saved successfully!');
      
      // Update settings with response data
      const updatedSettings = await response.json();
      setSettings(updatedSettings);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Download data backup
  const handleBackupData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      // Fetch jobs
      const jobsResponse = await fetch('/api/jobs?admin=true', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!jobsResponse.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const jobs = await jobsResponse.json();
      
      // Fetch applications
      const applicationsResponse = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!applicationsResponse.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const applications = await applicationsResponse.json();

      // Create backup object
      const backup = {
        settings,
        jobs,
        applications,
        backupDate: new Date().toISOString()
      };

      // Convert to JSON and create download
      const dataStr = JSON.stringify(backup, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileName = `dzdx_careers_backup_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();
    } catch (error) {
      console.error('Error creating backup:', error);
      alert('Failed to create backup. Please try again.');
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Settings" currentPath="/admin/settings">
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout title="Settings" currentPath="/admin/settings">
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md">
          <p>Failed to load settings. Please try refreshing the page.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings" currentPath="/admin/settings">
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded-md mb-6">
          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Settings */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-dzdx-blue mb-4">Email Notifications</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="notificationEmail" className="block text-white/90 mb-2">
                Notification Email
              </label>
              <input
                type="email"
                id="notificationEmail"
                name="notificationEmail"
                value={settings.email.notificationEmail}
                onChange={handleEmailSettingsChange}
                placeholder="hr@dzdx.com"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
              />
              <p className="mt-1 text-sm text-white/60">
                Job applications will be sent to this email address.
              </p>
            </div>

            <div>
              <label htmlFor="ccEmail" className="block text-white/90 mb-2">
                CC Email (Optional)
              </label>
              <input
                type="email"
                id="ccEmail"
                name="ccEmail"
                value={settings.email.ccEmail}
                onChange={handleEmailSettingsChange}
                placeholder="manager@dzdx.com"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
              />
              <p className="mt-1 text-sm text-white/60">
                Optionally CC another email address on all application notifications.
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableAutoResponder"
                name="enableAutoResponder"
                checked={settings.email.enableAutoResponder}
                onChange={handleEmailSettingsChange}
                className="w-5 h-5 bg-white/10 border border-white/20 rounded focus:ring-dzdx-blue"
              />
              <label htmlFor="enableAutoResponder" className="ml-2 text-white/90">
                Send auto-response to applicants
              </label>
            </div>

            <button
              onClick={() => saveSettings('email')}
              disabled={saving}
              className="px-6 py-2 btn-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Email Settings'
              )}
            </button>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-dzdx-blue mb-4">Career Page Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-white/90 mb-2">
                Career Page Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={settings.careerPage.title}
                onChange={handleCareerPageSettingsChange}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-white/90 mb-2">
                Career Page Description
              </label>
              <textarea
                id="description"
                name="description"
                value={settings.careerPage.description}
                onChange={handleCareerPageSettingsChange}
                rows={3}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue resize-none"
              ></textarea>
            </div>

            <button
              onClick={() => saveSettings('careerPage')}
              disabled={saving}
              className="px-6 py-2 btn-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Page Settings'
              )}
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-dzdx-blue mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <p className="text-white/80 mb-3">
                For security reasons, password changes and user management must be done directly in the .env file on the server.
              </p>
              
              <div className="bg-black/30 p-4 rounded-md text-white/70 font-mono text-sm">
                <p># Example .env.local configuration</p>
                <p>ADMIN_USERNAME=admin@dzdx.com</p>
                <p>ADMIN_PASSWORD_HASH=bcrypt_hash_of_your_password</p>
                <p>JWT_SECRET=your_secret_key</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-dzdx-blue mb-4">System Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white/70">System Version:</span>
              <span className="text-white">{settings.system.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Next.js Version:</span>
              <span className="text-white">14.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Environment:</span>
              <span className="text-white capitalize">{settings.system.environment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Database Type:</span>
              <span className="text-white">JSON File Storage</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Storage Path:</span>
              <span className="text-white">/data</span>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleBackupData}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
            >
              <i className="fas fa-download mr-2"></i>
              Backup Data
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;