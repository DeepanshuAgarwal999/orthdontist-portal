'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { MailIcon, UserIcon, MessageCircleIcon, PhoneIcon, MapPinIcon, CalendarIcon } from '@/components/ui/Icons';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactUs = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<Partial<ContactFormData>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<ContactFormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof ContactFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="text-center p-12">
                        <CardContent>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Thank You!</h2>
                            <p className="text-xl text-neutral-600 mb-6">
                                Your message has been sent successfully. We'll get back to you within 24 hours.
                            </p>
                            <Button
                                onClick={() => setSuccess(false)}
                                variant="outline"
                                className="mt-4"
                            >
                                Send Another Message
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Have questions about our dental network? Need help finding a dentist?
                        We're here to help connect you with the best dental care.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-neutral-800 mb-2">Send Us a Message</h2>
                                <p className="text-neutral-600">Fill out the form below and we'll respond promptly</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Full Name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange('name')}
                                    error={errors.name}
                                    icon={<UserIcon size={20} />}
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    error={errors.email}
                                    icon={<MailIcon size={20} />}
                                    required
                                />

                                <Input
                                    label="Subject"
                                    type="text"
                                    placeholder="What's this about?"
                                    value={formData.subject}
                                    onChange={handleInputChange('subject')}
                                    error={errors.subject}
                                    icon={<MessageCircleIcon size={20} />}
                                    required
                                />

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Your Message <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            placeholder="Tell us how we can help you..."
                                            value={formData.message}
                                            onChange={handleInputChange('message')}
                                            rows={6}
                                            className={`
                                                w-full rounded-lg border px-4 py-3 text-sm placeholder:text-neutral-400 
                                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                                                transition-all duration-200 resize-none
                                                ${errors.message
                                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-neutral-200'
                                                }
                                            `}
                                            required
                                        />
                                    </div>
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    loading={loading}
                                    className="w-full"
                                    size="lg"
                                    variant="gradient"
                                >
                                    Send Message
                                </Button>
                            </form>

                            <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
                                <p className="text-sm text-neutral-600 text-center">
                                    <strong>Response Time:</strong> We typically respond within 24 hours during business days.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Doctor Image & Contact Info */}
                    <div className="space-y-8">
                        {/* Professional Doctor Image */}
                        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                        alt="Professional Dentist"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">Dr. Sarah Johnson</h3>
                                        <p className="text-white/90">Chief Dental Officer</p>
                                        <p className="text-white/90 text-sm mt-1">Available to assist you</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-neutral-600 text-center">
                                        "We're committed to connecting you with the best dental professionals in your area.
                                        Your oral health is our priority."
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-neutral-800 mb-6">Other Ways to Reach Us</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                            <PhoneIcon className="text-primary-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-800">Phone Support</p>
                                            <p className="text-neutral-600">+1 (555) 123-4567</p>
                                            <p className="text-sm text-neutral-500">Mon-Fri, 9AM-6PM EST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <MailIcon className="text-green-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-800">Email Support</p>
                                            <p className="text-neutral-600">support@dentistportal.com</p>
                                            <p className="text-sm text-neutral-500">24/7 Support Available</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <MapPinIcon className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-800">Office Location</p>
                                            <p className="text-neutral-600">123 Dental Plaza, Suite 500</p>
                                            <p className="text-neutral-600">New York, NY 10001</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg">
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                            <CalendarIcon className="text-amber-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-800">Business Hours</p>
                                            <p className="text-neutral-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                            <p className="text-neutral-600">Saturday: 10:00 AM - 4:00 PM</p>
                                            <p className="text-neutral-600">Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Emergency Contact */}
                        <Card className="bg-red-50 border-red-200">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <PhoneIcon className="text-red-600" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Dental Care</h3>
                                <p className="text-red-700 mb-4">
                                    Need immediate dental assistance? Call our emergency hotline.
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-red-300 text-red-700 hover:bg-red-100"
                                    onClick={() => window.location.href = 'tel:+15551234567'}
                                >
                                    Call Emergency Line
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* FAQ Section */}
                <Card className="mt-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-neutral-800 mb-6 text-center">Frequently Asked Questions</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-neutral-800 mb-2">How do I find a dentist near me?</h4>
                                    <p className="text-neutral-600 text-sm">Use our search feature to find verified dentists in your area by location, specialty, or insurance accepted.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-800 mb-2">Are all dentists verified?</h4>
                                    <p className="text-neutral-600 text-sm">Yes, all dentists on our platform go through a thorough verification process to ensure quality care.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-neutral-800 mb-2">How do I schedule an appointment?</h4>
                                    <p className="text-neutral-600 text-sm">Contact the dental office directly using the provided phone number or visit their website for online booking.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-800 mb-2">Is there a cost to use this service?</h4>
                                    <p className="text-neutral-600 text-sm">No, our platform is completely free for patients. We help connect you with dental professionals at no charge.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ContactUs;