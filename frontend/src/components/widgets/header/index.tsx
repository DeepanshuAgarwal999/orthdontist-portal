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
        <header className="bg-white shadow-lg">
            {/* Top Row */}
            <div className="">
                <div className="pl-2 sm:pl-8 md:pl-20 overflow-hidden">
                    <div className="flex justify-between items-center h-20 ">
                        {/* Logo */}
                        <Link href={'/'} className=" mr-20 inline-block">
                            <Image src={LogoImg.src} alt="Clear Aligners" width={200} height={40} className="h-20 w-36" />
                        </Link>

                        {/* Center - ISO Certification (hidden on mobile) */}
                        <div className="hidden md:flex items-center text-white bg-blue-900 flex-1 h-full px-6 sm:px-8 lg:px-10">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                                    <span className="text-xs">🌐</span>
                                </div>
                                <span className="text-sm font-medium line-clamp-1">ISO 13485 : 2016 Certified</span>
                            </div>
                        </div>

                        {/* Right Side - Email and Contact */}
                        <div className="hidden md:flex items-center gap-4 bg-blue-900 h-full pr-6 sm:pr-8 lg:pr-10">
                            <div className="flex items-center gap-2 text-white">
                                <span className="text-sm">✉</span>
                                <span className="text-sm">info@aligners360.com</span>
                            </div>
                            <Link href="/contact">
                                <Button className="" variant={'gradient'}>
                                    CONTACT US
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className=" p-2"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>            {/* Bottom Row - Navigation */}
            <div className="bg-white border-b border-slate-200 border-t">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="hidden md:flex items-center justify-center h-16">
                        <nav className="flex items-center gap-10">
                            {ROUTES.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-slate-600 hover:text-blue-700 transition-all duration-300 font-semibold text-sm uppercase tracking-wider py-2"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {user && (
                                <Button variant="outline" onClick={logout} className="ml-6 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    LogOut
                                </Button>
                            )}
                            {!user && (
                                <div className="flex items-center gap-3 ml-6">
                                    <Link href="/signin">
                                        <Button className="text-sm bg-blue-600 text-white transition-all duration-300">Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
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
        </header>
    )
}

export default Header