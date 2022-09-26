import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomizedArtCard = ({item}) => {
  const {width, height, price, bestseller, popular} = item;
  const[color,setColor] = useState(0);
  const navigate = useNavigate();

  return (
    <div className='relative md:w-[48%] xl:w-[30%] w-[90%] shadow-xl flex flex-col my-4 hover:shadow-2xl bg-[#454E61] p-3 cursor-pointer'
      onClick={() => {
        navigate('/preview')
      }}
    >
      <div className='relative box-border border-white border-2'>
        <img loading='lazy' src={process.env.PUBLIC_URL + "/img/image41.png"} alt='' className='w-full '/>
        <div className='absolute bg-white shadow-lg top-10 left-1/2 -translate-x-1/2'
          style={{'width': width+'px', 'height': height+'px'}}
        >
          <div className='absolute -top-1 w-full border-dotted border-t border-gray-700'>
            <div className='-mt-5 text-sm text-gray-700'>{width} cm</div>
          </div>
          <div className='absolute -right-1 h-full border-dotted border-r border-gray-700'>
            <div className='absolute -mr-5 text-sm text-gray-700 w-14 top-1/2 -translate-y-1/2'>{height} cm</div>
          </div>
        </div>        
        {
          bestseller && 
          <div className='bg-[#B982FF] p-3 rounded-tr-full rounded-br-full absolute top-2 left-0 w-28'>
            <div className=' text-sm'>Best Seller</div>
          </div>
        }
        {
          popular && 
          <div className='bg-[#F33F3F] p-3 rounded-tr-full rounded-br-full absolute top-2 left-0 w-28'>
            <div className=' text-sm'>Popular</div>
          </div>
        }
      </div>
      <div className='flex flex-col p-3 text-white justify-between w-full h-full'>
        <div className='flex justify-between items-start w-full'>
          <div className='flex flex-col items-baseline space-y-2'>
            <div className=' text-[#818DA9]'>Frame Size</div>
            <div className='text-white text-lg font-bold text'>{width} x {height} cm</div>
          </div>
          <div className='flex items-center space-x-3'>
            <div className={`relative bg-black p-3 rounded-full border ${color===1?' border-green-500 ': ' border-gray-400 '} cursor-pointer inline-block`} onClick={() => {color===1?setColor(0):setColor(1)}}>
              {color===1 && <img loading='lazy' src={process.env.PUBLIC_URL + "/img/check-green.svg"} alt='check' className='w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/> }
            </div>
            <div className={`relative bg-white p-3 rounded-full border  ${color===2?' border-green-500 ': ' border-gray-400 '} cursor-pointer inline-block`} onClick={() => {color===2?setColor(0):setColor(2)}}>
              {color===2 && <img loading='lazy' src={process.env.PUBLIC_URL + "/img/check-green.svg"} alt='check' className='w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/> }
            </div>
          </div>

        </div>
        <div className='flex justify-between items-center'>
            <div className=' text-[#818DA9] text-sm'>Price in ETH</div>
            <div  className='flex flex-col items-end'>
              <div className=' text-lg font-bold'>{price} ETH</div>
              <div className=' text-sm'>( {Number(price * 1777) } USD )</div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CustomizedArtCard