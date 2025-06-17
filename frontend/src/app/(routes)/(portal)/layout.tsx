import Footer from '@/components/widgets/footer'
import Header from '@/components/widgets/header'
import React from 'react'

const DentistLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default DentistLayout