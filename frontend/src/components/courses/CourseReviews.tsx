'use client';

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import {
    Star,
    User,
    ThumbsUp,
    MessageSquare,
    Calendar,
    Filter,
    TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface Review {
    id: string;
    rating: number;
    comment: string;
    user: {
        firstName: string;
        lastName: string;
        avatar?: string;
    };
    createdAt: string;
    helpful: number;
    isVerifiedEnrollment: boolean;
}

interface CourseReviewsProps {
    courseId: string;
    courseSlug: string;
    userHasEnrolled: boolean;
    userHasCompleted: boolean;
    overallRating?: number;
    totalReviews?: number;
}

export const CourseReviews: React.FC<CourseReviewsProps> = ({
    courseId,
    courseSlug,
    userHasEnrolled,
    userHasCompleted,
    overallRating = 0,
    totalReviews = 0
}) => {
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');
    const [hoveredStar, setHoveredStar] = useState(0);
    const [filterRating, setFilterRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const queryClient = useQueryClient();

    // Fetch reviews (mock implementation)
    const { data: reviewsData, isLoading } = useQuery({
        queryKey: ['course-reviews', courseId, { page: currentPage, rating: filterRating }],
        queryFn: async () => {
            // Mock data - in real implementation, this would call your API
            const mockReviews: Review[] = [
                {
                    id: '1',
                    rating: 5,
                    comment: 'Excellent course! Very comprehensive and well-structured. The instructor explains complex topics clearly.',
                    user: { firstName: 'Dr. Sarah', lastName: 'Johnson' },
                    createdAt: '2024-01-15T10:00:00Z',
                    helpful: 12,
                    isVerifiedEnrollment: true
                },
                {
                    id: '2',
                    rating: 4,
                    comment: 'Great content overall. Some sections could be more detailed, but the practical examples are very helpful.',
                    user: { firstName: 'Dr. Michael', lastName: 'Chen' },
                    createdAt: '2024-01-10T14:30:00Z',
                    helpful: 8,
                    isVerifiedEnrollment: true
                },
                {
                    id: '3',
                    rating: 5,
                    comment: 'This course transformed my practice. Highly recommend to any dentist looking to improve their skills.',
                    user: { firstName: 'Dr. Emily', lastName: 'Rodriguez' },
                    createdAt: '2024-01-05T09:15:00Z',
                    helpful: 15,
                    isVerifiedEnrollment: true
                }
            ];

            return {
                data: mockReviews,
                pagination: {
                    page: currentPage,
                    totalPages: 2,
                    totalItems: 25,
                    hasNext: currentPage < 2,
                    hasPrev: currentPage > 1
                }
            };
        },
    });

    // Submit review mutation
    const submitReviewMutation = useMutation({
        mutationFn: async (reviewData: { rating: number; comment: string }) => {
            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true };
        },
        onSuccess: () => {
            toast.success('Review submitted successfully!');
            setIsWritingReview(false);
            setNewComment('');
            setNewRating(5);
            queryClient.invalidateQueries({ queryKey: ['course-reviews', courseId] });
        },
        onError: () => {
            toast.error('Failed to submit review. Please try again.');
        },
    });

    const reviews = reviewsData?.data || [];
    const pagination = reviewsData?.pagination;

    const handleSubmitReview = () => {
        if (!newComment.trim()) {
            toast.error('Please write a comment for your review');
            return;
        }
        submitReviewMutation.mutate({
            rating: newRating,
            comment: newComment.trim()
        });
    };

    const renderStars = (rating: number, interactive = false, onHover?: (rating: number) => void, onClick?: (rating: number) => void) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${star <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
                        onMouseEnter={() => interactive && onHover?.(star)}
                        onMouseLeave={() => interactive && onHover?.(0)}
                        onClick={() => interactive && onClick?.(star)}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const ratingDistribution = [
        { stars: 5, count: 18, percentage: 72 },
        { stars: 4, count: 5, percentage: 20 },
        { stars: 3, count: 1, percentage: 4 },
        { stars: 2, count: 1, percentage: 4 },
        { stars: 1, count: 0, percentage: 0 },
    ];

    return (
        <div className="space-y-6">
            {/* Rating Overview */}
            <Card>
                <CardHeader>          <h3 className="text-lg font-semibold flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Course Reviews
                </h3>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Overall Rating */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {overallRating.toFixed(1)}
                            </div>
                            {renderStars(Math.round(overallRating))}
                            <p className="text-sm text-gray-600 mt-2">
                                Based on {totalReviews} reviews
                            </p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="space-y-2">
                            {ratingDistribution.map((item) => (
                                <div key={item.stars} className="flex items-center text-sm">
                                    <span className="w-8 text-gray-600">{item.stars}★</span>
                                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-gray-600">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Write Review Section */}
            {userHasEnrolled && (
                <Card>
                    <CardHeader>            <h3 className="text-lg font-semibold">
                        {userHasCompleted ? 'Share Your Experience' : 'Leave a Review'}
                    </h3>
                    </CardHeader>
                    <CardContent>
                        {!isWritingReview ? (
                            <Button
                                onClick={() => setIsWritingReview(true)}
                                className="w-full"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Write a Review
                            </Button>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Rating
                                    </label>
                                    {renderStars(
                                        hoveredStar || newRating,
                                        true,
                                        setHoveredStar,
                                        setNewRating
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <Textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Share your thoughts about this course..."
                                        rows={4}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex space-x-3">
                                    <Button
                                        onClick={handleSubmitReview}
                                        disabled={submitReviewMutation.isPending}
                                        className="flex-1"
                                    >
                                        {submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsWritingReview(false);
                                            setNewComment('');
                                            setNewRating(5);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Filters */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
                </div>
                <select
                    value={filterRating}
                    onChange={(e) => {
                        setFilterRating(parseInt(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                    <option value={0}>All Reviews</option>
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                </select>
            </div>

            {/* Reviews List */}
            {isLoading ? (
                <div className="space-y-4">
                    {Array(3).fill(0).map((_, index) => (
                        <Card key={index} className="animate-pulse">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/6 mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <Card key={review.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-3">
                                                <h4 className="font-semibold text-gray-900">
                                                    {review.user.firstName} {review.user.lastName}
                                                </h4>
                                                {review.isVerifiedEnrollment && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Verified Enrollment
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(review.createdAt)}
                                            </div>
                                        </div>

                                        <div className="flex items-center mb-3">
                                            {renderStars(review.rating)}
                                        </div>

                                        <p className="text-gray-700 mb-4">{review.comment}</p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <button className="flex items-center space-x-1 hover:text-blue-600">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>Helpful ({review.helpful})</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={!pagination.hasPrev}
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-4 text-sm text-gray-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!pagination.hasNext}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CourseReviews;
