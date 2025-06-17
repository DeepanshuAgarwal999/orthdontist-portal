import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, GoogleIcon } from '@/components/ui/Icons';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginFormData> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }; const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleInputChange = (field: keyof LoginFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };
    return (
        <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">Welcome Back</h2>
                    <p className="text-neutral-600">Sign in to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">                    {/* Email Input */}
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={errors.email}
                        icon={<MailIcon size={20} />}
                        required
                    />

                    {/* Password Input */}
                    <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        error={errors.password}
                        icon={<LockIcon size={20} />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-neutral-400 hover:text-neutral-600"
                            >
                                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                        }
                        required
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleInputChange('rememberMe')}
                                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
                            />
                            <span className="text-neutral-600">Remember me</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary hover:text-primary-700 font-medium transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        className="w-full"
                        loading={loading}
                    >
                        Sign In
                    </Button>

                    {/* Divider */}
                    {/* <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-neutral-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-neutral-500">Or continue with</span>
                    </div>
                </div> */}

                    {/* Google Sign In */}
                    {/* <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    icon={<GoogleIcon size={18} />}
                >
                    Sign in with Google
                </Button> */}

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-neutral-600">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-primary hover:text-primary-700 font-semibold transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
