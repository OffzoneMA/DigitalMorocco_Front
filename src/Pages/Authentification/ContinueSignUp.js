import React, { useState } from 'react';


const ContinueSignUp = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAdditionalInputRC, setShowAdditionalInputRC] = useState(false);

  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [step] = useState(2);
  const status = {
    "active":' shadow-blue-500 ',
    "valid":' shadow-green-500 ',
    "notactive":' shadow-gray-300 ',
  };
  

  const handleSendVerification = () => {
    
    setShowVerificationMessage(true);
  };

  return (
    <div className="items-center border-5 flex-wrap md:space-y-8 p-7 py-12">
      <div className="flex gap-4  ">

        {/* div 1 step 1 */}
        <div
          className={`bg-white w-3/6 py-7 px-10 rounded-lg border-0 ring-2 ring-gray-300 ring-inset 
          ${ step === 1 ? status.active : status.valid }
          shadow-2xl`}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         {/*    <img className="mx-auto h-10 w-auto" src="/img/offzoneLogo.jpg" alt="" /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Step 1
            </h2>
          </div>
          <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/*  code for Step 1 */}
            <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Verify your email address</h3>
              <button
                className="mt-6 px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                onClick={handleSendVerification}
              >
                {showVerificationMessage ? "Verification Send": "Send Verification" }
               
              </button>
              {showVerificationMessage && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  Check your email for a verification link.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* div 2 step 2 */}
        <div
          className={`bg-white w-3/6 py-7 px-10 rounded-lg border-0 ring-2 ring-gray-300 ring-inset  ${
            step === 2 && status.active }  ${step === 3 && status.valid}
           shadow-2xl`}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         {/*   <img className="mx-auto h-10 w-auto" src="/img/offzoneLogo.jpg" alt="" /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Step 2
            </h2>
          </div>
          <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/*  form for Step 1 */}
            <form className="w-full space-y-4">
            <div className='w-full px-3'>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className='mt-2'>

                <select value={selectedOption} onChange={(e) => {
                  setSelectedOption(e.target.value);
                }} data-te-select-init className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6' >
                  <option value="">Select a role</option>
                  <option value="member">Member</option>
                  <option value="investor">Investor</option>
                  <option value="partner">Partner</option>
                </select>

                {selectedOption === 'member' && (
                <div className='w-full mt-2'>
                  <div className='flex items-center'>
                    <input
                      type="checkbox"
                      id="rcMemberCheckbox"
                      name="rcMemberCheckbox"
                      onChange={() => setShowAdditionalInputRC(!showAdditionalInputRC)}
                      className="mr-2"
                    />
                    <label htmlFor="rcMemberCheckbox" className="block text-sm font-medium leading-6 text-gray-900">
                      RC_ICE Document 
                    </label>
                  </div>
                  {showAdditionalInputRC && (
                    <div className='mt-2'>
                      <label htmlFor="rcMember" className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Choose RC_ICE Document
                        <input
                          id="rcMember"
                          name="rcMember"
                          type="file" // Utiliser "type=file" pour permettre le téléchargement de fichiers
                          autoComplete="rcMember"
                          required
                          accept=".pdf" // Limiter les types de fichiers acceptés aux fichiers PDF
                          className="hidden" // Masquer l'input de fichier natif
                        />
                      </label>
                    </div>
                  )}
                </div>
              )}



                {selectedOption === 'investor' && (
                  <div className='w-full mt-2 '>
                    <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-gray-900">
                      Linkedin Link
                    </label>
                    <div className='mt-2'>

                      <input
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        autoComplete="linkedin"
                        required
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}

                {selectedOption === 'partner' && (
                  <div className='w-full mt-2 '>
                    <label htmlFor="rcPartner" className="block text-sm font-medium leading-6 text-gray-900">
                      N° RC
                    </label>
                    <div className='mt-2'>

                      <input
                        id="rcPartner"
                        name="rcPartner"
                        type="url"
                        autoComplete="rcPartner"
                        required
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>
           
            
            
            
            <div className="mt-2 px-3">
              <button
                type="submit"
                className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              
                Submit
              </button>
            </div>
          </form>
          </div>
        </div>

        

        {/* div 3 step 3 */}
        <div
          className={`bg-white w-3/6 py-7 px-10 rounded-lg border-0 ring-2 ring-gray-300 ring-inset
           ${ step === 3 ? status.active : status.notactive } shadow-2xl`}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           {/*  <img className="mx-auto h-10 w-auto" src="/img/offzoneLogo.jpg" alt="" /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Step 3
            </h2>
          </div>
          <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/*  form for Step 3 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueSignUp;
