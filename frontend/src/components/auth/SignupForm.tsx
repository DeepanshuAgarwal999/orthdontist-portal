import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import {
    MailIcon,
    LockIcon,
    EyeIcon,
    EyeOffIcon,
    UserIcon,
    PhoneIcon,
    MapPinIcon,
    ShieldCheckIcon,
    GoogleIcon
} from '@/components/ui/Icons';

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: 'dentist' | 'patient';
    licenseNumber?: string;
    location?: string;
    agreeToTerms: boolean;
    agreeToMarketing: boolean;
}

interface SignupFormProps {
    onSubmit: (data: SignupFormData) => Promise<void>;
    loading?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading = false }) => {
    const [formData, setFormData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'patient',
        licenseNumber: '',
        location: '',
        agreeToTerms: false,
        agreeToMarketing: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<SignupFormData>>({});
    const [currentStep, setCurrentStep] = useState(1);

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<SignupFormData> = {};

        if (step === 1) {
            if (!formData.firstName) newErrors.firstName = 'First name is required';
            if (!formData.lastName) newErrors.lastName = 'Last name is required';
            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
            if (!formData.phone) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
                newErrors.phone = 'Please enter a valid phone number';
            }
        }

        if (step === 2) {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
                newErrors.password = 'Password must contain uppercase, lowercase, and number';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            } if (formData.role === 'dentist' && !formData.licenseNumber) {
                newErrors.licenseNumber = 'License number is required for dentists';
            }
        } if (step === 3) {
            if (!formData.agreeToTerms) {
                // @ts-ignore
                newErrors.agreeToTerms = 'You must agree to the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(3)) {
            await onSubmit(formData);
        }
    };

    const handleInputChange = (field: keyof SignupFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
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
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">Create Your Account</h2>
                    <p className="text-neutral-600">Join our dental community today</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    {[1, 2, 3].map((step) => (
                        <React.Fragment key={step}>
                            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-neutral-200 text-neutral-500'
                                }
              `}>
                                {currentStep > step ? (
                                    <ShieldCheckIcon size={16} />
                                ) : (
                                    step
                                )}
                            </div>
                            {step < 3 && (
                                <div className={`
                  w-12 h-0.5 mx-2
                  ${currentStep > step ? 'bg-primary-500' : 'bg-neutral-200'}
                `} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-semibold text-neutral-800">Basic Information</h3>
                                <p className="text-sm text-neutral-600">Tell us about yourself</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleInputChange('firstName')}
                                    error={errors.firstName}
                                    icon={<UserIcon size={20} />}
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleInputChange('lastName')}
                                    error={errors.lastName}
                                    required
                                />
                            </div>

                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={handleInputChange('email')}
                                error={errors.email}
                                icon={<MailIcon size={20} />}
                                required
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={formData.phone}
                                onChange={handleInputChange('phone')}
                                error={errors.phone}
                                icon={<PhoneIcon size={20} />}
                                required
                            />

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-neutral-700">
                                    I am a... <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`
                    relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${formData.role === 'patient'
                                            ? 'border-primary-500 bg-primary text-white'
                                            : 'border-neutral-200 hover:border-neutral-300'
                                        }
                  `}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="patient"
                                            checked={formData.role === 'patient'}
                                            onChange={handleInputChange('role')}
                                            className="sr-only"
                                        />
                                        <span className="font-medium">Patient</span>
                                    </label>
                                    <label className={`
                    relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${formData.role === 'dentist'
                                            ? 'border-primary-500 bg-primary text-white'
                                            : 'border-neutral-200 hover:border-neutral-300'
                                        }
                  `}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="dentist"
                                            checked={formData.role === 'dentist'}
                                            onChange={handleInputChange('role')}
                                            className="sr-only"
                                        />
                                        <span className="font-medium">dentist</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Security & Professional Details */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-semibold text-neutral-800">Security & Professional Details</h3>
                                <p className="text-sm text-neutral-600">Secure your account and professional info</p>
                            </div>

                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password"
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

                            <Input
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange('confirmPassword')}
                                error={errors.confirmPassword}
                                icon={<LockIcon size={20} />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-neutral-400 hover:text-neutral-600"
                                    >
                                        {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                    </button>
                                }
                                required
                            />

                            {formData.role === 'dentist' && (
                                <>
                                    <Input
                                        label="License Number"
                                        type="text"
                                        placeholder="Your dental license number"
                                        value={formData.licenseNumber}
                                        onChange={handleInputChange('licenseNumber')}
                                        error={errors.licenseNumber}
                                        icon={<ShieldCheckIcon size={20} />}
                                        required
                                    />
                                    <Input
                                        label="Practice Location (Optional)"
                                        type="text"
                                        placeholder="City, State"
                                        value={formData.location}
                                        onChange={handleInputChange('location')}
                                        icon={<MapPinIcon size={20} />}
                                    />
                                </>
                            )}

                            <div className="bg-neutral-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-neutral-700 mb-2">Password Requirements:</h4>
                                <ul className="text-xs text-neutral-600 space-y-1">
                                    <li className="flex items-center">
                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-neutral-300'
                                            }`} />
                                        At least 8 characters
                                    </li>
                                    <li className="flex items-center">
                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'bg-green-500' : 'bg-neutral-300'
                                            }`} />
                                        Upper and lowercase letters
                                    </li>
                                    <li className="flex items-center">
                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${/(?=.*\d)/.test(formData.password) ? 'bg-green-500' : 'bg-neutral-300'
                                            }`} />
                                        At least one number
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Terms & Completion */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-semibold text-neutral-800">Almost Done!</h3>
                                <p className="text-sm text-neutral-600">Review and agree to our terms</p>
                            </div>

                            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
                                <div className="flex items-start space-x-3">
                                    <ShieldCheckIcon className="text-primary-500 mt-1" size={24} />
                                    <div>
                                        <h4 className="font-semibold text-primary-800 mb-2">Account Verification</h4>
                                        <p className="text-sm text-primary-700">
                                            {formData.role === 'dentist'
                                                ? 'Your account will be reviewed by our team before activation. You\'ll receive an email confirmation within 24-48 hours.'
                                                : 'You\'ll receive an email verification link to activate your account.'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-start space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange('agreeToTerms')}
                                        className="mt-1 h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="text-sm text-neutral-700">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-primary-600 hover:text-primary-700 underline">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                                            Privacy Policy
                                        </Link>
                                        <span className="text-red-500 ml-1">*</span>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="text-red-500 text-sm ml-7">{errors.agreeToTerms}</p>
                                )}

                                <label className="flex items-start space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToMarketing}
                                        onChange={handleInputChange('agreeToMarketing')}
                                        className="mt-1 h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="text-sm text-neutral-700">
                                        I would like to receive updates about dental care tips and platform news
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex space-x-3 pt-4">
                        {currentStep > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1"
                            >
                                Back
                            </Button>
                        )}

                        {currentStep < 3 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="flex-1"
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                loading={loading}
                                className="flex-1"
                            >
                                Create Account
                            </Button>
                        )}
                    </div>
                </form>

                {/* OAuth Options */}
                {/* <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-neutral-500">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-4 border-neutral-200 hover:bg-neutral-50"
                    >
                        <GoogleIcon size={20} className="mr-2" />
                        Google
                    </Button>
                </div> */}

                {/* Login Link */}
                <p className="text-center text-sm text-neutral-600 mt-8">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};

export default SignupForm;
