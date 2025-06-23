'use client'
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import LogoImg from "../../../assets/images/logo.jpg"
import { PRIVATE_NAV_ITEMS, PUBLIC_NAV_ITEMS } from "@/constants/navitems"
import useUser from "@/hooks/useUser"
import axiosInstance from "@/config/axios.instance"
import { useQueryClient } from "@tanstack/react-query"
import { MenuIcon, XIcon } from "@/components/ui/Icons"
import { useState } from "react"

const Header = () => {
    const { user } = useUser()
    const queryCLient = useQueryClient()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const logout = async () => {
        await axiosInstance.post('/auth/logout')
        queryCLient.clear()
        window.location.href = '/login'
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const ROUTES = user ? PRIVATE_NAV_ITEMS : PUBLIC_NAV_ITEMS
    return (
        <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24 overflow-clip">
                    <Link href={'/'}>
                        <Image src={LogoImg.src} alt="logo" width={200} height={50} />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        {ROUTES.map((item, index) => (
                            <Link key={index} href={item.href} className="text-neutral-600 hover:text-neutral-700 transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <Button variant="gradient" onClick={logout}>LogOut</Button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="outline">Sign In</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="gradient">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-neutral-600 hover:text-neutral-700 transition-colors p-2"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-neutral-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {ROUTES.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="block px-3 py-2 text-neutral-600 hover:text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Auth Buttons */}
                        <div className="px-2 py-3 border-t border-neutral-200">
                            {user ? (
                                <Button
                                    variant="gradient"
                                    className="w-full"
                                    onClick={() => {
                                        logout()
                                        closeMobileMenu()
                                    }}
                                >
                                    LogOut
                                </Button>
                            ) : (
                                <div className="space-y-2">
                                    <Link href="/login" onClick={closeMobileMenu}>
                                        <Button variant="outline" className="w-full">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={closeMobileMenu}>
                                        <Button variant="gradient" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header