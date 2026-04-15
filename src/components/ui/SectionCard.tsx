import React, { useState } from 'react';

interface SectionCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-5 py-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
