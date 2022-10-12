import axios from "axios";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const [data, setData] = useState([]);
  const [fetchedFlag, setfetchedFlag] = useState(false);
  // useEffect(() => {
  //   return async () => {
  //     await ;
  //   };
  // }, []);

  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/`)
      .then((res) => {
        setData(res.data.data);
        setfetchedFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!fetchedFlag) fetchData();
  return (
    <div>
      <div className={`w-full h-full mt-20 relative text-white`}>
        <div className="relative">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + "/img/image30.png"}
            className="w-full object-cover"
            alt="background"
          />
          <div
            className="absolute xl:text-7xl lg:text-5xl md:text-4xl text-xl top-1/2 font-extrabold left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ textShadow: " 0px 4px 12px rgba(0, 0, 0, 0.25)" }}
          >
            A passion and Art of Design
          </div>
        </div>
        <div className="bg-[#363f54] w-full p-10 relative -mt-[8%]">
          <div className=" flex flex-wrap justify-around items-baseline w-9/12 mx-auto -mt-[15%] lg:-mt-[10%]">
            {/* <div > */}
            {data.map((info, i) => {
              return (
                <CategoryCard
                  img={`${process.env.REACT_APP_BACKEND_URL}/images/${info.image}`}
                  name={info.name}
                  desc={info.description}
                  key={info._id}
                />
              );
            })}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
