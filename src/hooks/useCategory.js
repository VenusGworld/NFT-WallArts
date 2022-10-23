import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useCategory() {
  return {
    ...useQuery(["category-list"], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/category/`)
        .catch((err) => {
          console.log(err);
        });
      return result.data;
    }),
  };
}


