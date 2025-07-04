'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import WhyUsCard from "@/components/WhyUsCard";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css/navigation';

const data = [
    {
        title: "Diastema Treatment",
        description: "Close unwanted gaps between teeth with gentle, precise aligner therapy—designed to bring your smile into perfect harmony.",
        imageUrl: "/images/treatment/t6.jpg"
    },
    {
        title: "Deep Bite Treatment",
        description: "Reduce excessive overlap between upper and lower teeth with a treatment plan that improves both function and aesthetics.",
        imageUrl: "/images/treatment/t5.jpg"
    },
    {
        title: "Generalised Spacing",
        description: "Even out spacing across your smile by gradually aligning teeth and closing visible gaps for a more balanced look.",
        imageUrl: "/images/treatment/t1.jpg"
    },
    {
        title: "Cross Bite Treatment",
        description: "Correct misaligned bites by guiding teeth into their ideal positions—helping prevent wear and improving jaw alignment.",
        imageUrl: "/images/treatment/t4.jpg"
    },
    {
        title: "Open Bite Treatment",
        description: "Encourage front teeth to meet properly with aligners that support vertical movement—enhancing speech, chewing, and confidence.",
        imageUrl: "/images/treatment/t3.jpg"
    },
    {
        title: "Crowding",
        description: "Gently align overlapping or crowded teeth to create a straighter, healthier smile and make oral hygiene easier.",
        imageUrl: "/images/treatment/t2.jpg"
    }
];


const OurTreatment = () => {
    return (
        <section className='py-20'>
            <h1 className='text-black text-3xl md:text-5xl text-center '>
                Our Treatment
            </h1>
            <p className='text-gray-600 text-center mt-10 font-medium max-w-4xl mx-auto'>
                Comprehensive Care for Every Smile From closing gaps and straightening crooked teeth to achieving perfect alignment, Aligner360 clear aligners are designed to treat a wide range of orthodontic concerns—delivered with expert precision.
            </p>
            <div className="mt-10 max-w-7xl mx-auto ">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
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

export default OurTreatment
