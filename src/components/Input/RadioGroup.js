import { useState } from "react"

export default function RadioGroup({list}) {
  const[clickedId,click] = useState(0);
  return (
    <div>
      <fieldset className="mt-4">
        <div className="flex flex-wrap items-start">
          {list.map((notificationMethod, index) => {
            return(
            <div key={index} className="flex items-center mr-5 my-2 cursor-pointer" onClick={() => {click(index)}}>
              <input
                // id={notificationMethod.id}
                checked={clickedId===index}
                name="notification-method"
                type="radio"
                defaultChecked={index === 0}
                className="h-5 w-5 border-gray-300 text-[#D3B789] focus:ring-indigo-500"
              />
              <label className="ml-3 block font-medium text-white overflow-hidden">
                {notificationMethod}
              </label>
            </div>
          )})}
        </div>
      </fieldset>
    </div>
  )
}