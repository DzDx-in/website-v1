// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/app/api/blog/route';

// Force dynamic generation - sitemap will regenerate on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Define Job type interface based on your actual data structure
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  isActive: boolean;
  postedDate: string;
}

// Helper function to read blog posts
const getBlogPosts = (): BlogPost[] => {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'blog-posts.json');
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const posts = JSON.parse(data);
    // Only return published posts
    return posts.filter((post: BlogPost) => post.isPublished);
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error);
    return [];
  }
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dzdx.in'; // Replace with your actual domain
  
  // Get blog posts for calculating latest update
  const blogPosts = getBlogPosts();

  // Calculate the most recent blog update date
  const latestBlogUpdate = blogPosts.length > 0
    ? new Date(Math.max(...blogPosts.map(post => new Date(post.updatedAt).getTime())))
    : new Date();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogUpdate, // Use actual latest blog update date
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/the-real-feed`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic blog posts
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Get job posts
  const getJobPosts = (): Job[] => {
    try {
      const jobsFilePath = path.join(process.cwd(), 'data', 'jobs.json');
      if (!fs.existsSync(jobsFilePath)) {
        return [];
      }
      const data = fs.readFileSync(jobsFilePath, 'utf8');
      const jobs = JSON.parse(data);
      return jobs.filter((job: Job) => job.isActive);
    } catch (error) {
      console.error('Error reading jobs for sitemap:', error);
      return [];
    }
  };

  const jobs = getJobPosts();
  const jobPages = jobs.map((job: Job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Combine all pages
  return [...staticPages, ...blogPages, ...jobPages];
}
