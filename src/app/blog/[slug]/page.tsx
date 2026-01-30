// src/app/blog/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';
import BlogNavbar from '@/components/Layout/BlogNavbar';
import Footer from '@/components/Layout/Footer';
import { BlogPost } from '@/app/api/blog/route';

// Simple markdown to HTML converter (basic implementation)
const markdownToHtml = (markdown: string): string => {
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-dzdx-blue mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-dzdx-blue mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-white mt-12 mb-8">$1</h1>')
    
    // Bold and Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/30 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm text-green-400">$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-black/20 px-2 py-1 rounded text-sm text-green-400">$1</code>')
    
    // Lists
    .replace(/^\* (.*$)/gm, '<li class="mb-2">• $1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="mb-2">$1</li>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-dzdx-blue hover:text-dzdx-light-blue underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-6 max-w-full h-auto" />')
    
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-dzdx-blue pl-4 italic text-white/80 my-4">$1</blockquote>')
    
    // Line breaks
    .replace(/\n\n/g, '</p><p class="text-white/90 leading-relaxed mb-4">')
    .replace(/\n/g, '<br />');
};

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const params = useParams();
  // const router = useRouter();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) return;

    // Fetch blog post
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
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
  }, [slug]);

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time
  const getReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  };

  // Share functions
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this article: ${post?.title}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <EarthBackground />
        <BlogNavbar />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-5">
          <div className="animate-fade-in text-center">
            <div className="spinner mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-white">Loading article...</h2>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="relative min-h-screen">
        <EarthBackground />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-5">
          <div className="animate-fade-in text-center max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {error === 'Blog post not found' ? 'Article Not Found' : 'Error Loading Article'}
            </h2>
            <p className="text-white/80 mb-6">
              {error === 'Blog post not found' 
                ? 'The article you are looking for does not exist or has been removed.'
                : 'Something went wrong while loading the article. Please try again.'
              }
            </p>
            <Link 
              href="/blog"
              className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-md"
            >
              Back to Blog
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
      
      <main className="relative z-20 pt-20 pb-16 px-5">
        <article className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center text-dzdx-blue hover:text-dzdx-light-blue transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center text-sm text-white/60 mb-4">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span className="mx-2">•</span>
              <span>{getReadingTime(post.content)}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-shadow-strong leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Keywords Tags */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-dzdx-blue/20 text-dzdx-blue text-sm rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: `<p class="text-white/90 leading-relaxed mb-4">${markdownToHtml(post.content)}</p>`
              }}
            />
          </div>

          {/* Social Share */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={shareOnTwitter}
                className="flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md transition-colors"
              >
                <i className="fab fa-twitter mr-2"></i>
                Twitter
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-md transition-colors"
              >
                <i className="fab fa-linkedin mr-2"></i>
                LinkedIn
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              >
                <i className="fas fa-link mr-2"></i>
                Copy Link
              </button>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interested in AI-Powered News Analysis?
            </h3>
            <p className="text-white/80 mb-6">
              Join thousands of people waiting for The Real Feed - our revolutionary news analysis platform.
            </p>
            <Link
              href="/therealfeed"
              className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
            >
              Join The Real Feed Waitlist
            </Link>
          </div>
        </article>
      </main>

      {/* SEO Meta Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.featuredImage || "https://cdn.dzdx.in/favicon.svg",
            "author": {
              "@type": "Organization",
              "name": "DZDX Solutions"
            },
            "publisher": {
              "@type": "Organization",
              "name": "DZDX Solutions",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cdn.dzdx.in/favicon.svg"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://dzdx.in/blog/${post.slug}`
            }
          })
        }}
      />
      
      <Footer />
    </div>
  );
}