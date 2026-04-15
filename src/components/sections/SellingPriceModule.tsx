import React from 'react';
import SectionCard from '../ui/SectionCard';
import InputField from '../ui/InputField';
import type { SellingPriceInputs } from '../../types';

interface Props {
  data: SellingPriceInputs;
  onChange: (data: SellingPriceInputs) => void;
}

const SellingPriceModule: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof SellingPriceInputs>(
    field: K,
    value: SellingPriceInputs[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Selling Price" icon="💰">
      <div className="col-span-full">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => update('mode', 'margin')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              data.mode === 'margin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Set by Margin %
          </button>
          <button
            onClick={() => update('mode', 'manual')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              data.mode === 'manual'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Set Manual Price
          </button>
        </div>
      </div>

      {data.mode === 'margin' ? (
        <InputField
          label="Desired profit margin"
          value={data.desiredMargin}
          onChange={(v) => update('desiredMargin', v)}
          suffix="%"
          max={99}
          hint="Target margin on selling price"
        />
      ) : (
        <InputField
          label="Manual selling price"
          value={data.manualSellingPrice}
          onChange={(v) => update('manualSellingPrice', v)}
          prefix="₦"
          hint="Your desired selling price per unit"
        />
      )}
    </SectionCard>
  );
};

export default SellingPriceModule;
