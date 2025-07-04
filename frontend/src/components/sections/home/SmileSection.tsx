'use client';

import Image from 'next/image';

const SmileSection = () => {
    const features = [
        {
            id: 1,
            title: "Crystal Clear Aligners",
            description: "ALIGNER360 delivers virtually invisible orthodontic solutions that blend seamlessly with your lifestyle, ensuring confidence in every smile.",
            links: [],
            image: "/images/i1.jpg",
        },
        {
            id: 2,
            title: "Accelerated Results",
            description: "Experience industry-leading treatment speeds with our AI-powered precision technology, delivering optimal results in minimal time.",
            links: [],
            image: "/images/i2.jpg",
        },
        {
            id: 3,
            title: "Flexible Payment Plans",
            description: "Transform your smile with budget-friendly options including zero-interest EMI plans through our trusted financial partners.",
            links: [],
            image: "/images/i3.jpg",
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 px-4">
                    {features.map((feature, index) => (
                        <div key={feature.id}>
                            <Image src={feature.image} alt={feature.title} width={300} height={300} className='mx-auto' />
                            <div
                                className="group relative  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 hover:border-gray-200"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                                }}
                            >

                                <div className="relative p-6 pb-4">

                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-200 text-center">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-5 group-hover:text-gray-700 transition-colors duration-200">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
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