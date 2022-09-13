import React from 'react';

const SearchBar = ({placeholder}) => {
  return(
    <div className='bg-[#444E66] px-5 py-3 rounded-full w-auto'>
      <input placeholder={placeholder} className=' border-none w-auto bg-[#444E66] text-white'/>
      <img src={process.env.PUBLIC_URL + "/img/search.svg"} className="w-5 h-5 inline-block" alt="globe"/>
    </div>
    
  )
}

export default SearchBar