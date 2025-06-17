import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Blog } from '@/types/blog';
import { BlogsService } from '@/service/blog.service';

interface BlogDetailProps {
    blog?: Blog;
    slug?: string;
    className?: string;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog: initialBlog, slug, className = '' }) => {
    const [blog, setBlog] = useState<Blog | null>(initialBlog || null);
    const [loading, setLoading] = useState(!initialBlog);
    const [error, setError] = useState<string | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        if (!initialBlog && slug) {
            fetchBlog();
        }
        if (blog) {
            fetchRelatedBlogs();
        }
    }, [slug, blog?.id]);

    const fetchBlog = async () => {
        if (!slug) return;

        try {
            setLoading(true);
            setError(null);
            const response = await BlogsService.getBlogBySlug(slug);
            setBlog(response.data);
        } catch (err) {
            setError('Blog not found or failed to load.');
            console.error('Error fetching blog:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedBlogs = async () => {
        if (!blog) return;

        try {
            const response = await BlogsService.getAllBlogs({
                limit: 3,
                category: blog.category,
                status: 'PUBLISHED'
            });
            // Filter out current blog
            const filtered = response.data.filter(b => b.id !== blog.id);
            setRelatedBlogs(filtered.slice(0, 3));
        } catch (err) {
            console.error('Error fetching related blogs:', err);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const readingTime = blog ? Math.ceil(blog.content.length / 1000) : 0;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="text-center py-20">
                <div className="text-red-600 mb-4">{error || 'Blog not found'}</div>
                <Link
                    href="/blogs"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <article className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {/* Breadcrumb */}
            <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                    <li>
                        <Link href="/blogs" className="hover:text-blue-600 transition-colors">
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </li>
                    {blog.category && (
                        <>
                            <li>
                                <span className="text-gray-700">{blog.category}</span>
                            </li>
                            <li>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </li>
                        </>
                    )}
                    <li className="text-gray-700 truncate">{blog.title}</li>
                </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
                {blog.category && (
                    <div className="mb-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {blog.category}
                        </span>
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                {blog.excerpt && (
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        {blog.excerpt}
                    </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-gray-700">
                                {blog.author.firstName[0]}{blog.author.lastName[0]}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                {blog.author.firstName} {blog.author.lastName}
                            </p>
                            <p className="text-xs">{blog.author.role}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        <span>•</span>
                        <span>{readingTime} min read</span>
                        <span>•</span>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span>{blog.viewCount} views</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {blog.featuredImage && (
                <div className="mb-8">
                    <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
                <div
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    className="text-gray-800 leading-relaxed"
                />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Engagement Actions */}
            <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 mb-12">
                <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{blog.likeCount}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        <span>Share</span>
                    </button>
                </div>

                <div className="text-sm text-gray-500">
                    Last updated: {formatDate(blog.updatedAt)}
                </div>
            </div>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedBlogs.map((relatedBlog) => (
                            <div key={relatedBlog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                                    {relatedBlog.featuredImage ? (
                                        <img
                                            src={relatedBlog.featuredImage}
                                            alt={relatedBlog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                        <Link
                                            href={`/blogs/${relatedBlog.slug}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {relatedBlog.title}
                                        </Link>
                                    </h4>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {relatedBlog.excerpt || relatedBlog.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Back to Blogs */}
            <div className="text-center">
                <Link
                    href="/blogs"
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Back to All Blogs</span>
                </Link>
            </div>
        </article>
    );
};

export default BlogDetail;
