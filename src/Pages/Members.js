import React, { useEffect, useState } from 'react'
import PageTitle from '../Components/PageTitle'
import Pagination from '../Components/Pagination'
import { memberApi } from "../Services/Member.Service";
import { useSearchParams } from 'react-router-dom';
import MemberCard from '../Components/MemberCard';
import FilterSelect from '../Components/FilterSelect';

export default function Members() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, { data, isFetching, status }, lastPromiseInfo] = memberApi.endpoints.getAllMembers.useLazyQuery()
    useEffect(()=>{
        if (!searchParams.get('page')) { setSearchParams({page:1}) }
        else{
            trigger({
                page: searchParams.get('page')
            })
        }
    }, [searchParams.get('page')])
  return (
      <div>
          <PageTitle subtitle={'List of our Startups'} title={'We`ve enabled entrepreneurs to reveal their full potential!'} text={''} />
       
        {isFetching && "Loading Data"}
          {data?.members?.length==0 && "Nothing Found !"}
       {
              !isFetching && data?.members?.length>0 &&
        <>
                  <div className='flex items-center justify-center gap-5 w-screen px-6 py-1 md:px-14'>

                 <FilterSelect title={"Sectors"} />
                      <FilterSelect title={"Stage"} />
                      <FilterSelect title={"Country"} />

        </div>
          <div className='flex flex-col md:flex-row justify-around relative pt-2 md:pt-0'>
              <div className='px-6 py-1 md:px-14 md:py-5'>
                  <div className='flex flex-wrap justify-between gap-4 sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                              {data?.members?.map((el, i) => (
                          <div key={i} className="mb-4 md:w-1/3">
                              <MemberCard member={el}  />
                          </div>
                      ))} 
                  </div>
              </div>
          </div>
                  <Pagination  nbrPages={data?.totalPages}/>
          
          </> }
      </div>
  )
}
