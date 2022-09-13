import React from 'react';

const ProfileNFTCard = ({img, name, like, auction, sale, price, sold, highestBid, endsIn}) => {
  return (
    <div className='w-1/3 shadow-lg flex flex-col'>
      <img src={process.env.PUBLIC_URL + "/img/" + img} alt='' className='w-full'/>
      <div className='flex p-5 bg-white text-[#313949]'>
        <div className='flex justify-end text-sm'>
          <div>Name</div>
          <div>
            <img src={process.env.PUBLIC_URL + "/img/heart_icon.svg"} alt='' className='w-10 h-10 mr-3'/> {like}
          </div>
          <div className='my-2'>{name}</div>
          {sale && 
          <div className='flex flex-col'>
            <div className='my-3 flex justify-end text-sm text-gray-500'>
              <div>Price</div>
              <div>Sold</div>
            </div>
          </div>}
          
        </div>
      </div>
    </div>
  )
}

export default ProfileNFTCard