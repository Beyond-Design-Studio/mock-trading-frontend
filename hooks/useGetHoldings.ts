import { useQuery } from "react-query";
import axios from "axios";

const getHolding = async (jwt: string, _portfolioId: number) => {
	if (jwt) {
		const { data } = await axios({
			url: `/holdings`,
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})

		return data;
	}
}


export default function useGetHoldings(jwt: string, portfolioId: number): any {
	return useQuery(["holdings", { portfolio: portfolioId }], () => getHolding(jwt, portfolioId), { retry: true });
}
