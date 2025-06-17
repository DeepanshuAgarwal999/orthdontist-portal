import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { MailIcon, ArrowLeftIcon, LockIcon } from '@/components/ui/Icons';

interface ForgotPasswordFormData {
    email: string;
}

interface ForgotPasswordFormProps {
    onSubmit: (data: ForgotPasswordFormData) => void;
    loading?: boolean;
    linkVerified: boolean,
    onConfirm?: ({ newPassword }: { newPassword: string }) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, onConfirm, loading = false, linkVerified }) => {
    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: '',
    });
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Partial<ForgotPasswordFormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<ForgotPasswordFormData> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleInputChange = (field: keyof ForgotPasswordFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };
    const handleConfirmation = () => {
        onConfirm?.({ newPassword: password });
    }

    if (linkVerified) {
        return <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
                {/* Header */}


                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleConfirmation()
                }} className="space-y-6">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<LockIcon size={20} />}
                        required
                    />
                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full"
                    >
                        Confirm
                    </Button>
                </form>

                {/* Help Text */}
                <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600 text-center">
                        <strong>Need help?</strong> Contact our support team at{' '}
                        <a href="mailto:support@dentistportal.com" className="text-primary-600 hover:text-primary-700">
                            support@dentistportal.com
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    }


    return (
        <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MailIcon className="text-primary-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">Forgot Password?</h2>
                    <p className="text-neutral-600">
                        No worries! Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={errors.email}
                        icon={<MailIcon size={20} />}
                        required
                    />

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full"
                    >
                        Send Reset Link
                    </Button>
                </form>

                {/* Back to Login */}
                <div className="mt-8 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        <ArrowLeftIcon size={16} />
                        <span>Back to Login</span>
                    </Link>
                </div>

                {/* Help Text */}
                <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600 text-center">
                        <strong>Need help?</strong> Contact our support team at{' '}
                        <a href="mailto:support@dentistportal.com" className="text-primary-600 hover:text-primary-700">
                            support@dentistportal.com
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ForgotPasswordForm;
