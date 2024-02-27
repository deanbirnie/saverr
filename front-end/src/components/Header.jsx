import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ signedIn, setSignedIn }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok === true) {
        setSignedIn(false);
        navigate("/auth");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <header>
      <div className="bg-slate-50 shadow-md p-3 mx-auto flex flex-wrap justify-between">
        <h1 className="font-bold text-sm sm:text-xl">Saverr</h1>
        {signedIn && (
          <button
            className="bg-red-100 p-2 rounded-lg text-xs font-semibold uppercase hover:opacity-80 max-w-40"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  setSignedIn: PropTypes.func,
};
