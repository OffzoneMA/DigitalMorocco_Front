import React, { useEffect } from 'react';
import PartnerCard from '../Components/PartnerCard';
import { partenaires } from '../data/data';
import PageTitle from '../Components/PageTitle';

import Pagination from '../Components/Pagination'
import { partnerApi } from "../Services/Partner.Service";
import { useSearchParams } from 'react-router-dom';
export default function Partners() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [trigger, { data, isFetching, status }, lastPromiseInfo] = partnerApi.endpoints.getAllPartners.useLazyQuery()

  useEffect(() => {
    if (!searchParams.get('page')) { setSearchParams({ page: 1 }) }
    else {
      trigger({
        page: searchParams.get('page')
      })
    }
  }, [searchParams.get('page')])
  return (
    <div>
      <PageTitle subtitle={'LIST OF OUR PARTNERS'} title={'Contribute to the growth of innovative ventures.'} text={''}/>
      {isFetching && "Loading Data"}
      {data?.partners?.length == 0 && "Nothing Found !"}
      {
        !isFetching && data?.partners?.length > 0 &&
<>
      <div className='flex flex-col md:flex-row justify-around relative pt-2 md:pt-0'>
        <div className='px-6 py-1 md:px-14 md:py-5'>
          <div className='flex flex-wrap justify-between gap-4 sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                {data?.partners?.map((el, i) => (
              <div key={i} className="mb-4 md:w-1/3">
                <PartnerCard partner={el}  />
              </div>
            ))}
          </div>
        </div>
      </div>
      
          <Pagination  nbrPages={data?.totalPages} />

      
      </>
}

    </div>
  );
}
