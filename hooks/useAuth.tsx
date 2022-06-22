import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: any;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState(true); // basically for blocking the ui when user status is checked

  const router = useRouter();

  // Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        //   user -> given by firebase
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
          router.push("/login"); // acts like protecting route => authorization
        }

        setInitialLoading(false);
      }),

    [auth]
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userData.user);
      setLoading(false);
      router.push("/");
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
      setError(err);
      alert("Sign Up Failed 😟");
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setUser(userData.user);
      setLoading(false);
      router.push("/");
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
      setError(err);
      alert("Login Failed 😟");
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => setUser(null))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const memoValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      error,
      loading,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
