import Footer from '@/components/widgets/footer'
import Header from '@/components/widgets/header'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='min-h-screen'>{children}</main>
            <Footer />
        </>
    )
}

export default LandingLayout