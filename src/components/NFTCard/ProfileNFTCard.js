import React from 'react';
import RoundedButtonBG from '../Input/RoundedButton_bg';

const ProfileNFTCard = ({item}) => {
  const {img, name, like, auction, sale, price, sold, highestBid, endsIn} = item;
  return (
    <div className='md:w-[48%] xl:w-[30%] w-[90%] shadow-2xl flex flex-col my-4'>
      <img loading='lazy' src={process.env.PUBLIC_URL + "/img/" + img} alt='' className='w-full'/>
      <div className='flex p-5 bg-white text-[#313949] justify-between w-full h-full'>
        <div className='flex flex-col justify-between text-sm w-full'>
          <div className='flex justify-between'>
            <div>Name</div>
            <div className='flex items-center'>
              <img loading='lazy' src={process.env.PUBLIC_URL + "/img/heart_icon.svg"} alt='' className='w-5 h-5 mr-1 inline-block'/> 
              <div className=' inline-block'>{like}</div>
            </div>
          </div>
          <div className='my-2 flex justify-start sm:text-xl text-base font-bold'>{name}</div>
          {sale && 
          <div className='flex flex-col'>
            <div className='my-3 flex justify-between text-sm text-gray-500'>
              <div>Price</div>
              <div>Sold</div>
            </div>
            <div className='my-3 flex justify-between'>
              <div>{price} ETH</div><div>{sold}</div>
            </div>
          </div>}
          {
            auction && 
            <div className='flex flex-col'>
              <div className='my-3 flex justify-between text-sm text-gray-500'>
                <div>Current Highest Bid </div>
                <div>Ends In</div>
              </div>
              <div className='my-3 flex justify-between'>
                <div>{highestBid} ETH</div><div className=' text-[#D3B789]'>{endsIn}</div>
              </div>
            </div>
          }
          {
            (!sale&&!auction) && <div className='h-full flex justify-center items-center py-4'>
              <RoundedButtonBG active text='List Here'/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileNFTCard