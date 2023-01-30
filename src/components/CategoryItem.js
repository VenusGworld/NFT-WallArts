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
      <span className=" text-[#D3B789] flex sm:text-xl text-lg text-start">{data?.data?.name}</span>
    </div>
  );
};

export default CategoryItem;
