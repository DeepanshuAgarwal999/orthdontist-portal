'use client'
import Footer from '@/components/widgets/footer'
import Header from '@/components/widgets/header'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/navigation'

const DentistLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useUser()
    const router = useRouter()
    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-600">Loading...</p>
                <p className="mt-2 text-sm text-gray-500">Please wait while we verify your authentication...</p>
            </div>
        </div>)
    }
    if (!user) {
        router.replace('/login')
        return null;
    }
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default DentistLayout