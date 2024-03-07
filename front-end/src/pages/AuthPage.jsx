import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthComponent from "../components/AuthComponent";
import RegistrationComponent from "../components/RegistrationComponent";
import Footer from "../components/Footer";

export default function AuthPage({ signedIn, setSignedIn }) {
  const [userForm, setUserForm] = useState(true);

  const handleFormState = () => {
    setUserForm(!userForm);
  };

  return (
    <>
      <div>
        {!signedIn && userForm ? (
          <AuthComponent
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            onSwitchUserForm={handleFormState}
          />
        ) : (
          <RegistrationComponent
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            onSwitchUserForm={handleFormState}
          />
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
