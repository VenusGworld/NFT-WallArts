import React, { useState } from 'react';

import ProfileNFTCard from '../../components/NFTCard/ProfileNFTCard';
import { RoundedButtonSM } from '../../components/Input';

const ItemsPart = ({Items}) => {
  const[selectedPage,selectPage] = useState(0);
  return (
    <>
    <div className='flex flex-wrap justify-between w-[90%]'>
      {Items.map((item, i) => (
        <ProfileNFTCard item={item} key={i}/>
      ))}
    </div>
    <div className='flex space-x-1 my-3 items-center justify-center'>
      <RoundedButtonSM text={1} active={selectedPage===0} onButtonClick={() => {selectPage(0)}}/>
      <RoundedButtonSM text={2} active={selectedPage===1} onButtonClick={() => {selectPage(1)}}/>
      <RoundedButtonSM text={3} active={selectedPage===2} onButtonClick={() => {selectPage(2)}}/>
      <RoundedButtonSM text={4} active={selectedPage===3} onButtonClick={() => {selectPage(3)}}/>
      <RoundedButtonSM text={5} active={selectedPage===4} onButtonClick={() => {selectPage(4)}}/>
      <div className=' text-[#D3B789] mx-3 cursor-pointer' onClick={() => {
        if(selectedPage===4) selectPage(0);
        else selectPage(selectedPage+1)
      }}>Next</div>
    </div>
    </>
  )
}

export default ItemsPart