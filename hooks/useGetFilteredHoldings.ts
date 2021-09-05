import { useAuth } from "@components/contexts/authContext";
import {useEffect, useMemo, useState} from "react"
import useGetHoldings from "./useGetHoldings";


const useGetFilteredHolding = (): any => {

	const { user } = useAuth();
	
	const { data, refetch } = useGetHoldings(user.jwt, user.portfolio);
	const [filteredData, setFilteredData] = useState<any>([]);
	
	useEffect(() => {
    if (data)
		for (let i = 0; i < data.length; i++) {
        // Innter Loop
				console.log(data);
				const list: string[] = [
          ...filteredData.map((filt: any) => filt.StockTicker),
        ];
        if (list.indexOf(data[i].StockTicker) !== -1) {
					console.log("i -->>", list);
          continue;
        }

        // Filter the data to get only ith stock types
        const filteredVals = data.filter(
          (hold: any) => data[i].StockTicker === hold.StockTicker
        );
				console.log("filteredVals", filteredVals);
				
        // Reduce it to get the final value.
        // Reduce's behaviour chnages when only one element is present, hence the length !== 1 terneary operator.
        const ownedQuantity = filteredVals.map((val: any) => val.OwnedQuantity).reduce(
          (p: number, c: number) => p + c
        );

        const reducedVals =
          filteredVals.length !== 1
            ? filteredVals.map((val: any) => val.PurchasePrice * val.OwnedQuantity).reduce((prev: number, curr: number) => {
                return (
                  prev + curr
                );
              }) / ownedQuantity
            : filteredVals[0].PurchasePrice;

        // If Duplicate doesn't exists, append to filteredData
        setFilteredData([
          ...filteredData,
          {
            ...data[i],

            // Modify the purchase price to reflect that of all purchases
            PurchasePrice: reducedVals,
            OwnedQuantity:
              filteredVals.length !== 1
                ? filteredVals.map((val: any) => val.OwnedQuantity).reduce(
                    (prev: number, curr: number) =>
                      prev + curr
                  )
                : filteredVals[0].OwnedQuantity,
          },
        ]);
      }
  }, [data, filteredData]);
	console.log("filteredData", filteredData);
	
	return {filteredData, refetch};
}

export default useGetFilteredHolding;