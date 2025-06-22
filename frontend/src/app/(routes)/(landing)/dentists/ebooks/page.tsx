'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

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
    coverImage: string;
    category: string;
    pages: number;
    rating: number;
    downloads: number;
    fileSize: string;
    publishedYear: number;
    tags: string[];
    isPremium: boolean;
    price?: number;
    pdfUrl: string;
}

const ebooksData: Ebook[] = [
    {
        id: 1,
        title: "How to Build a 5 Lakh Practice",
        author: "Dr. Rajesh Kumar",
        description: "A comprehensive guide to building a successful dental practice from scratch. Learn proven strategies for patient acquisition, practice management, and revenue optimization.",
        coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        category: "Practice Management",
        pages: 150,
        rating: 5,
        downloads: 2840,
        fileSize: "12.5 MB",
        publishedYear: 2024,
        tags: ["Business", "Practice Growth", "Revenue"],
        isPremium: false,
        pdfUrl: "/ebooks/5-lakh-practice.pdf"
    },
    {
        id: 2,
        title: "Advanced Endodontic Techniques",
        author: "Dr. Priya Sharma",
        description: "Master the latest endodontic procedures with step-by-step guides, case studies, and expert insights. Includes modern rotary techniques and digital workflows.",
        coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop",
        category: "Clinical Procedures",
        pages: 220,
        rating: 5,
        downloads: 1850,
        fileSize: "25.8 MB",
        publishedYear: 2024,
        tags: ["Endodontics", "Clinical", "Procedures"],
        isPremium: true,
        price: 299,
        pdfUrl: "/ebooks/advanced-endodontic.pdf"
    },
    {
        id: 3,
        title: "Digital Dentistry Revolution",
        author: "Dr. Arjun Mehta",
        description: "Explore the future of dentistry with digital technologies. From CAD/CAM to 3D printing, discover how to integrate modern tech into your practice.",
        coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=400&fit=crop",
        category: "Technology",
        pages: 180,
        rating: 4,
        downloads: 1520,
        fileSize: "18.2 MB",
        publishedYear: 2023,
        tags: ["Digital", "Technology", "CAD/CAM"],
        isPremium: false,
        pdfUrl: "/ebooks/digital-dentistry.pdf"
    },
    {
        id: 4,
        title: "Pediatric Dentistry Excellence",
        author: "Dr. Sunita Patel",
        description: "Complete guide to treating young patients. Covers behavior management, preventive care, and specialized pediatric procedures with compassionate care approaches.",
        coverImage: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=300&h=400&fit=crop",
        category: "Pediatric Dentistry",
        pages: 195,
        rating: 5,
        downloads: 1340,
        fileSize: "15.7 MB",
        publishedYear: 2024,
        tags: ["Pediatric", "Child Care", "Prevention"],
        isPremium: true,
        price: 199,
        pdfUrl: "/ebooks/pediatric-excellence.pdf"
    },
    {
        id: 5,
        title: "Oral Surgery Fundamentals",
        author: "Dr. Vikram Singh",
        description: "Essential oral surgery techniques for general practitioners. Includes extractions, implant basics, and minor surgical procedures with safety protocols.",
        coverImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=400&fit=crop",
        category: "Oral Surgery",
        pages: 240,
        rating: 4,
        downloads: 980,
        fileSize: "22.1 MB",
        publishedYear: 2023,
        tags: ["Surgery", "Implants", "Extractions"],
        isPremium: false,
        pdfUrl: "/ebooks/oral-surgery.pdf"
    },
    {
        id: 6,
        title: "Cosmetic Dentistry Mastery",
        author: "Dr. Neha Gupta",
        description: "Transform smiles with advanced cosmetic techniques. Covers veneers, whitening, bonding, and smile design principles for aesthetic excellence.",
        coverImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=300&h=400&fit=crop",
        category: "Cosmetic Dentistry",
        pages: 210,
        rating: 5,
        downloads: 2100,
        fileSize: "28.5 MB",
        publishedYear: 2024,
        tags: ["Cosmetic", "Aesthetics", "Veneers"],
        isPremium: true,
        price: 399,
        pdfUrl: "/ebooks/cosmetic-mastery.pdf"
    }
];

const EbooksPage = () => {
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    const handleDownload = async (ebook: Ebook) => {
        setDownloadingId(ebook.id);

        try {
            // Simulate download process
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real implementation, you would:
            // 1. Check user authentication and permissions
            // 2. Track download analytics
            // 3. Serve the actual PDF file

            // For demo purposes, we'll create a download link
            const link = document.createElement('a');
            link.href = ebook.pdfUrl;
            link.download = `${ebook.title.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message (you can implement toast notifications)
            alert(`"${ebook.title}" download started successfully!`);

        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        } finally {
            setDownloadingId(null);
        }
    };

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
                    {ebooksData.map((ebook) => (
                        <Card key={ebook.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <div className="relative">
                                <img
                                    src={ebook.coverImage}
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
                                <p className="text-sm text-primary-600 font-medium">
                                    by {ebook.author}
                                </p>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                                    {ebook.description}
                                </p>

                                {/* Rating */}
                                <div className="mb-4">
                                    <StarRating rating={ebook.rating} />
                                </div>

                                {/* Ebook Details */}
                                <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-neutral-500">
                                    <div>
                                        <span className="font-medium">Pages:</span> {ebook.pages}
                                    </div>
                                    <div>
                                        <span className="font-medium">Size:</span> {ebook.fileSize}
                                    </div>
                                    <div>
                                        <span className="font-medium">Year:</span> {ebook.publishedYear}
                                    </div>
                                    <div>
                                        <span className="font-medium">Downloads:</span> {ebook.downloads.toLocaleString()}
                                    </div>
                                </div>

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