// src/app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '@/lib/auth';
import { revalidateSitemap } from '@/lib/sitemap';
import { revalidatePath } from 'next/cache';

// Define the blog data file path
const dataFilePath = path.join(process.cwd(), 'data', 'blog-posts.json');

// Define TypeScript interfaces
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  createdAt: string;
  updatedAt: string;
}

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Helper function to read blog posts data
const getBlogPostsData = (): BlogPost[] => {
  try {
    // Create directory if it doesn't exist
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Create file with empty array if it doesn't exist
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]));
      return [];
    }
    
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog posts data:', error);
    return [];
  }
};

// Helper function to write blog posts data
const writeBlogPostsData = (data: BlogPost[]): void => {
  try {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing blog posts data:', error);
  }
};

// GET handler - Get all blog posts (public endpoint)
export async function GET(req: NextRequest) {
  try {
    const posts = getBlogPostsData();
    
    // For public endpoint, only return published posts
    const url = new URL(req.url);
    const isAdminRequest = url.searchParams.get('admin') === 'true';
    
    if (isAdminRequest) {
      // Check if the request is authenticated for admin view
      const authResult = await isAuthenticated(req);
      if (!authResult.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // Return all posts for admin
      return NextResponse.json(posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    } else {
      // Return only published posts for public view, sorted by publish date
      const publishedPosts = posts
        .filter(post => post.isPublished)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      return NextResponse.json(publishedPosts);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST handler - Create a new blog post (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(req);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const postData = await req.json();
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content'];
    for (const field of requiredFields) {
      if (!postData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    // Generate slug and ensure uniqueness
    const posts = getBlogPostsData();
    const baseSlug = generateSlug(postData.title);
    let slug = baseSlug;
    let counter = 1;
    
    while (posts.some(post => post.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Create a new blog post with generated ID and current date
    const newPost: BlogPost = {
      id: uuidv4(),
      title: postData.title,
      slug,
      excerpt: postData.excerpt,
      content: postData.content,
      featuredImage: postData.featuredImage || '',
      publishedAt: postData.isPublished ? new Date().toISOString() : '',
      isPublished: postData.isPublished || false,
      seoTitle: postData.seoTitle || postData.title,
      seoDescription: postData.seoDescription || postData.excerpt,
      keywords: postData.keywords || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    posts.push(newPost);
    writeBlogPostsData(posts);
    
    // Revalidate sitemap and blog pages if post is published
    if (newPost.isPublished) {
      revalidatePath('/blog');
      revalidatePath('/sitemap.xml');
      // Notify search engines about sitemap update
      revalidateSitemap().catch(console.error);
    }
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
