'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useQuery } from '@tanstack/react-query';
import { LiveSessionService, LiveSession } from '@/service/live-session.service';
import { ClockIcon, ExternalLinkIcon, VideoIcon } from '@/constants/icons';
import { CalendarIcon, UsersIcon } from '@/components/ui/Icons';

// Calendar Icon component


// Status Badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SCHEDULED':
                return 'bg-blue-100 text-blue-800';
            case 'LIVE':
                return 'bg-red-100 text-red-800 animate-pulse';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-gray-100 text-gray-800';
            case 'POSTPONED':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

const LiveSessionsPage = () => {
    const { data: sessionsData, isLoading } = useQuery({
        queryKey: ['live-sessions'],
        queryFn: () => LiveSessionService.getUpcomingLiveSessions({
            limit: '20'
        }),
    });

    const handleJoinSession = (session: LiveSession) => {
        if (session.meetLink) {
            window.open(session.meetLink, '_blank');
        } else {
            alert('Meeting link not available for this session.');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getDurationText = (duration: number) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const canJoinSession = (session: LiveSession) => {
        const now = new Date();
        const sessionTime = new Date(session.scheduledAt);
        const timeDiff = sessionTime.getTime() - now.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));

        // Can join if session is live or starts within 15 minutes
        return session.status === 'LIVE' || (session.status === 'SCHEDULED' && minutesDiff <= 15 && minutesDiff >= -60);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-lg text-neutral-600">Loading live sessions...</p>
                </div>
            </div>
        );
    } const { data: sessions } = sessionsData || { data: [] };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Header Section */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <VideoIcon size={48} className="text-primary-600 mr-3" />
                            <h1 className="text-4xl font-bold text-neutral-900">
                                Live Sessions
                            </h1>
                        </div>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Join live dental education sessions and interact with expert practitioners in real-time.
                        </p>
                        <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-neutral-600">
                            <div className="flex items-center space-x-2">
                                <span className="text-red-500">🔴</span>
                                <span>Live Sessions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-500">📅</span>
                                <span>Scheduled Sessions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-500">✅</span>
                                <span>Expert Instructors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sessions Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-10">
                {sessions.length === 0 ? (<div className="text-center py-12">
                    <VideoIcon size={64} className="text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Live Sessions Found</h3>
                    <p className="text-neutral-600">
                        Check back later for upcoming live sessions.
                    </p>
                </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sessions.map((session) => (
                            <Card key={session.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <div className="relative">
                                    {session.thumbnailImage ? (
                                        <img
                                            src={session.thumbnailImage}
                                            alt={session.title}
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-lg flex items-center justify-center">
                                            <VideoIcon size={48} className="text-primary-600" />
                                        </div>
                                    )}

                                    <div className="absolute top-3 left-3">
                                        <StatusBadge status={session.status} />
                                    </div>


                                    {!session.isFree && (
                                        <div className="absolute bottom-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            {session.currency || '₹'}{session.price}
                                        </div>
                                    )}
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold text-neutral-900 line-clamp-2">
                                        {session.title}
                                    </CardTitle>
                                    <p className="text-sm text-neutral-500">
                                        by {session.createdBy.firstName} {session.createdBy.lastName}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                                        {session.description}
                                    </p>

                                    {/* Session Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-neutral-600">
                                            <CalendarIcon size={16} className="mr-2" />
                                            <span>{formatDate(session.scheduledAt)}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-neutral-600">
                                            <ClockIcon size={16} className="mr-2" />
                                            <span>{formatTime(session.scheduledAt)} • {getDurationText(session.duration)}</span>
                                        </div>
                                        {session.maxParticipants && (
                                            <div className="flex items-center text-sm text-neutral-600">
                                                <UsersIcon size={16} className="mr-2" />
                                                <span>Max {session.maxParticipants} participants</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    {session.tags && session.tags.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-1">
                                                {session.tags.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Join Button */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-neutral-500">
                                            {session.registrationCount || 0} registered
                                        </div>
                                        <Button
                                            onClick={() => handleJoinSession(session)}
                                            disabled={!canJoinSession(session) || !session.meetLink}
                                            variant={session.status === 'LIVE' ? "default" : "secondary"}
                                            size="sm"
                                            className="flex items-center space-x-2"
                                        >
                                            <ExternalLinkIcon size={16} />
                                            <span>
                                                {session.status === 'LIVE'
                                                    ? 'Join Live'
                                                    : canJoinSession(session)
                                                        ? 'Join Session'
                                                        : 'View Details'
                                                }
                                            </span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveSessionsPage;