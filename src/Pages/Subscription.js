import React from 'react';

export default function Subscription() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 md:space-y-8 ">
      <h1 className="text-3xl font-bold mb-8">Get more perks by buying one of these packs</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {/* Pack Gold */}
        <div className="bg-bronze rounded-lg p-8 shadow-md">
          <h4 className="text-xl font-semibold mb-4">Pack Bronze</h4>
          <h2 className="text-xl font-semibold mb-4">
            <span className="font-bold">$100</span><span className="text-gray-500 italic">/1 months</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">You get 10 credits</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">Buy Now</button>
        </div>

        {/* Pack Silver */}
        <div className="bg-silver rounded-lg p-8 shadow-md">
          <h4 className="text-xl font-semibold mb-4">Pack Silver</h4>
          <h2 className="text-xl font-semibold mb-4">
            <span className="font-bold">$200</span><span className="text-gray-500 italic">/2 months</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">You get 5 credits</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">Buy Now</button>
        </div>

        {/* Pack Bronze */}
        <div className="bg-gold rounded-lg p-8 shadow-md">
          <h4 className="text-xl font-semibold mb-4">Pack Gold</h4>
          <h2 className="text-xl font-semibold mb-4">
            <span className="font-bold">$300</span><span className="text-gray-500 italic">/3 months</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">You get 3 credits</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">Buy Now</button>
        </div>
      </div>
    </div>
  )
}
