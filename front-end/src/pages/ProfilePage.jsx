import React, { useState, useEffect, useRef } from "react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({});
  const userEmailRef = useRef("Email address");
  const userNameRef = useRef("Name");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  let userName = "Name";
  let userEmail = "Email address";

  useEffect(() => {
    const placeholders = async () => {
      try {
        const res = await fetch("/api/auth/get-userinfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          userEmailRef.current = res.user.email;
          userNameRef.current = res.user.name;
        } else {
          console.error("Unable to retrieve placeholders");
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    placeholders();
  }, []);

  const handleUpdateEmail = () => {};

  const handleUpdateName = () => {};

  const handleUpdatePassword = () => {};

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="uppercase font-bold text-3xl">Profile Page</h1>
      <h3 className="uppercase font-semibold text-xl mt-5">User Section</h3>
      <form className="mt-5 flex flex-col gap-2" onSubmit={handleUpdateEmail}>
        <label>Your email address:</label>
        <input
          type="email"
          placeholder={userEmailRef.current}
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <button className="uppercase p-3 bg-green-600 rounded-lg font-semibold">
          Update Email
        </button>
      </form>
      <form
        className="mt-5 flex flex-col gap-2 w-100"
        onSubmit={handleUpdateName}
      >
        <label>Your name:</label>
        <input
          type="text"
          placeholder={userNameRef.current}
          className="border p-3 rounded-lg"
          id="name"
          onChange={handleChange}
        />
        <button className="uppercase p-3 bg-green-600 rounded-lg font-semibold">
          Update Name
        </button>
      </form>
      <form
        className="mt-5 flex flex-col gap-2"
        onSubmit={handleUpdatePassword}
      >
        <label>Update your password here:</label>
        <input
          type="password"
          placeholder="New Password"
          className="border p-3 rounded-lg"
          id="newPassword"
          onChange={handleChange}
        />
        <button className="uppercase p-3 bg-green-600 rounded-lg font-semibold">
          Update Password
        </button>
      </form>
    </div>
  );
}
