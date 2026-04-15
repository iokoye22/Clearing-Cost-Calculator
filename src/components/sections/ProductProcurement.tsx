import React from 'react';
import SectionCard from '../ui/SectionCard';
import InputField from '../ui/InputField';
import type { ProductProcurementInputs } from '../../types';

interface Props {
  data: ProductProcurementInputs;
  onChange: (data: ProductProcurementInputs) => void;
}

const ProductProcurement: React.FC<Props> = ({ data, onChange }) => {
  const update = (field: keyof ProductProcurementInputs, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Product & Procurement" icon="📦">
      <InputField
        label="Cost of Goods (COGS) per unit"
        value={data.cogsPerUnit}
        onChange={(v) => update('cogsPerUnit', v)}
        prefix="$"
        hint="Unit cost from supplier in USD"
      />
      <InputField
        label="Quantity purchased"
        value={data.quantity}
        onChange={(v) => update('quantity', v)}
        suffix="units"
        min={1}
        step={1}
      />
      <InputField
        label="Supplier discount"
        value={data.supplierDiscount}
        onChange={(v) => update('supplierDiscount', v)}
        suffix="%"
        max={100}
        hint="Discount from supplier (if any)"
      />
      <InputField
        label="Packaging cost"
        value={data.packagingCost}
        onChange={(v) => update('packagingCost', v)}
        prefix="₦"
        hint="Total packaging cost"
      />
      <InputField
        label="Local transport cost (origin)"
        value={data.localTransportCost}
        onChange={(v) => update('localTransportCost', v)}
        prefix="₦"
        hint="Transport in origin country"
      />
    </SectionCard>
  );
};

export default ProductProcurement;
