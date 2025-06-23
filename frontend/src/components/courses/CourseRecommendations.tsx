'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/service/course.service';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    BookOpen,
    Clock,
    Users,
    Star,
    TrendingUp,
    ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Course {
    id: string;
    title: string;
    slug: string;
    shortDescription?: string;
    tags: string[];
    thumbnailImage?: string;
    price: number;
    isFreeCourse: boolean;
    currency: string;
    enrollmentCount: number;
    rating?: number;
    reviewCount: number;
}

interface CourseRecommendationsProps {
    currentCourseId: string;
    currentCourseCategory: string;
    currentCourseTags: string[];
    userLevel?: string;
}

export const CourseRecommendations: React.FC<CourseRecommendationsProps> = ({
    currentCourseId,
    currentCourseCategory,
    currentCourseTags,
}) => {
    const router = useRouter();

    // Fetch recommended courses
    const { data: recommendedCoursesData, isLoading } = useQuery({
        queryKey: ['course-recommendations', currentCourseId],
        queryFn: async () => {
            const coursesResponse = await CourseService.getCourses({
                page: 1,
                limit: 6,
                search: '',
            });

            // Filter out the current course and return recommendations
            const filteredCourses = coursesResponse.data.filter(
                (course: Course) => course.id !== currentCourseId
            );

            return {
                data: filteredCourses.slice(0, 4), // Return top 4 recommendations
                total: filteredCourses.length
            };
        },
    });

    const recommendations = recommendedCoursesData?.data || [];

    const formatPrice = (price: number, currency: string, isFree: boolean) => {
        if (isFree) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(price);
    };


    const handleCourseClick = (slug: string) => {
        router.push(`/courses/${slug}`);
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recommended Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array(4).fill(0).map((_, index) => (
                        <Card key={index} className="animate-pulse">
                            <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                            <CardContent className="p-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (recommendations.length === 0) {
        return (
            <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No recommendations available
                </h3>
                <p className="text-gray-600">
                    Check back later for more course recommendations.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recommended for You
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/courses')}
                >
                    View All Courses
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((course: Course) => (
                    <Card
                        key={course.id}
                        className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => handleCourseClick(course.slug)}
                    >
                        {/* Course Image */}
                        <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg">
                            {course.thumbnailImage ? (
                                <img
                                    src={course.thumbnailImage}
                                    alt={course.title}
                                    className="w-full h-full object-cover rounded-t-lg"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                            )}


                            {/* Price Badge */}
                            <div className="absolute top-2 right-2">
                                <Badge variant="secondary" className="bg-white text-gray-900">
                                    {formatPrice(course.price, course.currency, course.isFreeCourse)}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="p-4">
                            <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                                {course.title}
                            </h4>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {course.shortDescription}
                            </p>

                            {/* Course Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    {course.enrollmentCount}
                                </div>
                                {course.rating && (
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                        {course.rating.toFixed(1)}
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                                {course.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* CTA */}
                            <Button
                                className="w-full"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCourseClick(course.slug);
                                }}
                            >
                                View Course
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* View More */}
            <div className="text-center">
                <Button
                    variant="outline"
                    onClick={() => router.push(`/dentists/courses?category=${encodeURIComponent(currentCourseCategory)}`)}
                >
                    View More in {currentCourseCategory}
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default CourseRecommendations;
