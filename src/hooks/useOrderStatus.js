import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useOrderStatus() {
  return {
    ...useQuery(["order_status-list"], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/order/order_statuses/`)
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}
