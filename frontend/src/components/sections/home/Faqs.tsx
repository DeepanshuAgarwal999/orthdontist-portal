import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqs = [
    {
        question: 'Why ALIGNER360?',
        answer: "LIGNER360 Clear Aligners are a modern, nearly invisible solution to straighten teeth without braces. They're custom- fit for comfort and precision.",
    },
    {
        question: 'Will my teeth stay straight after using ALIGNER360 clear aligners?',
        answer: 'Your teeth may shift over time after treatment, so wearing a retainer at night helps preserve your perfect smile.',
    },
    {
        question: 'How long do I need to wear my ALIGNER360 Clear Aligners?',
        answer: 'Wear your ALIGNER360 Clear Aligners for 20–22 hours a day, taking them out only to eat or brush. Each set is typically worn for 12–14 days as recommended by your dentist.',
    },

    {
        question: 'Will wearing ALIGNER360 aligners impact how I speak?',
        answer: 'Most people adapt to ALIGNER360 Clear Aligners within a few hours, though it may take slightly longer for some. Shifting to a new set is usually seamless, thanks to subtle changes at each stage.',
    },
    {
        question: 'Will there be any dietary restrictions during ALIGNER360 treatment?',
        answer: 'No, ALIGNER360 Clear Aligners let you enjoy your regular diet—just remove them before meals or drinks.',
    },
    {
        question: "Are there any lifestyle or usage restrictions with ALIGNER360 Clear Aligner treatment?",
        answer: "No, ALIGNER360 treatment won’t disrupt your daily routine—you can go about life as usual."
    }
];

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 mt-12 min-h-[710px]">
            <h1 className='text-black text-3xl md:text-5xl text-center font-semibold'>
                FAQS
            </h1>
            {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <div
                        key={idx}
                        className="border-b border-gray-200 transition-all duration-200"
                    >
                        <div
                            className="flex items-center justify-between cursor-pointer py-6 text-lg font-semibold select-none"
                            onClick={() => handleToggle(idx)}
                        >
                            <span>{faq.question}</span>
                            <span className="text-2xl">
                                {isOpen ? <X size={24} /> : <Plus size={24} />}
                            </span>
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                                }`}
                        >
                            <div className="text-base text-gray-600 leading-relaxed px-2">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Faqs;
