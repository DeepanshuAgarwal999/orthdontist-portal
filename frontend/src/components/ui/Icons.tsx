import React from 'react';

interface IconProps {
    className?: string;
    size?: number;
}

export const MailIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

export const LockIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <circle cx="12" cy="16" r="1" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export const ToothIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2C8.5 2 6 4.5 6 8c0 2 0 4-1 6-1 2-1 4 1 4s2-2 3-4c1-2 1-4 3-4s2 2 3 4c1 2 1 4 3 4s2-2 1-4c-1-2-1-4-1-6 0-3.5-2.5-6-6-6z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
    >
        <path d="M21.805 10.023H12v3.998h5.584c-.248 1.331-1.009 2.46-2.142 3.218v2.675h3.465c2.027-1.863 3.198-4.606 3.198-7.891 0-.335-.027-.66-.08-.999z" fill="#4285F4" />
        <path d="M12 22c2.7 0 4.96-.897 6.615-2.425l-3.465-2.675c-.96.645-2.193 1.024-3.15 1.024-2.42 0-4.47-1.63-5.205-3.818H3.198v2.763C4.84 19.866 8.12 22 12 22z" fill="#34A853" />
        <path d="M6.795 14.106A5.997 5.997 0 0 1 6.5 12c0-.729.132-1.429.295-2.106V7.131H3.198A9.998 9.998 0 0 0 2 12c0 1.65.404 3.21 1.198 4.568l3.597-2.462z" fill="#FBBC05" />
        <path d="M12 5.998c1.474 0 2.795.507 3.84 1.499l2.88-2.879C17.042 2.773 14.719 2 12 2 8.12 2 4.84 4.134 3.198 7.131l3.597 2.763c.735-2.188 2.785-3.896 5.205-3.896z" fill="#EA4335" />
    </svg>


);

export const PhoneIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export const ClipboardListIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M12 11h4" />
        <path d="M12 16h4" />
        <path d="M8 11h.01" />
        <path d="M8 16h.01" />
    </svg>
);

export const TrendingUpIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
        <polyline points="17,6 23,6 23,12" />
    </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

export const MessageCircleIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

export const AwardIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
    </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12,19 5,12 12,5" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

export const XIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
