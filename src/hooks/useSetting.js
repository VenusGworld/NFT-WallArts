import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useSetting() {
  return {
    ...useQuery(["setting-list"], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/setting/`)
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}
