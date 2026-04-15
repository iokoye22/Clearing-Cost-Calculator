import type { CalculatorInputs, CalculationResults } from '../types';

export function calculateCosts(inputs: CalculatorInputs): CalculationResults {
  const { product, shipping, importClearing, currencyFX, overhead, riskBuffer, sellingPrice } = inputs;

  const qty = product.quantity || 1;

  // ─── 1. Product & Procurement ───────────────────────────────────────────────
  // Net COGS in USD (after supplier discount)
  const grossCOGS_USD = product.cogsPerUnit * qty;
  const discountAmount = grossCOGS_USD * (product.supplierDiscount / 100);
  const netCOGS_USD = grossCOGS_USD - discountAmount;

  // ─── 2. FX Conversion ───────────────────────────────────────────────────────
  // Convert USD COGS to NGN with FX fees and buffer
  const fxMultiplier = 1 + (currencyFX.fxConversionFee / 100) + (currencyFX.currencyBuffer / 100);
  const netCOGS_NGN = netCOGS_USD * currencyFX.exchangeRate * fxMultiplier;

  // ─── 3. Customs Duty & VAT ──────────────────────────────────────────────────
  // Duty is calculated on the FX-adjusted COGS value
  const customsDuty = netCOGS_NGN * (importClearing.customsDutyRate / 100);
  // VAT is calculated on (COGS + Duty)
  const importVAT = (netCOGS_NGN + customsDuty) * (importClearing.importVATRate / 100);

  // ─── 4. Shipping & Logistics ────────────────────────────────────────────────
  // Freight cost is in USD, convert to NGN
  const freightCostNGN = shipping.freightCost * currencyFX.exchangeRate * fxMultiplier;
  const insuranceAmount = netCOGS_NGN * (shipping.insuranceRate / 100);
  const shippingTotal =
    freightCostNGN +
    insuranceAmount +
    shipping.portHandlingCharges +
    shipping.lastMileDelivery;

  // ─── 5. Clearing Costs ──────────────────────────────────────────────────────
  const clearingTotal =
    importClearing.clearingAgentFee +
    importClearing.demurrageFees +
    importClearing.inspectionFees +
    importClearing.landingTransportCosts;

  // ─── 6. Packaging & Local Transport ─────────────────────────────────────────
  // Trucking to port of origin is in USD, convert to NGN
  const truckingToPortNGN = product.truckingToPortOfOrigin * currencyFX.exchangeRate * fxMultiplier;
  const procurementExtras = product.packagingCost + truckingToPortNGN;

  // ─── 7. Overhead Costs ──────────────────────────────────────────────────────
  const fixedOverhead =
    overhead.warehouseCost +
    overhead.staffHandlingCost +
    overhead.marketingCost +
    overhead.platformFees;

  // Subtotal before misc buffer and risk
  const subtotalBeforeBuffers =
    netCOGS_NGN +
    procurementExtras +
    shippingTotal +
    customsDuty +
    importVAT +
    clearingTotal +
    currencyFX.bankTransferFees +
    fixedOverhead;

  const miscBufferAmount = subtotalBeforeBuffers * (overhead.miscBuffer / 100);
  const overheadTotal = fixedOverhead + miscBufferAmount;

  // ─── 8. Risk & Buffer ───────────────────────────────────────────────────────
  const subtotalBeforeRisk = subtotalBeforeBuffers + miscBufferAmount;
  const riskRate = (riskBuffer.damageLossRate + riskBuffer.unexpectedCostBuffer) / 100;
  const riskBufferAmount = (subtotalBeforeRisk * riskRate) + riskBuffer.costOfRepairs;

  // ─── 9. Total Landed Cost ───────────────────────────────────────────────────
  const totalLandedCost = subtotalBeforeRisk + riskBufferAmount;
  const costPerUnit = totalLandedCost / qty;

  // ─── 10. Selling Price & Profit ─────────────────────────────────────────────
  let suggestedSellingPrice: number;

  if (sellingPrice.mode === 'manual') {
    suggestedSellingPrice = sellingPrice.manualSellingPrice;
  } else {
    // Selling price from desired margin: price = cost / (1 - margin%)
    const margin = sellingPrice.desiredMargin / 100;
    suggestedSellingPrice = margin >= 1 ? costPerUnit * 2 : costPerUnit / (1 - margin);
  }

  const profitPerUnit = suggestedSellingPrice - costPerUnit;
  const totalProfit = profitPerUnit * qty;
  const actualMarginPercent =
    suggestedSellingPrice > 0 ? (profitPerUnit / suggestedSellingPrice) * 100 : 0;

  // ─── 11. USD Equivalents ────────────────────────────────────────────────────
  // Convert profit values to USD using the exchange rate
  const profitPerUnitUSD = currencyFX.exchangeRate > 0 ? profitPerUnit / currencyFX.exchangeRate : 0;
  const totalProfitUSD = currencyFX.exchangeRate > 0 ? totalProfit / currencyFX.exchangeRate : 0;

  return {
    netCOGS_USD,
    netCOGS_NGN,
    customsDuty,
    importVAT,
    shippingTotal,
    clearingTotal,
    overheadTotal,
    riskBufferAmount,
    totalLandedCost,
    costPerUnit,
    suggestedSellingPrice,
    profitPerUnit,
    totalProfit,
    actualMarginPercent,
    profitPerUnitUSD,
    totalProfitUSD,
  };
}

export function formatCurrency(value: number, currency = 'NGN'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
