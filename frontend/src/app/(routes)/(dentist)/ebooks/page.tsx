'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useQuery } from '@tanstack/react-query';
import { EbookService } from '@/service/ebook.service';
import { toast } from 'sonner';

// Download Icon component
const DownloadIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

// Book Icon component
const BookIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

// Star Rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="text-sm text-gray-600 ml-1">({rating}.0)</span>
        </div>
    );
};

interface Ebook {
    id: number;
    title: string;
    author: string;
    description: string;
    thumbnailImage: string;
    category: string;
    pages: number;
    rating: number;
    downloads: number;
    fileSize: string;
    publishedYear: number;
    tags: string[];
    isPremium: boolean;
    price?: number;
    pdf: string;
}


const EbooksPage = () => {
    const [downloadingId, setDownloadingId] = useState<number | null>(null); const { data, isLoading } = useQuery({
        queryKey: ['ebooks'],
        queryFn: () => EbookService.getAllBooks(),
    });

    const handleDownload = async (ebook: Ebook) => {
        setDownloadingId(ebook.id);
        console.log({ ebook });
        try {
            const response = await fetch(ebook.pdf);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();

            // Create a blob URL
            const blobUrl = window.URL.createObjectURL(blob);

            // Create download link
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${ebook.title.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Download failed. Please try again.');
        } finally {
            setDownloadingId(null);
        }
    };
    if (isLoading) {
        return <div>Loading...</div>
    }

    const { data: ebooksData } = data as { data: Ebook[] }
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Header Section */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <BookIcon size={48} className="text-primary-600 mr-3" />
                            <h1 className="text-4xl font-bold text-neutral-900">
                                Dental Ebooks Library
                            </h1>
                        </div>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Expand your knowledge with our comprehensive collection of dental ebooks.
                            From practice management to advanced clinical procedures.
                        </p>
                        <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-neutral-600">
                            <div className="flex items-center space-x-2">
                                <span className="text-primary-500">📚</span>
                                <span>6+ Ebooks Available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-500">✅</span>
                                <span>Expert Authors</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-yellow-500">⭐</span>
                                <span>High-Quality Content</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            {/* Ebooks Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ebooksData?.map((ebook) => (
                        <Card key={ebook.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <div className="relative">
                                <img
                                    src={ebook.thumbnailImage}
                                    alt={ebook.title}
                                    className="w-full h-64 object-cover rounded-t-xl"
                                />
                                {ebook.isPremium && (
                                    <div className="absolute top-3 right-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        Premium
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    {ebook.category}
                                </div>
                            </div>

                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold text-neutral-900 line-clamp-2">
                                    {ebook.title}
                                </CardTitle>

                            </CardHeader>

                            <CardContent className="pt-0">
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                                    {ebook.description}
                                </p>




                                {/* Tags */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {ebook.tags.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Price and Download Button */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        {ebook.isPremium ? (
                                            <span className="text-lg font-bold text-primary-600">
                                                ₹{ebook.price}
                                            </span>
                                        ) : (
                                            <span className="text-lg font-bold text-green-600">
                                                Free
                                            </span>
                                        )}
                                    </div>
                                    <Button
                                        onClick={() => handleDownload(ebook)}
                                        disabled={downloadingId === ebook.id}
                                        variant={ebook.isPremium ? "default" : "secondary"}
                                        size="sm"
                                        className="flex items-center space-x-2"
                                        loading={downloadingId === ebook.id}
                                    >
                                        {downloadingId === ebook.id ? (
                                            <>
                                                <span>Downloading...</span>
                                            </>
                                        ) : (
                                            <>
                                                <DownloadIcon size={16} />
                                                <span>Download</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>                        </Card>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default EbooksPage;