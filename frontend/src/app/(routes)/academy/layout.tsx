import React from 'react'
import Header from '@/components/widgets/header'
import Footer from '@/components/widgets/footer'

const AcademyLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default AcademyLayout
