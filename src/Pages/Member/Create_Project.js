import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProjectMutation } from '../../Services/Member.Service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Create_Project = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [edit, setedit] = useState(userInfo && !userInfo?.member?.project?.name? true : false)
    const maxFileSize = 8 * 1024 * 1024;
    const [pitchDeck, setPitchDeck] = useState(null);
    const [businessPlan, setBusinessPlan] = useState(null);
    const [financialProjection, setFinancialProjection] = useState(null);
    const [listMembers, setListMembers] = useState(userInfo?.member?.project?.listMember ? userInfo?.member?.project?.listMember : []);

    const [legalDocuments, setLegalDocuments] = useState([]);
    const [legaldocFile, setlegaldocFile] = useState(null)
    const [legaldocName, setlegaldocName] = useState(null)

    const [addProjet, response] = useCreateProjectMutation()
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(userInfo?.member?.project?.visbility === "private");
    console.log('UserInfo:', userInfo);

    const handleToggle = () => {
      setIsChecked(!isChecked);
    };

    const handleLegalDocumentsChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > maxFileSize) {
            toast.error('File size exceeds the maximum allowed size.(Max 8MB)');
        }
        else {
            setlegaldocFile(file);
            event.target.value = ''
        }

    };

    const handleaddDocument = () => {
        setLegalDocuments((prevDocs) => [...prevDocs, { name: legaldocName, file: legaldocFile }])
        setlegaldocFile(null)
        setlegaldocName(null)
    };


    const handlePitchDeckChange = (event) => {
        const file = event.target.files[0];
        setPitchDeck(file);
    };


    const handleBusinessPlanChange = (event) => {
        const file = event.target.files[0];
        setBusinessPlan(file);
    };
    const handleFinancialProjectionChange = (event) => {
        const file = event.target.files[0];
        setFinancialProjection(file);
    };

    const handleListMembersRoleChange = (index, value) => {
        const updatedListMembers = [...listMembers];
        updatedListMembers[index] = { ...updatedListMembers[index], role: value };
        setListMembers(updatedListMembers);
    };
    const handleListMembersFirstNameChange = (index, value) => {
        const updatedListMembers = [...listMembers];
        updatedListMembers[index] = { ...updatedListMembers[index], firstName: value };
        setListMembers(updatedListMembers);
    };

    const handleListMembersLastNameChange = (index, value) => {
        const updatedListMembers = [...listMembers];
        updatedListMembers[index] = { ...updatedListMembers[index], lastName: value };
        setListMembers(updatedListMembers);
    };


    const handleAddListMembers = () => {
        setListMembers([...listMembers, { firstName: '', lastName: '', role: '' }]);
    };

    const handleRemoveListMembers = (index) => {
        const updatedListMembers = listMembers.filter((_, i) => i !== index);
        setListMembers(updatedListMembers);
    };



    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm(userInfo?.member?.project?.name &&{
        defaultValues: {
            name: userInfo?.member?.project?.name,
            fundingAmount: userInfo?.member?.project?.funding,
            details: userInfo?.member?.project?.details,
            currency: userInfo?.member?.project?.currency,
            milestoneProgress: userInfo?.member?.project?.milestoneProgress,
            visbility: isChecked ? "private" : "public",
        }
    });




    const onSubmit = (data) => {
        data.visbility = isChecked ? "private" : "public";

        const formData = new FormData();
        formData.append('infos', JSON.stringify({
            ...data,
            listMembers,

        }));
        pitchDeck && formData.append('files', pitchDeck, 'pitchDeck');
        businessPlan && formData.append('files', businessPlan, 'businessPlan');
        financialProjection && formData.append('files', financialProjection, 'financialProjection');
        for (const doc of legalDocuments) {
            formData.append('files', doc.file, "doc_"+doc.name);
        }
        addProjet(formData);
       
    };


    useEffect(() => {
        response.isError && toast.error(response.error?.data?.message)
        if (response.isSuccess) {
            toast.success("Project Edited!")
            setTimeout(() => {
                navigate((0))
            }, 3000)
        }

    }, [response.isLoading]);


    return (
        <div className=''>
            { userInfo ?
                    <div className='grid place-items-center py-10'>
                <div className='bg-white min-w-[650px] space-y-10 mx-auto py-7 px-10 rounded-lg border-0 ring-1 ring-inset ring-gray-300 shadow-lg'>
                    <div className="sm:mx-auto">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="/img/Logo.jpg"
                            alt=""
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create a new Project
                        </h2>
                    </div>
                    <div className="flex flex-col items-center mt-10">
                    {!edit ? <button
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
                        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div >
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Project Name*
                                </label>
                                <div className="">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        disabled={!edit}
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "You must enter your Project Name ",
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "This is not long enough ",
                                            }
                                        })}
                                        className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-red-400 text-sm py-2">
                                        {errors?.name?.message}
                                    </span>
                                </div>
                            </div>


                            <div>
                                <label htmlFor="fundingAmount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Funding Amount*
                                </label>
                                <div className=" flex space-x-2">
                                    <input
                                        id="fundingAmount"
                                        name="fundingAmount"
                                        type="number"
                                        step="0.01"
                                        {...register("fundingAmount", {
                                            required: {
                                                value: true,
                                                message: "You must enter your Funding Amount",
                                            },
                                            min: {
                                                value: 0.01,
                                                message: "Amount must be greater than 0",
                                            },
                                        })}
                                        disabled={!edit}
                                        className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                    />
                                    <select
                                        id="currency"
                                        name="currency"
                                        {...register("currency", {
                                            required: {
                                                value: true,
                                                message: "You must select a currency",
                                            },
                                        })}
                                        disabled={!edit}
                                        className="block w-28 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                    >
                                        <option value="€">Euro (€)</option>
                                        <option value="$">US Dollar ($)</option>
                                        <option value="MAD">Moroccan Dirham (MAD)</option>
                                    </select>
                                </div>
                                <div className="text-red-400 text-sm ">
                                    {errors?.fundingAmount?.message || errors?.currency?.message}
                                </div>
                            </div>

                            <div className=''>
                                <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                                    Project Details*
                                </label>
                                <div className="">
                                    <textarea
                                        {...register("details", {
                                            required: {
                                                value: true,
                                                message: "You must enter your Project Details ",
                                            },
                                            minLength: {
                                                value: 15,
                                                message: "This is not long enough ",
                                            }
                                        })}
                                        id="details"
                                        name="details"
                                        disabled={!edit}
                                        className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-red-400 text-sm py-2">
                                        {errors?.details?.message}
                                    </span>
                                </div>

                            </div>
                            <div className='space-y-3'>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Team Members*
                                </label>
                                {listMembers.map((member, index) => (
                                    <div key={index} className=" flex space-x-2">
                                        <input
                                            type="text"
                                            disabled={!edit}
                                            value={member.firstName}
                                            onChange={(e) => handleListMembersFirstNameChange(index, e.target.value)}
                                            placeholder={`First Name`}
                                            className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                        <input
                                            type="text"
                                            disabled={!edit}
                                            value={member.lastName}
                                            onChange={(e) => handleListMembersLastNameChange(index, e.target.value)}
                                            placeholder={`Last Name `}
                                            className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                        <input
                                            type="text"
                                            value={member.role}
                                            onChange={(e) => handleListMembersRoleChange(index, e.target.value)}
                                            placeholder={`Role`}
                                            disabled={!edit}
                                            className="block flex-1 w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                        />
                                        <button
                                            type="button"
                                            disabled={!edit}
                                            onClick={() => handleRemoveListMembers(index)}
                                            className=" disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    disabled={!edit}
                                    onClick={handleAddListMembers}
                                    className=" disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1.5 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Add Team Member
                                </button>
                            </div>
                            <div className=''>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Milestone Progress*
                                </label>
                                <div className="">
                                    <textarea
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
                                        disabled={!edit}
                                        className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-red-400 text-sm py-2">
                                        {errors?.milestoneProgress?.message}
                                    </span>
                                </div>
                            </div>
                            {
                                !userInfo?.member?.project?.name &&  
                            <div className='w-full grid grid-cols-2 gap-4' >
                             <div className='w-full '>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Pitch Deck</label>
                                    <div className="flex">
                                        <label htmlFor="pitchDeck" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                          {pitchDeck ? 'Change' : 'Choose File'}
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

                                <div className='w-full'>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Business Plan</label>
                                    <div className="flex">
                                        <label htmlFor="businessPlan" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                            {businessPlan ? 'Change' : 'Choose File'}

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

                                <div className='w-full '>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Financial Projection</label>
                                    <div className="flex">
                                        <label htmlFor="financialProjection" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                            {financialProjection ? 'Change' : 'Choose File'}

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

                                <div className='w-full '>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Upload More Files (Max 5 Files)</label>
                                    <div className="flex">
                                        <label htmlFor="legalDocuments" className="cursor-pointer inline-block bg-blue-400 px-4 py-2 text-white rounded-md shadow hover:bg-blue-500 transition duration-300 ease-in-out">
                                            {legaldocFile ? 'Choosing ...' : 'Add documents'}
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
                                                type="text" className='p-2' placeholder=' Document Name Ex: RC' />
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
                                </div>
                            </div>}
                            
                                
                            <div className="flex items-center">
        <input
          type="checkbox"
          id="toggleSwitch"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only"
          disabled={!edit}
        />
        <label
          htmlFor="toggleSwitch"
          className={`relative block w-10 h-5 rounded-full transition ${
            isChecked ? "bg-blue-400" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute left-1 top-1 w-3 h-3 rounded-full transition-transform ${
              isChecked ? "transform translate-x-full bg-white" : "bg-gray-400"
            }`}
          ></span>
        </label>
        <span className="ml-2">Set Private</span>
      </div>

                                <div className="mt-2">
                                {
                                response.isLoading ? "loading ..."
                                :
                                <button
                                    disabled={listMembers?.length == 0 || !edit}
                                    type="submit"
                                    className="mt-2 disabled:opacity-50 disabled:cursor-not-allowed  w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:ring-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
    );

                                }
export default Create_Project;
