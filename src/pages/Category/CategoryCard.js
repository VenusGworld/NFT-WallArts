import React from 'react';

const CategoryCard = ({img, name, desc}) => {
  return (
    <div className='lg:w-[45%] sm:w-[90%] shadow-2xl flex flex-col my-8'>
      <img alt='categorycard' src={ process.env.PUBLIC_URL+ "/img/" +img} className=' w-full'/>
      <div className='flex flex-col items-baseline p-5 bg-[#454e61]'>
        <div className='py-5 text-2xl xl:text-4xl'>{name}</div>
        <div className=' text-start xl:text-xl'>{desc}</div>
      </div>
    </div>
  )
}

export default CategoryCard