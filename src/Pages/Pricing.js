import React from "react";
import PageTitle from "../Components/PageTitle";
import { CheckIcon } from '@heroicons/react/24/solid'
const Pricing = () => {
    return (
        <div className="  ">
            <PageTitle subtitle={'PLAN & PRICING'} title={'Simple & flexible pricing built for everyone'} text={''} />
            <div className="flex flex-col items-center justify-center space-y-8 px-4 md:px-16">
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-12 2xl:gap-16 space-y-6 md:space-y-0 ">
                    <div className="w-full md:w-[382px] flex flex-col items-center">
                        <div className="bg-white p-6 py-9 rounded-3xl border border-gray-201 flex flex-col items-center w-full">
                            <h2 className="text-lg font-semibold mb-2 text-bleu2">Basic</h2>
                            <div className="flex items-center mb-1">
                                <span className="text-2xl font-bold text-bleu2">$</span>
                                <span className="text-5xl font-bold ml-1 text-bleu2">19.9</span>
                                <span className=" text-sm ml-1 text-bleu2">per month</span>
                            </div>
                            <p className="mt-4 text-[#98A2B3] px-8 text-center ">
                                Connect and collaborate at the entry level with curated events and resource access.
                            </p>
                        </div>
                        <div className=" text-[#98A2B3] py-8 px-3 ">
                            <ul className="  space-y-4 tracking-wider">
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Access to Digital Morocco networking platform</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Attend select online events and webinars</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Limited access to curated industry resources</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Connect with potential partners and investors</li>
                            </ul>
                        </div>
                        <div className="text-center  text-[#98A2B3] py-8">
                            <button className="border-2 border-gray-201 flex justify-center  rounded-full bg-white text-bleu2 mx-2 p-2 w-48 ">
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-[382px] flex flex-col items-center mb-8 md:mb-0">
                        <div className="bg-blue-500 p-6 py-9 rounded-3xl border border-gray-201 flex flex-col items-center w-full">
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
                        <div className=" text-[#98A2B3] py-8 px-3">
                            <ul className="  space-y-4 tracking-wider">
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Full access to the Digital Morocco networking platform</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Unlimited access to all online events, conferences, and webinars</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Exclusive access to premium industry resources and reports</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Priority connections with investors and partners</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Featured profile placement and visibility</li>
                            </ul>
                        </div>
                        <div className="text-center  text-white py-8">
                            <button className="border-2 border-col1 flex justify-center  rounded-full bg-col1 text-white mx-2 p-2 w-48 ">
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-[382px] flex flex-col items-center">
                        <div className="bg-white p-6 py-9 rounded-3xl border border-gray-201 flex flex-col items-center w-full">
                            <h2 className="text-lg font-semibold mb-2 text-bleu2">PREMIUM</h2>
                            <div className="flex items-center mb-1">
                                <span className="text-2xl font-bold text-bleu2">$</span>
                                <span className="text-5xl font-bold ml-1 text-bleu2">99.9</span>
                                <span className=" text-sm ml-1 text-bleu2">per month</span>
                            </div>
                            <p className="mt-4 text-[#98A2B3] px-8 text-center">
                                Experience VIP networking comprehensive event access, and personalized support.
                            </p>
                        </div>
                        <div className=" text-[#98A2B3] py-8 px-3">
                            <ul className="  space-y-4 tracking-wider">
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />VIP access to the Digital Morocco</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Access to all online and offline events, conferences, and webinars</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Full access to premium industry resources, reports, and workshops</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Dedicated account manager for personalized connections and support</li>
                                <li className="flex gap-5"><CheckIcon className="text-col1 h-5 w-8 " />Strategic promotion and branding opportunities</li>
                            </ul>
                        </div>
                        <div className="text-center  text-[#98A2B3] py-8">
                            <button className="border-2 border-gray-201 flex justify-center  rounded-full bg-white text-bleu2 mx-2 p-2 w-48 ">
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Pricing;