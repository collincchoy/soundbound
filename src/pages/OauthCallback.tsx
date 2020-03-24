import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import FullsizeLoader from "components/FullsizeLoader";
import { useLoginContext } from "hooks/Login";

const OauthCallbackPage = () => {
  const history = useHistory();
  const { handleCallback, isLoggedIn } = useLoginContext();
  useEffect(() => {
    if (isLoggedIn) history.push("/top/artists");
    console.log(`Callback is complete. Result: ${isLoggedIn}`);
    handleCallback();
  });
  return <FullsizeLoader />;
};

export default OauthCallbackPage;
