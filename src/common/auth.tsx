// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDsyQsyEqia4PYrJM6yXHseoUToFzp47w",
  authDomain: "netflix-clone-c452b.firebaseapp.com",
  projectId: "netflix-clone-c452b",
  storageBucket: "netflix-clone-c452b.appspot.com",
  messagingSenderId: "345601169185",
  appId: "1:345601169185:web:c57d464e84b6b75f141060",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

type AuthContextType = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth() {
  // current user => null
  // 1. Firebase is still fetching the information. async operation
  // 2. when the user is logged out

  // user is logged in => User
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signOutUser = () => signOut(auth);

  return { signUp, signIn, signOut: signOutUser, user, loading };
}

export const useAuth = () => useContext(AuthContext) ?? ({} as AuthContextType);
