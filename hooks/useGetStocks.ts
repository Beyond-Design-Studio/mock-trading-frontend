import { useQuery } from "react-query";
import axios from "axios";

const getStock = async (jwt: string) => {
  if (jwt) {
    const { data } = await axios({
      url: `/stocks`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  
    return data;
  }
}


const getStockById = async (jwt: string, stockId: number) => {
	if (jwt) {
		const { data } = await axios({
			url: `/stocks/${stockId}`,
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
	
		return data;
	}
}


export default function useGetStocks(jwt: string): any {
  return useQuery("stocks", () => getStock(jwt), {retry: true});
}

export function useGetStockById(jwt: string, stockId: number): any {
  return useQuery([ "stocks", stockId ], () => getStockById(jwt, stockId), {retry: true});
}
