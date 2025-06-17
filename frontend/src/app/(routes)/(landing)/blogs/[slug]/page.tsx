'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import BlogDetail from '@/components/blogs/BlogDetail';

const BlogPage = () => {
    const params = useParams();
    const slug = params?.slug as string;

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <BlogDetail slug={slug} />
        </div>
    );
};

export default BlogPage;
