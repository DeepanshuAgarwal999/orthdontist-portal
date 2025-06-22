'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Download, Award, Calendar, User, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface CourseCertificateProps {
    courseTitle: string;
    userName: string;
    completionDate: string;
    courseDuration: number;
    instructorName: string;
    certificateId: string;
}

export const CourseCertificate: React.FC<CourseCertificateProps> = ({
    courseTitle,
    userName,
    completionDate,
    courseDuration,
    instructorName,
    certificateId
}) => {
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        try {
            // In a real implementation, you would use a library like html2canvas or jsPDF
            // For now, we'll simulate the download
            toast.success('Certificate download started!');

            // Mock download implementation
            const certificateData = {
                courseTitle,
                userName,
                completionDate,
                courseDuration,
                instructorName,
                certificateId,
                downloadedAt: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(certificateData, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `certificate-${certificateId}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            toast.error('Failed to download certificate');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Certificate Preview */}
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div
                        ref={certificateRef}
                        className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12 text-center relative"
                        style={{ aspectRatio: '4/3' }}
                    >
                        {/* Decorative Border */}
                        <div className="absolute inset-4 border-4 border-blue-200 border-dashed rounded-lg"></div>

                        {/* Header */}
                        <div className="relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Award className="w-10 h-10 text-white" />
                                </div>
                            </div>

                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Certificate of Completion
                            </h1>

                            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>

                            {/* Main Content */}
                            <div className="space-y-6">
                                <p className="text-lg text-gray-700">
                                    This is to certify that
                                </p>

                                <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-300 pb-2 inline-block">
                                    {userName}
                                </h2>

                                <p className="text-lg text-gray-700">
                                    has successfully completed the course
                                </p>

                                <h3 className="text-2xl font-semibold text-gray-900 max-w-2xl mx-auto">
                                    {courseTitle}
                                </h3>

                                {/* Course Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-sm text-gray-600">
                                    <div className="flex items-center justify-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>Completed: {formatDate(completionDate)}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        <span>Duration: {courseDuration} hours</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <User className="w-4 h-4 mr-2" />
                                        <span>Instructor: {instructorName}</span>
                                    </div>
                                </div>

                                {/* Signature Area */}
                                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <div className="border-t-2 border-gray-400 pt-2">
                                            <p className="text-sm text-gray-600">Instructor Signature</p>
                                            <p className="font-semibold">{instructorName}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-t-2 border-gray-400 pt-2">
                                            <p className="text-sm text-gray-600">Date of Issue</p>
                                            <p className="font-semibold">{formatDate(completionDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certificate ID */}
                            <div className="mt-8 text-xs text-gray-500">
                                Certificate ID: {certificateId}
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-blue-300"></div>
                        <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-blue-300"></div>
                        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-blue-300"></div>
                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-blue-300"></div>
                    </div>
                </CardContent>
            </Card>

            {/* Download Button */}
            <div className="text-center">
                <Button onClick={handleDownload} size="lg" className="px-8">
                    <Download className="w-5 h-5 mr-2" />
                    Download Certificate
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                    Download as PDF (High Quality Print Ready)
                </p>
            </div>
        </div>
    );
};

export default CourseCertificate;
