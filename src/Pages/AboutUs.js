import React from "react";
import PageTitle from "../Components/PageTitle";
import AboutDigitalM from "./About/AboutDigitalM";
import OurTeam from "./About/OurTeam";

const AboutUs = () => {
    return (
        <div>
            <PageTitle subtitle={'ABOUT DIGITAL MOROCCO'} title={'Powering Connections and Growth for Startups'} text={''} />
            <div className="flex flex-col md:grid md:grid-cols-4 py-5 gap-8  md:gap-x-16 md:px-20  lg:px-40  xl:px-60 2xl:py-8 3xl:py-14">
            <div><p></p></div>            
            <div className="col-span-3 space-y-4 pb-6 ">
                <p className="md:text-left text-center font-bold text-xs  3xl:text-3xl 2xl:text-2xl text-gray700 tracking-wider">WHO ARE WE ?</p>
                <p className="md:text-left text-center md:text-medium 3xl:text-3xl 2xl:text-2xl text-lg xl:text-medium text-gray700 font-medium 2xl:leading-relaxed 3xl:leading-loose">Digital Morocco is a community of businesses, institutions, investors, and local and international experts in the digital field, working to develop skills and technologies and to qualify startups and digital projects to meet the challenges of the market and changes in the business environment in Morocco and around the world.</p>
            </div>
            <div className="col-span-4 space-y-4">
                <h2 className="md:text-left text-center text-[#2575F0] text-lg 3xl:text-3xl 2xl:text-2xl font-bold tracking-wide">Powering Connections and Fueling Growth for Startups, Companies, and Investors</h2>
                <p className="md:text-left text-center font-medium md:text-medium text-lg 3xl:text-2xl 2xl:text-xl 2xl:leading-relaxed 3xl:leading-loose text-gray-500">Digital Morocco is dedicated to fostering meaningful connections and driving business success. We accomplish this through a range of engaging activities, including professional events such as conferences and training sessions, as well as various networking opportunities.</p>
            </div>
            <div className="col-span-2 space-y-4">
            <p className="md:text-left text-center text-gray500 text-opacity-70 3xl:text-2xl 2xl:text-xl font-medium text-sm leading-loose xl:text-medium 2xl:leading-relaxed 3xl:leading-loose tracking-wide ">Welcome to Digital Morocco, a thriving community of businesses, institutions, investors, and esteemed local and international experts in the digital field. We are united by a common goal: to foster the development of skills, advance cutting-edge technologies, and empower startups and digital projects to conquer the challenges of today's ever-evolving market.</p>
            <p className="md:text-left text-center text-gray500 text-opacity-70 3xl:text-2xl 2xl:text-xl font-medium text-sm leading-loose xl:text-medium 2xl:leading-relaxed 3xl:leading-loose tracking-wide">Our mission is to qualify and equip entrepreneurs with the necessary tools and knowledge to navigate the dynamic business environment in Morocco and beyond. Through collaborative efforts, we strive to create a robust ecosystem that nurtures innovation, drives growth, and propels the digital landscape forward.</p>
            <p className="md:text-left text-center text-gray500 text-opacity-70 3xl:text-2xl 2xl:text-xl font-medium text-sm leading-loose xl:text-medium 2xl:leading-relaxed 3xl:leading-loose tracking-wide">At Digital Morocco, we believe in the power of connectivity. By fostering meaningful connections among our members, we facilitate the exchange of ideas, expertise, and opportunities. </p>
            </div>
            <div className="col-span-2 space-y-4">
                <p className="md:text-left text-center text-gray500 text-opacity-70 3xl:text-2xl 2xl:text-xl font-medium text-sm leading-loose xl:text-medium 2xl:leading-relaxed 3xl:leading-loose tracking-wide">Our platform serves as a hub where startups can find the guidance and resources they need to flourish, while investors discover promising ventures that align with their vision.</p>
                <p className="md:text-left text-center text-gray500 text-opacity-70 3xl:text-2xl 2xl:text-xl font-medium text-sm leading-loose xl:text-medium 2xl:leading-relaxed 3xl:leading-loose tracking-wide">We pride ourselves on curating a diverse network of industry experts who bring their wealth of knowledge and experience to the table. Through exclusive events, training sessions, and collaborative projects, we continuously strive to enhance skills, share insights, and promote transformative ideas.</p>
                <p className="md:text-left text-center text-gray500 text-opacity-70 3xl:text-2xl 2xl:text-xl font-medium text-sm leading-loose xl:text-medium 2xl:leading-relaxed 3xl:leading-loose tracking-wide">Together, we are at the forefront of the digital revolution, propelling Morocco's business landscape to new heights. Join us on this exciting journey as we collectively shape the future of the digital industry in Morocco and make a lasting impact on a global scale.</p>
            </div>
            </div>
            <AboutDigitalM />
            <OurTeam />
        </div>
    );
};

export default AboutUs;