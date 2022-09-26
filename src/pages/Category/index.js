import React from 'react';
import CategoryCard from './CategoryCard';

const CateCardInfos = [
  {
    img:'image31.png',
    name: 'Canvas',
    desc: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary'
  },
  {
    img:'image32.png',
    name: 'Panels',
    desc: 'It is pleasure, but because those who do not know how to pursue pleasure rationally encounter'
  },
  {
    img:'image33.png',
    name: 'Foam',
    desc: 'Men who are so beguiled and demoralized by the charms of pleasure of the momen blinded by desire'
  },
  {
    img:'image34.png',
    name: 'Metal',
    desc: 'Aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt'
  }
];

const Category = () => {
  return (<div>
    <div className={`w-full h-full mt-20 relative text-white`}>
      <div className='relative'>
        <img loading='lazy'
          src={process.env.PUBLIC_URL + "/img/image30.png"}
          className="w-full object-cover"
          alt="background"
        />
        <div className='absolute xl:text-7xl lg:text-5xl md:text-4xl text-xl top-1/2 font-extrabold left-1/2 -translate-x-1/2 -translate-y-1/2' style={{'textShadow': ' 0px 4px 12px rgba(0, 0, 0, 0.25)'}}>A passion and Art of Design</div>
      </div>
      <div className='bg-[#363f54] w-full p-10 relative -mt-[8%]'>
        <div className=' flex flex-wrap justify-around items-baseline w-9/12 mx-auto -mt-[15%] lg:-mt-[10%]'>
          {/* <div > */}
          {CateCardInfos.map((info, i) => {
            return <CategoryCard img={info.img} name={info.name} desc={info.desc} key={i}/>
          })}
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>)
}

export default Category