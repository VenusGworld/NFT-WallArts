import React from 'react';
import { useState } from 'react';

const DropDownSelect = ({list, onChangeHandle}) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedItem,selectItem] = useState(0);

  return (
    <div className='relative'>
    <div 
      className={`relative w-full rounded-full cursor-pointer px-7 py-5 ${expanded?' bg-[#57637C] overflow-hidden ':'  bg-[#4a5367] '} border border-[#818895]`}
      onClick={() => {setExpanded(!expanded)}}
    >
      <div className='flex'>
      {list[selectedItem]['text']&&list[selectedItem]['text']}
      <img loading='lazy' src={process.env.PUBLIC_URL + "/img/triangle.svg"} alt='' className={`absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 transition-all ${expanded&&" rotate-180"}`}/>
      </div>
    </div>
    {<div className={` ${expanded?" -top-[500px] translate-y-0 hidden transition-all h-full ":""} z-50 transition-all bg-[#454E61] p-4 text-white absolute -bottom-2 flex flex-col translate-y-full w-full -left-0`}
      style={{'boxShadow': "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)"}}>
      {
        list.map((item, i) => (
          <div key={i} onClick={() => {
            selectItem(i)
            onChangeHandle(item['value'])
          }} className={`${selectedItem===i?"text-[#D3B789]":" text-white"} p-1`}>
            {item['text']}
          </div>
        ))
      }
      </div>}
    </div>
  )
}

export default DropDownSelect;