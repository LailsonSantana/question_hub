import React from 'react';

const Logo = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="blur" x="-5" y="-5" width="58" height="58">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            <path
              d="M10 24 L20 10 L38 10 L28 24 L38 38 L20 38 L10 24 Z"
              fill="#D6B4FC"
              stroke="#D6B4FC"
              strokeWidth="2"
              filter="url(#blur)"
              transform="skewX(-10)"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-purple-200">Questify Shared</span>
      </div>
    );
  };
  
  export default Logo;