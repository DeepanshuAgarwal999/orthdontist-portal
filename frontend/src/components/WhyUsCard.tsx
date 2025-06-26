import Image from 'next/image'
import React from 'react'

type WhyUsCardProps = {
    title: string
    description: string,
    imageUrl: string
}
const WhyUsCard = ({ title, description, imageUrl }: WhyUsCardProps) => {
    return (
        <div className='bg-white shadow-md rounded-lg   my-4 mx-4 border border-b-2  border-b-blue-900'>
            {
                imageUrl && <Image src={imageUrl} alt='Why us card' width={400} height={400} className='w-full max-h-[180px]' />
            }
            <div className='p-4'>
                <h1 className='text-center text-xl font-bold my-4'>
                    {title}
                </h1>
                <p className='text-gray-600 px-1 font-medium break-words'>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default WhyUsCard