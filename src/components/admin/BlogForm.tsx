// src/components/admin/BlogForm.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/app/api/blog/route';

interface BlogFormProps {
  post?: Partial<BlogPost>;
  isEdit?: boolean;
}

const initialPostState: Partial<BlogPost> = {
  title: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  seoTitle: '',
  seoDescription: '',
  keywords: [],
  isPublished: false
};

const BlogForm = ({ post = {}, isEdit = false }: BlogFormProps) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({ ...initialPostState });
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  // Populate form with post data if editing
  useEffect(() => {
    if (isEdit && post) {
      setFormData(post);
    }
  }, [isEdit, post]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Auto-populate SEO fields if empty
    if (name === 'title' && !formData.seoTitle) {
      setFormData(prev => ({ ...prev, seoTitle: value }));
    }
    if (name === 'excerpt' && !formData.seoDescription) {
      setFormData(prev => ({ ...prev, seoDescription: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.keywords?.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        keywords: [...(formData.keywords || []), keywordInput.trim()]
      });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const updatedKeywords = [...(formData.keywords || [])];
    updatedKeywords.splice(index, 1);
    setFormData({ ...formData, keywords: updatedKeywords });
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown: string): string => {
    return markdown
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-dzdx-blue mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-dzdx-blue mt-10 mb-6">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-white mt-12 mb-8">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/30 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-sm text-green-400">$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-black/20 px-2 py-1 rounded text-sm text-green-400">$1</code>')
      .replace(/^\* (.*$)/gm, '<li class="mb-2">• $1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-dzdx-blue hover:text-dzdx-light-blue underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-6 max-w-full h-auto" />')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-dzdx-blue pl-4 italic text-white/80 my-4">$1</blockquote>')
      .replace(/\n\n/g, '</p><p class="text-white/90 leading-relaxed mb-4">')
      .replace(/\n/g, '<br />');
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
      const postData = { ...formData };

      // API endpoint and method based on if editing or creating
      const url = isEdit ? `/api/blog/${post.slug}` : '/api/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save blog post');
      }

      // const savedPost = await response.json();

      if (isEdit) {
        setSuccess('Blog post updated successfully!');
      } else {
        setSuccess('Blog post created successfully!');
        // Reset form after creating new post
        setFormData({ ...initialPostState });
        setKeywordInput('');
      }

      // Redirect after short delay
      setTimeout(() => {
        router.push('/admin/blog');
      }, 1500);
    } catch (err) {
      console.error('Error saving blog post:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-white/90 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue text-lg font-medium"
                placeholder="Enter blog post title..."
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-white/90 mb-2">
                Excerpt <span className="text-red-400">*</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt || ''}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue resize-none"
                placeholder="Brief description of the blog post..."
                required
              ></textarea>
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="content" className="text-white/90">
                  Content <span className="text-red-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>

              {showPreview ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Editor */}
                  <div>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content || ''}
                      onChange={handleInputChange}
                      rows={20}
                      className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue resize-none font-mono text-sm"
                      placeholder="Write your blog post content in Markdown..."
                      required
                    ></textarea>
                  </div>
                  
                  {/* Preview */}
                  <div className="bg-black/20 rounded-md p-4 max-h-96 overflow-y-auto">
                    <h4 className="text-white/70 text-sm mb-4">Preview:</h4>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: `<p class="text-white/90 leading-relaxed mb-4">${markdownToHtml(formData.content || '')}</p>`
                      }}
                    />
                  </div>
                </div>
              ) : (
                <textarea
                  id="content"
                  name="content"
                  value={formData.content || ''}
                  onChange={handleInputChange}
                  rows={20}
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue resize-none font-mono text-sm"
                  placeholder="Write your blog post content in Markdown..."
                  required
                ></textarea>
              )}

              {/* Markdown Help */}
              <div className="mt-2 text-xs text-white/60">
                <strong>Markdown supported:</strong> # Headers, **bold**, *italic*, `code`, [links](url), ![images](url), &gt; quotes
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side (1/3) */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Publish Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished === true}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 bg-white/10 border border-white/20 rounded focus:ring-dzdx-blue"
                  />
                  <label htmlFor="isPublished" className="ml-2 text-white/90">
                    Publish immediately
                  </label>
                </div>
                
                <p className="text-xs text-white/60">
                  {formData.isPublished 
                    ? 'This post will be visible to the public' 
                    : 'This post will be saved as a draft'
                  }
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Featured Image</h3>
              
              <div>
                <label htmlFor="featuredImage" className="block text-white/90 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue"
                  placeholder="https://example.com/image.jpg"
                />
                
                {formData.featuredImage && (
                  <div className="mt-3 relative w-full h-32 bg-black/20 rounded-md overflow-hidden">
                    <img
                      src={formData.featuredImage}
                      alt="Featured image preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Keywords</h3>
              
              <div>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={handleKeywordKeyPress}
                    className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue text-sm"
                    placeholder="Add keyword..."
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-3 py-2 bg-dzdx-blue hover:bg-dzdx-light-blue text-white rounded-md transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
                
                {formData.keywords && formData.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-dzdx-blue/20 text-dzdx-blue text-xs rounded-full"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(index)}
                          className="ml-1 text-xs hover:text-red-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="seoTitle" className="block text-white/90 mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    id="seoTitle"
                    name="seoTitle"
                    value={formData.seoTitle || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue text-sm"
                    placeholder="Custom SEO title..."
                  />
                  <p className="text-xs text-white/60 mt-1">
                    {(formData.seoTitle || '').length}/60 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="seoDescription" className="block text-white/90 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={formData.seoDescription || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-dzdx-blue text-sm resize-none"
                    placeholder="Meta description for search engines..."
                  ></textarea>
                  <p className="text-xs text-white/60 mt-1">
                    {(formData.seoDescription || '').length}/160 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 btn-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-dzdx-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : isEdit ? (
                  'Update Post'
                ) : (
                  'Create Post'
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/admin/blog')}
                className="w-full px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;