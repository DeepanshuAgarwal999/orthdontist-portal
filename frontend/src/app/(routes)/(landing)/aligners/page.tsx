import OrthodontistList from '@/components/dentists/orthodontistList'
import Image from 'next/image'
import React from 'react'

const DentistsPage = () => {
    return (
        <div className='relative'>
            <div className='relative'>
                <h1 className='absolute text-3xl sm:text-5xl top-1/3 left-[5%]  md:left-[10%] md:!leading-[3.75rem]'>
                    Clear Aligners Invisible <br /> Braces Treatment
                </h1>

                <Image src={'/images/aligner.png'} alt={'aligner'} width={500} height={500} className='w-full h-full  max-h-[469px]  ' />
            </div>

            <div className='flex flex-col sm:flex-row items-start gap-8 py-10 max-w-7xl mx-auto px-4 mt-8'>
                <h1 className='text-blue-900 font-semibold text-xl w-[200px] '>
                    Why ALIGNER360?
                </h1>
                <p>
                    ALIGNER360 Clear Aligners offer a patient-friendly orthodontic solution that gradually straightens teeth using custom-made, removable trays. Backed by expert dental care and advanced engineering, they deliver precise results—without pain, discomfort, or visible hardware.
                </p>
            </div>

            <div className='flex flex-col max-md:items-center md:flex-row gap-4 max-w-7xl mx-auto mt-8'>
                <div className='min-w-sm'>
                    <h1 className='text-2xl font-semibold'>
                        Hurdles Of Traditional Braces
                    </h1>
                    <Image src='/images/brace1.png' width={500} height={500} alt='aligner360' className='my-4' />
                    <Image src='/images/brace2.png' width={500} height={500} alt='aligner360' />
                </div>
                <div className='bg-blue-900 p-8  text-white flex flex-col gap-4 justify-between'>
                    <p>
                        Dental braces are effective for aligning teeth and correcting bite issues. However, they often come with discomfort and pain—especially during the adjustment phase. They also impose dietary restrictions and complicate oral hygiene, increasing the risk of cavities and gum disease.
                    </p>
                    <p>
                        Aesthetic drawbacks are another concern, as traditional metal braces are visible and can affect self-esteem. The treatment duration tends to be long and requires frequent visits. Emergencies like broken wires or brackets add to the inconvenience.
                    </p>
                    <p>
                        Temporary speech issues may arise, and long orthodontic appointments can be demanding. These combined factors make traditional braces a more cumbersome option for many.
                    </p>
                    <p>
                        Clear aligners offer a modern alternative, addressing most of these drawbacks. They’re nearly invisible, removable for eating and cleaning, and typically require fewer appointments—providing a more comfortable, convenient orthodontic experience.
                    </p>
                </div>
            </div>

            <div className='py-20 max-w-7xl mx-auto px-6'>
                <h1 className='text-4xl text-center font-semibold text-blue-900'>Aligner360 Aligners</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 justify-items-center'>
                    <div>
                        <h2 className='text-3xl'>Affordability</h2>
                        <p className='border-l-4 !border-blue-900 pl-2 mt-4'>
                            ALIGNER360 is committed to delivering high-quality orthodontic care that’s both effective and affordable.
                        </p>
                    </div>
                    <div>
                        <h2 className='text-3xl'>Safety</h2>
                        <p className='border-l-4 !border-blue-900 pl-2 mt-4'>
                            At ALIGNER360, your safety comes first. Our skilled doctors oversee every step of your smile journey, ensuring comfort, care, and a smooth, secure treatment experience.


                        </p>
                    </div> <div>
                        <h2 className='text-3xl'>Exceptional Experience</h2>
                        <p className='border-l-4 !border-blue-900 pl-2 mt-4'>
                            At ALIGNER360, we’re committed to more than just straightening teeth—we’re here to deliver an exceptional journey from start to finish. Every step is thoughtfully designed to be seamless, comfortable, and tailored to your needs. Your confidence, comfort, and satisfaction fuel our approach, and delivering a radiant smile is the goal that guides everything we do.
                        </p>
                    </div>
                </div>
            </div>
            <h1 className=' text-center text-3xl md:text-5xl my-12 '>
                Our Orthodontist
            </h1>
            <OrthodontistList />
        </div>
    )
}

export default DentistsPage