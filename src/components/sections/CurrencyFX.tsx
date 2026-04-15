import React from 'react';
import SectionCard from '../ui/SectionCard';
import InputField from '../ui/InputField';
import type { CurrencyFXInputs } from '../../types';

interface Props {
  data: CurrencyFXInputs;
  onChange: (data: CurrencyFXInputs) => void;
}

const CurrencyFX: React.FC<Props> = ({ data, onChange }) => {
  const update = (field: keyof CurrencyFXInputs, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Currency & FX" icon="💱">
      <InputField
        label="Exchange rate"
        value={data.exchangeRate}
        onChange={(v) => update('exchangeRate', v)}
        prefix="₦"
        suffix="/ $1"
        hint="NGN per 1 USD"
      />
      <InputField
        label="FX conversion fee"
        value={data.fxConversionFee}
        onChange={(v) => update('fxConversionFee', v)}
        suffix="%"
        max={100}
        hint="Bank/bureau FX spread"
      />
      <InputField
        label="Bank transfer fees"
        value={data.bankTransferFees}
        onChange={(v) => update('bankTransferFees', v)}
        prefix="₦"
        hint="Wire transfer charges"
      />
      <InputField
        label="Currency buffer"
        value={data.currencyBuffer}
        onChange={(v) => update('currencyBuffer', v)}
        suffix="%"
        max={100}
        hint="Buffer for FX volatility"
      />
    </SectionCard>
  );
};

export default CurrencyFX;
