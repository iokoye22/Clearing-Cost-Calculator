import React from 'react';
import type { CalculationResults } from '../types';
import { formatCurrency } from '../utils/calculateCosts';

interface Props {
  results: CalculationResults;
  quantity: number;
}

const SummaryPanel: React.FC<Props> = ({ results, quantity }) => {
  const isProfit = results.profitPerUnit >= 0;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-xl p-6 text-white sticky top-4">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        Live Summary
      </h2>

      {/* Main Metrics */}
      <div className="space-y-4">
        {/* Total Landed Cost */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-indigo-200 text-sm mb-1">Total Landed Cost</p>
          <p className="text-2xl font-bold">{formatCurrency(results.totalLandedCost)}</p>
          <p className="text-indigo-300 text-xs mt-1">
            For {quantity} unit{quantity !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cost Per Unit */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-indigo-200 text-sm mb-1">Cost Per Unit</p>
          <p className="text-2xl font-bold">{formatCurrency(results.costPerUnit)}</p>
        </div>

        {/* Selling Price */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-indigo-200 text-sm mb-1">Selling Price / Unit</p>
          <p className="text-2xl font-bold">{formatCurrency(results.suggestedSellingPrice)}</p>
        </div>

        {/* Profit Section (NGN) */}
        <div className={`rounded-xl p-4 backdrop-blur-sm ${isProfit ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-sm mb-1 ${isProfit ? 'text-green-200' : 'text-red-200'}`}>
                Profit / Unit
              </p>
              <p className={`text-xl font-bold ${isProfit ? 'text-green-100' : 'text-red-100'}`}>
                {formatCurrency(results.profitPerUnit)}
              </p>
            </div>
            <div>
              <p className={`text-sm mb-1 ${isProfit ? 'text-green-200' : 'text-red-200'}`}>
                Total Profit
              </p>
              <p className={`text-xl font-bold ${isProfit ? 'text-green-100' : 'text-red-100'}`}>
                {formatCurrency(results.totalProfit)}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isProfit ? 'text-green-200' : 'text-red-200'}`}>
                Margin
              </span>
              <span className={`text-lg font-bold ${isProfit ? 'text-green-100' : 'text-red-100'}`}>
                {results.actualMarginPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Profit Section (USD) */}
        <div className={`rounded-xl p-4 backdrop-blur-sm ${isProfit ? 'bg-blue-500/20' : 'bg-red-500/20'}`}>
          <p className={`text-sm mb-2 font-medium ${isProfit ? 'text-blue-200' : 'text-red-200'}`}>
            💵 Profit in USD
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-sm mb-1 ${isProfit ? 'text-blue-200' : 'text-red-200'}`}>
                Profit / Unit
              </p>
              <p className={`text-xl font-bold ${isProfit ? 'text-blue-100' : 'text-red-100'}`}>
                {formatCurrency(results.profitPerUnitUSD, 'USD')}
              </p>
            </div>
            <div>
              <p className={`text-sm mb-1 ${isProfit ? 'text-blue-200' : 'text-red-200'}`}>
                Total Profit
              </p>
              <p className={`text-xl font-bold ${isProfit ? 'text-blue-100' : 'text-red-100'}`}>
                {formatCurrency(results.totalProfitUSD, 'USD')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <p className="text-indigo-200 text-sm font-medium mb-3">Cost Breakdown</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-indigo-300">Product Cost (NGN)</span>
            <span>{formatCurrency(results.netCOGS_NGN)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-300">Shipping & Logistics</span>
            <span>{formatCurrency(results.shippingTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-300">Customs Duty</span>
            <span>{formatCurrency(results.customsDuty)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-300">Import VAT</span>
            <span>{formatCurrency(results.importVAT)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-300">Clearing Costs</span>
            <span>{formatCurrency(results.clearingTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-300">Overhead</span>
            <span>{formatCurrency(results.overheadTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-300">Risk Buffer</span>
            <span>{formatCurrency(results.riskBufferAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
