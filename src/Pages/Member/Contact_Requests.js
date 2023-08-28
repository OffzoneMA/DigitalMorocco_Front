import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { memberApi } from "../../Services/Member.Service";
import Pagination from '../../Components/Pagination';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Contact_Requests() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, { data, isFetching, status }] = memberApi.endpoints.getAllConatctReq.useLazyQuery()
    const { userInfo, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (!searchParams.get('page')) {
            setSearchParams({ page: 1 })
            window.location.hash = 'Contact Requests';
        }
        else {
            trigger({
                page: searchParams.get('page')
            })
        }
    }, [searchParams.get('page')])

    useEffect(() => {
        if (userInfo && userInfo?.member?.subStatus === "notActive") {
            toast.error("You need to buy a Subscription !")
            setTimeout(() => {
                navigate("/Dashboard_member")
                navigate(0)
            }, 2000)

        }
    }, [userInfo])

  return (
      <div className=' py-10 '>
          <h1 className='text-center text-lg md:text-3xl xl:text-5xl font-semibold'>Contact History</h1>
        
               <div className='py-10  px-5 md:px-10 xl:px-32  space-y-2   '>

              {isFetching && "Loading Data"}
              {data?.ContactsHistory?.length == 0 && "Nothing Found !"}
              {
                  !isFetching && data?.ContactsHistory?.length > 0 &&
                  <>    <div className='py-10  px-5 md:px-10 xl:px-32 space-y-4   '>

                      {
                          data?.ContactsHistory?.map((el, i) =>(
                            <div className='flex flex-col gap-3 py-5 px-4 border rounded-3xl shadow-md' key={i}>
                                  <div className='self-center font-bold italic text-sm text-gray-800'>{new Date(el.dateCreated).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  })}</div>
                                  <div className='flex items-center justify-around py-2 ' key={i} >
                                      <div className='space-y-2'>
                                          <div>
                                              <span>Name : </span>
                                              <span className='italic  '>
                                                  {el?.investor?.name ? el?.investor?.name : <span className='italic text-gray-800'>No Name Specified</span>}
                                              </span>
                                          </div>
                                          <div>
                                              <span>Linkedin : </span>
                                              <a
                                                  className='italic underline '
                                                  target='_blank'
                                                  href={el?.investor?.linkedin_link}>Visit</a>
                                          </div>
                                      </div>
                                      <div className='space-y-2'>
                                          <div>status: <span className={`italic ${el.status == "accepted" && "text-green-400"} ${el.status == "rejected" && "text-red-400"} ${el.status == "pending" && "text-gray-500"}`}>{el.status}</span></div>
                                        
                                      </div>
                                  </div>
                                  <div className='self-end '>
                                      Cost : <span className=' italic text-sm text-red-800'>
                                    -{el.cost}
                                    </span>
                                  </div>

                            </div>
                     
                          ))
                      }


                  </div>
                      <Pagination  nbrPages={data?.totalPages} />


                  </>}
          </div> 
          
                   </div>

          )
        
        }