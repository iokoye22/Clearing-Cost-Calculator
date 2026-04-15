export interface ProductProcurementInputs {
  cogsPerUnit: number;
  quantity: number;
  supplierDiscount: number; // %
  packagingCost: number;
  localTransportCost: number;
}

export interface ShippingLogisticsInputs {
  shippingMode: 'Air' | 'Sea' | 'Express';
  freightCost: number;
  costPerCBMorKg: number; // optional
  insuranceRate: number; // % of goods value
  portHandlingCharges: number;
  lastMileDelivery: number;
}

export interface ImportClearingInputs {
  customsDutyRate: number; // %
  importVATRate: number; // %
  clearingAgentFee: number;
  demurrageFees: number;
  inspectionFees: number;
}

export interface CurrencyFXInputs {
  exchangeRate: number; // NGN per USD
  fxConversionFee: number; // %
  bankTransferFees: number;
  currencyBuffer: number; // %
}

export interface OverheadCostsInputs {
  warehouseCost: number;
  staffHandlingCost: number;
  marketingCost: number;
  platformFees: number;
  miscBuffer: number; // %
}

export interface RiskBufferInputs {
  damageLossRate: number; // %
  unexpectedCostBuffer: number; // %
}

export interface SellingPriceInputs {
  mode: 'margin' | 'manual';
  desiredMargin: number; // %
  manualSellingPrice: number;
}

export interface CalculatorInputs {
  product: ProductProcurementInputs;
  shipping: ShippingLogisticsInputs;
  importClearing: ImportClearingInputs;
  currencyFX: CurrencyFXInputs;
  overhead: OverheadCostsInputs;
  riskBuffer: RiskBufferInputs;
  sellingPrice: SellingPriceInputs;
}

export interface CalculationResults {
  // Intermediate values
  netCOGS_USD: number;
  netCOGS_NGN: number;
  customsDuty: number;
  importVAT: number;
  shippingTotal: number;
  clearingTotal: number;
  overheadTotal: number;
  riskBufferAmount: number;

  // Final outputs
  totalLandedCost: number;
  costPerUnit: number;
  suggestedSellingPrice: number;
  profitPerUnit: number;
  totalProfit: number;
  actualMarginPercent: number;
}
