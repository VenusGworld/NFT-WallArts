import React from 'react';
import CustomizedArtCard from '../../components/NFTCard/CustomizedArtCard';

const data = [
  {width:50, height:50, price:5, bestseller: true},
  {width:90, height:50, price:6.7},
  {width:70, height:30, price:8},
  {width:100, height:70, price:12.6, bestseller: true},
  {width:60, height:50, price:3},
  {width:80, height:80, price:4, popular: true},
  {width:150, height:70, price:3},
  {width:100, height:100, price:5},
  {width:70, height:20, price:5, popular: true}
]

const CustomizedArt = () => {
  return (<div>
    <div className={`w-full h-full mt-20 relative text-white`}>
      <div className='relative'>
        <img loading='lazy'
          src={process.env.PUBLIC_URL + "/img/image40.png"}
          className="w-full object-cover"
          alt="background"
        />
        <div className='absolute xl:text-7xl lg:text-5xl md:text-4xl text-xl top-1/2 font-extrabold left-1/2 -translate-x-1/2 -translate-y-1/2' style={{'textShadow': ' 0px 4px 12px rgba(0, 0, 0, 0.25)'}}>Customized Wall Arts</div>
      </div>
      <div className='bg-[#363f54] w-full p-10 relative flex flex-col justify-start items-start -mt-[8%]'>
        <div className='w-[80%] mx-auto'>
          <div className='flex flex-col justify-start items-start'>
          <div className='xl:text-5xl lg:text-3xl md:text-2xl text-lg font-bold inline-block my-5'>Select your size</div>
            <div className='flex flex-wrap justify-between'>
              {data.map((item, i) => 
                <CustomizedArtCard item={item} key={i}/>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default CustomizedArt