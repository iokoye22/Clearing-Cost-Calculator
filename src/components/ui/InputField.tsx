import React, { useState, useEffect } from 'react';

interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}

// Format number with commas
const formatWithCommas = (value: number | string): string => {
  if (value === '' || value === 0) return '';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '';
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

// Parse number from formatted string (remove commas)
const parseFormattedNumber = (value: string): number => {
  const cleaned = value.replace(/,/g, '');
  return parseFloat(cleaned) || 0;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '0',
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
  hint,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(formatWithCommas(value));
  const [isFocused, setIsFocused] = useState(false);

  // Update display value when prop value changes (and not focused)
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatWithCommas(value));
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    // Show raw number without commas when focused for easier editing
    const numValue = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
    setDisplayValue(numValue === 0 ? '' : String(numValue));
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Format with commas on blur
    const numValue = parseFormattedNumber(displayValue);
    setDisplayValue(formatWithCommas(numValue));
    onChange(numValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Allow empty, numbers, and single decimal point
    if (rawValue === '' || /^[0-9]*\.?[0-9]*$/.test(rawValue)) {
      setDisplayValue(rawValue);
      const numValue = parseFloat(rawValue) || 0;
      onChange(numValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 bg-white transition-all">
        {prefix && (
          <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 font-medium">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-sm text-gray-900 outline-none bg-white placeholder-gray-400"
        />
        {suffix && (
          <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm border-l border-gray-300 font-medium">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
};

export default InputField;
