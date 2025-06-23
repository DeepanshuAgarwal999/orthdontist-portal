'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PublicCourseService, Course } from '@/service/public-course.service';
import { Badge } from '@/components/ui/Badge';
import {
    Search,
    Clock,
    Users,
    Star,
    Play,
    BookOpen,
    Filter,
    CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { toast } from 'sonner';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';

const CoursesPage: React.FC = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user } = useUser();

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1); const { data: coursesData, isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: () => PublicCourseService.getCourses({
            page: currentPage,
            limit: 12,
            search: searchQuery || undefined,
            sortBy: 'publishedAt',
            sortOrder: 'desc'
        }),
    });

    // Fetch user enrollments to check enrollment status
    const { data: enrollmentsData } = useQuery({
        queryKey: ['my-enrollments'],
        queryFn: () => PublicCourseService.getMyEnrollments({ limit: 1000 }), // Get all enrollments
        enabled: !!user,
    });
    // Enroll mutation
    const enrollMutation = useMutation({
        mutationFn: ({ id, slug }: { id: string, slug: string }) => PublicCourseService.enrollInCourse(id),
        onSuccess: (data, variables) => {
            toast.success('Successfully enrolled in course!');
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
            router.push(`/courses/${variables.slug}`)
        },
        onError: (error: any, variables) => {
            if (error.response?.status === 409) {
                router.push(`/courses/${variables.slug}`)
            }
            else {
                toast.error(error.response?.data?.message || 'Failed to enroll in course');
            }
        },
    }); const courses = coursesData?.data || [];
    const pagination = coursesData?.pagination;
    const enrollments = enrollmentsData?.data || [];

    // Create a map for quick enrollment lookup
    const enrollmentMap = new Map();
    enrollments.forEach((enrollment: any) => {
        enrollmentMap.set(enrollment.course.id, enrollment);
    });



    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleEnroll = ({ id, slug }: { id: string, slug: string }) => {
        if (!user) {
            toast.error('Please login to enroll in courses');
            router.push('/login');
            return;
        }
        enrollMutation.mutate({ id, slug });
    };

    const formatPrice = (price: number, currency: string, isFree: boolean) => {
        if (isFree) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(price);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Professional Dental Courses
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Advance your dental career with expert-led courses designed for professionals
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSearch} className="flex gap-4 mb-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                Search
                            </Button>

                        </form>


                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array(8).fill(0).map((_, index) => (
                            <Card key={index} className="animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                                <CardHeader>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No courses found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search criteria or filters
                        </p>
                    </div>
                ) : (
                    <>                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map((course: Course) => {
                            const userEnrollment = enrollmentMap.get(course.id);
                            const isEnrolled = !!userEnrollment;

                            return (
                                <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                                    {/* Course Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg">
                                        {course.thumbnailImage ? (
                                            <img
                                                src={course.thumbnailImage}
                                                alt={course.title}
                                                className="w-full h-full object-cover rounded-t-lg"
                                            />
                                        ) : course.videoUrl ?
                                            <video
                                                className="w-full h-full object-cover rounded-t-lg"
                                                controls={true}
                                                muted
                                                preload="metadata"
                                                poster={course.thumbnailImage || undefined}
                                            >
                                                <source src={course.videoUrl} type="video/mp4" />
                                                <source src={course.videoUrl} type="video/webm" />
                                                <source src={course.videoUrl} type="video/ogg" />
                                                Your browser does not support the video tag.
                                            </video> : (
                                                <div className="flex items-center justify-center h-full">
                                                    <BookOpen className="w-12 h-12 text-white" />
                                                </div>
                                            )}

                                        <div className="absolute top-3 right-3">
                                            {isEnrolled ? (
                                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                    ✓ Enrolled
                                                </Badge>
                                            ) : (
                                                <Badge variant={course.isFreeCourse ? "secondary" : "default"}>
                                                    {formatPrice(course.price, course.currency, course.isFreeCourse)}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <CardHeader className="pb-3">
                                        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {course.shortDescription || course.description}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="py-3">
                                        {isEnrolled ? (
                                            // Show enrolled content
                                            <div className="space-y-4">
                                                {/* Progress Bar */}
                                                <div>
                                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                        <span>Progress</span>
                                                        <span>{userEnrollment.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${userEnrollment.progress}%` }}
                                                        />
                                                    </div>
                                                </div>                                                {/* Course Content Preview */}
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <h4 className="font-medium text-sm mb-2">Course Content:</h4>
                                                    <div className="text-sm text-gray-700 line-clamp-4">
                                                        {course.content ?
                                                            course.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
                                                            : 'No content available'
                                                        }
                                                    </div>
                                                </div>

                                                {/* Course Stats */}
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {course.duration}h
                                                    </div>
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
                                            </div>
                                        ) : (
                                            // Show non-enrolled content (original layout)
                                            <div>
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

                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {course.tags.slice(0, 2).map((tag) => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {course.tags.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{course.tags.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardFooter className="pt-3">
                                        {isEnrolled ? (
                                            // Enrolled user actions
                                            <div className="w-full">
                                                <Button
                                                    className="w-full mb-2"
                                                    size="sm"
                                                    onClick={() => router.push(`/courses/${course.slug}`)}
                                                >
                                                    <Play className="w-4 h-4 mr-1" />
                                                    {userEnrollment.progress > 0 ? 'Continue Learning' : 'Start Course'}
                                                </Button>
                                                {userEnrollment.status === 'COMPLETED' && (
                                                    <div className="text-center">
                                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                            ✓ Completed
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // Non-enrolled user actions (original layout)
                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.push(`/courses/${course.slug}`)}
                                                >
                                                    <Play className="w-4 h-4 mr-1" />
                                                    Preview
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleEnroll({ id: course.id, slug: course.slug })}
                                                    disabled={enrollMutation.isPending}
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    Enroll
                                                </Button>
                                            </div>
                                        )}
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center mt-8 space-x-2">
                                <Button
                                    variant="outline"
                                    disabled={!pagination.hasPrevPage}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Page {pagination.page} of {pagination.totalPages}
                                </span>

                                <Button
                                    variant="outline"
                                    disabled={!pagination.hasNextPage}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;