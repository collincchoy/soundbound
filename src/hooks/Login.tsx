import React, { useContext, useState, useEffect } from "react";
import { Profile } from "../spotify/types";
import { spotify } from "../spotify/api";
import FullsizeLoader from "components/FullsizeLoader";

interface ILoginContext {
  currentUser?: Profile;
  signIn: () => void;
}

const LoginContext = React.createContext<ILoginContext>({
  signIn: () => {}
});

export function LoginContextProvider(props: { children: any }) {
  const [profile, setProfile] = useState<Profile>();
  const [isSigningIn, setIsSigningIn] = useState(true);
  const signIn = async () => {
    const currentUser = spotify.get<Profile>("/me");
    try {
      setProfile(await currentUser);
    } catch (error) {
      console.log("You are not signed in.");
    } finally {
      setIsSigningIn(false);
    }
  };
  useEffect(() => {
    signIn();
  }, []);
  return (
    <LoginContext.Provider value={{ currentUser: profile, signIn }}>
      {isSigningIn ? <FullsizeLoader /> : props.children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  const { currentUser, signIn } = useContext(LoginContext);
  return {
    isLoggedIn: !!currentUser,
    currentUser,
    login: spotify.login,
    logout: spotify.logout,
    handleCallback: () => {
      spotify.handleOAuthCallback();
      signIn();
    }
  };
}
