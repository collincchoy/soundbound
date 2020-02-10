import React, { useContext } from "react";
import { Profile } from "./spotify/types";
import { useSpotifyApi } from "./spotify/hooks";
import { spotify } from "./spotify/api";

interface ILoginContext {
  currentUser?: Profile;
}

const LoginContext = React.createContext<ILoginContext>({});

export function LoginContextProvider(props: {children: any}) {
  const { data: profile } = useSpotifyApi<Profile>("/me");
  return (
    <LoginContext.Provider value={{currentUser: profile}}>
      {props.children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  const { currentUser } = useContext(LoginContext);
  return {
    isLoggedIn: !!currentUser,
    currentUser,
    login: spotify.login,
    logout: spotify.logout,
  }
}