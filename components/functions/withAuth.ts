import router from "next/router";


const withAuth = ():null|string => {

	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/auth");
		}
		
		return token;
	}

	return null;
}

export default withAuth;