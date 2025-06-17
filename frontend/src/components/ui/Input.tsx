import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
    "flex w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "border-neutral-200 focus:ring-primary-500",
                error: "border-red-300 focus:ring-red-500 focus:border-red-500",
                success: "border-green-300 focus:ring-green-500 focus:border-green-500",
            },
            size: {
                sm: "h-9 px-3 text-xs",
                default: "h-11 px-4 text-sm",
                lg: "h-12 px-4 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, size, label, error, icon, rightIcon, iconPosition = 'left', type = 'text', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && iconPosition === 'left' && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            inputVariants({ variant: error ? 'error' : variant, size }),
                            icon && iconPosition === 'left' && 'pl-10',
                            (icon && iconPosition === 'right') || rightIcon ? 'pr-10' : '',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {icon && iconPosition === 'right' && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                            {icon}
                        </div>
                    )}
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input, inputVariants };
