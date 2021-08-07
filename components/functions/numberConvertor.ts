export default function indianNumberConverter(y: number): string | void {
  const x = y.toString();
  
  let lastThree = x.substring(x.length-3);
  const otherNumbers = x.substring(0,x.length-3);
  
  if (otherNumbers != '')
    lastThree = ',' + lastThree;
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  
    return(res);
}