import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useItem() {
  return {
    ...useQuery(["item-list"], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/item/`)
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}
