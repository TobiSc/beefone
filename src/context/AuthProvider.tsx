import {
  User,
    connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { ReactNode, useEffect, useState } from "react";
import { app } from "./Firebase";
import { AcceptChildren, AuthProviderValue } from "../types/global";

const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099"); //TODO: nach initializeAuth aufrufen

let AuthContext = React.createContext<AuthProviderValue>({
  login: (email: string, password: string) => Promise.resolve(false),
  logout: () => Promise.resolve(false),
  createAccount: (email: string, password: string) => Promise.resolve(false),
});

function AuthProvider({children} : AcceptChildren) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    onAuthStateChanged(auth, user=>setUser(user));
  }, [])

    const login = async (email: string, password: string)=> {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    const logout = async () => {
      try {
        await signOut(auth);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    const createAccount = async (email: string, password: string) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

  return (
    <AuthContext.Provider value={{login, logout, createAccount}}>
        {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth(): AuthProviderValue {
    return React.useContext(AuthContext);
}
  