import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import Pagination from '../Components/Pagination';
import { memberApi } from '../Services/Member.Service';
import { useSearchParams } from 'react-router-dom';
import MemberCard from '../Components/MemberCard';
import FilterSelect from '../Components/FilterSelect';
import { countriesAndCities } from '../data/countriesAndCities';
import { companyType } from '../data/companyType';
import { stage } from '../data/stage';
import { BackspaceIcon, XMarkIcon } from '@heroicons/react/24/solid';


export default function Members() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [trigger, { data, isFetching }, lastPromiseInfo] = memberApi.endpoints.getAllMembers.useLazyQuery();

  const handleFiltersChange = () => {
    const queryParams = {
      page: searchParams.get('page'),
      sectors: selectedSectors.join(','),
      stages: selectedStages.join(','),
      countries: selectedCountries.join(','),
    };
    setSearchParams(queryParams);
    trigger(queryParams);

  };
  const handleClearFilters = () => {
    setSelectedSectors([]);
    setSelectedStages([]);
    setSelectedCountries([]);
    
    // Vous pouvez également réinitialiser les paramètres de recherche ici si nécessaire.
  };
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: 1 });
    } else {
      trigger({
        page: searchParams.get('page'),
        sectors: selectedSectors.join(','),
        stages: selectedStages.join(','),
        countries: selectedCountries.join(','),
      });
    }
  }, [searchParams, selectedSectors, selectedStages, selectedCountries]);
 
  const removeLastFilter = (filterType) => {
    switch (filterType) {
      case 'sector':
        setSelectedSectors((prevSelected) => prevSelected.slice(0, -1));
        break;
      case 'stage':
        setSelectedStages((prevSelected) => prevSelected.slice(0, -1));
        break;
      case 'country':
        setSelectedCountries((prevSelected) => prevSelected.slice(0, -1));
        break;
      default:
        break;
    }
  };
  
  
  return (
    <div>
      <PageTitle
        subtitle={'List of our Startups'}
        title={"We've enabled entrepreneurs to reveal their full potential!"}
        text={''}
      />

      {isFetching}
        

      <div className='flex flex-col md:flex-row  md:items-center  justify-center gap-5 w-screen px-6 py-1 md:px-14'>
        <FilterSelect
          title={'Sector'}
          options={companyType}
          selectedOptions={selectedSectors}
          onChange={(selected) => setSelectedSectors(selected)}
          onApplyFilters={handleFiltersChange}
        />
        <FilterSelect
          title={'Stage'}
          options={stage}
          selectedOptions={selectedStages}
          onChange={(selected) => setSelectedStages(selected)}
          onApplyFilters={handleFiltersChange}
        />
        <FilterSelect
          title={'Country'}
          options={Object.keys(countriesAndCities)}
          selectedOptions={selectedCountries}
          onChange={(selected) => setSelectedCountries(selected)}
          onApplyFilters={handleFiltersChange}
        />
      </div>
      <div>
  {(selectedSectors.length > 0 || selectedStages.length > 0 || selectedCountries.length > 0) && (
    <div className='flex flex-col items-center justify-center px-4 py-2 rounded-md mb-4'>
      <div className="flex flex-col items-start justify-start">
        <hr className=" w-full border-1 mt-4" />
        <div className="flex flex-row py-5">
          <p className="text-black text-lg font-bold pr-2 py-2">Result for:</p>
          {selectedSectors.map((sector, index) => (
        <div key={index} className="group relative  flex items-center justify-center gap-3 text-white text-lg bg-blue-400  border rounded-full  px-4 py-2 mx-2">
          {sector} 
          <XMarkIcon
            className='text-white h-5 w-5 '
            onClick={() => removeLastFilter('sector', sector)}
          />
        </div>
      ))}
      {selectedStages.map((stage, index) => (
        <div key={index} className= "group relative  flex items-center justify-center gap-3 text-white text-lg bg-blue-400  border rounded-full  px-4 py-2 mx-2">
          {stage}
          <XMarkIcon
          className='text-white h-5 w-5'
          onClick={() => removeLastFilter('stage',stage)}/>
        </div>
      ))}

      {selectedCountries.map((country, index) => (
        <div key={index} className= "group relative  flex items-center justify-center gap-3 text-white text-lg bg-blue-400  border rounded-full  px-4 py-2 mx-2">
        {country}
        <XMarkIcon
        className='text-white h-6 w-6 transition-all duration-300 ease-out'
        onClick={() => removeLastFilter('country',country)}
        />
        </div>
      ))}
      <div className='group relative text-gray-400 ml-16 font-bold flex items-center justify-center gap-3' onClick={handleClearFilters}>
        <BackspaceIcon className="h-6 w-6 " fill="none" stroke="currentColor" strokeWidth="2"/>Clear Filters
      </div>
      </div>
      <hr className=" w-full border-1" />
</div>
    </div>
  )}
  
</div>
{data?.members?.length === 0 && (
  <div className="flex justify-center ">
    <p className="font-bold text-blue-400 ">Aucune donnée trouvée !</p>
  </div>
)}
      <div className='flex flex-col md:flex-row justify-around relative pt-2 md:pt-0'>
        <div className='px-6  md:px-14 py-8'>
          <div className='flex flex-col justify-center items-center gap-4 sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {data?.members?.map((el, i) => (
              <div key={i} className='mb-4 md:w-1/3'>
                <MemberCard member={el} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Pagination nbrPages={data?.totalPages} />
    </div>
  );
}
