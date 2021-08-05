export interface StonksInterface {
	name: string,
	img: string,
	previousBid: number,
	currentBid: number,
}

const StonksData: StonksInterface[] = [
	{
		name: "Adani Gas",
		img: "/markets/adani.png",
		previousBid: 132,
		currentBid: 136
	},
	{
		name: "Avenue Supermarkets",
		img: "",
		previousBid: 136,
		currentBid: 136
	},
	{
		name: "Stark Industries",
		img: "",
		previousBid: 140,
		currentBid: 160
	},
	{
		name: "Divis Labs",
		img: "",
		previousBid: 132,
		currentBid: 130
	},
	{
		name: "Adani Gas",
		img: "",
		previousBid: 132,
		currentBid: 136
	},
	{
		name: "Adani Gas",
		img: "",
		previousBid: 132,
		currentBid: 136
	},
	{
		name: "Adani Gas",
		img: "",
		previousBid: 132,
		currentBid: 136
	},
]

export default StonksData;