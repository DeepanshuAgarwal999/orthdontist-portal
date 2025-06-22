'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CourseService, CourseEnrollment } from '@/service/course.service';
import { Badge } from '@/components/ui/Badge';
import {
    BookOpen,
    Clock,
    Play,
    CheckCircle,
    Calendar,
    BarChart3,
    Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MyCoursesPage: React.FC = () => {
    const router = useRouter();
    const { user } = useUser();
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);

    // Redirect if not logged in
    React.useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    // Fetch my enrollments
    const { data: enrollmentsData, isLoading } = useQuery({
        queryKey: ['my-enrollments', {
            page: currentPage,
            status: selectedStatus,
            limit: 12
        }],
        queryFn: () => CourseService.getMyEnrollments({
            page: currentPage,
            limit: 12,
            status: selectedStatus || undefined,
        }),
        enabled: !!user,
    });

    if (!user) {
        return null; // Will redirect
    }

    const enrollments = enrollmentsData?.data || [];
    const pagination = enrollmentsData?.pagination;

    const statuses = [
        { value: '', label: 'All Courses' },
        { value: 'ACTIVE', label: 'In Progress' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
    ];

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            ACTIVE: 'bg-blue-100 text-blue-800',
            COMPLETED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-gray-100 text-gray-800',
            REFUNDED: 'bg-red-100 text-red-800',
        };
        return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 100) return 'bg-green-500';
        if (progress >= 75) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        if (progress >= 25) return 'bg-orange-500';
        return 'bg-gray-300';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Calculate statistics
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter((e: CourseEnrollment) => e.status === 'COMPLETED').length;
    const inProgressCourses = enrollments.filter((e: CourseEnrollment) => e.status === 'ACTIVE' && e.progress > 0).length;
    const totalHours = enrollments.reduce((sum: number, e: CourseEnrollment) => sum + e.course.duration, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">My Courses</h1>
                    <p className="text-xl text-gray-600">
                        Track your learning progress and continue your dental education
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Total Courses</h3>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCourses}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Completed</h3>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{completedCourses}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">In Progress</h3>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{inProgressCourses}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Total Hours</h3>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalHours}h</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-lg border p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex items-center">
                            <Filter className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                        </div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => {
                                setSelectedStatus(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            {statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Course Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array(6).fill(0).map((_, index) => (
                            <Card key={index} className="animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                                <CardHeader>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : enrollments.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No courses enrolled yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Explore our course catalog and start learning today
                        </p>
                        <Button onClick={() => router.push('/courses')}>
                            Browse Courses
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments.map((enrollment: CourseEnrollment) => (
                                <Card key={enrollment.id} className="hover:shadow-lg transition-shadow duration-300">
                                    {/* Course Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg">
                                        {enrollment.course.thumbnailImage ? (
                                            <img
                                                src={enrollment.course.thumbnailImage}
                                                alt={enrollment.course.title}
                                                className="w-full h-full object-cover rounded-t-lg"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <BookOpen className="w-12 h-12 text-white" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <Badge className={getStatusBadge(enrollment.status)}>
                                                {enrollment.status}
                                            </Badge>
                                        </div>

                                    </div>

                                    <CardHeader className="pb-3">
                                        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                                            {enrollment.course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {enrollment.course.shortDescription || enrollment.course.description}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        {/* Progress Bar */}
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Progress</span>
                                                <span>{enrollment.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(enrollment.progress)}`}
                                                    style={{ width: `${enrollment.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Course Info */}
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {enrollment.course.duration}h
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {formatDate(enrollment.enrolledAt)}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1">
                                            {enrollment.course.tags.slice(0, 1).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Instructor */}
                                        <p className="text-xs text-gray-500">
                                            By {enrollment.course.createdBy.firstName} {enrollment.course.createdBy.lastName}
                                        </p>

                                        {/* Action Button */}
                                        <div className="pt-2">
                                            {enrollment.status === 'COMPLETED' ? (
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() => router.push(`/courses/${enrollment.course.slug}`)}
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Review Course
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="w-full"
                                                    onClick={() => router.push(`/courses/${enrollment.course.slug}`)}
                                                >
                                                    <Play className="w-4 h-4 mr-2" />
                                                    Continue Learning
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
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

export default MyCoursesPage;
