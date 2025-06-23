'use client'
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    EyeIcon,
    ShieldCheckIcon,
    ToothIcon,
    TrendingUpIcon,
    UsersIcon,
    AwardIcon
} from '@/components/ui/Icons';
import Link from 'next/link';

// Custom icons for specific benefits
const InvisibleIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" opacity="0.3" />
        <circle cx="12" cy="12" r="3" opacity="0.7" />
        <path d="M8.5 8.5l7 7" />
    </svg>
);

const FastIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
        <path d="M16 2l4 4-4 4" />
    </svg>
);

const SmileyIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
);

const RemovableIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 3h6v2H9z" />
        <path d="M4 7h16l-1 10H5L4 7z" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1-4" />
        <path d="M19 7l-1-4" />
    </svg>
);

const CreditCardIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
);

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    accentColor: string;
}

const benefits: Benefit[] = [
    {
        icon: <SmileyIcon size={48} className="text-white" />,
        title: "You can see the result",
        description: "The virtual set up treatment plan, which is a 3D treatment planning, will allow you to visualize the final position of your teeth at the end of your treatment course.",
        gradient: "from-blue-400 to-blue-600",
        accentColor: "blue"
    },
    {
        icon: <ToothIcon size={48} className="text-white" />,
        title: "No restrictions on what to eat/drink",
        description: "You can usually eat whatever you desire while in treatment because the aligners are removed when eating/drinking. Thus, there is no need to refrain from your favourite foods and drinks unless instructed by your doctor.",
        gradient: "from-green-400 to-green-600",
        accentColor: "green"
    },
    {
        icon: <InvisibleIcon size={48} className="text-white" />,
        title: "Virtually invisible",
        description: "ODONTO are virtually invisible and discreet, so most people will not even notice that you are wearing them.",
        gradient: "from-purple-400 to-purple-600",
        accentColor: "purple"
    },
    {
        icon: <ShieldCheckIcon size={48} className="text-white" />,
        title: "No Damage to the teeth if Aligner breaks/gets detected",
        description: "Contact your doctor if you have lost or broken an aligner. As your doctor may recommend that you temporarily go back one aligner while a replacement is being made. You can then resume wearing your normal sequence.",
        gradient: "from-red-400 to-red-600",
        accentColor: "red"
    },
    {
        icon: <RemovableIcon size={48} className="text-white" />,
        title: "Safe and Removable",
        description: "ODONTO clear aligners are removable so you can brush & floss your teeth & maintain good oral hygiene. Traditional braces come with problems like bits of food getting trapped, which can contribute to tooth decay and gum disease. ODONTO clear aligners are removable, so you can brush and floss just like you normally would.",
        gradient: "from-teal-400 to-teal-600",
        accentColor: "teal"
    },
    {
        icon: <FastIcon size={48} className="text-white" />,
        title: "Rapid Results",
        description: "Compared to other teeth straightening methods, ODONTO works fast. On average, total treatment time with ODONTO is 12-18 months, and many people notice results in a matter of weeks.",
        gradient: "from-orange-400 to-orange-600",
        accentColor: "orange"
    },
    {
        icon: <SmileyIcon size={48} className="text-white" />,
        title: "Feel Better about Yourself",
        description: "Finally, and most importantly to me, is that ODONTO quickly help people to feel better about themselves because they are invisible and help in correcting the smiles without being noticed and having to stop anything.",
        gradient: "from-pink-400 to-pink-600",
        accentColor: "pink"
    }
];
const AlignBenefitsPage: React.FC = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-32 right-16 w-48 h-48 bg-secondary-200/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent-200/20 rounded-full blur-2xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-200">
                            <ToothIcon size={16} className="mr-2" />
                            Advanced Clear Aligner Technology
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                        Advantages of
                        <br />
                        <span className="gradient-text">ODONTO</span>
                    </h1>

                    <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        ODONTO clear aligners treatment is provided at a registered dental clinic by a qualified and experienced dentist only.
                        Our Treatment protocol is based on our experience of treatments provided to more than a million patients.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href="/contact">
                            <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                                Get Started Today
                            </Button>
                        </Link>
                        <Link href="/process">
                            <Button size="xl" variant="outline" className="w-full sm:w-auto">
                                Learn Our Process
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center space-x-8 text-sm text-neutral-600">
                        <div className="flex items-center space-x-2">
                            <ShieldCheckIcon size={16} className="text-green-500" />
                            <span>FDA Approved</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <AwardIcon size={16} className="text-primary-500" />
                            <span>1M+ Patients</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-500">⭐</span>
                            <span>4.9/5 Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Why Choose ODONTO Clear Aligners?
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Experience the revolutionary advantages that make ODONTO the preferred choice for modern teeth straightening
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-6">
                                        {/* Icon Circle */}
                                        <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                                            {benefit.icon}
                                            <div className={`absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full opacity-60`}></div>
                                            <div className={`absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full opacity-80`}></div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-neutral-600 leading-relaxed text-base">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Additional Stats Section */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                            <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                            <div className="text-blue-700 font-medium">Patients Treated</div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                            <div className="text-3xl font-bold text-green-600 mb-2">12-18</div>
                            <div className="text-green-700 font-medium">Months Average</div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                            <div className="text-purple-700 font-medium">Success Rate</div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                            <div className="text-orange-700 font-medium">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment & EMI Section */}
            <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Affordable Payment Options
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            We make advanced dental care accessible with flexible payment plans
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                        <CreditCardIcon size={32} className="text-white" />
                                        <div className="absolute top-1 right-1 w-3 h-3 bg-orange-300 rounded-full opacity-60"></div>
                                        <div className="absolute bottom-1 left-1 w-2 h-2 bg-orange-200 rounded-full opacity-80"></div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-4">0% EMI Available</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Pay in easy installments with our finance partners. No hidden charges, transparent pricing.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                        <ShieldCheckIcon size={32} className="text-white" />
                                        <div className="absolute top-1 right-1 w-3 h-3 bg-green-300 rounded-full opacity-60"></div>
                                        <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-200 rounded-full opacity-80"></div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-4">Insurance Accepted</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Most dental insurance plans are accepted. We'll help you maximize your benefits.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                        <UsersIcon size={32} className="text-white" />
                                        <div className="absolute top-1 right-1 w-3 h-3 bg-blue-300 rounded-full opacity-60"></div>
                                        <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-200 rounded-full opacity-80"></div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-4">Family Discounts</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Special pricing for multiple family members. Start your family's smile journey together.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold  mb-6">
                        Ready to Transform Your Smile?
                    </h2>
                    <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                        Join over 1 million patients who have chosen ODONTO clear aligners for their smile transformation. Start your journey today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact">
                            <Button size="xl" variant="gradient" className="w-full sm:w-auto  text-white border-white hover:bg-primary-50">
                                Schedule Consultation
                            </Button>
                        </Link>
                        <Link href="/orthodontist-list">
                            <Button size="xl" variant="outline" className="w-full sm:w-auto">
                                Find dentist
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center space-x-8 text-sm ">
                        <div className="flex items-center space-x-2">
                            <ShieldCheckIcon size={16} className="text-primary-200" />
                            <span>FDA Approved Treatment</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>•</span>
                            <span>1M+ Success Stories</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>•</span>
                            <span>30-Day Money Back</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AlignBenefitsPage;

