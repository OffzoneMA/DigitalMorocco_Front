import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { investorApi } from "../../Services/Investor.Service";
import { useCreateConatctReqMutation } from '../../Services/Member.Service';
import Pagination from '../../Components/Pagination';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Investors() {
    const cost=3
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, { data, isFetching, status }, lastPromiseInfo] = investorApi.endpoints.getAllInvestors.useLazyQuery()
    const [addNewContactReq, response] = useCreateConatctReqMutation()

    const { userInfo, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [investor, setinvestor] = useState(null)
    useEffect(() => {
     
   if (!searchParams.get('page')) { 
        setSearchParams({ page: 1 }) 
            window.location.hash = 'Investors';
         }
        else {
            trigger({
                page: searchParams.get('page')
            })
        }
    }, [searchParams.get('page')])

    useEffect(() => {
        if (userInfo && userInfo?.member?.subStatus ==="notActive") {
            toast.error("You need to buy a Subscription !")
            setTimeout(() => {
                navigate("/Dashboard_member")
                navigate(0)
            }, 2000)

        }
    }, [userInfo])

    useEffect(() => {
        response.isError && toast.error(response.error.message)
        if(response.isSuccess){
            toast.success("Your Request has been sent to the investor")
            setTimeout(() => {
                toast.success("We will let you know his response")
            }, 1000)
           
            setTimeout(()=>{
                setinvestor(null)
                navigate(0)
            },4000)
        }
    }, [response.isLoading])


    const handleClick=()=>{
       if (userInfo?.member?.credits<cost ) {
            toast.error('You dont have enough credits!')
            setinvestor(null)
        }
        else{
            addNewContactReq({ investorId:investor })
        }
    }
    return (
        <div className=' py-10 relative '>

            {investor &&  <div className='fixed  top-0 left-0 z-[2] w-screen h-screen flex items-center justify-center backdrop-blur-2xl'>
             {response.isLoading  &&
                    <p className=' w-fit p-8 bg-white shadow-2xl rounded-2xl'> "Loading ..."</p>}
                {!response.isSuccess && !response.isLoading &&
                    <div className='flex flex-col gap-3 items-center justify-center  w-fit p-8 bg-white shadow-2xl rounded-2xl '>

                        <div
                            className='flex items-center justify-center gap-3'>

                            <button
                                onClick={handleClick}
                                className='w-fit p-2 text-green-200 bg-green-800 rounded-lg hover:opacity-50'>
                                Send Contact Request
                            </button>
                            <button className='w-fit p-2 text-white bg-gray-400 rounded-lg hover:opacity-50'>
                                Cancel
                            </button>

                        </div>
                        <p className='italic text-sm text-gray-800 text-center '>
                            Sending a contact request to this investor will cost you <b>{cost} credits</b>. Please note that these credits are non-refundable, even if the investor rejects your request.
                        </p>

                    </div>
            }   
            </div>
            
            }



            <h1 className='text-center text-lg md:text-3xl xl:text-5xl font-semibold'>Investors</h1>
            {isFetching && "Loading Data"}
            {data?.investors?.length == 0 && "Nothing Found !"}
            {
                !isFetching && data?.investors?.length > 0 &&
                <>    <div className='py-10  px-5 md:px-10 xl:px-32 divide-y-2   '>

                {
                        data?.investors?.map((el,i)=>(
                            <div className='flex items-center justify-between py-2 ' key={i} >
                            <div>
                                    <div>
                                        <span>Name : </span>
                                        <span className='italic  '>
                                            {el?.owner?.displayName ? el?.owner?.displayName:<span className='italic text-gray-800'>No Name Specified</span>}
                                        </span>
                                    </div>
                                <div> 
                                        <span>Linkedin : </span>
                                    <a 
                                    className='italic underline '
                                    target='_blank'
                                            href={el?.linkedin_link}>Visit</a>
                                </div>
                            </div>
                                {userInfo?.member?.investorsRequestsPending.includes(el._id) && 
                                    <button
                                    disabled={true}
                                     className= 'cursor-not-allowed p-2 text-white bg-gray-600 rounded-lg opacity-50'>
                                        Sent
                                     </button>
                                }
                                {userInfo?.member?.investorsRequestsAccepted.includes(el._id) &&
                                    <button
                                        disabled={true}
                                        className='cursor-not-allowed p-2 text-white bg-green-600 rounded-lg opacity-50'>
                                        Accepted
                                    </button>
                                }
                                {!userInfo?.member?.investorsRequestsAccepted.includes(el._id) && !userInfo?.member?.investorsRequestsPending.includes(el._id) &&   <button
                                    onClick={() => setinvestor(el._id)}
                            className='p-2 text-white bg-blue-400 rounded-lg hover:opacity-50'>Contact </button>}
                        </div>
                    ))
                }
                

            </div>
                    <Pagination  nbrPages={data?.totalPages}  />


            </>}
        </div>
    )
}
