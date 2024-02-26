import React from "react";
import PropTypes from "prop-types";

export default function Header({ signedIn }) {
  return (
    <header>
      <div className="bg-slate-100 shadow-md p-3 mx-auto flex flex-wrap justify-between">
        <h1 className="font-bold text-sm sm:text-xl">Saverr</h1>
        <p>{signedIn ? "Signed In" : "Please sign in"}</p>
      </div>
    </header>
  );
}

Header.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};
