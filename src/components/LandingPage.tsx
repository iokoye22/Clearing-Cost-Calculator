import React from 'react';

type CalculatorType = 'cars' | 'consumer-goods';

interface Props {
  onSelectCalculator: (type: CalculatorType) => void;
}

const LandingPage: React.FC<Props> = ({ onSelectCalculator }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <span className="text-4xl mb-2 block">🧮</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Landed Cost Calculator
            </h1>
            <p className="text-gray-500 mt-2">
              Calculate your true import costs and profitable selling price
            </p>
          </div>
        </div>
      </header>

      {/* Main Content with Background Image */}
      <main
        className="flex-1 relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              What are you importing?
            </h2>
            <p className="text-gray-200 mt-2">
              Select a calculator type to get started
            </p>
          </div>

          {/* Calculator Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cars Calculator Card */}
            <button
              onClick={() => onSelectCalculator('cars')}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-8 text-left shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-indigo-500/25 hover:border-indigo-400/50 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative flex flex-col items-center text-center">
                {/* Car Icon */}
                <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-500">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-800 tracking-wide mb-3">
                  Cars
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-8">
                  Calculate landed costs for importing vehicles including customs duty, shipping, and all associated fees.
                </p>
                
                {/* Gradient CTA Button */}
                <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/40 group-hover:from-indigo-400 group-hover:to-purple-500 transition-all duration-300">
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Consumer Goods Calculator Card */}
            <button
              onClick={() => onSelectCalculator('consumer-goods')}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 p-8 text-left shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/50 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative flex flex-col items-center text-center">
                {/* Package Icon */}
                <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 border border-purple-400/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-500">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-800 tracking-wide mb-3">
                  Consumer Goods
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-8">
                  Calculate landed costs for importing consumer products, electronics, and general merchandise.
                </p>
                
                {/* Gradient CTA Button */}
                <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300">
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-300 text-sm">
              Both calculators include customs duty, VAT, shipping, clearing costs, and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
