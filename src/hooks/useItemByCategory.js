import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useItemByCategory({category_id}) {
  return {
    ...useQuery(["item-list","category-",category_id], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/item/by_category/${category_id}`)
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}
