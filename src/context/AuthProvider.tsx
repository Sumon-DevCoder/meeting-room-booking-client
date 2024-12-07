/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  FacebookAuthProvider, // Import the Facebook provider
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "./../firebase/firebase.config";
import axios from "axios";
import { TAuthContext } from "@/types/auth.types";

// auth context
export const AuthContext = createContext<TAuthContext | null>(null);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider(); // Initialize Facebook provider

// auth provider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // signUp
  const signUp = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // updateUserProfile
  const updateUserProfile = (
    userInfo: User,
    profile: { displayName?: string | null; photoURL?: string | null }
  ) => {
    setLoading(true);
    return updateProfile(userInfo, profile);
  };

  // signIn
  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // signInWithGoogle
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // signInWithFacebook
  const signInWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider); // Use Facebook provider
  };

  // onAuthStateChanged
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("current user", currentUser);
      setUser(currentUser);
      setLoading(false);

      const userEmail = currentUser?.email;
      const loggedUser = { email: userEmail };

      try {
        if (currentUser) {
          // Send JWT request
          const res = await axios.post(
            "https://meeting-room-booking-server-zeta.vercel.app/api/jwt",
            loggedUser,
            { withCredentials: true }
          );
          console.log("jwt data", res.data);
        } else {
          // Handle logout cleanup
          const res = await axios.post(
            "http://localhost:5173/logout",
            loggedUser,
            { withCredentials: true }
          );
          console.log("jwt cookie clean data", res.data);
        }
      } catch (error) {
        console.error("Error with JWT/auth API:", error);
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo: TAuthContext = {
    signIn,
    signUp,
    loading,
    user,
    logOut,
    signInWithGoogle,
    signInWithFacebook, // Add signInWithFacebook to context
    setUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
