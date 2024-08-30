import React from "react";
import ItemsContainer from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-white text-bleu2 ">
      <div className="text-white md:flex md:justify-between md:items-center xl:px-72  px-8 bg-gray-400 py-3 bg-[url('/public/img/footer1.png')] bg-no-repeat bg-cover bg-center md:h-[388px] w-screen bg-blend-hard-light">
        <div className=" flex flex-col items-center space-y-4 md:space-y-6 space-x-3">
          <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold">
            Ready to unlock a world of endless possibilities?
          </h1>
          <p className="font-semibold not-italic text-base text-justify">
            Join us at Digital Morocco and embark on a transformative journey.
            Dive into our vibrant community, where innovation thrives,
            connections flourish, and growth knows no bounds.
          </p>
        </div>
        <div className="border-2 border-transparent flex justify-center items-center rounded-lg bg-white mx-4">
          <p className="text-center text-base text-blue-700 font-semibold not-italic px-8 py-7">
            Explore more and discover how Digital
            <br /> Morocco can amplify your success in the digital realm.
          </p>
        </div>
      </div>
      <ItemsContainer />

      <div className="px-8 py-2 md:px-64">
        <div className="flex justify-between space-x-6 border-t-2 border-t-gray-201 p-8 md:mx-0">
          <div className="bg-[url('/public/img/Logo.jpg')] bg-no-repeat bg-contain bg-center h-[52px] w-[220px] md:mr-8"></div>
          <div className="sm:grid sm:grid-cols-2 gap-10 text-gray-400 text-sm pb-8">
            <div>
              <p className="font-semibold text-bleu2">ADDRESS</p>
              <br />
              <p>493 Av, 2 Mars, Casablanca</p>
              <p>20550, Morocco</p>
            </div>
            <div>
              <p className="font-semibold text-bleu2">
                TRY DIGITAL MOROCCO FOR FREE
              </p>{" "}
              <br />
              <p>
                Start a 14 Day Free Trial on any of our paid plans. No Credit{" "}
                <br />
                card required.
              </p>
              <br />
              <button className="border-2 border-transparent flex justify-center  rounded-full bg-blue-700 text-white mx-2 p-2 w-48">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-4 gap-1 text-center pt-2 text-gray-400 text-sm pb-4 md:mx-72 mx-4 space-x-4">
        <div>Conditions Générales d'Utilisation</div>
        <div>Conditions Générales de Vente Mentions Légales</div>
        <div>Politique de Confidentialité</div>
        <div>Politique en matière des Cookies</div>
      </div>
      <div className="text-center pt-2 text-gray-400 text-sm pb-8 px-4">
        <span>Copyright © 2023 Digital Morocco, tous droits réservés</span>
      </div>
    </footer>
  );
};

export default Footer;
