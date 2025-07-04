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
import { usePathname } from "next/navigation"

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
    const pathname = usePathname()

    const isActive = (href: string) => {
        return pathname === href
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
                        <div className="hidden lg:flex items-center text-white gradient-dental-3 flex-1 h-full px-6 sm:px-8  justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                                    <span className="text-xs">🌐</span>
                                </div>
                                <span className="text-sm font-medium line-clamp-1">ISO 13485 : 2016 Certified</span>
                            </div>
                            <div className="hidden md:flex items-center gap-4  h-full pr-6 sm:pr-8 lg:pr-10">
                                <div className="flex items-center gap-2 text-white">
                                    <span className="text-sm">✉</span>
                                    <span className="text-sm">support@aligner360.com</span>
                                </div>
                                <Link href="/contact" >
                                    <Button className="text-[#11336a] font-semibold bg-white/90 cursor-pointer" variant={'default'}>
                                        CONTACT US
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Email and Contact */}


                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
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
            </div>
            <div className="bg-white border-b border-slate-200 border-t">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="hidden lg:flex items-center justify-center h-16">
                        <nav className="flex items-center gap-10">
                            {ROUTES.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`text-slate-600 hover:text-blue-700 transition-all duration-300 font-semibold text-sm uppercase tracking-wider py-2 ${isActive(item.href) ? '!text-blue-700' : ''}`}
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
                                    <Link href="/login">
                                        <Button className="text-sm bg-blue-600 text-white transition-all duration-300">Dentist Portal</Button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-neutral-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {ROUTES.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={
                                    `block px-3 py-2 text-neutral-600 hover:text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors ${isActive(item.href) ? '!text-blue-700 !bg-neutral-50' : ''}`
                                }
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
                            <div>
                                <Link href="/login" onClick={closeMobileMenu} >
                                    <Button variant="gradient" className="w-full cursor-pointer">
                                        Dentist Portal
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