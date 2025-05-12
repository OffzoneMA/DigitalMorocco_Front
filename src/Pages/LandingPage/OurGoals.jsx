import { ArrowTrendingUpIcon, MegaphoneIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function OurGoals(){
    const { t, i18n } = useTranslation();

    return(
        <div className="flex flex-col p-6 items-center justify-center md:items-start md:justify-start sm:p-12 lg:px-40 lg:py-20 xl:px-52 xl:py-20  bg-[#616886]">
            <div className="space-y-5 pt-4 " >
                <h1 className="text-white text-4xl 3xl:text-7xl font-bold text-center lg:text-left  ">{t('ourGoals.h2')}</h1>
                <p className="text-white xl:max-w-[719px] text-center sm:text-left text-opacity-50 text-medium 3xl:text-4xl 3xl:max-w-screen-2xl leading-normal font-semibold text-left tracking-wide ">{t('ourGoals.p1')}</p>
            </div>
            <div className="flex flex-col lg:grid md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  items-center justify-center md:items-start md:justify-start gap-x-20 gap-y-6 pt-4 3xl:pt-20">
                <div className="py-6 space-y-5">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <ArrowTrendingUpIcon className='h-10 w-10 text-white 3xl:h-32 3xl:w-32 '/>
                    </div>
                    <h1 className="text-white text-lg font-medium text-center lg:text-left 3xl:text-4xl">{t('ourGoals.p2')}</h1>
                    <p className="text-white text-center text-opacity-50 text-sm leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">{t('ourGoals.p3')}</p>
                </div>
                <div className="py-6 space-y-5 ">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <RocketLaunchIcon className='h-10 w-10 text-white 3xl:h-32 3xl:w-32'/>
                    </div>
                    <h1 className="text-white text-lg font-medium text-center  lg:text-left 3xl:text-4xl ">{t('ourGoals.p4')}</h1>
                    <p className="text-white text-center text-opacity-50 text-sm leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">{t('ourGoals.p5')}</p>
                </div>
            
                <div className="py-6 space-y-5 ">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <FaHandHoldingHeart className=' h-10 w-10 text-white 3xl:h-32 3xl:w-32' />
                    </div>
                    <h1 className="text-white text-lg font-medium text-center lg:text-left 3xl:text-4xl">{t('ourGoals.p6')}</h1>
                    <p className="text-white text-center text-opacity-50 text-sm leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">{t('ourGoals.p7')}</p>
                </div>
                <div className="py-6 space-y-5 ">
                    <div className="flex justify-center lg:justify-start xl:justify-start">
                    <MegaphoneIcon className='h-10 w-10 text-white 3xl:h-32 3xl:w-32'/>
                    </div>
                    <h1 className="text-center text-white text-lg font-medium  lg:text-left 3xl:text-4xl">{t('ourGoals.p8')}</h1>
                    <p className="text-center text-white text-opacity-50 text-sm  leading-normal font-normal sm:text-left tracking-wide 3xl:text-3xl">{t('ourGoals.p9')}</p>
                </div>
            </div>
        </div>
        

)
}