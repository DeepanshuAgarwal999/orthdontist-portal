import React from 'react';
import { ToothIcon } from '@/components/ui/Icons';
import AuthFeatures from './AuthFeatures';
import Image from 'next/image';
import logo from '../../assets/images/logo.jpg';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    showFeatures?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    showFeatures = true
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex">
            {/* Left Side - Features/Branding */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
                <div className="absolute inset-0 gradient-dental opacity-90" />

                {/* Decorative Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-32 right-16 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary-400/10 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10 flex flex-col justify-center px-12 pb-16 pt-6 text-white">
                    {/* Logo/Brand */}
                    {/* <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <ToothIcon className="text-white" size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">DentistPortal</h1>
                                <p className="text-white/80 text-sm">Professional Dental Network</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="p-2 mb-6">
                        <Image src={logo.src} alt="logo" width={120} height={50} className='rounded-xl' />
                    </div>

                    {/* Features */}
                    {showFeatures && <AuthFeatures />}
                </div>

                {/* Bottom Brand Line */}
                <div className="absolute bottom-6 left-12 right-12 z-10">
                    <div className="flex items-center justify-between text-white/60 text-sm">
                        <span>© 2025 DentistPortal. All rights reserved.</span>
                        <div className="flex items-center space-x-4">
                            <span>🌟 4.9/5 Rating</span>
                            <span>•</span>
                            <span>10K+ Users</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 lg:flex-none lg:w-[480px] xl:w-[520px] flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="p-3 bg-primary-100 rounded-xl">
                                <ToothIcon className="text-primary-600" size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-neutral-800">DentistPortal</h1>
                                <p className="text-neutral-600 text-sm">Professional Dental Network</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Header */}
                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h2>
                        <p className="text-neutral-600 leading-relaxed">{subtitle}</p>
                    </div>

                    {/* Form Content */}
                    {children}

                    {/* Mobile Features Summary */}
                    <div className="lg:hidden mt-12 grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-primary-50 rounded-xl">
                            <div className="text-primary-600 font-semibold">500+</div>
                            <div className="text-neutral-600 text-sm">Cities</div>
                        </div>
                        <div className="text-center p-4 bg-secondary-50 rounded-xl">
                            <div className="text-secondary-600 font-semibold">10K+</div>
                            <div className="text-neutral-600 text-sm">Professionals</div>
                        </div>
                        <div className="text-center p-4 bg-accent-50 rounded-xl">
                            <div className="text-accent-600 font-semibold">24/7</div>
                            <div className="text-neutral-600 text-sm">Support</div>
                        </div>
                        <div className="text-center p-4 bg-neutral-50 rounded-xl">
                            <div className="text-neutral-600 font-semibold">4.9★</div>
                            <div className="text-neutral-600 text-sm">Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
