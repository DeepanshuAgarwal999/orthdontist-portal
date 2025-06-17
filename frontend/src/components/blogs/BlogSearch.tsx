import React, { useState, useCallback } from 'react';
import { BlogQueryParams } from '@/types/blog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BlogsService } from '@/service/blog.service';

interface BlogSearchProps {
    onSearch: (params: BlogQueryParams) => void;
    loading?: boolean;
    className?: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch, loading = false, className = '' }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('publishedAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const queryClient = useQueryClient()

    const handleSearch = useCallback((e?: React.FormEvent) => {
        console.log('handleSearch called', { e: e?.type, searchQuery, category, sortBy, sortOrder });
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        onSearch({
            search: searchQuery.trim() || undefined,
            category: category || undefined,
            sortBy,
            sortOrder,
            page: 1,
            status: 'PUBLISHED'
        });
    }, [searchQuery, category, sortBy, sortOrder, onSearch]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setCategory('');
        setSortBy('publishedAt');
        setSortOrder('desc');
        onSearch({
            page: 1,
            status: 'PUBLISHED',
            sortBy: 'publishedAt',
            sortOrder: 'desc'
        });
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
    };
    const { data: categories = { data: [] }, isLoading } = useQuery({ queryKey: ['blog-categories'], queryFn: BlogsService.getBlogCategories })

    const hasActiveFilters = searchQuery || category || sortBy !== 'publishedAt' || sortOrder !== 'desc';
    ``
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search blogs by title, content, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                    <div className="absolute left-3 top-3">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-1.5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Search'
                        )}
                    </button>
                </div>
            </form>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Categories</option>
                        {categories?.data?.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By Filter */}
                <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                    </label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="publishedAt">Date Published</option>
                        <option value="title">Title</option>
                        <option value="viewCount">Views</option>
                        <option value="likeCount">Likes</option>
                        <option value="updatedAt">Last Updated</option>
                    </select>
                </div>

                {/* Sort Order Filter */}
                <div>
                    <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                    </label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>
            </div>            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    {loading && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span>Apply Filters</span>
                </button>

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Clear All Filters
                    </button>
                )}

                {/* Active Filters Display */}
                {(searchQuery || category) && (
                    <div className="flex flex-wrap gap-2 ml-auto">
                        {searchQuery && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                Search: "{searchQuery}"
                            </span>
                        )}
                        {category && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Category: {category}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogSearch;
