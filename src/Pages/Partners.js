import React from 'react'
import PartnerCard from '../Components/PartnerCard'
import { partenaires } from '../data/data'
import PageTitle from '../Components/PageTitle'

export default function Partners() {
  return (
    <div className=''>
      <PageTitle subtitle={'LIST OF OUR PARTNERS'} title={'Contribute to the growth of innovative ventures.'} text={''}/>

      <div className='flex flex-col md:flex-row justify-around relative pt-2 md:pt-0'>
        <div className='px-6 py-1 md:px-14 md:py-5'>
          <div className='flex flex-col items-center justify-center gap-5 md:grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3'>
            {partenaires.map((el, i) => (
              <PartnerCard partner={el} index={i} key={i}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
