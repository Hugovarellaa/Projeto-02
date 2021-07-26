import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

interface AuthContextProviderProps {
	children: ReactNode
}

interface AuthContextProps {
	user: User | undefined;
	signInWithGoogle: () => Promise<void>;
}
interface User {
	id: string;
	name: string;
	avatar: string;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider(props: AuthContextProviderProps) {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const unsubsribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL) {
					throw new Error('Missing information from google Account');
				}
				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				})
			}
		})
		return () => {
			unsubsribe()
		}
	}, [])

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();

		const result = await auth.signInWithPopup(provider)

		if (result.user) {
			const { displayName, photoURL, uid } = result.user;

			if (!displayName || !photoURL) {
				throw new Error('Missing information from google Account');
			}
			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL
			})
		};
	}
	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	)
}

