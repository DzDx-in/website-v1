'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import EarthBackground from '@/components/EarthBackground';

// TypeScript types
type Job = {
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
}

type ApplicationForm = {
  fullName: string;
  email: string;
  phone: string;
  resumeLink: string;
  coverLetter: string;
  portfolio?: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ApplicationForm>({
    fullName: '',
    email: '',
    phone: '',
    resumeLink: '',
    coverLetter: '',
    portfolio: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    // Fetch job data from API
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          // Job not found, redirect to listings
          setTimeout(() => router.push('/jobs'), 3000);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        // Job not found or error, redirect to listings
        setTimeout(() => router.push('/jobs'), 3000);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, router]);

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being typed in
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) 
      errors.fullName = "Full name is required";
    
    if (!formData.email.trim()) 
      errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Please enter a valid email address";
    
    if (!formData.phone.trim()) 
      errors.phone = "Phone number is required";
    
    if (!formData.resumeLink.trim()) 
      errors.resumeLink = "Resume link is required";
    
    if (!formData.coverLetter.trim()) 
      errors.coverLetter = "Cover letter is required";
      
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Check if job is null - this prevents the TypeScript errors
    if (!job) {
      alert("Error: Job information is not available. Please try again later.");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Submit application via API
      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        ...formData
      };
      
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      // Success!
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        resumeLink: '',
        coverLetter: '',
        portfolio: ''
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <EarthBackground />
        
        {/* Black overlay with 30% opacity */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-5">
          <div className="animate-fade-in text-center">
            <div className="spinner mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-white">Loading job details...</h2>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="relative min-h-screen">
        <EarthBackground />
        
        {/* Black overlay with 30% opacity */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-5">
          <div className="animate-fade-in text-center max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Job Not Found</h2>
            <p className="text-white/80 mb-6">
              The job position you are looking for does not exist or has been removed.
              Redirecting you to the jobs listing page...
            </p>
            <Link 
              href="/jobs"
              className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-md"
            >
              View All Jobs
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      
      {/* Black overlay with 30% opacity */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <main className="relative z-20 flex flex-col min-h-screen px-5 py-16">
        <div className="max-w-4xl mx-auto w-full animate-fade-in">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/new_main.svg"
                alt="DZDX Solutions Logo"
                width={150}
                height={150}
                priority
                className="mx-auto"
              />
            </Link>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/jobs"
              className="inline-flex items-center text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to All Jobs
            </Link>
          </div>
          
          {/* Job Header */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow-strong">
              {job.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-dzdx-blue/30 text-dzdx-blue">
                {job.department}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90">
                <i className="fas fa-map-marker-alt mr-1"></i>
                {job.location}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90">
                <i className="fas fa-briefcase mr-1"></i>
                {job.type}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90">
                <i className="fas fa-user-clock mr-1"></i>
                {job.experience}
              </span>
              {job.salary && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90">
                  <i className="fas fa-money-bill-wave mr-1"></i>
                  {job.salary}
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap justify-between items-center text-sm text-white/70">
              <div>
                <i className="far fa-calendar-alt mr-1"></i>
                Posted: {formatDate(job.postedDate)}
              </div>
              {job.applicationDeadline && (
                <div>
                  <i className="fas fa-hourglass-half mr-1"></i>
                  Apply by: {formatDate(job.applicationDeadline)}
                </div>
              )}
            </div>
          </div>
          
          {/* Job Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-dzdx-blue mb-4">
                  About the Role
                </h2>
                <p className="text-white/90 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </section>
              
              {/* Responsibilities */}
              <section className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-dzdx-blue mb-4">
                  Responsibilities
                </h2>
                <ul className="text-white/90 space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-dzdx-blue mt-1 mr-3"></i>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Requirements */}
              <section className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-dzdx-blue mb-4">
                  Requirements
                </h2>
                <ul className="text-white/90 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-dzdx-blue mt-1 mr-3"></i>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <section className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-dzdx-blue mb-4">
                    Benefits
                  </h2>
                  <ul className="text-white/90 space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-gift text-dzdx-blue mt-1 mr-3"></i>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
            
            {/* Application Form - Side Column */}
            <div className="lg:col-span-1">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 sticky top-6">
                {submitSuccess ? (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                      <i className="fas fa-check-circle text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Application Submitted!</h3>
                    <p className="text-white/80 mb-6">
                      Thank you for your interest in joining DZDX Solutions. We&apos;ll review your application and get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2 btn-primary text-white font-semibold rounded-md"
                    >
                      Apply to Another Position
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-4 text-center">
                      Apply for this Position
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-white/80 mb-1 text-sm">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                          placeholder="Your full name"
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-sm text-red-400">{formErrors.fullName}</p>
                        )}
                      </div>
                      
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-white/80 mb-1 text-sm">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                          placeholder="your.email@example.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                        )}
                      </div>
                      
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-white/80 mb-1 text-sm">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                          placeholder="Your phone number"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>
                        )}
                      </div>
                      
                      {/* Resume Link */}
                      <div>
                        <label htmlFor="resumeLink" className="block text-white/80 mb-1 text-sm">
                          Resume Link *
                        </label>
                        <input
                          type="url"
                          id="resumeLink"
                          name="resumeLink"
                          value={formData.resumeLink}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                          placeholder="Google Drive or Dropbox link"
                        />
                        {formErrors.resumeLink && (
                          <p className="mt-1 text-sm text-red-400">{formErrors.resumeLink}</p>
                        )}
                      </div>
                      
                      {/* Portfolio (Optional) */}
                      <div>
                        <label htmlFor="portfolio" className="block text-white/80 mb-1 text-sm">
                          Portfolio URL (Optional)
                        </label>
                        <input
                          type="url"
                          id="portfolio"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                          placeholder="Your personal website or GitHub"
                        />
                      </div>
                      
                      {/* Cover Letter */}
                      <div>
                        <label htmlFor="coverLetter" className="block text-white/80 mb-1 text-sm">
                          Why are you interested in this role? *
                        </label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue resize-none"
                          placeholder="Share why you&apos;re a good fit for this position"
                        ></textarea>
                        {formErrors.coverLetter && (
                          <p className="mt-1 text-sm text-red-400">{formErrors.coverLetter}</p>
                        )}
                      </div>
                      
                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-6 py-3 btn-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            Submitting...
                          </div>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane mr-2"></i>
                            Submit Application
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Company Info */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-dzdx-blue mb-4">
              About DZDX Solutions
            </h2>
            <p className="text-white/90 mb-4">
              DZDX Solutions is a dynamic technology company focused on delivering innovative software solutions. We&apos;re a team of passionate engineers, designers, and problem solvers committed to building products that make a difference.
            </p>
            <p className="text-white/90">
              Join us and be part of our mission to compile innovation and deliver exceptional solutions.
            </p>
          </div>
          
          {/* Back to Jobs Button */}
          <div className="text-center">
            <Link 
              href="/jobs"
              className="inline-block px-6 py-3 bg-black/30 hover:bg-black/40 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue transition-colors duration-300"
            >
              View All Open Positions
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}