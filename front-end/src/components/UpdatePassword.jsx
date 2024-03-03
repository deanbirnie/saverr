import React, { useState } from "react";

export default function UpdatePassword() {
  const [formData, setFormData] = useState({});
  const [updateMsg, setUpdateMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/update-user-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok === true) {
        const data = await res.json();
        setFormData({});
        if (data) {
          setUpdateMsg(data.message);
          setFormData({});
        }
      } else {
        console.log("Couldn't update user email.");
        setFormData({});
      }
    } catch (err) {
      console.error(err);
      setFormData({});
    }
  };

  return (
    <div className="mb-10 flex flex-col items-center w-100">
      <form
        className="mt-5 flex flex-col gap-2"
        onSubmit={handleUpdatePassword}
      >
        <input
          type="password"
          placeholder="Current Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="New Password"
          className="border p-3 rounded-lg"
          id="newPassword"
          onChange={handleChange}
        />
        {updateMsg && (
          <div className="text-red-600 font-semibold">{updateMsg}</div>
        )}
        <button
          type="submit"
          className="uppercase p-3 bg-green-600 rounded-lg font-semibold"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
