'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';

// This data will be replaced with API call later
const INITIAL_JOBS = [
  {
    id: "software-engineer-1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹20-30 LPA",
    postedDate: "2025-05-10T00:00:00Z",
    description: "We're looking for an experienced Software Engineer to join our team...",
    responsibilities: [
      "Design and implement scalable software solutions",
      "Lead technical projects from conception to deployment",
      "Collaborate with cross-functional teams to define and implement new features"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience with modern JavaScript frameworks",
      "Proficiency in React, Next.js, and TypeScript"
    ],
    benefits: [
      "Competitive salary and equity",
      "Health insurance",
      "Flexible work arrangements"
    ],
    applicationDeadline: "2025-06-30T00:00:00Z"
  },
  {
    id: "data-scientist-1",
    title: "Data Scientist",
    department: "AI & Analytics",
    location: "Kanpur, India",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹18-25 LPA",
    postedDate: "2025-05-15T00:00:00Z",
    description: "Join our data science team to build intelligent data-driven solutions...",
    responsibilities: [
      "Develop machine learning models to solve complex business problems",
      "Extract insights from large datasets",
      "Collaborate with engineering teams to implement ML solutions"
    ],
    requirements: [
      "Master's degree in Computer Science, Statistics or related field",
      "Experience with Python, TensorFlow, and PyTorch",
      "Strong background in statistical analysis and data visualization"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Learning budget"
    ],
    applicationDeadline: "2025-06-15T00:00:00Z"
  },
  {
    id: "product-manager-1",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    experience: "4-6 years",
    salary: "₹25-35 LPA",
    postedDate: "2025-05-20T00:00:00Z",
    description: "We're seeking a talented Product Manager to drive our product strategy...",
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Work closely with engineering, design, and marketing teams",
      "Analyze market trends and user feedback to inform product decisions"
    ],
    requirements: [
      "Bachelor's degree in a relevant field",
      "4+ years of product management experience",
      "Strong analytical and problem-solving skills"
    ],
    benefits: [
      "Competitive compensation package",
      "Health and wellness benefits",
      "Remote work options"
    ],
    applicationDeadline: "2025-07-10T00:00:00Z"
  },
  {
    id: "ui-ux-designer-1",
    title: "UI/UX Designer",
    department: "Design",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "2-5 years",
    postedDate: "2025-05-18T00:00:00Z",
    description: "Join our design team to create beautiful, intuitive user experiences...",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with product and engineering teams"
    ],
    requirements: [
      "Bachelor's degree in Design or related field",
      "Portfolio demonstrating strong UI/UX skills",
      "Experience with Figma, Sketch, or similar design tools"
    ],
    benefits: [
      "Competitive salary",
      "Creative environment",
      "Growth opportunities"
    ],
    applicationDeadline: "2025-06-30T00:00:00Z"
  },
  {
    id: "devops-engineer-1",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Kanpur, India",
    type: "Full-time",
    experience: "3-6 years",
    salary: "₹18-28 LPA",
    postedDate: "2025-05-12T00:00:00Z",
    description: "We're looking for a DevOps Engineer to build and maintain our cloud infrastructure...",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure on AWS/Azure",
      "Automate deployment processes"
    ],
    requirements: [
      "Experience with Docker, Kubernetes, and Terraform",
      "Strong knowledge of Linux/Unix systems",
      "Familiarity with monitoring and logging tools"
    ],
    benefits: [
      "Competitive salary",
      "Health benefits",
      "Remote work options"
    ],
    applicationDeadline: "2025-06-20T00:00:00Z"
  }
];

// Job types for TypeScript
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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: '',
    location: '',
    type: ''
  });

  // Derived state for filter options
  const departments = [...new Set(INITIAL_JOBS.map(job => job.department))];
  const locations = [...new Set(INITIAL_JOBS.map(job => job.location))];
  const jobTypes = [...new Set(INITIAL_JOBS.map(job => job.type))];

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter(job => {
    const departmentMatch = !filters.department || job.department === filters.department;
    const locationMatch = !filters.location || job.location === filters.location;
    const typeMatch = !filters.type || job.type === filters.type;
    
    return departmentMatch && locationMatch && typeMatch;
  });

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days ago
  const getDaysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      
      {/* Black overlay with 30% opacity */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <main className="relative z-20 flex flex-col min-h-screen px-5 py-16">
        <div className="max-w-6xl mx-auto w-full animate-fade-in">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/new_main.svg"
                alt="DZDX Solutions Logo"
                width={200}
                height={200}
                priority
                className="mx-auto"
              />
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-strong">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-dzdx-blue font-light mb-6 text-shadow-default max-w-3xl mx-auto">
              Explore opportunities to be part of something extraordinary at DZDX Solutions
            </p>
          </div>

          {/* Filters */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-dzdx-blue mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Department Filter */}
              <div>
                <label htmlFor="department" className="block text-white/80 mb-2">
                  Department
                </label>
                <select 
                  id="department"
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label htmlFor="location" className="block text-white/80 mb-2">
                  Location
                </label>
                <select 
                  id="location"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div>
                <label htmlFor="type" className="block text-white/80 mb-2">
                  Job Type
                </label>
                <select 
                  id="type"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                >
                  <option value="">All Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {loading ? 'Loading opportunities...' : 
                filteredJobs.length === 0 ? 'No positions matching your filters' :
                `${filteredJobs.length} Open Position${filteredJobs.length !== 1 ? 's' : ''}`
              }
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 text-center">
                <p className="text-white/80 mb-4">No job openings match your selected filters.</p>
                <button
                  onClick={() => setFilters({ department: '', location: '', type: '' })}
                  className="px-6 py-2 btn-primary text-white font-semibold rounded-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-6 hover:bg-black/30 transition-all duration-300 border border-transparent hover:border-dzdx-blue/30">
                  <div className="md:flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-dzdx-blue/20 text-dzdx-blue">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90">
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90">
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-white/70 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="text-sm text-white/60">
                        Posted: {getDaysAgo(job.postedDate)}
                        {job.applicationDeadline && (
                          <span className="ml-4">
                            Deadline: {formatDate(job.applicationDeadline)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link 
                        href={`/jobs/${job.id}`}
                        className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-block px-6 py-3 bg-black/30 hover:bg-black/40 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}