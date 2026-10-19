import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Red Palm & Emblem Badge */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 100 90"
          className={`${sizeClasses[size]} w-auto drop-shadow-xs`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized Red Palm Tree Emblem matching official brand asset */}
          <path
            d="M50 82V48M50 48C45 42 35 38 25 40C33 34 43 36 49 46M50 48C55 42 65 38 75 40C67 34 57 36 51 46M50 46C44 36 34 28 20 28C30 24 42 27 48 42M50 46C56 36 66 28 80 28C70 24 58 27 52 42M50 42C48 30 42 18 32 10C40 10 47 16 50 36M50 42C52 30 58 18 68 10C60 10 53 16 50 36M50 38V8"
            stroke="#e11d48"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Coconuts / Foundation dots */}
          <circle cx="43" cy="50" r="4.5" fill="#e11d48" />
          <circle cx="57" cy="50" r="4.5" fill="#e11d48" />
        </svg>
      </div>

      {/* Typography: JIZAN in Red & Subtitle in dark/white */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-red-600 font-sans">
            جـيـزان
          </span>
          <span className="text-xs sm:text-sm font-black font-sans px-1.5 py-0.5 rounded-md bg-slate-900 text-white tracking-wider">
            & M&B
          </span>
        </div>

        {variant !== 'compact' && (
          <span className={`text-[10px] sm:text-[11px] font-bold tracking-wide mt-1 ${
            isLight ? 'text-slate-300' : 'text-slate-700'
          }`}>
            لصناعة الأنابيب البلاستيكية
          </span>
        )}
      </div>
    </div>
  );
};
