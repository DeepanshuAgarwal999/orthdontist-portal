import React from 'react';
import {
    ShieldCheckIcon,
    UsersIcon,
    ClipboardListIcon,
    TrendingUpIcon,
    CalendarIcon,
    MessageCircleIcon,
    MapPinIcon,
    AwardIcon
} from '@/components/ui/Icons';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const AuthFeatures: React.FC = () => {
    const features: Feature[] = [
        {
            icon: <ShieldCheckIcon size={24} />,
            title: "Verified Professionals",
            description: "All dentists are verified with valid licenses and credentials for your peace of mind."
        },
        {
            icon: <UsersIcon size={24} />,
            title: "Network of Experts",
            description: "Connect with thousands of qualified dental professionals across the region."
        },
        {
            icon: <ClipboardListIcon size={24} />,
            title: "Professional Profiles",
            description: "Comprehensive profiles with specializations, experience, and patient reviews."
        },
        {
            icon: <TrendingUpIcon size={24} />,
            title: "Practice Growth",
            description: "Tools and insights to help dental practices grow and serve more patients."
        },
        {
            icon: <CalendarIcon size={24} />,
            title: "Easy Scheduling",
            description: "Streamlined appointment booking system for seamless patient management."
        },
        {
            icon: <MessageCircleIcon size={24} />,
            title: "Secure Communication",
            description: "HIPAA-compliant messaging system for professional consultations."
        },
        {
            icon: <MapPinIcon size={24} />,
            title: "Location-Based Search",
            description: "Find dental professionals and services in your specific area."
        },
        {
            icon: <AwardIcon size={24} />,
            title: "Quality Assurance",
            description: "Continuous monitoring and quality assurance for all listed professionals."
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                    Trusted by
                    <br />
                    <span className="text-accent-200">10,000+ Dental Professionals</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                    Join the largest network of verified dental professionals dedicated to
                    providing exceptional patient care and advancing the dental community.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {features.slice(0, 4).map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                        <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
                            <div className="text-white">
                                {feature.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-8 mb-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">500+</div>
                            <div className="text-white/80 text-sm">Cities Covered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">24/7</div>
                            <div className="text-white/80 text-sm">Support Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">99%</div>
                            <div className="text-white/80 text-sm">Satisfaction Rate</div>
                        </div>
                    </div>
                    <p className="text-white/80 text-sm">
                        Trusted by dental professionals nationwide for quality and reliability
                    </p>
                </div>
            </div>

            <div className="pt-4">
                <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <span>🔒 HIPAA Compliant</span>
                    <span>•</span>
                    <span>🛡️ SSL Secured</span>
                    <span>•</span>
                    <span>✅ ADA Approved</span>
                </div>
            </div>
        </div>
    );
};

export default AuthFeatures;
