import React from 'react';
import { useState } from 'react';

const NumberInput = ({list, onChangeHandle}) => {
  const[number,setNumber] = useState(0);
  return (
    <div 
      className={`relative w-full rounded-full cursor-pointer px-7 py-5  bg-[#4a5367] border border-[#818895]`}
    >
      <div className='flex'>
      <input className=' border-none w-auto bg-[#4a5367] text-white mr-2' value={number} onChange={(e) => {
        setNumber(e.value)
      }}/>
        <img loading='lazy' src={process.env.PUBLIC_URL + "/img/triangle.svg"} alt='' className={`absolute w-5 h-5 right-3 top-3`}
          onClick={() => {setNumber(number+1)}}
        />
        <img loading='lazy' src={process.env.PUBLIC_URL + "/img/triangle.svg"} alt='' className={`absolute w-5 h-5 right-3 bottom-3 rotate-180`}
          onClick={() => {setNumber(number-1)}}
        />
      </div>
      
    </div>
  )
}

export default NumberInput;