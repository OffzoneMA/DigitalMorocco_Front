import React, {useState} from 'react'
import { useForm } from "react-hook-form";



export default function ContinueSignUp() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAdditionalInputRC, setShowAdditionalInputRC] = useState(false);
  const [showAdditionalInputICE, setShowAdditionalInputICE] = useState(false);

  
  return (
    <div className=''>
      <div className='grid place-items-center py-10'>
        <div className='bg-white md:w-3/6 space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/img/offzoneLogo.jpg"
              alt=""
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Continue your Registration
            </h2>
          </div>
          <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                      RC Document 
                    </label>
                  </div>
                  {showAdditionalInputRC && (
                    <div className='mt-2'>
                      <label htmlFor="rcMember" className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Choose RC Document
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

                  <div className='flex items-center mt-4'>
                    <input
                      type="checkbox"
                      id="iceCheckbox"
                      name="iceCheckbox"
                      onChange={() => setShowAdditionalInputICE(!showAdditionalInputICE)}
                      className="mr-2"
                    />
                    <label htmlFor="iceCheckbox" className="block text-sm font-medium leading-6 text-gray-900">
                      ICE Document 
                    </label>
                  </div>
                  {showAdditionalInputICE && (
                    <div className='mt-2'>
                      <label htmlFor="ice" className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Choose ICE Document
                        <input
                          id="ice"
                          name="ice"
                          type="file" // Utiliser "type=file" pour permettre le téléchargement de fichiers
                          autoComplete="ice"
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
      </div>
    </div>

  )
}
