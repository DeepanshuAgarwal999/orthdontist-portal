'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/service/user.service';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const token = useSearchParams().get('token');

    const handleForgotPassword = async (formData: ForgotPasswordFormData) => {
        forgotPasswordMutation.mutate(formData);
    };
    const forgotPasswordMutation = useMutation({
        mutationFn: async (formData: ForgotPasswordFormData) => {
            return await UserService.forgotPassword(formData);
        },
        onSuccess: (data) => {
            setSuccess(true);
        },
        onError: (err: any) => {
            if (err.status === 401) {
                setError('User not Exist!');
            }
            setError(
                err.response?.data?.message ||
                'An error occurred while sending the reset email. Please try again.'
            );
        }
    })
    const verifyResetPasswordMutation = useMutation({
        mutationFn: async (formData: { newPassword: string }) => {
            if (!token) {
                return;
            }
            return await UserService.verifyResetPassword({ ...formData, token });
        },
        onSuccess: (data) => {
            setSuccess(true);
            router.replace('/login')
        },
        onError: (err: any) => {
            setError(
                err.response?.data?.message ||
                'An error occurred while changing the password. Please try again later.'
            );
        }
    })
    const handleResetPassword = async (formData: { newPassword: string }) => {
        verifyResetPasswordMutation.mutate(formData);
    };

    if (success && !token) {
        return (
            <AuthLayout
                title="Check Your Email"
                subtitle="We've sent you a password reset link"
                showFeatures={false}
            >
                <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl p-8 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-2">Email Sent!</h3>
                        <p className="text-neutral-600">
                            We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Back to Login
                        </button>

                        <p className="text-sm text-neutral-500">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-primary-600 hover:text-primary-700 underline"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                </div>
            </AuthLayout>
        );
    }
    if (token) {
        return <AuthLayout title="Change Your Password"
            subtitle="Enter your new password "
            showFeatures={false}>
            <div className="w-full">
                {
                    error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )
                }

                <ForgotPasswordForm
                    onSubmit={handleForgotPassword}
                    onConfirm={handleResetPassword}
                    loading={verifyResetPasswordMutation.isPending || forgotPasswordMutation.isPending} linkVerified={!!token} />
            </div >
        </AuthLayout >
    }
    return (
        <AuthLayout
            title="Reset Your Password"
            subtitle="Enter your email address and we'll send you a reset link"
            showFeatures={false}
        >
            <div className="w-full">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <ForgotPasswordForm onSubmit={handleForgotPassword} loading={forgotPasswordMutation.isPending} linkVerified={false} />
            </div>
        </AuthLayout>
    );
};


const ForgotPasswordPage = () => {
    return (
        <Suspense>
            <ForgotPassword />
        </Suspense>
    )
}

export default ForgotPasswordPage;
