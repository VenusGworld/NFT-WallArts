import React, { useState } from 'react';

const NumberList = [{
  flag: <img src={process.env.PUBLIC_URL + "/img/united-states.svg"} alt=''/>,
  prefix: 380
}, {
  flag: <svg aria-hidden="true" className="h-8 w-8 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512"><path fill="#ffce00" d="M0 341.3h512V512H0z"></path><path d="M0 0h512v170.7H0z"></path><path fill="#d00" d="M0 170.7h512v170.6H0z"></path></svg>,
  prefix: 420
}, {
  flag: <svg aria-hidden="true" className="h-8 w-8 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h512v512H0z"></path><path fill="#009246" d="M0 0h170.7v512H0z"></path><path fill="#ce2b37" d="M341.3 0H512v512H341.3z"></path></g></svg>,
  prefix: 18
}, {
  flag: <svg aria-hidden="true" className="h-8 w-8 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-cn" viewBox="0 0 512 512"><defs><path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z"></path></defs><path fill="#de2910" d="M0 0h512v512H0z"></path></svg>,
  prefix: 260
}]

const RoundedPhoneNumberInput = ({placeholder, label, defaultValue}) => {
  const[value,setValue] = useState(defaultValue);
  const [expanded, setExpanded] = useState(true);
  const [selectedItem,selectItem] = useState(0);

  return (<div className='flex relative'>
  <div className='flex flex-col justify-start items-start space-y-2 w-full cursor-pointer'
  onClick={() => {setExpanded(!expanded)}}
  >
    <span className=' text-sm'>{label}</span>
    <div className='bg-[#444E66] px-5 py-3 rounded-full w-full relative border border-[#818895] flex space-x-2'> 
      <div className='flex justify-center items-center space-x-2'>
        <div>{NumberList[selectedItem]['flag']}</div>
        <span>+{NumberList[selectedItem]['prefix']}</span>
      </div>
      <img loading='lazy' src={process.env.PUBLIC_URL + "/img/triangle.svg"} alt='' className={`absolute w-5 h-5 right-3 top-1/2 -translate-y-1/2 transition-all ${expanded&&" rotate-180"}`}/>
      <input placeholder={placeholder} defaultValue={value} onChange={(e)=>{setValue(e.value)}} className=' pl-2 border-l border-[#818895] bg-[#444E66] text-white mr-2'/>
  </div>
  </div>
  {<div className={` ${expanded?" -top-[500px] translate-y-0 transition-all h-full hidden duration-200":""} z-50 transition-all bg-[#454E61] p-4 text-white absolute -bottom-2 flex flex-col translate-y-full w-full -left-0`}
      style={{'boxShadow': "0px 4px 15px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(34, 41, 56, 0.9)"}}>
      {
        NumberList.map((item, i) => (
          <div key={i} onClick={() => {
            selectItem(i)
            // onChangeHandle(item['value'])
          }} className={`${selectedItem===i?"text-[#D3B789]":" text-white"} p-1 cursor-pointer`}>
            <div className='flex justify-between items-center space-x-2'>
              <div>{item['flag']}</div>
              <span>+{item['prefix']}</span>
            </div>
          </div>
        ))
      }
  </div>}</div>)
}

export default RoundedPhoneNumberInput;