import React from 'react';
import { useTranslation }  from 'react-i18next';
export default function WhoAreWe(){
    const { t, i18n } = useTranslation();

    return(
        
        
        <div className="flex flex-col md:grid md:grid-cols-3 py-5 gap-4 md:gap-6 md:px-20 md:py-10 lg:px-40 lg:py-20 xl:px-60">
            <div><p></p></div>            
            <div className="col-span-2 space-y-4">
                <p className="md:text-left text-center font-bold text-xs  3xl:text-3xl 2xl:text-2xl text-gray700 tracking-wider">{t('whoAreWe.whoAreWe')}</p>
                <p className="md:text-left text-center md:text-medium 3xl:text-3xl 2xl:text-2xl text-lg xl:text-medium text-gray700 font-medium 3xl:leading-relaxed">{t('whoAreWe.p1')}</p>
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs 3xl:text-3xl 2xl:text-2xl leading-6 text-gray700 tracking-wider " >{t('whoAreWe.ourMission')}</p>
            </div>
            <div  className="col-span-2 space-y-4">
                <p className="md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm 3xl:text-3xl 2xl:text-2xl xl:text-medium leading-normal 3xl:leading-relaxed ">{t('whoAreWe.p2')}</p>
                <hr className=" w-full border-1  " />
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl" >{t('whoAreWe.ourApproach')}</p>
            </div>
            <div className="col-span-2 space-y-4">
                <p className=" md:text-left text-center text-gray500 text-opacity-70 3xl:text-3xl 2xl:text-2xl font-medium text-sm leading-normal xl:text-medium 3xl:leading-relaxed ">{t('whoAreWe.p3')}</p>
                <hr className=" w-full border-1 " />
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl " >{t('whoAreWe.ourSpirit')}</p>
            </div>
            <div className="col-span-2 space-y-4">
                <p className="md:text-left text-center text-gray500 text-opacity-70 font-medium text-sm leading-normal 3xl:text-3xl 2xl:text-2xl xl:text-medium 3xl:leading-relaxed ">{t('whoAreWe.p4')}</p>  
                <hr className=" w-full border-1  " />
            </div>
            <div>
                <p className="md:text-left text-center font-bold text-xs leading-6 text-gray700 tracking-wider 3xl:text-3xl 2xl:text-2xl" >{t('whoAreWe.ourMotto')}</p>
            </div>
            <div className="col-span-2 space-y-4">
                <p className="md:text-left text-center text-gray500  text-opacity-70 font-medium text-sm leading-normal 3xl:text-3xl 2xl:text-2xl xl:text-medium 3xl:leading-relaxed ">{t('whoAreWe.p5')}</p> 
                <hr className=" w-full border-1  " />
            </div>
        </div>
        
        
        
        
)
}
