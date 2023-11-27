import { setPersistence, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import { signOut, getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, browserLocalPersistence } from "firebase/auth";

const config = {
  apiKey: "AIzaSyB4-wElTAoWYEiaQnfcgOTlDpGE-IipEIg",
  authDomain: "koncal.sk",
  projectId: "hlavnemesta-8760b",
  storageBucket: "hlavnemesta-8760b.appspot.com",
  messagingSenderId: "520142358023",
  appId: "1:520142358023:web:77fa852ac91ea1c7660ca2"
};

const app = firebase.initializeApp(config);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);


interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseContext = createContext<{
  user?: User;
  loading: boolean;
  signIn?: () => Promise<void>;
  logOut?: () => Promise<void>;
}>({ loading: true });

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const logOut = async () => {
    await signOut(auth);
    setUser(undefined);
  };

  const signIn = async () => {
    const result = await getRedirectResult(auth);
    if (result) {
      setUser(result.user);
    } else {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth);
      setUser(result?.user);
    }

  };

  useEffect(() => {
    (async () => {
      const result = await getRedirectResult(auth);
      if (result) {
        setUser(result.user);
      }

      if (auth?.currentUser) {
        setUser(auth.currentUser);
      }
      setLoading(false);
    })()
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, signIn, logOut, loading }}>
      {children}
    </FirebaseContext.Provider>

  )

};

