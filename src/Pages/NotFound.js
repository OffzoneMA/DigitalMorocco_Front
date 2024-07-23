import React from 'react';

const NotFound = () => {
    return (
        <div className=" bg-blue_gray-900_01 bg-[url(/public/images/Hero_Section.png)] bg-no-repeat bg-center  md:bg-right md:bg-right-top xl:bg-[size:cover,_auto]  2xl:bg-[size:cover,_contain] 2xl:bg-right-top flex flex-row items-center justify-start mx-auto lg:px-[108px] xs:py-[80px] sm:py-[100px]  sm:px-[30px] xs:px-[15px] px-[15px] py-[80px]  min-h-screen w-full">
            <div className='flex flex-col md:flex-row gap-[120px] md:items-start justify-center w-full sm:items-center'>
                <div className='flex flex-col items-start justify-start max-h-[250px] md:max-w-[527%] xs:max-w-[60%] '>
                    <img src='/images/text_PAGE_NOT_FOUND.png' alt='not found text' />
                </div>
                <div className='flex w-full xs:max-w-[60%] md:max-w-[586.85px] max-h-[530px] items-start justify-start'>
                    <img src='/images/not_found_page.png' alt='not fount' />
                </div>
            </div>
        </div>
    );
}

export default NotFound;
