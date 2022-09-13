import React from 'react';
import { RoundedButtonMD, RoundedButtonSM } from '../../components/Input';

const Items = [
  {img:'image 4.png', name: 'Aui dolorem eum', like: '243', auction: true, highestBid: 2.5, endsIn: '02:23:49:01'},
  {img:'image 16.png', name: 'Annoyances accepted', like: '79', sale: true, price: 3, sold: '3/5'},
  {img:'image 19.png', name: 'Facere possimus', like: '320'},
  {img:'image 16.png', name: 'Lorem Ipsume', like: '3', sale: true, price: 3, sold: '3/5'},
  {img:'image 19.png', name: 'Aui dolorem eum', like: '11', auction: true, highestBid: 2.5, endsIn: '02:23:49:01'},
  {img:'image 19.png', name: 'Facere possimus', like: '320'},
  {img:'image 16.png', name: 'Lorem Ipsume', like: '3', sale: true, price: 3, sold: '3/5'},
  {img:'image 4.png', name: 'Aui dolorem eum', like: '243', auction: true, highestBid: 2.5, endsIn: '02:23:49:01'},
  {img:'image 16.png', name: 'Annoyances accepted', like: '79', sale: true, price: 3, sold: '3/5'},
]

const Profile = () => {
  return (
    <div className='h-full relative mt-20 bg-[#363F54]'>
      <img src={process.env.PUBLIC_URL + "/img/img1 1.png"} alt="profile_banner" width='100%'/>
      <div className=' p-20 flex flex-col justify-center items-center'>
        <div className=' rounded-full bg-[#00AEEF] border-4 border-white p-10 -mt-36'>
          <img src={process.env.PUBLIC_URL + "/img/sandbox_mark.svg"} alt='' className=' w-16 h-16'/>
        </div>
        <div className='relative my-5'>
          <div className=' text-white text-4xl'>The Sandbox</div>
          <img src={process.env.PUBLIC_URL + "/img/verified_icon.svg"} alt='' className=' absolute w-9 h-9 top-0 left-64'/>
        </div>
        <div className=' text-gray-400'>
          Wallet link : 1GVY5eZvtc5bA6EFEGnpq
        </div>
        <div className=' w-3/5 my-6 text-gray-400 text-sm'>
          Sandbox LAND is currently undergoing a migration to a new contract. In order to benefit from all future LAND features, please migrate to the new contract. How to do it and to learn more, please visit: https://www.sandbox.game/en/me/migration/
        </div>
        <div className=' w-4/12 bg-[#313949] flex text-white rounded-full px-16 py-2'>
          <div className='flex flex-col flex-1'>
            <div className=' text-3xl text-white'>4,870</div>
            <div className='text-gray-400'>Items</div>
          </div>
          <div className='mx-6 border bg-white border-white flex justify-center items-center'></div>
          <div className='flex flex-col flex-1'>
            <div className=' text-3xl text-white'><img src={process.env.PUBLIC_URL + "/img/eth_icon.svg"} alt='' className=' inline-block w-8 h-8'/>110.3K</div>
            <div className='text-gray-400'>Total Volume</div>
          </div>
        </div>
        <div className='relative my-10 flex space-x-5'>
          <RoundedButtonMD text="Items" onButtonClick={() => {}} active />
          <RoundedButtonMD text="Activity" onButtonClick={() => {}}/>
          <div className=' absolute left-96'>
            <RoundedButtonSM
              icon={
                <img
                  src={process.env.PUBLIC_URL + "/img/filter_icon.svg"}
                  className="w-3 h-3 text-black inline-block"
                  alt="globe"
                />
              }
              onButtonClick={() => {
              }}
              active
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile