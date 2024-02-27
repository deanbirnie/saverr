import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ signedIn, setSignedIn }) {
  const navigate = useNavigate();

  const handleNavProfile = () => {
    navigate("/profile");
  };

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
          <div className="mx-2">
            <button
              className="bg-green-100 border p-2 rounded-lg text-xs font-semibold uppercase hover:opacity-80 max-w-40 mx-2"
              onClick={handleNavProfile}
            >
              Profile
            </button>
            <button
              className="bg-red-100 border p-2 rounded-lg text-xs font-semibold uppercase hover:opacity-80 max-w-40 mx-2"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  signedIn: PropTypes.bool,
  setSignedIn: PropTypes.func,
};
