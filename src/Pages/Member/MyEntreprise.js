import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";

export default function MyEntreprise() {
    const [listEmployees, setListEmployees] = useState([{ firstName: '', lastName: '' }]);
    const [legalDocuments, setLegalDocuments] = useState(null);
    const handleLegalDocumentsChange = (event) => {
        const file = event.target.files[0];
        setLegalDocuments(file);
    };





    
    const handleListEmployeesFirstNameChange = (index, value) => {
        const updatedListEmployees = [...listEmployees];
        updatedListEmployees[index].firstName = value;
        setListEmployees(updatedListEmployees);
    };
    const handleListEmployeesLastNameChange = (index, value) => {
        const updatedListEmployees = [...listEmployees];
        updatedListEmployees[index].lastName = value;
        setListEmployees(updatedListEmployees);
    };
    const handleAddListEmployee= () => {
        setListEmployees([...listEmployees, { firstName: '', lastName: '' }]);
    };
    const handleRemoveListEmployee = (index) => {
        const updatedListEmployees = listEmployees.filter((_, i) => i !== index);
        setListEmployees(updatedListEmployees);
    };
    const [file, setFile] = useState(null)
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.image);
        console.log(data)
       
    };

    return(
        
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
                          My Entreprise
                      </h2>
                  </div>
                  <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <Toaster />
                      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                          <div>
                              <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                                  Company Name
                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("companyName", {
                                          required: {
                                              value: true,
                                              message: "You must enter your Entreprise name",
                                          },
                                          minLength: {
                                              value: 2,
                                              message: "This is not long enough ",
                                          }
                                      })}
                                      id="companyName"
                                      name="companyName"
                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.companyName?.message}
                                  </span>
                              </div>
                          </div>
                          <div>
                              <label htmlFor="legalName" className="block text-sm font-medium leading-6 text-gray-900">
                                  Legal Name
                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("legalName", {
                                          required: {
                                              value: true,
                                              message: "You must enter your Entreprise Legal name",
                                          },
                                          minLength: {
                                              value: 2,
                                              message: "This is not long enough ",
                                          }
                                      })}
                                      id="legalName"
                                      name="legalName"
                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.legalName?.message}
                                  </span>
                              </div>
                          </div>
                          <div>
                              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                  Website
                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("website", {
                                          required: {
                                              value: true,
                                              message: "You must enter your Entreprise website",
                                          },
                                          pattern: {
                                              value:/^(https?:\/\/)?(www\.)?CompanyName\.com\//,
                                              message: "This needs to be a valid Company website",
                                          }
                                      })}
                                      id="website"
                                      name="website"
à                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.website?.message}
                                  </span>
                              </div>
                          </div>
                          <div>
                              <label htmlFor="contactEmail" className="block text-sm font-medium leading-6 text-gray-900">
                                Contact Email
                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("contactEmail", {
                                        required: {
                                            value: true,
                                            message: "You must enter your Company contact email",
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "This is not long enough to be a contact email",
                                        },
                                        maxLength: {
                                            value: 120,
                                            message: "This is too long",
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "This needs to be a valid contact email",
                                        },
                                      })}
                                      id="contactEmail"
                                      name="contactEmail"
                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.contactEmail?.message}
                                  </span>
                              </div>
                          </div>
                          <div>
                              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address

                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("address", {
                                          required: {
                                              value: true,
                                              message: "You must enter your Entreprise address",
                                          },
                                          minLength: {
                                              value: 2,
                                              message: "This is not long enough ",
                                          }
                                      })}
                                      id="address"
                                      name="address"
                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.address?.message}
                                  </span>
                              </div>
                          </div>
                          <div className="grid gap-4 grid-cols-2">
                            <div>
                              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country

                              </label>
                              <div className="mt-2">
                                <select  
                                {...register("country", {
                                    required: "You must select a country",
                                })}
                                 data-te-select-init className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                <option value="">Select a country</option>
                                <option value="morocco">Morocco</option>
                                <option value="france">France</option>
                                <option value="belgique">Belgique</option>
                                </select>
                                <span className="text-red-400 text-sm py-2">
                                {errors?.country?.message}
                                </span>
                              </div>
                              </div>
                              <div>
                              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City

                              </label>
                              <div className="mt-2">
                                <select  
                                {...register("city", {
                                    required: "You must select a city",
                                })}
                                 data-te-select-init className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                <option value="">Select a city</option>
                                <option value="rabat">Rabat</option>
                                <option value="casablanca">Casablanca</option>
                                <option value="marakkech">Marakkech</option>
                                </select>
                                <span className="text-red-400 text-sm py-2">
                                {errors?.city?.message}
                                </span>
                              </div>
                              </div>
                              
                          </div>
                            
                          <div>
                              <label htmlFor="companyType" className="block text-sm font-medium leading-6 text-gray-900">
                                    Company Type

                              </label>
                              <div className="mt-2">
                                <select  
                                {...register("companyType", {
                                    required: "You must select a company type",
                                })}
                                 data-te-select-init className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                <option value="">Select a company type</option>
                                <option value="type1">Type 1</option>
                                <option value="type2">Type 2</option>
                                <option value="type3">Type 3</option>
                                </select>
                                <span className="text-red-400 text-sm py-2">
                                {errors?.companyType?.message}
                                </span>
                              </div>
                              </div>
                            
                              <div>
                              <label htmlFor="tin" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tax Identifier Number

                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("tin", {
                                          required: {
                                              value: true,
                                              message: "You must enter your Entreprise Tax Identifier Number",
                                          },
                                          minLength: {
                                              value: 2,
                                              message: "This is not long enough ",
                                          }
                                      })}
                                      id="tin"
                                      name="tin"
                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.tin?.message}
                                  </span>
                              </div>
                          </div>

                          <div>
                              <label htmlFor="cin" className="block text-sm font-medium leading-6 text-gray-900">
                              Corporate Identifier Number


                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("cin", {
                                          required: {
                                              value: true,
                                              message: "You must enter your Entreprise Corporate Identifier Number",
                                          },
                                          minLength: {
                                              value: 2,
                                              message: "This is not long enough ",
                                          }
                                      })}
                                      id="cin"
                                      name="cin"
                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.cin?.message}
                                  </span>
                              </div>
                          </div>
                            
                          <div className='space-y-3'>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    List Of Employees
                                </label>
                                {listEmployees.map((employee, index) => (
                                    <div key={index} className=" flex space-x-2">
                                        <input
                                            type="text"
                                            value={employee.firstName}
                                            onChange={(e) => handleListEmployeesFirstNameChange(index, e.target.value)}
                                            placeholder={`First Name`}
                                            className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                        <input
                                            type="text"
                                            value={employee.lastName}
                                            onChange={(e) => handleListEmployeesLastNameChange(index, e.target.value)}
                                            placeholder={`Last Name `}
                                            className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                        
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveListEmployee(index)}
                                            className="px-2 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddListEmployee}
                                    className=" px-2 py-1.5 text-sm rounded-md bg-blue-400 text-white hover:bg-blue-500"
                                >
                                    Add Employee
                                </button>
                            </div>

                            <div className='w-full space-y-3'>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Upload The Documents</label>
                                    <div className="flex">
                                        <label htmlFor="legalDocuments" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                            Legal documents
                                        </label>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleLegalDocumentsChange}
                                            id="legalDocuments"
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                          <div className="w-full space-y-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Company Logo
                                </label>
                              <label htmlFor="image" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                  {file ? "Change Logo":"Choose a Logo"}
                                  <input
                                      onChange={(event) => setFile(event.target.files[0])}
                                      id="image"
                                      name="image"
                                      type="file" // Utiliser "type=file" pour permettre le téléchargement de fichiers
                                      autoComplete="image"
                                      required
                                      accept=".png,.jpg" // Limiter les types de fichiers acceptés aux fichiers PDF
                                      className="hidden " // Masquer l'input de fichier natif
                                  />
                                
                              </label><br />
                                  {file && <img className='p-5 text-xs' src={URL.createObjectURL(file)} />}
                          </div>
                          <div className="mt-2">
                              <button
                              disabled={!file}
                                  type="submit"
                                  className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              >
                                  Create My Entreprise
                              </button>
                          </div>
                      </form>

                  </div>
              </div>
          </div>
      </div>
        
    )
}


