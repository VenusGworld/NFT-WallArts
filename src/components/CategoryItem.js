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
      <span className=" px-1 rounded-md bg-[#ffe564] text-sky-600">{data?.data?.name}</span>
    </div>
  );
};

export default CategoryItem;
