import React, { useState } from "react";

export default function NewBudgetModal({ onClose }) {
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const res = await fetch("/api/app/create-budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          onClose();
        }
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.error.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-lg max-w-2xl mx-10 min-w-96">
        <h2 className="text-2xl font-bold mb-10">New Budget</h2>
        <div className="my-2">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Month"
              id="month"
              required
              className="p-3 border rounded-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Year"
              id="year"
              required
              className="p-3 border rounded-lg"
              onChange={handleChange}
            />
            {/* Error message if unable to submit */}
            {errorMsg && (
              <div className="text-red-600 font-semibold">{errorMsg}</div>
            )}
            {/* Form Submit Button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 mx-auto w-full max-w-40">
              Submit
            </button>
          </form>
        </div>
        {/* Modal Buttons */}
        <div className="flex flex-col gap-2 mx-auto max-w-40">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
