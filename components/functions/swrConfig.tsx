import axios, { AxiosRequestConfig } from "axios";
import React, {FC} from "react";
import { SWRConfig } from "swr";


const swrConfig = {
	revalidateOnFocus: false,
	shoudRetryOnError: false,
	fetcher: async (url: string, query: AxiosRequestConfig) => await axios({url: url, ...query}).then(res => res.data)
}

export const SWRConfigProvider: FC = ({children}) => <SWRConfig value={swrConfig} >{children}</SWRConfig>