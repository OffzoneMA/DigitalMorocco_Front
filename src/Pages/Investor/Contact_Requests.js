import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { investorApi } from "../../Services/Investor.Service";
import Pagination from '../../Components/Pagination';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Request from './Request';


export default function Contact_Requests() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, { data, isFetching, status }] = investorApi.endpoints.getAllConatctReq.useLazyQuery()
    const { userInfo, loading } = useSelector((state) => state.auth);

    const navigate = useNavigate()
    useEffect(() => {
        if (!searchParams.get('page')) {
            setSearchParams({ page: 1 })
            window.location.hash = 'Contact Request';
        }
        else {
            trigger({
                page: searchParams.get('page'),
                status:'pending'
            })
        }
    }, [searchParams.get('page')])



  return (
    <div className='pt-10'>

            <div className='px-10'>
              {isFetching && "Loading Data"}
              {data?.ContactsHistory?.length == 0 && "Nothing Found !"}

{               
                  !isFetching && data?.ContactsHistory?.length > 0 &&
                  <div className='space-y-4 flex flex-col items-center'>
                          {data?.ContactsHistory?.map((el, i) => (
                          <Request  el={el} key={i}/>
                          ))

                    }
                          <Pagination nbrPages={data?.totalPages} />

                  </div>

               
}

            </div>

    </div>
  )
}
