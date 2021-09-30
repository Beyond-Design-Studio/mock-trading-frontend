import axios from "axios";


export const postHolding = (jwt: string, data: any): any => {
	axios({
		method: "POST",
		url: `/holdings`,
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		data: data
	})
		// .then(res => console.log(res.data))
		.catch(console.error)
}

export const putHolding = (jwt: string, data: any, holdingId: number): any => {
	axios({
		url: `/holdings/${holdingId}`,
		method: "PUT",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
		data: data
	})
		// .then(res => console.log(res.data))
		.catch(console.error);
}

export const deleteHolding = (jwt: string, holdingId: number): any => {
	axios({
		url: `/holdings/${holdingId}`,
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})
		// .then(res => console.log(res.data))
		.catch(console.error);
}