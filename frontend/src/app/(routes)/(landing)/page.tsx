'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
    ToothIcon,
    ShieldCheckIcon,
    UsersIcon,
    TrendingUpIcon,
    MapPinIcon,
    AwardIcon
} from '@/components/ui/Icons';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Header */}
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-32 right-16 w-48 h-48 bg-secondary-200/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent-200/20 rounded-full blur-2xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                            Connect with
                            <br />
                            <span className="gradient-text">Trusted Dental Professionals</span>
                        </h1>
                        <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join the largest network of verified dental professionals. Whether you're a dentist looking to grow your practice or a patient seeking quality care, we connect you with the right people.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link href="/signup">
                                <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                                    Join as a Professional
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                                    Find a Dentist
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center space-x-8 text-sm text-neutral-600">
                            <div className="flex items-center space-x-2">
                                <ShieldCheckIcon size={16} className="text-green-500" />
                                <span>Verified Professionals</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <AwardIcon size={16} className="text-primary-500" />
                                <span>10K+ Users</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-yellow-500">⭐</span>
                                <span>4.9/5 Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Why Choose DentistPortal?
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            We provide the tools and network you need to excel in dental care
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheckIcon size={32} />,
                                title: "Verified Professionals",
                                description: "All dentists are thoroughly verified with valid licenses and credentials for your peace of mind."
                            },
                            {
                                icon: <UsersIcon size={32} />,
                                title: "Network of Experts",
                                description: "Connect with thousands of qualified dental professionals across multiple specializations."
                            },
                            {
                                icon: <MapPinIcon size={32} />,
                                title: "Location-Based Search",
                                description: "Find dental professionals and services in your specific area with advanced filtering."
                            },
                            {
                                icon: <TrendingUpIcon size={32} />,
                                title: "Practice Growth",
                                description: "Tools and insights to help dental practices grow and serve more patients effectively."
                            },
                            {
                                icon: <AwardIcon size={32} />,
                                title: "Quality Assurance",
                                description: "Continuous monitoring and quality assurance for all listed professionals and services."
                            },
                            {
                                icon: <ToothIcon size={32} />,
                                title: "Specialized Care",
                                description: "Access to specialists in orthodontics, periodontics, oral surgery, and more."
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 bg-white rounded-2xl shadow-soft border border-neutral-100 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="p-3 bg-primary-100 rounded-xl w-fit mb-6">
                                    <div className="text-primary-600">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3>
                                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="pt-20 bg-gradient-to-r from-primary-600 to-primary-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2  lg:grid-cols-4 gap-8 text-center text-primary">
                        <div>
                            <div className="text-4xl font-bold mb-2">10K+</div>
                            <div className="text-neutral-700">Verified Professionals</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-neutral-700">Cities Covered</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">1M+</div>
                            <div className="text-neutral-700">Patients Served</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">4.9★</div>
                            <div className="text-neutral-700">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Treatment Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Advanced Treatment Options
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Experience the latest in dental technology and convenient payment options
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Invisible Braces */}
                        <div className="text-center group">
                            <div className="relative mb-8">
                                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full"></div>
                                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                                        <ToothIcon size={48} className="text-white" />
                                    </div>
                                    {/* Decorative circles */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-orange-300 rounded-full opacity-60"></div>
                                    <div className="absolute bottom-6 left-6 w-4 h-4 bg-orange-200 rounded-full opacity-80"></div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Invisible Braces!</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                <strong>ALIGNER360</strong> Aligners are super transparent and almost invisible to keep you confident & smile.
                            </p>
                        </div>
                        {/* Fast Treatment */}
                        <div className="text-center group">
                            <div className="relative mb-8">
                                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full"></div>
                                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                                        <TrendingUpIcon size={48} className="text-white" />
                                    </div>
                                    {/* Decorative circles */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-orange-300 rounded-full opacity-60"></div>
                                    <div className="absolute bottom-6 left-6 w-4 h-4 bg-orange-200 rounded-full opacity-80"></div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Fast Treatment!</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                <strong>ALIGNER360</strong> Aligners are as fast as braces. Get the shortest possible treatment time with AI enabled systems.
                            </p>
                        </div>

                        {/* Pay in easy EMI */}
                        <div className="text-center group">
                            <div className="relative mb-8">
                                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full"></div>
                                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                        </svg>
                                    </div>
                                    {/* Decorative circles */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-orange-300 rounded-full opacity-60"></div>
                                    <div className="absolute bottom-6 left-6 w-4 h-4 bg-orange-200 rounded-full opacity-80"></div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Pay in easy EMI</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                We provide affordable payment plans with our finance partners in the form of no cost 0% EMI.
                            </p>
                        </div>
                    </div>

                 
                </div>
            </section >

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                        Ready to Transform Your Dental Experience?
                    </h2>
                    <p className="text-xl text-neutral-600 mb-8">
                        Join thousands of dental professionals and patients who trust DentistPortal for quality dental care connections.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/signup">
                            <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                                Get Started Today
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="xl" variant="outline" className="w-full sm:w-auto">
                                Sign In to Your Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}

        </div >
    );
};

export default HomePage;