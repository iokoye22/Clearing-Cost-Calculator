import React from 'react';
import SectionCard from '../ui/SectionCard';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import type { ShippingLogisticsInputs } from '../../types';

interface Props {
  data: ShippingLogisticsInputs;
  onChange: (data: ShippingLogisticsInputs) => void;
}

const shippingModeOptions = [
  { value: 'Sea', label: '🚢 Sea Freight' },
  { value: 'Air', label: '✈️ Air Freight' },
  { value: 'Express', label: '📦 Express Courier' },
];

const ShippingLogistics: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof ShippingLogisticsInputs>(
    field: K,
    value: ShippingLogisticsInputs[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Shipping & Logistics" icon="🚚">
      <SelectField
        label="Shipping mode"
        value={data.shippingMode}
        onChange={(v) => update('shippingMode', v as ShippingLogisticsInputs['shippingMode'])}
        options={shippingModeOptions}
      />
      <InputField
        label="Freight cost (total)"
        value={data.freightCost}
        onChange={(v) => update('freightCost', v)}
        prefix="$"
        hint="Total freight charges in USD"
      />
      <InputField
        label="Cost per CBM or per kg"
        value={data.costPerCBMorKg}
        onChange={(v) => update('costPerCBMorKg', v)}
        prefix="$"
        hint="Optional: for reference"
      />
      <InputField
        label="Insurance rate"
        value={data.insuranceRate}
        onChange={(v) => update('insuranceRate', v)}
        suffix="%"
        max={100}
        hint="% of goods value"
      />
      <InputField
        label="Port handling charges"
        value={data.portHandlingCharges}
        onChange={(v) => update('portHandlingCharges', v)}
        prefix="₦"
      />
      <InputField
        label="Last-mile delivery cost"
        value={data.lastMileDelivery}
        onChange={(v) => update('lastMileDelivery', v)}
        prefix="₦"
        hint="Delivery in destination country"
      />
    </SectionCard>
  );
};

export default ShippingLogistics;
