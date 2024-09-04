import React from "react";
import PageTitle from "../Components/PageTitle";

const ContactUs = () => {
    return (
        <div className="">
            <PageTitle
                subtitle={""}
                title={`We'd Love to Hear from You`}
                text={`Got questions, ideas, or just want to connect? We're here for you. Feel free to reach out using any of the methods below, and our dedicated team will get back to you as soon as possible.`}
            />
            <div className="  grid grid-cols-1 md:grid-cols-2 gap-8 px-32 xl:gap-16 mt-6 xl:-mt-16 ">
                <div className=" p-8 ">
                    <form>
                        <div className="mb-8">
                            <label htmlFor="firstName" text="First Name" className="block font-medium">

                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                className="border border-gray-300 rounded-full p-2 w-full"
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="lastName" text="Lirst Name" className="block font-medium">
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                className="border border-gray-300 rounded-full p-2 w-full"
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="phone" text="Your phone" className="block font-medium">
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Your phone"
                                className="border border-gray-300 rounded-full p-2 w-full"
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="email" text="Your email" className="block font-medium">
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Your email"
                                className="border border-gray-300 rounded-full p-2 w-full"
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="Your message" text="Your message" className="block font-medium">
                            </label>
                            <textarea
                                className="border border-gray-300 rounded-xl p-8 w-full  "
                                placeholder="Your message"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-full py-3 px-6 hover:bg-blue-800"
                        >
                            Send a Message
                        </button>
                    </form>
                </div>
                <div className="p-8 py-8 px-0 mb-8">

                    <div className="mb-8">
                        <p className="text-bleu2 font-semibold my-2"> General inquiries </p>
                        <span className="text-[#98A2B3] block my-2">
                            Email:
                            <a href="mailto:info@digitalmorocco.com" className="hover:underline">
                                info@digitalmorocco.com
                            </a>{" "}
                        </span>
                        <span className="text-[#98A2B3] block my-2">Phone: +123-456-7890</span>
                    </div>
                    <div className="mb-8">
                        <p className="text-bleu2 font-semibold my-2"> Membership Support </p>
                        <span className="text-[#98A2B3] block my-2">
                            Email:
                            <a href="mailto:support@digitalmorocco.com" className="hover:underline">
                                support@digitalmorocco.com
                            </a>{" "}
                        </span>
                        
                        <span className="text-[#98A2B3] block my-2">Phone: +123-456-7890</span>
                    </div>
                    <div className="mb-8">
                        <p className="text-bleu2 font-semibold my-2"> Visit Us </p>
                        <span className="text-[#98A2B3] block my-2">
                            Digital Morocco Headquarters
                            123 Innovation Street, Casablanca, Morocco
                        </span>
                    </div>
                    <div className="mb-8 ">

                        <p className="text-bleu2 font-semibold block my-2"> Social Media </p>
                        <p className="text-[#98A2B3] my-2"> Connect with us on social media for thelatest updates, events, and more! </p>
                        <span className="text-[#98A2B3] block my-2">
                            Facebook:
                            <a href="@digitalmorocco.com" className="hover:underline">
                                @Digitalmorocco
                            </a>{" "}
                        </span>
                        <span className="text-[#98A2B3] block my-2">
                            Instagram:
                            <a href="@digitalmorocco.com" className="hover:underline">
                                @Digitalmorocco
                            </a>{" "}
                        </span>
                        <span className="text-[#98A2B3] block my-2">
                            LinkedIn:
                            <a href="@digitalmorocco.com" className="hover:underline">
                                @Digitalmorocco
                            </a>{" "}
                        </span>
                        <br />

                    </div>
                </div>


            </div>
        </div>
    );
};

export default ContactUs;
