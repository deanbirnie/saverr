import React from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <header className="w-full border-b bg-slate-50 shadow-md">
      <div className="p-4 mx-auto max-w-screen-2xl flex items-center justify-between">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">Saverr</h1>
        </Link>
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
