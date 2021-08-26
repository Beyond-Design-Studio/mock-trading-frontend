import useSWR from "swr";

import { useMemo } from "react";

export const useGetUrl = (jwt: string, url: string, method?: "get"): any => {

  const queryParams = useMemo(
    () => ({
      method: method,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
    [jwt, method]
  );

	// const { data, error } = useSWR([`${url}`, queryParams]);
	return useSWR([`${url}`, queryParams]);
};
