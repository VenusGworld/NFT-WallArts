
export default function RadioGroup({list}) {
  return (
    <div>
      <fieldset className="mt-4">
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {list.map((notificationMethod, index) => {
            return(
            <div key={index} className="flex items-center">
              <input
                // id={notificationMethod.id}
                name="notification-method"
                type="radio"
                defaultChecked={index === 0}
                className="h-5 w-5 border-gray-300 text-[#D3B789] focus:ring-indigo-500"
              />
              <label className="ml-3 block text-sm font-medium text-white">
                {notificationMethod}
              </label>
            </div>
          )})}
        </div>
      </fieldset>
    </div>
  )
}
