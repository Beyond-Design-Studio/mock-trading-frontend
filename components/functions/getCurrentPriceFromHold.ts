import axios from "axios";
import getMostRecentPublished from "./getMostRecentPublished";

/**
 * 
 * @param hold the currentPrice of the holding price
 * @param jwt JSON web token
 * @returns 
 */
const getCurrentPriceFromHold = async (hold: any, jwt: string): Promise<any> => {
  let currPrice = -1;
	const getStock = await axios({
		url: `/stocks`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})
		.then(res => res.data)
	
	const holdingsSecurity = getStock.filter((stock: any) => stock.id === hold.security.id)[0]

	currPrice = getMostRecentPublished(holdingsSecurity.security_prices);
  return currPrice;
};

export default getCurrentPriceFromHold;
