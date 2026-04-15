import React from 'react';
import SectionCard from '../ui/SectionCard';
import InputField from '../ui/InputField';
import type { RiskBufferInputs } from '../../types';

interface Props {
  data: RiskBufferInputs;
  onChange: (data: RiskBufferInputs) => void;
}

const RiskBuffer: React.FC<Props> = ({ data, onChange }) => {
  const update = (field: keyof RiskBufferInputs, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Risk & Buffer" icon="⚠️">
      <InputField
        label="Damage / loss rate"
        value={data.damageLossRate}
        onChange={(v) => update('damageLossRate', v)}
        suffix="%"
        max={100}
        hint="Expected damage/loss percentage"
      />
      <InputField
        label="Unexpected cost buffer"
        value={data.unexpectedCostBuffer}
        onChange={(v) => update('unexpectedCostBuffer', v)}
        suffix="%"
        max={100}
        hint="Buffer for unforeseen costs"
      />
      <InputField
        label="Cost of repairs"
        value={data.costOfRepairs}
        onChange={(v) => update('costOfRepairs', v)}
        prefix="₦"
        hint="Estimated repair costs"
      />
    </SectionCard>
  );
};

export default RiskBuffer;
