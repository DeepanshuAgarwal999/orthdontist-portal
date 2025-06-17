import React from 'react';
import Link from 'next/link';
import { Blog } from '@/types/blog';

interface BlogCardProps {
    blog: Blog;
    className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, className = '' }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const readingTime = Math.ceil(blog.content.length / 1000); // Rough estimate

    return (
        <article className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg ${className}`}>
            {/* Featured Image */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                {blog.featuredImage ? (
                    <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-white text-center">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-medium">{blog.title}</p>
                        </div>
                    </div>
                )}

                {/* Category Badge */}
                {blog.category && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {blog.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-medium text-gray-700">
                                {blog.author.firstName[0]}{blog.author.lastName[0]}
                            </span>
                        </div>
                        <span>{blog.author.firstName} {blog.author.lastName}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{readingTime} min read</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/blogs/${blog.slug}`}>
                        {blog.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                </p>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                        {blog.tags.length > 3 && (
                            <span className="text-gray-500 text-xs">+{blog.tags.length - 3} more</span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span>{blog.viewCount}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>{blog.likeCount}</span>
                        </div>
                    </div>

                    <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                        Read More →
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
