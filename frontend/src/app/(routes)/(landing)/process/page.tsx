'use client'

import steps from '@/constants/process'
import React, { useEffect, useState } from 'react'
const Process = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const stepElements = document.querySelectorAll('[data-step]') as NodeListOf<HTMLElement>;
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            stepElements.forEach((element, index) => {
                const stepTop = element.offsetTop;
                const stepBottom = stepTop + element.offsetHeight;

                if (scrollPosition >= stepTop && scrollPosition <= stepBottom) {
                    setActiveStep(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (




        <section className="min-h-screen bg-gray-50 py-20">
            {/* Header Section */}            <h1 className='gradient-text  text-4xl font-bold text-center '>
                THE ALIGNER360 PROCESS... SIMPLE... FAST... EFFECTIVE
            </h1>

            {/* Modern Video Frame */}
            <div className="relative mx-auto mt-20 max-w-4xl">
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Video Container with Gradient Border */}
                    <div className="relative p-2 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-2xl">
                        <div className="relative bg-black rounded-xl overflow-hidden">
                            <video
                                className="w-full h-auto aspect-video"
                                controls
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster="/images/video-poster.jpg"
                            >
                                <source src="/videos/process.mp4" type="video/mp4" />
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

                    {/* Video Caption */}
                    <div className="p-6 text-center">
                        <p className="text-gray-600 text-sm font-medium">
                            Watch how our simple process transforms smiles
                        </p>
                    </div>
                </div>
            </div>            {/* Main Process Section with Sticky Effect */}
            <div className="relative max-w-7xl mx-auto px-4 mt-32">
                <div className="text-center mb-20">
                    <h2 className="gradient-text text-3xl font-bold mb-4">
                        THE ALIGNER360 PROCESS
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Get straighter teeth in 4 easy steps with our revolutionary process
                    </p>
                </div>

                <div className="flex gap-16">
                    {/* Sticky Steps Navigation */}
                    <div className="w-1/3 sticky top-32 h-fit">
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
                    </div>

                    {/* Steps Content */}
                    <div className="w-2/3 space-y-32">
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
            </div>{/* Bottom CTA Section */}
            <div className="bg-primary text-white py-12 mt-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-4">Still in Doubt?</h3>
                    <p className="text-lg mb-8 opacity-90">
                        Contact our professional team for a free consultation
                    </p>
                    <button className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors duration-300 shadow-lg">
                        Get Started Today
                    </button>
                </div>
            </div>

        </section>


    )
}

export default Process