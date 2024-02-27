import React from "react";
import PropTypes from "prop-types";
import AuthComponent from "../components/AuthComponent";

export default function AuthPage({ signedIn, setSignedIn }) {
  return (
    <>
      {!signedIn && (
        <AuthComponent signedIn={signedIn} setSignedIn={setSignedIn} />
      )}
    </>
  );
}

AuthPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  setSignedIn: PropTypes.func.isRequired,
};
