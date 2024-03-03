import React from "react";
import PropTypes from "prop-types";
import AuthComponent from "../components/AuthComponent";
import Footer from "../components/Footer";

export default function AuthPage({ signedIn, setSignedIn }) {
  return (
    <>
      <div>
        {!signedIn && (
          <AuthComponent signedIn={signedIn} setSignedIn={setSignedIn} />
        )}
      </div>
      <Footer />
    </>
  );
}

AuthPage.propTypes = {
  signedIn: PropTypes.bool,
  setSignedIn: PropTypes.func.isRequired,
};
