import Link from 'next/link'
import React from 'react'
import logo from '../../../assets/images/logo.jpg'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-white text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div>
                            <div className="p-2 bg-primary-600 rounded-xl">
                                <Image src={logo.src} alt="logo" width={120} height={50} className='!rounded-2xl'/>
                            </div>
                         
                        </div>
                        <p className="text-neutral-400 mb-6 max-w-md">
                            Connecting dental professionals and patients for better oral health outcomes.
                            Trusted by thousands across the region.
                        </p>
                        <div className="flex items-center space-x-4 text-neutral-400 text-sm">
                            <span>🔒 HIPAA Compliant</span>
                            <span>•</span>
                            <span>🛡️ SSL Secured</span>
                            <span>•</span>
                            <span>✅ ADA Approved</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-neutral-400 text-sm">
                            <li><Link href="/signup" className="hover:text-neutral-500">Join as Dentist</Link></li>
                            <li><Link href="/signup" className="hover:text-neutral-500">Find a Dentist</Link></li>
                            <li><Link href="/login" className="hover:text-neutral-500">Sign In</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-neutral-400 text-sm">
                            <li><a href="mailto:support@dentistportal.com" className="hover:text-neutral-500">Contact Support</a></li>
                            <li><a href="#" className="hover:text-neutral-500">Help Center</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400 text-sm">
                    <p>&copy; 2025 DentistPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer