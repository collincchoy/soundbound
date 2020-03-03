import React, { useContext, useState } from "react";
import { Profile } from "./spotify/types";
import { useSpotifyApi } from "./spotify/hooks";
import { spotify } from "./spotify/api";
import { isOverflowing } from "utilities";

interface ILoginContext {
  currentUser?: Profile;
}

const LoginContext = React.createContext<ILoginContext>({});

export function LoginContextProvider(props: { children: any }) {
  const { data: profile } = useSpotifyApi<Profile>("/me");
  return (
    <LoginContext.Provider value={{ currentUser: profile }}>
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
    logout: spotify.logout
  };
}

export function useOverflowTextHandler<T extends HTMLElement>() {
  const [hasOverflowingText, setHasOverflowingText] = useState(false);
  const elRef = React.useRef<T>(null);
  React.useEffect(() => {
    if (elRef.current !== null && isOverflowing(elRef.current)) {
      setHasOverflowingText(true);
    }
  }, [elRef]);
  return {
    hasOverflowingText,
    elRef
  };
}
