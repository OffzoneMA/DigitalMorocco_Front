import React from 'react';

export default function Subscription() {
  return (
    <div className="flex flex-col items-center justify-center  md:space-y-8  px-10 ">
      <h1 className="text-5xl font-bold mb-8">Unlock More Features</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">

        <div className="bg-bronze rounded-lg p-8 shadow-xl  md:w-[330px] ">
          <h4 className="text-3xl font-semibold mb-4">Pack Bronze</h4>
          <h2 className="text-xl font-semibold mb-4">
            <span className="font-bold">$100</span><span className="text-gray-500 italic">/1 months</span>
          </h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">Buy Now</button>
          <ul className='list-disc text-sm p-8 text-gray-500 italic space-y-1'>
            <li>You get 10 credits per month</li>
            <li>Basic support via email</li>
            <li>Access to the Bronze level content and features</li>
          </ul>
        </div>

        <div className="bg-silver rounded-lg p-8 shadow-xl  md:w-[330px] ">
          <h4 className="text-3xl font-semibold mb-4">Pack Silver</h4>
          <h2 className="text-xl font-semibold mb-4">
            <span className="font-bold">$200</span><span className="text-gray-500 italic">/2 months</span>
          </h2>
          
          <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">Buy Now</button>
                    <ul className='list-disc text-sm p-8 text-gray-500 italic space-y-1'>
            <li>You get 25 credits per month</li>
            <li>Priority support via email and chat</li>
            <li>Access to the Silver level content and features</li>
            <li>Exclusive monthly newsletter</li>
          </ul>
        </div>

        <div className="bg-gold rounded-lg p-8  md:w-[330px] shadow-2xl shadow-yellow-300">
          <h4 className="text-3xl font-semibold mb-4">Pack Gold</h4>
          <h2 className="text-xl font-semibold mb-4">
            <span className="font-bold">$300</span><span className="text-gray-500 italic">/3 months</span>
          </h2>
          
          <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">Buy Now</button>
                    <ul className='list-disc text-sm p-8 text-gray-500 italic space-y-1'>
            <li>You get 50 credits per month</li>
            <li>VIP support with 24/7 availability</li>
            <li>Access to the Gold level content and features</li>
            <li>Exclusive monthly newsletter with early access to new features</li>
            <li>Special discounts on additional services or products</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
