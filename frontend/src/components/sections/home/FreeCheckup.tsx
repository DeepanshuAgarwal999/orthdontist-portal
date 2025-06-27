import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FreeCheckup = () => {
    return (
        <div className='py-20 bg-[#2563eb] rounded-4xl mx-4 relative overflow-hidden px-4'>
                <Image className='absolute -scale-x-100 -right-10 -bottom-6 opacity-10 rounded-lg' alt='Aligner360 Aligners' src={'/images/brace2.png'} width={350} height={400}  />
            <div className='flex flex-col md:flex-row items-center gap-10 justify-between max-w-7xl mx-auto'>
                <Image src={'/images/doctor-illustration.png'} alt='orthodontist' width={800} height={400} className='w-full h-full object-cover ' />
                <div className=' p-12 text-white'>
                    <h1 className='text-3xl font-semibold md:text-4xl !leading-[4rem] !tracking-wider'>
                        Get expert-led orthodontic care from certified dentists at fully equipped dental clinics
                    </h1>
                    <div className='w-36 bg-white h-2 mt-4' />
                    <p className='mt-6'>
                        Your treatment will be carefully handled and closely supervised by experienced dentists at advanced dental clinics—ensuring a seamless, hassle-free experience from start to finish.
                    </p>
                    <Link href={'/#contact'}>
                        <Button className='mt-12 bg-white text-blue-900'>Book a FREE checkup</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default FreeCheckup