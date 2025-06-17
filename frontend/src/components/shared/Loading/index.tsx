import React from 'react';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    text = 'Loading...',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
            <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} mb-4`}></div>
            {text && (
                <p className="text-gray-600 text-sm">{text}</p>
            )}
        </div>
    );
};

export default Loading;
