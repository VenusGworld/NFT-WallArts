import React from 'react';
import { useState } from 'react';

const DropDownNavButton = ({list, title, onChangeHandle}) => {
  const [expanded, setExpanded] = useState(true);
  // const [selectedItem,selectItem] = useState(0);

  return (
    <div className='relative w-full'>
    <div 
      className={`relative w-full cursor-pointer px-7 py-5 ${expanded?' overflow-hidden ':'  bg-[#363F54]'} text-[#ececec99]`}
      onClick={() => {setExpanded(!expanded)}}
    >
      <div className='flex'>
      {title}
      <img loading='lazy' src={process.env.PUBLIC_URL + "/img/triangle.svg"} alt='' className={`absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 transition-all ${expanded&&" rotate-180"}`}/>
      </div>
    </div>
    {<div className={` ${expanded?" -top-[500px] translate-y-0 hidden transition-all h-full ":""} z-50 transition-all bg-[#454E61] p-4 text-white absolute -bottom-2 flex flex-col translate-y-full w-full -left-0`}
      style={{'boxShadow': "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)"}}>
      {
        list.map((item, i) => (
          <div key={i} onClick={() => {
            // selectItem(i)
            setExpanded(!expanded)
            onChangeHandle(item)
          }} className={`p-1`}>
            {item}
          </div>
        ))
      }
      </div>}
    </div>
  )
}

export default DropDownNavButton;