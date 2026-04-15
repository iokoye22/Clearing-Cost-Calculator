import React from 'react';
import SectionCard from '../ui/SectionCard';
import InputField from '../ui/InputField';
import type { OverheadCostsInputs } from '../../types';

interface Props {
  data: OverheadCostsInputs;
  onChange: (data: OverheadCostsInputs) => void;
}

const OverheadCosts: React.FC<Props> = ({ data, onChange }) => {
  const update = (field: keyof OverheadCostsInputs, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Overhead Costs" icon="🏢">
      <InputField
        label="Warehouse / storage cost"
        value={data.warehouseCost}
        onChange={(v) => update('warehouseCost', v)}
        prefix="₦"
      />
      <InputField
        label="Staff / handling cost"
        value={data.staffHandlingCost}
        onChange={(v) => update('staffHandlingCost', v)}
        prefix="₦"
      />
      <InputField
        label="Marketing cost"
        value={data.marketingCost}
        onChange={(v) => update('marketingCost', v)}
        prefix="₦"
      />
      <InputField
        label="Platform fees"
        value={data.platformFees}
        onChange={(v) => update('platformFees', v)}
        prefix="₦"
        hint="E-commerce, marketplace fees"
      />
      <InputField
        label="Miscellaneous buffer"
        value={data.miscBuffer}
        onChange={(v) => update('miscBuffer', v)}
        suffix="%"
        max={100}
        hint="Buffer for unexpected overhead"
      />
    </SectionCard>
  );
};

export default OverheadCosts;
