'use client'

import React, { useState } from 'react';
import { BlogsResponse, BlogQueryParams } from '@/types/blog';
import { BlogsService } from '@/service/blog.service';
import BlogCard from './BlogCard';
import BlogSkeleton from './BlogSkeleton';
import BlogSearch from './BlogSearch';
import Pagination from '@/components/shared/Pagination';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface BlogListProps {
    showSearch?: boolean;
    showFilters?: boolean;
    itemsPerPage?: number;
    className?: string;
}

const BlogList: React.FC<BlogListProps> = ({
    showSearch = true,
    showFilters = true,
    itemsPerPage = 9,
    className = ''
}) => {
    const [filters, setFilters] = useState<BlogQueryParams>({
        page: 1,
        limit: itemsPerPage,
        status: 'PUBLISHED',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });
    const { data: blogsData, isLoading, error } = useQuery({
        queryKey: ['blogs', JSON.stringify(filters)],
        queryFn: () => BlogsService.getAllBlogs(filters),
    })
    const queryClient = useQueryClient()

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleSearchFilters = (newFilters: BlogQueryParams) => {
        const updatedFilters = { ...filters, ...newFilters, limit: itemsPerPage };
        setFilters(updatedFilters);

    };

    const retryFetch = () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }

    if (isLoading) {
        return (
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover the latest insights, tips, and stories from our dental experts.
                    </p>
                </div>
                <BlogSkeleton count={itemsPerPage} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <div className="text-red-600 mb-4">{error.message}</div>
                <button
                    onClick={retryFetch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Discover the latest insights, tips, and stories from our dental experts.
                    Stay informed about dental health, treatments, and industry innovations.
                </p>
            </div>

            {(showSearch || showFilters) && (
                <BlogSearch
                    onSearch={handleSearchFilters}
                    loading={isLoading}
                    className="mb-8"
                />
            )}
            {/* Results Info */}
            {blogsData && (
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        Showing {blogsData.data.length} of {blogsData.pagination.total} blogs
                    </p>
                    {isLoading && (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                    )}
                </div>
            )}

            {/* Blog Grid */}
            {blogsData && blogsData.data.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {blogsData.data.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={blogsData.pagination.page}
                        totalPages={blogsData.pagination.totalPages}
                        hasNextPage={blogsData.pagination.hasNextPage}
                        hasPrevPage={blogsData.pagination.hasPrevPage}
                        onPageChange={handlePageChange}
                        className="mb-8"
                    />
                </>
            ) : (
                <div className="text-center py-20">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                    <p className="text-gray-600">
                        Try adjusting your search terms or filters, or check back later for new content.
                    </p>
                </div>
            )}
        </div>
    );
};

export default BlogList;
