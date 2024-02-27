import React, { useState } from "react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateEmail = () => {};

  return (
    <>
      <form onSubmit={handleUpdateEmail}>
        <input
          type="email"
          placeholder="Email Address"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <button className="uppercase p-3 bg-green-600 rounded-lg font-semibold">
          Update
        </button>
      </form>
    </>
  );
}
