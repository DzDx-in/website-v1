'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '@/app/api/jobs/route';

interface JobFormProps {
  job?: Partial<Job>;
  isEdit?: boolean;
}

const initialJobState: Partial<Job> = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  experience: '',
  salary: '',
  description: '',
  responsibilities: [''],
  requirements: [''],
  benefits: [''],
  applicationDeadline: '',
  isActive: true
};

const JobForm = ({ job = {}, isEdit = false }: JobFormProps) => {
  const [formData, setFormData] = useState<Partial<Job>>({ ...initialJobState });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Populate form with job data if editing
  useEffect(() => {
    if (isEdit && job) {
      // Format date for date input (YYYY-MM-DD)
      const formattedJob = { ...job };
      if (job.applicationDeadline) {
        const deadline = new Date(job.applicationDeadline);
        formattedJob.applicationDeadline = deadline.toISOString().split('T')[0];
      }
      setFormData(formattedJob);
    }
  }, [isEdit, job]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleArrayInputChange = (
    index: number,
    value: string,
    field: 'responsibilities' | 'requirements' | 'benefits'
  ) => {
    const updatedArray = [...(formData[field] || [])];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayItem = (field: 'responsibilities' | 'requirements' | 'benefits') => {
    const updatedArray = [...(formData[field] || []), ''];
    setFormData({ ...formData, [field]: updatedArray });
  };

  const removeArrayItem = (
    index: number,
    field: 'responsibilities' | 'requirements' | 'benefits'
  ) => {
    const updatedArray = [...(formData[field] || [])];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Get token
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      // Prepare data
      const jobData = { ...formData };
      
      // Format deadline as ISO string if present
      if (jobData.applicationDeadline) {
        const deadline = new Date(jobData.applicationDeadline);
        jobData.applicationDeadline = deadline.toISOString();
      }

      // Filter out empty array items
      jobData.responsibilities = jobData.responsibilities?.filter(item => item.trim() !== '') || [];
      jobData.requirements = jobData.requirements?.filter(item => item.trim() !== '') || [];
      jobData.benefits = jobData.benefits?.filter(item => item.trim() !== '') || [];

      // API endpoint and method based on if editing or creating
      const url = isEdit ? `/api/jobs/${job.id}` : '/api/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save job');
      }

      await response.json();

      if (isEdit) {
        setSuccess('Job updated successfully!');
      } else {
        setSuccess('Job created successfully!');
        // Reset form after creating new job
        setFormData({ ...initialJobState });
      }

      // Redirect after short delay
      setTimeout(() => {
        router.push('/admin/jobs');
      }, 1500);
    } catch (err) {
      console.error('Error saving job:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded-md">
          <p>{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-white/90 mb-2">
            Job Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block text-white/90 mb-2">
            Department <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-white/90 mb-2">
            Location <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label htmlFor="type" className="block text-white/90 mb-2">
            Job Type <span className="text-red-400">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type || 'Full-time'}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-white/90 mb-2">
            Experience <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience || ''}
            onChange={handleInputChange}
            placeholder="e.g., 3-5 years"
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            required
          />
        </div>

        {/* Salary Range */}
        <div>
          <label htmlFor="salary" className="block text-white/90 mb-2">
            Salary Range
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary || ''}
            onChange={handleInputChange}
            placeholder="e.g., ₹20-30 LPA"
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label htmlFor="applicationDeadline" className="block text-white/90 mb-2">
            Application Deadline
          </label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={formData.applicationDeadline || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive === true}
            onChange={handleCheckboxChange}
            className="w-5 h-5 bg-white/10 border border-white/20 rounded focus:ring-dzdx-blue"
          />
          <label htmlFor="isActive" className="ml-2 text-white/90">
            Active Job Listing
          </label>
        </div>
      </div>

      {/* Job Description */}
      <div>
        <label htmlFor="description" className="block text-white/90 mb-2">
          Job Description <span className="text-red-400">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          rows={6}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
          required
        ></textarea>
      </div>

      {/* Responsibilities */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-white/90">
            Responsibilities <span className="text-red-400">*</span>
          </label>
          <button
            type="button"
            onClick={() => addArrayItem('responsibilities')}
            className="text-dzdx-blue hover:text-dzdx-light-blue text-sm"
          >
            <i className="fas fa-plus mr-1"></i> Add Item
          </button>
        </div>
        {formData.responsibilities?.map((responsibility, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={responsibility}
              onChange={(e) => handleArrayInputChange(index, e.target.value, 'responsibilities')}
              className="flex-1 px-4 py-2 rounded-l-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, 'responsibilities')}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-r-md transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Requirements */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-white/90">
            Requirements <span className="text-red-400">*</span>
          </label>
          <button
            type="button"
            onClick={() => addArrayItem('requirements')}
            className="text-dzdx-blue hover:text-dzdx-light-blue text-sm"
          >
            <i className="fas fa-plus mr-1"></i> Add Item
          </button>
        </div>
        {formData.requirements?.map((requirement, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={requirement}
              onChange={(e) => handleArrayInputChange(index, e.target.value, 'requirements')}
              className="flex-1 px-4 py-2 rounded-l-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, 'requirements')}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-r-md transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-white/90">Benefits</label>
          <button
            type="button"
            onClick={() => addArrayItem('benefits')}
            className="text-dzdx-blue hover:text-dzdx-light-blue text-sm"
          >
            <i className="fas fa-plus mr-1"></i> Add Item
          </button>
        </div>
        {formData.benefits?.map((benefit, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={benefit}
              onChange={(e) => handleArrayInputChange(index, e.target.value, 'benefits')}
              className="flex-1 px-4 py-2 rounded-l-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, 'benefits')}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-r-md transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push('/admin/jobs')}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 btn-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Saving...
            </div>
          ) : isEdit ? (
            'Update Job'
          ) : (
            'Create Job'
          )}
        </button>
      </div>
    </form>
  );
};

export default JobForm;