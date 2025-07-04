'use client'
import Image from 'next/image'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/config/axios.instance'


type Testimonial = {
    id: string
    name: string
    imageUrl: string
    message: string
}
const TestimonialCard = ({ name, imageUrl, message }: { name: string, imageUrl: string, message: string }) => {
    return (
        <div className='bg-white shadow-md rounded-lg   relative mb-4 mt-20 mx-4 border border-b-2  border-b-blue-900 group hover:translate-y-1 duration-300 ease-in-out'>
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
    const { data } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const response = await axiosInstance.get<{ data: Testimonial[] }>('/testimonial')
            return response.data
        }
    })
    const testimonials = data?.data || []
    if (testimonials.length === 0) {
        return null
    }
    return (
        <section className='pb-16'>
            <h1 className='text-black text-3xl md:text-5xl text-center font-semibold'>
                Our Testimonials
            </h1>
            <div className='max-w-7xl mx-auto mt-20'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
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