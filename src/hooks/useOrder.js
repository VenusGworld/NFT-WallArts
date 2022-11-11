import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { connectedAccount, isConnected } from "../store/accountReducer";

export function useOrder() {
  const is_Connected = useSelector(isConnected);
  const connected_account = useSelector(connectedAccount);
  return {
    ...useQuery(["orders-byAddress-list", connected_account], async () => {
      if(!is_Connected) {
        return []
      } else {
        const result = await axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/api/order/by_address/${connected_account}`)
          .catch((err) => {
            console.log(err);
          });
        return result.data;
      }
    }),
  };
}


