import { useState, useMemo } from 'react';
import type { CalculatorInputs } from './types';
import { calculateCosts } from './utils/calculateCosts';

// Section Components
import ProductProcurement from './components/sections/ProductProcurement';
import ShippingLogistics from './components/sections/ShippingLogistics';
import ImportClearing from './components/sections/ImportClearing';
import CurrencyFX from './components/sections/CurrencyFX';
import OverheadCosts from './components/sections/OverheadCosts';
import RiskBuffer from './components/sections/RiskBuffer';
import SellingPriceModule from './components/sections/SellingPriceModule';
import SummaryPanel from './components/SummaryPanel';

// Default initial state
const initialState: CalculatorInputs = {
  product: {
    cogsPerUnit: 0,
    quantity: 1,
    supplierDiscount: 0,
    packagingCost: 0,
    localTransportCost: 0,
  },
  shipping: {
    shippingMode: 'Sea',
    freightCost: 0,
    costPerCBMorKg: 0,
    insuranceRate: 0,
    portHandlingCharges: 0,
    lastMileDelivery: 0,
  },
  importClearing: {
    customsDutyRate: 20,
    importVATRate: 7.5,
    clearingAgentFee: 0,
    demurrageFees: 0,
    inspectionFees: 0,
  },
  currencyFX: {
    exchangeRate: 1500,
    fxConversionFee: 0,
    bankTransferFees: 0,
    currencyBuffer: 0,
  },
  overhead: {
    warehouseCost: 0,
    staffHandlingCost: 0,
    marketingCost: 0,
    platformFees: 0,
    miscBuffer: 0,
  },
  riskBuffer: {
    damageLossRate: 0,
    unexpectedCostBuffer: 0,
  },
  sellingPrice: {
    mode: 'margin',
    desiredMargin: 30,
    manualSellingPrice: 0,
  },
};

function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialState);

  // Calculate results whenever inputs change
  const results = useMemo(() => calculateCosts(inputs), [inputs]);

  // Reset all inputs
  const handleReset = () => {
    setInputs(initialState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧮</span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Landed Cost Calculator
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Calculate your true import costs and profitable selling price
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset All
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Sections - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            <ProductProcurement
              data={inputs.product}
              onChange={(product) => setInputs({ ...inputs, product })}
            />

            <ShippingLogistics
              data={inputs.shipping}
              onChange={(shipping) => setInputs({ ...inputs, shipping })}
            />

            <ImportClearing
              data={inputs.importClearing}
              onChange={(importClearing) => setInputs({ ...inputs, importClearing })}
            />

            <CurrencyFX
              data={inputs.currencyFX}
              onChange={(currencyFX) => setInputs({ ...inputs, currencyFX })}
            />

            <OverheadCosts
              data={inputs.overhead}
              onChange={(overhead) => setInputs({ ...inputs, overhead })}
            />

            <RiskBuffer
              data={inputs.riskBuffer}
              onChange={(riskBuffer) => setInputs({ ...inputs, riskBuffer })}
            />

            <SellingPriceModule
              data={inputs.sellingPrice}
              onChange={(sellingPrice) => setInputs({ ...inputs, sellingPrice })}
            />
          </div>

          {/* Summary Panel - Right Column */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <SummaryPanel results={results} quantity={inputs.product.quantity || 1} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Summary (Fixed Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-indigo-700 text-white p-4 shadow-lg border-t border-indigo-600">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <p className="text-xs text-indigo-200">Total Landed Cost</p>
            <p className="text-lg font-bold">
              ₦{results.totalLandedCost.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-indigo-200">Cost/Unit</p>
            <p className="text-lg font-bold">
              ₦{results.costPerUnit.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-indigo-200">Profit/Unit</p>
            <p className={`text-lg font-bold ${results.profitPerUnit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              ₦{results.profitPerUnit.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Spacer for Mobile */}
      <div className="lg:hidden h-24"></div>
    </div>
  );
}

export default App;
