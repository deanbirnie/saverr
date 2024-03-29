import React, { useState } from "react";

export default function UpdateName() {
  const [formData, setFormData] = useState({});
  const [updateMsg, setUpdateMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/update-user-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res.bodyUsed);
      if (res.ok === true) {
        const data = await res.json();
        // console.log(data);
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
      <form className="mt-5 flex flex-col gap-2" onSubmit={handleUpdateName}>
        <input
          type="text"
          placeholder="New name"
          className="border p-3 rounded-lg"
          id="name"
          onChange={handleChange}
        />
        {updateMsg && (
          <div className="text-red-600 font-semibold">{updateMsg}</div>
        )}
        <button
          type="submit"
          className="uppercase p-3 bg-green-600 rounded-lg font-semibold"
        >
          Update Name
        </button>
      </form>
    </div>
  );
}
