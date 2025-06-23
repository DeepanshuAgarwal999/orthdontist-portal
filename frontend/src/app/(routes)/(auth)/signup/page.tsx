'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';
import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/service/user.service';

export interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    licenseNumber?: string;
    location: string;
    clinicName: string;
    agreeToTerms: boolean;
    agreeToMarketing: boolean;
}

const SignupPage: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    const handleSignup = async (formData: SignupFormData) => {
        signupMutation.mutate(formData);
    }; const signupMutation = useMutation({
        mutationFn: async (formData: SignupFormData) => {
            return await UserService.signUp(formData);
        }, onSuccess: (data) => {
            setUserData(data.user);
            setSuccess(true);

            // Show success message for a moment, then redirect
            setTimeout(() => {
                if (data.user.role === 'dentist') {
                    router.push('/login?message=account-pending');
                } else {
                    router.push('/login?message=verify-email');
                }
            }, 2000);
        },
        onError: (err: any) => {
            setError(
                err.response?.data?.message ||
                'An error occurred during registration. Please try again.'
            );
        }
    })

    if (success) {
        return (
            <AuthLayout
                title="Registration Successful!"
                subtitle="Your account has been created"
                showFeatures={false}
            >
                <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl p-8 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>                        <h3 className="text-xl font-semibold text-neutral-800 mb-2">Welcome to DentistPortal!</h3>
                        <p className="text-neutral-600">
                            {userData?.role === 'dentist'
                                ? 'Your application is under review. You\'ll receive an email confirmation within 24-48 hours, and your account will be activated once approved by our team.'
                                : 'Please check your email to verify your account before logging in. We\'ve sent you a verification link.'
                            }
                        </p>
                    </div>
                    <p className="text-sm text-neutral-500">Redirecting you to login...</p>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Join Our Dental Community"
            subtitle="Connect with trusted dental professionals and provide exceptional care"
        >
            <div className="w-full">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <SignupForm onSubmit={handleSignup} loading={signupMutation.isPending} />
            </div>
        </AuthLayout>
    );
};

export default SignupPage;