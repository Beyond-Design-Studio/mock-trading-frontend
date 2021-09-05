const indianNumberConverter = (x: number): string => x.toLocaleString("en-IN", { style: "currency", currency: "INR" })

export default indianNumberConverter;