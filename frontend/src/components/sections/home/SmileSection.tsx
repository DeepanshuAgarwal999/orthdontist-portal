import React from 'react'

const SmileSection = () => {
    const features = [
        {
            id: 1,
            title: "Crystal Clear Aligners",
            description: "ALIGNER360 delivers virtually invisible orthodontic solutions that blend seamlessly with your lifestyle, ensuring confidence in every smile.",
            links: [],
            gradient: "from-orange-400 via-red-400 to-pink-500",
            bgPattern: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            iconBg: "bg-orange-100"
        },
        {
            id: 2,
            title: "Accelerated Results",
            description: "Experience industry-leading treatment speeds with our AI-powered precision technology, delivering optimal results in minimal time.",
            links: [],
            gradient: "from-blue-400 via-purple-400 to-indigo-500",
            bgPattern: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            iconBg: "bg-blue-100"
        },
        {
            id: 3,
            title: "Flexible Payment Plans",
            description: "Transform your smile with budget-friendly options including zero-interest EMI plans through our trusted financial partners.",
            links: [],
            gradient: "from-green-400 via-teal-400 to-cyan-500",
            bgPattern: "radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            iconBg: "bg-green-100"
        }
    ];

    return (
        <section className="py-20">
            <h1 className='text-black text-3xl md:text-5xl text-center '>
                Your Best Smile Starts Here.
            </h1>
            <div className="flex flex-col items-center text-center gap-2 pt-8">
                <div className="text-xl md:text-2xl font-medium">We love your smile !</div>
                <div className="text-xl md:text-2xl font-medium">Lets make it great...</div>
                <div className="text-xl md:text-2xl font-medium">Remove Gaps in Teeth</div>
                <div className="text-xl md:text-2xl font-medium">Straighten Crooked Teeth</div>
                <div className="text-xl md:text-2xl font-medium">
                    Get <span className="text-green-500">Teeth</span> in Perfect Alignment
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 hover:border-gray-200"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                            }}
                        >
                            {/* Unique Background Pattern */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                style={{
                                    backgroundImage: feature.bgPattern
                                }}
                            />

                            {/* Minimal Floating Elements */}
                            <div className="absolute top-3 right-3 w-2 h-2 bg-blue-700 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-3 w-1 h-1 bg-blue-900 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

                            {/* Icon Container */}
                            <div className="relative p-6 pb-4">
                                <div>

                                </div>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-200 text-center">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed mb-5 group-hover:text-gray-700 transition-colors duration-200">
                                    {feature.description}
                                </p>

                                <div className="space-y-2">
                                    {feature.links.map((link, linkIndex) => (
                                        <div key={linkIndex} className="flex items-center group/link cursor-pointer">
                                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 group-hover/link:bg-orange-600 transition-colors duration-200" />
                                            <span className="text-orange-500 text-sm font-medium group-hover/link:text-orange-700 transition-colors duration-200">
                                                {link}
                                            </span>
                                            <svg
                                                className="w-3 h-3 ml-1 text-orange-400 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Minimal Hover Border Effect */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-orange-100 rounded-2xl transition-all duration-200" />
                        </div>
                    ))}
                </div>


                <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
            </div>
        </section>
    )
}

export default SmileSection