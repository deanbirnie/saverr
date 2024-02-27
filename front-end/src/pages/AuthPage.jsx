import React from "react";
import PropTypes from "prop-types";
import AuthComponent from "../components/AuthComponent";

export default function AuthPage({ signedIn }) {
  return (
    <>
      <div>{signedIn ? "Signed In" : <AuthComponent />}</div>
    </>
  );
}

AuthPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};
