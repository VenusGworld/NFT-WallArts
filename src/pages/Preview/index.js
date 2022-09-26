import React, { useState } from 'react';

import { ToggleButton, DropDownSelect, NumberInput, Calendar, RoundedButtonMD } from '../../components/Input';

const Preview = () => {
  const[color,setColor] = useState(0);
  const[isbuy,setIsBuy] = useState(false);
  return (<div>
    <div className={`w-full h-full mt-20 relative text-white`}>
      <div className='relative'>
        <img
          src={process.env.PUBLIC_URL + "/img/image40.png"}
          className="w-full object-cover"
          alt="background"
        />
        <div className='absolute xl:text-7xl lg:text-5xl md:text-4xl text-xl top-1/2 font-extrabold left-1/2 -translate-x-1/2 -translate-y-1/2' style={{'textShadow': ' 0px 4px 12px rgba(0, 0, 0, 0.25)'}}>Wall Art Preview</div>
      </div>
      <div className='bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start -mt-[8%]'>
        <div className='w-[80%] mx-auto'>
          <div className='flex flex-col justify-start items-start'>
          <div className='xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-5'>Preview</div>
            <div className='flex items-start space-x-5 relative'>
              <div className='w-3/5 bg-white flex relative justify-center items-center h-full'>
                <img src={process.env.PUBLIC_URL + "/img/image51.png"} alt=''/>
                <img src={process.env.PUBLIC_URL + "/img/360-view1.svg"} alt='' className='absolute bottom-5 right-3'/>
              </div>
              <div className='w-2/5 bg-[#444E66] px-6 py-10 flex flex-col space-y-10'>
                <div className='flex'>
                  <div className='flex-1'><ToggleButton label='List'/></div>
                  <div className='flex-1'><ToggleButton label='Buy' onChangeHandle={setIsBuy}/></div>
                </div>
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>Frame Size</span>
                  <DropDownSelect
                    onChangeHandle={(v) => {
                      
                    }}
                    list={[{
                      text: '30x20cm',
                      value: 90
                    },{
                      text: '30x20cm',
                      value: 50
                    },{
                      text: '30x20cm',
                      value: 30
                    },{
                      text: '30x20cm',
                      value: 10
                    }]}/>
                </div>
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>Colour</span>
                  <div className='flex items-center space-x-3'>
                    <div className={`relative bg-black p-3 rounded-full border ${color===1?' border-green-500 ': ' border-gray-400 '} cursor-pointer inline-block`} onClick={() => {color===1?setColor(0):setColor(1)}}>
                      {color===1 && <img src={process.env.PUBLIC_URL + "/img/check-green.svg"} alt='check' className='w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/> }
                    </div>
                    <div className={`relative bg-white p-3 rounded-full border  ${color===2?' border-green-500 ': ' border-gray-400 '} cursor-pointer inline-block`} onClick={() => {color===2?setColor(0):setColor(2)}}>
                      {color===2 && <img src={process.env.PUBLIC_URL + "/img/check-green.svg"} alt='check' className='w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/> }
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>Quantity</span>
                  <NumberInput/>
                </div>
                {!isbuy && (<div className='flex flex-col space-y-3'>
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>Start Date Aunction</span>
                  <Calendar/>
                </div>
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>End Date Aunction</span>
                  <Calendar/>
                </div></div>)}
                <div className='flex flex-col items-start space-y-2'>
                  <span className='text-[#818DA9]'>End Date Aunction</span>
                  <div className='flex justify-between w-full'>
                    <span className=' text-white text-lg'>8 x 8.2 ETH</span>
                    <div className='flex flex-col justify-end'>
                      <span className=' text-white text-lg'>65.6 ETH</span>
                      <span className=' text-white text-sm'>( 2775 USD )</span>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-start space-y-2 w-full'>
                  <RoundedButtonMD text="See Next" onButtonClick={() => {}} active fullWidth/>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>)
}

export default Preview