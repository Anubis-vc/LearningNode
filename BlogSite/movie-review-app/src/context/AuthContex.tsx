import React, { createContext, useState, useEffect, useContext } from 'react'
import { authApi } from '../api'
import { User } from '../types'

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<void>
	adminLogin: (username: string, password:string) => Promise<void>
	logout: () => Promise<void>
	register: (username: string, password: string, email: string) => Promise<void>
	isAdmin: () => boolean;
}

// make sure nested child is text, jsx, component, or fragment
type AuthProviderProps = { children: React.ReactNode }

// give undefined to make sure componenets wrapped within the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// create authprovider and extract the child component nested within authprovider tags
export const AuthProvider = ({children}: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// run just once on mount
	useEffect(() => {
		// add an auth/me to see if user already logged in?
		setLoading(false)
	}, []);

	const login = async (username: string, password: string) => {
		const response = await authApi.login(username, password);
		if (response.data.message === "login successful") {
			setUser({ username: username, isAdmin: false });
		}
	};
	const adminLogin = async (username: string, password: string) => {
		const response = await authApi.adminLogin(username, password);
		if (response.data.message === "login successful") {
			setUser({ username: username, isAdmin: true })
		}
	};
	const logout = async () => {
		await authApi.logout();
		setUser(null);
	};
	const register = async (username: string, password: string, email: string) => {
		const response = await authApi.register(username, password, email);
		if (response.data.message === "user successfully created") {
			setUser({ username, isAdmin: false });
		}
	};
	const isAdmin = () => user?.isAdmin || false;

	return (
		<AuthContext.Provider value={{
			user,
			loading,
			login,
			adminLogin,
			logout,
			register,
			isAdmin,
		}}>
			{children}
		</AuthContext.Provider>
	);
};

// create custom hook for accessing context
export const userAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an auth provider context')
	}
	return context;
}