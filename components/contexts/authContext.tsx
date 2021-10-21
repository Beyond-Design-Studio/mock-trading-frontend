import { createContext, useContext, useState, ReactNode } from "react";


export interface UserInterface {
	jwt: string,
	id: number,
	username: string,
	portfolio: number
}

export interface authContextType {
	user: UserInterface,
	setUser: (token: UserInterface) => void
}


const defaultValue: authContextType = {
	user: { jwt: "", id: -1, username: "", portfolio: -1 },
	setUser: (token) => {
		console.log(token)
	}
}

const AuthContext = createContext<authContextType>(defaultValue);

export function useAuth(): authContextType {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }): any => {

	const [user, setuser] = useState<UserInterface>({ jwt: "", id: -1, username: "", portfolio: -1 });
	const setUser = (token: UserInterface) => {
		setuser(token);
	}

	const value = {
		user,
		setUser
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}
