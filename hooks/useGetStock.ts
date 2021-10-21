import { useQuery } from "react-query";
import axios from "axios";

const getStock = async (jwt: string, stockID: number) => {
	if (jwt) {
		const { data } = await axios({
			url: `/stocks/${stockID}`,
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
	
		return data;
	}
}


export default function useGetStock(jwt:string, stockID: number): any {
	return useQuery(["stocks", stockID], () => getStock(jwt, stockID), {retry: true});
}
