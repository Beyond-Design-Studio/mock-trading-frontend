export interface SecurityInterface {
	name: string,
	img: string,
	previousPrice: number,
	currentPrice: number,
	type: string,
	id: number,
	ticker: string
}

export const StonksData: SecurityInterface[] = [
	{
		ticker: "ADN",
		id: 0,
		name: "Adani Gas",
		img: "/markets/adani.png",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Avenue Supermarkets",
		img: "",
		previousPrice: 136,
		currentPrice: 136,
		type: "stocks"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Stark Industries",
		img: "",
		previousPrice: 140,
		currentPrice: 160,
		type: "stocks"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Divis Labs",
		img: "",
		previousPrice: 132,
		currentPrice: 130,
		type: "stocks"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
]

export const CryptoData: SecurityInterface[] = [
	{
		ticker: "ADN",
		id: 0,
		name: "Bitcoin",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "crypto"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Ethereum",
		img: "",
		previousPrice: 136,
		currentPrice: 136,
		type: "crypto"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Doge Coin",
		img: "",
		previousPrice: 140,
		currentPrice: 160,
		type: "crypto"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Cardano",
		img: "",
		previousPrice: 132,
		currentPrice: 130,
		type: "crypto"
	}
]

export const CommodityData: SecurityInterface[] = [
	{
		ticker: "ADN",
		id: 0,
		name: "Cocoa",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "commodity"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Gold",
		img: "",
		previousPrice: 136,
		currentPrice: 136,
		type: "commodity"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Silver",
		img: "",
		previousPrice: 140,
		currentPrice: 160,
		type: "commodity"
	},
	{
		ticker: "ADN",
		id: 0,
		name: "Coal",
		img: "",
		previousPrice: 132,
		currentPrice: 130,
		type: "commodity"
	}
]