import { authContextType, useAuth } from "@components/contexts/authContext";
import withAuth from "@components/functions/withAuth";
import axios from "axios";
import { useEffect } from "react";

export default function useUser(): authContextType {

	const {user, setUser} = useAuth();

	useEffect(() => {
		const token = withAuth();

		if (!user.jwt) {
			axios({
				method: "GET",
				url: "/users/me",
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => {
					setUser({
            jwt: res.data.jwt,
            id: res.data.user.id,
            username: res.data.user.username,
            portfolio: res.data.user.portfolio
          });
				})
		}

	}, [user, setUser])

	
	return {user, setUser};
}