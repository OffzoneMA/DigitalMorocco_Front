import React, {useState} from 'react'

export default function SignUp() {
  const [selectedOption, setSelectedOption] = useState('');
  const [additionalInputValue, setAdditionalInputValue] = useState('');
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setAdditionalInputValue('');
    
  };
  
  const handleAdditionalInputChange = (event) => {
    setAdditionalInputValue(event.target.value);
  };

   // Fonction pour activer le champ de saisie supplémentaire lorsque l'option est sélectionnée
  const handleShowAdditionalInput = () => {
    if (selectedOption === 'member' || selectedOption === 'investor' || selectedOption === 'partner') {
      setShowAdditionalInput(true);
    } else {
      setShowAdditionalInput(false);
    }
    // Vérifier l'option sélectionnée et masquer le champ de saisie supplémentaire pour certaines options
  if (selectedOption === 'partner') {
    setShowAdditionalInput(false);
  } else if (selectedOption === 'member') {
    // Vérifier si le champ "RC" est déjà affiché et réinitialiser la valeur si nécessaire
    if (showAdditionalInput) {
      setAdditionalInputValue('');
    }
  } else if (selectedOption === 'investor') {
    // Vérifier si le champ "LinkedIn Link" est déjà affiché et réinitialiser la valeur si nécessaire
    if (showAdditionalInput) {
      setAdditionalInputValue('');
    }
  }
  };
  return (
  <div className='min-h-screen'> 
    <div className='grid place-items-center py-10'>
            <div className='bg-white w-3/6 space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-10 w-auto"
                  src="/img/offzoneLogo.jpg"
                  alt=""
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Create a new account
                </h2>
              </div>
                <form className="w-full space-y-4" action="#" method="POST">
                <div className='flex flex-wrap'>
                  <div className='w-1/2 px-3'>
              
                  <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className='mt-2'>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="firstName"
                        required
                        className="w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 "
                    />
                    </div>
                  </div>
                  <div className='w-1/2 px-3'>
                  
                  <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name 
                  </label>
                  <div className='mt-2'>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="lastName"
                        required
                        className="w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 "
                    />
                    
                    </div>
                  </div>
                </div>
              <div className='w-full px-3'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className='mt-2'>
              
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              </div>
              <div className='w-full px-3'>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className='mt-2'>
              
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              </div>
              <div className='w-full px-3'>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className='mt-2'>
              
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirmPassword"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              </div>
              <div className='w-full px-3'>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className='mt-2'>
              
              <select value={selectedOption} onChange={(e) => {
                handleOptionChange(e);
                handleShowAdditionalInput(); // Activer le champ de saisie supplémentaire lorsque l'option est sélectionnée
                }} data-te-select-init className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6' >
                <option value="">Select a role</option>
                <option value="member">Member</option>
                <option value="investor">Investor</option>
                <option value="partner">Partner</option>
              </select>
              {/* Afficher le champ "LinkedIn Link" lorsque "Investor" est sélectionné */}
              {selectedOption === 'member' && (
                <div className='w-full mt-2 '>
                  <label htmlFor="rcMember" className="block text-sm font-medium leading-6 text-gray-900">
                    RC Document Link
                  </label>
                  <div className='mt-2'>
              
                  <input
                  value={additionalInputValue}
                  onChange={handleAdditionalInputChange}
                  id="rcMember"
                  name="rcMember"
                  type="url"
                  autoComplete="rcMember"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <label htmlFor="ice" className="block mt-4 text-sm font-medium leading-6 text-gray-900">
      ICE Document Link
    </label>
    <div className='mt-2'>
      <input
        value={additionalInputValue}
        onChange={handleAdditionalInputChange}
        id="ice"
        name="ice"
        type="text"
        autoComplete="ice"
        required
        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
      />
    </div>
                </div>
        
              )}

              {selectedOption === 'investor' && (
                <div className='w-full mt-2 '>
                  <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-gray-900">
                    Linked In Link
                  </label>
                  <div className='mt-2'>
              
                  <input
                  value={additionalInputValue}
                  onChange={handleAdditionalInputChange}
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
                    RC Document Link
                  </label>
                  <div className='mt-2'>
              
                  <input
                  value={additionalInputValue}
                  onChange={handleAdditionalInputChange}
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
              <div className='mt-2 px-3'>
              <button
                type="submit"
                className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign up
              </button>
            </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/SignIn" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer">
              Sign in
            </a>
          </p>
             
              
            </div>
    </div>
  </div> 
    
  )
}
