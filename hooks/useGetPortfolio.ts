import { useQuery } from "react-query";
import axios from "axios";

const getPortfolio = async (jwt: string, portfolioId: number) => {
	if (jwt) {
		const { data } = await axios({
			url: `/portfolios/${portfolioId}`,
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
	
		return data;
	}
}


export default function useGetPortfolio(jwt:string, portfolioId: number): any {
	return useQuery(["portfolios", portfolioId], () => getPortfolio(jwt, portfolioId), {retry: true});
}