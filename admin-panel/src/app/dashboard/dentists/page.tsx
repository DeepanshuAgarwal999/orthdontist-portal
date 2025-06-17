'use client';

import React, { useState, useMemo } from 'react';
import {
    UserCheck,
    UserPlus,
    Search,
    Filter,
    CheckCircle,
    XCircle,
    MoreVertical,
    Trash2,
    Eye,
    MapPin,
    Phone,
    Mail,
    Clock,
    AlertTriangle,
    Loader2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { DentistQueryParams } from '@/types/dentist';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import Pagination from '@/components/ui/Pagination';
import { debounce } from '@/utils/formatters';
import {
    useDentists,
    useDentistStatistics,
    useVerifyDentist,
    useDeleteDentist
} from '@/hooks/useDentists';
import { toast } from 'sonner';

export default function DentistsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean;
        dentistId: string;
        clinicName: string;
    }>({
        isOpen: false,
        dentistId: '',
        clinicName: ''
    });

    // Debounced search effect
    const debouncedSetSearch = useMemo(
        () => debounce((value: string) => {
            setDebouncedSearchTerm(value);
            setCurrentPage(1);
        }, 500),
        []
    );

    React.useEffect(() => {
        debouncedSetSearch(searchTerm);
    }, [searchTerm, debouncedSetSearch]);

    // Build query parameters
    const queryParams: DentistQueryParams = useMemo(() => {
        const params: DentistQueryParams = {
            page: currentPage,
            limit: 10,
            search: debouncedSearchTerm || undefined,
        };

        // Add status filter logic using proper API parameters
        if (statusFilter === 'verified') {
            params.isVerified = true;
        } else if (statusFilter === 'pending') {
            params.isVerified = false;
        }

        return params;
    }, [currentPage, debouncedSearchTerm, statusFilter]);

    // Query hooks
    const {
        data: dentistsResponse,
        isLoading: dentistsLoading,
        error: dentistsError,
        refetch: refetchDentists
    } = useDentists(queryParams);

    const {
        data: statisticsResponse,
        isLoading: statisticsLoading,
        error: statisticsError
    } = useDentistStatistics();

    // Mutation hooks
    const verifyMutation = useVerifyDentist();
    const deleteMutation = useDeleteDentist();

    // Extract data from responses
    const dentists = dentistsResponse?.data || [];
    const totalPages = dentistsResponse?.pagination?.totalPages || 1;
    const totalDentists = dentistsResponse?.pagination?.total || 0;
    const statistics = statisticsResponse?.data;

    // Handle verification toggle
    const handleVerificationToggle = async (dentistId: string, currentStatus: boolean) => {
        try {
            await verifyMutation.mutateAsync({
                id: dentistId,
                isVerified: !currentStatus
            });

            toast.success(
                `Dentist ${!currentStatus ? 'verified' : 'unverified'} successfully`
            );
        } catch (error) {
            console.error('Error updating verification status:', error);
            toast.error(
                'Failed to update verification status'
            );
        }
    };

    // Handle delete dentist
    const handleDeleteDentist = async () => {
        try {
            await deleteMutation.mutateAsync(deleteDialog.dentistId);

            // Close dialog
            setDeleteDialog({ isOpen: false, dentistId: '', clinicName: '' });

            toast.success(
                `${deleteDialog.clinicName} has been permanently removed.`
            );
        } catch (error) {
            console.error('Error deleting dentist:', error);
            toast.error(
                'Failed to delete dentist',
            );
        }
    };

    // Handle search
    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    // Handle status filter
    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Open delete confirmation dialog
    const openDeleteDialog = (dentistId: string, clinicName: string) => {
        setDeleteDialog({
            isOpen: true,
            dentistId,
            clinicName
        });
    };

    // Close delete confirmation dialog
    const closeDeleteDialog = () => {
        setDeleteDialog({
            isOpen: false,
            dentistId: '',
            clinicName: ''
        });
    };

    // Check if any mutation is loading for a specific dentist
    const isActionLoading = (dentistId: string, action: 'verify' | 'delete') => {
        if (action === 'verify') {
            return verifyMutation.isPending;
        }
        if (action === 'delete') {
            return deleteMutation.isPending && deleteDialog.dentistId === dentistId;
        }
        return false;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dentists</h1>
                    <p className="text-gray-600">Manage dentist profiles and verifications</p>
                </div>
            
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <UserCheck className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Dentists</dt>
                                    <dd className="text-lg font-medium text-gray-900">                        {statisticsLoading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Loading...
                                        </span>
                                    ) : (
                                        statistics?.totalDentists || 0
                                    )}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-6 w-6 text-green-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Verified</dt>                    <dd className="text-lg font-medium text-gray-900">
                                        {statisticsLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading...
                                            </span>
                                        ) : (
                                            statistics?.verifiedDentists || 0
                                        )}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <XCircle className="h-6 w-6 text-yellow-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>                                    <dd className="text-lg font-medium text-gray-900">
                                        {statisticsLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading...
                                            </span>
                                        ) : (
                                            statistics?.unverifiedDentists || 0
                                        )}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <UserCheck className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>                                    <dd className="text-lg font-medium text-gray-900">
                                        {statisticsLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading...
                                            </span>
                                        ) : (
                                            statistics?.activeDentists || 0
                                        )}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search dentists..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="sm:w-48">
                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>            {/* Error Display */}
            {(dentistsError || statisticsError) && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{dentistsError?.message || statisticsError?.message || 'An error occurred while loading data'}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => refetchDentists()}
                                    className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Dentists Table */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">                {dentistsLoading ? (
                <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600" />
                    <p className="mt-2 text-gray-600">Loading dentists...</p>
                </div>
            ) : dentists.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                        <UserCheck className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Dentists Found</h3>
                    <p className="text-gray-600">
                        {searchTerm || statusFilter !== 'all'
                            ? 'No dentists match your search criteria.'
                            : 'No dentists have been registered yet.'
                        }
                    </p>
                </div>
            ) : (
                <>
                    {/* Table Header */}
                    <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                Dentists ({totalDentists})
                            </h3>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="divide-y divide-gray-200">
                        {dentists.map((dentist) => (
                            <div key={dentist.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-lg font-semibold text-gray-900">
                                                    {dentist.clinicName}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    {dentist.isVerified ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            Pending
                                                        </span>
                                                    )}
                                                    {dentist.isActive && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Active
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}                                                <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleVerificationToggle(dentist.id, dentist.isVerified)}
                                                    disabled={isActionLoading(dentist.id, 'verify')}
                                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${dentist.isVerified
                                                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        }`}
                                                >
                                                    {isActionLoading(dentist.id, 'verify') ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        dentist.isVerified ? 'Unverify' : 'Verify'
                                                    )}
                                                </button>                                                    <button
                                                    onClick={() => openDeleteDialog(dentist.id, dentist.clinicName)}
                                                    disabled={isActionLoading(dentist.id, 'delete')}
                                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isActionLoading(dentist.id, 'delete') ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail className="w-4 h-4" />
                                                    <span>{dentist.user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{dentist.phoneNumber}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{dentist.address}, {dentist.city}, {dentist.state} {dentist.zipCode}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Doctor:</span> {dentist.user.firstName}
                                                </div>
                                                {dentist.specialties && dentist.specialties.length > 0 && (
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium">Specialties:</span> {dentist.specialties.join(', ')}
                                                    </div>
                                                )}
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Joined:</span> {new Date(dentist.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}                        </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalDentists}
                            itemsPerPage={10}
                            onPageChange={setCurrentPage}
                            showQuickJumper={true}
                        />
                    )}
                </>
            )}
            </div>

            {/* Confirmation Dialog for Delete */}
            <ConfirmationDialog
                isOpen={deleteDialog.isOpen}
                onClose={closeDeleteDialog}
                onConfirm={handleDeleteDentist}
                title="Delete Dentist"
                message={`Are you sure you want to delete "${deleteDialog.clinicName}"? This will permanently remove the dentist and all associated data. This action cannot be undone.`}
                confirmText="Delete" cancelText="Cancel"
                variant="danger"
                loading={isActionLoading(deleteDialog.dentistId, 'delete')} />
        </div>
    );
}
