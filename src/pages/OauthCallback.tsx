import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import FullsizeLoader from "components/FullsizeLoader";
import { useLoginContext } from "hooks/Login";

const OauthCallbackPage = () => {
  const { handleCallback, isLoggedIn } = useLoginContext();
  useEffect(() => {
    console.log(`Callback is complete. Result: ${isLoggedIn}`);
    handleCallback();
  });
  return isLoggedIn ? <Redirect to="/top/tracks" /> : <FullsizeLoader />;
};

export default OauthCallbackPage;
