import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function AuthComponent({ signedIn, setSignedIn }) {
  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res.message);
      if (res.ok === true) {
        const data = await res.json();
        // console.log(data);
        if (data) {
          setSignedIn(true);
          // console.log("Navigating to /");
          navigate("/");
        }
      } else {
        const errData = await res.json();
        setErrMsg(errData.message);
        setSignedIn(false);
      }
    } catch (err) {
      console.error(err);
      setSignedIn(false);
    }
  };

  return (
    <>
      <div className="border my-10 rounded-xl p-5 max-w-lg mx-auto flex flex-col gap-6">
        <h1 className="text-3xl text-center font-semibold mt-5">Sign In</h1>
        <form className="flex flex-col gap-4 my-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Your Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <div className="text-red-600 font-semibold">
            {errMsg && (
              <div className="text-red-600 font-semibold">{errMsg}</div>
            )}
          </div>
          <button className="bg-green-400 p-3 rounded-lg font-semibold uppercase hover:opacity-80 max-w-40">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

AuthComponent.propTypes = {
  signedIn: PropTypes.bool,
  setSignedIn: PropTypes.func.isRequired,
};
