import React from 'react';

interface BlogSkeletonProps {
    count?: number;
    className?: string;
}

const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ count = 1, className = '' }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    {/* Image Skeleton */}
                    <div className="h-48 bg-gray-300"></div>

                    {/* Content Skeleton */}
                    <div className="p-6">
                        {/* Meta Information Skeleton */}
                        <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                            <div className="flex-1">
                                <div className="h-3 bg-gray-300 rounded w-1/3 mb-1"></div>
                                <div className="h-2 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>

                        {/* Title Skeleton */}
                        <div className="space-y-2 mb-3">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>

                        {/* Excerpt Skeleton */}
                        <div className="space-y-2 mb-4">
                            <div className="h-3 bg-gray-300 rounded w-full"></div>
                            <div className="h-3 bg-gray-300 rounded w-full"></div>
                            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                        </div>

                        {/* Tags Skeleton */}
                        <div className="flex space-x-2 mb-4">
                            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                            <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                            <div className="h-6 bg-gray-300 rounded-full w-14"></div>
                        </div>

                        {/* Footer Skeleton */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex space-x-4">
                                <div className="h-4 bg-gray-300 rounded w-12"></div>
                                <div className="h-4 bg-gray-300 rounded w-12"></div>
                            </div>
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogSkeleton;
