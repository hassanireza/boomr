import React from 'react';

type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

export const SearchIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export const CartIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

export const PackageIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </svg>
);

export const ReturnIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M3 10h10a6 6 0 016 6v1" />
    <path d="M8 5L3 10l5 5" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M8 4h8v5a4 4 0 01-8 0V4z" />
    <path d="M8 5H4v2a3 3 0 003 3" />
    <path d="M16 5h4v2a3 3 0 01-3 3" />
    <path d="M12 13v3" />
    <path d="M9 20h6" />
    <path d="M10 16h4l1 4H9l1-4z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 14, className, style, filled = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.5}
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M12 2.5l2.95 6.44 6.8.72-5.1 4.83 1.42 6.9L12 17.9l-6.07 3.5 1.42-6.9-5.1-4.83 6.8-.72L12 2.5z" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a20.3 20.3 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 7 11 7a20.3 20.3 0 01-2.68 3.68" />
    <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
    <path d="M1 1l22 22" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 20, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className} style={style}>
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
  </svg>
);

export const GridIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const ListIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className} style={style}>
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M3 6h.01" />
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.2L4 3v5.59a2 2 0 00.59 1.41l9.6 9.6a2 2 0 002.82 0l3.58-3.58a2 2 0 000-2.83z" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const YoutubeIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" className={className} style={style}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className} style={style}>
    <path d="M4 4l16 16" />
    <path d="M20 4L4 20" />
  </svg>
);

export const TiktokIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5" />
    <path d="M14 4c0 2.5 1.8 4.5 4.5 4.5" />
  </svg>
);

export const BoomerangIcon: React.FC<IconProps> = ({ size = 48, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M6 20L11 5a2 2 0 013.8 0l3.2 9.5" />
  </svg>
);

export const BoomrLogoMark: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg className="logo-icon" viewBox="0 0 36 36" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff5a2e" />
        <stop offset="100%" stopColor="#c23c1a" />
      </linearGradient>
    </defs>
    <path d="M6 30L18 8L30 30L26 30L18 14L10 30Z" fill="url(#logo-g)" />
  </svg>
);
