import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { auth } from "../backend/firebase.config";

const API = createContext();

export default function AppState({ children }) {
  // authentication
  const [user, setUser] = useState("");
  const registerNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      sendEmailVerification(auth.currentUser);
    });
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSingIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  // searching method
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("toyName") || "";

  const handleSearch = (event) => {
    const toyName = event.target.value;
    toyName ? setSearchParams({ toyName }) : setSearchParams({});
  };

  return (
    <>
      <API.Provider
        value={{
          user,
          registerNewUser,
          loginUser,
          googleSingIn,
          logOutUser,
          searchTerm,
          handleSearch,
        }}
      >
        {children}
      </API.Provider>
    </>
  );
}

export function useAppState() {
  return useContext(API);
}
