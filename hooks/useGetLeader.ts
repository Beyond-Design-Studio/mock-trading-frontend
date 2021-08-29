import { useQuery } from "react-query";
import axios from "axios";

const getLeader = async (jwt: string, portfolioId: number) => {
	const { data } = await axios({
		url: `/leaderboard/${portfolioId}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})

	return data;
}


export default function useGetLeader(jwt:string, portfolioId: number): any {
	return useQuery(["holdings", portfolioId], () => getLeader(jwt, portfolioId));
}