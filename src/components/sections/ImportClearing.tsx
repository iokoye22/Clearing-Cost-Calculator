import React from 'react';
import SectionCard from '../ui/SectionCard';
import InputField from '../ui/InputField';
import type { ImportClearingInputs } from '../../types';

interface Props {
  data: ImportClearingInputs;
  onChange: (data: ImportClearingInputs) => void;
}

const ImportClearing: React.FC<Props> = ({ data, onChange }) => {
  const update = (field: keyof ImportClearingInputs, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Import & Clearing" icon="🛃">
      <InputField
        label="Customs duty rate"
        value={data.customsDutyRate}
        onChange={(v) => update('customsDutyRate', v)}
        suffix="%"
        max={100}
        hint="Auto-calculated on product value"
      />
      <InputField
        label="Import VAT rate"
        value={data.importVATRate}
        onChange={(v) => update('importVATRate', v)}
        suffix="%"
        max={100}
        hint="Auto-calculated on (value + duty)"
      />
      <InputField
        label="Clearing agent fee"
        value={data.clearingAgentFee}
        onChange={(v) => update('clearingAgentFee', v)}
        prefix="₦"
      />
      <InputField
        label="Demurrage / storage fees"
        value={data.demurrageFees}
        onChange={(v) => update('demurrageFees', v)}
        prefix="₦"
        hint="Port storage charges"
      />
      <InputField
        label="Inspection fees"
        value={data.inspectionFees}
        onChange={(v) => update('inspectionFees', v)}
        prefix="₦"
        hint="SON, NAFDAC, etc."
      />
      <InputField
        label="Landing Transport Costs"
        value={data.landingTransportCosts}
        onChange={(v) => update('landingTransportCosts', v)}
        prefix="₦"
        hint="Transport from port to destination"
      />
    </SectionCard>
  );
};

export default ImportClearing;
