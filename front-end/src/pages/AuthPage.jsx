import React from "react";
import PropTypes from "prop-types";
import AuthModal from "../components/AuthModal";

export default function AuthPage({ signedIn }) {
  return (
    <>
      <div>{signedIn ? "Signed In" : <AuthModal />}</div>
    </>
  );
}

AuthPage.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};
