'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MailIcon, UserIcon, MessageCircleIcon, PhoneIcon, MapPinIcon, CalendarIcon } from '@/components/ui/Icons';
import axiosInstance from '@/config/axios.instance';
import { toast } from 'sonner';
import Image from 'next/image';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const DentistForm = () => {
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
            await axiosInstance.post('/user/contact', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            toast.success('Message sent successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className=" mx-auto py-20 px-4 md:px-10 bg-blue-50 relative z-0" id="contact">
            <h1 className='text-black text-3xl md:text-5xl text-center font-semibold'>
                Connect with a dentist—just fill out the form!
            </h1>
            <Image src="/images/connect.png" alt="connect" width={500} height={400} className='absolute max-w-7xl mx-auto w-full h-full inset-0 z-10 opacity-20 ' />
            <form onSubmit={handleSubmit} className="mt-16 max-w-7xl mx-auto z-20 relative sm:p-8">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 space-y-6'>
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        className='bg-gray-50'
                        onChange={handleInputChange('name')}
                        error={errors.name}
                        icon={<UserIcon size={20} />}
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        className='bg-gray-50'
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
                        className='bg-gray-50'
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
                                                w-full bg-gray-50 rounded-lg border px-4 py-3 text-sm placeholder:text-neutral-400 
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
                </div>

                <div className='flex justify-center'>
                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full mx-auto max-w-sm mt-6"
                        size="lg"
                        variant="gradient"
                    >
                        Send Message
                    </Button>
                </div>
            </form>

        </section>
    )
}

export default DentistForm