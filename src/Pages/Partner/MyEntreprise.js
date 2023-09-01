import React, { useEffect, useState } from 'react';
import {  toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { countriesAndCities } from '../../data/countries'
import { useCreateEntrepriseMutation } from '../../Services/Partner.Service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MyEntreprise() {
    const {  userInfo } = useSelector((state) => state.auth)
    const [edit, setedit] = useState(userInfo && !userInfo?.partner?.companyName ? true : false)
    const maxFileSize = 8 * 1024 * 1024;
    const [listEmployees, setListEmployees] = useState(userInfo?.partner?.listEmployee ? userInfo?.partner?.listEmployee : []);
    const [logo, setLogo] = useState(null)
    const [legalDocuments, setLegalDocuments] = useState([]);
    const [legaldocFile, setlegaldocFile] = useState(null)
    const [legaldocName, setlegaldocName] = useState(null)

    const [selectedCountry, setSelectedCountry] = useState(userInfo?.partner?.country ? userInfo?.partner?.country : "United States");
    const [cities, setcities] = useState(userInfo?.partner?.city ? countriesAndCities[selectedCountry] : []);

    const [createEntreprise, response] = useCreateEntrepriseMutation()
    const navigate = useNavigate()

    useEffect(() => {
        response.isError && toast.error(response.error?.data?.message)
        if(response.isSuccess) 
       { 
        toast.success("Entreprise Edited!")
        setTimeout(()=>{
            navigate((0))
        },3000)
    }

    }, [response.isLoading])

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm(userInfo?.partner?.companyName &&{
        defaultValues: {
            companyName: userInfo?.partner?.companyName,
            legalName: userInfo?.partner?.legalName,
            website: userInfo?.partner?.website,
            contactEmail: userInfo?.partner?.contactEmail,
            address: userInfo?.partner?.address,
            country: userInfo?.partner?.country,
            city: userInfo?.partner?.city,
            state: userInfo?.partner?.state,
            companyType: userInfo?.partner?.companyType,
            tin: userInfo?.partner?.taxNbr,
            cin: userInfo?.partner?.corporateNbr,
            visbility: userInfo?.partner?.visbility=="public" ? false : true,
            desc: userInfo?.partner?.desc,


        },
    });



    useEffect(() => {
        setcities(selectedCountry ? countriesAndCities[selectedCountry]:[])
    }, [selectedCountry])




    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };


    const handleLegalDocumentsChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > maxFileSize){
            toast.error('File size exceeds the maximum allowed size.(Max 8MB)');
        }
        else{
        setlegaldocFile(file);
        event.target.value = ''
        }

    };

    const handleaddDocument = () => {
        setLegalDocuments((prevDocs) => [...prevDocs, { name: legaldocName, file: legaldocFile}])
        setlegaldocFile(null)
        setlegaldocName(null)
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
    const handleAddListEmployee = () => {
        setListEmployees([...listEmployees, { firstName: '', lastName: '' }]);
    };
    const handleRemoveListEmployee = (index) => {
        const updatedListEmployees = listEmployees.filter((_, i) => i !== index);
        setListEmployees(updatedListEmployees);
    };


    const onSubmit = (data) => {
        data.visbility ? data.visbility = "private" : data.visbility = "public"
        
       const formData = new FormData();
        formData.append('infos', JSON.stringify({
            ...data,
            listEmployees,
        }));
       logo && formData.append('logo', logo);
       if(legalDocuments.length>0) {
        for(const doc of legalDocuments){
            formData.append('files', doc.file,doc.name);
        }}
        createEntreprise(formData)

    };

    return (
       
        <div className=''>
          {  userInfo ? 
                      <div className='flex py-10 '>
                <div className='bg-white  w-full  space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
                    <div className=" ">
                        <img
                            className="mx-auto h-10 "
                            src="/img/Logo.jpg"
                            alt=""
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                             Company informations
                        </h2>
                    </div>
                    <div className="flex flex-col  mt-10 sm:mx-auto ">
             
                        {!edit  ? <button
                            className=' bg-blue-600 justify-self-center self-center text-white px-3 py-1 mb-5 rounded-lg'
                            onClick={() => setedit(true)} >
                           Enable Edit
                        </button>
                        :
                                <button
                                    className=' bg-gray-600 justify-self-center self-center text-white px-3 py-1 mb-5 rounded-lg'
                                    onClick={() => setedit(false)} >
                                    Cancel
                                </button>
                        
                    }
                       
                       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid gap-4 grid-cols-2'>
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
                                            disabled={!edit}
                                            className=" block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
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
                                                                                    disabled={!edit}

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
                            </div>


                            <div className='grid gap-4 grid-cols-2'>
                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                        Website
                                    </label>
                                    <div className="mt-2">
                                        <input
                                                                                    disabled={!edit}

                                            {...register("website", {
                                                required: {
                                                    value: true,
                                                    message: "You must enter your Entreprise website",
                                                },
                                                pattern: {
                                                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/,
                                                    message: "This needs to be a valid Company website",
                                                }
                                            })}
                                            id="website"
                                            name="website"
                                            className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
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
                                                                                    disabled={!edit}

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
                            </div>


                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description

                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            disabled={!edit}

                                            {...register("desc", {
                                                required: {
                                                    value: true,
                                                    message: "You must enter your Entreprise Description",
                                                },
                                                minLength: {
                                                    value: 10,
                                                    message: "This is not long enough ",
                                                }
                                            })}
                                            id="desc"
                                            name="desc"
                                            className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                        <span className="text-red-400 text-sm py-2">
                                            {errors?.desc?.message}
                                        </span>
                                    </div>
                                </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address

                                </label>
                                <div className="mt-2">
                                    <input
                                                                                disabled={!edit}

                                        {...register("address", {
                                            required: {
                                                value: true,
                                                message: "You must enter your Entreprise address",
                                            },
                                            minLength: {
                                                value: 10,
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
                                                                                    disabled={!edit}

                                            {...register("country", {
                                                required: "You must select a country",
                                            })}
                                            onChange={handleCountryChange}
                                            data-te-select-init className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                            <option value="">Select a country</option>
                                            {Object.keys(countriesAndCities).map((country,i) => (
                                                <option key={i} value={country}>
                                                    {country}
                                                </option>))} 
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
                                                                                    disabled={!edit}

                                            {...register("city", {
                                                required: "You must select a city",
                                            })}
                                            data-te-select-init className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                            <option value="">Select a city</option>
                                            {selectedCountry && 
                                                cities.map((city,i) => (
                                                    <option key={i} value={city}>
                                                        {city}
                                                    </option>
                                                 
                                                 
                                                ))} 
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
                                                                                disabled={!edit}

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


                            <div className='grid gap-4 grid-cols-2'>
                                <div>
                                    <label htmlFor="tin" className="block text-sm font-medium leading-6 text-gray-900">
                                        Tax Identifier Number

                                    </label>
                                    <div className="mt-2">
                                        <input
                                                                                    disabled={!edit}

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
                                                                                    disabled={!edit}

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
                            </div>

                            <div className='space-y-3'>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    List Of Employees
                                </label>
                                {listEmployees.map((employee, index) => (
                                    <div key={index} className=" flex space-x-2">
                                        <input
                                                                                    disabled={!edit}

                                            type="text"
                                            value={employee.firstName}
                                            onChange={(e) => handleListEmployeesFirstNameChange(index, e.target.value)}
                                            placeholder={`First Name`}
                                            className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                        <input
                                                                                    disabled={!edit}

                                            type="text"
                                            value={employee.lastName}
                                            onChange={(e) => handleListEmployeesLastNameChange(index, e.target.value)}
                                            placeholder={`Last Name `}
                                            className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />

                                        <button
                                            type="button"
                                            disabled={!edit}
                                            onClick={() => handleRemoveListEmployee(index)}
                                            className=" disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    disabled={!edit}
                                    onClick={handleAddListEmployee}
                                        className=" disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1.5 text-sm rounded-md bg-blue-400 text-white hover:bg-blue-500"
                                >
                                    Add Employee
                                </button>
                            </div>
                                <div>
                                    <input type="checkbox" name='visbility' placeholder='private' {...register('visbility')} />
                                    <label htmlFor='visbility' className='text-lg p-2 font-semibold'>Set Private</label>
                                </div>


                            
                                <div className='grid gap-4 grid-cols-2'>
                              {
                                !userInfo?.partner?.companyName &&      <div className='w-full space-y-3'>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Upload The Documents (Max 8MB)</label>
                                        <div className="flex">
                                            <label htmlFor="legalDocuments" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                                {legaldocFile ? 'Choosing ...' : 'Add Legal documents (0-5 Files*)'}
                                            </label>
                                            <input
                                                disabled={legaldocFile || legalDocuments.length == 5}
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleLegalDocumentsChange}
                                                id="legalDocuments"
                                                className="hidden"
                                            />
                                        </div>
                                        {
                                            legalDocuments.length > 0 &&
                                            legalDocuments.map((el, i) => (
                                                <div className='text-xs italic text-gray-400' key={i}>
                                                    <span>{el.name}</span>
                                                    <button
                                                        onClick={() => {
                                                            setLegalDocuments(legalDocuments.filter((_, index) => i !== index));
                                                        }}
                                                        className='text-red-500 mx-1 underline'
                                                        type='button'>remove</button>
                                                </div>
                                            ))
                                        }
                                        {legaldocFile &&
                                            <div className='flex items-center gap-1'>
                                                <input
                                                    onChange={(e) => setlegaldocName(e.target.value.replaceAll(' ', '_'))}
                                                    type="text" className='p-2 ring-1' placeholder='Enter Document Name Ex: RC' />
                                                <button
                                                    type='button'
                                                    onClick={handleaddDocument}
                                                    disabled={!legaldocName || legaldocName?.length < 2 || legaldocName?.length > 35}
                                                    className={`disabled:opacity-80 disabled:cursor-not-allowed p-2 bg-green-400 mx-3 rounded-xl text-white `} >add file</button>
                                                <button
                                                    type='button'
                                                    className={` p-2 bg-gray-400 mx-3 rounded-xl text-white`} onClick={() => {
                                                        setlegaldocName(null)
                                                        setlegaldocFile(null)
                                                    }}>Cancel</button>
                                            </div>
                                        }

                                        </div>}

                                    <div className="w-full space-y-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Company Logo (Max 8MB)
                                        </label>
                                        <label className={`${edit ? 'cursor-pointer':'cursor-not-allowed' }  inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out`}>
                                            {logo ? "Change Logo" : "Choose a Logo"}
                                            <input
                                                disabled={!edit}
                                                onChange={(event) => {
                                                    if (event.target.files[0] && event.target.files[0].size > maxFileSize) {
                                                        toast.error('File size exceeds the maximum allowed size.(Max 8MB)');
                                                    }
                                                    else setLogo(event.target.files[0])
                                                }}
                                                name="logo"
                                                type="file"
                                                accept=".png,.jpg"
                                                className="hidden "
                                            />

                                        </label><br />
                                        {logo && <img className='p-5 text-xs h-52' src={URL.createObjectURL(logo)} />}
                                        {userInfo?.partner?.logo && !logo && <img className='p-5 text-xs h-52' src={userInfo?.partner?.logo} />}

                                    </div>
                                </div>
                           




                            <div className="mt-2">
                             {
                                response.isLoading ? "loading ..."
                                :
                                <button
                                    disabled={listEmployees?.length==0 || !edit } 
                                    type="submit"
                                    className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Save
                                </button>
                             }   
                            </div>
                        </form>

                    </div>
                </div>
            </div>
          :
            <div>Loading</div>
            
            }

        </div>
      

    )
}


