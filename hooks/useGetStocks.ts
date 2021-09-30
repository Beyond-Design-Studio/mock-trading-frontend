import { useQuery } from "react-query";
import axios from "axios";

const getStock = async (jwt: string) => {
  const { data } = await axios({
    url: `/stocks`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
}


export default function useGetStocks(jwt: string): any {
  return useQuery("stocks", () => getStock(jwt), {retry: true});
}

export function altGetStocks(jwt: string, setStock: any): any {
  return getStock(jwt).then(res => setStock(res));
}
