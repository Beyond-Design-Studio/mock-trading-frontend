import { authContextType, useAuth } from "@components/contexts/authContext";
import axios from "axios";
import router from "next/router";
import { useEffect } from "react";

export default function useUser(): authContextType {

	const { user, setUser } = useAuth();

	useEffect(() => {

		if (!user.jwt) {
			const token = localStorage.getItem("token");

			if (!token) {
				console.error("No token found");
				router.push("/")
				return;
			}

			// console.log("fetching user data");

			axios({
				method: "GET",
				url: "/users/me",
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(res => {
					// console.log("data fetched");
					setUser({
						jwt: token,
						id: res.data.id,
						username: res.data.username,
						portfolio: res.data.portfolio
					});

					return { user, setUser };
				})
				.catch(err => {
					console.error(err);
					router.push("/");
				})
		}

	}, [user, setUser])


	return { user, setUser };
}