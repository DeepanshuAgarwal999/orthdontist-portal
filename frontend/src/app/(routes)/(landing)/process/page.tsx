'use client'

import axiosInstance from '@/config/axios.instance';
import steps from '@/constants/process'
import { useQuery } from '@tanstack/react-query';
import { icon } from 'leaflet';
import Image from 'next/image';
import Link from 'next/link';
import { title } from 'process';
import React, { useEffect, useState } from 'react'


type ProcessData = {
    id: string,
    videoUrl: string,
}
const WorkSteps = [
    {
        title: "Aligner Usage Duration",
        icon: '/images/process/hourglass.png',
        text: "It’s recommended to wear Aligner360 Aligners for at least 22 hours daily, removing them only while eating, brushing, or flossing."
    },
    {
        title: "How Long to Wear Each Set",
        icon: '/images/process/calendar-clock.png',
        text: "Each set of Aligner360 Aligners should be worn for about two weeks to achieve the desired tooth movement before progressing to the next set."
    },
    {
        title: "Estimated Course Duration",
        icon: '/images/process/calendar.png',
        text: "The Aligner360 Aligners are designed to be worn for a maximum of 10 days, but you can wear them for as long as you need."
    },
    {
        title: "Early Signs of Change",
        icon: "/images/process/like.png",
        text: "You may begin to notice subtle improvements in your teeth alignment by the time you complete the 5th or 6th set of aligners."
    },

]

const DifferenceCards = [
    {
        id: 1,
        front: {
            icon: (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "GROWTH",
            subtitle: "Continuous improvement and expansion",
            gradient: "from-teal-400 to-teal-600"
        },
        back: {
            title: "Our Growth Philosophy",
            content: "We believe in sustainable growth that benefits both our patients and our practice. Through continuous learning, technology adoption, and expanding our services, we ensure that every patient receives the best possible care.",
            features: ["Advanced Technology", "Skilled Professionals", "Expanded Services", "Better Outcomes"],
            gradient: "from-teal-400 to-teal-600"
        }
    },
    {
        id: 2,
        front: {
            icon: (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ),
            title: "INNOVATION",
            subtitle: "Cutting-edge technology solutions",
            gradient: "from-blue-400 to-blue-600"
        },
        back: {
            title: "Innovation in Action",
            content: "From 3D printing to AI-powered treatment planning, we embrace innovation to deliver precise, efficient, and comfortable dental solutions that exceed expectations.",
            features: ["3D Scanning", "AI Treatment Planning", "Digital Workflow", "Smart Aligners"],
            gradient: "from-blue-400 to-blue-600"
        }
    },
    {
        id: 3,
        front: {
            icon: (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ),
            title: "COMPASSION",
            subtitle: "Patient-centered care approach",
            gradient: "from-pink-400 to-pink-600"
        },
        back: {
            title: "Compassionate Care",
            content: "We understand that dental treatment can be anxiety-inducing. Our compassionate approach ensures every patient feels comfortable, informed, and cared for throughout their journey.",
            features: ["Patient Comfort", "Clear Communication", "Personalized Care", "Emotional Support"],
            gradient: "from-pink-400 to-pink-600"
        }
    },
    {
        id: 4,
        front: {
            icon: (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
                </svg>
            ),
            title: "DRIVE",
            subtitle: "Commitment to excellence",
            gradient: "from-purple-400 to-purple-600"
        },
        back: {
            title: "Driven by Excellence",
            content: "Our relentless pursuit of excellence drives us to continuously improve our services, invest in the latest technology, and maintain the highest standards of patient care.",
            features: ["Quality Standards", "Continuous Training", "Best Practices", "Patient Satisfaction"],
            gradient: "from-purple-400 to-purple-600"
        }
    }

]

const Process = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
                        setActiveStep(stepIndex);
                    }
                });
            },
            {
                threshold: 0.3, // Trigger when 30% of the element is visible
                rootMargin: '-20% 0px -20% 0px' // Only consider elements in the middle 60% of viewport
            }
        );

        // Observe all step elements
        const stepElements = document.querySelectorAll('[data-step]');
        stepElements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            stepElements.forEach((element) => {
                observer.unobserve(element);
            });
        };
    }, []);

    const { data: processData, isLoading, error } = useQuery({
        queryKey: ['process'],
        queryFn: async () => {
            const response = await axiosInstance.get<{ data: ProcessData[] }>('/process')
            return response.data
        }
    })

    return (

        <section className="min-h-screen bg-gray-50 pt-20">
            {/* Header Section */}
            <h1 className='  text-2xl sm:text-4xl font-bold text-center '>
                THE <span className='text-blue-900'>ALIGNER360</span> PROCESS... SIMPLE... FAST... EFFECTIVE
            </h1>

            {/* Modern Video Frame */}
            <div className="relative mx-auto mt-20 max-w-4xl">
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">                    {/* Video Container with Gradient Border */}
                    {
                        isLoading ? (
                            <div className="relative p-2 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-2xl">
                                <div className="relative bg-black rounded-xl overflow-hidden">
                                    <div className="flex items-center justify-center h-64">
                                        <h1 className="text-xl text-white">Loading video...</h1>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative p-2 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-2xl">
                                <div className="relative bg-black rounded-xl overflow-hidden">
                                    <video
                                        className="w-full h-auto aspect-video"
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    >
                                        <source src={processData?.data?.[0]?.videoUrl || "/videos/process.mp4"} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Play Button Overlay (appears when paused) */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg">
                                            <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* Video Caption */}
                    <div className="p-6 text-center">
                        <p className="text-gray-600 text-sm font-medium">
                            Watch how our simple process transforms smiles
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 mt-32">
                <div className="text-center mb-20">
                    <h2 className=" text-2xl sm:text-4xl  font-bold mb-4">
                        HOW <span className='text-blue-900'>ALIGNER360</span> WORKS?
                    </h2>

                    <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8 py-10'>
                        {
                            WorkSteps.map((step, index) => (
                                <div key={index} >
                                    <h3 className="text-xl font-semibold mb-8 ">{step.title}</h3>
                                    <div className="flex items-center justify-center mb-8">
                                        <Image src={step.icon} width={120} height={100} alt="Aligner360 Aligners" />
                                    </div>
                                    <p className="text-gray-600 text mt-3 text-sm break">{step.text}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* HOW CAN WE MAKE DIFFERENCE Section with Flip Cards */}
                <div className="text-center mb-20">
                    <h2 className=" text-2xl sm:text-4xl font-bold mb-4">
                        HOW CAN WE MAKE DIFFERENCE?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-16">
                        We honor our commitments made to patients. We don't take our commitment lightly.
                        We do everything within our power to meet expectations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Growth Card */}
                        {
                            DifferenceCards.map((card, index) => (
                                <div key={index} className="flip-card h-64  perspective-1000">
                                    <div className="flip-card-inner relative rounded-2xl w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
                                        {/* Front Side */}
                                        <div className="flip-card-front absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center p-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-teal-600 mb-2">{card.front.title}</h3>
                                            <p className="text-gray-600 text-sm text-center">{card.front.subtitle}</p>
                                        </div>
                                        {/* Back Side */}
                                        <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-white">
                                            <h3 className="text-xl font-bold mb-4">{card.back.title}</h3>
                                            <p className="text-sm text-center leading-relaxed">
                                                {card.back.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 mt-32">
                <div className="text-center mb-20">
                    <h2 className=" text-3xl font-bold mb-4">
                        THE <span className='text-blue-900'>ALIGNER360</span> PROCESS
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Get straighter teeth in <span className='text-blue-900'>
                            4 easy steps</span> with our revolutionary process
                    </p>
                </div>
                <div className="flex gap-16">
                    <div className="hidden lg:block w-1/3 sticky top-32 h-fit">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-8">Process Steps</h3>

                            {/* Progress Bar */}
                            <div className="relative mb-8">
                                <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-200"></div>
                                <div
                                    className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500 transition-all duration-500 ease-out"
                                    style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
                                ></div>

                                {steps.map((step, index) => (
                                    <div key={step.id} className="relative flex items-center mb-8 last:mb-0">
                                        {/* Step Circle */}
                                        <div className={`
                                            relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                                            ${index <= activeStep
                                                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg scale-110'
                                                : 'bg-gray-200 text-gray-500'
                                            }
                                        `}>
                                            {index < activeStep ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                step.id
                                            )}
                                        </div>

                                        {/* Step Info */}
                                        <div className="ml-6">
                                            <h4 className={`
                                                font-semibold text-sm transition-colors duration-300
                                                ${index === activeStep ? 'text-blue-600' : index < activeStep ? 'text-green-600' : 'text-gray-500'}
                                            `}>
                                                {step.title}
                                            </h4>
                                            {index === activeStep && (
                                                <p className="text-xs text-gray-600 mt-1 animate-fade-in">
                                                    Currently viewing
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Percentage */}
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-800">
                                    {Math.round(((activeStep + 1) / steps.length) * 100)}%
                                </div>
                                <div className="text-sm text-gray-500">Complete</div>
                            </div>
                        </div>
                    </div>                    {/* Steps Content */}
                    <div className="w-full lg:w-2/3 space-y-1">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                data-step={index}
                                className={`
                                    min-h-screen flex items-center transition-all duration-700
                                    ${index === activeStep ? 'opacity-100 transform translate-y-0' : ''}
                                `}
                            >
                                <div className="w-full">
                                    {/* Step Card */}
                                    <div className={`
                                        bg-white rounded-3xl shadow-2xl overflow-hidden border transition-all duration-500
                                        ${index === activeStep
                                            ? 'border-blue-200 shadow-blue-100/50 scale-105'
                                            : 'border-gray-100 scale-100'
                                        }
                                    `}>
                                        {/* Header with Icon and Number */}
                                        <div className={`
                                            relative p-8 transition-all duration-500
                                            ${index === activeStep
                                                ? 'bg-gradient-to-br from-blue-50 to-green-50'
                                                : 'bg-gray-50'
                                            }
                                        `}>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className={`
                                                    w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                                                    ${index === activeStep
                                                        ? 'bg-gradient-to-br from-blue-500 to-green-500 shadow-lg scale-110'
                                                        : 'bg-white shadow-md'
                                                    }
                                                `}>
                                                    <div className={`
                                                        transition-colors duration-300
                                                        ${index === activeStep ? 'text-white' : 'text-gray-600'}
                                                    `}>
                                                        {step.icon}
                                                    </div>
                                                </div>

                                                <div className={`
                                                    text-6xl font-bold transition-colors duration-300
                                                    ${index === activeStep
                                                        ? 'text-transparent bg-gradient-to-br from-blue-500 to-green-500 bg-clip-text'
                                                        : 'text-gray-200'
                                                    }
                                                `}>
                                                    0{step.id}
                                                </div>
                                            </div>

                                            <h3 className={`
                                                text-2xl font-bold mb-3 transition-colors duration-300
                                                ${index === activeStep ? 'text-gray-800' : 'text-gray-600'}
                                            `}>
                                                {step.title}
                                            </h3>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8">
                                            <p className="text-gray-700 leading-relaxed text-lg">
                                                {step.description}
                                            </p>

                                            {index === activeStep && (
                                                <div className="mt-6 animate-fade-in">
                                                    <div className="flex items-center text-sm text-blue-600 font-medium">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                                                        Step {step.id} of {steps.length}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="bg-primary text-white py-12 mt-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-4">Still in Doubt?</h3>
                    <p className="text-lg mb-8 opacity-90">
                        Contact our professional team for a free consultation
                    </p>
                    <Link href={'/contact'}>
                        <button className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors duration-300 shadow-lg">
                            Get Started Today
                        </button>
                    </Link>
                </div>
            </div>

        </section >


    )
}

export default Process