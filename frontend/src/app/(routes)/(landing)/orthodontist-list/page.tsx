import OrthodontistList from '@/components/dentists/orthodontistList'
import React from 'react'

const DentistsPage = () => {
    return (
        <div>
            <h1 className='gradient-text text-center text-5xl py-16'>
                Our Orthodontist
            </h1>
            <OrthodontistList />
        </div>
    )
}

export default DentistsPage