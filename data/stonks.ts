export interface SecurityInterface {
	name: string,
	img: string,
	previousPrice: number,
	currentPrice: number,
}

export const StonksData: SecurityInterface[] = [
	{
		name: "Adani Gas",
		img: "/markets/adani.png",
		previousPrice: 132,
		currentPrice: 136
	},
	{
		name: "Avenue Supermarkets",
		img: "",
		previousPrice: 136,
		currentPrice: 136
	},
	{
		name: "Stark Industries",
		img: "",
		previousPrice: 140,
		currentPrice: 160
	},
	{
		name: "Divis Labs",
		img: "",
		previousPrice: 132,
		currentPrice: 130
	},
	{
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136
	},
	{
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136
	},
	{
		name: "Adani Gas",
		img: "",
		previousPrice: 132,
		currentPrice: 136
	},
]

export const CryptoData: SecurityInterface[] = [
	{
		name: "Bitcoin",
		img: "",
		previousPrice: 132,
		currentPrice: 136
	},
	{
		name: "Ethereum",
		img: "",
		previousPrice: 136,
		currentPrice: 136
	},
	{
		name: "Doge Coin",
		img: "",
		previousPrice: 140,
		currentPrice: 160
	},
	{
		name: "Cardano",
		img: "",
		previousPrice: 132,
		currentPrice: 130
	}
]

export const CommodityData: SecurityInterface[] = [
	{
		name: "Cocoa",
		img: "",
		previousPrice: 132,
		currentPrice: 136
	},
	{
		name: "Gold",
		img: "",
		previousPrice: 136,
		currentPrice: 136
	},
	{
		name: "Silver",
		img: "",
		previousPrice: 140,
		currentPrice: 160
	},
	{
		name: "Coal",
		img: "",
		previousPrice: 132,
		currentPrice: 130
	}
]