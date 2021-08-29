import { useQuery } from "react-query";
import axios from "axios";

const getNews = async (jwt: string) => {
	const { data } = await axios({
		url: "/news-updates",
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})

	return data;
}


export default function useGetNews(jwt:string): any {
	return useQuery("news", () => getNews(jwt));
}