export interface SecurityInterface {
	name: string,
	img: string,
	previousPrice: number,
	currentPrice: number,
	type: string
}

export const StonksData: SecurityInterface[] = [
	{
		name: "Adani Gas",
		img: "/markets/adani.png",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
	{
		name: "Avenue Supermarkets",
		img: "",
		previousPrice: 136,
		currentPrice: 136,
		type: "stocks"
	},
	{
		name: "Stark Industries",
		img: "",
		previousPrice: 140,
		currentPrice: 160,
		type: "stocks"
	},
	{
		name: "Divis Labs",
		img: "",
		previousPrice: 132,
		currentPrice: 130,
		type: "stocks"
	},
	{
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
	{
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
	{
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "stocks"
	},
]

export const CryptoData: SecurityInterface[] = [
	{
		name: "Bitcoin",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "crypto"
	},
	{
		name: "Ethereum",
		img: "",
		previousPrice: 136,
		currentPrice: 136,
		type: "crypto"
	},
	{
		name: "Doge Coin",
		img: "",
		previousPrice: 140,
		currentPrice: 160,
		type: "crypto"
	},
	{
		name: "Cardano",
		img: "",
		previousPrice: 132,
		currentPrice: 130,
		type: "crypto"
	}
]

export const CommodityData: SecurityInterface[] = [
	{
		name: "Cocoa",
		img: "",
		previousPrice: 132,
		currentPrice: 136,
		type: "commodity"
	},
	{
		name: "Gold",
		img: "",
		previousPrice: 136,
		currentPrice: 136,
		type: "commodity"
	},
	{
		name: "Silver",
		img: "",
		previousPrice: 140,
		currentPrice: 160,
		type: "commodity"
	},
	{
		name: "Coal",
		img: "",
		previousPrice: 132,
		currentPrice: 130,
		type: "commodity"
	}
]