import Image from 'next/image'
import React from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

const testimonials = [{
    name: "John Doe",
    imageUrl: "/images/john.png",
    message: "VClear Aligners team has consistently provided our practice with invaluable support, from training to case consultation. Their dedication to ensuring the success of every treatment plan is evident in the exceptional patient outcomes we have achieved."
}]

const TestimonialCard = ({ name, imageUrl, message }: { name: string, imageUrl: string, message: string }) => {
    return (
        <div className='bg-white shadow-md rounded-lg w-xs  relative mb-4 mt-20 mx-4 border border-b-2  border-b-blue-900 group hover:translate-y-1 duration-300 ease-in-out'>
            <div className='rounded-full absolute left-1/2 -translate-x-1/2 -top-20 flex items-center justify-center bg-red-500 w-40 h-40 border-2 border-gray-50 group-hover:border-blue-900'>
                {
                    imageUrl && <Image src={imageUrl} alt='Why us card' width={400} height={400} className='w-full max-h-[180px] rounded-full' />
                }

            </div>
            <div className='p-4 pt-20'>
                <h1 className='text-center text-xl font-bold my-4'>
                    {name}
                </h1>
                <p className='text-gray-600 px-1 text-center font-medium break-words line-clamp-6'>
                    {message}
                </p>
            </div>
        </div>
    )
}
const Testimonials = () => {
    return (
        <section className='pt-10 pb-20'>
            <h1 className='text-black text-3xl md:text-5xl text-center font-semibold'>
                Our Testimonials
            </h1>
            <div className='max-w-7xl mx-auto mt-20'>
                <Swiper modules={[Navigation]}
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
                    }}>
                    {testimonials.map((testimonial, idx) => (
                        <SwiperSlide key={idx}>
                            <TestimonialCard {...testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Testimonials