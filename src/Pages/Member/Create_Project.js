import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useAddProjetMutation } from '../../Services/Member.Service';
import { useNavigate } from 'react-router-dom';

const Create_Project = ()=> {
  const [pitchDeck, setPitchDeck] = useState(null);
  const [businessPlan, setBusinessPlan] = useState(null);
  const [financialProjection, setFinancialProjection] = useState(null);
  const [moreprojet, setMoreProjet] = useState(null);
  
  const handlePitchDeckChange = (event) => {
    const file = event.target.files[0];
    setPitchDeck(file);
  };
  const handleMoreProjectionChange = (event) => {
    const file = event.target.files[0];
    setMoreProjet(file);
  };
  

  const handleBusinessPlanChange = (event) => {
    const file = event.target.files[0];
    setBusinessPlan(file);
  };
  const handleFinancialProjectionChange = (event) => {
    const file = event.target.files[0];
    setFinancialProjection(file);
  };

    const [file, setFile] = useState(null)
    const [addProjet, response] = useAddProjetMutation()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        if (response.isSuccess) {
            navigate('/myProjet')
        }
    }, [response.isSuccess])


    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('fundingAmount', data.fundingAmount);
        formData.append('description', data.description);
        formData.append('teamMember', data.teamMember);
        formData.append('milestoneProgress', data.milestoneProgress);
      
        console.log(data)
        //addProjet(formData)
        /*setFile(null)
        reset()*/
    };

  return (
      <div className=''>
          <div className='grid place-items-center py-10'>
              <div className='bg-white md:w-3/6 space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <img
                          className="mx-auto h-10 w-auto"
                          src="/img/Logo.jpg"
                          alt=""
                      />
                      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                          Create a new Project
                      </h2>
                  </div>
                  <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <Toaster />
                      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                          <div>
                              <label htmlFor="fundingAmount"  className="block text-sm font-medium leading-6 text-gray-900">
                              Funding Amount
                              </label>
                              <div className="mt-2">
                              <input
                                     id="fundingAmount"
                                     name="fundingAmount"
                                     type="text"
                                    {...register("fundingAmount", {
                                        required: {
                                            value: true,
                                            message: "You must enter your Funding Amount ",
                                        },
                                        minLength: {
                                            value: 15,
                                            message: "This is not long enough ",
                                        }
                                    })}
                                    className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                />
                                <span className="text-red-400 text-sm py-2">
                                    {errors?.fundingAmount?.message}
                                </span>
                              </div>
                          </div>
                          <div>
                              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                              Project Details
                              </label>
                              <div className="mt-2">
                                  <textarea
                                      {...register("description", {
                                          required: {
                                              value: true,
                                              message: "You must enter your Project Details ",
                                          },
                                          minLength: {
                                              value: 15,
                                              message: "This is not long enough ",
                                          }
                                      })}
                                      id="description"
                                      name="description"
                                      
                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.description?.message}
                                  </span>
                              </div>
                              
                              <div>
                              <label  className="block text-sm font-medium leading-6 text-gray-900">
                              Team member
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="text" 
                                    {...register("teamMember", {
                                        required: {
                                            value: true,
                                            message: "You must enter your Team member ",
                                        },
                                        minLength: {
                                            value: 15,
                                            message: "This is not long enough ",
                                        }
                                    })}
                                    id="teamMember"
                                    name="teamMember"  
                                    className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                />
                                <span className="text-red-400 text-sm py-2">
                                    {errors?.teamMember?.message}
                                </span>
                              </div>
                          </div>
                           
                          <div>
                              <label  className="block text-sm font-medium leading-6 text-gray-900">
                              Milestone Progress
                              </label>
                              <div className="mt-2">
                             <input
                                    type="text" 
                                    {...register("milestoneProgress", {
                                        required: {
                                            value: true,
                                            message: "You must enter your Milestone Progress ",
                                        },
                                        minLength: {
                                            value: 15,
                                            message: "This is not long enough ",
                                        }
                                    })}
                                    id="milestoneProgress"
                                    name="milestoneProgress"
                                    className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                />
                                <span className="text-red-400 text-sm py-2">
                                    {errors?.milestoneProgress?.message}
                                </span>
                              </div>
                          </div>
                           
                          <div className='w-full mt-2'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Pitch Deck</label>
                            <div className="flex">
                                <label htmlFor="pitchDeck" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handlePitchDeckChange}
                                    id="pitchDeck"
                                    className="hidden"
                                />
                            </div>
                        </div>
                                
                                <div className='w-full mt-2'>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Business Plan</label>
                                <div className="flex">
                                    <label htmlFor="businessPlan" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                        Choose File
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleBusinessPlanChange}
                                        id="businessPlan"
                                        className="hidden"
                                    />
                                </div>
                            </div>

                                <div className='w-full mt-2'>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Financial Projection</label>
                                <div className="flex">
                                    <label htmlFor="financialProjection" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                        Choose File
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFinancialProjectionChange}
                                        id="financialProjection"
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <div className='w-full mt-2'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Upload More Files</label>
                            <div className="flex">
                                <label htmlFor="moreProjection" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleMoreProjectionChange}
                                    id="moreProjection"
                                    className="hidden"
                                />
                            </div>
                        </div>

                          </div>
                              
                          <div className="mt-2">
                              <button
                              disabled={!file}
                                  type="submit"
                                  className="disabled:opacity-50 disabled:cursor-not-allowed  w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:ring-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              >
                                  Create
                              </button>
                          </div>
                      </form>

                  </div>
              </div>
          </div>
      </div>
  );
};

export default Create_Project;
