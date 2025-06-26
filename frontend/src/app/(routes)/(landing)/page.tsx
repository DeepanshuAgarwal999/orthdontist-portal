'use client'
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import WhyAligner360 from '@/components/sections/home/WhyAligner360';
import Testimonials from '@/components/sections/home/Testimonials';
import Faqs from '@/components/sections/home/Faqs';
import DentistForm from '@/components/sections/home/DentistForm';
import FreeCheckup from '@/components/sections/home/FreeCheckup';

const HomePage: React.FC = () => {
    const { user } = useUser();
    const isDoctor = !!user
    const profile = user?.data
    return (
        <div>
            <section className='relative bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 py-20 min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 overflow-hidden'>
                {/* Background SVG Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Large decorative circles */}
                    <svg className="absolute top-10 left-10 opacity-10" width="200" height="200" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" />
                        <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="1" />
                        <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="1" />
                    </svg>

                    {/* Medical cross pattern */}
                    <svg className="absolute top-20 right-20 opacity-15" width="150" height="150" viewBox="0 0 150 150">
                        <path d="M60 30 L90 30 L90 60 L120 60 L120 90 L90 90 L90 120 L60 120 L60 90 L30 90 L30 60 L60 60 Z" fill="white" />
                    </svg>

                    {/* Geometric shapes bottom left */}
                    <svg className="absolute bottom-20 left-0 opacity-20" width="300" height="200" viewBox="0 0 300 200">
                        <path d="M0,200 Q150,50 300,200 L300,200 L0,200 Z" fill="rgba(255,255,255,0.1)" />
                    </svg>

                    {/* Floating particles */}
                    <svg className="absolute top-32 right-32 opacity-30" width="50" height="50" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="3" fill="white" />
                        <circle cx="15" cy="15" r="2" fill="white" />
                        <circle cx="35" cy="20" r="2" fill="white" />
                        <circle cx="20" cy="35" r="1.5" fill="white" />
                    </svg>

                    {/* DNA helix inspired design */}
                    <svg className="absolute bottom-32 right-10 opacity-15" width="100" height="300" viewBox="0 0 100 300">
                        <path d="M20,0 Q80,75 20,150 Q80,225 20,300" fill="none" stroke="white" strokeWidth="2" />
                        <path d="M80,0 Q20,75 80,150 Q20,225 80,300" fill="none" stroke="white" strokeWidth="2" />
                        <circle cx="50" cy="50" r="3" fill="white" />
                        <circle cx="50" cy="150" r="3" fill="white" />
                        <circle cx="50" cy="250" r="3" fill="white" />
                    </svg>

                    {/* Tooth-inspired geometric shape */}
                    <svg className="absolute top-1/2 left-1/4 opacity-10" width="80" height="120" viewBox="0 0 80 120">
                        <path d="M40,10 C50,10 60,20 60,35 L60,80 C60,100 50,110 40,110 C30,110 20,100 20,80 L20,35 C20,20 30,10 40,10 Z" fill="white" />
                    </svg>

                    {/* Curved lines for elegance */}
                    <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
                        <path d="M0,400 Q300,200 600,400 T1200,400" fill="none" stroke="white" strokeWidth="3" />
                        <path d="M0,500 Q400,300 800,500 T1200,500" fill="none" stroke="white" strokeWidth="2" />
                    </svg>

                    {/* Grid pattern */}
                    <svg className="absolute bottom-0 right-0 opacity-5" width="400" height="300" viewBox="0 0 400 300">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="400" height="300" fill="url(#grid)" />
                    </svg>
                </div>

                <div className='max-w-4xl mx-auto text-white relative z-10'>
                    <p className='bg-white rounded-2xl px-2 py-1 text-sm font-semibold mb-2 text-blue-900 w-fit'>
                        ALIGNER360
                    </p>
                    <h1 className='text-3xl md:text-5xl font-bold mb-4'>ELEVATE YOUR PRACTICE WITH ODONTO CLEAR ALIGNERS</h1>
                    <p className='text-xl md:text-3xl mb-8 md:max-w-md text-left'>Your partner in achieving the perfect smile with clear aligners.</p>
                    <Link href={'/login'} className='bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors'>
                        Get Started
                    </Link>
                </div>
                <div className="relative z-10">
                    <Image src={'/images/lady-doctor-2.png'} alt={'lady-doctor'} width={500} height={400} />
                </div>

                {/* Curved Bottom with Layered Shading */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    {/* Shadow Layer 3 - Furthest back */}
                    <svg className="absolute bottom-0 left-0 w-full h-24 md:h-40" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,12 C150,132 350,132 600,72 C850,12 1050,72 1200,32 L1200,120 L0,120 Z"
                            fill="rgba(30, 58, 138, 0.4)" />
                    </svg>

                    {/* Shadow Layer 2 - Middle */}
                    <svg className="absolute bottom-0 left-0 w-full h-20 md:h-36" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,8 C150,128 350,128 600,68 C850,8 1050,68 1200,28 L1200,120 L0,120 Z"
                            fill="rgba(37, 99, 235, 0.3)" />
                    </svg>

                    {/* Shadow Layer 1 - Closest */}
                    <svg className="absolute bottom-0 left-0 w-full h-16 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,4 C150,124 350,124 600,64 C850,4 1050,64 1200,24 L1200,120 L0,120 Z"
                            fill="rgba(59, 130, 246, 0.2)" />
                    </svg>

                    {/* Main White Curve */}
                    <svg className="relative block w-full h-12 md:h-28" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,120 350,120 600,60 C850,0 1050,60 1200,20 L1200,120 L0,120 Z"
                            fill="white" />
                    </svg>
                </div>
            </section>
            <WhyAligner360 />
            <FreeCheckup />
            <Testimonials />
            <DentistForm />
            <Faqs />
        </div>
    );
};

export default HomePage;