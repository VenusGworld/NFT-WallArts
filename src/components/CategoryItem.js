import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CategoryItem = ({ id }) => {
  function useCategoryById({ id }) {
    return {
      ...useQuery(["category-", id], async () => {
        const result = await axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/category/${id}`)
          .catch((err) => {
            console.log(err);
          });
        return result.data;
      }),
    };
  }
  const { data, isLoading } = useCategoryById({ id: id });
  if (isLoading) return <></>;
  return (
    <div className="relative flex justify-center items-center">
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1 rounded-md bg-sky-400 text-white">{data?.data?.name}</span>
      <div className=" w-16 h-16 border border-gray-400">
        {data?.data?.image !== "" && data?.data?.image && (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${data?.data?.image}`}
            alt=""
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
