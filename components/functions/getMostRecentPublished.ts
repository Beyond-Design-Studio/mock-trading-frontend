/**
 * 
 * @param securityPrices stock.security_prices
 * @returns Most recent price of the security
 */
const getMostRecentPublished = (securityPrices: any[]): number => {
  let max = "";
  let currPrice = 0;
  securityPrices.forEach((price) => {
    if ( price.publish_at > max ) {
      max = price.publish_at;
      currPrice = price.currentPrice;
    }
  })

  return currPrice;
};

export default getMostRecentPublished;
