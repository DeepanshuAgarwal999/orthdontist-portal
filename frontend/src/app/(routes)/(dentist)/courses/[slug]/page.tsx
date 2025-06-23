'use client';

import React, { use, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { PublicCourseService } from '@/service/public-course.service';
import { CourseService } from '@/service/course.service';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    Clock,
    Users,
    Star,
    Play,
    BookOpen,
    Calendar,
    User,
    CheckCircle,
    ArrowLeft,
    Download,
    FileText
} from 'lucide-react';
import useUser from '@/hooks/useUser';
import { toast } from 'sonner';
import CourseRecommendations from '@/components/courses/CourseRecommendations';

const CourseDetailPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('overview');

    const slug = params.slug as string;    // Fetch course details
    const { data: courseData, isLoading } = useQuery({
        queryKey: ['course', slug],
        queryFn: () => PublicCourseService.getCourseBySlug(slug),
        enabled: !!slug,
    });

    // Fetch user's enrollment for this course
    const { data: enrollmentData } = useQuery({
        queryKey: ['my-enrollment', slug],
        queryFn: async () => {
            if (!user) return null;
            const enrollments = await CourseService.getMyEnrollments({ limit: 100 });
            return enrollments.data.find((enrollment: any) =>
                enrollment.course.slug === slug
            ) || null;
        },
        enabled: !!user && !!slug,
    });    // Enroll mutation
    const enrollMutation = useMutation({
        mutationFn: (courseId: string) => PublicCourseService.enrollInCourse(courseId),
        onSuccess: () => {
            toast.success('Successfully enrolled in course!');
            queryClient.invalidateQueries({ queryKey: ['course', slug] });
            queryClient.invalidateQueries({ queryKey: ['my-enrollment', slug] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to enroll in course');
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                            <div>
                                <div className="h-48 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!courseData?.data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course not found</h2>
                    <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/courses')}>
                        Back to Courses
                    </Button>
                </div>
            </div>
        );
    }
    const course = courseData.data;
    const userEnrollment = enrollmentData;
    const userHasEnrolled = !!userEnrollment;
    const handleEnroll = () => {
        if (!user) {
            toast.error('Please login to enroll in courses');
            router.push('/login');
            return;
        }
        enrollMutation.mutate(course.id);
    };

    const formatPrice = (price: number, currency: string, isFree: boolean) => {
        if (isFree) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(price);
    };
    const tabs = userHasEnrolled
        ? [
            { id: 'overview', label: 'Overview' },
            { id: 'content', label: 'Course Content' },
        ]
        : [
            { id: 'overview', label: 'Overview' },
        ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className={`${userEnrollment ? 'max-w-5xl mx-auto' : 'grid'} grid-cols-1 lg:grid-cols-2 gap-8`}>
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Course Header */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {course.tags.slice(0, 3).map((tag: string) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {course.title}
                            </h1>

                            <p className="text-lg text-gray-600 mb-6">
                                {course.shortDescription || course.description}
                            </p>

                            {/* Course Stats */}
                            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {course.duration} hours
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2" />
                                    {course.enrollmentCount} enrolled
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Updated {new Date(course.updatedAt).toLocaleDateString()}
                                </div>
                                {course.rating && (
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                                        {course.rating.toFixed(1)} ({course.reviewCount} reviews)
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Course Video/Image */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                            <div className="relative h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                {course.thumbnailImage ? (
                                    <img
                                        src={course.thumbnailImage}
                                        alt={course.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    null
                                )}
                                {course.videoUrl && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <video className='w-full h-full object-cover rounded-lg' controls>
                                            <source src={course.videoUrl} type="video/mp4" />
                                            <source src={course.videoUrl} type="video/webm" />
                                            <source src={course.videoUrl} type="video/ogg" />
                                        </video>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="border-b">
                                <nav className="flex space-x-8 px-6">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-4 text-sm font-medium border-b-2 ${activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                            <div className="p-6">
                                {activeTab === 'overview' && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Course Description</h3>
                                        <div
                                            className="prose prose-gray max-w-none"
                                            dangerouslySetInnerHTML={{ __html: userHasEnrolled ? course.content : course.content.substring(0, 500) + (course.content.length > 500 ? '...' : '') }}
                                        />

                                        {!userHasEnrolled && course.content.length > 500 && (
                                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <p className="text-blue-800 text-sm font-medium mb-2">
                                                    🔒 Full content available after enrollment
                                                </p>
                                                <p className="text-blue-600 text-sm">
                                                    Enroll in this course to access the complete content, materials, and resources.
                                                </p>
                                            </div>
                                        )}

                                        {course.attachments && course.attachments.length > 0 && (
                                            <div className="mt-6">
                                                <h4 className="text-md font-semibold mb-3">Course Materials</h4>                        <div className="space-y-2">
                                                    {course.attachments.map((attachment: string, index: number) => (
                                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center">
                                                                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                                                <span className="text-sm">Attachment {index + 1}</span>
                                                            </div>
                                                            {userHasEnrolled ? (
                                                                <Button size="sm" variant="outline">
                                                                    <Download className="w-4 h-4 mr-1" />
                                                                    Download
                                                                </Button>
                                                            ) : (
                                                                <Button size="sm" variant="outline" disabled>
                                                                    <Download className="w-4 h-4 mr-1" />
                                                                    Enroll to Download
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'content' && userHasEnrolled && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Full Course Content</h3>
                                        <div
                                            className="prose prose-gray max-w-none"
                                            dangerouslySetInnerHTML={{ __html: course.content }}
                                        />

                                        {course.videoUrl && (
                                            <div className="mt-6">
                                                <h4 className="text-md font-semibold mb-3">Course Video</h4>
                                                <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                                                    <video
                                                        controls
                                                        className="w-full h-full object-cover"
                                                        poster={course.thumbnailImage}
                                                    >
                                                        <source src={course.videoUrl} type="video/mp4" />
                                                        <source src={course.videoUrl} type="video/webm" />
                                                        <source src={course.videoUrl} type="video/ogg" />
                                                    </video>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'materials' && userHasEnrolled && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Course Materials & Resources</h3>

                                        {course.attachments && course.attachments.length > 0 ? (
                                            <div className="space-y-4">
                                                <p className="text-gray-600 mb-4">
                                                    Download the following materials to enhance your learning experience:
                                                </p>
                                                <div className="space-y-3">
                                                    {course.attachments.map((attachment: string, index: number) => (
                                                        <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                            <div className="flex items-center">
                                                                <FileText className="w-6 h-6 text-blue-500 mr-3" />
                                                                <div>
                                                                    <span className="text-sm font-medium">Course Material {index + 1}</span>
                                                                    <p className="text-xs text-gray-500">PDF Document</p>
                                                                </div>
                                                            </div>
                                                            <Button size="sm">
                                                                <Download className="w-4 h-4 mr-1" />
                                                                Download
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600">No additional materials available for this course.</p>
                                            </div>
                                        )}

                                    </div>
                                )}



                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    {
                        !userEnrollment && <div>
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-900 mb-2">
                                            {formatPrice(course.price, course.currency, course.isFreeCourse)}
                                        </div>
                                        {!course.isFreeCourse && (
                                            <p className="text-sm text-gray-500">One-time payment</p>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">

                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={handleEnroll}
                                        disabled={enrollMutation.isPending}
                                    >
                                        {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                                    </Button>

                                    {course.maxEnrollments && (
                                        <div className="border-t pt-4">
                                            <div className="text-sm text-gray-600">
                                                <strong>{course.maxEnrollments - course.enrollmentCount}</strong> spots left
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${(course.enrollmentCount / course.maxEnrollments) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    }
                </div>

                {/* Course Recommendations */}
                <div className="mt-12">
                    <CourseRecommendations
                        currentCourseId={course.id}
                        currentCourseCategory={course.category}
                        currentCourseTags={course.tags}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
