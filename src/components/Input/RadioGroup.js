import { useEffect } from "react";

export default function RadioGroup({ list, onChangeHandle, checkedId }) {
  // const [clickedId, click] = useState(0);
  useEffect(() => {
    onChangeHandle(list[checkedId])
  }, [list, checkedId, onChangeHandle])
  
  return (
    <div>
      <fieldset className="mt-4">
        <div className="flex flex-wrap items-start">
          {list.map((notificationMethod, index) => {
            return (
              <div
                key={index}
                className="flex items-center mr-5 my-2 cursor-pointer"
                onClick={() => {
                  // click(index);
                  onChangeHandle(list[index]);
                }}
              >
                <input
                  // id={notificationMethod.id}
                  checked={checkedId === index}
                  name="notification-method"
                  type="radio"
                  onChange={() => {}}
                  className="h-5 w-5 border-gray-300 text-[#D3B789] focus:ring-indigo-500"
                />
                <label className="ml-3 block font-medium text-white overflow-hidden">
                  {notificationMethod}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
