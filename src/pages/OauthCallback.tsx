import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import FullsizeLoader from "components/FullsizeLoader";
import { useLoginContext } from "hooks/Login";

const OauthCallbackPage = () => {
  const { handleCallback, isLoggedIn } = useLoginContext();
  useEffect(() => {
    console.log(`Callback is complete. Result: ${isLoggedIn}`);
    handleCallback();
  });
  return isLoggedIn ? <Navigate to="/top/tracks" /> : <FullsizeLoader />;
};

export default OauthCallbackPage;
