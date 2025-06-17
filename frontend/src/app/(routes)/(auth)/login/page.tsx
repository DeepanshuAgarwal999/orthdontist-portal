'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/service/user.service';
import { AxiosError } from 'axios';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const LoginPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const messageParam = searchParams.get('message');
        if (messageParam === 'account-pending') {
            setMessage('Your dentist account is under review. You\'ll receive an email once approved.');
        } else if (messageParam === 'verify-email') {
            setMessage('Please check your email to verify your account before logging in.');
        } else if (messageParam === 'session-expired') {
            setError('Your session has expired. Please log in again.');
        }
    }, [searchParams]);

    const handleLogin = (formData: LoginFormData) => {
        setError(null);
        loginMutation.mutate(formData);
    };

    const loginMutation = useMutation({
        mutationFn: async (formData: LoginFormData) => {
            return await UserService.login(formData);
        },
        onSuccess: (data) => {
            // Store user info if needed
            const user = data.user;
            if (user.role === 'admin') {
                router.push('/admin/dashboard');
            } else if (user.role === 'dentist') {
                router.push('/dentists');
            } else {
                router.push('/');
            }
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                setError(
                    err.response?.data.message ||
                    'Invalid email or password. Please try again.'
                );
            }
        }
    })

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to access your dental portal and connect with your network"
        >
            <div className="w-full">
                {message && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-700 text-sm">{message}</p>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <LoginForm onSubmit={handleLogin} loading={loginMutation.isPending} />
            </div>
        </AuthLayout>
    );
};

export default LoginPage;