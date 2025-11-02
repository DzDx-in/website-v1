// src/app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '../route';
import { isAuthenticated } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { revalidateSitemap } from '@/lib/sitemap';

// Define the blog data file path
const dataFilePath = path.join(process.cwd(), 'data', 'blog-posts.json');

// Helper function to read blog posts data
const getBlogPostsData = (): BlogPost[] => {
  try {
    if (!fs.existsSync(dataFilePath)) {
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

// Helper function to extract slug from the request URL
const getSlugFromRequest = (request: NextRequest): string | null => {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1] || null;
};

// GET handler - Get a specific blog post by slug
export async function GET(request: NextRequest) {
  try {
    const slug = getSlugFromRequest(request);
    if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });

    const posts = getBlogPostsData();
    const post = posts.find(post => post.slug === slug);

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // For public requests, only return published posts
    const url = new URL(request.url);
    const isAdminRequest = url.searchParams.get('admin') === 'true';

    if (!isAdminRequest && !post.isPublished) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = getSlugFromRequest(request);
    if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });

    const postData = await request.json();
    const posts = getBlogPostsData();
    const postIndex = posts.findIndex(post => post.slug === slug);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const existingPost = posts[postIndex];
    const wasPublished = existingPost.isPublished;
    const willBePublished = postData.isPublished;

    // Update the post while preserving certain fields
    const updatedPost: BlogPost = {
      ...existingPost,
      ...postData,
      id: existingPost.id, // Ensure ID doesn't change
      slug: existingPost.slug, // Preserve original slug
      createdAt: existingPost.createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(),
      // Update published date only if publishing for the first time
      publishedAt: willBePublished && !wasPublished
        ? new Date().toISOString()
        : existingPost.publishedAt,
    };

    posts[postIndex] = updatedPost;
    writeBlogPostsData(posts);

    // Revalidate sitemap and blog pages if publication status changed
    if (wasPublished !== willBePublished || willBePublished) {
      revalidatePath('/blog', 'page');
      revalidatePath(`/blog/${slug}`, 'page');
      revalidatePath('/sitemap', 'page');
      // Notify search engines about sitemap update
      revalidateSitemap().catch(console.error);
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE handler - Delete a blog post (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await isAuthenticated(request);
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = getSlugFromRequest(request);
    if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });

    const posts = getBlogPostsData();
    const postIndex = posts.findIndex(post => post.slug === slug);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const deletedPost = posts[postIndex];

    // Remove the post
    posts.splice(postIndex, 1);
    writeBlogPostsData(posts);

    // Revalidate sitemap and blog pages if the deleted post was published
    if (deletedPost.isPublished) {
      revalidatePath('/blog', 'page');
      revalidatePath('/sitemap', 'page');
      // Notify search engines about sitemap update
      revalidateSitemap().catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
