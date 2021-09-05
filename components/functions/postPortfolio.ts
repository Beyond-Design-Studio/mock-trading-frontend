import axios from "axios";


const putPortfolio = async (jwt: string, portId: number, data: any): Promise<any> => {
	await axios({
		url: `/portfolios/${portId}`,
		method: "PUT",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		data: data
	})
		.catch(console.error)
}

export default putPortfolio;