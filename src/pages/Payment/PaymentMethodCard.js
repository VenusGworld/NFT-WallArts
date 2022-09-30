/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const mailingLists = [
  { id: 1, img: <img className='w-14 h-14' src={process.env.PUBLIC_URL + "/img/visa.svg"} alt=''/> },
  { id: 2, img: <img className='w-14 h-14' src={process.env.PUBLIC_URL + "/img/MetaMask_Fox.svg"} alt=''/>  },
  { id: 3, img: <img className='w-14 h-14' src={process.env.PUBLIC_URL + "/img/pp_fc_hl.svg"} alt=''/>  },
  { id: 4, img: <img className='w-14 h-14' src={process.env.PUBLIC_URL + "/img/Mastercard-Logo.wine.svg"} alt=''/>  },
  { id: 5, title: "other"  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PaymentMethodCard() {
  const [selectedMailingLists, setSelectedMailingLists] = useState(mailingLists[0])

  return (
    <RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists}>
      <div className="mt-4 flex flex-wrap sm:items-stretch sm:space-y-0 justify-between">
        {mailingLists.map((mailingList) => (
          <RadioGroup.Option
            key={mailingList.id}
            value={mailingList}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-[#D3B789] ring-2 ring-[#D3B789]' : '',
                'relative flex justify-center items-center cursor-pointer rounded-2xl border w-[80%] mb-2 sm:mb-0 bg-[#57637C] p-4 shadow-sm focus:outline-none sm:w-[18%]'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flexjustify-center">
                  <span className="flex justify-center">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-white text-center">
                      {mailingList.img?mailingList.img:mailingList.title}
                    </RadioGroup.Label>
                  
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-[#D3B789] absolute right-2 top-2')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-[#D3B789]' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}