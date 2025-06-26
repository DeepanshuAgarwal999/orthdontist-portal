'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import WhyUsCard from "@/components/WhyUsCard";
import { Navigation } from "swiper/modules";
import 'swiper/css/navigation';

const data = [{
    title: "Why choose LIGNER360?",
    description: "LIGNER360 clear aligners are meticulously crafted by skilled dental professionals, including certified and experienced MDS orthodontists, ensuring precision and expert care in every step of your smile transformation",
    imageUrl: "/images/aligner360.png"
}, {
    title: "Why choose LIGNER360?",
    description: "LIGNER360 clear aligners are meticulously crafted by skilled dental professionals, including certified and experienced MDS orthodontists, ensuring precision and expert care in every step of your smile transformation",
    imageUrl: "/images/aligner360.png"
}, {
    title: "Why choose LIGNER360?",
    description: "LIGNER360 clear aligners are meticulously crafted by skilled dental professionals, including certified and experienced MDS orthodontists, ensuring precision and expert care in every step of your smile transformation", imageUrl: "/images/aligner360.png"
},
{
    title: "Why choose LIGNER360?",
    description: "LIGNER360 clear aligners are meticulously crafted by skilled dental professionals, including certified and experienced MDS orthodontists, ensuring precision and expert care in every step of your smile transformation", imageUrl: "/images/aligner360.png"
}
]
const WhyAligner360 = () => {


    return (
        <section className='py-20'>
            <h1 className='text-black text-3xl md:text-5xl text-center '>
                Why should you choose <span className='text-blue-900 underline'>Aligner360</span>
            </h1>
            <p className='text-gray-600 text-center mt-10 font-medium max-w-4xl mx-auto'>
                LIGNER360 clear aligners are meticulously crafted by skilled dental professionals, including certified and experienced MDS orthodontists, ensuring precision and expert care in every step of your smile transformation
            </p>
            <div className="mt-10 max-w-7xl mx-auto ">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    navigation={true}
                    loop={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <WhyUsCard {...item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default WhyAligner360