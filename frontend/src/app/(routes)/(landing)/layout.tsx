import Footer from '@/components/widgets/footer'
import Header from '@/components/widgets/header'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default LandingLayout