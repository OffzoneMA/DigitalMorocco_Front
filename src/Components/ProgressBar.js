import React from 'react';
import { Text } from './Text';

const Progressbar = ({filled , filledValue ,text}) => {
  return (
	<div className='flex flex-col w-full'>
        <Text
         className="text-sm font-normal leading-[26px] tracking-normal font-DmSans w-full"
            >
            {text}
        </Text>
		<div className="flex flex-row items-center w-full">
		    <div className='bg-blue-101' style={{
	    		height: "14px",
				width: `${filled}%`,
			  }}>
            </div>
            <div className='flex flex-1 h-[14px] items-center justify-end ml-auto text-xs text-blue_gray-601 font-normal leading-[26px] tracking-normal font-DmSans'>
                {filledValue}
            </div>
		  </div>
	</div>
  )
}

export default Progressbar;