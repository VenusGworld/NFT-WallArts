import React from 'react';

import ProfileNFTCard from '../../components/NFTCard/ProfileNFTCard';
import { RoundedButtonSM } from '../../components/Input';

const ItemsPart = ({Items}) => {
  return (
    <>
    <div className='flex flex-wrap justify-between w-[90%]'>
      {Items.map((item, i) => (
        <ProfileNFTCard item={item} key={i}/>
      ))}
    </div>
    <div className='flex space-x-1 my-3 items-center'>
      <RoundedButtonSM text={1} active/>
      <RoundedButtonSM text={2}/>
      <RoundedButtonSM text={3}/>
      <RoundedButtonSM text={4}/>
      <RoundedButtonSM text={5}/>
      <div className=' text-[#D3B789] mx-3 cursor-pointer'>Next</div>
    </div>
    </>
  )
}

export default ItemsPart