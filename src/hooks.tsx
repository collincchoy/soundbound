import React, { useContext, useState } from "react";
import { Profile } from "./spotify/types";
import { useSpotifyApi } from "./spotify/hooks";
import { spotify } from "./spotify/api";
import { isOverflowing, debounce } from "utilities";

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
  // const elementWidth = elRef?.current?.clientWidth;
  const [elementWidth, setElementWidth] = useState(0);
  React.useEffect(() => {
    setHasOverflowingText(
      elRef.current !== null && isOverflowing(elRef.current)
    );
    if (elRef.current !== null) {
      setElementWidth(elRef.current.clientWidth);
      const handleResize = () => {
        console.log("hi");
        if (elRef.current?.clientWidth !== elementWidth) {
          elRef.current && setElementWidth(elRef.current.clientWidth);
        }
      };
      window.addEventListener("resize", debounce(handleResize, 1500));
      return () =>
        setTimeout(
          () => window.removeEventListener("resize", handleResize),
          50
        ) && undefined;
    }
  }, [elRef, elementWidth]);
  return {
    hasOverflowingText,
    elRef
  };
}
