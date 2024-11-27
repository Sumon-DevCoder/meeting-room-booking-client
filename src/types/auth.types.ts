import { UserCredential } from "firebase/auth";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TAuthContext = {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  loading: boolean;
  user: any;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithFacebook: () => Promise<UserCredential>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  updateUserProfile: (
    userInfo: any,
    profile: { displayName?: string | null; photoURL?: string | null }
  ) => Promise<void>;
};
