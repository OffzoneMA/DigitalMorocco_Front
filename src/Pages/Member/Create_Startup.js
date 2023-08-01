import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Toaster } from 'react-hot-toast';
import { useAddStartupMutation } from '../../Services/Member.Service';
import { useNavigate } from 'react-router-dom';

export default function Create_Startup() {
    const [file, setFile] = useState(null)
    const [addStartup, response] = useAddStartupMutation()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        if (response.isSuccess) {
            navigate('/myStartup')
        }
    }, [response.isSuccess])




    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.image);
        console.log(data)
        //addStartup(formData)
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
                          src="/img/offzoneLogo.jpg"
                          alt=""
                      />
                      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                          Create a new Startup
                      </h2>
                  </div>
                  <div className="flex-col items-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <Toaster />
                      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                          <div>
                              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Name
                              </label>
                              <div className="mt-2">
                                  <input
                                      {...register("name", {
                                          required: {
                                              value: true,
                                              message: "You must enter your startup name",
                                          },
                                          minLength: {
                                              value: 2,
                                              message: "This is not long enough ",
                                          }
                                      })}
                                      id="name"
                                      name="name"

                                      className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                  />
                                  <span className="text-red-400 text-sm py-2">
                                      {errors?.name?.message}
                                  </span>
                              </div>
                          </div>
                          <div>
                              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                  Description
                              </label>
                              <div className="mt-2">
                                  <textarea
                                      {...register("description", {
                                          required: {
                                              value: true,
                                              message: "You must enter your startup description",
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
                          </div>
                          <div className='mt-2'>
                                      
                              <label htmlFor="image" className="w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                  {file ? "Change Logo":"Choose a Logo"}
                                  <input
                                      onChange={(event) => setFile(event.target.files[0])}
                                      id="image"
                                      name="image"
                                      type="file" // Utiliser "type=file" pour permettre le téléchargement de fichiers
                                      autoComplete="image"
                                      required
                                      accept=".png,.jpg" // Limiter les types de fichiers acceptés aux fichiers PDF
                                      className="hidden" // Masquer l'input de fichier natif
                                  />

                              </label><br />
                                  {file && <img className='p-5 text-xs' src={URL.createObjectURL(file)} />}
                          </div>
                          <div className="mt-2">
                              <button
                              disabled={!file}
                                  type="submit"
                                  className="disabled:opacity-50 disabled:cursor-not-allowed  w-full mt-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              >
                                  Create
                              </button>
                          </div>
                      </form>

                  </div>
              </div>
          </div>
      </div>
  )
}
