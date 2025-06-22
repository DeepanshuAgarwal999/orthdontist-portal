'use client'
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import LogoImg from "../../../assets/images/logo.jpg"
import { NAV_ITEMS } from "@/constants/navitems"
import useUser from "@/hooks/useUser"
import axiosInstance from "@/config/axios.instance"
import { useQueryClient } from "@tanstack/react-query"

const Header = () => {
    const { user } = useUser()
    const queryCLient = useQueryClient()
    const logout = async () => {
        await axiosInstance.post('/auth/logout')
        queryCLient.clear()
        window.location.href = '/login'
    }
    return (
        <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24 overflow-hidden ">
                    <Link href={'/'}>
                        <Image src={LogoImg.src} alt="logo" width={200} height={50} />
                    </Link>
                    <div className="flex items-center gap-4">
                        {NAV_ITEMS.map((item, index) => (
                            <Link key={index} href={item.href} className="text-neutral-600 hover:text-neutral-700 transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {
                        user ? <Button variant="gradient" onClick={logout}>LogOut</Button> : <div className="flex items-center space-x-4">
                            <Link href="/login">
                                <Button variant="outline">Sign In</Button>
                            </Link>
                            <Link href="/signup">
                                <Button variant="gradient">Get Started</Button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header