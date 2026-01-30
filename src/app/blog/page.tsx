// src/app/blog/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EarthBackground from '@/components/EarthBackground';
import BlogNavbar from '@/components/Layout/BlogNavbar';
import Footer from '@/components/Layout/Footer';
import { BlogPost } from '@/app/api/blog/route';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch blog posts
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
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
  }, []);

  // Format date to human-readable form
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time (rough estimate: 200 words per minute)
  const getReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  };

  return (
    <div className="relative min-h-screen">
      <EarthBackground />
      <BlogNavbar />
      
      {/* Black overlay with 30% opacity */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <main className="relative z-20 pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-strong">
              DZDX Blog
            </h1>
            <p className="text-xl md:text-2xl text-dzdx-blue font-light text-shadow-default max-w-3xl mx-auto">
              Insights on AI, news analysis, and the future of media literacy
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md max-w-md mx-auto">
              <p>{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 text-center max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
              <p className="text-white/70">
                We&apos;re working on some amazing content. Check back soon!
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-black/30 transition-all duration-300 border border-transparent hover:border-dzdx-blue/30 group"
                >
                  {/* Image */}
                  <div className="w-full h-64 md:h-80 bg-black/20 overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={500}
                        height={0}
                      className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-dzdx-blue/20 to-dzdx-blue/40 flex items-center justify-center">
                        <i className="fas fa-newspaper text-6xl text-dzdx-blue/60"></i>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Below */}
                  <div className="p-8">
                    {/* Meta Information */}
                    <div className="flex items-center justify-center text-sm text-white/60 mb-4">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{getReadingTime(post.content)}</span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-dzdx-blue transition-colors leading-tight text-center">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-white/80 mb-6 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                      {post.excerpt}
                    </p>
                    
                    {/* Keywords Tags */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {post.keywords.slice(0, 5).map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-dzdx-blue/20 text-dzdx-blue text-sm rounded-full font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Read More Link */}
                    <div className="text-center">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-dzdx-blue hover:text-dzdx-light-blue transition-colors font-medium text-lg"
                      >
                        Read full article
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Call-to-Action Section */}
          {!loading && posts.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Stay Updated
                </h3>
                <p className="text-white/80 mb-6">
                  Get notified when we publish new insights about AI, news analysis, and media literacy.
                </p>
                <Link
                  href="/therealfeed"
                  className="inline-block px-6 py-3 btn-primary text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                >
                  Join The Real Feed Waitlist
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}