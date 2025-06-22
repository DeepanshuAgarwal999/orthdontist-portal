'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseService } from '@/service/course.service';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    CheckCircle,
    Play,
    Clock,
    BookOpen,
    Award,
    TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import CourseCertificate from './CourseCertificate';

interface CourseProgressProps {
    enrollmentId: string;
    courseId: string;
    currentProgress: number;
    courseDuration: number;
    courseTitle: string;
    status: string;
    completedAt?: string;
    instructorName?: string;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
    enrollmentId,
    courseId,
    currentProgress,
    courseDuration,
    courseTitle,
    status,
    completedAt,
    instructorName = 'Course Instructor'
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const queryClient = useQueryClient();

    // Update progress mutation
    const updateProgressMutation = useMutation({
        mutationFn: (progress: number) =>
            CourseService.updateEnrollmentProgress(enrollmentId, progress),
        onSuccess: (_, progress) => {
            toast.success(
                progress === 100
                    ? '🎉 Congratulations! Course completed!'
                    : `Progress updated to ${progress}%`
            );
            queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
            queryClient.invalidateQueries({ queryKey: ['course', courseId] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update progress');
        },
    });

    const handleProgressUpdate = (newProgress: number) => {
        if (newProgress !== currentProgress && !isUpdating) {
            setIsUpdating(true);
            updateProgressMutation.mutate(newProgress);
            setTimeout(() => setIsUpdating(false), 1000);
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 100) return 'bg-green-500';
        if (progress >= 75) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        if (progress >= 25) return 'bg-orange-500';
        return 'bg-gray-300';
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            ACTIVE: 'bg-blue-100 text-blue-800',
            COMPLETED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-gray-100 text-gray-800',
        };
        return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
    };

    const progressSegments = [
        { label: 'Introduction', progress: 10 },
        { label: 'Module 1', progress: 25 },
        { label: 'Module 2', progress: 50 },
        { label: 'Module 3', progress: 75 },
        { label: 'Final Assessment', progress: 100 },
    ];

    const completedHours = Math.round((currentProgress / 100) * courseDuration);
    const remainingHours = courseDuration - completedHours;

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Course Progress
                    </h3>
                    <Badge className={getStatusBadge(status)}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Overall Progress */}
                <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Overall Progress</span>
                        <span className="font-semibold">{currentProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(currentProgress)}`}
                            style={{ width: `${currentProgress}%` }}
                        />
                    </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{completedHours}h</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center mb-1">
                            <BookOpen className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="text-2xl font-bold text-orange-600">{remainingHours}h</div>
                        <div className="text-sm text-gray-600">Remaining</div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center mb-1">
                            <Award className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {currentProgress === 100 ? '1' : '0'}
                        </div>
                        <div className="text-sm text-gray-600">Certificates</div>
                    </div>
                </div>

                {/* Progress Segments */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Course Modules</h4>
                    <div className="space-y-3">
                        {progressSegments.map((segment, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {currentProgress >= segment.progress ? (
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3" />
                                    )}
                                    <span className={`text-sm ${currentProgress >= segment.progress
                                            ? 'text-green-700 font-medium'
                                            : 'text-gray-600'
                                        }`}>
                                        {segment.label}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">{segment.progress}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Progress Actions */}
                {status === 'ACTIVE' && currentProgress < 100 && (
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {progressSegments
                                .filter(segment => segment.progress > currentProgress)
                                .slice(0, 2)
                                .map((segment, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleProgressUpdate(segment.progress)}
                                        disabled={isUpdating || updateProgressMutation.isPending}
                                        className="text-xs"
                                    >
                                        {isUpdating ? (
                                            <Clock className="w-3 h-3 mr-1 animate-spin" />
                                        ) : (
                                            <Play className="w-3 h-3 mr-1" />
                                        )}
                                        Complete {segment.label}
                                    </Button>
                                ))}
                        </div>
                    </div>
                )}        {/* Completion Message */}
                {currentProgress === 100 && (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <h4 className="font-semibold text-green-800 mb-1">
                                Course Completed!
                            </h4>
                            <p className="text-sm text-green-600 mb-3">
                                Congratulations on completing "{courseTitle}". Your certificate is ready!
                            </p>
                            <Button
                                className="mt-3"
                                size="sm"
                                onClick={() => setShowCertificate(!showCertificate)}
                            >
                                <Award className="w-4 h-4 mr-2" />
                                {showCertificate ? 'Hide Certificate' : 'View Certificate'}
                            </Button>
                        </div>

                        {/* Certificate Modal/Section */}
                        {showCertificate && completedAt && (
                            <div className="mt-4">
                                <CourseCertificate
                                    courseTitle={courseTitle}
                                    userName="Dr. John Doe" // This should come from user context
                                    completionDate={completedAt}
                                    courseDuration={courseDuration}
                                    instructorName={instructorName}
                                    certificateId={`CERT-${enrollmentId.slice(-8).toUpperCase()}`}
                                />
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CourseProgress;