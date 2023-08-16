import React from "react";
const Pricing = () => {
    return (
        <div className="flex flex-col items-center justify-center md:space-y-8 pt-16 md:pt-48 py-8 md:py-56 px-4 md:px-16">
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-8 text-bleu2 text-center">
                Simple & Flexible Pricing built <br /> for Everyone
            </h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-12 2xl:gap-16">
                <div className=" w-full md:w-[382px] flex flex-col items-center mb-8 md:mb-0 ">
                    <div className="bg-white p-6 py-9 rounded-3xl border border-gray-300 flex flex-col items-center w-full">
                        <h2 className="text-lg font-semibold mb-2 text-bleu2">Basic</h2>
                        <div className="flex items-center mb-1">
                            <span className="text-2xl font-bold text-bleu2">$</span>
                            <span className="text-5xl font-bold ml-1 text-bleu2">19.9</span>
                            <span className=" text-sm ml-1 text-bleu2">per month</span>
                        </div>
                        <p className="mt-4 text-gray-400 px-8 text-center ">
                            Connect and collaborate at the entry level with curated events and resource access.
                        </p>
                    </div>
                    <div className=" text-gray-400 py-8 px-3 ">
                        <ul className="list-disc list-inside space-y-4 tracking-wider">
                            <li>Access to Digital Morocco networking platform</li>
                            <li>Attend select online events and webinars</li>
                            <li>Limited access to curated industry resources</li>
                            <li>Connect with potential partners and investors</li>
                        </ul>
                    </div>
                    <div className="text-center  text-gray-400 py-8">
                        <button className="border-2 border-gray-200 flex justify-center  rounded-full bg-white text-bleu2 mx-2 p-2 w-48 ">
                            Start Free Trial
                        </button>
                    </div>
                </div>
                <div className=" w-full md:w-[382px] flex flex-col items-center mb-8 md:mb-0 ">
                    <div className="bg-blue-500 p-6 py-9 rounded-3xl border border-gray-300 flex flex-col items-center w-full">
                        <h2 className="text-lg font-semibold mb-2 text-white">STANDARD</h2>
                        <div className="flex items-center mb-1">
                            <span className="text-2xl font-bold text-white">$</span>
                            <span className="text-5xl font-bold ml-1 text-white">49.9</span>
                            <span className=" text-sm ml-1 text-white">per month</span>
                        </div>
                        <p className="mt-4 text-white px-8 text-center">
                            Unleash unlimited potential with premium events, reports, and priority connections.
                        </p>
                    </div>
                    <div className=" text-gray-400 py-8 px-3">
                        <ul className="list-disc list-inside space-y-4 tracking-wider">
                            <li>Full access to the Digital Morocco networking platform</li>
                            <li>Unlimited access to all online events, conferences, and webinars</li>
                            <li>Exclusive access to premium industry resources and reports</li>
                            <li>Priority connections with investors and partners</li>
                            <li>Featured profile placement and visibility</li>
                        </ul>
                    </div>
                    <div className="text-center  text-white py-8">
                        <button className="border-2 border-col1 flex justify-center  rounded-full bg-col1 text-white mx-2 p-2 w-48 ">
                            Start Free Trial
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-[382px] flex flex-col items-center ">
                    <div className="bg-white p-6 py-9 rounded-3xl border border-gray-300 flex flex-col items-center w-full">
                        <h2 className="text-lg font-semibold mb-2 text-bleu2">PREMIUM</h2>
                        <div className="flex items-center mb-1">
                            <span className="text-2xl font-bold text-bleu2">$</span>
                            <span className="text-5xl font-bold ml-1 text-bleu2">99.9</span>
                            <span className=" text-sm ml-1 text-bleu2">per month</span>
                        </div>
                        <p className="mt-4 text-gray-400 px-8 text-center">
                            Experience VIP networking comprehensive event access, and personalized support.
                        </p>
                    </div>
                    <div className=" text-gray-400 py-8 px-3">
                        <ul className="list-disc list-inside space-y-4 tracking-wider">
                            <li>VIP access to the Digital Morocco</li>
                            <li>Access to all online and offline events, conferences, and webinars</li>
                            <li>Full access to premium industry resources, reports, and workshops</li>
                            <li>Dedicated account manager for personalized connections and support</li>
                            <li>Strategic promotion and branding opportunities</li>
                        </ul>
                    </div>
                    <div className="text-center  text-gray-400 py-8">
                        <button className="border-2 border-gray-200 flex justify-center  rounded-full bg-white text-bleu2 mx-2 p-2 w-48 ">
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Pricing;