import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { investorApi } from "../../Services/Investor.Service";
import Pagination from '../../Components/Pagination';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Investors() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, { data, isFetching, status }, lastPromiseInfo] = investorApi.endpoints.getAllInvestors.useLazyQuery()
    const { userInfo, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate()
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
    return (
        <div className=' py-10 '> 
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
                            <button
                            onClick={()=>toast.error("Coming Soon !")}
                            className='p-2 text-green-200 bg-green-800 rounded-lg hover:opacity-50'>Contact </button>
                        </div>
                    ))
                }
                

            </div>
                    <Pagination link={'/Dashboard_member'} nbrPages={data?.totalPages}  />


            </>}
        </div>
    )
}
